#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
COMPOSE_FILE="${PROJECT_DIR}/docker-compose.yml"

python3 "${SCRIPT_DIR}/extract_endpoints.py"
python3 "${SCRIPT_DIR}/generate_jmx.py"
python3 "${SCRIPT_DIR}/validate_coverage.py"

if [[ -n "${MODULES:-}" ]]; then
  MODULE_LIST="${MODULES}"
else
  MODULE_LIST="$(PROJECT_DIR="${PROJECT_DIR}" python3 - <<'PY'
import json
import os
from pathlib import Path
manifest_path = Path(os.environ["PROJECT_DIR"]) / "endpoints" / "manifest.json"
manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
print(",".join(m["module"] for m in manifest["modules"]))
PY
)"
fi

IFS=',' read -r -a MODULES_ARRAY <<< "${MODULE_LIST}"
if [[ "${#MODULES_ARRAY[@]}" -eq 0 ]]; then
  echo "No modules selected to run."
  exit 1
fi

declare -a AUTH_TOKEN_ARG=()
if [[ -n "${AUTH_TOKEN:-}" ]]; then
  AUTH_TOKEN_ARG=(-JauthToken="${AUTH_TOKEN}")
fi

declare -a INTERNAL_API_KEY_ARG=()
if [[ -n "${INTERNAL_API_KEY:-}" ]]; then
  INTERNAL_API_KEY_ARG=(-JinternalApiKey="${INTERNAL_API_KEY}")
fi

mkdir -p "${PROJECT_DIR}/reports"

for module in "${MODULES_ARRAY[@]}"; do
  module="$(echo "${module}" | xargs)"
  [[ -z "${module}" ]] && continue

  JMX_FILE="${PROJECT_DIR}/jmx/${module}.jmx"
  JTL_FILE="${PROJECT_DIR}/reports/${module}.jtl"
  LOG_FILE="${PROJECT_DIR}/reports/${module}.log"

  if [[ ! -f "${JMX_FILE}" ]]; then
    echo "[skip] ${module}: missing ${JMX_FILE}"
    continue
  fi

  rm -f "${JTL_FILE}" "${LOG_FILE}"
  echo "[run] ${module}"

  JMETER_ARGS=(
    -n
    -Jjmeter.save.saveservice.output_format=csv
    -Jjmeter.save.saveservice.assertion_results=all
    -Jjmeter.save.saveservice.assertion_results_failure_message=true
    -Jjmeter.save.saveservice.successful=true
    -Jjmeter.save.saveservice.label=true
    -Jjmeter.save.saveservice.response_code=true
    -Jjmeter.save.saveservice.response_message=true
    -Jjmeter.save.saveservice.thread_name=true
    -Jjmeter.save.saveservice.time=true
    -Jjmeter.save.saveservice.bytes=true
    -Jjmeter.save.saveservice.sent_bytes=true
    -Jjmeter.save.saveservice.connect_time=true
    -Jjmeter.save.saveservice.url=true
    -t "/workspace/jmx/${module}.jmx"
    -l "/workspace/reports/${module}.jtl"
    -j "/workspace/reports/${module}.log"
  )
  if [[ "${#AUTH_TOKEN_ARG[@]}" -gt 0 ]]; then
    JMETER_ARGS+=("${AUTH_TOKEN_ARG[@]}")
  fi
  if [[ "${#INTERNAL_API_KEY_ARG[@]}" -gt 0 ]]; then
    JMETER_ARGS+=("${INTERNAL_API_KEY_ARG[@]}")
  fi

  docker compose -f "${COMPOSE_FILE}" run --rm jmeter "${JMETER_ARGS[@]}"

  STRICT_HTTP_MODE="${STRICT_HTTP:-false}"
  python3 - "${JTL_FILE}" "${module}" "${STRICT_HTTP_MODE}" <<'PY'
import csv
import sys

jtl_file = sys.argv[1]
module = sys.argv[2]
strict_http = str(sys.argv[3]).lower() == "true"

with open(jtl_file, encoding="utf-8", newline="") as f:
    reader = csv.DictReader(f)
    rows = list(reader)

if not rows:
    print(f"[FAIL] {module}: no samples recorded")
    sys.exit(1)

def is_allowed(row):
    code = str(row.get("responseCode", "")).strip()
    if not code.isdigit():
        return False
    value = int(code)
    if strict_http:
        return 200 <= value < 500
    return 100 <= value <= 599

failures = [r for r in rows if not is_allowed(r)]
if failures:
    print(f"[FAIL] {module}: {len(failures)}/{len(rows)} requests failed")
    first = failures[0]
    print(
        "[FAIL] first failure:"
        f" label={first.get('label')} code={first.get('responseCode')} message={first.get('responseMessage')}"
    )
    sys.exit(1)

print(f"[ok] {module}: {len(rows)} requests passed")
PY
done

echo "[done] Regression completed for modules: ${MODULE_LIST}"
