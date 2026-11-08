# R-turn1: Turn 1, the right-hand curve (1200–997 B.C.E.), x 980–1189, y 140–350

Shots: /tmp/sw-rturn1-1.png (Z5, whole turn), -2 (Z3, context), -3 (Z6, lower curve), -4 (Z6, inner hollow; taken 22:00, by then fixers had already changed the layout: "Ark kept at Kiriath-jearim" was placed and "Samuel judges" / "United kingdom" had moved).
Live counts from `A0.items` / `A0.stats` at 21:59: **27 loop-0 items, only 11 labelled, 16 dropped, 8 of them tier 1.**

## A. Missing events (in data and in real.js, but no label drawn). Most visible first.

All of these are loop-0 items in `real.js` (`A0.items.filter(i=>i.loop===0)`). They get a glyph on the curve and no text.

| # | t | tier | title (short) | glyph at (mm) |
|---|---|---|---|---|
| 1 | -1033.7 | **1** | Solomon begins building the temple | 1069, 295 |
| 2 | -1026.15 | **1, med** | Solomon's temple completed (photo slot) | 1062, 299 |
| 3 | -1025.25 | **1** | Inauguration of Solomon's temple | 1061, 299 |
| 4 | -1117 | **1** | Samuel anoints Saul as king of Israel | 1095, 225 |
| 5 | -1106.9 | **1** | Samuel anoints young David | 1097, 234 |
| 6 | -1069.89 | **1** | The Ark is brought into Jerusalem | 1091, 269 |
| 7 | -1069.79 | **1** | Covenant with David for a kingdom | 1091, 269 |
| 8 | -1180 | **1** | Birth of Samuel | 1054, 183 |
| 9 | -1106.8 | 2, med | David kills Goliath (photo slot) | 1097, 234 |
| 10 | -1078.1 | 2 | Saul and Jonathan die at Gilboa | 1094, 262 |
| 11 | -1036.6 | 2 | Solomon asks Jehovah for wisdom | 1071, 294 |
| 12 | -1173 | 2 | Jephthah defeats Ammon | 1060, 185 |
| 13 | -1179.8 | 2 | Jehovah speaks to young Samuel | 1054, 183 |
| 14 | -1106.6 | 2 | David spares Saul's life | 1097, 235 |
| 15 | -1078.2 | 3 | Saul consults the medium at En-dor | 1094, 262 |
| 16 | -1139.9 | 3 | Ark kept at Kiriath-jearim (placed in the 22:00 render) | 1085, 205 |

**The temple is missing.** The turn shows nothing between David (1070) and the queen of Sheba (1027–998): no temple begun, completed or inaugurated, and no Solomon's wisdom. Meanwhile tier-2 "year not stated" items (David's sin, Absalom, Sheba) do get labels.

In data but not in real.js (by curation, so OWNER decides): Ibzan, Elon, Abdon and Samson judgeships (-1166 to -1150, "date not stated"). Also: Reign of Saul / David / Solomon (shown as bars only), Life of David, Birth of David (tier 4), David king of Judah at Hebron 1077 (tier 4; d1-0071 span 1077–1070 has no bar), and "Solomon's temple in service 1027–607" (b12-0015, no bar). Tags: OWNER, FIX-FILL.

## B. Why they drop (root cause). FIX-LABELS, `draw2.js` `A0.drawEvents`, the `A0.LOOPS.forEach` block (around lines 58–65)

