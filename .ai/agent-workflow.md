# AI-Assisted Engineering Delivery Workflow

## Purpose
This document defines a controlled, approval-gated workflow for AI-assisted engineering delivery in enterprise repositories.

## Core Flow
1. Project context initialization
2. Requirement intake
3. Story analysis
4. Plan generation
5. Plan approval gate
6. Jira create/update
7. Code implementation
8. Local verification
9. Unit test update
10. JavaDoc update
11. Quality/security review
12. Maven build and validation
13. PR draft preparation
14. Final approval gate
15. PR creation

## Required Agent Roles
- `Project Context Agent`: builds reusable knowledge of repo, stack, commands, conventions.
- `Story Analysis Agent`: translates business intent into technical scope.
- `Planning Agent`: proposes phased implementation and risks.
- `Implementation Agent`: applies scoped changes after approval.
- `Validation Agent`: executes test strategy and reports outcomes.
- `Quality Agent`: JavaDoc, quality, Sonar/security checks.
- `PR Agent`: prepares PR package and reviewer-ready summary.

## Approval Gates
- No code changes before explicit plan approval.
- No PR creation before explicit final approval.

## Stage Exit Criteria (Minimum)
- Analysis complete: impacted modules, assumptions, risks identified.
- Plan complete: files/modules, test strategy, risk notes, assumptions listed.
- Implementation complete: scoped changes compile.
- Validation complete: unit tests pass for changed behavior.
- Quality complete: JavaDoc for new classes/methods + quality/security checks done.
- Build complete: `mvn clean test` and `mvn verify` pass (or failures documented).

## State Machine
```text
INIT_PROJECT_CONTEXT
  -> READ_REQUIREMENT
  -> ANALYZE_STORY
  -> GENERATE_PLAN
  -> WAIT_FOR_PLAN_APPROVAL
  -> CREATE_OR_UPDATE_JIRA
  -> IMPLEMENT_CHANGES
  -> LOCAL_VERIFY
  -> ADD_OR_UPDATE_UNIT_TESTS
  -> ADD_JAVADOC
  -> RUN_QUALITY_CHECKS
  -> RUN_BUILD_AND_TEST_VALIDATION
  -> PREPARE_PR_DRAFT
  -> WAIT_FOR_PR_APPROVAL
  -> CREATE_PR
  -> COMPLETE
```

## Failure States
- `PLAN_REWORK_REQUIRED`
- `IMPLEMENTATION_FAILED`
- `BUILD_FAILED`
- `TEST_FAILED`
- `QUALITY_GATE_FAILED`
- `PR_BLOCKED`

## Guardrails
- Do not modify unrelated modules.
- Do not upgrade dependencies without approval.
- Do not suppress failing tests to make builds pass.
- Do not expose secrets/PII in logs.
- Always report: what changed, why, validation status, residual risks.

## Recommended `.ai/` Layout
```text
.ai/
  agent-workflow.md
  project-context-template.md
  jira-template.md
  pr-template.md
  master-agent-prompt.md
```
