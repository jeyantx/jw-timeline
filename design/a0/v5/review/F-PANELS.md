# F-PANELS: what I fixed (draw2.js, non-label functions)

All changes are in `a0v5/draw2.js`. Each one was checked with `tools/shot.sh`.

## Opening (`drawTop`)
- The throne hatch and its gold rim are drawn only when there is no throne image, so the photo fades into the glow with no hard rim.
- The rays are capped so they no longer reach the Day 5/6 medallions (downward) or the WORD station (rightward).
- The pre-creation medallions moved from HX 94/122/150/178 to 94/120/146/172. "formless and desolate" no longer runs onto the gold line at x 188.
- The Eden hatch is drawn only when there is no image. A visible caption "THE GARDEN OF EDEN · Ge 2:8" now sits at the bottom-left of the strip, on the Day 7 line.
- The Day 7 scriptures now come from record b21-0011: "Ge 2:1-3; Heb 4:1-11".
- "JEHOVAH, THE CREATOR" went from 2.9 to 4 mm.

## Future (`drawFuture`)
- "THOUSAND YEAR REIGN" is no longer clipped. I removed "· 1,000 YRS", lengthened the band, set the font to 2.4 and centred the text.
- The paradise hatch is drawn only when there is no image.
- The path's outer edge line stops at y 662, so it no longer cuts across the photo's sky.
- The milestones are spread over 60 mm starting at y 587, so the last one clears the photo.
- I dropped the meta prefix "F-xx · future ·". Each meta line now shows only the scripture.
- West labels clear the big glyphs (offset 4.6 instead of 3).
- Bold emphasis now goes by title (Great tribulation, Thousand Year Reign begins, Earthly resurrection), not by fixed index.
- The rail fade uses 16 steps instead of 6, so it no longer looks like a staircase.

## Stone (`drawStone`)
- The paper pill covered row 3 labels. It is gone. The label now sits beside the rock in two lines: "THE STONE · Da 2:34, 44" / "cut out in 1914 → strikes at Armageddon".
- Added an "ARMAGEDDON · Re 16:16" tag at the lens (x 209, y 543), so the lens is named.

## Calendar (`drawCalendar`)
- VEADAR was drawn as a 13th wedge on top of NISAN, and its label overlapped Nisan's. The wheel now has 12 wedges; Veadar stays in the legend note.
- Long crop/weather lines on the side labels wrap to two lines. This fixes the Tebeth line running past the margin to x 14, and the Shebat line hitting the legend.
- Chislev is lifted so its festival line no longer touches Heshvan, and Nisan is lifted 1.5 mm.
- Month names up to 7 letters are spelled out (CHISLEV, HESHVAN).
- Festival text is now day-first, as in the source: "15–21 Unleavened Bread", "14–15 Purim".
- Festival dots on nearby days are staggered by radius.
- The legend dot has the same stroke as the wheel dots.
- The text floor is now 2.2 mm.

## Collage (`drawCollage`)
- The captions were hidden under the photos. They now sit below each circle. The layout is two staggered columns (x 42 / 86, r 13), 5 mm further from the curve.

## Daniel 2 (`drawDaniel2`)
- The Anglo-America leader no longer runs through the stone, and the God's Kingdom leader now goes to the stone.
- The leaders start at the edge of each body part.
- The wording follows the source: Rome "from 30 B.C.E."; Anglo-America "from 1914–18 → Armageddon"; Stone "1914 → crushes the image at Armageddon; stands forever".

## Counts panel (the `mini` helper in `drawTop`)
- Series that start before 1919 (Memorial 1899, Lands 1900, Branches 1900) were drawn outside the chart, on top of the neighbouring charts. Each chart's axis now starts at its first data year.
- The "awaiting research" placeholder is gone.
- Gaps longer than 5 years are drawn dashed.
- Dense series use 0.5 mm dots.
- An approximate last value gets "≈".
- Values are 3.2 mm, titles 3 mm, axis years 2.4 mm. Charts are 17.5 mm tall. Memorial vmax is now 2.4e7.
- The lakh format shows 2 decimals below 10 lakh (3.05 lakh).
- The subtitle source now reads "jw.org Service Year Reports and Yearbooks".

## Growth bands (`drawGrowth`)
- The band names and end values moved to the top layer with a halo, so PIONEERS, BIBLE STUDIES and 17,43,567 are no longer struck through by the rails.
- The milestone tags show the first reported year that reaches the value (1941, 1963, 1995) instead of "≈" interpolated years. Their dots sit at those years.
- The tags sit below their points, clear of "Ban in Germany" and the 2,300 D ruler.

## Beasts (`drawBeasts`)
- Each icon now has its identification under the scripture: Babylon, Media and Persia, Medo-Persia, Greece, Rome, Britain.
- The goat moved from −250 to −333 (Alexander).
- Where the red line is above the main line (rows 3 and 4), the caption goes above the icon, so "Da 7:7" no longer sits on the station line.

## Arcs and captions (`drawArcs`, `drawCaptions`)
- The Ezekiel → 332 arc now ends at the station's real place on the loop, not on the Tyre label.
- The green "messianic" arcs are **hidden**. Their targets were round-robin, so they drew links that are not stated in the data (R-human #1). Restore them once explicit prophecy → fulfilment pairs exist.
- The death-day violet triangle now sits on Nisan 14 (33.235 + 6.5/9 × 0.025).
- The row 1 caption starts at x 193 or later, clear of the gold line's halo.

## Left / for the owner
- **OWNER:** "Near:" wording in the intro (x 200, y 68).
- **OWNER:** the small horn icon is at 1900, which matches no event in the data.
- **OWNER:** future milestone order and wording (R-future #1, #6, #12, #13).
- **OWNER:** Day 7 as an open bar.
- **OWNER:** one shared x-range for the counts charts.
- **OWNER:** the empty top-centre and top-right areas.
- **Not done:**
  - Isaiah → 539 and Jeremiah → 537 magenta lines nearly coincide (x 475).
  - The magenta arcs cross the prophet bar labels.
  - Era captions are not enlarged: their 4.2 mm size is also used in FIX-LABELS's rect reservation.
  - The violet rulers have no end years (draw.js).
  - The direction chevrons are not enlarged (they are in drawEvents).
- **Other owners:**
  - The study-book relay overlap ("Enjoy Life Forever!" / "Bible Teach") is in draw.js.
  - `drawEvents` line 52 still reserves the row 1 caption at the old x; it is about 3 mm off at most.
