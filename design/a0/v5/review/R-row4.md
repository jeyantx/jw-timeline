# R-row4: Row 4 review (1870–2026, right-to-left, x 295–1040, y 485–630)

Shots: `/tmp/sw-row4-0.png` (x 295–550), `-1.png` (545–800), `-2.png` (795–1050), `-L.png` (270–360), `-1914.png` (850–910 at Z=10), all y 485–630 at Z=5.
Most visible first.

1. **1914 pill pile-up.** x 880–897, y 538–585: three or four white span-pills (1914 Three and a half times, 1914– Christ's presence, last days, harvest) are drawn on top of each other. The result is a blob of rounded rectangles. It also hides the middle of the "2,520 · SEVEN TIMES" badge, which reads "2,52▮EVEN TIMES" (x 885–910, y 543). Cause: `draw.js`, span-pill drawing for events sharing x ≈ 1914.75–1914.95, which has no lateral offset. The badge sits under the pills in z-order. **FIX-STRUCT**

2. **Relay bar labels overprint.** x 325–345, y 577: the "Enjoy Life Forever! →" label (bar 2021–2026, only ~22 mm long) runs over the "Bible Teach" bar label, so it reads "Enjoy Teach…". Short final bars need the label outside the bar, or clipping. Cause: relay/period bar drawer in `draw.js` (data in `data.js` line 219). **FIX-STRUCT**

3. **"(1938–1938) 2,300 evenings and mornings … year not stated".** x 765, y 588. The data is "June 1 or 15, 1938, to October 8 or 22, 1944" (b12-0082), so the label should read 1938–1944. The parser takes the "or" day as the end and then falls back to "year not stated". The same bug is visible at "(303–303) Diocletian" and "(31–32) … year not stated" on row 3. Cause: `draw2.js` `yrOf`. **FIX-LABELS**

4. **Growth milestone badges are a year early.** "1 lakh · ≈1940" (x 735, y 535), "10 lakh · ≈1962" (x 640, y 534), "50 lakh · ≈1994" (x 465, y 534). `growth_milestones.csv` and the growth data say 100,000 in **1941** (jv), 1,000,000 in **1963** (jv), and 5,000,000 in **1995** (1994 = 4,914,094). The badge also contradicts the "1963 Witnesses exceed one million" event label just below it. Cause: `draw2.js` ~line 177 does `Math.round(cross(v))` on an interpolated crossing. It should use the first data year where value ≥ threshold. **FIX-PANELS**

5. **Tier-1 1914 events have no labels.** "Appointed times of the nations end" (b10-0001) and "God's Kingdom born in heaven" (b10-0002) are both tier 1 and present in `real.js`, but neither is printed anywhere in the 1914 cluster. "Christ's presence", "last days", "harvest season" and "Three and a half times" are all printed. Several tier-2 dots also have no label: around x 370–385 (2009–2012: midweek meetings, overlapping generations, metropolitan witnessing, Bayatyan, jw.org 2012, faithful slave 2013), and around 1914 (Photo-Drama, Satan hurled), 1938–1943 (Lovell, theocratic appointments, Neutrality, Cantwell, Murdock, Barnette) and 1884 (Society chartered). Tier 1 must never be dropped. Cause: `drawEvents` placement budget. **FIX-LABELS**

6. **Corrected modern events missing entirely.** All are in `timeline.json` as tier 3/4, so the build filters them out:
   - MEPS 1979 (b20-0008)
   - GB members leave boards, Oct 7 2000 (b20-0011)
   - JW Library, Oct 2013 (b20-0015)
   - C. T. Russell dies, Oct 31 1916 (b8-0101)
   - Knorr president, Jan 13 1942 (b8-0238)
   - WBBR, Feb 24 1924 (b8-0148)
   - Listen to God 2011 (b20-0014)
   - Study edition, Oct 2015 (b20-0017)
   - jw.org in 1,000 languages, Nov 4 2019 (b20-0018)
   - Ministry by phone and letter, Mar 2020 (b20-0019)
   - House-to-house resumes, Sept 1 2022 (b9-0411)
   - NWT in 350 languages, Aug 21 2026 (b20-0022)

   `confirm_modern.csv` exists to put these on the sheet. Promote them via `a0_sheet.json` / `a0_extra.json`. The 2017–2026 stretch is especially thin. **FIX-FILL / OWNER**

7. **Stone arc crosses labels.** x 820–890, y 500–530: the dashed gold "stone" arc passes through the text of "1931 Name Jehovah's Witnesses adopted" and "1919 The 1,290 days of Daniel 12:11", then lands on the 1914 arrow (x 891, y 535). Either route the arc above the label band, or give the labels a halo or paper backing. Cause: `draw2.js` stone/arc. **FIX-PANELS**

8. **Ban in Germany bar crowded.** x 726–760, y 533–541: the "1 lakh · ≈1940" badge and the 2,300 D ruler with its tag sit on top of the "Ban in Germany · 12 yrs" bar text. Above it, "April 17–18, 1943 Theocratic Ministry School" (y 522–530) touches the "World War II · 6 yrs" bar. Cause: period bars at y ≈ O.c / O.c2 collide with the O.v2 ruler lane and the growth badge. **FIX-STRUCT / FIX-PANELS**

9. **Day-ruler lane shares the growth curve.** x 830–900, y 539: the green peak-publisher line and its dots run straight through the 1,335 D, 1,290 D and 1,260 D rulers and their badges, which hurts legibility. Move the ruler lane (`O.v2`, `draw.js` line 49) or start the green curve below it. **FIX-STRUCT**

10. **1,290 D ruler starts too late.** It starts at 1919.4, but the data says "January 1919 to September 1922" (b12-0075). It should start at about 1919.05. `draw.js` line 49 hard-codes `[1919.4,1922.7,'1,290 D']`. The other rulers check out: 1,260 D = Dec 1914–June 1918, 1,335 D = Sept 1922–May 1926, 2,300 D = June 1938–Oct 1944. **FIX-STRUCT**

11. **Relay years vs `study_books.csv`** (data in `data.js` line 219):
    - "“Truth…”" 1943–1946 (x ~725–740): research says no jw.org page calls it the main study book, and the kr and w22.07 lists skip it. Recommend dropping it, which lets Harp of God run to 1946.
    - "Let God Be True" ends 1968, but the source says "mid-1960's".
    - Divine Plan (1886–1921), Harp (1921–1943), Live Forever end 1995, and Bible Teach end 2021 are all "not stated" or inferred.
    - The simplified *What Can the Bible Teach Us?* is missing; it is in the w22.07 relay.

    The bar's hard ends imply precision the sources don't give. Consider fading the ends. **OWNER**

12. **Left-end bars bleed into the future box.** x 296–346, y 531–537: "Ban in Russia · ongoing" runs left past the "//" break and across the dashed future-box border. "HQ Warwick · →" (y 579) does the same. Clip them at the row start, x ≈ 300. Cause: `draw.js` period bars for 'fade' items. **FIX-STRUCT**

13. **Pioneer axis value unreadable.** Left axis, x 295–300, y 553: the label "17,43,567" is overprinted by the red and orange series lines and reads "?7,49,5??". The other three end values (92,05,326 / 1,19,652 / 76,03,182) are legible. Cause: `draw2.js` growth band end-labels (line ~168). **FIX-PANELS**

14. **Right-end legend labels struck through.** x 1000–1030, y 557 and 567: "PIONEERS (avg.)" and "BIBLE STUDIES (avg.)" have the red and gold lines running through them. "PEAK PUBLISHERS · log" and "CONGREGATIONS" are clear. They need a paper backing or a y offset. **FIX-PANELS**

15. **Duplicated year.** x 300–330, y 520: "2025 2025 Memorial attendance report". The year chip and the title both carry 2025. Fix in `short_titles.json`. **FIX-TEXT**

16. **Inconsistent date meta.** b9-* items print "2013, October 5", "1950, August 2", "2014, October 6". b8-* items print "July 26, 1931", "May 31, 1935", "April 23, 1900". Normalise to "October 5, 2013" style. Cause: `build_a0_sheet.py` meta passthrough. **FIX-FILL / FIX-TEXT**

17. **Indian number units on the EN sheet.** "50 lakh / 10 lakh / 1 lakh" badges and axis values like "92,05,326" use `en-IN` grouping (`draw2.js` line 244 `fmt`). Is that intended for the EN edition (TA audience)? English readers will expect "5 million" or "9,205,326". **OWNER**

18. **Unexplained "Da 7:8" horn icon.** x 938, y 547: a little-horn icon is placed at 1900. Data has "Anglo-America rises 1763" and "Anglo-American world power 1914–1918" (b12-0066, tier 1), so 1900 matches neither, and the icon sits alone mid-track with no label. Either anchor it to 1914 or explain it. `draw2.js` `drawBeasts` hard-codes `[1900,'horn','Da 7:8']`. **OWNER / FIX-PANELS**

19. **Leader lines cut through label text.** x 865–870, y 583–592: 1919 leaders pass through "1922 The 1,335 days of Daniel 12:12". Similar at x 905 through "1914–early 1919 Spiritual temple". **FIX-LABELS**

20. **Near-collision with the legend.** x 972–1020, y 610–616: "1876 Russell points to 1914 / October 1876 · Lu 21:24" sits about 1 mm above the "HOW TO READ" legend box (top ~y 615, x ≥ 1000). **FIX-LABELS / FIX-MAP**

21. **Near-collision with the map panel.** x 300–355, y 610–618: "2015 'Our Christian Life and Ministry' 2015, October 3" sits about 1–2 mm above the "THE GOOD NEWS REACHES THE EARTH" panel top. **FIX-LABELS / FIX-MAP**

22. **Russia-ban label against the photo.** x 347–385, y 517–524: the second line, "Jehovah's Witnesses", butts against the bottom of the "2013 Revised NWT" photo circle (x 366–386, y 501–521). **FIX-LABELS / FIX-IMAGES**

23. **Future path crosses labels.** x 280–330, y 495–500: the dashed gold future path runs just over the "2021 Enjoy Life Forever! released" label. **FIX-PANELS**

24. **HQ Brooklyn label off-centre.** The "HQ Brooklyn · 107 yrs" label sits at the far 2016 end, x ~353. That is fine, but the bar is unbroken for 107 years while Allegheny shows "25 yrs". Both are consistent with the data; no action needed.

Checked OK:
- Dates match `confirm_modern.csv`: 1876 (Oct), 1879 (July), 1925 Birth of the Nation, 1943 TMS (April 17–18), 2014 JW Broadcasting (Oct 6).
- 2013 Revised NWT (Oct 5) and 1984 Reference edition are in the right order.
- The stone arrow lands exactly at 1914.
