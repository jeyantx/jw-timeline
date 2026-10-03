#!/usr/bin/env python3
"""Merge data/raw/b*.json into data/merged/timeline.json.
- Sorts by date.sort_key
- Re-assigns global ids (ev-00001...) while keeping batch id in `source_ids`
- Detects likely duplicates across batches (same year/era + shared scripture book:chapter OR title token overlap)
  and writes them to data/merged/duplicates_report.md for manual review (does NOT auto-drop).
- Optional: enrich Tamil fields from research/Bible Timeline Tamil - Sheet.csv by (year, verse) match.
"""
import json, glob, os, re, csv, sys
from collections import defaultdict
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = sorted([p for p in glob.glob(os.path.join(ROOT, "data/raw/b*.json")) if re.fullmatch(r"b\d+\.json", os.path.basename(p))], key=lambda p: int(re.search(r"b(\d+)\.json$", p).group(1)))
events = []
for f in RAW:
    doc = json.load(open(f, encoding="utf-8"))
    for ev in (doc["events"] if isinstance(doc, dict) else doc):
        ev.setdefault("source_ids", [])
        ev["source_ids"].append(ev["id"])
        ev["batch"] = os.path.basename(f)[:-5]
        events.append(ev)

STOP = set("the of a an and in to is are at by for from on his her their king israel judah born dies death birth begins completed book writing writes jesus".split())
def toks(s): return {t for t in re.findall(r"[a-z]+", (s or "").lower()) if t not in STOP and len(t) > 2}
def sc_keys(ev): return {f"{s.get('book_num')}:{s.get('chapter')}" for s in ev.get("scriptures", []) if s.get("book_num") and s.get("chapter")}

# duplicates -----------------------------------------------------------------
def pair_is_dup(a, b):
    if a["batch"] == b["batch"]: return False, 0
    ta, tb = toks(a["title_en"]), toks(b["title_en"])
    shared = ta & tb
    overlap = len(shared) / max(1, min(len(ta), len(tb)))
    same_cat = a["category"] == b["category"]
    same_kind = (a.get("event_kind") or "") == (b.get("event_kind") or "")
    if a["category"] == "bible.book_writing" and same_cat:
        # same book? compare book_num of first scripture
        ba = {s.get("book_num") for s in a.get("scriptures", [])}; bb = {s.get("book_num") for s in b.get("scriptures", [])}
        return bool(ba & bb), 1.0
    if not same_cat and a["category"].split(".")[0] != b["category"].split(".")[0]: return False, overlap
    if len(shared) >= 2 and overlap >= 0.6: return True, overlap
    if len(shared) == 1 and same_kind and same_kind != "" and (sc_keys(a) & sc_keys(b)): return True, overlap
    return False, overlap

def merge_into(keep, drop):
    seen = {s["docid"] for s in keep["sources"]}
    for s in drop.get("sources", []):
        if s["docid"] not in seen: keep["sources"].append(s); seen.add(s["docid"])
    for k in ("title_ta", "description_ta"):
        if not keep.get(k) and drop.get(k): keep[k] = drop[k]
    if not keep["date"].get("display_ta") and drop["date"].get("display_ta"): keep["date"]["display_ta"] = drop["date"]["display_ta"]
    urls = {i["url"] for i in keep.get("images", [])}
    for i in drop.get("images", []):
        if i["url"] not in urls: keep.setdefault("images", []).append(i)
    keep.setdefault("conflicts", []).extend(drop.get("conflicts", []))
    if drop["date"]["display_en"] != keep["date"]["display_en"]:
        keep["conflicts"].append({"docid": None, "value": drop["date"]["display_en"], "note": f"date as given by merged duplicate {drop['id']} ({drop['batch']}): {drop['title_en']}"})
    keep.setdefault("merged_from", []).append({"id": drop["id"], "batch": drop["batch"], "title_en": drop["title_en"]})
    keep["source_ids"] = sorted(set(keep["source_ids"] + drop["source_ids"]))

by_year = defaultdict(list)
for ev in events:
    d = ev["date"]; by_year[(d.get("year"), d.get("era"))].append(ev)
auto, review = [], []
dropped = set()
for key, group in by_year.items():
    if key[0] is None: continue
    for i in range(len(group)):
        for j in range(i+1, len(group)):
            a, b = group[i], group[j]
            if id(a) in dropped or id(b) in dropped: continue
            isdup, ov = pair_is_dup(a, b)
            if not isdup: continue
            # deterministic winner
            if a["category"] == "bible.book_writing" == b["category"]:
                keep, drop = (a, b) if a["batch"] == "b11" else (b, a) if b["batch"] == "b11" else (a, b)
                auto.append((keep, drop, ov)); merge_into(keep, drop); dropped.add(id(drop))
            elif "b11" in (a["batch"], b["batch"]):
                keep, drop = (b, a) if a["batch"] == "b11" else (a, b)
                auto.append((keep, drop, ov)); merge_into(keep, drop); dropped.add(id(drop))
            else:
                review.append((a, b, round(ov, 2)))
