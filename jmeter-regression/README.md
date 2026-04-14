# JMeter Regression Suite

This project provides a module-wise regression suite for ElectraHub APIs.

Each API module has its own generated JMeter plan (`jmx/<module>.jmx`), and endpoint coverage is extracted from source controllers/routers so we keep plans aligned with code.

Current extracted coverage: **226 API endpoints** across **13 backend modules**.

## Covered modules

- `api-gateway`
- `auth-service`
- `user-service`
- `payment-service`
- `subscription-service`
- `charger-management-service`
- `station-management-service`
- `session-service`
- `billing-service`
- `ocpi-service`
- `ocpp-service`
- `web-socket-connector`
- `ocpi-simulator`

## Project structure

- `scripts/extract_endpoints.py`: scans repositories and generates `endpoints/*.json`.
- `scripts/generate_jmx.py`: generates one `.jmx` test plan per module.
- `scripts/validate_coverage.py`: verifies JMX sampler count equals extracted endpoint count.
- `scripts/run_regression.sh`: runs end-to-end generation, validation, and execution.
- `docker-compose.yml`: Dockerized JMeter runner (`justb4/jmeter:latest`) plus local `ocpi-simulator`.

## Prerequisites

- Docker / Docker Desktop
- Python 3
- Service stack available locally (recommended):
  - from repo root: `docker compose -f docker-compose.local.yml up -d --build`
- Ensure Docker network from the local stack exists (`electrahub-local_default`), since JMeter runs on that network.

## Run full regression

From repository root:

```bash
bash jmeter-regression/scripts/run_regression.sh
```

Optional environment variables:

- `MODULES=auth-service,user-service,payment-service` (run only selected modules)
- `AUTH_TOKEN=<jwt>` (passed as `Authorization: Bearer <token>`)
- `INTERNAL_API_KEY=<key>` (used for internal gateway endpoint calls)
- `STRICT_HTTP=true` (fail run on `5xx` responses; default mode only fails transport/non-HTTP errors)

Run a subset of modules:

```bash
MODULES=auth-service,user-service,payment-service bash jmeter-regression/scripts/run_regression.sh
```

## Regenerate plans only

```bash
python3 jmeter-regression/scripts/extract_endpoints.py
python3 jmeter-regression/scripts/generate_jmx.py
python3 jmeter-regression/scripts/validate_coverage.py
```

## Outputs

- Endpoint descriptors: `jmeter-regression/endpoints/*.json`
- Module plans: `jmeter-regression/jmx/*.jmx`
- Execution logs/results: `jmeter-regression/reports/*.log`, `jmeter-regression/reports/*.jtl`
