"use client"

import * as React from "react"
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts"

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
  ChartLegend,
  type ChartConfig,
} from "@/components/ui/chart"

const chartData = [
  { year: "2024", bienesIntermedios: -12.5, bienesCapital: -22.5, empleo: -4.5 },
  { year: "2025", bienesIntermedios: 6.5, bienesCapital: 12.5, empleo: -2.5 },
  { year: "2026", bienesIntermedios: -4, bienesCapital: -10, empleo: -1.75 },
]

const chartConfig = {
  produccion: {
    label: "Producción Industrial",
    color: "#f97316",
  },
  empleo: {
    label: "Empleo Industrial",
    color: "#ef4444",
  },
  consumo: {
    label: "Consumo Supermercados",
    color: "#eab308",
  },
} satisfies ChartConfig

export function ActivityChart() {
  const latestValue = chartData[chartData.length - 1]

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>Actividad Económica</CardTitle>
          <CardDescription>
            Variación interanual (%)
          </CardDescription>
        </div>
        <div className="flex">
          {(["produccion", "empleo", "consumo"] as const).map((key) => (
            <div
              key={key}
              className="flex flex-1 flex-col justify-center gap-1 border-t px-4 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-6 sm:py-6"
            >
              <span className="text-xs text-muted-foreground">
                {chartConfig[key].label}
              </span>
              <span className="text-lg leading-none font-medium sm:text-3xl">
                {latestValue[key]}%
              </span>
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
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
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
            />
            <ChartLegend />
            <Line
              dataKey="produccion"
              type="monotone"
              stroke={chartConfig.produccion.color}
              strokeWidth={2}
              dot={{ fill: chartConfig.produccion.color, r: 4 }}
            />
            <Line
              dataKey="empleo"
              type="monotone"
              stroke={chartConfig.empleo.color}
              strokeWidth={2}
              dot={{ fill: chartConfig.empleo.color, r: 4 }}
            />
            <Line
              dataKey="consumo"
              type="monotone"
              stroke={chartConfig.consumo.color}
              strokeWidth={2}
              dot={{ fill: chartConfig.consumo.color, r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}