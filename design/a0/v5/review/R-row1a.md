# R-row1a: Row 1, 4026–1657 B.C.E. (x 180–565, y 95–260)

Reviewer: R-row1a. Shots: /tmp/sw-R-row1a-*.png (Z 5–6). Data checked against `exports/design/events.csv` and `a0v5/real.js` (D.ev), and the rendered DOM.

Most visible first.

1. **Tier-1 "Creation of Adam" (4026) has no label.** x 190, y 180. The big pill at the row start has leaders only to "Adam and Eve disobey" and "Edenic covenant". "Creation of Adam" (D.ev -4025.25, tier 1, `med:1`, slot `ev-adam-created`) does not appear anywhere in the DOM, and no photo or grey slot is drawn near it. It is the first event on the poster. Cause: the label placer in `draw2.js drawEvents` drops it, probably because three labels share x 190 and the `med` item is expected to be labelled by its image, which isn't drawn. Tag FIX-LABELS (FIX-IMAGES if the slot is meant to carry it).

2. **Tier-1 events in the patriarch section show as dots only.** x 455–541, y 180.
   - Birth of Esau and Jacob, 1858: big dot at x 486.7.
   - Death of Jacob, 1711: big dot at x 540.3. The green messianic arc also starts here (Ge 49:10), so the arc leaves from an unlabelled dot.
   - 400 years of affliction, 1913–1513: x 466.7.

   Tier-2 events with no label: Melchizedek (b. 1933), covenant of circumcision (1919), Ishmael and Hagar (1913), Abraham offers Isaac (1913–1881), Isaac marries Rebekah (1878, x 479.4), Jacob's blessing and Bethel vision (1781, x 514.8), Jacob marries Leah and Rachel (1774, x 517.3), Jacob wrestles the angel (c. 1761, x 522), Joseph made prime minister (1737, x 530.8), Joseph reveals himself (c. 1728).

   There is room for them (see item 4). Cause: `drawEvents`. The up-lanes (`laneTop` up, y ≈ 124–154) are covered by the lives bars, so everything goes into the 3 down-lanes, which are full. Tag FIX-LABELS.

3. **Green messianic arc runs through Row 1 labels.** The arc runs from (540.3, 180) to (190.6, 409). It crosses the "1750 Joseph sold as a slave by his brothers" text at about x 530, y 215, then the area under the 1919 label and the "RETURN AND REBUILDING" heading (x 470–500, y 230–240). Its source event (Death of Jacob) has no label. Cause: `draw2.js drawArcs`, a fixed cubic `C x,y+60 …`. Fix options: start the arc after the label block (a vertical drop to about y 240 first), or lower its opacity where it crosses text. Tag FIX-PANELS.

4. **Large empty spaces next to crowded label lanes.**
   - x 420–560, y 100–140 (about 140 × 40 mm) above the Abraham/Isaac/Jacob/Joseph bars is empty.
   - x 330–450, y 118–132 above the Eber/Peleg bars is mostly empty.
   - x 340–395, y 205–235 below the row (between the Babel and "Abraham crosses" labels) is empty.

   The missing labels from item 2 could go in the upper space with long leaders, or the lives block could move up. Tag FIX-LABELS (OWNER if the layout has to change).

5. **The Cain/Abel leader points at the wrong label.** x 198.6, y 186–215. The leader from the half-circle at 3896 drops to y ≈ 214.7 and ends on "a. 4026 Edenic covenant made; first prophecy". The real label, "b. 3896 Cain slays Abel" (y ≈ 226, x 200), has no leader reaching it. Cause: in `drawEvents` the leader length or end point uses the wrong lane, or the label was nudged after its leader was drawn. Tag FIX-LABELS.

6. **The 1919 leader seems to end on the 1943 label.** x 464.5, y 186–210. The line from the 1919 diamond/dot stops at the top of "1943 Abrahamic covenant validated". The "1919 Judgment of Sodom and Gomorrah" label below (y 226) looks unconnected, because the paper halo hides the rest of the leader behind the 1943 text. Fix: route the leader around the label, or draw the label in a lane the leader doesn't have to cross. Tag FIX-LABELS.

