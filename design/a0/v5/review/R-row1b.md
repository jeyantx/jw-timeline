# R-row1b: Row 1, 1657–1200 B.C.E. (x 555–1040, y 95–260)

Shots: /tmp/sw-row1b-0..4.png (Z=5), zooms /tmp/sw-row1b-z1..z6.png. DOM dump: /tmp/sw-row1b-dom.html.
Ten plagues (x≈697, y≈220) and Job's trial (x≈597, y≈211) are both visible. All year tags I checked match `real.js`/timeline data: Job c. 1613, Egypt a. 1600, Baby Moses 1593, Midian 1553, thornbush c. 1514, plagues b. 1513, Korah (1512–1473), Meribah c. 1474, copper serpent (1474–1473), conquest 1473–1467, tribes 1467, judges c. 1450–c. 1120.

Defects, most visible first:

1. **Empty judges stretch.** About x 815–1035 is empty both above the band (y 95–158) and below it (y 205–235), roughly 220 × 60 mm on each side. Only the dashed "Period of the Judges ~330 yrs*" bar and its label are there. There are no records between 1450 and 1200 (Othniel, Ehud, Deborah/Barak, Gideon, Samson, Ruth). The row scale says "judges in order only", but no data feeds it. → **FIX-FILL** (a0_extra.json, jw.org-sourced only) / **OWNER**.

2. **Seven events near 1474–1467 are dropped** (not in the DOM): Joshua defeats the Amalekites (1513), Amorite kingdoms conquered (c. 1474), Balaam (c. 1473), **Covenant with Israel at Moab** (1473, a covenant item flagged `c`), Joshua commissioned (1473), Defeat at Ai (1473) and Sun stands still (1473–1467). The x≈795 knot is too crowded, yet item 1 has free space just to the right. The label search in `drawEvents` (non-FREE row path, shift `sh` loop and lane packer) does not reach x 815+. Either allow larger right shifts, or let the 1473 cluster take lanes over the judges gap. → **FIX-LABELS**.

3. **Exodus stops 1–4 are drawn before the Exodus.** Stops are hard-coded at t = −1512.9, −1512.87, −1512.82 and −1512.78 (`draw.js` line ~79). That puts them left of the Passover/Exodus dot (−1512.75, x≈697), so the route starts before Israel leaves Egypt. Stops 1–7 are also pushed apart only by the 3.6 mm minimum, so the 1.7 mm-radius circles nearly touch (gap 0.2 mm) at x≈687–705, y≈204.7. Fix: start E1 at or after −1512.75, and spread 1–7 between there and Sinai (−1512.58). → **FIX-STRUCT** (`draw.js`, exodus stops).

4. **The wilderness bar text is covered by stops 9 and 10.** At x≈790–797, y≈204.7, the text "40 yrs · E1–10 → M1" is end-anchored at X(−1473)−0.8. Circles 9 (−1474) and 10 (−1473.4) sit on top of it, so it reads "→ M". The "//" break mark at x≈795 also hits circle 10. Fix: end the text left of stop 9, or shorten it. → **FIX-STRUCT** (`draw.js` line 76).

5. **Two leaders cross stop circle 4.** The Ten plagues and Passover / 40-years leaders (x≈697–699) run straight through circle 4 (x≈698, y≈204.7), so the stop number cannot be read. → **FIX-STRUCT** (stop positions) / **FIX-LABELS**.

6. **Near-duplicate Egypt labels.** At x≈608, y≈146–157 two labels are stacked: "a. 1600 Egypt attains prominence Ex 1:8" and "a. 1600 Egypt, first world power Re 17:10". They share the same year and dot (x≈611). An earlier render even showed both titled "Egypt, first world power". Keep one. → **OWNER** / **FIX-TEXT** (short_titles) / **FIX-FILL**.

7. **Scale-break "//" marks hit the lowest-lane labels:**
   - x≈680, y≈157: hits the "c. 1514 Moses at the burning thornbush" label start;
   - x≈748, y≈157: hits the "1512" of "Tabernacle set up";
   - x≈795, y≈157: touches "up,".

   Fix: reserve the break-mark x positions in lane 0u0, or move the marks into the band. → **FIX-STRUCT** (marks) / **FIX-LABELS** (reserve rects).

8. **Purple triangle marker on the burning-bush label.** At x≈680, y≈160 the marker sits on the "c." of "c. 1514". Its second line, "burning thornbush Ex 3:2", runs into the band top (y≈159–161). → **FIX-LABELS**.

9. **The Meribah / copper-serpent leader crosses the Tabernacle label.** The leader at x≈794.3 runs up through "up" of "1512 Tabernacle set up" (x≈790–795, y≈154–157). → **FIX-LABELS**.

10. **Passover leaders run behind the burning-bush label.** The leaders at x≈698.8 and 700 go from the band up to the Passover label (y≈146). They pass under "Moses at the burning thornbush" (x 690–722, y 154–160), where the halo cuts them, and they stick out above the Passover label top. A reader cannot tell which label they serve. → **FIX-LABELS**.

11. **Two near-parallel leaders, 1 mm apart, below the band.** Lines at x≈696.6 and 697.5 go down to Ten plagues (y≈218) and 40 years (y≈224). The 40-years leader grazes the "b." of "b. 1513" and runs past the Ten plagues label. Fix: offset the 40-years label, or join the leaders into a bracket. → **FIX-LABELS**.

12. **Red Sea deliverance has no visible leader.** The photo (x≈678–698, y≈125–145) and label (x≈627–676, y≈133–138) are not visibly linked to the Red Sea dot (x≈699, −1512.73). The label also sits over the 1600s part of the axis, which misleads. → **FIX-LABELS** (med placement).

13. **Law covenant meta line runs into the 1512 column.** "1513, Sivan (3rd month) · Ex 19:1" runs to x≈766 (y≈137). That is directly above "1512 Israel sentenced" (x 752+) and under "(1512–1473) Korah's rebellion", so the three blocks read as one mass. The leader at x≈750.7 also grazes the "1" of "1512 Tabernacle". → **FIX-LABELS**.

14. **Leader passes behind the "Nu 1473" tag.** At x≈795, y≈200 the stop-9 / diamond leader runs behind the tag. The tags "Nu 1473 / De 1473 / Job 1473 / Jos 1450" are packed edge to edge (x 789–837). Thin slanted lines then run from circle 9 to the right (x 796→830, y≈201–203) under the tags, and it is unclear what they connect to. → **FIX-LABELS** / **FIX-STRUCT**.

15. **Overlapping dots at x≈794–795.** The Jordan crossing, the conquest and Jericho (and Meribah) dots sit on top of each other, so you see a doubled black blob (y 180). This is acceptable as a cluster, but a small cluster mark would read better. → **FIX-LABELS** (low priority).

16. **Turn spill-over (for the turn reviewer).** Jephthah defeats Ammon (c. 1173) and Birth of Samuel (c. 1180) are also absent from the DOM, though both are in the data. They belong to the turn (1200–997), which falls in the same gap as item 1. → **FIX-LABELS** / turn owner.
