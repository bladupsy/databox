import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import Circle, Rectangle

# Configurar resolución y fuentes predeterminadas
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['figure.dpi'] = 300

def dibujar_bandera_circular(ax, cx, cy, r, pais):
    """
    Dibuja de manera geométrica y vectorial una bandera circular de Dinamarca,
    Noruega o Finlandia con la cruz nórdica alineada de forma precisa.
    """
    # Crear círculo de recorte (clipping)
    clip_circle = Circle((cx, cy), r, facecolor='none', edgecolor='none')
    ax.add_patch(clip_circle)
    
    if pais == 'Dinamarca':
        # Fondo Rojo Dinamarca (#C8102E)
        bg = Rectangle((cx - r, cy - r), 2*r, 2*r, facecolor='#C8102E', zorder=5)
        bg.set_clip_path(clip_circle)
        ax.add_patch(bg)
        
        # Cruz blanca (Nordic cross)
        ancho_cruz = 0.3 * r
        h_stripe = Rectangle((cx - r, cy - ancho_cruz/2), 2*r, ancho_cruz, facecolor='#FFFFFF', zorder=6)
        v_stripe = Rectangle((cx - 0.4*r, cy - r), ancho_cruz, 2*r, facecolor='#FFFFFF', zorder=6)
        h_stripe.set_clip_path(clip_circle)
        v_stripe.set_clip_path(clip_circle)
        ax.add_patch(h_stripe)
        ax.add_patch(v_stripe)
        
    elif pais == 'Noruega':
        # Fondo Rojo Noruega (#EF2B2D)
        bg = Rectangle((cx - r, cy - r), 2*r, 2*r, facecolor='#EF2B2D', zorder=5)
        bg.set_clip_path(clip_circle)
        ax.add_patch(bg)
        
        # Cruz blanca (externa, más ancha)
        cruz_w_outer = 0.4 * r
        h_stripe_w = Rectangle((cx - r, cy - cruz_w_outer/2), 2*r, cruz_w_outer, facecolor='#FFFFFF', zorder=6)
        v_stripe_w = Rectangle((cx - 0.45*r, cy - r), cruz_w_outer, 2*r, facecolor='#FFFFFF', zorder=6)
        h_stripe_w.set_clip_path(clip_circle)
        v_stripe_w.set_clip_path(clip_circle)
        ax.add_patch(h_stripe_w)
        ax.add_patch(v_stripe_w)
        
        # Cruz azul (interna, más fina)
        cruz_w_inner = 0.2 * r
        h_stripe_b = Rectangle((cx - r, cy - cruz_w_inner/2), 2*r, cruz_w_inner, facecolor='#002868', zorder=7)
        v_stripe_b = Rectangle((cx - 0.35*r, cy - r), cruz_w_inner, 2*r, facecolor='#002868', zorder=7)
        h_stripe_b.set_clip_path(clip_circle)
        v_stripe_b.set_clip_path(clip_circle)
        ax.add_patch(h_stripe_b)
        ax.add_patch(v_stripe_b)
        
    elif pais == 'Finlandia':
        # Fondo Blanco Finlandia (#FFFFFF)
        bg = Rectangle((cx - r, cy - r), 2*r, 2*r, facecolor='#FFFFFF', zorder=5)
        bg.set_clip_path(clip_circle)
        ax.add_patch(bg)
        
        # Cruz azul (#003580)
        ancho_cruz = 0.35 * r
        h_stripe = Rectangle((cx - r, cy - ancho_cruz/2), 2*r, ancho_cruz, facecolor='#003580', zorder=6)
        v_stripe = Rectangle((cx - 0.4*r, cy - r), ancho_cruz, 2*r, facecolor='#003580', zorder=6)
        h_stripe.set_clip_path(clip_circle)
        v_stripe.set_clip_path(clip_circle)
        ax.add_patch(h_stripe)
        ax.add_patch(v_stripe)
        
    # Anillo exterior / Borde fino del círculo
    borde = Circle((cx, cy), r, facecolor='none', edgecolor='#CCCCCC', linewidth=1.5, zorder=10)
    ax.add_patch(borde)

