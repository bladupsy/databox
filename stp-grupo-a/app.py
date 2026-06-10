import streamlit as st
import json
import pandas as pd
import plotly.express as px
from pathlib import Path

# Configuración básica de la página
st.set_page_config(page_title="STP Grupo A", page_icon="📈", layout="wide")

# Ruta al archivo JSON generado por tu script build_stp_grupo_a.py
json_path = Path("data/stp-grupo-a-data.json")

if not json_path.exists():
    st.error(f"No se encontró el archivo de datos en: {json_path}. Por favor, corre primero `python build_stp_grupo_a.py --json`")
    st.stop()

# Cargar los datos
with open(json_path, "r", encoding="utf-8") as f:
    data = json.load(f)

# Diccionario para traducir y abreviar los meses a español
SPANISH_MONTHS = {
    "01": "Ene", "02": "Feb", "03": "Mar", "04": "Abr",
    "05": "May", "06": "Jun", "07": "Jul", "08": "Ago",
    "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dic"
}

def format_period(period_str):
    """Convierte un período YYYY-MM en formato español (ej: Ene 23)"""
    parts = period_str.split("-")
    if len(parts) == 2:
        year, month = parts
        yr_short = year[2:]
        month_name = SPANISH_MONTHS.get(month, month)
        return f"{month_name} {yr_short}"
    return period_str

FALLBACK_SOURCES = {
    "ipc": "Instituto Nacional de Estadística y Censos (INDEC)",
    "rf_primario": "Secretaría de Hacienda, Ministerio de Economía",
    "rf_global": "Secretaría de Hacienda, Ministerio de Economía",
    "bienes_personales": "Administración Federal de Ingresos Públicos (AFIP) / INDEC",
    "ingresos_tributarios_total": "Administración Federal de Ingresos Públicos (AFIP) / INDEC",
    "iva": "Administración Federal de Ingresos Públicos (AFIP) / INDEC",
    "ganancias": "Administración Federal de Ingresos Públicos (AFIP) / INDEC",
    "presion_tributaria": "AFIP / INDEC / Ministerio de Economía",
    "tc_nominal": "Banco Central de la República Argentina (BCRA) / INDEC",
    "tc_real": "Banco Central de la República Argentina (BCRA)",
    "badlar": "Banco Central de la República Argentina (BCRA)",
    "tib": "Banco Central de la República Argentina (BCRA)",
    "gini": "Instituto Nacional de Estadística y Censos (INDEC)",
    "ingreso_laboral": "Instituto Nacional de Estadística y Censos (INDEC)",
    "deuda_pib": "Secretaría de Finanzas, Ministerio de Economía"
}

def get_indicator_source(key, original_source=None):
    if original_source and original_source != "—":
        return original_source
    return FALLBACK_SOURCES.get(key, "INDEC / BCRA / Ministerio de Economía")

FALLBACK_URLS = {
    "ipc": "https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31",
    "rf_primario": "https://datos.gob.ar/dataset/sspm-resultado-base-caja-sector-publico-nacional-no-financiero",
    "rf_global": "https://datos.gob.ar/dataset/sspm-resultado-base-caja-sector-publico-nacional-no-financiero",
    "bienes_personales": "https://www.argentina.gob.ar/economia/ingresospublicos/recaudacion",
    "ingresos_tributarios_total": "https://www.argentina.gob.ar/economia/ingresospublicos/recaudacion",
    "iva": "https://www.argentina.gob.ar/economia/ingresospublicos/recaudacion",
    "ganancias": "https://www.argentina.gob.ar/economia/ingresospublicos/recaudacion",
    "presion_tributaria": "https://www.argentina.gob.ar/economia/ingresospublicos/recaudacion",
    "tc_nominal": "https://www.bcra.gob.ar/PublicacionesEstadisticas/Principales_variables.asp",
    "tc_real": "https://www.bcra.gob.ar/PublicacionesEstadisticas/Principales_variables.asp",
    "badlar": "https://www.bcra.gob.ar/PublicacionesEstadisticas/Principales_variables.asp",
    "tib": "https://www.bcra.gob.ar/PublicacionesEstadisticas/Principales_variables.asp",
    "gini": "https://www.indec.gob.ar/indec/web/Nivel4-Tema-4-31-60",
    "ingreso_laboral": "https://www.indec.gob.ar/indec/web/Nivel4-Tema-4-31-60",
    "deuda_pib": "https://www.argentina.gob.ar/economia/finanzas/deudapublica/informes-trimestrales-de-la-deuda"
}

