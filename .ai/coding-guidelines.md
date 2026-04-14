# Coding Guidelines (AI Execution)

## General
- Follow existing project architecture and package conventions.
- Keep changes minimal and scoped to approved modules/files.
- Avoid unrelated refactors.

## Java and Spring Boot
- Use clear class and method naming.
- Keep service-layer business rules explicit and testable.
- Use constructor injection.
- Validate request models at boundaries.

## Logging
- Use meaningful `info` logs for significant business outcomes.
- Use `debug` logs for decision branches and troubleshooting context.
- Do not log secrets, tokens, or sensitive PII.

## Exceptions
- Prefer explicit, domain-relevant exceptions.
- Do not swallow exceptions.
- Return consistent error responses at API boundaries.

## JavaDoc
- Add class-level JavaDoc for all new classes.
- Add method-level JavaDoc for newly introduced methods.
- Document purpose, parameters, return values, and notable behavior.

## Testing
- Add/update unit tests for all changed behavior.
- Cover happy path, validation failures, and edge cases.
- Keep tests deterministic and readable.

## Quality Gates
- Ensure code compiles and tests pass before PR.
- Run:
  - `mvn clean test`
  - `mvn verify`
- Address major Sonar/security issues in changed scope.

## PR Hygiene
- Include Jira reference.
- Summarize business and technical impact.
- Provide test evidence.
- List risks and rollback notes when relevant.
