---
name: user-service
description: Use when working on Electra Hub user management, admin user APIs, seeded dev users, role-based access checks, TeamCity setup, and Argo deployment for user-service.
---

# User Service

## Repo

- Path: `/Users/amolsurjuse/development/projects/user-service`

## Main Responsibilities

- registration and authentication validation
- user profile management
- admin user management
- seeded dev admin users

## Current Important Behavior

- admin APIs require `SYSTEM_ADMIN`
- `GET /api/v1/users` returns regular users for admins
- `GET /api/v1/admin/users` returns only admin users

## Dev Accounts

- `sysadmin.dev@electrahub.com` / `Admin@12345`
- `network.operator.dev@electrahub.com` / `Admin@12345`
- `enterprise.operator.dev@electrahub.com` / `Admin@12345`
- `location.operator.dev@electrahub.com` / `Admin@12345`
- `site.operator.dev@electrahub.com` / `Admin@12345`
- `support.operator.dev@electrahub.com` / `Admin@12345`
- `driver.user.dev@electrahub.com` / `User@12345`

## Local Run

```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

## TeamCity

```bash
TEAMCITY_TOKEN='<token>' ./ci/teamcity/setup_pipeline.sh
```

Defaults:

- Build type: `Amy_UserService_Build`
- Docker image: `amolsurjuse/user-service`
- Deploy version file: `charts/config/services/user-service/us/version/dev-version.yaml`

## Verify

```bash
./mvnw test
curl -k -sS https://dev.electrahub.com:8443/user/actuator/health
```
