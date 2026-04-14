#!/usr/bin/env python3
"""Extract API endpoints per module and emit JSON descriptors for JMeter generation."""

from __future__ import annotations

import argparse
import json
import re
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable


ROOT = Path(__file__).resolve().parents[2]
PROJECT_ROOT = ROOT / "jmeter-regression"
ENDPOINTS_DIR = PROJECT_ROOT / "endpoints"


MODULE_TARGETS: dict[str, dict[str, object]] = {
    "api-gateway": {"protocol": "http", "host": "api-gateway", "port": 8090},
    "auth-service": {"protocol": "http", "host": "auth-service", "port": 8080},
    "user-service": {"protocol": "http", "host": "user-service", "port": 8082},
    "payment-service": {"protocol": "http", "host": "payment-service", "port": 8083},
    "subscription-service": {"protocol": "http", "host": "subscription-service", "port": 8086},
    "charger-management-service": {"protocol": "http", "host": "charger-management-service", "port": 8086},
    "station-management-service": {"protocol": "http", "host": "station-management-service", "port": 8081},
    "session-service": {"protocol": "http", "host": "session-service", "port": 8083},
    "billing-service": {"protocol": "http", "host": "billing-service", "port": 8085},
    "ocpi-service": {"protocol": "http", "host": "ocpi-service", "port": 8084},
    "ocpp-service": {"protocol": "http", "host": "ocpp-service", "port": 8082},
    "web-socket-connector": {"protocol": "http", "host": "web-socket-connector", "port": 8091},
    "ocpi-simulator": {"protocol": "http", "host": "ocpi-simulator", "port": 8011},
}

JAVA_MODULES = [
    "api-gateway",
    "auth-service",
    "user-service",
    "payment-service",
    "subscription-service",
    "charger-management-service",
    "station-management-service",
    "session-service",
    "billing-service",
    "ocpi-service",
    "ocpp-service",
]

METHOD_MAP = {
    "GetMapping": ["GET"],
    "PostMapping": ["POST"],
    "PutMapping": ["PUT"],
    "DeleteMapping": ["DELETE"],
    "PatchMapping": ["PATCH"],
}

HEALTH_PATHS = {
    "/health",
    "/healthz",
    "/readyz",
    "/ping",
    "/api/v1/ping",
    "/actuator/health",
    "/actuator/health/readiness",
    "/actuator/health/liveness",
}


@dataclass(frozen=True)
class Endpoint:
    method: str
    path_template: str
    path: str
    source: str

    @property
    def expected_code_regex(self) -> str:
        if self.path in HEALTH_PATHS:
            return "^2\\d\\d$"
        return "^(2\\d\\d|3\\d\\d|4\\d\\d)$"

    @property
    def body(self) -> str:
        return "{}" if self.method in {"POST", "PUT", "PATCH"} else ""

    @property
    def name(self) -> str:
        return f"{self.method} {self.path_template}"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Extract API endpoint metadata for regression tests.")
    parser.add_argument(
        "--module",
        action="append",
        help="Only extract endpoints for the given module (can be specified multiple times).",
    )
    return parser.parse_args()


def split_annotation_block(lines: list[str], start: int) -> tuple[list[str], int]:
    annotations: list[str] = []
    i = start
    while i < len(lines):
        stripped = lines[i].strip()
        if not stripped:
            i += 1
            continue
        if not stripped.startswith("@"):
            break

        annotation = stripped
        depth = stripped.count("(") - stripped.count(")")
        while depth > 0 and i + 1 < len(lines):
            i += 1
            nxt = lines[i].strip()
            annotation += " " + nxt
            depth += nxt.count("(") - nxt.count(")")
        annotations.append(annotation)
        i += 1
    return annotations, i


def normalize_join(base: str, path: str) -> str:
    b = base.strip()
    p = path.strip()
    if not b and not p:
        return "/"
    if not b:
        out = p
    elif not p:
        out = b
    else:
        out = f"{b.rstrip('/')}/{p.lstrip('/')}"
    if not out.startswith("/"):
        out = "/" + out
    out = re.sub(r"/{2,}", "/", out)
    return out


def extract_paths(annotation_args: str) -> list[str]:
    args = annotation_args.strip()
    if not args:
        return [""]

    paths: list[str] = []
    for key in ("path", "value"):
        m_arr = re.search(rf"{key}\s*=\s*\{{([^}}]+)\}}", args)
        if m_arr:
            paths.extend(re.findall(r'"([^"]*)"', m_arr.group(1)))
        m_str = re.search(rf'{key}\s*=\s*"([^"]*)"', args)
        if m_str:
            paths.append(m_str.group(1))

    if not paths:
        direct = re.findall(r'"([^"]*)"', args)
        if direct:
            paths = direct

    if not paths:
        return [""]

    deduped: list[str] = []
    seen: set[str] = set()
    for p in paths:
        if p not in seen:
            deduped.append(p)
            seen.add(p)
    return deduped


