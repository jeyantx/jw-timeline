# Project progress — JW Timeline (as of 2026-10-12)

Repo: https://github.com/jeyantx/jw-timeline (public, branch `main`). Local: `/Users/jeyant-10189/Work/Personal/jw/timeline`.

## Goal
A complete, sourced timeline of Bible history and the modern history of Jehovah's Witnesses, for:
1. a searchable bilingual (English and Tamil) **app**;
2. a printed **A0 wall chart** that is colourful, multi-series and illustrated.

**Hard rule:** every fact comes from **wol.jw.org / www.jw.org only**. Tamil text is copied from Tamil jw.org pages, never machine-translated.

## Data: done
- **1,966 records:** 1,690 points and 276 spans, from Creation (4026 B.C.E.) to 2026, plus the undated future. 34 series, about 790 memberships.
- **Schema v2** (`schema/event.schema.json`, explained in `docs/DATA_SCHEMA.md`):
  - points vs spans, with `start` and `end`;
  - precision values exact, approx, before, after, between, unknown, ongoing, undated;
  - `duration`, `parent_id`, `start_event_id` / `end_event_id`;
  - `derived`, for spans the pipeline built itself;
  - stable ids such as `b3-0017` and `d1-0024`.
- **Series** (`schema/series.schema.json`, `data/series/*.json`) are ordered groups with roles such as prophecy, fulfillment, rise, fall and ruler. Groups carry symbols, and prophecies are paired with fulfillments. The 9 highlight series:

  | series | basis |
  |---|---|
  | promised-offspring | App. B1 |
  | world-powers-daniel | App. B9 |
  | kings-north-and-south | w20.05 |
  | daniel-time-prophecies | |
  | covenants | w14 10/15 |
  | messianic-prophecies | |
  | fulfilled-prophecies-nations | |
  | wheat-and-weeds | w13 7/15 |
  | how-the-bible-came-to-us | App. A3 |

  Chart reproductions: prophets-and-kings-a6, jesus-final-week (B12), and map series B2–B13. There are also 11 auto successions.
- **Chart hints:** `covered_by_span` marks points a span bar already shows, such as Birth of Seth inside Life of Seth.
- **Priority tiers** (`docs/POSTER_TIER_RUBRIC.md`, `data/curation/tiers/*.json`):

  | tier | name | records |
  |---|---|---|
  | T1 | Landmark | 174 |
  | T2 | Major | 445 |
  | T3 | Notable detail | 1,088 |
  | T4 | Fine detail / redundant | 259 |

  - **A0 poster = all T1 + T2 = 619 records.** The rule is consistent: like items get like tiers.
  - Owner overrides go in `data/curation/tier_overrides.json`.
- **Owner's poster emphasis:**
  - Bible era first: about 280 B.C.E. records, Jesus 91, 33–100 C.E. 46.
  - Church history only as **"The Bible survives"**: 31 records, about 20 Bible milestones (Tamil NT 1714 at T1) plus about 9 "weeds" markers.
  - Modern era as **87 Kingdom and organization milestones**, following *God's Kingdom Rules!*, with no individual persons.
- **Exports:**
  - `exports/timeline_review.xlsx` / `timeline.csv`: all records, with review columns.
  - `exports/poster_selection.xlsx`: Keep / Drop with tier and reason, an override column, and the consistency sheet.
  - `docs/POSTER_DROP_LIST.md`.

**Pipeline:**

```bash
python3 scripts/derive_spans.py && python3 scripts/build_series.py && python3 scripts/validate.py && python3 scripts/merge.py && python3 scripts/tier_fixed.py && python3 scripts/select_poster.py && python3 scripts/export_review.py
```

## A0 chart design: where we are
- Round 1 brief: `docs/A0_CHART_DESIGN_BRIEF.md`.
- Claude Design produced 4 concepts: 1a River, 1b Serpentine Metro, 1c Overview Strip + Magnifiers, 1d Spiral. The local copy is `/Users/jeyant-10189/Downloads/A0 Chart Concepts.html`, a JS-bundled page; serve it with `python3 -m http.server` to view. Online: https://claude.ai/design/p/e8f3aca5-9a2e-470f-87e2-00721a1e2395?file=A0+Chart+Concepts.html&via=share
- The round 2 prompt for Claude Design (`docs/A0_CHART_DESIGN_PROMPT_v2.md`) was written but **not used**. Claude Code tried designing directly (`design/a0/samples/01-metro-row.html`, options A/B/C); the owner preferred Claude Design's quality. **Decision (2026-10-12): back to Claude Design** with the round 2 prompt. Claude Code supplies data, prompts and checks. Print: **two editions** (English sheet, Tamil sheet).
- **Owner direction for the design:**
  - **Mostly like 1b (serpentine metro):** four switchback rows with continuous series lines and interchanges.
  - **With some 1c magnifier panels** in places: patriarch lives, kings and prophets (A6), Jesus 29–33, Bible survives, Kingdom activity by decade, the future.
  - **Maps:** a Bible-lands map with pins and date stacks, and possibly a world map.
  - Two reading layers: a visitor layer (tier 1 big, images, story captions) and a researcher layer (dates as printed, scriptures, reference numbers, QR per panel).
  - Durations shown on bars, and measured brackets for the time prophecies.
  - English and Tamil.
- **Working style the owner asked for:** don't build big things blind. Show **small UI samples and options early**, ask for feedback here, then build. The goal is no wasted work.

## Next steps
1. Design the A0 poster as an HTML/SVG file in this repo (e.g. `design/a0/`), viewable in the browser, and screenshot it for review.
   - Start with **small sample tiles**: one metro row segment, one magnifier panel, the span-bar and label styles, and the colour palette. Show 2–3 options each and get the owner's pick.
   - Then build the full-sheet layout at 1 px = 1 mm (1189 × 841) with placeholder or real data from `data/merged/timeline.json` (`poster: true`) and `data/merged/series.json`.
2. Later: build the app (search, timeline, series pages); the app design brief is `docs/UI_DESIGN_BRIEF.md`.
3. Data gaps to research: *Enjoy Life Forever!* (2021), the 2010 "overlapping generations" clarification, Operation North (1951), the JW Library app, NWT sign-language editions, and Gilead's move to Patterson.

## Key files
`README.md` · `docs/DATA_SCHEMA.md` · `docs/POSTER_TIER_RUBRIC.md` · `docs/STATUS.md` · `docs/AGENT_BRIEF.md` · `docs/SERIES_BRIEF.md` · `docs/A0_CHART_DESIGN_BRIEF.md` · `docs/A0_CHART_DESIGN_PROMPT_v2.md` · `docs/UI_DESIGN_BRIEF.md`
