# R-turn3: Turn 3 (right curve, Row 3 → Row 4, 1700–1870)

Reviewer: R-turn3. Region x 980–1189, y 380–610 mm. Shots at Z=5: `/tmp/sw-rturn3-4.png` (22:00) and `/tmp/sw-rturn3-7.png` (22:01). FIX-FILL and FIX-LABELS were changing this area while I reviewed, so the findings below describe the **22:01 state**. Earlier states are noted where they differ.

Geometry, for reference: the turn runs from 1700 at (1035, 430) round to 1870 at (1035, 555). Its centre is at (1035, 492.5), at about 1.2 years per mm. The outer black ring reaches x ≈ 1118. The dashed safe-margin line is at x = 1169 (index.html, rect 20,20,1149,801).

## Defects, most visible first

1. **Outer labels are out of order, and their leaders cross each other.** At x 1080–1125, y 520–575, the labels outside the curve read 1816, 1835, **1804**, **1819**, 1841, 1854, 1859. The tier-1 "1804 British and Foreign Bible Society" sits below 1835, at (1116, 542). Its leader runs from the dot at (1094, 514) diagonally down-right and crosses the 1816 and 1835 leaders. The 1819 leader, from the dot at (1085, 530) to (1110, 551), also crosses the 1835 leader. The result is leader spaghetti, right where the eye lands.
   - Cause: `draw2.js` loop placement (the `A0.LOOPS.forEach` block, about lines 58–64). Items are sorted with `med`, then non-extra, then extra, and each searches only ±7 pitches from its own y. Later items get pushed past earlier ones, and nothing enforces a monotonic order or uncrossed leaders.
   - Suggested fix: on the outer side, place labels in time order and give each a y no smaller than the previous label's y.
   - **FIX-LABELS**

2. **Big empty band on the outer right while the lower labels are crammed.** The area x 1120–1166, y 440–520 (about 45 × 80 mm) is empty. The outer labels are packed between y 524 and 585. The upper outer labels stop at 1728, at y 438. The curve section 1740–1790 (about y 445–500 on the arc) has **no events at all**: there are no dots between 1737 (1074, 444) and 1793 (1097, 501).
   - **FIX-FILL**: content (see the "Missing events" list).
   - **FIX-LABELS**: let the lower outer labels use this band.

3. **Inside the loop, the reading order zigzags.** The labels inside the loop, stacked at x 1020–1070, y 485–528, read 1737, 1793, 1800, **1862, 1864**. Meanwhile 1816–1859 sit outside. The "1862 Young's translation" leader runs from (1060, 517) to its dot at about (1044, 554). The "1864 Emphatic Diaglott" leader runs from (1048, 524) to (1042, 555). Each of these leaders is about 30–35 mm long and crosses the thick purple and gold rings.
   - Suggested fix: put 1862 and 1864 (end of the turn) outside or below the curve. There is free space at x 1100–1166, y 590–605. Alternatively, keep the inside of the loop for 1700–1800 only.
   - **FIX-LABELS**

4. **Row 4 labels intrude into the turn's hole.**
   - "1884 Watch Tower Society chartered December 15, 1884" is at x 988–1037, y 497–502. "…eur (pioneer) work begins" (1881) is at y 504–508. Both sit inside the loop, next to the turn's 1793 and 1800 labels.
   - The 1884 year sits only about 2 mm under the heading "THE HARVEST IS COMING" (y ≈ 491). A reader takes 1884 and 1881 as part of the 1700–1870 curve.
   - Cause: `draw2.js` `lim()` (line 56). For row 3/4 it widens `mx` to `XR+ext-1`, so Row 4 above-the-line labels can extend into the loop interior.
   - **FIX-LABELS**

5. **The 1714 image slot is empty, and its placeholder text overlaps.**
   - The grey circle at (1031–1051, 460–479) shows "IMAGE" and "Drop an image" printed on top of each other. "IMAGE" and "Drop an" collide at y ≈ 469.
   - This is the slot `ev-tamil-new-testament` for the tier-1 Tamil Christian Greek Scriptures (b7-0175). The owner cares about the Tamil edition, so this slot matters.
   - **FIX-IMAGES** (choose a jw.org image, or hide the double placeholder text). If no image exists: **OWNER**.

6. **The 1714 leader dangles.** It runs from the half-filled dot at (1051, 432) straight down and stops at (1052.5, 468). That point is just right of the image circle, while the label "b. 1714 Tamil Christian Greek Scriptures" is left of the circle, at x 985–1030. The line seems to point at nothing.
   - Cause: `draw2.js` loop placement draws the leader to `got.x+got.w+0.3` for `anc==='end'`. That box includes the +21 mm medallion width, so the leader ends at the far side of the image instead of at the text.
   - **FIX-LABELS**

7. **The 1706 and 1728 leaders are long and horizontal across all the rings.** The 1706 leader runs from (1042, 430) to (1107, 430). The 1728 leader runs from (1066, 438) to (1113, 438). Both cross 6 ring strokes, the red, grey and dotted rings, almost tangentially. That is acceptable, but the 1706 leader runs exactly along y 430. That is the Row 3 track's own y, so near x 1042–1050 it reads as a continuation of the track.
   - Suggested fix: angle the leader, or start the label a couple of mm lower.
   - **FIX-LABELS**

