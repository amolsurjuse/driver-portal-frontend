---
name: web-socket-connector
description: Use when working on the Go service that creates outbound charger WebSocket connections, sends OCPP actions, manages connection state, and deploys via TeamCity.
---

# Web Socket Connector

## Repo

- Path: `/Users/amolsurjuse/development/projects/web-socket-connector`

## Stack

- Go
- Distroless runtime image

## Main Endpoints

- `POST /connect`
- `POST /disconnect`
- `POST /send`
- `GET /connections`
- `GET /connections/{chargerId}`
- `POST /events`

## Local Run

```bash
cd /Users/amolsurjuse/development/projects/web-socket-connector
go run ./cmd/web-socket-connector
```

Default port: `8091`

## TeamCity

```bash
TEAMCITY_TOKEN='<token>' ./ci/teamcity/setup_pipeline.sh
```

Deployment version file:

- `charts/config/services/web-socket-connector/us/version/dev-version.yaml`
