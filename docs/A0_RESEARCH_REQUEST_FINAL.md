# A0 Wall Chart — Research request (FINAL, design locked)

**For:** the research agent that prepared `A0_CHART_DESIGN_BRIEF.md`
**From:** design, 14 Oct 2026
**Status:** the layout is **locked** (wireframe v0.4). This request replaces any earlier v4/v5 drafts. Once the data and images come back, the design will be copied into a new file and filled with real content.
**Sources:** jw.org and wol.jw.org **only**: NWT (study edition and appendixes), *Insight on the Scriptures* (it), *God's Kingdom Rules!* (kr), *Proclaimers*, yearbooks and service year reports, *The Watchtower* / *Awake!*, jw.org news, *“See the Good Land”* (atlas).
**Return:** CSV files in the formats in §12, plus one image folder (§10).

---

## 1. What the chart is (for context)

An A0 landscape wall chart (1189 × 841 mm) drawn as a metro-style serpentine. Rows alternate direction; the turns between rows are real stretches of time.

| Part | Span | Contents |
|---|---|---|
| Opening | before Creation → Adam | Jehovah's throne → the Word → angels → the heavens → the formless earth → Days 1–6 → Day 7; Garden of Eden image |
| Row 1 → | 4026–1200 B.C.E. | lifespans chart (Adam → Joseph); Exodus stops 1–10; judges in order |
| Turn 1 | 1200–997 B.C.E. | last judges; Saul, David, Solomon (40-year bars) |
| Row 2 ← | 997–332 B.C.E. | Judah and Israel king tracks; prophet bars; exile; return |
| Turn 2 | 332–2 B.C.E. | Greece → Rome; between the Testaments |
| Row 3 → | 2 B.C.E.–1700 C.E. | Jesus' ministry by Passover year + final-week day strip; first century; the Bible survives; wheat and weeds |
| Turn 3 | 1700–1870 | Bible societies, translations, truths recovered |
| Row 4 ← | 1870–2026 → future | Jehovah's Witnesses; study-book relay; 4 growth curves in the track; the stone; walking path → paradise |

The series lines running the whole length:
- the promised offspring (gold)
- world powers (red, with the Da 2 metal colours)
- kings of the north and south (blue)
- Daniel's time prophecies (violet rulers)
- covenants (sepia seals)
- Messianic arcs (green)
- prophecies about nations (magenta)
- wheat and weeds

Side panels:
- Israel's year wheel (App. B15)
- the Bible's message in pictures (7 images)
- the Daniel 2 table
- the counts panel (6 small charts)
- one map (world + magnified Bible lands, 13 journeys, Land inset)

Each label shows **year first**, then the title, then `ref · scripture`. A thin line runs from each label to its station on the centre line.

---

## 2. Priority order

1. **Events for 997–537 B.C.E. (§3).** This is the thinnest part of the chart.
2. **Growth and count data (§5).** These are currently hatched as “awaiting research”.
3. **Confirmation of the items design added (§4).**
4. **Images (§10).**
5. Cross-check for missing key events (§6), paired fulfilments (§7), map (§8).

---

## 3. NEW — the divided kingdom to the exile (997–537 B.C.E.) needs far more events

The user notes that the stretch from David to the exile is too thin. **Design plan:** Row 2 gets a **multi-lane layout like Jesus' ministry**. Instead of one band of labels, it is organised in parallel lanes:

```
  up 3   PROPHETS LANE ─ who prophesied, key message (bars + labels)
  up 2   ISRAEL (10 tribes) events ─ kings' deeds, Elijah/Elisha, Assyria
  up 1   ISRAEL king track (A6)
  ════   centre line (stations; year first)
  dn 1   JUDAH king track (A6)
  dn 2   JUDAH events ─ reforms, temple, invasions, Passovers
  dn 3   NATIONS lane ─ Egypt, Assyria, Babylon, Moab, Syria (red)
```

Each king's reign bar becomes the anchor for that king's events. Labels sit in their kingdom's lane, so far more fit.

**Please return 60–90 dated events for 997–537 B.C.E.** with the kingdom tag (`judah`, `israel`, `prophet`, `nations`). Include at least:

- **Kings of Judah (one or more each), e.g.:**
  - Rehoboam: Shishak's invasion
  - Asa: reform, Zerah defeated
  - Jehoshaphat: teaching tour; Jahaziel's victory
  - Jehoram: Edom revolts
  - Athaliah usurps; Jehoash crowned; temple repaired
  - Amaziah; Uzziah's leprosy
  - Ahaz: altar copied
  - Hezekiah: Passover, Sennacherib, illness, the sun's shadow
  - Manasseh: idolatry, then repentance
  - Josiah: law book found, Passover, death at Megiddo
  - Jehoiakim: Jeremiah's scroll burned
  - Jehoiachin taken (617)
  - Zedekiah: siege begins (609)
