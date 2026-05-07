"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

const indicadoresPorPanel = {
  macroeconomia: [
    { title: "PIB / EMAE", value: "-2,1%", description: "Feb 2026 - Interanual", trend: "down" as const },
    { title: "Inflación IPC", value: "10,4%", description: "Ene-Mar 2026 - Acumulado", trend: "down" as const },
    { title: "Desempleo", value: "7-8%", description: "Estimado 2026", trend: "up" as const },
    { title: "Tipo de Cambio", value: "$1.250-$1.400", description: "2026 - Actual", trend: "neutral" as const },
    { title: "Tasa BCRA", value: "30-35%", description: "2026 - Actual", trend: "neutral" as const },
  ],
  manufacturero: [
    { title: "PIB Industrial", value: "-8%", description: "2026 - Estimado", trend: "down" as const },
    { title: "Producción Manufacturera", value: "-8,7%", description: "Feb 2026 - Interanual", trend: "down" as const },
    { title: "Import. Insumos", value: "-3% a -5%", description: "Ene-Feb 2026", trend: "down" as const },
    { title: "Import. Bienes Capital", value: "-8% a -12%", description: "Ene-Feb 2026", trend: "down" as const },
    { title: "Empleo Industrial", value: "-1,5% a -2%", description: "2026 - Acumulado", trend: "down" as const },
  ],
  social: [
    { title: "Tasa de Empleo", value: "45-47%", description: "2026 - Estimado", trend: "neutral" as const },
    { title: "Empleo Informal", value: "35-38%", description: "2026 - Estimado", trend: "neutral" as const },
    { title: "Pobreza", value: "35-40%", description: "2026 - Estimado", trend: "neutral" as const },
    { title: "Salario Real", value: "-5% a -8%", description: "2026 - Estimado", trend: "down" as const },
  ],
}

const semaforo = {
  expansion: "#639922",
  estabilidad: "#EF9F27",
  contraction: "#E24B4A",
}

const recomendaciones = [
  { label: "Invertir", bg: "#EAF3DE", color: "#27500A" },
  { label: "Esperar", bg: "#FAEEDA", color: "#633806" },
  { label: "Diversificar", bg: "#EDE8FE", color: "#3C3489" },
  { label: "Retraer", bg: "#FCEBEB", color: "#791F1F" },
]

function getTrendIcon(trend: "up" | "down" | "neutral") {
  if (trend === "up") return <TrendingUp className="h-4 w-4 text-green-500" />
  if (trend === "down") return <TrendingDown className="h-4 w-4 text-red-500" />
  return <Minus className="h-4 w-4 text-slate-400" />
}

export function PanelMacroeconomia() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4" style={{ borderLeft: "3px solid #378ADD" }}>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#378ADD" }} />
        <span className="text-sm font-medium text-slate-800">Panel 1 — Macroeconomía general</span>
      </div>
      <div className="text-xs text-slate-500 mb-3">¿Cómo está la economía argentina en general?</div>
      <div className="grid gap-2">
        {indicadoresPorPanel.macroeconomia.map((ind) => (
          <div key={ind.title} className="bg-slate-50 rounded p-2 flex justify-between items-center">
            <span className="text-xs text-slate-600">{ind.title}</span>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${ind.trend === "down" ? "text-red-600" : ind.trend === "up" ? "text-green-600" : "text-slate-700"}`}>
                {ind.value}
              </span>
              {getTrendIcon(ind.trend)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PanelManufacturero() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4" style={{ borderLeft: "3px solid #1D9E75" }}>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#1D9E75" }} />
        <span className="text-sm font-medium text-slate-800">Panel 2 — Sector manufacturero</span>
      </div>
      <div className="text-xs text-slate-500 mb-3">¿Cómo está el sector específico de TecnoSur?</div>
      <div className="grid gap-2">
        {indicadoresPorPanel.manufacturero.map((ind) => (
          <div key={ind.title} className="bg-slate-50 rounded p-2 flex justify-between items-center">
            <span className="text-xs text-slate-600">{ind.title}</span>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${ind.trend === "down" ? "text-red-600" : ind.trend === "up" ? "text-green-600" : "text-slate-700"}`}>
                {ind.value}
              </span>
              {getTrendIcon(ind.trend)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PanelSocial() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4" style={{ borderLeft: "3px solid #7F77DD" }}>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#7F77DD" }} />
        <span className="text-sm font-medium text-slate-800">Panel 3 — Social / territorial</span>
      </div>
      <div className="text-xs text-slate-500 mb-3">¿Cómo impacta en trabajadores y la región?</div>
      <div className="grid gap-2">
        {indicadoresPorPanel.social.map((ind) => (
          <div key={ind.title} className="bg-slate-50 rounded p-2 flex justify-between items-center">
            <span className="text-xs text-slate-600">{ind.title}</span>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${ind.trend === "down" ? "text-red-600" : ind.trend === "up" ? "text-green-600" : "text-slate-700"}`}>
                {ind.value}
              </span>
              {getTrendIcon(ind.trend)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface PanelSemaforoProps {
  estado?: "expansion" | "estabilidad" | "contraccion"
}

export function PanelSemaforo({ estado = "contraccion" }: PanelSemaforoProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4" style={{ borderLeft: "3px solid #EF9F27" }}>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#EF9F27" }} />
        <span className="text-sm font-medium text-slate-800">Panel 4 — Semáforo + Recomendación</span>
      </div>
      <div className="text-xs text-slate-500 mb-3">¿Qué le decís al cliente?</div>
      
      <div className="flex gap-4 mb-3">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full" style={{ background: semaforo.expansion }} />
          <span className="text-xs text-slate-500">Expansión</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full" style={{ background: semaforo.estabilidad }} />
          <span className="text-xs text-slate-500">Estabilidad</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full" style={{ background: semaforo.contraction }} />
          <span className="text-xs text-slate-500">Contracción</span>
        </div>
      </div>
      
      <div className="text-xs text-slate-500 mb-2">Decisión sugerida:</div>
      <div className="flex flex-wrap gap-1">
        {recomendaciones.map((rec) => (
          <span
            key={rec.label}
            className="inline-block text-xs px-2 py-1 rounded-full"
            style={{ background: rec.bg, color: rec.color }}
          >
            {rec.label}
          </span>
        ))}
      </div>
    </div>
  )
}

export function DashboardPanels() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <PanelMacroeconomia />
      <PanelManufacturero />
      <PanelSocial />
      <PanelSemaforo />
    </div>
  )
}