1. **Inside/outside is chosen by alternating index (`outside=i%2===1`), not by where space is.** Inside slots need `dy<=39` from the loop centre (cy = 242.5). So any item with y < ~204 or y > ~281 that gets an even index can **never** be placed: the top cluster (1180–1173) and the whole Solomon/temple cluster (y 294–299). The temple items land on even indices, so they `continue` on all 14 tries. Fix: try both sides (outside first for |dy|>35), keep the better one.
2. **The sort is `med` first, then `t`. Tier is ignored**, so tier-1 items compete on equal terms with tier 2/3 and lose (compare the row placer at line 101, which does rank tier 1 first). Fix: sort by med, then tier, then t.
3. **The outside column is very narrow.** `ro=92` puts the label start at x ≥ XR+92 = 1127 near the centre, and the `xo+w>1168` cut-off leaves only ~41 mm of width. Long titles wrap ("David king over / all Israel") or drop. The real free area starts at x ≈ 1105, just outside the red line and the kings' bars, at the middle rows. Fix: use ro ≈ 75–80, or a bar-aware radius (the bars sit at about r = 88 from (1035, 242)), and let labels run to ~1168.
4. **Only 14 vertical tries of ±7 pitches**, with no fallback to stacking several items under one leader (the row placer's cluster mode, lines 75–97, isn't used on loops). The 5 items at (1091, 269) and the 3 at (1054, 183) compete for one spot. Fix: group identical-position glyphs (as in placeFree) and stack them in one label block.

## C. Unused space (mm). Room exists for all of section A.

- **E1. Right of the curve, x 1105–1168, y 210–268**, about 60 × 55 mm. Holds only the thin Saul bar (x 1117–1122). Nothing else. The best spot for the Saul/David anointings, Goliath, Gilboa and the Ark into Jerusalem.
- **E2. Above the top of the curve, x 1040–1168, y 140–178.** Completely empty above the "Hannah" label (y 181). Room for Birth of Samuel, Jehovah speaks to Samuel and Jephthah.
- **E3. Below and right of the David cluster, x 1110–1168, y 282–300.** Empty between "David king over all Israel" (ends y ~281) and "David's sin" (y 302). Room for the covenant with David and the Ark into Jerusalem.
- **E4. Lower right, x 1150–1168, y 318–350, and x 1100–1168, y 343–350.** Beside and under the Sheba medallion. Room for the temple begun / completed / inaugurated, Solomon's wisdom.
- **E5. Inside the hollow, x 1045–1085, y 250–285.** Holds only the book tags "2Sa 1040" and "Ca 1020". About 35 × 30 mm free. The inner-side placer rejects it because of rule B1 (`dy<=39`) and the `lim()` radius of 37.
- **E6. The beige band between the red line and the band's outer edge**, x ~1103–1118 on the right flank. A thin strip, empty by design; don't fill it.

## D. Text on the curve that overlaps or reads badly

