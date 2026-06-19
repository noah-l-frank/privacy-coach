# Decision Logic

The system combines detected browser environment data with user answers to generate context-aware recommendations and a transparent privacy score.

## Available Detection Data

The current detection layer provides the following data:

- browser
- browserFamily
- os
- gpc
- cookiesEnabled
- https
- fingerprintingExposure
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

## Design Notes

- The decision system is rule-based for transparency and maintainability.
- Detection, question flow, scoring, and recommendation rules are separated so each part can evolve independently.
- New inputs can be integrated incrementally by extending the corresponding rules without changing the overall architecture.
