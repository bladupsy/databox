#!/usr/bin/env python3
"""Generate Jupyter notebook for STP Grupo A."""

import json
from pathlib import Path

import nbformat as nbf

ROOT = Path(__file__).parent
OUT = ROOT / "stp-grupo-a.ipynb"
DATA_PATH = ROOT / "data" / "stp-grupo-a-data.json"


def md(text):
    return nbf.v4.new_markdown_cell(text)


def code(text):
    return nbf.v4.new_code_cell(text)


def build_notebook(meta: dict) -> nbf.NotebookNode:
    nb = nbf.v4.new_notebook()
    nb.metadata["kernelspec"] = {
        "display_name": "Python 3",
        "language": "python",
        "name": "python3",
    }
    nb.metadata["language_info"] = {"name": "python", "pygments_lexer": "ipython3"}

    nb.cells = [
        md(
            """# STP — Grupo A · Taller de Datos UT2-1

Notebook interactivo con indicadores oficiales (INDEC, BCRA, Ministerio de Economía), 2023–2026.

**Cómo usar**
1. Ejecutá primero la celda de setup (carga datos desde `data/stp-grupo-a-data.json`).
2. Si no existe el JSON, corré antes: `./setup.sh` y `python build_stp_grupo_a.py --json --notebook`
3. Ejecutá las celdas de cada etapa para ver gráficos Plotly y tablas."""
        ),
        code(
            """# Setup
import json
from pathlib import Path

import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from IPython.display import Markdown, display

DATA_PATH = Path("data/stp-grupo-a-data.json")
if not DATA_PATH.exists():
    raise FileNotFoundError(
        "No se encontró data/stp-grupo-a-data.json. Ejecutá: python build_stp_grupo_a.py --json"
    )

payload = json.loads(DATA_PATH.read_text(encoding="utf-8"))
indicators = payload["indicators"]
print(f"Cargados {len(indicators)} indicadores — generado: {payload['generated_at']}")


def to_df(ind):
    return pd.DataFrame(ind["points"], columns=["periodo", "valor"])


def show_indicator(ind, chart="line"):
    display(Markdown(f"### {ind['title']}"))
    display(Markdown(ind.get("intro", "")))
    df = to_df(ind)
    if chart == "bar":
        fig = px.bar(df, x="periodo", y="valor", title=ind["title"], labels={"valor": ind["y_label"]})
    else:
        fig = px.line(df, x="periodo", y="valor", title=ind["title"], labels={"valor": ind["y_label"]})
    fig.update_layout(template="plotly_dark", height=380, margin=dict(l=40, r=20, t=50, b=40))
    fig.show()
    meta = ind["meta"]
    display(Markdown(
        f"**Fuente:** {meta.get('source', '—')}  \\n"
        f"**Dataset:** {meta.get('dataset', '—')}  \\n"
        f"**Unidades:** {meta.get('units', '—')}  \\n"
        f"**Serie:** `{meta.get('id', '—')}`  \\n"
        f"**Conclusión:** {ind.get('conclusion', '')}"
    ))
    display(df.style.format({"valor": "{:,.4f}"}).hide(axis="index"))
"""
        ),
        md("## Etapa 1 — Indicadores Grupo A"),
        code(
            """etapa1 = [i for i in indicators if 1 in i["etapas"]]
for ind in etapa1:
    show_indicator(ind, chart=ind.get("chart_type", "line"))"""
        ),
        md("## Etapa 2 — Variables Grupo A"),
        code(
            """etapa2 = [i for i in indicators if 2 in i["etapas"]]
for ind in etapa2:
    show_indicator(ind, chart=ind.get("chart_type", "line"))"""
        ),
        md("## Etapa 3 — Informe por variable"),
        code(
            """etapa3 = [i for i in indicators if 3 in i["etapas"]]
for ind in etapa3:
    show_indicator(ind, chart=ind.get("chart_type", "line"))"""
        ),
        md("## Etapa 4 — Consolidado"),
        code(
            """rows = []
for ind in indicators:
    last = ind.get("stats", {}).get("last")
    rows.append({
        "indicador": ind["title"],
        "fuente": ind["meta"].get("source"),
        "ultimo_periodo": last[0] if last else None,
        "ultimo_valor": last[1] if last else None,
        "etapas": ", ".join(str(e) for e in ind["etapas"]),
    })
consolidado = pd.DataFrame(rows)
consolidado"""
        ),
        md("## Explorar un indicador puntual"),
        code(
            """# Cambiá la clave: ipc, rf_primario, deuda_pib, tc_nominal, etc.
KEY = "ipc"
ind = next(i for i in indicators if i["key"] == KEY)
show_indicator(ind, chart=ind.get("chart_type", "line"))"""
        ),
    ]
    return nb


def write_notebook(data: dict):
    nb = build_notebook(data)
    nbf.write(nb, OUT)
    print(f"Written {OUT}")


if __name__ == "__main__":
    from build_stp_grupo_a import build_dataset

    data = build_dataset()
    json_path = DATA_PATH
    json_path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    write_notebook(data)