# Bible & JW History Timeline — data project

Goal: a complete, sourced timeline (Creation → today → prophetic future) for (1) a searchable timeline app and
(2) an A0 wall chart. **All facts come from jw.org / wol.jw.org only.**

## Layout
- `research/` — owner's original Tamil sheet (181 rows)
- `schema/event.schema.json` — the record contract (v2: points and spans)
- `docs/DATA_SCHEMA.md` — field-by-field explanation with real examples
- `docs/AGENT_BRIEF.md` — rules given to research agents (sources, Tamil, images, precision)
- `data/raw/b1..b11.json` — one file per research batch (see below)
- `data/raw/book_names.json` — 66 Bible books EN/TA names + abbreviations
- `data/derived/d1.json` — spans built from existing sourced events (lifespans, reigns)
- `data/merged/timeline.json` — merged, sorted, stable ids
- `data/merged/duplicates_report.md` — cross-batch duplicate candidates for manual review
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

## Workflow
```
python3 scripts/derive_spans.py      # → data/derived/d1.json (lifespans, reigns)
python3 scripts/validate.py          # all raw + derived files
python3 scripts/merge.py             # → data/merged/timeline.json + duplicates report
```
`importance` is intentionally null everywhere — owner assigns tiers later.
