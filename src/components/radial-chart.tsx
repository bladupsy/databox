"use client"

import { TrendingDown, TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  type ChartConfig,
} from "@/components/ui/chart"

const chartConfigs = {
  ipc: {
    label: "Inflación IPC",
    value: 32,
    description: "Variación interanual - 2026",
  },
  ipim: {
    label: "Inflación IPIM",
    value: 40,
    description: "Variación interanual - 2026",
  },
  tc: {
    label: "Tipo de Cambio",
    value: 1350,
    description: "USD - 2026",
  },
  tasa: {
    label: "Tasa de Interés",
    value: 25,
    description: "TNA % - 2026",
  },
  produccion: {
    label: "Producción Manufacturera",
    value: -8.7,
    description: "Variación - 2026",
  },
  empleo: {
    label: "Empleo Industrial",
    value: -2,
    description: "Variación - 2026",
  },
  consumo: {
    label: "Consumo Supermercados",
    value: -5,
    description: "Var Real % - 2026",
  },
  importaciones: {
    label: "Importaciones Totales",
    value: 15,
    description: "Interanual % - 2026",
  },
  insumos: {
    label: "Importación Insumos",
    value: 10,
    description: "Interanual % - 2026",
  },
  bienesCapital: {
    label: "Importación Bienes Capital",
    value: 22,
    description: "Interanual % - 2026",
  },
} satisfies Record<string, { label: string; value: number; description: string }>

const chartConfig = {
  value: {
    label: "Valor",
  },
} satisfies ChartConfig

function RadialCard({
  key,
  config,
}: {
  key: string
  config: (typeof chartConfigs)[keyof typeof chartConfigs]
}) {
  const isPositive = config.value >= 0
  const color = isPositive ? "#22c55e" : "#ef4444"
  const chartData = [
    {
      visitors: Math.abs(config.value),
      fill: color,
    },
  ]

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{config.label}</CardTitle>
        <CardDescription>{config.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={100}
            innerRadius={65}
            outerRadius={95}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="visitors" background />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                          fill={color}
                        >
                          {config.value}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {config.value >= 0 ? "Positivo" : "Negativo"}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          {config.value >= 0 ? "Tendencia positiva" : "Tendencia negativa"}
          {config.value >= 0 ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Variación {config.value >= 0 ? "alcista" : "bajista"} vs período
          anterior
        </div>
      </CardFooter>
    </Card>
  )
}

export function RadialCharts() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Object.entries(chartConfigs).map(([key, config]) => (
        <RadialCard key={key} config={config} />
      ))}
    </div>
  )
}