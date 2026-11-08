# alt-A · Print-legible and calm (partial, time-boxed)

- Type scale `A0.T` 3.9/3.175/2.65 → **t1 4.6 / t2 3.4 / meta 2.7**, pitch 7.4 → 8.4 (core.js); label baselines scale with size (draw2.js `drawLabel`).
- Meta lines and second lines now g1 #3d3c39 (was g2). Leaders 0.16 #9d9a92 → 0.25 #8d8a83.
- Print floor applied to the rendered SVG (`printFix` in index.html): all text ≥ 2.5 mm, strokes ≥ 0.2 mm, no g2/g3 grey text.
- Era captions 4.2 grey → **6 mm ink caps, 0.4 spacing, on a soft 9 % gold band**.
- **Row bands**: ink chip on the spine at each row start, e.g. "◀ ROW 2 · 997 → 332 B.C.E.", "ROW 3 · 2 B.C.E. → 1700 C.E. ▶" (`rowTags`).
- Direction chevrons: 4.4 mm dark-gold chevrons on the gold line every 120 mm (was 3.2 mm ink).
- Images: rings and shadows removed; all event/creation/story photos are feathered radial vignettes (opaque to 55 %), 92 % opacity, warm tone (sepia .14, sat .86). Hatched "IMAGE" placeholders no longer printed.
- Quiet texture: fractal-noise parchment grain over the sheet at 5 % opacity.
- Fit: labelled 271 → 251 of ~450 items; **38 tier-1 events have no label (v5 type: 28)**. The fit report on the page lists them (`Tier-1 without a label`).
- NOT done (deadline moved to 22:25): ending option B (sunrise threshold / 1,000-year ruler). The v5 walking-path ending is unchanged. Panel text was only floored to 2.5 mm, not re-laid out to 2.8.
