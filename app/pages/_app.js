import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import Head from 'next/head';
import OfflineSupport from '../components/OfflineSupport';

import createStore from '../store'

class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx })
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <link rel="manifest" href="/_next/static/manifest.json" />
          <link rel="icon" href="/static/favicon.ico" />
          <link rel="apple-touch-icon" sizes="57x57" href="/static/icons/apple/apple-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/static/icons/apple/apple-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/static/icons/apple/apple-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/static/icons/apple/apple-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/static/icons/apple/apple-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/static/icons/apple/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/static/icons/apple/apple-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/static/icons/apple/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/icons/apple/apple-icon-180x180.png" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        </Head>
        <OfflineSupport />
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withRedux(createStore)(withReduxSaga(MyApp))