def dibujar_bandera_rectangular(ax, x, y, w, h, pais):
    """
    Dibuja de manera geométrica una bandera rectangular de Dinamarca,
    Noruega o Finlandia en las coordenadas especificadas.
    """
    clip_rect = Rectangle((x, y), w, h, facecolor='none', edgecolor='none')
    ax.add_patch(clip_rect)
    
    if pais == 'Dinamarca':
        bg = Rectangle((x, y), w, h, facecolor='#C8102E', zorder=5)
        bg.set_clip_path(clip_rect)
        ax.add_patch(bg)
        
        cruz_w = h * 0.22
        h_stripe = Rectangle((x, y + (h - cruz_w)/2), w, cruz_w, facecolor='#FFFFFF', zorder=6)
        v_stripe = Rectangle((x + w * 0.28, y), cruz_w, h, facecolor='#FFFFFF', zorder=6)
        h_stripe.set_clip_path(clip_rect)
        v_stripe.set_clip_path(clip_rect)
        ax.add_patch(h_stripe)
        ax.add_patch(v_stripe)
        
    elif pais == 'Noruega':
        bg = Rectangle((x, y), w, h, facecolor='#EF2B2D', zorder=5)
        bg.set_clip_path(clip_rect)
        ax.add_patch(bg)
        
        cruz_w_w = h * 0.32
        h_stripe_w = Rectangle((x, y + (h - cruz_w_w)/2), w, cruz_w_w, facecolor='#FFFFFF', zorder=6)
        v_stripe_w = Rectangle((x + w * 0.25, y), cruz_w_w, h, facecolor='#FFFFFF', zorder=6)
        h_stripe_w.set_clip_path(clip_rect)
        v_stripe_w.set_clip_path(clip_rect)
        ax.add_patch(h_stripe_w)
        ax.add_patch(v_stripe_w)
        
        cruz_w_b = h * 0.16
        h_stripe_b = Rectangle((x, y + (h - cruz_w_b)/2), w, cruz_w_b, facecolor='#002868', zorder=7)
        v_stripe_b = Rectangle((x + w * 0.33, y), cruz_w_b, h, facecolor='#002868', zorder=7)
        h_stripe_b.set_clip_path(clip_rect)
        v_stripe_b.set_clip_path(clip_rect)
        ax.add_patch(h_stripe_b)
        ax.add_patch(v_stripe_b)
        
    elif pais == 'Finlandia':
        bg = Rectangle((x, y), w, h, facecolor='#FFFFFF', zorder=5)
        bg.set_clip_path(clip_rect)
        ax.add_patch(bg)
        
        cruz_w = h * 0.3
        h_stripe = Rectangle((x, y + (h - cruz_w)/2), w, cruz_w, facecolor='#003580', zorder=6)
        v_stripe = Rectangle((x + w * 0.28, y), cruz_w, h, facecolor='#003580', zorder=6)
        h_stripe.set_clip_path(clip_rect)
        v_stripe.set_clip_path(clip_rect)
        ax.add_patch(h_stripe)
        ax.add_patch(v_stripe)
        
    # Borde exterior negro fino
    borde = Rectangle((x, y), w, h, facecolor='none', edgecolor='#4A5568', linewidth=1.5, zorder=10)
    ax.add_patch(borde)

