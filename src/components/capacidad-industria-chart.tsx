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
  ChartLegend,
  type ChartConfig,
} from "@/components/ui/chart"

const chartData = [
  { period: "Ene 2016", nivelGeneral: 62.9, alimentos: 68.5, quimicos: 66.1, automotriz: 20.4, textiles: 66.9, metalurgica: 52.2 },
  { period: "Feb 2016", nivelGeneral: 64.2, alimentos: 66.8, quimicos: 66.8, automotriz: 43.1, textiles: 72.2, metalurgica: 51.1 },
  { period: "Mar 2016", nivelGeneral: 64.8, alimentos: 67.2, quimicos: 66.3, automotriz: 55.5, textiles: 73.5, metalurgica: 53.1 },
  { period: "Abr 2016", nivelGeneral: 64.8, alimentos: 63.5, quimicos: 67.9, automotriz: 54.6, textiles: 74.4, metalurgica: 53.2 },
  { period: "May 2016", nivelGeneral: 65.0, alimentos: 64.5, quimicos: 65.3, automotriz: 47.5, textiles: 73.3, metalurgica: 56.0 },
  { period: "Jun 2016", nivelGeneral: 64.9, alimentos: 62.7, quimicos: 64.6, automotriz: 50.7, textiles: 73.9, metalurgica: 54.8 },
  { period: "Jul 2016", nivelGeneral: 62.0, alimentos: 61.7, quimicos: 60.6, automotriz: 45.0, textiles: 71.9, metalurgica: 51.1 },
  { period: "Ago 2016", nivelGeneral: 63.6, alimentos: 68.4, quimicos: 59.1, automotriz: 51.4, textiles: 74.0, metalurgica: 51.2 },
  { period: "Sep 2016", nivelGeneral: 63.9, alimentos: 65.7, quimicos: 68.5, automotriz: 51.4, textiles: 69.1, metalurgica: 51.9 },
  { period: "Oct 2016", nivelGeneral: 65.4, alimentos: 65.7, quimicos: 70.3, automotriz: 44.1, textiles: 59.0, metalurgica: 55.7 },
  { period: "Nov 2016", nivelGeneral: 68.4, alimentos: 69.0, quimicos: 74.3, automotriz: 56.3, textiles: 58.8, metalurgica: 57.2 },
  { period: "Dic 2016", nivelGeneral: 63.6, alimentos: 66.9, quimicos: 65.1, automotriz: 45.0, textiles: 48.9, metalurgica: 54.7 },
  { period: "Ene 2017", nivelGeneral: 60.6, alimentos: 65.1, quimicos: 68.5, automotriz: 30.7, textiles: 57.5, metalurgica: 47.3 },
  { period: "Feb 2017", nivelGeneral: 60.0, alimentos: 62.4, quimicos: 68.8, automotriz: 31.5, textiles: 53.9, metalurgica: 42.1 },
  { period: "Mar 2017", nivelGeneral: 65.7, alimentos: 70.2, quimicos: 67.3, automotriz: 48.2, textiles: 57.3, metalurgica: 50.5 },
  { period: "Abr 2017", nivelGeneral: 64.5, alimentos: 64.3, quimicos: 68.6, automotriz: 46.5, textiles: 54.9, metalurgica: 54.5 },
  { period: "May 2017", nivelGeneral: 65.8, alimentos: 65.0, quimicos: 66.9, automotriz: 54.5, textiles: 61.4, metalurgica: 58.8 },
  { period: "Jun 2017", nivelGeneral: 67.1, alimentos: 64.3, quimicos: 67.5, automotriz: 55.0, textiles: 66.2, metalurgica: 58.6 },
  { period: "Jul 2017", nivelGeneral: 65.1, alimentos: 63.9, quimicos: 59.1, automotriz: 45.5, textiles: 65.5, metalurgica: 59.2 },
  { period: "Ago 2017", nivelGeneral: 67.3, alimentos: 65.9, quimicos: 62.3, automotriz: 55.1, textiles: 69.1, metalurgica: 61.1 },
  { period: "Sep 2017", nivelGeneral: 66.3, alimentos: 63.8, quimicos: 64.0, automotriz: 57.1, textiles: 68.3, metalurgica: 54.7 },
  { period: "Oct 2017", nivelGeneral: 68.3, alimentos: 66.3, quimicos: 70.9, automotriz: 52.9, textiles: 62.5, metalurgica: 62.3 },
  { period: "Nov 2017", nivelGeneral: 69.2, alimentos: 67.7, quimicos: 71.0, automotriz: 55.0, textiles: 60.9, metalurgica: 61.2 },
  { period: "Dic 2017", nivelGeneral: 64.0, alimentos: 61.2, quimicos: 68.9, automotriz: 38.3, textiles: 55.7, metalurgica: 55.6 },
  { period: "Ene 2018", nivelGeneral: 61.6, alimentos: 62.7, quimicos: 70.8, automotriz: 25.6, textiles: 57.2, metalurgica: 48.6 },
  { period: "Feb 2018", nivelGeneral: 64.4, alimentos: 61.4, quimicos: 73.0, automotriz: 50.4, textiles: 48.3, metalurgica: 46.2 },
  { period: "Mar 2018", nivelGeneral: 66.8, alimentos: 63.3, quimicos: 71.9, automotriz: 58.2, textiles: 53.6, metalurgica: 54.3 },
  { period: "Abr 2018", nivelGeneral: 67.6, alimentos: 65.0, quimicos: 72.4, automotriz: 55.8, textiles: 52.3, metalurgica: 55.4 },
  { period: "May 2018", nivelGeneral: 65.1, alimentos: 61.5, quimicos: 65.6, automotriz: 55.2, textiles: 59.9, metalurgica: 54.9 },
  { period: "Jun 2018", nivelGeneral: 61.8, alimentos: 59.1, quimicos: 61.8, automotriz: 47.7, textiles: 55.4, metalurgica: 53.6 },
  { period: "Jul 2018", nivelGeneral: 60.1, alimentos: 58.9, quimicos: 50.8, automotriz: 48.1, textiles: 53.6, metalurgica: 51.1 },
  { period: "Ago 2018", nivelGeneral: 63.0, alimentos: 61.7, quimicos: 54.1, automotriz: 57.3, textiles: 53.4, metalurgica: 53.9 },
  { period: "Sep 2018", nivelGeneral: 61.1, alimentos: 59.4, quimicos: 63.2, automotriz: 44.8, textiles: 49.1, metalurgica: 46.0 },
  { period: "Oct 2018", nivelGeneral: 64.8, alimentos: 66.6, quimicos: 69.1, automotriz: 45.9, textiles: 47.4, metalurgica: 49.2 },
  { period: "Nov 2018", nivelGeneral: 63.3, alimentos: 63.5, quimicos: 70.0, automotriz: 44.4, textiles: 43.9, metalurgica: 44.5 },
  { period: "Dic 2018", nivelGeneral: 56.6, alimentos: 58.9, quimicos: 66.4, automotriz: 25.6, textiles: 32.3, metalurgica: 42.8 },
  { period: "Ene 2019", nivelGeneral: 56.2, alimentos: 57.5, quimicos: 68.9, automotriz: 15.7, textiles: 31.4, metalurgica: 38.4 },
  { period: "Feb 2019", nivelGeneral: 58.5, alimentos: 57.6, quimicos: 69.4, automotriz: 42.1, textiles: 43.2, metalurgica: 42.0 },
  { period: "Mar 2019", nivelGeneral: 58.8, alimentos: 55.7, quimicos: 69.6, automotriz: 35.0, textiles: 49.8, metalurgica: 43.1 },
  { period: "Abr 2019", nivelGeneral: 61.6, alimentos: 60.7, quimicos: 70.5, automotriz: 37.6, textiles: 49.5, metalurgica: 46.7 },
  { period: "May 2019", nivelGeneral: 62.0, alimentos: 60.5, quimicos: 70.8, automotriz: 36.6, textiles: 54.6, metalurgica: 49.9 },
  { period: "Jun 2019", nivelGeneral: 59.1, alimentos: 59.8, quimicos: 57.2, automotriz: 34.0, textiles: 53.5, metalurgica: 48.2 },
  { period: "Jul 2019", nivelGeneral: 58.7, alimentos: 63.9, quimicos: 47.5, automotriz: 30.0, textiles: 60.6, metalurgica: 48.5 },
  { period: "Ago 2019", nivelGeneral: 60.5, alimentos: 63.3, quimicos: 51.6, automotriz: 43.5, textiles: 58.8, metalurgica: 47.5 },
  { period: "Sep 2019", nivelGeneral: 57.7, alimentos: 61.6, quimicos: 47.7, automotriz: 37.4, textiles: 57.8, metalurgica: 40.0 },
  { period: "Oct 2019", nivelGeneral: 62.1, alimentos: 64.4, quimicos: 63.7, automotriz: 43.2, textiles: 51.4, metalurgica: 47.3 },
  { period: "Nov 2019", nivelGeneral: 60.7, alimentos: 59.7, quimicos: 68.7, automotriz: 38.7, textiles: 51.6, metalurgica: 42.3 },
  { period: "Dic 2019", nivelGeneral: 56.9, alimentos: 63.3, quimicos: 68.8, automotriz: 21.1, textiles: 41.1, metalurgica: 40.0 },
  { period: "Ene 2020", nivelGeneral: 56.1, alimentos: 58.6, quimicos: 73.8, automotriz: 26.3, textiles: 44.4, metalurgica: 34.6 },
  { period: "Feb 2020", nivelGeneral: 59.4, alimentos: 60.2, quimicos: 71.4, automotriz: 37.5, textiles: 43.9, metalurgica: 39.8 },
  { period: "Mar 2020", nivelGeneral: 51.6, alimentos: 55.6, quimicos: 68.5, automotriz: 25.9, textiles: 28.7, metalurgica: 30.4 },
  { period: "Abr 2020", nivelGeneral: 42.0, alimentos: 59.7, quimicos: 69.3, automotriz: 0.0, textiles: 4.2, metalurgica: 20.1 },
  { period: "May 2020", nivelGeneral: 46.4, alimentos: 57.0, quimicos: 63.0, automotriz: 6.2, textiles: 17.8, metalurgica: 31.7 },
  { period: "Jun 2020", nivelGeneral: 53.3, alimentos: 60.1, quimicos: 59.8, automotriz: 23.0, textiles: 37.8, metalurgica: 43.1 },
  { period: "Jul 2020", nivelGeneral: 56.8, alimentos: 59.5, quimicos: 68.7, automotriz: 29.8, textiles: 43.1, metalurgica: 44.6 },
  { period: "Ago 2020", nivelGeneral: 58.4, alimentos: 60.6, quimicos: 71.1, automotriz: 35.4, textiles: 42.3, metalurgica: 46.9 },
  { period: "Sep 2020", nivelGeneral: 60.8, alimentos: 64.7, quimicos: 69.8, automotriz: 46.2, textiles: 48.5, metalurgica: 44.7 },
  { period: "Oct 2020", nivelGeneral: 61.8, alimentos: 63.7, quimicos: 69.3, automotriz: 40.3, textiles: 48.0, metalurgica: 54.0 },
  { period: "Nov 2020", nivelGeneral: 63.3, alimentos: 65.3, quimicos: 68.7, automotriz: 46.9, textiles: 49.1, metalurgica: 49.9 },
  { period: "Dic 2020", nivelGeneral: 58.4, alimentos: 56.9, quimicos: 63.7, automotriz: 41.0, textiles: 42.4, metalurgica: 49.7 },
  { period: "Ene 2021", nivelGeneral: 56.8, alimentos: 60.0, quimicos: 62.9, automotriz: 31.4, textiles: 43.0, metalurgica: 41.4 },
  { period: "Feb 2021", nivelGeneral: 57.9, alimentos: 62.8, quimicos: 55.5, automotriz: 33.4, textiles: 49.8, metalurgica: 46.3 },
  { period: "Mar 2021", nivelGeneral: 64.2, alimentos: 63.9, quimicos: 70.3, automotriz: 54.8, textiles: 50.7, metalurgica: 50.3 },
  { period: "Abr 2021", nivelGeneral: 63.2, alimentos: 64.8, quimicos: 75.4, automotriz: 39.1, textiles: 52.4, metalurgica: 53.7 },
  { period: "May 2021", nivelGeneral: 61.1, alimentos: 59.1, quimicos: 71.7, automotriz: 44.6, textiles: 52.3, metalurgica: 49.8 },
  { period: "Jun 2021", nivelGeneral: 64.5, alimentos: 63.2, quimicos: 69.6, automotriz: 51.9, textiles: 62.1, metalurgica: 56.0 },
  { period: "Jul 2021", nivelGeneral: 63.7, alimentos: 62.2, quimicos: 70.2, automotriz: 41.1, textiles: 58.4, metalurgica: 54.8 },
  { period: "Ago 2021", nivelGeneral: 64.0, alimentos: 65.7, quimicos: 63.5, automotriz: 47.7, textiles: 54.4, metalurgica: 55.3 },
  { period: "Sep 2021", nivelGeneral: 66.3, alimentos: 68.5, quimicos: 64.9, automotriz: 55.0, textiles: 60.6, metalurgica: 53.6 },
  { period: "Oct 2021", nivelGeneral: 64.3, alimentos: 63.7, quimicos: 64.2, automotriz: 50.8, textiles: 54.8, metalurgica: 54.7 },
  { period: "Nov 2021", nivelGeneral: 68.4, alimentos: 66.6, quimicos: 73.6, automotriz: 60.2, textiles: 59.1, metalurgica: 54.1 },
  { period: "Dic 2021", nivelGeneral: 64.0, alimentos: 65.3, quimicos: 70.8, automotriz: 49.8, textiles: 47.4, metalurgica: 51.9 },
  { period: "Ene 2022", nivelGeneral: 57.5, alimentos: 58.5, quimicos: 73.1, automotriz: 22.5, textiles: 38.1, metalurgica: 41.1 },
  { period: "Feb 2022", nivelGeneral: 64.0, alimentos: 65.4, quimicos: 71.9, automotriz: 51.6, textiles: 58.1, metalurgica: 52.3 },
  { period: "Mar 2022", nivelGeneral: 66.7, alimentos: 64.4, quimicos: 75.9, automotriz: 59.5, textiles: 53.4, metalurgica: 53.8 },
  { period: "Abr 2022", nivelGeneral: 67.1, alimentos: 66.0, quimicos: 73.3, automotriz: 56.9, textiles: 55.0, metalurgica: 61.1 },
  { period: "May 2022", nivelGeneral: 68.0, alimentos: 64.8, quimicos: 74.3, automotriz: 57.1, textiles: 59.5, metalurgica: 57.1 },
  { period: "Jun 2022", nivelGeneral: 69.5, alimentos: 65.4, quimicos: 73.3, automotriz: 59.8, textiles: 67.6, metalurgica: 59.8 },
  { period: "Jul 2022", nivelGeneral: 67.9, alimentos: 63.6, quimicos: 68.9, automotriz: 54.0, textiles: 63.8, metalurgica: 63.2 },
  { period: "Ago 2022", nivelGeneral: 69.6, alimentos: 67.4, quimicos: 69.4, automotriz: 65.3, textiles: 64.5, metalurgica: 61.9 },
  { period: "Sep 2022", nivelGeneral: 68.6, alimentos: 68.6, quimicos: 69.8, automotriz: 65.6, textiles: 62.6, metalurgica: 56.3 },
  { period: "Oct 2022", nivelGeneral: 66.7, alimentos: 62.5, quimicos: 71.3, automotriz: 62.3, textiles: 53.0, metalurgica: 54.8 },
  { period: "Nov 2022", nivelGeneral: 68.9, alimentos: 68.2, quimicos: 74.4, automotriz: 66.2, textiles: 56.3, metalurgica: 54.3 },
  { period: "Dic 2022", nivelGeneral: 63.8, alimentos: 63.9, quimicos: 70.6, automotriz: 44.9, textiles: 43.7, metalurgica: 54.6 },
  { period: "Ene 2023", nivelGeneral: 62.0, alimentos: 60.4, quimicos: 72.1, automotriz: 31.0, textiles: 41.0, metalurgica: 45.3 },
  { period: "Feb 2023", nivelGeneral: 65.0, alimentos: 59.3, quimicos: 74.2, automotriz: 60.5, textiles: 52.4, metalurgica: 52.2 },
  { period: "Mar 2023", nivelGeneral: 67.3, alimentos: 61.3, quimicos: 72.1, automotriz: 72.5, textiles: 52.5, metalurgica: 57.3 },
  { period: "Abr 2023", nivelGeneral: 68.9, alimentos: 62.7, quimicos: 77.0, automotriz: 66.6, textiles: 53.9, metalurgica: 61.0 },
  { period: "May 2023", nivelGeneral: 67.8, alimentos: 64.6, quimicos: 74.5, automotriz: 62.4, textiles: 58.0, metalurgica: 56.3 },
  { period: "Jun 2023", nivelGeneral: 68.6, alimentos: 64.2, quimicos: 74.7, automotriz: 64.9, textiles: 64.4, metalurgica: 60.1 },
  { period: "Jul 2023", nivelGeneral: 65.0, alimentos: 61.3, quimicos: 73.6, automotriz: 57.9, textiles: 63.2, metalurgica: 56.5 },
  { period: "Ago 2023", nivelGeneral: 67.9, alimentos: 64.5, quimicos: 70.4, automotriz: 74.3, textiles: 59.3, metalurgica: 61.2 },
  { period: "Sep 2023", nivelGeneral: 67.9, alimentos: 62.4, quimicos: 75.5, automotriz: 68.6, textiles: 59.1, metalurgica: 51.0 },
  { period: "Oct 2023", nivelGeneral: 65.3, alimentos: 59.6, quimicos: 70.7, automotriz: 61.0, textiles: 55.8, metalurgica: 55.4 },
  { period: "Nov 2023", nivelGeneral: 66.4, alimentos: 65.2, quimicos: 71.4, automotriz: 68.3, textiles: 59.1, metalurgica: 50.3 },
  { period: "Dic 2023", nivelGeneral: 54.9, alimentos: 57.4, quimicos: 58.2, automotriz: 42.6, textiles: 39.9, metalurgica: 37.9 },
  { period: "Ene 2024", nivelGeneral: 54.6, alimentos: 57.7, quimicos: 57.1, automotriz: 25.7, textiles: 36.7, metalurgica: 33.4 },
  { period: "Feb 2024", nivelGeneral: 57.6, alimentos: 58.1, quimicos: 67.8, automotriz: 47.3, textiles: 45.6, metalurgica: 37.3 },
]

