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
  { year: "2024", total: -25, capital: -30, insumos: -20 },
  { year: "2025", total: 18, capital: 20, insumos: 15 },
  { year: "2026", total: 15, capital: 22, insumos: 18 },
]

const chartConfig = {
  total: {
    label: "Importaciones Totales",
    color: "#06b6d4",
  },
  capital: {
    label: "Bienes de Capital",
    color: "#3b82f6",
  },
  insumos: {
    label: "Insumos",
    color: "#8b5cf6",
  },
} satisfies ChartConfig

export function ImportsChart() {
  const latestValue = chartData[chartData.length - 1]

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>Importaciones</CardTitle>
          <CardDescription>
            Variación interanual (%)
          </CardDescription>
        </div>
        <div className="flex">
          {(["total", "capital", "insumos"] as const).map((key) => (
            <div
              key={key}
              className="flex flex-1 flex-col justify-center gap-1 border-t px-4 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-6 sm:py-6"
            >
              <span className="text-xs text-muted-foreground">
                {chartConfig[key].label}
              </span>
              <span className="text-lg leading-none font-bold sm:text-3xl">
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
              content={
                <ChartTooltipContent
                  className="w-[200px]"
                  labelFormatter={(value) => `Año: ${value}`}
                  formatter={(value) => `${value}%`}
                />
              }
            />
            <ChartLegend />
            <Line
              dataKey="total"
              type="monotone"
              stroke={chartConfig.total.color}
              strokeWidth={2}
              dot={{ fill: chartConfig.total.color, r: 4 }}
            />
            <Line
              dataKey="capital"
              type="monotone"
              stroke={chartConfig.capital.color}
              strokeWidth={2}
              dot={{ fill: chartConfig.capital.color, r: 4 }}
            />
            <Line
              dataKey="insumos"
              type="monotone"
              stroke={chartConfig.insumos.color}
              strokeWidth={2}
              dot={{ fill: chartConfig.insumos.color, r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}