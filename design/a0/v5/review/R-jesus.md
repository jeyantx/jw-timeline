# R-jesus: Row 3 Jesus section (2 B.C.E.–33 C.E., x 185–660, y 360–500)

Shots: /tmp/sw-jesus-185.png, -300, -415, -535 (Z=5), plus -fwtop, -fwbot, -stone (Z=6).
Overlaps were checked from the SVG text bounding boxes in the browser. Column and day assignment were checked against `real.js` D.jes and `data/merged/timeline.json`.

**Summary**
- **Tier-1 events present:** all eight. Baptism (29), Cana (29, fall), Transfiguration (a. 32), Lazarus (a. 32), entry into Jerusalem (Nisan 9), Lord's Evening Meal (Nisan 14), death (Nisan 14) and resurrection (Nisan 16) are all labelled.
- **Ministry columns:** every column item is in the right Passover year. Within each column, items are evenly spaced in sort order, which is by design.
- **Nisan numbers 8–16:** the numbers and cells are correct (555 → 640 mm, 9.44 mm per day).
- **Main problems:** collisions at the right edge of the final week, many final-week events with no label, and a few data mistakes.

## Defects, most visible first

1. **(x 490–600, y 484–488) The STONE pill covers two labels.** The pill "THE STONE · CUT OUT IN 1914 → STRIKES AT ARMAGEDDON · Da 2:34, 44" sits on top of "32 Sends out the 70; they return joyful" (the title shows only "32 S…") and "a. 32 Jesus visits Zacchaeus" (overlap about 36 × 3 mm). The gold dashed stone line also runs through "c. 33 Dies on torture stake" at y 486 and strikes out the "c. 33" year tag. This tier-1 death label is hard to read. Likely cause: the stone path or pill (`drawStone`) is drawn over the Jesus label band below the row. Move the stone path lower (y > 492) or below the label layer, or reserve its band in the label packer. **FIX-PANELS** (stone), with **FIX-LABELS** if the packer must avoid the band.

2. **(x 636–645, y 400–410) The Pentecost leader line crosses "33 Jesus resurrected".** The leader at x ≈ 640.5 runs through "33 Jesus resurrected" (label starts at x 636). The same line crosses the meta "33, Nisan 14 · Mt 26:30…" of "Jesus' betrayal and arrest" (y 399) and "Pilate and Herod 33, Nisan 14 · Mt 27:2…" (y 391). Labels for Nisan 14 and 16 are anchored 'start' at x 617/636 and run about 30–50 mm right, into the FIRST CHRISTIANS zone (x ≥ 640). Likely cause: `drawEvents` uses separate packers per zone ('J' vs 'R3'), so labels in zone J do not reserve space against the leaders and labels of zone R3. Anchor the Nisan 14 and 16 labels 'end' (to the left), or share one packer across zones J and R3. **FIX-LABELS**

3. **(x 617–660, y 465–472) "33 Institutes the Lord's Evening Meal 33, Nisan 14 · Mt 26…" runs under "33–1914 Wheat and weeds grow together".** The two labels overlap by 8.8 mm horizontally, with about 0.6 mm vertical clearance, and the Wheat leader at x 641 crosses the Lord's Evening Meal meta. Same cause as item 2. **FIX-LABELS**

4. **(x 588–610) Final week: Nisan 11 and 12 have no labels at all.** Only 10 of the 28 final-week items get a label. All four Nisan 11 items have none, including "Gives sign of future presence" (Mt 24). So does the only Nisan 12 item ("Judas arranges betrayal"). Nisan 10 shows only the fig tree. On Nisan 14, nine of the 15 items are dropped, including "Eats Passover with apostles", "Peter denies Jesus" and "Jesus' body placed in tomb". There is free space above the band at x 585–612, y 365–385, and below it at x 585–612, y 455–470. Likely cause: the `drawEvents` packer places everything on one point per day (x = day centre), so the stack fills fast. Allow stacking at the same x for days 11 and 12, or show at least one tier-2 item per day. **FIX-LABELS**

5. **(x 606, y 409–411) The violet "prophecy" triangle for 33.25 sits on Nisan 13, not Nisan 14.** `drawCaptions` puts triangles at `[…,29.75,33.25,…]` using `X(2,33.25)`, which is x 606.0. On the stretched day strip, x 606 falls in Nisan 13 (cell 602.2–611.7). The Nisan 14 cell is 611.7–621.1 (centre 616.4, where the death pill is). Use `t = 33.235 + 6.5/9*0.025`, or snap to the death station. The triangle also sits on the meta "Mt 21:1-11, 14-17" of "33 Jesus enters Jerusalem". **FIX-PANELS** (`draw2.js` `drawCaptions`, line 123)

6. **(x 222.7, y 409–411) The 29.75 triangle sits on "Lu 1:26-56".** This is the meta of "c. 2 Gabriel foretells Jesus' birth" (label at x 191, line 2 at y ≈ 407–410). Either lift the label one slot higher or shift the triangle. **FIX-LABELS** / **FIX-PANELS**

7. **(Nisan 16, x 635) "Disciple-making commission" is put on Nisan 16, but the source says "33 C.E., After Nisan 16"** (b5-0168, Mt 28:16-20, sort_key 33.27). `jesus_column()` returns None for t ≥ 33.235 with no hebrew_day, and the fill-forward loop then gives it the last day ('d16'). It should go after the strip (t ≈ 33.27–33.42, in zone R3), or be skipped. **FIX-FILL** (`scripts/build_a0_sheet.py` `jesus_column` / `events`)

