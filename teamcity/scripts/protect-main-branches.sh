#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${GITHUB_TOKEN:-}" ]]; then
  echo "GITHUB_TOKEN is required"
  exit 1
fi

OWNER="${GITHUB_OWNER:-amolsurjuse}"

REPOS=(
  "driver-portal-frontend"
  "auth-service"
  "k8s-platform"
  "kubernetes"
  "ocpi-simulator"
  "ocpi-simulator-ui"
  "payment-service"
  "user-service"
  "web-socket-connector"
)

PAYLOAD="$(cat <<'JSON'
{
  "required_status_checks": null,
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": true,
    "required_approving_review_count": 1,
    "require_last_push_approval": true
  },
  "restrictions": null,
  "required_linear_history": true,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "block_creations": false,
  "required_conversation_resolution": true,
  "lock_branch": false,
  "allow_fork_syncing": false
}
JSON
)"

for repo in "${REPOS[@]}"; do
  echo "Protecting ${OWNER}/${repo}:main"
  curl -fsSL \
    -X PUT \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer ${GITHUB_TOKEN}" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    "https://api.github.com/repos/${OWNER}/${repo}/branches/main/protection" \
    -d "${PAYLOAD}" >/dev/null
done

echo "Applied protection to ${#REPOS[@]} repositories."
