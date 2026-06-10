"use client"

import * as React from "react"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts"
import { Info, Download, BarChart3, Table as TableIcon, Calendar, TrendingUp } from "lucide-react"

// Importar los datos JSON de la carpeta stp-grupo-a
import stpDataRaw from "../../../stp-grupo-a/data/stp-grupo-a-data.json"

interface IndicatorMeta {
  id: string
  description: string
  source: string
  units: string
  dataset: string
  frequency: string
  note?: string
  url?: string
}

interface Indicator {
  key: string
  title: string
  etapas: number[]
  points: [string, number][]
  meta: IndicatorMeta
  chart_type: "line" | "bar"
  y_label: string
  intro: string
  conclusion: string
}

interface StpData {
  generated_at: string
  periodo: string
  grupo: string
  indicators: Indicator[]
}

const stpData = stpDataRaw as unknown as StpData

const SPANISH_MONTHS: Record<string, string> = {
  "01": "Ene", "02": "Feb", "03": "Mar", "04": "Abr",
  "05": "May", "06": "Jun", "07": "Jul", "08": "Ago",
  "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dic"
}

function formatPeriod(periodStr: string): string {
  const parts = periodStr.split("-")
  if (parts.length === 2) {
    const [year, month] = parts
    const yrShort = year.substring(2)
    const monthName = SPANISH_MONTHS[month] || month
    return `${monthName} ${yrShort}`
  }
  return periodStr
}

function formatVal(v: number | null): string {
  if (v === null) return "—"
  if (Math.abs(v) >= 1000000) {
    return v.toLocaleString("es-AR", { maximumFractionDigits: 0 })
  }
  return v.toLocaleString("es-AR", { maximumFractionDigits: 2 })
}

const FALLBACK_SOURCES: Record<string, string> = {
  ipc: "Instituto Nacional de Estadística y Censos (INDEC)",
  rf_primario: "Secretaría de Hacienda, Ministerio de Economía",
  rf_global: "Secretaría de Hacienda, Ministerio de Economía",
  bienes_personales: "Administración Federal de Ingresos Públicos (AFIP) / INDEC",
  ingresos_tributarios_total: "Administración Federal de Ingresos Públicos (AFIP) / INDEC",
  iva: "Administración Federal de Ingresos Públicos (AFIP) / INDEC",
  ganancias: "Administración Federal de Ingresos Públicos (AFIP) / INDEC",
  presion_tributaria: "AFIP / INDEC / Ministerio de Economía",
  tc_nominal: "Banco Central de la República Argentina (BCRA) / INDEC",
  tc_real: "Banco Central de la República Argentina (BCRA)",
  badlar: "Banco Central de la República Argentina (BCRA)",
  tib: "Banco Central de la República Argentina (BCRA)",
  gini: "Instituto Nacional de Estadística y Censos (INDEC)",
  ingreso_laboral: "Instituto Nacional de Estadística y Censos (INDEC)",
  deuda_pib: "Secretaría de Finanzas, Ministerio de Economía"
}

function getIndicatorSource(key: string, originalSource?: string): string {
  if (originalSource && originalSource !== "—") {
    return originalSource
  }
  return FALLBACK_SOURCES[key] || "INDEC / BCRA / Ministerio de Economía"
}

const FALLBACK_URLS: Record<string, string> = {
  ipc: "https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31",
  rf_primario: "https://datos.gob.ar/dataset/sspm-resultado-base-caja-sector-publico-nacional-no-financiero",
  rf_global: "https://datos.gob.ar/dataset/sspm-resultado-base-caja-sector-publico-nacional-no-financiero",
  bienes_personales: "https://www.argentina.gob.ar/economia/ingresospublicos/recaudacion",
  ingresos_tributarios_total: "https://www.argentina.gob.ar/economia/ingresospublicos/recaudacion",
  iva: "https://www.argentina.gob.ar/economia/ingresospublicos/recaudacion",
  ganancias: "https://www.argentina.gob.ar/economia/ingresospublicos/recaudacion",
  presion_tributaria: "https://www.argentina.gob.ar/economia/ingresospublicos/recaudacion",
  tc_nominal: "https://www.bcra.gob.ar/PublicacionesEstadisticas/Principales_variables.asp",
  tc_real: "https://www.bcra.gob.ar/PublicacionesEstadisticas/Principales_variables.asp",
  badlar: "https://www.bcra.gob.ar/PublicacionesEstadisticas/Principales_variables.asp",
  tib: "https://www.bcra.gob.ar/PublicacionesEstadisticas/Principales_variables.asp",
  gini: "https://www.indec.gob.ar/indec/web/Nivel4-Tema-4-31-60",
  ingreso_laboral: "https://www.indec.gob.ar/indec/web/Nivel4-Tema-4-31-60",
  deuda_pib: "https://www.argentina.gob.ar/economia/finanzas/deudapublica/informes-trimestrales-de-la-deuda"
}

