import * as React from "react";
import Router from "next/router";
import { NextComponentType, NextPageContext } from "next";
import nextCookie from "next-cookies";
import cookie from "js-cookie";

import jwtDecode from "jwt-decode";
import config from "../config/build";

export const AUTH_TOKEN = "token";

interface ILoginParams {
  token: string;
}

export const login = async ({ token }: ILoginParams) => {
  localStorage.setItem("token", token);
  cookie.set(AUTH_TOKEN, token, { expires: 1 });
  const path = window.localStorage.getItem("redirect_url");
  window.localStorage.removeItem("redirect_url");
  Router.push(path ? path : "/");
};

export const logout = () => {
  localStorage.removeItem("token");
  cookie.remove(AUTH_TOKEN);
  // to support logging out from all windows
  window.localStorage.setItem("logout", Date.now().toString());
};

export const getUserFromServerCookie = (req: any) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const jwtCookie = req.headers.cookie
    .split(";")
    .find((c: string) => c.trim().startsWith("token="));
  if (!jwtCookie) {
    return undefined;
  }
  const jwt = jwtCookie.split("=")[1];
  return jwtDecode(jwt);
};

export const getUserFromLocalCookie = () => {
  let decodedToken;
  try {
    decodedToken = jwtDecode(cookie.getJSON(AUTH_TOKEN));
  } catch (e) {
    console.log(e);
  }
  return decodedToken;
};

// Gets the display name of a JSX component for dev tools
const getDisplayName = (Component: React.ComponentType) =>
  Component.displayName || Component.name || "Component";

interface withAuthSyncProps {
  token: string;
}

interface ILogoutEvent extends Event {
  key: string;
}

export const withAuthSync = (WrappedComponent: NextComponentType) => {
  return class extends React.Component<
    NextComponentType & withAuthSyncProps,
    {}
  > {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;

    static async getInitialProps(ctx: any) {
      const parseUser = (jwtUser: any) => {
        return {
          id: jwtUser.myAmazingAuth["x-hasura-user-id"],
          name: jwtUser.name
        };
      };
      const token = auth(ctx);
      const jwtUser = config.isBrowser
        ? getUserFromLocalCookie()
        : getUserFromServerCookie(ctx.req);
      const user = !token ? {} : parseUser(jwtUser);

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps, token, loggedInUser: user };
    }

    constructor(props: withAuthSyncProps) {
      super(props);

      this.syncLogout = this.syncLogout.bind(this);
    }

    componentDidMount() {
      window.addEventListener("storage", this.syncLogout as EventListener);
    }

    componentWillUnmount() {
      window.removeEventListener("storage", this.syncLogout as EventListener);
      window.localStorage.removeItem("logout");
    }

    syncLogout(event: ILogoutEvent) {
      if (event.key === "logout") {
        console.log("logged out from storage!");
        Router.push("/login");
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

/*
 * This gives you back the JWT token depending on
 * if the request is being made on the server or
 * client.
 */
export const grabToken = (ctx: NextPageContext) => {
  const { token } = nextCookie(ctx);
  return token;
};

export const auth = (ctx: NextPageContext) => {
  const { token } = nextCookie(ctx);

  /*
   * This happens on server only, ctx.req is available means it's being
   * rendered on server. If we are on server and token is not available,
   * means user is not logged in.
   */
  if (ctx.req && !token && ctx.res !== undefined) {
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();
    return;
  }

  // We already checked for server. This should only happen on client.
  if (!token) {
    console.log("redirect the user to the login page.");
    Router.push("/login");
  }

  return token;
};
