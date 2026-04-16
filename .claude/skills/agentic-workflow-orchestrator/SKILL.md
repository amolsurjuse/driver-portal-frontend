---
name: agentic-workflow-orchestrator
description: Multi-agent orchestration for Jira-based, approval-gated, full-SDLC delivery. Delegates each stage to a specialized agent, enforces gate controls, and covers the entire lifecycle from requirements through deployment and release.
---

# Agentic Workflow Orchestrator

## Overview

A multi-agent delivery system where each SDLC phase is handled by a dedicated agent skill. The orchestrator coordinates handoffs between agents, enforces approval gates, and tracks workflow state. Each agent produces defined outputs and declares readiness for the next agent.

## Agents (Execution Order)

| Seq | Agent | Skill Path | Responsibility |
|-----|-------|-----------|----------------|
| 01 | Requirements Agent | `agents/01-requirements-agent/SKILL.md` | Intake, transcription, sizing, Jira story creation |
| 02 | Story Analysis Agent | `agents/02-story-analysis-agent/SKILL.md` | Technical analysis, impact classification, DB/API/K8 impact |
| 03 | Planning Agent | `agents/03-planning-agent/SKILL.md` | Implementation plan, Stage 4 packet, Gate #1 |
| 04 | Jira Agent | `agents/04-jira-agent/SKILL.md` | Jira auth, create/update/transition, status sync |
| 05 | Implementation Agent | `agents/05-implementation-agent/SKILL.md` | Scoped code changes, branch creation, multi-repo coordination |
| 06 | Testing Agent | `agents/06-testing-agent/SKILL.md` | Unit, integration, contract, E2E testing |
| 07 | Security Agent | `agents/07-security-agent/SKILL.md` | SAST, dependency scan, secrets detection, OWASP |
| 08 | Quality Agent | `agents/08-quality-agent/SKILL.md` | JavaDoc, build validation, code quality, observability check |
| 09 | PR Agent | `agents/09-pr-agent/SKILL.md` | PR draft, Gate #2, PR creation, review feedback loop |
| 10 | Deployment Agent | `agents/10-deployment-agent/SKILL.md` | Post-merge CI/CD, staging validation, smoke tests, rollout |
| 11 | Release Agent | `agents/11-release-agent/SKILL.md` | Changelog, release notes, feature flag cleanup, documentation |

## Workflow State Machine

```text
INIT
  -> 01_REQUIREMENTS_INTAKE
  -> 02_STORY_ANALYSIS
  -> 03_PLAN_GENERATION
  -> GATE_1_APPROVAL (required pause)
  -> 04_JIRA_SYNC
  -> 05_IMPLEMENTATION
  -> 06_TESTING
  -> 07_SECURITY_SCAN
  -> 08_QUALITY_BUILD
  -> 09_PR_DRAFT
  -> GATE_2_APPROVAL (required pause)
  -> 09_PR_CREATION
  -> 10_DEPLOYMENT
  -> 11_RELEASE
  -> COMPLETE
```

## Failure States

```text
REQUIREMENTS_INCOMPLETE
ANALYSIS_BLOCKED
PLAN_INCOMPLETE
PLAN_REWORK_REQUIRED
JIRA_NOT_READY
JIRA_TRANSITION_FAILED
IMPLEMENTATION_FAILED
TEST_FAILED
INTEGRATION_TEST_FAILED
CONTRACT_TEST_FAILED
SECURITY_GATE_FAILED
QUALITY_GATE_FAILED
BUILD_FAILED
PR_BLOCKED
PR_REVIEW_REWORK
DEPLOYMENT_FAILED
STAGING_VALIDATION_FAILED
ROLLBACK_TRIGGERED
RELEASE_BLOCKED
K8_CHANGE_BLOCKED
DB_MIGRATION_BLOCKED
```

## Action Menu (First Response Rule)

When the user request is broad (e.g., "start workflow", "handle story", "use Jira flow"), present this menu and wait for selection:

