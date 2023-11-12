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
const lng = 8.94050337530213
const lat = 44.91711298954641
// const zoom = 11

function ValCurone({ trails, routes }: { trails: Trail[]; routes: Routes }) {
  return (
    <div className="pt-3 container">
      {/* <div className="block text-xl text-black h-[300px] relative w-full">
        <MapBox routes={routes} initialLat={lat} initialLng={lng} />
      </div> */}
      <header className="py-3 text-center">
        <h2 className="text-3xl text-bold">Val Curone</h2>
      </header>
      <section>
        <MapBlock trails={trails} routes={routes} lat={lat} lng={lng} category="Val Curone" />
        <div className="my-6 flex flex-col">
          <TrailList trails={trails} group="Val Curone" />
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

export default ValCurone
