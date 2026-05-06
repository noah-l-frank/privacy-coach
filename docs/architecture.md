# Architecture

## Overview

The application is a client-side web application built with Vue 3 and TypeScript.  
It follows a modular architecture separating detection, decision logic, and UI.

Flow:
UI (Start Scan) → Detection → Decision Engine → Adaptive Flow → UI (Questions / Results)

---

## High-Level Components

### 1. Detection Layer

Responsible for collecting browser-side signals.

Inputs:

- Browser environment

Outputs:

- Structured detection result object

Example:
{
browser: "chromium",
os: "linux",
gpc: true,
cookiesEnabled: true,
https: true,
}

---

### 2. Decision Engine

Processes detection results and maps them to privacy insights.

Responsibilities:

- Evaluate rules
- Combine multiple signals
- Generate recommendations
- Decide if follow-up questions are needed

Inputs:

- Detection result

Outputs:

- Recommendations
- Optional questions

---

### 3. Adaptive Flow Layer

Controls the user journey dynamically.

Flow:

- Start scan
- Show questions (if needed)
- Show results

Responsibilities:

- State handling
- Navigation logic
- Dynamic step generation

---

### 4. Presentation Layer (UI)

Responsible for rendering the interface.

Structure:

- Views (pages)
- Components (reusable UI parts)

Examples:

- HomeView
- ScanView
- ResultView

---

## State Management

Managed via Pinia.

Stores:

- scanStore (detection results)
- flowStore (current step, questions, answers)

---

## Routing

Vue Router is used for navigation.

Planned routes:

- /
- /scan
- /results

---

## Data Flow

1. User starts scan
2. Detection Layer collects signals
3. Data passed to Decision Engine
4. Decision Engine returns:
   - recommendations
   - optional questions
5. Adaptive Flow controls UI steps
6. UI displays results

---

## Technical Decisions

- Client-side only (no backend)
- Modular separation of concerns
- Rule-based system instead of machine learning models
- Privacy-by-design (no data leaves browser)

---

## Constraints

- Must run in modern desktop browsers
- No reliance on external APIs
- No persistent storage required
