# Research Agent Brief — Bible & JW History Timeline

> **Schema v2 (2026-10-10).** Records are `timing: "point"` or `timing: "span"` with `start` / `end` DatePoints,
> `date_label_en`, optional `duration`, `start_event_id` / `end_event_id`, `parent_id`. Rule 9 below (`date`,
> `sort_key`, 'range') is superseded by **docs/DATA_SCHEMA.md** — read it first. In short: a period with a start and
> an end is a **span**; one moment known only within a window ("31 or 32 C.E.") is a **point** with
> `precision: "between"` and `latest`; an endpoint jw.org does not date is `precision: "unknown"`, never guessed.

You are collecting dated events for a searchable timeline app and an A0 wall chart.
Owner: Tamil-speaking Jehovah's Witness. Output must be faithful to jw.org sources.

## HARD RULES
1. **Sources: ONLY https://wol.jw.org and https://www.jw.org.** No Wikipedia, no other sites, no "general knowledge" dates.
   Every event needs >=1 source object with a real URL you actually fetched. Do not invent docids or URLs.
   If a fact comes from your memory and you cannot find it on jw.org/WOL, DROP IT.
2. **Cross-check**: wherever two jw.org publications cover the same event, cite both. If they disagree
   (date, spelling, detail), keep the NWT Study Edition / Insight / "All Scripture" value as primary and record
   the other in `conflicts`. Newer publication wins when the sources are of equal rank.
3. **Tamil**: for every WOL document you use, also try the Tamil mirror:
   `https://wol.jw.org/ta/wol/d/r122/lp-tl/<docid>` (same docid). If it exists (not 404), fill `title_ta`,
   `description_ta`, `date.display_ta`, scripture `ref_ta`, source `url_ta`, `title_ta`. If 404, leave Tamil fields null.
   Never machine-translate into Tamil yourself; Tamil text must come from a jw.org Tamil page.
   Also set `finder_url` = `https://www.jw.org/finder?docid=<docid>&wtlocale=E` (locale-switchable link).
4. **Images**: record image URLs you see on the source pages (illustrations, maps, charts) with caption and
   source docid. WOL image links look like `/en/wol/mp/r1/lp-e/...` or `https://cms-imgp.jw-cdn.org/...` —
   record them as absolute URLs. Do NOT download anything.
5. **Scriptures**: NWT abbreviations (Gen., Ex., 1 Ki., Matt., 1 Cor., Rev.). Fill structured book/chapter/verses.
6. **Descriptions**: 1–3 sentences in your own words, neutral, faithful. No speculation, no doctrine commentary.
7. **No tiering**: leave `importance` null.
8. **Granularity**: collect EVERYTHING dated in your sources, not a summary. Births, deaths, accessions, decrees,
   book completions, battles, releases of publications, court rulings — each is its own event.
   If one source row bundles 2 events ("X dies; Y becomes king"), split into 2 events with `related_ids`.
9. **Dates**: copy the source's own precision marker: "c." → approx, "a." → after, "b." → before, ranges → range.
   `sort_key`: BCE = -year, CE = +year, plus small fraction for ordering inside a year (e.g. Nisan 14 ≈ +0.25,
   Nisan 16 ≈ +0.26; autumn ≈ +0.75). For 'before' subtract 0.01, 'after' add 0.01. Undated/future: 100000 + n.
10. **IDs**: `<batch>-<NNNN>` zero-padded sequence in chronological order, slug = short kebab-case English.

## Tool guidance
- Use WebFetch on WOL URLs; WOL pages are static and fetch well. Ask the fetch prompt to return the table or
  paragraph text VERBATIM including dates and scripture references, in chunks if long.
- Use WebSearch with allowed_domains ["wol.jw.org","jw.org"] to discover documents; never read non-jw results.
- WOL search: `https://wol.jw.org/en/wol/s/r1/lp-e?q=<query>&p=par` also works via WebFetch.
- Insight on the Scriptures articles are at `https://wol.jw.org/en/wol/d/r1/lp-e/12000xxxxx` — search by name.
- Fetch in parallel where possible. Budget: be thorough; expect 30–80 fetches per batch.

## Known key documents (English WOL, lp-e; Tamil mirror lp-tl same docid)
- "All Scripture Is Inspired" Study 3 — Measuring Events in the Stream of Time (chronology table): 1101990130
- "Getting Bible Events in Order" (w): 1975530
- Insight "Chronology" (it-1): 1200000970  (NOTE: 1200010959 is the 1971 Aid to Bible Understanding article — do not treat it as Insight)
- NWT Table of the Books of the Bible: 1001060002
- NWT App. A6-A Kings/Prophets chart pt 1: 1001070206 ; A6-B pt 2: 1001061215
- NWT App. A7-A Jesus' life: 1001061207 ; A7-B: 1001070208 ; A7-D: 1001061210 ; A7-F: 1001061212 ; A7-G: 1001070213 ; A7-H: 1001070214 (A7-C and A7-E: find via WOL)
- Proclaimers (jv) "Noteworthy Events in the Modern-day History of JW" (1870–1992): 1101993046
- "JW in the 20th Century" — Their Modern Development and Growth: 1102000101
- God's Kingdom Rules! (kr) book index: 1200277281 ; chapters e.g. 1102014247
- Tamil WOL base: https://wol.jw.org/ta/wol/d/r122/lp-tl/

## Output
Write ONE file: `data/raw/<batch>.json` with shape:
```json
{"batch": "<batch>", "scope": "...", "generated": "2026-10-03", "sources_consulted": [{"docid": "...", "title_en": "...", "url_en": "...", "url_ta": "...|null"}], "events": [ ...event objects... ]}
```
Event object must validate against `schema/event.schema.json` (read it first). Run
`python3 scripts/validate.py data/raw/<batch>.json` and fix every reported problem before finishing.
Final report to the orchestrator (<=300 words): event count, Tamil coverage %, sources used, conflicts found,
anything you could NOT find on jw.org and dropped.
