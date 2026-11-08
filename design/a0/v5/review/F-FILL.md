# F-FILL: fill the sparse turns and stretches, and builder fixes

Owner of `scripts/build_a0_sheet.py` and the new `data/curation/a0_extra.json`. Not committed.

## How the fill works

- `data/curation/a0_extra.json` has:
  - `include`: ids of tier-3 records from `data/merged/timeline.json`. All of them are jw.org-sourced and chosen with `docs/POSTER_TIER_RUBRIC.md` in mind: Bible-relevant first; in 100–1869 only "the Bible survives" items; after 1870 only organization activity, no individual persons.
  - `short`: the label text for each of them (40 characters or fewer, wording taken from the record title).
  - `loop_spans`: bars on a turn's outer band, built from two records.
  - `_tried_no_room`: records I tried and took out again, with the reason.
- `build_a0_sheet.py` lets these ids through the `poster` filter and gives them the `short` titles. They keep their real tier (3).
- Each one carries `o.extra = 1` in `real.js`. At my request, FIX-LABELS made the placer give `extra` items the lowest priority, in both the turn placer and the row placer. So a fill-in never pushes out a tier-1 or tier-2 label.

## Records added, by stretch (final state at 22:15)

`a0_extra.json` has 21 ids: 20 tier-3 fill-ins, all labelled, and the tier-2 Council of Trent. There is also 1 loop bar. I checked the labels with a DOM text check. Screenshots: `/tmp/sw-fill-final-t1.png`, `/tmp/sw-fill-final-t3.png` and `/tmp/sw-fill-*.png`.

