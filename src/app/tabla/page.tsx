import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { id: 1, cat: "macro", ind: "Inflación IPC", año: "2024", tipo: "Interanual", val: "118%", src: "INDEC", obs: "Salto inicial por corrección de precios." },
  { id: 2, cat: "macro", ind: "Inflación IPC", año: "2025", tipo: "Interanual", val: "31%", src: "INDEC", obs: "Anclaje nominal exitoso." },
  { id: 3, cat: "macro", ind: "Inflación IPC", año: "2026", tipo: "Proyectado", val: "32%", src: "REM BCRA", obs: "Estabilización en niveles moderados." },
  { id: 4, cat: "macro", ind: "Inflación IPIM (Mayorista)", año: "2024", tipo: "Interanual", val: "190%", src: "INDEC", obs: "Impacto directo en insumos industriales." },
  { id: 5, cat: "macro", ind: "Inflación IPIM (Mayorista)", año: "2025", tipo: "Interanual", val: "54%", src: "INDEC", obs: "Desaceleración de costos de fábrica." },
  { id: 6, cat: "macro", ind: "Inflación IPIM (Mayorista)", año: "2026", tipo: "Actual", val: "40%", src: "INDEC", obs: "Presión residual en la cadena de valor." },
  { id: 7, cat: "finance", ind: "Tipo de Cambio (Oficial)", año: "2024", tipo: "ARS/USD", val: "900", src: "BCRA", obs: "Devaluación competitiva inicial." },
  { id: 8, cat: "finance", ind: "Tipo de Cambio (Oficial)", año: "2025", tipo: "ARS/USD", val: "1200", src: "BCRA", obs: "Ajuste del 2% mensual." },
  { id: 9, cat: "finance", ind: "Tipo de Cambio (Oficial)", año: "2026", tipo: "ARS/USD", val: "1350", src: "BCRA", obs: "Atraso relativo frente a inflación." },
  { id: 10, cat: "finance", ind: "Tasa de Interés (TNA)", año: "2024", tipo: "Nominal %", val: "110%", src: "BCRA", obs: "Política monetaria contractiva." },
  { id: 11, cat: "finance", ind: "Tasa de Interés (TNA)", año: "2025", tipo: "Nominal %", val: "40%", src: "BCRA", obs: "Normalización financiera." },
  { id: 12, cat: "finance", ind: "Tasa de Interés (TNA)", año: "2026", tipo: "Nominal %", val: "25%", src: "BCRA", obs: "Fomento al crédito productivo." },
  { id: 13, cat: "sector", ind: "Producción Manufacturera", año: "2024", tipo: "Variación", val: "-12%", src: "INDEC", obs: "Recesión por ajuste de demanda." },
  { id: 14, cat: "sector", ind: "Producción Manufacturera", año: "2025", tipo: "Variación", val: "+2%", src: "INDEC", obs: "Rebote estadístico insuficiente." },
  { id: 15, cat: "sector", ind: "Producción Manufacturera", año: "2026", tipo: "Variación", val: "-8.7%", src: "INDEC", obs: "Contracción por caída de consumo." },
  { id: 16, cat: "social", ind: "Empleo Industrial", año: "2024", tipo: "Variación", val: "Caída", src: "INDEC", obs: "Pérdida de puestos en el sector." },
  { id: 17, cat: "social", ind: "Empleo Industrial", año: "2025", tipo: "Variación", val: "0%", src: "INDEC", obs: "Fin del ajuste laboral masivo." },
  { id: 18, cat: "social", ind: "Empleo Industrial", año: "2026", tipo: "Variación", val: "-2%", src: "INDEC", obs: "Nuevos despidos por baja actividad." },
  { id: 19, cat: "social", ind: "Consumo de Supermercados", año: "2024", tipo: "Var Real %", val: "-15%", src: "INDEC", obs: "Fuerte caída en canasta básica." },
  { id: 20, cat: "social", ind: "Consumo de Supermercados", año: "2025", tipo: "Var Real %", val: "+1%", src: "INDEC", obs: "Estancamiento en niveles mínimos." },
  { id: 21, cat: "social", ind: "Consumo de Supermercados", año: "2026", tipo: "Var Real %", val: "-5%", src: "INDEC", obs: "Pérdida de poder de compra persistente." },
  { id: 22, cat: "sector", ind: "Importaciones Totales", año: "2024", tipo: "Interanual %", val: "-25%", src: "INDEC", obs: "Restricción por falta de divisas." },
  { id: 23, cat: "sector", ind: "Importaciones Totales", año: "2025", tipo: "Interanual %", val: "+18%", src: "INDEC", obs: "Flexibilización del acceso al MULC." },
  { id: 24, cat: "sector", ind: "Importaciones Totales", año: "2026", tipo: "Interanual %", val: "+15%", src: "INDEC", obs: "Apertura comercial consolidada." },
  { id: 25, cat: "sector", ind: "Importación de Insumos", año: "2024", tipo: "Interanual %", val: "-20%", src: "INDEC", obs: "Parálisis por falta de componentes." },
  { id: 26, cat: "sector", ind: "Importación de Insumos", año: "2025", tipo: "Interanual %", val: "+12%", src: "INDEC", obs: "Reabastecimiento de stocks." },
  { id: 27, cat: "sector", ind: "Importación de Insumos", año: "2026", tipo: "Interanual %", val: "+10%", src: "INDEC", obs: "Estabilización en niveles productivos." },
  { id: 28, cat: "sector", ind: "Importación Bienes Capital", año: "2024", tipo: "Interanual %", val: "-30%", src: "INDEC", obs: "Postergación de inversiones." },
  { id: 29, cat: "sector", ind: "Importación Bienes Capital", año: "2025", tipo: "Interanual %", val: "+20%", src: "INDEC", obs: "Inicio de renovación tecnológica." },
  { id: 30, cat: "sector", ind: "Importación Bienes Capital", año: "2026", tipo: "Interanual %", val: "+22%", src: "INDEC", obs: "Aprovechamiento de dólar barato." },
]

