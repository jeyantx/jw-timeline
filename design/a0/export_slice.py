"""Export a small slice of poster records as JS for the design sample tiles.
Usage: python3 design/a0/export_slice.py FROM_SORTKEY TO_SORTKEY OUT.js"""
import json, sys
lo, hi, out = float(sys.argv[1]), float(sys.argv[2]), sys.argv[3]
d = json.load(open('data/merged/timeline.json'))
recs = []
for x in d['events']:
    s = x['start']['sort_key']
    if not (lo <= s <= hi and x.get('poster')):
        continue
    recs.append({
        'id': x['id'], 'tier': x['tier'], 'timing': x['timing'], 'y': x['start']['year'], 'era': x['start']['era'],
        's': s, 'e': x['end']['sort_key'] if x.get('end') else None,
        'label': x['date_label_en'], 'label_ta': x.get('date_label_ta'),
        'en': x['title_en'], 'ta': x.get('title_ta'),
        'cat': x.get('category'), 'kind': x.get('span_kind'),
        'dur': (x.get('duration') or {}).get('display_en') if isinstance(x.get('duration'), dict) else x.get('duration'),
        'series': [m['id'] for m in (x.get('series') or [])],
        'refs': [s_['ref_en'] for s_ in (x.get('scriptures') or [])][:2],
    })
recs.sort(key=lambda r: r['s'])
open(out, 'w').write('const SLICE = ' + json.dumps(recs, ensure_ascii=False, indent=0) + ';\n')
print(len(recs), 'records ->', out)