| stretch | labelled now | records |
|---|---|---|
| Turn 1 (1200–997 B.C.E.) | **0** | I tried Ark at Kiriath-jearim and Saul at En-dor. Once FIX-LABELS placed more tier-1 and tier-2 labels here, they had the lowest priority and were dropped, so I took them out. The turn is now full of poster labels. |
| Turn 2 (332–2 B.C.E.) | **0 labels and 1 loop bar** | The bar is "Septuagint translated · c. 280–150", built from b4-0098 and b4-0116, on the outer band. I tried 10 Daniel 11 and intertestament points, but there is no room: the inside is full and the outside is the pictures panel. |
| Turn 3 (1700–1870 C.E.) | **12** (the turn went from 5 to 17 labels) | Ziegenbalg at Tranquebar 1706; Cruden's concordance 1737; Inquisition permits annotated Bibles 1782; Mary Jones 1800; American Bible Society 1816; Chinese Bible 1819; Burmese Bible 1835; Malayalam Bible uses "Jehovah" 1841; Storrs, "Are the Wicked Immortal?" 1842; Telugu Bible 1854; Codex Sinaiticus 1859; Young's translation uses "Jehovah" 1862 |
| Row 1, the judges (x 795–1035) | **1** | First Jubilee year 1424 (b2-0059). Ark to Shiloh was dropped and taken out. |
| Row 2, between the Testaments (x 190–350) | **2** | Nehemiah's second visit (b4-0073); Jerusalem's rebuilding completed 406 (b4-0078, Da 9:25). I took out Granicus because its year pill overlapped the 332 label. |
| Row 4, 1979–2026 | **5** | MEPS 1979; JW Library 2013; jw.org in 1,000 languages 2019; house-to-house resumes 2022; NWT in 350 languages 2026. "Phone and letter" (2020) was dropped and taken out. |
| Row 3, 1545 | **0 of 1** | Council of Trent (b7-0140) is tier 2 and poster=True, but it was filtered out as a span (R-row3 #14), so `include` now lets it through. It is in the data but not placed: the 1516–1551 cluster is full. That is for FIX-LABELS, or take it out of `include`. |

`_tried_no_room` in `a0_extra.json` lists every record I took out, with the reason.

## Builder fixes from the reviews (`year_tag`, `record`, `events`, `growth`)

- **(303–303), (1938–1938) and (1–1)** (R-text-others #1, R-facts #5):
  - When a "between" record's window has one year, the tag is that year, and the day or month goes to the meta.
  - When the two years are in different eras, the tag is "(1 B.C.E./1 C.E.)".
  - A "between" span now runs to its end year, so the 2,300 evenings show **(1938–1944)**.
- **"year not stated" next to stated years** (R-text-others #2, R-facts #6):
  - The meta is now empty when the window is 2 years or less (746/745, 33 or 34) or the label states the range (1914-1918).
  - Wide inferred windows such as (1180–1117) keep "year not stated · within".
- **" to " broke prose** (R-text-others #3): only " to " between two digits becomes an en dash. Result: "on the way to Jerusalem".
- **"After Nisan 16"** (R-text-others #4): a meta that starts with After, Before or About is lower-cased.
- **Year repeated in the meta** (R-row1a #13, R-row4 #16):
  - The year is removed from the start or the end of the meta. "1943, Nisan 14" becomes "Nisan 14", "2013, October 5" becomes "October 5", and "July 26, 1931" becomes "July 26".
  - The date order across b8 and b9 records is now the same.
- **Span tag "April 17–18, 1943"** (R-facts #20): a span gets the full label as its tag only when that label is a bare year range. Theocratic Ministry School now reads "1943 · April 17–18".
- **"c. 33" Dies on torture stake** (R-jesus #8): no "c." when the record has a day or a Hebrew day, because there the approximation is about the hour.
- **"near Passover (Joh 6:4)"** (R-jesus #16): a scripture in parentheses is removed from the meta, since the reference is printed anyway.
- **Disciple-making commission** (R-jesus #7): an undated item after the last day (t ≥ 33.26, no Hebrew day) now goes on the row instead of being filled forward into Nisan 16. It is not labelled there yet, because the row is crowded (FIX-LABELS).
- **The "by 1714" meta** (R-row3 #9): a meta that only repeats the tag year ("by 1714") is now dropped. Whether "b." should read "by" is for the OWNER.
- **Raw date field** (R-text-others #13): a hyphen between digits becomes an en dash.
- **jw.org languages chart** (R-counts #1, #2):
  - Left out the 2013 "508" (translation-production languages) and the 2019 "821" (interface languages).
  - Approximate rows are now kept as hollow points: 139 (2012) → 300 (2013) → 500 (2014) → 1,000 (2019) → 1,000+ (2022) → 1,070+ (2023).
  - The headline reads "1,070 · 2023". A "+" would need FIX-PANELS.

## Left open

- **OWNER, future bed (R-future #1, #3):** the b10 future records are still filtered out (`category future*`). Moving them onto the row-4 future bed is a layout decision.
- **OWNER, judges (R-row1b #1):** the judges' acts are judgeship spans, which `SPAN_SKIP` keeps off the sheet. Adding them as points needs a decision. There are no other tier-3 points dated 1450–1200.
- **OWNER, turn 2 content:** it can take more only if the placer may spill turn labels into the free space of the row ends, or the pictures panel moves.
- **FIX-STRUCT, Herod span:** I took out the Herod the Great loop bar (b12-0038) because, on the lower half of the left turn, `draw.js` loop-span text came out reversed. It could be re-added in `a0_extra.json` `loop_spans` once that is fixed.
- **FIX-LABELS, turn 3:** some leaders cross (for example 1706 and 1728) since the turn got busier.
- **Data / OWNER, not done:**
  - Masoretes glyph (R-facts #19);
  - "b. 400" weeds (R-facts #21);
  - Esther 484 "c." (R-row2b);
  - the scripture order for b5-0133 (R-jesus #9);
  - the lives list generated from data (R-row1a #10, R-facts #24);
  - the notes inside the opening loop (R-opening #13);
  - R-turn3 "truths recovered" (Grew and the Millerites, Russell 1869): I added only Storrs 1842, and took Grew out because it crowded the turn.
