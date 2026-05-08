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
  { 
    date: "2024", 
    tasaBCRA: 100, 
    creditoPyME: 160, 
    tasaBienesCapital: 43, 
    tasaTecnologia: 40 
  },
  { 
    date: "2025", 
    tasaBCRA: 32, 
    creditoPyME: 52.5, 
    tasaBienesCapital: 21.5, 
    tasaTecnologia: 20 
  },
  { 
    date: "2026", 
    tasaBCRA: 29, 
    creditoPyME: 44, 
    tasaBienesCapital: 15, 
    tasaTecnologia: 15 
  },
]

const chartConfig = {
  tasaBCRA: {
    label: "Tasa BCRA",
    color: "#dc2626",
  },
  creditoPyME: {
    label: "Crédito PyME",
    color: "#facc15",
  },
  tasaBienesCapital: {
    label: "Tasa B. Capital",
    color: "#f97316",
  },
  tasaTecnologia: {
    label: "Tasa Tecnología",
    color: "#22c55e",
  },
} satisfies ChartConfig

export function TasasChart() {
  const latestValue = chartData[chartData.length - 1]

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>Tasas de Interés</CardTitle>
          <CardDescription>
            Tasas y Crédito (%) - 2024/2025/2026
          </CardDescription>
        </div>
        <div className="flex flex-wrap">
          {(["tasaBCRA", "creditoPyME", "tasaBienesCapital", "tasaTecnologia"] as const).map((key) => (
            <div
              key={key}
              className="flex flex-1 flex-col justify-center gap-1 border-t px-4 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-6 sm:py-6 min-w-[120px]"
            >
              <span className="text-xs text-muted-foreground">
                {chartConfig[key].label}
              </span>
              <span className="text-lg leading-none font-medium sm:text-3xl">
                {`${latestValue[key]}%`}
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
              dataKey="tasaBCRA"
              type="monotone"
              stroke={chartConfig.tasaBCRA.color}
              strokeWidth={2}
              dot={{ fill: chartConfig.tasaBCRA.color, r: 4 }}
            />
            <Line
              dataKey="creditoPyME"
              type="monotone"
              stroke={chartConfig.creditoPyME.color}
              strokeWidth={2}
              dot={{ fill: chartConfig.creditoPyME.color, r: 4 }}
            />
            <Line
              dataKey="tasaBienesCapital"
              type="monotone"
              stroke={chartConfig.tasaBienesCapital.color}
              strokeWidth={2}
              dot={{ fill: chartConfig.tasaBienesCapital.color, r: 4 }}
            />
            <Line
              dataKey="tasaTecnologia"
              type="monotone"
              stroke={chartConfig.tasaTecnologia.color}
              strokeWidth={2}
              dot={{ fill: chartConfig.tasaTecnologia.color, r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}