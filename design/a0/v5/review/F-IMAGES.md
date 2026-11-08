# F-IMAGES: what was fixed, what is left

## Fixed
- **Task A (blend):** this was already in index.html (paper ring + ink keyline + soft shadow on ev-*; gold ring on pre-*/creation-day-*; radial fade on the throne; feathered story-*; linear masks on eden and paradise; warm `saturate(.92) sepia(.07)` filter). Checked by shooting; kept as is.
- **Images now load in headless shots and print:** `loading="lazy"` → `eager`, `decoding="sync"`. With lazy, about half the slots (Day 1, 4, 5, 6, Eden, …) came out blank in shot.sh.
- **Task B (focal points):** all 58 placed image slots have `focus` entries in `data/curation/a0_sheet.json`. The format is `[objpos x%, objpos y%, zoom, origin x%, origin y%]`. Each was computed from a subject point I picked by looking at every image with a 10% grid. index.html now uses entries 4 and 5 as the zoom `transform-origin`, so the zoom centres on the subject; old 3-value entries still work. The table is in `design/a0/v5/notes/image_crops.md`.
- **Better-matching alternates** (`image_choice`):
  - `ev-jesus-born` → alt1 (Joseph, Mary and the baby). The primary was mostly sky at 20 mm.
  - `ev-jerusalem-destroyed` → alt1 (the burning walls, square). The primary was a wide city that can't be read at 20 mm.
  - `ev-jonah-in-nineveh` → alt2 (Jonah and the big fish). The label is "Jonah and the big fish"; the primary showed Jonah walking to Nineveh.
- **R-gutter #1:** `story-6` zoom 1.7 on the throne, so the printed "1914 C.E." no longer shows as "14 C.E.". Verified.
- **R-future #8 / #17:** the paradise mask side fade is 5% → 11%, and the top fade reaches full opacity at 24% (was 32%). The path now meets solid land and the sides are softer. Verified. The hatch showing through (R-future #7) is FIX-PANELS (draw2.js).

- **R-turn2 #18 / R-gutter:** `story-5` "Jesus dies" is refocused on the face (eyes, nose, thorns) and now reads as a face. Verified.
- **R-turn2 #17:** same as R-gutter #1 (story-6), fixed.
- **R-opening #11 / #18:** the opening slots now have focus points, and the eager loading fixes the blank headless shots.

## Image/event mismatches (left for OWNER)
0. **creation-day-6 (R-opening #10)**: the label is "Animals · man", but alt2 (lions, birds, deer in Eden) has **no man** in it, so no crop can bring Adam in. I set focus on the animals (lower half). An image with Adam is needed; eden__alt2 "Adam and Eve in the garden of Eden, surrounded by animals" would fit. Swapping the image file is a research/OWNER decision; image_choice can only pick among creation-day-6's own alts.
0b. **ev-tamil-new-testament (R-turn3 #5)**: images.csv has no jw.org image for it, so the slot stays a placeholder. The "IMAGE / Drop an image" overlap comes from image-slot.js, which isn't in my files.
1. **ev-hezekiah on b18-0040 "Hezekiah's Passover"**: the image is Hezekiah praying over Sennacherib's letters (2Ki 19:14). It belongs on b3-0077 "Sennacherib invades Judah". I tried `slot_for` b3-0077, but the medallion then knocked out the "Samaria falls" and "Sennacherib invades Judah" tier-1 labels (FIX-LABELS placement), so I reverted. To retry it, FIX-LABELS must handle it.
2. **ev-isaiah** (b19-0041 "Isaiah sees Jehovah's throne: Here I am! Send me"): a generic prophet stand-in.
3. **ev-gutenberg-bible**: an exhibit Bible (video thumbnail) stand-in.
4. **ev-name-jehovah-s-witnesses**: the 1931 programme cover. Acceptable, but it is a stand-in.
5. **ev-jeremiah** (commissioned as prophet): the image shows Jeremiah smashing the jar (Jer 19), a later event.
6. **pre-2 "Angels, sons of God" (Job 38:7)**: the image is the Job 1 heavenly court with Satan among the angels. The only alt duplicates pre-1.
7. **story-2 (R-gutter #16)**: the image is Abraham looking at the stars (Ge 15:5) but the caption cites Ge 22:2. The fix is the caption reference (FIX-PANELS/OWNER); there is no Isaac-offering image in images.csv.
8. **story-5 "Jesus dies"**: the source is an extreme close-up (eye and thorns). In the square crop it reads poorly; it needs an edited image or alt2 (the stake scene, flagged in the CSV).
9. **ev-tamil-new-testament**: no image (grey circle).
10. `ev-saul-dies` matches its event (b18-0013 "Jehovah rejects Saul"); only the slot name is misleading.

## Left / notes
- Eden: the SVG hatch placeholder shows faintly in the feathered margins. Same cause as R-future #7; FIX-PANELS should skip the hatch when an image exists.
- pre-3 has an "Anglo-Australian Observatory / David Malin" credit burned into the right edge. The crop keeps it out (zoom 1.4, subject at 40%). For the high-res print, check it again or use an edited copy.
- Slot sizes in the focus calculation are hard-coded (event 19.6 mm, opening 14 mm). If they change, recompute (formula in image_crops.md).
