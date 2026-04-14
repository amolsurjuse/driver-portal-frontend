#!/usr/bin/env bash
set -euo pipefail

TEAMCITY_URL="${TEAMCITY_URL:-http://localhost:8111}"

usage() {
  cat <<'EOF'
Usage:
  teamcity_local.sh server
  teamcity_local.sh build-type <build-type-id>
  teamcity_local.sh queue
  teamcity_local.sh agents
  teamcity_local.sh compatible <build-type-id>
  teamcity_local.sh latest <build-type-id> [count]
  teamcity_local.sh build <build-id>
  teamcity_local.sh trigger <build-type-id> [branch]
EOF
}

discover_token() {
  if [[ -n "${TEAMCITY_TOKEN:-}" ]]; then
    printf '%s' "${TEAMCITY_TOKEN}"
    return 0
  fi

  local token=""
  local log_file="${HOME}/teamcity_data/server/logs/teamcity-server.log"
  if [[ -f "${log_file}" ]]; then
    token="$(
      grep 'Super user authentication token' "${log_file}" 2>/dev/null \
        | tail -n 1 \
        | sed -n 's/.*Super user authentication token: \([0-9][0-9]*\).*/\1/p'
    )"
  fi

  if [[ -z "${token}" ]] && command -v docker >/dev/null 2>&1; then
    token="$(
      docker logs teamcity-server --tail 200 2>/dev/null \
        | sed -n 's/.*Super user authentication token: \([0-9][0-9]*\).*/\1/p' \
        | tail -n 1
    )"
  fi

  if [[ -z "${token}" ]]; then
    echo "TEAMCITY_TOKEN is not set and no local super-user token was found." >&2
    exit 1
  fi

  printf '%s' "${token}"
}

api() {
  local method="$1"
  local path="$2"
  local data="${3:-}"
  local token
  token="$(discover_token)"

  if [[ -n "${data}" ]]; then
    curl -sS -u ":${token}" -X "${method}" \
      -H "Accept: application/json" \
      -H "Content-Type: application/json" \
      "${TEAMCITY_URL}${path}" \
      -d "${data}"
  else
    curl -sS -u ":${token}" -X "${method}" \
      -H "Accept: application/json" \
      "${TEAMCITY_URL}${path}"
  fi
}

pretty() {
  if command -v jq >/dev/null 2>&1; then
    jq .
  else
    cat
  fi
}

main() {
  local command="${1:-}"

  case "${command}" in
    server)
      api GET "/app/rest/server" | pretty
      ;;
    build-type)
      local build_type_id="${2:-}"
      [[ -n "${build_type_id}" ]] || { usage; exit 1; }
      api GET "/app/rest/buildTypes/id:${build_type_id}" | pretty
      ;;
    queue)
      api GET "/app/rest/buildQueue" | pretty
      ;;
    agents)
      api GET "/app/rest/agents?locator=authorized:true,connected:true,enabled:true" | pretty
      ;;
    compatible)
      local build_type_id="${2:-}"
      [[ -n "${build_type_id}" ]] || { usage; exit 1; }
      api GET "/app/rest/agents?locator=compatible:(buildType:(id:${build_type_id}))" | pretty
      ;;
    latest)
      local build_type_id="${2:-}"
      local count="${3:-5}"
      [[ -n "${build_type_id}" ]] || { usage; exit 1; }
      api GET "/app/rest/builds?locator=buildType:(id:${build_type_id}),count:${count}" | pretty
      ;;
    build)
      local build_id="${2:-}"
      [[ -n "${build_id}" ]] || { usage; exit 1; }
      api GET "/app/rest/builds/id:${build_id}" | pretty
      ;;
    trigger)
      local build_type_id="${2:-}"
      local branch="${3:-}"
      [[ -n "${build_type_id}" ]] || { usage; exit 1; }
      if [[ -n "${branch}" ]]; then
        api POST "/app/rest/buildQueue" "{\"buildType\":{\"id\":\"${build_type_id}\"},\"branchName\":\"${branch}\"}" | pretty
      else
        api POST "/app/rest/buildQueue" "{\"buildType\":{\"id\":\"${build_type_id}\"}}" | pretty
      fi
      ;;
    *)
      usage
      exit 1
      ;;
  esac
}

main "$@"
