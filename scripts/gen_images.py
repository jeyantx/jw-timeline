#!/usr/bin/env python3
"""Generate the A0 sheet's painted images with the OpenAI image API (personal/congregation use only).

Reads design/a0/v6/image_prompts.json and writes private/images/ai/<slot_id>.png (git-ignored).
Slots with reference_files use client.images.edit (the jw.org images as references), others
client.images.generate. Model gpt-image-2 (override with env A0_IMAGE_MODEL), quality high.

Key: env OPENAI_API_KEY, else the file named by env OPENAI_API_KEY_FILE. The key is never printed or logged.

  python3 scripts/gen_images.py --dry-run              # plan + count, no API calls
  python3 scripts/gen_images.py --only p-moses,ev-manna
  python3 scripts/gen_images.py --limit 5 [--force]
  python3 scripts/gen_images.py --kind new             # only new slots (or: existing)
  python3 scripts/gen_images.py --style-anchor private/images/ai/p-moses.png   # extra reference for consistency

Needs: pip install openai
"""
import argparse, base64, json, os, sys, time
from contextlib import ExitStack
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PROMPTS = ROOT / 'design/a0/v6/image_prompts.json'
OUT = ROOT / 'private/images/ai'
LOG = OUT / 'log.jsonl'
MODEL = os.environ.get('A0_IMAGE_MODEL', 'gpt-image-2')
SIZES = {'1024x1024', '1536x1024', '1024x1536'}
MAX_REFS = 16  # API limit for image edits


def api_key():
    key = os.environ.get('OPENAI_API_KEY', '').strip()
    if key:
        return key
    path = os.environ.get('OPENAI_API_KEY_FILE', '').strip()
    if path:
        try:
            key = Path(path).expanduser().read_text().strip()
        except OSError as e:
            sys.exit(f'Cannot read the file named by OPENAI_API_KEY_FILE ({e.__class__.__name__}).')
        if key:
            return key
    sys.exit('No API key: set OPENAI_API_KEY or OPENAI_API_KEY_FILE.')


def log(rec):
    OUT.mkdir(parents=True, exist_ok=True)
    rec['time'] = time.strftime('%Y-%m-%dT%H:%M:%S')
    with LOG.open('a', encoding='utf-8') as f:
        f.write(json.dumps(rec, ensure_ascii=False) + '\n')


def select(items, a):
    if a.only:
        want = {s.strip() for s in a.only.split(',') if s.strip()}
        unknown = want - {i['slot_id'] for i in items}
        if unknown:
            sys.exit('Unknown slot_id(s): ' + ', '.join(sorted(unknown)))
        items = [i for i in items if i['slot_id'] in want]
    if a.kind:
        items = [i for i in items if i.get('kind') == a.kind]
    todo, skipped = [], []
    for i in items:
        (skipped if (OUT / f"{i['slot_id']}.png").exists() and not a.force else todo).append(i)
    if a.limit is not None:
        todo = todo[:a.limit]
    return todo, skipped


def refs_for(item, a):
    refs = [ROOT / p for p in item.get('reference_files') or []]
    if a.style_anchor:
        refs.append(Path(a.style_anchor).resolve())
    return refs[:MAX_REFS]


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--only', help='comma-separated slot_ids')
    ap.add_argument('--limit', type=int, help='at most N images this run')
    ap.add_argument('--kind', choices=['existing', 'new'])
    ap.add_argument('--force', action='store_true', help='regenerate even if the PNG exists')
    ap.add_argument('--dry-run', action='store_true', help='print the plan; no API calls')
    ap.add_argument('--style-anchor', help='extra reference image appended to every request (edit mode)')
    ap.add_argument('--prompts', default=str(PROMPTS))
    a = ap.parse_args()

    data = json.loads(Path(a.prompts).read_text(encoding='utf-8'))
    items = data['items'] if isinstance(data, dict) else data
    todo, skipped = select(items, a)

    problems = []
    for i in todo:
        if i['api_size'] not in SIZES:
            problems.append(f"{i['slot_id']}: bad api_size {i['api_size']}")
        for r in refs_for(i, a):
            if not r.is_file():
                problems.append(f"{i['slot_id']}: missing reference {r}")

    if a.dry_run:
        n_edit = sum(1 for i in todo if refs_for(i, a))
        for i in todo:
            rf = refs_for(i, a)
            mode = f'edit  ({len(rf)} ref)' if rf else 'generate'
            print(f"{i['slot_id']:<34} {i['api_size']:<10} {mode:<14} {i['size_mm'][0]}x{i['size_mm'][1]} mm  ref {i.get('ref')}")
        print(f'\n{len(todo)} image(s) to make ({n_edit} edit, {len(todo) - n_edit} generate); '
              f'{len(skipped)} skipped (already in {OUT.relative_to(ROOT)}; use --force). '
              f'Estimated API calls: {len(todo)} at quality high.')
        if problems:
            print('\nProblems:\n  ' + '\n  '.join(problems))
        return 1 if problems else 0

    if problems:
        sys.exit('Fix first:\n  ' + '\n  '.join(problems))
    if not todo:
        print('Nothing to do.')
        return 0
    try:
        from openai import OpenAI
    except ImportError:
        sys.exit('The openai package is missing: pip install openai')
    client = OpenAI(api_key=api_key())
    OUT.mkdir(parents=True, exist_ok=True)

    ok = fail = 0
    for n, i in enumerate(todo, 1):
        sid, rf = i['slot_id'], refs_for(i, a)
        dest = OUT / f'{sid}.png'
        print(f'[{n}/{len(todo)}] {sid} ({"edit" if rf else "generate"}, {i["api_size"]}) ...', flush=True)
        t0 = time.time()
        try:
            if rf:
                with ExitStack() as st:
                    files = [st.enter_context(open(r, 'rb')) for r in rf]
                    res = client.images.edit(model=MODEL, image=files, prompt=i['prompt'],
                                             size=i['api_size'], quality='high', n=1)
            else:
                res = client.images.generate(model=MODEL, prompt=i['prompt'],
                                             size=i['api_size'], quality='high', n=1)
            dest.write_bytes(base64.b64decode(res.data[0].b64_json))
            usage = getattr(res, 'usage', None)
            log({'slot_id': sid, 'status': 'ok', 'mode': 'edit' if rf else 'generate', 'size': i['api_size'],
                 'refs': [str(r.relative_to(ROOT)) if r.is_relative_to(ROOT) else r.name for r in rf],
                 'file': str(dest.relative_to(ROOT)), 'seconds': round(time.time() - t0, 1),
                 'usage': usage.model_dump() if hasattr(usage, 'model_dump') else None})
            ok += 1
        except Exception as e:  # keep going; the message never contains the key
            msg = str(e)[:300]
            print(f'  failed: {e.__class__.__name__}: {msg}')
            log({'slot_id': sid, 'status': 'error', 'error': f'{e.__class__.__name__}: {msg}'})
            fail += 1
    print(f'Done: {ok} saved, {fail} failed. Log: {LOG.relative_to(ROOT)}')
    return 1 if fail else 0


if __name__ == '__main__':
    sys.exit(main())
