# R-turn2: Turn 2 (332–2 B.C.E.) and the left gutter

Area: x 0–240, y 260–470 mm. Shots: `/tmp/sw-turn2-1.png` (21:59), `/tmp/sw-turn2-5.png` (22:00, Z5), `/tmp/sw-turn2-3.png` and `-4.png` (Z8/Z6 zooms), `/tmp/sw-turn2-6.png` (gutter).
The sheet changed between 21:59 and 22:00 because fixers were editing. The labels on the curve differ between the two shots (see item 1).

Geometry checked in code: the loop is `A0.LOOPS[1] = {r:1, a:-332, b:-2}`, with its centre at about (190, 367.5). The bed is 42 mm wide. The inner hole has a radius of about 41.5 mm, so it covers x ≈ 148–190 and y ≈ 326–409.
Data in `real.js`: 23 `D.ev` records fall in −332..−2. Only 8 have labels on the sheet, so the other ~15 are bare dots. There are no `D.spans` records in this range.

## Defects, most visible first

1. **Tier-1 events on the curve have no label: "Rome, sixth world power" (−30, b12-0040) and "Pompey takes Jerusalem; Rome rules" (−63, b4-0122).** Their dots sit on the lower arc at about (155, 420) and (173–181, 427–429) with no label. At 22:00, two tier-3 events got labels instead: "198 Antiochus III takes Jerusalem" at (158, 377) and "190 Rome defeats Antiochus III" at (167, 389). Tier-2 "168 Antiochus IV desecrates the temple" and "c. 18 Herod begins rebuilding the temple" also lost their labels in that render; both were present at 21:59.
   Cause: `draw2.js` `drawEvents`, the loop pass `items.filter(it=>it.loop===li).sort((a,b)=>(b.o.med?1:0)-(a.o.med?1:0)||a.t-b.t)`. It sorts by time and ignores tier, so early tier-3 events take the space first.
   Fix: sort by `med`, then `tier`, then `t`. **FIX-LABELS**

2. **The loop label search leaves the top and bottom of the hole empty.** Labels must satisfy `dy<=36` from cy ≈ 367.5, so only y ≈ 331–403 is usable. Two free bands go unused:
   - x 150–190, y 326–333, above "332 Alexander destroys";
   - x 140–190, y 396–409, below "165 Temple rededicated".
   Each band could hold 2–3 short labels, so the cap (and the `k<14` tries) can loosen to about `dy<=40`. Labels are also left-anchored at `xl=XL-sqrt(37²-dy²)+1` and run right past x 190 into the gap between Row 2 and Row 3. They could use x 190–240, y 330–370 more: that area is empty apart from the magenta arc. **FIX-LABELS**

3. **The magenta Ezekiel→332 fulfilment arc lands on a label.** The arc drops vertically at x ≈ 190 from y 326 to y 341. It then runs right, and its dot strikes through "Alexander **de**stroys" at about (190, 341).
   Cause: in `draw2.js` `drawArcs`, `src['-332']`, the endpoint is `ex=X(1,-332), ey=RY[1]+21`. That is the Row 2 end at XL, not the event's real station on the curve. −331.5 is inside the loop, so it should end at `A0.pos(-331.5,0)`, about (189, 305) at the top of the curve, or the arc should stop short of the label. **FIX-PANELS**

4. **The green "messianic prophecy" arcs cross the labels in the gap between Row 2 and Row 3.**
   - One arc runs from about (176, 395) up to the right through (215, 375).
   - It crosses the "JESUS' MINISTRY, BY PASSOVER YEAR" caption at about (220, 370), and in the 21:59 render it ran through the "c. 2 Jesus born" medallion (x 230–250, y 378–396).
   - The arcs come from `drawArcs` (`C.green`, opacity 0.45). They are drawn above or near the label layers.
   Fix: draw the arcs under the 'bed' layer, or route them clear of the captions. **FIX-PANELS**

5. **The "c. 2 Gabriel foretells Jesus' birth" label at (191–232, 403–411) has three collisions:**
   - (a) The violet Da 9 triangle (the `drawCaptions` violet marker at 29.75 C.E.) sits on "Lu 1:26–56" at about (222, 410).
   - (b) The second line "Jesus' birth" sits on the top edge of the Row 3 grey bed (y ≈ 409).
   - (c) A thin grey vertical leader at x ≈ 190.6, running from y 384 to y 430, goes through the "c." and the "J". This is the leader of the "c. 2 Jesus born" medallion or of the 29–36 label.

   **FIX-LABELS** for the box and leader avoidance. The marker is in **FIX-PANELS** `drawCaptions`.

6. **The four top-of-curve leaders converge and overlap.** 332, 331, 331–30 and the station near (186–190, 305–307) are less than 1 year apart, so their leaders fan out from almost the same point. The leaders for 332 and 331–30 run nearly parallel from (188, 306) to (157, 365), about 0.5 mm apart, so they read as one thick grey line.
   Fix: offset the leader origins along the track, or use an elbow leader. `draw2.js` `drawEvents` loop pass, `s.line(it.x,it.y,...)`. **FIX-LABELS**

7. **The leaders for "168" and "165" start from almost the same point.** Their dots at about (127, 367) and (127, 369) overlap on the black track. At Z5 they look like one fat dot.
   Fix: use a slightly larger station gap, or a single double-ring station. **FIX-LABELS**

8. **About 15 unlabelled station dots on the curve.** On the left arc at x 128–131, y 345–375 there are 323, 305, 301, 250 and 150. On the lower arc at x 155–181, y 419–429 there are 63, 37, 31, 30, 27 and c. 18.
   `station(s,it)` is drawn before the placement check, so dropped items still leave a dot. Either the label is found or the dot reads as noise.
   Option: draw only tier ≤2 stations when the label is dropped. **FIX-LABELS / OWNER**

