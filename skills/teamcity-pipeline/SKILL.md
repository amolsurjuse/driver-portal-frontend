---
name: teamcity-pipeline
description: Create, trigger, inspect, and repair TeamCity pipelines for projects in this workspace. Use when Codex needs to build a project in TeamCity, provision a new TeamCity pipeline, debug queued or failed builds, repair broken build steps or parameters, inspect agent compatibility, or work with local TeamCity at http://localhost:8111.
---

# TeamCity Pipeline

## Outcome
Operate TeamCity pipelines in this workspace without rediscovering the local server layout, authentication flow, or existing pipeline patterns.

## Workflow
1. Confirm whether the task is to trigger a build, create a new pipeline, or repair an existing one.
2. Establish TeamCity access and inspect the target build configuration before changing anything.
3. Reuse an existing local pattern instead of inventing a new pipeline shape.
4. Apply the smallest safe change through versioned settings or the REST API.
5. Verify the result in the build queue, build history, and agent compatibility view.

## 1. Establish Access
Use `scripts/teamcity_local.sh` for routine REST calls.

Rules:
- Prefer `TEAMCITY_TOKEN` if it is already set.
- For local Docker-based TeamCity, let the helper discover the super-user token from local logs when no token is provided.
- Read the current build type, queue, and compatible agents before triggering or repairing a build.
- Avoid editing TeamCity blindly from the UI when the repository already contains versioned settings or provisioning scripts.

Useful commands:
```bash
scripts/teamcity_local.sh server
scripts/teamcity_local.sh build-type Amy_AuthService_Build
scripts/teamcity_local.sh queue
scripts/teamcity_local.sh agents
scripts/teamcity_local.sh compatible Amy_AuthService_Build
scripts/teamcity_local.sh trigger Amy_AuthService_Build
```

## 2. Trigger Or Inspect A Build
Use this path when the user asks to build an existing project.

Process:
- Read the build type first to confirm the exact external ID and parameters.
- Check the queue before enqueuing another build; avoid duplicates unless the user clearly wants a second run.
- If a build is queued, inspect `waitReason` and compatible agents before making changes.
- If a build is running or has recently failed, inspect the latest build details and logs before editing configuration.

Focus checks:
- `buildQueue/id:<id>` for `waitReason`
- `buildTypes/id:<id>` for steps, parameters, triggers, and VCS roots
- `agents?locator=compatible:(buildType:(id:<id>))` for scheduling issues

## 3. Create A New Pipeline
Use this path when a project does not yet have a TeamCity build configuration.

Choose the implementation style from the repository first:
- Use versioned settings when the repo already has `.teamcity/settings.kts` or is a good fit for Kotlin DSL.
- Use an idempotent provisioning script when sibling services already create TeamCity projects through REST.

Local patterns:
- Read `references/local-teamcity-patterns.md`.
- Reuse the REST provisioning approach from `payment-service/ci/teamcity/setup_pipeline.sh` for service-style pipelines.
- Reuse the versioned-settings approach from `driver-portal-frontend/.teamcity/settings.kts` and `driver-portal-frontend/ci/teamcity/README.md` for UI or scripted deploy pipelines.

Minimum creation checklist:
- Create or confirm the TeamCity project.
- Create or attach the correct VCS root.
- Add build steps in repository order.
- Add secure parameters instead of hardcoding secrets.
- Add a trigger only after the manual path works.
- Verify at least one compatible agent exists.

## 4. Repair A Broken Pipeline
Use this path when the build config exists but is failing, stuck in queue, or clearly malformed.

Repair order:
1. Inspect the current config through REST before editing anything.
2. Compare it with the source of truth in the repository.
3. Fix the smallest broken layer first: queueing, agent compatibility, VCS auth, parameters, step script, or versioned settings sync.
4. Re-run the build and confirm the failure mode changed or cleared.

Common failure buckets:
- Build stuck in queue: inspect compatible agents, runner requirements, and disabled or busy agents.
- VCS or secret failures: confirm secure parameters exist and inherited values resolve.
- Corrupted step content: replace the step from repository source or recreate it cleanly through REST.
- Drift between TeamCity and repo: prefer updating versioned settings or rerunning the provisioning script, not manual UI patching.

Use `references/troubleshooting-checklist.md` for the detailed diagnostic sequence.

## 5. Verify The Result
Always close the loop after changes.

Verification:
- Confirm the build appears in queue or history with the expected build type ID.
- Confirm at least one compatible agent is available.
- Confirm the latest build leaves the queue and starts on an agent.
- If the pipeline updates another repo or deployment target, confirm the downstream artifact or commit was produced.

## References
- `references/local-teamcity-patterns.md` for workspace-specific examples and pipeline shapes.
- `references/troubleshooting-checklist.md` for queue, agent, VCS, and step-corruption debugging.
