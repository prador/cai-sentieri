import React, { useState, useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker' // eslint-disable-line
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import type { Route, Routes, Trails } from '../../types'
import { useMapContext } from '../mapprovider'
import { paint, getHoverGeoJson, setAllLayersVisibility, flyToGeoJson } from './utils'
import { GeoIcon } from 'components/icons'

mapboxgl.workerClass = MapboxWorker
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

type MapBoxProps = {
  routes: Routes
  trails?: Trails
  initialLat?: number
  initialLng?: number
}

const lng = 9.94050337530213
const lat = 45.81711298954641
const zoom = 9.5

function getStyleForTheme(theme: string) {
  return theme === 'dark' ? 'mapbox://styles/mapbox/outdoors-v11' : 'mapbox://styles/mapbox/outdoors-v11'
}

function MapBox({ trails, routes, initialLng = lng, initialLat = lat }: MapBoxProps): JSX.Element {
  const { hoverCoordinate } = useMapContext()
  const [stateMap, setStateMap] = useState(null)
  const mapContainer = useRef(null)

  const router = useRouter()
  const queryRoute = router.query.slug
  const queryPoint = router.query.point

  const { resolvedTheme } = useTheme()

  useEffect(() => {
    let map: mapboxgl.Map
    let resizeObserver: ResizeObserver

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !map) {
            map = new mapboxgl.Map({
              container: mapContainer.current,
              style: getStyleForTheme(resolvedTheme),
              center: [initialLng, initialLat],
              zoom,
            })

            resizeObserver = new ResizeObserver(() => {
              map.resize()
            })
            resizeObserver.observe(mapContainer.current)

            // Add zoom/rotate control to the map
            map.addControl(new mapboxgl.NavigationControl())

            // Add fullscreen control to the map
            map.addControl(new mapboxgl.FullscreenControl())

            map.on('load', () => {
              map.resize()

              routes.forEach((route: Route) => {
                const {
                  slug,
                  color,
                  geoJson: { features },
                } = route
                const { pathColor, pathPoint } = trails?.find(trail => trail.slug === slug) ?? {}

                if (pathPoint?.nodes) {
                  pathPoint.nodes.forEach((point, i) => {
                    const { pointLat, pointLng, pointDescription, pointImage } = point
                    const pointImgUrl = pointImage?.node?.mediaItemUrl
                    if (pointLat !== '' && pointLng !== '') {
                      features.push({
                        type: 'Feature',
                        properties: {
                          id: `point-${i}`,
                          pointDescription,
                          pointImgUrl,
                          icon: 'pin',
                        },
                        geometry: {
                          type: 'Point',
                          coordinates: [pointLng, pointLat],
                        },
                      })
                    }
                  })
                }

                const { coordinates: startCoordinates } = features[0].geometry
                const { coordinates: endCoordinates } = features[features.length - 1].geometry

                map.addSource(slug, {
                  type: 'geojson',
                  data: route.geoJson,
                })

                // The path/route
                map.addLayer({
                  id: slug,
                  type: 'line',
                  source: slug,
                  layout: {
                    'line-join': 'round',
                    'line-cap': 'round',
                  },
                  paint: {
                    'line-color': pathColor || color,
                    'line-width': 4,
                  },
                })

                // Add a fill layer as source for hover
                map.addLayer({
                  id: `${slug}-fill`,
                  type: 'fill',
                  source: slug,
                  paint: {
                    'fill-color': 'transparent',
                    'fill-outline-color': 'transparent',
                  },
                })

                // Start point
                map.addLayer({
                  id: `${slug}-start`,
                  type: 'circle',
                  source: {
                    type: 'geojson',
                    data: {
                      type: 'Feature',
                      properties: {
                        description: 'Activity Start',
                      },
                      geometry: {
                        type: 'Point',
                        coordinates: startCoordinates[0],
                      },
                    },
                  },
                  paint: paint.start,
                })

                // End point
                map.addLayer({
                  id: `${slug}-end`,
                  type: 'circle',
                  source: {
                    type: 'geojson',
                    data: {
                      type: 'Feature',
                      properties: {
                        description: 'Activity End',
                      },
                      geometry: {
                        type: 'Point',
                        coordinates: endCoordinates.pop(),
                      },
                    },
                  },
                  paint: paint.end,
                })

                map.on('click', `${slug}-fill`, () => {
                  flyToGeoJson(map, route.geoJson)
                  if (!queryRoute) {
                    router.push(`/trails/${slug}`)
                  }
                })

                map.on('mouseenter', `${slug}-fill`, () => {
                  map.getCanvas().style.cursor = 'pointer'
                  map.setPaintProperty(slug, 'line-width', 6)
                })

                map.on('mouseleave', `${slug}-fill`, () => {
                  map.getCanvas().style.cursor = ''
                  map.setPaintProperty(slug, 'line-width', 4)
                })

                map.loadImage('/pin.png', (error, image) => {
                  if (error) throw error
                  if (!map.hasImage('pin')) {
                    map.addImage('pin', image)
                  }
                })

                // Add a layer showing points/markers
                map.addLayer({
                  id: `${slug}-points`,
                  type: 'symbol',
                  source: slug,
                  layout: {
                    'icon-image': ['get', 'icon'],
                    'icon-size': 0.1,
                    'icon-allow-overlap': true,
                  },
                })

                map.on('click', `${slug}-points`, e => {
                  const coordinates = e.features[0].geometry.coordinates.slice()
                  const { pointDescription, pointImgUrl } = e.features[0].properties

                  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
                  }

                  new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(`<div class="map-point"><img src="${pointImgUrl}" />${pointDescription}</div>`)
                    .addTo(map)
                })

                map.on('mouseenter', `${slug}-points`, () => {
                  map.getCanvas().style.cursor = 'pointer'
                })

                map.on('mouseleave', `${slug}-points`, () => {
                  map.getCanvas().style.cursor = ''
                })

                if (queryPoint) {
                  const qp = pathPoint?.nodes.at(Number(queryPoint) - 1)
                  const coordinates = [qp.pointLng, qp.pointLat]
                  const { pointDescription, pointImage } = qp

                  new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(
                      `<div class="map-point"><img src="${pointImage?.node?.mediaItemUrl}" />${pointDescription}</div>`,
                    )
                    .addTo(map)
                }
              })

              setStateMap(map)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (mapContainer.current) {
      observer.observe(mapContainer.current)
    }

    return () => {
      observer.disconnect()
      resizeObserver?.disconnect()
      map?.remove()
    }
  }, [])

  // Add geolocate control in separate hook, or it errors on ssr
  useEffect(() => {
    if (stateMap) {
      stateMap.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: false,
          },
          trackUserLocation: true,
          showUserHeading: true,
        }),
      )
    }
  }, [stateMap])

  // Handle showing/hiding layers & flying when route changes
  useEffect(() => {
    if (queryRoute && stateMap) {
      routes.forEach((route: Route) => {
        const { slug } = route
        if (slug === queryRoute) {
          setAllLayersVisibility(stateMap, slug, 'visible')
          flyToGeoJson(stateMap, route.geoJson)
        } else {
          setAllLayersVisibility(stateMap, slug, 'none')
        }
      })
    } else {
      routes.forEach((route: Route) => {
        const { slug } = route
        if (stateMap) {
          setAllLayersVisibility(stateMap, slug, 'visible', 'none')
          stateMap.flyTo({
            center: [initialLng, initialLat],
            essential: true,
            zoom,
          })
        }
      })
    }
  }, [queryRoute, stateMap])

  // Handle "current" circle showing/hiding when hovering graph
  useEffect(() => {
    if (stateMap) {
      if (queryRoute && hoverCoordinate) {
        const { slug } = routes.find(route => route.slug === queryRoute)
        const geoJson = getHoverGeoJson(hoverCoordinate)
        const hoverId = `${slug}-current`

        if (stateMap.getSource(hoverId)) {
          stateMap.getSource(hoverId).setData(geoJson)
        } else {
          stateMap.addLayer({
            id: hoverId,
            type: 'circle',
            source: {
              type: 'geojson',
              data: geoJson,
            },
            paint: paint.current,
          })
        }
      } else {
        routes.forEach((route: Route) => {
          const { slug } = route
          const hoverId = `${slug}-current`
          if (stateMap && stateMap.getSource(hoverId) && stateMap.getLayer(hoverId)) {
            stateMap.removeLayer(hoverId)
            stateMap.removeSource(hoverId)
          }
        })
      }
    }
  }, [stateMap, queryRoute, hoverCoordinate])

  const locationBtnClick = () => {
    const locationBtn: any = document.querySelector('.mapboxgl-ctrl-geolocate')
    if (locationBtn) {
      locationBtn?.click()
    }
  }

  return (
    <>
      <div className="absolute inset-0 rounded-lg" ref={mapContainer} />
      <div className="flex absolute z-[5] w-full mx-auto bottom-3 justify-center">
        <button
          type="button"
          className="flex text-base location-btn bg-white py-1 px-3 rounded-md items-center gap-2"
          onClick={() => locationBtnClick()}
          aria-label="Location button"
          style={{ boxShadow: '0 0 0 1px rgba(0,0,0,.1)' }}
        >
          Dove mi trovo
          <span className="h-5 w-5">
            <GeoIcon />
          </span>
        </button>
      </div>
    </>
  )
}

export default MapBox