def generar_grafico_barras_campeonatos(output_path):
    """
    Genera un gráfico de barras idéntico al estilo de 'CAMPEONATOS POR AÑO' provisto
    por el usuario, con banderas circulares debajo de cada barra.
    """
    fig, ax = plt.subplots(figsize=(7, 9.5), facecolor='#F7F9FC')
    ax.set_facecolor('#F7F9FC')
    
    paises = ['DINAMARCA', 'NORUEGA', 'FINLANDIA']
    titulos = [1, 1, 5]
    
    # Coordenadas X
    x_pos = np.array([0, 1, 2])
    
    # Paleta del gráfico de referencia: barras oscuras y una barra de campeón coral/naranja destacada
    colores_barras = ['#0F2137', '#0F2137', '#E25C38']
    
    # Dibujar barras (con esquinas cuadradas limpias y buen ancho como la imagen de referencia)
    width = 0.5
    bars = ax.bar(x_pos, titulos, color=colores_barras, width=width, edgecolor='none', zorder=3)
    
    # Añadir el número grande y blanco dentro del tope de cada barra (como la referencia)
    for bar, val in zip(bars, titulos):
        height = bar.get_height()
        ax.text(
            bar.get_x() + bar.get_width()/2.0, 
            height - 0.35 if height > 1 else height - 0.25, 
            str(val), 
            ha='center', 
            va='center', 
            color='white', 
            fontsize=16, 
            fontweight='bold',
            zorder=6
        )
        
    # Configurar límites del eje Y y ticks horizontales
    ax.set_ylim(0, 6)
    ax.set_yticks(range(0, 7))
    ax.set_yticklabels(range(0, 7), fontsize=12, color='#2D3748', fontweight='bold')
    
    # Líneas de cuadrícula horizontal muy finas (como el gráfico de fútbol)
    ax.grid(axis='y', linestyle='-', color='#E2E8F0', linewidth=1.2, zorder=1)
    
    # Remover bordes arriba, izquierda y derecha
    for spine in ['top', 'left', 'right']:
        ax.spines[spine].set_visible(False)
    ax.spines['bottom'].set_color('#1A202C')
    ax.spines['bottom'].set_linewidth(1.5)
    
    # Dibujar las banderas circulares abajo del eje X
    flag_y_coord = -0.5  # Posicionamiento debajo del eje X
    flag_radius = 0.16
    
    # Mapeo a nombre de bandera geométrica
    mapeo_paises = {
        'DINAMARCA': 'Dinamarca',
        'NORUEGA': 'Noruega',
        'FINLANDIA': 'Finlandia'
    }
    
    for i, pais in enumerate(paises):
        dibujar_bandera_circular(ax, x_pos[i], flag_y_coord, flag_radius, mapeo_paises[pais])
        # Nombre del país abajo de la bandera circular
        ax.text(x_pos[i], flag_y_coord - 0.32, pais, ha='center', va='top', 
                fontsize=10.5, fontweight='bold', color='#1A202C')
        
    # Formatear límites del eje X
    ax.set_xlim(-0.6, 2.6)
    ax.set_xticks([])  # Ocultar ticks por defecto del eje X
    
    # Títulos principales idénticos al estilo de la imagen
    ax.text(1.0, 6.7, 'CAMPEONATOS\nPOR AÑO', ha='center', va='center', 
            fontsize=24, fontweight='bold', color='#000000', fontname='sans-serif')
    
    plt.tight_layout()
    plt.savefig(output_path, dpi=300, bbox_inches='tight', facecolor='#F7F9FC')
    plt.close()
    print(f"✅ Gráfico de barras de campeonatos generado en: {output_path}")