- **Kings of Israel, e.g.:**
  - Jeroboam's calves
  - Omri builds Samaria
  - Ahab and Jezebel: Naboth
  - Elijah: drought, Carmel, Horeb, Naboth
  - Elisha: Naaman, the Shunammite, the siege of Samaria
  - Jehu: Jezebel's end
  - Jeroboam II
  - Hoshea: Samaria's fall (740)
- **Prophets:** each prophet's period and one key event or message (Jonah, Joel, Amos, Hosea, Isaiah, Micah, Nahum, Zephaniah, Habakkuk, Jeremiah, Ezekiel, Daniel, Obadiah). Include the dates when key prophecies were given, e.g. Isaiah 44:28 naming Cyrus, Jeremiah 25:11 on the 70 years, Ezekiel's commissioning.
- **Nations:** Assyria (Tiglath-pileser III, Shalmaneser V, Sargon II, Sennacherib); Egypt (Shishak, Necho); Babylon (Carchemish 625, Nebuchadnezzar); Moab (Mesha); Syria (Ben-hadad, Hazael).
- **Exile and return:** 617 first deportation; 607 temple burned; Gedaliah; the flight to Egypt; Daniel 1–6 events with years; 539; 537; the temple foundation laid (536); building stopped and resumed (520); completed (515).

**Fields:** `ref, row(2), lane(judah|israel|prophet|nations), date_as_printed, sort_year, precision, tier, title_en(≤40 chars), scripture, king_or_person, source_ref, image_hint`

Also return the **full reign list** (A6 / it “Kings”) for Judah and Israel, with the start and end years exactly as printed, so the tracks can be checked.

---

## 4. Confirm or correct items the design already shows

| Zone | Item as shown | Return |
|---|---|---|
| Opening | Word / angels / heavens (Ge 1:1) / earth (Ge 1:2), then Days 1–6 and Day 7 (it “Creation”; NWT notes Col 1:15, Re 3:14) | Wording and scriptures |
| Turn 1 | Samuel called; Samuel anoints David (not stated); Saul dies 1078; David king in Hebron 1077; Ark to Jerusalem (not stated); David and Bath-sheba; Absalom; Solomon king 1037; Solomon asks for wisdom (c. 1037); temple begun 1034; completed 1027; dedicated 1026; Queen of Sheba (not stated) | Dates as printed |
| Turn 3 | Grew, Stetson, Storrs (1835–1845); Russell examines doctrines (1868 or 1869) | Wording and date (kr) |
| Row 4 | 1876 Russell points to 1914 · Oct 1916 Russell dies · Mar 1925 “Birth of the Nation” · Jan 1942 Knorr president · Oct 2000 Governing Body separated from the legal corporations | Date + source |
| Row 4 | WBBR Feb 1924 · phonograph talks 1930s · Theocratic Ministry School 1943 · *Theocratic Aid* 1945 · MEPS c. 1979 · Reference Bible 1984 · *Listen to God* 2011 · JW Library c. 2013 · JW Broadcasting Oct 2014 · study edition Oct 2015 · jw.org 1,000 languages 4 Nov 2019 · pandemic letters/phone Mar 2020 · public ministry resumes Sept 2022 · NWT 350 languages Aug 2026 | Date + source |
| Row 4 | Study-book relay: *Divine Plan* 1886 · *Harp of God* 1921 · *Truth Shall Make You Free* 1943 · *Let God Be True* 1946 · *Truth* 1968 · *Live Forever* 1982 · *Knowledge* 1995 · *Bible Teach* 2005 · *Enjoy Life Forever!* 2021 | The years each was the main study book |
| Bible books | All 66 books shown as tabs at their completion year (e.g. “Ge 1513”) | Writer, place written, completion year as in the NWT “Table of the Books of the Bible” |
| Daniel 2 panel | Babylon 607→539 · Medo-Persia 539→331 · Greece 331→30 · Rome 30 B.C.E.→(Britain rises) · Anglo-America 1763→Armageddon · Stone 1914 | Start and end as publications state, and the right wording for Rome's end and Anglo-America's start |
| Daniel symbols | lion, bear, leopard, fearsome beast (Da 7); ram, goat (Da 8); small horn | The identification of each, with reference |
| Calendar wheel | App. B15 months, seasons, crops, festivals | Confirm any shortened wording |

---

## 5. Growth and count data (charts are hatched until this arrives)

Per year from the oldest published value to 2025. At least one value per decade before 1960. Mark each value `peak`, `average` or `total`.