8. **"c. 33 Dies on torture stake": the "c." is wrong.** The date is "33 C.E., Nisan 14 (c. 3:00 p.m., Friday)". The precision 'approx' refers to the hour, but `year_tag()` puts PREFIX['approx'] = "c." on the year. The year 33 and Nisan 14 are exact. "Body placed in tomb" (b5-0164) has the same problem. Suggested fix: when hebrew_day is set, use no prefix. **FIX-FILL** (`year_tag`)

9. **"Jesus cleanses temple again" (Nisan 10) shows "Mt 21:18, 19"**, which is the fig-tree passage. The record's scriptures list Matt. 21:18, 19 first, then Matt. 21:12, 13 (the cleansing). `scripture()` always takes `[0]`. Use Mt 21:12, 13 for b5-0133 (an override in curation, or prefer a ref that matches the title). The label is currently dropped (item 4), but it will show once that is fixed. **FIX-FILL** (or **OWNER** for the data order)

10. **Nisan 13 and Nisan 15 cells are empty** (x 602–612 and 621–631). The only events in timeline.json for those days are tier 3/4 and `poster=False`: b5-0148 "Prepares for last Passover" (Nisan 13) and b5-0165 "Priests and Pharisees get guard for tomb and seal it" (Nisan 15). Two of the nine day cells look blank. Promote these to poster? **OWNER**

11. **(x 617–650, y 384–400) Three tier-1 Nisan 14 labels are packed into the same 30 mm.** "Jesus before Pilate and Herod" (y 388), "Jesus' betrayal and arrest" (y 396) and "33 Christian congregation founded" (x 641, y 381) sit above the band with 0.6 mm clearance. The order is reversed: "Pilate" is above "betrayal", so reading top-down gives Pilate before the arrest. Likely cause: the packer fills slots nearest the band first, in sort order. **FIX-LABELS**

12. **(x 224, y 462–480) Three labels stack at the same x below the band.** "29–33 Jesus' earthly ministry", "29–36 The 70th week of years" (above the band at y 396) and "29 Jesus baptized and anointed" stack with 0.6 mm clearance. The meta "29, fall · Mt 3:13-17" collides with "2 Augustus orders" (x 198) and "29 John identifies" (x 258) at y 476 (overlaps of 1.7 and 13.8 mm × 0.7 mm). The baptism, the start of the ministry, has no image slot and reads as a minor label. **FIX-LABELS**; image slot **OWNER/FIX-IMAGES**

13. **(x 330–380, y 400–407) "30 Cleanses the temple" sits close to "the Samaritans 30, Passover · Joh 4:4-43"** (11 mm horizontal overlap with 0.7 mm vertical clearance). That label in turn sits close to "30 Jesus reads from" (27 mm). The text touches at Z=5. **FIX-LABELS**

14. **(x 417–480, y 378–396) The 31–32 column labels stack 5 deep with lines touching.** "Sends demons into swine", "Jesus heals woman's flow of blood", "Kingdom illustrations", "Herod beheads" and "Keys of the Kingdom" sit with 0.7 mm vertical clearance and overlaps of 17–32 mm. They are readable but cramped. **FIX-LABELS** (low)

15. **(x 457–535, y 473–480) "c. 32 Jesus feeds 5,000 men" sits on top of "make Jesus king 32, near Passover (Joh 6:4)…".** The overlap is 36 mm; the second of these then sits on "32 Jesus visits Mary" (24 mm). **FIX-LABELS**

16. **"32, near Passover (Joh 6:4)" meta is long (about 45 mm) and repeated three times** (feeds 5,000, try to make him king, walks on sea), which crowds the space below the band around x 455–515. Shorten it to "32, near Passover" in the meta (the scripture is already there). **FIX-FILL** (meta from `date_label_en`) / **FIX-TEXT**

17. **Unlabelled tier-2 items in the ministry columns:** "Jairus' daughter" (x 438.8), "Third tour of Galilee" (444.5), "Jesus foretells his death" (479.1) and "Steward; rich man and Lazarus" (527.7). They show only as station dots. Acceptable if intended. **OWNER**

18. **(x 190–201) The birth stretch, 2 B.C.E.–29 C.E., is 25 mm wide, and these labels are dropped:** "Jesus presented at the temple", "Astrologers visit", "Family flees to Egypt", "Herod kills young boys" and "Boy Jesus at the temple (12 C.E.)". Only Gabriel (×1), Angels, Jesus born and Augustus show. The boy Jesus at 12 is a well-known event. **OWNER** (scale) / **FIX-LABELS**

19. **(x 555–640, y 446–450) The day strip has no "PASSOVER 33" marker.** There is no dashed line like PASSOVER 30/31/32 at Nisan 14 (x 611.7). The first three Passovers are marked; the fourth, the one Jesus died at, is not. Add it to the list in `draw.js` line 22 with `t = 33.235 + 6/9*0.025`. **FIX-STRUCT**

20. **(x 556, y 446) The "NISAN" word sits above the "8" with only about 1.5 mm between them.** It reads like part of the day scale, but at A0 size it is tiny (2.4 mm). Consider "NISAN 33 C.E." for context. **FIX-STRUCT** (low)

## Checked OK
- **Column 0** (215–300, fall 29 → Passover 30): baptism, temptation, Lamb of God, first disciples, Cana.
- **Column 1** (Passover 30 → 31): temple cleansing, Nicodemus, Samaritans (the source says "30, Passover"), Kingdom near, Isaiah scroll, four disciples, paralytic.
- **Column 2** (Passover 31 → 32): Bethzatha → walks on sea. The "near Passover 32" items sit just left of the PASSOVER 32 line, which is correct (Joh 6:4).
- **Column 3** (Passover 32 → Nisan 8 of 33): keys of the Kingdom → Zacchaeus, in source order.
- **Day assignment of final-week items:** all match `hebrew_day` in timeline.json (8, 9, 9, 10, 10, 10, 11×4, 12, 14×12, 16×2), except item 7.
