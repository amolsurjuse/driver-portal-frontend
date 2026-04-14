# Step-by-Step Implementation Blueprint (Angular + React + iOS + OCPP/OCPI)

Use this blueprint for protocol-aware feature delivery.

## 1. Story Intake
- Capture Jira + acceptance criteria.
- Tag whether story touches OCPP, OCPI, or both.
- Tag impacted clients: Angular, React, iOS.

## 2. Cross-Impact Analysis
- Backend/service impact
- Protocol contract impact (OCPP/OCPI)
- API surface impact (REST/GraphQL/WebSocket/SSE)
- Client impact by platform

## 3. Plan and Approval Gate
- Produce file/module-level implementation plan.
- Include protocol compliance and cross-client validation steps.
- Wait for explicit approval.

## 4. Backend Implementation
- Apply service/domain/repository changes.
- Update API/GraphQL contracts.
- Add logs + JavaDoc for new classes/methods.
- Add/update unit tests.

## 5. Protocol Validation
### OCPP
- Validate message flow and command semantics.
- Validate state transitions and transaction/session linkage.

### OCPI
- Validate payload shape and field mapping (location/EVSE/connector/tariff/session/CDR).
- Validate status semantics and timestamp handling.

## 6. Client Alignment
### Angular
- Update data models + service calls + UI states.
- Validate build/test commands.

### React
- Update page flow/components + API adapters.
- Validate build/typecheck.

### iOS
- Update Swift models/services/views and state logic.
- Validate typecheck/build in available environment.

## 7. End-to-End Verification
- Verify key scenarios across protocols and clients:
  - Charger list/detail correctness
  - Start/Stop ownership behavior
  - Connector and tariff visibility
  - Status and availability consistency

## 8. Quality and Build Gates
- Run `mvn clean test` and `mvn verify` for impacted Java services.
- Run frontend/mobile build validations where relevant.
- Perform security/logging/quality checks.

## 9. PR Packaging
- Include protocol impact section.
- Include client impact section.
- Include evidence for tests and validation.
- Include risks and rollback notes.

## 10. Final Approval and PR Creation
- Wait for explicit PR approval.
- Create PR with Jira linkage and validation artifacts.
