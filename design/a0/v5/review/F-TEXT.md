# F-TEXT: text fixes (22:10)

I own `data/curation/short_titles.json` and the text in `a0v5/data.js`. I rebuilt with `python3 scripts/build_a0_sheet.py` and checked with shot.sh (`/tmp/sw-text-*.png`). Nothing is committed.

## Sweep: every label on the sheet (386 stations + 68 Jesus records)

A Python check of `real.js` covered straight quotes, double spaces, hyphen ranges, stray whitespace, era style, length over 40, and NWT book abbreviations. It is now clean.

**short_titles.json**
- Straight apostrophes made curly in:
  - Jacob’s vision at Bethel
  - Ezekiel’s vision…
  - Ahasuerus’ banquet…
  - Haman’s extermination decree…
  - Jerusalem’s wall…
  - Wycliffe’s English Bible…
  - Jesus’ earthly life
  - …on God’s people
  - Christ’s Thousand Year Reign begins
- "Birth of Samuel (approximate)" → "Birth of Samuel". The "c." tag already says it is approximate.
- "Gentile Times end" → "Appointed times of the nations end". This is the NWT 2013 term, matches the source title, and matches "Appointed times of the nations begin" at 607.
- b2-0009 "Egypt, first world power" → "Egypt attains prominence" (source title: "Egypt attains prominence as first world power"). It was a word-for-word duplicate of b12-0006 at the same dot (R-row1b #6). **OWNER:** decide whether only one of the two should print.
- "2025 Memorial attendance report" → "Memorial attendance report". The year chip already says 2025 (R-row4 #15).

**data.js**
- The scripture ranges were correct already: hyphen within a chapter (Ge 3:1-6), en dash across chapters (Ac 13:1–14:28), as in NWT. The curly quotes were also correct already.

## Review items applied (data.js, facts checked against timeline.json)

- **HQ Allegheny** span: 1884–1909 "25 yrs" → **1889–1909 "20 yrs"** (b12-0064). R-facts #7.
- **Amos:** 806–802 → **829–804** (b3-0054, "829–c. 804"). R-facts #9.
- **Period of the Judges** span ends at **−1120** (b2-0057, c. 1450–c. 1120). R-facts #22.
- **D.pre THE EARTH:** "formless and desolate". It was already overridden in real.js; now data.js says it too. R-facts #15.
- **Creative days:**
  - Scripture now shows each day's range: Ge 1:3-5, 1:6-8, 1:9-13, 1:14-19, 1:20-23, 1:24-31.
  - Day 2 "Expanse · sky" → "Expanse · waters divided" (Insight wording).
  - Checked by shot: all fit. R-opening #7, #8.
- **Paul's journey bars** (row 3, 47–61), where the labels overprinted each other:
  - Labels shortened to "1st / 2nd / 3rd / Rome / in Rome". I dropped the "· 3 yrs", "→ M1" and "2 yrs" extras.
  - Now readable (`/tmp/sw-text-7.png`). R-row3 #1 is still FIX-STRUCT's if they want lanes.

## Left open

- **Prophets with one dated year** (R-facts #8, #10–14):
  - The cases: Jonah c. 844, Nahum b. 632, Habakkuk c. 628, Obadiah c. 607, Haggai 520, Malachi a. 443.
  - Not changed. `draw.js` labels each bar as `${a-b} yrs`, so a=b would print "0 yrs", and a made-up window would invent dates.
  - Needs FIX-STRUCT to support a point form (label "Jonah · c. 844"), then change the data.js values.
- **Calendar festival order** "15–21 Unleavened Bread" (R-gutter #13): D.cal comes from real.js (calendar_b15.csv via the builder) and `drawCalendar`. FIX-PANELS / FIX-FILL.
- **Meta "32, near Passover (Joh 6:4)"** (R-jesus #16) comes from date_label_en via the builder. FIX-FILL.
- **"b. 1117" reads as "born"** (R-turn1 D1). OWNER decides whether to spell out "before".
- **"lakh/crore" on the growth panel** (R-human #27) is in draw2.js. OWNER/FIX-PANELS. Indian units may be intended for the Tamil audience.
- **Added glosses** (R-human #4, #5, #8, #31, #35) are new content, not fixes. OWNER.
- **Relay study-book bars** ("Truth…", Let God Be True end, Bible Teach end; R-row4 #11, R-facts #23) need an OWNER decision.
- **D.lives** Enosh, Kenan, Mahalalel, Lamech, Eber: correct by arithmetic but have no record in timeline.json (R-facts #24). OWNER/FIX-FILL.
- **Text defects in other owners' files** are in `review/R-text-others.md`: stale "Wireframe v0.4" footer, British "fulfilment/coloured", "Mt 13:24–43" dash, "R2-14", the draw2.js `DIFF` list matching old titles so no ≠ prints, and the core.js row-3 heading. FIX-FILL has already fixed the builder items (#1–4).
