# Decision Logic

The system combines detected browser environment data with user answers to generate context-aware recommendations and a transparent privacy score.

## Available Detection Data

The current detection layer provides the following data:

- browser
- browserFamily
- os
- deviceType
- gpc
- cookiesEnabled
- https
- fingerprintingExposure
- fingerprintingProtection
- cookieSettings
  - thirdPartyCookieStatus

## Currently Used Inputs

### Recommendation Inputs

The recommendation engine currently uses:

- browser
- browserFamily
- gpc
- cookieSettings
- fingerprintingExposure
- fingerprintingProtection
- user answers from the follow-up question flow

### Scoring Inputs

The scoring logic currently uses:

- browser
- gpc
- https
- thirdPartyCookieStatus
- fingerprintingExposure
- fingerprintingProtection

Additional detected values such as `os` and first-party cookie writability details are already collected but are not yet part of the active recommendation/scoring rules.

Score deductions use the same tracking-surface context as recommendations. Cookie penalties are only applied after the user chooses `maximum_privacy` and third-party cookies are likely allowed. Fingerprinting penalties follow the fingerprinting recommendation logic, including Firefox protection-signal suppression and the convenience-user opt-out. The HTTPS score deduction is skipped in the local development server because that server intentionally runs without HTTPS.

Cookie recommendations and score deductions are narrower than the raw cookie scan: `reduce_cookies` and the matching score penalty are shown only for `maximum_privacy` users when third-party cookies are likely allowed. First-party cookies alone do not trigger that guidance because disabling all cookies would break many normal website flows.

## Design Notes

- The decision system is rule-based for transparency and maintainability.
- Detection, question flow, scoring, and recommendation rules are separated so each part can evolve independently.
- New inputs can be integrated incrementally by extending the corresponding rules without changing the overall architecture.
- Firefox fingerprinting protection cannot be read directly from browser settings. The scan uses heuristic signals such as canvas readback noise and standardized hardware/screen values; Firefox only receives extra fingerprinting guidance when no protection signals are detected.
