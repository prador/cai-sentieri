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
  classes,
  legend,
}: {
  trails: Trail[]
  routes: Route[]
  lat: number
  lng: number
  category: string
  classes: any
  legend: boolean
}) => {
  const filteredSlugs = trails.filter(obj => obj.trailCategory === category).map(obj => obj.slug)

  // Find objects in routes with the same slugs as filteredSlugs
  const categoryTrails = routes.filter(obj => filteredSlugs.includes(obj.slug))

  return (
    <div
      className={`map-block block text-xl text-black h-[300px] ${
        category === 'all' ? 'md:h-[600px]' : 'md:h-[350px]'
      } relative w-full ${classes}`}
    >
      {legend ? <MapLegend trails={trails} category={category} /> : null}
      <MapBox trails={trails} routes={category === 'all' ? routes : categoryTrails} initialLat={lat} initialLng={lng} />
    </div>
  )
}

export default MapBlock
