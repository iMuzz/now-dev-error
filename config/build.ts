export const IS_PROD = process.env.NODE_ENV === `production`
export const IS_DEV = process.env.NODE_ENV !== `production`

// @ts-ignore
export const IS_BROWSER = process.browser

const HASURA_URL_DEV = 'https://waitwhois-development.herokuapp.com/v1/graphql'
const HASURA_URL_PROD = 'https://prod-wait-who-is.herokuapp.com/v1/graphql'

const isProd = process.env.NODE_ENV === `production`
const isDev = process.env.NODE_ENV !== `production`

console.log(`Connected to Hasura: ${isDev ? HASURA_URL_DEV : HASURA_URL_PROD}`)

const config = {
  protocol: process.env.NODE_ENV === `production` ? 'https' : 'http',
  isProd,
  isDev,
  isBrowser: process.browser,
  graphqlUrl: isDev ? HASURA_URL_DEV : HASURA_URL_PROD,
  apollo: {
    publicToken:
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJteUFtYXppbmdBdXRoIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsicHVibGljX2NsaWVudCJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJwdWJsaWNfY2xpZW50In19.L7A_soHWFvhFa9qolND4Xb4dwlXkGybYN2BGmivz7-iUqkt5AAegKnByxrseyNV6l5_2GIKQwP__Bt6IbJtsVxd73duXw18Z0zwMzFGs3nWcT4OzmnLG1QyEFNt5aIHj75xnlqWkrWVas3pyTF0zC8QOcRqwppfkrMeNe71RX_ky0e-qibyFQRNWcusJX6Xmt_LzMskN70hf2d5Wvyljj52-7YP1aQxR0U9_HbIKd28Efh7DXG1ICcUK62Dnwnvwt6N-bRL1GfSd80cEiyP3cxTzn9asOEHAqy_YgimumcoOqItbvdDF-xl09FU9CdMwgR-5UAgSzMQeWUMmNEKYjA',
  },
}

export default config
