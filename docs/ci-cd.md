# CI/CD Pipeline

This project uses a simple CI/CD pipeline based on GitHub Actions.

The quality gates run for pull requests and pushes targeting the `main` and `dev` branches. Container images are published only after successful quality gates on direct pushes or manual workflow runs.

Currently, the pipeline includes:

- TypeScript type checking
- Lint checks
- Unit tests with Vitest
- Coverage reporting and thresholds for services/stores
- Playwright end-to-end tests
- Playwright/axe accessibility checks
- Production build validation
- Automatic Docker image builds and publishing via GitHub Container Registry (GHCR)
- High-severity dependency audit
- Automated dependency update pull requests through Dependabot

Docker images are tagged based on the branch name to separate development and stable versions of the application.

The goal of this setup is to detect errors early, reduce manual testing effort, and improve overall code quality during development.