def get_indicator_url(key, original_url=None):
    if original_url:
        return original_url
    return FALLBACK_URLS.get(key, "https://datos.gob.ar/")

def get_indicator_source_link(key, original_source=None, original_url=None):
    source = get_indicator_source(key, original_source)
    url = get_indicator_url(key, original_url)
    return f"[{source}]({url})"

# Barra lateral de navegación
st.sidebar.image("https://img.icons8.com/clouds/100/line-chart.png", width=80)
st.sidebar.title("STP Grupo A")
st.sidebar.markdown("Visualización de indicadores oficiales de la República Argentina (2023-2026).")
st.sidebar.divider()

view = st.sidebar.radio(
    "Seleccionar Vista",
    ["📈 Gráficos", "📋 Tabla de Datos"],
    index=0
)

st.sidebar.divider()
st.sidebar.info(
    f"**Período:** {data.get('periodo', '')}\n\n"
    f"**Generado:** {data.get('generated_at', '')[:10]}"
)

# Título Principal
st.title("📊 STP — Grupo A · Taller de Datos UT2-1")
st.markdown(f"**Período de análisis:** {data.get('periodo', '')}")
st.divider()

if view == "📈 Gráficos":
    # Mostrar cada indicador como una tarjeta
    for ind in data.get("indicators", []):
        st.subheader(ind.get("title", "Indicador"))
        st.write(ind.get("intro", ""))
        
        points = ind.get("points", [])
        meta = ind.get("meta", {})
        source = get_indicator_source_link(ind.get("key"), meta.get("source", "—"), meta.get("url"))
        
        if points:
            y_label = ind.get("y_label", "Valor")
            is_millions = "Millones" in y_label
            y_label_display = y_label.replace("Millones", "Miles de millones").replace("millones", "miles de millones") if is_millions else y_label

            # Convertir a DataFrame para facilitar Plotly
            df = pd.DataFrame(points, columns=["Período", y_label_display])
            if is_millions:
                df[y_label_display] = df[y_label_display] / 1000.0

            # Formatear el eje X con meses en español
            df["Período Formateado"] = df["Período"].apply(format_period)
            
            chart_type = ind.get("chart_type", "line")
            if chart_type == "bar":
                fig = px.bar(
                    df,
                    x="Período Formateado",
                    y=y_label_display,
                    labels={"Período Formateado": "Período"}
                )
            else:
                fig = px.line(
                    df,
                    x="Período Formateado",
                    y=y_label_display,
                    markers=True,
                    labels={"Período Formateado": "Período"}
                )
                
            fig.update_layout(
                margin=dict(l=60, r=10, t=20, b=40),
                xaxis=dict(type="category")  # Forzar tipo categórico para conservar el orden cronológico
            )
            
            st.plotly_chart(fig, use_container_width=True)
            
            # Mostrar la fuente con st.caption
            st.caption(f"**Fuente:** {source}")
            
            # Mostrar detalles y conclusión
            col1, col2 = st.columns([2, 1])
            with col1:
                st.info(f"**Conclusión:** {ind.get('conclusion', '')}")
            with col2:
                with st.expander("ℹ️ Detalles de la serie"):
                    st.markdown(f"**Descripción:** {meta.get('description', '—')}")
                    st.markdown(f"**Dataset:** {meta.get('dataset', '—')}")
                    st.markdown(f"**Unidades:** {meta.get('units', '—')}")
                    st.markdown(f"**ID Serie:** `{meta.get('id', '—')}`")
                    if meta.get("note"):
                        st.markdown(f"**Nota:** {meta.get('note')}")
        else:
            st.warning("No hay datos para este indicador.")
            
        st.divider()

