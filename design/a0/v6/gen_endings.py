#!/usr/bin/env python3
"""Build ending-A/B/C.html (standalone) from src/common.js + src/X.js.  Run from anywhere."""
import pathlib
H=pathlib.Path(__file__).parent; common=(H/'src/common.js').read_text()
T={'A':'Panorama band','B':'Sunrise threshold','C':'Fifth row'}
for k,name in T.items():
    js=(H/f'src/{k}.js').read_text()
    (H/f'ending-{k}.html').write_text(f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Ending {k} · {name}</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700;800&display=swap" rel="stylesheet">
<style>html,body{{margin:0;background:#e9e7e1}}svg{{display:block;width:min(100vw,1360px);height:auto;margin:0 auto;background:#f7f6f2;font-family:'Noto Sans',sans-serif}}</style></head>
<body><!-- 340 x 300 mm tile, 1 unit = 1 mm. Serve from repo root so ../../../private/images resolves. -->
<svg id="s" viewBox="0 0 340 300" xmlns="http://www.w3.org/2000/svg"></svg>
<script>
{common}
{js}
</script></body></html>''')
    print('wrote', f'ending-{k}.html')
