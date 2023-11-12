import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
  ListItem,
} from 'components/ui/navigation-menu'
import type { Trail, Trails } from '../types'
import { navLinks, navSentieriAumentati } from '../utils/nav'
import { getTrails } from 'lib/service'
import { TrailList, NavImage } from './trailslist'
import { ARIcon } from './icons'
import { Combobox } from '@headlessui/react'

const Navbar = () => {
  const router = useRouter()
  const currentRoute = router.pathname
  const [trails, setTrails] = useState<any>()
  const [selectedTrail, setSelectedTrail] = useState()
  const [query, setQuery] = useState('')

  const getTrailPaths = async () => {
    const trailsx = await getTrails(100)
    setTrails(trailsx)
  }

  useEffect(() => {
    getTrailPaths()
  }, [])

  const filteredTrails =
    query === ''
      ? trails
      : trails.filter(trail => {
          return trail.title.toLowerCase().includes(query.toLowerCase())
        })
  console.log(trails)
  const subMenu = (submenu: string) => {
    switch (submenu) {
      case 'sentieri':
        return (
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-3 lg:w-[600px] ">
            <li className="row-span-1">
              <NavigationMenuLink asChild>
                <NavImage
                  href="/group/val-curone"
                  title="Val Curone"
                  image="https://wordpress-production-fbed.up.railway.app/wp-content/uploads/daniela-kokina-hOhlYhAiizc-unsplash.jpg"
                />
              </NavigationMenuLink>
              <div className="p-2">
                <TrailList trails={trails} group="Val Curone" />
              </div>
            </li>
            <li className="row-span-1">
              <NavImage
                href="/group/valle-ossona"
                title="Valle Ossona"
                image="https://wordpress-production-fbed.up.railway.app/wp-content/uploads/daniela-kokina-hOhlYhAiizc-unsplash.jpg"
              />
              <div className="p-2">
                <TrailList trails={trails} group="Valle Ossona" />
              </div>
            </li>
            <li className="row-span-1">
              <NavImage
                href="/group/val-grue"
                title="Val Grue"
                image="https://wordpress-production-fbed.up.railway.app/wp-content/uploads/daniela-kokina-hOhlYhAiizc-unsplash.jpg"
              />
              <div className="p-2">
                <TrailList trails={trails} group="Val Grue" />
              </div>
            </li>
          </ul>
        )
      case 'sentieriAumentati':
        return (
          <ul className="flex flex-col w-[150px] gap-3 p-4 md:w-[150px] md:grid-cols-1 lg:w-[150px] ">
            {navSentieriAumentati?.map((trail: Trail, index: number) => {
              return (
                <Link href={trail.href ? trail.href : `/trails/${trail.slug}`} key={index}>
                  <div className="text-base text-gray-500">{trail.title}</div>
                </Link>
              )
            })}
          </ul>
        )
      default:
        break
    }
  }
  return (
    <div className="container flex justify-between relative py-3">
      <Link href="/" className="absolute z-20 -top-2 md:h-[180px] md:w-[90px] h-[120px] w-[60px] object-fill left-4 ">
        <Image src="/logo_sentieri.svg" fill alt="" className="shadow-md" />
      </Link>

      <ul className="hidden sm:flex sm:flex-row w-full justify-center">
        <NavigationMenu>
          <NavigationMenuList className="relative">
            {navLinks.map(navLink => (
              <NavigationMenuItem>
                {navLink.submenu ? (
                  <>
                    <NavigationMenuTrigger>
                      {navLink.submenu === 'sentieriAumentati' ? (
                        <span className="h-6 w-6 block mr-1 text-sushi-600">
                          <ARIcon />{' '}
                        </span>
                      ) : null}
                      <Link href={navLink.href} legacyBehavior passHref>
                        {navLink.title}
                      </Link>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <>{subMenu(navLink.submenu)}</>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link href={navLink.href} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>{navLink.title}</NavigationMenuLink>
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </ul>
      {/* <input
        type="text"
        className="h-5 p-4 my-1 text-black bg-gray-200 border rounded-lg absolute z-20 top-3 right-4"
        placeholder="search"
      /> */}
      <div className="relative">
        <Combobox value={selectedTrail} onChange={setSelectedTrail}>
          <Combobox.Input
            onChange={event => setQuery(event.target.value)}
            className="px-2 py-1 bg-gray-200 rounded-lg"
            placeholder="cerca"
          />
          <Combobox.Options className="absolute z-50 left-0 bg-white shadow-lg">
            {filteredTrails?.map(trail => (
              <Combobox.Option key={trail.title} value={trail.slug} className="p-2">
                <Link href={`/trails/${trail.slug}`}>{trail.title}</Link>
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox>
      </div>
    </div>
  )
}

export default Navbar

{
  /* <NavigationMenuLink asChild>
<a
  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
  href="/"
>
  <div className="mb-2 mt-4 text-lg font-medium">
    shadcn/ui
  </div>
  <p className="text-sm leading-tight text-muted-foreground">
    Beautifully designed components built with Radix UI and
    Tailwind CSS.
  </p>
</a>
</NavigationMenuLink> */
}
