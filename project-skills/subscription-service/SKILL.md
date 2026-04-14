---
name: subscription-service
description: Use when working on Electra Hub subscription plans, allocations, utilization, audit APIs, CORS behavior, local development, TeamCity pipeline setup, and Argo deployment.
---

# Subscription Service

## Use This Skill For

- subscription plan APIs
- allocations and allocation status
- utilization preview and recording
- audit log APIs
- plan pagination
- CORS fixes for local admin UI work
- TeamCity provisioning and deployment

## Repo

- Path: `/Users/amolsurjuse/development/projects/subscription-service`

## Main APIs

- `POST /api/v1/subscriptions/plans`
- `GET /api/v1/subscriptions/plans`
- `GET /api/v1/subscriptions/plans/{planId}`
- `POST /api/v1/subscriptions/allocations`
- `GET /api/v1/subscriptions/allocations`
- `PATCH /api/v1/subscriptions/allocations/{allocationId}/status`
- `POST /api/v1/subscriptions/utilizations/preview`
- `POST /api/v1/subscriptions/utilizations`
- `GET /api/v1/subscriptions/utilizations`
- `GET /api/v1/subscriptions/audit-logs`

## Current Important Behavior

- plan list supports backend-driven pagination
- dev CORS allowlist includes:
  - `http://localhost:4200`
  - `http://localhost:4201`
  - `http://localhost:4211`
  - `http://localhost:8080`

## Local Run

```bash
cd /Users/amolsurjuse/development/projects/subscription-service
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

## Verification

```bash
./mvnw test
```

Useful live preflight check:

```bash
curl -k -i -X OPTIONS 'https://dev.electrahub.com:8443/subscription/api/v1/subscriptions/plans' \
  -H 'Origin: http://localhost:4201' \
  -H 'Access-Control-Request-Method: GET'
```

Expect `access-control-allow-origin` in the response.

## TeamCity Pipeline

Provision with:

```bash
cd /Users/amolsurjuse/development/projects/subscription-service
TEAMCITY_TOKEN='<token>' ./ci/teamcity/setup_pipeline.sh
```

Important defaults:

- TeamCity project ID: `Amy_SubscriptionService`
- Build type ID: `Amy_SubscriptionService_Build`
- repo branch default: `main`
- Docker image: `amolsurjuse/subscription-service`
- deploy version file:
  - `charts/config/services/subscription-service/us/version/dev-version.yaml`

## Deployment Notes

Use a fresh packaged jar before Docker build:

```bash
./mvnw clean package -DskipTests
docker build --no-cache -t amolsurjuse/subscription-service:<tag> .
docker push amolsurjuse/subscription-service:<tag>
```

Then update:

- `/Users/amolsurjuse/development/projects/k8s-platform/charts/config/services/subscription-service/us/version/dev-version.yaml`

## Argo Verification

```bash
kubectl -n argocd get application subscription-service -o jsonpath='{.status.sync.status} {.status.health.status} {.status.sync.revision}{"\n"}'
kubectl -n dev get deployment subscription-service -o jsonpath='{.status.readyReplicas}/{.status.replicas} {.spec.template.spec.containers[0].image}{"\n"}'
curl -k -sS https://dev.electrahub.com:8443/subscription/actuator/health
```
