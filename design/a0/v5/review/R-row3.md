# R-row3: Row 3, 33–1700 C.E. (x 630–1040, y 360–500)

Shots: `/tmp/sw-row3-630.png`, `-830`, `-paul`, `-left`, `-right`, `-beast`, `-800`, `-dio`, `-tyn` (Z=5 for the overview, 8–10 for the zooms).
Live counts (A0.stats): zone R3 has **41 placed and 40 dropped** out of 81.
X scale: 33.26→640, 100→800 (2.4 mm/yr), 1700→1035 (6.8 yrs/mm).

Defects, most visible first.

1. **Paul's tour bars below the line are garbled.** At x 672–712, y 452–458.
   - "1st tour", "2nd tour · 3 yrs · → M1", "3rd tour · 4 yrs · → M1", "to Rome" and "Paul in Rome · 2 yrs" all print on top of one another and on top of the dark bars. It reads as "1st ███ ███ 3rd to Rome Paul in Rome · 2 yrs".
   - Cause: the bars are only 4–10 mm wide at 2.4 mm/yr. `bar(...,{out:1})` puts each label outside its bar, so the label runs into the next bar. The 'short' form does the same (labels at x+1.4).
   - File: `a0v5/draw.js`, `D.spans.forEach`. Data: `a0v5/data.js`, `D.spans`, band `d` of row 2.
   - Fix idea: stagger the bars onto 2 lanes, or drop the labels and keep only "1"/"2"/"3"/"R" glyphs plus "→ M1". The bars also duplicate the tier-1 journey labels that are already placed.
   - **FIX-STRUCT**
2. **Five tier-1 events in 33–36 C.E. are dropped (no label).** All sit at x 640–648:
   - "Holy spirit poured out at Pentecost" (it has image slot `ev-pentecost-sowing-begins`, so the photo is lost);
   - "Jesus' ascension";
   - "Stephen martyred";
   - "Saul converted near Damascus" (34.3);
   - "Cornelius becomes a Christian" (36.75);
   - "End of the 70 weeks of years" (36.76). Only the "70 WKS" ruler tag shows.

   Meanwhile tier-2 "a. 66 Christians flee to Pella" and "c. 55 Riot…" are placed.
   - Cause: 33.26–37 has only about 8 mm of x. The labels for Jesus' final week fill x 600–650 above and below. `placeFree` only allows leaders up to 25 mm with a minimum slope (`LP.ll`, `LP.sl`), so it finds no box.
   - Fix options:
     - (a) widen the 33.26–37 stretch in `ROWS[2].map` (`core.js`), e.g. add a knot `[37,665]`;
     - (b) let tier-1 or `med` clusters in R3 use longer leaders;
     - (c) let them evict tier-2 labels.
   - **FIX-LABELS** (b/c), **FIX-STRUCT** (a)
3. **About 30 dropped tier-2 events still draw station dots, with no label.** You can see clusters of anonymous circles:
   - x≈666 (44 C.E.: Disciples called Christians, James executed, Peter freed, Herod Agrippa dies);
   - x≈671 (famine relief);
   - x 679–682 (7 events from 50 C.E.: Timothy, Europe, Philippi ×2, Thessalonica, Beroea, Athens; Athens has image slot `ev-paul-at-the-areopagus`, which is lost);
   - x 695 (Eutychus, Miletus);
   - x 700 (Caesar, Agrippa II);
   - x 715–720 (Nero, Paul executed, Cestius Gallus).
   - Cause: `station(s,it)` runs before `tally(it,!!got)` in `placeFree`. Fix: skip or ghost the stations of dropped tier-2 items, or merge them into one glyph per cluster.
   - **FIX-LABELS**
4. **The book chips spill past the 100 C.E. scale break.** "Ac 61 … 3Jo 98" run along x 783–900 (y 448–451). Their true years map to x 711–800, so Re 96, Joh 98, 1Jo/2Jo/3Jo 98 sit over the 500–900 C.E. stretch.
   - Their leader lines run up to about 100 mm sideways and cross the Paul tour bars (item 1).
   - Cause: `draw.js` (66-books strip, the `[0,1,2].forEach(r=>{const bs=…` packer) only pushes chips to the right.
   - Fix: pack the chips both ways around the true x, or use 2 chip rows for 41–98 C.E.
   - **FIX-STRUCT**
5. **"(303–303) Diocletian orders Scriptures burned … year not stated".** At x 905, y 487–491.
   - The year IS stated: the date is "303 C.E., February 23-24".
   - The yr/meta fields came out as precision 3 "within" (the range form) instead of "303" + meta "303, February 23–24".
   - Cause: `scripts/build_a0_sheet.py` (yr/meta derivation for exact dates with a day range).
   - **FIX-FILL**
6. **The Diocletian leader is about 75 mm long and horizontal.** It runs at y≈485 from the station (x 830) to the label (x 905). It passes about 1 mm under "multiply by the 4th century · Mt 13:28" and nearly touches it, so it looks like an underline of the Weedlike label.
   - Fix: place the label closer to x 830, or drop it to below the line near 830–860.
   - **FIX-LABELS**
