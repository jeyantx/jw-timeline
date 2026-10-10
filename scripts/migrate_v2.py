#!/usr/bin/env python3
"""One-off migration of data/raw/b1..b11.json from schema v1 (`date`) to v2 (`timing`/`start`/`end`).

v1 used precision 'range' for two different things. This script separates them:
  * a SPAN lasted from start to end (Elijah's prophetic activity, Paul's journeys, a 7-day convention);
  * an uncertain POINT happened once somewhere in a window ('31 or 32 C.E.', 'Galatians written c. 50-52')
    -> timing 'point', precision 'between', with `latest`.
Re-running is safe: files already in v2 are skipped.
"""
import glob, json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MONTHS = {m: i for i, m in enumerate(["january", "february", "march", "april", "may", "june", "july", "august",
                                      "september", "october", "november", "december"], 1)}
NUMWORDS = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9,
            "ten": 10, "eleven": 11, "twelve": 12, "forty": 40}

# range events that are really a single uncertain moment
BETWEEN_IDS = {"b6-0004", "b6-0005", "b6-0028", "b7-0048"}
BETWEEN_KINDS = {"writing_completed"}
# non-range events whose label is really a span (or a short window)
HIDDEN_SPANS = {"b2-0026": "period", "b2-0046": "period", "b4-0058": "festival", "b8-0218": "ban"}
HIDDEN_BETWEEN = {"b7-0018"}  # Diocletian, Feb 23-24, 303: razing then decree -> keep as one uncertain point
JUDGES_PERIOD = "b2-0057"

SPAN_KIND = {
    "prophet_activity": "prophetic_activity", "judgeship": "judgeship", "journey": "journey", "residence": "residence",
    "imprisonment": "imprisonment", "office": "office", "persecution": "persecution", "writing": "writing",
    "reign": "reign", "papacy": "office", "copying": "copying", "war": "war", "printing": "publication",
    "council": "council", "release": "publication", "teaching": "period", "convention": "convention",
    "campaign": "campaign", "school": "school", "shipwreck": "residence", "assignment": "office", "ban": "ban",
    "festival": "festival", "installation": "period", "event": "period",
}
SPAN_KIND_BY_ID = {"b2-0057": "period", "b2-0064": "period", "b10-0005": "prophetic_period", "b4-0044": "campaign",
                   "b4-0076": "war", "b9-0031": "broadcast", "b9-0084": "broadcast", "b9-0070": "period",
                   "b9-0473": "campaign", "b8-0005": "period"}

ERA_LABEL = {"BCE": "B.C.E.", "CE": "C.E."}


def signed(y, era):
    return -y if era == "BCE" else y


def endpoint(year, era, precision, month=None, day=None, hebrew_month=None, hebrew_day=None, season=None,
             sort_key=None, display_en=None, display_ta=None):
    if sort_key is None:
        sort_key = signed(year, era) if year is not None else 0
        if month:
            sort_key += (month - 1) / 12 + ((day or 1) - 1) / 365
    return {"display_en": display_en, "display_ta": display_ta, "year": year, "era": era, "month": month, "day": day,
            "hebrew_month": hebrew_month, "hebrew_day": hebrew_day, "season": season, "precision": precision,
            "latest": None, "sort_key": round(sort_key, 4)}


def point_from_v1(d, precision=None):
    p = endpoint(d.get("year"), d.get("era"), precision or d["precision"], d.get("month"), d.get("day"),
                 d.get("hebrew_month"), d.get("hebrew_day"), d.get("season"), d["sort_key"],
                 d.get("display_en"), d.get("display_ta"))
    return p


PREFIX = {"c": "approx", "a": "after", "b": "before"}
RANGE_RE = re.compile(r"(?:\b([cab])\.\s*)?(\d{1,4})\s*[-–—]\s*(?:(early|late|mid)\s+)?(?:\b([cab])\.\s*)?(\d{1,4})\b")


