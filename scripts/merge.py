#!/usr/bin/env python3
"""Merge research batches and derived spans into data/merged/timeline.json (schema v2).

Inputs : data/raw/b*.json (research batches) + data/derived/d*.json (spans built by scripts/derive_spans.py)
Outputs: data/merged/timeline.json, data/merged/duplicates_report.md

* Ids are STABLE: the merged record keeps its batch id (b3-0017, d1-0004). Deep links survive rebuilds.
* Cross-batch duplicates (same timing, same start year, similar title) are folded into one record;
  every reference to a dropped id (related_ids, start/end_event_id, parent_id) is repointed to the kept id.
* Sorted by start.sort_key, then end.sort_key (points before spans that start at the same moment).
* Tamil titles missing from jw.org pages may be filled from the owner's sheet when year + verse match.
"""
import csv, glob, json, os, re
from collections import defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def batch_files():
    raw = [p for p in glob.glob(os.path.join(ROOT, "data/raw/b*.json")) if re.fullmatch(r"b\d+\.json", os.path.basename(p))]
    raw.sort(key=lambda p: int(re.search(r"b(\d+)\.json$", p).group(1)))
    return raw + sorted(glob.glob(os.path.join(ROOT, "data/derived/d*.json")))


FILES = batch_files()
events = []
for f in FILES:
    for ev in json.load(open(f, encoding="utf-8"))["events"]:
        ev["batch"] = os.path.basename(f)[:-5]
        ev["source_ids"] = [ev["id"]]
        events.append(ev)

STOP = set("the of a an and in to is are at by for from on his her their king israel judah born dies death birth "
           "begins completed book writing writes jesus".split())


def toks(s):
    return {t for t in re.findall(r"[a-z]+", (s or "").lower()) if t not in STOP and len(t) > 2}


def sc_keys(ev):
    return {f"{s.get('book_num')}:{s.get('chapter')}" for s in ev.get("scriptures", []) if s.get("book_num") and s.get("chapter")}


def pair_is_dup(a, b):
    if a["batch"] == b["batch"] or a["timing"] != b["timing"]:
        return False, 0
    if a["batch"].startswith("d") or b["batch"].startswith("d"):
        return False, 0  # derived spans never duplicate research records by construction
    ta, tb = toks(a["title_en"]), toks(b["title_en"])
    shared = ta & tb
    overlap = len(shared) / max(1, min(len(ta), len(tb)))
    same_cat = a["category"] == b["category"]
    same_kind = (a.get("event_kind") or "") == (b.get("event_kind") or "")
    if a["category"] == "bible.book_writing" and same_cat:
        ba = {s.get("book_num") for s in a.get("scriptures", [])}
        bb = {s.get("book_num") for s in b.get("scriptures", [])}
        return bool(ba & bb), 1.0
    if not same_cat and a["category"].split(".")[0] != b["category"].split(".")[0]:
        return False, overlap
    if len(shared) >= 2 and overlap >= 0.6:
        return True, overlap
    if len(shared) == 1 and same_kind and same_kind != "" and (sc_keys(a) & sc_keys(b)):
        return True, overlap
    return False, overlap


def merge_into(keep, drop):
    seen = {s["docid"] for s in keep["sources"]}
    for s in drop.get("sources", []):
        if s["docid"] not in seen:
            keep["sources"].append(s)
            seen.add(s["docid"])
    for k in ("title_ta", "description_ta", "date_label_ta"):
        if not keep.get(k) and drop.get(k):
            keep[k] = drop[k]
    urls = {i["url"] for i in keep.get("images", [])}
    for i in drop.get("images", []):
        if i["url"] not in urls:
            keep.setdefault("images", []).append(i)
    keep.setdefault("conflicts", []).extend(drop.get("conflicts", []))
    if drop["date_label_en"] != keep["date_label_en"]:
        keep["conflicts"].append({"docid": None, "value": drop["date_label_en"],
                                  "note": f"date as given by merged duplicate {drop['id']} ({drop['batch']}): {drop['title_en']}"})
    keep.setdefault("merged_from", []).append({"id": drop["id"], "batch": drop["batch"], "title_en": drop["title_en"]})
    keep["source_ids"] = sorted(set(keep["source_ids"] + drop["source_ids"]))
    keep["related_ids"] = [r for r in dict.fromkeys(keep.get("related_ids", []) + drop.get("related_ids", [])) if r != keep["id"]]


