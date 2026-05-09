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

interface Indicador {
  dimension: string
  estado: "expansion" | "estabilidad" | "contraccion"
  lectura: string
}

const datos: Indicador[] = [
  { dimension: "Actividad (EMAE)", estado: "estabilidad", lectura: "Estabilización" },
  { dimension: "Inflación (IPC)", estado: "expansion", lectura: "Mejora (desaceleración)" },
  { dimension: "Ventas Sectoriales", estado: "contraccion", lectura: "Contracción" },
  { dimension: "Import. Bienes de Capital", estado: "expansion", lectura: "Expansión (reequipamiento)" },
  { dimension: "Empleo Industrial", estado: "contraccion", lectura: "Contracción" },
  { dimension: "Confianza Empresarial", estado: "contraccion", lectura: "Deterioro" },
]

const estadoConfig: Record<
  string,
  { emoji: string; label: string; badgeClass: string; rowClass: string }
> = {
  expansion: {
    emoji: "🟢",
    label: "VERDE",
    badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-200",
    rowClass: "bg-emerald-50/30",
  },
  estabilidad: {
    emoji: "🟡",
    label: "AMARILLO",
    badgeClass: "bg-amber-100 text-amber-800 border-amber-200",
    rowClass: "bg-amber-50/30",
  },
  contraccion: {
    emoji: "🔴",
    label: "ROJO",
    badgeClass: "bg-red-100 text-red-800 border-red-200",
    rowClass: "bg-red-50/30",
  },
}

export function DesempenoSemaforoTable() {
  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-800 hover:bg-slate-800">
            <TableHead className="text-white font-semibold text-sm">Dimensión</TableHead>
            <TableHead className="text-white font-semibold text-sm text-center">Estado</TableHead>
            <TableHead className="text-white font-semibold text-sm">Lectura</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {datos.map((ind) => {
            const cfg = estadoConfig[ind.estado]
            return (
              <TableRow
                key={ind.dimension}
                className={cn("border-b border-slate-100", cfg.rowClass)}
              >
                <TableCell className="font-medium text-slate-700 py-3 px-4">
                  {ind.dimension}
                </TableCell>
                <TableCell className="text-center py-3 px-4">
                  <Badge
                    variant="outline"
                    className={cn("text-xs font-bold", cfg.badgeClass)}
                  >
                    {cfg.emoji} {cfg.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-600 text-sm py-3 px-4">
                  {ind.lectura}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}