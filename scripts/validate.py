#!/usr/bin/env python3
"""Validate event files (schema/event.schema.json, v2) and series files (schema/series.schema.json).

Usage: python3 scripts/validate.py [files...]
Default: every data/raw/b*.json, data/derived/d*.json and data/series/*.json.
A file under data/series/ is validated as a series: schema + every member/group/pairs_with id must exist
in the raw/derived event files. Exit code 1 if any problem is found.
"""
import glob, json, os, re, sys, warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCHEMA = json.load(open(os.path.join(ROOT, "schema/event.schema.json")))
try:
    import jsonschema
    VALIDATOR = jsonschema.Draft7Validator(SCHEMA)
except ImportError:
    VALIDATOR = None
    print("note: pip install jsonschema for full validation; running basic checks only", file=sys.stderr)

URL_RE = re.compile(r"^https://(wol\.jw\.org|www\.jw\.org)/")


def event_files():
    out = [p for p in glob.glob(os.path.join(ROOT, "data/raw/b*.json")) if re.fullmatch(r"b\d+\.json", os.path.basename(p))]
    out += glob.glob(os.path.join(ROOT, "data/derived/d*.json"))
    return sorted(out)


def default_files():
    return event_files() + sorted(glob.glob(os.path.join(ROOT, "data/series/*.json")))


SERIES_SCHEMA = json.load(open(os.path.join(ROOT, "schema/series.schema.json")))
if VALIDATOR:
    _store = {SCHEMA["$id"]: SCHEMA, "event.schema.json": SCHEMA,
              SCHEMA["$id"].rsplit("/", 1)[0] + "/event.schema.json": SCHEMA}
    SERIES_VALIDATOR = jsonschema.Draft7Validator(
        SERIES_SCHEMA, resolver=jsonschema.RefResolver(base_uri=SERIES_SCHEMA["$id"], referrer=SERIES_SCHEMA, store=_store))
_KNOWN_IDS = None


def known_ids():
    global _KNOWN_IDS
    if _KNOWN_IDS is None:
        _KNOWN_IDS = set()
        for f in event_files():
            try:
                _KNOWN_IDS |= {e["id"] for e in json.load(open(f, encoding="utf-8"))["events"]}
            except Exception:
                pass
    return _KNOWN_IDS


def check_series(f, doc):
    probs = []
    if VALIDATOR:
        probs += [f"{'/'.join(map(str, e.path)) or '(root)'}: {e.message[:140]}" for e in SERIES_VALIDATOR.iter_errors(doc)]
    ids = known_ids()
    groups = {g["id"] for g in doc.get("groups", [])}
    for g in doc.get("groups", []):
        if g.get("span_id") and g["span_id"] not in ids:
            probs.append(f"group {g['id']}: span_id {g['span_id']} not found")
    for m in doc.get("members", []):
        if m["event_id"] not in ids:
            probs.append(f"member {m['order']}: event_id {m['event_id']} not found")
        for p in m.get("pairs_with", []):
            if p not in ids:
                probs.append(f"member {m['order']}: pairs_with {p} not found")
        if m.get("group") and m["group"] not in groups:
            probs.append(f"member {m['order']}: group {m['group']} not defined")
    for s in doc.get("sources", []):
        if not URL_RE.match(s.get("url_en", "")):
            probs.append(f"non-jw.org source url {s.get('url_en')}")
    return probs


def signed(y, era):
    return -y if era == "BCE" else y