8. **The PIONEERS and BIBLE STUDIES band labels are struck through at the turn's end.** At x 1015–1033, y 557–568, "PIONEERS (avg.)" has the red line through it, and "BIBLE STUDIES" sits under the gold line. They are next to the big 1870 pill marker at (1035, 555–569).
   - Cause: the growth band's label baseline is on the track offsets. These are in `draw2.js` (growth panel) or `draw.js` (track offsets).
   - **FIX-PANELS** (if they're growth labels) or **FIX-STRUCT**

9. **The 1854 and 1859 leaders fan steeply downward.** They run from the dots at (1053, 553) and (1047, 554) to labels at (1105, 573) and (1086, 582). The 1859 leader passes very close to the 1862/1864 dots, and the dot cluster 1859/1862/1864 at x 1042–1048 is unreadable at 1:1. The dots are only about 2.3 mm apart, at 1.2 yr/mm.
   - Suggested fix: mark this cluster with one bracket or a shared leader.
   - **FIX-LABELS**

10. **At 22:00 the tier-2 "1864 Emphatic Diaglott" (b7-0228) lost its label.** The 1841 and 1859 dots had no labels either. They were fixed at 22:01, but it is fragile.
    - Cause: in the loop placer, non-extra items try only one side (`[nx++%2]`), so a tier-2 item with a blocked side is dropped. Extras get both sides.
    - Suggested fix: give tier 1 and 2 both sides first.
    - **FIX-LABELS**

11. **The 1870 "Russell begins" photo moves around.**
    - At 21:59 the photo sat inside the loop at (1018, 507).
    - At 22:00 it moved below Row 4, at (1024, 603), as an empty grey "IMAGE" placeholder.
    - At 22:01 it showed the photo again.
    - Please confirm that the final state renders the photo, not the placeholder.
    - **FIX-IMAGES** / **FIX-LABELS**

12. **The year sequence on the curve does not run smoothly.** Going down the curve, the dot y-values are 1706 (430), 1714 (432), 1728 (438), 1737 (444), then nothing until 1793 (501). The dot at 1793 is drawn small. The 1800 and 1804 dots sit only about 4 mm apart, at (1095, 510) and (1094, 514), and the 1804 tier-1 dot is the big one, so it visually dominates 1793 and 1800. That is OK as is. **No fix needed** unless content is added in 1740–1790.

## Missing events, 1700–1870 (sort_key), not on the sheet

All of these are in `data/merged/timeline.json`. The ones in bold matter most for the "truths recovered" / "harvest is coming" story, which the turn currently does not tell at all: every event on the curve is a translation milestone.

- **Truths recovered:** **b20-0001** "Henry Grew’s pamphlet exposes immortal-soul teaching" (About 1835); **b20-0002** Storrs finds Grew’s pamphlet (1837); b20-0003 Storrs resigns from the Methodist Church (1840); **b20-0004** Storrs lectures “Are the Wicked Immortal?” (early spring 1842); b7-0218 Storrs publishes "Bible Vs. Tradition" (1853); b7-0221 Seiss writes of an invisible presence (1856).
- **Russell's start:** **b8-0001** Charles Taze Russell is born (February 16, 1852; tier 4, but a natural anchor); **b8-0002** Russell's faith reestablished after hearing Jonas Wendell (1868 or 1869); b8-0003 J. F. Rutherford born (November 8, 1869).
- **Context:** **b7-0214** Millerites' "Great Disappointment" (1844, October 22); b7-0216 Communist Manifesto (1848); b7-0226 Darwin's "Origin of Species" (1859).
- **Bible text, to fill the empty 1740–1790 arc:**
  - b7-0180 Kennicott, readings of 600+ Hebrew manuscripts (1776–1780)
  - b7-0182 De Rossi comparisons (1784–1798)
  - b7-0183 Scio's Spanish Bible (1790)
  - b7-0181 Spanish Inquisition permits annotated Bibles (1782)
  - b7-0185 Griesbach Greek master text (1796–1806)
  - b7-0178 Schultze Telugu rendering (by 1732)
  - b7-0176 Ziegenbalg dies (1719)
- **Translations and Bible societies:**
  - b7-0187 / b7-0188 Carey's press at Calcutta and Serampore (1798 / 1800)
  - b7-0196 Serampore fire (1812)
  - b7-0197 associate Bible societies in Germany, the Netherlands, Denmark and Russia (by 1813)
  - b7-0190 Bible available in about 70 languages (by 1800)
  - b7-0208 Judson's manuscript saved in a pillow (1824)
  - b7-0213 Tischendorf's first Sinaiticus portion (1844)
  - b7-0223 Moffat's Tswana Bible (1857)
  - b7-0215 Tulu Bible (1847)
- **Spans:** d1-0028 Life of George Storrs (1796–1879) and d1-0029 Life of C. T. Russell (1852–1916) could run as thin bars along the inner side of the curve.

**FIX-FILL:** add these to `data/curation/a0_extra.json`. Priority:

1. Grew ~1835
2. Storrs 1842
3. Millerites 1844
4. Russell born 1852
5. Russell 1869
6. Kennicott 1776 or Griesbach 1796, to fill the empty arc

Which of the "truths recovered" set to show is **OWNER**. The "truths recovered" theme named in the turn's scope has no events on it at present.

## Free space available for these

- Outer right, x 1120–1166, y 440–520: the largest gap, next to the 1740–1800 arc.
- Outer right, below the 1859 label, x 1100–1166, y 590–605.
- Inner hole, right of the 1714 image, x 1055–1080, y 450–480. Only short labels fit here, since the purple ring is at x ≈ 1083.
- Above the turn, x 1090–1166, y 385–425, is free. It belongs to the end of Row 3's upper label zone and could take 1706/1719 so that the outer right column starts lower.
