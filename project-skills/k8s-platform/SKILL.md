---
name: k8s-platform
description: Use when working on Electra Hub GitOps deployment through k8s-platform, including Argo application manifests, Helm value files, image tag promotion, and rollout verification in dev.
---

# K8s Platform

## Use This Skill For

- ArgoCD app definitions
- GitOps-driven image tag deployments
- Helm value file updates
- checking rollout status in dev
- mapping services to Argo applications and version files

## Repo

- Path: `/Users/amolsurjuse/development/projects/k8s-platform`

## What This Repo Owns

- ArgoCD application manifests in:
  - `argocd/applications`
- Helm charts in:
  - `charts/common`
- environment-specific config in:
  - `charts/config/services`

## Current Service Mapping

- `user-service`
  - app: `argocd/applications/user-service-dev.yaml`
  - version file: `charts/config/services/user-service/us/version/dev-version.yaml`
- `subscription-service`
  - app: `argocd/applications/subscription-service-dev.yaml`
  - version file: `charts/config/services/subscription-service/us/version/dev-version.yaml`
- `auth-service`
  - app: `argocd/applications/auth-service-dev.yaml` or environment-specific authorization app naming in cluster
  - version file: `charts/config/services/auth-service/us/version/dev-version.yaml`

## Deployment Flow

Argo does not build images. It only reconciles desired state from Git.

Normal flow:

1. service pipeline builds and pushes Docker image
2. pipeline updates the matching `dev-version.yaml`
3. commit lands in `k8s-platform` `develop`
4. Argo syncs
5. Kubernetes rolls the deployment

## Manual Version Bump

Edit the target version file:

```yaml
image:
  tag: "<new-tag>"
```

Commit and push to `develop`.

## Verification Commands

Check Argo:

```bash
kubectl -n argocd get application user-service -o jsonpath='{.status.sync.status} {.status.health.status} {.status.sync.revision}{"\n"}'
kubectl -n argocd get application subscription-service -o jsonpath='{.status.sync.status} {.status.health.status} {.status.sync.revision}{"\n"}'
kubectl -n argocd get application authorization-service -o jsonpath='{.status.sync.status} {.status.health.status} {.status.sync.revision}{"\n"}'
```

Check deployments:

```bash
kubectl -n dev get deployment user-service -o jsonpath='{.status.readyReplicas}/{.status.replicas} {.spec.template.spec.containers[0].image}{"\n"}'
kubectl -n dev get deployment subscription-service -o jsonpath='{.status.readyReplicas}/{.status.replicas} {.spec.template.spec.containers[0].image}{"\n"}'
```

Force an app refresh if Argo has not picked up a recent Git update:

```bash
kubectl -n argocd annotate application <service-name> argocd.argoproj.io/refresh=hard --overwrite
```

## Working Style Notes

- Avoid editing the main `k8s-platform` workspace if it is dirty and unrelated
- Prefer a clean temporary clone or worktree for deployment-only version bumps
- Verify the pushed revision matches the Argo application revision before calling the rollout done
