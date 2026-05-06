# Testing Strategy

The project uses two different testing approaches depending on the type of functionality being tested.

## Unit Tests

Unit tests are written using Vitest and are placed close to the code they test.

Structure:

```text
src/
  services/
    detection.ts
    __tests__/
      detection.test.ts
```

Unit tests focus on isolated application logic such as:

- browser detection
- score calculation
- recommendation generation
- state management

Rationale:

- improves maintainability
- keeps tests easy to locate
- scales well with modular architecture
- enables fast feedback during development

## Cross-Browser Scan Tests

Cross-browser scan tests are written using Selenium WebDriver and are stored in a centralized test directory.

Structure:

```text
tests/
  selenium/
```

These tests validate the scan behavior in real browsers and browser configurations.

Focus areas:

- browser detection accuracy
- browser family classification
- privacy signal detection
- configuration differences between browsers
- consistency across browser engines and versions

Rationale:

- tests the real browser environment instead of mocked logic
- enables automated cross-browser validation
- separates slower integration tests from fast unit tests
- simplifies scaling to additional browsers and configurations
