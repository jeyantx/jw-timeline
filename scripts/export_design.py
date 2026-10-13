"""Export the merged timeline in the CSV formats Claude Design asked for
(docs/A0_RESEARCH_REQUEST_FINAL.md §12) into exports/design/.

events.csv  ref,row,lane,date_as_printed,sort_year,precision,tier,title_en,scripture,series,source_ref,image_hint,(+ title_ta, poster)
spans.csv   label,start_year,end_year,duration_as_printed,computed,form,row,source_ref,(+ ref, tier)
Research CSVs in data/research/ are copied alongside unchanged.
"""
import csv, json, os, re, shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'exports', 'design')
D = json.load(open(os.path.join(ROOT, 'data', 'merged', 'timeline.json')))
EV = D['events']
BY_ID = {e['id']: e for e in EV}
SHORT = {}
p = os.path.join(ROOT, 'data', 'curation', 'short_titles.json')
if os.path.exists(p):
    SHORT = json.load(open(p))
LANE_OVR = {}
p = os.path.join(ROOT, 'data', 'curation', 'lanes.json')
if os.path.exists(p):
    LANE_OVR = json.load(open(p))

# design series codes (§12): g gold offspring, c covenants, r world powers, n north/south,
# v Daniel's time prophecies, w wheat & weeds, m Messianic prophecies; p = prophecies about nations
# (the request lists 8 series but 7 codes — 'p' is our proposal, flagged in the README)
SERIES_CODE = {'promised-offspring': 'g', 'covenants': 'c', 'world-powers-daniel': 'r', 'seven-heads-of-the-beast': 'r',
               'kings-north-and-south': 'n', 'daniel-time-prophecies': 'v', 'wheat-and-weeds': 'w',
               'messianic-prophecies': 'm', 'fulfilled-prophecies-nations': 'p'}
PRECISION = {'exact': 'exact', 'approx': 'about', 'before': 'before', 'after': 'after', 'between': 'window',
             'unknown': 'not_stated', 'undated': 'not_stated', 'ongoing': 'ongoing'}


def signed(dp):
    if not dp or dp.get('year') is None:
        return ''
    return -dp['year'] if dp.get('era') == 'BCE' else dp['year']


def row_of(sk):
    if sk is None or sk >= 100000:
        return 'future'
    for lim, name in [(-4026, 'opening'), (-1200, 'row1'), (-997, 'turn1'), (-332, 'row2'), (-2, 'turn2'),
                      (1700, 'row3'), (1870, 'turn3'), (2027, 'row4')]:
        if sk < lim:
            return name
    return 'future'


NATIONS = re.compile(r'Assyria|Babylon|Egypt|Nebuchadnezzar|Nineveh|Cyrus|Shishak|Zerah|Medes|Persia|Pharaoh|'
                     r'Tiglath|Shalmaneser|Sargon|Sennacherib|Carchemish|Nabonidus|Evil-merodach|Moab|Mesha|'
                     r'Ben-hadad|Hazael|Syria|Edom|Necho|Belshazzar|Darius', re.I)
ISRAEL = re.compile(r'\bof Israel\b|Israel\)|Samaria|Elijah|Elisha|Jehu|Ahab|Jezebel|Jeroboam|Omri|Naaman|'
                    r'Naboth|Baasha|Nadab|Zimri|Tibni|Menahem|Pekah|Hoshea|Shallum|Zechariah \(of Israel|Jehoahaz \(of Israel|Jehoash of Israel|Dothan|Shunammite|Zarephath|Carmel|Horeb', re.I)

JUDAH = re.compile(r'\bJews|Jewish|Jerusalem|Judah|Daniel|Ezekiel|Jehoiachin|Jehoiakim|Zedekiah|Shadrach|Esther|'
                   r'temple|Josiah|Hezekiah|Ahaz\b|Ezra|Nehemiah|Zerubbabel|Jeremiah|Gedaliah|Mordecai|Haman', re.I)


