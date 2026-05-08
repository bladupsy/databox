"use client"

import { Badge } from "@/components/ui/badge"
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
import { InfoIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface Indicador {
  id: number
  cat: string
  per: string
  ind: string
  año: string
  tipo: string
  val: string
  src: string
  obs: string
}

const indicadores: Indicador[] = [
  { id: 1, cat: "actividad", per: "2024 (acum.)", ind: "EMAE", año: "2024", tipo: "Variación acumulada", val: "-9,19%", src: "INDEC / FIE", obs: "Ver informe EMAE 2024" },
  { id: 2, cat: "actividad", per: "Feb 2026 (acum. ene–feb)", ind: "EMAE", año: "2026", tipo: "Variación mensual", val: "-5,70%", src: "INDEC", obs: "(INDEC)" },
  { id: 3, cat: "actividad", per: "Feb 2026 (interanual)", ind: "EMAE", año: "2026", tipo: "Interanual mensual", val: "—", src: "INDEC", obs: "Ver EMAE feb 2026" },
  { id: 4, cat: "actividad", per: "2025 (acum. estimado)", ind: "EMAE / PBI", año: "2025", tipo: "Crecimiento estimado", val: "+0,8%", src: "INDEC + analistas", obs: "Ver EMAE dic 2025" },
  { id: 5, cat: "industria", per: "2025", ind: "Bienes intermedios", año: "2025", tipo: "Variación interanual", val: "-32%", src: "INDEC", obs: "Insumos productivos" },
  { id: 6, cat: "industria", per: "2026 (ene–feb)", ind: "Bienes intermedios", año: "2026", tipo: "Interanual", val: "-3,8%", src: "INDEC", obs: "Serie mensual" },
  { id: 7, cat: "industria", per: "2025", ind: "Bienes de capital", año: "2025", tipo: "Variación interanual", val: "-20%", src: "INDEC", obs: "Equipos y maquinaria" },
  { id: 8, cat: "industria", per: "2026 (ene–feb)", ind: "Bienes de capital", año: "2026", tipo: "Interanual", val: "-20%", src: "INDEC", obs: "Serie mensual" },
  { id: 9, cat: "empleo", per: "2023 (base)", ind: "Empleo industrial", año: "2023", tipo: "Nivel", val: "1.225.000", src: "—", obs: "Nivel previo a la caída" },
  { id: 10, cat: "empleo", per: "2024", ind: "Empleo industrial", año: "2024", tipo: "Variación anual", val: "-4,9% (-55.000)", src: "—", obs: "Caída empleo industrial" },
  { id: 11, cat: "empleo", per: "2025", ind: "Empleo industrial", año: "2025", tipo: "Variación anual", val: "-3,0% (-30.000)", src: "—", obs: "Continúa deterioro industrial" },
  { id: 12, cat: "empleo", per: "2026 (acum.)", ind: "Empleo industrial", año: "2026", tipo: "Variación", val: "-3,6% (-15.000 a -20.000)", src: "—", obs: "Empeora" },
  { id: 13, cat: "empleo", per: "2023 (base)", ind: "Empleo total", año: "2023", tipo: "Nivel", val: "13.300.000", src: "—", obs: "Nivel previo" },
  { id: 14, cat: "empleo", per: "2024", ind: "Empleo total", año: "2024", tipo: "Variación anual", val: "-3,1% (-200.000)", src: "—", obs: "Caída empleo total" },
  { id: 15, cat: "empleo", per: "2025", ind: "Empleo total", año: "2025", tipo: "Variación anual", val: "+0,1% (+50.000)", src: "—", obs: "Ligera recuperación" },
  { id: 16, cat: "empleo", per: "2026 (acum.)", ind: "Empleo total", año: "2026", tipo: "Variación", val: "0% (-30.000)", src: "—", obs: "Estabilidad con leve baja" },
  { id: 17, cat: "importaciones", per: "2024", ind: "Importaciones totales", año: "2024", tipo: "Variación anual", val: "-17%", src: "INDEC", obs: "CIF USD" },
  { id: 18, cat: "importaciones", per: "2025", ind: "Importaciones totales", año: "2025", tipo: "Variación anual", val: "+24,7%", src: "INDEC", obs: "Recuperación" },
  { id: 19, cat: "importaciones", per: "2026 (ene–mar)", ind: "Importaciones totales", año: "2026", tipo: "Variación", val: "-7,3%", src: "INDEC", obs: "Mensual/interanual" },
  { id: 20, cat: "importaciones", per: "2024", ind: "Bienes intermedios", año: "2024", tipo: "Variación anual", val: "-6%", src: "INDEC", obs: "Uso económico" },
  { id: 21, cat: "importaciones", per: "2025", ind: "Bienes intermedios", año: "2025", tipo: "Variación anual", val: "+5,5%", src: "INDEC", obs: "Insumos industriales" },
  { id: 22, cat: "importaciones", per: "2026 (ene–feb)", ind: "Bienes intermedios", año: "2026", tipo: "Variación", val: "+29%", src: "INDEC", obs: "Serie mensual" },
  { id: 23, cat: "importaciones", per: "2024", ind: "Bienes de capital", año: "2024", tipo: "Variación anual", val: "-16%", src: "INDEC", obs: "Uso económico" },
  { id: 24, cat: "importaciones", per: "2025", ind: "Bienes de capital", año: "2025", tipo: "Variación anual", val: "+51,3%", src: "INDEC", obs: "Equipos y maquinaria" },
  { id: 25, cat: "importaciones", per: "2026 (ene–feb)", ind: "Bienes de capital", año: "2026", tipo: "Variación", val: "+21%", src: "INDEC", obs: "Serie mensual" },
  { id: 26, cat: "precios", per: "2024", ind: "IPC", año: "2024", tipo: "Observado anual", val: "117%", src: "INDEC", obs: "Precios al consumidor" },
  { id: 27, cat: "precios", per: "2025", ind: "IPC", año: "2025", tipo: "Estimación", val: "31,5%", src: "INDEC", obs: "Inflación consumidor" },
  { id: 28, cat: "precios", per: "2026 (ene–mar)", ind: "IPC", año: "2026", tipo: "Observado acum.", val: "10,4%", src: "INDEC", obs: "IPC 04/26" },
  { id: 29, cat: "precios", per: "2024", ind: "IPIM", año: "2024", tipo: "Observado anual", val: "117%", src: "INDEC", obs: "Precios mayoristas" },
  { id: 30, cat: "precios", per: "2025", ind: "IPIM", año: "2025", tipo: "Estimación", val: "31,5%", src: "INDEC", obs: "Costos mayoristas" },
  { id: 31, cat: "precios", per: "2026 (ene–mar)", ind: "IPIM", año: "2026", tipo: "Observado acum.", val: "6,1%", src: "INDEC", obs: "IPIM 04/26" },
  { id: 32, cat: "precios", per: "2024", ind: "REM", año: "2024", tipo: "Expectativa", val: "117,8%", src: "BCRA", obs: "REM 2024" },
  { id: 33, cat: "precios", per: "2025", ind: "REM", año: "2025", tipo: "Expectativa", val: "30,45%", src: "BCRA", obs: "REM" },
  { id: 34, cat: "precios", per: "2026", ind: "REM", año: "2026", tipo: "Proyección", val: "9,6%", src: "BCRA", obs: "REM" },
  { id: 35, cat: "tasas", per: "2024", ind: "Tasa BCRA", año: "2024", tipo: "Política monetaria", val: "40%", src: "BCRA", obs: "Costo base" },
  { id: 36, cat: "tasas", per: "2025", ind: "Tasa BCRA", año: "2025", tipo: "Política monetaria", val: "40%", src: "BCRA", obs: "Costo base" },
  { id: 37, cat: "tasas", per: "2026", ind: "Tasa BCRA", año: "2026", tipo: "Política monetaria", val: "30%", src: "BCRA", obs: "Costo base" },
  { id: 38, cat: "tasas", per: "2024", ind: "Crédito PyME", año: "2024", tipo: "Financiamiento", val: "120%", src: "BCRA", obs: "Costo real" },
  { id: 39, cat: "tasas", per: "2025", ind: "Crédito PyME", año: "2025", tipo: "Financiamiento", val: "80%", src: "BCRA", obs: "Costo real" },
  { id: 40, cat: "tasas", per: "2026", ind: "Crédito PyME", año: "2026", tipo: "Financiamiento", val: "70%", src: "BCRA", obs: "Costo real" },
  { id: 41, cat: "tasas", per: "2024", ind: "Tasa bienes de capital", año: "2024", tipo: "Subsidio", val: "60%", src: "Estado/Bancos", obs: "Inversión" },
  { id: 42, cat: "tasas", per: "2025", ind: "Tasa bienes de capital", año: "2025", tipo: "Subsidio", val: "50%", src: "Estado/Bancos", obs: "Inversión" },
  { id: 43, cat: "tasas", per: "2026", ind: "Tasa bienes de capital", año: "2026", tipo: "Subsidio", val: "45%", src: "Estado/Bancos", obs: "Inversión" },
  { id: 44, cat: "tasas", per: "2024", ind: "Tasa tecnología", año: "2024", tipo: "Subsidio", val: "50%", src: "Estado/Bancos", obs: "Innovación" },
  { id: 45, cat: "tasas", per: "2025", ind: "Tasa tecnología", año: "2025", tipo: "Subsidio", val: "45%", src: "Estado/Bancos", obs: "Innovación" },
  { id: 46, cat: "tasas", per: "2026", ind: "Tasa tecnología", año: "2026", tipo: "Subsidio", val: "40%", src: "Estado/Bancos", obs: "Innovación" },
  { id: 47, cat: "tipo_cambio", per: "—", ind: "Tipo de cambio oficial", año: "2024", tipo: "Tipo de cambio", val: "~$800 → $1.050", src: "BCRA", obs: "Salto" },
  { id: 48, cat: "tipo_cambio", per: "—", ind: "Tipo de cambio oficial", año: "2025", tipo: "Tipo de cambio", val: "~$1.050 → $1.250", src: "BCRA", obs: "Corrección" },
  { id: 49, cat: "tipo_cambio", per: "Actual", ind: "Tipo de cambio oficial", año: "2026", tipo: "Tipo de cambio", val: "≈ $1.250 – $1.400", src: "BCRA", obs: "Precio actual del dólar" },
  { id: 51, cat: "confianza", per: "2024", ind: "ICE", año: "2024", tipo: "Observado", val: "-15,67", src: "UTDT", obs: "Confianza empresarial" },
  { id: 52, cat: "confianza", per: "2025", ind: "ICE", año: "2025", tipo: "Observado", val: "-1,17", src: "UTDT", obs: "ICE anual" },
  { id: 53, cat: "confianza", per: "2026", ind: "ICE", año: "2026", tipo: "Último dato", val: "-13", src: "UTDT", obs: "ICE mensual" },
  { id: 54, cat: "confianza", per: "2024", ind: "ETN industria", año: "2024", tipo: "Expectativas", val: "-12", src: "INDEC", obs: "ETN 2024" },
  { id: 55, cat: "confianza", per: "2025", ind: "ETN industria", año: "2025", tipo: "Expectativas", val: "-17,8", src: "INDEC", obs: "ETN 2025" },
  { id: 56, cat: "confianza", per: "2026 (T1–T2)", ind: "ETN industria", año: "2026", tipo: "Expectativas", val: "-21,4", src: "INDEC", obs: "ETN 2026" },
  { id: 57, cat: "consumo", per: "2024", ind: "Ventas tecnología", año: "2024", tipo: "Variación real", val: "-18%", src: "—", obs: "—" },
  { id: 58, cat: "consumo", per: "2025", ind: "Ventas tecnología", año: "2025", tipo: "Variación real", val: "-1,7%", src: "—", obs: "—" },
  { id: 59, cat: "consumo", per: "2026", ind: "Ventas tecnología", año: "2026", tipo: "Variación real", val: "-1%", src: "—", obs: "NO CONSOLIDADO" }
]

function getCategoryBadge(cat: string) {
  switch (cat) {
    case "actividad":
      return (
        <Badge variant="outline" className="bg-blue-500/15 text-blue-700 border-0">
          Actividad
        </Badge>
      )
    case "industria":
      return (
        <Badge variant="outline" className="bg-cyan-500/15 text-cyan-700 border-0">
          Industria
        </Badge>
      )
    case "empleo":
      return (
        <Badge variant="outline" className="bg-purple-500/15 text-purple-700 border-0">
          Empleo
        </Badge>
      )
    case "importaciones":
      return (
        <Badge variant="outline" className="bg-amber-500/15 text-amber-700 border-0">
          Importaciones
        </Badge>
      )
    case "precios":
      return (
        <Badge variant="outline" className="bg-red-500/15 text-red-700 border-0">
          Precios
        </Badge>
      )
    case "tasas":
      return (
        <Badge variant="outline" className="bg-green-500/15 text-green-700 border-0">
          Tasas
        </Badge>
      )
    case "tipo_cambio":
      return (
        <Badge variant="outline" className="bg-orange-500/15 text-orange-700 border-0">
          Tipo de cambio
        </Badge>
      )
    case "confianza":
      return (
        <Badge variant="outline" className="bg-pink-500/15 text-pink-700 border-0">
          Confianza
        </Badge>
      )
    case "consumo":
      return (
        <Badge variant="outline" className="bg-yellow-500/15 text-yellow-700 border-0">
          Consumo
        </Badge>
      )
    default:
      return <Badge variant="secondary">{cat}</Badge>
  }
}

function getValueColor(val: string) {
  const cleanVal = val.replace(/[+%→$]/g, "").replace(/,/g, ".")
  const num = parseFloat(cleanVal)
  if (isNaN(num)) return "text-foreground"
  if (num > 0) return "text-green-600 dark:text-green-400"
  if (num < 0) return "text-red-600 dark:text-red-400"
  return "text-foreground"
}

export default function IndicadoresTable() {
  return (
    <div className="rounded-lg border bg-card w-full">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b">
            <TableHead className="h-12 px-4 font-medium">Indicador</TableHead>
            <TableHead className="h-12 px-4 font-medium">Categoría</TableHead>
            <TableHead className="h-12 px-4 font-medium">Período</TableHead>
            <TableHead className="h-12 px-4 font-medium">Año</TableHead>
            <TableHead className="h-12 px-4 font-medium">Tipo</TableHead>
            <TableHead className="h-12 px-4 font-medium">Valor</TableHead>
            <TableHead className="h-12 px-4 font-medium">Fuente</TableHead>
            <TableHead className="h-12 px-4 font-medium w-[60px]">Info</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {indicadores.map((ind) => (
            <TableRow key={ind.id} className="hover:bg-muted/50">
              <TableCell className="h-16 px-4 font-medium">
                {ind.ind}
              </TableCell>
              <TableCell className="h-16 px-4">
                {getCategoryBadge(ind.cat)}
              </TableCell>
              <TableCell className="h-16 px-4 text-sm text-muted-foreground">
                {ind.per}
              </TableCell>
              <TableCell className="h-16 px-4 text-sm">
                {ind.año}
              </TableCell>
              <TableCell className="h-16 px-4 text-sm text-muted-foreground">
                {ind.tipo}
              </TableCell>
              <TableCell className={cn("h-16 px-4 font-semibold", getValueColor(ind.val))}>
                {ind.val}
              </TableCell>
              <TableCell className="h-16 px-4 text-sm text-muted-foreground">
                {ind.src}
              </TableCell>
              <TableCell className="h-16 px-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="cursor-pointer p-2 hover:bg-slate-100 rounded">
                        <InfoIcon className="size-4 text-slate-500" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">{ind.obs}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}