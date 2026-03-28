---
name: auth-service
description: Use when working on Electra Hub authentication, JWT tokens, refresh/logout flows, auth-service local setup, and TeamCity plus Argo deployment.
---

# Auth Service

## Repo

- Path: `/Users/amolsurjuse/development/projects/auth-service`

## Owns

- login
- register
- refresh
- logout-device
- logout-all
- JWT claims and token/session lifecycle

## Local Run

```bash
cd /Users/amolsurjuse/development/projects/auth-service
docker compose up -d
./mvnw spring-boot:run
```

## TeamCity

Provision or repair the pipeline:

```bash
TEAMCITY_TOKEN='<token>' ./ci/teamcity/setup_pipeline.sh
```

Defaults:

- Build type: `Amy_AuthService_Build`
- Docker image: `amolsurjuse/auth-service`
- Deploy version file: `charts/config/services/auth-service/us/version/dev-version.yaml`

## Verify

```bash
curl -k -sS https://dev.electrahub.com:8443/auth/actuator/health
kubectl -n argocd get application authorization-service -o jsonpath='{.status.sync.status} {.status.health.status} {.status.sync.revision}{"\n"}'
```
