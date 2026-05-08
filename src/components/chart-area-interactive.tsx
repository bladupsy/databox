"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
  { month: "Ene", ipc: 211, ipim: 276, tasa: 100 },
  { month: "Feb", ipc: 180, ipim: 240, tasa: 80 },
  { month: "Mar", ipc: 150, ipim: 200, tasa: 60 },
  { month: "Abr", ipc: 120, ipim: 160, tasa: 50 },
  { month: "May", ipc: 100, ipim: 130, tasa: 45 },
  { month: "Jun", ipc: 80, ipim: 110, tasa: 40 },
  { month: "Jul", ipc: 60, ipim: 90, tasa: 38 },
  { month: "Ago", ipc: 50, ipim: 75, tasa: 35 },
  { month: "Sep", ipc: 45, ipim: 65, tasa: 32 },
  { month: "Oct", ipc: 40, ipim: 55, tasa: 30 },
  { month: "Nov", ipc: 35, ipim: 50, tasa: 30 },
  { month: "Dic", ipc: 32, ipim: 45, tasa: 30 },
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

export function ChartAreaInteractive() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolución de Precios y Tasas</CardTitle>
        <CardDescription>Serie histórica 2024-2026</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} className="stroke-muted" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
            />
            <defs>
              <linearGradient id="colorIpc" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(187, 85%, 53%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(187, 85%, 53%)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorIpim" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(25, 95%, 53%)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorTasa" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(45, 93%, 47%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(45, 93%, 47%)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area
              dataKey="ipc"
              type="monotone"
              stroke="hsl(187, 85%, 53%)"
              fill="url(#colorIpc)"
              strokeWidth={2}
            />
            <Area
              dataKey="ipim"
              type="monotone"
              stroke="hsl(25, 95%, 53%)"
              fill="url(#colorIpim)"
              strokeWidth={2}
            />
            <Area
              dataKey="tasa"
              type="monotone"
              stroke="hsl(45, 93%, 47%)"
              fill="url(#colorTasa)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}