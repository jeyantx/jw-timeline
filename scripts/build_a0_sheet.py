"""Build the A0 wall chart's data file (design/a0/v5/a0v5/real.js) from our own data.

The sheet itself (layout and drawing code) is Claude Design's v5 design, kept in design/a0/v5/.
This script replaces the data it was drawn with, so every data fix flows onto the chart:

  data/merged/timeline.json          → D.ev (stations and labels), D.jes (Jesus' ministry columns and final-week days)
  data/curation/short_titles.json    → label text (≤ 40 chars)
  data/research/growth.csv           → D.growth, D.counts, D.langNWT, D.langWeb
  data/research/reigns_check.csv     → D.judah, D.israel
  data/research/bible_books.csv      → D.books
  data/research/calendar_b15.csv     → D.cal
  data/research/images.csv           → D.img (jw.org URL, plus the local file in private/images/ when present)
  data/curation/a0_sheet.json        → image slots per event, image choices, the future milestones, design-only options

Run after the main pipeline:  python3 scripts/build_a0_sheet.py
"""
import csv, json, os, re
from collections import defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'design', 'a0', 'v5', 'a0v5', 'real.js')
RESEARCH = os.path.join(ROOT, 'data', 'research')
CUR = json.load(open(os.path.join(ROOT, 'data', 'curation', 'a0_sheet.json'), encoding='utf-8'))
SHORT = json.load(open(os.path.join(ROOT, 'data', 'curation', 'short_titles.json'), encoding='utf-8'))
EV = json.load(open(os.path.join(ROOT, 'data', 'merged', 'timeline.json'), encoding='utf-8'))['events']

import sys
sys.path.insert(0, os.path.join(ROOT, 'scripts'))
from export_design import SERIES_CODE, lane_of, row_of  # same lane and series rules as the design export

# NWT short book abbreviations, as printed on the sheet (Ge, 1Sa, Mt, Re …)
ABBR = ['Ge', 'Ex', 'Le', 'Nu', 'De', 'Jos', 'Jg', 'Ru', '1Sa', '2Sa', '1Ki', '2Ki', '1Ch', '2Ch', 'Ezr', 'Ne', 'Es', 'Job',
        'Ps', 'Pr', 'Ec', 'Ca', 'Isa', 'Jer', 'La', 'Eze', 'Da', 'Ho', 'Joe', 'Am', 'Ob', 'Jon', 'Mic', 'Na', 'Hab', 'Zep',
        'Hag', 'Zec', 'Mal', 'Mt', 'Mr', 'Lu', 'Joh', 'Ac', 'Ro', '1Co', '2Co', 'Ga', 'Eph', 'Php', 'Col', '1Th', '2Th',
        '1Ti', '2Ti', 'Tit', 'Phm', 'Heb', 'Jas', '1Pe', '2Pe', '1Jo', '2Jo', '3Jo', 'Jude', 'Re']
GLYPH = {'exact': 0, 'approx': 1, 'before': 2, 'after': 2, 'between': 3, 'unknown': 4, 'undated': 4, 'ongoing': 0}
PREFIX = {'approx': 'c. ', 'before': 'b. ', 'after': 'a. '}
# not labels on the sheet: these are drawn as bars, tabs or the opening sequence
DUP = re.compile(r' written$|^(Prophetic activity of|Ministry of|Reign of|Life of)')
SPAN_SKIP = {'lifespan', 'reign', 'judgeship', 'prophetic_activity'}


def era_strip(s):
    return re.sub(r'\s*\b(B\.C\.E\.|C\.E\.)', '', s or '').strip().replace('-', '–')


def scripture(e):
    s = (e.get('scriptures') or [None])[0]
    if not s or not s.get('book_num'):
        return '—'
    v = f"{s['chapter']}:{s['verses']}" if s.get('chapter') and s.get('verses') else str(s.get('chapter') or '')
    return f"{ABBR[s['book_num'] - 1]} {v}".strip() or '—'