def extract_methods_from_request_mapping(annotation_args: str) -> list[str]:
    methods = re.findall(r"RequestMethod\.([A-Z]+)", annotation_args)
    if not methods:
        return ["GET"]
    return methods


def method_mappings(annotation: str) -> list[tuple[str, str]]:
    m = re.match(r"@([A-Za-z0-9_]+)(?:\((.*)\))?$", annotation)
    if not m:
        return []
    ann_name = m.group(1)
    ann_args = m.group(2) or ""

    if ann_name in METHOD_MAP:
        return [(method, path) for method in METHOD_MAP[ann_name] for path in extract_paths(ann_args)]

    if ann_name == "RequestMapping":
        methods = extract_methods_from_request_mapping(ann_args)
        paths = extract_paths(ann_args)
        return [(method, path) for method in methods for path in paths]

    return []


def to_sample_path(path_template: str) -> str:
    def repl(match: re.Match[str]) -> str:
        key = match.group(1).lower()
        if "uuid" in key or key.endswith("id") and "connector" not in key and "evse" not in key:
            return "11111111-1111-1111-1111-111111111111"
        if "country" in key:
            return "US"
        if "party" in key:
            return "EHU"
        if "connector" in key:
            return "1"
        if "evse" in key:
            return "1"
        if "location" in key:
            return "loc-001"
        if "session" in key:
            return "sess-001"
        if "token" in key:
            return "token-001"
        if "charger" in key or "chargepoint" in key or "charge_point" in key:
            return "charger-001"
        return "1"

    path = re.sub(r"\{([^}/]+)\}", repl, path_template)
    path = path.replace("**", "all")
    path = path.replace("*", "all")
    path = re.sub(r"/{2,}", "/", path)
    if not path.startswith("/"):
        path = "/" + path
    return path


def parse_java_module(module: str) -> list[Endpoint]:
    module_path = ROOT / module / "src" / "main" / "java"
    if not module_path.exists():
        return []

    endpoints: list[Endpoint] = []

    for java_file in sorted(module_path.rglob("*Controller.java")):
        text = java_file.read_text(encoding="utf-8")
        lines = text.splitlines()

        class_idx = -1
        for i, line in enumerate(lines):
            if re.search(r"\bclass\b", line) and "Controller" in line:
                class_idx = i
                break
        if class_idx < 0:
            continue

        class_annotations: list[str] = []
        i = 0
        while i < class_idx:
            if lines[i].strip().startswith("@"):
                anns, nxt = split_annotation_block(lines, i)
                class_annotations.extend(anns)
                i = nxt
            else:
                i += 1

        base_path = ""
        for ann in class_annotations:
            mappings = method_mappings(ann)
            if ann.startswith("@RequestMapping") and mappings:
                base_path = mappings[0][1]

        def method_signature_span(start: int) -> tuple[bool, int]:
            sig_start = lines[start].strip()
            if not any(sig_start.startswith(x) for x in ("public ", "protected ", "private ")):
                return False, start
            if " class " in f" {sig_start} ":
                return False, start

            combined = sig_start
            end = start
            while end + 1 < len(lines) and ")" not in combined and (end - start) < 12:
                end += 1
                combined += " " + lines[end].strip()

            is_method = "(" in combined and ")" in combined and ";" not in combined.split(")")[0]
            return is_method, end

        i = class_idx + 1
        while i < len(lines):
            if not lines[i].strip().startswith("@"):
                i += 1
                continue

            annotations, nxt = split_annotation_block(lines, i)
            j = nxt
            while j < len(lines) and not lines[j].strip():
                j += 1
            if j >= len(lines):
                break

            is_method, signature_end = method_signature_span(j)
            if is_method:
                for ann in annotations:
                    for method, sub_path in method_mappings(ann):
                        template = normalize_join(base_path, sub_path)
                        if template == "/**":
                            continue
                        sample = to_sample_path(template)
                        rel_source = str(java_file.relative_to(ROOT))
                        endpoints.append(Endpoint(method=method, path_template=template, path=sample, source=rel_source))
            i = signature_end + 1

    return dedupe_endpoints(endpoints)


def dedupe_endpoints(endpoints: Iterable[Endpoint]) -> list[Endpoint]:
    seen: set[tuple[str, str]] = set()
    deduped: list[Endpoint] = []
    for ep in endpoints:
        key = (ep.method, ep.path_template)
        if key in seen:
            continue
        seen.add(key)
        deduped.append(ep)
    deduped.sort(key=lambda x: (x.path_template, x.method))
    return deduped


