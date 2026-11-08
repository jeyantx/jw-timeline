# Handoff prompt: A0 wall chart, v5 polish pass

Paste everything below into a new chat with the agent that will continue the work.

---

You are continuing work on an A0 wall chart (1189 × 841 mm, landscape) in this project. **The layout is locked.** Your job is a polish pass: fix many small visual problems one at a time, without redesigning anything. English edition only for now; Tamil comes later.

## 1. Files (read before editing)

- `A0 Hybrid v5.html`: the page. It holds the build() pipeline, the SVG `<defs>`, the image-slot overlay, the true-size crops (ids 3b–3f) and the fit report (`#fit`).
- `a0v5/core.js`: geometry. It holds the rows (`ROWS`: t0, t1, dir, the time→x `map`, su/U/sd/D lane counts), `RY` row y's, `XL`/`XR`, the type sizes `A0.T` (t1 3.9 mm, t2 3.175 mm, meta 2.65 mm, pitch 7.4 mm), the text-width estimate `A0.tw` and `A0.laneTop`.
- `a0v5/data.js`: static design data, e.g. captions, spans, lives, prophets, the opening sequence, budget.
- `a0v5/real.js`: **generated** from `research/*.csv`. It overrides D.ev, D.jes, D.future, growth, counts, the kings, books, the calendar and D.img (the jw.org image URLs per slot). Edit its values in place with run_script on its JSON. Don't hand-retype it.
- `a0v5/draw.js`: lines, bars, spans, lifespans, book tabs.
- `a0v5/draw2.js`: label placement (`drawEvents`, `drawLabel`, `labW`, `yrOf`), the opening, the future path, growth bands, the counts panel, Daniel's symbols, the calendar wheel, the collage, the Daniel 2 panel.
- `a0v5/map.js`, `a0v5/maps.js`: the map (style `d`, world + magnified Bible lands) and the legend.
- `research/`: the research return (CSV + README.md). **This is the only source of truth for facts.** It is jw.org / wol.jw.org only. Never invent dates or wording.
- `github.md`: the repo association (jeyantx/jw-timeline, exports/design). Refresh its `## Last sync` if you re-read the repo.

Units are millimetres. The SVG viewBox is 0 0 1189 841 and 1 unit = 1 mm. Labels are packed into lanes above and below each row by `drawEvents`. `rects` holds the reserved boxes, and `pk` (Packer) tracks each lane's x-intervals. Labels that don't fit become station dots, and are counted in `#fit`.

## 2. Working rules

1. **One problem at a time.** For each one: find it, state the root cause in one sentence, make ONE targeted edit, reload, and check the same spot at true size. Don't batch-tweak numbers in the hope that something works.
2. **Don't change** the row structure, the row time ranges, the turns, the series-line order, the colours, the fonts or the panel positions, unless the issue requires it. If it does, explain why first.
3. **Performance:** the page must stay responsive. After any change to the placement code, time `A0.drawEvents` (it should be under 200 ms; it is about 60 ms now). Loading more than about 40 `<image-slot>` components with remote src froze the page; that is why images with a found source now render as plain `<img>`. Keep it that way.
4. **Inspecting:** use multi_screenshot after setting the viewBox of `#full svg` to zoom in, e.g. `document.querySelector('#full svg').setAttribute('viewBox','x y w h')`. Hide the overlays with `document.querySelectorAll('#full>div').forEach(d=>d.style.display='none')`. Images embed blank in screenshots (cross-origin), which is expected. Check them in the user's view, or by getBoundingClientRect.
5. **Facts:** if a label needs different wording, use `title_short_en` / `date_as_printed` from `research/events.csv`. If something is missing there, list it for the research agent; don't guess.
6. **After each batch,** call ready_for_verification and fix what it reports. Keep the chat summary short.

## 3. Task A: blend the images into the background

