"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard } from "lucide-react"

export function AppSidebar() {
  const pathname = usePathname()

  const mainNav = [
    { href: "/dashboard", label: "Vista General", icon: LayoutDashboard },
  ]

  const years = [
    { href: "/dashboard/2024", label: "2024" },
    { href: "/dashboard/2025", label: "2025" },
    { href: "/dashboard/2026", label: "2026" },
  ]

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-xl font-bold">TecnoSur</h1>
        <p className="text-sm text-slate-400">Panel Macroeconómico</p>
      </div>
      
      <div className="mb-6">
        <nav className="space-y-2">
          {mainNav.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.icon && <item.icon size={18} />}
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Por Año</h2>
        <nav className="space-y-2">
          {years.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}