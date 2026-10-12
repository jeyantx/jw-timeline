#!/usr/bin/env python3
"""Rule-decided tiers (rubric C6) recomputed from the current merged data -> data/curation/tiers/_fixed.json.
Run after merge.py and before select_poster.py. Graded files in data/curation/tiers/ cover everything else."""
import json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EVENTS = json.load(open(os.path.join(ROOT, "data/merged/timeline.json"), encoding="utf-8"))["events"]


def fixed(e):
    sk, sp, t = e["start"]["sort_key"], e.get("span_kind"), e["title_en"]
    if sk >= 100000 or e["category"] == "future.prophecy":
        return 1, "future record"
    if e.get("chart_hint") == "covered_by_span":
        return 4, "shown by its life/reign/office bar"
    if sp in ("world_power", "prophetic_period"):
        return 1, f"{sp.replace('_', ' ')} span"
    if sp == "lifespan":
        if sk < -1600:
            return 1, "patriarch lifespan"
        return (2, "lifespan of a Bible person") if sk < 100 else (3, "individual's lifespan (after Bible times)")
    if sp == "reign" and ({"kingdom-of-judah", "kingdom-of-israel"} & set(e.get("tags", [])) or
                          e["id"] in ("b12-0009", "b12-0012", "b12-0013", "d1-0071")):
        return 2, "reign of a king of Israel/Judah"
    if sp in ("prophetic_activity", "judgeship"):
        return 2, f"{sp.replace('_', ' ')} span"
    if sp == "office" and re.search(r"president of the Watch Tower|Governing Body", t):
        return 3, "individual tenure (Kingdom over persons)"
    if e["id"].startswith("b11") and e.get("event_kind") == "writing_completed":
        return 2, "Bible books strip"
    if e.get("chart_hint") == "index_entry":
        return 3, "Publications Index one-line entry"
    return None


out = {}
for e in EVENTS:
    f = fixed(e)
    if f:
        out[e["id"]] = {"tier": f[0], "rule": "fixed", "why": f[1]}
os.makedirs(os.path.join(ROOT, "data/curation/tiers"), exist_ok=True)
json.dump({"era": "_fixed", "graded_by": "rule C6", "tiers": out},
          open(os.path.join(ROOT, "data/curation/tiers/_fixed.json"), "w"), indent=0)
print(f"fixed tiers: {len(out)}")
