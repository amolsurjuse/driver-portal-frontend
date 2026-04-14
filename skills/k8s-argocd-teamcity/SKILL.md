---
name: k8s-argocd-teamcity
description: Connect and validate access to Electra Hub Kubernetes clusters, Argo CD applications, and TeamCity APIs. Use when tasks involve kube context or RBAC checks, Argo sync and health inspection, Argo port-forward/login setup, TeamCity token and REST connectivity validation, or CI/CD access triage before deployments.
---

# K8s ArgoCD TeamCity Access

## Outcome

Establish verified access to Kubernetes, Argo CD, and TeamCity quickly without re-discovering contexts, endpoints, and auth commands.

## Workflow

1. Confirm scope: `k8s`, `k8s+argo`, or all three control planes.
2. Confirm environment variables and local connectivity assumptions.
3. Run the fast sweep script: `scripts/check_access.sh`.
4. Drill into the failing plane with `references/access-checklist.md`.
5. Continue deployment or pipeline work only after access is green.

## Required Inputs

- Kubernetes:
  - `kubectl` installed.
  - kubeconfig configured.
  - Optional `KUBECTL_CONTEXT` if context should be forced.
- Argo CD:
  - Argo present in cluster (`argocd` namespace + Application CRD), or CLI endpoint access.
  - Optional: `ARGOCD_SERVER`, `ARGOCD_USERNAME`, `ARGOCD_PASSWORD`.
  - Optional: `ARGO_APP_NAME` for app-specific checks.
- TeamCity:
  - `TEAMCITY_URL` (default `http://localhost:8111`).
  - `TEAMCITY_TOKEN` for REST API auth validation.

## Quick Start

Run all checks:

```bash
cd /Users/amolsurjuse/development/projects/skills/k8s-argocd-teamcity
./scripts/check_access.sh
```

Run selected checks:

```bash
KUBECTL_CONTEXT=dev-us ./scripts/check_access.sh --k8s --argo
TEAMCITY_URL=http://localhost:8111 TEAMCITY_TOKEN='<token>' ./scripts/check_access.sh --teamcity
ARGO_APP_NAME=user-service ./scripts/check_access.sh --argo
```

## Access Rules

- Use read-only validation first (`kubectl get`, `kubectl auth can-i`, TeamCity `GET` endpoints).
- Never store tokens in files; pass through environment variables.
- Report partial health if one plane fails and others are reachable.
- Use `argocd login --insecure` only for local or approved non-prod endpoints.

## Troubleshooting

Use `references/access-checklist.md` for:

- kube context and RBAC failures
- Argo namespace/CRD/app lookup failures
- TeamCity 401/403 vs endpoint reachability failures
- local endpoint defaults for Argo and TeamCity

## Related Skills

- `/Users/amolsurjuse/development/projects/skills/k8s-platform`
- `/Users/amolsurjuse/development/projects/skills/teamcity-pipeline`
