---
name: user-service
description: Use when working on Electra Hub user management, admin user APIs, seeded dev users, user-service local development, role-based access checks, TeamCity pipeline setup, and Argo deployment.
---

# User Service

## Use This Skill For

- user registration and profile APIs
- admin user management APIs
- role enforcement and access control
- seeded dev users and credentials
- TeamCity provisioning and deployment

## Repo

- Path: `/Users/amolsurjuse/development/projects/user-service`

## Main APIs

- `POST /api/v1/users`
- `POST /api/v1/users/authenticate`
- `GET /api/v1/users/{userId}/principal`
- `GET /api/v1/users/{userId}/profile`
- `PUT /api/v1/users/{userId}/profile`
- `GET /api/v1/users`
- `GET /api/v1/users/search/count`
- `GET /api/v1/admin/users`
- `GET /api/v1/admin/users/{userId}`
- `PUT /api/v1/admin/users/{userId}`
- `POST /api/v1/admin/users/{userId}/reset-password`
- `DELETE /api/v1/admin/users/{userId}`

## Current Important Behavior

- Admin endpoints are protected by `SYSTEM_ADMIN`
- `GET /api/v1/users` returns regular users for a system admin
- `GET /api/v1/admin/users` returns only admin users

## Seeded Dev Accounts

Admin accounts:

- `sysadmin.dev@electrahub.com`
- `network.operator.dev@electrahub.com`
- `enterprise.operator.dev@electrahub.com`
- `location.operator.dev@electrahub.com`
- `site.operator.dev@electrahub.com`
- `support.operator.dev@electrahub.com`

Admin password:

- `Admin@12345`

Plain verification user:

- `driver.user.dev@electrahub.com`
- `User@12345`

## Local Run

```bash
cd /Users/amolsurjuse/development/projects/user-service
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

## Verification

```bash
./mvnw test
```

Live admin authorization check pattern:

1. login through `auth-service`
2. call `/api/v1/admin/users` with admin token and expect `200`
3. call `/api/v1/admin/users` with plain user token and expect `403`

## TeamCity Pipeline

Provision the pipeline with:

```bash
cd /Users/amolsurjuse/development/projects/user-service
TEAMCITY_TOKEN='<token>' ./ci/teamcity/setup_pipeline.sh
```

Important defaults:

- TeamCity project ID: `Amy_UserService`
- Build type ID: `Amy_UserService_Build`
- repo branch default: `main`
- Docker image: `amolsurjuse/user-service`
- dev version file:
  - `charts/config/services/user-service/us/version/dev-version.yaml`

## Deployment Notes

Always build a fresh jar before Docker image creation:

```bash
./mvnw clean package -DskipTests
docker build --no-cache -t amolsurjuse/user-service:<tag> .
docker push amolsurjuse/user-service:<tag>
```

Then update:

- `/Users/amolsurjuse/development/projects/k8s-platform/charts/config/services/user-service/us/version/dev-version.yaml`

## Argo Verification

```bash
kubectl -n argocd get application user-service -o jsonpath='{.status.sync.status} {.status.health.status} {.status.sync.revision}{"\n"}'
kubectl -n dev get deployment user-service -o jsonpath='{.status.readyReplicas}/{.status.replicas} {.spec.template.spec.containers[0].image}{"\n"}'
curl -k -sS https://dev.electrahub.com:8443/user/actuator/health
```
