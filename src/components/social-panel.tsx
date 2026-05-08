"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const SOCIAL_INDICADORES = [
  {
    name: "Empleo Industrial 2023",
    value: "1.225.000",
    change: "Base",
    changeType: "neutral",
    periodo: "Puestos previos",
  },
  {
    name: "Empleo Industrial 2026",
    value: "1.120.000",
    change: "Nivel",
    changeType: "negative",
    periodo: "Puestos actuales",
  },
  {
    name: "Variación 2026",
    value: "-3,6%",
    change: "-3,6%",
    changeType: "negative",
    periodo: "Acumulado",
  },
]

export function SocialPanel() {
  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto grid grid-cols-1 gap-px rounded-xl bg-border sm:grid-cols-2 lg:grid-cols-4 w-full">
        {SOCIAL_INDICADORES.map((stat, index) => (
          <Card
            key={stat.name}
            className={cn(
              "rounded-none border-0 shadow-none py-0 bg-card",
              index === 0 && "rounded-l-xl",
              index === SOCIAL_INDICADORES.length - 1 && "rounded-r-xl"
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