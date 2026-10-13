# Research return: A0 wall chart (reply to `A0_RESEARCH_REQUEST_FINAL.md`, 14 Oct 2026)

All data comes from **wol.jw.org / jw.org only**, and every row carries its source (publication + docid, and a URL where one exists). Dates are given **exactly as printed**. Where jw.org gives no year, the value is `not_stated` and nothing is guessed. Tamil text appears only where a Tamil jw.org page exists; nothing is machine-translated. **Two editions** (English sheet, Tamil sheet) are decided.

## Files (CSV, UTF-8)

| File | Request § | Contents |
|---|---|---|
| `events.csv` | 3, 6, 12 | All 2,077 records. `poster=True` marks the **659 tier 1–2 records** for the chart. Columns: `ref` (stable id), `row`, `lane`, `date_as_printed`, `sort_year`, `precision`, `tier`, `title_short_en` (≤ 40 chars), `title_en`, `title_ta`, `scripture`, `series`, `source_ref`, `url`, `image_hint` |
| `spans.csv` | 12 | 284 spans (reigns, lifespans, prophets, periods, world powers, prophetic periods) with start/end as printed, duration, `computed`, `form` |
| `reigns_check.csv` | 3 | Every king of Judah and Israel, plus Saul, David and Solomon, as printed in NWT App. A6. A6 prints only accession year and length, so each end year is the successor's accession. Notes give Insight differences |
| `confirm_bible.csv` | 4 | Opening, Turn 1, Daniel 2 panel, Daniel 7/8 symbols: status confirmed / corrected / not_found, wording ≤ 40 chars, quote, source |
| `confirm_modern.csv` | 4 | Turn 3 and Row 4 items, same columns |
| `study_books.csv` | 4 | The study-book relay |
| `calendar_b15.csv` | 4 | App. B15 months, the weather line, crops, festivals (English + Tamil) |
| `bible_books.csv` | 4 | All 66 books: writer, place written, completed, time covered (NWT study edition table; Tamil included) |
| `growth.csv` | 5 | 781 yearly values in 13 series, each with `kind` (peak / average / total / running_total) and `status` (confirmed / approx / derived) |
| `growth_milestones.csv` | 5 | Threshold years (10 … 9 million publishers, and others) |
| `pairs.csv` | 7 | Paired fulfilments: stated / not_stated / withdrawn |
| `journeys.csv` | 8 | 14 journeys, 160 stops, in order. lat/lon are blank (see below) |
| `map_sources.csv` | 8 | 33 jw.org maps to follow for the outlines and routes |
| `images.csv` | 10 | Image slots: source URL, publication, caption, credit. The image files are delivered separately |

**Row and lane values:** `opening`, `row1` (→1200 B.C.E.), `turn1`, `row2` (997–332), `turn2`, `row3` (2 B.C.E.–1700), `turn3`, `row4` (1870–2026), `future`. Row 2 lanes are `judah`, `israel`, `prophet`, `nations` and `books`.

**Series codes:**

| Code | Series |
|---|---|
| g | promised offspring |
| c | covenants |
| r | world powers |
| n | kings of the north and south |
| v | Daniel's time prophecies |
| w | wheat and weeds |
| m | Messianic prophecies |
| **p** | **prophecies about nations** (our proposal: the request lists 8 series but only 7 codes) |

**Precision values:** `exact`, `about`, `before`, `after`, `window` (between two dates), `not_stated`, `ongoing`.

## §3 Divided kingdom to the exile

- **76 new events**: Judah 24, Israel 13, prophets 23, nations 16. With the existing records, Row 2 now has **111 poster records** (target about 115).
- About 55 events have no printed year. Each is a `window` point inside its king's reign bar.
- **Reign differences (A6 vs Insight):**
  - Asa 978/977
  - Jehu c. 905/c. 904
  - Menahem c. 791/790
  - Uzziah to 777/778
  - Ahaz 762/761
  - Manasseh to 661/662
  - Josiah to 628/629
  - **Jehoahaz of Israel: 14 years in A6, 17 in the Insight chart**

  A6 is used as primary.
- **No year printed:**
  - Jehoiakim burns the scroll: window 625–624.
  - Isaiah 44:28 naming Cyrus: window c. 778 to after 732.
  - The siege of Tyre begins.
  - Sennacherib's death.
- The temple timeline is already in the data: foundation 536, ban 522, resumed 520, completed 515.

## §4 Corrections to items the design shows

