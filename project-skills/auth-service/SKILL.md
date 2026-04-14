---
name: auth-service
description: Use when working on Electra Hub authentication, JWT issuance, login/logout flows, refresh token handling, auth-service local development, or TeamCity pipeline setup and deployment.
---

# Auth Service

## Use This Skill For

- login/logout flow changes
- JWT claim changes
- refresh and device session handling
- auth CORS issues
- TeamCity provisioning and deployment for auth-service

## Repo

- Path: `/Users/amolsurjuse/development/projects/auth-service`

## What It Owns

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout-device`
- `POST /api/auth/logout-all`

JWTs include:

- `sub`
- `uid`
- `jti`
- `tv`
- `roles`

## Local Development

Start dependencies:

```bash
cd /Users/amolsurjuse/development/projects/auth-service
docker compose up -d
```

Run the app:

```bash
./mvnw spring-boot:run
```

## TeamCity Pipeline

Provision or repair the pipeline with:

```bash
cd /Users/amolsurjuse/development/projects/auth-service
TEAMCITY_TOKEN='<token>' ./ci/teamcity/setup_pipeline.sh
```

Important defaults from the current setup script:

- TeamCity project ID: `Amy_AuthService`
- Build type ID: `Amy_AuthService_Build`
- repo branch default: `develop`
- Docker image: `amolsurjuse/auth-service`
- deploy version file:
  - `charts/config/services/auth-service/us/version/dev-version.yaml`

## Deployment Model

The pipeline:

1. runs Maven
2. builds Docker image
3. pushes Docker image
4. updates the `k8s-platform` dev image tag
5. Argo syncs the environment

## Kubernetes / Argo

- Argo app lives in:
  - `/Users/amolsurjuse/development/projects/k8s-platform/argocd/applications`
- Dev version file:
  - `/Users/amolsurjuse/development/projects/k8s-platform/charts/config/services/auth-service/us/version/dev-version.yaml`

## Verification

```bash
curl -k -sS https://dev.electrahub.com:8443/auth/actuator/health
kubectl -n argocd get application authorization-service -o jsonpath='{.status.sync.status} {.status.health.status} {.status.sync.revision}{"\n"}'
```
