#!/usr/bin/env python3
"""Build span records from point events that already exist in data/raw/b1..b11 (and later batches).

Output: data/derived/d1.json
  * lifespans  — a person's birth (or creation) event paired with their death event
  * reigns     — a ruler's accession event to the successor's accession (or the ruler's death / end-of-kingdom event)

Every derived record cites the jw.org sources of both input events (with `supports` start/end)
and carries `derived` explaining how it was built. Nothing here comes from outside the dataset.
"""
import copy, glob, json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "data/derived/d1.json")
REGISTRY = os.path.join(ROOT, "data/derived/id_registry.json")  # slug -> id, append-only, so ids never shift

# ---- lifespans: (person label, start event, end event). Ids are the copies that survive the merge.
LIFESPANS = [
    ("Adam", "b1-0001", "b1-0009"), ("Seth", "b1-0004", "b1-0011"), ("Jared", "b1-0005", "b1-0013"),
    ("Enoch", "b1-0006", "b1-0010"), ("Methuselah", "b1-0007", "b1-0018"), ("Noah", "b1-0012", "b1-0031"),
    ("Shem", "b1-0017", "b1-0051"), ("Shelah", "b1-0023", "b1-0048"), ("Peleg", "b1-0024", "b1-0029"),
    ("Reu", "b1-0026", "b1-0033"), ("Serug", "b1-0027", "b1-0034"), ("Nahor", "b1-0028", "b1-0030"),
    ("Abraham", "b1-0032", "b1-0053"), ("Ishmael", "b1-0040", "b1-0055"), ("Isaac", "b1-0043", "b2-0003"),
    ("Jacob", "b1-0052", "b2-0006"), ("Joseph", "b1-0059", "b2-0007"), ("Aaron", "b2-0010", "b2-0034"), ("Moses", "b2-0011", "b2-0043"),
    ("Joshua", "b2-0012", "b2-0054"), ("Caleb", "b2-0014", "b2-0056"), ("Rahab", "b2-0032", "b2-0061"),
    ("Alexander the Great", "b4-0080", "b4-0090"), ("John the Baptist", "b5-0004", "b5-0066"),
    ("Jesus", "b5-0006", "b5-0163"), ("John Wycliffe", "b7-0084", "b7-0087"), ("Martin Luther", "b7-0098", "b7-0141"),
    ("João Ferreira de Almeida", "b7-0165", "b7-0172"), ("George Storrs", "b7-0186", "b8-0020"),
    ("Charles Taze Russell", "b8-0001", "b8-0101"), ("Joseph F. Rutherford", "b8-0003", "b8-0237"),
    ("Nathan H. Knorr", "b8-0080", "b9-0112"),
]
LIFE_TITLES = {"Jesus": "Jesus' earthly life", "Enoch": "Life of Enoch (until God took him)"}

# ---- reigns: ordered succession lists. (Saul, David, Solomon and the foreign rulers are NOT derived:
# research batch b12 sources those reigns directly from jw.org, which beats a computed pairing.) Each item: (ruler, start id, explicit end id or None)
# None = end at the next ruler's accession (as NWT App. A6 lays the chart out).
JUDAH = [("Rehoboam", "b3-0017", None), ("Abijah", "b3-0021", None), ("Asa", "b3-0022", None),
         ("Jehoshaphat", "b3-0034", None), ("Jehoram", "b3-0040", None), ("Ahaziah", "b3-0042", None),
         ("Athaliah", "b3-0044", None), ("Jehoash", "b3-0045", None), ("Amaziah", "b3-0049", None),
         ("Uzziah (Azariah)", "b3-0055", None), ("Jotham", "b3-0067", None), ("Ahaz", "b3-0069", None),
         ("Hezekiah", "b3-0073", None), ("Manasseh", "b3-0081", None), ("Amon", "b3-0082", None),
         ("Josiah", "b3-0083", None), ("Jehoahaz", "b3-0095", None), ("Jehoiakim", "b3-0096", None),
         ("Jehoiachin", "b3-0104", None), ("Zedekiah", "b3-0108", "b3-0112")]
