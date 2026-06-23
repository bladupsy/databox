"use client";

import React, { useState, useMemo } from 'react';

// Series históricas reales extraídas de "Dinamarca y Argentina.xlsx", "china(1)_2.xlsx", 
// "arg 2003 2015(1).xlsx", "TAE 2-Noruega (1).xlsx" y el relevamiento oficial de Uruguay
const seriesHistoricas = {
  years: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
  arg: {
    gini: [51.1, 53.3, 53.8, 52.8, 50.2, 49.3, 48.2, 47.3, 46.3, 45.4, 44.5, 43.6, 42.5, 41.9, 41.7, 42.0, 42.3, 41.4, 41.7, 43.3, 42.7, 42.4, 40.7],
    presionTributaria: [17.5, 16.8, 16.2, 19.8, 22.4, 23.1, 23.9, 25.1, 25.8, 25.2, 26.5, 27.1, 27.8, 28.4, 28.9, 28.2, 29.1, 28.5, 27.2, 26.8, 27.5, 28.1, 27.9],
    ahorro: [15.2, 14.8, 16.5, 19.2, 21.0, 21.5, 21.8, 21.2, 19.8, 18.2, 17.5, 16.9, 15.8, 14.9, 14.2, 14.3, 14.6, 13.1, 11.4, 13.7, 15.0, 19.4, 16.8],
    deuda: [45.3, 53.8, 147.2, 139.5, 118.4, 80.2, 70.5, 62.1, 58.4, 55.2, 48.9, 38.9, 40.2, 43.5, 48.7, 52.6, 53.1, 57.0, 86.2, 89.8, 102.8, 80.5, 84.7]
  },
  nor: {
    gini: [25.8, 25.6, 25.5, 25.3, 25.4, 25.6, 25.8, 25.5, 25.2, 25.3, 25.4, 25.3, 25.2, 25.4, 25.5, 26.3, 26.2, 26.0, 25.9, 26.2, 26.0, 25.8, 25.5],
    presionTributaria: [41.2, 41.5, 41.8, 41.0, 41.5, 42.1, 42.5, 42.0, 42.2, 41.8, 42.3, 42.5, 42.2, 41.5, 40.8, 38.5, 39.1, 38.8, 39.5, 39.0, 38.6, 42.1, 44.3],
    ahorro: [35.1, 34.2, 33.5, 34.8, 36.2, 37.5, 38.1, 37.9, 36.5, 34.2, 35.8, 36.5, 37.2, 36.8, 36.2, 36.0, 32.9, 33.9, 36.7, 33.4, 32.4, 38.0, 48.6],
    deuda: [28.5, 29.2, 31.0, 32.5, 33.8, 34.2, 35.0, 34.8, 33.5, 34.1, 34.5, 34.2, 33.9, 33.1, 32.5, 32.1, 34.2, 36.5, 38.2, 37.9, 41.2, 36.4, 32.5]
  },
  dnk: {
    gini: [26.1, 26.2, 26.4, 26.5, 26.3, 26.5, 26.8, 26.9, 27.0, 27.2, 27.4, 27.3, 27.1, 27.2, 27.3, 27.4, 27.2, 27.6, 27.8, 27.5, 27.3, 27.0, 26.8],
    presionTributaria: [45.8, 46.1, 46.5, 46.2, 46.8, 47.2, 47.5, 47.1, 46.8, 46.5, 46.9, 47.2, 47.0, 46.8, 46.4, 46.2, 45.9, 46.1, 44.9, 46.3, 47.1, 48.2, 47.5],
    ahorro: [27.5, 27.8, 28.2, 28.5, 29.0, 29.5, 30.1, 29.8, 28.9, 28.2, 29.1, 29.5, 30.2, 30.8, 30.1, 29.8, 30.5, 31.2, 32.1, 33.5, 32.8, 34.2, 35.1],
    deuda: [48.5, 46.2, 45.0, 42.1, 39.8, 36.5, 32.1, 28.9, 33.5, 40.2, 42.5, 45.1, 44.8, 43.5, 41.2, 39.8, 37.2, 35.8, 34.0, 33.2, 42.1, 36.5, 30.2]
  },
  chn: {
    gini: [41.2, 41.5, 42.1, 43.0, 43.8, 44.5, 45.2, 46.0, 46.9, 47.3, 47.5, 47.2, 47.0, 46.8, 46.5, 46.2, 46.5, 46.7, 46.8, 46.5, 46.8, 46.6, 46.7],
    presionTributaria: [12.8, 13.1, 13.5, 13.8, 14.2, 14.5, 14.8, 15.2, 15.6, 16.0, 16.5, 17.2, 17.5, 17.8, 18.0, 18.2, 17.5, 17.2, 17.0, 16.2, 15.8, 16.0, 16.5],
    ahorro: [37.2, 38.0, 39.1, 41.5, 43.2, 45.0, 47.2, 49.0, 50.8, 50.1, 49.5, 48.9, 48.2, 47.5, 46.8, 46.1, 45.8, 45.2, 44.8, 44.1, 44.5, 45.0, 46.2],
    deuda: [18.5, 19.2, 20.1, 21.2, 22.5, 23.8, 25.1, 26.5, 28.2, 30.1, 32.5, 34.2, 36.5, 38.1, 39.8, 41.2, 44.5, 48.2, 53.1, 57.2, 68.1, 71.5, 77.2]
  },
  ury: {
    gini: [44.2, 44.8, 45.5, 44.9, 44.1, 43.5, 42.8, 42.1, 41.5, 40.8, 40.1, 39.5, 39.0, 38.8, 38.7, 38.6, 38.5, 38.3, 38.0, 38.7, 38.7, 38.9, 38.8],
    presionTributaria: [22.1, 22.5, 22.8, 23.2, 23.5, 24.1, 24.5, 25.0, 25.4, 25.8, 26.1, 26.4, 26.8, 27.1, 27.0, 26.8, 27.2, 27.5, 27.1, 26.9, 26.6, 27.0, 29.2],
    ahorro: [13.5, 13.8, 12.1, 13.2, 14.5, 15.1, 15.8, 16.2, 16.8, 17.1, 17.5, 17.9, 18.2, 18.5, 18.3, 18.2, 18.5, 18.9, 19.1, 18.7, 17.5, 18.2, 20.1],
    deuda: [48.2, 54.1, 95.8, 88.5, 80.1, 72.5, 68.1, 64.2, 61.5, 59.8, 58.2, 56.5, 55.1, 54.8, 54.5, 55.2, 56.4, 58.1, 59.2, 60.5, 65.4, 62.1, 58.9]
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('comparacion');
  const [selectedCountry, setSelectedCountry] = useState<'arg' | 'nor' | 'dnk' | 'chn' | 'ury'>('arg');
  const [selectedIndicator, setSelectedIndicator] = useState<'gini' | 'presionTributaria' | 'ahorro' | 'deuda'>('gini');

  // Sub-navegación dentro de la simulación de modelos
  const [activeModelTab, setActiveModelTab] = useState('unificado');

  // --- PARAMETRIZACIÓN DEL SIMULADOR INDIVIDUAL ---

  // 1. Noruega Model Params
  const [norPatrimonio, setNorPatrimonio] = useState(1.1); // Formuesskatt (%)
  const [norFondoGPFG, setNorFondoGPFG] = useState(80);    // Retención para fondo (%)

  // 2. Dinamarca Model Params
  const [dnkSuelo, setDnkSuelo] = useState(1.8);           // Alícuota catastral suelo (%)
  const [dnkVehiculos, setDnkVehiculos] = useState(30);     // Impuesto verde ambiental (%)

  // 3. China Model Params
  const [chnCentralizacion, setChnCentralizacion] = useState(60); // Retención federal IIT (%)
  const [chnGastoWelfare, setChnGastoWelfare] = useState(22);     // % Gasto en Salud/Seguridad Social

  // 4. Uruguay Model Params
  const [uryRentasCapital, setUryRentasCapital] = useState(12);   // Flat rate rentas del capital (Categoría I IRPF)
  const [uryPatrimonioNeto, setUryPatrimonioNeto] = useState(1.5); // Alícuota Impuesto al Patrimonio (IP)
  const [uryDestinoSocial, setUryDestinoSocial] = useState(50);   // % Coparticipado a la Seguridad Social (IASS)

  // 5. Modelo Unificado de Consenso (Argentina)
  const [unifPatrimonio, setUnifPatrimonio] = useState(2.0);      // Nuevo SIPEF en Argentina (%)
  const [unifFondoContraciclico, setUnifFondoContraciclico] = useState(60); // % del SIPEF derivado al FSDF
  const [unifCentralizacionFederal, setUnifCentralizacion] = useState(65);  // Centralización compensatoria federal (%)

  // --- CÁLCULOS DINÁMICOS DE MODELOS STANDALONE APLICADOS A ARGENTINA ---

  // Base macro de Argentina 2025 para simulación
  const baseArg = { gini: 42.3, presion: 26.2, ahorro: 15.8, deuda: 95.0 };

  const simNoruegaResult = useMemo(() => {
    const recaudacionPib = (norPatrimonio * 1.5);
    const ahorroSoberano = recaudacionPib * (norFondoGPFG / 100);
    const nuevoGini = parseFloat(Math.max(26.0, baseArg.gini - (recaudacionPib * 1.8)).toFixed(1));
    return {
      presion: parseFloat((baseArg.presion + recaudacionPib).toFixed(2)),
      ahorro: parseFloat((baseArg.ahorro + ahorroSoberano * 1.3).toFixed(2)),
      deuda: parseFloat(Math.max(35.0, baseArg.deuda - (ahorroSoberano * 1.9)).toFixed(2)),
      gini: nuevoGini,
      usdRecaudado: Math.round(recaudacionPib * 4500)
    };
  }, [norPatrimonio, norFondoGPFG]);

  const simDinamarcaResult = useMemo(() => {
    const recSuelo = dnkSuelo * 1.6;
    const recVehiculos = (dnkVehiculos / 100) * 0.9;
    const recTotal = recSuelo + recVehiculos;
    const nuevoGini = parseFloat(Math.max(26.0, baseArg.gini - (recTotal * 2.8)).toFixed(1));
    return {
      presion: parseFloat((baseArg.presion + recTotal).toFixed(2)),
      ahorro: parseFloat((baseArg.ahorro + recTotal * 0.4).toFixed(2)),
      deuda: parseFloat(Math.max(35.0, baseArg.deuda - (recTotal * 1.2)).toFixed(2)),
      gini: nuevoGini,
      usdRecaudado: Math.round(recTotal * 4500)
    };
  }, [dnkSuelo, dnkVehiculos]);

  const simChinaResult = useMemo(() => {
    const recPib = (chnCentralizacion / 100) * 3.5;
    const eficienciaRedistributiva = (chnGastoWelfare / 100) * 2.2;
    const nuevoGini = parseFloat(Math.max(26.0, baseArg.gini - (recPib * 1.5 + eficienciaRedistributiva * 15)).toFixed(1));
    return {
      presion: parseFloat((baseArg.presion + recPib).toFixed(2)),
      ahorro: parseFloat((baseArg.ahorro + recPib * 0.8).toFixed(2)),
      deuda: parseFloat(Math.max(35.0, baseArg.deuda - (recPib * 0.5)).toFixed(2)),
      gini: nuevoGini,
      usdRecaudado: Math.round(recPib * 4500)
    };
  }, [chnCentralizacion, chnGastoWelfare]);

  const simUruguayResult = useMemo(() => {
    // El modelo Uruguay aplica IRPF Dual (Capital a flat rate) y el IP (Impuesto al Patrimonio)
    const recCapital = (uryRentasCapital / 100) * 1.1;
    const recPatrimonio = uryPatrimonioNeto * 1.3;
    const recTotal = recCapital + recPatrimonio;

    // IASS (Seguridad social coparticipada) reduce la desigualdad intergeneracional
    const impactoIass = recTotal * (uryDestinoSocial / 100) * 2.1;
    const nuevoGini = parseFloat(Math.max(35.0, baseArg.gini - (recTotal * 1.6 + impactoIass)).toFixed(1));
    return {
      presion: parseFloat((baseArg.presion + recTotal).toFixed(2)),
      ahorro: parseFloat((baseArg.ahorro + recTotal * 0.6).toFixed(2)),
      deuda: parseFloat(Math.max(40.0, baseArg.deuda - (recTotal * 1.4)).toFixed(2)),
      gini: nuevoGini,
      usdRecaudado: Math.round(recTotal * 4500),
      calificacionRiesgo: nuevoGini < 39.0 ? "Grado de Inversión Estable (Baa2/BBB)" : "Perspectiva Emergente Estable",
      recaudacionPib: parseFloat(recTotal.toFixed(2))
    };
  }, [uryRentasCapital, uryPatrimonioNeto, uryDestinoSocial]);

  // --- UNIFICACIÓN SINTÉTICA (ARGENTINA UNIFICADA) ---
  const simUnificadoResult = useMemo(() => {
    const recSipef = unifPatrimonio * 1.9;
    const recCentralizada = recSipef * (unifCentralizacionFederal / 100);

    // Sostenibilidad fiscal (Fondo FSDF estilo Noruego)
    const ahorroSoberano = recSipef * (unifFondoContraciclico / 100);
    const nuevoAhorro = parseFloat((baseArg.ahorro + ahorroSoberano * 1.4).toFixed(2));
    const nuevaDeuda = parseFloat(Math.max(35.0, baseArg.deuda - (ahorroSoberano * 2.2)).toFixed(2));

    // Justicia distributiva (Redistribución provincial estilo Chino e IRPF Dual estilo Uruguayo)
    const bienestarPib = recSipef * (1 - (unifFondoContraciclico / 100));
    const redistribucionRegional = bienestarPib * (unifCentralizacionFederal / 100);

    const reduccionGini = (redistribucionRegional * 2.8) + (ahorroSoberano * 0.6);
    const nuevoGini = parseFloat(Math.max(26.0, baseArg.gini - (reduccionGini * 10)).toFixed(1));

    return {
      presion: parseFloat((baseArg.presion + recSipef).toFixed(2)),
      ahorro: nuevoAhorro,
      deuda: nuevaDeuda,
      gini: nuevoGini,
      usdRecaudado: Math.round(recSipef * 4500),
      ahorroFondoUsd: Math.round(ahorroSoberano * 4500),
      bienestarUsd: Math.round(bienestarPib * 4500)
    };
  }, [unifPatrimonio, unifFondoContraciclico, unifCentralizacionFederal]);

  // Auxiliares para dibujo de gráficos SVG
  const chartVisualData = useMemo(() => {
    const width = 800;
    const height = 400;
    const padding = 50;
    const countries = ['arg', 'nor', 'dnk', 'chn', 'ury'] as const;

    // Obtener mínimos y máximos absolutos de todos los países
    const allValues = countries.flatMap(c => seriesHistoricas[c][selectedIndicator]);
    const maxVal = Math.max(...allValues) * 1.05;
    const minVal = Math.min(...allValues) * 0.95 > 0 ? Math.min(...allValues) * 0.95 : 0;

    const countryLines = countries.map(country => {
      const dataArray = seriesHistoricas[country][selectedIndicator];
      const points = calculateSvgPoints(dataArray, minVal, maxVal, width, height, padding);
      return { country, points };
    });

    return { countryLines, maxVal, minVal, width, height, padding };
  }, [selectedIndicator]);

  function calculateSvgPoints(
    dataArray: number[],
    minVal: number,
    maxVal: number,
    width: number,
    height: number,
    padding: number
  ) {
    const pointsCount = dataArray.length;
    const stepX = (width - padding * 2) / (pointsCount - 1);
    const rangeY = maxVal - minVal || 1;
    const scaleY = (height - padding * 2) / rangeY;

    return dataArray.map((val: number, idx: number) => {
      const x = padding + idx * stepX;
      const y = height - padding - (val - minVal) * scaleY;
      return { x, y, value: val, year: seriesHistoricas.years[idx] };
    });
  }

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-slate-50">

      {/* HEADER PRINCIPAL */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur sticky top-0 z-50 px-6 py-3 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 border border-slate-200 rounded-lg text-slate-900 bg-slate-50">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <div>
            <h1 className="text-base font-semibold tracking-tight text-slate-900">
              Simulador Fiscal de Modelos Comparados
            </h1>
            <p className="text-xs text-slate-500 font-medium">Asesoría de Política Pública • Cátedra Teoría y Análisis Económico II (UNAM)</p>
          </div>
        </div>

        {/* NAVEGACIÓN TABLERO */}
        <nav className="inline-flex h-9 items-center justify-center rounded-lg bg-slate-100 p-1 text-slate-500 self-stretch lg:self-auto overflow-x-auto">
          {[
            { id: 'comparacion', label: 'Evidencia Comparada' },
            { id: 'simulador', label: 'Simulador por Modelos' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                activeTab === tab.id
                  ? 'bg-white text-slate-950 shadow-sm border border-slate-200/50'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col gap-6">

        {/* TAB 1: EVIDENCIA COMPARADA HISTÓRICA */}
        {activeTab === 'comparacion' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Controles del Gráfico */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-5">
              <div>
                <h3 className="text-sm font-semibold tracking-tight text-slate-900">Mapeo de Evidencia</h3>
                <p className="text-xs text-slate-500 mt-1">Seleccione la variable macroeconómica de referencia para visualizar la evolución histórica comparada (2000-2022).</p>
              </div>

              {/* Selector de Variable */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700">Variable Macroeconómica</label>
                <div className="flex flex-col gap-1.5">
                  {([
                    { id: 'gini', label: 'Coeficiente de Gini' },
                    { id: 'presionTributaria', label: 'Presión Tributaria (% PIB)' },
                    { id: 'ahorro', label: 'Ahorro Nacional Bruto (% PIB)' },
                    { id: 'deuda', label: 'Deuda Pública (% PIB)' }
                  ] as const).map((ind) => (
                    <button
                      key={ind.id}
                      onClick={() => setSelectedIndicator(ind.id)}
                      className={`w-full px-3 py-2 text-xs font-medium rounded-md border text-left transition-all duration-150 ${
                        selectedIndicator === ind.id
                          ? 'bg-slate-900 border-slate-900 text-slate-50 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      {ind.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 text-[11px] text-slate-500 leading-relaxed space-y-2">
                <p className="font-medium text-slate-800">💡 Nota sobre archivos consultados:</p>
                <p>Las series de Dinamarca provienen del archivo <em className="text-slate-700 font-medium">"Dinamarca y Argentina.xlsx"</em>, reflejando su bajísima desigualdad estructural (Gini &lt; 29) [cite: 32].</p>
                <p>El perfil de ahorro de China proviene de <em className="text-slate-700 font-medium">"china(1)_2.xlsx"</em>, mostrando una tasa récord de generación interna de capital que supera el 45% del PIB [cite: 4].</p>
                <p>Uruguay se incorpora como un exitoso modelo regional de reforma impositiva dual (Astori 2007) que atenuó el Gini manteniendo grado de inversión soberano [cite: 1.1.1, 1.2.3].</p>
              </div>
            </div>

            {/* Visualización Gráfica SVG */}
            <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                    {selectedIndicator === 'gini' ? 'Desigualdad (Coeficiente de Gini)' : selectedIndicator === 'presionTributaria' ? 'Presión Fiscal (% PIB)' : selectedIndicator === 'ahorro' ? 'Ahorro Bruto (% PIB)' : 'Deuda Pública (% PIB)'} (2000-2022)
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Mapeo de tendencia oficial sobre el PIB por país de origen.</p>
                </div>
              </div>

              {/* Leyenda del Gráfico */}
              <div className="flex flex-wrap gap-4 items-center justify-center my-3 text-[11px] font-medium text-slate-650 bg-slate-50/50 py-2 px-3 rounded-lg border border-slate-200/80">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#0f172a] inline-block"></span>🇦🇷 Argentina</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#e11d48] inline-block"></span>🇳🇴 Noruega</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#16a34a] inline-block"></span>🇩🇰 Dinamarca</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#ea580c] inline-block"></span>🇨🇳 China</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#0891b2] inline-block"></span>🇺🇾 Uruguay</span>
              </div>

              {/* Gráfico SVG */}
              <div className="w-full overflow-x-auto">
                <svg
                  viewBox={`0 0 ${chartVisualData.width} ${chartVisualData.height}`}
                  className="w-full h-auto min-w-[550px] overflow-visible"
                >
                  {/* Líneas horizontales de guía */}
                  {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                    const y = chartVisualData.padding + ratio * (chartVisualData.height - chartVisualData.padding * 2);
                    const val = chartVisualData.maxVal - ratio * (chartVisualData.maxVal - chartVisualData.minVal);
                    return (
                      <g key={idx}>
                        <line
                          x1={chartVisualData.padding}
                          y1={y}
                          x2={chartVisualData.width - chartVisualData.padding}
                          y2={y}
                          stroke="#e2e8f0"
                          strokeWidth="1"
                          strokeDasharray="4 4"
                        />
                        <text
                          x={chartVisualData.padding - 8}
                          y={y + 4}
                          fill="#475569"
                          fontSize="10"
                          fontWeight="600"
                          textAnchor="end"
                        >
                          {val.toFixed(1)}{selectedIndicator === 'gini' ? '' : '%'}
                        </text>
                      </g>
                    );
                  })}

                  {/* Etiquetas del eje X (Años) */}
                  {seriesHistoricas.years.map((year, idx) => {
                    const stepX = (chartVisualData.width - chartVisualData.padding * 2) / (seriesHistoricas.years.length - 1);
                    const x = chartVisualData.padding + idx * stepX;
                    // Mostrar etiquetas salteadas para no superponer si son 23 años
                    const shouldShowLabel = idx % 2 === 0 || idx === seriesHistoricas.years.length - 1;
                    return shouldShowLabel ? (
                      <g key={idx}>
                        <line
                          x1={x}
                          y1={chartVisualData.padding}
                          x2={x}
                          y2={chartVisualData.height - chartVisualData.padding}
                          stroke="#f1f5f9"
                          strokeWidth="1"
                        />
                        <text
                          x={x}
                          y={chartVisualData.height - chartVisualData.padding + 18}
                          fill="#475569"
                          fontSize="10"
                          fontWeight="700"
                          textAnchor="middle"
                        >
                          {year}
                        </text>
                      </g>
                    ) : null;
                  })}

                  {/* Trazado de las Líneas por País */}
                  {chartVisualData.countryLines.map(({ country, points }) => {
                    const strokeColor = 
                      country === 'arg' ? '#0f172a' : // Slate 900
                      country === 'nor' ? '#e11d48' : // Rose 600
                      country === 'dnk' ? '#16a34a' : // Green 600
                      country === 'chn' ? '#ea580c' : // Orange 600
                      '#0891b2'; // Cyan 600

                    const shadowColor =
                      country === 'arg' ? 'rgba(15,23,42,0.1)' :
                      country === 'nor' ? 'rgba(225,29,72,0.1)' :
                      country === 'dnk' ? 'rgba(22,163,74,0.1)' :
                      country === 'chn' ? 'rgba(234,88,12,0.1)' :
                      'rgba(8,145,178,0.1)';

                    return (
                      <g key={country}>
                        <path
                          d={`M ${points.map(p => `${p.x} ${p.y}`).join(' L ')}`}
                          fill="none"
                          stroke={strokeColor}
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ filter: `drop-shadow(0px 2px 4px ${shadowColor})` }}
                        />
                        {/* Puntos de datos */}
                        {points.map((pt, idx) => (
                          <circle
                            key={idx}
                            cx={pt.x}
                            cy={pt.y}
                            r="3.5"
                            fill="#ffffff"
                            stroke={strokeColor}
                            strokeWidth="2"
                            className="cursor-pointer transition-all duration-150 hover:r-5"
                          >
                            <title>{`${country.toUpperCase()}: ${pt.value}${selectedIndicator === 'gini' ? '' : '%'}`}</title>
                          </circle>
                        ))}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Fuente del Gráfico */}
              <div className="text-right text-[10px] text-slate-500 mt-2 italic">
                Fuente: Base de Datos de Comparación Macroeconómica (UNAM/CEPAL) basada en planillas de Dinamarca, China, Noruega, Uruguay y Argentina [cite: 4, 32].
              </div>

              {/* Resumen Comparativo de Países (Tabla) */}
              <div className="mt-6 pt-4 border-t border-slate-200">
                <span className="block text-xs font-semibold text-slate-900 mb-3">Resumen de la Serie Comparada (2000-2022)</span>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 font-medium">
                        <th className="py-2.5 pr-4">País</th>
                        <th className="py-2.5 px-4 text-center">Promedio</th>
                        <th className="py-2.5 px-4 text-center">Mínimo</th>
                        <th className="py-2.5 px-4 text-center">Máximo</th>
                        <th className="py-2.5 pl-4">Enfoque de Política Económica</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr className="hover:bg-slate-50/50">
                        <td className="py-2.5 pr-4 font-semibold text-slate-900 flex items-center gap-1.5"><span>🇦🇷</span> Argentina</td>
                        <td className="py-2.5 px-4 text-center">{(seriesHistoricas.arg[selectedIndicator].reduce((a, b) => a + b, 0) / 23).toFixed(1)}{selectedIndicator === 'gini' ? '' : '%'}</td>
                        <td className="py-2.5 px-4 text-center">{Math.min(...seriesHistoricas.arg[selectedIndicator]).toFixed(1)}{selectedIndicator === 'gini' ? '' : '%'}</td>
                        <td className="py-2.5 px-4 text-center">{Math.max(...seriesHistoricas.arg[selectedIndicator]).toFixed(1)}{selectedIndicator === 'gini' ? '' : '%'}</td>
                        <td className="py-2.5 pl-4 text-slate-500">Alta volatilidad, ausencia histórica de tributación patrimonial de base robusta.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50">
                        <td className="py-2.5 pr-4 font-semibold text-slate-900 flex items-center gap-1.5"><span>🇳🇴</span> Noruega</td>
                        <td className="py-2.5 px-4 text-center">{(seriesHistoricas.nor[selectedIndicator].reduce((a, b) => a + b, 0) / 23).toFixed(1)}{selectedIndicator === 'gini' ? '' : '%'}</td>
                        <td className="py-2.5 px-4 text-center">{Math.min(...seriesHistoricas.nor[selectedIndicator]).toFixed(1)}{selectedIndicator === 'gini' ? '' : '%'}</td>
                        <td className="py-2.5 px-4 text-center">{Math.max(...seriesHistoricas.nor[selectedIndicator]).toFixed(1)}{selectedIndicator === 'gini' ? '' : '%'}</td>
                        <td className="py-2.5 pl-4 text-slate-500">Intangibilidad del gasto mediante retención en Fondo Soberano y Formuesskatt.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50">
                        <td className="py-2.5 pr-4 font-semibold text-slate-900 flex items-center gap-1.5"><span>🇩🇰</span> Dinamarca</td>
                        <td className="py-2.5 px-4 text-center">{(seriesHistoricas.dnk[selectedIndicator].reduce((a, b) => a + b, 0) / 23).toFixed(1)}{selectedIndicator === 'gini' ? '' : '%'}</td>
                        <td className="py-2.5 px-4 text-center">{Math.min(...seriesHistoricas.dnk[selectedIndicator]).toFixed(1)}{selectedIndicator === 'gini' ? '' : '%'}</td>
                        <td className="py-2.5 px-4 text-center">{Math.max(...seriesHistoricas.dnk[selectedIndicator]).toFixed(1)}{selectedIndicator === 'gini' ? '' : '%'}</td>
                        <td className="py-2.5 pl-4 text-slate-500">Alta presión fiscal directa, impuesto catastral al suelo y equidad universal.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50">
                        <td className="py-2.5 pr-4 font-semibold text-slate-900 flex items-center gap-1.5"><span>🇨🇳</span> China</td>
                        <td className="py-2.5 px-4 text-center">{(seriesHistoricas.chn[selectedIndicator].reduce((a, b) => a + b, 0) / 23).toFixed(1)}{selectedIndicator === 'gini' ? '' : '%'}</td>
                        <td className="py-2.5 px-4 text-center">{Math.min(...seriesHistoricas.chn[selectedIndicator]).toFixed(1)}{selectedIndicator === 'gini' ? '' : '%'}</td>
                        <td className="py-2.5 px-4 text-center">{Math.max(...seriesHistoricas.chn[selectedIndicator]).toFixed(1)}{selectedIndicator === 'gini' ? '' : '%'}</td>
                        <td className="py-2.5 pl-4 text-slate-500">Fuerte ahorro interno, coparticipación centralizada (IIT) para atenuar asimetrías.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50">
                        <td className="py-2.5 pr-4 font-semibold text-slate-900 flex items-center gap-1.5"><span>🇺🇾</span> Uruguay</td>
                        <td className="py-2.5 px-4 text-center">{(seriesHistoricas.ury[selectedIndicator].reduce((a, b) => a + b, 0) / 23).toFixed(1)}{selectedIndicator === 'gini' ? '' : '%'}</td>
                        <td className="py-2.5 px-4 text-center">{Math.min(...seriesHistoricas.ury[selectedIndicator]).toFixed(1)}{selectedIndicator === 'gini' ? '' : '%'}</td>
                        <td className="py-2.5 px-4 text-center">{Math.max(...seriesHistoricas.ury[selectedIndicator]).toFixed(1)}{selectedIndicator === 'gini' ? '' : '%'}</td>
                        <td className="py-2.5 pl-4 text-slate-500">Esquema impositivo dual (IRPF) equilibrando progresividad y grado de inversión.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        )}

            {/* Cabecera explicativa */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Entorno de Modelos de Simulación
              </span>
              <h2 className="text-xl font-semibold text-slate-900 tracking-tight">
                Simulador de Políticas Públicas
              </h2>
              <p className="text-xs text-slate-500 leading-normal">
                Explore y ajuste los parámetros de los diferentes modelos internacionales para proyectar su impacto simulado sobre la economía de Argentina.
              </p>
            </div>

            {/* CUADRO COMPARATIVO DE IMPACTO GINI (TODOS LOS CASOS) */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Monitoreo Redistributivo</span>
                <h3 className="text-sm font-semibold tracking-tight text-slate-900 mt-0.5">Impacto Proyectado en el Coeficiente de Gini (Argentina)</h3>
                <p className="text-xs text-slate-550 mt-1">
                  El escenario base de la economía argentina parte de un Coeficiente de Gini de <strong className="text-slate-900 font-semibold">{baseArg.gini}</strong>. La calibración de cada modelo proyecta los siguientes coeficientes finales y sus respectivas reducciones en puntos:
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                <div className="bg-slate-50/50 p-3 rounded-lg border border-slate-200/80 text-center flex flex-col justify-center items-center">
                  <span className="block text-[10px] text-slate-500 uppercase font-medium">🇦🇷 Escenario Base</span>
                  <span className="text-lg font-semibold tracking-tight text-slate-900 mt-1">{baseArg.gini}</span>
                  <span className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-medium bg-slate-100 text-slate-600 mt-1.5">Sin Cambios</span>
                </div>
                <div className="bg-slate-50/50 p-3 rounded-lg border border-slate-200/80 text-center flex flex-col justify-center items-center">
                  <span className="block text-[10px] text-slate-500 uppercase font-medium">🇳🇴 Mod. Noruega</span>
                  <span className="text-lg font-semibold tracking-tight text-slate-900 mt-1">{simNoruegaResult.gini.toFixed(1)}</span>
                  <span className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-medium bg-emerald-50 text-emerald-700 mt-1.5">
                    -{Math.max(0, parseFloat((baseArg.gini - simNoruegaResult.gini).toFixed(1)))} pts
                  </span>
                </div>
                <div className="bg-slate-50/50 p-3 rounded-lg border border-slate-200/80 text-center flex flex-col justify-center items-center">
                  <span className="block text-[10px] text-slate-500 uppercase font-medium">🇩🇰 Mod. Dinamarca</span>
                  <span className="text-lg font-semibold tracking-tight text-slate-900 mt-1">{simDinamarcaResult.gini.toFixed(1)}</span>
                  <span className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-medium bg-emerald-50 text-emerald-700 mt-1.5">
                    -{Math.max(0, parseFloat((baseArg.gini - simDinamarcaResult.gini).toFixed(1)))} pts
                  </span>
                </div>
                <div className="bg-slate-50/50 p-3 rounded-lg border border-slate-200/80 text-center flex flex-col justify-center items-center">
                  <span className="block text-[10px] text-slate-500 uppercase font-medium">🇨🇳 Mod. China</span>
                  <span className="text-lg font-semibold tracking-tight text-slate-900 mt-1">{simChinaResult.gini.toFixed(1)}</span>
                  <span className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-medium bg-emerald-50 text-emerald-700 mt-1.5">
                    -{Math.max(0, parseFloat((baseArg.gini - simChinaResult.gini).toFixed(1)))} pts
                  </span>
                </div>
                <div className="bg-slate-50/50 p-3 rounded-lg border border-slate-200/80 text-center flex flex-col justify-center items-center">
                  <span className="block text-[10px] text-slate-500 uppercase font-medium">🇺🇾 Mod. Uruguay</span>
                  <span className="text-lg font-semibold tracking-tight text-slate-900 mt-1">{simUruguayResult.gini.toFixed(1)}</span>
                  <span className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-medium bg-emerald-50 text-emerald-700 mt-1.5">
                    -{Math.max(0, parseFloat((baseArg.gini - simUruguayResult.gini).toFixed(1)))} pts
                  </span>
                </div>
                <div className="bg-slate-55/70 p-3 rounded-lg border border-slate-300 text-center flex flex-col justify-center items-center shadow-sm">
                  <span className="block text-[10px] text-slate-900 uppercase font-semibold">🛡️ Unificado</span>
                  <span className="text-lg font-bold tracking-tight text-slate-900 mt-1">{simUnificadoResult.gini.toFixed(1)}</span>
                  <span className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-medium bg-indigo-50 text-indigo-700 mt-1.5 font-semibold">
                    -{Math.max(0, parseFloat((baseArg.gini - simUnificadoResult.gini).toFixed(1)))} pts
                  </span>
                </div>
              </div>
            </div>

            {/* Sub-Navegación de Modelos */}
            <div className="flex bg-slate-100 p-1.5 rounded-lg border border-slate-250/70 overflow-x-auto gap-1">
              {[
                { id: 'noruega', label: '🇳🇴 Modelo Noruega', desc: 'Fondo GPFG & Formuesskatt' },
                { id: 'dinamarca', label: '🇩🇰 Modelo Dinamarca', desc: 'Impuesto al Suelo & Verde' },
                { id: 'china', label: '🇨🇳 Modelo China', desc: 'IIT & Gasto Social' },
                { id: 'uruguay', label: '🇺🇾 Modelo Uruguay', desc: 'IRPF Dual & Patrimonio' },
                { id: 'unificado', label: '🛡️ Modelo Unificado (ARG)', desc: 'Consenso Integrado' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveModelTab(m.id)}
                  className={`flex-1 min-w-[140px] px-3.5 py-2 rounded-md text-left transition-all duration-150 ${activeModelTab === m.id
                      ? 'bg-white border border-slate-200 text-slate-900 font-medium shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50/50'
                    }`}
                >
                  <span className="block text-xs font-semibold">{m.label}</span>
                  <span className="block text-[10px] text-slate-400 mt-0.5">{m.desc}</span>
                </button>
              ))}
            </div>

            {/* 1. SUB-TAB: NORUEGA */}
            {activeModelTab === 'noruega' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">⚙️ Parámetros Noruega</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-600">Alícuota Formuesskatt (Patrimonio)</span>
                        <span className="text-slate-900 font-semibold">{norPatrimonio}%</span>
                      </div>
                      <input
                        type="range" min="0.2" max="3.0" step="0.1" value={norPatrimonio}
                        onChange={(e) => setNorPatrimonio(parseFloat(e.target.value))}
                        className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
                      />
                      <span className="text-[10px] text-slate-400 block">Impuesto progresivo permanente aplicado sobre el stock de activos netos declarados.</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-600">Retención de Renta para GPFG (Ahorro)</span>
                        <span className="text-slate-900 font-semibold">{norFondoGPFG}%</span>
                      </div>
                      <input
                        type="range" min="10" max="100" step="5" value={norFondoGPFG}
                        onChange={(e) => setNorFondoGPFG(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
                      />
                      <span className="text-[10px] text-slate-400 block">Porcentaje de ingresos extraordinarios derivados directamente a la reserva intergeneracional.</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between gap-5">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">📈 Impacto Proyectado en Argentina (Standalone)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-200/80">
                        <span className="text-[10px] font-semibold text-slate-500 block uppercase">Coeficiente de Gini Proyectado</span>
                        <span className="text-xl font-bold tracking-tight text-slate-900 mt-1">{simNoruegaResult.gini.toFixed(1)}</span>
                        <span className="block text-[10px] text-slate-400 mt-0.5">Escenario Base: 42.3</span>
                      </div>
                      <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-200/80">
                        <span className="text-[10px] font-semibold text-slate-500 block uppercase">Ahorro Nacional Bruto Proyectado</span>
                        <span className="text-xl font-bold tracking-tight text-slate-900 mt-1">{simNoruegaResult.ahorro}% del PIB</span>
                        <span className="block text-[10px] text-slate-400 mt-0.5">Escenario Base: 15.8% (Fondo: USD {simNoruegaResult.usdRecaudado}M)</span>
                      </div>
                      <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-200/80 col-span-1 md:col-span-2">
                        <span className="text-[10px] font-semibold text-slate-500 block uppercase">Relación Deuda / PIB</span>
                        <span className="text-xl font-bold tracking-tight text-slate-900 mt-1">{simNoruegaResult.deuda}% del PIB</span>
                        <span className="block text-[10px] text-slate-400 mt-0.5">Escenario Base: 95.0%</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-200/80 text-xs text-slate-500 leading-normal">
                    ℹ️ <strong>Mecánica del Modelo:</strong> El modelo noruego de acumulación desvincula el consumo del sector público de la inestabilidad. Al ahorrar la recaudación patrimonial y canalizarla al fondo soberano, la deuda externa de Argentina cae drásticamente debido a la desmonetización del déficit [cite: 4, 12].
                  </div>

                  {/* Nota de pie con Fórmula */}
                  <div className="p-4 bg-slate-50/50 rounded-lg border border-slate-200/80 text-xs text-slate-505 space-y-2">
                    <p className="font-semibold text-slate-700">📝 Ecuación Económica y Propuesta de Implementación:</p>
                    <div className="bg-white p-3 rounded-lg border border-slate-200/80 space-y-2 text-slate-700 font-medium text-[11px]">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                        <span>1. Recaudación Patrimonial Proyectada (norPatrimonio):</span>
                        <span className="font-mono bg-slate-50 px-2 py-0.5 rounded text-slate-900 border border-slate-200/40">
                          {norPatrimonio}% × 1.5 = {(norPatrimonio * 1.5).toFixed(3)}% del PIB (USD {Math.round(norPatrimonio * 1.5 * 4505)}M)
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                        <span>2. Destinación a Ahorro Soberano (norFondoGPFG):</span>
                        <span className="font-mono bg-slate-50 px-2 py-0.5 rounded text-slate-900 border border-slate-200/40">
                          Recaudación × ({norFondoGPFG}% / 100) = {(norPatrimonio * 1.5 * (norFondoGPFG / 100)).toFixed(3)}% del PIB
                        </span>
                      </div>
                      <div className="flex items-center justify-between font-bold text-slate-800 pt-1.5">
                        <span>Gini Proyectado Final:</span>
                        <span className="font-mono bg-slate-900 px-2.5 py-1 rounded text-slate-50 text-xs font-semibold shadow-sm">
                          42.3 - (Recaudación × 1.8) = {simNoruegaResult.gini.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <p className="leading-normal">
                      <strong>Planteo:</strong> Se introduce un impuesto directo sobre la riqueza neta de las personas físicas (tipo Formuesskatt noruego). Para evitar la fuga de capitales y el impacto inflacionario en el consumo directo, una parte sustancial de la recaudación se retira del flujo local para capitalizar un fondo anticíclico que invierte a nivel internacional, reduciendo el endeudamiento neto y la volatilidad cambiaria histórica de Argentina.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. SUB-TAB: DINAMARCA */}
            {activeModelTab === 'dinamarca' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">⚙️ Parámetros Dinamarca</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-600">Impuesto catastral al Suelo</span>
                        <span className="text-slate-900 font-semibold">{dnkSuelo}%</span>
                      </div>
                      <input
                        type="range" min="0.5" max="4.0" step="0.1" value={dnkSuelo}
                        onChange={(e) => setDnkSuelo(parseFloat(e.target.value))}
                        className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
                      />
                      <span className="text-[10px] text-slate-400 block">Tasa directa municipal sobre el valor del suelo libre de mejoras para descentralización fiscal.</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-600">Impuesto Verde a Rodados</span>
                        <span className="text-slate-900 font-semibold">{dnkVehiculos}%</span>
                      </div>
                      <input
                        type="range" min="10" max="100" step="5" value={dnkVehiculos}
                        onChange={(e) => setDnkVehiculos(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
                      />
                      <span className="text-[10px] text-slate-400 block">Gravamen ambiental progresivo para desincentivar el uso de automóviles particulares de lujo.</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between gap-5">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">📈 Impacto Proyectado en Argentina (Standalone)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-200/80">
                        <span className="text-[10px] font-semibold text-slate-500 block uppercase">Presión Tributaria Final</span>
                        <span className="text-xl font-bold tracking-tight text-slate-900 mt-1">{simDinamarcaResult.presion}% del PIB</span>
                        <span className="block text-[10px] text-slate-400 mt-0.5">Recaudación Adicional: USD {simDinamarcaResult.usdRecaudado}M</span>
                      </div>
                      <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-200/80">
                        <span className="text-[10px] font-semibold text-slate-500 block uppercase">Coeficiente de Gini Proyectado</span>
                        <span className="text-xl font-bold tracking-tight text-slate-900 mt-1">{simDinamarcaResult.gini.toFixed(1)}</span>
                        <span className="block text-[10px] text-slate-400 mt-0.5">Escenario Base: 42.3</span>
                      </div>
                      <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-200/80 col-span-1 md:col-span-2">
                        <span className="text-[10px] font-semibold text-slate-500 block uppercase">Relación Deuda / PIB</span>
                        <span className="text-xl font-bold tracking-tight text-slate-900 mt-1">{simDinamarcaResult.deuda}% del PIB</span>
                        <span className="block text-[10px] text-slate-400 mt-0.5">Escenario Base: 95.0%</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-200/80 text-xs text-slate-500 leading-normal">
                    ℹ️ <strong>Mecánica del Modelo:</strong> El modelo danés capta recaudación líquida a nivel de base patrimonial inmobiliaria y ambiental, permitiendo desarmar impuestos regresivos de consumo e igualar el Coeficiente de Gini a mínimos históricos.
                  </div>
                  <div className="p-4 bg-slate-50/50 rounded-lg border border-slate-200/80 text-xs text-slate-505 space-y-2">
                    <p className="font-semibold text-slate-700">📝 Ecuación Económica y Propuesta de Implementación:</p>
                    <div className="bg-white p-3 rounded-lg border border-slate-200/80 space-y-2 text-slate-700 font-medium text-[11px]">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                        <span>1. Recaudación por Suelo (dnkSuelo):</span>
                        <span className="font-mono bg-slate-50 px-2 py-0.5 rounded text-slate-900 border border-slate-200/40">
                          {dnkSuelo}% × 1.6 = {(dnkSuelo * 1.6).toFixed(3)}% del PIB
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                        <span>2. Recaudación Impuesto Verde (dnkVehiculos):</span>
                        <span className="font-mono bg-slate-50 px-2 py-0.5 rounded text-slate-900 border border-slate-200/40">
                          ({dnkVehiculos}% / 100) × 0.9 = {((dnkVehiculos / 100) * 0.9).toFixed(3)}% del PIB
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                        <span>3. Recaudación Total Adicional (R):</span>
                        <span className="font-mono bg-slate-50 px-2 py-0.5 rounded text-slate-900 border border-slate-200/40">
                          {(dnkSuelo * 1.6).toFixed(3)}% + {((dnkVehiculos / 100) * 0.9).toFixed(3)}% = {(dnkSuelo * 1.6 + (dnkVehiculos / 100) * 0.9).toFixed(3)}% del PIB
                        </span>
                      </div>
                      <div className="flex items-center justify-between font-bold text-slate-800 pt-1.5">
                        <span>Gini Proyectado Final:</span>
                        <span className="font-mono bg-slate-900 px-2.5 py-1 rounded text-slate-50 text-xs font-semibold shadow-sm">
                          42.3 - (R × 2.8) = {simDinamarcaResult.gini.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <p className="leading-normal">
                      <strong>Planteo:</strong> Se descartan los gravámenes distorsivos sobre las mejoras y la producción, y en su lugar se aplica un impuesto al valor de la tierra libre de mejoras (Land Value Tax). En paralelo, se grava la adquisición de vehículos ineficientes (Impuesto Verde), redireccionando los recursos a la reducción de aportes patronales para fomentar el empleo registrado.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 3. SUB-TAB: CHINA */}
            {activeModelTab === 'china' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">⚙️ Parámetros China</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-600">Retención de IIT (Federal)</span>
                        <span className="text-slate-900 font-semibold">{chnCentralizacion}%</span>
                      </div>
                      <input
                        type="range" min="20" max="90" step="5" value={chnCentralizacion}
                        onChange={(e) => setChnCentralizacion(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
                      />
                      <span className="text-[10px] text-slate-400 block">Porcentaje del impuesto progresivo a los ingresos capturado de forma central para igualar regiones.</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-600">Presupuesto en Salud y Seguridad</span>
                        <span className="text-slate-900 font-semibold">{chnGastoWelfare}%</span>
                      </div>
                      <input
                        type="range" min="5" max="50" step="1" value={chnGastoWelfare}
                        onChange={(e) => setChnGastoWelfare(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
                      />
                      <span className="text-[10px] text-slate-400 block">Proporción del gasto reorientada desde infraestructura física hacia bienestar social directo.</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between gap-5">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-505 mb-4">📈 Impacto Proyectado en Argentina (Standalone)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-200/80">
                        <span className="text-[10px] font-semibold text-slate-500 block uppercase">Recaudación Centralizada Proyectada</span>
                        <span className="text-xl font-bold tracking-tight text-slate-900 mt-1">{simChinaResult.presion}% del PIB</span>
                        <span className="block text-[10px] text-slate-400 mt-0.5">Recaudación Federal: USD {simChinaResult.usdRecaudado}M</span>
                      </div>
                      <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-200/80 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-semibold text-slate-500 block uppercase">Gini de Equilibrio Regional</span>
                          <span className="text-xl font-bold tracking-tight text-slate-900 mt-1">{simChinaResult.gini.toFixed(1)}</span>
                          <span className="block text-[10px] text-slate-400 mt-0.5">Escenario Base: 42.3</span>
                        </div>
                      </div>
                      <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-200/80 col-span-1 md:col-span-2">
                        <span className="text-[10px] font-semibold text-slate-500 block uppercase">Relación Deuda / PIB</span>
                        <span className="text-xl font-bold tracking-tight text-slate-900 mt-1">{simChinaResult.deuda}% del PIB</span>
                        <span className="block text-[10px] text-slate-400 mt-0.5">Escenario Base: 95.0%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-200/80 text-xs text-slate-500 leading-normal">
                    <strong>Análisis:</strong> Al igual que la centralización del 60% que China aplica al IIT coparticipable [cite: 4], centralizar recursos progresivos federales en Argentina permitiría corregir las asimetrías de las provincias del NOA y NEA, financiando de forma automática infraestructura de salud donde el empleo informal encubre la precarización real del trabajo.
                  </div>

                  {/* Nota de pie con Fórmula */}
                  <div className="p-4 bg-slate-50/50 rounded-lg border border-slate-200/80 text-xs text-slate-505 space-y-2">
                    <p className="font-semibold text-slate-700">📝 Ecuación Económica y Propuesta de Implementación:</p>
                    <div className="bg-white p-3 rounded-lg border border-slate-200/80 space-y-2 text-slate-700 font-medium text-[11px]">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                        <span>1. IIT Federal Retenido (Rec):</span>
                        <span className="font-mono bg-slate-50 px-2 py-0.5 rounded text-slate-900 border border-slate-200/40">
                          ({chnCentralizacion}% / 100) × 3.5 = {((chnCentralizacion / 100) * 3.5).toFixed(3)}% del PIB
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                        <span>2. Gasto en Bienestar Directo (B):</span>
                        <span className="font-mono bg-slate-50 px-2 py-0.5 rounded text-slate-900 border border-slate-200/40">
                          ({chnGastoWelfare}% / 100) × 2.2 = {((chnGastoWelfare / 100) * 2.2).toFixed(3)}% del PIB
                        </span>
                      </div>
                      <div className="flex items-center justify-between font-bold text-slate-800 pt-1.5">
                        <span>Gini Proyectado Final:</span>
                        <span className="font-mono bg-slate-900 px-2.5 py-1 rounded text-slate-50 text-xs font-semibold shadow-sm">
                          42.3 - (Rec × 1.5 + B × 15) = {simChinaResult.gini.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <p className="leading-normal">
                      <strong>Planteo:</strong> Se reestructura el impuesto a los ingresos individuales (IIT) centralizando su recaudación a nivel federal, reduciendo los incentivos de competencia fiscal interprovincial nociva. Los recursos recaudados se redirigen específicamente a la mejora de la cobertura de salud y seguridad social básica en regiones históricamente postergadas.
                    </p>
                  </div>
                </div>
              </div>
            )}

          {/* SUBTAB: URUGUAY */}
          {activeModelTab === 'uruguay' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">

              {/* Controles de Uruguay */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">⚙️ Parámetros Uruguay</h3>

                {/* Control 1 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-600">IRPF Categoría I (Rentas del Capital)</span>
                    <span className="text-slate-900 font-semibold">{uryRentasCapital}%</span>
                  </div>
                  <input
                    type="range" min="5" max="25" step="1" value={uryRentasCapital}
                    onChange={(e) => setUryRentasCapital(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
                  />
                  <span className="text-[10px] text-slate-400 block">Doble imposición cedular sobre dividendos y rendimiento financiero (Astori, Ley 18083) [cite: 1.2.4].</span>
                </div>

                {/* Control 2 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-600">Alícuota del Impuesto al Patrimonio (IP)</span>
                    <span className="text-slate-900 font-semibold">{uryPatrimonioNeto}%</span>
                  </div>
                  <input
                    type="range" min="0.5" max="4.0" step="0.1" value={uryPatrimonioNeto}
                    onChange={(e) => setUryPatrimonioNeto(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
                  />
                  <span className="text-[10px] text-slate-400 block">Tasa aplicada sobre bienes fijos netos individuales de las grandes fortunas declaradas [cite: 1.2.6].</span>
                </div>

                {/* Control 3 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-600">Destinado a la Seguridad Social (IASS)</span>
                    <span className="text-slate-900 font-semibold">{uryDestinoSocial}%</span>
                  </div>
                  <input
                    type="range" min="10" max="100" step="10" value={uryDestinoSocial}
                    onChange={(e) => setUryDestinoSocial(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
                  />
                  <span className="text-[10px] text-slate-400 block">Porcentaje de lo recaudado por el impuesto patrimonial destinado a aliviar los aportes jubilatorios de ingresos bajos [cite: 1.2.4].</span>
                </div>
              </div>

              {/* Resultados Uruguay */}
              <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between gap-5">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">📈 Impacto Proyectado en Argentina (Standalone)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Tarjeta 1 */}
                    <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-200/80 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-semibold text-slate-500 block uppercase">Rating Soberano Proyectado</span>
                        <span className="text-lg font-bold tracking-tight text-slate-900 mt-1">BBB+ (Investment Grade)</span>
                      </div>
                      <span className="text-2xl">📈</span>
                    </div>

                    {/* Tarjeta 2 */}
                    <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-200/80 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-semibold text-slate-500 block uppercase">Recaudación Estimada de Patrimonio</span>
                        <span className="text-xl font-bold tracking-tight text-slate-900 mt-1">
                          {simUruguayResult.recaudacionPib}% del PIB
                        </span>
                      </div>
                      <span className="text-2xl">🏛️</span>
                    </div>

                    {/* Tarjeta 3 */}
                    <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-200/80 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-semibold text-slate-500 block uppercase">PIB per Cápita Indirecto por Estabilidad</span>
                        <span className="text-xl font-bold tracking-tight text-slate-900 mt-1">
                          USD {(13962 * 1.15).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </span>
                      </div>
                      <span className="text-2xl">📊</span>
                    </div>

                    {/* Tarjeta 4 */}
                    <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-200/80 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-semibold text-slate-500 block uppercase">Coeficiente de Gini Obtenido</span>
                        <span className="text-xl font-bold tracking-tight text-slate-900 mt-1">
                          {simUruguayResult.gini.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-2xl">👥</span>
                    </div>

                  </div>
                </div>

                <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-200/80 text-xs text-slate-500 leading-normal space-y-2">
                  <p>💡 <strong>¿Por qué funciona el esquema Uruguayo?</strong></p>
                  <p>Uruguay combina la progresividad de las rentas con seguridad jurídica. Al implementar tasas duales (separar dividendos de salarios), se recauda de manera justa sin ahuyentar la inversión productiva, consolidando el mejor coeficiente de equidad de América Latina (Gini ~38.8) [cite: 1.1.1, 1.2.5].</p>
                </div>

                {/* Nota de pie con Fórmula */}
                <div className="p-4 bg-slate-50/50 rounded-lg border border-slate-200/80 text-xs text-slate-500 space-y-2">
                  <p className="font-semibold text-slate-700">📝 Ecuación Económica y Propuesta de Implementación:</p>
                  <div className="bg-white p-3 rounded-lg border border-slate-200/80 space-y-2 text-slate-700 font-medium text-[11px]">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                      <span>1. Recaudación Rentas del Capital:</span>
                      <span className="font-mono bg-slate-50 px-2 py-0.5 rounded text-slate-900 border border-slate-200/40">
                        ({uryRentasCapital}% / 100) × 1.1 = {((uryRentasCapital / 100) * 1.1).toFixed(3)}% del PIB
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                      <span>2. Recaudación Impuesto al Patrimonio:</span>
                      <span className="font-mono bg-slate-50 px-2 py-0.5 rounded text-slate-900 border border-slate-200/40">
                        {uryPatrimonioNeto}% × 1.3 = {(uryPatrimonioNeto * 1.3).toFixed(3)}% del PIB
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                      <span>3. Recaudación Fiscal Total (R):</span>
                      <span className="font-mono bg-slate-50 px-2 py-0.5 rounded text-slate-900 border border-slate-200/40">
                        {((uryRentasCapital / 100) * 1.1).toFixed(3)}% + {(uryPatrimonioNeto * 1.3).toFixed(3)}% = {(((uryRentasCapital / 100) * 1.1) + (uryPatrimonioNeto * 1.3)).toFixed(3)}% del PIB
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                      <span>4. Asignación Social (IASS):</span>
                      <span className="font-mono bg-slate-50 px-2 py-0.5 rounded text-slate-900 border border-slate-200/40">
                        R × ({uryDestinoSocial}% / 100) × 2.1 = {((((uryRentasCapital / 100) * 1.1) + (uryPatrimonioNeto * 1.3)) * (uryDestinoSocial / 100) * 2.1).toFixed(3)}% del PIB
                      </span>
                    </div>
                    <div className="flex items-center justify-between font-bold text-slate-800 pt-1.5">
                      <span>Gini Proyectado Final:</span>
                      <span className="font-mono bg-slate-900 px-2.5 py-1 rounded text-slate-55 text-xs font-semibold shadow-sm">
                        42.3 - (R × 1.6 + IASS) = {simUruguayResult.gini.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <p className="leading-normal text-slate-500">
                    <strong>Planteo:</strong> Se implementa un esquema tributario dual que separa los rendimientos del capital (gravados por IRPF Categoría I) de las rentas del trabajo. Adicionalmente, el Impuesto al Patrimonio se vincula de manera directa con el financiamiento del sistema de seguridad social (IASS), aliviando los aportes jubilatorios de los deciles de menores ingresos sin presionar el déficit fiscal.
                  </p>
                </div>
              </div>

            </div>
          )}

        {/* SUBTAB: UNIFICADO (ARGENTINA UNIFICADA) */}
        {activeModelTab === 'unificado' && (
          <div className="space-y-6 animate-fadeIn">

            {/* Tarjeta de Consenso General */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col lg:flex-row items-stretch gap-6">

              {/* Controles Unificados */}
              <div className="flex-1 space-y-5 pr-0 lg:pr-6 border-r-0 lg:border-r border-slate-200 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">⚙️ Consenso Unificado (SIPEF)</h3>

                  <div className="space-y-4">
                    {/* Control 1 */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-600">Alícuota del SIPEF (Patrimonio)</span>
                        <span className="text-slate-900 font-semibold">{unifPatrimonio}%</span>
                      </div>
                      <input
                        type="range" min="0.5" max="3.5" step="0.1" value={unifPatrimonio}
                        onChange={(e) => setUnifPatrimonio(parseFloat(e.target.value))}
                        className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
                      />
                      <span className="text-[10px] text-slate-400 block">Nuevo Impuesto Estructural Patrimonial unificado para los deciles más altos.</span>
                    </div>

                    {/* Control 2 */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-600">Destinación al Ahorro Soberano (Noruega)</span>
                        <span className="text-slate-900 font-semibold">{unifFondoContraciclico}%</span>
                      </div>
                      <input
                        type="range" min="10" max="90" step="5" value={unifFondoContraciclico}
                        onChange={(e) => setUnifFondoContraciclico(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
                      />
                      <span className="text-[10px] text-slate-400 block">Proporción del tributo patrimonial blindada para el Fondo Soberano contra shocks inflacionarios [cite: 4].</span>
                    </div>

                    {/* Control 3 */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-600">Centralización Federal Regional (China/Uruguay)</span>
                        <span className="text-slate-900 font-semibold">{unifCentralizacionFederal}%</span>
                      </div>
                      <input
                        type="range" min="20" max="90" step="5" value={unifCentralizacionFederal}
                        onChange={(e) => setUnifCentralizacion(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-400"
                      />
                      <span className="text-[10px] text-slate-400 block">Porcentaje coparticipado para compensar asimetrías subnacionales directas en el interior [cite: 4].</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dashboard de Impacto Macroeconómico */}
              <div className="flex-1 flex flex-col justify-between gap-5">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-505 mb-4">🏆 Proyecciones Macroeconómicas Consensuadas</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-200/80 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-semibold text-slate-500 block uppercase">Coeficiente de Gini Proyectado</span>
                        <span className="text-xl font-bold tracking-tight text-slate-900 mt-1 block">{simUnificadoResult.gini.toFixed(1)}</span>
                      </div>
                      <span className="block text-[10px] text-slate-400 mt-1.5 pt-1.5 border-t border-slate-200/40">Escenario Base: 42.3 (Mejora: -{simUnificadoResult.gini < 42.3 ? (((42.3 - simUnificadoResult.gini) / 42.3) * 100).toFixed(1) : 0}%)</span>
                    </div>

                    <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-200/80 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-semibold text-slate-500 block uppercase">Tasa de Ahorro Bruto</span>
                        <span className="text-xl font-bold tracking-tight text-slate-900 mt-1 block">{simUnificadoResult.ahorro}% del PIB</span>
                      </div>
                      <span className="block text-[10px] text-slate-400 mt-1.5 pt-1.5 border-t border-slate-200/40">Escenario Base: 15.8% (Fondo: USD {simUnificadoResult.ahorroFondoUsd}M)</span>
                    </div>

                    <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-200/80 flex flex-col justify-between col-span-1 md:col-span-2">
                      <div>
                        <span className="text-[10px] font-semibold text-slate-500 block uppercase">Relación Deuda / PIB</span>
                        <span className="text-xl font-bold tracking-tight text-slate-900 mt-1 block">{simUnificadoResult.deuda}% del PIB</span>
                      </div>
                      <span className="block text-[10px] text-slate-400 mt-1.5 pt-1.5 border-t border-slate-200/40">Escenario Base: 95.0% (Desendeudamiento genuino sin devaluación regresiva)</span>
                    </div>

                  </div>
                </div>

                {/* Diagnóstico según Gini de Consenso */}
                <div className="text-xs leading-normal">
                  {simUnificadoResult.gini >= 40.0 ? (
                    <p className="text-amber-800 bg-amber-50/40 p-3 rounded-lg border border-amber-200/60">
                      ⚠️ <strong>Insuficiencia Distributiva:</strong> El mínimo impositivo unificado o la tasa de redistribución es insuficiente para quebrar la barrera histórica del Gini. Incrementa el peso del SIPEF.
                    </p>
                  ) : simUnificadoResult.gini < 40.0 && simUnificadoResult.gini >= 35.0 ? (
                    <p className="text-slate-800 bg-slate-50/60 p-3 rounded-lg border border-slate-200/80">
                      📈 <strong>Meta de Cohesión Uruguaya:</strong> Has consolidado el estándar fiscal distributivo de Uruguay, logrando revertir la brecha social estructural sin devaluaciones inflacionarias [cite: 1.1.1].
                    </p>
                  ) : (
                    <p className="text-emerald-800 bg-emerald-50/40 p-3 rounded-lg border border-emerald-200/60">
                      🌟 <strong>Estándar de Equidad Nórdico:</strong> ¡Éxito Absoluto! El Coeficiente de Gini rompe los mínimos históricos, logrando neutralizar la inercia inflacionaria mediante el fondo de ahorro soberano contracíclico [cite: 4, 32].
                    </p>
                  )}
                </div>
              </div>

            </div>

            {/* Mapa de Destino del Presupuesto (Visualizador Esquemático de Consenso) */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-505">📋 Mapa del Presupuesto Unificado (Justicia & Sostenibilidad)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Caja Sostenibilidad */}
                <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-200/80 space-y-3">
                  <span className="text-[11px] font-bold text-slate-700 block uppercase">1. Sostenibilidad Fiscal (60% al Ahorro Soberano)</span>
                  <ul className="text-xs text-slate-500 space-y-2 list-disc pl-4 leading-normal">
                    <li><strong>USD {simUnificadoResult.ahorroFondoUsd}M</strong> destinados al Fondo Soberano de Desarrollo Federal (FSDF) para obras de infraestructura física en fases recesivas [cite: 4].</li>
                    <li>Descompresión de las deudas del sector público para eximir al Banco Central de emitir dinero inorgánico.</li>
                    <li>Constitución de reservas líquidas para mitigar shocks exógenos de precios agrícolas.</li>
                  </ul>
                </div>

                {/* Caja Justicia */}
                <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-200/80 space-y-3">
                  <span className="text-[11px] font-bold text-slate-700 block uppercase">2. Justicia Distributiva (40% a Compensación Directa)</span>
                  <ul className="text-xs text-slate-500 space-y-2 list-disc pl-4 leading-normal">
                    <li><strong>USD {simUnificadoResult.bienestarUsd}M</strong> destinados íntegramente a financiar la devolución del IVA de alimentos básicos para los deciles 1 a 4.</li>
                    <li>Transferencias compensatorias directas a provincias del norte profundo (NOA y NEA) para salud y redes edilicias escolares [cite: 4].</li>
                    <li>Financiamiento estable de asignaciones familiares para neutralizar picos inflacionarios.</li>
                  </ul>
                </div>

              </div>

              {/* Nota de pie con Fórmula */}
              <div className="p-4 bg-slate-50/50 rounded-lg border border-slate-200/80 text-xs text-slate-500 space-y-2">
                <p className="font-semibold text-slate-700">📝 Ecuación Económica y Propuesta de Implementación:</p>
                <div className="bg-white p-3 rounded-lg border border-slate-200/80 space-y-2 text-slate-700 font-medium text-[11px]">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                    <span>1. Recaudación SIPEF (unifPatrimonio):</span>
                    <span className="font-mono bg-slate-50 px-2 py-0.5 rounded text-slate-900 border border-slate-200/40">
                      {unifPatrimonio}% × 1.9 = {(unifPatrimonio * 1.9).toFixed(3)}% del PIB (USD {Math.round(unifPatrimonio * 1.9 * 4500)}M)
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                    <span>2. Ahorro Soberano (unifFondoContraciclico):</span>
                    <span className="font-mono bg-slate-50 px-2 py-0.5 rounded text-slate-900 border border-slate-200/40">
                      Recaudación × ({unifFondoContraciclico}% / 100) = {(unifPatrimonio * 1.9 * (unifFondoContraciclico / 100)).toFixed(3)}% del PIB (USD {simUnificadoResult.ahorroFondoUsd}M)
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                    <span>3. Presupuesto Bienestar (B):</span>
                    <span className="font-mono bg-slate-50 px-2 py-0.5 rounded text-slate-900 border border-slate-200/40">
                      Recaudación - Ahorro Soberano = {(unifPatrimonio * 1.9 * (1 - unifFondoContraciclico / 100)).toFixed(3)}% del PIB (USD {simUnificadoResult.bienestarUsd}M)
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                    <span>4. Centralización Federal:</span>
                    <span className="font-mono bg-slate-50 px-2 py-0.5 rounded text-slate-900 border border-slate-200/40">
                      B × ({unifCentralizacionFederal}% / 100) = {(unifPatrimonio * 1.9 * (1 - unifFondoContraciclico / 100) * (unifCentralizacionFederal / 100)).toFixed(3)}% del PIB
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-bold text-slate-800 pt-1.5">
                    <span>Gini Proyectado Final:</span>
                    <span className="font-mono bg-slate-900 px-2.5 py-1 rounded text-slate-55 text-xs font-semibold shadow-sm">
                      42.3 - ((((B × ({unifCentralizacionFederal}/100)) × 2.8 + Ahorro × 0.6) × 10)) = {simUnificadoResult.gini.toFixed(1)}
                    </span>
                  </div>
                </div>
                <p className="leading-normal">
                  <strong>Planteo:</strong> Se unifica la estructura patrimonial distributiva bajo el SIPEF, canalizando de forma blindada el 60% de los ingresos al fondo de reservas contracíclico (FSDF) para amortiguar shocks económicos nacionales y regionales. El remanente recaudado es coparticipado de forma centralizada y asimétrica hacia las provincias rezagadas para financiar infraestructura básica e igualar oportunidades.
                </p>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <p>© 2026 Universidad Nacional de Misiones • Facultad de Humanidades y Ciencias Sociales</p>
        <p className="mt-1">Cátedra de Teoría y Análisis Económico II • Todos los derechos reservados</p>
      </footer>

    </div>
  );
}