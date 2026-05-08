"use client"

import { ArrowDown, ArrowUp } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer } from "recharts"

import { Card } from "@/components/ui/card"

const CARDS = [
  {
    label: "EMAE 2024",
    value: "-9,19%",
    change: -9.19,
    subtext: "Variación acumulada",
    positiveIsGood: false,
    color: "#dc2626",
    sparkData: [20, 35, 25, 40, 30, 45, 35, 50, 40, 55, 45, 30],
  },
  {
    label: "Bienes Intermedios 2025",
    value: "-32%",
    change: -32,
    subtext: "Variación interanual",
    positiveIsGood: false,
    color: "#facc15",
    sparkData: [60, 50, 55, 45, 50, 40, 45, 35, 40, 30, 35, 25],
  },
  {
    label: "Empleo Industrial 2026",
    value: "-3,6%",
    change: -3.6,
    subtext: "Acumulado (1.120.000 puestos)",
    positiveIsGood: false,
    color: "#22c55e",
    sparkData: [50, 52, 48, 53, 50, 55, 52, 58, 55, 60, 58, 62],
  },
  {
    label: "IPC 2026",
    value: "10,4%",
    change: -10.4,
    subtext: "Ene-Mar - Acumulado",
    positiveIsGood: false,
    color: "#f97316",
    sparkData: [70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15],
  },
]

export function KpiSparklineCards() {
  return (
    <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {CARDS.map((card) => {
        const isUp = card.change >= 0
        const isGood = card.positiveIsGood ? isUp : !isUp
        const id = card.label.replace(/[^a-z]/gi, "")
        return (
          <Card key={card.label} className="flex flex-col overflow-hidden" style={{ borderLeft: `4px solid ${card.color}` }}>
            <div className="flex-1 px-5 pt-5 pb-4">
              <div className="mb-3 flex items-start justify-between gap-2">
                <p className="text-muted-foreground text-xs leading-tight font-medium">
                  {card.label}
                </p>
                <span
                  className={`inline-flex shrink-0 items-center gap-0.5 text-xs font-semibold ${
                    isGood
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {isUp ? (
                    <ArrowUp className="h-3 w-3" />
                  ) : (
                    <ArrowDown className="h-3 w-3" />
                  )}
                  {Math.abs(card.change).toFixed(1)}%
                </span>
              </div>
              <p className="text-foreground mb-1 text-3xl font-medium tracking-tight">
                {card.value}
              </p>
              <p className="text-muted-foreground text-xs">{card.subtext}</p>
            </div>
            <div className="h-20 w-full px-5 pb-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={card.sparkData.map((v, i) => ({ i, v }))}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id={`spark-${id}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor={card.color}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="100%"
                        stopColor={card.color}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke={card.color}
                    strokeWidth={2}
                    fill={`url(#spark-${id})`}
                    dot={false}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        )
      })}
    </div>
  )
}