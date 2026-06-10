import os
import numpy as np
import pandas as pd
# pyrefly: ignore [missing-import]
import matplotlib.pyplot as plt
import seaborn as sns

# 1. Cargar la base de datos (Excel)
try:
    df = pd.read_excel('datos.xlsx')
except FileNotFoundError:
    print("Por favor, asegúrate de que el archivo 'datos.xlsx' esté en el mismo directorio.")
    exit()

# Limpiar caracteres temporales de los meses
df['Período_Limpio'] = df['Período'].str.replace('*', '', regex=False)

# Definir todos los indicadores oficiales
todos_sectores = [
    'Nivel general',
    'Productos alimenticios y bebidas',
    'Productos del tabaco',
    'Productos textiles',
    'Papel y cartón',
    'Edición e impresión',
    'Refinación del petróleo',
    'Sustancias y productos químicos',
    'Productos de caucho y plástico',
    'Productos minerales no metálicos',
    'Industrias metálicas básicas',
    'Industria automotriz',
    'Metalmecánica excluida industria automotriz'
]

# 2. Guardar la tabla completa de todos los valores históricos en Excel
output_excel_path = 'tabla_valores_interanuales.xlsx'

# Crear una solapa con los datos históricos limpios
df_historico_limpio = df[['Período_Limpio'] + todos_sectores].rename(columns={'Período_Limpio': 'Período'})

# Obtener los datos del último período disponible y el mismo mes del año anterior (Feb 2024 vs Feb 2023)
ultimo_periodo = df_historico_limpio['Período'].iloc[-1]
mes_actual, anio_actual = ultimo_periodo.split()
anio_anterior = str(int(anio_actual) - 1)
periodo_anterior = f"{mes_actual} {anio_anterior}"

fila_actual = df_historico_limpio[df_historico_limpio['Período'] == ultimo_periodo]
fila_anterior = df_historico_limpio[df_historico_limpio['Período'] == periodo_anterior]

# Crear resumen comparativo YoY
comparativa_yoy = []
for ind in todos_sectores:
    val_actual = fila_actual[ind].values[0] if not fila_actual.empty else 0.0
    val_anterior = fila_anterior[ind].values[0] if not fila_anterior.empty else 0.0
    comparativa_yoy.append({
        'Indicador': ind,
        f'Valor {periodo_anterior} (%)': val_anterior,
        f'Valor {ultimo_periodo} (%)': val_actual,
        'Diferencia (p.p.)': round(val_actual - val_anterior, 2)
    })
df_comparativa = pd.DataFrame(comparativa_yoy)

# 3. Extraer datos bienales (Febrero de 2016, 2018, 2020, 2022, 2024)
anios_bienales = ['2016', '2018', '2020', '2022', '2024']
periodos_bienales = [f"Feb {anio}" for anio in anios_bienales]

# Crear DataFrame comparativo bienal
comparativa_bienal = []
for ind in todos_sectores:
    datos_ind = {'Indicador': ind}
    for p in periodos_bienales:
        fila_p = df_historico_limpio[df_historico_limpio['Período'] == p]
        datos_ind[p] = fila_p[ind].values[0] if not fila_p.empty else 0.0
    comparativa_bienal.append(datos_ind)
df_comparativa_bienal = pd.DataFrame(comparativa_bienal)

# Guardar en Excel con solapas limpias y ordenadas
with pd.ExcelWriter(output_excel_path) as writer:
    df_historico_limpio.to_excel(writer, sheet_name='Valores Historicos', index=False)
    df_comparativa.to_excel(writer, sheet_name='Comparativa YoY Reciente', index=False)
    df_comparativa_bienal.to_excel(writer, sheet_name='Comparativa Bienal (Feb)', index=False)

print(f"✅ Tabla de valores históricos, comparativa YoY y bienal guardada con éxito en '{output_excel_path}'")

# 4. Dividir sectores según el criterio de productos vs el resto (excluyendo Nivel general de los gráficos)
sectores_productos = [s for s in todos_sectores if 'productos' in s.lower() and s != 'Nivel general']
sectores_resto = [s for s in todos_sectores if 'productos' not in s.lower() and s != 'Nivel general']

