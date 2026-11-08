# V6 plan: A0 wall chart

This plan answers the owner's four points:
- the details must be clear at A0
- the ending needs replanning
- the free space should be filled with images of persons and incidents
- the UI needs better planning

Companion files:
- `PRINT_SPEC.md`: the measurable rules and the v5 audit
- `ENDING_OPTIONS.md` plus the tiles `ending-A/B/C.html`

## 1. Visual hierarchy: four layers, each tested at its distance

| Layer | Distance | What | Means |
|---|---|---|---|
| L1 | 3 m | Title · the gold spine · 4 row bands · 12 era headings · the climax (Armageddon → Reign → Paradise) · 8–10 story images | 7–15 mm type. The gold line is the thickest (2.2 mm + a 6 mm glow). Era bands are tinted. |
| L2 | 1 m | Tier-1 events (about 90) · event medallions · threads (world powers, rulers, pairs) | 4.6 mm, 800 weight. Ø 20 mm vignettes. |
| L3 | 40 cm | Tier-2 events · references · kings' bars · panels | 3.5 / 2.8 mm |
| L4 | close | Map notes · stats values · legend detail | ≥ 2.5 mm floor |

Rule: **nothing in L3/L4 may be louder than L2.** In practice:
- no saturated fills under small text
- no black pills for minor items
- ink grey (g1) for every meta line

## 2. Structure and reading flow

- **Row bands.** Each row gets a 7 mm band label at its start and its end, e.g. "ROW 2 · 997 → 332 B.C.E. ←", with a ≥ 10 mm direction arrow. Add 4 mm gold chevrons on the spine every 120 mm. This fixes "rows 2 and 4 run right-to-left and nobody knows".
- **Era bands.** Draw the 18 era captions as tinted bands, 6–8 % era colour, full label-field height, behind the labels, with the name at 7 mm in ink caps. The bands also become the background structure for the empty space (see §4).
- **How the turns carry content.** Each turn is a chapter, not a gap:
  - The **turn interior** holds a 60–80 mm circular story vignette and the scale note on the arc ("judges in order only", "1 mm ≈ 2.4 yrs").
  - Turn 1 interior: the united kingdom (Saul, David, Solomon).
  - Turn 2 interior: Between the Testaments, with Alexander and the Maccabees.
  - Turn 3 interior: the Bible survives (Tyndale, the Bible Students).
  - The **turn exterior** (x > 1035 / x < 190, between the loops) holds a large era heading and 2–3 medallions.
- **Reading start.** A bold "START HERE ↓" at the sun and a three-step key in 5 mm type next to the title: "Follow the gold line · each row is one chapter · gold = the promise".
- **The climax.** Ending option B in the bottom-left corner (see ENDING_OPTIONS). The eye has to end there, so the map and legend block must be visually quieter than the ending: lighter fills and no black frames.

## 3. Free space (measured on v5: rendered at 2 px/mm, empty 10 mm cells merged) and what goes there

