"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const TABLERO = {
  macro: {
    title: "Panel 1: Macroeconomía General",
    color: "#378ADD",
    indicadores: [
      { label: "EMAE / PIB", value: "-2,1%", tendencia: "baja", anio: "2026" },
      { label: "IPC (Anual)", value: "10,4%", tendencia: "mejora", anio: "2026" },
      { label: "IPIM (Anual)", value: "6,2%", tendencia: "mejora", anio: "2026" },
      { label: "Tasa BCRA", value: "30-35%", tendencia: "baja", anio: "2026" },
      { label: "Tipo de Cambio", value: "$1250-1400", tendencia: "estable", anio: "2026" },
      { label: "Confianza (ICE)", value: "50-60", tendencia: "mejora", anio: "2026" },
    ]
  },
  sectorial: {
    title: "Panel 2: Sector Manufacturero",
    color: "#1D9E75",
    indicadores: [
      { label: "Bienes Intermedios", value: "-3% a -5%", tendencia: "baja", anio: "2026" },
      { label: "Bienes de Capital", value: "-8% a -12%", tendencia: "baja", anio: "2026" },
      { label: "Import. Insumos", value: "-3% a -5%", tendencia: "baja", anio: "2026" },
      { label: "Import. B. Capital", value: "-8% a -12%", tendencia: "baja", anio: "2026" },
      { label: "Empleo Industrial", value: "-1,5% a -2%", tendencia: "baja", anio: "2026" },
    ]
  },
  social: {
    title: "Panel 3: Social / Territorial",
    color: "#7F77DD",
    indicadores: [
      { label: "Empleo Industrial", value: "1.120.000", tendencia: "baja", anio: "2026" },
      { label: "Variación Empleo", value: "-1,5% a -2%", tendencia: "baja", anio: "2026" },
      { label: "Pobreza (est.)", value: "35-40%", tendencia: "estable", anio: "2026" },
      { label: "Puestos Perdidos", value: "-105.000", tendencia: "baja", anio: "2023-26" },
    ]
  },
  semaforo: {
    title: "Panel 4: Semáforo + Recomendación",
    color: "#EF9F27",
    indicadores: [
      { label: "Actividad Macro", estado: "🟡", desc: "Recuperación incompleta" },
      { label: "Sector Industrial", estado: "🔴", desc: "Contracción severa" },
      { label: "Precios", estado: "🟢", desc: "Desaceleración fuerte" },
      { label: "Inversión", estado: "🔴", desc: "Caída de importaciones" },
      { label: "Empleo", estado: "🔴", desc: "Deterioro sostenido" },
      { label: "Confianza", estado: "🟡", desc: "Estabilidad" },
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