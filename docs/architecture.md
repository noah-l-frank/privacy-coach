# Architecture

## Overview

Privacy Coach is split into four engines:

## 1) Detection Engine

Purpose: Collect browser-side privacy signals and create one structured scan result.

How it works:
- Reads privacy signals locally in the browser (for example browser type, GPC, cookie behavior, HTTPS).
- Normalizes these values into a single detection result object.
- Passes this object to the next engines as the technical input.

## 2) Questions Engine

Purpose: Ask only the follow-up questions that are relevant for the current user context.

How it works:
- Uses rule-based conditions that evaluate detection data plus already given answers.
- Selects the next matching question from a predefined question set.
- Stops automatically when no further question is needed.

## 3) Recommendations Engine

Purpose: Generate practical privacy recommendations tailored to the detected setup and user answers.

How it works:
- Applies rule-based recommendation logic based on detection result and answers.
- Builds the final recommendation list from matching recommendation templates.
- Outputs actionable results shown in the final view.

## 4) Scoring Engine

Purpose: Calculate a transparent privacy score that summarizes key privacy-relevant signals.

How it works:
- Starts from a baseline score of 100.
- Applies rule-based penalties for detected risk factors.
- Clamps the final value to a range of 0 to 100.
- Provides an interpretable score shown in the results view.

## Flow

Start Scan -> Detection -> Questions -> Recommendations + Scoring -> Results

## State Management

State management is implemented using Pinia.

Structure:

- [`src/stores/`](../src/stores/) → centralized application state management

Stores:

- [`scanStore.ts`](../src/stores/scanStore.ts) → stores browser detection results
- [`questionsStore.ts`](../src/stores/questionsStore.ts) → stores follow-up questions and user answers
- [`progressStore.ts`](../src/stores/progressStore.ts) → stores recommendations completion status

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

## Technical Decisions

- Client-side only
- No backend
- No external APIs required
- Rule-based system instead of machine learning
- Privacy-by-design: no scan data leaves the browser
- Modular separation of content, rules, and execution logic

---

## Constraints

- Must run in modern desktop browsers
- Detection is limited to browser-exposed signals