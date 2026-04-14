---
name: java-javadoc-annotator
description: Create and standardize class-level and method-level Javadocs across Java repositories. Use when asked to document every Java class and method, fill missing @param/@return tags, clarify responsibilities, or improve maintainability without changing runtime behavior.
---

# Java Javadoc Annotator

## Overview

Apply a repository-wide Java documentation sweep that adds or improves class and method Javadocs with accurate behavior, parameter, return, side-effect, and exception descriptions.

## Execution Mode

Use `strict sweep` mode by default.

- `strict sweep`: Document every class and every method in in-scope Java files, including private methods and test classes.
- `production sweep`: Skip test sources unless user explicitly asks to include them.

## Workflow

1. Build scope first.
- Run `rg --files -g '*.java'` from repo root.
- Exclude generated/build output paths: `target/`, `build/`, `.m2/`, `out/`, `generated/`.
- Keep only tracked sources unless user explicitly asks to include untracked files.

2. Map each class responsibility before writing comments.
- Read imports, annotations, implemented interfaces, injected dependencies, and key methods.
- Summarize one core responsibility and optional secondary responsibility.
- Avoid generic text like "handles operations".

3. Add class-level Javadoc.
- Place above class/interface/enum/record declarations.
- Describe what the type represents or orchestrates.
- Mention major side effects for service/integration classes.

4. Add method-level Javadoc.
- Add Javadocs for methods that do not have one.
- Improve low-quality Javadocs that only restate method names.
- Include:
  - one-sentence purpose,
  - behavioral detail (validation, transformation, persistence, external call),
  - `@param` for each parameter,
  - `@return` for non-void return types,
  - `@throws` for declared or explicit exceptional outcomes.

5. Handle special method types safely.
- Constructors: document initialization intent and important invariants.
- Overridden interface methods: describe behavior in current implementation, not only interface name.
- Getters/setters in strict mode: keep concise but still explicit.
- Generic methods: explain type expectations and constraints.

6. Keep behavior unchanged.
- Do not rename methods, change signatures, reorder logic, or alter control flow.
- Do not introduce syntax patterns unsupported by project Java version.
- Keep Javadocs deterministic and factual from code evidence.

7. Validate after edits.
- Compile at minimum: `./mvnw -q -DskipTests compile` or `mvn -q -DskipTests compile`.
- If repository has required linters/checkstyle, run them.
- Fix malformed block comments immediately.

8. Report completion.
- Share number of files and methods documented.
- Call out skipped files and reasons.
- Call out any assumptions made when intent was ambiguous.

## Writing Rules

- Use imperative and concrete language.
- Prefer `@param accountId unique account identifier used for wallet lookup.` over vague text.
- Keep one-line summary plus concise detail paragraph where needed.
- Avoid repeating obvious type info unless behavior requires it.
- Avoid speculative business statements not supported by code.

## Fast Quality Checklist

- Every in-scope class has a class-level Javadoc.
- Every in-scope method has method-level Javadoc in strict mode.
- Every method parameter has a matching `@param` tag.
- Every non-void method has a matching `@return` tag.
- `@throws` tags match real error paths.
- Project compiles after changes.

## Reference

Use [Javadoc Templates](references/javadoc-templates.md) for reusable wording patterns and examples.
