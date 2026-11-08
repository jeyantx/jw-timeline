# Image crops (focal points)

Set in `data/curation/a0_sheet.json` → `focus` (built into `D.focus` in a0v5/real.js by scripts/build_a0_sheet.py).
Format per slot: `[object-position x%, object-position y%, zoom, transform-origin x%, transform-origin y%]`.
The first two numbers are computed from the subject point (fraction of the image) so that the subject sits as close to the slot centre as cover-fit allows; the last two are where the subject lands inside the slot, used as the zoom origin (index.html falls back to x,y when they are absent).
Slot sizes used: event medallions 19.6 mm circle; pre-*/creation-day-* 14 mm circle; throne 52 mm; eden 146×41 mm; paradise 312×143 mm; story-* square.
To recompute after changing a subject point, keep the subject column below (image fractions) and re-run the same calculation (o = (p − v/2)/(1 − v), v = visible fraction of the image along that axis).
Slots without an entry use the defaults in index.html (ev-* 50% 26%, others 50% 40%). ref-daniel-* slots are not placed on the sheet; ev-tamil-new-testament has no image.

| slot | file | subject | focus | note |
| throne | throne.jpg | subject 55% 50%, zoom 1.1 | [60.0, 50.0, 1.1, 50.0, 50.0] | Jesus beside the throne, centre of the glow |
| pre-1 | pre-1.jpg | subject 50% 35%, zoom 1.2 | [50.0, 50.0, 1.2, 50.0, 35.0] | archangel figure; stand-in for the Word |
| pre-2 | pre-2.jpg | subject 60% 50%, zoom 1.0 | [70.0, 50.0, 1.0, 50.0, 50.0] | angels before God (Job 1); Satan is in this scene, see report |
| pre-3 | pre-3.jpg | subject 40% 50%, zoom 1.4 | [50.0, 50.0, 1.4, 40.0, 50.0] | star field; keep the photo credit on the right edge out of the circle |
| pre-4 | pre-4.jpg | subject 50% 35%, zoom 1.0 | [50.0, 50.0, 1.0, 50.0, 35.0] | volcanoes on the primitive earth |
| creation-day-1 | creation-day-1__alt2.jpg | subject 60% 55%, zoom 1.0 | [70.0, 50.0, 1.0, 50.0, 55.00000000000001] | sun rising (light) |
| creation-day-2 | creation-day-2__alt2.jpg | subject 50% 50%, zoom 1.0 | [50.0, 50.0, 1.0, 50.0, 50.0] | earth from space; badge "25" at right kept out |
| creation-day-3 | creation-day-3__alt2.jpg | subject 50% 50%, zoom 1.0 | [50.0, 50.0, 1.0, 50.0, 50.0] | sprout; badge "06" at right kept out |
| creation-day-4 | creation-day-4__alt2.jpg | subject 40% 45%, zoom 1.0 | [30.0, 50.0, 1.0, 50.0, 45.0] | sun and planets |
| creation-day-5 | creation-day-5__alt2.jpg | subject 50% 42%, zoom 1.0 | [50.0, 0, 1.0, 50.0, 44.8] | whale, hummingbird |
| creation-day-6 | creation-day-6__alt2.jpg | subject 55% 72%, zoom 1.0 | [50.0, 94.0, 1.0, 55.00000000000001, 50.0] | lions and deer (lower half) |
| eden | eden.jpg | subject 50% 45%, zoom 1.0 | [50.0, 38.6, 1.0, 50.0, 50.0] | waterfall and animals |
| paradise | paradise.jpg | subject 50% 70%, zoom 1.0 | [50.0, 88.9, 1.0, 50.0, 50.0] | river valley and path (lower part; top fades) |
| story-1 | story-1.jpg | subject 45% 45%, zoom 1.0 | [40.0, 50.0, 1.0, 50.0, 45.0] | Eve and the fruit |
| story-2 | story-2.jpg | subject 60% 50%, zoom 1.0 | [70.0, 50.0, 1.0, 50.0, 50.0] | Abraham looking up |
| story-3 | story-3.jpg | subject 42% 50%, zoom 1.0 | [34.0, 50.0, 1.0, 50.0, 50.0] | David with harp |
| story-4 | story-4.jpg | subject 75% 45%, zoom 1.0 | [100, 50.0, 1.0, 50.0, 45.0] | Jesus at his baptism |
| story-5 | story-5.jpg | subject 30% 42%, zoom 1.0 | [10.0, 50.0, 1.0, 50.0, 42.0] | Jesus face (eyes, nose, thorns); source is an extreme close-up (R-turn2 #18) |
| story-6 | story-6.jpg | subject 62% 62%, zoom 1.7 | [100, 50.0, 1.7, 51.4, 62.0] | heavenly throne; zoomed so the printed "1914 C.E." (left) stays out of the circle (R-gutter #1) |
| story-7 | story-7.jpg | subject 45% 50%, zoom 1.0 | [40.0, 50.0, 1.0, 50.0, 50.0] | Jesus as King on throne |
| ev-adam-created | ev-adam-created.jpg | subject 78% 40%, zoom 1.3 | [100, 50.0, 1.3, 56.0, 40.0] | Adam and Eve, right side |
| ev-the-flood | ev-the-flood.jpg | subject 50% 50%, zoom 1.0 | [50.0, 50.0, 1.0, 50.0, 50.0] | the ark |
| ev-abraham-crosses-the-euphrates | ev-abraham-crosses-the-euphrates.jpg | subject 30% 45%, zoom 1.2 | [0, 50.0, 1.2, 50.0, 45.0] | Abraham on camel and Sarah |
| ev-red-sea-crossing | ev-red-sea-crossing.jpg | subject 50% 62%, zoom 1.0 | [50.0, 98.0, 1.0, 50.0, 50.0] | walls of water and people |
| ev-law-covenant-at-sinai | ev-law-covenant-at-sinai.jpg | subject 50% 45%, zoom 1.0 | [50.0, 30.0, 1.0, 50.0, 50.0] | lightning over Sinai, people below |
| ev-jericho-falls | ev-jericho-falls.jpg | subject 40% 40%, zoom 1.0 | [30.0, 50.0, 1.0, 50.0, 40.0] | walls falling |
| ev-gideon-s-300 | ev-gideon-s-300.jpg | subject 45% 45%, zoom 1.0 | [40.0, 50.0, 1.0, 50.0, 45.0] | torches and horns |
| ev-saul-dies | ev-saul-dies.jpg | subject 55% 45%, zoom 1.2 | [60.0, 50.0, 1.2, 50.0, 45.0] | STAND-IN: Saul rips Samuel's robe (rejection), not his death |
| ev-david-and-goliath | ev-david-and-goliath.jpg | subject 55% 45%, zoom 1.0 | [60.0, 50.0, 1.0, 50.0, 45.0] | David slinging, Goliath behind |
| ev-temple-completed | ev-temple-completed.jpg | subject 55% 45%, zoom 1.0 | [60.0, 50.0, 1.0, 50.0, 45.0] | fire on the altar |
| ev-queen-of-sheba | ev-queen-of-sheba.jpg | subject 60% 50%, zoom 1.0 | [70.0, 50.0, 1.0, 50.0, 50.0] | queen before Solomon's throne |
| ev-kingdom-divided | ev-kingdom-divided.jpg | subject 42% 45%, zoom 1.0 | [34.0, 50.0, 1.0, 50.0, 45.0] | Ahijah tearing the garment, Jeroboam |
| ev-elijah-on-mount-carmel | ev-elijah-on-mount-carmel.jpg | subject 55% 40%, zoom 1.0 | [60.0, 50.0, 1.0, 50.0, 40.0] | fire from heaven |
| ev-jonah-in-nineveh | ev-jonah-in-nineveh__alt2.jpg | subject 50% 40%, zoom 1.1 | [50.0, 50.0, 1.1, 50.0, 40.0] | alt2: Jonah and the big fish (matches the label; primary showed Jonah approaching Nineveh) |
| ev-isaiah | ev-isaiah.jpg | subject 55% 25%, zoom 1.5 | [60.0, 50.0, 1.5, 50.0, 25.0] | STAND-IN: generic prophet; face |
| ev-hezekiah | ev-hezekiah.jpg | subject 30% 28%, zoom 1.15 | [10.0, 50.0, 1.15, 50.0, 28.000000000000004] | Hezekiah prays over Sennacherib's letters; MISMATCH: label is Hezekiah Passover (b18-0040); moving the slot to b3-0077 dropped two tier-1 labels, so reverted |
| ev-josiah | ev-josiah.jpg | subject 50% 45%, zoom 1.0 | [50.0, 50.0, 1.0, 50.0, 45.0] | Josiah and Shaphan with scroll |
| ev-jeremiah | ev-jeremiah.jpg | subject 50% 50%, zoom 1.2 | [50.0, 50.0, 1.2, 50.0, 50.0] | Jeremiah smashing the jar |
| ev-jerusalem-destroyed | ev-jerusalem-destroyed__alt1.jpg | subject 50% 60%, zoom 1.0 | [50.0, 50.0, 1.0, 50.0, 60.0] | alt1: burning walls (primary wide city unreadable at 20 mm) |
| ev-fiery-furnace | ev-fiery-furnace.jpg | subject 50% 50%, zoom 1.3 | [50.0, 50.0, 1.3, 50.0, 50.0] | four men in the fire |
| ev-babylon-falls | ev-babylon-falls.jpg | subject 50% 65%, zoom 1.0 | [50.0, 100, 1.0, 50.0, 53.4] | gate and soldiers |
| ev-daniel-in-the-lions-pit | ev-daniel-in-the-lions-pit.jpg | subject 50% 40%, zoom 1.4 | [50.0, 50.0, 1.4, 50.0, 40.0] | Daniel among the lions |
| ev-esther-made-queen | ev-esther-made-queen.jpg | subject 25% 15%, zoom 1.5 | [50.0, 0, 1.5, 25.0, 19.7] | Esther's face |
| ev-jesus-born | ev-jesus-born__alt1.jpg | subject 60% 55%, zoom 1.2 | [70.0, 50.0, 1.2, 50.0, 55.00000000000001] | alt1: Joseph, Mary and baby (primary is mostly sky at 20 mm) |
| ev-pentecost-sowing-begins | ev-pentecost-sowing-begins.jpg | subject 45% 45%, zoom 1.2 | [40.0, 50.0, 1.2, 50.0, 45.0] | disciple speaking to the crowd |
| ev-paul-at-the-areopagus | ev-paul-at-the-areopagus.jpg | subject 28% 50%, zoom 1.3 | [6.0, 50.0, 1.3, 50.0, 50.0] | Paul speaking |
| ev-jerusalem-destroyed-70 | ev-jerusalem-destroyed-70.jpg | subject 50% 55%, zoom 1.0 | [50.0, 72.7, 1.0, 50.0, 50.0] | Romans storming the temple |
| ev-gutenberg-bible | ev-gutenberg-bible.jpg | subject 60% 55%, zoom 1.0 | [70.0, 50.0, 1.0, 50.0, 55.00000000000001] | STAND-IN: early printed Bible in an exhibit |
| ev-bible-class-in-allegheny | ev-bible-class-in-allegheny.jpg | subject 50% 35%, zoom 1.0 | [50.0, 50.0, 1.0, 50.0, 35.0] | study group silhouettes |
| ev-watch-tower-1879 | ev-watch-tower-1879.jpg | subject 50% 12%, zoom 1.6 | [50.0, 0, 1.6, 50.0, 16.5] | masthead ZION'S WATCH TOWER |
| ev-photo-drama-of-creation | ev-photo-drama-of-creation.jpg | subject 60% 33%, zoom 1.0 | [50.0, 0, 1.0, 60.0, 49.9] | title CREATION and Russell |
| ev-kingdom-born-1914 | ev-kingdom-born-1914.jpg | subject 40% 45%, zoom 1.0 | [4.2, 50.0, 1.0, 50.0, 45.0] | "1914" and the throne |
| ev-advertise-the-king | ev-advertise-the-king.jpg | subject 85% 45%, zoom 1.0 | [100, 50.0, 1.0, 70.0, 45.0] | J. F. Rutherford speaking (right of the photo) |
| ev-name-jehovah-s-witnesses | ev-name-jehovah-s-witnesses.jpg | subject 50% 35%, zoom 1.0 | [50.0, 9.3, 1.0, 50.0, 50.0] | STAND-IN: 1931 programme cover, title |
| ev-gilead-school-opens | ev-gilead-school-opens.jpg | subject 50% 50%, zoom 1.0 | [50.0, 50.0, 1.0, 50.0, 50.0] | students and GILEAD sign |
| ev-revised-nwt | ev-revised-nwt.jpg | subject 40% 50%, zoom 1.0 | [30.0, 50.0, 1.0, 50.0, 50.0] | revised NWT open |
| ev-jw-broadcasting-begins | ev-jw-broadcasting-begins.jpg | subject 50% 50%, zoom 1.4 | [50.0, 50.0, 1.4, 50.0, 50.0] | JW Broadcasting logo |
| ev-armageddon | ev-armageddon.jpg | subject 50% 35%, zoom 1.3 | [50.0, 0, 1.3, 50.0, 46.7] | Jesus on the white horse |
