# F-LABELS: label placement (draw2.js drawEvents / drawLabel / labW)

## #fit counts (headless Chrome, fresh profile, read from `#fit`)

| Zone | Before (21:58) | After (22:09) |
|---|---|---|
| Row 1 + turn | 51 / 87 | 56 / 91 |
| Row 2 + turn | **33 / 112** | **55 / 114** |
| Jesus 2 B.C.E.–33 | 51 / 80 | 53 / 79 |
| Row 3 + turn | 34 / 71 | 46 / 85 |
| Row 4 | 57 / 78 | 61 / 83 |

Totals moved because FIX-FILL added records while I worked. Row 3's gain comes partly from other fixers. `drawEvents` runs in about 55–100 ms warm (it was 42 ms; the extra passes cost the rest).

## What I fixed

1. **Row 2 `placeFree`: clusters that could never fit** (R-row2a #1). Clusters are now capped at 3 rows. A cluster with no slot is retried one item at a time (`doC(c,solo)`), and a medallion item falls back to a plain label (the same as the row placer). This took Row 2 from 33 to 55.
2. **Row 2: lane preference flipped** (R-row2a #5). Israel and Judah go up, next to the king bars. Prophets and nations go down, next to the prophet bars.
3. **Row 2: no label box may sit on an existing leader.** A new `segBox(lead, box)` check stops labels landing on leaders already drawn. The candidate cost now prefers the outer slots (`ck:-1`), so the inner slots stay free for leaders.
4. **Turns (A0.LOOPS):**
   - The sort is now med, then extra (FIX-FILL `o.extra`), then **tier**, then t (R-turn1 B2, R-turn2 #1).
   - The side is no longer fixed by index parity. Each item tries its preferred side first and then the other one (R-turn1 B1). The parity counter counts non-extra items only, and extras try both sides, as the orchestrator asked.
   - The vertical search uses half-pitch steps. Tier-1 items search 1.5× further than others.
   - The left turn's reach goes from dy 36 to 44, so the free bands above and below the hole can be used (R-turn2 #2).
   - Turn leaders may no longer pass through another label box. Leader-to-leader crossings are still allowed: forbidding them cost 13 labels in turn 1.
   - Verified: "United kingdom of Israel", "Jonathan and David's covenant", "168 Antiochus IV", "c. 18 Herod begins rebuilding", "Rome, sixth world power" and "Pompey takes Jerusalem" are all labelled.
5. **Extras never displace poster labels.** They rank last in the turn sort, in the row placer priority `p()` and in `placeFree`'s `pri()`.
6. **Two-line tier-1 labels get a 1.2 mm taller box** in the turns and in `placeFree`, so the next stacked label no longer touches line 2 (seen at "Greece, fifth world power" / "Greek Septuagint").
7. **Leader end points** (handoff §5.5). Elbow leaders and turn leaders now end at the text's x-height middle (top +2.0 for tier 2, +2.4 for tier 1), not at the top or 3.2. The 0.9 mm text offset was already the same on both sides.
8. **Row placer (rows 1, 3, 4):** a two-pass search. The first pass only accepts slots where the leader stem crosses no nearer-lane label and the box covers no existing stem. The second pass is the old rule. The counts did not change. Crossings now remain only where no clean slot exists; I checked this by eye in the final week, not by measurement.
9. **"year not stated" dropped when a year or range is already printed** (R-turn1 D2, R-row2a #6, R-text-others #2). The `'year not stated · within'` meta now shows only when `yrOf` is empty. This also narrows the boxes.
10. **≠ marks restored** (R-text-others #6). They now match on `o.ref0` (b18-0048, b2-0008, b5-0021) as well as the old titles, and `labW` adds 3 mm for the mark.
12. **`lim()` no longer widens the lower row of a turn into the turn's hole** (R-turn3 #4). Before, Row 4 above-line labels could run into turn 3's interior. `A0.LP.wide2=1` restores the old behaviour. No #fit change.
11. Halo: body text already uses 0.6 for fs ≤ 3.5 (0.8 above). Widths already come from `A0.tw` (canvas, real Noto Sans, after `document.fonts`).

Tuning knobs live in one object: `LP` in `drawEvents`. You can override them from the console via `A0.LP` and re-run `A0.drawEvents`. `A0.FREEROWS` (default `[1]`) chooses which rows use `placeFree`.

## What is left (with reasons)

- **Row 2 is still limited by space.** zU and zD are 25.2 mm each (3 lanes). Between x 550 and 650 there are about 14 stations per 50 mm. Longer leaders or flatter slopes (tested `dx 60, ll 70, sl 0.25`) add only 1–3 labels. The real gain needs R-row2a #3/#4: move the prophet bars up or lower `sd`. That is FIX-STRUCT / OWNER.
- **Turning all rows into `placeFree` is worse:** R1 52→44, J 51→31, R4 57→36. The lane placer was kept for rows 1, 3 and 4.
- **Making the lane placer forbid leader/label crossings outright costs about 45 % of labels** (J 51→18). The soft two-pass rule (item 8) is the compromise. The leaders still crossing labels in dense spots need the owner to decide (R-jesus #2/#3, R-row1a #6/#7, R-row1b #9/#10, R-row4 #19). Final-week Nisan 14 is the worst spot.
- **Tier-1 items still without a label (key ones):**
  - Creation of Adam (b1-0001, x 190)
  - Law covenant at Mount Sinai (b2-0022)
  - the 997 group at x 1035 (b3-0019, b12-0016/17/18)
  - Book of the Law found (b3-0089)
  - Babylon falls (b4-0024), Medo-Persia (b12-0027)
  - Appointed times begin (b3-0117) and end (b10-0001)
  - God's Kingdom born (b10-0002), Christ's presence (b12-0067)
  - Pentecost (b6-0001), Jesus' ascension (b5-0169)

  Creation of Adam: three tier-1 events share x 190. The up lanes are reserved for the lives block and the gutter blocks the left, so there are only 3 down lanes. Adam and Eve disobey, Edenic covenant and Cain take them first, because a tier-1 medallion ranks after plain tier-1 items. It is zero-sum: one of the four must go. OWNER.

  The rest sit in single-x clusters with more events than lanes. OWNER: raise the tier threshold, or give the clusters a stacked block under one leader (needs a lane-placer cluster mode, which I did not have time to build).
- **Medallion fallback in Row 2** means some `ev-*` image slots in dense spots now show as plain labels with no slot. FIX-IMAGES / OWNER should check that no key image was lost.
- I did not touch these (other owners): book-tag and stop-circle reservations (R-turn1 D5/D6, R-row1b #5/#14: tags come from draw.js), the STONE pill (FIX-PANELS), and the caption gaps.
- Turn 1: the outside leaders still cross the Saul/David bars. The bars aren't in `rects`, so the bar arcs would need registering as keep-out (FIX-STRUCT can expose them).
