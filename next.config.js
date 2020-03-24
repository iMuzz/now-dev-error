const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const withCSS = require('@zeit/next-css')

const plugins = withCSS()

module.exports = {
  target: 'serverless',
  experimental: { publicDirectory: true },
  ...plugins,
}
