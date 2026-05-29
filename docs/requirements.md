# Requirements

## Goal

Build a browser-based privacy coaching application that detects client-side privacy signals and provides adaptive, context-aware privacy recommendations.

---

## Core Features

### Detection (Scan Lite)

The system detects the following client-side signals:

- browser type and browser family
- operating system
- Global Privacy Control status
- cookie availability and writable cookie behavior
- HTTPS context
- selected fingerprinting exposure signals

All detection is performed locally in the browser.

---

### Decision Engine

- Map detected signals to privacy-related categories
- Evaluate combinations of signals and user answers
- Trigger follow-up questions when additional context is useful
- Generate structured recommendations with impact, effort, steps, links, and tradeoffs

---

### Adaptive Flow

- Flow: Scan -> Questions -> Results
- Questions are dynamically selected based on detected signals and previous answers
- No static questionnaire
- The flow stops when no further relevant question is available

---

### Recommendations

Recommendations should be:

- based on scan results and user answers
- specific enough to be actionable
- transparent about effort and tradeoffs
- safe for non-expert users
- sorted or presented in a way that prioritizes practical next steps

---

### UI

- Simple, minimal interface
- Start screen with "Start Scan"
- Step-based flow from scan to questions to results
- Results view with privacy score, recommendations, positive findings, and action progress

---

## Technical Constraints

- Client-side only
- No backend required
- Built with Vue 3 and TypeScript
- Modular architecture with detection, questions, recommendations, scoring, stores, and UI separated
- Runs in modern desktop browsers
- Debug-only routes must not be enabled in normal production builds

---

## Supported Environments

- Chromium-based browsers: Chrome, Edge, Brave, Opera
- Mozilla Firefox
- Latest stable desktop versions only
- Standard browser configurations assumed

---

## Out of Scope

- Mobile browsers
- Private browsing mode
- Logged-in account states
- Building or managing browser extensions
- Backend services
- Persistent user accounts
- Server-side storage of scan results or answers

---

## Testing Requirements

The project should include coverage for the main layers of the application:

- unit tests for isolated rules, detection logic, stores, and content consistency
- integration tests for question selection, recommendation generation, and scoring
- Playwright E2E tests for main user flows
- accessibility tests for basic accessibility issues
- Selenium tests for real-browser detection behavior

---

## Deliverables

- Working web application
- Modular and maintainable codebase
- Unit, integration, E2E, accessibility, and Selenium test coverage
- Deployment-ready production build
- Documentation for architecture, testing, deployment, decision logic, scoring, and question strategy
