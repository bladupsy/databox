"use client"

import { usePathname } from "next/navigation"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Navbar } from "@/components/navbar"

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const showNavbar = pathname !== "/datos-macroeconomicos-2"

  return (
    <TooltipProvider>
      {showNavbar && <Navbar />}
      {children}
    </TooltipProvider>
  )
}