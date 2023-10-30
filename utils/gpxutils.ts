// eslint-disable-next-line import/order
const { getPosts } = require('../lib/service')
const { fetchAPI } = require('../lib/base')

const fs = require('fs')
const path = require('path')
const toGeoJson = require('@mapbox/togeojson')
const turflength = require('@turf/length').default
const xmldom = require('xmldom')
const { lineString } = require('@turf/helpers')
const met = require('../data/meta')

// eslint-disable-next-line consistent-return
// async function fetchTrails(): Promise<any> {
//   try {
//     const result = await getTrails(100)
//     console.log('Data fetched and saved:', result);
//     return result.json()
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// }
async function getTrails(first): Promise<any> {
  const data = await fetchAPI(
    `query WpTrails {
      trails (first: 500) {
        nodes {
          title(format: RENDERED)
          uri
          slug
          trailLocation(format: RENDERED)
          trailNumber(format: RENDERED)
          trailId
          trailCategory(format: RENDERED)
          trailTimeNeeded
          trailSubdescription(format: RENDERED)
          trailDescription(format: RENDERED)
          trailDifficulty(format: RENDERED)
          trailMapGprxFile {
            node {
              mediaItemUrl
            }
          }
          galleryImages {
            nodes {
              mediaItemUrl
            }
          }
          imageLinkImage {
            node {
              mediaItemUrl
            }
          }
          imageLinkTitle(format: RENDERED)
          imageLinkUrl(format: RENDERED)
          pathColor
          pathPoint {
            nodes {
              pointLat
              pointName
              pointLng
              pointDescription
              pointImage {
                node {
                  mediaItemUrl
                }
              }
            }
          }
        }
      }
    }`,
    {
      variables: {
        first,
      },
    },
  )

  return data?.trails?.nodes
}

const ROUTES_PATH = path.join(process.cwd(), 'public', 'gpx')

// routeFilePaths is the list of all gpx files inside the ROUTES_PATH directory
const routeFilePaths = fs
  .readdirSync(ROUTES_PATH)
  // Only include gpx files
  .filter(p => /\.gpx?$/.test(p))

const routes = routeFilePaths.map(filePath => {
  const source = new xmldom.DOMParser().parseFromString(fs.readFileSync(path.join(ROUTES_PATH, filePath), 'utf8'))
  const slug = filePath.replace('.gpx', '')
  const metadata = met.meta[slug]
  const pathPoints: any = getTrails(500)
  const geoJson = toGeoJson.gpx(source)

  console.log(pathPoints)
  // Calculate distance using geoJson
  const distance = turflength(geoJson)

  // Calculate total distance per coordinate & elevation gain
  const { coordinates } = geoJson.features[0].geometry
  let totalDistance = 0
  let elevation = 0
  coordinates.forEach((currentCoordinate, i) => {
    /* Get each coordinate pair */
    const nextCoordinate = coordinates[i + 1]

    if (!nextCoordinate) {
      // Last coordinate, nothing more to do
      return
    }

    /* Convert coordinate pair to a lineString and measure with @turf/length */
    const line = lineString([
      [currentCoordinate[0], currentCoordinate[1]],
      [nextCoordinate[0], nextCoordinate[1]],
    ])
    const newDistance = turflength(line)

    /* Add distance to total */
    totalDistance += newDistance

    /* First coordinate starts at 0km */
    if (i === 0) {
      currentCoordinate.push(0)
    }
    /* Add the new total distance to each coordinate */
    nextCoordinate.push(totalDistance)

    /* Calculate elevation gain */
    const elevationDifference = nextCoordinate[2] - currentCoordinate[2]
    if (elevationDifference > 0) elevation += elevationDifference
  })

  /* Add optional points of interest as features to the geojson */
  // if (metadata?.points) {
  //   metadata.points.forEach((point, i) => {
  //     const { lat, lng, description,image } = point
  //     geoJson.features.push({
  //       type: 'Feature',
  //       properties: {
  //         id: `point-${i}`,
  //         description,
  //         // image,
  //         icon: 'pin',
  //       },
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [lng, lat],
  //       },
  //     })
  //   })
  // }

  return {
    distance: distance || null,
    elevation: elevation || null,
    geoJson: geoJson || null,
    id: slug,
    slug,
    // pathPoints: pathPoints || null,

    color: metadata?.color || 'red',
    description: metadata?.description || null,
    rating: metadata?.rating || null,
    location: metadata?.location || null,
    type: metadata?.type || 'run',
    added: metadata?.added || null,
    author: metadata?.author || null,
    coordinates: coordinates || null,
  }
})

module.exports = { routes }
