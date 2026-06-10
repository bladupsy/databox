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
        source = meta.get("source", "—")
        
        if points:
            # Convertir a DataFrame para facilitar Plotly
            df = pd.DataFrame(points, columns=["Período", ind.get("y_label", "Valor")])
            
            # Formatear el eje X con meses en español
            df["Período Formateado"] = df["Período"].apply(format_period)
            
            chart_type = ind.get("chart_type", "line")
            if chart_type == "bar":
                fig = px.bar(
                    df,
                    x="Período Formateado",
                    y=ind.get("y_label", "Valor"),
                    labels={"Período Formateado": "Período"}
                )
            else:
                fig = px.line(
                    df,
                    x="Período Formateado",
                    y=ind.get("y_label", "Valor"),
                    markers=True,
                    labels={"Período Formateado": "Período"}
                )
                
            fig.update_layout(
                margin=dict(l=0, r=0, t=10, b=0),
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
            y_col = ind.get("title", ind.get("key"))
            df_ind = pd.DataFrame(points, columns=["Período", y_col])
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
        sources = sorted(list(set(ind.get("meta", {}).get("source", "—") for ind in indicators)))
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
            df_single = pd.DataFrame(ind_points, columns=["Período", y_label])
            df_single = df_single.sort_values("Período")
            
            # Calcular estadísticas rápidas
            vals = df_single[y_label].dropna()
            
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
            st.markdown(f"**Fuente de los datos:** {selected_ind.get('meta', {}).get('source', '—')}")
            st.dataframe(df_single_display, use_container_width=True, hide_index=True)
        else:
            st.warning("No hay datos disponibles para este indicador.")
    else:
        st.warning("No se pudieron cargar datos para consolidar la tabla.")
