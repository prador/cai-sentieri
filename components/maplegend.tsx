import React, { useEffect, useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import type { Trail } from '../types'
import { TrailList } from './trailslist'

const MapLegend = ({ trails, category }: { trails: Trail[]; category: string }) => {
  const [openPanel, setOpenPanel] = useState<string | null>(null)

  const groups = ['Val Curone', 'Valle Ossona', 'Val Grue']

  return (
    <div
      className="w-[250px] h-auto max-h-[60vh] bg-white absolute z-10 right-12 top-2 rounded-md p-2 text-sm"
      style={{ boxShadow: '0 0 0 1px rgba(0,0,0,.1)' }}
    >
      {groups
        .filter(group => category === 'all' || category === group)
        .map((group, index) => (
          <div key={group} className={index < groups.length - 1 ? 'border-b' : ''}>
            <button
              className="flex w-full justify-between focus:outline-none focus-visible:ring py-1"
              onClick={() => setOpenPanel(openPanel === group ? null : group)}
            >
              <div className="font-semibold text-base">{group}</div>
              <ChevronUpIcon
                className={`${openPanel === group ? 'rotate-180 transform' : ''} h-5 w-5 text-purple-500`}
              />
            </button>
            {openPanel === group && (
              <div className="text-sm max-h-[350px] overflow-y-scroll text-gray-500">
                <TrailList trails={trails} group={group} />
              </div>
            )}
          </div>
        ))}
    </div>
  )
}

export default MapLegend
