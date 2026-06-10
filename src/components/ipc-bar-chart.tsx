"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

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
  { year: "2024", ipc: 117.8 },
  { year: "2025", ipc: 31.5 },
  { year: "2026", ipc: 9.4 },
]

const chartConfig = {
  ipc: {
    label: "IPC",
    color: "#dc2626",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig

export function IpcBarChartHorizontal() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>IPC - Inflación Anual</CardTitle>
        <CardDescription>Variación anual (%) - 2024/2025/2026</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <ChartContainer config={chartConfig} className="h-[250px]">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 40,
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} vertical={false} />
            <YAxis
              dataKey="year"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />
            <XAxis dataKey="ipc" type="number" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}%`} domain={[0, 250]} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="ipc" fill="#f97316" radius={4} barSize={30}>
              <LabelList
                dataKey="year"
                position="insideLeft"
                offset={8}
                className="fill-white font-semibold"
                fontSize={12}
              />
              <LabelList
                dataKey="ipc"
                position="right"
                offset={8}
                className="fill-foreground font-semibold"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
        <div className="mt-4 border-t pt-3 text-xs text-muted-foreground">
          <strong>Fuente:</strong>{" "}
          <a href="https://www.indec.gob.ar/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            INDEC
          </a>
        </div>
      </CardContent>
    </Card>
  )
}