ISRAEL = [("Jeroboam", "b3-0018", None), ("Nadab", "b3-0023", None), ("Baasha", "b3-0024", None),
          ("Elah", "b3-0027", None), ("Zimri", "b3-0028", None), ("Omri", "b3-0029", None), ("Ahab", "b3-0033", None),
          ("Ahaziah", "b3-0036", None), ("Jehoram", "b3-0039", None), ("Jehu", "b3-0043", None),
          ("Jehoahaz", "b3-0046", None), ("Jehoash", "b3-0048", None), ("Jeroboam II", "b3-0052", None),
          ("Zechariah", "b3-0061", None), ("Shallum", "b3-0062", None), ("Menahem", "b3-0063", None),
          ("Pekahiah", "b3-0064", None), ("Pekah", "b3-0065", None), ("Hoshea", "b3-0071", "b3-0076")]
# printed length in the title describes only part of the reign -> compute from endpoints instead
IGNORE_PRINTED = {"Omri", "Zechariah"}
REIGN_NOTES = {
    ("Israel", "Omri"): "Starts with the 4-year rivalry with Tibni (c. 951 B.C.E., b3-0029); Omri ruled alone from c. 947 B.C.E. for 8 years (b3-0030).",
    ("Israel", "Jehoahaz"): "Includes c. 3 years of joint rule with his son Jehoash (c. 862–859 B.C.E., b3-0047).",
    ("Israel", "Hoshea"): "NWT App. A6 gives 9 years counted from c. 748 B.C.E., when his rule became fully established (b3-0072).",
    ("Israel", "Zechariah"): "NWT App. A6 starts Zechariah c. 803 B.C.E. and runs his bar to Shallum (c. 791): his kingship was 'not fully confirmed' until c. 792 B.C.E. (b16-0001), and his recorded reign is only 6 months.",
    ("Judah", "Jehoshaphat"): "Bar ends where NWT App. A6 starts Jehoram (913 B.C.E.); Jehoshaphat died c. 911 B.C.E. (b3-0041) while Jehoram shared the rule.",
    ("Judah", "Josiah"): "Bar ends where NWT App. A6 starts Jehoahaz (628 B.C.E.); Insight dates Josiah's death c. 629 B.C.E. (b3-0094).",
    ("Judah", "Jehoram"): "Associated with Jehoshaphat in the government from c. 919 B.C.E. (b3-0037).",
    ("Judah", "Uzziah (Azariah)"): "Becomes king 'in a special sense' c. 818 B.C.E. (b3-0058).",
}
SUB_REIGNS = [("David reigns in Hebron over Judah", "David", "b3-0006", "b3-0007", "b12-0012")]  # parent = b12 reign of David

WORD = {"one": 1, "two": 2, "three": 3, "six": 6, "seven": 7}


def load_events():
    evs = {}
    for f in glob.glob(os.path.join(ROOT, "data/raw/b*.json")):
        if not re.fullmatch(r"b\d+\.json", os.path.basename(f)):
            continue
        for e in json.load(open(f, encoding="utf-8"))["events"]:
            evs[e["id"]] = e
    return evs


def endpoint_from(ev, as_end=False):
    """Use the point event's start as a span endpoint, labelled with that event's printed date."""
    p = copy.deepcopy(ev["start"] if not (as_end and ev["timing"] == "span") else ev["end"])
    p["display_en"] = p.get("display_en") or ev["date_label_en"]
    p["display_ta"] = p.get("display_ta") or ev.get("date_label_ta")
    return p


HEB_MONTH = {"Nisan": 3.5, "Iyyar": 4.5, "Sivan": 5.5, "Tammuz": 6.5, "Ab": 7.5, "Elul": 8.5, "Tishri": 9.5,
             "Heshvan": 10.5, "Chislev": 11.5, "Tebeth": 0.5, "Shebat": 1.5, "Adar": 2.5}
SEASON_MONTH = {"spring": 4, "summer": 7, "autumn": 10, "winter": 1}


def month_of(p):
    if p.get("month"):
        return p["month"] - 1 + ((p.get("day") or 1) - 1) / 30
    if p.get("hebrew_month") in HEB_MONTH:
        return HEB_MONTH[p["hebrew_month"]]
    if p.get("season") in SEASON_MONTH:
        return SEASON_MONTH[p["season"]]
    return None


