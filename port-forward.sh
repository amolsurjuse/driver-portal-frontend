#!/usr/bin/env bash
set -euo pipefail

# Local port defaults (can be overridden via env vars):
# - postgres -> 127.0.0.1:${POSTGRES_LOCAL_PORT:-58318} -> dev/postgresql:5432
# - ingress  -> 127.0.0.1:${INGRESS_HTTP_LOCAL_PORT:-8080},${INGRESS_HTTPS_LOCAL_PORT:-8443} -> ingress-nginx/ingress-nginx-controller:80,443
# - argocd   -> 127.0.0.1:${ARGOCD_HTTP_LOCAL_PORT:-8090},${ARGOCD_HTTPS_LOCAL_PORT:-9443} -> argocd/argocd-server:80,443
CLOSE_IN_USE=false

KUBECTL=(kubectl)
if [[ -n "${KUBE_CONTEXT:-}" ]]; then
  KUBECTL+=(--context "${KUBE_CONTEXT}")
fi
if [[ -n "${KUBECONFIG_PATH:-}" ]]; then
  KUBECTL+=(--kubeconfig "${KUBECONFIG_PATH}")
fi

PIDS=()
STARTED_POSTGRES=false
STARTED_INGRESS=false
STARTED_ARGOCD=false
STARTED_INGRESS_HTTP=false
STARTED_INGRESS_HTTPS=false
STARTED_ARGOCD_HTTP=false
STARTED_ARGOCD_HTTPS=false

POSTGRES_LOCAL_PORT="${POSTGRES_LOCAL_PORT:-58318}"
INGRESS_HTTP_LOCAL_PORT="${INGRESS_HTTP_LOCAL_PORT:-8080}"
INGRESS_HTTPS_LOCAL_PORT="${INGRESS_HTTPS_LOCAL_PORT:-8443}"
ARGOCD_HTTP_LOCAL_PORT="${ARGOCD_HTTP_LOCAL_PORT:-8090}"
ARGOCD_HTTPS_LOCAL_PORT="${ARGOCD_HTTPS_LOCAL_PORT:-9443}"

usage() {
  cat <<'EOF'
Usage:
  ./port-forward.sh [--close-in-use] [all|postgres|argocd|ingress]...

Examples:
  ./port-forward.sh all
  ./port-forward.sh --close-in-use all
  ./port-forward.sh postgres
  ./port-forward.sh postgres argocd ingress

Optional env vars:
  KUBE_CONTEXT=<context-name>
  KUBECONFIG_PATH=/path/to/kubeconfig
  POSTGRES_LOCAL_PORT=58318
  INGRESS_HTTP_LOCAL_PORT=8080
  INGRESS_HTTPS_LOCAL_PORT=8443
  ARGOCD_HTTP_LOCAL_PORT=8090
  ARGOCD_HTTPS_LOCAL_PORT=9443

Flags:
  --close-in-use   Close local LISTEN processes if a configured port is already in use.
                   Safety: only auto-closes processes with command name "kubectl".
                   If a different process owns the port, that service is skipped.
EOF
}

ensure_port_available() {
  local port="$1"
  local pids_raw
  pids_raw="$(lsof -tiTCP:"${port}" -sTCP:LISTEN 2>/dev/null || true)"

  if [[ -z "${pids_raw}" ]]; then
    return 0
  fi

  local pids
  pids="$(echo "${pids_raw}" | tr '\n' ' ' | xargs 2>/dev/null || true)"

  if [[ "${CLOSE_IN_USE}" != true ]]; then
    echo "Port ${port} is already in use (PID(s): ${pids}). Skipping this service. Use --close-in-use to close it."
    return 1
  fi

  local non_kubectl=()
  local pid
  for pid in ${pids}; do
    local cmd
    cmd="$(ps -p "${pid}" -o comm= 2>/dev/null | xargs || true)"
    if [[ "${cmd}" != "kubectl" ]]; then
      non_kubectl+=("${pid}:${cmd:-unknown}")
    fi
  done

  if [[ ${#non_kubectl[@]} -gt 0 ]]; then
    echo "Port ${port} is in use by non-kubectl process(es): ${non_kubectl[*]}"
    echo "Skipping this service for safety. Use different local port env vars (see --help)."
    return 1
  fi

  echo "Port ${port} is in use (PID(s): ${pids}). Closing..."
  kill ${pids} 2>/dev/null || true
  sleep 1

  local remaining
  remaining="$(lsof -tiTCP:"${port}" -sTCP:LISTEN 2>/dev/null | tr '\n' ' ' | xargs 2>/dev/null || true)"
  if [[ -n "${remaining}" ]]; then
    echo "Force killing PID(s) on port ${port}: ${remaining}"
    kill -9 ${remaining} 2>/dev/null || true
    sleep 1
  fi

  remaining="$(lsof -tiTCP:"${port}" -sTCP:LISTEN 2>/dev/null | tr '\n' ' ' | xargs 2>/dev/null || true)"
  if [[ -n "${remaining}" ]]; then
    echo "Unable to free port ${port}. Skipping this service."
    return 1
  fi

  return 0
}

start_forward() {
  local name="$1"
  local namespace="$2"
  local service="$3"
  shift 3
  local ports=("$@")
  local selected_ports=()

  for mapping in "${ports[@]}"; do
    local local_port="${mapping%%:*}"
    if ! ensure_port_available "${local_port}"; then
      echo "Skipping ${name} mapping ${mapping}."
      continue
    fi
    selected_ports+=("${mapping}")
  done

  if [[ ${#selected_ports[@]} -eq 0 ]]; then
    echo "No usable local ports for ${name}; skipping."
    return 0
  fi

  echo "Starting ${name}: ${namespace}/svc/${service} (${selected_ports[*]})"
  "${KUBECTL[@]}" -n "${namespace}" port-forward "svc/${service}" "${selected_ports[@]}" --address 127.0.0.1 \
    > >(sed -e "s/^/[${name}] /") 2>&1 &
  PIDS+=("$!")

  case "${name}" in
    postgres) STARTED_POSTGRES=true ;;
    ingress)
      STARTED_INGRESS=true
      local m
      for m in "${selected_ports[@]}"; do
        case "${m}" in
          "${INGRESS_HTTP_LOCAL_PORT}:80") STARTED_INGRESS_HTTP=true ;;
          "${INGRESS_HTTPS_LOCAL_PORT}:443") STARTED_INGRESS_HTTPS=true ;;
        esac
      done
      ;;
    argocd)
      STARTED_ARGOCD=true
      local m
      for m in "${selected_ports[@]}"; do
        case "${m}" in
          "${ARGOCD_HTTP_LOCAL_PORT}:80") STARTED_ARGOCD_HTTP=true ;;
          "${ARGOCD_HTTPS_LOCAL_PORT}:443") STARTED_ARGOCD_HTTPS=true ;;
        esac
      done
      ;;
  esac
}

