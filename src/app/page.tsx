import { InflationChart } from "@/components/inflation-chart"
import { ImportsChart } from "@/components/imports-chart"
import { ActivityChart } from "@/components/activity-chart"

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Consultora Eco-Data 360</h1>
      <div className="grid gap-6">
        <InflationChart />
        <div className="grid md:grid-cols-2 gap-6">
          <ImportsChart />
          <ActivityChart />
        </div>
      </div>
    </div>
  )
}