def go_websocket_connector_endpoints() -> list[Endpoint]:
    source = "web-socket-connector/internal/app/app.go"
    endpoints = [
        Endpoint("GET", "/healthz", "/healthz", source),
        Endpoint("GET", "/connections", "/connections", source),
        Endpoint("GET", "/connections/{chargerId}", "/connections/charger-001", source),
        Endpoint("POST", "/connect", "/connect", source),
        Endpoint("POST", "/disconnect", "/disconnect", source),
        Endpoint("POST", "/send", "/send", source),
        Endpoint("POST", "/events", "/events", source),
    ]
    return dedupe_endpoints(endpoints)


def go_ocpi_simulator_endpoints() -> list[Endpoint]:
    source = "ocpi-simulator/internal/app/router.go"
    templates = [
        ("GET", "/healthz"),
        ("GET", "/readyz"),
        ("GET", "/ws"),
        ("GET", "/api/chargers"),
        ("POST", "/api/chargers"),
        ("GET", "/api/chargers/{chargerId}"),
        ("DELETE", "/api/chargers/{chargerId}"),
        ("POST", "/api/chargers/{chargerId}/sessions"),
        ("POST", "/api/sessions/{sessionId}/stop"),
        ("POST", "/api/sessions/{sessionId}/meter"),
        ("GET", "/ocpi/versions"),
        ("GET", "/ocpi/2.2.1"),
        ("GET", "/ocpi/2.2.1/credentials"),
        ("POST", "/ocpi/2.2.1/credentials"),
        ("PUT", "/ocpi/2.2.1/credentials"),
        ("GET", "/ocpi/2.2.1/locations"),
        ("GET", "/ocpi/2.2.1/locations/{locationId}"),
        ("GET", "/ocpi/2.2.1/locations/{locationId}/{evseUid}"),
        ("GET", "/ocpi/2.2.1/locations/{locationId}/{evseUid}/{connectorId}"),
        ("GET", "/ocpi/2.2.1/tariffs"),
        ("GET", "/ocpi/2.2.1/sessions"),
        ("POST", "/ocpi/2.2.1/sessions"),
        ("GET", "/ocpi/2.2.1/sessions/{sessionId}"),
        ("PATCH", "/ocpi/2.2.1/sessions/{sessionId}"),
        ("GET", "/ocpi/2.2.1/cdrs"),
        ("POST", "/ocpi/2.2.1/cdrs"),
        ("POST", "/ocpi/2.2.1/commands/{command}"),
        ("GET", "/ocpp/1.6/{chargePointId}"),
    ]
    endpoints = [
        Endpoint(method=m, path_template=t, path=to_sample_path(t), source=source) for m, t in templates
    ]
    return dedupe_endpoints(endpoints)


def build_module_payload(module: str, endpoints: list[Endpoint]) -> dict[str, object]:
    target = MODULE_TARGETS[module]
    return {
        "module": module,
        "target": target,
        "endpointCount": len(endpoints),
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "endpoints": [
            {
                "name": ep.name,
                "method": ep.method,
                "pathTemplate": ep.path_template,
                "path": ep.path,
                "body": ep.body,
                "expectedCodeRegex": ep.expected_code_regex,
                "source": ep.source,
            }
            for ep in endpoints
        ],
    }


def main() -> int:
    args = parse_args()
    requested = set(args.module or [])

    selected_modules = sorted(
        m for m in MODULE_TARGETS.keys() if not requested or m in requested
    )
    if requested and not selected_modules:
        raise SystemExit(f"No matching module for --module selection: {sorted(requested)}")

    ENDPOINTS_DIR.mkdir(parents=True, exist_ok=True)

    manifest_modules: list[dict[str, object]] = []
    total_endpoints = 0

    for module in selected_modules:
        if module in JAVA_MODULES:
            endpoints = parse_java_module(module)
        elif module == "web-socket-connector":
            endpoints = go_websocket_connector_endpoints()
        elif module == "ocpi-simulator":
            endpoints = go_ocpi_simulator_endpoints()
        else:
            endpoints = []

        payload = build_module_payload(module, endpoints)
        out_file = ENDPOINTS_DIR / f"{module}.json"
        out_file.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")

        manifest_modules.append({"module": module, "endpointCount": len(endpoints), "file": str(out_file.relative_to(PROJECT_ROOT))})
        total_endpoints += len(endpoints)
        print(f"[extract] {module}: {len(endpoints)} endpoints -> {out_file}")

    manifest = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "moduleCount": len(manifest_modules),
        "totalEndpoints": total_endpoints,
        "modules": manifest_modules,
    }
    manifest_file = ENDPOINTS_DIR / "manifest.json"
    manifest_file.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"[extract] manifest: {manifest_file} (totalEndpoints={total_endpoints})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
