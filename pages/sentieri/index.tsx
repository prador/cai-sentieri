import React, { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Components
import Route from '../../components/route'
import Select from '../../components/select'
import MapBox from '../../components/mapbox'
import { useIsSmall } from '../../utils/hooks'

// Types
import { Routes, Trail } from '../../types'
import { getPosts, getTrails } from '../../lib/service'
import MapLegend from 'components/maplegend'
import MapBlock from 'components/mapblock'

// Data
const gpxUtils = require('../../utils/gpxutils.ts')

// Initial map
// TODO: Fit to bounds of all routes
const lng = 8.94050337530213
const lat = 44.91711298954641
// const zoom = 11

function Home({ routes, posts, trails }: { routes: Routes; posts: any; trails: Trail[] }) {
  const [showMap, setShowMap] = useState(true)

  return (
    <motion.div
      className="min-h-screen pb-12"
      initial={{ x: 430 }}
      animate={{ x: 0 }}
      transition={{ ease: 'easeOut', duration: 0.2 }}
      onAnimationComplete={() => setShowMap(true)}
    >
      <section className="container">
        <header className="text-center my-8">
          <h1 className="px-5 py-1 mb-0 text-2xl md:text-3xl font-bold text-center text-sushi-700">Sentieri Aumentati</h1>
        </header>

        <div className="pt-6 flex flex-col space-y-6">
          <div className="border border-red md:grid md:grid-cols-4 -mx-4 md:mx-4 rounded-lg">
            <div className="p-4">
              <h2 className="text-xl text-sushi-600 font-bold md:col-span-1">
                <Link href="/group/val-curone">Val Curone</Link>
              </h2>
              <p className="mt-4">Lorem ipsum</p>
            </div>
            <div className="md:col-span-3">
              <MapBlock trails={trails} routes={routes} lat={lat} lng={lng} category="Val Curone" classes="m-0" legend={false} />
            </div>
          </div>
          <div className="border border-red md:grid md:grid-cols-4 -mx-4 md:mx-4 rounded-lg">
            <div className="p-4">
              <h2 className="text-xl text-sushi-600 font-bold md:col-span-1">
                <Link href="/group/val-curone">Valle Ossona</Link>
              </h2>
              <p className="mt-4">Lorem ipsum</p>
            </div>
            <div className="md:col-span-3">
              <MapBlock trails={trails} routes={routes} lat={lat} lng={lng} category="Valle Ossona" classes="m-0" legend={false} />
            </div>
          </div>
          <div className="border border-red md:grid md:grid-cols-4 -mx-4 md:mx-4 rounded-lg">
            <div className="p-4">
              <h2 className="text-xl text-sushi-600 font-bold md:col-span-1">
                <Link href="/group/val-curone">Val Grue</Link>
              </h2>
              <p className="mt-4">Lorem ipsum</p>
            </div>
            <div className="md:col-span-3">
              <MapBlock trails={trails} routes={routes} lat={lat} lng={lng} category="Val Grue" classes="m-0" legend={false} />
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const trails = await getTrails(100)

  return {
    props: {
      routes: gpxUtils.routes.sort((a, b) => new Date(b.added).valueOf() - new Date(a.added).valueOf()),
      trails: trails || null,
    },
    revalidate: 3600,
  }
}

export default Home
