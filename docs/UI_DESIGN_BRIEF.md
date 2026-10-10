# JW Timeline — UI Design Brief

Brief for Claude Design. Produce screen designs (desktop + mobile) for a bilingual (English / Tamil) interactive timeline web app. Data already exists: 1,669 sourced events in one JSON file (see "Data model" at the end).

---

## 1. Product summary

**Name (working):** JW Timeline
**One-liner:** A searchable, zoomable timeline of every dated event in the Bible and in the modern history of Jehovah's Witnesses, every event linked to its jw.org / Watchtower Online Library source.

**Audience:** Tamil- and English-speaking Jehovah's Witnesses: personal study, family worship, teaching children, preparing talks. Secondary: anyone curious about Bible chronology.

**Tone:** Calm, trustworthy, reference-grade. Think "beautiful printed wall chart that came alive", not a dashboard. Comparable visual references: usefulcharts.com timelines, Apple Maps-style smooth zoom, Wikipedia-level information density but far better typography.

**Core promise:** Every claim links to its source. Nothing in the UI should feel editorial or speculative.

**Platforms:** Responsive web app. Desktop first (the timeline is wide), fully usable on phones. Later: export the same data to an A0 printed poster, so the visual language must also work on paper (see section 7).

**Languages:** English and Tamil, switchable at any time. Many events have Tamil text; when Tamil is missing, show the English text with a subtle "EN" marker, never a blank.

**Theme:** Light and dark mode.

---

## 2. Data concepts the UI must express

