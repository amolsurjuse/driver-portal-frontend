---
name: k8s-platform
description: Use when working on Electra Hub GitOps deployment through k8s-platform, including Argo app manifests, Helm value files, image tag updates, and rollout verification.
---

# K8s Platform

## Repo

- Path: `/Users/amolsurjuse/development/projects/k8s-platform`

## Owns

- Argo application manifests in `argocd/applications`
- Helm charts in `charts/common`
- service version files in `charts/config/services`

## Typical Deployment Flow

1. Service pipeline builds and pushes Docker image
2. Version file in `charts/config/services/<service>/us/version/dev-version.yaml` is updated
3. Change is pushed to `develop`
4. Argo reconciles and rolls the deployment

## Verification

```bash
kubectl -n argocd get application <service> -o jsonpath='{.status.sync.status} {.status.health.status} {.status.sync.revision}{"\n"}'
kubectl -n dev get deployment <service> -o jsonpath='{.status.readyReplicas}/{.status.replicas} {.spec.template.spec.containers[0].image}{"\n"}'
```

## Working Note

Prefer a clean temp clone or worktree when doing deploy-only version bumps if the main repo is dirty.
