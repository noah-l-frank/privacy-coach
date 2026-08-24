# Deployment

The current deployment tracks the `dev` image until the first stable release is merged into `main`. After that release, production should be configured to track the `main` image, while `dev` remains available for pre-release validation.

The currently deployed version of the application is available at <https://pc.noah-frank.de>.

The application is deployed using Docker containers. Container images are automatically built and published to GitHub Container Registry (GHCR) through the [CI/CD pipeline](./ci-cd.md).

The production environment uses:

- Docker
- GitHub Container Registry (GHCR)
- Traefik as reverse proxy
- Watchtower for automatic container updates

This setup provides a simple and reproducible deployment workflow while reducing manual deployment effort.
