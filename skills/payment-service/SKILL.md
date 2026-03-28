---
name: payment-service
description: Use when working on the Spring Boot payment backend, including wallet, cards, auto-topup, Liquibase schema, local setup, and TeamCity deployment.
---

# Payment Service

## Repo

- Path: `/Users/amolsurjuse/development/projects/payment-service`

## Stack

- Spring Boot 4.0.1
- Java 21
- Liquibase

## API Base

- `/api/v1/payment`

## Main Areas

- wallet state
- topups
- saved cards
- auto-topup configuration
- reload flows

## Local Run

```bash
mvn spring-boot:run
```

Default port: `8083`

## TeamCity

```bash
TEAMCITY_TOKEN='<token>' ./ci/teamcity/setup_pipeline.sh
```

Deployment version file:

- `charts/config/services/payment-service/us/version/dev-version.yaml`

## Packaging

- Multi-stage Maven + Temurin Dockerfile
