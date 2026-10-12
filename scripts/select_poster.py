#!/usr/bin/env python3
"""Suggest which records go on the A0 poster (target ≈ 650) and which stay app-only.

Every record gets  {"poster": true|false, "reason": "<code>", "zone": "<poster zone>"}.
Owner overrides live in data/curation/poster_overrides.json ({"<id>": true|false}) and always win.

Outputs:
  data/curation/poster_selection.json   machine-readable suggestion (+ overrides applied)
  exports/poster_selection.xlsx         Keep / Drop sheets with reasons, zone budget, override column
  docs/POSTER_DROP_LIST.md              every dropped record grouped by reason, for review on GitHub
"""
import json, os, re
from collections import Counter, defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EVENTS = json.load(open(os.path.join(ROOT, "data/merged/timeline.json"), encoding="utf-8"))["events"]
SERIES = json.load(open(os.path.join(ROOT, "data/merged/series.json"), encoding="utf-8"))["series"]
OVR_PATH = os.path.join(ROOT, "data/curation/poster_overrides.json")
OVERRIDES = json.load(open(OVR_PATH)) if os.path.exists(OVR_PATH) else {}

HIGHLIGHT = {s["id"] for s in SERIES if s.get("highlight") and not s.get("auto")}
CURATED = {s["id"] for s in SERIES if not s.get("auto")}
MAP_SERIES = {"patriarchs-travels", "exodus-route", "conquest-of-canaan", "settlement-of-the-land",
              "kingdom-of-david-and-solomon", "jesus-ministry-places", "spread-of-christianity",
              "tabernacle-and-high-priest", "temple-built-by-solomon"}

REASONS = {
    "future": "Future sequence — always shown",
    "series": "Member of a highlighted series (thread on the poster)",
    "chart_series": "Member of a reproduced jw.org chart (A6, B12 final week)",
    "span": "Span bar (life, reign, period, office, ban…)",
    "anchor": "Key event of its period",
    "bible_text": "Bible translation / preservation milestone",
    "weeds": "Selected 'weeds' (apostasy) marker",
    "book": "Bible book completed (books strip)",
    "modern_key": "Key modern milestone",
    "decade_stat": "Growth figure (one per decade)",
    # drops
    "x_covered": "Shown by its life/reign/office bar (birth, death, accession)",
    "x_index": "One-line Publications Index entry (beliefs clarified / convention theme) — app only",
    "x_secular": "Secular or political history detail — app only",
    "x_church": "Church/Christendom detail — app only (poster keeps Bible milestones + a few weeds)",
    "x_jesus_detail": "Detail row of Jesus' ministry (NWT App. A7) — app only",
    "x_apostolic_detail": "Detail of the apostolic period — app only",
    "x_modern_detail": "Modern-history detail (minor case, report, update) — app only",
    "x_stat": "Yearly statistic (one per decade kept)",
    "x_detail": "Other detail — app only",
    "x_budget": "Lower priority in its poster zone (zone budget full) — app only",
    "must": "Must-keep (lifespan, world power, prophetic period, kings 1117–607, Tamil Bible, key publications)",
    "budget": "Selected by priority score within its zone budget",
    "override_keep": "Kept by owner override",
    "override_drop": "Dropped by owner override",
}

BIBLE_TEXT_KEY = re.compile(r"Septuagint|Vulgate|Masoret|Codex|manuscript|Dead Sea|Chester Beatty|P52|Rylands|papyr|Gutenberg|print|Erasmus|"
                            r"Wycliffe|Tyndale|Luther's|Luther’s|Coverdale|Geneva|King James|Authorized|Bishops'|Douay|Reina|Valera|Almeida|"
                            r"Diodati|Tamil|Ziegenbalg|Carey|Chinese|Morrison|Judson|Bible Society|Bible societ|Polyglot|Greek text|"
                            r"Hebrew text|first complete|complete Bible|entire Bible|Cyril|Methodius|Slavonic|Gothic|Ulfilas|Wulfila|Syriac|"
                            r"Peshitta|Coptic|Armenian|Georgian|Ethiopic|divine name|Jehovah|Tetragrammaton|canon|Westcott|Griesbach|"
                            r"Kennicott|De Rossi|Tischendorf|Diatessaron|Origen|Hexapla|Jerome|Old Latin|Estienne|verse|chapter", re.I)
