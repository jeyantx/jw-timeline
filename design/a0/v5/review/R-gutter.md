# R-gutter: left gutter panels (x 20–190, y 200–540)

Shots: /tmp/sw-gutter-all.png (20,200,170,340 @6), /tmp/sw-gutter-1.png, /tmp/sw-gutter-2.png, /tmp/sw-gutter-beasts.png, /tmp/sw-gutter-beasts2.png, /tmp/sw-gutter-14ce.png.
All panel code is in `a0v5/draw2.js`: `drawCalendar` (l.205), `drawCollage` (l.190), `drawDaniel2` (l.195), `drawBeasts` (l.178).

Most visible first.

1. **(64, 388) A stray "14 C.E." shows in the "1914 · the Kingdom" photo.** The picture carries its own printed date, and the round crop cuts off the "19". At 1:1 it reads as a wrong date next to the "1914" caption. Cause: image crop/focus for slot `story-6`. Fix: refocus or crop the date out, or pick another image. **FIX-IMAGES**

2. **(50–102, 330–436) Collage captions sit on top of the photos.** Each caption is placed at `y+r-3.6` / `y+r-1`, which is inside the circle. At Z=6 "Abraham", "David", "Jesus baptized", "Jesus dies" and "The future" are dark text on dark, busy photo areas, so they are barely readable, and the halo does not help. Fix: move both lines below the circle (`y+r+2.5`, `y+r+5`); the spacing between circles allows it. **FIX-PANELS** (`drawCollage`)

3. **(36, 523) Daniel 2, God's Kingdom row: "1914 → crushes all; stands forever" overstates the source.**
   - The CSV (confirm_bible "Stone 1914") says the stone is cut out in October 1914 and strikes the feet at Armageddon, in the future.
   - Its note: the stone "crushes only the kingdoms pictured by the image" (w12 box p. 17).
   - Suggest "1914 → crushes the image at Armageddon; stands forever", or similar wording from the source.

   **FIX-PANELS** (`drawDaniel2` rows), wording **OWNER**

4. **(65, 499) Daniel 2, Rome row: "30 B.C.E. → fragments 5th cent." gives an end, but the source gives no end date.** confirm_bible.csv is "corrected: from 30 B.C.E.; end not dated", with the display text "Rome from 30 B.C.E. · iron (no end date)". Fix: "from 30 B.C.E. · Da 2:40". **FIX-PANELS**

5. **(65, 516) Daniel 2, Anglo-America row: "WWI (1914–18) → Armageddon".** The CSV display form is "from 1914–18". The "WWI" abbreviation is not in the source. Suggest "from 1914–18 → Armageddon". Minor. **FIX-PANELS**

6. **(47–53, 512–518) The stone sits on the Anglo-America leader line.** The leader runs x 47–60 at y 513 and the stone is circle (50,515) r3, so the line runs straight through it. The God's Kingdom leader (y 525) then points at empty space under the stone. Fix: put the stone at about (50,524) on its own row, with the strike lines and rays aimed at the feet; or start the leaders at x 54. **FIX-PANELS**

7. **(40–47, 454–525) The Daniel 2 leader lines don't reach the figure.** They start at x 47, but the head ends at x 40.6 and the legs at x 41. That leaves a 1–6 mm gap, so the rows look detached from the body parts. Fix: start each leader at the right edge of its body part. Minor. **FIX-PANELS**

8. **(149, 330); leopard at (172, 316) The goat (Da 8:21) is mis-dated.** It is drawn at −250, which is later than the leopard at −300 and after Alexander's death.
   - The CSV says the he-goat's great horn is Alexander: king 336, Gaugamela 331, died 323 B.C.E.
   - The icon should sit at about −333, before the leopard.

   **FIX-PANELS** (`drawBeasts` array B)

9. **Beast icons: no identification anywhere.** Each icon carries only its scripture reference (Da 7:4, 7:5, 7:6, 8:20, 8:21, 7:7, 7:8). Nothing says "lion = Babylon", "bear = Medo-Persia", "leopard = Greece", "ram = Media and Persia", "goat = Greece / Alexander", "fearsome beast = Rome" or "small horn = Britain → Anglo-America", and there is no legend for them. All of these are in confirm_bible.csv "Daniel symbols". At 2 mm the icons are also hard to read: the leopard looks like a face, the goat like a gauge and the ram like a moustache. Fix: add a short identification to each label (e.g. "Da 7:6 · Greece"), or add a small key under the Daniel 2 panel (there is free space at y 530–550). **FIX-PANELS** / **OWNER**

