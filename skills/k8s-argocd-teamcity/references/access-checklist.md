# Access Checklist

## Environment Variables

```bash
# Kubernetes
export KUBECTL_CONTEXT=dev-us            # optional

# Argo CD (optional for CLI login validation)
export ARGOCD_SERVER=127.0.0.1:8090
export ARGOCD_USERNAME=admin
export ARGOCD_PASSWORD='<password>'
export ARGO_APP_NAME=user-service        # optional app-specific check

# TeamCity
export TEAMCITY_URL=http://localhost:8111
export TEAMCITY_TOKEN='<token>'
```

## Kubernetes Checks

```bash
kubectl config current-context
kubectl --context "${KUBECTL_CONTEXT:-$(kubectl config current-context)}" cluster-info
kubectl --context "${KUBECTL_CONTEXT:-$(kubectl config current-context)}" auth can-i get pods -A
kubectl --context "${KUBECTL_CONTEXT:-$(kubectl config current-context)}" get ns
```

If `auth can-i` is `no`, access exists but RBAC is insufficient for operational checks.

## Argo CD Checks (Cluster Access Path)

```bash
kubectl --context "${KUBECTL_CONTEXT:-$(kubectl config current-context)}" -n argocd get svc argocd-server
kubectl --context "${KUBECTL_CONTEXT:-$(kubectl config current-context)}" -n argocd get applications.argoproj.io
kubectl --context "${KUBECTL_CONTEXT:-$(kubectl config current-context)}" -n argocd get application "${ARGO_APP_NAME:-user-service}"
```

## Argo CD Checks (CLI Path)

```bash
argocd login "$ARGOCD_SERVER" --username "$ARGOCD_USERNAME" --password "$ARGOCD_PASSWORD" --insecure
argocd app list
argocd app get "${ARGO_APP_NAME:-user-service}"
```

Use CLI checks when direct Argo endpoint auth needs verification beyond Kubernetes API access.

## TeamCity Checks

Reachability:

```bash
curl -sS -I "${TEAMCITY_URL:-http://localhost:8111}/login.html"
```

Authenticated REST access:

```bash
curl -sS -u ":${TEAMCITY_TOKEN}" -H 'Accept: application/json' \
  "${TEAMCITY_URL:-http://localhost:8111}/app/rest/server"
```

Build queue check:

```bash
curl -sS -u ":${TEAMCITY_TOKEN}" -H 'Accept: application/json' \
  "${TEAMCITY_URL:-http://localhost:8111}/app/rest/buildQueue"
```

## Common Failure Patterns

- Kubernetes timeout:
  - wrong context or VPN/network issue
  - API server not reachable from current network
- Kubernetes RBAC denial:
  - context is valid but user/service-account lacks `get/list` privileges
- Argo missing resources:
  - `argocd` namespace not accessible in current cluster/context
  - Argo CRDs not installed in target cluster
- TeamCity `401/403`:
  - invalid token or insufficient project permissions
- TeamCity connection refused:
  - wrong `TEAMCITY_URL` or local server is not running