else:  # view == "📋 Tabla de Datos"
    # Consolidar todos los indicadores en una única tabla
    dfs = []
    indicators = data.get("indicators", [])
    
    for ind in indicators:
        points = ind.get("points", [])
        if points:
            title = ind.get("title", ind.get("key"))
            y_label = ind.get("y_label", "Valor")
            is_millions = "Millones" in y_label
            y_col = f"{title} (miles de millones)" if is_millions else title
            
            df_ind = pd.DataFrame(points, columns=["Período", y_col])
            if is_millions:
                df_ind[y_col] = df_ind[y_col] / 1000.0
            dfs.append(df_ind)
            
    if dfs:
        # Unir todos los DataFrames en uno consolidado por período
        consolidated_df = dfs[0]
        for df_ind in dfs[1:]:
            consolidated_df = pd.merge(consolidated_df, df_ind, on="Período", how="outer")
            
        # Ordenar cronológicamente
        consolidated_df = consolidated_df.sort_values("Período")
        
        # Guardar una versión con formato para mostrar en pantalla
        display_df = consolidated_df.copy()
        display_df["Período"] = display_df["Período"].apply(format_period)
        
        st.subheader("📋 Tabla Consolidada de Indicadores")
        st.markdown(
            "Esta tabla consolida los valores de todas las variables macroeconómicas del grupo "
            "mes a mes. Puedes ordenar, buscar e interactuar con los datos directamente."
        )
        
        st.dataframe(display_df, use_container_width=True, hide_index=True)
        sources = sorted(list(set(get_indicator_source_link(ind.get("key"), ind.get("meta", {}).get("source", "—"), ind.get("meta", {}).get("url")) for ind in indicators)))
        st.caption(f"**Fuentes:** {' · '.join(sources)}")
        
        # Botón para descargar CSV
        csv = consolidated_df.to_csv(index=False, encoding="utf-8")
        st.download_button(
            label="📥 Descargar Datos Consolidados (CSV)",
            data=csv,
            file_name="stp-grupo-a-consolidado.csv",
            mime="text/csv"
        )
        
        st.divider()
        
        # Sección de detalle e info estadística de cada indicador individual
        st.subheader("🔍 Estadísticas y Detalle por Indicador")
        ind_names = [ind.get("title", ind.get("key")) for ind in indicators]
        selected_title = st.selectbox("Seleccione un indicador para ver su detalle:", ind_names)
        
        selected_ind = next(ind for ind in indicators if ind.get("title") == selected_title)
        ind_points = selected_ind.get("points", [])
        
        if ind_points:
            y_label = selected_ind.get("y_label", "Valor")
            is_millions = "Millones" in y_label
            y_label_display = y_label.replace("Millones", "Miles de millones").replace("millones", "miles de millones") if is_millions else y_label

            df_single = pd.DataFrame(ind_points, columns=["Período", y_label_display])
            if is_millions:
                df_single[y_label_display] = df_single[y_label_display] / 1000.0

            df_single = df_single.sort_values("Período")
            
            # Calcular estadísticas rápidas
            vals = df_single[y_label_display].dropna()
            
            if not vals.empty:
                col1, col2, col3, col4 = st.columns(4)
                # Formatear el último valor
                last_val = vals.iloc[-1]
                last_period = df_single["Período"].iloc[-1]
                col1.metric(f"Último Valor ({format_period(last_period)})", f"{last_val:,.2f}")
                col2.metric("Promedio del período", f"{vals.mean():,.2f}")
                col3.metric("Mínimo", f"{vals.min():,.2f}")
                col4.metric("Máximo", f"{vals.max():,.2f}")
            
            df_single_display = df_single.copy()
            df_single_display["Período"] = df_single_display["Período"].apply(format_period)
            
            # Mostrar tabla individual y fuente
            st.markdown(f"**Fuente de los datos:** {get_indicator_source_link(selected_ind.get('key'), selected_ind.get('meta', {}).get('source', '—'), selected_ind.get('meta', {}).get('url'))}")
            st.dataframe(df_single_display, use_container_width=True, hide_index=True)
        else:
            st.warning("No hay datos disponibles para este indicador.")
    else:
        st.warning("No se pudieron cargar datos para consolidar la tabla.")
