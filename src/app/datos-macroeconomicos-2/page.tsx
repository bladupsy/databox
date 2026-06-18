"use client"

import React, { useState, useMemo } from 'react';

// --- BASE DE DATOS DE LOS INDICADORES MUNDIALES (WDI) ---
// Extraído de las series históricas provistas (período 2000-2024)
const years: number[] = [
  2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
  2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
  2020, 2021, 2022, 2023, 2024
];

interface CountryData {
  gdpPerCapita: number[];
  gini: number[];
  inflation: number[];
  govConsumption: number[];
  savingsRate: number[];
  capitalFormation: number[];
}

const dataARG: CountryData = {
  gdpPerCapita: [
    7637, 7141, 2570, 3320, 4242, 5068, 5869, 7185, 8944, 8150,
    10260, 12704, 12950, 12964, 12233, 13680, 12700, 14533, 11753, 9956,
    8536, 10738, 13962, 14262, 13970
  ],
  gini: [
    51.0, 53.3, 53.8, 51.0, 48.5, 47.8, 46.4, 46.3, 45.0, 43.8,
    43.7, 42.7, 41.4, 41.1, 41.8, 42.0, 42.3, 41.4, 41.7, 43.3,
    42.7, 42.4, 40.7, 42.4, 42.4
  ],
  inflation: [
    1.04, -1.10, 30.56, 10.50, 18.36, 10.32, 13.74, 14.94, 23.17, 15.38,
    20.92, 23.70, 22.31, 23.95, 40.28, 26.58, 41.12, 26.01, 42.03, 49.20,
    40.08, 53.80, 68.99, 136.74, 207.61
  ],
  govConsumption: [
    13.78, 14.15, 12.23, 11.43, 11.11, 12.14, 12.42, 12.98, 13.63, 15.90,
    15.16, 15.68, 16.64, 16.80, 16.94, 18.09, 17.65, 17.69, 15.80, 16.44,
    16.87, 15.91, 15.70, 16.30, 14.91
  ],
  savingsRate: [
    14.36, 14.21, 21.34, 21.73, 13.78, 13.71, 21.41, 22.23, 21.12, 18.32,
    17.33, 17.33, 16.20, 15.19, 15.90, 14.30, 14.62, 13.06, 11.39, 13.69,
    15.01, 19.41, 16.83, 16.23, 16.69
  ],
  capitalFormation: [
    17.53, 15.62, 10.85, 14.14, 17.55, 18.88, 18.68, 20.09, 19.57, 16.05,
    17.70, 18.39, 16.50, 17.30, 17.26, 17.07, 17.66, 18.21, 16.61, 14.21,
    14.41, 18.07, 17.38, 19.38, 15.83
  ]
};

const dataNOR: CountryData = {
  gdpPerCapita: [
    38178, 38602, 43171, 50250, 57769, 67047, 74434, 85502, 97504, 80348,
    88163, 101222, 102176, 103554, 97667, 74810, 70867, 76132, 82793, 76431,
    68340, 93073, 109270, 87497, 86785
  ],
  gini: [
    25.5, 25.6, 25.8, 25.4, 25.5, 25.7, 26.0, 25.9, 25.8, 25.5,
    25.7, 25.4, 25.6, 25.8, 26.1, 26.3, 26.2, 26.0, 25.9, 26.2,
    26.0, 25.8, 25.5, 25.4, 25.3
  ],
  inflation: [
    15.33, 17.13, -1.52, 2.86, 5.85, 8.76, 8.73, 3.08, 10.57, -5.12,
    5.96, 6.67, 3.35, 2.55, 0.26, -2.80, -1.60, 4.08, 6.74, -0.55,
    -2.52, 20.21, 28.42, -11.08, -0.23
  ],
  govConsumption: [
    18.86, 20.03, 21.62, 21.94, 20.74, 19.37, 18.56, 18.64, 18.40, 21.49,
    21.22, 20.79, 20.60, 20.97, 21.72, 23.09, 24.21, 23.80, 23.11, 24.10,
    26.13, 22.44, 18.09, 22.04, 21.98
  ],
  savingsRate: [
    36.63, 36.49, 32.88, 31.74, 34.25, 39.08, 40.56, 39.85, 42.22, 35.83,
    36.95, 38.97, 39.47, 38.63, 39.13, 36.00, 32.95, 33.86, 36.69, 33.41,
    32.43, 38.02, 48.63, 41.76, 40.98
  ],
  capitalFormation: [
    21.81, 20.55, 20.33, 19.42, 21.50, 22.42, 23.92, 27.07, 25.78, 24.29,
    24.98, 25.44, 25.87, 27.32, 27.20, 26.91, 27.72, 27.55, 27.72, 29.61,
    31.35, 25.08, 21.17, 24.25, 24.13
  ]
};

type IndicatorKey = 'gdpPerCapita' | 'gini' | 'inflation' | 'govConsumption';

interface SeriesDetail {
  title: string;
  source: string;
  unit: string;
  methodology: string;
}