WEEDS_KEEP = {"b7-0001", "b7-0021", "b7-0023", "b7-0032", "b7-0033", "b7-0018", "b7-0068", "b7-0079", "b12-0060",
              "b7-0081", "b7-0092", "b7-0133", "b7-0140", "b7-0151", "b7-0099", "b12-0061"}
CHURCH_POSITIVE = {"b7-0072", "d1-0025", "d1-0026", "d1-0027", "d1-0028", "b7-0218", "b7-0106"}
INTERTEST_KEEP = {"b4-0086", "b4-0112", "b4-0113", "b4-0122", "b4-0129", "d1-0022", "b12-0036", "b12-0038"}
SECULAR_SPANS = {"b4-0076", "b7-0164", "b7-0150", "b7-0027", "b9-0070", "b9-0084", "b9-0031", "b8-0078"}
JESUS_KINDS = {"birth", "baptism", "death", "resurrection", "ascension", "passover", "temptation", "transfiguration",
               "appointment", "commission", "sermon", "anointing", "betrayal", "arrest", "trial", "burial", "festival"}
APOSTOLIC_KINDS = {"journey", "council", "conversion", "death", "outpouring", "baptism", "imprisonment", "destruction",
                   "siege", "revolt", "persecution", "founding", "flight", "writing_completed"}
MODERN_PUB = re.compile(r"Watch ?Tower|Zion|Studies in the Scriptures|Millennial Dawn|Photo-Drama|Golden Age|Consolation|Awake|"
                        r"New World Translation|NWT|Bible|Truth|Paradise|Teach|Enjoy Life|jw\.org|JW Library|Broadcasting|"
                        r"songbook|Kingdom Ministry|Divine Plan|Harp of God|Let God Be True|Draw Close|God's Kingdom Rules|Proclaimers", re.I)
MODERN_LEGAL = re.compile(r"Supreme Court|European Court|ECHR|Human Rights|landmark|Constitutional Court|Privy Council|ban|"
                          r"legal recognition|registered|registration", re.I)
MODERN_BUILD = re.compile(r"Bethel|headquarters|Warwick|Brooklyn|Patterson|Wallkill|Ramapo|Kingdom Hall|Assembly Hall|Bible House|"
                          r"Tabernacle|factory|printery|Gilead|branch", re.I)
MODERN_PREACH = re.compile(r"first|begin|began|introduced|radio|phonograph|house-to-house|pioneer|million|lands|countries|"
                           r"cart|public witnessing|sound car|placard|campaign", re.I)


# poster zones and their label budgets (≈ what fits at ≥ 9 pt on A0); must-keep items count against them
BUDGET = {
    "Row 1 · 4026–1000 B.C.E.": 80, "P1 Lives overlap": 20, "Row 2 · 1000–1 B.C.E.": 70,
    "P2 Kings & prophets": 70, "P3 World powers & Daniel": 10, "S Bible books strip": 66,
    "P4 Jesus 29–33": 95, "Row 3 · 1–100 C.E.": 30, "P5 Bible survives / wheat & weeds": 70,
    "P6 Modern by decade": 170, "P7 Future": 20,
}
KEY_KINDS = {"covenant", "decree", "destruction", "conquest", "deliverance", "founding", "name_change", "release",
             "resolution", "relocation", "baptism", "death", "birth", "dedication", "construction", "division",
             "judgment", "return", "exile", "miracle", "council", "translation", "printing", "writing_completed",
             "election", "appointment", "ban", "court_ruling", "outpouring", "conversion", "passover", "resurrection"}
