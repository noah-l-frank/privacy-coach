# Decision Logic

The system combines detected browser environment data with user answers to generate context-aware recommendations.

## Available Detection Data

The current detection layer provides the following data:

- browser
- browserFamily
- os
- gpc
- cookiesEnabled
- https

## Currently Used Inputs

For the initial version of the decision logic, only a subset of the available detection data is actively used:

- browser
- browserFamily
- gpc
- cookiesEnabled

Additional detected values such as os, and https are already collected and may be incorporated into future recommendation rules as the system evolves.
