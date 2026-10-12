# Data schema — timeline records (v2)

Every record in `data/merged/timeline.json` describes **one event or one period** from the Bible or the history of Jehovah's Witnesses. Every record cites at least one page on wol.jw.org or www.jw.org.

The machine-readable contract is [`schema/event.schema.json`](../schema/event.schema.json). This page explains it.

## 1. Two kinds of record: points and spans

| `timing` | meaning | examples | how the app/chart draws it |
|---|---|---|---|
| `point` | happened at one moment | Jesus dies, Nisan 14, 33 C.E. · Name *Jehovah's Witnesses* adopted, July 26, 1931 | a marker |
| `span` | lasted from a start to an end | Life of Abraham 2018–1843 B.C.E. · Reign of Asa 978–937 B.C.E. · Paul's second journey c. 49–52 C.E. · Russia ban 2017– (ongoing) | a bar from start to end |

A point can be **uncertain**: it happened once, but the source only gives a window ("31 or 32 C.E.", "Galatians written c. 50–52 C.E."). It stays a `point`, uses `precision: "between"`, and carries `start.latest`. Draw it as a marker with a faint whisker to `latest`, **not** as a bar.

Spans and points link to each other. A lifespan's `start_event_id` and `end_event_id` point at the birth and death records. Draw the bar and keep the two markers as well.

## 2. Top-level fields

| field | type | required | notes |
|---|---|---|---|
| `id` | string | ✓ | **Stable** id = batch prefix + sequence: `b3-0017` (research batch 3), `d1-0024` (derived span). Never reused; safe for deep links. Derived ids are pinned by slug in `data/derived/id_registry.json` (append-only). |
| `slug` | string | ✓ | kebab-case, readable |
| `timing` | `point` \| `span` | ✓ | see §1 |
| `span_kind` | enum \| null | spans | `lifespan`, `reign`, `office`, `ministry`, `prophetic_activity`, `judgeship`, `journey`, `residence`, `imprisonment`, `captivity`, `exile`, `construction`, `war`, `campaign`, `persecution`, `ban`, `council`, `convention`, `assembly`, `school`, `writing`, `translation`, `copying`, `publication`, `broadcast`, `world_power`, `prophetic_period`, `period`, `festival`, `other`. Null for points. |
| `date_label_en` | string | ✓ | The whole date **as printed by the source**: `1513 B.C.E., Nisan 14`, `c. 940–c. 906 B.C.E.`, `April 19-25, 1891`. Show this text; never reformat it. |
| `date_label_ta` | string \| null | | Tamil label, copied from a Tamil jw.org page. Null when no Tamil page exists. |
| `start` | DatePoint | ✓ | For a point: the moment. For a span: when it began. |
| `end` | DatePoint \| null | spans | Null for points. |
| `duration` | Duration \| null | | Length of a span. See §4. |
| `start_event_id` | id \| null | | Span only: the point record that marks the start, such as a birth or accession. |
| `end_event_id` | id \| null | | Span only: the point record that marks the end, such as a death or the successor's accession. |
| `parent_id` | id \| null | | An enclosing span. For example, Tola's judgeship sits inside the Period of the Judges, and David's reign in Hebron inside David's reign. |
| `child_ids` | id[] | merged only | The inverse of `parent_id`. The merge step adds it. |
| `derived` | Derived \| null | | Set when the pipeline built the record or computed a value instead of copying it from a source. See §5. |
| `title_en` / `title_ta` | string / string \| null | ✓ / | Short headline. Tamil is never machine-translated. |
| `description_en` / `description_ta` | string / string \| null | ✓ / | 1–3 sentences, faithful to the source. |
| `category` | enum | ✓ | 32 values grouped by band: `bible.*`, `history.*`, `jw.*`, `future.prophecy`. |
| `event_kind` | string \| null | | Free label: `birth`, `death`, `accession`, `release`, `court_ruling`, `convention`… |
| `tags`, `people`, `places` | string[] | | For search and filters. |
| `scriptures` | Scripture[] | ✓ | May be empty. |
| `sources` | Source[] | ✓ | At least 1. jw.org or wol.jw.org only. |
| `images` | Image[] | | jw.org image URLs with captions. Images are linked, not downloaded. |
| `conflicts` | Conflict[] | | Where two jw.org publications differ. |
| `importance` | 1 \| 2 \| 3 \| null | | Tier for chart/zoom. Null until the owner assigns it. |
| `related_ids` | id[] | | Linked records. |
| `notes` | string \| null | | Researcher or pipeline notes. |
| `batch`, `source_ids`, `merged_from` | | merged only | Provenance added by `scripts/merge.py`. |
| `chart_hint` | enum \| null | merged only | `covered_by_span`, `span_endpoint`, `index_entry` or null. See §11. |
| `endpoint_of` | object[] | merged only | `{span_id, as: start\|end, span_kind, span_title}` for every span this point starts or ends. |
| `series` | object[] | merged only | Series this record belongs to: `{id, order, role, group, label_en, label_ta, pairs_with, auto, highlight}`. See §10. |

