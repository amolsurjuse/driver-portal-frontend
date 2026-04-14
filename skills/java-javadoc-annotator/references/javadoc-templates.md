# Javadoc Templates

## Class-Level Template

```java
/**
 * Manage pricing plan lifecycle operations including creation, updates, and retrieval.
 *
 * <p>Coordinate validation, persistence, and downstream publication for plan changes.
 */
```

## Method Template (Non-void)

```java
/**
 * Calculate the total invoice amount for the provided billing items.
 *
 * <p>Apply configured tax and discount rules before returning the final amount.
 *
 * @param lineItems billing line items included in the invoice calculation.
 * @param currency target currency code for the total amount.
 * @return computed final invoice amount in the requested currency.
 * @throws IllegalArgumentException when line items are empty or currency is unsupported.
 */
```

## Method Template (Void)

```java
/**
 * Publish a tariff update event for the specified connector.
 *
 * <p>Send the event to the configured event bus after payload serialization.
 *
 * @param connectorId connector identifier associated with the tariff change.
 * @param payload tariff update payload to publish.
 * @throws EventPublishException when serialization or transport fails.
 */
```

## Constructor Template

```java
/**
 * Create a payment reconciliation service with required dependencies.
 *
 * @param paymentRepository repository used to fetch payment transactions.
 * @param meterRegistry metrics registry used to publish reconciliation metrics.
 */
```

## Getter/Setter Template (Strict Sweep)

```java
/**
 * Return the current settlement status.
 *
 * @return settlement status for this transaction.
 */
```

```java
/**
 * Set the settlement status.
 *
 * @param status settlement status to assign.
 */
```

## Interface Method Template

```java
/**
 * Resolve the active tariff for the provided connector.
 *
 * @param connectorId connector identifier used for tariff lookup.
 * @return active tariff details when available.
 */
```

## Wording Rules

- Prefer behavior and intent over implementation trivia.
- Mention side effects when method performs persistence, external I/O, publishing, or cache invalidation.
- Do not mention framework internals unless required for behavior clarity.
- Keep tags aligned with method signature exactly.