def check_point(label, p):
    probs = []
    if not p:
        return probs
    y, era, prec, sk = p.get("year"), p.get("era"), p.get("precision"), p.get("sort_key")
    if y is not None and era and prec not in ("undated", "unknown"):
        base = signed(y, era)
        if prec == "before" and sk > base + 1.0:
            probs.append(f"{label}.sort_key {sk} is after 'before {y} {era}'")
        elif prec == "after" and sk < base - 1.0:
            probs.append(f"{label}.sort_key {sk} is before 'after {y} {era}'")
        elif prec not in ("before", "after") and abs(sk - base) > 1.0:
            probs.append(f"{label}.sort_key {sk} inconsistent with {y} {era}")
    if prec == "between":
        lt = p.get("latest")
        if not lt:
            probs.append(f"{label}: precision 'between' needs latest")
        elif lt["sort_key"] < sk:
            probs.append(f"{label}.latest is before {label}")
    elif p.get("latest"):
        probs.append(f"{label}: latest only allowed with precision 'between'")
    if prec in ("exact", "approx", "before", "after", "between") and y is None:
        probs.append(f"{label}: precision {prec} but year is null")
    return probs


def check_event(ev):
    probs = []
    if VALIDATOR:
        for e in VALIDATOR.iter_errors(ev):
            probs.append(f"{'/'.join(map(str, e.path)) or '(root)'}: {e.message[:140]}")
    else:
        for k in SCHEMA["required"]:
            if k not in ev:
                probs.append(f"missing {k}")
    probs += check_point("start", ev.get("start"))
    if ev.get("timing") == "span":
        end = ev.get("end") or {}
        probs += check_point("end", end)
        if end.get("precision") == "ongoing" and ev["start"].get("precision") != "undated" and end.get("year") is not None:
            probs.append("end: ongoing must have year null")
        if end.get("precision") not in ("unknown", "ongoing", "undated") and ev["start"].get("precision") not in ("unknown", "undated"):
            if end.get("sort_key", 0) < ev["start"].get("sort_key", 0):
                probs.append(f"end ({end.get('sort_key')}) before start ({ev['start'].get('sort_key')})")
    if ev.get("timing") == "point" and ev.get("start", {}).get("precision") == "ongoing":
        probs.append("point cannot be ongoing")
    for s in ev.get("sources", []):
        for u in (s.get("url_en"), s.get("url_ta")):
            if u and not URL_RE.match(u):
                probs.append(f"non-jw.org url {u}")
    return probs


def main():
    files = sys.argv[1:] or default_files()
    total_ok = total_bad = 0
    for f in files:
        try:
            doc = json.load(open(f, encoding="utf-8"))
        except Exception as e:
            print(f"{f}: INVALID JSON: {e}")
            total_bad += 1
            continue
        if os.path.basename(os.path.dirname(f)) == "series":
            probs = check_series(f, doc)
            for pr in probs[:12]:
                print(f"{os.path.basename(f)}: {pr}")
            print(f"{os.path.basename(f)} (series): {len(doc.get('members', []))} members, {len(probs)} problems")
            total_bad += 1 if probs else 0
            total_ok += 0 if probs else 1
            continue
        events = doc["events"] if isinstance(doc, dict) and "events" in doc else doc
        if not isinstance(events, list):
            print(f"{f}: top level must be a list or {{'events': [...]}}")
            total_bad += 1
            continue
        ids, slugs, bad = set(), set(), 0
        for i, ev in enumerate(events):
            probs = check_event(ev)
            if ev.get("id") in ids:
                probs.append(f"duplicate id {ev.get('id')}")
            if ev.get("slug") in slugs:
                probs.append(f"duplicate slug {ev.get('slug')}")
            ids.add(ev.get("id"))
            slugs.add(ev.get("slug"))
            if probs:
                bad += 1
                print(f"{os.path.basename(f)} [{i}] {ev.get('id')}: " + " | ".join(probs[:4]))
        spans = sum(1 for e in events if e.get("timing") == "span")
        ta = sum(1 for e in events if e.get("title_ta"))
        print(f"{os.path.basename(f)}: {len(events)} events ({spans} spans), {bad} with problems, {ta} with Tamil title")
        total_ok += len(events) - bad
        total_bad += bad
    print(f"TOTAL ok={total_ok} problems={total_bad}")
    sys.exit(1 if total_bad else 0)


if __name__ == "__main__":
    main()
