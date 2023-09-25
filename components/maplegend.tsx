import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import type { Trail } from '../types'

const MapLegend = ({ trails, category }: { trails: Trail[]; category: string }) => {
  return (
    <div className="w-[200px] h-auto bg-white absolute z-10 right-12 top-2 rounded-md p-2 text-sm">
      <div>
        {category === 'all' || category === 'Val Curone' ? (
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg focus:outline-none focus-visible:ring">
                  <div className="font-bold text-lg">Val Curone</div>
                  <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-purple-500`} />
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm text-gray-500">
                  {trails
                    ?.filter(obj => obj.trailCategory === 'Val Curone')
                    .map((trail: Trail) => {
                      return (
                        <div>
                          <Link href={`/trails/${trail.slug}`}>
                            <div>{trail.title}</div>
                          </Link>
                        </div>
                      )
                    })}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ) : null}
        {category === 'all' || category === 'Valle Ossona' ? (
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg focus:outline-none focus-visible:ring">
                  <div className="font-bold text-lg">Valle Ossona</div>
                  <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-purple-500`} />
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm text-gray-500">
                  {trails
                    ?.filter(obj => obj.trailCategory === 'Valle Ossona')
                    .map((trail: Trail) => {
                      return (
                        <div>
                          <Link href={`/trails/${trail.slug}`}>
                            <div>{trail.title}</div>
                          </Link>
                        </div>
                      )
                    })}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ) : null}
        {category === 'all' || category === 'Val Grue' ? (
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg focus:outline-none focus-visible:ring">
                  <div className="font-bold text-lg">Val Grue</div>
                  <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-purple-500`} />
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm text-gray-500">
                  {trails
                    ?.filter(obj => obj.trailCategory === 'Val Grue')
                    .map((trail: Trail) => {
                      return (
                        <div>
                          <Link href={`/trails/${trail.slug}`}>
                            <div>{trail.title}</div>
                          </Link>
                        </div>
                      )
                    })}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ) : null}
      </div>
    </div>
  )
}

export default MapLegend