**Bible**
- **Anglo-America:** begins **during World War I (1914–1918)**, not 1763 (NWT App. B9; *w12* 6/15). The 1763 date in the Daniel book was replaced in 2012.
- **Rome:** begins 30 B.C.E. **No end date is published.** *w12* says the empire "began to fragment" in the 5th century C.E. B9 marks Rome only at 63 B.C.E. and 70 C.E. Suggested label: "Rome 30 B.C.E. →, fragments 5th cent.; Britain rises".
- **Saul dies:** *c.* 1078, so the date is "about", not exact.
- **Ark to Jerusalem:** printed **"a. 1070 B.C.E."** ("All Scripture" Study 3).
- **Solomon asks for wisdom:** no year is printed. Drop "c. 1037", or show it as a window from 1037 to 1034.
- **Not stated** (keep as `not_stated`): Samuel called, Samuel anoints David, Bath-sheba, Absalom, the Queen of Sheba.
- **Day 4:** "Luminaries become discernible". Insight says the sun, moon and stars were created at Ge 1:1.
- **Day 7:** still continuing. The Thousand Year Reign is "evidently part of" it, so draw an **open bar**.
- **Ge 1:2:** the current NWT reads "**formless and desolate**".
- **B15 wheel:** B15 prints **no season labels and no scriptures**. Use its weather line.

**Jehovah's Witnesses**
- **Grew / Stetson / Storrs:** printed **"Mid-1800's"**, not 1835–1845. Dated steps: Grew's pamphlet c. 1835, Storrs reads it 1837, resigns 1840, gives his lectures in spring 1842.
- **MEPS:** **1979**, when development began (not "c.").
- **JW Library:** **October 2013**, released at the annual meeting.
- **Oct 2000:** **October 7, 2000**: Governing Body members "stepped aside from the boards of directors".
- **Study edition, Oct 2015:** Matthew only, in English.
- ***Listen to God*, 2011:** two brochures.
- **"Public ministry resumes Sept 2022":** 1 Sept 2022 was **house-to-house**. Public (cart) witnessing resumed earlier, on 31 May 2022.
- **Confirmed:**
  - 1876 (Russell's article in the October 1876 *Bible Examiner*)
  - 31 Oct 1916
  - Mar 1925
  - Jan 1942
  - WBBR Feb 1924
  - Theocratic Ministry School 1943
  - *Theocratic Aid* 1945
  - Reference Bible 1984
  - JW Broadcasting Oct 2014
  - 1,000 languages on 4 Nov 2019
  - March 2020 letters and phone
  - **NWT in 350 languages on 21 Aug 2026**
- **Study-book relay:**
  - ***Let God Be True***: from 1946 to the **mid-1960s**.
  - ***Truth*** book: 1968–1982.
  - ***Live Forever***: 1982; the end is not stated.
  - ***Knowledge***: 1995–2005.
  - ***Bible Teach***: 2005; the end is not stated.
  - ***Enjoy Life Forever!***: January 2021, still in use.
  - ***The Truth Shall Make You Free***: no jw.org page calls it the main study book. Suggest dropping it.
  - **Missing:** ***What Can the Bible Teach Us?***, which *w22.07* lists in the relay. That article also has relay artwork.

## §5 Growth data

| Series | Coverage |
|---|---|
| Peak publishers | 1914–2025. No peak printed for 1956, 1966, 1967, 1971, 1979 (an average-publishers series fills those) |
| Congregations | From 1940; no world count was kept before 1938 |
| Average pioneers | From 1909. Categories change over time (see notes): auxiliary pioneers are included 1991–2004 and separate from 2005 |
| Average Bible studies | From 1945 |
| Memorial attendance | From 1899 (*Proclaimers*: early figures incomplete) |
| Lands | Two series: consistent recount by today's borders, and counts as reported at the time |
| Baptized | From 1949 |
| Branch offices | From 1900 |
| NWT languages | 1950–2012 from the *Kingdom Rules!* box, then dated statements up to **350 (Aug 2026)** |
| jw.org languages | 2012–2023. **No jw.org source found for "Dec 2023 = 1,084"**, so please remove it or mark it unconfirmed |

**Milestones:**
- **Stated by jw.org:** 100,000 publishers (1941) and 1,000,000 (1963).
- **Derived from the yearly figures:** 10,000 (1920–22), 5 million (1995) and 9 million (2024).
- **Not stated:** 10, 100 and 1,000.

## §6 Missing events

**Bible:** every candidate was already in the data:
- Isaac marries 1878
- Jacob renamed c. 1761
- both Passovers
- John the Baptist 29
- the Memorial
- Matthias
- the council c. 49
- Paul's letters

The tree dream (Da 4) has no year printed.

**New for the opening sequence:** the Word, the angels, heavens and earth, Days 1–7, the disobedience in Eden ("after 4026", App. B1), and the Daniel 8 vision.

**Jehovah's Witnesses, new:**
- Operation North 1951
- Yankee Stadium 1953
- Gilead to Patterson, April 1995
- 2010 "this generation"
- JW Library 2013
- complete NWT in American Sign Language 2020
- *Enjoy Life Forever!* 2021
- sign-language milestones

Already present: 1881, 1917, 1919 *Golden Age*, 1938, 1958, 1971–72 elders, and the Eastern Europe ban removals.

## §7 Paired fulfilments

The rule comes from *w15* 3/15 "Questions From Readers": a type is applied only where the Scriptures clearly apply it.

- **Stated, so draw these:**
  - 66 C.E. → start of the great tribulation
  - 70 C.E. → Armageddon (*w13* 7/15)
  - Joel 2:28 → Pentecost 33
  - Babylon 539 → Babylon the Great, 1919
  - Eze 37: 537 → 1919 (*w16.03*)
  - Da 4 tree → 1914
  - Re 11: late 1914–1919
  - Passover → Christ
  - Melchizedek → Jesus
- **Not stated, so don't draw these:**
  - a dated modern fulfilment of Joel 2:28
  - Isa 2 / Mic 4 paired with 537
- **Withdrawn:**
  - Jerusalem 607 as a type of Christendom
  - Joel's locusts as Witness preachers

## §8 Map

- **jw.org draws routes for:**
  - Paul's four journeys (NWT B13, the study edition's Acts maps, *See the Good Land* pp. 32–33)
  - Abraham (Insight and *See the Good Land* p. 7)
  - the Exodus (B3 "possible route"; B3 **does not number the stops**, so ours follow Numbers 33 order)
