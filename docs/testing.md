# Testing Strategy

Tests are written using Vitest and are placed close to the code they test.

Structure:

- Each module contains its own **tests** folder
- Tests focus on core logic (e.g. detection, recommendations)

Rationale:

- Improves maintainability
- Keeps tests easy to locate
- Scales well with modular architecture
