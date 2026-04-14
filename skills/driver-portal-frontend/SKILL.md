---
name: driver-portal-frontend
description: Use when working on the Angular Driver Portal frontend, including local Angular development, production builds, and the TeamCity deploy flow that updates k8s-platform and optionally syncs ArgoCD.
---

# Driver Portal Frontend

## Repo

- Path: `/Users/amolsurjuse/development/projects/driver-portal-frontend`

## Stack

- Angular CLI 21
- Nginx container for production hosting

## Local Run

```bash
ng serve
```

Default local URL: `http://localhost:4200`

## Verify

```bash
ng build
ng test
```

## TeamCity

This project uses TeamCity versioned settings rather than the same REST bootstrap script pattern used by several backend repos.

Important files:

- `.teamcity/settings.kts`
- `ci/teamcity/deploy_driver_portal.sh`

Deployment updates:

- `charts/config/services/driver-portal-ui/us/version/dev-version.yaml`

Optional Argo sync can be triggered from the deploy script when Argo credentials are configured.
