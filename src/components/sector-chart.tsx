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
  { date: "2024", bienesIntermedios: -12.5, bienesCapital: -22.5, empleo: -4.5 },
  { date: "2025", bienesIntermedios: 6.5, bienesCapital: 12.5, empleo: -2.5 },
  { date: "2026", bienesIntermedios: -4, bienesCapital: -10, empleo: -1.75 },
]

const chartConfig = {
  bienesIntermedios: {
    label: "Bienes Intermedios",
    color: "#06b6d4",
  },
  bienesCapital: {
    label: "Bienes de Capital",
    color: "#f97316",
  },
  empleo: {
    label: "Empleo Industrial",
    color: "#8b5cf6",
  },
} satisfies ChartConfig

export function SectorChart() {
  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>Evolución Sectorial</CardTitle>
          <CardDescription>
            Variación anual (%) - 2024/2025/2026
          </CardDescription>
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
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
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
              dataKey="bienesIntermedios"
              type="monotone"
              stroke={chartConfig.bienesIntermedios.color}
              strokeWidth={2}
              dot={{ fill: chartConfig.bienesIntermedios.color, r: 4 }}
            />
            <Line
              dataKey="bienesCapital"
              type="monotone"
              stroke={chartConfig.bienesCapital.color}
              strokeWidth={2}
              dot={{ fill: chartConfig.bienesCapital.color, r: 4 }}
            />
            <Line
              dataKey="empleo"
              type="monotone"
              stroke={chartConfig.empleo.color}
              strokeWidth={2}
              dot={{ fill: chartConfig.empleo.color, r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}