10. **Small horn (Da 7:8) placed at 1900.** The CSV says Britain grew to prominence (17th–18th century, no year) and Anglo-America dates from World War I. 1900 matches neither. Suggest about 1914, or anchor it to the WWI marker. **OWNER**

11. **(84–90, 206–213) The calendar's Nisan festival line crowds the Adar header.** "14 Passover · Unleavened Bread 15–21 · …" (y ≈ 210, x 73–139) sits about 2.6 mm above "ADAR · Feb–Mar" (y ≈ 212.6, x 66–84) and overlaps it horizontally by about 10 mm, so the two blocks read as one. Fix: push the Nisan block up 1.5 mm (its `oy` is −10.5) or shift the Adar block down. **FIX-PANELS** (`drawCalendar`)

12. **(88, 268–275) The Chislev and Heshvan label blocks touch.** "25 Festival of Dedication" ends about 3 mm above "HESHVAN (Bul) · Oct–Nov", so the festival line looks as if it belongs to Heshvan. Give Heshvan (i = 7) extra downward `oy`, or Chislev more upward. **FIX-PANELS**

13. **Calendar festival text uses mixed formats.** The source (calendar_b15.csv) always puts the day first: "15-21 Unleavened Bread", "15-21 Festival of Booths", "14, 15 Purim". The sheet prints "Unleavened Bread 15–21", "Festival of Booths 15–21" and "Purim 14–15" next to "14 Passover" and "16 Offering of firstfruits". Cause: the `f[1].includes(String(f[0]))` branch in `drawCalendar`, or the strings in data.js. Make it "15–21 Unleavened Bread", "15–21 Festival of Booths", "14, 15 Purim". **FIX-PANELS** / **FIX-TEXT**

14. **(106, 231) Overlapping Nisan festival dots.** The dots for days 14, 15 and 16 sit about 0.4 mm apart with r = 0.8, so they show as two blobs. Tishri 10/15 (about 1.3 mm apart) also touch. Options: draw a range as one short arc (15–21) instead of a dot, or offset dots radially. Minor. **FIX-PANELS**

15. **Calendar wedge names are abbreviated.** They read "CHIS." and "HESH." while "SHEBAT" and "TEBETH" are spelled out. Cause: `nm.length>6`, which also catches the parenthetical names. Both "Chislev" and "Heshvan" (7 chars) fit at 2.2 mm in a 12 mm wedge: allow 7 chars. Minor. **FIX-PANELS**

16. **(88, 325) The Abraham photo doesn't match its reference.** The image is Abraham looking at the stars (the Ge 15:5 promise), but the caption cites Ge 22:2 (the offering of Isaac). Either change the reference to "Ge 15:5" (and the caption if needed) or swap the image. **FIX-IMAGES** / **OWNER**

17. **Legend "festival day" dot (27, 217.5).** It has no dark stroke, unlike the wheel dots (`stroke #7a5a00`), so it looks paler than what it explains. Trivial. **FIX-PANELS**

## Checked OK

- **Month order and seasons:** clockwise from Nisan at the top. Dry season = Iyyar–Elul and rainy = Tishri–Nisan, matching the CSV weather lines.
- **Months:** month and Gregorian pairs, crops, weather, Tishri's 4 festivals, Sivan Pentecost 6, Iyyar Late Passover 14, Chislev 25 Dedication and the Veadar note ("added 7 times in 19 years") all match calendar_b15.csv.
- **Daniel 2 dates:** Babylon 607→539, Medo-Persia 539→331 and Greece 331→30 match confirm_bible.csv, and the metals and body parts are correct.
- **Beast identities and placement:** lion −575 (Babylon), bear −430 (Medo-Persia), ram −470, leopard −300 (Greece) and fearsome beast at 60 (Rome) fall inside the right empire spans. Ram and bear order on row 2 is correct.
- **Collage layout:** the circles do not overlap each other, and the collage clears the left-turn loop by more than 8 mm.
- **Clipping:** no panel clips at the gutter edge (x 20).
