import React from 'react'
import { NextPageContext, NextPage, NextComponentType } from 'next'
import { ThemeProvider } from 'theming'
import NProgress from 'nprogress'
import Router from 'next/router'
import Head from 'next/head'

import '../reset.css'
import 'flexboxgrid/css/flexboxgrid.min.css'
import 'animate.css'

import { IStyle } from '../types'
// This is for the top loading bar on page change

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const defaultTheme: IStyle = {
  color: 'black',
  background: 'white',
}

const secondTheme: IStyle = {
  background: 'black',
  color: 'white',
}

interface IState {
  toggleTheme: boolean
  theme: any
}

interface IAppProps {
  pageProps: any
  Component: NextComponentType
}

class MyApp extends React.Component<IAppProps, IState> {
  static async getInitialProps({ Component, ctx }: { Component: NextPage; ctx: NextPageContext }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  constructor(props: IAppProps) {
    super(props)

    this.setTheme = this.setTheme.bind(this)

    this.state = {
      theme: defaultTheme,
      toggleTheme: true,
    }
  }

  setTheme() {
    this.setState(
      {
        toggleTheme: !this.state.toggleTheme,
      },
      () => {
        this.setState({
          theme: this.state.toggleTheme ? defaultTheme : secondTheme,
        })
      },
    )
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <title>WaitWho.is | Home</title>
        </Head>
        <ThemeProvider theme={this.state.theme}>
          <Component {...pageProps} setTheme={this.setTheme} />
        </ThemeProvider>
        <style jsx global>
          {`
            /** Light */
            @font-face {
              font-family: 'SF Text';
              font-weight: 200;
              src: url('/fonts/SF-UI-Text-Light.otf');
            }

            /** Regular */
            /* @font-face {
              font-family: 'SF Text';
              font-weight: 400;
              src: url('/fonts/SF-UI-Text-Regular.otf');
            } */

            #nprogress {
              pointer-events: none;
            }

            #nprogress .bar {
              background: #ecc795;

              position: fixed;
              z-index: 1031;
              top: 0;
              left: 0;

              width: 100%;
              height: 3px;
              border-top-right-radius: 2px;
              border-bottom-right-radius: 2px;
            }

            /* Fancy blur effect */
            #nprogress .peg {
              display: block;
              position: absolute;
              right: 0px;
              width: 100px;
              height: 100%;
              box-shadow: 0 0 10px #ecc795, 0 0 5px #ecc795;
              opacity: 1;

              -webkit-transform: rotate(3deg) translate(0px, -4px);
              -ms-transform: rotate(3deg) translate(0px, -4px);
              transform: rotate(3deg) translate(0px, -4px);
            }

            /* Remove these to get rid of the spinner */
            #nprogress .spinner {
              display: block;
              position: fixed;
              z-index: 1031;
              top: 15px;
              right: 15px;
              animation: none !important;
            }

            #nprogress .spinner-icon {
              width: 18px;
              height: 18px;
              box-sizing: border-box;

              border: solid 2px transparent;
              border-top-color: #ecc795;
              border-left-color: #77b6 ff;
              border-radius: 50%;

              -webkit-animation: nprogress-spinner 400ms linear infinite;
              animation: nprogress-spinner 400ms linear infinite;
            }

            .nprogress-custom-parent {
              overflow: hidden;
              position: relative;
            }

            .nprogress-custom-parent #nprogress .spinner,
            .nprogress-custom-parent #nprogress .bar {
              position: absolute;
            }

            @-webkit-keyframes nprogress-spinner {
              0% {
                -webkit-transform: rotate(0deg);
              }
              100% {
                -webkit-transform: rotate(360deg);
              }
            }
            @keyframes nprogress-spinner {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }

            *,
            *:before,
            *:after {
              box-sizing: border-box;
            }
          `}
        </style>
      </>
    )
  }
}

export default MyApp
