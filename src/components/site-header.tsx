"use client"

import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="flex h-14 items-center justify-between gap-4 border-b bg-white px-6">
      <Link href="/dashboard" className="text-lg font-semibold hover:text-slate-700">
        Dashboard Macroeconómico
      </Link>
      <Link href="/tabla" className="text-sm text-slate-600 hover:text-slate-900">
        Tabla de Indicadores
      </Link>
    </header>
  )
}