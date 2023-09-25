import Link from 'next/link'
import type { Trail } from '../types'

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

export default TrailsList