# ---- duplicate detection --------------------------------------------------------------------------
by_year = defaultdict(list)
for ev in events:
    s = ev["start"]
    by_year[(s.get("year"), s.get("era"))].append(ev)
auto, review, dropped, redirect = [], [], set(), {}


def fold(keep, drop, ov):
    auto.append((keep, drop, ov))
    merge_into(keep, drop)
    dropped.add(id(drop))
    redirect[drop["id"]] = keep["id"]


for key, group in by_year.items():
    if key[0] is None:
        continue
    for i in range(len(group)):
        for j in range(i + 1, len(group)):
            a, b = group[i], group[j]
            if id(a) in dropped or id(b) in dropped:
                continue
            isdup, ov = pair_is_dup(a, b)
            if not isdup:
                continue
            if a["category"] == "bible.book_writing" == b["category"]:
                keep, drop = (a, b) if a["batch"] == "b11" else (b, a) if b["batch"] == "b11" else (a, b)
                fold(keep, drop, ov)
            elif "b11" in (a["batch"], b["batch"]):
                keep, drop = (b, a) if a["batch"] == "b11" else (a, b)
                fold(keep, drop, ov)
            elif {a["batch"], b["batch"]} == {"b3", "b4"}:  # 607 B.C.E. seam: kings batch wins
                keep, drop = (a, b) if a["batch"] == "b3" else (b, a)
                fold(keep, drop, ov)
            else:
                review.append((a, b, round(ov, 2)))

MANUAL = {  # drop (batch, slug) -> keep (batch, slug)
    ("b5", "holy-spirit-poured-out-at-pentecost"): ("b6", "pentecost-holy-spirit-poured-out"),
    ("b5", "peter-opens-way-3000-baptized"): ("b6", "pentecost-3000-baptized"),
    ("b4", "john-birth-foretold-3"): ("b5", "angel-gabriel-foretells-the-birth-of-john-the-baptist-to-zec"),
    ("b7", "russell-born"): ("b8", "russell-born"),
    ("b7", "russell-begins-study"): ("b8", "russell-faith-reestablished"),
}
idx = {(e["batch"], e["slug"]): e for e in events}
for dkey, kkey in MANUAL.items():
    d, k = idx.get(dkey), idx.get(kkey)
    if d and k and id(d) not in dropped:
        fold(k, d, 1.0)
        review[:] = [r for r in review if d not in (r[0], r[1])]
review = [r for r in review if id(r[0]) not in dropped and id(r[1]) not in dropped]
events = [e for e in events if id(e) not in dropped]


# ---- repoint references to dropped ids ------------------------------------------------------------
def resolve(i):
    seen = set()
    while i in redirect and i not in seen:
        seen.add(i)
        i = redirect[i]
    return i


ids = {e["id"] for e in events}
dangling = []
for ev in events:
    for k in ("start_event_id", "end_event_id", "parent_id"):
        if ev.get(k):
            ev[k] = resolve(ev[k])
            if ev[k] not in ids:
                dangling.append((ev["id"], k, ev[k]))
    rel = []
    for r in ev.get("related_ids", []):
        r = resolve(r)
        if r != ev["id"] and r not in rel:
            rel.append(r)
            if r not in ids:
                dangling.append((ev["id"], "related_ids", r))
    ev["related_ids"] = rel

# children of each span, for the app
children = defaultdict(list)
for ev in events:
    if ev.get("parent_id"):
        children[ev["parent_id"]].append(ev["id"])

events.sort(key=lambda e: (e["start"]["sort_key"], (e.get("end") or e["start"])["sort_key"], e["id"]))

