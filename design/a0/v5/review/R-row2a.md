# R-row2a: Row 2, 997–607 B.C.E. (x 585–1040, y 240–380)

Shots: /tmp/sw-row2a-1.png (overview, z3), /tmp/sw-row2a-2.png (x 800–1040), /tmp/sw-row2a-3.png (x 585–805).
Measured live in the page (A0.items, A0._rects).

**Headline:** 997–607 has 63 titled events. Only **11 label boxes** were placed across 455 mm (7 above, 4 below), holding about 19 events. Every box below the line sits in the first lane (y 346.9). Nothing is placed deeper.

Row 2 uses `placeFree` (draw2.js, `FREE=new Set([1])`). Its zones are:
- **zU** = y 241.4–266.6 (25.2 mm)
- **zD** = y 346.9–372.1 (25.2 mm)

## A. Why labels drop (most impact first)

1. **Whole clusters can't fit a zone and get dropped as a block.** (FIX-LABELS, `placeFree`)
   - `placeFree` groups events less than 3 mm apart into clusters of up to 4. It stacks them as one box of height `bh` (P = 7.4 each, or 22.2 if `med`).
   - If `bh` is more than 25.2, then `span<0`, so there are **no candidates** and every event in the cluster drops.
   - In this area, 11 clusters can never fit:

     | x | Height (mm) | Cluster |
     |---|---|---|
     | 1035 | 44.4 | Kingdom divided (T1, med), Southern kingdom (T1), Northern kingdom (T1), golden calves |
     | 969 | 44.4 | Elijah's test (T1, med) + 3 Elijah |
     | 943 | 29.6 | 4 Elisha events |
     | 785 | 29.6 | Isaiah "Send me" (med), Isaiah names Cyrus |
     | 748 | 29.6 | Hezekiah's Passover (med), copper serpent |
     | 732 | 29.6 | Sennacherib invades (T1), tunnel, life extended, envoys |
     | 636 | 29.6 | Jeremiah commissioned (med), Josiah's campaign |
     | 630 | 37.0 | Book of the Law found (T1, med), Passover, Bethel altar |
     | 601 | 29.6 | Daniel/Ezekiel taken captive (T1), Jehoiachin, delicacies |
     | 589 | 44.4 | two 4-clusters at 588–589 (edge of area) |

   - That is about 35 of the roughly 44 drops, including 6 tier-1 items.
   - **Fix:**
     - (a) Cap a cluster at `floor(25.2/P)` = 3 rows, and start a new cluster after that.
     - (b) If a cluster still can't fit, split it between zU and zD.
     - (c) Port the med→plain fallback from the non-FREE path (`if(!got&&med&&rt!==1)…`) into `placeFree`, so a med image (22.2 mm) can fall back to 7.4 mm.

2. **The leader rules allow only one layer per zone.** (FIX-LABELS, `placeFree`)
   - A leader must stay 25 mm or less, must keep `ddy ≥ 0.58·ddx`, and must not cross any `lab` rect.
   - In the lane nearest the line, `ddy≈0`, so the box must straddle the station x (ddx ≤ 2).
   - Lanes further out can only be reached through gaps between first-lane boxes. Leaders crossing labels are rejected, and the boxes are 41–72 mm wide.
   - Result: deeper slots stay empty. At y 354–372 there is nothing placed below the line anywhere in 585–1040.
   - **Fix:** let a leader pass between two stacked boxes. Or use dog-leg leaders (vertical, then horizontal) like the non-FREE path, which uses `sh` shifts.

3. **About 40 mm of beige band next to the metro lines is unusable for labels.**
   - Above the bundle, y ≈ 283.5–297 (13 mm) is empty except the small book tags (Pr 717, Isa 732…).
   - Below it, y ≈ 312–327 (15 mm) is empty everywhere.
   - zU and zD start only beyond the king bars and the prophet bars (`su:34`, `sd:37.5` in core.js `ROWS[1]`).
   - **Fix:** move the prophet bars up into 312–327 (`draw.js` `y=RY[1]+22.5+k*4.8`, change to about `RY[1]+8`). Lower `sd` from 37.5 to about 24, so zD gains about 13 mm, almost two more lanes. Or extend `zD` in `placeFree` to start under the prophet bars only where prophet lanes are empty (see 4). (FIX-STRUCT `draw.js`, `core.js` ROWS)

