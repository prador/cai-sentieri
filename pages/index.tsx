import React, { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

// Components
import Route from '../components/route'
import Select from '../components/select'
import MapBox from '../components/mapbox'
import { useIsSmall } from '../utils/hooks'

// Types
import { Routes, Trail } from '../types'
import { getPosts, getTrails } from '../lib/service'
import MapLegend from 'components/maplegend'
import WeatherCard from 'components/weatherCard'
import NewsEvents from 'components/newsevents'

// Data
const gpxUtils = require('../utils/gpxutils.ts')

// Initial map
// TODO: Fit to bounds of all routes
const lng = 8.94050337530213
const lat = 44.91711298954641
// const zoom = 11

function Home({ routes, posts, trails }: { routes: Routes; posts: any; trails: Trail[] }) {
  const [showMap, setShowMap] = useState(true)

  return (
    <motion.div
      className=""
      initial={{ x: 430 }}
      animate={{ x: 0 }}
      transition={{ ease: 'easeOut', duration: 0.2 }}
      onAnimationComplete={() => setShowMap(true)}
    >
      <div className="block text-xl text-black h-[300px] md:h-[60vh] mb-6 relative w-full">
        <MapLegend trails={trails} category="all" />
        {showMap && <MapBox trails={trails} routes={routes} initialLat={lat} initialLng={lng} />}
      </div>
      <div className="container pt-6 flex flex-col md:grid md:grid-cols-3 gap-6 space-y-6 md:space-y-0">
        <Link href="/progetto" className="border rounded-lg sentieri-aumentati-card bg-white shdaow-lg">
          <div className="flex relative h-32 md:h-48 w-full rounded-lg col-span-2 mr-4">
            <div className="mb-2 mt-4 rounded-lg font-bold absolute z-50 left-3 bottom-1 text-white">
              <h2 className="text-2xl">I Sentieri del Toronese</h2>
              <p className="mt-2">(Il progetto)</p>
            </div>
            <div className="relative w-full rounded-lg">
              <div className="relative h-full w-full z-10 bg-gradient-to-b from-muted/50 to-primary rounded-lg" />
              <Image
                src="https://sentieri-admin.caitortona.net/wp-content/uploads/daniela-kokina-hOhlYhAiizc-unsplash.jpg"
                fill
                alt=""
                className="rounded-lg flex flex-grow object-cover w-full"
              />
            </div>
          </div>
        </Link>
        <Link href="/sentieri-aumentati" className="border rounded-lg sentieri-aumentati-card bg-white shdaow-lg">
          <div className="flex relative h-32 md:h-48 w-full rounded-lg col-span-2 mr-4">
            <div className="mb-2 mt-4 rounded-lg font-bold absolute z-50 left-3 bottom-1 text-white">
              <h2 className="text-2xl">I Sentieri Aumentati</h2>
              <p className="mt-2">description</p>
            </div>
            <div className="relative w-full rounded-lg">
              <div className="relative h-full w-full z-10 bg-gradient-to-b from-muted/50 to-primary rounded-lg" />
              <Image
                src="https://sentieri-admin.caitortona.net/wp-content/uploads/daniela-kokina-hOhlYhAiizc-unsplash.jpg"
                fill
                alt=""
                className="rounded-lg flex flex-grow object-cover w-full"
              />
            </div>
          </div>
        </Link>
        <Link href="/contatti" className="border rounded-lg sentieri-aumentati-card bg-white shdaow-lg">
          <div className="flex relative h-32 md:h-48 w-full rounded-lg col-span-2 mr-4">
            <div className="mb-2 mt-4 rounded-lg font-bold absolute z-50 left-3 bottom-1 text-white">
              <h2 className="text-2xl">Quanto tempo hai?</h2>
              <p className="mt-2">description</p>
            </div>
            <div className="relative w-full rounded-lg">
              <div className="relative h-full w-full z-10 bg-gradient-to-b from-muted/50 to-primary rounded-lg" />
              <Image
                src="https://sentieri-admin.caitortona.net/wp-content/uploads/daniela-kokina-hOhlYhAiizc-unsplash.jpg"
                fill
                alt=""
                className="rounded-lg flex flex-grow object-cover w-full"
              />
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const trails = await getTrails(100)
    return {
      props: {
        routes: gpxUtils.routes.sort((a, b) => new Date(b.added).valueOf() - new Date(a.added).valueOf()),
        trails: trails || [],
      },
      revalidate: 86400,
    }
  } catch (e) {
    console.warn('Could not fetch trails:', e)
    return {
      props: {
        routes: gpxUtils.routes.sort((a, b) => new Date(b.added).valueOf() - new Date(a.added).valueOf()),
        trails: [],
      },
      revalidate: 86400,
    }
  }
}

export default Home