def parse_years(label):
    """'c. 940–c. 906 B.C.E.' -> (approx, approx); '829–c. 804' -> (exact, approx); 'c. 50-52' -> (approx, approx)."""
    m = RANGE_RE.search(label)
    if not m:
        return None
    p1, y1, _, p2, y2 = m.groups()
    sp = PREFIX.get(p1, "exact")
    ep = PREFIX.get(p2) if p2 else sp  # a single leading 'c.' governs both ends
    if m.group(3):  # 'early 1919'
        ep = "approx"
    y1i, y2i = int(y1), int(y2)
    if y2i < 100 and y1i > 1000:  # '1870-75', '1939-45'
        y2i = (y1i // 100) * 100 + y2i
    return sp, y1i, ep, y2i


DAY_RANGE_RES = [
    re.compile(r"(?P<m>[A-Z][a-z]+)\s+(?P<d1>\d{1,2})\s*[-–]\s*(?P<d2>\d{1,2}),\s*(?P<y>\d{4})"),          # April 19-25, 1891
    re.compile(r"(?P<y>\d{4}),\s*(?P<m>[A-Z][a-z]+)\s+(?P<d1>\d{1,2})\s*[-–]\s*(?P<d2>\d{1,2})"),          # 2026, August 8-26
    re.compile(r"(?P<y>\d{1,4})\s*C\.E\.,\s*(?P<m>[A-Z][a-z]+)\s+(?P<d1>\d{1,2})\s*[-–]\s*(?P<d2>\d{1,2})"),  # 303 C.E., February 23-24
]
HEB_RANGE_RE = re.compile(r"(?P<hm>Nisan|Iyyar|Sivan|Tammuz|Ab|Elul|Tishri|Heshvan|Chislev|Tebeth|Shebat|Adar)\s+(?P<d1>\d{1,2})\s*[-–]\s*(?P<d2>\d{1,2})")


def parse_duration(text):
    m = re.search(r"\b(\d+|" + "|".join(NUMWORDS) + r")\s+(years?|months?|days?)\b", text, re.I)
    if not m:
        return None
    n = m.group(1).lower()
    n = int(n) if n.isdigit() else NUMWORDS[n]
    unit = m.group(2).lower().rstrip("s") + "s"
    out = {"years": None, "months": None, "days": None, "display_en": m.group(0), "display_ta": None,
           "approx": bool(re.search(r"about\s+" + re.escape(m.group(0)), text, re.I)), "derived": False}
    out[unit] = n
    return out


def computed_duration(start, end):
    if start["year"] is None or end["year"] is None:
        return None
    if start.get("month") and end.get("month") and start.get("day") and end.get("day") and start["year"] == end["year"]:
        days = (end["month"] - start["month"]) * 30 + end["day"] - start["day"] + 1
        if start["month"] == end["month"]:
            days = end["day"] - start["day"] + 1
        return {"years": None, "months": None, "days": days, "display_en": f"{days} days", "display_ta": None,
                "approx": False, "derived": True}
    if start.get("hebrew_month") and start.get("hebrew_month") == end.get("hebrew_month") and start["year"] == end["year"]:
        days = end["hebrew_day"] - start["hebrew_day"] + 1
        return {"years": None, "months": None, "days": days, "display_en": f"{days} days", "display_ta": None,
                "approx": False, "derived": True}
    s, e = signed(start["year"], start["era"]), signed(end["year"], end["era"])
    yrs = e - s - (1 if start["era"] == "BCE" and end["era"] == "CE" else 0)  # no year zero
    approx = any(p["precision"] != "exact" for p in (start, end))
    return {"years": yrs, "months": None, "days": None,
            "display_en": f"{'c. ' if approx else ''}{yrs} year{'s' if yrs != 1 else ''}", "display_ta": None,
            "approx": approx, "derived": True}


def label_endpoint(year, era, prec):
    pre = {"approx": "c. ", "after": "a. ", "before": "b. "}.get(prec, "")
    return f"{pre}{year} {ERA_LABEL[era]}" if year is not None else None


def migrate_event(ev):
    d = ev.pop("date")
    eid, label, kind = ev["id"], d["display_en"], ev.get("event_kind")
    rec = {"id": eid, "slug": ev["slug"], "timing": "point", "span_kind": None,
           "date_label_en": label, "date_label_ta": d.get("display_ta"),
           "start": None, "end": None, "duration": None,
           "start_event_id": None, "end_event_id": None, "parent_id": None, "derived": None}
    notes = []
    prec = d["precision"]
    is_range = prec == "range"
    between = (is_range and (" or " in label or kind in BETWEEN_KINDS or eid in BETWEEN_IDS)) or eid in HIDDEN_BETWEEN
    span = (is_range and not between) or eid in HIDDEN_SPANS

    if not is_range and not span and not between:
        rec["start"] = point_from_v1(d)
    elif between:
        start = point_from_v1(d, "between")
        start["display_en"] = label
        if eid in HIDDEN_BETWEEN:  # same-year day window
            m = DAY_RANGE_RES[2].search(label)
            start["month"], start["day"] = MONTHS[m.group("m").lower()], int(m.group("d1"))
            start["latest"] = {"year": d["year"], "era": d["era"], "month": start["month"], "day": int(m.group("d2")),
                               "sort_key": round(start["sort_key"] + 1 / 365, 4)}
        else:
            ly, le = d.get("year_end") or d["year"], d.get("era_end") or d["era"]
            start["latest"] = {"year": ly, "era": le, "month": None, "day": None, "sort_key": float(signed(ly, le))}
            if start["latest"]["sort_key"] < start["sort_key"]:
                start["latest"]["sort_key"] = start["sort_key"]
        rec["start"] = start
    else:  # span
        rec["timing"] = "span"
        rec["span_kind"] = SPAN_KIND_BY_ID.get(eid) or HIDDEN_SPANS.get(eid) or SPAN_KIND.get(kind, "period")
        y, era = d.get("year"), d.get("era")
        ye, erae = d.get("year_end"), d.get("era_end") or era
        parsed = parse_years(label) if y is not None else None
        dm = next((r.search(label) for r in DAY_RANGE_RES if r.search(label)), None)
        hm = HEB_RANGE_RE.search(label)
        if y is None:  # judges etc.: dates not stated on jw.org
            start = endpoint(None, era, "unknown", sort_key=d["sort_key"])
            end = endpoint(None, era, "unknown", sort_key=d["sort_key"])
            dur = parse_duration(ev["title_en"]) or parse_duration(label)
            if dur:
                rec["duration"] = dur
                end["sort_key"] = round(d["sort_key"] + (dur["years"] or 0) + (dur["months"] or 0) / 12, 4)
            if eid != JUDGES_PERIOD and eid.startswith("b2-") and "Judges" in label:
                rec["parent_id"] = JUDGES_PERIOD
            rec["derived"] = {"method": "manual", "fields": ["start.sort_key", "end.sort_key"],
                              "note": "jw.org gives no year for this period; sort keys only keep the source order."}
        elif dm:  # day range inside one month
            mo = MONTHS[dm.group("m").lower()]
            yy = int(dm.group("y"))
            start = point_from_v1(d, "exact")
            start["month"], start["day"], start["display_en"] = mo, int(dm.group("d1")), None
            end = endpoint(yy, era or "CE", "exact", mo, int(dm.group("d2")))
            end["sort_key"] = max(end["sort_key"], start["sort_key"] + 0.0001)
        elif hm:  # Hebrew day range: 'Nisan 1-7'
            base = "after" if prec == "after" else "exact"
            start = point_from_v1(d, base)
            start["hebrew_month"], start["hebrew_day"], start["display_en"] = hm.group("hm"), int(hm.group("d1")), None
            end = endpoint(y, era, base, hebrew_month=hm.group("hm"), hebrew_day=int(hm.group("d2")),
                           sort_key=d["sort_key"] + (int(hm.group("d2")) - int(hm.group("d1"))) / 365)
        else:
            if parsed and parsed[1] == y:
                sp, _, ep, ye2 = parsed
                ye = ye or ye2
            else:
                sp = ep = "approx" if re.search(r"\bc\.", label) else "exact"
                if eid == "b3-0051":
                    notes.append("End year 803 B.C.E. is the end of Jeroboam II's reign, recorded by the research batch; jw.org dates Jonah only as 'c. 844 B.C.E. (reign of Jeroboam II)'.")
                    rec["derived"] = {"method": "manual", "fields": ["end"], "note": notes[-1]}
            if ye is None:
                ye, erae = y, era
            start = point_from_v1(d, sp)
            start["display_en"] = label_endpoint(y, era, sp)
            end = endpoint(ye, erae, ep)
            end["display_en"] = label_endpoint(ye, erae, ep)
            if "early" in label and ye == 1919:
                end["season"], end["sort_key"] = "winter", 1919.1
            if end["sort_key"] < start["sort_key"]:
                end["sort_key"] = start["sort_key"]
        rec["start"], rec["end"] = start, end
        if not rec["duration"]:
            rec["duration"] = parse_duration(ev["title_en"]) or computed_duration(start, end)

    for k in ("year_end", "era_end"):
        d.pop(k, None)
    out = dict(rec)
    for k, v in ev.items():
        if k not in out:
            out[k] = v
    if notes:
        out["notes"] = ((out.get("notes") or "") + " " + " ".join(notes)).strip()
    return out


def fixups(ev):
    """Hand corrections applied after conversion (idempotent)."""
    st, en = ev["start"], ev.get("end")
    if ev["id"] in ("b2-0076", "b2-0077") and st["year"] is None:
        st["year"] = 1117  # label: 'Before 1117 B.C.E.'; sort_key stays an ordering placeholder
    if ev["id"] == "b6-0040":  # 'summer 51 – summer 52 C.E.'
        st.update(season="summer", sort_key=51.5, display_en="summer 51 C.E.")
        en.update(season="summer", sort_key=52.5, display_en="summer 52 C.E.")
        ev["duration"] = {"years": 1, "months": None, "days": None, "display_en": "1 year", "display_ta": None, "approx": False, "derived": True}
    if ev["id"] == "b6-0037":  # 'c. 50-52 C.E. (autumn 50 – spring 52)'
        st.update(season="autumn", sort_key=50.75, display_en="c. autumn 50 C.E.")
        en.update(season="spring", sort_key=52.25, display_en="c. spring 52 C.E.")
    return ev


def main():
    files = sorted(p for p in glob.glob(os.path.join(ROOT, "data/raw/b*.json")) if re.fullmatch(r"b\d+\.json", os.path.basename(p)))
    for f in files:
        doc = json.load(open(f, encoding="utf-8"))
        if doc["events"] and "timing" in doc["events"][0]:
            doc["events"] = [fixups(e) for e in doc["events"]]
            json.dump(doc, open(f, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
            print(f"{os.path.basename(f)}: already v2, fixups re-applied")
            continue
        doc["events"] = [fixups(migrate_event(e)) for e in doc["events"]]
        doc["schema_version"] = 2
        json.dump(doc, open(f, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        spans = sum(1 for e in doc["events"] if e["timing"] == "span")
        betw = sum(1 for e in doc["events"] if e["start"]["precision"] == "between")
        print(f"{os.path.basename(f)}: {len(doc['events'])} events, {spans} spans, {betw} uncertain points")


if __name__ == "__main__":
    main()