## 3. DatePoint (`start`, `end`)

| field | type | notes |
|---|---|---|
| `display_en` / `display_ta` | string \| null | This endpoint as printed, e.g. `c. 940 B.C.E.`. Null when the source only prints the whole label. |
| `year` | int ≥ 1 \| null | Positive. The sign is carried by `era`. There is no year 0, so 1 B.C.E. is followed by 1 C.E. |
| `era` | `BCE` \| `CE` \| null | |
| `month`, `day` | int \| null | Gregorian calendar. |
| `hebrew_month`, `hebrew_day` | string, int \| null | `Nisan` … `Adar`. |
| `season` | `spring` \| `summer` \| `autumn` \| `winter` \| null | |
| `precision` | enum | see table below |
| `latest` | object \| null | Only with `between`: `{year, era, month, day, sort_key}` of the latest possible moment. |
| `sort_key` | number | Signed decimal year for ordering and drawing: B.C.E. is negative, C.E. positive, and the fraction gives the position within the year. The undated future uses `100000 + n`. |

**Precision values**

| value | printed as | meaning | suggested glyph |
|---|---|---|---|
| `exact` | `1513 B.C.E.` | no qualifier | solid dot / solid bar end |
| `approx` | `c. 1473 B.C.E.` | circa | hollow dot / soft bar end |
| `before` | `b. 1000 B.C.E.` | on or before | half dot, open to the left |
| `after` | `a. 443 B.C.E.` | on or after | half dot, open to the right |
| `between` | `31 or 32 C.E.` · `c. 50-52 C.E.` | one moment inside the window `start`…`latest` | dot with whisker |
| `unknown` | *no year printed* | jw.org gives no date for this endpoint; `sort_key` only keeps order | dashed bar end, no axis label |
| `ongoing` | `2017–` | span has not ended (end only) | bar fading into "now" |
| `undated` | *future* | prophetic sequence with no date | position in the ordered "Future" band |

## 4. Duration

```json
{"years": 41, "months": null, "days": null, "display_en": "41 years", "display_ta": null, "approx": false, "derived": false}
```

- **Printed** (`derived: false`) means the length is copied from the source: "Asa … (41 years)", "Tola judges Israel 23 years", "18 months".
- **Computed** (`derived: true`) means it was worked out from `start` and `end`. If both ends have a month, it is rounded to the nearest half year ("c. 33½ years"). Otherwise it is the difference of the year numbers, with no year 0.
- When the printed length and the endpoints disagree, the printed length is kept and `notes` explains the difference. An example is Omri's 4-year rivalry plus 8 years of sole rule.

## 5. Derived records and values

The pipeline never invents a date. It does two things:

