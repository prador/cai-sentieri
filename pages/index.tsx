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
import { Routes, Trail, LinkCard } from '../types'
import { getPosts, getTrails, getPageBySlug, getHomeLinkCards } from '../lib/service'
import MapLegend from 'components/maplegend'
import WeatherCard from 'components/weatherCard'
import NewsEvents from 'components/newsevents'

// Data
const gpxUtils = require('../utils/gpxutils.ts')

// Initial map
// TODO: Fit to bounds of all routes
const lng = 8.96050337530213
const lat = 44.81711298954641
// const zoom = 11
function Home({ routes, posts, trails, page,linkCards }: { routes: Routes; posts: any; trails: Trail[], page: { content: string; acf?: any } | null, linkCards: LinkCard[]  }) {
  const [showMap, setShowMap] = useState(true)
  console.log(linkCards);

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
       {page?.content && (
        <div className="wp-block-post-content entry-content" 
            dangerouslySetInnerHTML={{ __html: page.content }} />
      )}  </div>
      <div className="container pt-6 flex flex-col md:grid md:grid-cols-3 gap-6 space-y-6 md:space-y-0">
        {linkCards
          .filter(card => card?.linkCardTitle)
          .map((card, index) => (
            <Link
              key={index}
              href={card?.linkCardLink?.url ?? '#'}
              className="border rounded-lg sentieri-aumentati-card bg-white shadow-lg"
            >
              <div className="flex relative h-32 md:h-48 w-full rounded-lg col-span-2 mr-4">
                <div className="mb-2 mt-4 rounded-lg font-bold absolute z-50 left-3 bottom-1 text-white">
                  <h2 className="text-2xl">{card.linkCardTitle}</h2>
                  {card.linkCardDescription && (
                    <p className="mt-2">{card.linkCardDescription}</p>
                  )}
                </div>
                <div className="relative w-full rounded-lg">
                  <div className="relative h-full w-full z-10 bg-gradient-to-b from-muted/50 to-primary rounded-lg" />
                  <img
                      src={card.linkCardImageUrl || "https://sentieri-admin.caitortona.net/wp-content/uploads/daniela-kokina-hOhlYhAiizc-unsplash.jpg"}
                      alt={card.linkCardImageAlt ?? ''}
                      className="rounded-lg object-cover w-full h-full absolute inset-0"
                    />
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </motion.div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const page = await getPageBySlug('home') // ← hardcode 'home' instead of params?.slug
    const trails = await getTrails(100)
    const linkCards = await getHomeLinkCards()
    return {
      props: {
        routes: gpxUtils.routes.sort((a, b) => new Date(b.added).valueOf() - new Date(a.added).valueOf()),
        trails: trails || [],
        linkCards: linkCards || [],
        page: page || null, // ← add fallback
      },
      revalidate: 86400,
    }
  } catch (e) {
    console.warn('Could not fetch trails:', e)
    return {
      props: {
        routes: gpxUtils.routes.sort((a, b) => new Date(b.added).valueOf() - new Date(a.added).valueOf()),
        trails: [],
        page: null, // ← was missing entirely in the catch block
      },
      revalidate: 86400,
    }
  }
}

export default Home
