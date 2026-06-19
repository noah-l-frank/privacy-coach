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

They use the `/debug/scan` route to read raw browser detection results. This route
is disabled in normal production builds and must be explicitly enabled for Selenium
test builds.

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

They are kept separate from Vitest tests because they are slower and depend on real
browser environments.

Before running the Selenium tests, create a production build with debug routes
enabled:

```bash
VITE_ENABLE_DEBUG_ROUTES=true npm run build
```

The production build can then be started locally using the preview server:

```bash
npm run preview
```

The Selenium tests can then be executed in a separate terminal:

```bash
npm run test:selenium
```

Normal production builds should still be created without `VITE_ENABLE_DEBUG_ROUTES`
so the `/debug/scan` route is not included in deployed builds.

The tests use the production preview server instead of the Vite development server
because the development server can cause problems when cookies are disabled.


## Playwright E2E Tests

Playwright E2E tests validate the main user flows in a production-like browser environment.

Structure:

```text
tests/
  e2e/
```

These tests cover:

- completing the privacy coach flow
- reload behavior on key routes
- production availability of the debug scan route

Before running Playwright tests locally for the first time, install the required browser binaries with `npx playwright install`.

The Playwright configuration starts the production build and preview server automatically:

```bash
npm run test:e2e
```

In CI, Playwright runs Chromium only to keep the pipeline fast and stable. Local runs can cover Chromium, Firefox, and Edge depending on the installed browsers.

Accessibility tests run in CI on Chromium. Selenium tests are currently kept as
local cross-browser checks because they depend on real browser installations and
debug-route builds.


## Test Scripts

The available test scripts are defined in [`package.json`](../package.json).

```json
"build": "run-p type-check \"build-only {@}\" --",
"test:unit": "vitest src/**/__tests__/unit",
"test:integration": "vitest src/**/__tests__/integration",
"test": "vitest src/**/__tests__",
"test:selenium": "tsx tests/selenium/scan.test.ts",
"test:accessibility": "playwright test tests/accessibility",
"test:e2e": "playwright test"
```

Script overview:

- `build`
  Runs TypeScript type checking and validates the production build.

- `test:unit`
  Runs isolated unit tests for rules, detection logic, content consistency, and stores.

- `test:integration`
  Runs integration tests for the question, recommendation, and scoring engines.

- `test`
  Runs all Vitest-based tests together.

- `test:selenium`
  Runs cross-browser Selenium scan tests in real browser environments.

- `test:accessibility`
  Runs automated accessibility checks for the homepage, question flow, and results view using Playwright and axe-core.

- `test:e2e`
  Runs Playwright end-to-end tests for the full user flow

## Rationale

This structure keeps the tests fast, focused, and aligned with the architecture.

- Unit tests verify isolated rules and data structures.
- Integration tests verify service-level behavior.
- Selenium tests verify real browser behavior locally.
- Accessibility tests verify basic accessibility compliance in CI.

This improves maintainability while keeping the test setup pragmatic and easy to extend.
