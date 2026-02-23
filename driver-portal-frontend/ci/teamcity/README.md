# TeamCity Pipeline: Driver Portal Frontend Deploy

This pipeline builds and deploys the Driver Portal frontend to the `dev` environment by:

1. Running `npm ci` and production Angular build.
2. Building/pushing Docker image `amolsurjuse/driver-portal-frontend:<build-number>`.
3. Updating `k8s-platform/charts/config/services/driver-portal-ui/us/version/dev-version.yaml`.
4. Committing/pushing that tag change to `k8s-platform` `develop` branch.
5. Optionally syncing ArgoCD app (`driver-portal-ui`).

## Files

- TeamCity Kotlin DSL: `driver-portal-frontend/.teamcity/settings.kts`
- Deploy script used by pipeline: `driver-portal-frontend/ci/teamcity/deploy_driver_portal.sh`

## TeamCity setup (once)

1. In TeamCity, create project from VCS root `git@github.com:amolsurjuse/driver-portal-frontend.git`.
2. Enable **Versioned Settings** with settings path:
   - `.teamcity` if repository root is `driver-portal-frontend`
   - `driver-portal-frontend/.teamcity` if repository root is `/Users/amolsurjuse/development/projects`
3. Add secure parameters in build configuration:
   - `env.DOCKER_USERNAME`
   - `env.DOCKER_PASSWORD` (password type)
   - Optional for auto-sync:
   - `env.ARGOCD_SERVER`
   - `env.ARGOCD_USERNAME`
   - `env.ARGOCD_PASSWORD` (password type)

## Optional dry run

Set `env.DRY_RUN=true` to skip Docker push, k8s repo push, and ArgoCD sync.
