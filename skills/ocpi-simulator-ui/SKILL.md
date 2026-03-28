---
name: ocpi-simulator-ui
description: Use when working on the Angular OCPP simulator UI, including local dev setup, simulator API configuration, live event operations, and production Nginx packaging.
---

# OCPI Simulator UI

## Repo

- Path: `/Users/amolsurjuse/development/projects/ocpi-simulator-ui`

## Stack

- Angular
- Nginx container for production hosting

## Local Run

```bash
cd /Users/amolsurjuse/development/projects/ocpi-simulator-ui
npm install
npm start
```

Default URL: `http://localhost:4200`

## Dev Targets

- UI: `https://ocpp-simulator-dev.electrahub.com:8443/ocpp-simulator-ui`
- API: `https://dev.electrahub.com:8443/ocpp-simulator/api/v1`
- WS connector: `https://dev.electrahub.com:8443/ws-connector`

## Use This Repo For

- charger provisioning UI
- connection lifecycle UI
- event stream UI
- fault/status/heartbeat operations

## Packaging

The production Docker image builds Angular and serves it via Nginx with base href `/ocpp-simulator-ui/`.
