#!/usr/bin/env python3
"""A0 poster selection by priority TIER (rubric: docs/POSTER_TIER_RUBRIC.md).

Rule: the poster shows every record of tier 1 or 2 and nothing below. Same rule in every era.
Tiers come from data/curation/tiers/*.json (rule-decided `_fixed.json` + rubric grading per era + new batches);
owner changes go in data/curation/tier_overrides.json  {"<id>": <tier 1-4>}  and always win.

Outputs:
  data/curation/poster_selection.json   id -> {tier, rule, why, poster, zone}
  data/curation/consistency_report.md   similar records with different tiers (to review)
  exports/poster_selection.xlsx         Read me · Zones · Tiers · Consistency · Drop · Keep (with ✎ new tier column)
  docs/POSTER_DROP_LIST.md              every record not on the poster, grouped by tier and rule
"""
import glob, json, os, re
from collections import Counter, defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EVENTS = json.load(open(os.path.join(ROOT, "data/merged/timeline.json"), encoding="utf-8"))["events"]
BY_ID = {e["id"]: e for e in EVENTS}
OVR_PATH = os.path.join(ROOT, "data/curation/tier_overrides.json")
OVERRIDES = json.load(open(OVR_PATH)) if os.path.exists(OVR_PATH) else {}
POSTER_MAX_TIER = 2

TIER_NAME = {1: "Landmark", 2: "Major", 3: "Notable detail (app)", 4: "Fine detail / redundant (app)"}
RULE_NAME = {
    "fixed": "Decided by rule C6 (span type, covered by a bar, future, books, index entry)",
    "T1-anchor": "Listed landmark anchor", "T1-defines": "Defines its period",
    "T2-major": "Major within its period", "T2-series": "Core step of a highlight series",
    "T3-context": "Context detail", "T3-person": "Individual person (modern era: Kingdom over persons)",
    "T3-politics": "Secular / church politics", "T4-covered": "Shown by its span bar",
    "T4-duplicate": "Duplicates another record", "T4-detail": "Fine detail / statistic / admin",
    "override": "Changed by owner", "ungraded": "Not yet graded (defaults to 3)",
}
TARGETS = {"Row 1 · 4026–1000 B.C.E.": 130, "P1 Lives overlap": 16, "Row 2 · 1000–1 B.C.E.": 115,
           "P2 Kings & prophets": 66, "P3 World powers & Daniel": 8, "S Bible books strip": 66,
           "P4 Jesus 2 B.C.E.–33 C.E.": 100, "Row 3 · 33–100 C.E.": 50, "P5 Bible survives / wheat & weeds": 30,
           "P6 Kingdom activity 1870–2026": 80, "P7 Future": 20}


def series_of(e):
    return {m["id"] for m in e.get("series") or []}


def era(e):
    sk, c = e["start"]["sort_key"], e["category"]
    if sk >= 100000 or c == "future.prophecy":
        return "future"
    if c.startswith("jw.") or sk >= 1870:
        return "modern"
    if c.startswith("history.") or 100 <= sk < 1870:
        return "church"
    return "bible"


def zone(e):
    ev_era, cat, sk, sp = era(e), e["category"], e["start"]["sort_key"], e.get("span_kind")
    ser = series_of(e)
    if ev_era == "future":
        return "P7 Future"
    if sp == "lifespan" and sk < -1600:
        return "P1 Lives overlap"
    if "prophets-and-kings-a6" in ser or (sp in ("reign", "prophetic_activity") and -1120 <= sk <= -530):
        return "P2 Kings & prophets"
    if sp == "world_power":
        return "P3 World powers & Daniel"
    if cat == "bible.book_writing":
        return "S Bible books strip"
    if ev_era == "church":
        return "P5 Bible survives / wheat & weeds"
    if ev_era == "modern":
        return "P6 Kingdom activity 1870–2026"
    if cat == "bible.jesus" or (-4 <= sk < 33.45):
        return "P4 Jesus 2 B.C.E.–33 C.E."
    if sk >= 33.45:
        return "Row 3 · 33–100 C.E."
    if sk < -1000:
        return "Row 1 · 4026–1000 B.C.E."
    return "Row 2 · 1000–1 B.C.E."


