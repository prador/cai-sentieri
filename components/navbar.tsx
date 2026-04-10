import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { cn } from 'lib/utils'

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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu"

import { Sheet, SheetContent, SheetTrigger } from 'components/ui/sheet'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'components/ui/accordion'

import { ScrollArea } from 'components/ui/scroll-area'
import { Toggle } from "components/ui/toggle"
import type { Trail, Trails } from '../types'
import { navLinks, navSentieriAumentati } from '../utils/nav'
import { getTrails } from 'lib/service'
import { TrailList, NavImage } from './trailslist'
import { ARIcon, Bars3 } from './icons'
import { Combobox } from '@headlessui/react'
import { useStore } from 'store/dataStore'


const LangSwitcher = () => {
  const router = useRouter()
  const langQuery = router.query.l
  const [lang, setLang] = useState("it")
  const {pageLang, setPageLang} = useStore()

  useEffect(() => {
    if(langQuery === "en") {
      setPageLang("en")
      setLang("en")
    }
  }, [])

  return (
    <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className='mr-4 p-2 flex gap-1 h-10'><span>{lang === "it" ? "🇮🇹" : "🇬🇧"}</span> <span className='uppercase'>{lang}</span></div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-24">
                  <DropdownMenuRadioGroup value={lang} onValueChange={(value) => {setLang(value);setPageLang(value)}}>
                    <DropdownMenuRadioItem value="it">🇮🇹 IT</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="en">🇬🇧 EN</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
  )
}

