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
    label: "EMAE / PIB",
    value: "-2,1%",
    change: -2.1,
    subtext: "Variación interanual febrero 2026",
    positiveIsGood: false,
    color: "#378ADD",
  },
  {
    label: "Inflación IPC",
    value: "10,4%",
    change: -200.6,
    subtext: "Acumulado ene-mar 2026 (antes 211%)",
    positiveIsGood: true,
    color: "#22c55e",
  },
  {
    label: "Tasa BCRA",
    value: "30-35%",
    change: -70,
    subtext: "Política monetaria actual",
    positiveIsGood: true,
    color: "#1D9E75",
  },
  {
    label: "Tipo de Cambio",
    value: "$1.250",
    change: 0,
    subtext: "Dólar oficial mayo 2026",
    positiveIsGood: true,
    color: "#EF9F27",
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