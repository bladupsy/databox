import pandas as pd
# pyrefly: ignore [missing-import]
import matplotlib.pyplot as plt
import seaborn as sns

# 1. Cargar la base de datos limpia generada (desde archivo Excel)
try:
    df = pd.read_excel('datos.xlsx')
except FileNotFoundError:
    print("Por favor, asegurate de descargar y guardar el archivo 'datos.xlsx' en el mismo directorio.")
    exit()

# Limpiar caracteres temporales de los meses para el gráfico
df['Período_Limpio'] = df['Período'].str.replace('*', '', regex=False)

# Configurar entorno estético profesional (Estilo Paper Macroeconómico)
sns.set_theme(style="whitegrid")
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['figure.dpi'] = 150

# Todos los sectores oficiales
todos_sectores = [
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

# Dividir en dos grupos dinámicamente según tengan la palabra "productos"
sectores_productos = [s for s in todos_sectores if 'productos' in s.lower()]
sectores_resto = [s for s in todos_sectores if 'productos' not in s.lower()]

def generar_grafico(columnas_sector, titulo, nombre_archivo):
    # Crear figura y eje
    fig, ax1 = plt.subplots(figsize=(14, 7.5))
    
    # Paleta de colores para los sectores específicos
    colores = sns.color_palette("tab10", len(columnas_sector))
    
    # Graficar sectores de soporte
    for i, sector in enumerate(columnas_sector):
        if sector in df.columns:
            ax1.plot(df['Período_Limpio'], df[sector], 
                     color=colores[i], linewidth=1.5, alpha=0.7, label=sector)
            
    # Graficar Nivel General (como referencia de promedio industrial, gruesa al frente)
    color_linea = '#1d3557'
    ax1.plot(df['Período_Limpio'], df['Nivel general'], 
             color=color_linea, linewidth=3.5, marker='o', markersize=5, 
             label='Nivel General Industrial (Promedio)', zorder=10)
    
    # Formateo y títulos
    ax1.set_title(titulo, fontsize=15, fontweight='bold', pad=20, color='#1d3557')
    ax1.set_xlabel('Línea de Tiempo Mensual', fontsize=11, labelpad=10)
    ax1.set_ylabel('Porcentaje de Uso de Planta (%)', fontsize=11, labelpad=10)
    
    # Eje X e Y
    ticks_visibles = range(0, len(df), 6)
    ax1.set_xticks(ticks_visibles)
    ax1.set_xticklabels([df['Período_Limpio'].iloc[i] for i in ticks_visibles], rotation=45, ha='right', fontsize=9)
    
    ax1.set_ylim(0, 105)
    ax1.yaxis.set_major_formatter(plt.FuncFormatter(lambda y, _: '{:.0f}%'.format(y)))
    
    # Anotación Pandemia (Abril 2020)
    idx_pandemia = df[df['Período'].str.contains('Abril.*2020', regex=True)].index
    if not idx_pandemia.empty:
        ax1.annotate('Mínimo COVID-19\n(42%)', 
                     xy=(idx_pandemia[0], df['Nivel general'].iloc[idx_pandemia[0]]), 
                     xytext=(idx_pandemia[0] - 10, 15),
                     arrowprops=dict(facecolor='#1d3557', shrink=0.05, width=1, headwidth=6, zorder=15),
                     fontsize=9, color='#e63946', fontweight='bold', bbox=dict(boxstyle='round,pad=0.3', fc='white', alpha=0.8), zorder=12)
        
    # Leyenda externa a la derecha
    ax1.legend(bbox_to_anchor=(1.02, 1), loc='upper left', frameon=True, facecolor='white', edgecolor='none', fontsize=10)
    
    # Agregar la fuente INDEC en el extremo inferior derecho
    fig.text(0.99, 0.01, 'Fuente: INDEC', ha='right', va='bottom', fontsize=8.5, color='#718096', style='italic')
    
    # Guardar en alta definición con ajuste de bordes y fondo transparente
    plt.savefig(nombre_archivo, dpi=300, bbox_inches='tight', transparent=True)
    plt.close()
    print(f"✅ Gráfico '{nombre_archivo}' exportado correctamente.")

# Generar Gráfico 1: Sectores con la palabra "Productos"
generar_grafico(
    sectores_productos, 
    'Evolución Industrial por Sectores: Productos y Sustancias (2016-2024)', 
    'grafico_capacidad_productos.png'
)

# Generar Gráfico 2: Resto de los sectores
generar_grafico(
    sectores_resto, 
    'Evolución Industrial por Sectores: Bloques de Base e Industrias Pesadas (2016-2024)', 
    'grafico_capacidad_resto.png'
)