There are about 36 `<img>` overlays, absolutely positioned over the SVG. Their slot geometry is in `A0.slots` (id, x, y, w, h, shape, ph, fade, feather). Currently they are hard-edged circles and rectangles that look pasted on. Fix them by type:

- **Event medallions** (`ev-*`, circle about Ø 20 mm, next to the label):
  - Add a thin paper-coloured ring (#f7f6f2, about 0.6 mm) and a very soft outer shadow, so each sits on the paper like a printed vignette.
  - Optionally a 0.3 mm ink keyline that matches the station stroke.
  - Use CSS on the `<img>` (box-shadow, border); no SVG filters.
- **Opening** (`throne`, `pre-*`, `creation-day-*`): these sit in the golden light.
  - The throne should fade radially into the glow (`mask-image: radial-gradient(circle closest-side, #000 60%, transparent 100%)`), with no hard rim.
  - The pre-creation and day medallions get a warm ring (gold #c99512 at 30% opacity).
- **`eden` strip** and the **`story-*`** collage: feathered edges (story already uses a radial mask; check it). Eden fades on all four sides with a linear-gradient mask.
- **`paradise`** (fades in from the top): check the fade reaches 0 at the top edge, and the walking path visually enters it. Match its bottom edge to the sheet background.
- **Tone:** add a slight warm tone so the photos match the paper (e.g. `filter: saturate(.92) sepia(.06)`). Apply the same to all images.
- **Credits:** the 6-pt line "Images © Watch Tower Bible and Tract Society of Pennsylvania" must stay readable in the footer/legend. Add it if it's missing.

## 4. Task B: crop each image to its key subject

`object-fit: cover` crops from the centre, which often cuts off heads or the main action. For **every** slot:

1. Open the source image (`A0.D.img[id].src`; the page it comes from is `research/images.csv` page_url) and decide where the key subject is: the face(s), the main figure, the ark, the scroll, etc.
2. Add a per-slot focal point in a new map, `D.focus = {slot_id: [x%, y%, zoom]}`, at the end of `a0v5/real.js`. Apply it as `object-position: x% y%` and, if zoom > 1, `transform: scale(zoom)` inside an overflow-hidden wrapper.
3. Small circles (Ø 14–20 mm) need a tighter crop on the face or object. A wide scene shrunk into a 20 mm circle is unreadable.
4. Known weak images from the research README §10:
   - `creation-day-*` primary is one collage, so use the alt2 per-day images.
   - `story-*` alt1 images are too small.
   - Stand-ins: `ev-gutenberg-bible`, `ev-isaiah`, `ev-saul-dies` (shows Saul rejected), `ev-name-jehovah-s-witnesses` (programme cover), `pre-1`.
   - **Never** use `pre-3__alt1` or `ev-jerusalem-destroyed-70__alt2`.
   - List any slot where no crop works and needs an edited image (the research agent offered to prepare edits by slot_id).
5. Record the focal points you set in `research/image_crops.md` (slot, focus, note) so they carry over to the Tamil edition and to high-resolution files.

## 5. Task C: character spacing and text placement

`A0.tw` estimates text width as `length × fs × 0.57` for bold and `× 0.51` for regular. With real Noto Sans glyphs this is wrong in both directions:
- Labels with many narrow letters (i, l, t, 1) leave large gaps.
- Labels with wide letters (M, W) or long numbers overflow into neighbours or beyond their leader.

Fix:

1. **Measure real widths.** Replace `A0.tw` with a canvas measureText version using the loaded font: `ctx.font = `${b?800:400} ${fs}px "Noto Sans"``, cached by `(text, fs, b)`.
   - Run it **after** `document.fonts.ready` resolves (build() must wait for it).
   - Keep the old estimate as a fallback if the canvas is unavailable.
   - This one change will tighten most label boxes and let more labels fit. Re-read the `#fit` counts afterwards and report the before/after numbers.
2. **Letter-spacing:**
   - Captions use `letter_spacing: 0.25` at 4.2 mm, and their width estimate adds `0.25 × length`. Keep that consistent with the real measure.
   - No body labels should have letter-spacing. Check that none inherit it.
3. **Year tag and title:** they are one `<text>` with a `<tspan>` for the year.
   - Check the gap after the year is one space, not two.
   - Two-line labels (`it._sp`): line 2 is title-part-2 + two spaces + meta. Check the baselines are 3.6 mm apart for tier 1 and 3.0 mm for tier 2, and that nothing collides with the next lane (pitch 7.4 mm).
4. **Text halo:** the paper-coloured stroke is 0.9 at small sizes; it can make letters look heavy or eat counters. Use 0.6 for text ≤ 2.65 mm.
5. **Alignment:**
   - Right-anchored labels (`text-anchor: end`) must end exactly at their leader, and left-anchored ones start there. The offset is 0.9 mm; make it the same on both sides.
   - Elbow leaders (`got.sh`) must meet the text's baseline-middle, not its top.
6. **Specific areas to check at true size:**
   - the Row 2 lane tags (ISRAEL / PROPHETS / JUDAH / NATIONS)
   - the calendar wheel's outer labels
   - the Daniel 2 panel rows
   - the counts panel's mini-chart titles and values (right-aligned, must not hit the title)
   - the "Beyond the Bible lands" list (cut-off strings currently use a character count; switch to measured width with an ellipsis)
   - the map labels (one still overlaps)
   - the future walking-path labels
7. **Typography:**
   - Use proper en dashes in ranges (1914–1918) and real “curly” quotes and ’ apostrophes.
   - Put non-breaking spaces in "B.C.E." and between a number and its unit.
   - No double spaces anywhere except the deliberate title-to-meta gap.

## 6. Task D: the small-problems sweep (one by one)

Go area by area in this order. For each area, take a zoomed screenshot, list the defects you see, then fix them one at a time:

1. Opening and the Eden strip
2. Row 1 (lifespans block, Exodus, judges)
3. Turn 1 (inside and outside the curve)
4. Row 2 (seven lanes, kings' tracks, prophets' bars)
5. Turn 2
6. Row 3: Jesus' ministry columns and the final-week strip
7. Row 3 to 1700
8. Turn 3
9. Row 4: the study-book relay, growth bands, stone arc
10. Armageddon, the walking path and paradise
11. Left gutter: the calendar, collage and Daniel 2 panel
12. Counts panel
13. Map
14. Legend and footer

Typical defects to look for:
- clipped text
- labels crossing lines or bars
- leaders crossing other labels
- orphan year tags
- "year not stated" shown where a year exists, or the reverse
- duplicate events (the same fact as a dot and a label)
- inconsistent scripture abbreviations (use the NWT short form, e.g. Ge, Ex, 1Sa, Mt, Re)
- missing station glyphs
- reigns whose bar length doesn't match the printed years in `research/reigns_check.csv`

**Label fit is the owner's decision.** If you can't make a key tier-1 event fit, don't shrink the type. Report it with its `ref0`, so the owner can choose among:
- raising the tier threshold
- smaller type
- an extra row

## 7. Later: print resolution (don't do now; just note blockers)

The final file will be exported for print at A0. Most jw.org art is 1200 px, but a 20 mm medallion needs about 240 px at 300 dpi (fine), while paradise (312 mm) needs about 3,700 px and eden about 1,725 px.

While you work, keep a list in `research/print_todo.md`:
- every slot with its print size in mm, the source px, the effective dpi, and whether it needs upscaling;
- any SVG pattern or hatch that will moiré;
- any hairline under 0.15 mm.

Plan for later:
- Download all images into the project, so print doesn't depend on jw.org.
- AI-upscale the low-dpi ones.
- Export the sheet as vector PDF, with the images embedded at 300 dpi.

## 8. Reporting

At the end of each turn, give 3–6 bullets: what you fixed, the before/after `#fit` counts if placement changed, and anything that needs the owner's decision or the research agent. No long explanations.
