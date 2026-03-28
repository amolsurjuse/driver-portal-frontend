# Logging Patterns

## Controller Pattern

```java
LOGGER.info("Received create-pricing request for tenant {}", tenantId);
LOGGER.debug("Create-pricing payload contains {} components", payload.components().size());
```

```java
LOGGER.info("Created pricing plan {} for tenant {}", planId, tenantId);
```

## Service Pattern

```java
LOGGER.info("Starting tariff synchronization for provider {}", providerId);
LOGGER.debug("Tariff sync batch size={}, retryEnabled={}", batchSize, retryEnabled);
```

```java
if (existingPlan.isPresent()) {
    LOGGER.debug("Existing plan found for externalId={}, performing update", externalId);
} else {
    LOGGER.debug("No existing plan found for externalId={}, creating new record", externalId);
}
```

```java
LOGGER.info("Completed tariff synchronization for provider {} with {} records", providerId, processedCount);
```

## Repository / Persistence Pattern

```java
LOGGER.debug("Querying sessions by chargerId={} and state={}", chargerId, state);
LOGGER.info("Persisted charging session {} with status {}", sessionId, status);
```

## Integration Client Pattern

```java
LOGGER.info("Calling billing-service to generate invoice for session {}", sessionId);
LOGGER.debug("Billing request timeout={}ms, endpoint={}", timeoutMs, endpoint);
```

```java
LOGGER.info("Billing-service responded with invoiceId={} for session {}", invoiceId, sessionId);
```

## Loop and Retry Pattern

```java
for (int i = 0; i < items.size(); i++) {
    if (LOGGER.isDebugEnabled() && i % 50 == 0) {
        LOGGER.debug("Processing item index={} of total={}", i, items.size());
    }
    // business logic
}
```

```java
for (int attempt = 1; attempt <= maxRetries; attempt++) {
    LOGGER.debug("Attempt {} of {} for command {}", attempt, maxRetries, commandId);
}
```

## Sensitive Data Rules

- Log IDs, counts, status codes, and flags.
- Mask or avoid personal identifiers and financial secrets.
- Avoid full request/response dumps unless redaction is guaranteed.

## Anti-Patterns to Avoid

- `LOGGER.info("result=" + result);` (string concatenation)
- Entry/exit info logs for every small helper method.
- Duplicating the same info message in nested layers.
- Logging stack traces at info level.
