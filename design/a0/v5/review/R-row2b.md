# R-row2b: Row 2, 607 to 332 B.C.E. (x 185–600, y 225–380 mm)

Reviewer: R-row2b. Shots taken 21:58–22:02 at Z=5 to 7 (`/tmp/sw-row2b-*.png`), and the DOM was dumped twice (`/tmp/sw-row2b-dom.html` at 21:59, `/tmp/sw-row2b-dom2.html` at 22:02).

**The layout changed a lot between the two passes because fixers were editing files.** Each item below says which pass it comes from. Re-shoot before you act on an item.

Row 2 x-map (core.js `ROWS[1].map`): 607 → 590, 537 → 475, 455 → 348.5, 443 → 330, 332 → 190.

Row 2 drops far more labels than any other zone. At 22:00, `A0.stats` showed **R2 placed 38 of 122 labels and dropped 84**. The other zones dropped 21–37 each.

## Defects, most visible first

1. **Tier-1 events missing in the exile and return span (x 475–590).** Both passes are missing:
   - "Babylon falls to the Medes and Persians" (539, tier 1, has the image slot `ev-babylon-falls`). No image circle appears for it either.
   - "Jerusalem destroyed" (607, tier 1, image slot `ev-jerusalem-destroyed`).
   - "The 70 years of Judah's desolation".
   - "Appointed times of the nations begin".
   - "'Seven times' of the nations".

   "Cyrus issues decree freeing the Jews" (tier 1) was also missing at 21:59.

   Large free areas sit right next to them:
   - x 190–325, y 240–280;
   - x 360–440, y 356–372;
   - x 480–560, y 356–372.

   Likely cause: draw2.js `drawEvents` packer. The lanes are limited (`ROWS[1].U=4`, `D=4`) and each label is pinned near its own x, so the 539/537 and 607 clusters cannot spread sideways. Also check the drop priority order: tier-1 items lose to tier-2 items such as "Daniel's 70 weeks prophecy" and "Daniel's final vision". **FIX-LABELS**

2. **Labels flip in and out between renders.**
   - 21:59: "Zerubbabel completes the second temple", "Purim instituted", "Medo-Persia, fourth world power" and "Greece, fifth world power" were present. "Jews return", "Nehemiah commissioned" and "69 weeks" were absent.
   - 22:02: the reverse.

   Part of this is fixer edits. Once edits stop, also check that the result does not depend on `A0.fontsOK` (tw falls back to a character-count estimate before the font loads). **FIX-LABELS**

3. **The "334" year pill covers "Alexander destroys island Tyre 332 (July)"** at about x 190–196, y 343–346 (22:02 shot). The new event "Alexander wins at the Granicus" (334) has its pill on top of the Tyre label's meta text, and the Granicus label sits over the "Persian Empire falls" area. **FIX-LABELS**

4. **A magenta prophecy line runs through labels.** The Ezekiel → 332 line (draw2.js `drawArcs`, `src['-332']`) starts at the Ezekiel bar near x 567 and runs about 380 mm left at y ≈ 341–345, ending at x 190. On the way it:
   - passes through the word "Alexander destroys" (x ≈ 190–215, y 342);
   - runs along the cap line of "455–29 The 69 weeks…" at x 345–380, y 345;
   - ran through the "515" pill at x 441, y 346 (21:59).

   Its end dot (ex, RY+36) sits on the Tyre label. Fix: end the line at the prophet-bar level, or route it under the labels at y 340 or above and stop at the label. **FIX-PANELS**

5. **Two magenta lines nearly on top of each other at x 475–477.** The Isaiah → 539 and Jeremiah → 537 lines are 1.5 mm apart. They cross the "Daniel · 82 yrs" bar at y 335 and end in two dots at y ≈ 341. They read as one doubled line (21:58 shot, x 474–478, y 326–342). Merge them or offset them visibly. **FIX-PANELS**

6. **The fiery furnace image (about x 590–610, y 238–262) has its title text drawn on top of it.** "…the fie…rnace" sits over the grey IMAGE circle (22:02 shot). The label is placed over its own med circle. **FIX-LABELS** (or **FIX-IMAGES** if the overlay offset is the cause)

7. **Book tags are covered by the violet triangles and leader lines.**
   - "Da 536" at x 470, y 287: the 537 violet triangle and the "//" marks sit over the "5" of "536". The 537 pill leaders (two lines at x 473–477) cut through the tag.
   - "La 607" at x 586, y 287: the 607 triangle and leader cut through the "6".

   "Es 475" at x 392 had the Purim leader through its left edge (21:59).

   Cause: the book-tag row (y 287) is at the same y as the ruler-end triangles (draw2.js heading code, `[-1513,-997,-607,-537,…]` triangles at `RY-21`) and the leaders. Nudge the tags sideways, or stop the leaders above y 285. **FIX-STRUCT** (book tags) / **FIX-LABELS** (leaders)

8. **Two station capsules overlap at 539/537 (x 472–479, y 290–325).** The tall white 537 capsule and a second capsule plus a black dot at 539 overlap, forming a messy double outline (Z=7 shot 8, px 115–170). Merge them into one capsule or separate them by at least 2 mm. Cause: draw2.js station drawing (`offs.length>2||tier1` capsule rect). **FIX-LABELS**