# --- FUNCIÓN 1: GRÁFICO COMPARATIVO YOY (2 PERÍODOS) ---
def generar_grafico_barras_interanual(sectores_grupo, titulo, nombre_archivo, p_actual, p_anterior):
    fila_act = df_historico_limpio[df_historico_limpio['Período'] == p_actual]
    fila_ant = df_historico_limpio[df_historico_limpio['Período'] == p_anterior]
    
    if fila_act.empty or fila_ant.empty:
        print(f"⚠️ No se encontraron datos para los períodos especificados.")
        return
        
    datos_plot = []
    for s in sectores_grupo:
        val_act = fila_act[s].values[0]
        val_ant = fila_ant[s].values[0]
        datos_plot.append({
            'Indicador': s,
            'Valor_Actual': val_act,
            'Valor_Anterior': val_ant
        })
        
    df_plot = pd.DataFrame(datos_plot)
    df_plot = df_plot.sort_values(by='Valor_Actual', ascending=True)
    
    sns.set_theme(style="whitegrid")
    plt.rcParams['font.family'] = 'sans-serif'
    plt.rcParams['figure.dpi'] = 150
    
    fig, ax = plt.subplots(figsize=(14, 8.5))
    y = np.arange(len(df_plot))
    height = 0.35
    
    color_ant = '#a8dadc'
    color_act = '#1d3557'
    
    rects_ant = ax.barh(y - height/2, df_plot['Valor_Anterior'], height, label=p_anterior, color=color_ant, edgecolor='none')
    rects_act = ax.barh(y + height/2, df_plot['Valor_Actual'], height, label=p_actual, color=color_act, edgecolor='none')
    
    for rect in rects_ant:
        width = rect.get_width()
        ax.text(width + 0.6, rect.get_y() + rect.get_height()/2, f"{width:.1f}%", 
                va='center', ha='left', fontsize=9, color='#7f8c8d')
                
    for rect in rects_act:
        width = rect.get_width()
        is_nivel_general = df_plot.iloc[int(rect.get_y() + 0.5)]['Indicador'] == 'Nivel general'
        fontweight = 'bold' if is_nivel_general else 'normal'
        ax.text(width + 0.6, rect.get_y() + rect.get_height()/2, f"{width:.1f}%", 
                va='center', ha='left', fontsize=9.5, color='#1d3557', fontweight=fontweight)
        
    ax.set_title(f"{titulo}\nComparativa Interanual: {p_actual} vs {p_anterior}", 
                 fontsize=14, fontweight='bold', pad=20, color='#1d3557')
    ax.set_xlabel('Utilización de la Capacidad Instalada (%)', fontsize=11, labelpad=10)
    
    ax.set_yticks(y)
    ax.set_yticklabels(df_plot['Indicador'])
    
    yticks = ax.get_yticklabels()
    for tick in yticks:
        if tick.get_text() == 'Nivel general':
            tick.set_fontweight('bold')
            tick.set_color('#1d3557')
            
    ax.set_xlim(0, 110)
    ax.xaxis.set_major_formatter(plt.FuncFormatter(lambda x, _: f'{x:.0f}%'))
    ax.legend(loc='lower right', frameon=True, facecolor='white', edgecolor='none', fontsize=10)
    
    # Agregar la fuente INDEC en el extremo inferior derecho
    fig.text(0.99, 0.01, 'Fuente: INDEC', ha='right', va='bottom', fontsize=8.5, color='#718096', style='italic')
    
    plt.tight_layout()
    # Guardar con fondo transparente
    plt.savefig(nombre_archivo, dpi=300, bbox_inches='tight', transparent=True)
    plt.close()
    print(f"✅ Gráfico comparativo '{nombre_archivo}' generado correctamente.")