1. **Pairs existing sourced events into spans.** Lifespans pair a birth with a death. Reigns run from an accession to the successor's accession, as NWT Appendix A6 lays the kings out, or to the king's death or the end of the kingdom.
   Where a research batch sources the same span directly (b12: reigns of Saul, David, Solomon, Nebuchadnezzar, Cyrus…), the sourced record is used and no derived copy is made.
2. **Computes values from printed ones.** These are durations, and the end of a reign shorter than a year.

`derived` records which of these happened:

```json
"derived": {"method": "successor_accession", "fields": ["start", "end"],
            "note": "Start b3-0017; ends when Abijah becomes king (b3-0021), as laid out in NWT Appendix A6."}
```

`method` is one of `paired_events`, `successor_accession`, `start_plus_duration`, `parsed_from_label` or `manual`. A derived record still cites the jw.org sources of both input events. Each source carries `supports: "start"` or `"end"`, so the app can show which page backs which end.

The UI should show a small "computed" marker on derived values, such as the duration or a reign's end. The tooltip text comes from `derived.note`.

## 6. Scripture, Source, Image, Conflict

```json
"scriptures": [{"ref_en": "Luke 23:33", "ref_ta": "லூக். 23:33", "book": "Luke", "book_num": 42, "chapter": 23, "verses": "33"}]
"sources": [{"docid": "1001070214", "publication": "NWT Study Edition App. A7-H", "title_en": "…", "title_ta": "…",
             "url_en": "https://wol.jw.org/en/wol/d/r1/lp-e/1001070214", "url_ta": "https://wol.jw.org/ta/wol/d/r122/lp-tl/1001070214",
             "finder_url": "https://www.jw.org/finder?docid=1001070214&wtlocale=E", "par": null,
             "quote_en": "short supporting excerpt", "supports": "start"}]
"images": [{"url": "https://wol.jw.org/en/wol/mp/r1/lp-e/nwtsty/2026/44", "caption_en": "…", "caption_ta": "…", "source_docid": "1001070214", "kind": "map"}]
"conflicts": [{"docid": "1101990130", "value": "977 B.C.E.", "note": "All Scripture (1990) table gives 977; NWT App. A6 gives 978 (accession vs first regnal year)."}]
```

- `finder_url` switches language when you change `wtlocale`: `E` for English, `TL` for Tamil.
- `supports` is used on spans: `start`, `end`, `duration` or `whole`.

## 7. Examples (real records, trimmed)

**Point**

```json
{"id": "b5-0163", "timing": "point", "date_label_en": "33 C.E., Nisan 14 (c. 3:00 p.m., Friday)",
 "date_label_ta": "கி.பி. 33, நிசான் 14 (மதியம் சுமார் 3 மணி, வெள்ளி)",
 "start": {"year": 33, "era": "CE", "hebrew_month": "Nisan", "hebrew_day": 14, "season": "spring", "precision": "approx", "sort_key": 33.2528},
 "end": null, "title_en": "Dies on torture stake", "title_ta": "சித்திரவதைக் கம்பத்தில் இறந்துபோகிறார்"}
```

**Uncertain point**

```json
{"id": "b5-0058", "timing": "point", "date_label_en": "31 or 32 C.E.", "date_label_ta": "கி.பி. 31 அல்லது 32",
 "start": {"year": 31, "era": "CE", "precision": "between", "latest": {"year": 32, "era": "CE", "sort_key": 32.0}, "sort_key": 31.8},
 "end": null, "title_en": "Jesus gives Kingdom illustrations"}
```

**Span from a source's printed range** (research batches also contain spans sourced directly as periods, e.g. `b12-0024` "The 70 years of Judah's desolation, 607–537 B.C.E.")

```json
{"id": "b3-0032", "timing": "span", "span_kind": "prophetic_activity", "date_label_en": "c. 940–c. 906 B.C.E.",
 "start": {"display_en": "c. 940 B.C.E.", "year": 940, "era": "BCE", "precision": "approx", "sort_key": -940.0},
 "end":   {"display_en": "c. 906 B.C.E.", "year": 906, "era": "BCE", "precision": "approx", "sort_key": -906},
 "duration": {"years": 34, "display_en": "c. 34 years", "approx": true, "derived": true},
 "title_en": "Prophetic activity of Elijah"}
```

