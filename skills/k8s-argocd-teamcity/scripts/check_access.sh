#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: check_access.sh [--k8s] [--argo] [--teamcity]

No flags:
  Run all checks.

Flags:
  --k8s       Run only Kubernetes checks (can combine with other flags)
  --argo      Run only Argo CD checks (can combine with other flags)
  --teamcity  Run only TeamCity checks (can combine with other flags)
  --help      Show this help message

Environment:
  KUBECTL_CONTEXT   Optional kube context override
  ARGO_APP_NAME     Optional Argo app name to verify
  ARGOCD_SERVER     Optional Argo CLI endpoint (for CLI login test)
  ARGOCD_USERNAME   Optional Argo CLI username
  ARGOCD_PASSWORD   Optional Argo CLI password
  TEAMCITY_URL      TeamCity base URL (default: http://localhost:8111)
  TEAMCITY_TOKEN    TeamCity token for REST auth check
EOF
}

check_k8s=true
check_argo=true
check_teamcity=true
filtered=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --k8s)
      if [[ "$filtered" == false ]]; then
        check_k8s=false
        check_argo=false
        check_teamcity=false
        filtered=true
      fi
      check_k8s=true
      ;;
    --argo)
      if [[ "$filtered" == false ]]; then
        check_k8s=false
        check_argo=false
        check_teamcity=false
        filtered=true
      fi
      check_argo=true
      ;;
    --teamcity)
      if [[ "$filtered" == false ]]; then
        check_k8s=false
        check_argo=false
        check_teamcity=false
        filtered=true
      fi
      check_teamcity=true
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    *)
      echo "[FAIL] Unknown argument: $1" >&2
      usage >&2
      exit 2
      ;;
  esac
  shift
done

failures=0
kube_context="${KUBECTL_CONTEXT:-}"
kube_context_args=()

if [[ -n "$kube_context" ]]; then
  kube_context_args=(--context "$kube_context")
fi

pass() {
  echo "[OK]   $1"
}

warn() {
  echo "[WARN] $1"
}

fail() {
  echo "[FAIL] $1"
  failures=$((failures + 1))
}

check_kubernetes() {
  if ! command -v kubectl >/dev/null 2>&1; then
    fail "kubectl not found in PATH."
    return
  fi

  local context_name="${kube_context}"
  if [[ -z "$context_name" ]]; then
    context_name="$(kubectl config current-context 2>/dev/null || true)"
  fi

  if [[ -z "$context_name" ]]; then
    fail "No kube context is active. Set KUBECTL_CONTEXT or run kubectl config use-context."
    return
  fi

  if ! kubectl "${kube_context_args[@]}" cluster-info >/dev/null 2>&1; then
    fail "Unable to reach Kubernetes API server for context '${context_name}'."
    return
  fi

  local can_i
  can_i="$(kubectl "${kube_context_args[@]}" auth can-i get pods -A 2>/dev/null || true)"
  if [[ "$can_i" != "yes" ]]; then
    fail "Connected to Kubernetes but RBAC denied 'get pods -A' for context '${context_name}'."
    return
  fi

  local ns_count
  ns_count="$(kubectl "${kube_context_args[@]}" get ns --no-headers 2>/dev/null | wc -l | tr -d ' ')"
  pass "Kubernetes reachable via context '${context_name}' (namespaces visible: ${ns_count})."
}

check_argo_cd() {
  if ! command -v kubectl >/dev/null 2>&1; then
    fail "kubectl not found; cannot verify Argo CD through cluster."
    return
  fi

  if ! kubectl "${kube_context_args[@]}" -n argocd get svc argocd-server >/dev/null 2>&1; then
    fail "argocd-server service not reachable in namespace 'argocd'."
    return
  fi

  if ! kubectl "${kube_context_args[@]}" -n argocd get applications.argoproj.io >/dev/null 2>&1; then
    fail "Argo Application CRD not reachable (or no access) in namespace 'argocd'."
    return
  fi

  local app_count
  app_count="$(kubectl "${kube_context_args[@]}" -n argocd get applications.argoproj.io --no-headers 2>/dev/null | wc -l | tr -d ' ')"
  pass "Argo CD resources reachable in cluster (applications found: ${app_count})."

  if [[ -n "${ARGO_APP_NAME:-}" ]]; then
    if kubectl "${kube_context_args[@]}" -n argocd get application "${ARGO_APP_NAME}" >/dev/null 2>&1; then
      pass "Argo application '${ARGO_APP_NAME}' is reachable."
    else
      fail "Argo application '${ARGO_APP_NAME}' was not found or is not readable."
    fi
  fi

  if command -v argocd >/dev/null 2>&1 \
    && [[ -n "${ARGOCD_SERVER:-}" ]] \
    && [[ -n "${ARGOCD_USERNAME:-}" ]] \
    && [[ -n "${ARGOCD_PASSWORD:-}" ]]; then
    if argocd login "${ARGOCD_SERVER}" --username "${ARGOCD_USERNAME}" --password "${ARGOCD_PASSWORD}" --insecure >/dev/null 2>&1; then
      pass "Argo CD CLI login succeeded for '${ARGOCD_SERVER}'."
    else
      warn "Argo CD CLI login failed for '${ARGOCD_SERVER}'. Cluster-side Argo checks may still be valid."
    fi
  fi
}

check_teamcity_api() {
  if ! command -v curl >/dev/null 2>&1; then
    fail "curl not found in PATH."
    return
  fi

  local url="${TEAMCITY_URL:-http://localhost:8111}"
  url="${url%/}"

  if curl -sS --max-time 10 -o /dev/null "${url}/login.html"; then
    pass "TeamCity endpoint reachable at ${url}."
  else
    fail "TeamCity endpoint is not reachable at ${url}."
    return
  fi

  if [[ -z "${TEAMCITY_TOKEN:-}" ]]; then
    warn "TEAMCITY_TOKEN not set; skipped authenticated REST API check."
    return
  fi

  local code
  code="$(curl -sS --max-time 12 -o /dev/null -w '%{http_code}' -u ":${TEAMCITY_TOKEN}" -H 'Accept: application/json' "${url}/app/rest/server")"
  if [[ "$code" == "200" ]]; then
    pass "TeamCity REST API authentication succeeded."
  else
    fail "TeamCity REST API authentication failed (HTTP ${code})."
  fi
}

echo "=== Connectivity Check ==="

if [[ "$check_k8s" == true ]]; then
  echo "--- Kubernetes ---"
  check_kubernetes
fi

if [[ "$check_argo" == true ]]; then
  echo "--- Argo CD ---"
  check_argo_cd
fi

if [[ "$check_teamcity" == true ]]; then
  echo "--- TeamCity ---"
  check_teamcity_api
fi

if [[ "$failures" -gt 0 ]]; then
  echo "=== Completed with ${failures} failure(s). ==="
  exit 1
fi

echo "=== All requested checks passed. ==="
