#!/usr/bin/env python3
"""Validate data/raw/*.json against schema/event.schema.json and print a summary.
Usage: python3 scripts/validate.py [files...]   (defaults to data/raw/*.json)
"""
import json, sys, glob, re, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
schema = json.load(open(os.path.join(ROOT, "schema/event.schema.json")))
try:
    import jsonschema
except ImportError:
    jsonschema = None
    print("note: pip install jsonschema for full validation; running basic checks only", file=sys.stderr)

files = sys.argv[1:] or sorted(p for p in glob.glob(os.path.join(ROOT, "data/raw/b*.json")) if re.fullmatch(r"b\d+\.json", os.path.basename(p)))
total_ok = 0; total_err = 0
for f in files:
    try:
        doc = json.load(open(f, encoding="utf-8"))
    except Exception as e:
        print(f"{f}: INVALID JSON: {e}"); total_err += 1; continue
    events = doc["events"] if isinstance(doc, dict) and "events" in doc else doc
    if not isinstance(events, list):
        print(f"{f}: top level must be a list or {{'events': [...]}}"); total_err += 1; continue
    errs = 0; ids = set(); slugs = set()
    for i, ev in enumerate(events):
        probs = []
        if jsonschema:
            for e in jsonschema.Draft7Validator(schema).iter_errors(ev):
                probs.append(f"{'/'.join(map(str,e.path))}: {e.message[:120]}")
        else:
            for k in schema["required"]:
                if k not in ev: probs.append(f"missing {k}")
        if ev.get("id") in ids: probs.append(f"duplicate id {ev.get('id')}")
        if ev.get("slug") in slugs: probs.append(f"duplicate slug {ev.get('slug')}")
        ids.add(ev.get("id")); slugs.add(ev.get("slug"))
        d = ev.get("date", {})
        if d.get("year") is not None and d.get("era") and d.get("precision") != "undated":
            exp = -d["year"] if d["era"] == "BCE" else d["year"]
            if abs(d.get("sort_key", 0) - exp) > 1.0: probs.append(f"sort_key {d.get('sort_key')} inconsistent with {d['year']} {d['era']}")
        for s in ev.get("sources", []):
            for u in (s.get("url_en"), s.get("url_ta")):
                if u and not re.match(r"^https://(wol\.jw\.org|www\.jw\.org)/", u): probs.append(f"non-jw.org url {u}")
        if probs:
            errs += 1
            print(f"{os.path.basename(f)} [{i}] {ev.get('id')}: " + " | ".join(probs[:4]))
    ta = sum(1 for e in events if e.get("title_ta"))
    img = sum(1 for e in events if e.get("images"))
    print(f"{os.path.basename(f)}: {len(events)} events, {errs} with problems, {ta} with Tamil title, {img} with images")
    total_ok += len(events) - errs; total_err += errs
print(f"TOTAL ok={total_ok} problems={total_err}")
sys.exit(1 if total_err else 0)
