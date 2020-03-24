import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { extractStyles } from 'evergreen-ui'
import flush from 'styled-jsx/server'

const IS_PROD = process.env.NODE_ENV === 'production'

interface IProps {
  css: any
  hydrationScript: any
}

const bodyStyles = {
  margin: '0px',
  fontFamily: 'SF Text',
}

class MyDocument extends Document<IProps> {
  static getInitialProps({ renderPage }: any) {
    const page = renderPage()
    const { css, hydrationScript } = extractStyles()
    const styles = flush()

    return {
      ...page,
      css,
      hydrationScript,
      styles,
    }
  }

  render() {
    const { css, hydrationScript } = this.props
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style dangerouslySetInnerHTML={{ __html: css }} />
          <link
            href="https://use.fontawesome.com/releases/v5.11.2/css/all.css"
            rel="stylesheet"
            integrity="sha384-KA6wR/X5RY4zFAHpv/CnoG2UW1uogYfdnP67Uv7eULvTveboZJg0qUpmJZb5VqzN"
            crossOrigin="anonymous"
          />
          <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />

          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-152381000-1" />

          {/* Segment (This should be the last time we have to add this) */}
          {IS_PROD && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
                analytics.load("bGYPWVHTL0gbTVttnTo2FgY6oHp5z6gB");
                analytics.page();
                }}();
              `,
              }}
            />
          )}
        </Head>

        <body style={bodyStyles}>
          <Main {...this.props} />
          {hydrationScript}
          <NextScript />
        </body>
      </html>
    )
  }
}

export default MyDocument
