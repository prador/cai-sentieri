import { Route, Trail } from 'types'
import MapBox from './mapbox'
import MapLegend from './maplegend'
import { useEffect } from 'react'
import { getTrails } from 'lib/service'

const MapBlock = ({
  trails,
  routes,
  lat,
  lng,
  category,
}: {
  trails: Trail[]
  routes: Route[]
  lat: number
  lng: number
  category: string
}) => {
  const filteredSlugs = trails.filter(obj => obj.trailCategory === category).map(obj => obj.slug)

  // Find objects in routes with the same slugs as filteredSlugs
  const cateogoryTrails = routes.filter(obj => filteredSlugs.includes(obj.slug))

  return (
    <div className="block text-xl text-black h-[300px] md:h-[600px] my-6 relative w-full">
      <MapLegend trails={trails} category={category} />
      <MapBox routes={category === 'all' ? routes : cateogoryTrails} initialLat={lat} initialLng={lng} />
    </div>
  )
}

export default MapBlock