FIRST = re.compile(r"\b(first|begins?|began|founded|established|completed|released|adopted|destroyed|falls?|banned|"
                   r"identified|announce[sd]?|introduced|launch|dedicat)", re.I)


def score(e):
    sc = 0.0
    if e["timing"] == "span":
        sc += 3
    ser = series_of(e)
    if ser & CURATED:
        sc += 2 + 0.5 * min(3, len(ser & CURATED))
    if e.get("images"):
        sc += 1
    sc += 0.5 * min(4, len({x["docid"] for x in e["sources"]}))
    if e["start"]["precision"] == "exact":
        sc += 0.5
    if e.get("event_kind") in KEY_KINDS:
        sc += 1.5
    if FIRST.search(e["title_en"]):
        sc += 1
    if e.get("title_ta"):
        sc += 0.3
    if e["category"] == "bible.jesus" and e.get("event_kind") in JESUS_KINDS:
        sc += 2
    if e["category"] == "bible.jesus" and WELL_KNOWN.search(e["title_en"]):
        sc += 2.5
    cat = e["category"]
    if cat in ("jw.doctrine", "jw.leadership", "bible.covenant", "bible.prophecy_fulfilled", "bible.temple", "bible.judgment"):
        sc += 1
    if cat == "jw.legal" and re.search(r"U\.S\. Supreme Court|Grand Chamber|unlawful|ban", e["title_en"]):
        sc += 1.5
    if e.get("event_kind") == "statistic":
        sc -= 1
    if e.get("event_kind") == "video_update":
        sc -= 1
    return round(sc, 2)


def era(e):
    sk = e["start"]["sort_key"]
    if sk >= 100000 or e["category"] == "future.prophecy":
        return "future"
    if e["category"].startswith("jw.") or sk >= 1870:
        return "jw"
    if e["category"].startswith("history.") or 100 <= sk < 1870:
        return "church"
    return "bible"


def series_of(e):
    return {m["id"] for m in e.get("series") or []}


WELL_KNOWN = re.compile(r"water into wine|first miracle|feeds 5,000|feeds 4,000|walks on (the )?sea|Lazarus|Sermon on the Mount|"
                        r"chooses (the )?12|12 apostles|Nicodemus|Samaritan woman|cleanses the temple|clears the temple|"
                        r"triumphal|rides into Jerusalem|Lord.s Evening Meal|Memorial|Gethsemane|agony in the garden|"
                        r"Peter.s confession|foretells (his )?death|resurrects|raises|widow.s son|Jairus|calms|storm|"
                        r"man born blind|ten lepers|Good Samaritan|prodigal|Zacchaeus|great commission|disciples of all nations|"
                        r"Peter denies|sentenced|Kingdom illustrations|Mount of Olives|sign of his presence", re.I)
MUST_TITLE = re.compile(r"Tamil|Enjoy Life Forever|Dead Sea Scrolls", re.I)