def load_tiers():
    tiers = {}
    files = sorted(glob.glob(os.path.join(ROOT, "data/curation/tiers/*.json")))
    files.sort(key=lambda f: (os.path.basename(f) != "_fixed.json", f))  # fixed first, graded files refine
    for f in files:
        doc = json.load(open(f, encoding="utf-8"))
        for i, t in doc.get("tiers", {}).items():
            if os.path.basename(f) == "_fixed.json" or i not in tiers or tiers[i]["rule"] == "fixed":
                # graded files may only override a fixed tier for index entries (raise 3 -> 2)
                if i in tiers and tiers[i]["rule"] == "fixed" and BY_ID.get(i, {}).get("chart_hint") != "index_entry":
                    continue  # rule-decided tiers (C6) win over grading, except index entries which may be raised
                tiers[i] = {"tier": int(t["tier"]), "rule": t.get("rule", ""), "why": t.get("why", "")}
    return tiers


def consistency(sel):
    """Flag groups of similar records (same category + event_kind, or near-identical titles) with mixed poster status."""
    groups = defaultdict(list)
    for e in EVENTS:
        if e.get("chart_hint") == "covered_by_span":
            continue
        groups[(era(e), e["category"], e.get("event_kind") or "-", e["timing"])].append(e)
    lines, n = [], 0
    for key, items in sorted(groups.items()):
        on = [x for x in items if sel[x["id"]]["poster"]]
        off = [x for x in items if not sel[x["id"]]["poster"]]
        if on and off and len(items) <= 40:
            n += 1
            lines.append(f"\n### {key[0]} · {key[1]} · {key[2]} · {key[3]} — {len(on)} on poster, {len(off)} off\n")
            for x in sorted(items, key=lambda x: x["start"]["sort_key"]):
                s = sel[x["id"]]
                lines.append(f"- {'**ON**' if s['poster'] else 'off'} T{s['tier']} {x['date_label_en']} — {x['title_en']} `{x['id']}` — {s['why']}")
    head = ["# Consistency report", "",
            "Groups of similar records (same era, category, event kind, point/span) where some are on the poster and some are not. "
            "This is expected when the rubric distinguishes them (landmark vs detail); check that each 'why' justifies the difference.",
            "", f"{n} mixed groups."]
    open(os.path.join(ROOT, "data/curation/consistency_report.md"), "w", encoding="utf-8").write("\n".join(head + lines) + "\n")
    return n


def main():
    tiers = load_tiers()
    sel = {}
    for e in EVENTS:
        t = tiers.get(e["id"]) or {"tier": 3, "rule": "ungraded", "why": "not yet graded"}
        if e["id"] in OVERRIDES:
            t = {"tier": int(OVERRIDES[e["id"]]), "rule": "override", "why": f"owner set tier {OVERRIDES[e['id']]}"}
        sel[e["id"]] = {**t, "poster": t["tier"] <= POSTER_MAX_TIER, "zone": zone(e)}
    os.makedirs(os.path.join(ROOT, "data/curation"), exist_ok=True)
    json.dump({"generated": "2026-10-12", "rule": f"poster = tier <= {POSTER_MAX_TIER}", "tier_names": TIER_NAME,
               "selection": sel}, open(os.path.join(ROOT, "data/curation/poster_selection.json"), "w"), indent=1)
    kept = [e for e in EVENTS if sel[e["id"]]["poster"]]
    print(f"poster (tier ≤ {POSTER_MAX_TIER}): {len(kept)} records ({sum(e['timing']=='span' for e in kept)} spans) of {len(EVENTS)}")
    print("tiers:", dict(sorted(Counter(v['tier'] for v in sel.values()).items())),
          "| ungraded:", sum(1 for v in sel.values() if v["rule"] == "ungraded"))
    zc = Counter(v["zone"] for v in sel.values() if v["poster"])
    for z, tgt in TARGETS.items():
        print(f"  {z:38} {zc.get(z, 0):4}  (target ≈ {tgt})")
    print("mixed groups for review:", consistency(sel))
    return sel


