"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const MACRO_INDICADORES = [
  {
    name: "EMAE / PIB (Expect.)",
    value: "8,1%",
    change: "-109,7%",
    changeType: "negative",
    periodo: "REM 2026 - Proyección",
  },
  {
    name: "IPC (Acumulado)",
    value: "9,4%",
    change: "-108,4%",
    changeType: "positive",
    periodo: "Ene-Mar 2026 - Acumulado",
  },
  {
    name: "IPIM (Acumulado)",
    value: "6,1%",
    change: "-110,9%",
    changeType: "positive",
    periodo: "Ene-Mar 2026 - Acumulado",
  },
  {
    name: "Tasa BCRA",
    value: "30-35%",
    change: "-70%",
    changeType: "positive",
    periodo: "2026 - Actual",
  },
  {
    name: "Tipo de Cambio",
    value: "$1250-1400",
    change: "+10%",
    changeType: "neutral",
    periodo: "2026 - Actual",
  },
  {
    name: "Confianza (ICE)",
    value: "50-60",
    change: "+15",
    changeType: "positive",
    periodo: "2026 - Actual",
  },
]

export function MacroIndicadores() {
  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto grid grid-cols-1 gap-px rounded-xl bg-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 w-full">
        {MACRO_INDICADORES.map((stat, index) => (
          <Card
            key={stat.name}
            className={cn(
              "rounded-none border-0 shadow-none py-0 bg-card",
              index === 0 && "rounded-l-xl",
              index === MACRO_INDICADORES.length - 1 && "rounded-r-xl"
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