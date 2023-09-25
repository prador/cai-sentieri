import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { ReactNode, useEffect, useState } from 'react'
import Footer from './footer'
import Navbar from './navbar'
import NewsEvents from './newsevents'
import Contact from './contact'

interface Props {
  children: ReactNode
}
declare global {
  interface Window {
    workbox: any
  }
}
export default function Layout({ children }: Props) {
  const router = useRouter()

  // console.log(router.push('/login'))
  return (
    <>
      <Navbar />
      <main id="skip" className="pb-16 min-h-[50vh]">
        {children}
      </main>
      <NewsEvents />
      <Contact />
      <Footer />
    </>
  )
}