9. **The exile hatch bar repeats the 70-years ruler directly under it.** "EXILE IN BABYLON · 70 yrs" (y ≈ 279–283, x 475–589) sits 7 mm above the violet "70 YEARS" ruler (y 290, x 475–590). Both are correct (607–537), but having two "70" spans stacked is redundant. The section heading "EXILE" at x 589, y 239 says it a third time. Also, the hatch bar's right end butts into the dark-grey Judah king bar at x 589–591 with no gap. **OWNER** (keep one), **FIX-STRUCT** for the gap

10. **The 70-weeks ruler has no start marker at 455.** The 607 and 537 start/end points get a violet triangle, but 455 (x 348.5) only gets a short tick. Add -455 to the triangle list in draw2.js (heading code near line 124). The ruler also has an unlabelled second major tick at 98 years (x ≈ 221.5), which reads like a meaningless milestone. Make it minor, or set the major interval to 49 only for the 7-week mark. Source: draw.js `ruler(-455,490,O.v2,7,49,…)`. **FIX-STRUCT**

11. **Green messianic-arc lines cross the whole row-2 band diagonally** (for example from x 185, y 380 to x 600, y 200). They pass through the "2Ch 460" and "Ezr 460" tags, the Purim/Esther stack and the "RETURN AND REBUILDING" heading.
   - Targets are assigned round-robin (`tx=tg[k++%tg.length]` in draw2.js `drawArcs`), so each arc lands on an arbitrary Jesus-zone item, not on its real fulfilment. That is a content problem as well as a visual one.
   - Fix: map each source to its fulfilment event, or drop the arcs from row 2.

   **FIX-PANELS / OWNER**

12. **Year qualifiers do not match the data for the Esther items.**
   - "Haman's extermination decree issued" shows "c. 484", but the data date is "484 B.C.E., Nisan 13" (exact).
   - "Esther appeals; Haman hanged" shows "c. 484", but the data date is "484 B.C.E. (12th year of Ahasuerus)".

   Both have g=1 in real.js. If the source has no "c.", the tag should be a plain "484". Cause: scripts/build_a0_sheet.py, where the g value comes from timeline.json. **FIX-FILL**

13. **The Esther stack is in reverse order** (x 392, y 247–266): "Esther appeals; Haman hanged" (top), then "Haman's decree" (Nisan 13), then "Purim". Chronologically the decree comes first. The sort key ties at 484. **FIX-LABELS**

14. **The 539 label group mixes events.** At 21:59, "539–331 Medo-Persia, fourth world power" sat on top of "Handwriting on the wall" (x 476, y 255–266), with no "Babylon falls" line between them. The headline event of the night is missing (see 1). **FIX-LABELS**

15. **Ezra (468) label: the year appears only in the pill.** "Ezra and priests / return to Jerusalem 468 (seventh year of Artaxerxes)" (x 368, y 262) has no gold year in its title line. Neighbouring labels such as "a. 484 Purim" and "c. 406 Rebuilding…" do have one. Pill labels and inline-year labels are mixed in the same row. Owner should choose one convention. **OWNER**

16. **The Malachi prophet bar has a "//" mark on it** (x 330–334, y 328–332): the "Ne 443" break marks sit over the Malachi square. The Malachi bar is also only about 3 mm wide, while its label says "4 yrs". **FIX-STRUCT**

17. **The "Haggai · 2 yrs" and "Zechariah · 2 yrs" bars are tiny squares** at x 448–451, y 328–336. They are stacked, so they read as bullets rather than time spans. Minor; consider a minimum width of 3 mm. **FIX-STRUCT**

18. **A dashed open circle (uncertain date, about 538/537) at x ≈ 497, y 305 has a leader running down to y 315 and on with no label at the end** (Z=7 shot 8, px 295). This looks like an orphan leader from a dropped label. **FIX-LABELS**

19. **"Jews return to Jerusalem" (tier 1, x 472, y 250–256) is cramped against the end of "Daniel's final vision"'s meta line** ("…third year of Cyrus) · Da 10:1" ends at x ≈ 470). The baselines are offset by about 2 mm, so the two read as one jumbled block (22:02 shot 13). **FIX-LABELS**

20. **Free space** (for FIX-LABELS / FIX-FILL to use for the dropped tier-1 items):
    - above the band, x 190–325, y 238–280 (about 135 × 40 mm);
    - below the band, x 190–320, y 328–338;
    - below the band, x 360–435 and x 480–560, y 356–372.

## Checked and OK

- The 70 YEARS ruler starts at 607 (x 590) and ends at 537 (x 475). The ticks are every 10 years.
- The 7 WKS tag sits at x 283.3, which is 406 B.C.E. (455 − 49).
- The exile hatch bar runs 607–537, which matches the data.
- "c. 406 Rebuilding of Jerusalem completed" is sourced (b4-0078, a0_extra.json).
- Book tags (Ne 443, Mal 443, Es 475, Hag 520, Zec 518, Da 536, Eze 591, La 607) are in sensible positions.
