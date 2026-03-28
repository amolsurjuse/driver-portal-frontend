---
name: electra-hub-admin-platform
description: Project map and delivery workflow for the Electra Hub admin portal, backend services, TeamCity pipelines, and ArgoCD dev deployment.
---

# Electra Hub Admin Platform Skill

## Scope

This workspace currently spans five repos that matter for the admin platform work:

- `admin-poratl-ui`: standalone React admin portal for system administrators
- `auth-service`: login, JWT issuance, logout, refresh, session handling
- `user-service`: user roster, admin user operations, seeded dev admin users
- `subscription-service`: subscription plans, allocations, utilization, audit APIs
- `k8s-platform`: ArgoCD application definitions and Helm values for deployment

## What Was Built So Far

### Admin portal

- Separate React project: `admin-poratl-ui`
- Authenticates against `auth-service`
- Uses `user-service` for:
  - user management
  - admin user management
  - password reset
  - delete account
- Uses `subscription-service` for subscription plan management

### User and admin backend behavior

- Admin APIs are protected in `user-service` by `SYSTEM_ADMIN`
- Dev `SYSTEM_ADMIN` users were seeded for testing:
  - `sysadmin.dev@electrahub.com`
  - `network.operator.dev@electrahub.com`
  - `enterprise.operator.dev@electrahub.com`
  - `location.operator.dev@electrahub.com`
  - `site.operator.dev@electrahub.com`
  - `support.operator.dev@electrahub.com`
- Shared admin password:
  - `Admin@12345`
- Plain verification user:
  - `driver.user.dev@electrahub.com`
  - `User@12345`

### Backend split added for admin portal tabs

- `GET /api/v1/users` now returns regular users for a system admin
- `GET /api/v1/admin/users` returns only admin users
- `user-service` search/count logic was split accordingly

### Subscription backend updates

- Backend-driven pagination was added for plans
- CORS was added for localhost-based admin UI development

## Repos And Important Paths

### Admin UI

- Repo: `/Users/amolsurjuse/development/projects/admin-poratl-ui`
- Main env defaults live in `.env.example`
- Default dev API targets:
  - `VITE_AUTH_API_BASE_URL=https://dev.electrahub.com:8443/auth`
  - `VITE_USER_API_BASE_URL=https://dev.electrahub.com:8443/user`
  - `VITE_SUBSCRIPTION_API_BASE_URL=https://dev.electrahub.com:8443/subscription`

### User service

- Repo: `/Users/amolsurjuse/development/projects/user-service`
- TeamCity setup script:
  - `/Users/amolsurjuse/development/projects/user-service/ci/teamcity/setup_pipeline.sh`
- Dev image version file in `k8s-platform`:
  - `charts/config/services/user-service/us/version/dev-version.yaml`
- Argo app:
  - `argocd/applications/user-service-dev.yaml`

### Subscription service

- Repo: `/Users/amolsurjuse/development/projects/subscription-service`
- TeamCity setup script:
  - `/Users/amolsurjuse/development/projects/subscription-service/ci/teamcity/setup_pipeline.sh`
- Dev image version file in `k8s-platform`:
  - `charts/config/services/subscription-service/us/version/dev-version.yaml`
- Argo app:
  - `argocd/applications/subscription-service-dev.yaml`

### Auth service

- Repo: `/Users/amolsurjuse/development/projects/auth-service`
- TeamCity setup script:
  - `/Users/amolsurjuse/development/projects/auth-service/ci/teamcity/setup_pipeline.sh`
- Dev image version file in `k8s-platform`:
  - `charts/config/services/auth-service/us/version/dev-version.yaml`

### Kubernetes GitOps repo

- Repo: `/Users/amolsurjuse/development/projects/k8s-platform`
- Argo app manifests:
  - `/Users/amolsurjuse/development/projects/k8s-platform/argocd/applications`
- Environment version files:
  - `/Users/amolsurjuse/development/projects/k8s-platform/charts/config/services`

## Local Development