def years_between(a, b):
    """Elapsed years between two endpoints.

    With a month known at both ends: fractional, rounded to 1/2 year (Jesus: c. Oct 2 B.C.E. to Nisan 33 C.E. = 33½).
    Otherwise: plain difference of year numbers (Adam 4026 -> 3096 = 930), correcting for the missing year zero.
    """
    ya = -a["year"] if a["era"] == "BCE" else a["year"]
    yb = -b["year"] if b["era"] == "BCE" else b["year"]
    years = yb - ya - (1 if ya < 0 < yb else 0)
    ma, mb = month_of(a), month_of(b)
    if ma is not None and mb is not None:
        frac = years + (mb - ma) / 12
        return max(0, round(frac * 2) / 2)
    return years


def fmt_years(y, approx):
    whole = int(y)
    txt = f"{whole}½" if y - whole == 0.5 else f"{whole}"
    return f"{'c. ' if approx else ''}{txt} year{'s' if y != 1 else ''}"


def cite(evs_with_role):
    out, seen = [], {}
    for ev, role in evs_with_role:
        for s in ev["sources"]:
            key = s["docid"]
            if key in seen:
                if seen[key].get("supports") != role:
                    seen[key]["supports"] = "whole"
                continue
            c = copy.deepcopy(s)
            c["supports"] = role
            seen[key] = c
            out.append(c)
    return out


def union(*lists):
    out = []
    for l in lists:
        for x in l or []:
            if x not in out:
                out.append(x)
    return out


def printed_duration(title):
    m = re.search(r"\((?:[^)]*?\b)?(\d+|one|two|three|six|seven)\s+(years?|months?|days?)(?:,\s*(\d+)\s+days)?\)", title)
    if not m:
        return None
    n = int(m.group(1)) if m.group(1).isdigit() else WORD[m.group(1)]
    unit = m.group(2).rstrip("s") + "s"
    shown = f"{n} {m.group(2)}" + (f", {m.group(3)} days" if m.group(3) else "")
    d = {"years": None, "months": None, "days": None, "display_en": shown, "display_ta": None,
         "approx": False, "derived": False}
    d[unit] = n
    if m.group(3):
        d["days"] = int(m.group(3))
    return d


def make_span(n, slug, title, kind, start_ev, end_ev, category, people, description, method, note,
              duration=None, extra_tags=(), parent_id=None, end_is_successor=False):
    start = endpoint_from(start_ev)
    end = endpoint_from(end_ev)
    if end["sort_key"] < start["sort_key"]:
        end["sort_key"] = start["sort_key"]
    # a short reign (days/months) ends in its own accession year
    if duration and not duration.get("years") and end_is_successor:
        end = copy.deepcopy(start)
        end["display_en"] = None
        end["display_ta"] = None
        raw_end = start["sort_key"] + ((duration.get("months") or 0) / 12 + (duration.get("days") or 0) / 365)
        year_ceiling = (-start["year"] if start["era"] == "BCE" else start["year"]) + 0.999
        end["sort_key"] = round(min(raw_end, max(year_ceiling, start["sort_key"])), 4)
        method, note = "start_plus_duration", note + " Reign shorter than a year: end placed in the accession year using the printed length."
    if not duration:
        if start["precision"] in ("unknown",) or end["precision"] in ("unknown",):
            duration = None
        else:
            y = years_between(start, end)
            approx = any(p["precision"] != "exact" for p in (start, end))
            duration = {"years": y, "months": None, "days": None, "display_en": fmt_years(y, approx),
                        "display_ta": None, "approx": approx, "derived": True}
    label_s = start_ev["date_label_en"]
    label_e = end_ev["date_label_en"] if end.get("display_en") else label_s
    ta_s, ta_e = start_ev.get("date_label_ta"), end_ev.get("date_label_ta")
    fields = ["start", "end"] + (["duration"] if duration and duration.get("derived") else [])
    return {
        "id": f"d1-{n:04d}", "slug": slug, "timing": "span", "span_kind": kind,
        "date_label_en": f"{label_s} – {label_e}" if label_e != label_s else label_s,
        "date_label_ta": f"{ta_s} – {ta_e}" if ta_s and ta_e else None,
        "start": start, "end": end, "duration": duration,
        "start_event_id": start_ev["id"], "end_event_id": end_ev["id"], "parent_id": parent_id,
        "derived": {"method": method, "fields": fields, "note": note},
        "title_en": title, "title_ta": None,
        "description_en": description, "description_ta": None,
        "category": category, "event_kind": kind,
        "tags": union([kind], list(extra_tags)),
        "people": people, "places": union(start_ev.get("places"), end_ev.get("places")),
        "scriptures": [s for s in union(start_ev.get("scriptures"), end_ev.get("scriptures"))],
        "sources": cite([(start_ev, "start"), (end_ev, "end")]),
        "images": [], "conflicts": union(start_ev.get("conflicts"), end_ev.get("conflicts")),
        "importance": None, "related_ids": [start_ev["id"], end_ev["id"]], "notes": None,
    }


