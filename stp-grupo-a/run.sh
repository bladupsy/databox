#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

if [[ ! -d .venv ]]; then
  echo "Primero ejecutá: ./setup.sh"
  exit 1
fi

# shellcheck disable=SC1091
source .venv/bin/activate

if [[ ! -f data/stp-grupo-a-data.json ]]; then
  echo "Generando datos..."
  python build_stp_grupo_a.py --json
fi

echo "Abriendo stp-grupo-a.ipynb ..."
exec jupyter notebook stp-grupo-a.ipynb