def decide(e, stat_keep):
    i, cat, kind, hint = e["id"], e["category"], e.get("event_kind"), e.get("chart_hint")
    if MUST_TITLE.search(e["title_en"]) and hint != "covered_by_span":
        return "must", "must"
    ser = series_of(e)
    ev_era = era(e)
    if ev_era == "future":
        return "must", "future"
    if hint == "covered_by_span":
        return False, "x_covered"
    if ser & HIGHLIGHT:
        return "must", "series"
    if "prophets-and-kings-a6" in ser:
        return "must", "chart_series"
    if hint == "index_entry":
        return False, "x_index"
    if e.get("span_kind") in ("lifespan", "world_power", "prophetic_period") or (e.get("span_kind") == "reign" and -1120 <= e["start"]["sort_key"] <= -600):
        return "must", "must"
    if e["timing"] == "span":
        if i in SECULAR_SPANS:
            return False, "x_secular"
        if i in WEEDS_KEEP:
            return "must", "weeds"
        if ev_era == "church" and cat in ("history.apostasy", "history.reform", "history.persecution") \
                and i not in CHURCH_POSITIVE:
            return False, "x_church"
        return True, "span"
    if cat == "bible.book_writing":
        return (True, "book") if i.startswith("b11") else (False, "x_detail")
    if ev_era == "church":
        if i in WEEDS_KEEP:
            return "must", "weeds"
        if i in CHURCH_POSITIVE:
            return True, "anchor"
        if cat in ("history.bible_translation", "history.bible_preservation") and BIBLE_TEXT_KEY.search(e["title_en"]):
            return True, "bible_text"
        return False, "x_church"
    if ev_era == "bible":
        if cat == "bible.intertestament":
            return (True, "anchor") if i in INTERTEST_KEEP else (False, "x_secular")
        if cat == "bible.jesus":
            return True, "anchor"
        if cat == "bible.apostolic":
            return True, "anchor"
        return True, "anchor"
    # modern
    if kind == "statistic":
        return (True, "decade_stat") if i in stat_keep else (False, "x_stat")
    if kind == "video_update" and cat != "jw.doctrine":
        return False, "x_modern_detail"
    t = e["title_en"]
    if cat in ("jw.leadership", "jw.education", "jw.persecution", "jw.doctrine", "bible.prophecy_fulfilled", "history.bible_translation"):
        return True, "modern_key"
    if cat == "jw.publication":
        return (True, "modern_key") if MODERN_PUB.search(t) else (False, "x_modern_detail")
    if cat == "jw.legal":
        return (True, "modern_key") if (MODERN_LEGAL.search(t) or hint == "span_endpoint") else (False, "x_modern_detail")
    if cat == "jw.construction":
        return (True, "modern_key") if MODERN_BUILD.search(t) else (False, "x_modern_detail")
    if cat == "jw.preaching":
        return (True, "modern_key") if MODERN_PREACH.search(t) else (False, "x_modern_detail")
    if cat == "jw.convention":
        return True, "modern_key"
    if cat == "jw.relief":
        return (True, "modern_key") if re.search(r"first|committee|Disaster Relief", t, re.I) else (False, "x_modern_detail")
    if cat == "jw.organization":
        return True, "modern_key"
    return False, "x_detail"


def zone(e):
    ev_era, cat, sk = era(e), e["category"], e["start"]["sort_key"]
    ser = series_of(e)
    if ev_era == "future":
        return "P7 Future"
    if e.get("span_kind") == "lifespan" and sk < -1600:
        return "P1 Lives overlap"
    if "prophets-and-kings-a6" in ser or (e.get("span_kind") in ("reign", "prophetic_activity") and -1120 <= sk <= -530):
        return "P2 Kings & prophets"
    if e.get("span_kind") == "world_power" or ("world-powers-daniel" in ser and e["timing"] == "span"):
        return "P3 World powers & Daniel"
    if cat == "bible.book_writing":
        return "S Bible books strip"
    if cat == "bible.jesus" or (1 <= sk < 34):
        return "P4 Jesus 29–33"
    if ev_era == "church":
        return "P5 Bible survives / wheat & weeds"
    if ev_era == "jw":
        return "P6 Modern by decade"
    if sk < -1000:
        return "Row 1 · 4026–1000 B.C.E."
    if sk < 0:
        return "Row 2 · 1000–1 B.C.E."
    return "Row 3 · 1–100 C.E."


