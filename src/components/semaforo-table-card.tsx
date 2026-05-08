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
]

const semaforoConfig = {
  expansion: {
    label: "Estabilidad",
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

export function SemaforoTableCard() {
  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b">
            <TableHead className="h-12 px-4 font-medium">Variable</TableHead>
            <TableHead className="h-12 px-4 font-medium">Situación 2026</TableHead>
            <TableHead className="h-12 px-4 font-medium text-center">Tendencia</TableHead>
            <TableHead className="h-12 px-4 font-medium">Lectura</TableHead>
            <TableHead className="h-12 px-4 font-medium text-center">Semáforo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {datos.map((item, index) => {
            const cfg = semaforoConfig[item.semaforo]
            return (
              <TableRow
                key={item.variable}
                className={cn(
                  "hover:bg-muted/50",
                  cfg.rowClass,
                  index === datos.length - 1 && "border-b-0"
                )}
              >
                <TableCell className="px-4 py-3 font-medium">
                  {item.variable}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm">
                  {item.situacion}
                </TableCell>
                <TableCell className="px-4 py-3 text-center text-lg">
                  {item.tendencia}
                </TableCell>
                <TableCell className="px-4 py-3 text-sm text-muted-foreground">
                  {item.lectura}
                </TableCell>
                <TableCell className="px-4 py-3 text-center">
                  <Badge
                    variant="outline"
                    className={cn("text-xs font-semibold", cfg.badgeClass)}
                  >
                    {cfg.emoji} {cfg.label}
                  </Badge>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}