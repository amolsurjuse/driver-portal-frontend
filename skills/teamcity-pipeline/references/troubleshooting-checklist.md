# TeamCity Troubleshooting Checklist

## Contents
- Access and identity
- Queued builds
- Agent compatibility
- VCS and secrets
- Broken or drifted configuration

## Access And Identity
- Confirm the TeamCity URL before doing anything else.
- Confirm the exact build type external ID from the URL or REST API.
- Confirm authentication works with a read-only call such as `/app/rest/server` or `/app/rest/buildTypes/id:<id>`.

## Queued Builds
When a build is queued:
- Read the queue item, not just the build list.
- Capture `waitReason`, queue time, triggering user, and branch.
- Do not enqueue duplicates unless the queue item is clearly obsolete or the user requests another build.

Helpful calls:
```bash
scripts/teamcity_local.sh queue
scripts/teamcity_local.sh build 902
```

## Agent Compatibility
When the queue says no idle compatible agents:
- List connected, enabled, authorized agents.
- Query compatible agents for the target build type.
- Inspect agent properties for the runners the build uses: Docker, Maven, Java, Node, or custom tools.
- Compare the build steps with the actual agent capabilities.

Typical causes:
- Docker steps but no `docker.server.version` capability on an eligible agent
- Tooling mismatch between the runner and the agent image
- Disabled or disconnected agents
- Hidden drift in the build config after manual edits

## VCS And Secrets
If checkout or downstream push fails:
- Confirm the VCS root points at the expected repo and branch.
- Confirm secure parameters exist in TeamCity and are inherited where expected.
- Confirm the repo workflow still matches the file paths in the build steps.
- Prefer password parameters and inherited project parameters over plaintext literals.

## Broken Or Drifted Configuration
Use this sequence:
1. Read the current build type JSON from REST.
2. Compare steps, parameters, triggers, and VCS roots with the repository source of truth.
3. If the repo owns the config, fix the repo and let TeamCity resync.
4. If a provisioning script owns the config, fix the script and rerun it idempotently.
5. If a single step is clearly corrupted, recreate the step cleanly instead of editing a malformed payload in place.

When a step script contains unrelated pasted content or invalid shell, treat that as corruption rather than a normal test failure.
