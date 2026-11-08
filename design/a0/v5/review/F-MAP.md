# F-MAP: map, legend and footer fixes

Files: `a0v5/map.js` (style `d`), `a0v5/maps.js` (legend, footer). Checked with shot.sh after each change.

## Fixed

### Map routes compared with data/research/journeys.csv
- **Abraham:** added the Carchemish (Euphrates ford) and Damascus stops between Haran and Shechem, as in the CSV. The distance is recomputed (≈ 2,550 km).
- **Exodus:** the note said "stops 1–10 = Row 1", but Row 1 has no numbered stops. It now reads "possible route (B3)". Removed the stray 8–10 stop numbers in the Land inset; stops 1–7 were never shown.
- **Exiles to Babylon:** the old route (Damascus, Hamath, Carchemish, Mari) carried the note "route as in atlas maps", but the CSV says no jw.org map draws this route. Its stops now follow the CSV: Jerusalem, Ramah, Riblah, Babylon. The note now reads "stops from the Bible; route not stated", and the scripture is now "2Ki 25:6-11; Jer 40:1".
- **Return (537) and Ezra/Nehemiah:** both now carry the note "one possible route (it-2 p. 332)" or "possible route". The CSV says the Scriptures do not give the route.
- **Jonah sent to Nineveh:** the date is now "c. 844 B.C.E." (it used to say "route not stated"). The note is now "landing place not named; over 800 km" (CSV, ia ch. 14). The made-up ≈ 820 km figure measured from Gath-hepher is gone.
- **Jesus' family:** the date is now "1 B.C.E. or 1 C.E.", as in the CSV (it said "c. 1 B.C.E.").
- **Paul to Rome:** added the Cape Salmone and Cauda stops from the CSV.
- **Spelling:** "Berea" is now "Beroea" (CSV and NWT spelling).
- **Rameses event date:** it said "Nisan 14, 1513" (no era). It is now "Nisan 15, 1513 B.C.E.", the CSV's Exodus date (Nu 33:3).

### Map layout
- **Scale bar:** it ran into the legend (the "1,000 km" label was at x ≈ 1014). It is now a 500 km bar, right-aligned inside the map.
- **Region names:** they are now reserved space in the label placer, so place labels no longer sit on ITALY, ACHAIA and similar names. Dropped "CANAAN", which sat under the Land box. The N arrow and scale-bar corners are also reserved.
- **Leader lines:** they now draw under all label text, and a label spot whose leader would cross another label is penalised. This fixes the leaders in the Land inset that struck through "Moses dies" and other labels.

### Legend (maps.js `drawLegend`)
- **Position:** the box moved down 3 mm (y 615–798) to clear the "1876 Russell…" label above it (R-row4 #20).
- **"≠ sources differ":** this used to run into the "* duration computed" note because SVG collapsed the spaces. It is now set apart as its own text.
- **Date precision:** "before / after" is now "b. before · a. after", so readers know what the a./b. year prefixes mean (R-row1a #12).
- **Labels section:** removed the "R2-14" code, which is printed nowhere on the sheet (R-text-others #10). It now reads "date as printed · key scripture". The second line now reads "In the app, events carry codes: R1–R4 row · J Jesus' ministry · F future."
- **Spelling and ranges:** "fulfilment" is now "fulfillment" and "Mt 13:24–43" is now "Mt 13:24-43" (R-text-others #8, #9). "coloured" is now "colored" in map.js style c.

### Footer (maps.js `drawFooter`)
- **Stale version line:** "Wireframe v0.4 · round 3" is gone (R-future #16, R-text-others #7). The second line now reads "Images © Watch Tower Bible and Tract Society of Pennsylvania, credited per image in the app · A0 chart v5 · English edition · time scales vary by row." This uses the credit wording from the handoff. The old "stated in the grid sheet" was dropped because row scales are not printed.
- **Readability:** the footer is now 3.0 mm in g1 (it was 2.65 mm in g2), and the credit line is semi-bold.

### Review items fixed after 22:08
- **Susa (R-facts #16):** "c. 493 B.C.E." is now "493–484 B.C.E.", as in record b18-0048 (precision "between").
- **Jerusalem (R-facts #17):** "c. 1070 B.C.E." is now "1070 B.C.E." Record b3-0007 gives the date as exact.
- **Journey sub-lines (R-overview #20):** raised from 2.1 to 2.2 mm, in g1.

## Left / for OWNER
- **MESOPOTAMIA:** the label is still crossed by route lines and by the Mari dot. Every nearby spot has routes, so it needs an owner decision (move it or drop it).
- **Tarsus and Carchemish:** these optional labels sit about 10 mm from their pins on leader lines, because the Haran and Antioch labels take the space.
- **Footer wording:** the version and edition text is my wording. The owner should confirm it (R-future #16 asks for OWNER).
- **Exile route:** it now draws a straight line from Riblah to Babylon, because the real route is not stated. The owner may want it dashed or hidden.
- **Ramah, Salmone, Cauda:** the coordinates are standard site positions and are not from the CSV, which has no lat/lon for any journey. Data/research should confirm them.
- **R-row4 #21:** the "2015 Our Christian Life…" label 1–2 mm above the world panel is not fixed. The panel top is set by `index.html`'s drawMap y; this is a FIX-LABELS call.
- **R-facts #17, wording:** the reviewer quoted the old `maps.js` STACK ("R1 c. 1070 · David's city"). That M1 code is no longer drawn (only style `d` is used), so only map.js was changed.
- **New legend entries not added; the legend box is full:** violet triangle markers, beast icons, prophet bars, "//" breaks, row 4 title bars, book tabs and pair-arc examples (R-human #16–19, #25). Matching the turn 3 dash patterns (R-overview #22) and the iron + clay stripe (R-overview #24) are also left. Adding these needs a decision on what to drop from the legend, or more legend space (OWNER).
- **R-overview #14:** move the footer into the empty strip at x 345–1189, y 798–835. This is a layout decision for the OWNER. The footer is now larger, but it still sits at x 25.
- **R-overview #15:** cropping or filling the low-density world map is not done. It needs FIX-FILL data or an OWNER layout call.