### Admin UI

```bash
cd /Users/amolsurjuse/development/projects/admin-poratl-ui
npm install
npm run dev
```

Use `.env.local` if you need local backend URLs:

```bash
VITE_AUTH_API_BASE_URL=http://127.0.0.1:8080
VITE_USER_API_BASE_URL=http://127.0.0.1:8082
VITE_SUBSCRIPTION_API_BASE_URL=http://127.0.0.1:8086
```

### Spring services

```bash
cd /Users/amolsurjuse/development/projects/user-service
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

```bash
cd /Users/amolsurjuse/development/projects/subscription-service
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

```bash
cd /Users/amolsurjuse/development/projects/auth-service
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

## Deployment Model

The dev deployment flow is GitOps-based:

1. Build the service JAR
2. Build and push a Docker image to Docker Hub
3. Update the service tag in `k8s-platform`
4. Push that `k8s-platform` commit to `develop`
5. ArgoCD syncs the app and rolls the deployment in Kubernetes

TeamCity automates the same pattern:

1. Maven package
2. Docker build
3. Docker push
4. Update the dev image tag in `k8s-platform`
5. Argo reconciles the new desired state

## Manual Dev Deployment Flow

Example for a Spring Boot service:

```bash
cd /Users/amolsurjuse/development/projects/<service-repo>
./mvnw test
./mvnw clean package -DskipTests
docker build --no-cache -t amolsurjuse/<service-name>:<tag> .
docker push amolsurjuse/<service-name>:<tag>
```

Then update the version file in `k8s-platform`:

```yaml
image:
  tag: "<tag>"
```

Push that change to `develop`, then refresh Argo if needed:

```bash
kubectl -n argocd annotate application <service-name> argocd.argoproj.io/refresh=hard --overwrite
kubectl -n argocd get application <service-name> -o jsonpath='{.status.sync.status} {.status.health.status} {.status.sync.revision}{"\n"}'
kubectl -n dev get deployment <service-name> -o jsonpath='{.status.readyReplicas}/{.status.replicas} {.spec.template.spec.containers[0].image}{"\n"}'
```

## How To Create A TeamCity Pipeline

### Existing pattern

`user-service`, `subscription-service`, and `auth-service` already contain idempotent TeamCity provisioning scripts in `ci/teamcity/setup_pipeline.sh`.

These scripts use the TeamCity REST API to create or repair:

- TeamCity project
- VCS root
- build configuration
- parameters
- agent requirement
- build steps
- VCS trigger

### Standard TeamCity steps we use

For `user-service` and `subscription-service`, the script creates:

1. `Maven Package`
2. `Docker Build`
3. `Docker Push`
4. `Update build version`

The `Update build version` step clones `k8s-platform`, edits the service’s `dev-version.yaml`, commits the new tag, and pushes to `develop`.

### To provision a pipeline

Run this from the service repo:

```bash
cd /Users/amolsurjuse/development/projects/user-service
TEAMCITY_TOKEN='<token>' ./ci/teamcity/setup_pipeline.sh
```

```bash
cd /Users/amolsurjuse/development/projects/subscription-service
TEAMCITY_TOKEN='<token>' ./ci/teamcity/setup_pipeline.sh
```

```bash
cd /Users/amolsurjuse/development/projects/auth-service
TEAMCITY_TOKEN='<token>' ./ci/teamcity/setup_pipeline.sh
```

### Required TeamCity prerequisites

- TeamCity server reachable at `http://localhost:8111`
- `jq` installed
- TeamCity token
- TeamCity parameters available for GitHub auth:
  - `%github.user%`
  - `%github.token%`
- Docker access on the build agent

### Important defaults in current scripts

#### User service

- Project ID: `Amy_UserService`
- Build type ID: `Amy_UserService_Build`
- Git URL: `https://github.com/amolsurjuse/user-service`
- Branch default: `main`
- Docker image: `amolsurjuse/user-service`

#### Subscription service

