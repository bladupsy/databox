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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingDown, TrendingUp, Minus, Info } from "lucide-react"
import { cn } from "@/lib/utils"

type Estado = "expansion" | "estabilidad" | "contraccion"

interface Indicador {
  dimension: string
  valor: string
  estado: Estado
  fuente: string
  nota: string
}

type Periodo = "2024" | "2025" | "2026"

const datos: Record<Periodo, Indicador[]> = {
  "2024": [
    {
      dimension: "Actividad (EMAE)",
      valor: "-3,5% anual",
      estado: "contraccion",
      fuente: "INDEC",
      nota: "Piso del ciclo. Caída generalizada del consumo e inversión.",
    },
    {
      dimension: "Inflación (IPC)",
      valor: "211% anual",
      estado: "contraccion",
      fuente: "INDEC",
      nota: "Máximo histórico reciente. Shock por devaluación y tarifas.",
    },
    {
      dimension: "Tipo de cambio",
      valor: "$800 → $1.050",
      estado: "contraccion",
      fuente: "BCRA",
      nota: "Dos saltos abruptos. Alta volatilidad cambiaria.",
    },
    {
      dimension: "Producción industrial (IPI)",
      valor: "-12% bs. intermedios",
      estado: "contraccion",
      fuente: "INDEC",
      nota: "Bs. de capital cayeron -22%. Freno total de inversión.",
    },
    {
      dimension: "Empleo industrial",
      valor: "1.170.000 (−4,5%)",
      estado: "contraccion",
      fuente: "Min. Trabajo",
      nota: "Se perdieron ~55.000 puestos formales en el sector.",
    },
    {
      dimension: "Financiamiento PyME",
      valor: "80–120% TNA",
      estado: "contraccion",
      fuente: "BCRA",
      nota: "Crédito inaccesible. Tasa real fuertemente positiva.",
    },
    {
      dimension: "Confianza empresarial",
      valor: "35–45 (ICE)",
      estado: "contraccion",
      fuente: "UTDT",
      nota: "Mínimos del período. Generalizada expectativa negativa.",
    },
  ],
  "2025": [
    {
      dimension: "Actividad (EMAE)",
      valor: "+3,2% anual",
      estado: "expansion",
      fuente: "INDEC",
      nota: "Rebote tras el piso de 2024. Recuperación incompleta.",
    },
    {
      dimension: "Inflación (IPC)",
      valor: "~130–140% anual",
      estado: "estabilidad",
      fuente: "INDEC",
      nota: "Desinflación marcada pero inflación sigue siendo elevada.",
    },
    {
      dimension: "Tipo de cambio",
      valor: "$1.050 → $1.250 (+20%)",
      estado: "estabilidad",
      fuente: "BCRA",
      nota: "Crawling peg estable. Atraso cambiario acumulándose.",
    },
    {
      dimension: "Producción industrial (IPI)",
      valor: "+6% bs. intermedios",
      estado: "expansion",
      fuente: "INDEC",
      nota: "Bs. de capital +12%. Proyectos pospuestos se reactivaron.",
    },
    {
      dimension: "Empleo industrial",
      valor: "1.140.000 (−2,5%)",
      estado: "estabilidad",
      fuente: "Min. Trabajo",
      nota: "Caída modera. Mercado laboral sin recuperación plena.",
    },
    {
      dimension: "Financiamiento PyME",
      valor: "50–80% TNA",
      estado: "estabilidad",
      fuente: "BCRA",
      nota: "Baja parcial. Crédito más accesible pero aún costoso.",
    },
    {
      dimension: "Confianza empresarial",
      valor: "45–55 (ICE)",
      estado: "estabilidad",
      fuente: "UTDT",
      nota: "Mejora gradual. Expectativas más positivas hacia fin de año.",
    },
  ],
  "2026": [
    {
      dimension: "Actividad (EMAE)",
      valor: "−2,1% (feb)",
      estado: "contraccion",
      fuente: "INDEC",
      nota: "Nueva caída tras rebote de 2025. Señal de alerta.",
    },
    {
      dimension: "Inflación (IPC)",
      valor: "3,4% (mar) · 9,4% Q1",
      estado: "expansion",
      fuente: "INDEC",
      nota: "Desinflación avanzada vs 2024. Marzo sorprendió al alza por educación y transporte.",
    },
    {
      dimension: "Tipo de cambio",
      valor: "$1.420 (abr) · $1.700 proy. dic.",
      estado: "estabilidad",
      fuente: "BCRA REM",
      nota: "Depreciación proyectada 17% anual. Atraso cambiario persiste.",
    },
    {
      dimension: "Producción industrial (IPI)",
      valor: "−6,0% acum. bimestre",
      estado: "contraccion",
      fuente: "INDEC",
      nota: "Ene: −3,2% · Feb: −8,7% interanual. Tendencia-ciclo +0,2%.",
    },
    {
      dimension: "Empleo industrial",
      valor: "~1.120.000 (−1,5%)",
      estado: "contraccion",
      fuente: "Min. Trabajo",
      nota: "Deterioro persistente. Sin señales de recuperación.",
    },
    {
      dimension: "Financiamiento PyME",
      valor: "TAMAR 26,8% TNA",
      estado: "estabilidad",
      fuente: "BCRA REM",
      nota: "Tasa real negativa en teoría. Spread bancario eleva costo real a 45–60%.",
    },
    {
      dimension: "Confianza empresarial",
      valor: "50–60 (ICE)",
      estado: "estabilidad",
      fuente: "UTDT",
      nota: "Estabilidad relativa. Bs. de capital importados +22%.",
    },
  ],
}

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
    badgeClass:
      "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-100",
    rowClass: "bg-emerald-50/40 hover:bg-emerald-50/70",
    icon: TrendingUp,
    iconClass: "text-emerald-600",
  },
  estabilidad: {
    label: "Estabilidad",
    emoji: "🟡",
    badgeClass:
      "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100",
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
  const [periodo, setPeriodo] = useState<Periodo>("2026")
  const indicadores = datos[periodo]

  const conteo = {
    expansion: indicadores.filter((i) => i.estado === "expansion").length,
    estabilidad: indicadores.filter((i) => i.estado === "estabilidad").length,
    contraccion: indicadores.filter((i) => i.estado === "contraccion").length,
  }

  const recomendacion = (() => {
    if (conteo.expansion >= 4) return { texto: "Invertir", color: "emerald" }
    if (conteo.contraccion >= 4) return { texto: "Retraer", color: "red" }
    if (conteo.expansion >= 2 && conteo.contraccion <= 2)
      return { texto: "Diversificar", color: "blue" }
    return { texto: "Esperar", color: "amber" }
  })()

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <Tabs value={periodo} onValueChange={(v) => setPeriodo(v as Periodo)}>
          <TabsList className="bg-white border border-slate-200 shadow-sm">
            <TabsTrigger value="2024" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">
              2024
            </TabsTrigger>
            <TabsTrigger value="2025" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">
              2025
            </TabsTrigger>
            <TabsTrigger value="2026" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">
              2026 (Q1)
            </TabsTrigger>
          </TabsList>
        </Tabs>

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
              Tablero de indicadores — {periodo === "2026" ? "Primer cuatrimestre 2026" : `Año ${periodo}`}
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
                          <TooltipTrigger asChild>
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
              <p className="text-xs text-slate-500">Expansión: <strong>{conteo.expansion}</strong></p>
              <p className="text-xs text-slate-500">Estabilidad: <strong>{conteo.estabilidad}</strong></p>
              <p className="text-xs text-slate-500">Contracción: <strong>{conteo.contraccion}</strong></p>
            </div>
          </CardContent>
        </Card>

        <p className="text-xs text-slate-400 text-right">
          Fuentes: INDEC · BCRA · Ministerio de Trabajo · UTDT — Datos al {periodo === "2026" ? "mayo 2026" : `diciembre ${periodo}`}
        </p>
      </div>
    </TooltipProvider>
  )
}