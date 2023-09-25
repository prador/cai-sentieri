import { useState, useEffect } from 'react'
import { getTrails } from 'lib/service'

const toGeoJson = require('@mapbox/togeojson')
const turflength = require('@turf/length').default
const xmldom = require('xmldom')
const { lineString } = require('@turf/helpers')
const met = require('../data/meta')

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => {
      setMatches(media.matches)
    }
    media.addListener(listener)
    return () => media.removeListener(listener)
  }, [matches, query])

  return matches
}

export function useIsSmall() {
  return useMediaQuery('(min-width: 640px)')
}

export function useTrailDetails() {
  const [trailsx, setTrailsx] = useState()

  useEffect(() => {
    async function fetchTrails() {
      const trails = await getTrails(100)
      setTrailsx(trails)
    }
    fetchTrails()

    
  }, [])

  const routes = trailsx?.map(trail => {
    // const source = new xmldom.DOMParser().parseFromString(fs.readFileSync(path.join(ROUTES_PATH, filePath), 'utf8'))
    const slug = trail?.slug
    const metadata = met.meta[slug]
    const sourceUrl = trail?.trailMapGprxFile?.node?.mediaItemUrl
    const source = trail?.trailMapGprxFile?.node?.mediaItemUrl
    const geoJson = toGeoJson.gpx((new DOMParser()).parseFromString(source, 'text/xml'));
    // const dom = (new DOMParser()).parseFromString(source, 'text/xml');
    // console.log((new DOMParser()).parseFromString(source, 'utf8'))
    // console.log(dom)
    // Calculate distance using geoJson
    const distance = turflength(geoJson)
  
    // Calculate total distance per coordinate & elevation gain
    // const { coordinates } = geoJson.features[0].geometry
    // let totalDistance = 0
    // let elevation = 0
    // coordinates.forEach((currentCoordinate, i) => {
    //   /* Get each coordinate pair */
    //   const nextCoordinate = coordinates[i + 1]
  
    //   if (!nextCoordinate) {
    //     // Last coordinate, nothing more to do
    //     return
    //   }
  
    //   /* Convert coordinate pair to a lineString and measure with @turf/length */
    //   const line = lineString([
    //     [currentCoordinate[0], currentCoordinate[1]],
    //     [nextCoordinate[0], nextCoordinate[1]],
    //   ])
    //   const newDistance = turflength(line)
  
    //   /* Add distance to total */
    //   totalDistance += newDistance
  
    //   /* First coordinate starts at 0km */
    //   if (i === 0) {
    //     currentCoordinate.push(0)
    //   }
    //   /* Add the new total distance to each coordinate */
    //   nextCoordinate.push(totalDistance)
  
    //   /* Calculate elevation gain */
    //   const elevationDifference = nextCoordinate[2] - currentCoordinate[2]
    //   if (elevationDifference > 0) elevation += elevationDifference
    // })
  
    /* Add optional points of interest as features to the geojson */
    if (metadata?.points) {
      metadata.points.forEach((point, i) => {
        const { lat, lng, description } = point
        geoJson.features.push({
          type: 'Feature',
          properties: {
            id: `point-${i}`,
            description,
            icon: 'pin',
          },
          geometry: {
            type: 'Point',
            coordinates: [lng, lat],
          },
        })
      })
    }
  
    return {
      distance,
      // elevation,
      geoJson,
      id: slug,
      slug,
      color: metadata?.color || 'red',
      description: trail?.trailDescription || null,
      rating: trail?.trailDifficulty || null,
      location: trail?.trailLocation || null,
      type: trail?.trailCategory || 'run',
      // coordinates,
    }
  })
  return trailsx
}

