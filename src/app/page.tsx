import { InflationChart } from "@/components/inflation-chart"
import { DataBox } from "@/components/databox"

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Consultora Eco-Data 360</h1>
      <div className="grid gap-6">
        <InflationChart />
        <DataBox />
      </div>
    </div>
  )
}