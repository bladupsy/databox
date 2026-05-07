"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function Navbar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" className={navigationMenuTriggerStyle()}>
            Inflación
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/radial" className={navigationMenuTriggerStyle()}>
            Resumen Radial
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/tabla" className={navigationMenuTriggerStyle()}>
            Tabla
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}