# --- FUNCIÓN 2: GRÁFICO HISTÓRICO BIENAL DESDE 2016 (5 PERÍODOS) ---
def generar_grafico_bienal(sectores_grupo, titulo, nombre_archivo, periodos):
    # Filtrar datos de la comparativa bienal para este grupo
    df_grupo = df_comparativa_bienal[df_comparativa_bienal['Indicador'].isin(sectores_grupo)].copy()
    # Ordenar por el valor del período más reciente (Feb 2024) para que sea un ranking limpio
    df_grupo = df_grupo.sort_values(by=periodos[-1], ascending=True)
    
    sns.set_theme(style="whitegrid")
    plt.rcParams['font.family'] = 'sans-serif'
    plt.rcParams['figure.dpi'] = 150
    
    # Hacemos la figura un poco más alta para que los grupos de 5 barras por sector respiren perfectamente
    fig, ax = plt.subplots(figsize=(15, 11))
    
    y = np.arange(len(df_grupo))
    height = 0.14  # Altura de cada barra individual (5 barras * 0.14 = 0.70 de ocupación del espacio y)
    
    # Paleta de degradé azul profesional (de más claro a más oscuro/reciente)
    paleta_degrade = ['#d1e5f0', '#92c5de', '#4393c3', '#2166ac', '#053061']
    
    # Graficar las 5 series de barras para cada año
    rects_list = []
    for idx, p in enumerate(periodos):
        offset = (idx - 2) * height  # Centrar las 5 barras alrededor de la coordenada y
        rects = ax.barh(y + offset, df_grupo[p], height, label=p, color=paleta_degrade[idx], edgecolor='none')
        rects_list.append(rects)
        
    # Añadir las etiquetas numéricas a cada una de las barras
    for i, rects in enumerate(rects_list):
        for rect in rects:
            width = rect.get_width()
            # El año más reciente (última barra, 2024) se destaca con fuente azul oscuro, el resto en gris oscuro
            is_recent = (i == len(rects_list) - 1)
            fontweight = 'bold' if is_recent else 'normal'
            color_text = '#053061' if is_recent else '#555555'
            ax.text(width + 0.5, rect.get_y() + rect.get_height()/2, f"{width:.1f}%", 
                    va='center', ha='left', fontsize=7.5, color=color_text, fontweight=fontweight)

    # Formatear ejes y títulos
    ax.set_title(f"{titulo}\nComparativa Histórica Bienal en Febrero (2016-2024)", 
                 fontsize=15, fontweight='bold', pad=25, color='#1d3557')
    ax.set_xlabel('Utilización de la Capacidad Instalada (%)', fontsize=11, labelpad=10)
    
    # Configurar etiquetas del eje Y
    ax.set_yticks(y)
    ax.set_yticklabels(df_grupo['Indicador'])
    
    # Destacar "Nivel general" en el eje Y (negrita y color oscuro)
    yticks = ax.get_yticklabels()
    for tick in yticks:
        if tick.get_text() == 'Nivel general':
            tick.set_fontweight('bold')
            tick.set_color('#053061')
            
    # Límites del eje X
    ax.set_xlim(0, 110)
    ax.xaxis.set_major_formatter(plt.FuncFormatter(lambda x, _: f'{x:.0f}%'))
    
    # Leyenda premium abajo a la derecha
    ax.legend(loc='lower right', frameon=True, facecolor='white', edgecolor='none', fontsize=10.5, title="Año / Período")
    
    # Agregar la fuente INDEC en el extremo inferior derecho
    fig.text(0.99, 0.01, 'Fuente: INDEC', ha='right', va='bottom', fontsize=8.5, color='#718096', style='italic')
    
    plt.tight_layout()
    # Guardar con fondo transparente
    plt.savefig(nombre_archivo, dpi=300, bbox_inches='tight', transparent=True)
    plt.close()
    print(f"✅ Gráfico bienal '{nombre_archivo}' generado correctamente.")


# --- EJECUCIÓN ---

# 1. Generar los gráficos comparativos YoY (nivel de utilización real)
generar_grafico_barras_interanual(
    sectores_productos,
    'Utilización de la Capacidad Instalada por Rama Industrial (%)\nSector: Productos y Sustancias Químicas',
    'grafico_yoy_valores_productos.png',
    ultimo_periodo,
    periodo_anterior
)

generar_grafico_barras_interanual(
    sectores_resto,
    'Utilización de la Capacidad Instalada por Rama Industrial (%)\nSector: Base, Infraestructura e Industrias Pesadas',
    'grafico_yoy_valores_resto.png',
    ultimo_periodo,
    periodo_anterior
)

# 2. Generar los gráficos históricos bienales (2016 - 2018 - 2020 - 2022 - 2024)
generar_grafico_bienal(
    sectores_productos,
    'Evolución Histórica Bienal de la Utilización de Capacidad Instalada (%)\nSector: Productos y Sustancias Químicas',
    'grafico_bienal_valores_productos.png',
    periodos_bienales
)

generar_grafico_bienal(
    sectores_resto,
    'Evolución Histórica Bienal de la Utilización de Capacidad Instalada (%)\nSector: Base, Siderurgia e Industrias Pesadas',
    'grafico_bienal_valores_resto.png',
    periodos_bienales
)
