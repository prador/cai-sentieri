import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import SEO from '../components/seo'
import { ThemeProvider } from 'next-themes'

import '../styles/globals.css'
import 'keen-slider/keen-slider.min.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'

// Hooks

import { MapProvider } from '../components/mapprovider'
import Navbar from '../components/navbar'
import Layout from 'components/layout'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter()
  const aside = useRef<HTMLElement>()

  useEffect(() => {
    const sidebar = aside.current
    if (sidebar) {
      sidebar.scrollTop = 0
    }
  }, [router])

  return (
    <ThemeProvider
      attribute="class"
      value={{
        light: 'light-theme',
        dark: 'dark-theme',
      }}
    >
      <MapProvider>
        <SEO />
        <Head>
          <meta name="viewport" content="width=device-width, user-scalable=no" />
        </Head>
        <main className="sm:h-screen w-screen">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </MapProvider>
    </ThemeProvider>
  )
}

export default MyApp
