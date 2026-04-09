# Question Strategy

The follow-up question system is designed to personalize recommendations without overwhelming the user.

## Goal

The purpose of follow-up questions is to collect a small amount of additional context that cannot be reliably derived from browser-side detection alone. These answers are then combined with detected signals to generate more relevant recommendations.

## General Principles

- Only ask questions when they are relevant to the detected browser environment or settings
- Keep the number of questions low
- Avoid technical wording where possible
- Use questions to clarify user preferences rather than facts that can already be detected automatically

## Current Question Types

### 1. Tracking preference

Shown when:

- Do Not Track is disabled

Question:

- How important is tracking protection to you?

Purpose:

- Determines how strongly the system should recommend enabling Do Not Track

---

### 2. Cookie and privacy preference

Shown when:

- Cookies are enabled

Question:

- How do you feel about website convenience vs. privacy?

Purpose:

- Helps distinguish between users who prefer stronger privacy protections and users who prioritize convenience

---

### 3. Browser switch similarity preference

Shown when:

- Browser is Google Chrome

Question:

- How important is it to keep a similar look and feel when switching browsers?

Purpose:

- Helps decide whether the system should recommend Firefox or a more privacy-friendly Chromium-based browser

---

### 4. Browser switch willingness

Shown when:

- Browser is Edge or Opera

Question:

- How willing are you to switch to a different browser for better privacy?

Purpose:

- Helps determine whether a browser switch recommendation is appropriate

---

### 5. Firefox privacy importance

Shown when:

- Browser is Firefox

Question:

- How important is privacy to you when browsing the web?

Purpose:

- Helps decide whether to recommend further Firefox privacy optimizations

## Conditional Logic

Questions are shown conditionally based on scan results.

This means:

- not every user sees the same questions
- the question flow adapts to the detected environment
- recommendations can be more context-aware without requiring a long static questionnaire

## Current Scope

The current version focuses on a small set of targeted questions that directly influence recommendation quality.

Additional questions may be added later.
