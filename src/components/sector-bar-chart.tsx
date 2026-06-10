"use client"

import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis } from "recharts"

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
  { year: "2024", bien: "Insumos", value: -12.5 },
  { year: "2024", bien: "B. Capital", value: -22.5 },
  { year: "2025", bien: "Insumos", value: 6.5 },
  { year: "2025", bien: "B. Capital", value: 12.5 },
  { year: "2026", bien: "Insumos", value: -4 },
  { year: "2026", bien: "B. Capital", value: -10 },
]

const chartConfig = {
  value: {
    label: "Variación %",
  },
} satisfies ChartConfig

export function SectorBarChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Importaciones Sectoriales</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px]">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(v) => `${v}%`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel hideIndicator />}
            />
            <Bar dataKey="value" radius={4}>
              <LabelList
                dataKey="bien"
                position="top"
                fillOpacity={1}
                fontSize={10}
              />
              {chartData.map((item, index) => (
                <Cell
                  key={`${item.year}-${item.bien}`}
                  fill={item.value > 0 ? "#22c55e" : "#ef4444"}
                />
              ))}
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