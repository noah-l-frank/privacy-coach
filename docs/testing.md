# Testing Strategy

The project uses three different testing levels to validate the application at different layers.

## Unit Tests

Unit tests are written with Vitest and focus on isolated logic.

Structure:

```text
src/
  services/
    __tests__/
      unit/
        detection.test.ts
        questions/
        recommendations/
        scoring/
  stores/
    __tests__/
      unit/
```

Unit tests cover:

- detection logic
- question flow rules
- question content consistency
- recommendation rules
- recommendation content consistency
- scoring rules
- store state behavior

The rule-based parts of the application are tested in isolation. This keeps the decision logic easier to verify and reduces the need for large, fragile engine tests.

## Integration Tests

Integration tests are written with Vitest and validate how related service modules work together.

Structure:

```text
src/
  services/
    __tests__/
      integration/
        questions.test.ts
        recommendations.test.ts
        scoring.test.ts
```

Integration tests cover:

- selecting the next follow-up question
- generating final recommendations
- calculating the final privacy score

These tests validate how the different parts of a service work together.

## Selenium Tests

Selenium tests validate scan behavior in real browsers.

Structure:

```text
tests/
  selenium/
```

These tests cover:

- browser detection accuracy
- browser family classification
- privacy signal detection
- behavior differences across browser configurations

They are kept separate from Vitest tests because they are slower and depend on real browser environments.

<!-- TODO: Add more detailed explanation -->

## Test Scripts

The available test scripts are defined in [`package.json`](../package.json).

```json
"test:unit": "vitest src/**/__tests__/unit",
"test:integration": "vitest src/**/__tests__/integration",
"test": "vitest src/**/__tests__",
"test:selenium": "tsx tests/selenium/scan.test.ts"
```

Script overview:

- `test:unit`
  Runs isolated unit tests for rules, detection logic, content consistency, and stores.

- `test:integration`
  Runs integration tests for the question, recommendation, and scoring engines.

- `test`
  Runs all Vitest-based tests together.

- `test:selenium`
  Runs cross-browser Selenium scan tests in real browser environments.

The CI pipeline uses the `npm test` script to run both unit and integration tests automatically. More information can be found in the [CI/CD documentation](./ci-cd.md).

## Rationale

This structure keeps the tests fast, focused, and aligned with the architecture.

- Unit tests verify isolated rules and data structures.
- Integration tests verify service-level behavior.
- Selenium tests verify real browser behavior.

This improves maintainability while keeping the test setup pragmatic and easy to extend.
