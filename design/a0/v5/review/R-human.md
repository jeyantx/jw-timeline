# R-human: the sheet as people will read it (22:04–22:10)

Shots: /tmp/sw-human-1..8.png (full sheet Z=1, quadrants Z=1.5, legend, 1914 cluster, row 2 at 455 B.C.E.).

## 1. Visitor at 2–3 m — verdict: strong first look, weak "where do I start / where's the story"
- First seen: the sunburst + "FROM EDEN TO THE KINGDOM" (top left), the paradise painting (bottom left), the coloured bundle snaking in a serpentine. It reads as "a long journey"; that's good.
- Start of time is findable (Creation days 1–7 loop into row 1 at x≈190), but row direction is only shown by tiny arrows (≈3 mm) on the black line; row 2 and row 4 run right-to-left and a visitor will not know.
- Era names (IN THE BEGINNING, THE PATRIARCHS, THE LAST DAYS…) are 4 mm grey caps: invisible at 3 m. The four rows have no big row numbers / date ranges.
- The gold "promised offspring" line is there but does not dominate: the multi-colour bundle is all equal weight; Ge 3:15 → Kingdom is not the visible spine.
- The far end (Kingdom 1914, Armageddon, Paradise) is not a visual climax; the eye ends in the map/legend block bottom right.

## 2. Reader at 1 m — verdict: threads exist, but prophecy→fulfilment linking is mostly implied, and one link type is wrong
- Gold offspring, red/metal world powers, blue north/south, violet rulers (70 YEARS, 7 WKS, 2,520/SEVEN TIMES, 1,260/1,290/1,335 D) and sepia covenants are all drawn and named in the legend. Rulers have labels but the start and end years are not printed at the ruler ends.
- **Green messianic arcs are wrong by construction**: `A0.drawArcs` (draw2.js ~l.126) sends each row-0/1 'm' item to `tg[k++ % tg.length]`, i.e. to the k-th Jesus-zone item in order, not to its fulfilment. Any arc lands on an arbitrary event. Misleading.
- Magenta nation arcs are hard-coded (`src` map: Nahum→632, Jeremiah→607/537, Isaiah→539, Ezekiel→332) and stop at a dot without a label saying what was foretold.
- pairs.csv 'stated' links NOT drawn (real.js has no pair data at all): p01 Cestius Gallus 66 → great tribulation; p02 flight to Pella → attack "cut short"; p03 70 C.E. → Armageddon; p04 Joel 2:28 → Pentecost 33; p06 Babylon falls 539 → Babylon the Great fallen 1919; p07 return 537 → anointed restored 1919; p09 tree dream → seven times 607–1914 (ruler only, no link to Da 4); p10 two witnesses → 1919 slave; p13 Passover 1513 → Jesus dies Nisan 14 33; p14 Melchizedek → Jesus High Priest 29. p05/p08 (not_stated) and p11/p12 (withdrawn) correctly absent — keep it so.
- Wheat and weeds: dashed gold arc 33→1914 + "Wheat gathered into storehouse 1919" works well; the best-understood thread on the sheet.

## 3. Student up close — verdict: labels are good; interpretations are named, not explained
- Labels carry year as printed (c., a., b., ranges, "year not stated"), short title, scripture. Precision markers match the legend.
- 1914 cluster (x≈860–880, y≈470–520) stacks "1914– The last days", "1914– harvest season", "1914–early 1919 Spiritual temple", "1914 Three and a half times", "1914 Christ's presence": no single line says "Gentile Times end, Jesus enthroned as King in heaven (Lu 21:24; Da 4)".
- 1919 "Faithful and discreet slave appointed" — no gloss of who/what (Mt 24:45-47). 29 C.E. baptism not tied to the end of the 69 weeks visibly.