| # | Box (mm) | Size | Use in v6 |
|---|---|---|---|
| F1 | x 420–630, y 30–100 | 210 × 70 | **"The promise" story panel**: the Ge 3:15 spine explained in 3 medallions (Eden · Abraham · Jesus) with one sentence each, at 4.6 mm. |
| F2 | x 840–1160, y 100–130 | 320 × 30 | Extend the stats panel down (R-overview #12), or a **turn-1 portrait strip**: Samuel, Saul, David, Solomon at Ø 26 mm. |
| F3 | x 500–790, y 100–140 | 290 × 40 | **Exodus incident strip**: burning bush, plagues, Red Sea, Sinai. Four Ø 30 mm vignettes above row 1's Exodus zoom. |
| F4 | x 200–420, y 70–100 | 220 × 30 | Era heading "IN THE BEGINNING" at 7 mm, plus the Adam/Noah medallions (Ø 24). |
| F5 | x 180–290, y 240–280 | 110 × 40 | **Flood / Tower of Babel** vignette pair (Ø 30). |
| F6 | x 1080–1160, y 350–420 | 80 × 70 | Outside, between turns 1 and 3: **Daniel in Babylon** story vignette (Ø 50) with the 607/537 note. |
| F7 | x 120–190, y 460–550 | 70 × 90 | Turn 2 exterior: **Jesus' birth / John the Baptist** vignette (Ø 50) and the row-3 band "2 B.C.E. →". |
| F8 | x 1080–1160, y 580–690 | 80 × 110 | **1914 / 1919 panel** (R-human #4–5, #26): enthroned King and the faithful slave, with a one-line gloss each. |
| F9 | x 340–1000, y 790–835 | 660 × 45 | Move the footer, sources and credits here, **or** extend ending option A's panorama band across it. |
| F10 | x 400–460, y 720–790 + world-map ocean (x 345–577, y 618–717) | ≈ 60 × 70 + crop | Crop the world map to about 60 % of its height. This frees about 90 × 230 mm for the **"good news in every land"** image wall: 6 vignettes (Bible Students 1870s, a convention, NWT release, a kingdom hall build, Tamil translation, a family Bible study). |
| F11 | x 30–120, y 530–580 | 90 × 50 | Taken by ending B (the dusk column head). |
| F12 | small cells: 890–930 × 210–250, 820–850 × 230–270, 1120–1160 × 450–490 | 40 × 40 each | Single Ø 30 person medallions next to the tier-1 event they illustrate. |

Image budget: about **40 new images** at Ø 20–50 mm.
- They come from `private/images/` and the research CSV, jw.org only.
- **Persons:** Abel, Noah, Abraham, Sarah, Joseph, Moses, Ruth, Samuel, David, Elijah, Esther, Daniel, Mary, John the Baptist, Peter, Paul, C. T. Russell.
- **Incidents:** the Flood, Babel, the burning bush, the Red Sea, Sinai, Jericho, the temple dedication, the fall of Jerusalem in 607, the decree of Cyrus, Jesus' baptism, the Sermon on the Mount, the resurrection, Pentecost, the 70 C.E. siege, the Gutenberg Bible, Tyndale, the 1919 convention, and the 1950 NWT.

## 4. Images and empty-space treatment (owner direction: images must not stand out)

Images are **part of the paper**, not photos pasted on top.

| Rule | Value |
|---|---|
| Shape | Feathered vignette, no ring, no keyline, no shadow. The mask is a radial gradient: opaque to **55 % of the radius**, then fading to 0 at the edge. For a Ø 20 mm medallion that is a 4.5 mm fade; for Ø 50, 11 mm. |
| Rectangular art (strips, panoramas) | Linear masks on every free edge. Fade width **= 12 % of that dimension, minimum 8 mm, maximum 25 mm**. The fade always ends at 0 on the paper colour; never hard-cut on a side that meets paper. |
| Tone | Warm colour matrix: R 0.93, G 0.90, B 0.80, plus a slight red/green bias. This equals about 6 % sepia and 8 % less saturation. One filter (`#warm` in `src/common.js`) is used for all images, so every photo shares one palette. |
| Opacity | Event vignettes 92 %. Story / background art 75–80 %, plus a **paper wash** gradient on top: #f7f6f2 at 55 % at the fading edge, going to 15–20 % in the middle. The wash pulls the art into the page and makes text over it legible. |
| Blend | For print, flatten the image with a multiply look onto paper (the export uses a pre-composited bitmap, not CSS blend modes). Gold-era art (the opening, the Reign) gets an extra 10 % gold (#c99512) overlay in multiply. |
| Text over images | Allowed only on a paper chip (#fbfaf7 at 92 %, 1.6 mm radius, 0.35 mm gold keyline) or under the wash at ≥ 7:1 contrast. |
| Era duotone (option for dense rows) | Small Ø 20 vignettes in rows 1–2 can be printed as a duotone of g1 → era tint, so 40 photos don't turn the chart into a collage. Full colour is kept for the 8–10 L1 story images only. |

Empty space is designed, not left blank. All of these effects stay below the threshold where they compete with text:

| Element | Spec |
|---|---|
| Parchment grain | fractal noise, base frequency 1.6 per mm, colour #8a7350, **≤ 4 % effective opacity**, whole sheet (the `#grain` pattern). Print test: it must not be visible at 1 m. |
| Era tint bands | the era colour at **6–8 %**, with soft 15 mm vertical edges between eras |
| Giant era words / numbers | 40–70 mm, 800 weight, era colour at **5–7 %**, in empty cells only. Examples: "EDEN", "EXODUS", "EXILE", "1914", "1,000" (shown in ending-A). |
| Contour / wave lines | 0.25 mm gold at **15–18 %** opacity, 14 mm pitch, in large gaps (F1, F9). They echo the map style (shown in ending-A, between the tribulation and the Reign). |
| Motifs per era | Line art at **8–10 %** opacity and 0.3 mm stroke: wheat ears (the harvest era, row 4), scroll curls (the Bible-writing era, row 2–3), stars (Abraham), waves (the Flood, the Red Sea), olive branch (Paradise). Max one motif per 100 × 100 mm. |
| Rule | No pattern under text smaller than 3.5 mm. Patterns stop 3 mm before any label box (use the labeller's `rects` as a mask). |

## 5. Balance of rows

The rows are 125 mm apart today. Rows 1–3 are dense; row 4 has the stats bed plus sparse labels, and the bottom 260 mm is maps and legend.

v6:
- Keep the 4 rows and their pitch.
- Grow the type to the PRINT_SPEC sizes. About 15 % fewer labels will fit, and the overflow goes to the medallion and story slots in §3. Push the overflow out of the rows, rather than shrinking the type.
- Row 4: move the stats lines out of the series colours (R-overview #5), into a separate grey bed under the row.
- Maps:
  - Shrink the Bible-lands map frame about 10 % and crop the world map (F10). This gives the bottom band back to the ending and the image wall.
  - The legend becomes a slimmer column (x 1015–1185) at 3 mm text.

## 6. Prioritised task list for v6

| P | Task | Owner area |
|---|---|---|
| 1 | Fix the future data order (8 + 1 + 8) in `a0_sheet.json` `future` and in the builder; drop the `F-xx · future` meta | build / curation |
| 2 | Write `tools/print_check.py`: dump the DOM, then fail on text < 2.5 mm, grey text < 7:1 under 3.5 mm, strokes < 0.2 mm, dots < Ø 1.2 mm, images < 200 dpi | tools |
| 3 | Type scale: `A0.T = {t1:4.6, t2:3.5, meta:2.8, pitch:8.6}`, meta in g1, all panel text ≥ 2.8; rerun the labeller and report the `#fit` delta | core / labels |
| 4 | Build ending B with C's gate in the bottom-left corner; remove the walking path and the hatch | panels |
| 5 | Row bands and direction arrows; era headings as 7 mm tinted bands | struct / panels |
| 6 | Image system: the `vignette()` treatment (feather, warm, wash) replaces rings and shadows in index.html; one shared filter | images |
| 7 | Empty-space system: grain, era tints, giant words, motifs, with the labeller-rect exclusion mask | panels |
| 8 | Fill F1–F12 with the story panels and about 40 medallions (§3); add slot ids to `a0_sheet.json` `slot_for` | images / curation |
| 9 | Replace the green round-robin arcs with stated prophecy → fulfilment pairs from pairs.csv (R-human #1–3) | build / panels |
| 10 | Glosses for 1914 / 1919, ruler end years, and the 69/70 weeks tags (R-human #4–9) | text |
| 11 | Map crop, legend cleanup, footer moved to F9 | map |
| 12 | Print prep: upscale paradise/eden/panorama to ≥ 200 dpi; PDF export with 300 dpi images; a 1:1 test print of 3 crops (an A3 crop of row 2, the ending, the map) | print |

The first five tasks fix what the owner sees first: legibility, the ending and the reading flow. Tasks 6–8 answer "lots of free space, add images" without making the sheet look like a collage.
