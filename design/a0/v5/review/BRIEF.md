# Swarm brief: A0 sheet review and fix (2026-11-08, 21:58–22:25)

**Hard deadline: 22:25 local time.** Run `date +%H:%M` often.
- **Reviewers** write their findings by **22:12** and stop.
- **Fixers** stop editing at **22:22** and write their summary by **22:25**.

## The sheet

The sheet is a 1189 × 841 mm SVG drawn by JavaScript in `design/a0/v5/`. Read `design/a0/v5/README.md` and `design/a0/v5/HANDOFF_PROMPT_v5_polish.md` (the designer's own polish list) first.

- Units are mm. Rows sit at y = 180, 305, 430, 555, running from x = 190 to 1035.
- The turns are half-circle loops: right side x 1035–1189 (turns 1 and 3), left side x 0–190 (turn 2).
- **Data is generated:**
  - `a0v5/real.js` is built by `python3 scripts/build_a0_sheet.py` from `data/merged/timeline.json`, `data/curation/short_titles.json`, `data/curation/a0_sheet.json` and `data/research/*.csv`.
  - Never hand-edit `real.js`.
- **Facts:** jw.org / wol.jw.org only. Never invent dates or wording. The research CSVs and `data/merged/timeline.json` are the truth.

## Looking at the sheet

The server is already running at http://127.0.0.1:8770. Screenshot any region (mm) like this:

```bash
design/a0/v5/tools/shot.sh X Y W H Z OUT.png
```

- `Z` is px per mm: use 4–6 for a region, 2 for overview.
- Example: `design/a0/v5/tools/shot.sh 560 240 200 130 5 /tmp/sw-<name>-1.png`
- Then open the PNG with the Read tool.
- Write PNGs to `/tmp/sw-<yourname>-*.png` only.
- Photos load from local files; empty image slots show as grey circles.
- You may also read the drawing code and run small Python checks.

## File ownership: edit ONLY files you own

Everyone else reports.

| Owner | Files |
|---|---|
| FIX-STRUCT | `a0v5/draw.js`, `a0v5/core.js` |
| FIX-LABELS | `a0v5/draw2.js`, only `drawEvents` / `drawLabel` / `labW` / `yrOf` and other label-placement code |
| FIX-PANELS | `a0v5/draw2.js`, only the other functions (opening, future path, growth, counts panel, beasts, calendar, collage, Daniel 2 panel, captions, stone). Re-Read before each Edit; small, unique replacements only |
| FIX-MAP | `a0v5/map.js`, `a0v5/maps.js` (map, legend, footer) |
| FIX-IMAGES | `index.html` (image overlay CSS/masks only), plus `data/curation/a0_sheet.json` keys `focus` / `image_choice` / `slot_for` |
| FIX-TEXT | `data/curation/short_titles.json`, plus text strings in `a0v5/data.js` (spelling, typography, en dashes, curly quotes) |
| FIX-FILL | `scripts/build_a0_sheet.py`, plus a new `data/curation/a0_extra.json` (adding records so the empty turns and curves carry content) |

After a data change, run `python3 scripts/build_a0_sheet.py`. After any change, check your area with `shot.sh`.

## Reviewers

- Write `design/a0/v5/review/R-<name>.md`.
- List concrete defects, **most visible first**. Give each one:
  - where (mm x, y);
  - what is wrong;
  - the likely cause (file + function, if you can tell);
  - the owner tag from the table above (FIX-STRUCT, FIX-LABELS, …).
- Aim for 10–30 items. Concrete, not vague.
- Things that need the owner's decision get the tag `OWNER`.

## Fixers

1. Start with your own sweep of your files.
2. From about **22:08**, also read every `design/a0/v5/review/R-*.md` for items tagged with your name, and fix them.
3. **One fix at a time:** make the change, then shoot to verify.
4. Don't redesign. Keep the layout, colours and fonts.
5. Keep `A0.drawEvents` fast.
6. At the end, write `design/a0/v5/review/F-<name>.md`: what you fixed, what is left.

Do NOT commit to git. The orchestrator commits.