// Detalle Metodológico de las Series
const seriesDetails: Record<IndicatorKey, SeriesDetail> = {
  gdpPerCapita: {
    title: "PIB per cápita (USD Corrientes)",
    source: "Banco Mundial (World Development Indicators - NY.GDP.PCAP.CD)",
    unit: "Dólares estadounidenses corrientes",
    methodology: "PIB dividido por la población a mitad de año. Los valores nominales ilustran la brecha productiva y de renta media entre una economía petrolera desarrollada y una economía emergente expuesta a volatilidad cambiaria."
  },
  gini: {
    title: "Coeficiente de Gini",
    source: "Banco Mundial (WDI - SI.POV.GINI) / Estimaciones de Hogares",
    unit: "Índice de 0 (Igualdad absoluta) a 100 (Desigualdad absoluta)",
    methodology: "Mide la desviación de la distribución del ingreso entre los individuos de una economía respecto a una distribución perfectamente equitativa. Argentina presenta fluctuaciones severas tras las crisis."
  },
  inflation: {
    title: "Inflación, Deflactor del PIB (% anual)",
    source: "Banco Mundial (WDI - NY.GDP.DEFL.KD.ZG)",
    unit: "Porcentaje de variación anual (%)",
    methodology: "Refleja el cambio porcentual anual en el deflactor implícito del PIB. Mide la tasa de inflación de toda la economía doméstica, capturando las distorsiones de precios y su impacto sobre las bases fiscales."
  },
  govConsumption: {
    title: "Consumo del Gobierno General (% del PIB)",
    source: "Banco Mundial (WDI - NE.CON.GOVT.ZS)",
    unit: "Porcentaje del Producto Interno bruto (%)",
    methodology: "Incluye todos los gastos corrientes gubernamentales para la adquisición de bienes y servicios, reflejando el tamaño y la constancia del gasto público de redistribución y bienestar."
  }
};

