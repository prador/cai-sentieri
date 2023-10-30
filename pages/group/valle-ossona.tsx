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
      <header className="py-3 text-center">
        <h2 className="text-3xl text-bold">Valle Ossona</h2>
      </header>
      <section>
        <MapBlock trails={trails} routes={routes} lat={lat} lng={lng} category="Valle Ossona" />
        <div className="my-6 flex flex-col">
          {trails
            ?.filter(obj => obj.trailCategory === 'Valle Ossona')
            .map((trail: Trail) => {
              return (
                <div className="bg-gray-200 hover:bg-gray-300 px-2 hover:px-4 py-2 mb-2 rounded-lg">
                  <Link href={`/trails/${trail.slug}`}>
                    <div>{trail.title}</div>
                  </Link>
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
