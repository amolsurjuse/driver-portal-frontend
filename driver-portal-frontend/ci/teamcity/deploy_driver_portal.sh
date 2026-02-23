#!/usr/bin/env bash
set -euo pipefail

log() {
  printf '[teamcity-deploy] %s\n' "$*"
}

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    printf 'Missing required command: %s\n' "$1" >&2
    exit 1
  fi
}

require_cmd git
require_cmd npm
require_cmd docker
require_cmd perl

DRY_RUN="${DRY_RUN:-false}"
IMAGE_REPO="${IMAGE_REPO:-amolsurjuse/driver-portal-frontend}"
IMAGE_TAG="${IMAGE_TAG:-${BUILD_NUMBER:-${TEAMCITY_BUILD_NUMBER:-local-$(date +%Y%m%d%H%M%S)}}}"
K8S_REPO_URL="${K8S_REPO_URL:-git@github.com:amolsurjuse/k8s-platform.git}"
K8S_BRANCH="${K8S_BRANCH:-develop}"
K8S_VERSION_FILE="${K8S_VERSION_FILE:-charts/config/services/driver-portal-ui/us/version/dev-version.yaml}"
K8S_COMMIT_NAME="${K8S_COMMIT_NAME:-TeamCity CI}"
K8S_COMMIT_EMAIL="${K8S_COMMIT_EMAIL:-teamcity@electrahub.com}"
ARGO_APP_NAME="${ARGO_APP_NAME:-driver-portal-ui}"

if [[ -d "driver-portal-frontend" ]]; then
  REPO_ROOT="$PWD"
  APP_DIR="$PWD/driver-portal-frontend"
else
  REPO_ROOT="$PWD"
  APP_DIR="$PWD"
fi

FULL_IMAGE="${IMAGE_REPO}:${IMAGE_TAG}"
log "Using app directory: ${APP_DIR}"
log "Building image: ${FULL_IMAGE}"

pushd "$APP_DIR" >/dev/null
npm ci
npm run build -- --configuration production
docker build -t "$FULL_IMAGE" .
popd >/dev/null

if [[ "$DRY_RUN" != "true" ]]; then
  if [[ -z "${DOCKER_USERNAME:-}" || -z "${DOCKER_PASSWORD:-}" ]]; then
    echo "DOCKER_USERNAME/DOCKER_PASSWORD must be set for non-dry-run deployment." >&2
    exit 1
  fi
  printf '%s' "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
  docker push "$FULL_IMAGE"
else
  log "DRY_RUN=true -> skipping docker push"
fi

TMP_DIR="$(mktemp -d)"
cleanup() {
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT

git clone --depth 1 --branch "$K8S_BRANCH" "$K8S_REPO_URL" "$TMP_DIR/k8s-platform"
VERSION_FILE="$TMP_DIR/k8s-platform/$K8S_VERSION_FILE"

if [[ ! -f "$VERSION_FILE" ]]; then
  echo "Version file not found: $VERSION_FILE" >&2
  exit 1
fi

OLD_TAG="$(grep -E '^[[:space:]]*tag:[[:space:]]*".*"' "$VERSION_FILE" | head -n1 | sed -E 's/.*"([^"]+)".*/\1/')"
perl -i -pe 'if (!$done && /^\s*tag:\s*"/) { s/"[^"]*"/"'"$IMAGE_TAG"'"/; $done = 1; }' "$VERSION_FILE"
NEW_TAG="$(grep -E '^[[:space:]]*tag:[[:space:]]*".*"' "$VERSION_FILE" | head -n1 | sed -E 's/.*"([^"]+)".*/\1/')"

if [[ -z "$NEW_TAG" ]]; then
  echo "Could not update image tag in $VERSION_FILE" >&2
  exit 1
fi

if [[ "$OLD_TAG" != "$NEW_TAG" ]]; then
  pushd "$TMP_DIR/k8s-platform" >/dev/null
  git config user.name "$K8S_COMMIT_NAME"
  git config user.email "$K8S_COMMIT_EMAIL"
  git add "$K8S_VERSION_FILE"
  git commit -m "chore(driver-portal-ui): deploy image ${IMAGE_TAG}"
  if [[ "$DRY_RUN" != "true" ]]; then
    git push origin "$K8S_BRANCH"
  else
    log "DRY_RUN=true -> skipping push to ${K8S_REPO_URL}"
  fi
  popd >/dev/null
  log "Updated ${K8S_VERSION_FILE}: ${OLD_TAG} -> ${NEW_TAG}"
else
  log "Tag already up to date (${NEW_TAG}), skipping commit"
fi

if [[ "$DRY_RUN" != "true" ]] && command -v argocd >/dev/null 2>&1; then
  if [[ -n "${ARGOCD_SERVER:-}" && -n "${ARGOCD_USERNAME:-}" && -n "${ARGOCD_PASSWORD:-}" ]]; then
    ARGO_FLAGS=("--grpc-web")
    if [[ "${ARGOCD_INSECURE:-true}" == "true" ]]; then
      ARGO_FLAGS+=("--insecure")
    fi
    argocd login "$ARGOCD_SERVER" --username "$ARGOCD_USERNAME" --password "$ARGOCD_PASSWORD" "${ARGO_FLAGS[@]}"
    argocd app sync "$ARGO_APP_NAME"
    argocd app wait "$ARGO_APP_NAME" --health --operation --timeout 600
    log "ArgoCD sync completed for app: ${ARGO_APP_NAME}"
  else
    log "ARGOCD_* credentials not set; skipping ArgoCD sync"
  fi
fi

log "Deployment pipeline completed successfully (${FULL_IMAGE})"
