// pages/trails/[slug].tsx

import React, { useEffect, useState } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import colors from 'tailwindcss/colors' // eslint-disable-line
import { ArrowDownTrayIcon, PrinterIcon } from '@heroicons/react/20/solid'
import {Lang} from 'utils/lang'
// Components
import Button from '../../components/button'
import { Stat } from '../../components/route'
import Chart from '../../components/chart'
import TrailContent from '../../components/trailContent'
import TrailStats from '../../components/trailStats'

// Types
import type { Route, Trail } from '../../types'

// Hooks
import { useIsSmall } from '../../utils/hooks'

// Utils
import MapBox from '../../components/mapbox'
import { getPosts, getTrail, getTrails } from '../../lib/service'
import Carousel from 'components/carousel'
import MapLegend from 'components/maplegend'
import WeatherCard from 'components/weatherCard'
import { useStore } from 'store/dataStore'

// Data
const gpxUtils = require('../../utils/gpxutils.ts')

type RoutePageProps = { route: Route; initialLat: number; initialLng: number; trails: Trail[]; trail: Trail }

function RoutePage({ route, initialLat, initialLng, trails, trail }: RoutePageProps) {
  const [showMap, setShowMap] = useState(true)
  const {pageLang, setPageLang} = useStore()
  // const pageLang = 'it'
  if (!route) {
    return null
  }
  const statBoxClassName = 'justify-center px-2 border rounded border-forest-green-400 text-forest-green-600'

  // console.log(trail)
  // console.log(trail.translation)
  return (
    <motion.div
      className="min-h-screen pb-12"
      initial={{ y: 430 }}
      animate={{ y: 0 }}
      transition={{ ease: 'easeOut', duration: 0.3 }}
      onAnimationComplete={() => setShowMap(true)}
    >
      {route && (
        <>
          <div className="block text-xl relative text-black h-[50vh] md:h-[60vh] m-0 mb-4 md:mx-4 md:my-6">
            <div className="hidden md:block">
              <MapLegend trails={trails} category="all" />
            </div>
            {showMap && <MapBox trails={[trail]} routes={[route]} initialLat={initialLat} initialLng={initialLng} />}
          </div>
          <div className="container">
            <header className="text-center mb-8">
              <h1 className="px-5 py-1 mb-0 text-2xl md:text-3xl font-bold text-center text-black">{pageLang === "it" ? `${trail?.title}` : `${trail?.translation.title}`}</h1>
              {(trail.trailLocation || trail.trailCategory === 'swimrun') && (
                <div className="flex items-center justify-center">
                  {route.location && (
                    <div className="flex items-center justify-center text-gray-600 text-xl ">
                      <span className="font-semibold tracking-wide uppercase">{trail?.trailLocation}</span>
                      <span className="text-base font-semibold tracking-wide leading-relaxed uppercase trail-flag px-5 ml-3 border">
                        {trail?.trailNumber}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </header>
            <div className="grid grid-cols-1 md:grid-cols-8">
              <div className="col-span-1 md:col-span-2">
                <ul className="grid grid-cols-3 md:grid-cols-1 gap-3 md:gap-4 md:mx-4 mb-4">
                 <TrailStats route={route} />
                  <div className={`col-span-3 md:col-span-1 grid grid-cols-2 md:flex md:flex-col md:${statBoxClassName} noprint`}>
                    <li>
                      <a
                        href={`/gpx/${route?.slug}.gpx`}
                        download
                        target="_blank"
                        rel="noreferrer"
                        className="cursor-pointer flex gap-2 items-start py-2"
                      >
                        <div className="h-4 w-4 pt-1">
                          <ArrowDownTrayIcon />
                        </div>
                        {Lang[pageLang].routeInfo.downloadFile}
                      </a>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="cursor-pointer flex gap-2 items-center py-2"
                        onClick={() => {
                          window.print()
                        }}
                      >
                        <div className="h-4 w-4">
                          <PrinterIcon />
                        </div>
                        {Lang[pageLang].routeInfo.printPage}
                      </button>
                    </li>
                    <div className="text-gray-500 mt-2 text-sm col-span-2">{Lang[pageLang].routeInfo.imageSrc}</div>
                  </div>
                </ul>
                <div className="md:mx-4 mb-4 hidden md:block">
                  <WeatherCard data={undefined} />
                </div>
              </div>
              <div className="col-span-1 sm:col-span-6">
                <div className="md:mx-4 p-3 mb-4 border rounded border-gray-300">
                  <Chart coordinates={route.geoJson.features[0].geometry.coordinates} />
                </div>
                <TrailContent slug={route.slug}/>
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  )
}

export default RoutePage

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const trails = await getTrails(100)
    const paths = trails.map(route => ({ params: { slug: route.slug } }))
    return { paths, fallback: 'blocking' }
  } catch (e) {
    console.warn('Could not fetch trails for static paths:', e)
    return { paths: [], fallback: 'blocking' }
  }
}

export const getStaticProps: GetStaticProps = async context => {
  try {
    const trails = await getTrails(100)
    const route = gpxUtils.routes.find(x => x.slug === context.params.slug)
    const trail = trails.find(x => x.slug === context.params.slug)
    return {
      props: {
        initialLat: route?.geoJson?.features[0].geometry.coordinates[0][1] || null,
        initialLng: route?.geoJson?.features[0].geometry.coordinates[0][0] || null,
        route: route || null,
        trail: trail || null,
        trails,
      },
      revalidate: 86400, // 24h fallback — on-demand revalidation via /api/revalidate handles updates
    }
  } catch (e) {
    console.warn('Could not fetch trail data:', e)
    return { notFound: true }
  }
}