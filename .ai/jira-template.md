# Jira Story Template (AI Delivery)

## Title
`[Service/Module] <clear business change>`

## Story ID
- Jira Key:

## Business Context
- Problem statement:
- Why this change is needed now:
- Target users and impact:

## Scope
### In Scope
- 

### Out of Scope
- 

## Functional Requirements
1. 
2. 
3. 

## Protocol and Platform Impact
### Protocols
- OCPP impact (Yes/No + details):
- OCPI impact (Yes/No + details):
- Other protocol/channel impact (REST/GraphQL/WebSocket/SSE/gRPC):

### Clients
- Angular impact:
- React impact:
- iOS impact:

## Technical Notes
- Impacted services/modules:
- Impacted APIs/contracts:
- Data model/config changes:
- Backward compatibility considerations:

## Assumptions
- 

## Dependencies
- Internal dependencies:
- External dependencies:

## Risks
- 

## Acceptance Criteria (Given / When / Then)
1. Given ... When ... Then ...
2. Given ... When ... Then ...
3. Given ... When ... Then ...

## Validation Plan
- Unit tests to add/update:
- Integration tests to run:
- Protocol compliance checks (OCPP/OCPI where relevant):
- Cross-client checks (Angular/React/iOS where relevant):
- Build commands:
  - `mvn clean test`
  - `mvn verify`

## Observability / Logging Notes
- New logs expected:
- Metrics/tracing impact:

## Rollout / Rollback
- Rollout approach:
- Rollback approach:

## Definition of Done
- [ ] Plan approved
- [ ] Implementation completed in approved scope
- [ ] Unit tests updated and passing
- [ ] JavaDoc added for new classes/methods
- [ ] Quality/security checks completed
- [ ] Build/verify passed
- [ ] OCPP/OCPI behavior validated (if in scope)
- [ ] Angular/React/iOS impact validated (if in scope)
- [ ] PR raised with evidence