# ---- Tamil titles from the owner's sheet ----------------------------------------------------------
csvp = os.path.join(ROOT, "research/Bible Timeline Tamil - Sheet.csv")
bn = os.path.join(ROOT, "data/raw/book_names.json")
enriched = 0
if os.path.exists(csvp) and os.path.exists(bn):
    books = json.load(open(bn, encoding="utf-8"))
    books = books.get("books", []) if isinstance(books, dict) else books
    ta2num = {}
    for b in books:
        for k in (b.get("ta_abbr"), b.get("ta_name")):
            if k:
                ta2num[k.replace(".", "").strip()] = b["book_num"]
    ta2num.update({"1 இரா": 11, "2 இரா": 12, "1 இராஜா": 11, "2 இராஜா": 12, "நியாயா": 7, "யாத்தி": 2, "லூக்": 42,
                   "மாற்": 41, "அப்போ": 44})

    def lookup(key):
        key = key.replace(".", "").strip()
        if key in ta2num:
            return ta2num[key]
        for k, v in ta2num.items():
            if key.startswith(k) or k.startswith(key):
                return v
        return None

    def parse_ta_date(s):
        m = re.search(r"(\d{1,4})", s or "")
        if not m:
            return None
        era = "BCE" if "மு" in s.split(str(m.group(1)))[0] or "பொ.ச.மு" in s else "CE"
        return int(m.group(1)), era

    def parse_ta_verse(v):
        out = set()
        for part in re.split(r"[;\n]", v or ""):
            m = re.match(r"\s*(\d?\s*[^\d\s][^\d]*?)\.?\s*(\d+):", part.strip())
            if m:
                num = lookup(m.group(1))
                if num:
                    out.add(f"{num}:{m.group(2)}")
        return out

    for r in csv.DictReader(open(csvp, encoding="utf-8")):
        pd = parse_ta_date(r["Date"])
        if not pd or not r["Event"].strip():
            continue
        vk = parse_ta_verse(r["Verse"])
        for ev in events:
            s = ev["start"]
            if ev["timing"] == "point" and (s.get("year"), s.get("era")) == pd and (vk & sc_keys(ev)) and not ev.get("title_ta"):
                ev["title_ta"] = r["Event"].strip().split("\n")[0]
                ev["notes"] = ((ev.get("notes") or "") + " [title_ta from owner's Tamil sheet]").strip()
                enriched += 1
                break

for ev in events:
    if children.get(ev["id"]):
        ev["child_ids"] = children[ev["id"]]

# ---- write --------------------------------------------------------------------------------------------
os.makedirs(os.path.join(ROOT, "data/merged"), exist_ok=True)
n_span = sum(1 for e in events if e["timing"] == "span")
json.dump({"schema_version": 2, "generated": "2026-10-10", "count": len(events),
           "points": len(events) - n_span, "spans": n_span, "events": events},
          open(os.path.join(ROOT, "data/merged/timeline.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)

with open(os.path.join(ROOT, "data/merged/duplicates_report.md"), "w", encoding="utf-8") as fh:
    fh.write(f"# Auto-merged duplicates ({len(auto)})\n\nRules: bible.book_writing → b11 wins; other b11 vs chronology batch → "
             "chronology batch wins; b3 vs b4 at the 607 B.C.E. seam → b3 wins; plus a short manual list in scripts/merge.py. "
             "Sources, Tamil and images are folded into the kept record and references to the dropped id are repointed.\n\n")
    for keep, drop, ov in sorted(auto, key=lambda x: x[0]["start"]["sort_key"]):
        fh.write(f"- **{keep['date_label_en']}** kept [{keep['id']}] {keep['title_en']}  ← dropped [{drop['id']}] {drop['title_en']}\n")
    fh.write(f"\n# Needs manual review ({len(review)})\n\n")
    for a, b, ov in review:
        fh.write(f"- **{a['date_label_en']}** [{a['id']}] {a['title_en']}\n  vs [{b['id']}] {b['title_en']}  (title overlap {ov})\n")
    fh.write(f"\n# Dangling references ({len(dangling)})\n\n")
    for i, k, r in dangling:
        fh.write(f"- {i}.{k} → {r} (not in merged set)\n")

cats = defaultdict(int)
kinds = defaultdict(int)
for ev in events:
    cats[ev["category"]] += 1
    if ev["timing"] == "span":
        kinds[ev["span_kind"]] += 1
print(f"merged {len(events)} records ({len(events) - n_span} points, {n_span} spans) from {len(FILES)} files; "
      f"{len(auto)} duplicates folded, {len(review)} for review, {len(dangling)} dangling refs; "
      f"Tamil titles {sum(1 for e in events if e.get('title_ta'))} (+{enriched} from sheet)")
print("  spans by kind: " + ", ".join(f"{k} {v}" for k, v in sorted(kinds.items(), key=lambda x: -x[1])))
