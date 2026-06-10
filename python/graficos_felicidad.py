import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Configuración estética general y soporte de fuentes
sns.set_theme(style="white")
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['figure.dpi'] = 300  # Resolución ultra alta para reportes

def generar_carita_feliz_matematica(output_path):
    """
    Genera un gráfico de carita feliz utilizando ecuaciones matemáticas y
    técnicas de sombreado avanzadas (scatter de alta densidad y efecto de brillo 3D).
    """
    fig, ax = plt.subplots(figsize=(8, 8), facecolor='#0D0E15')
    ax.set_facecolor('#0D0E15')
    
    # 1. Crear el contorno y relleno de la cara con una nube de puntos densa (25,000 puntos)
    n_points = 25000
    r_max = 1.0
    
    # Generar puntos uniformes en un círculo utilizando coordenadas polares para densidad perfecta
    r = r_max * np.sqrt(np.random.rand(n_points))
    theta = 2 * np.pi * np.random.rand(n_points)
    
    x = r * np.cos(theta)
    y = r * np.sin(theta)
    
    # Añadir un sombreado 3D (gradiente radial) respecto a una fuente de luz imaginaria en la esquina superior derecha (-0.3, 0.4)
    light_x, light_y = -0.3, 0.4
    dist_to_light = np.sqrt((x - light_x)**2 + (y - light_y)**2)
    # Valores de felicidad/brillo invertidos para crear efecto de esfera iluminada
    intensity = 1.2 - (dist_to_light / 2.0)
    
    # Graficar la base dorada de la felicidad
    sc = ax.scatter(x, y, c=intensity, cmap='plasma', s=1.5, alpha=0.85, edgecolors='none')
    
    # 2. Dibujar los Ojos (Elipses oscuras y profundas con brillo blanco coqueto)
    # Ojo Izquierdo
    ojo_izq_x, ojo_izq_y = -0.35, 0.3
    # Ojo Derecho
    ojo_der_x, ojo_der_y = 0.35, 0.3
    
    # Dibujar la parte oscura del ojo
    ojo_base_izq = plt.Circle((ojo_izq_x, ojo_izq_y), 0.12, color='#1A1A24', zorder=5)
    ojo_base_der = plt.Circle((ojo_der_x, ojo_der_y), 0.12, color='#1A1A24', zorder=5)
    ax.add_patch(ojo_base_izq)
    ax.add_patch(ojo_base_der)
    
    # Brillo del ojo (reflejo de luz para darle vida)
    brillo_izq = plt.Circle((ojo_izq_x - 0.03, ojo_izq_y + 0.03), 0.035, color='white', zorder=6)
    brillo_der = plt.Circle((ojo_der_x - 0.03, ojo_der_y + 0.03), 0.035, color='white', zorder=6)
    ax.add_patch(brillo_izq)
    ax.add_patch(brillo_der)
    
    # 3. Dibujar la Sonrisa (Curva matemática cuadrática perfecta)
    # y = a*x^2 + c
    x_boca = np.linspace(-0.55, 0.55, 200)
    y_boca = 0.65 * (x_boca**2) - 0.48
    
    # Trazar la línea de la sonrisa con un grosor premium y puntas redondeadas
    ax.plot(x_boca, y_boca, color='#1A1A24', linewidth=8, solid_capstyle='round', zorder=5)
    
    # 4. Mejillas sonrosadas (Chapa/Rosy Cheeks para un look adorable)
    mejilla_izq = plt.Circle((-0.6, 0.0), 0.15, color='#FF5A5F', alpha=0.35, zorder=4)
    mejilla_der = plt.Circle((0.6, 0.0), 0.15, color='#FF5A5F', alpha=0.35, zorder=4)
    ax.add_patch(mejilla_izq)
    ax.add_patch(mejilla_der)
    
    # 5. Formatear y añadir títulos con tipografía limpia y sofisticada
    ax.set_xlim(-1.2, 1.2)
    ax.set_ylim(-1.2, 1.2)
    ax.axis('off')  # Remover ejes para enfatizar el arte de datos
    
    # Título principal y subtítulos de anotación matemática
    plt.title("LA ECUACIÓN DE LA FELICIDAD\nUn Enfoque Matemático de Datos", 
              fontsize=16, fontweight='bold', color='#FFFFFF', pad=20, loc='center')
    
    # Añadir cuadro de fórmula matemática de la felicidad en la esquina inferior
    formula_text = (
        "Modelo Matemático:\n"
        "- Cara:  x^2 + y^2 <= 1\n"
        "- Sonrisa:  y = 0.65*x^2 - 0.48  (x en [-0.55, 0.55])\n"
        "- Ojos:  (x +/- 0.35)^2 + (y - 0.3)^2 <= 0.12^2"
    )
    ax.text(-1.1, -1.1, formula_text, color='#A0AEC0', fontsize=9, 
            bbox=dict(facecolor='#1A1B26', edgecolor='#2D3748', boxstyle='round,pad=0.8', alpha=0.85))
    
    # Añadir firma del especialista
    ax.text(1.1, -1.1, "Data Analyst Specialist\nVisualization Lab 2026", color='#718096', 
            fontsize=8, ha='right', style='italic')
    
    # Guardar en alta definición ajustando los márgenes
    plt.savefig(output_path, dpi=300, bbox_inches='tight', facecolor='#0D0E15')
    plt.close()
    print(f"✅ Gráfico de carita feliz matemática generado en: {output_path}")