def slugify(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def main():
    evs = load_events()
    out, n = [], 0

    for person, sid, eid in LIFESPANS:
        b, d = evs[sid], evs[eid]
        n += 1
        title = LIFE_TITLES.get(person, f"Life of {person}")
        desc = (f"{person}: from {b['title_en'].rstrip('.')} ({b['date_label_en']}) to "
                f"{d['title_en'].rstrip('.')} ({d['date_label_en']}). Dates as given in the cited jw.org publications.")
        out.append(make_span(n, f"life-{slugify(person)}", title, "lifespan", b, d, b["category"], [person], desc,
                             "paired_events", f"Built from {sid} (start) and {eid} (end).", extra_tags=["lifespan"]))

    def succession(rows, realm, category, tag):
        nonlocal n
        made = {}
        for i, (ruler, sid, explicit_end) in enumerate(rows):
            s = evs[sid]
            if explicit_end:
                e, method, how, succ = evs[explicit_end], "paired_events", f"ends with {explicit_end}", False
            else:
                e = evs[rows[i + 1][1]]
                method, succ = "successor_accession", True
                how = f"ends when {rows[i + 1][0]} becomes king ({e['id']}), as laid out in NWT Appendix A6"
            dur = None if ruler in IGNORE_PRINTED else printed_duration(s["title_en"])
            n += 1
            rec = make_span(n, f"reign-{slugify(realm)}-{slugify(ruler)}", f"Reign of {ruler} ({realm})", "reign", s, e,
                            category, [ruler], f"{ruler} rules {realm}. Starts with {s['title_en'].rstrip('.')} "
                            f"({s['date_label_en']}); {how}.", method, f"Start {sid}; {how}.", duration=dur,
                            extra_tags=["reign", tag], end_is_successor=succ)
            if (realm, ruler) in REIGN_NOTES:
                rec["notes"] = REIGN_NOTES[(realm, ruler)]
            out.append(rec)
            made[ruler] = rec["id"]
        return made

    succession(JUDAH, "Judah", "bible.monarchy", "kingdom-of-judah")
    succession(ISRAEL, "Israel", "bible.monarchy", "kingdom-of-israel")
    for title, ruler, sid, eid, parent in SUB_REIGNS:
        n += 1
        out.append(make_span(n, slugify(title), title, "reign", evs[sid], evs[eid], "bible.monarchy", [ruler],
                             f"{title}: {evs[sid]['date_label_en']} to {evs[eid]['date_label_en']}.", "paired_events",
                             f"Built from {sid} and {eid}.", extra_tags=["reign"], parent_id=parent))

    # stable ids: reuse the id registered for this slug; new slugs get the next unused number
    reg = json.load(open(REGISTRY)) if os.path.exists(REGISTRY) else {}
    nxt = max([int(v.split("-")[1]) for v in reg.values()] + [0]) + 1
    old_to_new = {}
    for rec in out:
        if rec["slug"] not in reg:
            reg[rec["slug"]] = f"d1-{nxt:04d}"
            nxt += 1
        old_to_new[rec["id"]] = reg[rec["slug"]]
    for rec in out:
        rec["id"] = old_to_new[rec["id"]]
        if rec.get("parent_id") in old_to_new:
            rec["parent_id"] = old_to_new[rec["parent_id"]]
        rec["related_ids"] = [old_to_new.get(r, r) for r in rec.get("related_ids", [])]
    out.sort(key=lambda r: r["id"])
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    json.dump(dict(sorted(reg.items(), key=lambda kv: kv[1])), open(REGISTRY, "w"), indent=1)
    json.dump({"batch": "d1", "schema_version": 2, "scope": "Spans derived from existing sourced point events: lifespans and reigns",
               "generated_by": "scripts/derive_spans.py", "events": out},
              open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"wrote {OUT}: {len(out)} spans ({sum(1 for e in out if e['span_kind']=='lifespan')} lifespans, "
          f"{sum(1 for e in out if e['span_kind']=='reign')} reigns)")


if __name__ == "__main__":
    main()
