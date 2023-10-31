import React, { useEffect, useState } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import colors from 'tailwindcss/colors' // eslint-disable-line
import { ArrowDownTrayIcon, PrinterIcon } from '@heroicons/react/20/solid'

// Components
import Button from '../../components/button'
import { Stat } from '../../components/route'
import Chart from '../../components/chart'

// Types
import type { Route, Trail } from '../../types'

// Hooks
import { useIsSmall } from '../../utils/hooks'

// Utils
import MapBox from '../../components/mapbox'
import { getPosts, getTrail, getTrails } from '../../lib/service'
import Carousel from 'components/carousel'
import MapLegend from 'components/maplegend'

// Data
const gpxUtils = require('../../utils/gpxutils.ts')

type RoutePageProps = { route: Route; initialLat: number; initialLng: number; trails: Trail[]; trail: Trail }

function RoutePage({ route, initialLat, initialLng, trails, trail }: RoutePageProps) {
  const [showMap, setShowMap] = useState(true)
  if (!route) {
    return null
  }
  const statBoxClassName = 'justify-center p-2 border rounded border-blue-500 text-blue-600'

  // console.log(trail)

  return (
    <motion.div
      className="min-h-screen pb-12 mt-4"
      initial={{ x: 430 }}
      animate={{ x: 0 }}
      transition={{ ease: 'easeOut', duration: 0.2 }}
      onAnimationComplete={() => setShowMap(true)}
    >
      {route && (
        <>
          <div className="block text-xl text-black  h-[300px] md:h-[60vh] mx-4 relative my-6">
            <MapLegend trails={trails} category="all" />
            {showMap && <MapBox trails={[trail]} routes={[route]} initialLat={initialLat} initialLng={initialLng} />}
          </div>
          <div className="container">
            <header className="text-center mb-8">
              <h1 className="px-5 py-1 mb-0 text-3xl font-bold text-center text-black">{trail?.title}</h1>
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
                <ul className="grid grid-cols-3 md:grid-cols-1 gap-2 mx-4 mb-6">
                  <Stat type="Zona" value={trail?.trailCategory} className="mb-2 pb-2 md:border-b" />
                  <Stat type="Difficoltà" value={trail?.trailDifficulty} className="mb-2 pb-2 md:border-b" />
                  <Stat type="Lunghezza" value={`${Math.round(route.distance * 10) / 10} km`} className="mb-2 pb-2 md:border-b" />
                  <Stat type="Tempo" value={trail?.trailTimeNeeded} className="mb-2 pb-2 md:border-b" />
                  <Stat type="Elevation" value={`${Math.round(route.elevation)} m`} className="mb-2" />

                  <div
                    className={`col-span-3 md:col-span-1 grid grid-cols-2 md:flex md:flex-col md:${statBoxClassName} border-blue-500 noprint`}
                  >
                    <li>
                      <a
                        href={`/gpx/${route?.slug}.gpx`}
                        download
                        target="_blank"
                        rel="noreferrer"
                        className="cursor-pointer flex gap-2 items-center py-2"
                      >
                        <div className="h-4 w-4">
                          <ArrowDownTrayIcon />
                        </div>
                        Scarica la traccia .gprx
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
                        Print Page
                      </button>
                    </li>
                    <div className="text-gray-500 mt-2 text-sm col-span-2">Fonte Provincia di Alessandria</div>
                  </div>
                </ul>
              </div>
              <div className="col-span-1 sm:col-span-6">
                <div className="mx-4 p-3 mb-4 border rounded border-gray-400">
                  <Chart coordinates={route.geoJson.features[0].geometry.coordinates} />
                </div>
                {trail.trailSubdescription && (
                  <div
                    className="mx-4 mb-4 text-2xl leading-relaxed text-black"
                    dangerouslySetInnerHTML={{ __html: trail.trailSubdescription }}
                  />
                )}
                {trail.trailDescription && (
                  <div
                    className="mx-4 mb-6 leading-relaxed whitespace-pre-wrap text-black md:columns-2"
                    dangerouslySetInnerHTML={{ __html: trail.trailDescription }}
                  />
                )}

                {trail.imageLinkTitle && (
                  <Link target="_blank" rel="noreferrer" href={trail?.imageLinkUrl}>
                    <div className="w-full h-48 mb-8 relative flex items-center justify-center">
                      <Image
                        src={trail?.imageLinkImage?.node?.mediaItemUrl}
                        fill
                        style={{ objectFit: 'cover' }}
                        alt={trail?.imageLinkTitle}
                      />
                      <span className="absolute z-10 bg-white px-5 py-2 text-lg">{trail?.imageLinkTitle}</span>
                    </div>
                  </Link>
                )}

                {trail.galleryImages.nodes.length > 0 && (
                  <div className="mt-8">
                    <Carousel slideUrls={trail.galleryImages.nodes} />
                    <div className="mt-4 text-gray-500">
                      Fonte immagini{' '}
                      <Link className="text-blue-500 font-bold underline" href="https://www.provincia.alessandria.it/sentieri/">
                        Provincia di Alessandria
                      </Link>{' '}
                      & Archivio Fotografico CAI Tortona{' '}
                    </div>
                  </div>
                )}
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
  const trails = await getTrails(100)
  const paths = trails.map(route => ({ params: { slug: route.slug } }))
  // const paths = gpxUtils.routes.map(route => ({ params: { slug: route.slug } }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async context => {
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
    revalidate: 3600,
  }
}