**Derived lifespan linked to its birth and death records**

```json
{"id": "d1-0024", "timing": "span", "span_kind": "lifespan",
 "date_label_en": "2 B.C.E., c. Oct. 1 – 33 C.E., Nisan 14 (c. 3:00 p.m., Friday)",
 "start": {"year": 2, "era": "BCE", "month": 10, "day": 1, "precision": "approx", "sort_key": -1.25},
 "end":   {"year": 33, "era": "CE", "hebrew_month": "Nisan", "hebrew_day": 14, "precision": "approx", "sort_key": 33.2528},
 "duration": {"years": 33.5, "display_en": "c. 33½ years", "approx": true, "derived": true},
 "start_event_id": "b5-0006", "end_event_id": "b5-0163",
 "derived": {"method": "paired_events", "fields": ["start", "end", "duration"], "note": "Built from b5-0006 (start) and b5-0163 (end)."},
 "title_en": "Jesus' earthly life"}
```

**Reign ending at the successor's accession**

```json
{"id": "d1-0032", "timing": "span", "span_kind": "reign", "date_label_en": "997 B.C.E. – 980 B.C.E.",
 "date_label_ta": "கி.மு. 997 – கி.மு. 980",
 "duration": {"years": 17, "display_en": "17 years", "derived": false},
 "start_event_id": "b3-0017", "end_event_id": "b3-0021",
 "derived": {"method": "successor_accession", "note": "Start b3-0017; ends when Abijah becomes king (b3-0021), as laid out in NWT Appendix A6."},
 "title_en": "Reign of Rehoboam (Judah)"}
```

**Span whose years jw.org does not state (order and length only)**

```json
{"id": "b2-0067", "timing": "span", "span_kind": "judgeship",
 "date_label_en": "Period of the Judges (c. 1450–c. 1120 B.C.E.; date not stated)",
 "start": {"era": "BCE", "precision": "unknown", "sort_key": -1245},
 "end":   {"era": "BCE", "precision": "unknown", "sort_key": -1222.0},
 "duration": {"years": 23, "display_en": "23 years", "derived": false},
 "parent_id": "b2-0057", "title_en": "Tola judges Israel 23 years"}
```

**Multi-day span**

```json
{"id": "b8-0050", "timing": "span", "span_kind": "convention", "date_label_en": "April 19-25, 1891",
 "start": {"year": 1891, "era": "CE", "month": 4, "day": 19, "precision": "exact"},
 "end":   {"year": 1891, "era": "CE", "month": 4, "day": 25, "precision": "exact"},
 "duration": {"days": 7, "display_en": "7 days", "derived": true}}
```

## 8. Rules for consumers

- **Order** records by `start.sort_key`, then `end.sort_key`.
- **Draw a span** from `start.sort_key` to `end.sort_key`. For `ongoing`, extend the bar to today. For `unknown`, use dashed ends and don't label the axis.
- **Labels:** always show `date_label_*` (or `display_*` per endpoint) to users. Never show `sort_key`.
- **Language fallback:** when a `*_ta` field is null, show the English value with an "EN" marker.
- **Ids are stable,** so use them in URLs.
- **Filter on precision:** `between`, `unknown` and `undated` mean the date is uncertain. Let users hide uncertain items on the chart.

## 9. Pipeline

```
data/raw/b1..bN.json      research batches (agents, jw.org only)        ─┐
data/derived/d1.json      spans built from raw points                   ─┼─► scripts/merge.py ─► data/merged/timeline.json
scripts/derive_spans.py   (lifespans, reigns)                             │                     data/merged/duplicates_report.md
scripts/validate.py       schema + logic checks on every input file      ─┘
scripts/migrate_v2.py     one-off: v1 `date` → v2 `start`/`end` (kept for the record)
```

