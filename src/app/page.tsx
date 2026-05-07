import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SectionCards } from "@/components/section-cards"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { columns } from "@/components/columns"
import { InflationChart } from "@/components/inflation-chart"
import { ImportsChart } from "@/components/imports-chart"
import { ActivityChart } from "@/components/activity-chart"

import data from "./data.json"

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 flex flex-col bg-slate-50">
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="flex flex-col gap-4 md:gap-6">
            <SectionCards />
            
            <div className="grid gap-6">
              <div className="px-0">
                <ChartAreaInteractive />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <InflationChart />
                <ImportsChart />
              </div>
              
              <ActivityChart />
              
              <div className="px-0">
                <DataTable columns={columns} data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}