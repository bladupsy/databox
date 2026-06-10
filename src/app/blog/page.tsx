import Link from "next/link"

const posts = [
  {
    id: 1,
    title: "Perspectivas Macroeconómicas 2026",
    excerpt: "Análisis detallado de las proyecciones económicas para el año en curso, incluyendo inflación, crecimiento del PIB y políticas monetarias.",
    date: "15 de Mayo, 2026",
    category: "Análisis",
  },
  {
    id: 2,
    title: "Inflación: Tendencias y Proyecciones",
    excerpt: "Evolución de los índices de precios y análisis de los factores que influyen en la inflación nacional e internacional.",
    date: "10 de Mayo, 2026",
    category: "Inflación",
  },
  {
    id: 3,
    title: "Sector Industrial: Desempeño Reciente",
    excerpt: "Revisión del comportamiento del sector industrial en los últimos meses y perspectivas para el resto del año.",
    date: "5 de Mayo, 2026",
    category: "Sectores",
  },
  {
    id: 4,
    title: "Indicadores Sociales: Un Panorama Completo",
    excerpt: "Estado actual de los principales indicadores sociales: empleo, salarios y condiciones laborales.",
    date: "1 de Mayo, 2026",
    category: "Social",
  },
]

export default function BlogPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-slate-800">Blog Macroeconómico</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {post.category}
              </span>
              <time className="text-sm text-slate-500">{post.date}</time>
            </div>
            
            <h2 className="mb-3 text-xl font-semibold text-slate-800">
              <Link href={`/blog/${post.id}`} className="hover:text-blue-600">
                {post.title}
              </Link>
            </h2>
            
            <p className="text-slate-600">{post.excerpt}</p>
            
            <Link
              href={`/blog/${post.id}`}
              className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
            >
              Leer más →
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}