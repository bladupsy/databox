import IndicadoresTable from "@/components/indicadores-table"
import { SiteHeader } from "@/components/site-header"

export default function TablaPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <div className="p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Tabla de Indicadores</h2>
        <IndicadoresTable />
      </div>
    </div>
  )
}