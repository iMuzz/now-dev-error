import React from "react";
import Head from "next/head";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import cookie from "js-cookie";

import fetch from "isomorphic-unfetch";

let apolloClient: any = null;
import config from "../config/build";
import { grabToken } from "../utils/auth";

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */

interface withApolloProps {
  apolloClient: any;
  apolloState: any;
}
export function withApollo(PageComponent: any, { ssr = true } = {}) {
  const WithApollo = ({
    apolloClient,
    apolloState,
    ...pageProps
  }: withApolloProps) => {
    const client = apolloClient || initApolloClient(apolloState);
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== "production") {
    const displayName =
      PageComponent.displayName || PageComponent.name || "Component";

    if (displayName === "App") {
      console.warn("This withApollo HOC only works with PageComponents.");
    }

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx: any) => {
      const API_URL = config.isBrowser
        ? `${config.protocol}://${window.location.host}/api`
        : `${config.protocol}://${ctx.req.headers["x-forwarded-host"]}/api`;

      const { AppTree } = ctx;
      const token = grabToken(ctx);

      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      const apolloClient = (ctx.apolloClient = initApolloClient({ token }));

      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      // Only on the server:
      if (typeof window === "undefined") {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps;
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import("@apollo/react-ssr");
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient
                }}
              />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error("Error while running `getDataFromTree`", error);
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind();
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState,
        API_URL
      };
    };
  }

  return WithApollo;
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(initialState: any) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === "undefined") {
    return createApolloClient(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState);
  }

  return apolloClient;
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(initialState: any = {}) {
  const cache = new InMemoryCache();

  const { token } = initialState;

  const httpLink = createHttpLink({
    uri: config.graphqlUrl, // Server URL (must be absolute)
    credentials: "include", // Additional fetch() options like `credentials` or `headers`
    fetch
  });

  const authLink = () =>
    setContext(async (_, { headers }) => {
      const public_token = config.apollo.publicToken;
      let user_token = token;

      if (!isServer()) {
        user_token = cookie.get("token");
      }

      return {
        headers: {
          ...headers,
          authorization: `Bearer ${user_token ? user_token : public_token}`
        }
      };
    });

  const client = new ApolloClient({
    connectToDevTools: true,
    ssrMode: typeof window === "undefined", // Disables forceFetch on the server (so queries are only run once)
    link: authLink().concat(httpLink),
    cache: cache.restore(initialState),
    resolvers: {
      Mutation: {
        addUserToken: (_, args, { cache }) => {
          cache.writeData({
            data: {
              userToken: args.id
            }
          });
        },
        logoutUser: async (_, _args, { client }) => {
          client.resetStore();
        }
      }
    }
  });

  client.writeData({
    data: {
      isLoggedIn: false
    }
  });

  return client;
}

const isServer = () => {
  return typeof window === "undefined";
};