- **Only "possibilities":** return 537, Ezra and Nehemiah (one Insight map).
- **No jw.org route map:** the 607 exile, Jesus' family to Egypt, Naomi and Ruth. Their stops come from the Bible text.
- **lat/lon left blank:** jw.org publishes no coordinates. Please place stops from the maps listed in `map_sources.csv`.
- **47 places:** please send us the list, and we will return modern names, events and people for each.

## §9 Answers from the owner

1. **Station dot with no label:** first, tier-2 records whose fact a bar or stack already shows (book tabs, accessions). Next, tier-2 accounts whose year is not stated.
2. **Judges:** "order only" is fine. jw.org gives few judge dates.
3. **QR:** one QR in the legend is enough.

## §10 Images

See `images.csv`. The files are for personal and congregation use only, are not published, and are credited "© Watch Tower Bible and Tract Society of Pennsylvania".

**Coverage:** 63 of 66 slots are filled, 153 files in all (a primary plus up to 2 alternatives, `<slot_id>__alt1.jpg`).

**Resolution:** jw.org art mostly tops out at **1200 × 600 px**.
- `paradise`: the best found is 1200 × 1133 (*Enjoy Life Forever!* lesson 60, with a river and a path). The 312 mm print needs about 3,700 px, so it will need upscaling.
- `eden`: 1200 px wide against the about 1,725 px needed.
- `ev-bible-class-in-allegheny`: 900 px.

**Weak or stand-in images:**
- `creation-day-1…6`: the primary is one collage that needs cropping. alt2 has a separate image for each day.
- `story-1…7`: the B1 panels are only 120 × 229, so they are alt1. The primaries are 1200 px art in the same style from the "Bible's message" brochure.
- Daniel beasts: small chart icons only.
- Off-subject stand-ins:
  - `ev-gutenberg-bible`: an old Bible, not confirmed as Gutenberg.
  - `ev-isaiah`: a generic prophet.
  - `ev-saul-dies`: shows Saul rejected, not his death.
  - `ev-name-jehovah-s-witnesses`: the 1931 programme cover.
  - `pre-1`: the archangel with angels.
- **Do not use** `pre-3__alt1` or `ev-jerusalem-destroyed-70__alt2`: they carry a third-party credit line.

**None found:** `ev-tamil-new-testament`, `ref-daniel-ram`, `ref-daniel-goat`. Please draw these as icons.

