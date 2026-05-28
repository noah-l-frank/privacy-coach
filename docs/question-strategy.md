// TODO: Review

# Question Strategy

The follow-up question system is designed to personalize recommendations in a simple and user-friendly way.

## Goal

The goal of the question system is to collect just enough additional context to improve recommendation quality, without overwhelming the user.

The system focuses on understanding:

- user preferences (privacy vs convenience)
- willingness to change behavior
- tolerance for complexity

These inputs are combined with detected signals to generate more relevant and actionable recommendations.

---

## Core Approach

The system uses a **dynamic, step-by-step question flow** instead of showing all questions at once.

This means:

- only one question is shown at a time
- each answer influences which question comes next
- unnecessary questions are skipped automatically

This approach reduces cognitive load and creates a more natural interaction.

---

## General Principles

- Ask only relevant questions based on detected signals
- Keep the total number of questions low (typically 2–4)
- Avoid technical terminology
- Focus on user preferences rather than technical details
- Prioritize clarity and ease of understanding
- Adapt dynamically based on previous answers

---

## Question Flow Strategy

The question flow follows a **progressive refinement model**:

1. Start with high-impact, easy-to-understand questions
2. Branch into more specific questions only if needed
3. Stop as soon as enough information is collected

Example:

- Ask if the user is open to switching browsers
- Only ask about similarity if the user is open to switching
- Skip all related questions if the user is not willing to switch

---

## Current Question Types

### 1. Privacy vs. convenience preference

Shown when:

- Cookies are enabled

Question:

- What matters more to you while browsing?

Purpose:

- Determines how strongly privacy-focused the recommendations should be

---

### 2. Ad and tracking reduction interest

Shown when:

- No ad blocker is detected

Question:

- Would you like fewer ads and less tracking while browsing?

Purpose:

- Identifies interest in simple, high-impact improvements

---

### 3. Browser switch willingness

Shown when:

- A less privacy-friendly browser is detected (e.g. Chromium-based)

Question:

- Would you be open to trying a different browser for better privacy?

Purpose:

- Determines whether browser change recommendations are appropriate

---

### 4. Browser similarity preference

Shown when:

- User is open to switching browsers

Question:

- How important is it that a new browser feels familiar?

Purpose:

- Helps choose between different types of browser recommendations

---

### 5. Tracking protection preference

Shown when:

- Global Privacy Control is disabled

Question:

- Would you like your browser to reduce tracking as much as possible?

Purpose:

- Determines how strongly tracking protection features should be recommended

---

## Conditional Logic

Questions are generated dynamically based on:

- scan results
- previously given answers

This ensures that:

- users only see relevant questions
- unnecessary steps are skipped
- the flow adapts in real time

---

## Stopping Condition

The question flow stops when:

- no further relevant questions can be generated
- enough context is collected to produce meaningful recommendations

At this point, the system transitions to the results view.

---

## Design Rationale

This approach was chosen because:

- most users are not privacy experts
- long forms reduce completion rates
- step-by-step interaction feels simpler and more engaging

By minimizing complexity while maintaining relevance, the system balances usability and personalization.

---

## Current Scope

The current implementation focuses on a small number of high-impact questions.

Future improvements may include:

- more granular branching logic
- prioritization based on expected impact
- adaptive question ordering
