# A0 image plan (v6): one painted series that blends into the sheet

Personal and congregation use only. Every output goes to `private/images/ai/` (git-ignored, never committed or published). The jw.org images in `private/images/` serve only as references; their credit stays © Watch Tower Bible and Tract Society of Pennsylvania.

Files:
- `design/a0/v6/image_prompts.json`: one entry per slot with `slot_id`, `ref` (timeline.json id), `kind` (existing or new), `shape`, `size_mm`, `api_size`, `reference_files`, `prompt`. The shared style suffix is already inside every prompt and is also stored once as `style_suffix`.
- `scripts/gen_images.py`: makes the images. It needs `pip install openai`.

## 1. Style guide

The owner's direction: **the images must not stand out. They should blend with the page and its design.**

| Aspect | Rule |
|---|---|
| Look | Soft, warm, realistic painting in the spirit of jw.org artwork. One series: same palette, light and brushwork in every slot. |
| Palette | The chart's warm palette: cream paper `#f7f6f2` and muted earth tones (ochre, sand, soft olive, dusty blue, terracotta, warm grey). Desaturated, with no saturated colours. |
| Light and contrast | Soft, diffused natural light, low contrast and soft edges. Night, storm and fire scenes are painted as soft warm dusk tones, never black skies. |
| Composition | Subject centred and compact, with generous soft margins. The background gets paler and simpler toward every edge and fades to paper colour, so circle crops, vignettes and feathering (`feather`, `fade` slots) work. No hard borders or frames, and no busy or dark backgrounds. |
| Settings | Accurate ancient Middle-Eastern settings, clothes, tools and buildings for the period. Modern scenes use the clothes of their decade. |
| People | Natural, believable people. Modest dress for everyone. Respectful and dignified. Violence is implied, never graphic: no blood or gore. |
| Jehovah | **Never depicted as a human or any figure.** His presence is shown only as light or glory, or as a throne in radiance with no one visible on it. |
| Jesus | Shown as jw.org art shows him: a Middle-Eastern Jewish man about 30, with short dark-brown hair, a short neat beard and a plain tunic and mantle. In heavenly scenes he is a glorified king in light. He dies on a single upright stake, with no crossbeam. |
| Never | Halos, crosses, crucifixes, religious icons, text, letters, numbers, captions, logos, signatures or watermarks. Book and magazine pages are shown as indistinct grey marks. |
| Revamps | Keep the reference's scene, people, poses and composition. Remove all text, logos and borders, soften the colours to the palette and fade the edges to paper. |
| New slots with a reference | Use the reference only for how the person or setting looks in jw.org art. Do not copy its composition. |

**Consistency tip:** generate 3–4 slots first, then choose the best one and pass it as `--style-anchor`. It is appended to every edit request as an extra reference. If the paper tone of a result is off, adjust it in one batch pass (levels or curves toward `#f7f6f2`) rather than regenerating.

## 2. Print sizes (A0, 300 dpi)

1 mm at 300 dpi = 11.81 px.

| Slot type | Size (mm) | Pixels needed at 300 dpi | API size | Headroom |
|---|---|---|---|---|
| Creation and opening medallions (`pre-*`, `creation-day-*`) | 14 circle | 165 | 1024×1024 | 6× |
| Person portrait (new `p-*`) | 16 circle | 189 | 1024×1024 | 5× |
| Event medallion (`ev-*`) | 19.6 circle | 231 | 1024×1024 | 4× |
| Daniel 7/8 beasts (`ref-daniel-*`) | 12 circle | 142 | 1024×1024 | 7× |
| Story collage (`story-*`) | 26 feathered square | 307 | 1024×1024 | 3× |
| Feature incident (new) | 32×22 rounded rect | 378×260 | 1536×1024 | 4× |
| Throne | 52 circle | 614 | 1024×1024 | 1.7× |
| Eden | 146×41 rounded | 1724×484 | 1536×1024 | **upscale ×1.15** |
| Paradise | 312×143, top fades | 3685×1689 | 1536×1024 | **upscale ×2.4** (AI upscaler, or generate two halves) |

The headroom means the circle crop and the focal point (`a0_sheet.json → focus`) can be moved freely. Only Eden and Paradise need upscaling.

