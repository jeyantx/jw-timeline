# Print to-do (images)

Source px from research/images.csv (primary image). Target 300 dpi → px = mm × 11.81. Slots shown are the sheet's drop-in/medallion sizes; two-column "needs upscale" = effective dpi < 300.

| slot | print mm | source px | eff. dpi (long side of crop) | upscale? |
|---|---|---|---|---|
| throne | 52×52 | 1200×600 | 293 | yes |
| pre-2 | 14×14 | 900×450 | 816 | no |
| pre-4 | 14×14 | 1200×600 | 1089 | no |
| story-1 | 29×29 | 1200×600 | 526 | no |
| story-2 | 29×29 | 1200×600 | 526 | no |
| story-3 | 29×29 | 1200×600 | 526 | no |
| story-4 | 29×29 | 1200×600 | 526 | no |
| story-5 | 29×29 | 1200×600 | 526 | no |
| story-7 | 29×29 | 1200×600 | 526 | no |
| ev-the-flood | 19.6×19.6 | 1200×600 | 778 | no |
| ev-abraham-crosses-the-euphrates | 19.6×19.6 | 900×540 | 700 | no |
| ev-red-sea-crossing | 19.6×19.6 | 900×1200 | 1166 | no |
| ev-law-covenant-at-sinai | 19.6×19.6 | 900×1200 | 1166 | no |
| ev-jericho-falls | 19.6×19.6 | 1200×600 | 778 | no |
| ev-gideon-s-300 | 19.6×19.6 | 1200×600 | 778 | no |
| ev-david-and-goliath | 19.6×19.6 | 1200×600 | 778 | no |
| ev-temple-completed | 19.6×19.6 | 1200×600 | 778 | no |
| ev-kingdom-divided | 19.6×19.6 | 1200×600 | 778 | no |
| ev-elijah-on-mount-carmel | 19.6×19.6 | 1200×600 | 778 | no |
| ev-jonah-in-nineveh | 19.6×19.6 | 900×450 | 583 | no |
| ev-jerusalem-destroyed | 19.6×19.6 | 1200×600 | 778 | no |
| ev-fiery-furnace | 19.6×19.6 | 900×540 | 700 | no |
| ev-daniel-in-the-lions-pit | 19.6×19.6 | 1200×600 | 778 | no |
| ev-esther-made-queen | 19.6×19.6 | 900×1180 | 1166 | no |
| ev-pentecost-sowing-begins | 19.6×19.6 | 1200×600 | 778 | no |
| ev-paul-at-the-areopagus | 19.6×19.6 | 1200×600 | 778 | no |
| ev-photo-drama-of-creation | 19.6×19.6 | 900×1360 | 1166 | no |
| ev-gilead-school-opens | 19.6×19.6 | 1200×600 | 778 | no |
| ev-revised-nwt | 19.6×19.6 | 1200×600 | 778 | no |
| ev-jw-broadcasting-begins | 19.6×19.6 | 1200×600 | 778 | no |
| ev-armageddon | 19.6×19.6 | 900×1200 | 1166 | no |
| ev-adam-created | 19.6×19.6 | 1200×600 | 778 | no |
| ev-jesus-born | 19.6×19.6 | 1200×600 | 778 | no |
| ev-jerusalem-destroyed-70 | 19.6×19.6 | 1200×1539 | 1555 | no |
| ev-watch-tower-1879 | 19.6×19.6 | 900×1238 | 1166 | no |
| ev-babylon-falls | 19.6×19.6 | 900×1199 | 1166 | no |
| ev-queen-of-sheba | 19.6×19.6 | 1200×600 | 778 | no |
| ev-hezekiah | 19.6×19.6 | 1200×600 | 778 | no |
| ev-josiah | 19.6×19.6 | 1200×600 | 778 | no |
| ev-jeremiah | 19.6×19.6 | 1200×600 | 778 | no |

## Other print blockers
- Hatch patterns (`#hatch`, `#clay`, `#qr`) are 1–3 mm tiles: rasterise or replace with solid fills for print to avoid moiré.
- Hairlines under 0.15 mm: leader lines use 0.16 mm; check the printer minimum.
- All images load from jw.org today: download them into the project before the final export.