function getIndicatorUrl(key: string, originalUrl?: string): string {
  if (originalUrl) {
    return originalUrl
  }
  return FALLBACK_URLS[key] || "https://datos.gob.ar/"
}

export default function StpPage() {
  const [view, setView] = React.useState<"charts" | "table">("charts")
  const [selectedIndKey, setSelectedIndKey] = React.useState<string>(
    stpData.indicators[0]?.key || ""
  )
  const [expandedCard, setExpandedCard] = React.useState<Record<string, boolean>>({})

  // Alternar detalles expandidos para un indicador
  const toggleExpand = (key: string) => {
    setExpandedCard(prev => ({ ...prev, [key]: !prev[key] }))
  }

  // Preparar tabla consolidada
  const { consolidatedHeaders, consolidatedRows, downloadCsvContent } = React.useMemo(() => {
    const indicators = stpData.indicators
    const dfs: Record<string, Record<string, number | null>> = {}

    // Agrupar todos los puntos por período
    indicators.forEach(ind => {
      ind.points.forEach(([period, val]) => {
        if (!dfs[period]) {
          dfs[period] = {}
        }
        dfs[period][ind.key] = val
      })
    })

    const periods = Object.keys(dfs).sort()
    const headers = [
      "Período",
      ...indicators.map(ind => {
        const isMillions = ind.y_label.includes("Millones")
        return isMillions ? `${ind.title} (miles de millones)` : ind.title
      })
    ]

    const rows = periods.map(p => {
      const rowData: Record<string, string | number | null> = { period: p }
      indicators.forEach(ind => {
        const rawVal = dfs[p][ind.key]
        const isMillions = ind.y_label.includes("Millones")
        rowData[ind.key] = rawVal !== undefined && rawVal !== null
          ? (isMillions ? rawVal / 1000 : rawVal)
          : null
      })
      return rowData
    })

    // Construir contenido CSV
    const csvHeaders = [
      "Periodo",
      ...indicators.map(ind => {
        const isMillions = ind.y_label.includes("Millones")
        const headerTitle = isMillions ? `${ind.title} (miles de millones)` : ind.title
        return headerTitle.replace(/,/g, " ")
      })
    ].join(",")
    
    const csvLines = periods.map(p => {
      const lineData = [p]
      indicators.forEach(ind => {
        const rawVal = dfs[p][ind.key]
        const isMillions = ind.y_label.includes("Millones")
        const val = rawVal !== undefined && rawVal !== null
          ? (isMillions ? rawVal / 1000 : rawVal)
          : null
        lineData.push(val !== null ? String(val) : "")
      })
      return lineData.join(",")
    })
    const csvContent = [csvHeaders, ...csvLines].join("\n")

    return {
      consolidatedHeaders: headers,
      consolidatedRows: rows,
      downloadCsvContent: csvContent
    }
  }, [])

  const handleDownloadCsv = () => {
    const blob = new Blob([downloadCsvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "stp-grupo-a-consolidado.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Estadísticas del indicador individual seleccionado
  const selectedInd = stpData.indicators.find(i => i.key === selectedIndKey)
  const isSelectedIndMillions = selectedInd?.y_label.includes("Millones") || false
  const displaySelectedYLabel = selectedInd && isSelectedIndMillions
    ? selectedInd.y_label.replace("Millones", "Miles de millones").replace("millones", "miles de millones")
    : selectedInd?.y_label || ""

  const selectedStats = React.useMemo(() => {
    if (!selectedInd || !selectedInd.points.length) return null
    
    const vals = selectedInd.points.map(([_, v]) => {
      if (v === null) return null
      return isSelectedIndMillions ? v / 1000 : v
    }).filter((v): v is number => v !== null)
    
    if (!vals.length) return null

    const sum = vals.reduce((a, b) => a + b, 0)
    const avg = sum / vals.length
    const min = Math.min(...vals)
    const max = Math.max(...vals)
    const lastPoint = selectedInd.points[selectedInd.points.length - 1]
    const lastVal = lastPoint[1] !== null && isSelectedIndMillions ? lastPoint[1] / 1000 : lastPoint[1]

    return {
      lastVal,
      lastPeriod: lastPoint[0],
      avg,
      min,
      max
    }
  }, [selectedInd, isSelectedIndMillions])

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Cabecera del Panel */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              📈 STP — Grupo A <Badge variant="secondary" className="bg-blue-100 text-blue-800">Taller de Datos</Badge>
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Indicadores oficiales de Argentina (INDEC, BCRA, Ministerio de Economía) · Período 2023–2026.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={view === "charts" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("charts")}
              className="flex items-center gap-2"
            >
              <BarChart3 className="size-4" />
              Gráficos
            </Button>
            <Button
              variant={view === "table" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("table")}
              className="flex items-center gap-2"
            >
              <TableIcon className="size-4" />
              Tabla de Datos
            </Button>
          </div>
        </div>

        {view === "charts" ? (
          /* Vista de Gráficos */
          <div className="space-y-6">
            {stpData.indicators.map(ind => {
              const isMillions = ind.y_label.includes("Millones")
              const displayYLabel = isMillions 
                ? ind.y_label.replace("Millones", "Miles de millones").replace("millones", "miles de millones")
                : ind.y_label

              const chartData = ind.points.map(([p, v]) => ({
                periodo: p,
                periodoFormat: formatPeriod(p),
                valor: v !== null && isMillions ? v / 1000 : v
              }))

              return (
                <Card key={ind.key} className="overflow-hidden border-slate-200 shadow-sm">
                  <CardHeader className="bg-white border-b pb-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="space-y-1">
                        <CardTitle className="text-lg font-semibold text-slate-800">
                          {ind.title}
                        </CardTitle>
                        <CardDescription className="text-slate-500 text-sm">
                          {ind.intro}
                        </CardDescription>
                      </div>
                      <div className="flex gap-1">
                        {ind.etapas.map(e => (
                          <Badge key={e} variant="outline" className="bg-slate-100 text-slate-700 border-slate-300">
                            Etapa {e}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 bg-white space-y-6">
                    {/* Gráfico Recharts */}
                    <div className="h-[320px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        {ind.chart_type === "bar" ? (
                          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis
                              dataKey="periodoFormat"
                              tick={{ fill: "#64748b", fontSize: 11 }}
                              tickLine={false}
                              axisLine={false}
                            />
                            <YAxis
                              tick={{ fill: "#64748b", fontSize: 11 }}
                              tickFormatter={(v) => formatVal(v)}
                              tickLine={false}
                              axisLine={false}
                              width={60}
                            />
                            <Tooltip
                              contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }}
                              labelStyle={{ fontWeight: "bold", color: "#1e293b" }}
                              formatter={(value: any) => [formatVal(value === undefined || value === null ? null : Number(value)), displayYLabel]}
                            />
                            <Bar dataKey="valor" fill="#3b82f6" radius={[4, 4, 0, 0]} name={displayYLabel} />
                          </BarChart>
                        ) : (
                          <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis
                              dataKey="periodoFormat"
                              tick={{ fill: "#64748b", fontSize: 11 }}
                              tickLine={false}
                              axisLine={false}
                            />
                            <YAxis
                              tick={{ fill: "#64748b", fontSize: 11 }}
                              tickFormatter={(v) => formatVal(v)}
                              tickLine={false}
                              axisLine={false}
                              width={60}
                            />
                            <Tooltip
                              contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px" }}
                              labelStyle={{ fontWeight: "bold", color: "#1e293b" }}
                              formatter={(value: any) => [formatVal(value === undefined || value === null ? null : Number(value)), displayYLabel]}
                            />
                            <Line
                              type="monotone"
                              dataKey="valor"
                              stroke="#3b82f6"
                              strokeWidth={3}
                              dot={{ r: 4, stroke: "#3b82f6", strokeWidth: 2, fill: "#ffffff" }}
                              activeDot={{ r: 6 }}
                              name={displayYLabel}
                            />
                          </LineChart>
                        )}
                      </ResponsiveContainer>
                    </div>

                    {/* Fuente en Caption */}
                    <div className="text-xs text-slate-400 border-t pt-3 flex items-center justify-between">
                      <span>
                        <strong>Fuente:</strong>{" "}
                        <a
                          href={getIndicatorUrl(ind.key, ind.meta.url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                        >
                          {getIndicatorSource(ind.key, ind.meta.source)} ↗
                        </a>
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpand(ind.key)}
                        className="text-slate-500 hover:text-slate-700 h-7 text-xs px-2 py-1 flex items-center gap-1"
                      >
                        <Info className="size-3" />
                        {expandedCard[ind.key] ? "Ocultar detalles" : "Ver detalles de la serie"}
                      </Button>
                    </div>

                    {/* Fila inferior con Conclusión y Detalles */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="md:col-span-2 bg-slate-50 rounded-lg p-4 border border-slate-100 flex items-start gap-2.5">
                        <TrendingUp className="size-5 text-blue-600 mt-0.5 shrink-0" />
                        <div>
                          <h4 className="text-sm font-semibold text-slate-800">Conclusión del análisis</h4>
                          <p className="text-sm text-slate-600 mt-1">{ind.conclusion}</p>
                        </div>
                      </div>

                      {expandedCard[ind.key] && (
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 space-y-2 text-sm text-slate-600">
                          <h4 className="font-semibold text-slate-800 text-xs uppercase tracking-wider">Metadatos de la Serie</h4>
                          <div><span className="font-medium text-slate-700">Frecuencia:</span> {ind.meta.frequency}</div>
                          <div><span className="font-medium text-slate-700">Unidades:</span> {ind.meta.units}</div>
                          <div><span className="font-medium text-slate-700">Dataset:</span> {ind.meta.dataset}</div>
                          <div><span className="font-medium text-slate-700">Serie ID:</span> <code className="bg-slate-200 px-1 rounded text-xs">{ind.meta.id}</code></div>
                          {ind.meta.note && (
                            <div className="text-xs italic border-t pt-1.5 mt-1.5">{ind.meta.note}</div>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          /* Vista de Tabla de Datos */
          <div className="space-y-8">
            {/* Tabla Consolidada */}
            <Card className="border-slate-200 shadow-sm bg-white">
              <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b">
                <div>
                  <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <TableIcon className="size-5 text-blue-600" />
                    Tabla Consolidada
                  </CardTitle>
                  <CardDescription className="text-slate-500 text-sm">
                    Consolidado mensual de todas las series de datos del Grupo A.
                    <span className="block mt-1 text-xs text-slate-400">
                      <strong>Fuentes:</strong> {Array.from(new Set(stpData.indicators.map(ind => getIndicatorSource(ind.key, ind.meta.source)))).join(" · ")}
                    </span>
                  </CardDescription>
                </div>
                <Button onClick={handleDownloadCsv} size="sm" className="flex items-center gap-2 self-start sm:self-auto">
                  <Download className="size-4" />
                  Descargar CSV
                </Button>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="overflow-x-auto max-h-[450px]">
                  <table className="w-full text-sm border-collapse text-left">
                    <thead className="bg-slate-50 border-b sticky top-0 z-10">
                      <tr>
                        <th className="p-3.5 font-semibold text-slate-700 border-r w-[110px]">Período</th>
                        {stpData.indicators.map(ind => (
                          <th key={ind.key} className="p-3.5 font-semibold text-slate-700 text-right border-r min-w-[150px] last:border-0">
                            {ind.title.split(" (")[0]}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {consolidatedRows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="p-3.5 font-medium text-slate-900 border-r bg-slate-50/20">
                            {formatPeriod(row.period as string)}
                          </td>
                          {stpData.indicators.map(ind => {
                            const val = row[ind.key] as number | null
                            return (
                              <td key={ind.key} className="p-3.5 text-right font-mono text-slate-600 border-r last:border-0">
                                {val !== null ? formatVal(val) : <span className="text-slate-300">—</span>}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Selector por indicador individual */}
            <Card className="border-slate-200 shadow-sm bg-white">
              <CardHeader className="border-b">
                <CardTitle className="text-lg font-semibold text-slate-800">
                  Estadísticas y Detalle Individual
                </CardTitle>
                <CardDescription>
                  Seleccione una variable para ver su comportamiento estadístico e histórico de datos.
                </CardDescription>
                <div className="mt-4 max-w-md">
                  <select
                    value={selectedIndKey}
                    onChange={(e) => setSelectedIndKey(e.target.value)}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {stpData.indicators.map(ind => (
                      <option key={ind.key} value={ind.key}>
                        {ind.title}
                      </option>
                    ))}
                  </select>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                {selectedStats && selectedInd ? (
                  <>
                    {/* Tarjetas de Estadísticas */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="border border-slate-100 bg-slate-50/50 p-4 rounded-lg">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                          Último Valor ({formatPeriod(selectedStats.lastPeriod)})
                        </span>
                        <span className="text-2xl font-bold text-slate-800 block mt-1">
                          {selectedStats.lastVal !== null ? formatVal(selectedStats.lastVal) : "—"}
                        </span>
                        <span className="text-xs text-slate-400 mt-1 block">
                          {selectedInd.y_label}
                        </span>
                      </div>
                      
                      <div className="border border-slate-100 bg-slate-50/50 p-4 rounded-lg">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                          Promedio del Período
                        </span>
                        <span className="text-2xl font-bold text-slate-800 block mt-1">
                          {formatVal(selectedStats.avg)}
                        </span>
                        <span className="text-xs text-slate-400 mt-1 block">
                          Media aritmética
                        </span>
                      </div>

                      <div className="border border-slate-100 bg-slate-50/50 p-4 rounded-lg">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                          Valor Mínimo
                        </span>
                        <span className="text-2xl font-bold text-red-600 block mt-1">
                          {formatVal(selectedStats.min)}
                        </span>
                        <span className="text-xs text-slate-400 mt-1 block">
                          Mínimo histórico 23–26
                        </span>
                      </div>

                      <div className="border border-slate-100 bg-slate-50/50 p-4 rounded-lg">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                          Valor Máximo
                        </span>
                        <span className="text-2xl font-bold text-green-600 block mt-1">
                          {formatVal(selectedStats.max)}
                        </span>
                        <span className="text-xs text-slate-400 mt-1 block">
                          Máximo histórico 23–26
                        </span>
                      </div>
                    </div>

                    {/* Tabla de Datos del Indicador */}
                    <div className="border border-slate-200 rounded-lg overflow-hidden">
                      <div className="bg-slate-50 border-b p-3 flex justify-between items-center">
                        <span className="text-sm font-semibold text-slate-700">Historial de datos</span>
                        <span className="text-xs text-slate-500">
                          <strong>Fuente:</strong>{" "}
                          <a
                            href={getIndicatorUrl(selectedInd.key, selectedInd.meta.url)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                          >
                            {getIndicatorSource(selectedInd.key, selectedInd.meta.source)} ↗
                          </a>
                        </span>
                      </div>
                      
                      <div className="max-h-[300px] overflow-y-auto">
                        <table className="w-full text-sm border-collapse text-left">
                          <thead className="bg-slate-100 border-b sticky top-0 z-10">
                            <tr>
                              <th className="p-2.5 font-semibold text-slate-600">Período</th>
                              <th className="p-2.5 font-semibold text-slate-600 text-right">{displaySelectedYLabel}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 bg-white">
                            {[...selectedInd.points].reverse().map(([p, v], idx) => (
                              <tr key={idx} className="hover:bg-slate-50/50">
                                <td className="p-2.5 text-slate-700 font-medium">{formatPeriod(p)}</td>
                                <td className="p-2.5 text-right font-mono text-slate-600">
                                  {v !== null ? formatVal(isSelectedIndMillions ? v / 1000 : v) : "—"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-slate-500 text-sm">No hay datos oficiales disponibles para este indicador.</p>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <footer className="mt-12 border-t bg-white p-6 text-center text-sm text-slate-500">
        <p>Fuentes: INDEC · BCRA · Ministerio de Economía de la Nación — Datos actualizados a 2026</p>
      </footer>
    </div>
  )
}
