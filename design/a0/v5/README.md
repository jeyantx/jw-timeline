# A0 wall chart: v5 (Claude Design layout, our data)

This folder holds Claude Design's v5 sheet (project "Chart design brief samples", page "A0 Hybrid v5"). The layout and drawing code are theirs. **The data comes from this repo.**

| File | What it is | Edit? |
|---|---|---|
| `index.html` | the page: build pipeline, image overlay, true-size crops, fit report | small fixes only |
| `a0v5/core.js` | geometry: rows, scales, type sizes | design |
| `a0v5/data.js` | design-only content: opening, captions, lifespans, prophets, spans | design |
| `a0v5/draw.js`, `draw2.js`, `map.js`, `maps.js` | drawing code: lines, bars, labels, panels, map, legend | design |
| `a0v5/real.js` | **generated** by `scripts/build_a0_sheet.py`: events, Jesus' ministry, reigns, books, growth, calendar, images | never by hand |
| `a0v5/real.design.js` | the data Claude Design drew v5 with, kept for comparison | no |
| `image-slot.js` | Claude Design's drop-in image component (used for empty slots) | no |
| `HANDOFF_PROMPT_v5_polish.md`, `A0_MAP_PLACES_REQUEST.md`, `notes/` | Claude Design's open tasks: polish pass, 47 map places, print and crop notes | — |

## Build and view

```bash
python3 scripts/build_a0_sheet.py
python3 -m http.server 8770 --bind 127.0.0.1
```

Then open http://127.0.0.1:8770/design/a0/v5/index.html (serve from the repo root, so `private/images/` resolves).

## Where each value comes from

| On the sheet | Source |
|---|---|
| Stations and labels | `data/merged/timeline.json`, poster records (tier 1–2) |
| Label text | `data/curation/short_titles.json` (≤ 40 characters) |
| Kings' bars | `data/research/reigns_check.csv` (NWT App. A6) |
| Book tabs | `data/research/bible_books.csv` |
| Growth curve and counts panel | `data/research/growth.csv` |
| Calendar wheel | `data/research/calendar_b15.csv` |
| Images | the files in `private/images/` (git-ignored, personal use); the page falls back to the jw.org URL when the file is missing |
| Image slots, image choices, future milestones, design-only options | `data/curation/a0_sheet.json` |

**Selection rule:**
- Included: every poster point, plus tier-1 spans that aren't drawn as bars.
- Dropped as duplicates: reigns, lifespans, judgeships, prophets' activity, "X written" (book tabs), and future records (the walking path has its own list).
- Jesus' points from 29.7 to 33.3 C.E. go into the ministry columns (Passover years) and the Nisan 8–16 day strip.
