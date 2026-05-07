"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Indicator = {
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

export const columns: ColumnDef<Indicator>[] = [
  {
    accessorKey: "cat",
    header: "Categoría",
    cell: ({ row }) => {
      const cat = row.getValue("cat") as string
      const labels: Record<string, string> = {
        actividad: "Actividad",
        industria: "Industria",
        empleo: "Empleo",
        importaciones: "Importaciones",
        precios: "Precios",
        tasas: "Tasas",
        tipo_cambio: "Tipo Cambio",
        confianza: "Confianza",
      }
      return <span className="capitalize">{labels[cat] || cat}</span>
    },
  },
  {
    accessorKey: "per",
    header: "Período",
  },
  {
    accessorKey: "ind",
    header: "Indicador",
  },
  {
    accessorKey: "año",
    header: "Año",
  },
  {
    accessorKey: "tipo",
    header: "Tipo",
  },
  {
    accessorKey: "val",
    header: "Valor",
    cell: ({ row }) => {
      const val = row.getValue("val") as string
      const isNegative = val.includes("-") && !val.includes("+")
      return (
        <span className={isNegative ? "text-red-600 font-medium" : "text-green-600 font-medium"}>
          {val}
        </span>
      )
    },
  },
  {
    accessorKey: "src",
    header: "Fuente",
  },
  {
    accessorKey: "obs",
    header: "Obs",
  },
]