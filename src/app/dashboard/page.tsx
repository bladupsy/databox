import { MacroIndicadores } from "@/components/macro-indicadores"
import { MacroIndicadoresChart } from "@/components/macro-indicadores-chart"
import { TasasChart } from "@/components/tasas-chart"
import { SectorPanel } from "@/components/sector-panel"
import { SectorChart } from "@/components/sector-chart"
import { SectorSemaforoTable } from "@/components/sector-semaforo-table"
import { SectorBarChart } from "@/components/sector-bar-chart"
import { SocialPanel } from "@/components/social-panel"
import { SocialSemaforoTable } from "@/components/social-semaforo-table"
import { IpcBarChartHorizontal } from "@/components/ipc-bar-chart"
import { SemaforoTableCard } from "@/components/semaforo-table-card"
import { DesempenoSemaforoTable } from "@/components/desempeno-semaforo-table"

import data from "../data.json"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex flex-1 flex-col gap-4 p-6 overflow-auto">
        <div className="flex flex-col gap-4 md:gap-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Panel Macroeconómico</h2>
            <MacroIndicadores />
          </div>

<div className="grid md:grid-cols-2 gap-6">
              <MacroIndicadoresChart />
              <TasasChart />
            </div>

            <div className="grid md:grid-cols-[7fr_3fr] gap-4">
              <SemaforoTableCard />
              <IpcBarChartHorizontal />
            </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Sector Manufacturero</h2>
            <SectorPanel />
            <div className="mt-6">
              <SectorChart />
            </div>
            <div className="grid md:grid-cols-[7fr_3fr] gap-4 mt-4">
              <div>
                <SectorSemaforoTable />
              </div>
              <div>
                <SectorBarChart />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Social / Territorial</h2>
            <SocialPanel />
            <div className="grid md:grid-cols-[7fr_3fr] gap-4 mt-4">
              <SocialSemaforoTable />
              <DesempenoSemaforoTable />
            </div>
          </div>

          
        </div>
        <footer className="mt-8 border-t bg-white p-4 text-center text-sm text-slate-500">
          <p>Fuentes: INDEC · BCRA · Ministerio de Trabajo · UTDT — Datos actualizados a 2026</p>
        </footer>
      </div>
    </div>
  )
}