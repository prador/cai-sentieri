import Link from 'next/link'
import type { Trail } from '../types'
import Image from 'next/image'

const NavImage = ({ href, title, image }: { href: string; title: string; image: string }) => {
  return (
    <Link className="flex relative h-28 w-full rounded-lg" href={href}>
      <div className="mb-2 mt-4 text-2xl rounded-lg font-bold absolute z-50 left-3 bottom-1 text-white">{title}</div>
      <div className="relative w-full rounded-lg">
        <div className="relative h-full w-full z-10 bg-gradient-to-b from-muted/50 to-primary rounded-lg" />
        <Image src={image} fill alt="" className="rounded-lg flex flex-grow object-cover w-full" />
      </div>
    </Link>
  )
}
const TrailList = ({ trails, group }: { trails: Trail[]; group?: string }) => {
  return (
    <>
      {trails
        ?.filter(obj => obj.trailCategory === group)
        .map((trail: Trail, index: number) => {
          return (
            <Link href={trail.href ? trail.href : `/trails/${trail.slug}`} key={index}>
              <div className="text-base text-gray-500">{trail.title}</div>
            </Link>
          )
        })}
    </>
  )
}

const TrailsList = ({ trails }: { trails: Trail[] }) => {
  return (
    <>
      <div className="my-6 flex flex-col">
        <h2 className="text-xl text-gray-500 font-bold">
          <Link href="group/val-curone">Val Curone</Link>
        </h2>
        {trails
          ?.filter(obj => obj.trailCategory === 'Val Curone')
          .map((trail: Trail) => {
            return (
              <div>
                <Link href={`trails/${trail.slug}`}>
                  <div>{trail.title}</div>
                </Link>
              </div>
            )
          })}
      </div>
      <div className="my-6 flex flex-col">
        <h2 className="text-xl text-gray-500 font-bold">
          <Link href="group/valle-ossona">Valle Ossona</Link>
        </h2>
        {trails
          ?.filter(obj => obj.trailCategory === 'Valle Ossona')
          .map((trail: Trail) => {
            return (
              <div className="text-black">
                <Link href={`trails/${trail.slug}`}>
                  <div>{trail.title}</div>
                </Link>
              </div>
            )
          })}
      </div>
      <div className="my-6 flex flex-col">
        <h2 className="text-xl text-gray-500 font-bold">
          <Link href="group/val-grue">Val Grue</Link>
        </h2>
        {trails
          ?.filter(obj => obj.trailCategory === 'Val Grue')
          .map((trail: Trail) => {
            return (
              <div className="text-black">
                <Link href={`trails/${trail.slug}`}>
                  <div>{trail.title}</div>
                </Link>
              </div>
            )
          })}
      </div>
    </>
  )
}

export { TrailsList, TrailList, NavImage }