| concept | what it is | UI consequence |
|---|---|---|
| **Era bands** | 4 top-level bands: **Bible** (4026 BCE–100 CE), **Bible & church history** (100–1869), **Jehovah's Witnesses** (1870–today), **Future** (undated prophetic sequence) | Colour-coded bands/lanes; the Future band has no time axis, it is an ordered sequence |
| **Category** | 32 categories grouped by band, e.g. `bible.monarchy`, `bible.jesus`, `history.bible_translation`, `jw.doctrine`, `jw.legal`, `future.prophecy` | Filter chips, icon + colour per category |
| **Event kind** | free label: birth, death, accession, battle, decree, writing_completed, release, court_ruling, convention, beliefs_clarified… | Small icon glyph on the event marker |
| **Points vs spans** | Every record is either a **point** (one moment: "Jesus dies, Nisan 14, 33 C.E.") or a **span** (start → end: "Life of Abraham 2018–1843 B.C.E.", "Reign of Asa 978–937 B.C.E.", "Paul's 2nd journey c. 49–52", "Russia ban 2017–ongoing"). About 265 spans today: 64 reigns (kings of Judah and Israel, Persian and Roman rulers), 32 lifespans, 25 offices (Watch Tower presidents, Governing Body tenures), 18 prophetic periods (70 weeks, Gentile Times 607 B.C.E.–1914, 1,260 days…), 7 world powers, judgeships, prophets' activity, journeys, wars, bans, magazines, headquarters, multi-day conventions. 22 are ongoing (Russia ban, Watchtower magazine, Christ's presence). | Points = markers. Spans = horizontal bars from start to end (vertical bars on mobile). A lifespan bar also shows its birth and death markers at its ends. Nested spans (a judge inside "Period of the Judges", David's Hebron years inside his reign) render as a thinner bar inside the parent bar. |
| **Date precision** | exact / approx (c.) / before (b.) / after (a.) / between ("31 or 32 C.E.": one moment somewhere in a window) / unknown (no year printed; order only) / ongoing (span not ended) / undated (future) | Marker: solid dot = exact, hollow dot = approx, half-dot = before/after, dot + faint whisker = between, no axis label = undated. Bar ends: solid = exact, soft/feathered = approx, open bracket = before/after, dashed = unknown, fade-out arrow = ongoing |
| **Duration** | Spans carry a length, either printed ("41 years", "7 days") or computed ("c. 33½ years") | Show on the bar label and in detail; computed values get a small "computed" mark with a tooltip explaining how |
| **Display date** | As printed by the source: "1513 B.C.E., Nisan 14", "c. 940–c. 906 B.C.E.", "April 19-25, 1891" | Always show the source's wording, never reformat into ISO |
| **Scale problem** | 4026 BCE–1000 BCE has sparse events; 33 CE has 170 events in one year; 2013 has ~25 | Timeline must zoom non-linearly / let the user change scale; dense clusters collapse into a count bubble |
| **Importance tier** | 1 (hero), 2 (major), 3 (detail). Currently null, owner will assign | Tier controls what shows at each zoom level; a tier filter in settings |
| **Sources** | 1–7 jw.org documents per event, each with EN link, optional Tamil link, and a locale-switchable "finder" link | Source list in detail view; one-tap open on jw.org in current language |
| **Conflicts** | 270 events record where two jw.org publications differ (e.g. Asa 977 vs 978 B.C.E.) | A discreet "sources differ" badge, expandable |
| **Images** | 547 jw.org image URLs with captions (maps, illustrations, chart pages) | Thumbnail on card, gallery in detail |
| **Scriptures** | structured refs (Gen. 2:7) with Tamil equivalents (ஆதி. 2:7) | Chips that open the verse on jw.org NWT in the current language |
| **People / places / tags** | arrays of strings | Clickable chips → filter |
| **Related events** | ids of linked events (e.g. "Moses dies" ↔ "Joshua commissioned") | "Related" strip in detail view |

---

## 3. Pages / screens

1. **Home / Timeline** (the main experience)
2. **Event detail** (panel on desktop, full screen on mobile, has its own URL)
3. **Search & filter** (overlay on desktop, full screen on mobile)
4. **Browse by list** (table/list view of the same data, sortable)
5. **Explore pages** (entry points: People, Places, Bible books, Categories)
6. **Chart / poster preview** (static A0 layout preview, print/export)
7. **About & sources** (methodology, source list, disclaimers)
8. **Settings** (language, theme, tier visibility, era prefix style)
9. **Onboarding / first run** (3-step hint overlay, skippable)
10. **Empty / error states** (no results, offline, image failed)

---

## 4. Page-by-page detail

### 4.1 Home / Timeline

**Purpose:** Let the user see the whole sweep of history at a glance and dive to any single day.

**Layout (desktop):**
- Top app bar (56px): logo/wordmark left; global search field centre (placeholder "Search events, people, verses… e.g. 'Nisan 14' or 'Daniel'"); right: language toggle (EN | தமிழ்), theme toggle, settings gear.
- **Era ribbon** directly under the app bar: a thin full-width strip showing the 4 era bands proportionally (log scale) with labels. It is a mini-map: current viewport is a highlighted window; drag it to pan, click an era to jump.
- **Main canvas** (fills the rest): horizontal time axis along the bottom with tick labels adapting to zoom (millennia → centuries → decades → years → months). Events render above the axis in **swim lanes by category group** (e.g. lane rows: Lives · Kings & rulers · Prophets & writings · Covenants & judgments · Jesus & apostles · Bible text history · JW organisation · JW doctrine · Legal & persecution). Lanes can be collapsed/expanded from a left gutter.
- **Span bars:** spans stack inside their lane like a Gantt chart (packed into as few sub-rows as possible, never overlapping). Bar label = title + duration ("Asa · 41 yrs"), truncated with the full label on hover. The **Lives** lane shows lifespan bars (usefulcharts-style: Adam's 930 years overlapping Methuselah, Noah, Shem…). The **Kings** lane shows two parallel tracks for Judah and Israel, reign bars end to end. Very short spans (7-day convention, 3-month reign) collapse to a point marker with a small bracket until the zoom makes them wide enough. Ongoing spans fade into the now-marker. Spans with unknown years (most judges) are drawn with dashed outlines in their source order and a "years not stated" note.
- **Density handling:** when more than N events share a pixel column, show a rounded "cluster bubble" with the count (e.g. "⬤ 42 · 33 C.E."). Clicking a cluster zooms into it; at max zoom a dense year expands to a vertical stacked list with the sub-year order (Nisan 14, Nisan 16, Iyyar 25…).
- **Event marker:** glyph by precision (see table) + category colour + tiny event-kind icon. Hover shows a tooltip card: display date, title (both languages if available), first scripture, category; for spans also duration and the start/end labels. Click opens Event detail panel on the right (420px) without leaving the timeline.
- **Hover on a span** highlights its linked start/end point markers and any child spans; hovering a birth/death marker highlights the lifespan bar.
- **Filter bar** (floating, bottom-left or under app bar): active filter chips (category, era, people, tier, precision, "has image", "has Tamil"), "Clear all".
- **Zoom controls** (bottom-right): + / −, "Fit all", "Today", and a scale selector: Linear | Log | Stretch-dense (compresses empty millennia).
- **Now marker:** vertical line at today's date with label.
- **Keyboard:** ←/→ pan, +/− zoom, / focuses search, Esc closes panels, ↑/↓ move between events in view.

**Layout (mobile):**
- App bar collapses to logo + search icon + menu.
- Era ribbon stays (scrollable strip).
- Canvas becomes **vertical timeline** (time flows downward) with the same lanes rendered as coloured left-edge bars and category icons; pinch-to-zoom changes scale; a floating "year scrubber" on the right edge (like a contacts index) lets the user drag through millennia quickly, showing a large year label while dragging.
- Tapping an event opens detail as a bottom sheet (half → full).

**Actions:**
- Pan, zoom (wheel, pinch, buttons, keyboard), jump via era ribbon or scrubber
- Change scale mode
- Toggle lanes
- Hover/tap event → tooltip → detail
- Click cluster → zoom in
- Apply/clear filters (persist in URL)
- Switch language (re-renders all text; falls back to EN with marker)
- Share current view (URL encodes viewport + filters)
- "Random event" (fun discovery button)

**UI items to design:** app bar, era ribbon/minimap, axis ticks for 5 zoom levels, 8 marker precision glyphs × category colours, span bar (with its 5 end styles, label, duration, nested child bar, collapsed-short state, ongoing fade), Lives lane and twin-track Kings lane, cluster bubble, tooltip card (point and span variants), lane headers and collapse control, filter chip bar, zoom/scale control cluster, now-marker, mobile vertical variant, year scrubber, empty-canvas state (all filtered out).

### 4.2 Event detail

**Purpose:** Everything known about one event, with sources one tap away.

**Content (top → bottom):**
1. Category colour header strip with category name + event-kind icon; close/back; prev/next event arrows (chronological, within current filter).
2. **Display date** large (as printed, e.g. "33 C.E., Nisan 14 (c. 3:00 p.m., Friday)"), precision badge (Exact / Approx. / Before / After / Between / Unknown / Ongoing / Future), and Tamil date on the second line when present ("கி.பி. 33, நிசான் 14").
   **For spans** this block becomes a mini range bar: start label ← duration → end label ("997 B.C.E. ← 17 years → 980 B.C.E."), each end tappable to jump to its linked point event (e.g. the birth, the successor's accession). Computed parts carry the "computed" mark with the explanation ("ends when Abijah becomes king, as laid out in NWT Appendix A6"). A span with a parent shows a breadcrumb ("Period of the Judges › Tola"); a span with children lists them.
3. **Title** in current language; the other language shown smaller beneath (toggle to swap).
4. **Description** (1–3 sentences) in current language; "Show English" link if Tamil missing.
5. **Scriptures:** chips "Luke 22:20" / "லூக். 22:20" → opens jw.org NWT verse in current language.
6. **Image gallery:** horizontal thumbnails with captions (EN/TA) and "Source: Insight, 'Abraham'" credit; tap → lightbox with caption and "Open on jw.org".
7. **Sources:** list rows — publication badge (si / it-1 / nwtsty / jv / kr / w / g / jw.org), title, paragraph number if any, 1-line supporting quote in italics, buttons "Open (EN)" "Open (தமிழ்)" (Tamil button disabled with tooltip "No Tamil page" when absent).
8. **"Sources differ" section** (only if conflicts exist): collapsed by default, header with count; rows: other value + which publication + note. Tone: factual, not alarming.
9. **People / Places / Tags** chips → tap applies filter on timeline.
10. **Related events** horizontal strip of mini-cards (date + title).
11. **Footer:** "Copy link", "Share", "Report an issue" (opens GitHub issue template), event id in monospace small grey.

**Desktop:** right-side panel 420–480px, timeline stays interactive behind it; panel can be pinned/expanded to full. **Mobile:** bottom sheet with drag handle; swipe left/right for prev/next event.

**UI items:** header strip, precision badges (8), span range block (with computed mark, linked ends, breadcrumb, children list), bilingual title block, scripture chip, image thumb + lightbox, source row (with publication badge system), conflicts accordion, chip set, related mini-card, footer actions.

### 4.3 Search & filter

**Purpose:** Find anything in under 3 keystrokes; refine by any field.

**Search behaviour:** instant results as you type across title (EN+TA), description, people, places, tags, scripture refs ("Gen 2:7", "ஆதி 2:7"), years ("607", "1914", "பொ.ச.மு. 607"), event kinds. Results grouped: *Events · People · Places · Bible books · Years*. Each event result shows date, title, category colour dot. Enter on a result → timeline jumps to it and opens detail. Recent searches and suggested queries ("Kings of Judah", "Paul's journeys", "Beliefs clarified 2013").

**Filter panel sections (all multi-select, counts shown next to each option, update live):**
- Era band (4)
- Category (grouped under era, 32)
- Event kind (top 15 + "more")
- Date range: dual slider with BCE/CE handling + text inputs ("from 1000 B.C.E. to 100 C.E.")
- Precision (6)
- Importance tier (1/2/3) — hidden until tiers exist
- Has: image · Tamil text · multiple sources · source conflicts
- People (type-ahead), Places (type-ahead), Bible book (66-list)
- Sort (for list view): chronological, recently added, most sources

**Actions:** type, pick result, toggle filters, reset section, reset all, save filter set as named preset (local), copy filter link.

**UI items:** search field states (empty/typing/results/no results), result row types, group headers, filter section with counts, dual date slider with era labels, type-ahead chip input, preset row, "no results" illustration + suggestions.

### 4.4 Browse by list

**Purpose:** Table-style reading and scanning; also accessibility fallback for the canvas.

- Toolbar: result count ("1,669 events · 744 with Tamil"), density toggle (comfortable / compact), column picker, export (CSV/JSON of current filter).
- Virtualised list/table columns: Date (as printed) · Title (current language, other language on second line) · Category pill · Scriptures · Sources (count + badges) · Tamil ✓ · Image ✓.
- Sticky year/era group headers while scrolling ("997 B.C.E.", "Kingdom of Judah 997–607").
- Row click → detail panel; row expands inline on mobile.
- Keyboard navigable.

**UI items:** toolbar, table header, row (desktop & mobile card variant), group header, pagination/virtual scroll indicator, export menu.

### 4.5 Explore pages

Entry points for browsing without knowing dates.

- **People:** grid of name cards (name EN/TA, count of events, lifespan if known, mini sparkline of their events on the axis). Tap → person page: short list of their events in order + "Show on timeline".
- **Places:** same pattern, optional small static map tile from jw.org appendix maps if available.
- **Bible books:** 66 tiles in canonical order with writer, place, year completed, time covered (from Table of Books). Tap → book page: completion event + all events whose scriptures fall in that book.
- **Categories:** 32 tiles with icon, colour, count, 1-line definition; tap → timeline filtered.
- **Collections (curated):** "Kings of Judah & Israel", "Jesus' final week", "Paul's journeys", "70 weeks prophecy", "Bible comes to Tamil", "1914–1919", "Beliefs clarified by decade". Each is a saved filter + ordering + intro paragraph.

**UI items:** tile/card for each type, person/book/collection header, "Show on timeline" CTA, sparkline.

### 4.6 Chart / poster preview

**Purpose:** Preview and export the printed A0 wall chart (841 × 1189 mm) built from the same data.

- Full-page poster preview with zoom/pan; page outline with bleed marks.
- Controls: orientation (landscape/portrait), tier cut-off (what appears: tier 1 only / 1+2), language (EN / TA / bilingual), era band proportions preset (Equal · Proportional · Bible-heavy), colour palette (same as app), include images (yes/no), show scripture refs (yes/no).
- "Export PDF (print-ready)" and "Export PNG".
- Visual language of the poster: 4 horizontal era bands stacked, each with its own axis; key events as labelled markers with leader lines; a **lifespans band** (patriarchs' overlapping lives from Adam to Joseph, then key figures) in the usefulcharts style; kings shown as reign bars on twin Judah/Israel tracks; prophets as activity bars; Jesus' life as an inset zoom panel; JW history as a dense decade grid; Future as a right-edge ordered column without axis; footer with source legend and "All dates from jw.org publications".

**UI items:** preview frame, control sidebar, export dialog with progress, poster component kit (band header, reign bar, activity bar, labelled marker + leader line, inset panel, legend, footer).

### 4.7 About & sources

- Methodology: how dates were collected (jw.org & WOL only, cross-checked, precision copied from source), what "sources differ" means, what is deliberately absent (no secular dating, no commentary).
- Full source list (470 documents) grouped by publication with counts and links.
- Data license / repo link (GitHub, public), version/date of data, "Report an issue".
- Disclaimer: unofficial personal study project, not published by Watch Tower; all content © its publishers, linked not copied.

### 4.8 Settings

- Language: English / தமிழ் (also affects scripture chip format and jw.org link locale).
- Theme: System / Light / Dark.
- Era prefix style for Tamil dates: as printed by source (default) · பொ.ச.மு. / பொ.ச. · கி.மு. / கி.பி.
- Default scale mode; default lanes; tiers visible at each zoom level (advanced).
- Reduce motion; high-contrast markers; font size (Tamil needs ~10% larger body size for equal legibility).
- Clear local data (presets, recents).

### 4.9 Onboarding (first run)

3 cards over the timeline: "Scroll to travel time, pinch/wheel to zoom", "Tap any dot to see sources", "Switch to தமிழ் any time". Skip; never show again.

### 4.10 Empty / error states

- No results for search (suggestions + "clear filters").
- All events filtered out on canvas.
- Image failed to load (show caption + "Open on jw.org").
- Offline: timeline works from cached JSON; source links show "needs connection".

---

## 5. Visual design direction

- **Typography:** a humanist sans for UI (must have excellent Tamil support, e.g. Noto Sans + Noto Sans Tamil, or a pairing the designer proposes). Dates and ids in a tabular-figure face. Hierarchy: date > title > description. Minimum body 16px desktop / 17px Tamil.
- **Colour:** 4 era-band hues (suggest: deep blue for Bible, warm ochre for church/Bible history, teal/green for JW history, violet for Future) with lighter tints for the ~8 category groups within each; neutral greys for chrome. Must pass WCAG AA in both themes and be distinguishable in greyscale print (use glyph shape as well as colour).
- **Markers & bars:** the eight precision glyphs and the five span-bar end styles are core design assets; show them at 12/16/24px and on bars of 4/8/16px height.
- **Density:** generous whitespace in detail views; dense but legible on the canvas.
- **Motion:** smooth zoom with easing; detail panel slides; respect reduce-motion.
- **Iconography:** one consistent outline icon set for event kinds (birth, death, crown, scroll, covenant, judgment/flame, temple, journey, gavel, convention, publication, broadcast, construction, prophecy/star…).
- **Bilingual layout rule:** primary language first, secondary smaller and muted; never side-by-side columns on mobile.

---

## 6. Accessibility & performance requirements

- Full keyboard operation of the timeline; every marker focusable with visible focus ring; list view as an equivalent alternative.
- Screen-reader labels: "Event: {title}, {display date}, {category}, {n} sources".
- Colour never the only carrier of meaning.
- Tamil text rendering tested for ligatures/line-height.
- Canvas must handle 1,700 events at 60fps on a mid-range phone; virtualise lists; lazy-load images.
- Works offline after first load (PWA); deep links for every event and every filter state.

---

## 7. Deliverables requested from Claude Design

1. Design system: colour tokens (light/dark), type scale (Latin + Tamil), spacing, radii, elevation, icon set, the 8 precision glyphs, span-bar styles, category colour map, publication badge set.
2. Desktop screens: Timeline (3 zoom levels: millennia, year 33 C.E. expanded, 2013 cluster), Event detail panel (an event with image + conflicts + Tamil; one without Tamil), Search overlay (typing + results), Filter panel, List view, People explore, Bible books explore, Collection page, Poster preview, About, Settings.
3. Mobile screens: Timeline vertical (with scrubber), Event bottom sheet (half + full), Search, Filters, List, Explore grid, Settings, Onboarding cards.
4. States: hover/focus/active for markers and chips; loading skeletons; empty; error; offline.
5. Poster component kit and one full A0 layout mock (landscape) showing all 4 bands.
6. Short redlines/notes on interaction (zoom behaviour, cluster expansion, bilingual fallback).

---

## 8. Data model (for reference)

Full field reference: [`docs/DATA_SCHEMA.md`](DATA_SCHEMA.md). Data file: `data/merged/timeline.json` (public raw URL: `https://raw.githubusercontent.com/jeyantx/jw-timeline/main/data/merged/timeline.json`).

A **point**:

```json
{
  "id": "b5-0163", "timing": "point", "span_kind": null,
  "date_label_en": "33 C.E., Nisan 14 (c. 3:00 p.m., Friday)",
  "date_label_ta": "கி.பி. 33, நிசான் 14 (மதியம் சுமார் 3 மணி, வெள்ளி)",
  "start": {"year": 33, "era": "CE", "hebrew_month": "Nisan", "hebrew_day": 14, "season": "spring", "precision": "approx", "sort_key": 33.2528},
  "end": null, "duration": null,
  "title_en": "Dies on torture stake", "title_ta": "சித்திரவதைக் கம்பத்தில் இறந்துபோகிறார்",
  "description_en": "…", "description_ta": "…",
  "category": "bible.jesus", "event_kind": "death",
  "tags": [], "people": ["Jesus"], "places": ["Golgotha"],
  "scriptures": [{"ref_en": "Luke 23:33", "ref_ta": "லூக். 23:33", "book_num": 42, "chapter": 23, "verses": "33"}],
  "sources": [{"docid": "1001070214", "publication": "NWT Study Edition App. A7-H", "title_en": "…",
               "url_en": "https://wol.jw.org/en/wol/d/r1/lp-e/1001070214", "url_ta": "https://wol.jw.org/ta/wol/d/r122/lp-tl/1001070214",
               "finder_url": "https://www.jw.org/finder?docid=1001070214&wtlocale=E", "quote_en": "…"}],
  "images": [{"url": "…", "caption_en": "…", "caption_ta": "…", "kind": "map"}],
  "conflicts": [], "importance": null, "related_ids": ["b5-0162", "b5-0164"]
}
```

A **span** (same fields plus start/end/duration/links):

```json
{
  "id": "d1-0024", "timing": "span", "span_kind": "lifespan",
  "date_label_en": "2 B.C.E., c. Oct. 1 – 33 C.E., Nisan 14 (c. 3:00 p.m., Friday)",
  "start": {"year": 2, "era": "BCE", "month": 10, "day": 1, "precision": "approx", "sort_key": -1.25},
  "end":   {"year": 33, "era": "CE", "hebrew_month": "Nisan", "hebrew_day": 14, "precision": "approx", "sort_key": 33.2528},
  "duration": {"years": 33.5, "display_en": "c. 33½ years", "approx": true, "derived": true},
  "start_event_id": "b5-0006", "end_event_id": "b5-0163", "parent_id": null, "child_ids": [],
  "derived": {"method": "paired_events", "note": "Built from b5-0006 (start) and b5-0163 (end)."},
  "title_en": "Jesus' earthly life", "category": "bible.jesus", "sources": ["… both input events' sources, each marked supports: start/end …"]
}
```

Counts to design for: ≈1,860 records (≈1,595 points, ≈265 spans and growing; 22 ongoing, 3 undated future spans); 32 categories; 30 span kinds (top: reign, lifespan, judgeship, prophetic activity, journey, convention); spans from 7 days to 930 years long; 547 images; up to 7 sources per record; densest year 33 C.E. (≈170 points); longest title ≈140 chars; Tamil present on ≈45% of titles.