9. **No world-power names on the curve.** The red world-power line changes metal from silver to copper to iron at the red ticks: −331 at about (189, 309) and −30 at about (175, 424).
   - "GREECE" and "ROME" never appear on the track. `A0.POW` names are unused in `draw.js` `drawLines`.
   - Only the "331–30 Greece, fifth world power" event label names Greece.
   - Rome's label is dropped (item 1), so the whole Rome start on the curve has no name.
   Suggest small along-path text, "GREECE 331" and "ROME 30", at the two red ticks. Turn 2 is the only place where two powers change on a curve. **FIX-STRUCT**

10. **The outer span band on the loop is unused.** The loop span code in `draw.js` (`D.spans` → loop branch, offset −25.5) is ready, but no span in −332..−2 reaches `real.js`. The beige outer band at x 107–118 around the whole arc is empty. Candidates from `data/merged/timeline.json`, all real records:
    - b12-0038 "Reign of Herod the Great over Judea", c. 39–1 B.C.E. (tier 2);
    - b12-0039 "Reign of Augustus (Octavian)", 31 B.C.E.–14 C.E. (tier 2);
    - b12-0041 "Herod's rebuilding of the temple", 18/17 B.C.E.–c. 64 C.E. (tier 3);
    - Septuagint begun c. 280 → completed c. 150 (b4-0098 / b4-0116, both already events).

    **FIX-FILL**

11. **Period events in timeline.json that are not in `real.js` at all**, by tier:
    - Tier 2: b12-0038 Herod's reign; b12-0039 Augustus' reign.
    - Tier 3: b4-0086 Greece rules Judea (332); b4-0088 Alexander's conquest complete (328); b4-0092 Seleucus conquers Babylon (312); b4-0110 Onias deposed (175); b4-0114 death of Antiochus IV (163); b4-0118 Simon Maccabaeus, free Jerusalem (c. 142); b4-0121 Pompey makes Syria a province (64); b4-0125 Herod governor of Galilee (c. 47); b4-0127 Julius Caesar assassinated (44).
    - Tier 4: b4-0128 Herod made king by the Senate (c. 39).

    The Maccabees are thin. Only 168 and 165 are there, and Simon (c. 142) and Antiochus IV's death (163) are missing. Space is the limit (item 2), so add only tier 2 unless the owner wants the Maccabean thread. **FIX-FILL / OWNER**

12. **No "between the Testaments" cue on the curve.** The era caption "BETWEEN THE TESTAMENTS" is placed at −443 on Row 2 (`data.js` captions). The 332–2 curve itself carries no era name or bed tint change, and the bed colour comes from `eraOf(ROWS[1].t1)`.
    A small along-path caption on the outer band could fill item 10's empty band if no spans are added. **OWNER**

13. **The "c. 280 Greek Septuagint translation begun" label sits too close to the "BIRTH" Row 3 caption.** Its second line ends at y ≈ 367 and x 188, while "BIRTH" sits at x 191–205, y 366–371. They do not overlap, but they read as one line ("translation begun BIRTH").
    Fix: add +1 mm of gap, or register the caption rect earlier (the caption rects are pushed in `drawEvents`, so check the `cap` box height of 3.2). **FIX-LABELS**

14. **The "c. 280" label has the scripture "—".** b4-0098 has no scripture, which is fine. But "c. 150 Septuagint completed" (scripture "—", tier 3) is dropped, so the "begun" label has nothing to pair with. Consider the span in item 10. **FIX-FILL**

15. **The "500 YRS" violet chip at about (121–131, 407) sits across the outer purple ruler line and its ticks.** At 21:59 the "5" was hidden ("00 YRS"). It is readable at 22:00, but the tick at x ≈ 122 still crosses the chip.
    Fix: give the chip a paper fill or halo. **FIX-STRUCT** (`draw.js` ruler labels).

16. **The leopard (Da 7:6) and goat (Da 8:21) symbols are on the red line.** The leopard is at about (172, 311) and the goat at about (148, 325). They are fine, but the goat's label "Da 8:21" at (148, 330) touches the blue lines. This is minor. **FIX-STRUCT**

## Left gutter (x 0–110, y 260–470)

17. **The "1914 · the Kingdom" collage photo shows baked-in pink text "1914 C.E." at its top-left edge**, at about (79–88, 397), cut off by the mask. The text is part of the image, so choose a different crop or focus. **FIX-IMAGES** (`a0_sheet.json` focus / image_choice)

18. **The "Jesus dies" collage photo is cropped to a blurred shoulder or cloth** at about (33–57, 375–397), and nothing in it reads as Jesus. Adjust the focus. **FIX-IMAGES**

19. **The right column of the collage nearly touches the curve.** The Abraham photo (x 79–103, y 325–350) comes within about 4 mm of the beige loop bed (x ≈ 107), and the outer violet ruler with its ticks is at x 110–113. Shift the collage about 5 mm left, since there is space to x 25. **FIX-PANELS (OWNER)**

20. **The dashed light-blue vertical line at x ≈ 20, running the full height, is unexplained.** Is it a trim or fold guide? If it is a print guide, it should be off the final sheet or in the bleed. The strip x 0–20 is otherwise empty. **OWNER**

## Notes for fixers
- Turn 2's free space is mainly the hole (x 148–190, y 326–409) and the gap right of it (x 190–240, y 326–365). Outside the loop is the collage, so labels cannot go outside on the left as they do on turns 1 and 3.
- Item 1 is the quickest fix with the biggest effect: a one-line sort change in the loop pass.
