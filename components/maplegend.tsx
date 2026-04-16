import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import type { Trail } from '../types'
import { TrailList } from './trailslist'

const MapLegend = ({ trails, category }: { trails: Trail[]; category: string }) => {
  return (
    <div
      className="w-[250px] h-auto bg-white absolute z-10 right-12 top-2 rounded-md p-2 text-sm"
      style={{ boxShadow: '0 0 0 1px rgba(0,0,0,.1)' }}
    >
      {category === 'all' || category === 'Val Curone' ? (
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between focus:outline-none focus-visible:ring border-b py-1">
                <div className="font-semibold text-base">Val Curone</div>
                <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-purple-500`} />
              </Disclosure.Button>
              <Disclosure.Panel className="text-sm text-gray-500">
                <TrailList trails={trails} group="Val Curone" />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ) : null}
      {category === 'all' || category === 'Valle Ossona' ? (
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between focus:outline-none focus-visible:ring border-b py-1">
                <div className="font-semibold text-base">Valle Ossona</div>
                <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-purple-500`} />
              </Disclosure.Button>
              <Disclosure.Panel className="text-sm text-gray-500">
                <TrailList trails={trails} group="Valle Ossana" />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ) : null}
      {category === 'all' || category === 'Val Grue' ? (
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between focus:outline-none focus-visible:ring pt-1">
                <div className="font-semibold text-base">Val Grue</div>
                <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-purple-500`} />
              </Disclosure.Button>
              <Disclosure.Panel className="text-sm text-gray-500">
                <TrailList trails={trails} group="Val Grue" />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ) : null}
    </div>
  )
}

export default MapLegend
