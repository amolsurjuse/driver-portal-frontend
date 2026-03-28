---
name: charger-management-service
description: Use when working on charger inventory and lifecycle APIs, local Spring Boot development, Docker packaging, and TeamCity deployment for charger-management-service.
---

# Charger Management Service

## Repo

- Path: `/Users/amolsurjuse/development/projects/charger-management-service`

## Stack

- Spring Boot 4
- Java 21

## Main APIs

- `POST /api/v1/chargers`
- `GET /api/v1/chargers`
- `GET /api/v1/chargers/{chargerId}`
- `GET /api/v1/chargers/{chargerId}/settings`
- `PUT /api/v1/chargers/{chargerId}`
- `PATCH /api/v1/chargers/{chargerId}/status`
- `DELETE /api/v1/chargers/{chargerId}`

## Local Run

```bash
mvn spring-boot:run
```

Default port: `8086`

## Packaging

Dockerfile builds with Maven in a multi-stage image and runs the JAR on Temurin 21 JRE.

## TeamCity

```bash
TEAMCITY_TOKEN='<token>' ./ci/teamcity/setup_pipeline.sh
```

The setup script updates:

- `charts/config/services/charger-management-service/us/version/dev-version.yaml`