def main():
    """Pass 1: hard keep ('must') / hard drop / candidate. Pass 2: fill each zone's budget by score."""
    # one growth statistic per decade: the latest in each decade
    stats = defaultdict(list)
    for e in EVENTS:
        if e.get("event_kind") == "statistic" and e["start"].get("year"):
            stats[e["start"]["year"] // 10].append(e)
    stat_keep = {max(v, key=lambda x: x["start"]["sort_key"])["id"] for v in stats.values()}

    sel, cands = {}, defaultdict(list)
    for e in EVENTS:
        state, reason = decide(e, stat_keep)
        z, sc = zone(e), score(e)
        if e["id"] in OVERRIDES:
            keep = bool(OVERRIDES[e["id"]])
            sel[e["id"]] = {"poster": keep, "reason": "override_keep" if keep else "override_drop", "zone": z, "score": sc}
        elif state == "must":
            sel[e["id"]] = {"poster": True, "reason": reason, "zone": z, "score": sc}
        elif state is True:
            cands[z].append((sc, e["id"], reason))
        else:
            sel[e["id"]] = {"poster": False, "reason": reason, "zone": z, "score": sc}
    for z, items in cands.items():
        used = sum(1 for v in sel.values() if v["poster"] and v["zone"] == z)
        room = max(0, BUDGET.get(z, 0) - used)
        for rank, (sc, i, reason) in enumerate(sorted(items, key=lambda x: (-x[0], x[1]))):
            keep = rank < room
            sel[i] = {"poster": keep, "reason": reason if keep else "x_budget", "zone": z, "score": sc}
    os.makedirs(os.path.join(ROOT, "data/curation"), exist_ok=True)
    json.dump({"generated": "2026-10-12", "target": 650, "reasons": REASONS, "selection": sel},
              open(os.path.join(ROOT, "data/curation/poster_selection.json"), "w"), indent=1)
    kept = [e for e in EVENTS if sel[e["id"]]["poster"]]
    print(f"poster: {len(kept)} kept ({sum(1 for e in kept if e['timing']=='span')} spans) / {len(EVENTS)}")
    print("by reason:", dict(Counter(sel[e['id']]["reason"] for e in EVENTS)))
    zc = Counter(sel[e['id']]["zone"] for e in kept)
    for z in BUDGET:
        print(f"  {z:38} kept {zc.get(z,0):4} / budget {BUDGET[z]}")
    print("by era kept:", dict(Counter(era(e) for e in kept)))
    return sel, stat_keep


def write_outputs(sel):
    from openpyxl import Workbook
    from openpyxl.styles import Alignment, Font, PatternFill
    from openpyxl.utils import get_column_letter
    from openpyxl.worksheet.datavalidation import DataValidation
    F = "Arial"
    head_fill, review = PatternFill("solid", fgColor="1F3864"), PatternFill("solid", fgColor="FFF2CC")
    by_id = {e["id"]: e for e in EVENTS}
    order = sorted(EVENTS, key=lambda e: (e["start"]["sort_key"], e["id"]))
    wb = Workbook()

    def sheet(title, rows, hdr, widths, review_col=None, dv=None):
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
        ws.freeze_panes = "C2"
        ws.auto_filter.ref = f"A1:{get_column_letter(len(hdr))}{len(rows) + 1}"
        if dv and rows:
            v = DataValidation(type="list", formula1=dv, allow_blank=True)
            ws.add_data_validation(v)
            col = get_column_letter(review_col)
            v.add(f"{col}2:{col}{len(rows) + 1}")
        return ws

    def row(e, v):
        return [e["id"], v["zone"], REASONS[v["reason"]], v["score"], "Span" if e["timing"] == "span" else "Point",
                e["date_label_en"], e["title_en"], e.get("title_ta") or "", e["category"],
                ", ".join(sorted({m["id"] for m in e.get("series") or []})), ""]
    hdr = ["ID", "Poster zone", "Why", "Score", "Type", "Date (as printed)", "Title", "Title (Tamil)", "Category", "Series"]
    widths = [10, 26, 46, 7, 7, 22, 56, 40, 22, 30, 12]
    keep_rows = [row(e, sel[e["id"]]) for e in order if sel[e["id"]]["poster"]]
    drop_rows = [row(e, sel[e["id"]]) for e in order if not sel[e["id"]]["poster"]]
    ws = wb.active
    ws.title = "Read me"
    lines = [
        ("A0 poster selection – review", ""),
        ("What this is", f"A suggestion of which records go on the A0 poster: {len(keep_rows)} kept, {len(drop_rows)} app-only. Nothing is deleted – dropped records stay in the data and the app."),
        ("Drop sheet", "Every record left off the poster, with the reason. Set '✎ Put on poster' to Yes to bring one back."),
        ("Keep sheet", "Every record on the poster, with its zone. Set '✎ Take off poster' to Yes to remove one."),
        ("Zones", "Budget per poster zone (how many labels fit at ≥ 9 pt). Must-keep items count against the budget; the rest are chosen by score."),
        ("Score", "Higher = more important: span bar, series membership, images, number of jw.org sources, exact date, key event type, 'first/founded/released…' in the title, Tamil text."),
        ("Send back", "Your Yes marks become data/curation/poster_overrides.json and always win over the suggestion."),
    ]
    for r, (a, b) in enumerate(lines, 1):
        ws.cell(row=r, column=1, value=a).font = Font(name=F, bold=True, size=14 if r == 1 else 10)
        ws.cell(row=r, column=2, value=b).font = Font(name=F, size=10)
        ws.cell(row=r, column=2).alignment = Alignment(wrap_text=True, vertical="top")
    ws.column_dimensions["A"].width, ws.column_dimensions["B"].width = 18, 110
    zc_keep, zc_drop = Counter(), Counter()
    for v in sel.values():
        (zc_keep if v["poster"] else zc_drop)[v["zone"]] += 1
    sheet("Zones", [[z, BUDGET[z], zc_keep.get(z, 0), zc_drop.get(z, 0)] for z in BUDGET] +
          [["Total", sum(BUDGET.values()), len(keep_rows), len(drop_rows)]],
          ["Zone", "Budget", "Kept", "Dropped"], [40, 10, 10, 10])
    rc = Counter(v["reason"] for v in sel.values())
    sheet("Reasons", [[k, REASONS[k], rc[k], "kept" if not k.startswith("x_") and k != "override_drop" else "dropped"]
                      for k in REASONS if rc.get(k)], ["Code", "Reason", "Records", "Effect"], [16, 80, 10, 10])
    sheet("Drop", drop_rows, hdr + ["✎ Put on poster"], widths, review_col=11, dv='"Yes"')
    sheet("Keep", keep_rows, hdr + ["✎ Take off poster"], widths, review_col=11, dv='"Yes"')
    wb.save(os.path.join(ROOT, "exports/poster_selection.xlsx"))

    # markdown drop list grouped by reason, then zone
    md = [f"# A0 poster – records left off ({len(drop_rows)})", "",
          f"Suggested poster set: **{len(keep_rows)} records** ({sum(1 for e in EVENTS if sel[e['id']]['poster'] and e['timing']=='span')} spans). "
          "Everything below stays in the data and the app; it is only left off the printed poster. "
          "To bring one back, mark it in `exports/poster_selection.xlsx` (Drop sheet) or add its id to `data/curation/poster_overrides.json`.", "",
          "| reason | records |", "|---|---|"]
    for k in REASONS:
        n = sum(1 for v in sel.values() if v["reason"] == k and not v["poster"])
        if n:
            md.append(f"| {REASONS[k]} | {n} |")
    for k in REASONS:
        items = [e for e in order if sel[e["id"]]["reason"] == k and not sel[e["id"]]["poster"]]
        if not items:
            continue
        md += ["", f"## {REASONS[k]} ({len(items)})", ""]
        byz = defaultdict(list)
        for e in items:
            byz[sel[e["id"]]["zone"]].append(e)
        for z in BUDGET:
            if byz.get(z):
                md.append(f"**{z}** ({len(byz[z])})")
                md.append("")
                for e in byz[z]:
                    md.append(f"- {e['date_label_en']} — {e['title_en']} `{e['id']}`")
                md.append("")
    open(os.path.join(ROOT, "docs/POSTER_DROP_LIST.md"), "w", encoding="utf-8").write("\n".join(md) + "\n")
    print(f"wrote exports/poster_selection.xlsx and docs/POSTER_DROP_LIST.md ({len(drop_rows)} dropped)")


if __name__ == "__main__":
    sel, _ = main()
    write_outputs(sel)