def generar_infografia_campeones(output_path):
    """
    Genera una infografía vertical idéntica al estilo de 'CAMPEONES DE TODOS LOS MUNDIALES'
    provisto por el usuario, con un fondo texturado dorado/cálido y contenedores de datos.
    """
    # Crear figura vertical
    fig, ax = plt.subplots(figsize=(6.5, 11), facecolor='#9E7E55')  # Tono café/dorado de base
    ax.set_facecolor('#9E7E55')
    
    # Dibujar un degradado/textura de fondo usando un patrón decorativo geométrico clásico de fútbol
    # Para emular la marca de agua del fondo, crearemos unos polígonos sutiles
    for i in range(15):
        rect = Rectangle(
            (np.random.rand()*8 - 1, np.random.rand()*12 - 1), 
            np.random.rand()*3, np.random.rand()*3, 
            angle=np.random.rand()*360,
            facecolor='#8A6B43', alpha=0.15, zorder=1
        )
        ax.add_patch(rect)
        
    # Datos ordenados de ganadores
    campeones = [
        {'pais': 'Finlandia', 'cantidad': 5, 'anos': '2018  2019  2020  2021  2022', 'texto_cant': '5 TÍTULOS'},
        {'pais': 'Dinamarca', 'cantidad': 1, 'anos': '2016', 'texto_cant': '1 TÍTULO'},
        {'pais': 'Noruega', 'cantidad': 1, 'anos': '2017', 'texto_cant': '1 TÍTULO'}
    ]
    
    # Dibujar Títulos en la parte superior (Estilo deportivo/editorial en blanco)
    ax.text(3.25, 10.3, 'CAMPEONES\nDEL INFORME MUNDIAL\nDE LA FELICIDAD', 
            ha='center', va='center', fontsize=20, fontweight='bold', color='#FFFFFF', 
            zorder=5, fontname='sans-serif', linespacing=1.1)
    
    # Logo del rayo o corona arriba a la derecha (estilo la marca R en la imagen)
    # Dibujaremos un rayo minimalista con un polígono blanco
    rayo_x = [5.6, 5.8, 5.65, 5.85, 5.5, 5.7, 5.6]
    rayo_y = [10.4, 10.4, 10.1, 10.1, 9.8, 10.1, 10.1]
    ax.fill(rayo_x, rayo_y, color='#FFFFFF', zorder=5, alpha=0.9)
    
    # Dibujar las filas de los campeones
    y_start = 8.0
    y_gap = 2.4
    
    for i, camp in enumerate(campeones):
        cy = y_start - i * y_gap
        
        # 1. Dibujar la bandera en el lado izquierdo (rectangular)
        flag_w = 1.6
        flag_h = 1.15
        dibujar_bandera_rectangular(ax, 0.7, cy - flag_h/2.0, flag_w, flag_h, camp['pais'])
        
        # 2. Dibujar el contenedor de texto beige del lado derecho (como la referencia)
        cont_x = 2.4
        cont_w = 3.4
        cont_h = 1.15
        
        # Rectángulo contenedor color beige arena (#D2C7B7)
        container = Rectangle(
            (cont_x, cy - cont_h/2.0), cont_w, cont_h, 
            facecolor='#D9D1C5', edgecolor='#4A3B2C', linewidth=1.5, zorder=4
        )
        ax.add_patch(container)
        
        # 3. Textos internos del contenedor
        # Texto de cantidad (ej: 5 TÍTULOS o 1 TÍTULO)
        ax.text(
            cont_x + 0.2, cy + 0.25, camp['texto_cant'], 
            fontsize=15, fontweight='black', color='#1A1A1A', zorder=6
        )
        # Años detallados abajo
        ax.text(
            cont_x + 0.2, cy - 0.28, camp['anos'], 
            fontsize=10.5, fontweight='bold', color='#4A5568', zorder=6
        )
        
        # Nombre del país rotulado encima de la bandera o del bloque de manera sutil (opcional para claridad)
        # Lo pondremos a la derecha de la bandera, bien alineado
        ax.text(
            cont_x + 0.2, cy + 0.0, camp['pais'].upper(), 
            fontsize=9.5, fontweight='bold', color='#718096', zorder=6
        )

    # Configuración final de límites y ejes
    ax.set_xlim(0, 6.5)
    ax.set_ylim(1.5, 11)
    ax.axis('off')  # Ocultar todos los ejes
    
    plt.savefig(output_path, dpi=300, bbox_inches='tight', facecolor='#9E7E55')
    plt.close()
    print(f"✅ Infografía vertical de campeones generada en: {output_path}")

if __name__ == '__main__':
    import os
    os.makedirs('python', exist_ok=True)
    
    barras_path = 'python/grafico_campeonatos_barras.png'
    infografia_path = 'python/grafico_infografia_campeones.png'
    
    print("🚀 Generando gráficos estilo campeonato mundial...")
    generar_grafico_barras_campeonatos(barras_path)
    generar_infografia_campeones(infografia_path)
    print("🎉 ¡Nuevas infografías exportadas con éxito!")
