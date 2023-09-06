import { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'
// Components
import Route from 'components/route'
import Select from 'components/select'
import MapBox from 'components/mapbox'
import { useIsSmall } from 'utils/hooks'

// Types
import { Routes } from 'types'
import { getPosts } from '../lib/service'

// Data
const gpxUtils = require('../utils/gpxutils.js')

// Initial map
// TODO: Fit to bounds of all routes
const lng = 8.94050337530213
const lat = 44.91711298954641
// const zoom = 11

function Home({ routes, posts }: { routes: Routes; posts: any }) {
  const [sorting, setSorting] = useState('added')
  const [randomRouteSlug, setRandomRouteSlug] = useState('')
  const isSmall = useIsSmall()

  useEffect(() => {
    setRandomRouteSlug(routes[Math.floor(Math.random() * routes.length)]?.slug)
  }, [])

  const sortRoutes = (a, b) => {
    switch (sorting) {
      case 'alphabetically':
        return a.geoJson.features[0].properties.name.localeCompare(b.geoJson.features[0].properties.name, 'sv')
      case 'rating':
        return b.rating - a.rating
      case 'distance':
        return b.distance - a.distance
      case 'elevation':
        return b.elevation - a.elevation
      default:
        return new Date(b.added).valueOf() - new Date(a.added).valueOf()
    }
  }

  return (
    <div className="pt-3">
      <div className="block text-xl text-black h-[300px] relative w-full">
        <MapBox routes={routes} initialLat={lat} initialLng={lng} />
      </div>
      <header className="py-3 text-center">
        <h1 className="text-3xl text-bold">Home</h1>
      </header>
      <section>
        <div className="sticky top-0 z-10 flex justify-between px-5 py-4 -mx-5 bg-blur">
          {/* <h1 className="text-2xl font-bold text-black">All routes</h1> */}
          <div className="flex">
            {/* <Link
              href={`/${randomRouteSlug}`}
              title="Randomize route"
              className="flex items-center px-2 mr-2 transition-all border rounded border-primary bg-primary hover:border-primary-hover hover:cursor-default"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-[18px] h-auto"
              >
                <polyline points="16 3 21 3 21 8" />
                <line x1="4" y1="20" x2="21" y2="3" />
                <polyline points="21 16 21 21 16 21" />
                <line x1="15" y1="15" x2="21" y2="21" />
                <line x1="4" y1="4" x2="9" y2="9" />
              </svg>
            </Link> */}
            {/* <Select value={sorting} onChange={e => setSorting(e.target.value)}>
              <option value="added">Recently added</option>
              <option value="rating">Rating</option>
              <option value="distance">Distance</option>
              <option value="elevation">Elevation gain</option>
              <option value="alphabetically">Alphabetically</option>
            </Select> */}
          </div>
        </div>
        <ol className="pt-1">
          {routes.sort(sortRoutes).map(route => (
            <Route key={route.slug} route={route} />
          ))}
        </ol>
        <div className="my-6 flex flex-col">
          {posts.map((post: any) => {
            return (
              <div className="text-black mb-5">
                <p>{post.title}</p>
                <p>{post.slug}</p>
                <p>{post.content}</p>
                <p>{post.test.testtext}</p>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts(100)
  return {
    props: {
      routes: gpxUtils.routes.sort((a, b) => new Date(b.added).valueOf() - new Date(a.added).valueOf()),
      posts,
    },
    revalidate: 3600,
  }
}

export default Home
