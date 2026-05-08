"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info, TrendingDown, TrendingUp, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

type Estado = "expansion" | "estabilidad" | "contraccion"

interface Indicador {
  dimension: string
  valor: string
  estado: Estado
  fuente: string
  nota: string
}

const datos: Indicador[] = [
  {
    dimension: "Ventas tecnológicas",
    valor: "−18% (2024) · −1,7% (2025)",
    estado: "contraccion",
    fuente: "—",
    nota: "Sin recuperación confirmada",
  },
  {
    dimension: "Producción manufacturera",
    valor: "Bienes interm. −32% · Bienes de capital −20% (2025)",
    estado: "contraccion",
    fuente: "INDEC",
    nota: "Caída intensa en ambos segmentos",
  },
  {
    dimension: "Importaciones bienes de capital",
    valor: "+51,3% (2025)",
    estado: "expansion",
    fuente: "INDEC",
    nota: "Señal positiva de inversión",
  },
  {
    dimension: "Confianza empresarial (ETN industria)",
    valor: "−21,4 en 2026 T1–T2",
    estado: "contraccion",
    fuente: "INDEC",
    nota: "Mayor pesimismo reciente",
  },
  {
    dimension: "Importaciones bienes intermedios",
    valor: "+29% (2026 ene–feb)",
    estado: "estabilidad",
    fuente: "INDEC",
    nota: "Insumos en recuperación",
  },
  {
    dimension: "Empleo industrial",
    valor: "−3,6% acum. 2026",
    estado: "contraccion",
    fuente: "Ministerio Trabajo",
    nota: "Pérdida sostenida de puestos",
  },
]

const estadoConfig: Record<
  Estado,
  {
    label: string
    emoji: string
    badgeClass: string
    rowClass: string
    icon: typeof TrendingUp
    iconClass: string
  }
> = {
  expansion: {
    label: "Expansión",
    emoji: "🟢",
    badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-100",
    rowClass: "bg-emerald-50/40 hover:bg-emerald-50/70",
    icon: TrendingUp,
    iconClass: "text-emerald-600",
  },
  estabilidad: {
    label: "Estabilización",
    emoji: "🟡",
    badgeClass: "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100",
    rowClass: "bg-amber-50/40 hover:bg-amber-50/70",
    icon: Minus,
    iconClass: "text-amber-600",
  },
  contraccion: {
    label: "Contracción",
    emoji: "🔴",
    badgeClass: "bg-red-100 text-red-800 border-red-200 hover:bg-red-100",
    rowClass: "bg-red-50/40 hover:bg-red-50/70",
    icon: TrendingDown,
    iconClass: "text-red-600",
  },
}

export default function SemaforoDesempeno() {
  const indicadores = datos

  const conteo = {
    expansion: indicadores.filter((i) => i.estado === "expansion").length,
    estabilidad: indicadores.filter((i) => i.estado === "estabilidad").length,
    contraccion: indicadores.filter((i) => i.estado === "contraccion").length,
  }

  const recomendacion = (() => {
    if (conteo.contraccion >= 4) return { texto: "Retraer", color: "red" }
    if (conteo.expansion >= 2) return { texto: "Diversificar", color: "blue" }
    return { texto: "Esperar", color: "amber" }
  })()

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <Card className="border shadow-sm bg-slate-800 text-white">
          <CardHeader className="py-3 px-5">
            <CardTitle className="text-base font-semibold tracking-wide">
              Semáforo de desempeño — Sector TecnoSur
            </CardTitle>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          {(["expansion", "estabilidad", "contraccion"] as Estado[]).map((e) => {
            const cfg = estadoConfig[e]
            const Icon = cfg.icon
            return (
              <Card key={e} className={cn("border shadow-sm transition-all", cfg.rowClass)}>
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      {cfg.label}
                    </p>
                    <p className="text-3xl font-medium text-slate-800 mt-1">
                      {conteo[e]}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      de {indicadores.length} indicadores
                    </p>
                  </div>
                  <div className={cn("rounded-full p-3 bg-white/60", cfg.iconClass)}>
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="border shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-800 text-white py-3 px-5">
            <CardTitle className="text-sm font-semibold tracking-wide uppercase">
              Tablero de indicadores — Sector TecnoSur
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-100 hover:bg-slate-100">
                  <TableHead className="font-semibold text-slate-700 w-[220px]">
                    Dimensión
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">
                    Valor / Dato
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 text-center w-[150px]">
                    Estado
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 w-[90px] text-center">
                    Fuente
                  </TableHead>
                  <TableHead className="w-[40px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {indicadores.map((ind) => {
                  const cfg = estadoConfig[ind.estado]
                  const Icon = cfg.icon
                  return (
                    <TableRow
                      key={ind.dimension}
                      className={cn(
                        "transition-colors border-b border-slate-100",
                        cfg.rowClass
                      )}
                    >
                      <TableCell className="font-medium text-slate-700 py-3">
                        <div className="flex items-center gap-2">
                          <Icon className={cn("h-4 w-4 shrink-0", cfg.iconClass)} strokeWidth={2.5} />
                          {ind.dimension}
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600 font-mono text-sm">
                        {ind.valor}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className={cn("text-xs font-semibold", cfg.badgeClass)}
                        >
                          {cfg.emoji} {cfg.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-xs text-slate-400 font-medium">
                          {ind.fuente}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Tooltip>
                          <TooltipTrigger>
                            <button className="text-slate-300 hover:text-slate-500 transition-colors">
                              <Info className="h-4 w-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent
                            side="left"
                            className="max-w-[240px] text-xs leading-relaxed"
                          >
                            {ind.nota}
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card
          className={cn(
            "border-2 shadow-sm",
            recomendacion.color === "emerald" && "border-emerald-300 bg-emerald-50",
            recomendacion.color === "amber"   && "border-amber-300 bg-amber-50",
            recomendacion.color === "red"     && "border-red-300 bg-red-50",
            recomendacion.color === "blue"    && "border-blue-300 bg-blue-50"
          )}
        >
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
                Recomendación
              </p>
              <p
                className={cn(
                  "text-2xl font-medium",
                  recomendacion.color === "emerald" && "text-emerald-800",
                  recomendacion.color === "amber"   && "text-amber-800",
                  recomendacion.color === "red"     && "text-red-800",
                  recomendacion.color === "blue"    && "text-blue-800"
                )}
              >
                {recomendacion.texto}
              </p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-xs text-slate-500">🟢 Expansión: <strong>{conteo.expansion}</strong></p>
              <p className="text-xs text-slate-500">🟡 Estabilización: <strong>{conteo.estabilidad}</strong></p>
              <p className="text-xs text-slate-500">🔴 Contracción: <strong>{conteo.contraccion}</strong></p>
            </div>
          </CardContent>
        </Card>

        <p className="text-xs text-slate-400 text-right">
          Fuentes: INDEC · Ministerio de Trabajo — Datos al mayo 2026
        </p>
      </div>
    </TooltipProvider>
  )
}