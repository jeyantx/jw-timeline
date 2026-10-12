# Bible & JW History Timeline — data project

Goal: a complete, sourced timeline (Creation → today → prophetic future) for (1) a searchable timeline app and
(2) an A0 wall chart. **All facts come from jw.org / wol.jw.org only.**

## Layout
- `research/` — owner's original Tamil sheet (181 rows)
- `schema/event.schema.json` — the record contract (v2: points and spans)
- `docs/DATA_SCHEMA.md` — field-by-field explanation with real examples
- `docs/UI_DESIGN_BRIEF.md` — app design brief · `docs/A0_CHART_DESIGN_BRIEF.md` — A0 poster brief (round 1) · `docs/A0_CHART_DESIGN_PROMPT_v2.md` — round 2 prompt (1b+1c hybrid)
- `data/curation/` — poster selection (suggested) and owner overrides; `docs/POSTER_DROP_LIST.md` lists everything left off the poster
- `docs/AGENT_BRIEF.md` — rules given to research agents (sources, Tamil, images, precision)
- `data/raw/b1..b12.json` — one file per research batch (see below)
- `data/raw/book_names.json` — 66 Bible books EN/TA names + abbreviations
- `data/derived/d1.json` — spans built from existing sourced events (lifespans, reigns); `id_registry.json` pins their ids
- `data/series/*.json` — **series**: curated (prophecy→fulfillment, Daniel's world powers, covenants, App. A6/B charts and maps) and `auto-*` successions; `schema/series.schema.json`
- `data/merged/timeline.json` — merged, sorted, stable ids, with `series`, `chart_hint`, `endpoint_of`
- `data/merged/series.json` — all series with resolved members
- `data/merged/duplicates_report.md` — cross-batch duplicate candidates for manual review
- `exports/timeline_review.xlsx` — review workbook (Timeline with review columns, Add new events, Sources, Categories, Summary)
- `exports/timeline.csv` — same Timeline rows as UTF-8 CSV
- `scripts/validate.py`, `scripts/derive_spans.py`, `scripts/merge.py` (and the one-off `scripts/migrate_v2.py`)

## Batches
| batch | span | main sources |
|---|---|---|
| b1 | 4026–c.1761 BCE Creation→Abraham/Jacob | si Study 3, Insight Chronology, Insight bios |
| b2 | 1750–1117 BCE Joseph→Judges | si Study 3, Insight, NWT Table of Books |
| b3 | 1117–607 BCE Kings & prophets | NWT App. A6-A/B, Insight Chronology |
| b4 | 607–3 BCE Exile→Herod | si Study 3, Insight (Cyrus, Seventy Weeks, Herod…) |
| b5 | 3 BCE–33 CE Jesus' life | NWT App. A7-A…H |
| b6 | 33–c.100 CE Apostolic era | Insight Chronology/Paul/Acts, Table of Books |
| b7 | 100–1869 CE Apostasy & Bible history | Insight Versions/Manuscripts, Awake!/Watchtower |
| b8 | 1852–1945 JW history | Proclaimers "Noteworthy Events", kr |
| b9 | 1946–2026 JW history | Proclaimers, kr, jw.org Newsroom |
| b10 | fulfilled-prophecy markers + undated future | rr book, Watchtower, Insight |
| b11 | 66 Bible books writing completed | NWT Table of Books, si per-book |
| b12 | 121 sourced **spans**: world powers, prophetic periods, presidents, Governing Body tenures, bans, HQ, magazines, Roman emperors | si, Insight, dp, kr, jv, NWT App. B, Watchtower, jw.org |
| b13 | records needed by series: Satan hurled to earth c. 1914 | NWT App. B1, w22.07, kr |
| b14 | League of Nations, UN, kings of the north/south identities (1871–) | dp, re, w12 6/15, w20.05 |
| b15 | dated fulfilments: Josiah's acts, Edom, last-days features | Insight, w, g |
| b16 | NWT App. A6 / B12 / B13 audit additions | NWT Study Edition appendices |
| b17 | wheat & weeds stages, Dead Sea Scrolls, Westcott-Hort, NWT 1984 Reference | w13 7/15, NWT App. A3, w97 |
| d1 | 71 **derived spans**: 31 lifespans + 40 reigns (Judah, Israel) built from sourced points | scripts/derive_spans.py |

## Workflow
```
python3 scripts/derive_spans.py      # → data/derived/d1.json (lifespans, reigns)
python3 scripts/build_series.py      # → data/series/auto-*.json (successions)
python3 scripts/validate.py          # all raw + derived files
python3 scripts/merge.py             # → data/merged/timeline.json + duplicates report
python3 scripts/export_review.py     # → exports/timeline_review.xlsx + exports/timeline.csv
python3 scripts/select_poster.py     # → A0 poster selection: exports/poster_selection.xlsx, docs/POSTER_DROP_LIST.md
```
`importance` is intentionally null everywhere — owner assigns tiers later.