## Prioritised improvements
1. (draw2.js `drawArcs`, rows 1→3, x 190–1035) Replace round-robin green arcs with arcs driven by explicit prophecy→fulfilment pairs (series.json pairs_with ∩ pairs.csv stated); until then hide them. Why: currently draws false links. FIX-PANELS (data: FIX-FILL)
2. (build_a0_sheet.py) Export stated pairs from pairs.csv into real.js (D.pairs with event ids, scripture, wording). FIX-FILL
3. Draw the 10 stated pairs as thin labelled arcs (scripture at arc apex), e.g. p13 Passover 1513 (row 1, x≈700) → Jesus dies 33 (row 3); p04 Joel → Pentecost 33. FIX-PANELS
4. (row 4, x≈760–880, y≈470–520) Add one 2-line gloss under 1914: "Gentile Times end · Jesus rules as King in heaven · Lu 21:24; Da 4:16, 17". FIX-TEXT
5. (row 4, x≈800, y≈485) Gloss 1919 slave: "small group of anointed brothers appointed to feed · Mt 24:45-47". FIX-TEXT
6. (violet rulers, all rows) Print start/end years at each ruler end (607 / 537; 455 B.C.E. / 29 / 36 C.E.; 607 B.C.E. / 1914). FIX-PANELS
7. (seven times ruler, row 2 x≈660 → row 4 x≈870) Draw a light connector from Nebuchadnezzar's tree dream (Da 4) label to the SEVEN TIMES ruler start (p09). FIX-PANELS
8. (row 3, 29 C.E. baptism ~x 230, y≈555) Add "69 weeks end · Messiah appears · Da 9:25" tag next to the violet triangle at 29.75. FIX-TEXT
9. (row 3, 36 C.E.) Label the 70th-week end: "36 Cornelius · 70 weeks end · Da 9:27". FIX-LABELS
10. (magenta arc ends, row 2, ey+15 dots) Put a 2.2 mm label at each dot: "Nineveh falls (Na 3:7)", "Babylon falls (Isa 45:1)". FIX-PANELS
11. (each row, at x≈195 and x≈1030) Add big row bands: "1  4026 → 1078 B.C.E. →", "2 ← … ←" with direction arrow ≥10 mm. Why: visitors cannot tell rows 2/4 run right-to-left. FIX-STRUCT
12. (history-line arrows, draw2.js l.120) Increase direction chevrons from ±1.6 mm to ≈4 mm, every 120 mm. FIX-PANELS
13. (era captions, `drawCaptions`, 4.2 mm) Raise to ≈7 mm or add tinted era bands with names readable at 2 m. FIX-PANELS
14. (gold offspring line) Make it the thickest line (≈2× others) with a label every row start "Promised offspring · Ge 3:15". FIX-STRUCT
15. (end of row 4 → future path, x≈190, y≈560–620) Make the Kingdom/Armageddon/Paradise sequence a visual climax (larger type, gold); now it is lost below row 3 at left. V6
16. (legend, x≈940, y≈650) Legend teaches green arcs as "fulfilled 29–33 C.E." only; add an example of a pair arc with scripture, and the small violet triangles above the rows (markers at 1513, 997, 607, 537 B.C.E., 29, 33, 70, 1914 C.E.) which are not explained. FIX-MAP
17. (legend) Add the circled red beast icons (Da 7:4, Da 8:20) and the grey prophet bars (Malachi 4 yrs) — used but not taught. FIX-MAP
18. (legend) Add the "//" break marks and the dark title bars on row 4 ("Let God Be True", "Harp of God") — unexplained. FIX-MAP
19. (legend) Teach the dark interchange pills with what they mean in reading terms: "this event belongs to several threads". FIX-MAP
20. (top-left story text, x≈300, y≈60) Add a 3-step "how to read" in big type: Start here ↓ · follow the line · gold = promise. Currently 3 mm. FIX-PANELS
21. (Daniel 2 image panel, x≈30, y≈440) Link each metal to its row band colour (gold head = Babylon red line? metals vs line colours conflict) — confirm the legend states which line colour = which power. FIX-PANELS
22. (rows 2–3, world-power line) Print power names on the red line at each handover (Babylon 607 → Medo-Persia 539 → Greece 331 → Rome 30 B.C.E. → Anglo-America). FIX-LABELS
23. (kings of north/south blue lines, row 3–4) Label who is king of the north/south at each change (Syria/Egypt → Rome → Germany → USSR/Russia; Britain/Anglo-America), with Da 11 verse. FIX-LABELS
24. (row 2 Divided kingdom, x≈700–1000) Judah/Israel kings bars beside world power: correlation is visible but needs a row header "Judah" / "Israel" at the bar start. FIX-STRUCT
25. (book tabs "1Ch 460", "Ezr 460", "Zec 518") Add legend line "book tab = Bible book completed (year)". FIX-MAP
26. (row 4, x≈880, y≈470) Too many "1914–" labels overlap; group into one boxed 1914 panel with 4 bullets. FIX-LABELS
27. (term consistency) Labels mix "Da 9:25"/"Daniel 9", "1 lakh · 1941" (Indian unit on growth line, x≈630,y≈530) — use "100,000". FIX-TEXT
28. (row 3 start, x≈190–300, y≈555–600) B.C.E. years on a mostly C.E. row ("c. 2 Gabriel foretells", "c. 2 Jesus born", "1 B.C.E./1 C.E.") lose their era because yrOf strips " B.C.E."; keep "B.C.E." on any B.C.E. label in row 3. FIX-LABELS
29. (row 3, "(1 B.C.E./1 C.E.) Astrologers visit") — confirm wording in timeline.json; parenthesised years read as "uncertain" with no legend entry. FIX-TEXT
30. (B.C.E./C.E.) Row 2→3 crossover has no "B.C.E. | C.E." marker at year 1; add a clear zero divider. FIX-STRUCT
31. (title subtitle, x≈300, y≈48) "Creation · 2026 → the future" — add "4026 B.C.E. (Adam) → 2026" so the time span is explicit. FIX-TEXT
32. (green arcs passing over row 2 photos, e.g. x≈330–520, y≈280–330) Arcs cut through labels; lower opacity or route under the bed layer. FIX-PANELS
33. (prophets bars, row 2) Add which prophet foretold which magenta event on the bar ("Jeremiah 70 yrs Jer 25:11") to link to the 70 YEARS ruler. FIX-PANELS
34. (1,260/1,290/1,335/2,300 day rulers, row 4 x≈700–870) Each ruler needs start/end dates and verse at ruler ("1,260 days Dec 1914–June 1918 · Re 11:3"); now only "1,290 D". FIX-PANELS
35. (row 4) Wheat-and-weeds caption "33–1914 Wheat and weeds grow together" is good — add the 1919 end "weeds separated, Mt 13:30" at the arc end for symmetry. FIX-TEXT
36. (doctrinal) Ensure no green/magenta arc implies an unstated fulfilment (p05 1919/1922 spirit outpouring, p08 Isa 2 mountain are not_stated; p11/p12 withdrawn) — add a build-time assertion. FIX-FILL
37. (whole sheet) Add tiny row numbers (R1–R4) on the turns so the "In the app, events carry codes R1–R4" legend line makes sense. FIX-STRUCT
38. (V6) Consider a separate "Prophecy → fulfilment" strip under the map: 12 pairs as columns (prophecy, verse, year → fulfilment, year), so the reader can correlate without tracing arcs across 4 rows. V6