- **D1. (1110–1170, 188 / 201 / 225) "b. 1177 Eli judges", "b. 1117 Ark captured; Eli dies", "b. 1117 Samuel judges".** "b." reads as *born*. Three different events all show "b. 1117", but their glyphs sit at different angles (1140 vs 1117). Cause: `yrOf` maps `^before ` to `b. `; build sets `o.yr`. Suggest spelling out "before 1117". Tags: FIX-TEXT / OWNER.
- **D2. (1110, 181) "(1180–1117) Hannah prays for a son … year not stated".** The parenthesised range and "year not stated" say the same thing twice. Same on "Jehovah rejects Saul" (1117–1077), "Jonathan and David's covenant" (1107–1077), "David's sin" and "Absalom" (1070–1037), and Sheba (1027–998). Five such labels in one turn read as noise. Tags: FIX-LABELS / OWNER.
- **D3. (1054–1063, 183–186) Five glyphs piled on top of each other** (Birth of Samuel, Hannah, Jehovah speaks, Eli, Jephthah): a ringed dot, a half dot and a hollow dot overlapping within 6 mm. Also 5 glyphs stacked at (1091, 269) and 3 at (1097, 234). Cause: the loop has a linear time scale (`core.js` A0.pos for loops) and the station glyph is drawn per item. Suggest drawing one glyph per cluster. Tag: FIX-STRUCT.
- **D4. (1035–1047, 225–233) "b. 1117 Samuel judges;" starts about 2 mm right of the row-2 heading "THE DIVIDED KINGDOM: JUDAH AND ISRAEL" (ends x ~1033, y 237).** "United kingdom of Israel" (y 237–243) sits on the same line as "DIVIDED KINGDOM". It reads as one sentence: "Divided kingdom … United kingdom". Move the heading left or the inner labels down. Tags: FIX-PANELS / FIX-LABELS.
- **D5. (1072–1077, 238–255) The inner-label leaders run through the book tags "Jg 1100", "Ru 1090" and "1Sa 1078".** In the 22:00 render the Ark leader cuts the "Jg 1100" box. The tags aren't in `rects` for the loop placer's leaders. Tag: FIX-LABELS.
- **D6. (1035, 284) The purple ▼ triangle covers the "E" of "Ec 1000"**, so it reads "Ec 1000" with an obscured "c". Tag: FIX-LABELS (book-tag placement), or FIX-STRUCT if the triangle comes from draw.js.
- **D7. Leaders cross the kings' bars.** "David's sin" and "Absalom" leaders (from 1091, 269 to 1106, 306) both cross the David bar at ~(1100, 300). The Sheba leader (1062, 299 to 1080, 336) crosses the Solomon bar. The "David king" leader crosses the Saul/David gap. The two David's-sin/Absalom leaders also nearly coincide. The loop placer draws its leader without the `segX`/`leads` checks the row placer uses. Tag: FIX-LABELS.
- **D8. (1038, 218) The "Jehovah rejects Saul" medallion's leader runs 60 mm diagonally** across the gold, black and red tracks to (1095, 225). This is the longest leader in the turn. The med slot sits on the far inner side because of the B1 alternation. Tag: FIX-LABELS.
- **D9. Wrapped two-line labels in narrow outside slots:** "1070 David king over / all Israel", "(1070–1037) David's sin / with Bath-sheba", "Absalom's rebellion / against David". They wrap because of the 41 mm width limit (B3), not by choice. Tag: FIX-LABELS.

## E. Bars on the curve (Saul, David, Solomon). `draw.js` `D.spans` loop branch, line 70

- **E-1. (1117–1122, 218–268) The Saul bar text "Saul · 40 yrs" runs bottom-to-top, rotated about 80°.** "David · 40 yrs" (1083–1112, 272–315) is also steeply rotated. Only "Solomon · 40 yrs" reads near-horizontally. Acceptable on a curve, but the dark Saul bar (C.g1) and the mid-grey David bar (C.g2) alternate by a global toggle (`A0.LOOPS[li].tick`), not by king. Fine, but note it. Tag: FIX-STRUCT.
- **E-2. Saul's bar text is placed at `startOffset=1`, the start of the bar (its low end, y ~265).** Most of the bar's upper part is empty dark grey. Centring the text (startOffset 50%, text-anchor middle) would read better. Tag: FIX-STRUCT.
- **E-3. (1037–1083, 316–332) The Solomon bar runs to 998 and ends at x ≈ 1037, under the row-2 start marker at (1034, 305)** and right next to the "PROPHETS" label (1020, 325). The bar's start and its "Solomon · 40 yrs" text sit at the low-left end, close to the medallion. Tags: FIX-STRUCT / FIX-LABELS.
- **E-4. No bar for David's 7½ years over Judah at Hebron (1077–1070, d1-0071).** The David bar shows 40 years starting at 1077, which is consistent. Optional, so OWNER.
- **E-5. No "Solomon's temple in service 1027–607" span (b12-0015).** It is a natural tie between Turn 1 and the end of Row 2 (607). OWNER / FIX-FILL.

## F. Quick wins, in order

1. Change the B1 alternation and the B2 tier sort in the loop placer (FIX-LABELS). This alone should recover the tier-1 temple and anointing labels into E1/E3/E4.
2. Widen the outside column (B3).
3. Merge co-located glyphs (D3).
4. Spell out "before" (D1).
