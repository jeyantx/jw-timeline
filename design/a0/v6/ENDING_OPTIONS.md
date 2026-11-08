# Ending options: Armageddon → Thousand Year Reign → Paradise

## Problems with the v5 ending

The v5 ending is the walking path at x 20–340, y 470–800. See `v5/review/R-future.md`.

- **Wrong order.** The path is labelled "after Armageddon", but its first four stops come *before* Armageddon: Peace and security, the great tribulation, Gog and the anointed gathered. The last three stops are also out of order against timeline.json.
- **Armageddon is weak.** It sits off the path, as a 20 mm medallion in row 3's label field.
- **The Reign is unreadable.** Its band is clipped ("THOUSAND YEAR REIG") and is about 2.6 mm text on a narrow strip.
- **No climax.** R-human: "the far end … is not a visual climax"; the eye ends on the map and legend.
- **The paradise art looks unfinished.** It is a pasted rectangle with hatch showing through, and prints at 98 dpi.

## Data used in all three tiles

Source: `data/merged/timeline.json`, category `future.prophecy`, sorted by `start.sort_key`. Duplicate records b12-0119/0120/0121 are merged into b10-0011/0019/0020.

**Before Armageddon**

| sort_key | Event | Text |
|---|---|---|
| 100001 | “Peace and security!” | 1Th 5:3 |
| 100002 | Final sealing of the anointed | Re 7:1-3 |
| 100003 | Attack on Babylon the Great (the great tribulation begins) | Re 17:16 |
| 100004 | Attack “cut short” | Mt 24:22 |
| 100005 | Signs in sun, moon and stars | Mt 24:29 |
| 100006 | Sign of the Son of man; sheep and goats judged | Mt 24:30 |
| 100007 | Attack by Gog of Magog | Eze 38:10-12 |
| 100008 | Remaining anointed gathered to heaven | Mt 24:31 |

**Armageddon**

| sort_key | Event | Text |
|---|---|---|
| 100009 | **War of Armageddon** | Re 16:14, 16 |

**After Armageddon**

| sort_key | Event | Text |
|---|---|---|
| 100010 | Marriage of the Lamb | Re 19:9 |
| 100011 | Satan and the demons abyssed | Re 20:1-3 |
| 100012 | Christ’s Thousand Year Reign begins | Re 20:4, 6 |
| 100013 | Earthly resurrection | Ac 24:15 |
| 100014 | New scrolls opened | Re 20:12, 13 |
| 100015 | Christ hands the Kingdom back to God | 1Co 15:24-28 |
| 100016 | Satan released; the final test | Re 20:7-9 |
| 100017 | Satan, demons and rebels destroyed forever | Re 20:10 |

**OWNER check:** timeline.json puts the handing back of the Kingdom (100015) *before* Satan's release (100016). The tiles follow the data. Confirm this against kr chap. 21 / rr chap. 22.

Short titles are condensed from `title_en`. They should go into `data/curation/a0_sheet.json` → `future` when an option is chosen.

## Building and viewing the tiles

The tiles are made from `src/common.js` + `src/{A,B,C}.js` by `python3 design/a0/v6/gen_endings.py`.
- Each tile is 340 × 300 mm at 1 unit = 1 mm.
- View them through the repo-root server, e.g. http://127.0.0.1:8770/design/a0/v6/ending-B.html. The images load from `private/images/`.
- All text in the tiles meets PRINT_SPEC: t2 3.4 mm, meta 2.8 mm, headings 3.9–6 mm.

## A · Panorama band (`ending-A.html`)

**The idea:**
- Row 4's tail arrives as a grey "great tribulation" bed with the eight earlier events in order.
- At the left edge the gold line drops past a blended Armageddon vignette.
- The line then turns into a wide gold **Reign band** laid across the sky of a full-width paradise panorama.
- The eight later events hang from the band on paper chips.

**Pros:**
- The biggest emotional payoff: the whole bottom edge of the sheet becomes paradise.
- The Reign is unmissable from 3 m.

**Cons:**
- It needs a 1,000 × 170 mm (or at least 340 mm) panorama at ≥ 150 dpi, so upscaling or a larger jw.org rendition.
- The chips cover parts of the art.
- At sheet scale it should span x 20–1000 under the maps. That requires moving the maps up (see V6_PLAN).

This tile also demonstrates the v6 image and empty-space treatment:
- parchment grain
- faint contour lines in the gap
- a feathered, warm-toned vignette instead of a ringed medallion
- the panorama faded into the paper with a paper wash
- a giant 7 % "1,000" watermark

## B · Sunrise threshold (`ending-B.html`): **recommended**

**The idea:**
- **Dusk:** the pre-Armageddon events run down a dark column with light text (10:1 contrast). The darkness *is* the great tribulation.
- **The threshold:** Armageddon is the vertical threshold. Its vignette sits where the gold line crosses from dark into light.
- **The Reign:** to the right is a sunrise. Paradise art blends into a gold radial glow, and the gold line becomes a **1,000-year ruler** on the horizon.
- **Under the ruler**, the later events sit in three honest zones: **At the start / During the 1,000 years / At the end**. No invented years.

**Pros:**
- The strongest hierarchy and the clearest climax.
- It teaches the sequence without fake dates.
- It fits the existing left-bottom corner (about 340 × 300 mm) with no global relayout.
- The image is subordinate to the design: it is tinted and feathered, so it reads as part of the chart.

**Cons:**
- The dark column is the only dark area on the sheet. Echo it once more, e.g. the Flood, so it doesn't feel foreign.
- About 4 m² of dark ink. Check the print cost and banding.

## C · Fifth row (`ending-C.html`)

**The idea:**
- The future gets its own short metro row in the sheet's own language:
  - a hatched tribulation bed with the series rails
  - Armageddon as a red/black **gate** across the line
  - a gold-tinted Reign bed
- The same 4-lane label stacking as rows 1–4.
- A faint, blended paradise strip underneath.

**Pros:**
- The most consistent with the rest of the chart.
- It solves the order bug structurally.
- The rails can visibly end at the gate (world powers, the kings of north and south stop at Armageddon), which is a strong teaching point.

**Cons:**
- The least emotional of the three.
- A true fifth row needs about 845 × 60 mm, so the rows must be re-pitched from 125 mm to about 105 mm, or the row runs at y ≈ 640 under row 4, pushing the maps right.

## Recommendation

**Take B for the corner and C's gate.**
- Use B's dusk → threshold → sunrise structure in the bottom-left corner (x 20–360, y 560–830).
- Draw Armageddon as C's gate where row 4 ends (x 205), so the series rails visibly stop there.
- Fix the R-future order bug in the data at the same time. The `future` list in `a0_sheet.json` becomes the 8 + 1 + 8 list above.
