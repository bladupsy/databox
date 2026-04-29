"use client"

import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { indicadoresData } from "@/lib/data"

const chartConfig = Object.fromEntries(
  indicadoresData.map((ind) => [
    ind.indicador,
    {
      label: ind.indicador,
      color: ind.color,
    },
  ])
)

export function DataBox() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {indicadoresData.map((ind) => (
        <Card key={ind.indicador} className="min-h-[300px]">
          <CardHeader>
            <CardTitle>{ind.indicador}</CardTitle>
            <CardDescription>
              Variación {ind.data[0].tipo}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                [ind.indicador]: {
                  label: ind.indicador,
                  color: ind.color,
                },
              }}
              className="min-h-[200px] w-full"
            >
              <LineChart
                accessibilityLayer
                data={ind.data}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="year"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => String(value)}
                />
                <YAxis
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip content={<ChartTooltipContent />} />
                <Line
                  dataKey="value"
                  type="monotone"
                  stroke={ind.color}
                  strokeWidth={2}
                  dot={{ fill: ind.color, r: 4 }}
                  name={ind.indicador}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}