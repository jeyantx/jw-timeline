# Data collection status

## Update 2026-10-12 — series and chart hints
**1,891 records (1,619 points, 272 spans) and 32 series (702 memberships).**

| series | kind | members | jw.org basis |
|---|---|---|---|
| promised-offspring | prophecy → fulfillment | 11 | NWT App. B1 (7 steps + secondary offspring, w22.07) |
| messianic-prophecies | prophecy → fulfillment | 57 (27 prophecies) | jy table, bh appendix |
| messianic-line | lineage | 41 | Insight "Genealogy of Jesus Christ" |
| world-powers-daniel | world powers | 22 (6 groups with Dan 2/7/8 symbols) | NWT App. B9, dp |
| seven-heads-of-the-beast | world powers | 27 | w12 6/15 "Eight Kings Revealed", re, w22.05 |
| kings-north-and-south | world powers | 47 (16 groups) | dp ch. 16 chart, w20.05 (2020 understanding) |
| daniel-time-prophecies | time prophecy | 29 | b12 spans, dp ch. 17 |
| covenants | covenants | 29 (12 covenants) | w14 10/15 chart, Insight "Covenant" |
| fulfilled-prophecies-nations | prophecy → fulfillment | 67 (15 topics) | Insight, ba, gm, w/g articles |
| last-days-sign | prophecy → fulfillment | 19 | dated jw.org statements only |
| prophets-and-kings-a6 | chart | 60 | NWT App. A6-A/B (audited: all kings, 15 prophets, dates match) |
| jesus-final-week | chart | 44 | NWT App. B12 (Nisan 8–16) |
| 9 map/diagram series | chart | 4–16 each | App. B2–B8, B10, B13 |
| 11 auto series | succession / lineage | 3–66 each | built from existing records |