Run order:

```bash
python3 scripts/derive_spans.py && python3 scripts/build_series.py && python3 scripts/validate.py && python3 scripts/merge.py && python3 scripts/export_review.py
```

`data/series/*.json` holds the series: curated files from research agents, plus `auto-*.json` built by `scripts/build_series.py`.

## 10. Series (`data/series/*.json` → `data/merged/series.json`)

A **series** is an ordered group of records that belong together and should be highlighted together. Examples are a prophecy and its fulfillments, the world powers of Daniel, the covenants, a succession of kings, and a reproduced jw.org chart. The contract is [`schema/series.schema.json`](../schema/series.schema.json).

| field | notes |
|---|---|
| `id`, `title_en`, `title_ta` | Stable kebab-case id, such as `promised-offspring` or `world-powers-daniel`. |
| `kind` | `prophecy_fulfillment`, `time_prophecy`, `world_powers`, `succession`, `lineage`, `covenants`, `chart_reproduction`, `theme` |
| `highlight` | true = give the series its own colour on the chart by default |
| `auto` | true = generated by `scripts/build_series.py` from existing records (files named `auto-*.json`) |
| `parent_series` | e.g. `kings-of-judah` sits under `prophets-and-kings-a6` |
| `sources`, `images` | The jw.org page or pages that present the group, and their charts, maps and illustrations |
| `groups[]` | Sub-units: `{id, order, label_en, span_id, symbols: [{scripture, symbol_en, symbol_ta}], attributes}`. An example is Babylon with "head of gold (Dan. 2:32)" and "lion (Dan. 7:4)". |
| `members[]` | `{event_id, order, role, group, label_en, label_ta, pairs_with[], scriptures[], source_docid, note}` |

- **Roles:** `prophecy`, `fulfillment`, `partial_fulfillment`, `future_fulfillment`, `step`, `rise`, `fall`, `ruler`, `item`, `start`, `end`, `context`.
- **Prophecy anchors:** a prophecy member points at the record of when it was given. When only the book is dated, it points at the book's "writing completed" record, and `note` says so.
- **`pairs_with`** joins a prophecy to its fulfillments and back, so the chart can draw connecting arcs.

The merge copies each membership onto the record as `series[]`. Every series is written to `data/merged/series.json`, with member ids repointed when duplicates fold.

## 11. Chart hints

Some points only mark the start or end of a span. One example is "Birth of Seth" at the start of "Life of Seth". On the chart, the bar is enough. `chart_hint` flags these points so the chart can hide them, while the data keeps them.

| value | rule | default on the chart |
|---|---|---|
| `covered_by_span` | The point is a birth, creation, death, accession, appointment or election at the start or end of a lifespan, reign or office span. It is not the endpoint of any other kind of span, not in a curated series, and not part of Jesus' life. | hidden; the bar shows it |
| `span_endpoint` | It starts or ends a span but matters on its own, like "Kingdom divided", "Russia bans Witnesses" or Jesus' death. | shown, drawn as the bar's end cap |
| `index_entry` | One-line entry from a Watch Tower Publications Index list, such as Beliefs Clarified or convention themes. | app detail; not on the A0 chart unless tiered |
| null | Everything else | shown |

The owner can override any record with the review sheet's "Show on chart" column.

## 12. Changes from v1

| v1 | v2 |
|---|---|
| `date` (one object) | `start` + `end` + `timing` + `date_label_*` |
| `date.precision: "range"` with `year_end` | split into **spans** (start + end) or **uncertain points** (`between` + `latest`) |
| `date.display_en` | `date_label_en` (whole) and `start.display_en` / `end.display_en` (each end) |
| — | `span_kind`, `duration`, `start_event_id`, `end_event_id`, `parent_id`, `child_ids`, `derived`, `sources[].supports` |
| merged ids renumbered `ev-00001…` (cross-references broke) | merged ids = stable batch ids; references repointed when duplicates fold |
