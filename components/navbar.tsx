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
import { TrailList } from './trailslist'

const Navbar = () => {
  const router = useRouter()
  const currentRoute = router.pathname
  const [trails, setTrails] = useState<any>()

  const getTrailPaths = async () => {
    const trailsx = await getTrails(100)
    setTrails(trailsx)
  }

  useEffect(() => {
    getTrailPaths()
  }, [])
  const subMenu = (submenu: string) => {
    switch (submenu) {
      case 'sentieri':
        return (
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
            <li className="row-span-2">
              <TrailList trails={trails} group="Val Curone" />
            </li>
            <li className="row-span-2">
              <TrailList trails={trails} group="Valle Ossona" />
            </li>
            <li className="row-span-2">
              <TrailList trails={trails} group="Val Grue" />
            </li>
          </ul>
        )
      case 'sentieriAumentati':
        return (
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
            {navSentieriAumentati?.map((trail: Trail, index: number) => {
              return (
                <Link href={trail.href ? trail.href : `/trails/${trail.slug}`} key={index}>
                  <div className="text-sm">{trail.title}</div>
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
        <Image src="/logo_sentieri.svg" fill alt="" className="shadow-lg" />
      </Link>

      <ul className="hidden sm:flex sm:flex-row w-full justify-center">
        <NavigationMenu>
          <NavigationMenuList>
            {navLinks.map(navLink => (
              <NavigationMenuItem>
                {navLink.submenu ? (
                  <>
                    <NavigationMenuTrigger>{navLink.title}</NavigationMenuTrigger>
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
      <input type="text" className="h-5 p-4 my-3 bg-gray-400 text-black rounded-lg hidden" placeholder="search" />
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