const SearchBox = ({trails}:{trails:any}) => {

  const [selectedTrail, setSelectedTrail] = useState()
  const [query, setQuery] = useState('')

  const filteredTrails =
  query === ''
    ? trails
    : trails?.filter(trail => {
        return trail.title.toLowerCase().includes(query.toLowerCase())
      })

      // console.log(trails)

  return (
    <Combobox value={selectedTrail} onChange={setSelectedTrail}>
          <Combobox.Input
            onChange={event => setQuery(event.target.value)}
            className="px-2 py-1 bg-gray-100 rounded-lg border"
            placeholder="cerca"
          />
          <Combobox.Options className="absolute z-50 top-10 left-10 bg-white shadow-lg">
            {filteredTrails?.map(trail => (
              <Combobox.Option key={trail.title} value={trail.slug} className="p-2">
                <Link href={`/trails/${trail.slug}`}>{trail.title}</Link>
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox>
  )
}


const Navbar = () => {
  const router = useRouter()
  const langQuery = router.query.l
  const [trails, setTrails] = useState<any>()
  const {pageLang, setPageLang} = useStore()
  const getTrailPaths = async () => {
    const trailsx = await getTrails(100)
    setTrails(trailsx)
  }
// console.log(langQuery)
  useEffect(() => {
    // if(langQuery === "en") {
    //   setPageLang("en")
    // }
    getTrailPaths()
  }, [])
  // console.log(trails)
  const [activeGroup, setActiveGroup] = useState("Val Curone");

const groups = [
  { label: "Val Curone", href: "/group/val-curone", group: "Val Curone" },
  { label: "Valle Ossona", href: "/group/valle-ossona", group: "Valle Ossona" },
  { label: "Val Grue", href: "/group/val-grue", group: "Val Grue" },
];

const subMenu = (submenu: string) => {
  switch (submenu) {
    case 'sentieri':
      return (
        <div className="md:p-4 md:w-[800px] lg:w-[1000px] mx-auto z-50">
          <div className="md:grid md:grid-cols-4 md:gap-6">
            <ul className="hidden md:flex md:flex-col gap-4 col-span-1">
              {groups.map(({ label, href, group }) => (
                <li key={group} onMouseEnter={() => setActiveGroup(group)}>
                  <h2
                    className={cn( "text-xl font-bold cursor-pointer transition-colors",
                      activeGroup === group ? "opacity-100" : "opacity-30"
                    )}
                  >
                    <NavImage
                      href={href}
                      title={label}
                      image="https://sentieri-admin.caitortona.net/wp-content/uploads/daniela-kokina-hOhlYhAiizc-unsplash.jpg"
                    />
                  </h2>
                </li>
              ))}
            </ul>

            <div className="hidden md:block md:col-span-3 md:p-2 md:columns-3 md:gap-4 menu-trailslist">
              <TrailList trails={trails} group={activeGroup} />
            </div>

            <Accordion type="single" collapsible className="w-full md:hidden">
                <ScrollArea className="pl-2">
              {groups.map(({ label, href, group }) => (
                  <AccordionItem value={`item-${label}`}>
                            <AccordionTrigger>
                                <Link href={href} legacyBehavior passHref>
                                  {label}
                                </Link>
                            </AccordionTrigger>
                            <AccordionContent>
                              <><TrailList trails={trails} group={group} /></>
                            </AccordionContent>
                          </AccordionItem>
              ))}
              </ScrollArea>
              </Accordion>
          </div>
        </div>
      )

    case 'sentieriAumentati':
      return (
        <ul className="flex flex-col md:grid gap-6 md:p-4 md:w-[800px] md:grid-cols-4 lg:w-[800px] justify-center">
          <li className="hidden md:flex relative h-32 w-full rounded-lg col-span-2 mr-4">
            <div className="mb-2 mt-4 text-2xl rounded-lg font-bold absolute z-50 left-3 bottom-1 text-white">Aumentati</div>
            <div className="relative w-full rounded-lg">
              <div className="relative h-full w-full z-10 bg-gradient-to-b from-muted/50 to-primary rounded-lg" />
              <Image
                src="https://sentieri-admin.caitortona.net/wp-content/uploads/daniela-kokina-hOhlYhAiizc-unsplash.jpg"
                fill
                alt=""
                className="rounded-lg flex flex-grow object-cover w-full"
              />
            </div>
          </li>
          <li className="col-span-1 flex flex-col">
            {navSentieriAumentati?.map((trail: Trail, index: number) => (
              <Link href={trail.href ? trail.href : `/trails/${trail.slug}`} key={index}>
                <div className="text-base text-gray-500">{trail.title}</div>
              </Link>
            ))}
          </li>
        </ul>
      )

    default:
      break
  }
}
  return (
    <div className="container flex justify-end relative py-3 w-full">
      <Link
        href="/"
        className="hidden md:flex absolute z-20 -top-1 md:-top-2 md:h-[180px] md:w-[90px] h-[90px] w-[45px] object-fill left-4 "
      >
        <Image src="/logo_sentieri.svg" fill alt="" className="shadow-md" />
      </Link>
      <Link href="/" className="flex md:hidden absolute z-20 h-[50px] w-[100px] object-fill left-4 rounded-lg ">
        <Image src="/logo_horizontal.png" fill alt="" className="shadow-md rounded" />
      </Link>

      <ul className="hidden absolute md:flex md:flex-row w-full justify-center">
        {/* {pageLang} */}
        <NavigationMenu>
          <NavigationMenuList className="relative">
            {navLinks.map(navLink => (
              <NavigationMenuItem>
                {navLink.submenu ? (
                  <>
                    <NavigationMenuTrigger>
                      {navLink.submenu === 'sentieriAumentati' ? (
                        <span className="h-6 w-6 block mr-1 text-forest-green-400">
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

      

      <div className="relative hidden md:flex md:justify-end z-20 right-0">
          {/* <LangSwitcher/> */}
        <SearchBox trails={trails}/>
      </div>

      <div className="md:hidden w-full flex justify-end">
        <Sheet>
          <SheetTrigger>
            <Bars3 />
          </SheetTrigger>
          <SheetContent>
            <ul className="flex flex-col w-full justify-center">
              <div className="relative mt-6">
                <SearchBox trails={trails}/>
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
                                  <span className="h-6 w-6 block mr-1 text-forest-green-500">
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
