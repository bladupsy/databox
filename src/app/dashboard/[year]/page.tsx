import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { KpiSparklineCards } from "@/components/section-cards"
import { MacroIndicadores } from "@/components/macro-indicadores"
import { InformeCoyuntura } from "@/components/informe-coyuntura"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { columns } from "@/components/columns"
import { InflationChart } from "@/components/inflation-chart"
import { ImportsChart } from "@/components/imports-chart"
import { ActivityChart } from "@/components/activity-chart"

import data from "../../data.json"

interface Props {
  params: Promise<{ year: string }>
}

export default async function DashboardYear({ params }: Props) {
  const { year } = await params
  const yearData = data.filter((d) => d.año === year)

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 flex flex-col bg-slate-50">
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-6 overflow-auto">
          <div className="flex flex-col gap-4 md:gap-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Dashboard {year}</h1>
              <p className="text-slate-500">Indicadores del año {year}</p>
            </div>
            
            <KpiSparklineCards />
            
            <div>
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Panel Macroeconómico</h2>
              <MacroIndicadores />
            </div>
            
            <InformeCoyuntura />
            
            <div className="grid gap-6">
              <ChartAreaInteractive />
              
              <div className="grid md:grid-cols-2 gap-6">
                <InflationChart />
                <ImportsChart />
              </div>
              
              <ActivityChart />
              
              {yearData.length > 0 && <DataTable columns={columns} data={yearData} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}