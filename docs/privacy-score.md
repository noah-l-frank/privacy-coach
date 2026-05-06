# Privacy Score Calculation

## Overview

The privacy score provides a simple, interpretable estimate of a user's current privacy level based on detected browser and system settings.

The score starts at **100 points** and is reduced based on identified privacy risks. A higher score indicates a more privacy-friendly setup.

---

## Scoring Model

The score is calculated using a rule-based approach:

score = max(0, min(100, 100 - sum(penalties)))

The final score is clamped between **0 and 100**.

---

## Factors and Weights

| Factor                   | Condition                    | Penalty |
| ------------------------ | ---------------------------- | ------- |
| Browser (Chromium-based) | browserFamily === 'chromium' | -15     |
| Browser (Google Chrome)  | browser === 'Google Chrome'  | -5      |
| HTTPS                    | https === false              | -25     |
| Do Not Track             | gpc === false                | -10     |
| Cookies                  | cookiesEnabled === true      | -10     |

---

## Design Rationale

- HTTPS (-25): critical for secure data transmission
- Browser (-15 / -5): higher data collection risk
- Ad blocker (-15): reduces tracking significantly
- Do Not Track (-10): weak but useful signal
- Cookies (-10): enables cross-site tracking

---

## Interpretation

| Score Range | Interpretation |
| ----------- | -------------- |
| 0–39        | Poor           |
| 40–69       | Okay           |
| 70–100      | Strong         |

---
