import { CapacidadIndustriaChart } from "@/components/capacidad-industria-chart"

export default function CapacidadPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-slate-800">
        Capacidad Instalada en la Industria
      </h1>
      <p className="mb-6 text-slate-600">
        Utilización de la capacidad instalada en la industria manufacturera.
        Período 2016-2024. Fuente: INDEC.
      </p>
      <CapacidadIndustriaChart />
    </main>
  )
}