1. Create Jira story from requirement (text or audio)
2. Pull Jira story and summarize
3. Generate plan only (pause for Gate #1 approval)
4. Implement approved plan
5. Run validation (tests + security + quality)
6. Prepare PR draft
7. Create PR (requires Gate #2 approval)
8. Deploy and validate
9. Release and close
10. Hotfix (fast-track)
11. Cancel current workflow

Button labels: `Create Jira`, `Pull Jira`, `Plan Only`, `Implement`, `Validate`, `PR Draft`, `Create PR`, `Deploy`, `Release`, `Hotfix`, `Cancel`

If the user's request already specifies one action clearly, skip menu and delegate to the correct agent directly.

## Agent Delegation Protocol

When dispatching work to an agent:

1. Load the agent's SKILL.md from `agents/<seq>-<name>/SKILL.md`.
2. Pass the **Agent Context Packet** containing:
   - `storyId`: Jira key (if available)
   - `currentStage`: workflow state
   - `previousOutput`: output from the prior agent
   - `impactDimensions`: classified impact areas
   - `approvalStatus`: gate decisions received so far
   - `branchName`: working branch (if created)
   - `repoList`: repos in scope for this story
3. Execute the agent's instructions.
4. Collect the **Agent Output Packet** containing:
   - `status`: `COMPLETE | FAILED | BLOCKED | REWORK_REQUIRED`
   - `artifacts`: list of files/outputs produced
   - `exitCriteria`: which criteria were met
   - `nextAgent`: recommended next agent (or gate)
   - `blockers`: any issues preventing handoff

## Stage Contract (Always Enforced)

For every response, include:

1. Current agent and stage
2. What was produced
3. Status (`COMPLETE`, `FAILED`, `BLOCKED`, `REWORK_REQUIRED`)
4. What approval/action is required next

## Gate Behavior

### Gate #1 — After Agent 03 (Planning)

Pause and ask:
1. Approve and continue
2. Rework required
3. Cancel story

Gate #1 may only be requested after a complete Stage 4 plan packet is shown (see Agent 03). If plan is incomplete, return `PLAN_INCOMPLETE` and rework.

### Gate #2 — After Agent 09 (PR Draft)

Pause and ask:
1. Approve PR creation
2. Rework required
3. Cancel story

### Gate #3 — After Agent 10 (Deployment) [NEW]

Pause and ask:
1. Promote to production
2. Rollback required
3. Hold for next release window

## Hotfix Path

For production hotfixes, use expedited flow:

1. Agent 01 (requirements — abbreviated)
2. Agent 03 (plan — abbreviated, Gate #1 still required)
3. Agent 05 (implementation)
4. Agent 06 (testing — unit + smoke only)
5. Agent 09 (PR — base branch: `main` or `release/*`)
6. Agent 10 (deployment — direct to production)

Branch naming for hotfix: `hotfix/<JIRA-ID>-<short-slug>`

## Skill Routing Rules

### UI / iOS

When impacted area includes web UI or iOS, load before planning:
- Angular: `/Users/amolsurjuse/development/projects/project-skills/driver-portal-frontend/SKILL.md`
- iOS: `/Users/amolsurjuse/development/projects/project-skills/driver-portal-ios/SKILL.md`

### K8 Config Governance

When backend properties/flags/env vars/secrets change, load:
- `/Users/amolsurjuse/development/projects/project-skills/k8-config-governance/SKILL.md`
- `/Users/amolsurjuse/development/projects/project-skills/k8s-platform/SKILL.md`

### Service-Specific Skills

Load matching project skill from `/Users/amolsurjuse/development/projects/project-skills/<service>/SKILL.md` for the impacted service.

## Branch Naming Standard

| Issue Type | Pattern | Example |
|-----------|---------|---------|
| Story/Task/Enhancement | `feature/<JIRA-ID>-<slug>` | `feature/KAN-456-connector-pricing` |
| Bug/Defect | `defect/<JIRA-ID>-<slug>` | `defect/KAN-789-null-tariff-fix` |
| Hotfix | `hotfix/<JIRA-ID>-<slug>` | `hotfix/KAN-999-session-crash` |

PR base branch: `develop` (default), `main` (hotfix), or user-specified.

## Multi-Repo Coordination

When a story spans multiple repos:

1. Agent 03 (Planning) must list all repos in scope with per-repo change summary.
2. Agent 05 (Implementation) creates branches in each repo.
3. Agent 06 (Testing) validates cross-service contracts.
4. Agent 09 (PR) creates linked PRs with deployment ordering notes.
5. Agent 10 (Deployment) enforces deploy order (typically: DB migrations → backend → frontend/mobile).

## K8 Completion Rule

If backend config keys change and result is `K8_CHANGE_REQUIRED`, do not mark workflow complete until:
1. Required `k8s-platform` updates are implemented, or
2. Blocker is documented as `K8_CHANGE_BLOCKED`.

## References

- `references/workflow-menu.md` — ready-to-send prompts and gate responses
- `agents/` — individual agent skill definitions