def write_outputs(sel):
    from openpyxl import Workbook
    from openpyxl.styles import Alignment, Font, PatternFill
    from openpyxl.utils import get_column_letter
    from openpyxl.worksheet.datavalidation import DataValidation
    F = "Arial"
    head_fill, review = PatternFill("solid", fgColor="1F3864"), PatternFill("solid", fgColor="FFF2CC")
    tier_fill = {1: "C6EFCE", 2: "E2EFDA", 3: "F2F2F2", 4: "FFFFFF"}
    order = sorted(EVENTS, key=lambda e: (e["start"]["sort_key"], e["id"]))
    wb = Workbook()

    def sheet(title, rows, hdr, widths, review_col=None, dv=None, tier_col=None):
        ws = wb.create_sheet(title)
        for c, h in enumerate(hdr, 1):
            cell = ws.cell(row=1, column=c, value=h)
            cell.font, cell.fill = Font(name=F, bold=True, color="FFFFFF"), head_fill
            cell.alignment = Alignment(wrap_text=True, vertical="center")
            ws.column_dimensions[get_column_letter(c)].width = widths[c - 1]
        for r, row in enumerate(rows, 2):
            for c, v in enumerate(row, 1):
                cell = ws.cell(row=r, column=c, value=v if v != "" else None)
                cell.font = Font(name=F, size=10)
                if review_col and c == review_col:
                    cell.fill = review
                if tier_col and c == tier_col and v in tier_fill:
                    cell.fill = PatternFill("solid", fgColor=tier_fill[v])
        ws.freeze_panes = "C2"
        ws.auto_filter.ref = f"A1:{get_column_letter(len(hdr))}{len(rows) + 1}"
        if dv and rows:
            v = DataValidation(type="list", formula1=dv, allow_blank=True)
            ws.add_data_validation(v)
            col = get_column_letter(review_col)
            v.add(f"{col}2:{col}{len(rows) + 1}")
        return ws

    def row(e):
        s = sel[e["id"]]
        return [e["id"], s["zone"], s["tier"], TIER_NAME[s["tier"]], RULE_NAME.get(s["rule"], s["rule"]), s["why"],
                "Span" if e["timing"] == "span" else "Point", e["date_label_en"], e["title_en"], e.get("title_ta") or "",
                e["category"], ", ".join(sorted(series_of(e))), ""]
    hdr = ["ID", "Poster zone", "Tier", "Tier name", "Rule", "Why", "Type", "Date (as printed)", "Title", "Title (Tamil)",
           "Category", "Series", "✎ New tier (1-4)"]
    widths = [10, 30, 6, 18, 34, 40, 7, 22, 56, 36, 22, 28, 10]
    keep_rows = [row(e) for e in order if sel[e["id"]]["poster"]]
    drop_rows = [row(e) for e in order if not sel[e["id"]]["poster"]]
    ws = wb.active
    ws.title = "Read me"
    lines = [
        ("A0 poster selection by tier", ""),
        ("Rule", f"The poster shows every tier 1 (Landmark) and tier 2 (Major) record, and nothing below. Same rule in every era. "
                 f"{len(keep_rows)} on the poster, {len(drop_rows)} app-only. Nothing is deleted."),
        ("Rubric", "docs/POSTER_TIER_RUBRIC.md defines the tiers, the consistency rules (like items → like tiers), the people-vs-Kingdom rule for 1870–2026, and the era targets."),
        ("Drop / Keep", "Every record with its tier, rule and reason. To change one, type a new tier (1-4) in the yellow column: 1-2 puts it on the poster, 3-4 takes it off."),
        ("Consistency", "Similar records where some are on and some off the poster — check that the 'why' justifies the difference."),
        ("Zones", "How many records each poster zone gets at this rule, against the design target."),
        ("Send back", "Your changes become data/curation/tier_overrides.json and always win."),
    ]
    for r, (a, b) in enumerate(lines, 1):
        ws.cell(row=r, column=1, value=a).font = Font(name=F, bold=True, size=14 if r == 1 else 10)
        ws.cell(row=r, column=2, value=b).font = Font(name=F, size=10)
        ws.cell(row=r, column=2).alignment = Alignment(wrap_text=True, vertical="top")
    ws.column_dimensions["A"].width, ws.column_dimensions["B"].width = 16, 110
    zc_keep, zc_drop = Counter(), Counter()
    for v in sel.values():
        (zc_keep if v["poster"] else zc_drop)[v["zone"]] += 1
    sheet("Zones", [[z, TARGETS[z], zc_keep.get(z, 0), zc_drop.get(z, 0)] for z in TARGETS] +
          [["Total", sum(TARGETS.values()), len(keep_rows), len(drop_rows)]],
          ["Zone", "Target", "On poster", "App only"], [40, 10, 10, 10])
    tz = Counter((v["zone"], v["tier"]) for v in sel.values())
    sheet("Tiers", [[z] + [tz.get((z, t), 0) for t in (1, 2, 3, 4)] for z in TARGETS],
          ["Zone", "T1", "T2", "T3", "T4"], [40, 8, 8, 8, 8])
    cons = []
    for ln in open(os.path.join(ROOT, "data/curation/consistency_report.md"), encoding="utf-8").read().splitlines():
        if ln.startswith("### "):
            cons.append([ln[4:], ""])
        elif ln.startswith("- "):
            cons.append(["", ln[2:]])
    sheet("Consistency", cons, ["Group", "Record"], [70, 140])
    sheet("Drop", drop_rows, hdr, widths, review_col=13, dv='"1,2,3,4"', tier_col=3)
    sheet("Keep", keep_rows, hdr, widths, review_col=13, dv='"1,2,3,4"', tier_col=3)
    wb.save(os.path.join(ROOT, "exports/poster_selection.xlsx"))

    md = [f"# A0 poster — records not on the poster ({len(drop_rows)})", "",
          f"Rule: the poster shows **every tier 1 and tier 2 record ({len(keep_rows)})** and nothing below (rubric: "
          "`docs/POSTER_TIER_RUBRIC.md`). Everything here stays in the data and the app. To change a record's tier, use the "
          "yellow column in `exports/poster_selection.xlsx` or add it to `data/curation/tier_overrides.json`.", ""]
    for t in (3, 4):
        items = [e for e in order if not sel[e["id"]]["poster"] and sel[e["id"]]["tier"] == t]
        md += [f"## Tier {t} — {TIER_NAME[t]} ({len(items)})", ""]
        byz = defaultdict(list)
        for e in items:
            byz[sel[e["id"]]["zone"]].append(e)
        for z in TARGETS:
            if not byz.get(z):
                continue
            md += [f"### {z} ({len(byz[z])})", ""]
            for e in byz[z]:
                md.append(f"- {e['date_label_en']} — {e['title_en']} `{e['id']}` · {sel[e['id']]['why']}")
            md.append("")
    open(os.path.join(ROOT, "docs/POSTER_DROP_LIST.md"), "w", encoding="utf-8").write("\n".join(md) + "\n")
    print(f"wrote exports/poster_selection.xlsx, docs/POSTER_DROP_LIST.md, data/curation/consistency_report.md")


def stamp_merged(sel):
    """Write tier + poster flag into data/merged/timeline.json so the app can filter by tier."""
    path = os.path.join(ROOT, "data/merged/timeline.json")
    doc = json.load(open(path, encoding="utf-8"))
    for e in doc["events"]:
        s = sel[e["id"]]
        e["tier"], e["tier_rule"], e["tier_why"], e["poster"] = s["tier"], s["rule"], s["why"], s["poster"]
    json.dump(doc, open(path, "w", encoding="utf-8"), ensure_ascii=False, indent=1)


if __name__ == "__main__":
    s = main()
    write_outputs(s)
    stamp_merged(s)
