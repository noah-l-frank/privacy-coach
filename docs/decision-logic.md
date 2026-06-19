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

## Currently Used Inputs

### Recommendation Inputs

The recommendation engine currently uses:

- browser
- browserFamily
- gpc
- cookiesEnabled
- cookieSettings
- fingerprintingExposure
- fingerprintingProtection
- user answers from the follow-up question flow

### Scoring Inputs

The scoring logic currently uses:

- browser
- gpc
- cookiesEnabled
- https
- persistentCookieWritable
- fingerprintingExposure

Additional detected values such as `os` and non-persistent cookie details are already collected but are not yet part of the active recommendation/scoring rules.

Score deductions use the same preference context as recommendations for stricter tracking surfaces: cookie, persistent-cookie, and fingerprinting penalties are only applied after the user chooses `maximum_privacy`. The HTTPS score deduction is skipped in the local development server because that server intentionally runs without HTTPS.

## Design Notes

- The decision system is rule-based for transparency and maintainability.
- Detection, question flow, scoring, and recommendation rules are separated so each part can evolve independently.
- New inputs can be integrated incrementally by extending the corresponding rules without changing the overall architecture.
- Firefox fingerprinting protection cannot be read directly from browser settings. The scan uses heuristic signals such as canvas readback noise and standardized hardware/screen values; Firefox only receives extra fingerprinting guidance when no protection signals are detected.
