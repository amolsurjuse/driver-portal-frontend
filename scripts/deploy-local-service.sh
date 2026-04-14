#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COMPOSE_FILE="${ROOT_DIR}/docker-compose.local.yml"

if ! command -v docker >/dev/null 2>&1; then
  echo "docker is required"
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "docker compose plugin is required"
  exit 1
fi

if [[ ! -f "${COMPOSE_FILE}" ]]; then
  echo "compose file not found: ${COMPOSE_FILE}"
  exit 1
fi

SERVICES=(
  auth-service
  user-service
  payment-service
  subscription-service
  charger-management-service
  station-management-service
  session-service
  billing-service
  ocpi-service
  ocpp-service
  web-socket-connector
  api-gateway
)

usage() {
  cat <<EOF
Usage:
  $(basename "$0") up <service|all>
  $(basename "$0") down <service|all>
  $(basename "$0") restart <service|all>
  $(basename "$0") logs <service>
  $(basename "$0") ps

Examples:
  $(basename "$0") up auth-service
  $(basename "$0") up api-gateway
  $(basename "$0") up all
EOF
}

contains_service() {
  local needle="$1"
  for svc in "${SERVICES[@]}"; do
    if [[ "${svc}" == "${needle}" ]]; then
      return 0
    fi
  done
  return 1
}

infra_services() {
  echo "postgres redis"
}

dependent_services() {
  local service="$1"
  case "${service}" in
    api-gateway)
      echo "auth-service user-service payment-service subscription-service charger-management-service web-socket-connector"
      ;;
    auth-service)
      echo "user-service"
      ;;
    user-service)
      echo "payment-service"
      ;;
    session-service)
      echo "station-management-service"
      ;;
    billing-service)
      echo "station-management-service session-service"
      ;;
    ocpp-service)
      echo "station-management-service session-service"
      ;;
    ocpi-service)
      echo "station-management-service session-service billing-service"
      ;;
    *)
      echo ""
      ;;
  esac
}

action="${1:-}"
target="${2:-}"

if [[ -z "${action}" ]]; then
  usage
  exit 1
fi

if [[ "${action}" == "ps" ]]; then
  docker compose -f "${COMPOSE_FILE}" ps
  exit 0
fi

if [[ -z "${target}" ]]; then
  usage
  exit 1
fi

if [[ "${target}" != "all" ]] && ! contains_service "${target}"; then
  echo "unknown service: ${target}"
  echo "supported services: ${SERVICES[*]}"
  exit 1
fi

case "${action}" in
  up)
    if [[ "${target}" == "all" ]]; then
      docker compose -f "${COMPOSE_FILE}" up -d --build $(infra_services) "${SERVICES[@]}"
      exit 0
    fi

    deps="$(dependent_services "${target}")"
    if [[ -n "${deps}" ]]; then
      docker compose -f "${COMPOSE_FILE}" up -d --build $(infra_services) ${deps} "${target}"
    else
      docker compose -f "${COMPOSE_FILE}" up -d --build $(infra_services) "${target}"
    fi
    ;;
  down)
    if [[ "${target}" == "all" ]]; then
      docker compose -f "${COMPOSE_FILE}" down
    else
      docker compose -f "${COMPOSE_FILE}" stop "${target}"
    fi
    ;;
  restart)
    if [[ "${target}" == "all" ]]; then
      docker compose -f "${COMPOSE_FILE}" restart
    else
      docker compose -f "${COMPOSE_FILE}" restart "${target}"
    fi
    ;;
  logs)
    if [[ "${target}" == "all" ]]; then
      docker compose -f "${COMPOSE_FILE}" logs -f
    else
      docker compose -f "${COMPOSE_FILE}" logs -f "${target}"
    fi
    ;;
  *)
    usage
    exit 1
    ;;
esac
