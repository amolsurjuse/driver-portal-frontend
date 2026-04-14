#!/usr/bin/env python3
"""Generate one JMeter .jmx test plan per module from endpoint descriptor JSON files."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
import xml.etree.ElementTree as ET


ROOT = Path(__file__).resolve().parents[1]
ENDPOINTS_DIR = ROOT / "endpoints"
JMX_DIR = ROOT / "jmx"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate JMeter plans from endpoint metadata.")
    parser.add_argument(
        "--module",
        action="append",
        help="Only generate for the given module (can be supplied multiple times).",
    )
    return parser.parse_args()


def indent(elem: ET.Element, level: int = 0) -> None:
    spacing = "\n" + level * "  "
    if len(elem):
        if not elem.text or not elem.text.strip():
            elem.text = spacing + "  "
        for child in elem:
            indent(child, level + 1)
        if not child.tail or not child.tail.strip():
            child.tail = spacing
    if level and (not elem.tail or not elem.tail.strip()):
        elem.tail = spacing


def make_string_prop(parent: ET.Element, name: str, value: str) -> ET.Element:
    node = ET.SubElement(parent, "stringProp", {"name": name})
    node.text = value
    return node


def make_bool_prop(parent: ET.Element, name: str, value: bool) -> ET.Element:
    node = ET.SubElement(parent, "boolProp", {"name": name})
    node.text = "true" if value else "false"
    return node


def make_int_prop(parent: ET.Element, name: str, value: int) -> ET.Element:
    node = ET.SubElement(parent, "intProp", {"name": name})
    node.text = str(value)
    return node


def argument_prop(parent: ET.Element, arg_name: str, value: str) -> ET.Element:
    el = ET.SubElement(
        parent,
        "elementProp",
        {"name": arg_name, "elementType": "Argument"},
    )
    make_string_prop(el, "Argument.name", arg_name)
    make_string_prop(el, "Argument.value", value)
    make_string_prop(el, "Argument.metadata", "=")
    return el


def add_test_plan_variables(parent: ET.Element, module: str, target: dict[str, object]) -> None:
    user_vars = ET.SubElement(
        parent,
        "elementProp",
        {
            "name": "TestPlan.user_defined_variables",
            "elementType": "Arguments",
            "guiclass": "ArgumentsPanel",
            "testclass": "Arguments",
            "testname": "User Defined Variables",
            "enabled": "true",
        },
    )
    args_col = ET.SubElement(user_vars, "collectionProp", {"name": "Arguments.arguments"})
    argument_prop(args_col, "MODULE", module)
    argument_prop(args_col, "PROTOCOL", str(target["protocol"]))
    argument_prop(args_col, "HOST", str(target["host"]))
    argument_prop(args_col, "PORT", str(target["port"]))
    argument_prop(args_col, "AUTH_TOKEN", "${__P(authToken,)}")
    argument_prop(args_col, "INTERNAL_API_KEY", "${__P(internalApiKey,dev-rbac-internal-key)}")
    argument_prop(args_col, "CONNECT_TIMEOUT_MS", "${__P(connectTimeoutMs,10000)}")
    argument_prop(args_col, "RESPONSE_TIMEOUT_MS", "${__P(responseTimeoutMs,20000)}")


def add_header_manager(parent_hash_tree: ET.Element) -> None:
    header_manager = ET.SubElement(
        parent_hash_tree,
        "HeaderManager",
        {
            "guiclass": "HeaderPanel",
            "testclass": "HeaderManager",
            "testname": "HTTP Headers",
            "enabled": "true",
        },
    )
    headers = ET.SubElement(header_manager, "collectionProp", {"name": "HeaderManager.headers"})
    for name, value in [
        ("Accept", "application/json"),
        ("Content-Type", "application/json"),
        ("Authorization", "Bearer ${AUTH_TOKEN}"),
        ("X-Internal-Api-Key", "${INTERNAL_API_KEY}"),
    ]:
        h = ET.SubElement(headers, "elementProp", {"name": "", "elementType": "Header"})
        make_string_prop(h, "Header.name", name)
        make_string_prop(h, "Header.value", value)


def add_http_defaults(parent_hash_tree: ET.Element) -> None:
    defaults = ET.SubElement(
        parent_hash_tree,
        "ConfigTestElement",
        {
            "guiclass": "HttpDefaultsGui",
            "testclass": "ConfigTestElement",
            "testname": "HTTP Request Defaults",
            "enabled": "true",
        },
    )
    args_prop = ET.SubElement(defaults, "elementProp", {"name": "HTTPsampler.Arguments", "elementType": "Arguments"})
    ET.SubElement(args_prop, "collectionProp", {"name": "Arguments.arguments"})
    make_string_prop(defaults, "HTTPSampler.domain", "${HOST}")
    make_string_prop(defaults, "HTTPSampler.port", "${PORT}")
    make_string_prop(defaults, "HTTPSampler.protocol", "${PROTOCOL}")
    make_string_prop(defaults, "HTTPSampler.contentEncoding", "UTF-8")
    make_string_prop(defaults, "HTTPSampler.path", "")
    make_string_prop(defaults, "HTTPSampler.concurrentPool", "6")
    make_string_prop(defaults, "HTTPSampler.connect_timeout", "${CONNECT_TIMEOUT_MS}")
    make_string_prop(defaults, "HTTPSampler.response_timeout", "${RESPONSE_TIMEOUT_MS}")


def add_cookie_manager(parent_hash_tree: ET.Element) -> None:
    cookie_mgr = ET.SubElement(
        parent_hash_tree,
        "CookieManager",
        {
            "guiclass": "CookiePanel",
            "testclass": "CookieManager",
            "testname": "HTTP Cookie Manager",
            "enabled": "true",
        },
    )
    ET.SubElement(cookie_mgr, "collectionProp", {"name": "CookieManager.cookies"})
    make_bool_prop(cookie_mgr, "CookieManager.clearEachIteration", False)
    make_bool_prop(cookie_mgr, "CookieManager.controlledByThreadGroup", False)


def add_thread_group(parent_hash_tree: ET.Element) -> tuple[ET.Element, ET.Element]:
    tg = ET.SubElement(
        parent_hash_tree,
        "ThreadGroup",
        {
            "guiclass": "ThreadGroupGui",
            "testclass": "ThreadGroup",
            "testname": "Regression Thread Group",
            "enabled": "true",
        },
    )
    loop_controller = ET.SubElement(
        tg,
        "elementProp",
        {
            "name": "ThreadGroup.main_controller",
            "elementType": "LoopController",
            "guiclass": "LoopControlPanel",
            "testclass": "LoopController",
            "testname": "Loop Controller",
            "enabled": "true",
        },
    )
    make_bool_prop(loop_controller, "LoopController.continue_forever", False)
    make_string_prop(loop_controller, "LoopController.loops", "1")
    make_string_prop(tg, "ThreadGroup.on_sample_error", "continue")
    make_string_prop(tg, "ThreadGroup.num_threads", "${__P(threads,1)}")
    make_string_prop(tg, "ThreadGroup.ramp_time", "${__P(rampUp,1)}")
    make_bool_prop(tg, "ThreadGroup.same_user_on_next_iteration", True)
    make_string_prop(tg, "ThreadGroup.duration", "")
    make_string_prop(tg, "ThreadGroup.delay", "")
    make_bool_prop(tg, "ThreadGroup.scheduler", False)
    tg_tree = ET.Element("hashTree")
    return tg, tg_tree


def add_sampler(parent_tree: ET.Element, endpoint: dict[str, str]) -> None:
    sampler = ET.SubElement(
        parent_tree,
        "HTTPSamplerProxy",
        {
            "guiclass": "HttpTestSampleGui",
            "testclass": "HTTPSamplerProxy",
            "testname": endpoint["name"],
            "enabled": "true",
        },
    )
    make_bool_prop(sampler, "HTTPSampler.postBodyRaw", endpoint["method"] in {"POST", "PUT", "PATCH"})
    args_prop = ET.SubElement(sampler, "elementProp", {"name": "HTTPsampler.Arguments", "elementType": "Arguments"})
    args_col = ET.SubElement(args_prop, "collectionProp", {"name": "Arguments.arguments"})
    if endpoint["method"] in {"POST", "PUT", "PATCH"}:
        body_arg = ET.SubElement(args_col, "elementProp", {"name": "", "elementType": "HTTPArgument"})
        make_bool_prop(body_arg, "HTTPArgument.always_encode", False)
        make_string_prop(body_arg, "Argument.value", endpoint["body"] or "{}")
        make_string_prop(body_arg, "Argument.metadata", "=")
        make_bool_prop(body_arg, "HTTPArgument.use_equals", True)

    make_string_prop(sampler, "HTTPSampler.domain", "")
    make_string_prop(sampler, "HTTPSampler.port", "")
    make_string_prop(sampler, "HTTPSampler.protocol", "")
    make_string_prop(sampler, "HTTPSampler.contentEncoding", "UTF-8")
    make_string_prop(sampler, "HTTPSampler.path", endpoint["path"])
    make_string_prop(sampler, "HTTPSampler.method", endpoint["method"])
    make_bool_prop(sampler, "HTTPSampler.follow_redirects", True)
    make_bool_prop(sampler, "HTTPSampler.auto_redirects", False)
    make_bool_prop(sampler, "HTTPSampler.use_keepalive", True)
    make_bool_prop(sampler, "HTTPSampler.DO_MULTIPART_POST", False)
    make_string_prop(sampler, "HTTPSampler.embedded_url_re", "")
    make_string_prop(sampler, "HTTPSampler.connect_timeout", "${CONNECT_TIMEOUT_MS}")
    make_string_prop(sampler, "HTTPSampler.response_timeout", "${RESPONSE_TIMEOUT_MS}")

    sampler_tree = ET.SubElement(parent_tree, "hashTree")

    assertion = ET.SubElement(
        sampler_tree,
        "JSR223Assertion",
        {
            "guiclass": "TestBeanGUI",
            "testclass": "JSR223Assertion",
            "testname": f"Assert {endpoint['method']} {endpoint['pathTemplate']}",
            "enabled": "true",
        },
    )
    make_string_prop(assertion, "scriptLanguage", "groovy")
    make_string_prop(assertion, "parameters", "")
    make_string_prop(assertion, "filename", "")
    suffix = f' for {endpoint["method"]} {endpoint["pathTemplate"]}'
    suffix = suffix.replace("\\", "\\\\").replace('"', '\\"')
    script = (
        "def code = prev.getResponseCode() ?: ''\n"
        "def regex = /" + endpoint["expectedCodeRegex"] + "/\n"
        "if (!(code ==~ regex)) {\n"
        "  AssertionResult.setFailure(true)\n"
        f'  AssertionResult.setFailureMessage("Unexpected HTTP code " + code + "{suffix}")\n'
        "}\n"
    )
    make_string_prop(assertion, "script", script)
    ET.SubElement(sampler_tree, "hashTree")


def build_module_jmx(module_payload: dict[str, object], output_file: Path) -> None:
    module = str(module_payload["module"])
    target = dict(module_payload["target"])
    endpoints = list(module_payload["endpoints"])

    root = ET.Element("jmeterTestPlan", {"version": "1.2", "properties": "5.0", "jmeter": "5.6.3"})
    root_tree = ET.SubElement(root, "hashTree")

    test_plan = ET.SubElement(
        root_tree,
        "TestPlan",
        {
            "guiclass": "TestPlanGui",
            "testclass": "TestPlan",
            "testname": f"{module} Regression",
            "enabled": "true",
        },
    )
    make_string_prop(test_plan, "TestPlan.comments", f"Generated module regression plan for {module}")
    make_bool_prop(test_plan, "TestPlan.functional_mode", False)
    make_bool_prop(test_plan, "TestPlan.serialize_threadgroups", False)
    add_test_plan_variables(test_plan, module, target)
    make_string_prop(test_plan, "TestPlan.user_define_classpath", "")
    make_bool_prop(test_plan, "TestPlan.tearDown_on_shutdown", True)

    plan_tree = ET.SubElement(root_tree, "hashTree")
    add_cookie_manager(plan_tree)
    ET.SubElement(plan_tree, "hashTree")
    add_header_manager(plan_tree)
    ET.SubElement(plan_tree, "hashTree")
    add_http_defaults(plan_tree)
    ET.SubElement(plan_tree, "hashTree")

    thread_group, thread_group_tree = add_thread_group(plan_tree)
    plan_tree.append(thread_group_tree)

    for ep in endpoints:
        add_sampler(thread_group_tree, ep)

    indent(root)
    output_file.write_text('<?xml version="1.0" encoding="UTF-8"?>\n' + ET.tostring(root, encoding="unicode"), encoding="utf-8")
    print(f"[jmx] {module}: {len(endpoints)} samplers -> {output_file}")


def main() -> int:
    args = parse_args()
    requested = set(args.module or [])

    JMX_DIR.mkdir(parents=True, exist_ok=True)

    endpoint_files = sorted(p for p in ENDPOINTS_DIR.glob("*.json") if p.name != "manifest.json")
    if requested:
        endpoint_files = [p for p in endpoint_files if p.stem in requested]

    if not endpoint_files:
        raise SystemExit("No endpoint descriptor files found. Run scripts/extract_endpoints.py first.")

    for endpoint_file in endpoint_files:
        payload = json.loads(endpoint_file.read_text(encoding="utf-8"))
        output = JMX_DIR / f"{payload['module']}.jmx"
        build_module_jmx(payload, output)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
