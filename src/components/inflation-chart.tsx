"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartData = [
  { date: "2024-01-01", ipc: 118, ipim: 190 },
  { date: "2025-01-01", ipc: 31, ipim: 54 },
  { date: "2026-03-01", ipc: 32, ipim: 40 },
]

function getLineColor(value: number, isNegative: boolean): string {
  if (isNegative) {
    if (value <= -20) return "#dc2626"
    if (value <= -10) return "#ef4444"
    if (value <= -5) return "#f97316"
    return "#eab308"
  }
  if (value >= 0) {
    if (value <= 10) return "#22c55e"
    if (value <= 25) return "#06b6d4"
    if (value <= 50) return "#14b8a6"
    return "#64748b"
  }
  return "#64748b"
}

const chartConfig = {
  views: {
    label: "Inflación",
  },
  ipc: {
    label: "IPC",
    color: "#06b6d4",
  },
  ipim: {
    label: "IPIM",
    color: "#f97316",
  },
} satisfies ChartConfig

export function InflationChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("ipc")

  const total = React.useMemo(
    () => ({
      ipc: chartData.map((d) => d.ipc),
      ipim: chartData.map((d) => d.ipim),
    }),
    []
  )

  const latestValue = chartData[chartData.length - 1]
  const ipcValue = latestValue?.ipc ?? 0
  const ipimValue = latestValue?.ipim ?? 0

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>Índice de Precios</CardTitle>
          <CardDescription>
            Variación interanual (%)
          </CardDescription>
        </div>
        <div className="flex">
          {["ipc", "ipim"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {key === "ipc" ? `${ipcValue}%` : `${ipimValue}%`}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("es-AR", {
                  year: "numeric",
                })
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("es-AR", {
                      year: "numeric",
                      month: "long",
                    })
                  }}
                  formatter={(value) => `${value}%`}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={activeChart === "ipc" ? "#06b6d4" : "#f97316"}
              strokeWidth={2}
              dot={{ fill: activeChart === "ipc" ? "#06b6d4" : "#f97316", r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}