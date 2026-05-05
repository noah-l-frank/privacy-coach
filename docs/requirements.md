# Requirements

## Goal

Build a browser-based privacy coaching application that detects client-side signals and provides adaptive, context-aware privacy recommendations.

---

## Core Features

### Detection (Scan Lite)

The system detects the following client-side signals:

- Browser type (Chromium-based or Firefox)
- Operating system
- Language
- Timezone
- Do Not Track status
- Cookie availability
- HTTPS context

All detection is performed locally in the browser.

---

### Decision Engine

- Map detected signals to privacy-related categories
- Evaluate combinations of signals
- Trigger follow-up questions when needed
- Generate structured recommendations

---

### Adaptive Flow

- Flow: Scan → Questions → Recommendations
- Questions are dynamically generated based on detected signals
- No static questionnaire

---

### UI

- Simple, minimal interface
- Start screen with "Start Scan"
- Step-based flow (Scan → Questions → Results)

---

## Technical Constraints

- Client-side only (no backend required)
- Built with Vue 3 + TypeScript
- Modular architecture (Detection, Decision Engine, UI separated)
- Runs in modern desktop browsers

---

## Supported Environments

- Chromium-based browsers (Chrome, Edge, Brave)
- Mozilla Firefox
- Latest stable versions only
- Standard configurations assumed

---

## Out of Scope

- Mobile browsers
- Private browsing mode
- Logged-in account states
- Browser extensions
- Backend services
- Persistent user accounts

---

## Deliverables

- Working web application
- Modular and maintainable codebase
- Basic testing setup
- Deployment-ready build
- Documentation