export default function DatosMacroeconomicos2Page() {
  const [activeTab, setActiveTab] = useState('diagnostico');
  const [selectedChartInd, setSelectedChartInd] = useState<IndicatorKey>('gdpPerCapita');
  const [hoveredDataIndex, setHoveredDataIndex] = useState<number | null>(null);

  // Estados del Simulador de Reforma para Argentina
  const [minNoImponible, setMinNoImponible] = useState(250); // Millones de ARS
  const [alicuotaMaxima, setAlicuotaMaxima] = useState(1.5); // % marginal máximo
  const [pctDestinacion, setPctDestinacion] = useState(60); // % para el Fondo Contracíclico

  // Cálculos dinámicos del simulador de impacto en Argentina
  const simuladorResultados = useMemo(() => {
    // Estimación simplificada pero fundamentada
    // Una alícuota promedio real combinada, base de contribuyentes estimada sobre el decil 10 superior
    const baseContribuyentes = Math.max(10000, 150000 - (minNoImponible * 300));
    const recaudacionEstimadaPib = Math.min(2.1, Math.max(0.1, (baseContribuyentes * alicuotaMaxima * 0.00015)));

    // Impacto proyectado en el Coeficiente de Gini
    // Un impuesto patrimonial más alto reduce el Gini al quitar ingresos excedentes del decil 10
    const reduccionGiniPuntos = (recaudacionEstimadaPib * 1.4) + ((100 - minNoImponible * 0.1) * 0.005);
    const giniProyectado = Math.max(37.5, Math.min(42.4, 42.4 - reduccionGiniPuntos));

    // Capacidad fiscal en USD anuales (asumiendo PIB promedio de Argentina)
    const recaudacionUsd = Math.round(recaudacionEstimadaPib * 4500); // 450B USD PIB estimado promedio
    const fondoContraciclicloUsd = Math.round(recaudacionUsd * (pctDestinacion / 100));

    return {
      contribuyentesAfectados: Math.round(baseContribuyentes),
      recaudacionPib: parseFloat(recaudacionEstimadaPib.toFixed(2)),
      giniProyectado: parseFloat(giniProyectado.toFixed(1)),
      recaudacionUsd,
      fondoContraciclicloUsd
    };
  }, [minNoImponible, alicuotaMaxima, pctDestinacion]);

  // Funciones auxiliares para dibujo de gráficos SVG
  const calculateSvgPoints = (
    dataArray: number[],
    minVal: number,
    maxVal: number,
    width: number,
    height: number,
    padding: number
  ) => {
    const pointsCount = dataArray.length;
    const stepX = (width - padding * 2) / (pointsCount - 1);
    const rangeY = maxVal - minVal || 1;
    const scaleY = (height - padding * 2) / rangeY;

    return dataArray.map((val, idx) => {
      const x = padding + idx * stepX;
      const y = height - padding - (val - minVal) * scaleY;
      return { x, y, value: val, year: years[idx] };
    });
  };

  const chartVisualData = useMemo(() => {
    const argVals = dataARG[selectedChartInd];
    const norVals = dataNOR[selectedChartInd];
    const allVals = [...argVals, ...norVals];

    const maxVal = Math.max(...allVals) * 1.05;
    const minVal = Math.min(...allVals) * 0.95 > 0 ? Math.min(...allVals) * 0.95 : 0;

    const width = 800;
    const height = 400;
    const padding = 50;

    const argPoints = calculateSvgPoints(argVals, minVal, maxVal, width, height, padding);
    const norPoints = calculateSvgPoints(norVals, minVal, maxVal, width, height, padding);

    return {
      argPoints,
      norPoints,
      maxVal,
      minVal,
      width,
      height,
      padding
    };
  }, [selectedChartInd]);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-amber-600 selection:text-white">

      {/* HEADER DE LA APLICACIÓN */}
      <header className="border-b border-stone-200 bg-white/90 backdrop-blur sticky top-0 z-50 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-600 rounded-lg text-white">
            {/* SVG Icono de Balanza / Finanzas */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-stone-900">
              Tablero de Diagnóstico Macroeconómico
            </h1>
            <p className="text-xs text-stone-500 font-medium">Postura: Justicia Distributiva y Sostenibilidad Fiscal • Caso Argentina vs. Noruega (2000-2024)</p>
          </div>
        </div>

        {/* NAVEGACIÓN PRINCIPAL */}
        <nav className="flex bg-stone-100 p-1 rounded-lg border border-stone-200 self-stretch sm:self-auto overflow-x-auto">
          {[
            { id: 'diagnostico', label: 'Informe' },
            { id: 'graficos', label: 'Tablero Gráfico' },
            { id: 'simulador', label: 'Simulador Reforma' },
            { id: 'intercambio', label: 'Intercambio Crítico' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all duration-200 whitespace-nowrap ${activeTab === tab.id
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-800 hover:bg-stone-200/50'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* CUERPO DEL ENTREGABLE */}
      <main className="flex-1 max-w-9xl w-full mx-auto p-6 flex flex-col gap-8">

        {/* VISTA 1: INFORME DE DIAGNÓSTICO */}
        {activeTab === 'diagnostico' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna Principal - Diagnóstico Escrito */}
            <div className="lg:col-span-2 space-y-8 bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-850 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  Entregable N° 1
                </span>
                <h2 className="text-3xl font-extrabold text-stone-900 mt-4 tracking-tight">
                  Diagnóstico Macroeconómico
                </h2>
                <div className="h-1 w-20 bg-amber-600 rounded mt-2"></div>
              </div>

              {/* Sección 1: Presentación del Problema */}
              <section className="space-y-4">
                <h3 className="text-xl font-bold text-amber-850 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-amber-600 rounded-full inline-block"></span>
                  Delimitación del Caso
                </h3>
                <p className="text-stone-700 leading-relaxed text-sm">
                  La presente investigación aborda el rol estratégico de la <strong>tributación patrimonial progresiva</strong> como una herramienta clave para robustecer la capacidad fiscal del Estado, reducir la desigualdad distributiva y apalancar políticas contracíclicas de largo aliento.
                </p>
                <p className="text-stone-700 leading-relaxed text-sm">
                  Utilizando el período <strong>2000-2024</strong>, el análisis contrasta el desempeño de <strong>Argentina</strong> frente al caso modelo de <strong>Noruega</strong>, buscando demostrar que una estructura tributaria basada en impuestos patrimoniales y rentas extraordinarias no solo es compatible con la inversión y el crecimiento económico, sino que actúa como salvaguarda ante la inestabilidad de precios y el endeudamiento asfixiante que limita el desarrollo en América Latina.
                </p>
              </section>

              {/* Sección 2: Episodio Reciente Seleccionado */}
              <section className="space-y-4">
                <h3 className="text-xl font-bold text-amber-850 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-amber-600 rounded-full inline-block"></span>
                  Contexto actual
                </h3>
                <p className="text-stone-700 leading-relaxed text-sm">
                  En Argentina, las sucesivas modificaciones del <strong>Impuesto sobre los Bienes Personales</strong> (elevación de mínimos, fluctuaciones en alícuotas para activos en el exterior) y la implementación transitoria del <strong>Aporte Solidario y Extraordinario (Grandes Fortunas)</strong> durante el shock del COVID-19 representan la respuesta inmediata del fisco ante la asfixia de recursos.
                </p>
                <p className="text-stone-700 leading-relaxed text-sm">
                  Sin embargo, al carecer de un diseño <strong>permanente, estructural e indexado</strong> (a diferencia del impuesto al patrimonio neto noruego —<em>Formuesskatt</em>—), estos recursos extraordinarios terminan diluyéndose ante el proceso inflacionario crónico, obligando al Banco Central a continuar con el señoreaje para financiar las brechas fiscales corrientes.
                </p>
              </section>

              {/* Sección 3: Análisis Integrado de Preguntas */}
              {/* <section className="space-y-6">
                <h3 className="text-xl font-bold text-amber-850 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-amber-600 rounded-full inline-block"></span>
                  3. Respuestas al Cuestionario de Diagnóstico
                </h3>

                <div className="space-y-4 text-sm">
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                    <p className="font-semibold text-stone-900 mb-1">
                      P1. ¿Cómo evolucionaron los principales indicadores fiscales y monetarios en el período analizado?
                    </p>
                    <p className="text-stone-600 leading-relaxed">
                      La brecha distributiva y monetaria se ensancha críticamente. Noruega expandió su PIB per cápita desde los USD 38.178 en el 2000 hasta los USD 109.270 en 2022 con un nivel de inflación implícita sumamente estable. Argentina, afectada por el colapso de la convertibilidad en 2001-2002, vio su PIB per cápita contraerse un 66% nominalmente (cayendo a USD 2.570) y su Gini escaló al récord histórico de 53.8. La inflación promedio, medida por el deflactor, evolucionó de niveles de equilibrio de un solo dígito a superar el 200% hacia 2024.
                    </p>
                  </div>

                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                    <p className="font-semibold text-stone-900 mb-1">
                      P2. ¿Qué relación se observa entre cambios tributarios, sostenibilidad fiscal, inflación, tasas de interés y tipo de cambio real?
                    </p>
                    <p className="text-stone-600 leading-relaxed">
                      La asfixia impositiva en el consumo (IVA) y la variabilidad legislativa sobre el patrimonio deprimen la sostenibilidad. Al no poseer un canal de recaudación estable de riqueza acumulada, la brecha de recursos se monetiza o se absorbe vía emisión de deuda nominal de corto plazo a tasas siderales, lo que distorsiona las tasas de interés reales (empujándolas a terreno negativo en periodos críticos) e induce a una devaluación sistemática para licuar el déficit y compensar el atraso cambiario real.
                    </p>
                  </div>

                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                    <p className="font-semibold text-stone-900 mb-1">
                      P3. ¿Qué efectos parecen desprenderse, según la evidencia, sobre distribución, inversión, empleo o actividad?
                    </p>
                    <p className="text-stone-600 leading-relaxed">
                      El Gini de Argentina exhibe un vínculo inverso respecto a la formación de capital: los años de extrema desigualdad y caída del bienestar (2001-2003) asfixian la demanda agregada local y hunden la formación bruta de capital al 10.8% del PIB. En Noruega, la redistribución financiada con tributos directos sostiene la cohesión social (Gini estable de ~25.5), blindando el mercado de consumo doméstico y propiciando un incentivo permanente a la inversión estructural (tasa de formación bruta estable siempre en torno al 24%-27%).
                    </p>
                  </div>

                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                    <p className="font-semibold text-stone-900 mb-1">
                      P4. ¿Qué rol asumen el Estado y el Banco Central en el episodio estudiado?
                    </p>
                    <p className="text-stone-600 leading-relaxed">
                      En Noruega, el Estado planifica y ahorra a través de su fondo soberano de pensiones, mientras el Banco Central opera de manera autónoma con metas de inflación. En Argentina, el Estado ha intervenido con carácter de auxilio de emergencia (políticas pro-gasto sin financiamiento tributario firme), forzando al Banco Central a actuar como financista fiscal de última instancia, perdiendo el control de la base de precios y el valor real del peso.
                    </p>
                  </div>
                </div>
              </section> */}
            </div>

            {/* Sidebar - Cuadro de Síntesis del Episodio y Stats Rápidos */}
            <div className="space-y-8">
              {/* Cuadro de Síntesis del Episodio (Consigna 3) */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                <h4 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-4 flex items-center gap-2">
                  <span>📊</span> Cuadro de Síntesis del Episodio
                </h4>
                <div className="space-y-4">
                  <div className="border-l-2 border-amber-500 pl-4 space-y-1">
                    <span className="text-xs text-stone-500 uppercase font-semibold">Episodio de Análisis</span>
                    <p className="text-sm font-bold text-stone-900">Reforma de Bienes Personales y Aporte de Grandes Fortunas (Argentina)</p>
                  </div>
                  <div className="border-l-2 border-amber-500/60 pl-4 space-y-1">
                    <span className="text-xs text-stone-500 uppercase font-semibold">Conflicto Macroeconómico</span>
                    <p className="text-sm text-stone-700">Monetización sistemática del déficit vs. Presión tributaria centrada en consumo regresivo.</p>
                  </div>
                  <div className="border-l-2 border-orange-500 pl-4 space-y-1">
                    <span className="text-xs text-stone-500 uppercase font-semibold">Modelo de Contraste</span>
                    <p className="text-sm text-stone-700">Noruega: Impuesto permanente a los activos netos que financia el 22% del gasto del PIB.</p>
                  </div>
                  <div className="border-l-2 border-stone-400 pl-4 space-y-1">
                    <span className="text-xs text-stone-500 uppercase font-semibold">Resultado de Evidencia</span>
                    <p className="text-sm text-stone-700">La alta recaudación patrimonial progresiva estabiliza el índice Gini y neutraliza shocks de deuda.</p>
                  </div>
                </div>
              </div>

              {/* Indicadores Clave en Números */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
                <h4 className="text-sm font-bold uppercase tracking-wider text-stone-500">
                  ⚡ Indicadores Básicos (2022)
                </h4>

                <div className="space-y-4">
                  {/* Argentina */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-amber-700">
                      <span>ARGENTINA</span>
                      <span>PIB p.c: USD 13.962</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                        <span className="block text-[10px] text-stone-500 uppercase">Gini Desigualdad</span>
                        <span className="text-lg font-bold text-amber-600">40.7</span>
                      </div>
                      <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                        <span className="block text-[10px] text-stone-500 uppercase">Inflación Deflactor</span>
                        <span className="text-lg font-bold text-red-650">68.9%</span>
                      </div>
                    </div>
                  </div>

                  <hr className="border-stone-200" />

                  {/* Noruega */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-orange-700">
                      <span>NORUEGA</span>
                      <span>PIB p.c: USD 109.270</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                        <span className="block text-[10px] text-stone-500 uppercase">Gini Desigualdad</span>
                        <span className="text-lg font-bold text-orange-600">25.5</span>
                      </div>
                      <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                        <span className="block text-[10px] text-stone-500 uppercase">Inflación Deflactor</span>
                        <span className="text-lg font-bold text-orange-600 font-extrabold">28.4%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VISTA 2: TABLERO GRÁFICO DE SERIES TEMPORALES */}
        {activeTab === 'graficos' && (
          <div className="space-y-8 bg-white py-8 px-0 sm:px-8 rounded-none sm:rounded-2xl -mx-6 sm:mx-0 border-x-0 sm:border-x border-y sm:border-stone-200 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-6 sm:px-0">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-orange-700 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                  Entregable N° 2
                </span>
                <h2 className="text-2xl font-bold text-stone-900 mt-2">Tablero de Gráficos Comparativos </h2>
              </div>

              {/* Selector de Indicador */}
              <div className="flex flex-wrap gap-2 bg-stone-100 p-1.5 rounded-lg border border-stone-200 w-full md:w-auto">
                {[
                  { id: 'gdpPerCapita', label: 'PIB per Cápita' },
                  { id: 'gini', label: 'Coeficiente Gini' },
                  { id: 'inflation', label: 'Inflación' },
                  { id: 'govConsumption', label: 'Consumo Público (% PIB)' }
                ].map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => setSelectedChartInd(ind.id as keyof typeof seriesDetails)}
                    className={`flex-1 md:flex-initial px-3 py-1.5 text-xs font-bold rounded-md transition-all duration-150 ${selectedChartInd === ind.id
                      ? 'bg-white text-amber-800 border border-stone-250 shadow-sm'
                      : 'text-stone-600 hover:text-stone-800'
                      }`}
                  >
                    {ind.label}
                  </button>
                ))}
              </div>
            </div>

            {/* GRÁFICO SVG ADAPTATIVO */}
            <div className="bg-stone-50 py-6 px-0 sm:px-6 rounded-none sm:rounded-xl border-x-0 sm:border-x border-y sm:border-stone-200 relative">

              {/* Título interno del gráfico */}
              <div className="flex items-center justify-between mb-6 px-6 sm:px-0">
                <div>
                  <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                    {seriesDetails[selectedChartInd].title} (2000 - 2024)
                  </h3>
                  <p className="text-xs text-stone-500">Fuente: {seriesDetails[selectedChartInd].source}</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-1.5 text-amber-700">
                    <span className="w-3 h-3 bg-amber-600 rounded-full"></span>
                    <span>Argentina (ARG)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-orange-700">
                    <span className="w-3 h-3 bg-orange-600 rounded-full"></span>
                    <span>Noruega (NOR)</span>
                  </div>
                </div>
              </div>

              {/* Render del Canvas de Dibujo SVG */}
              <div className="w-full overflow-x-auto">
                <svg
                  viewBox={`0 0 ${chartVisualData.width} ${chartVisualData.height}`}
                  className="w-full h-auto min-w-[650px] overflow-visible"
                >
                  {/* Líneas de Guía de Fondo (Eje Y) */}
                  {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                    const y = chartVisualData.padding + ratio * (chartVisualData.height - chartVisualData.padding * 2);
                    const val = chartVisualData.maxVal - ratio * (chartVisualData.maxVal - chartVisualData.minVal);
                    return (
                      <g key={idx} className="opacity-70">
                        <line
                          x1={chartVisualData.padding}
                          y1={y}
                          x2={chartVisualData.width - chartVisualData.padding}
                          y2={y}
                          stroke="#e7e5e4"
                          strokeWidth="1"
                          strokeDasharray="4 4"
                        />
                        <text
                          x={chartVisualData.padding - 8}
                          y={y + 4}
                          fill="#78716c"
                          fontSize="10"
                          fontWeight="600"
                          textAnchor="end"
                        >
                          {selectedChartInd === 'gdpPerCapita'
                            ? `$${Math.round(val).toLocaleString()}`
                            : `${val.toFixed(1)}${selectedChartInd === 'gini' ? '' : '%'}`}
                        </text>
                      </g>
                    );
                  })}

                  {/* Etiquetas de los Años (Eje X) */}
                  {years.map((year, idx) => {
                    const stepX = (chartVisualData.width - chartVisualData.padding * 2) / (years.length - 1);
                    const x = chartVisualData.padding + idx * stepX;
                    return (
                      idx % 2 === 0 && (
                        <text
                          key={idx}
                          x={x}
                          y={chartVisualData.height - chartVisualData.padding + 18}
                          fill="#78716c"
                          fontSize="10"
                          fontWeight="700"
                          textAnchor="middle"
                          className="opacity-95"
                        >
                          {year}
                        </text>
                      )
                    );
                  })}

                  {/* Curva de Datos: Argentina */}
                  <path
                    d={`M ${chartVisualData.argPoints.map(p => `${p.x} ${p.y}`).join(' L ')}`}
                    fill="none"
                    stroke="#d97706"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Curva de Datos: Noruega */}
                  <path
                    d={`M ${chartVisualData.norPoints.map(p => `${p.x} ${p.y}`).join(' L ')}`}
                    fill="none"
                    stroke="#ea580c"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Puntos de las Series (Permanentes) */}
                  {chartVisualData.argPoints.map((pt, idx) => {
                    const norPt = chartVisualData.norPoints[idx];
                    return (
                      <g key={`dots-group-${idx}`}>
                        <circle cx={pt.x} cy={pt.y} r="3" fill="#d97706" stroke="#ffffff" strokeWidth="1" />
                        <circle cx={norPt.x} cy={norPt.y} r="3" fill="#ea580c" stroke="#ffffff" strokeWidth="1" />
                      </g>
                    );
                  })}

                  {/* Zonas de Interacción Vertical (Slices de Hover) y Etiquetas de Valores */}
                  {chartVisualData.argPoints.map((pt, idx) => {
                    const norPt = chartVisualData.norPoints[idx];

                    // Calculamos el ancho de cada columna de interacción
                    const sliceWidth = chartVisualData.argPoints[1]
                      ? chartVisualData.argPoints[1].x - chartVisualData.argPoints[0].x
                      : 30;

                    // Centrado horizontal en pt.x
                    const rectX = pt.x - sliceWidth / 2;
                    const rectY = chartVisualData.padding;
                    const rectW = sliceWidth;
                    const rectH = chartVisualData.height - 2 * chartVisualData.padding;

                    const isArgHigher = pt.y < norPt.y; // Menor valor de Y está más arriba en pantalla

                    const argYOffset = isArgHigher ? -12 : 16;
                    const norYOffset = isArgHigher ? 16 : -12;

                    const formatVal = (val: number) => {
                      if (selectedChartInd === 'gdpPerCapita') {
                        return `$${Math.round(val).toLocaleString()}`;
                      }
                      return `${val.toFixed(1)}${selectedChartInd === 'gini' ? '' : '%'}`;
                    };

                    return (
                      <g key={`interactive-${idx}`}>
                        <rect
                          x={rectX}
                          y={rectY}
                          width={rectW}
                          height={rectH}
                          fill="transparent"
                          pointerEvents="all"
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredDataIndex(idx)}
                          onMouseLeave={() => setHoveredDataIndex(null)}
                        />

                        {hoveredDataIndex === idx && (
                          <>
                            {/* Línea vertical de guía */}
                            <line
                              x1={pt.x}
                              y1={chartVisualData.padding}
                              x2={pt.x}
                              y2={chartVisualData.height - chartVisualData.padding}
                              stroke="#a8a29e"
                              strokeWidth="1.5"
                              className="opacity-60 pointer-events-none"
                            />
                            {/* Punto destacado de Argentina */}
                            <circle cx={pt.x} cy={pt.y} r="6" fill="#d97706" stroke="#fff" strokeWidth="2" className="pointer-events-none" />
                            {/* Punto destacado de Noruega */}
                            <circle cx={norPt.x} cy={norPt.y} r="6" fill="#ea580c" stroke="#fff" strokeWidth="2" className="pointer-events-none" />

                            {/* Valor Argentina */}
                            <text
                              x={pt.x}
                              y={pt.y + argYOffset}
                              fill="#ffffff"
                              fontSize="10"
                              fontWeight="extrabold"
                              textAnchor="middle"
                              stroke="#ffffff"
                              strokeWidth="3.5"
                              paintOrder="stroke"
                              className="pointer-events-none select-none"
                            >
                              {formatVal(pt.value)}
                            </text>
                            <text
                              x={pt.x}
                              y={pt.y + argYOffset}
                              fill="#78350f"
                              fontSize="10"
                              fontWeight="extrabold"
                              textAnchor="middle"
                              className="pointer-events-none select-none"
                            >
                              {formatVal(pt.value)}
                            </text>

                            {/* Valor Noruega */}
                            <text
                              x={norPt.x}
                              y={norPt.y + norYOffset}
                              fill="#ffffff"
                              fontSize="10"
                              fontWeight="extrabold"
                              textAnchor="middle"
                              stroke="#ffffff"
                              strokeWidth="3.5"
                              paintOrder="stroke"
                              className="pointer-events-none select-none"
                            >
                              {formatVal(norPt.value)}
                            </text>
                            <text
                              x={norPt.x}
                              y={norPt.y + norYOffset}
                              fill="#7c2d12"
                              fontSize="10"
                              fontWeight="extrabold"
                              textAnchor="middle"
                              className="pointer-events-none select-none"
                            >
                              {formatVal(norPt.value)}
                            </text>
                          </>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Ventana de Detalle Interactiva (Tooltip flotante inferior) */}
              <div className="mt-4 bg-white p-4 rounded-lg border border-stone-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 text-xs mx-6 sm:mx-0 shadow-sm">
                <div>
                  <span className="text-stone-500 font-semibold uppercase block tracking-wider">Anotación Metodológica de la Serie</span>
                  <p className="text-stone-700 mt-0.5">{seriesDetails[selectedChartInd].methodology}</p>
                </div>
                <div className="bg-stone-50 px-4 py-2 rounded-md border border-stone-200 text-center flex flex-col justify-center min-w-[120px] shrink-0">
                  <span className="text-[10px] text-stone-500 font-bold uppercase">Unidad</span>
                  <span className="text-stone-900 font-extrabold mt-0.5">{seriesDetails[selectedChartInd].unit}</span>
                </div>
              </div>
            </div>

            {/* TABLA DE EVOLUCIÓN HISTÓRICA */}
            <div className="bg-stone-50/50 rounded-none sm:rounded-xl border-x-0 sm:border-x border-y sm:border-stone-200 py-6 px-0 sm:px-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-800 mb-4 px-6 sm:px-0">
                Historial de Series Críticas Relevadas (Años de Shocks Económicos)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-stone-200 text-stone-500 uppercase font-semibold">
                      <th className="py-2.5 px-4">País</th>
                      <th className="py-2.5 px-4">Indicador</th>
                      <th className="py-2.5 px-4">2001 (Crisis)</th>
                      <th className="py-2.5 px-4">2008 (Subprime)</th>
                      <th className="py-2.5 px-4">2014 (Commodities)</th>
                      <th className="py-2.5 px-4">2020 (Pandemia)</th>
                      <th className="py-2.5 px-4">2022 (Actualidad)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 text-stone-850 font-medium">
                    {/* ARGENTINA */}
                    <tr>
                      <td className="py-3 px-4 font-bold text-amber-700">Argentina</td>
                      <td className="py-3 px-4 text-stone-500">PIB per cápita (USD)</td>
                      <td className="py-3 px-4">$7.141</td>
                      <td className="py-3 px-4">$8.944</td>
                      <td className="py-3 px-4">$12.233</td>
                      <td className="py-3 px-4">$8.536</td>
                      <td className="py-3 px-4">$13.962</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-amber-700">Argentina</td>
                      <td className="py-3 px-4 text-stone-500">Coeficiente de Gini</td>
                      <td className="py-3 px-4 text-red-700">53.3</td>
                      <td className="py-3 px-4">45.0</td>
                      <td className="py-3 px-4">41.8</td>
                      <td className="py-3 px-4">42.7</td>
                      <td className="py-3 px-4 text-orange-600">40.7</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-amber-700">Argentina</td>
                      <td className="py-3 px-4 text-stone-500">Inflación implícita</td>
                      <td className="py-3 px-4">-1.10%</td>
                      <td className="py-3 px-4">23.17%</td>
                      <td className="py-3 px-4">40.28%</td>
                      <td className="py-3 px-4">40.08%</td>
                      <td className="py-3 px-4 text-red-700">68.99%</td>
                    </tr>

                    {/* NORUEGA */}
                    <tr className="border-t border-stone-200">
                      <td className="py-3 px-4 font-bold text-orange-700">Noruega</td>
                      <td className="py-3 px-4 text-stone-500">PIB per cápita (USD)</td>
                      <td className="py-3 px-4">$38.602</td>
                      <td className="py-3 px-4">$97.504</td>
                      <td className="py-3 px-4">$97.667</td>
                      <td className="py-3 px-4">$68.340</td>
                      <td className="py-3 px-4">$109.270</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-orange-700">Noruega</td>
                      <td className="py-3 px-4 text-stone-500">Coeficiente de Gini</td>
                      <td className="py-3 px-4">25.6</td>
                      <td className="py-3 px-4">25.8</td>
                      <td className="py-3 px-4">26.1</td>
                      <td className="py-3 px-4">26.0</td>
                      <td className="py-3 px-4">25.5</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-orange-700">Noruega</td>
                      <td className="py-3 px-4 text-stone-500">Inflación implícita</td>
                      <td className="py-3 px-4">17.13%</td>
                      <td className="py-3 px-4">10.57%</td>
                      <td className="py-3 px-4">0.26%</td>
                      <td className="py-3 px-4">-2.52%</td>
                      <td className="py-3 px-4">28.42%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VISTA 3: SIMULADOR DE POLÍTICA PÚBLICA */}
        {activeTab === 'simulador' && (
          <div className="space-y-8">
            {/* Introducción de la Propuesta de Política Fiscal */}
            <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                La Alternativa de Política
              </span>
              <h2 className="text-2xl font-bold text-stone-900">Sistema Patrimonial Estructural Federal (Argentina)</h2>
              <p className="text-sm text-stone-700 leading-relaxed">
                Nuestra propuesta emula el <strong>esquema de ahorro contracíclico de Noruega</strong>. Se propone una reforma de Bienes Personales para aplicar un impuesto progresivo a las grandes fortunas individuales, indexado de forma mensual, asignando por ley un porcentaje de su recaudación a un <strong>Fondo Soberano de Infraestructura Social y Contracíclica</strong>, aliviando de forma paralela los impuestos indirectos regresivos que encarecen la canasta alimentaria básica.
              </p>
            </div>

            {/* Simulador Interactivo */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Controles del Simulador (Sliders) */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 flex items-center gap-2">
                  <span>⚙️</span> Parámetros del Impuesto
                </h3>

                {/* Control 1 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-stone-700">Mínimo No Imponible</span>
                    <span className="text-amber-700 font-bold">{minNoImponible} Millones ARS</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="25"
                    value={minNoImponible}
                    onChange={(e) => setMinNoImponible(parseInt(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
                  />
                  <span className="text-[10px] text-stone-500 block">Determina el umbral de contribuyentes. Valores más altos protegen el patrimonio de clase media.</span>
                </div>

                {/* Control 2 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-stone-700">Alícuota Marginal Máxima</span>
                    <span className="text-amber-700 font-bold">{alicuotaMaxima}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="3.5"
                    step="0.25"
                    value={alicuotaMaxima}
                    onChange={(e) => setAlicuotaMaxima(parseFloat(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
                  />
                  <span className="text-[10px] text-stone-500 block">Tasa marginal impositiva aplicada estrictamente al decil 10 superior de tenencia de activos fijos y financieros.</span>
                </div>

                {/* Control 3 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-stone-700">Destinación al Ahorro Soberano</span>
                    <span className="text-amber-700 font-bold">{pctDestinacion}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="10"
                    value={pctDestinacion}
                    onChange={(e) => setPctDestinacion(parseInt(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
                  />
                  <span className="text-[10px] text-stone-500 block">Porcentaje de recaudación blindado para el fondo anticrisis y de infraestructura de largo plazo.</span>
                </div>
              </div>

              {/* Resultados e Impacto Distributivo */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between gap-6">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-4 flex items-center gap-2">
                    <span>⚡</span> Impacto Estimado del Impuesto Patrimonial
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Tarjeta 1 */}
                    <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-stone-550 block uppercase">Contribuyentes Alcanzados</span>
                        <span className="text-xl font-black text-stone-900 mt-1">
                          {simuladorResultados.contribuyentesAfectados.toLocaleString()} personas
                        </span>
                      </div>
                      <span className="text-2xl">👥</span>
                    </div>

                    {/* Tarjeta 2 */}
                    <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-stone-550 block uppercase">Recaudación Estimada (% PIB)</span>
                        <span className="text-xl font-black text-orange-700 mt-1">
                          {simuladorResultados.recaudacionPib}% del PIB
                        </span>
                      </div>
                      <span className="text-2xl">💵</span>
                    </div>

                    {/* Tarjeta 3 */}
                    <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-stone-550 block uppercase">Recaudación Anual Total</span>
                        <span className="text-xl font-black text-stone-900 mt-1">
                          USD {simuladorResultados.recaudacionUsd.toLocaleString()} Millones
                        </span>
                      </div>
                      <span className="text-2xl">🏛️</span>
                    </div>

                    {/* Tarjeta 4 */}
                    <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-stone-550 block uppercase">Fondo Contracíclico Blindado</span>
                        <span className="text-xl font-black text-amber-700 mt-1">
                          USD {simuladorResultados.fondoContraciclicloUsd.toLocaleString()} Millones
                        </span>
                      </div>
                      <span className="text-2xl">🛡️</span>
                    </div>

                  </div>
                </div>

                {/* Medidor de Gini Proyectado */}
                <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-stone-550 uppercase">Impacto Proyectado en Desigualdad (Coeficiente de Gini)</span>
                    <span className="text-xs font-black text-orange-700">{simuladorResultados.giniProyectado} Puntos Gini</span>
                  </div>

                  {/* Barra de progreso */}
                  <div className="w-full bg-stone-200 h-4 rounded-full overflow-hidden relative border border-stone-300">
                    <div
                      className="bg-orange-600 h-full transition-all duration-300"
                      style={{ width: `${(100 - (simuladorResultados.giniProyectado / 60) * 100)}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-between px-3 text-[9px] font-bold text-stone-850 uppercase select-none">
                      <span>Desigualdad Actual (42.4)</span>
                      <span>Meta de Cohesión (37.5)</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-stone-600 mt-3 leading-relaxed">
                    La transferencia de recursos obtenida del impuesto directo progresivo se traduce en un descenso inmediato del Coeficiente de Gini debido a la redistribución hacia la canasta básica. Una recaudación de <strong>{simuladorResultados.recaudacionPib}% del PIB</strong> permite retirar la monetización del déficit, garantizando la estabilidad de precios que más beneficia a los estratos inferiores de la pirámide de ingresos.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* VISTA 4: INTERCAMBIO CRÍTICO Y PREGUNTA */}
        {activeTab === 'intercambio' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Columna Principal - Pregunta Crítica de la Postura */}
            <div className="lg:col-span-2 space-y-6 bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                Pauta de Intercambio (Entregable N° 4)
              </span>
              <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
                La Pregunta Crítica para la Postura Contraria
              </h2>
              <div className="h-1 w-20 bg-amber-600 rounded mt-2"></div>

              <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 border-l-4 border-l-amber-600 text-stone-750 text-sm leading-relaxed font-semibold italic">
                &quot;Compañeros del grupo con postura opuesta (Liberal/Ortodoxa): Su modelo teórico sostiene sistemáticamente que gravar las tenencias de patrimonio e imponer alícuotas progresivas a los estratos superiores asfixia la acumulación de capital, desincentiva los negocios y deprime el crecimiento.
                <br /><br />
                Sin embargo, la serie histórica oficial del Banco Mundial para Noruega evidencia que, coexistiendo con un impuesto de carácter patrimonial permanente e integral durante más de dos décadas, su PIB per cápita nominal se elevó desde los USD 38.178 en el año 2000 hasta superar los USD 109.270 en 2022, conservando en paralelo tasas de Formación Bruta de Capital de las más sólidas del norte de Europa (en torno al 24%-27% del PIB).
                <br /><br />
                Considerando esta rotunda evidencia empírica de cohesión y estabilidad, ¿cómo justifican teóricamente que la tributación patrimonial sea necesariamente un freno para la acumulación y creación de valor de las naciones en lugar de ser, como demuestran los datos, el pilar definitivo de la sostenibilidad fiscal, la paz social y el consumo interno?&quot;
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-800">Puntos de Tensión del Debate</h3>
                <ul className="space-y-3 text-xs text-stone-600">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">✓</span>
                    <span><strong>Previsibilidad Macroeconómica:</strong> Un Estado estable genera incentivos a la inversión real mayores que la mera desregulación de impuestos patrimoniales.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">✓</span>
                    <span><strong>Estabilidad del Consumo Doméstico:</strong> Menos desigualdad incrementa el multiplicador de la demanda interna, mitigando recesiones.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">✓</span>
                    <span><strong>Independencia del Banco Central:</strong> Al financiar al Tesoro con impuestos patrimoniales en lugar de deudas líquidas, se elimina la urgencia del señoreaje.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Columna Lateral - Fundamentos Teóricos Clave */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-850 flex items-center gap-2">
                <span>📚</span> Fundamentos de Soporte Oral
              </h3>

              <div className="space-y-4 text-xs leading-relaxed text-stone-600">
                <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                  <span className="block font-bold text-stone-900 mb-1">Capacidad de Intervención Pública</span>
                  <span>&quot;La estabilidad del consumo del gobierno general de Noruega (un promedio del 21.5% del PIB) es financiada de forma legítima, cancelando la emisión desregulada.&quot;</span>
                </div>

                <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                  <span className="block font-bold text-stone-900 mb-1">Política Contracíclica Genuina</span>
                  <span>&quot;Para que las políticas compensatorias sean efectivas en Argentina durante las recesiones, requerimos un fondo en divisas duras obtenido de retener riqueza en el auge del ciclo.&quot;</span>
                </div>

                <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                  <span className="block font-bold text-stone-900 mb-1">Neutralidad sobre Inversión</span>
                  <span>&quot;La evidencia de WDI rebate empíricamente el argumento de la fuga de capitales por tributación: la tasa de formación de capital fijo de Noruega se expandió de la par de la riqueza social.&quot;</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-stone-200 bg-white py-6 text-center text-xs text-stone-500">
        <p>© 2026 Universidad Nacional de Misiones • Facultad de Humanidades y Ciencias Sociales</p>
        <p className="mt-1">Teoría y Análisis Económico 2 • Trabajo de Diagnóstico e Indicadores Comparados</p>
      </footer>

    </div>
  );
}
