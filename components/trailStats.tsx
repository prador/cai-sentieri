import { getTrail } from 'lib/service'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Route, Trail } from 'types'
import { useStore } from 'store/dataStore'
import Carousel from 'components/carousel'
import Image from 'next/image'
import {Lang} from 'utils/lang'
import { Stat } from './route'

const TrailStats = ({ route }: { route: Route }) => {
  const [trail, setTrail] = useState<Trail | undefined>()
  const {pageLang, setPageLang} = useStore()
  // const pageLang = 'it'
  useEffect(() => {
    async function fetchTrail() {
      const trailx = await getTrail(route.slug)
      setTrail(trailx)
    }
    fetchTrail()
  }, [])
  return (
    <>
     <div className="md:pt-3 md:pl-3 col-span-3 md:col-span-1 grid grid-cols-3 md:flex md:flex-col rounded-md md:border md:border-gray-300 noprint">
          <Stat type={Lang[pageLang].routeInfo.zone} value={trail?.trailCategory} className="md:mb-2 md:pb-0 " />
          <Stat type={Lang[pageLang].routeInfo.difficulty} value={trail?.trailDifficulty} className="md:mb-2 md:pb-0 " />
          <Stat
            type={Lang[pageLang].routeInfo.distance}
            value={`${Math.round(route.distance * 10) / 10} km`}
            className="md:mb-2 md:pb-2 "
          />
          <Stat type={Lang[pageLang].routeInfo.time} value={trail?.trailTimeNeeded} className="md:mb-2 md:pb-0" />
          <Stat type={Lang[pageLang].routeInfo.elevation} value={`+ ${Math.round(route.elevation)} m`} className="mb-2" />
        </div>
    </>
  )
}

export default TrailStats