def year_tag(e):
    st, p = e['start'], e['start'].get('precision')
    if p in ('unknown', 'undated') or st.get('year') is None:
        return '', 'year not stated'
    if p == 'between' and st.get('latest') and st['latest'].get('year') is not None:
        return f"({st['year']}–{st['latest']['year']})", 'year not stated · within'
    yr = PREFIX.get(p, '') + str(st['year'])
    full = era_strip(e.get('date_label_en')).replace(' to ', '–')
    if e['timing'] == 'span':  # a span shows its range as the year tag ("1943–1513")
        return (full if len(full) <= 18 and 'not dated' not in full else yr), ''
    # extra detail only (a month, a day, a note); "After 4026" says nothing the tag "a. 4026" does not
    bare = re.sub(r'(?i)\b(after|before|about|c\.|a\.|b\.)\s*', '', full).strip()
    meta = full if full and bare != str(st['year']) and len(full) <= 34 else ''
    return yr, meta


def series(e):
    return ''.join(sorted({SERIES_CODE[m['id']] for m in e.get('series') or [] if m['id'] in SERIES_CODE}))


def record(e, first):
    yr, meta = year_tag(e)
    o = {'yr': yr, 'meta': meta, 'ref0': e['id']}
    ln = lane_of(e, row_of(e['start']['sort_key']))
    if ln:
        o['lane'] = ln
    slot = CUR['slot_for'].get(e['id'])
    if slot:
        o.update(med=1, slot=slot)
    o.update(CUR.get('opts', {}).get(e['id'], {}))
    title = (SHORT.get(e['id']) or {}).get('en') or e['title_en']
    return [first, e['tier'], title, e.get('date_label_en') or '', scripture(e), series(e),
            GLYPH.get(e['start'].get('precision'), 0), o]


def jesus_column(e):
    t, st = e['start']['sort_key'], e['start']
    if st.get('year') == 33 and (st.get('hebrew_month') or '').startswith('Nisan') and st.get('hebrew_day'):
        return 'd%d' % min(16, max(8, st['hebrew_day']))
    if t >= 33.235:
        return None  # filled from the previous day below
    return 0 if t < 30.25 else 1 if t < 31.25 else 2 if t < 32.25 else 3


def events():
    ev, jes = [], []
    for e in sorted(EV, key=lambda x: x['start']['sort_key']):
        if not e.get('poster') or (e.get('category') or '').startswith('future') or e['id'] in CUR['skip']:
            continue
        if e['timing'] == 'span' and (e['tier'] != 1 or e.get('span_kind') in SPAN_SKIP):
            continue
        if DUP.search(e['title_en']) or e.get('category') == 'bible.book_writing':
            continue
        t = e['start']['sort_key']
        if e['timing'] == 'point' and 29.7 <= t < 33.3:
            jes.append(record(e, jesus_column(e)))
        else:
            ev.append(record(e, t))
    last = 'd8'
    for r in jes:  # an item after Nisan 8 with no day printed belongs to the day before it
        if r[0] is None:
            r[0] = last
        elif isinstance(r[0], str):
            last = r[0]
    ev.extend(CUR['extra_ev'])
    return ev, jes


def growth():
    by = defaultdict(dict)
    for r in csv.DictReader(open(os.path.join(RESEARCH, 'growth.csv'), encoding='utf-8')):
        try:
            y, v = int(r['year']), int(float(r['value']))
        except ValueError:
            continue
        cur = by[r['series']].get(y)
        ok = r['status'] == 'confirmed'
        # one value per year: a confirmed one wins; among equals the larger (content languages over interface ones)
        if cur is None or (ok and not cur[1]) or (ok == cur[1] and v > cur[0]):
            by[r['series']][y] = (v, ok)

    def ser(name, flag=True):
        return [[y, v] + ([] if ok or not flag else [1]) for y, (v, ok) in sorted(by[name].items())]
    counts = {k: ser(s) for k, s in [('cong', 'congregations'), ('studies', 'average_bible_studies'),
              ('pioneers', 'average_pioneers'), ('memorial', 'memorial_attendance'), ('lands', 'lands_reporting'),
              ('baptized', 'baptized'), ('branches', 'branch_offices')]}
    web = [[y, v] for y, (v, ok) in sorted(by['jworg_languages'].items()) if ok]
    return ser('peak_publishers', False), counts, ser('nwt_languages_whole_or_part'), web


def reign_len(s):
    m = re.search(r'(\d+)\s*(year|month|day)', s or '') or re.match(r'\s*(\d+)\s*$', s or '')
    if not m:
        return s
    n, unit = int(m.group(1)), (m.group(2) if m.lastindex and m.lastindex > 1 else 'year')
    return n if unit == 'year' else f"{n} {'mo' if unit == 'month' else 'd'}"


