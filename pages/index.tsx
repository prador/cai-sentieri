import React, { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Components
import Route from '../components/route'
import Select from '../components/select'
import MapBox from '../components/mapbox'
import { useIsSmall } from '../utils/hooks'

// Types
import { Routes, Trail } from '../types'
import { getPosts, getTrails } from '../lib/service'
import MapLegend from 'components/maplegend'
import TrailsList from 'components/trailslist'
import WeatherCard from 'components/weatherCard'

// Data
const gpxUtils = require('../utils/gpxutils.js')

// Initial map
// TODO: Fit to bounds of all routes
const lng = 8.94050337530213
const lat = 44.91711298954641
// const zoom = 11

function Home({ routes, posts, trails }: { routes: Routes; posts: any; trails: Trail[] }) {
  const [showMap, setShowMap] = useState(true)

  return (
    <motion.div
      className="min-h-screen pb-12 mt-4"
      initial={{ x: 430 }}
      animate={{ x: 0 }}
      transition={{ ease: 'easeOut', duration: 0.2 }}
      onAnimationComplete={() => setShowMap(true)}
    >
      <div className="block text-xl text-black h-[300px] md:h-[600px] my-6 relative w-full">
        <MapLegend trails={trails} category="all" />
        {showMap && <MapBox routes={routes} initialLat={lat} initialLng={lng} />}
      </div>
      <WeatherCard data={undefined} />
      <section className="container">{/* <TrailsList trails={trails} /> */}</section>
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
