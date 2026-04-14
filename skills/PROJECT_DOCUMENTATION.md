# Electra Hub Project Documentation

## 1) Overview

This workspace contains the core Electra Hub platform services for:

- Identity and authentication
- Driver portal frontend
- OCPP/OCPI simulation
- WebSocket connector testing
- Kubernetes and ArgoCD deployment configuration

Primary goal: provide a production-style EV charging development and validation platform from local machine to Kubernetes dev environment.

## 2) Repositories and Responsibilities

- `auth-service/`
  - Spring Boot identity service (`com.electrahub.identity`)
  - JWT auth, refresh-token flow, Redis integration, Liquibase migrations, PostgreSQL
- `driver-portal-frontend/`
  - Angular 21.1.3 + NgRx driver portal UI
  - Integrates with auth APIs
- `ocpi-simulator/`
  - Go-based OCPI/OCPP simulator backend
  - Charger fleet APIs, events, in-memory simulation state
- `ocpi-simulator-ui/`
  - Angular UI for operating simulator APIs
- `web-socket-connector/`
  - Go service for outbound WebSocket/OCPP connectivity tests
- `k8s-platform/`
  - Helm + ArgoCD deployment definitions per service/environment

## 3) Technology Stack

- Backend:
  - Java 21, Spring Boot 4.0.1 (`auth-service`)
  - Go 1.22 (`ocpi-simulator`, `web-socket-connector`)
- Frontend:
  - Angular 21.1.3 + NgRx (`driver-portal-frontend`)
  - Angular 19 (`ocpi-simulator-ui`)
- Infra:
  - Kubernetes (Minikube for local)
  - NGINX Ingress
  - ArgoCD
  - Helm charts (`k8s-platform/charts/common`)
- Data:
  - PostgreSQL (auth persistence)
  - Redis (sessions/cache/token controls)
  - In-memory state for simulator runtime

## 4) Local Prerequisites

- Java 21+
- Maven 3.9+
- Node.js + npm
- Go 1.22+
- Docker Desktop
- Minikube + kubectl

## 5) Local Development Commands

### 5.1 Auth Service

```bash
cd /Users/amolsurjuse/development/projects/auth-service
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

### 5.2 Driver Portal Frontend

```bash
cd /Users/amolsurjuse/development/projects/driver-portal-frontend
npm install
npm start
```

### 5.3 OCPP Simulator Backend

```bash
cd /Users/amolsurjuse/development/projects/ocpi-simulator
go run ./cmd/ocpi-simulator
```

### 5.4 OCPP Simulator UI

```bash
cd /Users/amolsurjuse/development/projects/ocpi-simulator-ui
npm install
npm start
```

### 5.5 WebSocket Connector

```bash
cd /Users/amolsurjuse/development/projects/web-socket-connector
go run ./cmd/web-socket-connector
```

## 6) Kubernetes Access (Port Forwarding)

Use the helper script:

```bash
cd /Users/amolsurjuse/development/projects
./port-forward.sh all
```

Use auto-close option when ports are already busy:

```bash
./port-forward.sh --close-in-use all
```

Configured forwards:

- Postgres: `127.0.0.1:58318 -> dev/postgresql:5432`
- Ingress HTTP/HTTPS: `127.0.0.1:8080/8443 -> ingress-nginx-controller:80/443`
- ArgoCD HTTP/HTTPS: `127.0.0.1:8090/9443 -> argocd-server:80/443`

## 7) Local Host Mapping for Ingress

Add these entries in `/etc/hosts` for browser and curl-based host routing:

```text
127.0.0.1 auth-dev.electrahub.com
127.0.0.1 driver-portal-dev.electrahub.com
127.0.0.1 ocpp-simulator-dev.electrahub.com
```

## 8) Main Dev URLs

- Driver Portal UI:
  - `https://driver-portal-dev.electrahub.com:8443/`
- Auth API:
  - `https://auth-dev.electrahub.com:8443/api/auth/login`
- OCPP Simulator UI:
  - `https://ocpp-simulator-dev.electrahub.com:8443/ocpp-simulator-ui`
- OCPP Simulator API:
  - `https://ocpp-simulator-dev.electrahub.com:8443/ocpp-simulator/api/v1/stats`

## 9) ArgoCD Deployment Context (Dev)

- Project: `amy`
- Repo: `https://github.com/amolsurjuse/k8s-platform.git`
- Chart path: `charts/common`
- Namespace: `dev`

Core app names:

- `authorization-service`
- `driver-portal-ui`
- `ocpp-simulator`
- `ocpp-simulator-ui`

## 10) Common Troubleshooting

### 10.1 TLS / Certificate Issues

- Error: `ERR_CERT_AUTHORITY_INVALID`
  - Cause: self-signed local ingress certificate not trusted
  - Fix: trust the ingress cert in local keychain or use `curl -k` for diagnostics

### 10.2 CORS Errors on Auth Login

- Validate preflight:

```bash
curl -k -i -X OPTIONS 'https://auth-dev.electrahub.com:8443/api/auth/login' \
  --resolve auth-dev.electrahub.com:8443:127.0.0.1 \
  -H 'Origin: https://driver-portal-dev.electrahub.com:8443' \
  -H 'Access-Control-Request-Method: POST' \
  -H 'Access-Control-Request-Headers: content-type'
```

- Ensure `APP_CORS_ALLOWED_ORIGIN_PATTERNS` includes HTTPS + `:8443` host variants.

### 10.3 OCPP Simulator `400` on Charger Create

- Frequent cause: duplicate `chargerId` (`charger already exists`)
- Fix:
  - create with a new ID, or
  - delete existing charger with `force=true`

### 10.4 Ingress `Service does not have active Endpoint`

- Usually occurs during rollout/restart windows.
- Confirm:
  - pods ready
  - endpoints attached to service
  - ingress backend reload completed

## 11) Recommended Delivery Practices

- Keep environment configuration in Helm values/config maps and secrets.
- Use Liquibase as default migration path in all profiles where DB schema must be managed.
- Use explicit app-level logging with production-safe defaults (`INFO` app, `WARN` framework).
- Validate externally through ingress-hosted URLs (`:8443`) before marking deployment complete.

## 12) Reference Files

- `/Users/amolsurjuse/development/projects/auth-service/src/main/resources/application.yml`
- `/Users/amolsurjuse/development/projects/auth-service/src/main/java/com/electrahub/identity/config/SecurityConfig.java`
- `/Users/amolsurjuse/development/projects/driver-portal-frontend/src/environments/environment.ts`
- `/Users/amolsurjuse/development/projects/ocpi-simulator/README.md`
- `/Users/amolsurjuse/development/projects/ocpi-simulator-ui/src/app/app.config.ts`
- `/Users/amolsurjuse/development/projects/port-forward.sh`
- `/Users/amolsurjuse/development/projects/k8s-platform/charts/config/services/auth-service/us/base.yaml`