def reigns():
    out = {'judah': [], 'israel': []}
    for r in csv.DictReader(open(os.path.join(RESEARCH, 'reigns_check.csv'), encoding='utf-8')):
        k, name = r['kingdom'], r['king']
        if k not in out or 'jointly' in name:
            continue
        name = re.sub(r'\s*\((alone|Abijam|Azariah)\)|^Queen ', '', name).strip()
        row = [name, int(r['start_year']), int(r['end_year']), reign_len(r['length_as_printed'])]
        prev = out[k][-1] if out[k] else None
        if prev and prev[0] == f'{name} and Tibni':  # Omri: rival years + sole rule = one bar
            out[k][-1] = [name, prev[1], row[2], prev[3] + row[3]]
            continue
        out[k].append(row)
    return out['judah'], out['israel']


def books():
    return [[ABBR[int(r['book_order']) - 1], int(float(r['completed_year']))]
            for r in csv.DictReader(open(os.path.join(RESEARCH, 'bible_books.csv'), encoding='utf-8'))]


def calendar():
    out = []
    for r in csv.DictReader(open(os.path.join(RESEARCH, 'calendar_b15.csv'), encoding='utf-8')):
        m = re.match(r'(\S+)(?:\s*\((.*?)\))?', r['hebrew_month'])
        fest = []
        for part in filter(None, (p.strip() for p in (r['festivals'] or '').split(';'))):
            d = re.match(r'(\d+)(?:\s*([-,])\s*(\d+))?\s+(.*)', part)
            if d:
                fest.append([int(d.group(1)), d.group(4) + (f" {d.group(1)}–{d.group(3)}" if d.group(3) else '')])
            else:
                fest.append([0, part])
        out.append([m.group(1).upper(), m.group(2) or '', r['modern_equiv'].replace('—', '–').replace('March', 'Mar')
                    .replace('April', 'Apr').replace('June', 'Jun').replace('July', 'Jul').replace('August', 'Aug')
                    .replace('September', 'Sep').replace('October', 'Oct').replace('November', 'Nov')
                    .replace('December', 'Dec').replace('January', 'Jan').replace('February', 'Feb'),
                    fest, r['season'], r['crops']])
    return out


def images():
    rows = defaultdict(dict)
    for r in csv.DictReader(open(os.path.join(RESEARCH, 'images.csv'), encoding='utf-8')):
        kind = (r['notes'] or '').split(';')[0].split(' ')[0]
        if kind in ('primary', 'alt1', 'alt2'):
            rows[r['slot_id']][kind] = r
    out = {}
    for slot, kinds in sorted(rows.items()):
        pick = CUR['image_choice'].get(slot, 'primary')
        r = kinds.get(pick) or kinds.get('primary')
        if not r:
            continue
        fn = slot + ('' if pick == 'primary' else '__' + pick) + '.jpg'
        local = os.path.exists(os.path.join(ROOT, 'private', 'images', fn))
        out[slot] = {'src': ('../../../private/images/' + fn) if local else r['source_url'],
                     'remote': r['source_url'], 'credit': r['publication_ref']}
    return out


def main():
    ev, jes = events()
    peak, counts, nwt, web = growth()
    judah, israel = reigns()
    j = lambda v: json.dumps(v, ensure_ascii=False, separators=(',', ':'))
    js = ['(function(){const D=A0.D;',
          '// GENERATED by scripts/build_a0_sheet.py from data/merged/timeline.json and data/research/*.csv; do not edit by hand.',
          f'D.ev={j(ev)};', f'D.jes={j(jes)};', 'D.jesExtra=[];D.budget.forEach(b=>b.n=0);',
          f"D.future={j(CUR['future'])};", f'D.growth={j(peak)};D.counts={j(counts)};D.langNWT={j(nwt)};D.langWeb={j(web)};',
          f'D.judah={j(judah)};D.israel={j(israel)};D.books={j(books())};D.cal={j(calendar())};',
          *CUR['data_patches'], f'D.img={j(images())};', f"D.focus={j(CUR['focus'])};", '})();', '']
    open(OUT, 'w', encoding='utf-8').write('\n'.join(js))
    print(f'wrote {os.path.relpath(OUT, ROOT)}: {len(ev)} stations, {len(jes)} in Jesus’ ministry, '
          f'{sum(1 for r in ev + jes if r[7].get("slot"))} with image slots, {len(judah)}+{len(israel)} reigns, '
          f'{len(peak)} publisher years')


if __name__ == '__main__':
    main()
