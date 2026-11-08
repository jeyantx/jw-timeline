# R-facts: data and hard-coded facts on the A0 sheet

Reviewer: R-facts (22:04). The checks were Python scripts. They parsed `real.js` D.ev and D.jes, plus `data.js`, `draw.js`, `draw2.js`, `map.js` and `maps.js`, and compared them with `data/merged/timeline.json` and `data/research/confirm_*.csv`, `study_books.csv`.

**Summary.** The 372 D.ev rows and 69 D.jes rows in `real.js` match `timeline.json` for glyph and precision, and for year, apart from the items below. All the `confirm_bible.csv` / `confirm_modern.csv` corrections reached `real.js`: Saul c. 1078, Ark a. 1070, Solomon's wisdom "not stated", Rome with no end date, Anglo-America from 1914–18, the Grew/Storrs date, MEPS 1979, JW Library Oct 2013, and Sept 2022 house to house. The wrong facts are mainly hard-coded design data in `data.js` and `draw.js`.

The rulers are correct, because `tOf` skips year 0: 607 B.C.E. + 2,520 lands on 1914, 455 B.C.E. + 483 on 29 C.E., and + 490 on 36 C.E. The 1,260-day ruler (1914.95–1918.45, i.e. Dec 1914–June 1918), the 1,335-day ruler (Sept 1922–May 1926) and the 2,300-day ruler (June 1938–Oct 1944) also match b12-0071, b12-0078 and b12-0082.

## Wrong facts, most visible first

| # | Where | Wrong | Correct | Source | Owner |
|---|---|---|---|---|---|
| 1 | `draw.js` A0.POW, red world-power line, row 1 | EGYPT starts at -1728 | Egypt is first world power **a. 1600 B.C.E.** Start the bar at -1600 (it is an "after" date, so a soft start is fine) | b2-0009, b12-0006 "a. 1600 B.C.E.–(end not dated)" | FIX-STRUCT |
| 2 | `draw.js` A0.POW | ASSYRIA ends at -607 | Assyria's world-power period ends in **632 B.C.E.** (Nineveh falls). Babylon starts in 607, so the line has a 632→607 gap. Either leave the gap or draw Babylon's lead-in thin, but don't run Assyria to 607 | b12-0019 "(start not dated)–632 B.C.E."; b3-0091 | FIX-STRUCT (gap drawing: OWNER) |
| 3 | `draw.js` A0.POW | The EGYPT/ASSYRIA hand-off at -740 | No source dates it: Egypt's end and Assyria's start are both "not dated" in our data. 740 is the fall of Samaria, not the start of Assyria's world-power period. Suggest a soft (dashed or faded) boundary with no tick | b12-0006, b12-0019 | OWNER / FIX-STRUCT |
| 4 | `draw.js` line 49, 1,290-day ruler | Starts at 1919.4 (≈ May 1919) | **January 1919** to September 1922, so a = 1919.0 (it then sits next to the 1,260 end at 1918.45; nudge the label, not the date) | b12-0075 "January 1919 to September 1922" | FIX-STRUCT |
| 5 | `real.js` D.ev "2,300 evenings and mornings", row 4 ≈1938 | Year tag prints **"(1938–1938)"** with a "between" glyph and the meta "year not stated · within" | Should show **1938–1944** (June 1 or 15, 1938, to Oct 8 or 22, 1944). Cause: in `build_a0_sheet.py` `year_tag()`, the `between` branch fires because start.latest = 1938; it should fall through to the span branch, or print the year once when latest == year | b12-0082 | FIX-FILL |
| 6 | `real.js` D.ev "Anglo-American world power" (t 1914.5) | Date "1914-1918 C.E.–" (hyphen, dangling dash); meta "**year not stated** · within" | 1914–1918 is printed ("during World War I"), so drop "year not stated". Tag **1914–18**; the date should read "1914–1918 C.E. →" | confirm_bible.csv "Anglo-America 1763→Armageddon" row; b12-0066 | FIX-FILL (meta text from `year_tag`); hyphen in timeline.json date_label |
| 7 | `data.js` D.spans, row 4 band b | "HQ Allegheny" 1884–1909, "25 yrs" | **1889–1909, 20 yrs**. 1884 is the incorporation, not the move to the Bible House | b12-0064 "1889–1909"; b8-0038 (1884 charter) | FIX-TEXT (data.js) |
| 8 | `data.js` D.prophets | Jonah 846–842 | **c. 844 B.C.E.** (single date) | b3-0051, b18-0038 | FIX-TEXT |
| 9 | `data.js` D.prophets | Amos 806–802 | **829–c. 804 B.C.E.** | b3-0054 | FIX-TEXT |
| 10 | `data.js` D.prophets | Nahum 650–632 | **b. 632 B.C.E.** (no start printed) | b3-0092 | FIX-TEXT |
| 11 | `data.js` D.prophets | Habakkuk 630–626 | **c. 628 B.C.E. (?)** | b3-0097 | FIX-TEXT |
| 12 | `data.js` D.prophets | Obadiah 609–605 | **c. 607 B.C.E.** | b3-0120 | FIX-TEXT |
| 13 | `data.js` D.prophets | Haggai 521–519 | **520 B.C.E.** (messages and writing are both 520) | b4-0039, b11-0034 | FIX-TEXT |
| 14 | `data.js` D.prophets | Malachi 445–441 | **a. 443 B.C.E.**; no 445 start is printed | b11-0042 | FIX-TEXT |
| 15 | `data.js` D.pre, opening | THE EARTH "formless, dark" | NWT 2013: "**formless and desolate**" (Ge 1:2) | confirm_bible.csv "earth (Ge 1:2)", corrected | FIX-TEXT |
| 16 | `map.js` line 18, Susa pin | "c. 493 B.C.E. · Esther made queen" | The data says **between 493 and 484 B.C.E. (year not stated)**. Print "493–484 B.C.E." or "year not stated". 493 is Vashti deposed (3rd year) | b18-0048, b4-0054 | FIX-MAP |
| 17 | `maps.js` line 19, Jerusalem stack | "R1 c. 1070 · David's city" | **1070** is exact (David king over all Israel; Jerusalem made capital), so drop "c." | b3-0007 | FIX-MAP |
| 18 | `draw2.js` Daniel 2 panel, Rome row | "30 B.C.E. → fragments 5th cent." | The correction says **from 30 B.C.E., end not dated** ("began to fragment" in the 5th cent. is not an end). Suggest "from 30 B.C.E. · (end not dated)" | confirm_bible.csv "Rome 30 B.C.E.→", corrected; b12-0040 | FIX-PANELS |
| 19 | `real.js` "Masoretes preserve Hebrew text" (t 500) | Tag "6th–10th centuries" drawn with the **exact** glyph (0) | Range, so use the between glyph (3). timeline.json has precision "exact" with year 500: a data error | b7-0050 | FIX-FILL (data) |
| 20 | `real.js` "Theocratic Ministry School" (t 1943.29) | The year tag is the full "April 17–18, 1943", because a span uses its whole label | Tag **1943**, meta "April 17–18, 1943", as for other dated points | b8-0247; `year_tag()` span branch | FIX-FILL |
| 21 | `real.js` "Weedlike Christians multiply" (t 300.5) | Tag "**b. 400**" | The source says "by the 4th century", and no year 400 is printed. Tag "4th cent." Its position 300.5 is also inconsistent with "b. 400" | b17-0004 | FIX-FILL / OWNER |
| 22 | `data.js` D.spans, row 1 | Period of the Judges ends -1117 | **c. 1450–c. 1120 B.C.E.**; the ~330 label is fine | b2-0057 | FIX-TEXT (minor) |
| 23 | `data.js` D.spans, row 4 | "Let God Be True" 1946–1968 | The main use ran 1946 to **mid-1960s**, so a fade before 1968 is acceptable. Minor | study_books.csv | FIX-TEXT (minor) |
| 24 | `data.js` D.lives | Enosh, Kenan, Mahalalel, Lamech and Eber have no lifespan record in timeline.json | The dates are right by Genesis arithmetic (Enosh 3791–2886, Kenan 3701–2791, Mahalalel 3631–2736, Lamech 3152–2375, Eber 2303–1839), but they are **not backed** by our data. The other 12 lives match d1-00xx exactly | timeline.json d1-0001…0072 | OWNER (add records via FIX-FILL, or accept) |
| 25 | Opening (D.pre and D.creation) | Day 7 isn't drawn as an open bar; heavens and earth are two stations | The research note says to draw Day 7 as an open bar running to the end of the Thousand Year Reign, and to put heavens and earth in ONE station (Ge 1:1) | confirm_bible.csv rows Day 7, heavens | OWNER |

