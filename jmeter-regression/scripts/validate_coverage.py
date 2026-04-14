#!/usr/bin/env python3
"""Validate that generated JMX files fully cover extracted endpoints per module."""

from __future__ import annotations

import json
from pathlib import Path
import xml.etree.ElementTree as ET


ROOT = Path(__file__).resolve().parents[1]
ENDPOINTS_DIR = ROOT / "endpoints"
JMX_DIR = ROOT / "jmx"


def jmx_sampler_count(jmx_path: Path) -> int:
    tree = ET.parse(jmx_path)
    return len(tree.findall(".//HTTPSamplerProxy"))


def main() -> int:
    descriptor_files = sorted(p for p in ENDPOINTS_DIR.glob("*.json") if p.name != "manifest.json")
    if not descriptor_files:
        print("No endpoint descriptors found. Run extract_endpoints.py first.")
        return 1

    failed = False
    total_expected = 0
    total_actual = 0

    for descriptor in descriptor_files:
        payload = json.loads(descriptor.read_text(encoding="utf-8"))
        module = payload["module"]
        expected = int(payload["endpointCount"])
        jmx_file = JMX_DIR / f"{module}.jmx"
        if not jmx_file.exists():
            print(f"[FAIL] {module}: missing JMX file {jmx_file}")
            failed = True
            continue

        actual = jmx_sampler_count(jmx_file)
        total_expected += expected
        total_actual += actual

        if actual != expected:
            print(f"[FAIL] {module}: expected samplers={expected}, actual={actual}")
            failed = True
        else:
            print(f"[OK]   {module}: samplers={actual}")

    print(f"[summary] expectedSamplers={total_expected} actualSamplers={total_actual}")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())

