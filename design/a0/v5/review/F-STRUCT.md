# F-STRUCT: fixes in a0v5/draw.js (core.js untouched)

All checked with `tools/shot.sh`; the rendered DOM has no `NaN` left.

## Fixed

1. **Exile span y=NaN.** The span `[-607,-537,'Exile in Babylon',…,'dn2']` had no `bandY[1].dn2`. Now band `dn2` draws the hatched exile bar on the Judah lane with the label "EXILE IN BABYLON · 70 yrs". The old hard-coded hatch bar and its "EXILE · 70 yrs" text are gone. A 0.5 mm gap is kept before Zedekiah.
2. **King bars match reigns_check.csv** (R-row2a 7). Each bar now runs from accession to the successor's accession (`X(-b)`), not `-b-1`. Bars are inset 0.25 mm on each side, so there is a 0.5 mm gap. Reigns where `a===b` get at least 0.8 mm, and a bar never starts before the previous one ends (Jehoahaz and Jehoiakim, both 628).
3. **King names** (R-row2a 8). The label tries "Name · N yrs", then "Name", then the longest prefix that fits with "." (Zedeki., Jehoia., Menah., Zechari.). Very small bars stay unlabelled.
4. **JUDAH and ISRAEL headings** (R-row2a 10, R-human 24). Each heading now sits on its own bar's baseline, just inside the turn at x 1036.
5. **Paul's tours and Rome bars** (R-row3 1). The bars no longer carry text. Labels are packed on one line just under the bars (y ≈ 460), each with a thin dog-leg leader.
6. **Wilderness bar text** (R-row1b 4). It now ends before stop 9, so stops 9 and 10 no longer cover "→ M1".
7. **Exodus stops** (R-row1b 3). E1–E7 now run from −1512.75 (Exodus) to −1512.58 (Sinai), not before the Exodus. The minimum gap is 3.9 mm, so the circles no longer touch.
8. **Lifespans** (R-row1a 14). Pitch is 2.8 mm and the block is raised 1.5 mm, so the Joseph bar clears the "//" break mark.
9. **Flood line** (R-row1a 9, 15). It is now drawn in the bed layer, under the bars, so it no longer cuts "Shem · 600 yrs". It also starts 2 mm lower (y 108), below "AFTER THE FLOOD".
10. **Book tabs** (R-row3 4). The 66-book chips are packed into clusters centred on their true years, not pushed only to the right. In row 3 they are clamped so they never enter the Nisan day strip (x ≥ 640.5). Row 3's chips now end at about x 877 (before: 900). No two tabs overlap (checked in the DOM).
11. **Relay bars, row 4** (R-row4 2, R-overview 19). An out-label that doesn't fit drops to 2.2 mm inside the bar, so "Enjoy Life Forever! · →" no longer prints over "Bible Teach". Fade bars indent their text by 2 mm when there is room ("Ban in Russia", "HQ Warwick" clear the "//").
12. **Loop span labels** (R-turn1 E-2). Text is centred on each curved band (`startOffset 50%`, anchor middle). The band colour toggle is reset on each draw, so the colours don't flip on a redraw.
13. **PASSOVER 33 / NISAN** (R-jesus 19, 20). A dashed line now marks Nisan 14, stopping above the "14" day number. There is no text label, because there is no room beside the capsule. "NISAN" moved to the left of "8" on the number baseline, off the violet line.
14. **2,520 · SEVEN TIMES tag** (R-row4 1). It moved right of the 1914 capsule, which was covering it.
15. **1,290 days** (R-row4 10, R-facts 4). It now starts at 1919.0, January 1919 (b12-0075).
16. **World powers** (R-facts 1, 2). EGYPT now starts at −1600 ("a. 1600", b12-0006), and ASSYRIA ends at −632 (b12-0019), so the red line has a gap from 632 to 607. The −740 hand-off is unchanged (OWNER, R-facts 3).
17. **GREECE 331 and ROME 30 on turn 2** (R-turn2 9). They are drawn as small red along-path text beside the red line. The text is flipped where the path runs right to left, so it never reads upside down.
18. **70-weeks ruler** (R-row2b 10). The unlabelled major tick at 98 years is gone; there are major ticks only at 0 and 490.
19. **Scale-break "//" marks** (R-row1b 7, R-row3 16, R-row2b 16). On the side away from the book strip (rows 1–3), the marks moved inside the bed (±19.6 mm). They no longer hit lane-0 labels or the prophet bars.
20. **Row tags** (R-overview 1, R-human 11 and 37). Each row start now has a small grey tag built from `ROWS[i].name`, with a direction arrow. For example, "ROW 2 · 997–332 B.C.E. ←" at x 1033, y 296.

## Left (not mine, or needs a decision)

- **FIX-PANELS:** the "1 lakh · ≈1940" growth badge sits on the "2,300 D" ruler tag (x 744, y 538). The stats value labels sit on the lines at the row 4 left edge.
- **FIX-LABELS:**
  - Leaders crossing king-bar text (Hezekiah, Asa).
  - The purple ▼ on "Ec 1000".
  - The "David · 40 yrs" loop band touches the Absalom label (x 1087, y 301).
- **FIX-TEXT:** the dur strings "→ M1" print as "2nd tour · 3 yrs · → M1". "Bible Teach" is the source title.
- **OWNER:**
  - Exile shown twice: the hatch bar and the 70 YEARS ruler.
  - The −740 Egypt/Assyria tick.
  - Zechariah and Hoshea widths that follow A6's "began in some sense" dates.
  - Moving the prophet bars up (R-row2a 3).
  - Direction chevrons and turn arrows (R-overview 7).
  - A B.C.E./C.E. divider on turn 2.
  - Stats line colours.
- **Not done:**
  - Adam bar and caption vs the gold line at x 188 (R-opening 4).
  - Minimum 3 mm prophet bars (this would misstate 2-year spans).
  - Year ticks along the arcs (R-overview 8).