const categoryStyles: Record<string, string> = {
  macro: "bg-blue-100 text-blue-800",
  sector: "bg-yellow-100 text-yellow-800",
  finance: "bg-green-100 text-green-800",
  social: "bg-purple-100 text-purple-800",
}

function getValueStyle(val: string): string {
  if (val === "Caída" || val === "-2%" || val === "-5%" || val === "-8.7%" || val === "-12%" || val === "-15%" || val === "-20%" || val === "-25%" || val === "-30%" || val.startsWith("-") || val === "Caída") {
    return "text-red-600 font-bold"
  }
  if (val === "0%" || val === "+1%" || val === "+2%" || val.startsWith("+")) {
    return "text-green-700 font-bold"
  }
  return ""
}

export default function TablePage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="bg-slate-100">
          <CardTitle className="text-green-700">TecnoSur_Indicadores_V3.xlsx</CardTitle>
          <CardDescription>Índice de Indicadores Macroeconómicos - Eco-Data 360</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-slate-50">
                <TableRow>
                  <TableHead className="w-10 text-center">#</TableHead>
                  <TableHead>Dimensión</TableHead>
                  <TableHead>Indicador</TableHead>
                  <TableHead>Año</TableHead>
                  <TableHead>Tipo de Dato</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Fuente</TableHead>
                  <TableHead>Observaciones Técnicas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id} className="hover:bg-slate-50">
                    <TableCell className="text-center text-gray-400 text-xs font-mono">{row.id}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${categoryStyles[row.cat]}`}
                      >
                        {row.cat.toUpperCase()}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium">{row.ind}</TableCell>
                    <TableCell className="text-center">{row.año}</TableCell>
                    <TableCell className="text-xs text-gray-500">{row.tipo}</TableCell>
                    <TableCell className={getValueStyle(row.val)}>{row.val}</TableCell>
                    <TableCell className="text-xs text-blue-600 italic font-medium">{row.src}</TableCell>
                    <TableCell className="text-xs text-gray-600 leading-tight">{row.obs}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 border-t flex justify-between text-xs text-gray-500">
          <span>Total Registros: {data.length}</span>
          <span>Última revisión: 29 de Abril, 2026</span>
        </CardFooter>
      </Card>
    </div>
  )
}