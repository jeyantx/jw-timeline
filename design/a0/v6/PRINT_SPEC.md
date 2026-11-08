# A0 print spec (v6)

The sheet is 1189 × 841 mm, and 1 SVG unit is 1 mm. Font sizes in the code are **em size in mm**. To convert: 1 pt = 0.3528 mm, so `pt = mm / 0.3528`.

Viewing distances:
- **Visitor:** 2–3 m. Reads only the landmarks: the title, the row and era headings, the photos and the gold line.
- **Reader:** about 1 m. Reads the tier-1 labels.
- **Student:** 30–50 cm. Reads everything.

All rules below are minimums for the printed A0. They are checked against the rendered DOM, not against the source.

## 1. Text sizes per role

| Role | Examples | Min size, mm (pt) | Weight / colour | v5 now |
|---|---|---|---|---|
| Sheet title | FROM EDEN TO THE KINGDOM | 15 (42.5) | 800, ink | 15 ✓ |
| Row band / era heading (landmark) | ROW 2 · 997–332 B.C.E. ←, THE JUDGES | **7.0 (20)** | 800, ink or era colour ≥ 4.5:1, letter-spacing 0.4 | 4.2 grey caps ✗; row names not drawn ✗ |
| Panel heading | DANIEL 2 · THE IMAGE…, ISRAEL’S YEAR | 4.6 (13) | 800, ink | 2.8–4.0 ✗ |
| Tier-1 event label (year + title) | 1513 Red Sea deliverance | **4.6 (13)** | 800, ink | 3.9 ✗ |
| Tier-2 event label | Mizpah victory | **3.5 (10)** | 700, ink | 3.175 / 2.86 ✗ |
| Meta line (reference, date note) | 1Sa 4:18 · year not stated | **2.8 (8)** | 400, g1 #3d3c39 or darker | 2.65 in g2 ✗ |
| Captions, panel body, stats values | 92,05,326, Asa · 41 yrs | 2.8 (8) | 700–800 | 2.1–2.4 ✗ |
| Legend text | Promised offspring · Ge 3:15 | 3.0 (8.5) | 400–700, ink | 2.4 ✗ |
| Map: region / sea | EGYPT, THE GREAT SEA | 3.5 (10), caps, spaced | 700, g1 / sea blue-grey ≥ 4.5:1 | 3.0–3.2 ✗ |
| Map: place name | Jerusalem | 2.9 (8.2) | 800, ink with halo | 2.9 ✓ |
| Map: notes, journey sub-lines | P1–14 stops | 2.6 (7.4) | 400, g1 | 2.1–2.3 ✗ |
| **Absolute floor** (anything printed) | | **2.5 (7)** | g1 or darker | 1.9 ✗ |

Two more rules:
- **Size steps must be visible.** Adjacent roles differ by **≥ 25 %**: 7.0 → 4.6 → 3.5 → 2.8. In v5, t1 3.9 vs t2 3.175 is 23 %, and the tier-2 second line at 2.86 is nearly the same as meta at 2.65. That is why R-overview found tier 1 "cannot be told apart".
- **No letter-spacing on body text.** Caps headings get 0.3–0.5 mm.

## 2. Colour and contrast (text on paper #f7f6f2 / Bible bed #e0dcd2)

| Colour | On paper | On Bible bed | Allowed for |
|---|---|---|---|
| ink #1d1d1b | 15.6 | 12.3 | everything |
| g1 #3d3c39 | 10.2 | 8.1 | meta, captions, legend (**the default grey**) |
| g2 #6e6c67 | 4.85 | **3.83** | text ≥ 3.5 mm on paper only; never on a bed |
| g3 #a3a19b | 2.39 | 1.89 | **never text**; strokes and fills only |
| goldD #7a5a00 | 5.9 | 4.66 | gold text (headings, the Reign) |
| gold #c99512 | 2.49 | 1.97 | **never text**; lines and fills only |
| exo #16857f | 4.14 | 3.27 | text ≥ 3.5 mm bold only |
| white on gold / g3 bar | 2.7 / 2.58 | | **never**: use ink on light bars |
| white on red / blue / violet / green | 5.4 / 6.4 / 7.6 / 4.25 | | text ≥ 2.8 mm, 800 weight |

