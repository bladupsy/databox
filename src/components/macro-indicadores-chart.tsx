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
  { date: "2024", ipc: 117.8, ipim: 117, tasa: 40 },
  { date: "2025", ipc: 31.5, ipim: 31.5, tasa: 30 },
  { date: "2026", ipc: 9.4, ipim: 6.1, tasa: 32.5 },
]

const chartConfig = {
  ipc: {
    label: "IPC",
    color: "#dc2626",
  },
  ipim: {
    label: "IPIM",
    color: "#facc15",
  },
  tasa: {
    label: "Tasa BCRA",
    color: "#f97316",
  },
} satisfies ChartConfig

export function MacroIndicadoresChart() {
  const latestValue = chartData[chartData.length - 1]

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>Indicadores Macroeconómicos</CardTitle>
          <CardDescription>
            Evolución anual (%) - 2024/2025/2026
          </CardDescription>
        </div>
        <div className="flex">
          {(["ipc", "ipim", "tasa"] as const).map((key) => (
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
              dataKey="ipc"
              type="monotone"
              stroke={chartConfig.ipc.color}
              strokeWidth={2}
              dot={{ fill: chartConfig.ipc.color, r: 4 }}
            />
            <Line
              dataKey="ipim"
              type="monotone"
              stroke={chartConfig.ipim.color}
              strokeWidth={2}
              dot={{ fill: chartConfig.ipim.color, r: 4 }}
            />
            <Line
              dataKey="tasa"
              type="monotone"
              stroke={chartConfig.tasa.color}
              strokeWidth={2}
              dot={{ fill: chartConfig.tasa.color, r: 4 }}
            />
          </LineChart>
        </ChartContainer>
        <div className="mt-4 border-t pt-3 text-xs text-muted-foreground">
          <strong>Fuente:</strong> INDEC y BCRA
        </div>
      </CardContent>
    </Card>
  )
}