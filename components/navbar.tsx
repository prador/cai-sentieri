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
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from 'components/ui/sheet'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'components/ui/accordion'

import { ScrollArea } from 'components/ui/scroll-area'

import type { Trail, Trails } from '../types'
import { navLinks, navSentieriAumentati } from '../utils/nav'
import { getTrails } from 'lib/service'
import { TrailList, NavImage } from './trailslist'
import { ARIcon, Bars3 } from './icons'
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
          <ul className="flex flex-col md:grid gap-6 md:p-4 md:w-[500px] md:grid-cols-3 lg:w-[600px] ">
            <li className="row-span-1">
              <NavImage
                href="/group/val-curone"
                title="Val Curone"
                image="https://wordpress-production-fbed.up.railway.app/wp-content/uploads/daniela-kokina-hOhlYhAiizc-unsplash.jpg"
              />
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
          <ul className="flex flex-col md:grid gap-6 md:p-4 md:w-[500px] md:grid-cols-4 lg:w-[600px] justify-center">
            <li className="hidden md:flex relative h-32 w-full rounded-lg col-span-2 mr-4">
              <div className="mb-2 mt-4 text-2xl rounded-lg font-bold absolute z-50 left-3 bottom-1 text-white">Aumentati</div>
              <div className="relative w-full rounded-lg">
                <div className="relative h-full w-full z-10 bg-gradient-to-b from-muted/50 to-primary rounded-lg" />
                <Image
                  src="https://wordpress-production-fbed.up.railway.app/wp-content/uploads/daniela-kokina-hOhlYhAiizc-unsplash.jpg"
                  fill
                  alt=""
                  className="rounded-lg flex flex-grow object-cover w-full"
                />
              </div>
            </li>
            <li className="col-span-1 flex flex-col">
              {navSentieriAumentati?.map((trail: Trail, index: number) => {
                return (
                  <Link href={trail.href ? trail.href : `/trails/${trail.slug}`} key={index}>
                    <div className="text-base text-gray-500">{trail.title}</div>
                  </Link>
                )
              })}
            </li>
          </ul>
        )
      default:
        break
    }
  }
  return (
    <div className="container flex justify-between relative py-3">
      <Link
        href="/"
        className="hidden md:flex absolute z-20 -top-1 md:-top-2 md:h-[180px] md:w-[90px] h-[90px] w-[45px] object-fill left-4 "
      >
        <Image src="/logo_sentieri.svg" fill alt="" className="shadow-md" />
      </Link>
      <Link href="/" className="flex md:hidden absolute z-20 h-[50px] w-[100px] object-fill left-4 rounded-lg ">
        <Image src="/logo_horizontal.png" fill alt="" className="shadow-md rounded" />
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
      <div className="relative hidden md:flex z-20 top-1 right-0">
        <Combobox value={selectedTrail} onChange={setSelectedTrail}>
          <Combobox.Input
            onChange={event => setQuery(event.target.value)}
            className="px-2 py-1 bg-gray-200 rounded-lg "
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
      <div className="md:hidden w-full flex justify-end">
        <Sheet>
          <SheetTrigger>
            <Bars3 />
          </SheetTrigger>
          <SheetContent>
            <ul className="flex flex-col w-full justify-center">
              <div className="relative mt-6">
                <Combobox value={selectedTrail} onChange={setSelectedTrail}>
                  <Combobox.Input
                    onChange={event => setQuery(event.target.value)}
                    className="px-2 py-1 bg-gray-200 rounded-lg w-full"
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
              <Accordion type="single" collapsible className="w-full">
                <ScrollArea className="pt-6 h-[90vh]">
                  {navLinks.map((navLink, index) => (
                    <>
                      {navLink.submenu ? (
                        <>
                          <AccordionItem value={`item-${index}`}>
                            <AccordionTrigger>
                              <>
                                {navLink.submenu === 'sentieriAumentati' ? (
                                  <span className="h-6 w-6 block mr-1 text-sushi-600">
                                    <ARIcon />
                                  </span>
                                ) : null}
                                <Link href={navLink.href} legacyBehavior passHref>
                                  {navLink.title}
                                </Link>
                              </>
                            </AccordionTrigger>
                            <AccordionContent>
                              <>{subMenu(navLink.submenu)}</>
                            </AccordionContent>
                          </AccordionItem>
                        </>
                      ) : (
                        <Link href={navLink.href} legacyBehavior passHref>
                          <span className="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline border-b">
                            {navLink.title}
                          </span>
                        </Link>
                      )}
                    </>
                  ))}
                </ScrollArea>
              </Accordion>
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default Navbar