The rule: text **< 3.5 mm needs ≥ 7:1**, and text **≥ 3.5 mm needs ≥ 4.5:1**. Print loses about 10–15 % contrast against the screen on uncoated paper.

## 3. Halos (paper-coloured text stroke, `paint-order: stroke`)

- Width = **0.18 × font size**, clamped to 0.5–0.9 mm. That gives 2.8 mm → 0.5, 3.5 mm → 0.63, 4.6 mm → 0.83 and 7 mm → 0.9.
- The halo colour must equal the ground it sits on: paper #f7f6f2 on paper, and the bed colour inside beds. v5 mixes #fbfaf5 (map) and #f7f6f2, which is fine on paper but shows as a light ring on beds.
- Use a halo only where text crosses lines. Never put a halo on text inside a filled bar.

## 4. Strokes

| Element | Min width | v5 now |
|---|---|---|
| Gold spine (promised offspring) | 2.2 mm, and the thickest line on the sheet (R-human #14) | 2.2 ✓ |
| Series lines (red, blue, violet …) | 0.8 mm | 0.6–0.8 |
| Leaders | **0.25 mm**, colour #8d8a83 or darker | **0.16 mm #9d9a92 × 213** ✗ |
| Ticks, grid, book-tab keylines | 0.2 mm, in ink/g1 only (a pale hairline + 0.2 mm = drops out) | 0.2 mm #a3a19b × 66 ✗ |
| Station ring | 0.35 mm (tier 2), 0.5 mm (tier 1) | 0.35 ✓ |
| Hatch / pattern lines | 0.25 mm, spacing ≥ 1.5 mm (no moiré at 300 dpi) | 0.3 / 3 mm ✓ |
| **Absolute floor** | **0.2 mm** (0.57 pt) | 0.16 ✗ |

## 5. Markers

| Marker | Min diameter | v5 now |
|---|---|---|
| Tier-1 station | 3.0 mm | 2.8 (r 1.4) ≈ |
| Tier-2 station | 2.0 mm | 1.6 (r 0.8 × 334) ✗ |
| Data point (growth curve, map stop) | 1.2 mm | **0.9 (r 0.45 × 314)** ✗ |
| Direction chevron on the line | 4 mm, every 120 mm (R-overview #7) | ±1.6 mm, sparse ✗ |
| Event medallion | Ø 20 mm min; Ø 30–40 mm for "story" images | Ø 19.6 |

## 6. Images (300 dpi target = 11.8 px/mm; 200 dpi = 7.9 px/mm is the acceptable floor)

| Slot | Print size | px needed @300 / @200 | Source px | Effective dpi | Verdict |
|---|---|---|---|---|---|
| Event medallion | Ø 20 mm | 236 / 157 | ≈1200 (cropped to about 600) | 760 | ✓ |
| Story medallion (v6) | Ø 36 mm | 425 / 283 | 1200 | 400+ | ✓ |
| eden strip | about 150 × 60 mm | 1772 / 1181 | 1200 × 600 | 203 | borderline: upscale ×2 |
| paradise | about 312 × 143 mm | **3685** / 2457 | 1200 × 1133 | **98** | ✗: AI-upscale ×3 or source the larger jw.org rendition |
| v6 panorama (endings) | 340 × 170 mm | 4016 / 2677 | 1200 × 600 | 90 | ✗: upscale ×3–4 |
| throne / sun | Ø 60 mm | 709 / 472 | 1200 × 600 | 500 | ✓ |

Rules for images:
- Every image must reach **≥ 200 dpi effective**.
- Large blended backgrounds (opacity ≤ 60 %, feathered) may go down to 150 dpi, because softness hides upscaling.
- Upscale with a photo upscaler, never browser resampling.

## 7. Audit of v5 (rendered DOM, 1,147 text elements; counts are elements)

| # | Violation | Where (file) | Count | Fix |
|---|---|---|---|---|
| 1 | Text < 2.5 mm floor: 1.9 (SACRED/YEAR), 2.0 (Da 7:4 beast refs), 2.1 (stats, years), 2.2 (wheel months, IMAGE), 2.3 (book tabs, map lists), 2.4 (kings' bars, NISAN, legend) | draw2.js 171/175/178/195/206/212–219/251; draw.js 23/42/55/84/86; map.js 85/86/108/133/135 | 7 + 63 + 79 + 169 + 100 = **418 (36 %)** | Raise everything to ≥ 2.5. Panels: 2.8. If a box can't fit, cut content (drop month glosses, weekly notes) rather than shrink. |
| 2 | Tier-1 at 3.9 vs tier-2 at 3.175: step too small | core.js `A0.T` | 95 / 154 | `A0.T = {t1:4.6, t2:3.5, meta:2.8, pitch:8.6}`. Needs relayout: about 15 % fewer labels fit, so raise the tier threshold or use the v6 free space (V6_PLAN §3). |
| 3 | Meta lines in g2 #6e6c67 at 2.65 mm (3.8:1 on beds) | draw2.js `drawLabel` meta fill | 69 | Use g1 #3d3c39 at 2.8. |
| 4 | Tier-2 line-2 at 2.86, which competes with meta | draw2.js `drawLabel` (`_sp` second line) | 126 | Line 2 = t2 size (3.5); meta stays 2.8. |
| 5 | Era captions 4.2 mm grey caps: invisible at 2 m | draw2.js `drawCaptions` | 18 | 7 mm ink caps on tinted era bands (V6_PLAN §2). |
| 6 | Row names/scales defined but never drawn | core.js `ROWS[].name` | 4 | Draw row bands at each row start/end, 7 mm + ≥ 10 mm direction arrow. |
| 7 | Leaders 0.16 mm #9d9a92 (2.6:1) | draw2.js 64, 118 | 213 | 0.25 mm #8d8a83. |
| 8 | Pale hairlines 0.2–0.25 mm in #a3a19b | draw.js book tabs (rect 0.25), map ticks | 66 + 60 | 0.25 mm in g1, or remove. |
| 9 | Data dots r 0.45 (Ø 0.9 mm) | draw2.js 174 (growth), maps.js stops | 314 | r 0.6, or drop dots and keep the curve. |
| 10 | Tier-2 stations Ø 1.6 mm | draw2.js station glyph | 334 | Ø 2.0 (r 1.0). |
| 11 | White text on gold / grey bars (≤ 2.7:1) | draw.js kings' bars (white 2.4 mm × 23) | 23 | Ink text on light bars; white only on red/blue/violet/dark. |
| 12 | Gold text #c99512 (2.5:1) anywhere | check draw2.js future, stone | – | goldD #7a5a00 for all gold text. |
| 13 | Halo 0.8 mm on 2.4–2.9 mm map text (eats counters) | map.js `HALO`, maps.js 24–25 | 266 | Use the 0.18 × fs rule (0.5 mm). |
| 14 | "IMAGE" / "PARADISE ARTWORK" placeholders printed | draw2.js 31, future panel | 6 | Never print placeholders; hide empty slots. |
| 15 | paradise image at 98 dpi | index.html slot `paradise` | 1 | Upscale ×3 (§6). |
| 16 | Footer "Wireframe v0.4" stale | maps.js footer | 1 | Use the v6 print wording. |

How the audit was made: Chrome `--dump-dom` of `design/a0/v5/index.html`, then the font-size, fill, stroke-width and r of every `<text>`, `<line>`, `<path>`, `<rect>` and `<circle>` in the main SVG were tallied.
To re-run, regenerate the DOM and tally it the same way. A checker script is a v6 task (V6_PLAN T2).
