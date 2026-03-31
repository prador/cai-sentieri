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
import { TrailList } from 'components/trailslist'

// Data
const gpxUtils = require('../../utils/gpxutils.ts')

// Initial map
// TODO: Fit to bounds of all routes
const lng = 8.94050337530213
const lat = 44.91711298954641
// const zoom = 11

function Home({ routes, posts, trails }: { routes: Routes; posts: any; trails: Trail[] }) {
  const [showMap, setShowMap] = useState(true)
  const groups = [
    {
      title: 'Val Curone',
      href: '/group/val-curone',
      description: 'This is a description for this trail group',
    },
    {
      title: 'Valle Ossona',
      href: '/group/valle-ossona',
      description: 'This is a description for this trail group',
    },
    {
      title: 'Val Grue',
      href: '/group/val-grue',
      description: 'This is a description for this trail group',
    },
  ]
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
          <h1 className="px-5 py-1 mb-0 text-2xl md:text-3xl font-bold text-center text-forest-green-700">Sentieri</h1>
        </header>

        <div className="pt-6 flex flex-col space-y-6">
          {groups.map(group => (
            <div className="border border-red md:grid md:grid-cols-4 md:mx-4 rounded-lg">
              <div className="p-4">
                <h2 className="text-xl text-forest-green-600 font-bold md:col-span-1">
                  <Link href={group.href}>{group.title}</Link>
                </h2>
                <p className="my-4">{group.description}</p>
                <div className='h-48 overflow-y-auto bg-slate-100 p-2 rounded-md'>
                <TrailList trails={trails} group={group.title} />
                </div>
              </div>
              <div className="md:col-span-3">
                <MapBlock trails={trails} routes={routes} lat={lat} lng={lng} category={group.title} classes="m-0" legend={false} />
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