- Project ID: `Amy_SubscriptionService`
- Build type ID: `Amy_SubscriptionService_Build`
- Git URL: `https://github.com/amolsurjuse/subscription-service`
- Branch default: `main`
- Docker image: `amolsurjuse/subscription-service`
- Deploy version file default:
  - `charts/config/services/subscription-service/us/version/dev-version.yaml`

#### Auth service

- Project ID: `Amy_AuthService`
- Build type ID: `Amy_AuthService_Build`
- Git URL: `https://github.com/amolsurjuse/auth-service`
- Branch default: `develop`
- Docker image: `amolsurjuse/auth-service`

### How to create a new pipeline for another service

1. Copy an existing `ci/teamcity/setup_pipeline.sh`
2. Update:
   - TeamCity project/build IDs
   - repo URL
   - repo branch
   - Docker image name
   - `k8s-platform` version file path
   - commit message in the update step
3. Make sure the service has:
   - a `Dockerfile`
   - a matching `k8s-platform` Argo app manifest
   - a matching `charts/config/services/<service>/us/version/dev-version.yaml`
4. Run the setup script with `TEAMCITY_TOKEN`
5. Open the generated TeamCity build config and queue a build

## How ArgoCD Picks Up Deployments

Each service has an Argo application manifest in `k8s-platform/argocd/applications`.

Examples:

- `user-service-dev.yaml`
- `subscription-service-dev.yaml`
- `auth-service-dev.yaml`

Those app definitions point to the `k8s-platform` repo and load Helm values from the matching environment version file. When TeamCity or a manual commit changes the image tag in that version file, Argo sees the diff and applies it.

## Verification Commands

### Check Argo app status

```bash
kubectl -n argocd get application user-service -o jsonpath='{.status.sync.status} {.status.health.status} {.status.sync.revision}{"\n"}'
kubectl -n argocd get application subscription-service -o jsonpath='{.status.sync.status} {.status.health.status} {.status.sync.revision}{"\n"}'
kubectl -n argocd get application authorization-service -o jsonpath='{.status.sync.status} {.status.health.status} {.status.sync.revision}{"\n"}'
```

### Check live deployment image

```bash
kubectl -n dev get deployment user-service -o jsonpath='{.status.readyReplicas}/{.status.replicas} {.spec.template.spec.containers[0].image}{"\n"}'
kubectl -n dev get deployment subscription-service -o jsonpath='{.status.readyReplicas}/{.status.replicas} {.spec.template.spec.containers[0].image}{"\n"}'
```

### Check health endpoints

```bash
curl -k -sS https://dev.electrahub.com:8443/user/actuator/health
curl -k -sS https://dev.electrahub.com:8443/subscription/actuator/health
curl -k -sS https://dev.electrahub.com:8443/auth/actuator/health
```

## Troubleshooting Notes

### CORS

- `auth-service`, `user-service`, and `subscription-service` need localhost origins for local UI work
- We explicitly used `http://localhost:4201` and `http://localhost:4211`
- Validate with:

```bash
curl -k -i -X OPTIONS 'https://dev.electrahub.com:8443/subscription/api/v1/subscriptions/plans' \
  -H 'Origin: http://localhost:4201' \
  -H 'Access-Control-Request-Method: GET'
```

### Fresh jar before Docker build

When a Docker build copies `target/*.jar`, always run:

```bash
./mvnw clean package -DskipTests
```

before `docker build`, otherwise an older JAR may get baked into the image.

### UI/backend split note

The backend is ready for:

- `Users` tab -> `GET /api/v1/users`
- `Admin Users` tab -> `GET /api/v1/admin/users`

If the UI still uses one shared API call for both tabs, it will not show the split until the frontend is updated to call the matching endpoint for each section.

## Recommended Next Improvements

- Add a TeamCity pipeline for `admin-poratl-ui`
- Standardize all service repos on the same default branch strategy
- Move repeated TeamCity setup logic into a shared template
- Add automated post-deploy smoke checks after the image tag update step