7. **"b. 400 Weedlike Christians multiply".** At x 830, y 480.
   - The source says "by the 4th century", which means by the 300s. "b. 400" implies a year and is ambiguous: "b." also reads as "born".
   - Fix: show "4th century", or "by 4th cent.". Cause: the `yr` value in `build_a0_sheet.py`.
   - **FIX-FILL**
8. **"c. 101 The weeds appear".** At x 801, y 399. The source says "dawn of the 2nd century", so "c. 101" invents precision. Fix: show "2nd century" or "early 2nd cent.".
   - **FIX-FILL**
9. **"b. 1714 Tamil Christian Greek Scriptures … by 1714".** At x 1030, y 470.
   - "b." reads as "born", and the meta repeats "by 1714". Prefer "by 1714" as the gold tag with an empty meta.
   - The same "b." pattern appears sheet-wide.
   - **FIX-FILL** / OWNER (wording of the abbreviation)
10. **Station circles overlap and blur into one blob for 1516–1551.** At x 1008–1013, y 430. Six stations (Erasmus, Luther, Tyndale NT, Pentateuch, Tyndale burned, verses) sit within 5 mm. Three are dropped (Tyndale's Pentateuch, Tyndale strangled and burned, Numbered verses).
    - Fix: merge them into one cluster glyph, or skip the stations of dropped items (item 3).
    - **FIX-LABELS**
11. **Four tier-2 events are dropped in 300–350, and the stations bunch up.** Constantine legalizes "Christianity" (313), Codex Vaticanus (350) and Codex Sinaiticus (350) are dropped. With 300.5, 303 and 325 that makes 6 stations within 8 mm at x 829–837.
    - There is free space above the line at x 850–925, y 378–397, and below at x 740–790, y 470–492. A longer leader would reach it.
    - **FIX-LABELS**
12. **Empty stretches in the compressed 100–1700 zone.**
    - Above the line: x 860–925, y 376–398 (nothing between "405 Jerome" and "1008 Leningrad").
    - Below the line: x 740–790, y 470–492, under "c. 56 Paul arrested".
    - These are the natural homes for the dropped Constantine, Codex and Tyndale labels (items 10–11), and for item 13.
    - **FIX-LABELS** (placement), **FIX-FILL** (content)
13. **There is no "Bible completed" milestone.** Only the chips "1Jo 98 / 2Jo 98 / 3Jo 98" mark it. The brief names this as a row theme, but there is no event like "c. 98 Bible writing completed" in `real.js`.
    - `timeline.json` has only the per-book entries b11-0068…0071 ("Writing of John completed", …).
    - Before adding a "c. 98 last Bible book written" record in `a0_extra.json`, it needs a jw.org source.
    - **OWNER** / FIX-FILL
14. **Council of Trent (1545) is missing.** It is tier 2, poster=True and not in `real.js` (b7-0140, "Council of Trent condemns vernacular Bible translations"). It pairs with 1229 Toulouse as a "Bible survives" contrast. It is likely filtered by `a0_sheet.json` or the budget.
    - **FIX-FILL**
15. **Two labels nearly touch under 1611.** At x 1000–1022, y 399–410: "1611 King James / Version published 1611, May" sits about 1 mm above "1526 Tyndale's New / Testament printed".
    - The 1611 leader at x 1022 also has to pass the 1526 label's right edge.
    - Fix: one lane of extra separation.
    - **FIX-LABELS**
16. **The "c. 100 Last apostle, John, dies" label touches the "//" scale-break mark.** At x 800, y 407–414, the mark is drawn at x 800, y≈414, right under "John, dies".
    - Cause: the scale-break mark code in `draw.js` (cuts at 100) does not reserve a rect.
    - **FIX-STRUCT**
17. **The Daniel 7:7 beast badge sits on the main line among the station dots.** At x 704, y 428–433: the "W" medallion and the red "Da 7:7" label overlap the line between the 56 and 58 C.E. stations.
    - Fix: lift it onto the red power-line offset, or nudge it 2 mm.
    - **FIX-PANELS** (beasts)
18. **Several 100–1700 labels end in empty meta lines.** For example "the Latin Vulgate", "the first Bible", "vernacular Bibles", "Hebrew text" and "translation begun" end with a blank meta (scripture "—"). It is harmless visually.
    - The 1008, 863 and 325 labels have no source or detail line at all. A short meta from the date field (e.g. "Cyril and Methodius", "Vilvoorde") would fill the space.
    - Low priority. **OWNER**

Checked and OK:
- The wheat line (solid until 100, then dotted) and the weeds line (thin until 100, then thick and hatched from x 800) render correctly.
- The section captions "THE FIRST CHRISTIANS" and "THE BIBLE SURVIVES · THE WEEDS GROW" are clear of the labels.
- The Gutenberg photo loads.
- The Tamil NT (1714) image slot sits in turn 3 at x 1041, y 470. It is still an empty grey circle.
