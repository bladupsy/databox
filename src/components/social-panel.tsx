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
      <div className="mx-auto grid grid-cols-1 rounded-xl sm:grid-cols-2 lg:grid-cols-3 w-full gap-2">
        {SOCIAL_INDICADORES.map((stat) => (
          <Card
            key={stat.name}
            className="border shadow-sm py-4 px-5 bg-card"
          >
            <div className="text-sm font-medium text-muted-foreground mb-1">
              {stat.name}
            </div>
            <div
              className={cn(
                "text-xs font-semibold mb-1",
                stat.changeType === "positive"
                  ? "text-green-600 dark:text-green-400"
                  : stat.changeType === "negative"
                    ? "text-red-600 dark:text-red-400"
                    : "text-slate-500"
              )}
            >
              {stat.changeType === "negative" ? "↓" : stat.changeType === "positive" ? "↑" : "→"}{" "}{stat.change}
            </div>
            <div className="tabular-nums text-2xl font-medium tracking-tight text-foreground">
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {stat.periodo}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}