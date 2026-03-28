# Project Understanding (Current Snapshot)

This is a practical project understanding snapshot based on the current workspace layout.

## 1. Portfolio Shape
The workspace is a multi-service platform with:
- Java/Spring Boot backend microservices
- Angular frontend(s)
- React admin UI
- SwiftUI iOS client
- Protocol-facing charging services (OCPP + OCPI)

## 2. Identified Clients
### Angular
- `driver-portal-frontend` (Angular 21 + NgRx)
- `ocpi-simulator-ui` (Angular)

### React
- `admin-poratl-ui` (React 19 + Vite + TypeScript)

### iOS
- `driver-portal-ios` (SwiftUI, Xcode project)

## 3. Identified Protocol Services
### OCPP
- `ocpp-service`
- WebSocket endpoint for charge point communication
- Remote command APIs (remote-start, remote-stop, reset, etc.)

### OCPI
- `ocpi-service`
- OCPI APIs and synchronization jobs (locations/sessions/CDRs per README)

### Bridge / Related
- `ocpp-ocpi-service`
- `charger-management-service` (GraphQL + OCPI-shaped charger data in ES)
- `session-service` (session lifecycle)
- `pricing-service` (tariff/price plan domain)

## 4. Gateway and Routing
- `api-gateway` fronts service routes and RBAC/JWT.
- Charger APIs are exposed under `/charger/**`.
- GraphQL endpoint used by clients: `/charger/graphql`.

## 5. What Is Currently Missing in AI Workflow Docs (Now Addressed)
Previously missing dimensions were:
- explicit Angular/React/iOS impact tracking
- explicit OCPP/OCPI impact tracking
- protocol + client validation requirements in Jira/PR templates

These are now added in:
- `.ai/project-context-template.md`
- `.ai/jira-template.md`
- `.ai/pr-template.md`
- `.ai/master-agent-prompt.md`

## 6. Implementation Planning Lens (for upcoming features)
For any new story, planning should explicitly answer:
1. Does it change OCPP behavior (device message flow/commands/state)?
2. Does it change OCPI behavior (payload contract/sync semantics/statuses)?
3. Does it change GraphQL/REST contracts consumed by Angular/React/iOS?
4. Does it require cross-client UI updates to keep behavior consistent?
5. Does it affect charging ownership/state rules (AVAILABLE/CHARGING/OUTOFORDER)?

## 7. Suggested Protocol-Safe Delivery Sequence
1. Backend domain and contract update (with tests)
2. OCPP/OCPI compliance checks and mapping validation
3. Gateway/routing/auth validation
4. Angular/React/iOS client alignment
5. End-to-end scenario validation (start/stop/ownership/status transitions)

## 8. Immediate Next Fill-In Task
Populate `.ai/project-context.md` (from template) with:
- exact OCPI version target
- exact OCPP version/feature support matrix
- per-client contract matrix (Angular/React/iOS endpoints)
- canonical charging state-transition rules
