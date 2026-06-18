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

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/stp-grupo-a", label: "STP Grupo A" },
  { href: "/datos-macroeconomicos-2", label: "Datos Macroeconómicos 2" },
  { href: "/inflacion", label: "Inflación" },
  { href: "/radial", label: "Resumen Radial" },
  { href: "/tabla", label: "Tabla" },
  { href: "/capacidad", label: "Capacidad" },
  { href: "/blog", label: "Blog" },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-slate-800">
          📊 DataBox
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link
                  href={item.href}
                  className={navigationMenuTriggerStyle()}
                  style={{
                    backgroundColor: pathname === item.href ? "#f1f5f9" : "transparent",
                  }}
                >
                  {item.label}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}