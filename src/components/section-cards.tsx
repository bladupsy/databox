"use client"

import { ArrowDown, ArrowUp } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer } from "recharts"

import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const CARDS = [
  {
    label: "Macroeconomía",
    value: "-2,1%",
    change: -2.1,
    subtext: "PIB / EMAE - Feb 2026",
    positiveIsGood: false,
    color: "#378ADD",
    sparkData: [20, 35, 25, 40, 30, 45, 35, 50, 40, 55, 45, 30],
  },
  {
    label: "Sector Manufacturero",
    value: "-8,7%",
    change: -8.7,
    subtext: "Producción - Feb 2026",
    positiveIsGood: false,
    color: "#1D9E75",
    sparkData: [60, 50, 55, 45, 50, 40, 45, 35, 40, 30, 35, 25],
  },
  {
    label: "Social / Territorial",
    value: "35-40%",
    change: 0,
    subtext: "Pobreza - 2026 Estimado",
    positiveIsGood: false,
    color: "#7F77DD",
    sparkData: [50, 52, 48, 53, 50, 55, 52, 58, 55, 60, 58, 62],
  },
  {
    label: "Semáforo",
    value: "Contracción",
    change: -5,
    subtext: "Análisis integral del sector",
    positiveIsGood: false,
    color: "#EF9F27",
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
            <Separator />
            <div className="h-20 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={card.sparkData.map((v, i) => ({ i, v }))}
                  margin={{ top: 6, right: 0, left: 0, bottom: 0 }}
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