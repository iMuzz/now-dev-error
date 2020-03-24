// const IS_PROD = true
const IS_PROD = process.env.NODE_ENV === 'production'

const config = {
  isProd: IS_PROD,
  isDev: process.env.NODE_ENV !== `production`,
  twitter: {
    consumerAPIKey: process.env.TWITTER_CONSUMER_API_KEY || '',
    consumerAPISecret: process.env.TWITTER_CONSUMER_API_SECRET || '',
    accessTokenKey: process.env.TWITTER_ACCESS_TOKEN_KEY || '',
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET || '',
    callbackUrl: process.env.TWITTER_CALLBACK || '',
  },
  bycrypt: {
    rounds: 10,
  },
  hasura: {
    url: process.env.HASURA_URL || '',
    accessKey: process.env.HASURA_ACCESS_KEY || '',
  },
  port: process.env.PORT || '',
}

export default config
