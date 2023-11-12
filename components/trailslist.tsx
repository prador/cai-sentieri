import Link from 'next/link'
import type { Trail } from '../types'

const TrailList = ({ trails, group }: { trails: Trail[]; group?: string }) => {
  return (
    <>
      {trails
        ?.filter(obj => obj.trailCategory === group)
        .map((trail: Trail, index: number) => {
          return (
            <Link href={trail.href ? trail.href : `/trails/${trail.slug}`} key={index}>
              <div>{trail.title}</div>
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

export { TrailsList, TrailList }