cleanup() {
  echo
  echo "Stopping port-forwards..."
  for pid in "${PIDS[@]:-}"; do
    if kill -0 "${pid}" 2>/dev/null; then
      kill "${pid}" 2>/dev/null || true
    fi
  done
}

TARGETS=()
if [[ $# -eq 0 ]]; then
  TARGETS=(all)
else
  for arg in "$@"; do
    case "${arg}" in
      --close-in-use)
        CLOSE_IN_USE=true
        ;;
      -h|--help|help)
        usage
        exit 0
        ;;
      *)
        TARGETS+=("${arg}")
        ;;
    esac
  done
  if [[ ${#TARGETS[@]} -eq 0 ]]; then
    TARGETS=(all)
  fi
fi

trap cleanup EXIT INT TERM

for target in "${TARGETS[@]}"; do
  case "${target}" in
    all)
      start_forward "postgres" "dev" "postgresql" "${POSTGRES_LOCAL_PORT}:5432"
      start_forward "ingress" "ingress-nginx" "ingress-nginx-controller" "${INGRESS_HTTP_LOCAL_PORT}:80" "${INGRESS_HTTPS_LOCAL_PORT}:443"
      start_forward "argocd" "argocd" "argocd-server" "${ARGOCD_HTTP_LOCAL_PORT}:80" "${ARGOCD_HTTPS_LOCAL_PORT}:443"
      ;;
    postgres)
      start_forward "postgres" "dev" "postgresql" "${POSTGRES_LOCAL_PORT}:5432"
      ;;
    argocd)
      start_forward "argocd" "argocd" "argocd-server" "${ARGOCD_HTTP_LOCAL_PORT}:80" "${ARGOCD_HTTPS_LOCAL_PORT}:443"
      ;;
    ingress)
      start_forward "ingress" "ingress-nginx" "ingress-nginx-controller" "${INGRESS_HTTP_LOCAL_PORT}:80" "${INGRESS_HTTPS_LOCAL_PORT}:443"
      ;;
    *)
      echo "Unknown target: ${target}" >&2
      usage
      exit 1
      ;;
  esac
done

if [[ ${#PIDS[@]} -eq 0 ]]; then
  echo
  echo "No port-forwards were started (all requested targets were skipped)."
  exit 0
fi

echo
echo "Endpoints:"
if [[ "${STARTED_POSTGRES}" == true ]]; then
  echo "  Postgres     : 127.0.0.1:${POSTGRES_LOCAL_PORT}"
fi
if [[ "${STARTED_INGRESS}" == true ]]; then
  if [[ "${STARTED_INGRESS_HTTP}" == true ]]; then
    echo "  Ingress HTTP : http://127.0.0.1:${INGRESS_HTTP_LOCAL_PORT}"
  fi
  if [[ "${STARTED_INGRESS_HTTPS}" == true ]]; then
    echo "  Ingress HTTPS: https://127.0.0.1:${INGRESS_HTTPS_LOCAL_PORT}"
  fi
fi
if [[ "${STARTED_ARGOCD}" == true ]]; then
  if [[ "${STARTED_ARGOCD_HTTP}" == true ]]; then
    echo "  Argo CD HTTP : http://127.0.0.1:${ARGOCD_HTTP_LOCAL_PORT}"
  fi
  if [[ "${STARTED_ARGOCD_HTTPS}" == true ]]; then
    echo "  Argo CD HTTPS: https://127.0.0.1:${ARGOCD_HTTPS_LOCAL_PORT}"
  fi
  if [[ "${STARTED_INGRESS_HTTPS}" == true && "${STARTED_ARGOCD_HTTPS}" == true ]]; then
    echo "  Note: ${INGRESS_HTTPS_LOCAL_PORT} is ingress-nginx. Use ${ARGOCD_HTTPS_LOCAL_PORT} for Argo CD UI."
  fi
fi
echo
echo "Port-forwards are running. Press Ctrl+C to stop."
while true; do
  for pid in "${PIDS[@]}"; do
    if ! kill -0 "${pid}" 2>/dev/null; then
      echo "A port-forward process exited unexpectedly."
      exit 1
    fi
  done
  sleep 1
done
