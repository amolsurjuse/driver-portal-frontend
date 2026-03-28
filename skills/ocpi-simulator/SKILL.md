---
name: ocpi-simulator
description: Use when working on the Go-based OCPI and OCPP simulator, including fleet APIs, WebSocket flows, Docker packaging, and local or Kubernetes deployment.
---

# OCPI Simulator

## Repo

- Path: `/Users/amolsurjuse/development/projects/ocpi-simulator`

## Stack

- Go
- OCPI 2.2.1 mock service
- OCPP 1.6 and 2.0.1 WebSocket endpoints

## Local Run

```bash
go run ./cmd/ocpi-simulator
```

Default port: `8081`

## Key Areas

- charger fleet APIs under `/api/v1/*`
- OCPI discovery and resource endpoints under `/ocpi/*`
- WebSocket event streaming
- OCPP charger connection endpoints

## Packaging

- Multi-stage Docker build
- Distroless runtime image

## Kubernetes

The README includes raw apply commands for:

- `deploy/k8s/deployment.yaml`
- `deploy/k8s/service.yaml`
