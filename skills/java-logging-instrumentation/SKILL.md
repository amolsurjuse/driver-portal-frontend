---
name: java-logging-instrumentation
description: Instrument Java repositories with meaningful debug and info logs at class and method level. Use when asked to add contextual execution-flow logs, business-event logs, and branch/loop diagnostics without excessive verbosity or behavior changes.
---

# Java Logging Instrumentation

## Overview

Apply repository-wide logging improvements that make execution flow and business outcomes observable while preserving existing behavior and avoiding log noise.

## Logging Goals

- Use `debug` for decision paths, branch selection, loop progression, retries, and intermediate state.
- Use `info` for significant business milestones, state transitions, successful completion of key operations, and externally visible outcomes.
- Keep logs structured, parameterized, and safe.

## Workflow

1. Build scope and detect logger style.
- Run `rg --files -g '*.java'`.
- Exclude generated/build paths: `target/`, `build/`, `.m2/`, `out/`, `generated/`.
- Detect existing logging convention:
  - Lombok `@Slf4j` with `log.info/debug`.
  - SLF4J `LoggerFactory` with `LOGGER.info/debug`.
- Preserve existing convention per file.

2. Identify key execution points per method.
- Entry/exit points for major operations.
- Validation branches and guard clauses.
- Conditional business branches.
- Loop checkpoints for non-trivial iteration.
- External boundaries: DB, cache, HTTP, MQ, filesystem.

3. Add `debug` logs for flow visibility.
- Log branch decisions and why branch was taken.
- Log loop progress at meaningful cadence.
- Log retry attempts and backoff decisions.
- Log transformed/intermediate identifiers, not full payloads.

4. Add `info` logs for business visibility.
- Log meaningful outcomes, not every step.
- Log create/update/delete outcomes with IDs and status.
- Log successful completion for long or important operations.
- Log integration outcomes when business-relevant.

5. Keep logs safe and efficient.
- Use parameterized logging: `LOGGER.info("Updated plan {} for tenant {}", planId, tenantId);`
- Never log secrets, tokens, passwords, raw payment details, or full PII.
- Avoid expensive object serialization in debug statements.
- Guard expensive debug payload creation with `if (LOGGER.isDebugEnabled())`.

6. Respect language/runtime constraints.
- Do not place statements before `super(...)` or `this(...)` in constructors.
- Do not alter method signatures, control flow, or return values.
- Do not inject logs into comments, annotations, record headers, or enum constant declarations.

7. Validate and tune.
- Compile: `./mvnw -q -DskipTests compile` or `mvn -q -DskipTests compile`.
- Run test suite where feasible.
- Remove noisy or duplicate logs discovered in review.

8. Report changes.
- Provide file count, method count, and notable instrumentation points.
- Call out any intentionally skipped noisy paths.

## Severity Mapping

- `info`: operation start/end for key workflows, business success/failure summaries, state transitions.
- `debug`: branches, calculated intermediate values, loop/retry internals, optional deep diagnostics.

## Fast Quality Checklist

- Every touched class follows existing logger convention.
- Debug logs exist at meaningful branches/loops where flow is ambiguous.
- Info logs exist for major business outcomes.
- No sensitive values are logged.
- No string concatenation for log templates.
- Project compiles after instrumentation.

## Reference

Use [Logging Patterns](references/logging-patterns.md) for templates by class type and decision point.
