# R-future: Armageddon, the walking path and paradise (x 20–350, y 470–840 mm)

Reviewer: R-future · shots at Z=4–6 (`/tmp/sw-rfuture-1..7.png`) · 22:02

Truth used: `data/merged/timeline.json` future records (category `future.prophecy`; they run in `start.sort_key` order 100001–100017; sources are kr chap. 21, w15 7/15, w12 9/15, rr chap. 22) and `data/curation/a0_sheet.json` → `future` (12 items, emitted as `D.future` in real.js).

Most visible first.

1. **Chronology contradiction: events that come before Armageddon are drawn after it.** (x 85–205, y 588–605) The walking path starts at the Armageddon lens (x 205, y 555) and is "after Armageddon" (draw2.js comment, line 140). But the first 4 path milestones come *before* Armageddon in the data: Peace and security (sort_key 100001), great tribulation begins (100003), Gog's attack (100007), anointed gathered (100008). Armageddon is 100009. The row-4 bar "Great tribulation" (x 205–271, y 580) also shows the tribulation ending at Armageddon, so the sheet contradicts itself. Fix: move items 1–4 of the `future` list onto the row-4 future bed (x 205–300, which is empty, see #3). Keep the path for Marriage of the Lamb onward. Or relabel the path as "From the sign of the end into paradise" and start it before the lens. Cause: `data/curation/a0_sheet.json` `future`, plus `scripts/build_a0_sheet.py` line 102, which drops every `future*` record from `D.ev`. **OWNER** (decides the layout), then FIX-FILL / FIX-PANELS.

2. **"THOUSAND YEAR REIGN · 1,000 YRS" is clipped.** (x ~130, y 597–622) The textPath runs off the end of the short gold band. Only "THOUSAND YEAR REIG" is visible. The band (`mid`) only covers `ys[1]..ys[8]`, and the text needs more length. Fix: shorten the text to "THOUSAND YEAR REIGN", or lower the font from 2.6 to about 2.2, or widen the `mid` range to `ys[1]..ys[10]`. The band should also start at "Thousand Year Reign begins" (i=6), not at "Great tribulation begins" (i=1). Today the 1,000-year band covers the Gog attack and the gathering of the anointed, which happen before the Reign. draw2.js `A0.drawFuture` (`mid` / `tyrPath`). **FIX-PANELS**.

3. **The row-4 future bed is empty.** (x 205–300, y 534–576) It is a dashed "future" bed of about 95 × 42 mm with only the rails and the stone's dotted arc in it. The design data (data.js lines 189–194) had 6 future events here: Peace and security, Babylon destroyed, Sign of the Son of man, Gog, Anointed gathered, Armageddon. real.js only keeps Armageddon. The jw.org records that belong here are all `poster: true` and tier 1: b10-0009, b10-0010 (final sealing), b10-0011 (attack on Babylon, the tribulation begins), b10-0012, b10-0013, b10-0014 (Sign of the Son of man; sheep and goats judged), b10-0015, b10-0016. Cause: build_a0_sheet.py line 102 filters out `future*`. **FIX-FILL** (with #1).

4. **The F-numbers jump: Armageddon is "F-01", then the path starts at "F-07".** (Armageddon label at x 227, y 508; path labels at y 588–655) F-02 to F-06 do not exist on the sheet. The meta line `F-07 · future · 1Th 5:3` is an internal debug code, and "future" adds nothing in this zone. Fix: drop the `F-xx · future ·` prefix and show only the reference, as other panels do. Or number from the actual list. draw2.js line 153 (`const ref=\`F-${String(i+7)…`) and the label code that makes "F-01" for Armageddon. **FIX-PANELS** (path); **FIX-LABELS** (Armageddon meta).

5. **Armageddon itself is not on the path, and it is not emphasised in the sequence.** (x 205, y 555) The 12 curated items skip b10-0017 (War of Armageddon: the finale of the great tribulation, Re 16:14, 16). It appears only as a photo label at (227, 508), about 45 mm above the lens, in the row 3/4 gap next to Jesus-era labels ("Angels announce Jesus' birth" at y ~486). A reader can't tell that the lens at (205, 555) *is* Armageddon. Fix: put a small "ARMAGEDDON · Re 16:16" tag right at the lens, or a leader line from the photo to the lens. **FIX-LABELS / FIX-PANELS**.