def lane_of(e, row):
    if e['id'] in LANE_OVR:
        return LANE_OVR[e['id']]
    for t in e.get('tags') or []:
        if t.startswith('lane:'):
            return t[5:]
    if row != 'row2':
        return ''
    sids = {m['id'] for m in e.get('series') or []}
    t = e['title_en']
    if e.get('category') == 'bible.book_writing':
        return 'books'
    if 'kings-of-israel' in sids:
        return 'israel'
    if 'kings-of-judah' in sids:
        return 'judah'
    if e.get('category') == 'bible.prophet' or e.get('span_kind') == 'prophet_activity':
        return 'prophet'
    par = BY_ID.get(e.get('parent_id') or '')
    if par:
        ps = {m['id'] for m in par.get('series') or []}
        if 'kings-of-israel' in ps:
            return 'israel'
        if 'kings-of-judah' in ps:
            return 'judah'
    head = ' '.join(t.split()[:2])
    if NATIONS.search(head) and not JUDAH.search(head):
        return 'nations'          # a foreign power is the subject
    if JUDAH.search(t):
        return 'judah'            # God's people in Judah, the exile and the return
    if ISRAEL.search(t):
        return 'israel'
    if NATIONS.search(t):
        return 'nations'
    return 'judah'


def src_ref(e):
    out = []
    for s in (e.get('sources') or [])[:2]:
        pub = (s.get('publication') or '').split(' (')[0].split(' —')[0]
        out.append(f"{pub} {s.get('docid', '')}".strip())
    return ' · '.join(out)


def scripture(e):
    return '; '.join(s['ref_en'] for s in (e.get('scriptures') or [])[:3])


def image_hint(e):
    im = (e.get('images') or [])
    return f"{im[0].get('caption_en', '')} <{im[0]['url']}>" if im else ''


def short(e):
    return SHORT.get(e['id'], {}).get('en') if isinstance(SHORT.get(e['id']), dict) else SHORT.get(e['id'], '')


def main():
    os.makedirs(OUT, exist_ok=True)
    ev_rows, sp_rows = [], []
    for e in sorted(EV, key=lambda x: x['start']['sort_key']):
        sk = e['start']['sort_key']
        row = row_of(sk)
        codes = sorted({SERIES_CODE[m['id']] for m in e.get('series') or [] if m['id'] in SERIES_CODE})
        if e['timing'] == 'span' and e.get('end'):
            dur = e.get('duration') or {}
            sp_rows.append({
                'ref': e['id'], 'label': e['title_en'], 'label_short': short(e),
                'start_year': signed(e['start']), 'end_year': signed(e['end']),
                'start_as_printed': e['start'].get('display_en'), 'end_as_printed': e['end'].get('display_en'),
                'duration_as_printed': dur.get('display_en') or '', 'computed': bool(dur.get('derived') or e.get('derived')),
                'form': 'ongoing' if e['end'].get('precision') == 'ongoing' else 'unknown' if e['end'].get('precision') in ('unknown', 'undated') else 'exact',
                'row': row, 'lane': lane_of(e, row), 'tier': e.get('tier'), 'poster': e.get('poster', False),
                'series': ''.join(codes), 'source_ref': src_ref(e), 'title_ta': e.get('title_ta') or ''})
        ev_rows.append({
            'ref': e['id'], 'row': row, 'lane': lane_of(e, row), 'timing': e['timing'],
            'date_as_printed': e.get('date_label_en') or e['start'].get('display_en'),
            'sort_year': signed(e['start']), 'sort_key': sk, 'precision': PRECISION.get(e['start'].get('precision'), ''),
            'tier': e.get('tier'), 'poster': e.get('poster', False),
            'title_en': e['title_en'], 'title_short_en': short(e), 'title_ta': e.get('title_ta') or '',
            'scripture': scripture(e), 'series': ''.join(codes), 'source_ref': src_ref(e),
            'url': (e.get('sources') or [{}])[0].get('url_en', ''), 'image_hint': image_hint(e)})
    for name, rows in [('events.csv', ev_rows), ('spans.csv', sp_rows)]:
        with open(os.path.join(OUT, name), 'w', newline='', encoding='utf-8-sig') as f:
            w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
            w.writeheader()
            w.writerows(rows)
    research = os.path.join(ROOT, 'data', 'research')
    copied = []
    for fn in sorted(os.listdir(research)) if os.path.isdir(research) else []:
        if fn.endswith('.csv'):
            shutil.copy(os.path.join(research, fn), os.path.join(OUT, fn))
            copied.append(fn)
    print(f'events.csv {len(ev_rows)} (poster {sum(r["poster"] for r in ev_rows)}) · spans.csv {len(sp_rows)} · copied {copied}')


if __name__ == '__main__':
    main()
