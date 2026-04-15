import React, { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
// Components
import Route from '../../components/route'
import Select from '../../components/select'
import MapBox from '../../components/mapbox'
import { useIsSmall } from '../../utils/hooks'

// Types
import { Routes, Trail } from '../../types'
import { getPosts, getTrails } from '../../lib/service'
import { useRouter } from 'next/router'
import MapBlock from 'components/mapblock'
import { TrailList } from 'components/trailslist'

// Data
const gpxUtils = require('../../utils/gpxutils.ts')

// Initial map
// TODO: Fit to bounds of all routes
const lng = 8.98050337530213
const lat = 44.81711298954641
// const zoom = 9

function ValCurone({ trails, routes }: { trails: Trail[]; routes: Routes }) {
  return (
    <div className="pt-3 container">
      {/* <div className="block text-xl text-black h-[300px] relative w-full">
        <MapBox routes={routes} initialLat={lat} initialLng={lng} />
      </div> */}
      <header className="text-center my-8">
        <h1 className="px-5 py-1 mb-0 text-2xl md:text-3xl font-bold text-center text-forest-green-700">Val Curone</h1>
      </header>
      <section>
        <MapBlock trails={trails} routes={routes} lat={lat} lng={lng} category="Val Curone" classes="m-0" legend={false} />
        <div className="pt-6 flex flex-col md:grid md:grid-cols-3 gap-6 space-y-6 md:space-y-0 ">
          {trails
            ?.filter(obj => obj.trailCategory === 'Val Curone')
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((trail: Trail, index: number) => {
              return (
                <div className="border rounded-lg sentieri-aumentati-card bg-white shadow-lg" key={index}>
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
              )
            })}
        </div>
      </section>
    </div>
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

export default ValCurone
