# Architecture

## Overview

The application is a client-side web application built with Vue 3 and TypeScript.

It follows a modular architecture that separates browser detection, rule-based decision logic, state management, and UI rendering.

Flow:

UI (Start Scan) → Detection → Rule-Based Services → Adaptive Flow → UI (Questions / Results)

---

## High-Level Components

### 1. Detection Layer

Responsible for collecting browser-side signals.

Inputs:

- Browser environment

Outputs:

- Structured detection result object

Example:

```ts
{
  browserFamily: 'chromium',
  browser: 'chrome',
  os: 'linux',
  gpc: true,
  cookiesEnabled: true,
  https: true,
}
```

Implementation:

- [`detection.ts`](../src/services/detection.ts)

---

### 2. Rule-Based Services

Processes detection results and user answers.

The application uses small rule-based services instead of large centralized decision functions.

The goal is to keep the decision logic readable, maintainable, and easy to extend without introducing unnecessary complexity.

#### Questions

Responsible for deciding which follow-up question should be shown next.

Structure:

- [`questionContent.ts`](../src/services/questions/questionContent.ts) → question texts and answer options
- [`questionFlow.ts`](../src/services/questions/questionFlow.ts) → rules defining when questions are shown
- [`index.ts`](../src/services/questions/index.ts) → engine selecting the next matching question
- [`types.ts`](../src/services/questions/types.ts) → shared question types

#### Recommendations

Responsible for generating personalized recommendations.

Structure:

- [`recommendationContent.ts`](../src/services/recommendations/recommendationContent.ts) → recommendation texts
- [`recommendationRules.ts`](../src/services/recommendations/recommendationRules.ts) → rules defining when recommendations are shown
- [`index.ts`](../src/services/recommendations/index.ts) → engine returning all matching recommendations
- [`types.ts`](../src/services/recommendations/types.ts) → shared recommendation types

#### Scoring

Responsible for calculating the privacy score.

Structure:

- [`scoringRules.ts`](../src/services/scoring/scoringRules.ts) → penalties and conditions
- [`index.ts`](../src/services/scoring/index.ts) → engine calculating the final score

---

### 3. Adaptive Flow Layer

Controls the user journey dynamically.

Flow:

- Start scan
- Show follow-up questions when needed
- Show personalized results

Responsibilities:

- State handling
- Navigation logic
- Dynamic question flow

---

### 4. Presentation Layer (UI)

Responsible for rendering the interface.

Structure:

- [`src/views/`](../src/views/) → route-level application pages

Examples:

- [`HomeView.vue`](../src/views/HomeView.vue) → landing page and scan entry point
- [`QuestionsView.vue`](../src/views/QuestionsView.vue) → adaptive follow-up question flow
- [`ResultView.vue`](../src/views/ResultView.vue) → personalized privacy results and recommendations

---

## State Management

State management is implemented using Pinia.

Structure:

- [`src/stores/`](../src/stores/) → centralized application state management

Stores:

- [`scan.ts`](../src/stores/scan.ts) → stores browser detection results
- [`questions.ts`](../src/stores/questions.ts) → stores follow-up questions and user answers
- [`progress.ts`](../src/stores/progress.ts) → stores completed recommendations and user progress

---

## Routing

Vue Router is used for navigation.

Main routes:

- `/`
- `/scan`
- `/questions`
- `/results`

Implementation:

- [`router`](../src/router/index.ts)

---

## Data Flow

1. User starts scan
2. Detection Layer collects browser signals
3. Detection result is stored in Pinia
4. Question service decides which follow-up question should be shown
5. User answers follow-up questions
6. Recommendation service generates matching recommendations
7. Scoring service calculates the privacy score
8. UI displays personalized results

---

## Technical Decisions

- Client-side only
- No backend
- No external APIs required
- Rule-based system instead of machine learning
- Local browser detection only
- Privacy-by-design: no scan data leaves the browser
- Modular separation of content, rules, and execution logic

---

## Constraints

- Must run in modern desktop browsers
- Mobile and tablet usage is currently outside the main scope
- Detection is limited to browser-exposed signals
