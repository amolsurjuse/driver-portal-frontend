# Project Context (ElectraHub Platform)

## 1. System Overview
- Project name: ElectraHub EV Charging Platform
- Domain: EV charging operations, charger lifecycle, sessions, pricing, billing, subscriptions, identity
- Primary users:
  - Drivers (web + iOS)
  - Admin/operators (React admin portal + legacy admin)
  - Charger endpoints via OCPP
  - OCPI peer systems/hubs
- Critical flows:
  - Driver auth -> discover charger -> start/stop session -> pricing/billing
  - Admin charger/network/location and pricing management
  - OCPP command/telemetry handling
  - OCPI data exchange and sync

## 2. Platform Inventory

### Backend Services (observed)
- `api-gateway` (Spring Boot, route/rbac/jwt)
- `auth-service`
- `user-service`
- `charger-management-service`
- `station-management-service`
- `session-service`
- `pricing-service`
- `billing-service`
- `payment-service`
- `subscription-service`
- `ocpp-service`
- `ocpi-service`
- `ocpp-ocpi-service` (bridge/integration repository present)
- `web-socket-connector` (Go)

### Web Clients
- Angular:
  - `driver-portal-frontend` (Angular 21 + NgRx)
  - `ocpi-simulator-ui` (Angular 19)
- React:
  - `admin-poratl-ui` (React 19 + Vite + TypeScript)

### Mobile Clients
- iOS:
  - `driver-portal-ios` (SwiftUI)

## 3. Protocol Inventory (Charging)
- OCPP scope:
  - Charge point WebSocket connectivity
  - Remote operations (start/stop/reset/etc.)
  - Connection tracking and command handling
- OCPP versions seen in code/config/UI:
  - `OCPP16J`
  - `OCPP201`
- OCPI scope:
  - Location/EVSE/connector representations
  - Sessions/CDR-related integration in OCPI service
  - Tariff/pricing OCPI mappings in pricing service
- OCPI version target:
  - Pricing service documents OCPI `2.2.1` compliance.
  - Final platform-wide version should be explicitly confirmed and tracked.
- Internal protocol surfaces:
  - REST, GraphQL, WebSocket, SSE, gRPC (present in platform patterns)

## 4. Charging Domain Model Map
- Location -> Charger -> EVSE -> Connector hierarchy
- Tariff / Price Plan associations (connector/tariff linkage)
- Session lifecycle with ownership and status transitions
- CDR/Billing downstream processing
- Availability semantics consumed by clients and protocols

## 5. Repository Layout (Workspace)
- Root workspace: `/Users/amolsurjuse/development/projects`
- Services and clients are organized in sibling directories per component.
- Mixed-language platform:
  - Java/Spring services
  - TypeScript frontends
  - Swift iOS
  - Go connector service

## 6. API / Contract Matrix (Current)
| Consumer | Interface | Endpoint / Channel | Owner |
|---|---|---|---|
| Angular Driver Portal | REST | `https://dev.electrahub.com:8443/{auth,user,payment,...}` | Gateway + services |
| React Admin Portal | REST | `https://dev.electrahub.com:8443/{auth,user,subscription,...}` | Gateway + services |
| iOS Driver App | REST/GraphQL/SSE | `/charger/graphql`, `/session/api/v1/sessions/*` | Charger + session services |
| Charger devices | WebSocket + OCPP commands | `ocpp-service` WS + command APIs | `ocpp-service` |
| OCPI peers/hubs | REST OCPI APIs/sync | `ocpi-service` | `ocpi-service` |

## 7. Key Service Ports (from README/config)
- `api-gateway`: `8090`
- `auth-service`: `8080`
- `station-management-service`: `8081`
- `session-service`: `8083`
- `ocpi-service`: `8084`
- `billing-service`: `8085`
- `charger-management-service`: `8086`
- `pricing-service`: `8092`
- `web-socket-connector`: `8091`

## 8. Build / Test Commands by Platform

### Java Services
- Build: `mvn clean package`
- Unit tests: `mvn test`
- Validation baseline: `mvn clean test && mvn verify`

### Angular
- Install: `npm install`
- Run: `npm run start`
- Build: `npm run build`
- Test: `npm run test`

### React (Vite)
- Install: `npm install`
- Run: `npm run dev`
- Build: `npm run build`
- Typecheck: `npm run typecheck`

### iOS
- Project: `/Users/amolsurjuse/development/projects/driver-portal-ios/DriverPortalIOS.xcodeproj`
- Use Xcode for full simulator/device build.
- In constrained CI/shell environments, full `xcodebuild` may be unavailable if Xcode app is not selected.

## 9. Story Impact Checklist (Mandatory)
For every story, explicitly mark:
- [ ] Backend service logic change
- [ ] OCPP behavior change
- [ ] OCPI payload/contract change
- [ ] REST/GraphQL/WebSocket/SSE/gRPC contract change
- [ ] Angular UI impact
- [ ] React UI/admin impact
- [ ] iOS impact
- [ ] DB schema/data migration impact
- [ ] Security/RBAC impact

## 10. Delivery Rules
- Approval-gated flow must be followed (`plan -> approval -> implementation -> validation -> PR approval`).
- No uncontrolled cross-module changes.
- No protocol contract changes without explicit verification impact notes.
- PRs must include protocol + client validation evidence when those dimensions are touched.

## 11. Known Constraints / Notes
- Workspace contains many parallel in-progress changes; always scope commits by explicit path.
- Some repos have separate Git roots, while client paths may be tracked from workspace root.
- OCPI version should be confirmed centrally and documented as a single source of truth.