- **Chart hints:** 123 points are `covered_by_span` (birth/creation/death/accession that only marks a life/reign/office bar, e.g. Creation of Adam, Birth of Seth); 106 are `span_endpoint` (kept: Kingdom divided, Russia ban, Jesus' death); 234 are `index_entry`.
- **A6 alignment:** reigns of Jehoshaphat, Josiah and Zechariah now end where A6 starts the successor; death dates kept in notes.
- **Newer understanding applied:** kings of the north/south per w20.05 (replacing parts of dp); Anglo-America in the feet of the image (B9, w12) rather than dp's "from 1763".
- **Not on jw.org / left out:** year of Dan 4 and Dan 8 visions (anchored to Daniel's completion), start record for the 1,260 days, ~35 extra Messianic rows in 502018132 (noted), Luke 3:36 second Cainan.

---

## Update 2026-10-10 — schema v2 (points and spans)
`data/merged/timeline.json` now holds **1,860 records: 1,595 points and 265 spans**. Every record validates against schema v2 ([DATA_SCHEMA.md](DATA_SCHEMA.md)).

| span source | count |
|---|---|
| converted from v1 "range" records (prophets, judges, journeys, wars, conventions…) | 74 |
| b12: periods sourced directly from jw.org (world powers, 70 weeks, Gentile Times, presidents, Governing Body, bans, HQ, magazines, Roman emperors) | 120 (1 folded) |
| d1: derived from sourced points (31 lifespans, 40 reigns of Judah and Israel) | 71 |

- v1 "range" was split: 74 became spans; 40 "31 or 32 C.E."-type windows became uncertain points (`between`); 31 remain after duplicate folding, and 4 b12 span starts also use `between` (35 in all).
- 134 spans link both ends to existing point events; 22 are ongoing; 17 have an end jw.org does not date (`unknown`); 3 are undated future spans.
- Merged ids are now stable batch ids (`b3-0017`, `d1-0024`). The old `ev-00001` numbering broke `related_ids`; that is fixed.
- jw.org does not date (dropped from b12): Millerite start, medieval/Roman Inquisition end, wheat-and-weeds period, Reformation as a period, Wycliffe/Tyndale translation spans, Operation North end, Spain/Portugal/Greece/Japan bans, Photo-Drama showings, Adams' and Henschel's presidency end, several Governing Body start dates, lifespans of Solomon/Samuel/Daniel/Paul.
- New conflicts recorded: David/Solomon reign ends (NWT App. B7 1038/998 vs si/Insight 1037/997), Anglo-American world power start, Augustus 31 vs 27 B.C.E., Canada ban end, Brooklyn move month.

---

## Original collection — 2026-10-03

## Result
`data/merged/timeline.json` — **1,669 events**, Creation → Oct 2026 → undated future, every one sourced to jw.org / wol.jw.org.

| metric | count |
|---|---|
| raw events collected (11 batches) | 1,743 |
| merged events (74 cross-batch duplicates folded) | 1,669 |
| with Tamil title | 744 (45%) |
| with Tamil description | 894 (54%) |
| with at least one Tamil source page | 1,083 (65%) |
| with 2+ independent jw.org sources | 895 (54%) |
| with recorded inter-source conflicts | 270 |
| with image URLs (no downloads) | 394 events, 547 images |
| with scripture references | 768 |
| unique jw.org documents cited | 470 (see `data/merged/sources.json`) |

Date precision: 1,261 exact · 205 approx · 55 after · 31 before · 100 range · 17 undated future.
Eras: 407 BCE · 1,245 CE · 17 future.

## Per batch
| batch | span | events | Tamil titles | notes |
|---|---|---|---|---|
| b1 | 4026–1761 BCE | 61 | 45 | matches si Study 3 chart |
| b2 | 1750–1117 BCE | 80 | 32 | judges undated per Insight; Aaron d. 1474 per Insight |
| b3 | 1117–607 BCE | 120 | 98 | all 42 kings + 15 prophets; 22 source conflicts |
| b4 | 607–1 BCE | 138 | 33 | includes Daniel 11 fulfilments, Maccabees, Herod |
| b5 | 3 BCE–33 CE | 171 | 171 | all 126 NWT App. A7 rows; 1 Tamil misread fixed |
| b6 | 33–100 CE | 108 | 76 | Peter's death omitted (no jw.org date) |
| b7 | 100–1869 | 229 | 91 | Tamil NT by Ziegenbalg "by 1714" per Awake! 1979 |
| b8 | 1852–1945 | 265 | 32 | jv table + kr detail; 13 conflicts |
| b9 | 1946–2026 | 474 | 145 | incl. 163 "Beliefs Clarified" + 80 convention-theme index lines |
| b10 | 1914–1935 markers + future | 25 | 10 | future order per kr ch. 21 chart |
| b11 | 66 Bible books | 72 | 66 | master for `bible.book_writing` |

## Verification done by orchestrator
- Every file validated against `schema/event.schema.json` (0 problems).
- Spot-checked against source pages: si Study 3 chart dates (b1), A6 king dates (b3), A7 key dates (b5), Table of Books (b11), Tamil A7-B Cana row (corrected agent misread), Tamil era prefix (NWT-sty uses கி.மு., si uses பொ.ச.மு. — both kept as printed).
- Brief errors found by agents and fixed: Insight "Chronology" docid is 1200000970 (1200010959 = 1971 Aid book); kr chapters are 1102014240–64; NWT-sty Table of Books is 1001070071 (Tamil exists), 1001060002 is the Reference Bible table (no Tamil).

## Known gaps / not on jw.org
- No dated birth/death for Saul, David, Samuel, Jeremiah, Peter, Luke, Mark; Henschel/Schroeder deaths; Warwick dedication date; Anthony Morris departure.
- Judges (Othniel…Samson) have no jw.org years → carried as undated `range` entries in order.
- Daniel 8 vision, Daniel in lions' pit, Esther made queen: regnal year only, no BCE year printed.
- Insight on the Scriptures and Proclaimers have no Tamil edition on WOL → events sourced only from them have null Tamil fields.
- Governing Body Update dates (b9) come from jw.org video metadata, noted per event.

## Decisions for the owner
1. **Tamil era display**: normalise to பொ.ச.மு./பொ.ச. (si/your sheet) or கி.மு./கி.பி. (NWT Study Edition)? Currently as printed by each source.
2. **b9 index-derived events** (163 "Beliefs Clarified" + 80 convention themes, `event_kind` = `beliefs_clarified` / `convention`): keep all, or keep only those also described in kr/jv? They are flagged so a filter is one line.
3. **b4 secular Insight items** (e.g. Caesar invades Britannia, Peloponnesian War, `bible.intertestament`): keep for context or drop?
4. **Importance tiers**: all `importance` = null, ready for your assignment. Suggested approach: tier 1 ≈ 80–120 events for the A0 chart hero band.
5. **Tamil enrichment pass**: a follow-up agent could fill Tamil titles for the ~900 events lacking them using Tamil Watchtower/Awake! articles (not Insight). Estimated +20–30% coverage.

## Next phase
- Importance tiering → A0 chart layout spec (bands: Bible / Christendom & Bible history / JW history / future).
- App: load `timeline.json`, index on title/description/people/places/tags/scripture for search; link out via `finder_url` with `wtlocale=E|TL`.
