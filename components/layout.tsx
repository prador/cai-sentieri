import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { ReactNode, useEffect, useState } from 'react'
import Footer from './footer'
import Navbar from './navbar'
import NewsEvents from './newsevents'
import Contact from './contact'
import Splash from './splash'
import WeatherCard from './weatherCard'

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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])
  return (
    <div className="bg-slate-50">
      {loading ? (
        <Splash />
      ) : (
        <>
          <div className="w-full shadow-lg bg-white">
            <Navbar />
          </div>
          <main id="skip" className="pb-16 min-h-[50vh]">
            {children}
          </main>
          <section className="container flex flex-col md:grid grid-cols-3 gap-4">
            {/* <TrailsList trails={trails} /> */}
            <div className="col-span-1 md:col-span-2">
              <NewsEvents />
            </div>
            <div className="col-span-1">
              <WeatherCard data={undefined} />
            </div>
          </section>
          <Contact />
          <Footer />
        </>
      )}
    </div>
  )
}
