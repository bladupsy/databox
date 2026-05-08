"use client"

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const CARDS = [
  {
    label: "EMAE 2026",
    value: "-5,70%",
    change: -5.7,
    subtext: "Feb 2026 (acum. ene-feb)",
    positiveIsGood: false,
    color: "#dc2626",
  },
  {
    label: "IPC 2024",
    value: "117%",
    change: -117,
    subtext: "Inflación anual",
    positiveIsGood: false,
    color: "#facc15",
  },
  {
    label: "IPC 2026",
    value: "10,4%",
    change: -10.4,
    subtext: "Acumulado ene-mar 2026",
    positiveIsGood: false,
    color: "#22c55e",
  },
  {
    label: "Tasa BCRA",
    value: "30%",
    change: 30,
    subtext: "Política monetaria actual",
    positiveIsGood: true,
    color: "#f97316",
  },
]

export function SectionCardsMacro() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {CARDS.map((card) => {
        const isUp = card.change >= 0
        const isGood = card.positiveIsGood ? isUp : !isUp
        
        return (
          <Card key={card.label} className="@container/card" style={{ borderTop: `4px solid ${card.color}` }}>
            <CardHeader>
              <CardDescription className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: card.color }} />
                {card.label}
              </CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {card.value}
              </CardTitle>
              <CardAction>
                <Badge 
                  variant="outline"
                  className={isGood ? "text-green-600 border-green-600" : "text-red-600 border-red-600"}
                >
                  {isUp ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />}
                  {Math.abs(card.change).toFixed(1)}%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {isGood ? "Mejora significativa" : "Caída registrada"} 
                {isUp ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />}
              </div>
              <div className="text-muted-foreground">
                {card.subtext}
              </div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}