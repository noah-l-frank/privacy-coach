# Deployment

Currently, the deployed version tracks the `dev` branch because no stable production release has been merged into `main` yet.

The currently deployed version of the application is available at <https://pc.noah-frank.de>.

The application is deployed using Docker containers. Container images are automatically built and published to GitHub Container Registry (GHCR) through the [CI/CD pipeline](./ci-cd.md).

The production environment uses:

- Docker
- GitHub Container Registry (GHCR)
- Traefik as reverse proxy
- Watchtower for automatic container updates

This setup provides a simple and reproducible deployment workflow while reducing manual deployment effort.
