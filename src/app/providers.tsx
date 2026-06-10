"use client"

import { TooltipProvider } from "@/components/ui/tooltip"
import { Navbar } from "@/components/navbar"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <Navbar />
      {children}
    </TooltipProvider>
  )
}