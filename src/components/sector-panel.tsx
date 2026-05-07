"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const SECTOR_INDICADORES = [
  {
    name: "Import. Insumos",
    value: "-3% a -5%",
    change: "-3% a -5%",
    changeType: "negative",
    periodo: "Ene-Feb 2026 - Variación",
  },
  {
    name: "Import. B. Capital",
    value: "-8% a -12%",
    change: "-8% a -12%",
    changeType: "negative",
    periodo: "Ene-Feb 2026 - Variación",
  },
  {
    name: "Empleo Industrial",
    value: "-1,5% a -2%",
    change: "-1,5% a -2%",
    changeType: "negative",
    periodo: "2026 - Acumulado",
  },
  {
    name: "Bienes Intermedios",
    value: "-3% a -5%",
    change: "-3% a -5%",
    changeType: "negative",
    periodo: "Ene-Feb 2026 - Variación",
  },
  {
    name: "Bienes de Capital",
    value: "-8% a -12%",
    change: "-8% a -12%",
    changeType: "negative",
    periodo: "Ene-Feb 2026 - Variación",
  },
]

export function SectorPanel() {
  return (
    <div className="flex items-center justify-center ">
      <div className="mx-auto grid grid-cols-1 gap-px rounded-xl bg-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 w-full">
        {SECTOR_INDICADORES.map((stat, index) => (
          <Card
            key={stat.name}
            className={cn(
              "rounded-none border-0 shadow-none py-0 bg-card",
              index === 0 && "rounded-l-xl",
              index === SECTOR_INDICADORES.length - 1 && "rounded-r-xl"
            )}
          >
            <CardContent className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-2 p-4 sm:p-4">
              <div className="text-sm font-medium text-muted-foreground w-full">
                {stat.name}
              </div>
              <div
                className={cn(
                  "tabular-nums text-xs font-semibold font-sans",
                  stat.changeType === "positive"
                    ? "text-green-600 dark:text-green-400"
                    : stat.changeType === "negative"
                      ? "text-red-600 dark:text-red-400"
                      : "text-slate-500"
                )}
              >
                {stat.changeType === "negative" ? "↓" : stat.changeType === "positive" ? "↑" : "→"}{" "}{stat.change}
              </div>
              <div className="tabular-nums w-full flex-none text-2xl font-medium tracking-tight text-foreground">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground w-full truncate">
                {stat.periodo}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}