---
name: subscription-service
description: Use when working on Electra Hub subscription plans, allocations, utilization, audit APIs, CORS behavior, local development, TeamCity pipeline setup, and Argo deployment.
---

# Subscription Service

## Repo

- Path: `/Users/amolsurjuse/development/projects/subscription-service`

## Main APIs

- plans
- allocations
- utilizations
- audit logs

## Current Notes

- plan list uses backend-driven pagination
- localhost CORS allowlist is configured for admin UI development

## Local Run

```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

## TeamCity

```bash
TEAMCITY_TOKEN='<token>' ./ci/teamcity/setup_pipeline.sh
```

Defaults:

- Build type: `Amy_SubscriptionService_Build`
- Docker image: `amolsurjuse/subscription-service`
- Deploy version file: `charts/config/services/subscription-service/us/version/dev-version.yaml`

## Verify

```bash
./mvnw test
curl -k -sS https://dev.electrahub.com:8443/subscription/actuator/health
```
