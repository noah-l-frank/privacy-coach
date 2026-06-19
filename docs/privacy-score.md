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

| Factor | Condition | Penalty |
| ------------------ | --------------------- | ------- |
| Browser (Chrome) | browser === 'chrome' | -15 |
| Browser (Opera) | browser === 'opera' | -12 |
| Browser (Edge) | browser === 'edge' | -10 |
| Browser (Brave) | browser === 'brave' | -5 |
| Browser (Firefox) | browser === 'firefox' | 0 |
| HTTPS | https === false and the app is not running on the development server | -25 |
| Global Privacy Control | gpc === false | -10 |
| Cookies | cookiesEnabled === true and privacy_preference === 'maximum_privacy' | -10 |
| Persistent cookies | persistentCookieWritable === true and privacy_preference === 'maximum_privacy' | -5 |
| Medium fingerprinting exposure | medium fingerprinting risk and privacy_preference === 'maximum_privacy' | -6 |
| High fingerprinting exposure | high fingerprinting risk and privacy_preference === 'maximum_privacy' | -12 |

---

## Design Rationale

- HTTPS (-25): highest impact because secure transport is fundamental. This is skipped on the local development server because Vite is intentionally served over HTTP.
- Browser penalties (0 to -15): browser defaults differ in privacy behavior, so penalties are browser-specific.
- Global Privacy Control (-10): medium-impact user intent signal.
- Cookie and fingerprinting penalties are reserved for `maximum_privacy`, where the user explicitly accepts stricter privacy tradeoffs.

---

## Interpretation

| Score Range | Interpretation |
| ----------- | -------------- |
| 0–39        | Poor           |
| 40–69       | Okay           |
| 70–100      | Strong         |

---
