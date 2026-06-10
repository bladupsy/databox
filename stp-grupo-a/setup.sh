#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

PY="${PY:-python3}"
VENV=".venv"

echo "==> STP Grupo A — setup"
echo "    Python: $($PY --version 2>&1)"

if [[ ! -d "$VENV" ]]; then
  echo "==> Creando entorno virtual en .venv"
  "$PY" -m venv "$VENV"
fi

# shellcheck disable=SC1091
source "$VENV/bin/activate"

echo "==> Instalando dependencias"
pip install --upgrade pip -q
pip install -r requirements.txt -q

echo "==> Registrando kernel de Jupyter"
python -m ipykernel install --user --name=stp-grupo-a --display-name="STP Grupo A (Python 3)"

if [[ ! -f data/stp-grupo-a-data.json ]]; then
  echo "==> Generando datos (primera vez)"
  python build_stp_grupo_a.py --json
fi

echo ""
echo "Listo. Para abrir el notebook:"
echo "  ./run.sh"
echo ""
echo "Kernel en Jupyter: STP Grupo A (Python 3)"