4. **The prophet lanes are empty from 997 to 846** (x 860–1035, y 327–342, about 175×15 mm).
   - The first prophet bar is Jonah (846). Elijah and Elisha have no bars, though 9 events in this era carry `lane:'prophet'`.
   - The `rects`/`pk` don't reserve this space, but zD starts at 346.9, so labels can't use it.
   - Either add Elijah/Elisha bars (OWNER: only if jw.org gives ministry years; don't invent them), or let zD rise into the empty prophet lanes at x > 860. (OWNER / FIX-STRUCT)

5. **Lane preference is upside down compared with the bars.** (FIX-LABELS, `placeFree`, `prefUp`)
   - `prefUp = ln==='israel'||ln==='prophet'`, so prophet events are pushed **above** the line. The prophet bars are **below** it.
   - Judah events go **below**, but the Judah bars are **above**.
   - Suggest: up for `israel` and `judah` (next to the king bars), down for `prophet` and `nations` (next to the prophet bars).
   - This also balances the counts: 26 judah+israel against 23 prophet+nations.

6. **The meta line makes boxes too wide.** (FIX-LABELS `labW` / FIX-TEXT)
   - Labels show the range in gold and then repeat "year not stated":
     - "(716–661) Manasseh fills the temple with idols *year not stated* · 2Ki 21:1-16" at x 653–715, y 259
     - "(937–913) Jehovah saves Jehoshaphat *year not stated*" at x 908–963, y 354
     - "(829–804) Amos sent… *year not stated*" at x 841–893, y 347
     - "(609–607) Jeremiah in the miry cistern *year not stated*" at x 588, y 262
   - "year not stated" reads as a contradiction next to a printed range, and it adds about 18 mm to each box.
   - Drop the meta "year not stated" when `yrOf` already gives a range. Box widths would fall from 52–62 mm to about 40 mm.

## B. King bars (draw.js `drawStructure`, `kb`): FIX-STRUCT

7. **Every reign is drawn 1 year short, so 1–2-year reigns vanish.**
   - The code is `x1=X(1,-b-(a===b?0.5:1))`. -b-1 is one year *before* the successor's accession.
   - These come out at the 0.6 mm minimum, which is invisible:
     - Ahaziah of Judah 906–905 (w 0.0 → 0.6)
     - Nadab 976–975
     - Elah 952–951
     - Jehoiachin 618–617 (3 mo, 10 d)
   - For `a===b` (Jehoahaz 628, Zimri 951, Shallum 791), -b-0.5 points *before* the start. Those come out at 0.6 mm too.
   - Every other bar loses about 1.2 mm, which is the white gap you see between bars.
   - **Fix:** use `x1=X(1,-b)` and inset each bar by 0.3 mm for a gap. For `a===b`, use `X(1,-a+0.25)`, or a fixed 1 mm tick.
   - Dates checked against `data/research/reigns_check.csv`: all 20 Judah and 19 Israel start/end years match A6. Omri is shown merged (951–940, 12 yrs), which is consistent with the Insight chart.

8. **24 of 39 king bars have no name.**
   - `bar()` drops the text when `"Name · N yrs"` doesn't fit, and `o.out` isn't set.
   - Unnamed:
     - Judah: Rehoboam (18.3 mm wide, so "Rehoboam" alone fits), Jotham (16 mm), Jehoram, Athaliah, Jehoiakim, Zedekiah, Amon, Abijah, Ahaziah, Jehoahaz, Jehoiachin
     - Israel: Omri (11.4), Jehoram (12.6), Jehoahaz (18.3), Jehoash (16.0), Menahem (11.4), Zechariah, Nadab, Elah, Zimri, Ahaziah, Shallum, Pekahiah
   - The dark unlabelled blocks at x 880–1035, y 273–283 (shot 2) are unreadable.
   - **Fix:** fall back from "Name · N yrs" to "Name" to a short name (e.g. "Jehoi."). For bars under 3 mm, put a small name tag outside, or list them in a strip.

9. **Israel's Zechariah: a "6 mo" reign is drawn as a 12.6 mm (12-year) bar** (803–791, x 795–808, y 273). Hoshea "9 yrs" is drawn 19.4 mm wide (758–740).
   - Both follow A6's "began in some sense" dates. But the width contradicts the printed length.
   - Owner decision: use hatched or dashed for the uncertain part, or a solid part only for the stated length. (OWNER)

10. **The lane headings ISRAEL and JUDAH are stacked above both bars.**
    - They sit at x 1034, y 267 and y 271. "JUDAH" sits directly over the *Israel* bar (y 273), and the Judah bar is at 278.
    - Put each heading on the same baseline as its bar, e.g. at the right end inside the turn margin (x > 1035), or left of the first bar. (FIX-STRUCT `draw.js` line 63)

11. **Dead code:** `false&&[[true,0,'ISRAEL'],…]` lane chips in `drawEvents` (draw2.js line 51). Remove it, or use it in place of item 10. (FIX-LABELS)

## C. Overlaps and clipping

12. **The Omri leader crosses the "Asa · 41 yrs" text.** At about x 976, y 278–283, the vertical runs through the "41".
    - Station verticals and leaders in `placeFree` only avoid `lab` rects. The king-bar rect `{x:580,y:272.5,w:455,h:11}` has no `lab` flag, and the `lead` layer draws over `bars`.
    - Also: the Jehu and Jonah leaders at x 930 and 860 pass between bars by luck.
    - **Fix:** nudge the leader x to a bar gap, or draw a paper halo under bar text. (FIX-LABELS; or FIX-STRUCT for the halo)

13. **The Samaria falls / Assyria resettles leader crosses the Micah bar and the Isaiah bar** (x 742, y 327–342). (FIX-LABELS: same cause as 12, prophet bars are not in `rects`)

14. **Magenta "source" arcs run across prophet bar labels.** (FIX-PANELS, `drawArcs`)
    - The Isaiah → 539 arc runs from about x 770, y 337 leftward through the Hosea bar and "Isaiah · 46 yrs" (x 735–800, y 330–337). It continues across x 585–735.
    - The Nahum/Habakkuk arcs strike through "Habakkuk · 4 yrs" (x 612, y 339).
    - **Fix:** start each arc at the bar end, not its centre, and route it under the bars (layer order).

15. **The prophet bars at x 585–620 are unlabelled stubs.** Examples: Jeremiah 647–580, Daniel 618–536, Ezekiel 613–591 at y 327–342; their labels fall left of the area. Check that the first visible part of each bar carries its name. (FIX-STRUCT, `drawStructure`, prophets)

16. **Year pill "607" at x 589, y 266 sits on the zU/TS boundary,** touching the "(609–607) Jeremiah" box. Pill "740" at x 742, y 344.7 butts against the "a. 740 Assyria resettles" box top (346.9), leaving 0.4 mm. Cosmetic. (FIX-LABELS, the `tags` y)

17. **The 997 cluster at x 1035 is half in the turn.** "997–607 390 years of Israel's error" runs to about x 1040. The 6 events at 997 compete for one x. Consider placing the 997 group in the turn-2-side gap at x 1000–1035, y 312–345, which is free. (FIX-LABELS)

## D. Data / OWNER

18. **"Jehu executes Jezebel" / "Jehu kills Jehoram" are tagged "c. 905".** This matches A6 (Jehu c. 905); the Insight chart has c. 904. That is fine. Just note the reigns CSV flags the difference. (OWNER, no change needed)

19. **"c. 629 Josiah dies in battle" is placed at t = -628, at x 615.**
    - The label says c. 629, but the station sits at 628 (A6 succession).
    - Either is defensible, but the gold label and the tick disagree by 1 yr (about 1.2 mm). (OWNER / FIX-FILL `build_a0_sheet.py` t value)

20. **No Elijah or Elisha prophet bars** (see 4). These are the two most-labelled prophets of 997–846. Add them only if a wol.jw.org source gives ministry years. (OWNER)

## Quick win order for FIX-LABELS

1. Cap clusters at 3 and port the med fallback into `placeFree` (item 1). This alone should lift 997–607 from about 19 to about 40 labels.
2. Then flip `prefUp` (item 5).
3. Then drop the redundant "year not stated" (item 6).
