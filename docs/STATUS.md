# Data collection status — 2026-10-03

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