def generar_bump_chart_ranking(output_path):
    """
    Genera un Bump Chart de nivel editorial para mostrar el ranking del top 9 de países
    más felices del mundo entre los años 2016 y 2022.
    """
    # Datos oficiales provistos
    years = [2016, 2017, 2018, 2019, 2020, 2021, 2022]
    
    # Trayectorias del ranking (1 a 9). None representa que el país salió del Top 9 ese año.
    ranks = {
        'Finlandia':     [5, 5, 1, 1, 1, 1, 1],
        'Dinamarca':     [1, 2, 3, 2, 2, 2, 2],
        'Islandia':      [3, 3, 4, 4, 4, 4, 3],
        'Suiza':         [2, 4, 5, 6, 3, 3, 4],
        'Países Bajos':  [7, 6, 6, 5, 6, 5, 5],
        'Noruega':       [4, 1, 2, 3, 5, 6, 8],
        'Suecia':        [None, None, 9, 7, 7, 7, 7],
        'Luxemburgo':    [None, None, None, None, None, 8, 6],
        'Canadá':        [6, 7, 7, 9, None, None, None],
        'Nueva Zelanda': [8, 8, 8, 8, 8, 9, None],
        'Australia':     [9, 9, None, None, None, None, None],
        'Austria':       [None, None, None, None, 9, None, None],
        'Israel':        [None, None, None, None, None, None, 9]
    }
    
    # Paleta de colores curada y de alta gama (diseño editorial)
    country_colors = {
        'Finlandia':     '#2B6CB0',  # Azul Nórdico profundo
        'Dinamarca':     '#E53E3E',  # Rojo Dinamarqués vibrante
        'Islandia':      '#319795',  # Turquesa Gélido
        'Suiza':         '#DD6B20',  # Naranja Suizo elegante
        'Países Bajos':  '#ED8936',  # Naranja Neerlandés característico
        'Noruega':       '#805AD5',  # Púrpura Imperial
        'Suecia':        '#D69E2E',  # Oro Sueco
        'Luxemburgo':    '#38B2AC',  # Aguamarina claro
        'Canadá':        '#E53E3E',  # Crimson
        'Nueva Zelanda': '#2F855A',  # Verde Bosque
        'Australia':     '#2B6CB0',  # Azul cobalto
        'Austria':       '#D53F8C',  # Magenta
        'Israel':        '#4A5568'   # Gris pizarra corporativo
    }

    # Crear figura amplia y elegante
    fig, ax = plt.subplots(figsize=(13, 8), facecolor='#F7F9FC')
    ax.set_facecolor('#F7F9FC')
    
    # Graficar las líneas de ranking para cada país
    for country, path in ranks.items():
        color = country_colors[country]
        
        # Filtrar valores no nulos para dibujar segmentos continuos correctamente
        valid_years = [y for i, y in enumerate(years) if path[i] is not None]
        valid_ranks = [r for r in path if r is not None]
        
        # Efecto de brillo/sombra posterior (glow line) para dar profundidad
        ax.plot(valid_years, valid_ranks, color=color, alpha=0.15, linewidth=7.5, zorder=3)
        # Línea principal estilizada
        ax.plot(valid_years, valid_ranks, color=color, linewidth=3.5, alpha=0.9, zorder=4)
        
        # Marcadores interactivos: círculos rellenos con el número del ranking en blanco
        for i, yr in enumerate(years):
            val = path[i]
            if val is not None:
                # Círculo externo contrastante
                ax.plot(yr, val, marker='o', markersize=13, color=color, zorder=5)
                # Texto interno del número de ranking
                ax.text(yr, val, str(int(val)), color='white', ha='center', va='center',
                        fontsize=8, fontweight='bold', zorder=6)
                
    # Etiquetas de Países Directas (Start / End labels) para evitar leyendas confusas
    for country, path in ranks.items():
        color = country_colors[country]
        valid_indices = [i for i, v in enumerate(path) if v is not None]
        
        if not valid_indices:
            continue
            
        first_idx = valid_indices[0]
        last_idx = valid_indices[-1]
        
        first_year = years[first_idx]
        first_rank = path[first_idx]
        last_year = years[last_idx]
        last_rank = path[last_idx]
        
        path_len = len(valid_indices)
        
        # Etiqueta al Inicio de la trayectoria
        if first_year == 2016:
            ax.text(2015.75, first_rank, country, color=color, ha='right', va='center', fontweight='bold', fontsize=9.5)
        else:
            # Trazo que inicia a mitad del gráfico
            ax.text(first_year - 0.18, first_rank, f"← {country}", color=color, ha='right', va='center', fontweight='bold', fontsize=8.5)
            
        # Etiqueta al Final de la trayectoria
        if last_year == 2022:
            # Añadir una mención al país campeón indiscutido (Finlandia)
            label_text = f"{country} (Invicto)" if country == 'Finlandia' else country
            ax.text(2022.25, last_rank, label_text, color=color, ha='left', va='center', fontweight='bold', fontsize=9.5)
        elif path_len > 1:
            # Trazo que termina a mitad del gráfico
            ax.text(last_year + 0.18, last_rank, f"{country} →", color=color, ha='left', va='center', fontweight='bold', fontsize=8.5)

    # Configuración de Ejes y Formato Editorial
    ax.set_ylim(9.5, 0.5)  # Invertir el eje Y para que el Rango 1 quede arriba del todo
    ax.set_xlim(2014.0, 2024.0)  # Márgenes amplios para acomodar las etiquetas de texto
    
    # Configurar el eje X con los años provistos
    ax.set_xticks(years)
    ax.set_xticklabels(years, fontsize=11, fontweight='bold', color='#2D3748')
    
    # Configurar el eje Y para que muestre claramente los puestos del 1 al 9
    ax.set_yticks(range(1, 10))
    ax.set_yticklabels([f"{y}° Puesto" for y in range(1, 10)], fontsize=10, color='#718096')
    
    # Líneas de cuadrícula horizontal muy sutiles para seguir los carriles
    ax.grid(axis='y', linestyle='--', color='#E2E8F0', linewidth=1.0, alpha=0.7, zorder=1)
    
    # Eliminar bordes innecesarios (Spines) para dar aire y diseño minimalista
    for spine in ['top', 'right', 'left', 'bottom']:
        ax.spines[spine].set_visible(False)
        
    # Añadir títulos y anotaciones de valor analítico
    plt.title("REPORTE MUNDIAL DE LA FELICIDAD: EVOLUCIÓN DEL TOP 9\nEstudio del Histórico de Ránking (2016 - 2022)", 
              fontsize=15, fontweight='bold', color='#1A202C', pad=25, loc='center')
    
    # Pie de gráfico con anotación
    info_text = (
        "* Nota: Finlandia mantiene su hegemonía invicta en el 1° Puesto desde 2018.\n"
        "  Los puestos muestran los top de cada año según el informe de felicidad oficial."
    )
    ax.text(2014.2, 9.8, info_text, color='#718096', fontsize=8.5, style='italic', ha='left')
    
    # Firma de especialista
    ax.text(2023.8, 9.8, "Data Analyst Specialist\nMacro & Social Insights Lab", color='#A0AEC0', 
            fontsize=8, ha='right', style='italic')

    # Guardar imagen optimizada
    plt.savefig(output_path, dpi=300, bbox_inches='tight', facecolor='#F7F9FC')
    plt.close()
    print(f"✅ Bump chart de ranking de felicidad generado en: {output_path}")

if __name__ == '__main__':
    import os
    
    # Asegurar que el script se ejecute en el directorio correcto o cree las rutas relativas
    os.makedirs('python', exist_ok=True)
    
    # Rutas finales de salida
    carita_path = 'python/grafico_carita_feliz.png'
    ranking_path = 'python/grafico_ranking_felicidad.png'
    
    # Ejecución
    print("🚀 Iniciando generación de visualizaciones de nivel especialista...")
    generar_carita_feliz_matematica(carita_path)
    generar_bump_chart_ranking(ranking_path)
    print("🎉 ¡Proceso finalizado con éxito!")
