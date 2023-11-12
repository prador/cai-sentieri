import React, { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
// Components
import Route from '../../components/route'
import Select from '../../components/select'
import MapBox from '../../components/mapbox'
import { useIsSmall, useTrailDetails } from '../../utils/hooks'

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
const lng = 8.94050337530213
const lat = 44.91711298954641
// const zoom = 11

function ValleOssona({ trails, routes }: { trails: Trail[]; routes: Routes }) {
  return (
    <div className="pt-3 container">
      {/* <div className="block text-xl text-black h-[300px] relative w-full">
        <MapBox routes={routes} initialLat={lat} initialLng={lng} />
      </div> */}
      <header className="text-center my-8">
        <h1 className="px-5 py-1 mb-0 text-2xl md:text-3xl font-bold text-center text-sushi-700">Valle Ossona</h1>
      </header>
      <section>
        <MapBlock trails={trails} routes={routes} lat={lat} lng={lng} category="Valle Ossona" classes="m-0" legend={false} />
        <div className="pt-6 flex flex-col md:grid md:grid-cols-3 gap-6 space-y-6 md:space-y-0 ">
          {trails
            ?.filter(obj => obj.trailCategory === 'Valle Ossona')
            .map((trail: Trail, index: number) => {
              return (
                <div className="border rounded-lg sentieri-aumentati-card bg-white shadow-lg">
                  <div className="md:col-span-3">
                    <MapBlock trails={[trail]} routes={routes} lat={lat} lng={lng} category="Valle Ossona" classes="m-0" legend={false} />
                  </div>

                  <div className="p-4">
                    <h2 className="text-xl text-sushi-600 font-bold">
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
  const trails = await getTrails(100)

  return {
    props: {
      routes: gpxUtils.routes.sort((a, b) => new Date(b.added).valueOf() - new Date(a.added).valueOf()),
      trails: trails || null,
    },
    revalidate: 3600,
  }
}

export default ValleOssona