## 3. Placement notes

- **Zones:** Opening (top-left), **row 1** 4026–1200 B.C.E., **turn 1** (right) 1200–997, **row 2** 997–332 B.C.E. (Israel and prophets above the line, Judah and nations below), **turn 2** (left) 332–2 B.C.E., **row 3** 2 B.C.E.–1700 C.E. (Jesus' ministry 29–33 in the ministry columns), **turn 3** (right) 1700–1870, **row 4** 1870–2026, then the future path and Paradise (bottom-left). The left gutter holds the story collage and Daniel 2.
- **New `ev-*` slots** are round 19.6 mm medallions drawn at the event's label. They need no layout code: add `"<ref>": "<slot_id>"` to `a0_sheet.json → slot_for`, and the fit report shows whether each one found room. Records marked "no (tier 3)" first need their id added to `data/curation/a0_extra.json → include`.
- **Feature slots** (32×22 mm: Job's trial, ten plagues, Sermon on the Mount, Lord's Evening Meal, preaching today) are meant for the free space near their row: the bed under the line, the turn loops or the gutters. They need a design hook like `paradise`/`eden` (`A0.slots.push({id, x, y, w, h, shape:'rounded', fade:1})`).
- **Portraits (`p-*`)** are 16 mm circles placed at the start of the person's lifespan, reign or prophet bar (drawn from `data.js`, not from labels). `ref` names the record the portrait belongs to. This needs a small design hook (`D.portraits`) in Claude Design's code.
- **Images on the page:** `real.js` (via `scripts/build_a0_sheet.py`) should prefer `private/images/ai/<slot>.png` when it exists and fall back to the jw.org file. This is not yet built.
- **Also covered:** printing press (`ev-gutenberg-bible`), Tamil NT 1714 (`ev-tamil-new-testament`), Bible class 1870 (`ev-bible-class-in-allegheny`), Photo-Drama, Gilead and conventions (`ev-advertise-the-king`, `ev-name-jehovah-s-witnesses`) already have slots and are revamped. New convention and preaching slots: `ev-divine-will-1958`, `ev-public-witnessing`, `ev-preaching-today`.

## 4. Slot list

66 existing slots (images.csv plus `slot_for`, including `ref-daniel-ram`/`-goat` and `ev-tamil-new-testament`, which have no jw.org image yet) and 70 new slots (37 persons and 33 incidents), 136 images in total. Reference images are in `private/images/`.

### existing

| slot_id | ref | record | zone / row | on sheet | size mm | shape | reference image(s) |
|---|---|---|---|---|---|---|---|
| throne |  |  | opening | yes | 52×52 | circle | throne.jpg, throne__alt1.jpg |
| pre-1 | b21-0001 | The Word, Jehovah’s only-begotten Son, created first | opening (top-left) | yes | 14×14 | circle | pre-1.jpg |
| pre-2 | b21-0002 | Angels created through the Son | opening (top-left) | yes | 14×14 | circle | pre-2__alt1.jpg, pre-2.jpg |
| pre-3 | b21-0003 | God creates the heavens and the earth | opening (top-left) | yes | 14×14 | circle | pre-3.jpg, pre-3__alt1.jpg, pre-3__alt2.jpg |
| pre-4 | b21-0004 | The earth formless and desolate, in darkness | opening (top-left) | no (tier 3; add to a0_extra.json) | 14×14 | circle | pre-4.jpg |
| creation-day-1 | b21-0005 | Creative day 1: Light; division between day and night | opening (top-left) | yes | 14×14 | circle | creation-day-1__alt2.jpg, creation-day-1.jpg, creation-day-1__alt1.jpg |
| creation-day-2 | b21-0006 | Creative day 2: Expanse, a division between waters bene | opening (top-left) | yes | 14×14 | circle | creation-day-2__alt2.jpg, creation-day-2.jpg, creation-day-2__alt1.jpg |
| creation-day-3 | b21-0007 | Creative day 3: Dry land; vegetation | opening (top-left) | yes | 14×14 | circle | creation-day-3__alt2.jpg, creation-day-3.jpg, creation-day-3__alt1.jpg |
| creation-day-4 | b21-0008 | Creative day 4: Heavenly luminaries become discernible  | opening (top-left) | yes | 14×14 | circle | creation-day-4__alt2.jpg, creation-day-4.jpg, creation-day-4__alt1.jpg |
| creation-day-5 | b21-0009 | Creative day 5: Aquatic souls and flying creatures | opening (top-left) | yes | 14×14 | circle | creation-day-5__alt2.jpg, creation-day-5.jpg, creation-day-5__alt1.jpg |
| creation-day-6 | b21-0010 | Creative day 6: Land animals; man | opening (top-left) | yes | 14×14 | circle | creation-day-6__alt2.jpg, creation-day-6.jpg, creation-day-6__alt1.jpg |
| eden | b1-0001 | Creation of Adam | row 1 | yes | 146×41 | rounded rect | eden.jpg, eden__alt2.jpg |
| paradise | b10-0020 | Christ's Thousand Year Reign begins | future path (bottom-left) | yes | 312×143 | rect, top edge fades | paradise.jpg, paradise__alt1.jpg |
| story-1 | b21-0012 | Adam and Eve disobey and are put out of Eden | opening (top-left) | yes | 26×26 | feathered square | story-1.jpg, story-1__alt1.jpg, story-1__alt2.jpg |
| story-2 | d1-0013 | Life of Abraham | row 1 | yes | 26×26 | feathered square | story-2.jpg, story-2__alt1.jpg, story-2__alt2.jpg |
| story-3 | b3-0007 | David becomes king over all Israel; Jerusalem made capi | turn 1 (right) | yes | 26×26 | feathered square | story-3.jpg, story-3__alt1.jpg |
| story-4 | b5-0017 | Jesus baptized and anointed; Jehovah declares him his S | row 3 · ministry columns | yes | 26×26 | feathered square | story-4.jpg, story-4__alt1.jpg, story-4__alt2.jpg |
| story-5 | b5-0163 | Dies on torture stake | row 3 · ministry columns | yes | 26×26 | feathered square | story-5.jpg, story-5__alt1.jpg, story-5__alt2.jpg |
| story-6 | b10-0002 | God's Kingdom born in heaven; Christ begins ruling as K | row 4 | yes | 26×26 | feathered square | story-6.jpg, story-6__alt1.jpg, story-6__alt2.jpg |
| story-7 | b10-0020 | Christ's Thousand Year Reign begins | future path (bottom-left) | yes | 26×26 | feathered square | story-7.jpg, story-7__alt1.jpg, story-7__alt2.jpg |
| ref-daniel-lion | b4-0020 | First year of Belshazzar: Daniel's dream of four beasts | row 2 | yes | 12×12 | circle (Daniel 7 panel) | ref-daniel-lion.jpg, ref-daniel-lion__alt1.jpg |
| ref-daniel-bear | b4-0020 | First year of Belshazzar: Daniel's dream of four beasts | row 2 | yes | 12×12 | circle (Daniel 7 panel) | ref-daniel-bear.jpg, ref-daniel-bear__alt1.jpg |
| ref-daniel-leopard | b4-0020 | First year of Belshazzar: Daniel's dream of four beasts | row 2 | yes | 12×12 | circle (Daniel 7 panel) | ref-daniel-leopard.jpg, ref-daniel-leopard__alt1.jpg |
| ref-daniel-beast | b4-0020 | First year of Belshazzar: Daniel's dream of four beasts | row 2 | yes | 12×12 | circle (Daniel 7 panel) | ref-daniel-beast.jpg, ref-daniel-beast__alt1.jpg |
| ref-daniel-horn | b4-0020 | First year of Belshazzar: Daniel's dream of four beasts | row 2 | yes | 12×12 | circle (Daniel 7 panel) | ref-daniel-horn.jpg |
| ref-daniel-ram | b21-0013 | Daniel’s vision of the ram and the he-goat | opening (top-left) | yes | 12×12 | circle (Daniel 8 panel) | — |
| ref-daniel-goat | b21-0013 | Daniel’s vision of the ram and the he-goat | opening (top-left) | yes | 12×12 | circle (Daniel 8 panel) | — |
| ev-adam-created | b1-0001 | Creation of Adam | row 1 | yes | 20×20 | circle | ev-adam-created.jpg, ev-adam-created__alt1.jpg |
| ev-the-flood | b1-0019 | Floodwaters fall: the global Deluge begins | row 1 | yes | 20×20 | circle | ev-the-flood.jpg, ev-the-flood__alt1.jpg, ev-the-flood__alt2.jpg |
| ev-abraham-crosses-the-euphrates | b1-0036 | Abraham crosses the Euphrates on his way to Canaan | row 1 | yes | 20×20 | circle | ev-abraham-crosses-the-euphrates.jpg, ev-abraham-crosses-the-euphrates__alt1.jpg |
| ev-red-sea-crossing | b2-0019 | Red Sea deliverance | row 1 | yes | 20×20 | circle | ev-red-sea-crossing.jpg, ev-red-sea-crossing__alt1.jpg |
| ev-law-covenant-at-sinai | b2-0022 | Law covenant made at Mount Sinai (Horeb) | row 1 | yes | 20×20 | circle | ev-law-covenant-at-sinai.jpg, ev-law-covenant-at-sinai__alt1.jpg, ev-law-covenant-at-sinai__alt2.jpg |
| ev-jericho-falls | b2-0049 | Fall of Jericho | row 1 | yes | 20×20 | circle | ev-jericho-falls.jpg, ev-jericho-falls__alt1.jpg, ev-jericho-falls__alt2.jpg |
| ev-gideon-s-300 | b2-0065 | Gideon delivers Israel from Midian | row 1 | yes | 20×20 | circle | ev-gideon-s-300.jpg, ev-gideon-s-300__alt1.jpg |
| ev-saul-dies | b18-0013 | Saul disobeys and Jehovah rejects him as king | turn 1 (right) | yes | 20×20 | circle | ev-saul-dies.jpg, ev-saul-dies__alt1.jpg |
| ev-david-and-goliath | b18-0015 | David kills Goliath | turn 1 (right) | yes | 20×20 | circle | ev-david-and-goliath.jpg, ev-david-and-goliath__alt1.jpg, ev-david-and-goliath__alt2.jpg |
| ev-temple-completed | b3-0013 | Solomon’s temple completed | turn 1 (right) | yes | 20×20 | circle | ev-temple-completed.jpg, ev-temple-completed__alt1.jpg |
| ev-queen-of-sheba | b18-0023 | The queen of Sheba visits Solomon | turn 1 (right) | yes | 20×20 | circle | ev-queen-of-sheba.jpg, ev-queen-of-sheba__alt1.jpg |
| ev-kingdom-divided | b3-0019 | Kingdom divided: Judah and Israel | row 2 | yes | 20×20 | circle | ev-kingdom-divided.jpg, ev-kingdom-divided__alt1.jpg, ev-kingdom-divided__alt2.jpg |
| ev-elijah-on-mount-carmel | b18-0027 | Elijah’s test of godship on Mount Carmel | row 2 | yes | 20×20 | circle | ev-elijah-on-mount-carmel.jpg, ev-elijah-on-mount-carmel__alt1.jpg |
| ev-jonah-in-nineveh | b18-0038 | Jonah is swallowed by a big fish; Nineveh repents | row 2 | yes | 20×20 | circle | ev-jonah-in-nineveh__alt2.jpg, ev-jonah-in-nineveh.jpg, ev-jonah-in-nineveh__alt1.jpg |
| ev-isaiah | b19-0041 | Isaiah sees Jehovah’s throne: “Here I am! Send me” | row 2 | yes | 20×20 | circle | ev-isaiah.jpg, ev-isaiah__alt1.jpg |
| ev-hezekiah | b18-0040 | Hezekiah reopens the temple and holds a great Passover | row 2 | yes | 20×20 | circle | ev-hezekiah.jpg, ev-hezekiah__alt1.jpg |
| ev-jeremiah | b19-0060 | Jeremiah commissioned as prophet | row 2 | yes | 20×20 | circle | ev-jeremiah.jpg, ev-jeremiah__alt1.jpg, ev-jeremiah__alt2.jpg |
| ev-josiah | b3-0089 | Book of the Law found in the temple; Huldah consulted | row 2 | yes | 20×20 | circle | ev-josiah.jpg, ev-josiah__alt1.jpg |
| ev-jerusalem-destroyed | b3-0113 | Jerusalem and the temple destroyed by Babylon | row 2 | yes | 20×20 | circle | ev-jerusalem-destroyed__alt1.jpg, ev-jerusalem-destroyed.jpg, ev-jerusalem-destroyed__alt2.jpg |
| ev-fiery-furnace | b18-0045 | Shadrach, Meshach, and Abednego in the fiery furnace | row 2 | yes | 20×20 | circle | ev-fiery-furnace.jpg, ev-fiery-furnace__alt1.jpg, ev-fiery-furnace__alt2.jpg |
| ev-babylon-falls | b4-0024 | Babylon falls to the Medes and Persians | row 2 | yes | 20×20 | circle | ev-babylon-falls.jpg, ev-babylon-falls__alt1.jpg, ev-babylon-falls__alt2.jpg |
| ev-daniel-in-the-lions-pit | b18-0047 | Daniel is thrown into the lions’ pit | row 2 | yes | 20×20 | circle | ev-daniel-in-the-lions-pit.jpg, ev-daniel-in-the-lions-pit__alt1.jpg, ev-daniel-in-the-lions-pit__alt2.jpg |
| ev-esther-made-queen | b18-0048 | Esther is chosen as queen of Persia | row 2 | yes | 20×20 | circle | ev-esther-made-queen.jpg, ev-esther-made-queen__alt1.jpg, ev-esther-made-queen__alt2.jpg |
| ev-jesus-born | b5-0006 | Jesus born; “the Word became flesh” | row 3 | yes | 20×20 | circle | ev-jesus-born__alt1.jpg, ev-jesus-born.jpg |
| ev-pentecost-sowing-begins | b6-0001 | Pentecost: holy spirit poured out on the disciples in J | row 3 · ministry columns | yes | 20×20 | circle | ev-pentecost-sowing-begins.jpg, ev-pentecost-sowing-begins__alt1.jpg |
| ev-paul-at-the-areopagus | b6-0036 | Paul preaches in Athens | row 3 | yes | 20×20 | circle | ev-paul-at-the-areopagus.jpg, ev-paul-at-the-areopagus__alt1.jpg |
| ev-jerusalem-destroyed-70 | b6-0096 | Jerusalem and its temple destroyed by the Romans | row 3 | yes | 20×20 | circle | ev-jerusalem-destroyed-70.jpg, ev-jerusalem-destroyed-70__alt1.jpg |
| ev-gutenberg-bible | b7-0096 | Gutenberg completes the first printed Bible (Latin Vulg | row 3 | yes | 20×20 | circle | ev-gutenberg-bible.jpg |
| ev-tamil-new-testament | b7-0175 | Ziegenbalg produces the Christian Greek Scriptures in T | turn 3 (right) | yes | 20×20 | circle | — |
| ev-bible-class-in-allegheny | b8-0004 | Russell and associates begin systematic Bible study in  | row 4 | yes | 20×20 | circle | ev-bible-class-in-allegheny__alt1.jpg, ev-bible-class-in-allegheny.jpg |
| ev-watch-tower-1879 | b8-0018 | First issue of Zion’s Watch Tower and Herald of Christ’ | row 4 | yes | 20×20 | circle | — |
| ev-photo-drama-of-creation | b8-0095 | First showing of the “Photo-Drama of Creation” in New Y | row 4 | yes | 20×20 | circle | ev-photo-drama-of-creation__alt1.jpg |
| ev-kingdom-born-1914 | b10-0002 | God's Kingdom born in heaven; Christ begins ruling as K | row 4 | yes | 20×20 | circle | ev-kingdom-born-1914.jpg, ev-kingdom-born-1914__alt1.jpg, ev-kingdom-born-1914__alt2.jpg |
| ev-advertise-the-king | b8-0142 | Cedar Point convention: “Advertise, advertise, advertis | row 4 | yes | 20×20 | circle | ev-advertise-the-king__alt1.jpg, ev-advertise-the-king.jpg |
| ev-name-jehovah-s-witnesses | b8-0176 | Name Jehovah’s Witnesses adopted by resolution | row 4 | yes | 20×20 | circle | ev-advertise-the-king__alt1.jpg |
| ev-gilead-school-opens | b8-0246 | First class of the Watchtower Bible School of Gilead be | row 4 | yes | 20×20 | circle | ev-gilead-school-opens__alt2.jpg, ev-gilead-school-opens.jpg |
| ev-revised-nwt | b9-0314 | Revised English New World Translation released | row 4 | yes | 20×20 | circle | ev-revised-nwt__alt1.jpg |
| ev-jw-broadcasting-begins | b9-0330 | JW Broadcasting launched | row 4 | yes | 20×20 | circle | ev-jw-broadcasting-begins__alt1.jpg |
| ev-armageddon | b10-0017 | War of Armageddon: the finale of the great tribulation | future path (bottom-left) | yes | 20×20 | circle | ev-armageddon.jpg, ev-armageddon__alt1.jpg |

### new

| slot_id | ref | record | zone / row | on sheet | size mm | shape | reference image(s) |
|---|---|---|---|---|---|---|---|
| p-adam-eve | d1-0001 | Life of Adam | row 1 | yes | 16×16 | circle portrait | eden__alt2.jpg |
| p-noah | d1-0006 | Life of Noah | row 1 | yes | 16×16 | circle portrait | ev-the-flood__alt2.jpg |
| p-abraham | d1-0013 | Life of Abraham | row 1 | yes | 16×16 | circle portrait | story-2__alt1.jpg |
| p-sarah | b1-0049 | Death of Sarah | row 1 | no (tier 3; add to a0_extra.json) | 16×16 | circle portrait | ev-abraham-crosses-the-euphrates__alt1.jpg |
| p-isaac | d1-0015 | Life of Isaac | row 1 | yes | 16×16 | circle portrait | — |
| p-jacob | d1-0072 | Life of Jacob | row 1 | yes | 16×16 | circle portrait | — |
| p-joseph | d1-0016 | Life of Joseph | row 1 | yes | 16×16 | circle portrait | — |
| p-moses | d1-0018 | Life of Moses | row 1 | yes | 16×16 | circle portrait | ev-law-covenant-at-sinai__alt2.jpg |
| p-aaron | d1-0017 | Life of Aaron | row 1 | yes | 16×16 | circle portrait | — |
| p-joshua | d1-0019 | Life of Joshua | row 1 | yes | 16×16 | circle portrait | ev-jericho-falls__alt2.jpg |
| p-rahab | d1-0021 | Life of Rahab | row 1 | yes | 16×16 | circle portrait | ev-jericho-falls__alt1.jpg |
| p-deborah | b2-0063 | Deborah and Barak defeat Jabin and Sisera | row 1 | yes | 16×16 | circle portrait | — |
| p-samson | b2-0075 | Samson judges Israel 20 years | turn 1 (right) | yes | 16×16 | circle portrait | — |
| p-ruth | b2-0064 | Events of the book of Ruth | row 1 | yes | 16×16 | circle portrait | — |
| p-samuel | b18-0012 | Jehovah speaks to young Samuel at the tabernacle | turn 1 (right) | yes | 16×16 | circle portrait | — |
| p-saul | b3-0001 | Samuel anoints Saul as king of Israel | turn 1 (right) | yes | 16×16 | circle portrait | ev-saul-dies__alt1.jpg |
| p-david | b3-0007 | David becomes king over all Israel; Jerusalem made capi | turn 1 (right) | yes | 16×16 | circle portrait | story-3__alt1.jpg, story-3.jpg |
| p-solomon | b18-0022 | Solomon asks Jehovah for wisdom | turn 1 (right) | yes | 16×16 | circle portrait | ev-queen-of-sheba__alt1.jpg |
| p-elijah | b3-0032 | Prophetic activity of Elijah | row 2 | yes | 16×16 | circle portrait | — |
| p-elisha | b18-0031 | Elijah taken up in a windstorm; Elisha succeeds him | row 2 | yes | 16×16 | circle portrait | — |
| p-jonah | b3-0051 | Prophetic activity of Jonah | row 2 | yes | 16×16 | circle portrait | ev-jonah-in-nineveh.jpg |
| p-isaiah | b3-0066 | Prophetic activity of Isaiah | row 2 | yes | 16×16 | circle portrait | ev-isaiah.jpg |
| p-hezekiah | d1-0044 | Reign of Hezekiah (Judah) | row 2 | yes | 16×16 | circle portrait | ev-hezekiah.jpg |
| p-josiah | d1-0047 | Reign of Josiah (Judah) | row 2 | yes | 16×16 | circle portrait | ev-josiah__alt1.jpg |
| p-jeremiah | b3-0088 | Prophetic activity of Jeremiah | row 2 | yes | 16×16 | circle portrait | ev-jeremiah__alt1.jpg |
| p-daniel | b3-0103 | Prophetic activity of Daniel | row 2 | yes | 16×16 | circle portrait | ev-daniel-in-the-lions-pit.jpg |
| p-esther | b18-0049 | Esther appeals to the king; Haman is hanged and Mordeca | row 2 | yes | 16×16 | circle portrait | ev-esther-made-queen__alt2.jpg, ev-esther-made-queen.jpg |
| p-ezra | b18-0050 | Ezra reads the Law to the people in Jerusalem | row 2 | yes | 16×16 | circle portrait | — |
| p-nehemiah | b4-0069 | Artaxerxes commissions Nehemiah; 70 weeks begin | row 2 | yes | 16×16 | circle portrait | — |
| p-mary | b5-0002 | Angel Gabriel foretells the birth of Jesus to Mary | row 3 | yes | 16×16 | circle portrait | ev-jesus-born__alt1.jpg |
| p-john-the-baptist | d1-0023 | Life of John the Baptist | row 3 | yes | 16×16 | circle portrait | story-4.jpg |
| p-peter | b5-0034 | Calls four disciples: Simon and Andrew, James and John | row 3 · ministry columns | yes | 16×16 | circle portrait | — |
| p-john-apostle | b11-0068 | Writing of John completed | row 3 | yes | 16×16 | circle portrait | — |
| p-paul | b6-0022 | Paul’s first missionary journey | row 3 | yes | 16×16 | circle portrait | ev-paul-at-the-areopagus__alt1.jpg |
| p-luke | b11-0049 | Writing of Luke completed | row 3 | yes | 16×16 | circle portrait | — |
| p-timothy | b6-0029 | Timothy joins Paul at Lystra | row 3 | yes | 16×16 | circle portrait | — |
| p-job | b2-0008 | Job’s trial | row 1 | yes | 16×16 | circle portrait | — |
| ev-job-trial | b2-0008 | Job’s trial | row 1 | yes | 32×22 | rounded rect feature | — |
| ev-burning-bush | b2-0015 | Moses at the burning thornbush | row 1 | yes | 20×20 | circle | — |
| ev-ten-plagues | b2-0016 | Ten Plagues on Egypt | row 1 | yes | 32×22 | rounded rect feature | — |
| ev-manna | b2-0021 | Manna first provided in the wilderness of Sin | row 1 | yes | 20×20 | circle | — |
| ev-golden-calf | b18-0006 | Israel worships the golden calf at Mount Sinai | row 1 | yes | 20×20 | circle | — |
| ev-tower-of-babel | b1-0025 | Building of the Tower of Babel; languages confused | row 1 | yes | 20×20 | circle | — |
| ev-abraham-offers-isaac | b18-0002 | Abraham offers up Isaac on Mount Moriah | row 1 | yes | 20×20 | circle | — |
| ev-joseph-sold | b2-0001 | Joseph sold as a slave by his brothers | row 1 | yes | 20×20 | circle | — |
| ev-jesus-baptism | b5-0017 | Jesus baptized and anointed; Jehovah declares him his S | row 3 · ministry columns | yes | 20×20 | circle | story-4.jpg, story-4__alt2.jpg |
| ev-sermon-on-the-mount | b5-0047 | Gives Sermon on the Mount | row 3 · ministry columns | yes | 32×22 | rounded rect feature | — |
| ev-feeding-5000 | b5-0069 | Jesus feeds 5,000 men | row 3 · ministry columns | yes | 20×20 | circle | — |
| ev-jesus-walks-on-sea | b5-0071 | Jesus walks on sea | row 3 · ministry columns | yes | 20×20 | circle | — |
| ev-transfiguration | b5-0082 | Transfiguration; Jehovah speaks | row 3 · ministry columns | yes | 20×20 | circle | — |
| ev-lazarus-raised | b5-0114 | Lazarus dies and is resurrected | row 3 · ministry columns | yes | 20×20 | circle | — |
| ev-lords-evening-meal | b5-0152 | Institutes the Lord’s Evening Meal | row 3 · ministry columns | yes | 32×22 | rounded rect feature | — |
| ev-jesus-dies | b5-0163 | Dies on torture stake | row 3 · ministry columns | yes | 20×20 | circle | story-5__alt2.jpg |
| ev-jesus-resurrected | b5-0166 | Jesus resurrected | row 3 · ministry columns | yes | 20×20 | circle | — |
| ev-ascension | b5-0169 | Jesus’ ascension, 40th day after his resurrection | row 3 · ministry columns | yes | 20×20 | circle | — |
| ev-stephen | b6-0004 | Stephen martyred | row 3 · ministry columns | yes | 20×20 | circle | — |
| ev-saul-converted | b6-0006 | Saul of Tarsus converted on the road to Damascus | row 3 | yes | 20×20 | circle | — |
| ev-cornelius | b6-0010 | Cornelius, the first uncircumcised Gentile, becomes a C | row 3 | yes | 20×20 | circle | — |
| ev-paul-shipwreck | b6-0065 | Shipwreck on Malta; Paul winters there | row 3 | yes | 20×20 | circle | — |
| ev-john-on-patmos | b6-0099 | Apostle John exiled on Patmos receives the Revelation | row 3 | yes | 20×20 | circle | — |
| ev-wycliffe-bible | b7-0086 | Wycliffe's English Bible released | row 3 | yes | 20×20 | circle | — |
| ev-tamil-bible-complete | b7-0177 | Complete Bible in Tamil appears | turn 3 (right) | yes | 20×20 | circle | — |
| ev-golden-age-1919 | b8-0128 | First issue of The Golden Age | row 4 | yes | 20×20 | circle | — |
| ev-kingdom-hall-1935 | b8-0193 | Meeting place first called Kingdom Hall, in Honolulu | row 4 | yes | 20×20 | circle | — |
| ev-nwt-1950 | b9-0027 | New World Translation of the Christian Greek Scriptures | row 4 | yes | 20×20 | circle | — |
| ev-divine-will-1958 | b9-0052 | Divine Will International Assembly in New York | row 4 | no (tier 3; add to a0_extra.json) | 20×20 | circle | ev-advertise-the-king__alt1.jpg |
| ev-public-witnessing | b9-0284 | Metropolitan public witnessing begins | row 4 | yes | 20×20 | circle | — |
| ev-preaching-today | b9-0449 | 2025 Service Year Report: Memorial attendance 20,635,01 | row 4 | yes | 32×22 | rounded rect feature | — |
| ev-disaster-relief | b9-0282 | Relief and Kingdom Hall rebuilding after Japan tsunami | row 4 | no (tier 3; add to a0_extra.json) | 20×20 | circle | — |
| ev-resurrection-future | b10-0021 | Earthly resurrection of the righteous and the unrighteo | future path (bottom-left) | yes | 20×20 | circle | paradise__alt1.jpg |

## 5. Running

```bash
pip install openai                       # if missing
export OPENAI_API_KEY_FILE=~/path/to/keyfile   # or OPENAI_API_KEY; the key is never printed or logged
python3 scripts/gen_images.py --dry-run          # plan and count, no API calls
python3 scripts/gen_images.py --only p-moses,ev-manna,throne   # try a few first
python3 scripts/gen_images.py --kind new --limit 10
python3 scripts/gen_images.py --style-anchor private/images/ai/p-moses.png   # lock the look
```

Existing PNGs are skipped unless `--force` is given. Each call is logged to `private/images/ai/log.jsonl` (slot, mode, size, references, time and usage; no secrets). Review every output against the style guide before it goes on the sheet. Watch especially for Jehovah shown as a figure, halos or crosses, stray lettering, saturated colours and hard edges.