# explicit seam resolutions: (keep batch, keep slug) <- (drop batch, drop slug)
SEAMS = [
    (("b3", "jerusalem-and-temple-destroyed"), ("b4", None)),
]
MANUAL = {  # drop (batch, slug) -> keep (batch, slug); resolved after auto pass
    ("b5", "holy-spirit-poured-out-at-pentecost"): ("b6", "pentecost-holy-spirit-poured-out"),
    ("b5", "peter-opens-way-3000-baptized"): ("b6", "pentecost-3000-baptized"),
    ("b4", "john-birth-foretold-3"): ("b5", "angel-gabriel-foretells-the-birth-of-john-the-baptist-to-zec"),
    ("b7", "russell-born"): ("b8", "russell-born"),
    ("b7", "russell-begins-study"): ("b8", "russell-faith-reestablished"),
}
# 607 B.C.E. seam: for every remaining review pair where one side is b3 and the other b4, keep b3
for a, b, ov in list(review):
    if {a["batch"], b["batch"]} == {"b3", "b4"} and id(a) not in dropped and id(b) not in dropped:
        keep, drop = (a, b) if a["batch"] == "b3" else (b, a)
        auto.append((keep, drop, ov)); merge_into(keep, drop); dropped.add(id(drop)); review.remove((a, b, ov))
idx = {(e["batch"], e["slug"]): e for e in events}
for dkey, kkey in MANUAL.items():
    d, k = idx.get(dkey), idx.get(kkey)
    if d and k and id(d) not in dropped:
        auto.append((k, d, 1.0)); merge_into(k, d); dropped.add(id(d))
        review[:] = [r for r in review if d not in (r[0], r[1])]
events = [e for e in events if id(e) not in dropped]
dups = review

events.sort(key=lambda e: e["date"]["sort_key"])
for n, ev in enumerate(events, 1):
    ev["id"] = f"ev-{n:05d}"

# Tamil enrichment from owner's sheet
csvp = os.path.join(ROOT, "research/Bible Timeline Tamil - Sheet.csv")
bn = os.path.join(ROOT, "data/raw/book_names.json")
enriched = 0
if os.path.exists(csvp) and os.path.exists(bn):
    books = json.load(open(bn, encoding="utf-8"))
    if isinstance(books, dict): books = books.get("books", [])
    ta2num = {}
    for b in books:
        for k in (b.get("ta_abbr"), b.get("ta_name")):
            if k: ta2num[k.replace(".", "").strip()] = b["book_num"]
    ta2num.update({"1 இரா": 11, "2 இரா": 12, "1 இராஜா": 11, "2 இராஜா": 12, "நியாயா": 7, "யாத்தி": 2, "லூக்": 42, "மாற்": 41, "அப்போ": 44})
    def lookup(key):
        key = key.replace(".", "").strip()
        if key in ta2num: return ta2num[key]
        for k, v in ta2num.items():
            if key.startswith(k) or k.startswith(key): return v
        return None
    def parse_ta_date(s):
        m = re.search(r"(\d{1,4})", s or ""); 
        if not m: return None
        era = "BCE" if "மு" in s.split(str(m.group(1)))[0] or "பொ.ச.மு" in s else "CE"
        return int(m.group(1)), era
    def parse_ta_verse(v):
        out = set()
        for part in re.split(r"[;\n]", v or ""):
            m = re.match(r"\s*(\d?\s*[^\d\s][^\d]*?)\.?\s*(\d+):", part.strip())
            if m:
                num = lookup(m.group(1))
                if num: out.add(f"{num}:{m.group(2)}")
        return out
    rows = list(csv.DictReader(open(csvp, encoding="utf-8")))
    for r in rows:
        pd = parse_ta_date(r["Date"])
        if not pd or not r["Event"].strip(): continue
        vk = parse_ta_verse(r["Verse"])
        for ev in events:
            d = ev["date"]
            if (d.get("year"), d.get("era")) == pd and (vk & sc_keys(ev)) and not ev.get("title_ta"):
                ev["title_ta"] = r["Event"].strip().split("\n")[0]
                ev.setdefault("notes", None)
                ev["notes"] = ((ev["notes"] or "") + " [title_ta from owner's Tamil sheet]").strip()
                enriched += 1
                break

os.makedirs(os.path.join(ROOT, "data/merged"), exist_ok=True)
json.dump({"generated": "2026-10-03", "count": len(events), "events": events},
          open(os.path.join(ROOT, "data/merged/timeline.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
with open(os.path.join(ROOT, "data/merged/duplicates_report.md"), "w", encoding="utf-8") as fh:
    fh.write(f"# Auto-merged duplicates ({len(auto)})\n\nRule: bible.book_writing → b11 wins; other b11 vs chronology batch → chronology batch wins. Sources/Tamil/images folded into the kept event.\n\n")
    for keep, drop, ov in sorted(auto, key=lambda x: x[0]["date"]["sort_key"]):
        fh.write(f"- **{keep['date']['display_en']}** kept [{keep['batch']}] {keep['title_en']}  ← dropped [{drop['batch']}] {drop['title_en']}\n")
    fh.write(f"\n# Needs manual review ({len(dups)})\n\nBoth kept. Decide which to keep/merge.\n\n")
    for a, b, ov in sorted(dups, key=lambda x: x[0]["date"]["sort_key"]):
        fh.write(f"- **{a['date']['display_en']}** [{a['id']} {a['batch']}] {a['title_en']}\n  vs [{b['id']} {b['batch']}] {b['title_en']}  (title overlap {ov})\n")
cats = defaultdict(int)
for ev in events: cats[ev["category"]] += 1
print(f"merged {len(events)} events from {len(RAW)} files; {len(auto)} auto-merged, {len(dups)} for review; Tamil titles: {sum(1 for e in events if e.get('title_ta'))} (+{enriched} from sheet)")
for c, n in sorted(cats.items()): print(f"  {c:32s} {n}")