1. Peak publishers (pre-2024 values are placeholders)
2. Congregations (have 2020–2025)
3. Average pioneers (have 2024 only)
4. Average Bible studies (have 2020–2025)
5. Memorial attendance (have 2020–2025)
6. Lands reporting (have 2020–2025)
7. Baptized per year (have 2024; 2025 approx.)
8. Branch offices (have 2024–2025)
9. NWT languages, whole or part: running total at each release (have 1950 = 1, Aug 2026 = 350)
10. jw.org languages (have Jan 2013 = 508, Nov 2019 = 1,000, Dec 2023 = 1,084, 2025 = 1,100+)
11. The years publishers first passed 10 · 100 · 1,000 · 10,000 · 1 lakh · 10 lakh · 50 lakh · 90 lakh (“not stated” is acceptable)

---

## 6. Cross-check for missing key events (whole chart)

Check the chart against:
- the kr timeline
- *Proclaimers* chapters 5–10 and its timeline
- NWT A7 (Jesus' life) and Appendix B (B1–B15)
- “All Scripture” Study 3
- it “Chronology” and it “Covenants”
- *The Bible—What Is Its Message?*

Candidates we suspect are missing:
- **Bible:**
  - Nebuchadnezzar's image dream (Da 2) and tree dream (Da 4), with the years as printed
  - Isaac marries; Jacob renamed Israel
  - Hezekiah's and Josiah's Passovers
  - John the Baptist begins (29 C.E.); the Memorial instituted; Matthias chosen
  - The council's letter (c. 49); Paul's letters with their dates
- **Jehovah's Witnesses:**
  - 1881 Zion's Watch Tower Tract Society
  - 1917 Rutherford
  - 1919 *The Golden Age*
  - 1938 theocratic appointments
  - 1953 and 1958 conventions
  - 1971–72 elders arrangement
  - 1989–91 bans lifted in Eastern Europe
  - Later changes in understanding (only if publications call them milestones)
  - Any count milestone publications name (e.g. the first million publishers)

---

## 7. Paired fulfilments (smaller → larger)

Design: the same colour ring on both stations plus a thin arc. **Only pairs that current publications state explicitly.** Since *The Watchtower* of 15 March 2015, types and antitypes are applied only where the Scriptures clearly do so.

Candidates to check:
- Mt 24 / Lu 21: Jerusalem 70 C.E. → great tribulation
- Joel 2:28-32: Pentecost → later?
- Babylon 539 → Babylon the Great
- Return 537 → modern restoration (Isa 2, Mic 4, Eze 37)
- Da 4 tree → seven times
- Re 11 → 1914–1919

---

## 8. Map (world + magnified Bible lands)

13 journeys are drawn:
- Abraham
- the Exodus (stops 1–10 = Row 1)
- Jonah ×2
- Paul's 1st, 2nd and 3rd journeys, and to Rome
- exiles to Babylon (607)
- return (537)
- Ezra (468) / Nehemiah (455)
- Jesus' family to Egypt
- Naomi and Ruth

Please return:
- the stop lists, checked against NWT App. B4, B13 and *See the Good Land*;
- whether a jw.org map shows a route for the exile, return, Jesus' family and Ruth (design follows typical atlas routes for now);
- for each of the 47 places: modern name, the events (date as printed) and the people involved;
- any jw.org map we may follow for the Land outline, the Jordan, the Sea of Galilee and the Dead Sea.

---

## 9. Open questions

1. Which tier-2 records may show as station dots only, with no label? Row 1 fits about 65 of 107 labels.
2. Is “order only” acceptable for the years of the Judges?
3. Is one QR code in the legend enough?

---

## 10. Images needed (please collect from jw.org; we will AI-edit, crop and blend later)

Please collect the **largest available version**, credit each one per jw.org terms, and name files by `slot_id`. Shape and size are given as they print. **Any aspect ratio is fine**: the design crops each image into its slot. Prefer images with a clear central subject.

| slot_id | Prints as | Subject |
|---|---|---|
| throne | circle Ø 52 mm | Jehovah on his throne (heavenly glory, Re 4 / Isa 6 style) |
| pre-1 … pre-4 | circle Ø 14 mm | The Word (Jesus in heaven) · angels · the starry universe · the earth formless and dark |
| creation-day-1 … 6 | circle Ø 14 mm | Day 1 light · 2 sky and waters · 3 land and plants · 4 sun, moon, stars · 5 fish and birds · 6 animals and Adam |
| eden | rounded 146 × 41 mm (wide strip) | The garden of Eden |
| story-1 … 7 | soft-edged circle Ø 28–30 mm | Adam and Eve eat the fruit · Abraham · David · Jesus baptized · Jesus dies · 1914 the Kingdom · the future (from the “Bible's message” overview art: wol 1001061221) |
| paradise | 312 × 143 mm, fades in from the top | Paradise earth (e.g. *Enjoy Life Forever!* cover style), with a path leading in from the top-right if possible |
| ev-the-flood | circle Ø 20 mm | Noah's ark / the Flood |
| ev-abraham-crosses-the-euphrates | circle Ø 20 mm | Abraham's journey |
| ev-red-sea-crossing | circle Ø 20 mm | Red Sea crossing |
| ev-law-covenant-at-sinai | circle Ø 20 mm | Moses at Sinai |
| ev-jericho-falls | circle Ø 20 mm | Jericho's walls |
| ev-gideon-s-300 | circle Ø 20 mm | Gideon's 300 |
| ev-david-and-goliath | circle Ø 20 mm | David and Goliath |
| ev-temple-completed | circle Ø 20 mm | Solomon's temple |
| ev-kingdom-divided | circle Ø 20 mm | Kingdom divided (Rehoboam / Jeroboam) |
| ev-elijah-on-mount-carmel | circle Ø 20 mm | Elijah on Carmel |
| ev-jonah-in-nineveh | circle Ø 20 mm | Jonah in Nineveh |
| ev-jerusalem-destroyed | circle Ø 20 mm | Jerusalem burned, 607 B.C.E. |
| ev-fiery-furnace | circle Ø 20 mm | The fiery furnace |
| ev-daniel-in-the-lions-pit | circle Ø 20 mm | Daniel in the lions' pit |
| ev-esther-made-queen | circle Ø 20 mm | Esther |
| ev-pentecost-sowing-begins | circle Ø 20 mm | Pentecost 33 C.E. |
| ev-paul-at-the-areopagus | circle Ø 20 mm | Paul in Athens |
| ev-gutenberg-bible | circle Ø 20 mm | Printing the Bible |
| ev-tamil-new-testament | circle Ø 20 mm | Tamil New Testament 1714 (Ziegenbalg) |
| ev-bible-class-in-allegheny | circle Ø 20 mm | Early Bible Students' class |
| ev-photo-drama-of-creation | circle Ø 20 mm | Photo-Drama |
| ev-advertise-the-king | circle Ø 20 mm | Cedar Point 1922 banner |
| ev-name-jehovah-s-witnesses | circle Ø 20 mm | 1931 convention |
| ev-gilead-school-opens | circle Ø 20 mm | Gilead |
| ev-revised-nwt | circle Ø 20 mm | Revised NWT 2013 |
| ev-jw-broadcasting-begins | circle Ø 20 mm | JW Broadcasting |
| ev-armageddon | circle Ø 20 mm | Armageddon |

Images also wanted for (they will get slots if images exist):
- Adam created
- Jesus born
- Jerusalem destroyed 70 C.E.
- Kingdom born 1914
- Watch Tower first issue 1879
- Babylon falls 539
- Saul dies
- Queen of Sheba
- a few of the new §3 events (Hezekiah, Josiah, Jeremiah, Isaiah)

The **Daniel 7 / 8 symbols** (lion, bear, leopard, fearsome beast, ram, goat, small horn) are drawn as small icons. jw.org art of them is welcome as a reference.

**Image return format:** `slot_id, file_name, source_url, publication_ref, caption_en, credit`

---

## 11. Style rules (unchanged)

- Year first on every label, then title, then `ref · scripture`. The date exactly as printed goes into the CSV.
- Every label carries a precision mark: exact · about · before/after · window · not stated.
- Spans show their duration; computed durations get a \*; where sources differ, mark ≠.
- Titles of 40 characters or fewer. English first; Tamil after.

## 12. Return formats (CSV)

- **Events:** `ref, row, lane, date_as_printed, sort_year, precision(exact|about|before|after|window|not_stated), tier(1-4), title_en, scripture, series(g,c,r,n,v,w,m), source_ref, image_hint`
- **Reigns:** `kingdom(judah|israel|united), king, start_as_printed, end_as_printed, start_year, end_year, length_as_printed, source_ref`
- **Spans:** `label, start_year, end_year, duration_as_printed, computed(bool), form(exact|ongoing|unknown), row, source_ref`
- **Series data:** `series, year, value, kind(peak|average|total), status(confirmed|approx), source_ref`
- **Paired fulfilments:** `pair_id, event_a_ref, event_b_ref, scripture, relationship_wording, source_ref`
- **Journeys:** `journey_id, order, place_name, modern_name, lat, lon, scripture, note`
- **Bible books:** `book, abbr, writer, place_written, completed_as_printed, completed_year, time_covered, source_ref`
- **Images:** `slot_id, file_name, source_url, publication_ref, caption_en, credit`
