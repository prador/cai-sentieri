import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />

          <meta name="application-name" content="Cai Senitieri App" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Cai Sentieri" />
          <meta name="description" content="Cai Sentieri is a trails app" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="/icons/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />

          <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
          <link rel="shortcut icon" href="/favicon.ico" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://sentieri.caitortona.net/" />
          <meta name="twitter:title" content="Cai Sentieri" />
          <meta name="twitter:description" content="Cai Sentieri is a trails app" />
          <meta name="twitter:image" content="https://sentieri.caitortona.net/icons/android-chrome-192x192.png" />
          <meta name="twitter:creator" content="@DavidWShadow" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Cai Sentieri" />
          <meta property="og:description" content="Cai Sentieri is a trails app" />
          <meta property="og:site_name" content="Cai Sentieri" />
          <meta property="og:url" content="https://sentieri.caitortona.net/" />
          <meta property="og:image" content="https://sentieri.caitortona.net/icons/apple-touch-icon.png" />

          <link href="https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css" rel="stylesheet" />
        </Head>
        <body className="antialiased bg-white text-black font-nunito">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
