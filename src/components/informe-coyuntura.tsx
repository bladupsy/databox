"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const TABLERO = {
  macro: {
    title: "Panel 1: Macroeconomía General",
    color: "#dc2626",
    indicadores: [
      { label: "EMAE 2026", value: "-5,70%", tendencia: "baja", anio: "Feb" },
      { label: "IPC 2024", value: "117%", tendencia: "baja", anio: "2024" },
      { label: "IPC 2026", value: "10,4%", tendencia: "mejora", anio: "Ene-Mar" },
      { label: "Tasa BCRA", value: "30%", tendencia: "baja", anio: "2026" },
      { label: "Tipo de Cambio", value: "$1.250-$1.400", tendencia: "estable", anio: "2026" },
    ]
  },
  sectorial: {
    title: "Panel 2: Sector Manufacturero",
    color: "#facc15",
    indicadores: [
      { label: "Bienes Intermedios 2025", value: "-32%", tendencia: "baja", anio: "2025" },
      { label: "Bienes de Capital 2026", value: "-20%", tendencia: "baja", anio: "Ene-Feb" },
      { label: "Import. Totales 2024", value: "-17%", tendencia: "baja", anio: "2024" },
      { label: "Import. B. Capital 2025", value: "+51,3%", tendencia: "mejora", anio: "2025" },
      { label: "Empleo Industrial 2026", value: "-3,6%", tendencia: "baja", anio: "Acum." },
    ]
  },
  social: {
    title: "Panel 3: Social / Territorial",
    color: "#22c55e",
    indicadores: [
      { label: "Empleo Industrial 2026", value: "1.120.000", tendencia: "baja", anio: "Nivel" },
      { label: "Variación 2026", value: "-3,6%", tendencia: "baja", anio: "Acum." },
      { label: "Puestos Perdidos", value: "-105.000", tendencia: "baja", anio: "2023-26" },
    ]
  },
  semaforo: {
    title: "Panel 4: Semáforo + Recomendación",
    color: "#f97316",
    indicadores: [
      { label: "Actividad Macro", estado: "🟡", desc: "EMAE en caída" },
      { label: "Sector Industrial", estado: "🔴", desc: "Contracción severa" },
      { label: "Precios", estado: "🟢", desc: "Desaceleración" },
      { label: "Inversión", estado: "🔴", desc: "Caída importaciones" },
      { label: "Empleo", estado: "🔴", desc: "Deterioro sostenido" },
      { label: "Confianza", estado: "🟡", desc: "Negativa" },
    ]
  }
}

function getTendenciaColor(tendencia: string) {
  if (tendencia === "mejora") return "bg-green-100 text-green-700"
  if (tendencia === "baja") return "bg-red-100 text-red-700"
  return "bg-yellow-100 text-yellow-700"
}

function getTendenciaLabel(tendencia: string) {
  if (tendencia === "mejora") return "↑"
  if (tendencia === "baja") return "↓"
  return "→"
}

export function InformeCoyuntura() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Informe de Coyuntura</h2>
          <p className="text-sm text-slate-500">Análisis Económico Argentina 2023-2026</p>
        </div>
        <Badge className="bg-orange-100 text-orange-700 border-orange-300">
          RECOMENDACIÓN: DIVERSIFICAR
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Panel 1: Macroeconomía */}
        <Card style={{ borderLeft: `4px solid ${TABLERO.macro.color}` }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{TABLERO.macro.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {TABLERO.macro.indicadores.map((ind) => (
                <div key={ind.label} className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">{ind.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{ind.value}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${getTendenciaColor(ind.tendencia)}`}>
                      {getTendenciaLabel(ind.tendencia)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Panel 2: Sectorial */}
        <Card style={{ borderLeft: `4px solid ${TABLERO.sectorial.color}` }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{TABLERO.sectorial.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {TABLERO.sectorial.indicadores.map((ind) => (
                <div key={ind.label} className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">{ind.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{ind.value}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${getTendenciaColor(ind.tendencia)}`}>
                      {getTendenciaLabel(ind.tendencia)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Panel 3: Social */}
        <Card style={{ borderLeft: `4px solid ${TABLERO.social.color}` }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{TABLERO.social.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {TABLERO.social.indicadores.map((ind) => (
                <div key={ind.label} className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">{ind.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{ind.value}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${getTendenciaColor(ind.tendencia)}`}>
                      {getTendenciaLabel(ind.tendencia)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Panel 4: Semáforo */}
        <Card style={{ borderLeft: `4px solid ${TABLERO.semaforo.color}` }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{TABLERO.semaforo.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {TABLERO.semaforo.indicadores.map((ind) => (
                <div key={ind.label} className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">{ind.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{ind.estado}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}