const chartConfig = {
  nivelGeneral: {
    label: "Nivel General",
    color: "var(--chart-1)",
  },
  alimentos: {
    label: "Alimentos y Bebidas",
    color: "var(--chart-2)",
  },
  Quimicos: {
    label: "Químicos",
    color: "var(--chart-3)",
  },
  automotriz: {
    label: "Automotriz",
    color: "var(--chart-4)",
  },
  textiles: {
    label: "Textiles",
    color: "var(--chart-5)",
  },
  metalurgica: {
    label: "Metalmecánica",
    color: "var(--chart-6)",
  },
} satisfies ChartConfig

export function CapacidadIndustriaChart() {
  const [selectedSectors, setSelectedSectors] = React.useState<string[]>([
    "nivelGeneral",
    "alimentos",
    "Quimicos",
  ])

  const sectors = Object.keys(chartConfig) as (keyof typeof chartConfig)[]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Utilización de Capacidad Instalada</CardTitle>
        <CardDescription>Industria manufacturera - Mensual 2016-2024 (%)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
          {sectors.map((key) => (
            <button
              key={key}
              onClick={() =>
                setSelectedSectors((prev) =>
                  prev.includes(key)
                    ? prev.filter((k) => k !== key)
                    : [...prev, key]
                )
              }
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                selectedSectors.includes(key)
                  ? "bg-slate-800 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {chartConfig[key].label}
            </button>
          ))}
        </div>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 20, left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={11}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <ChartLegend />
            {selectedSectors.map((key) => (
              <Line
                key={key}
                dataKey={key}
                type="monotone"
                stroke={`var(--color-${key})`}
                strokeWidth={2}
                dot={{
                  fill: `var(--color-${key})`,
                }}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}