6. **The order of the last three milestones does not match timeline.json.** (x 185–300, y 640–655) The sheet ends: Satan released (F-16), Satan and rebels destroyed (F-17), Christ hands Kingdom to God (F-18). timeline.json orders them b10-0023 "Christ hands the Kingdom back to his God and Father" (100015), then b10-0024 Satan released (100016), then b10-0025 destroyed (100017). The sources are rr chap. 22 and w12 9/15: the hand-over comes at the end of the 1,000 years, then the final test. Fix: reorder `a0_sheet.json` `future` to put "Christ hands Kingdom to God" before "Satan released; final test". **OWNER** (curation file; not in any fixer's keys).

7. **Hatch placeholder shows through the paradise photo.** (x 25–337, y 655–798) The `url(#hatch)` rect (opacity 0.5) and the "PARADISE ARTWORK" text are drawn under the photo. The photo is faded on all four sides, so grey diagonal stripes show in every faded margin, clearest at the left edge (x 25–40) and the bottom (y 785–798). It looks unfinished. Fix: skip the hatch and placeholder text when `D.img.paradise` exists. Or draw them only when there is no image, like the other slots that show grey circles. draw2.js line 160. **FIX-PANELS**.

8. **The path's outer edge slices through the sky of the paradise photo.** (from about x 190, y 660 to x 215, y 745) The path's right edge (`E`, a #b89b5e 0.5 mm line) and the sand fill run on down to y 745, under the faded image. Where the photo is sky, a thin brown diagonal line is visible crossing the clouds (shot 1, px 600–700 / py 600–680). Fix: stop or fade the `E` stroke and sand at about y 660, where the photo's top fade becomes opaque. Or lower the path end so it meets the photo's horizon (around y 740 in the photo) only on the land. draw2.js `A0.drawFuture` `pieces[1]`, and the `paradise` mask in index.html (top fade 32%). **FIX-PANELS** (path) / **FIX-IMAGES** (mask).

9. **The last right-side label touches the photo's top edge.** (x 185–245, y 650–655) The meta line "F-18 · future · 1Co 15:24-28" sits at y ~654.5, and the photo/hatch starts at y 655. The leader to "Christ hands Kingdom to God" also ends inside the fade. Fix: the spacing `589+i*(63/(n-1))` puts the last item at 652. Use a 60 mm spread, or start at 586. draw2.js line 151. **FIX-PANELS**.

10. **Left labels butt into the dotted glyphs.** (x 85–110, y 588–600) "1Th 5:3" (F-07) and "Attack by Gog of Magog" (F-09, a big glyph) end flush against the glyph rings. The west offset is a fixed `g[0]-3`, but big glyphs are larger. Fix: use `g[0]-(big?4.5:3.2)`. draw2.js line 154. **FIX-PANELS**.

11. **The "big" emphasis is arbitrary.** (path) `big=i===1||i===2||i===9` makes "Great tribulation begins", "Attack by Gog of Magog" and "Satan released" bold with big glyphs. "Thousand Year Reign begins" and "Earthly resurrection" stay plain. Fix: emphasise the beginning of the Reign and the resurrection (or tie emphasis to the list, not to hard-coded indexes). draw2.js line 152. **OWNER** / FIX-PANELS.

12. **Wording vs records** (mostly fine, minor points):
    - "Great tribulation begins" uses Mt 24:21. The record (b10-0011) is "Attack on Babylon the Great: the great tribulation begins", with Re 17:16 as the main text. Consider "Babylon the Great attacked; great tribulation begins · Re 17:16" (shorter: "Attack on Babylon the Great").
    - "Satan abyssed for 1,000 years": the record says "Satan *and the demons* …". Acceptable as a short form.
    - The Thousand Year Reign item uses Re 20:6; the record uses Re 20:4, 6.

    **OWNER** (curation `future` strings).

13. **Missing jw.org milestones that might replace weaker ones:** b10-0014 "Sign of the Son of man; Jesus judges the sheep and the goats" (Mt 24:30; 25:31-33) and b10-0010 "Final sealing of the anointed" (Re 7:1-3). Both are poster: true and tier 1. They belong before Armageddon (see #1/#3). **OWNER**.

14. **Empty space.**
    - (a) x 22–100, y 530–585: a blank paper block above the left labels and left of the path's top curve. It could hold the "AFTER ARMAGEDDON" heading or the Armageddon tag (#5).
    - (b) x 245–340, y 585–650: a wide blank area right of the right-hand labels, inside the sand fan. Fine for breathing room, but it could take the description lines that real.js has for these records.
    - (c) The future bed (#3).

    **OWNER / FIX-PANELS**.

15. **The rail fade-out is stepped, not smooth.** (x 183–205, y 553–563) The red, blue and black rails fade in 6 discrete dashes (`for k<6`), and the blocks are visible at Z=6 as a staircase of greys. Fix: use 12–16 steps, or a linearGradient stroke. draw2.js line 142. **FIX-PANELS**.

16. **The footer text is stale.** (x 25, y 818) "Wireframe v0.4 · round 3 · English edition" is on a v5 sheet. Fix: update it to the v5 / print wording. **FIX-MAP** (footer) / OWNER for the wording.

17. **The paradise side fade is very narrow.** (x 25–40 and x 322–337) The `paradise` mask is `LG('right',5)`, about 15 mm. Together with #7 the side edges read as a hard rectangle at A0 distance. Consider 10–12%. index.html line 106. **FIX-IMAGES**.

## Checked OK
- No text overlaps between path labels. The 12 items alternate left and right cleanly, with 5.7 mm pitch.
- All 12 `future` items map to real timeline.json records with jw.org sources (kr, w15 7/15, w12 9/15, rr 22, w22 9).
- The caption "PARADISE ON EARTH · Lu 23:43 · Re 21:3, 4" is clear and not clipped.
