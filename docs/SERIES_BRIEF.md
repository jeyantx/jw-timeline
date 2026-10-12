# Series research brief

You are adding **series** to a Bible + Jehovah's Witnesses timeline dataset. A series is an ordered set of timeline
records that belong together and will be highlighted together on the chart (own colour, connecting lines):
a prophecy and its fulfillments, the world powers of Daniel, the covenants, a reproduced jw.org chart.

Read first: `docs/AGENT_BRIEF.md` (sourcing rules), `docs/DATA_SCHEMA.md` (event records, v2),
`schema/series.schema.json` (series format), and look up existing records in `data/merged/timeline.json`.

## Hard rules
1. **Sources: only wol.jw.org and www.jw.org.** Every series cites the jw.org page(s) that present it as a group or
   sequence (e.g. NWT App. B1 for the promised offspring). Never invent docids, URLs, dates or interpretations.
   Follow current jw.org understanding; where an older publication differs, the newer wins and you note it.
2. **Reuse existing records.** Members point at existing ids (`b5-0163`, `b12-0023`, `d1-0024`…) whenever the event
   is already in the data. Search `data/merged/timeline.json` by year, title, people, scriptures.
3. **Add a record only when the series needs a step that is missing** — write it to YOUR batch file
   `data/raw/bNN.json` (schema v2, ids `bNN-0001…`), with jw.org sources, Tamil only copied from Tamil jw.org pages.
4. **Prophecy members:** the prophecy is anchored to the record of when it was spoken or written, if dated (e.g.
   Gen. 3:15 → `b1-0002` "Edenic covenant made; first prophecy"). If only the book is dated, anchor to the
   book's "writing completed" record from batch b11 (ids b11-00xx) and say so in the member `note`. Use
   `pairs_with` to link each prophecy member to its fulfillment member(s) and back.
5. **Labels:** `label_en` is the short caption as the series source words it. Tamil `label_ta` only from Tamil pages.
6. **Groups** (optional) hold sub-units with their prophetic symbols or attributes, e.g. a world power with
   "head of gold (Dan. 2:32, 36-38)" and "lion (Dan. 7:4)", or a covenant with its parties and purpose.
7. **Images:** record jw.org image URLs (chart page images, maps, illustrations) on the series `images`, with captions
   and `source_docid`. Do not download.
8. Do NOT edit any file other than your own `data/raw/bNN.json` and your own `data/series/<id>.json` files.

## Already generated automatically (do not create)
kings-of-judah, kings-of-israel, united-kingdom, rulers-of-persia, roman-emperors, watch-tower-presidents,
governing-body, judges-of-israel, bible-books-written, pre-flood-patriarchs, post-flood-patriarchs.

## Validate
`python3 scripts/validate.py data/raw/bNN.json data/series/<id>.json …` must report 0 problems.

## Report (≤300 words)
Series created (id, members, how many new records you added), sources used, Tamil coverage, anything jw.org does
not support that you therefore left out.
