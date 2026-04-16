# Workflow Menu Prompts

## Session Kickoff Prompt

```text
Use $agentic-workflow-orchestrator.
Use /.ai/master-agent-prompt.md and related .ai templates.
For backend config/flag/secret stories also use /.ai/k8-repository-standardization-plan.md.
Start with the action menu and wait for my selection.
```

## Gate #1 — Plan Approval (After Agent 03)

### Approve
```text
Gate #1 approved. Proceed in approved scope only.
```

### Rework
```text
Gate #1 rejected. Rework plan with these corrections:
1) <correction>
2) <correction>
```

### Cancel
```text
Gate #1 cancelled. Abort story.
```

## Gate #2 — PR Approval (After Agent 09)

### Approve
```text
Gate #2 approved. Create PR.
```

### Rework
```text
Gate #2 rejected. Address these issues:
1) <issue>
2) <issue>
```

### Cancel
```text
Gate #2 cancelled. Do not create PR.
```

## Gate #3 — Production Promotion (After Agent 10)

### Promote
```text
Gate #3 approved. Promote to production.
```

### Rollback
```text
Gate #3 rejected. Rollback staging deployment.
```

### Hold
```text
Gate #3 hold. Keep on staging for manual validation.
```

## Agent Delegation Quick Reference

| Agent | Trigger Command | Description |
|-------|----------------|-------------|
| 01 — Requirements | "Create Jira" | Intake, transcribe, size, draft story |
| 02 — Story Analysis | Auto (after 01) | Technical analysis, scope detection |
| 03 — Planning | Auto (after 02) | Full plan packet, Gate #1 |
| 04 — Jira | Auto (after 01/03/05/09/11) | Create/update/transition Jira |
| 05 — Implementation | "Implement" or Gate #1 approved | Branch, code, migrate, feature flags |
| 06 — Testing | Auto (after 05) | Unit, integration, contract, E2E, perf |
| 07 — Security | Auto (after 06) | Dependency scan, SAST, secrets, RBAC |
| 08 — Quality | Auto (after 07) | JavaDoc, build, quality, observability |
| 09 — PR | "Create PR" or auto (after 08) | PR draft, Gate #2, review loop |
| 10 — Deployment | Auto (after 09 merge) | CI/CD, staging, smoke, Gate #3, rollout |
| 11 — Release | Auto (after 10) | Changelog, docs, flag cleanup, Jira close |

## Hotfix Fast-Track

For hotfix stories, the orchestrator may compress the agent chain:

```text
Hotfix mode: Skip Agent 02 deep analysis.
Agents 03→05→06→07→08→09 execute with expedited gates.
Base branch: main (not develop).
```

## Resume / Re-Enter Workflow

To resume a workflow mid-flight:

```text
Resume workflow for [JIRA-KEY].
Last completed agent: <agent number>.
Continue from Agent <next agent number>.
```
