"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface IndicadorSemaforo {
  variable: string
  situacion: string
  tendencia: string
  lectura: string
  semaforo: "expansion" | "estabilidad" | "contraccion"
}

const datos: IndicadorSemaforo[] = [
  {
    variable: "PIB / EMAE",
    situacion: "Actividad débil",
    tendencia: "🔻",
    lectura: "Economía sin crecimiento sostenido",
    semaforo: "contraccion",
  },
  {
    variable: "Inflación (IPC)",
    situacion: "Baja (~10% acum.)",
    tendencia: "🔻",
    lectura: "Mejora nominal",
    semaforo: "estabilidad",
  },
  {
    variable: "Desempleo",
    situacion: "Estable/leve aumento",
    tendencia: "🔻",
    lectura: "Mercado laboral frágil",
    semaforo: "estabilidad",
  },
  {
    variable: "Pobreza",
    situacion: "Alta",
    tendencia: "⚠️",
    lectura: "Debilidad social",
    semaforo: "contraccion",
  },
  {
    variable: "Tipo de cambio",
    situacion: "Estable",
    tendencia: "🟡",
    lectura: "Mayor previsibilidad",
    semaforo: "estabilidad",
  },
  {
    variable: "Tasa de interés",
    situacion: "Media-alta",
    tendencia: "🔻",
    lectura: "Crédito aún caro",
    semaforo: "estabilidad",
  },
]

const semaforoConfig = {
  expansion: {
    label: "Expansión",
    emoji: "🟢",
    badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-200",
    rowClass: "bg-emerald-50/30",
  },
  estabilidad: {
    label: "Estabilidad",
    emoji: "🟡",
    badgeClass: "bg-amber-100 text-amber-800 border-amber-200",
    rowClass: "bg-amber-50/30",
  },
  contraccion: {
    label: "Contracción",
    emoji: "🔴",
    badgeClass: "bg-red-100 text-red-800 border-red-200",
    rowClass: "bg-red-50/30",
  },
}

export default function SemaforoTable() {
  const conteo = {
    expansion: datos.filter((i) => i.semaforo === "expansion").length,
    estabilidad: datos.filter((i) => i.semaforo === "estabilidad").length,
    contraccion: datos.filter((i) => i.semaforo === "contraccion").length,
  }

  return (
    <Card className="border shadow-sm overflow-hidden">
      <CardHeader className="bg-slate-800 text-white py-3 px-5">
        <CardTitle className="text-sm font-semibold tracking-wide uppercase">
          Semáforo de Desempeño — 2026
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-100 border-b">
                <th className="text-left text-sm font-semibold text-slate-700 px-4 py-3">Variable</th>
                <th className="text-left text-sm font-semibold text-slate-700 px-4 py-3">Situación 2026</th>
                <th className="text-center text-sm font-semibold text-slate-700 px-4 py-3">Tendencia</th>
                <th className="text-left text-sm font-semibold text-slate-700 px-4 py-3">Lectura</th>
                <th className="text-center text-sm font-semibold text-slate-700 px-4 py-3">Semáforo</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((item, index) => {
                const cfg = semaforoConfig[item.semaforo]
                return (
                  <tr
                    key={item.variable}
                    className={cn(
                      "border-b border-slate-100 transition-colors",
                      cfg.rowClass,
                      index === datos.length - 1 && "border-b-0"
                    )}
                  >
                    <td className="px-4 py-3 font-medium text-slate-700">
                      {item.variable}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {item.situacion}
                    </td>
                    <td className="px-4 py-3 text-center text-lg">
                      {item.tendencia}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {item.lectura}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge
                        variant="outline"
                        className={cn("text-xs font-semibold", cfg.badgeClass)}
                      >
                        {cfg.emoji} {cfg.label}
                      </Badge>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
      
      <CardContent className="flex items-center justify-between p-4 bg-slate-50 border-t">
        <div className="flex gap-4">
          <span className="text-sm text-slate-600">
            🟢 Expansión: <strong className="text-emerald-700">{conteo.expansion}</strong>
          </span>
          <span className="text-sm text-slate-600">
            🟡 Estabilidad: <strong className="text-amber-700">{conteo.estabilidad}</strong>
          </span>
          <span className="text-sm text-slate-600">
            🔴 Contracción: <strong className="text-red-700">{conteo.contraccion}</strong>
          </span>
        </div>
      </CardContent>
    </Card>
  )
}