## Checked and correct (no action)

- **World powers:** Babylon 607–539, Medo-Persia 539–331, Greece 331–30, Rome from 30 B.C.E., Anglo-America from 1914 (A0.POW and the Daniel 2 panel). The stone in 1914 is also right.
- **Rulers:** the seven times reach 1914, the 70 weeks run 455 B.C.E.–36 C.E., the 69 weeks end in 29 C.E., the 70 years run 607–537, and the 1,260 / 1,335 / 2,300-day rulers are right.
- **Lifespans:** the 12 patriarchs with records match: Adam, Seth, Jared, Enoch, Methuselah, Noah, Shem, Peleg, Abraham, Isaac, Jacob and Joseph.
- **Prophets:** Hosea, Isaiah, Micah, Zephaniah, Jeremiah, Daniel, Ezekiel and Zechariah match.
- **Spans:** Israel in Egypt 1728–1513, wilderness 1513–1473, Saul, David, Solomon, exile 607–537, Jesus' ministry, Paul's three tours (c. 47–48, 49–52, 52–56), Rome 58–61, the Germany ban 1933–45, WWII 1939–45, the Russia ban from April 2017, HQ Brooklyn 1909–2016, HQ Warwick from 2017, and the study-book start years.
- **Map pins:** 617 / 607 / 539 / 537 / 455 / 332 / 2 B.C.E. / 33 / 36, plus 1229, 1382, c. 1455, 1522, 1536 and the London branch in 1900.
- **Captions:** they agree with the zone boundaries. There is one nit: "THE JUDGES" sits at -1473, but the Judges period starts c. 1450.
