// pages/sentieri-aumentati/index.tsx

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

import { navSentieriAumentati } from 'utils/nav'
import { Lang } from 'utils/lang'
import { useStore } from 'store/dataStore'
// Data
const gpxUtils = require('../../utils/gpxutils.ts')

// Initial map
// TODO: Fit to bounds of all routes
const lng = 8.94050337530213
const lat = 44.91711298954641
// const zoom = 11

function Home({ routes, posts, trails }: { routes: Routes; posts: any; trails: Trail[] }) {
  const [showMap, setShowMap] = useState(true)
  const {pageLang, setPageLang} = useStore()
  const filteredSlugs = trails.filter(trail => navSentieriAumentati.some(navTrail => navTrail.slug === trail.slug))

  // Find objects in routes with the same slugs as filteredSlugs
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
          <h1 className="px-5 py-1 mb-0 text-2xl md:text-3xl font-bold text-center text-forest-green-700">Sentieri Aumentati</h1>
        </header>
    <div className="text-center my-8">
      <p>{Lang[pageLang].sentieriAumentati.desc}</p>
    </div>
        <div className="pt-6 flex flex-col md:grid md:grid-cols-3 gap-6 space-y-6 md:space-y-0">
          {filteredSlugs.map(trail => (
            <div className="border rounded-lg sentieri-aumentati-card bg-white shdaow-lg">
              <div className="md:col-span-3">
                <MapBlock trails={[trail]} routes={routes} lat={lat} lng={lng} category="Val Curone" classes="m-0" legend={false} />
              </div>
              <div className="p-4">
                <h2 className="text-xl text-forest-green-600 font-bold">
                  <Link href={`/trails/${trail?.slug}`}>{trail?.title}</Link>
                </h2>
                <p className="mt-4">
                  {trail?.trailLocation} - {trail?.trailNumber}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
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
