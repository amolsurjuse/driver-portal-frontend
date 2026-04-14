# Local TeamCity Patterns

## Contents
- REST-provisioned service pipeline
- Versioned settings pipeline
- Local server access
- Build and repair heuristics

## REST-Provisioned Service Pipeline
Use this pattern when a backend service needs a TeamCity project created or repaired through the REST API.

Reference:
- `payment-service/ci/teamcity/setup_pipeline.sh`
- `payment-service/ci/teamcity/README.md`

What this pattern already demonstrates:
- Creating the TeamCity project and build configuration idempotently
- Creating or attaching a VCS root
- Defining Maven and Docker build steps
- Supplying secure parameters through TeamCity instead of the repo
- Adding a VCS trigger after the pipeline exists

Reuse this pattern when the project is another service with similar `build -> image -> deploy-tag` flow.

## Versioned Settings Pipeline
Use this pattern when the repository should remain the source of truth for the TeamCity configuration.

Reference:
- `driver-portal-frontend/.teamcity/settings.kts`
- `driver-portal-frontend/ci/teamcity/README.md`
- `driver-portal-frontend/ci/teamcity/deploy_driver_portal.sh`

What this pattern already demonstrates:
- TeamCity Kotlin DSL checked into the repo
- A single deploy script called by TeamCity
- Secure parameters supplied in TeamCity UI
- Optional dry-run behavior

Reuse this pattern when the project already embraces repo-managed CI config or needs a more maintainable pipeline definition.

## Local Server Access
Current local TeamCity URL:
- `http://localhost:8111`

Preferred auth order:
1. `TEAMCITY_TOKEN` environment variable
2. Super-user token from local TeamCity logs

Use `../scripts/teamcity_local.sh` from the skill directory to:
- inspect the server
- inspect a build type
- list the queue
- list agents
- list compatible agents
- trigger a build

## Build And Repair Heuristics
- Read the build type before changing it.
- Read the queue before triggering another build.
- If a build is queued, treat `waitReason` as the first debugging clue.
- If compatible agents return zero, inspect agent properties before editing build steps.
- If a step body looks malformed or contains pasted unrelated content, rebuild that step from repo source instead of patching line by line.
- Prefer rerunning an idempotent provisioning script over manual UI edits for REST-managed pipelines.
