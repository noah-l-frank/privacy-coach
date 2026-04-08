# Decision Logic

The system combines detected browser environment data with user answers to generate context-aware recommendations.

## Available Detection Data

The current detection layer provides the following data:

- browser
- browserFamily
- os
- language
- timezone
- dnt
- cookiesEnabled
- https
- adblock

## Currently Used Inputs

For the initial version of the decision logic, only a subset of the available detection data is actively used:

- browser
- browserFamily
- dnt
- cookiesEnabled

Additional detected values such as os, language, timezone, https, and adblock are already collected and may be incorporated into future recommendation rules as the system evolves.