7. **The 1728 leader runs through the 1750 label.** x 534.1, y 204–232. The leader from the white ring at 1728 passes behind "1750 Joseph sold as a slave by his brothers", at the "J" of Joseph. Tag FIX-LABELS.

8. **Flood leaders bunch together.** x 300–301, y 188–228. Two to three leaders (Flood begins, the two "2369" items) run side by side, hugging the left edge of the "2369 Noah and family…" and "2369 Rainbow covenant…" text. They also cross the "//" scale-break mark at (299, 202). This makes it unclear which label is the Flood's. Tag FIX-LABELS.

9. **The dashed Flood line crosses lifespan labels.** x 300, y 106–159. It is drawn over the bars and cuts through the "Shem · 600 yrs" label (Shem bar at y 137.2, label at x 294–313). It also clips the end of the Lamech bar (ends at 299.67). Cause: `draw.js drawStructure`. Draw the line under the bars, or skip it inside the bar text. Tag FIX-STRUCT.

10. **Tier-1 lives are missing from the lives block.** y 108–157. Shelah (2333–1900), Reu (2239–2000), Serug (2207–1977), Nahor (2177–2029) and Ishmael (1932–1795) are tier-1 "Life of …" records in events.csv but are not drawn. The list jumps from Shem to Eber, Peleg and Abraham. Arpachshad (born 2368) and Terah (death c. 1943) are not there either. Cause: `D.lives` is hard-coded in `a0v5/data.js` instead of being generated from the data. Tag OWNER (decide the list); then FIX-FILL (generate it in `build_a0_sheet.py`).

11. **Lifespan bars mislead across the scale change.** y 108–157. The lengths match `X()` exactly; I checked all 17 bars. But because of the 15 yr/mm → 2.7 yr/mm break, Peleg (239 yrs, 87 mm) is longer than Adam (930 yrs, 62 mm), and Shem (600) is longer than Noah (950). The only warning is the small note "scale changes at the Flood" at (316, 116). Tag OWNER. Options: a stronger cue, such as a different bar tint after x 300, or "//" marks on every bar that crosses the Flood line.

12. **The "a."/"b." year prefixes are not in the legend.** Rows 1 at x 190–340: "a. 4026", "b. 3896", "a. 2269". Insight uses them for after/before, but the sheet's legend (x ≈ 1100, y ≈ 698) only explains "about (c.)". Readers will take "a." for "about". Tag FIX-MAP (legend), or OWNER.

13. **The year is repeated in the meta.** x ≈ 397–455, y 230. "1943 Abraham crosses the Euphrates" has meta "1943, Nisan 14 · Ge 12:4, 7". The year is printed twice; it should read "Nisan 14 · Ge 12:4, 7". Cause: `build_a0_sheet.py` puts the full date into `meta`. Tag FIX-FILL.

14. **The "//" break mark at x 559, y 157 touches the end of the Joseph bar** (bar ends at 560.0, y 154.6–157.1). Tag FIX-STRUCT.

15. **"AFTER THE FLOOD" heading meets the dashed Flood line.** x 300, y 100–106. The heading starts at x 301 and the dashed line starts at y 106, directly under its first letter, so the two read as one shape. Shift the heading by about 2 mm or start the line lower. Tag FIX-STRUCT (`drawCaptions` is FIX-PANELS).

## Verified OK

- All 17 lifespan durations equal death minus birth: Adam 930, Seth 912, Enosh 905, Kenan 910, Mahalalel 895, Jared 962, Enoch 365, Methuselah 969, Lamech 777, Noah 950, Shem 600, Eber 464, Peleg 239, Abraham 175, Isaac 180, Jacob 147, Joseph 110.
- Bar x-extents match `X(0,·)`.
- Year tags match the data: 2490, 2370, 2369 ×2, a. 2269, 1943 ×3, 1943–1513, 1919, 1750, 1728, 1728–1513, a. 4026 ×2, b. 3896.
- No clipped text in this area.
- Job's trial (c. 1613) falls after 1657, outside this area. Check it in the next reviewer's area.
