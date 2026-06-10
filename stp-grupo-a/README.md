# STP Grupo A — Taller de Datos UT2-1

Indicadores económicos oficiales de Argentina (INDEC, BCRA, Ministerio de Economía), 2023–2026, en formato Jupyter Notebook.

## Inicio rápido (2 comandos)

Requisitos: **Python 3.10+** instalado.

```bash
cd stp-grupo-a
./setup.sh    # una sola vez: crea .venv e instala todo
./run.sh      # abre el notebook en el navegador
```

En Jupyter, seleccioná el kernel **「STP Grupo A (Python 3)」** y ejecutá las celdas en orden.

Los datos ya vienen precargados en `data/stp-grupo-a-data.json` — no hace falta internet para la primera ejecución.

## Contenido del repositorio

| Archivo / carpeta | Descripción |
|-------------------|-------------|
| `stp-grupo-a.ipynb` | Notebook principal (Etapas 1–4, gráficos Plotly) |
| `data/stp-grupo-a-data.json` | Series mensuales ya descargadas |
| `data/deuda/` | Excels oficiales MECON (deuda/PIB) |
| `build_stp_grupo_a.py` | Script para actualizar datos desde fuentes oficiales |
| `build_stp_notebook.py` | Regenera el notebook |
| `setup.sh` / `run.sh` | Instalación y arranque |

## Indicadores incluidos

- IPC mensual (INDEC)
- Resultado fiscal primario y global (MECON / IMIG)
- Impuesto a Bienes Personales — recaudación (MECON)
- Ingresos tributarios totales, IVA, Ganancias (AFIP)
- Presión tributaria (calculada)
- Tipo de cambio nominal y real multilateral (BCRA)
- BADLAR y TIB (BCRA)
- Coeficiente de Gini (INDEC)
- Participación del ingreso laboral (INDEC)
- Deuda pública / PIB (MECON)

## Actualizar datos

Con conexión a internet:

```bash
source .venv/bin/activate
python build_stp_grupo_a.py --json --notebook
```

Fuentes: [apis.datos.gob.ar/series](https://apis.datos.gob.ar/series/api/) y [Informes trimestrales de deuda](https://www.argentina.gob.ar/economia/finanzas/deudapublica/informes-trimestrales-de-la-deuda) (MECON).

## Windows

En PowerShell, desde la carpeta del proyecto:

```powershell
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
python -m ipykernel install --user --name=stp-grupo-a --display-name="STP Grupo A (Python 3)"
jupyter notebook stp-grupo-a.ipynb
```

## Solución de problemas

**`jupyter: command not found`** — Activá el entorno: `source .venv/bin/activate` (macOS/Linux) o `.\.venv\Scripts\activate` (Windows).

**Kernel no encontrado** — Volvé a correr: `python -m ipykernel install --user --name=stp-grupo-a --display-name="STP Grupo A (Python 3)"`

**Falta el JSON** — `python build_stp_grupo_a.py --json`

## Créditos

Taller TAE2 — UT2-1. Datos: INDEC, BCRA, Ministerio de Economía de la República Argentina.