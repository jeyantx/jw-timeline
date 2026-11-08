#!/bin/bash
# Screenshot part of the A0 sheet.  usage: tools/shot.sh X Y W H Z out.png   (mm; Z = px per mm, 3–8)
# needs the server: python3 -m http.server 8770 --bind 127.0.0.1  (from the repo root)
X=$1; Y=$2; W=$3; H=$4; Z=${5:-4}; OUT=$6
PW=$(python3 -c "print(int($W*$Z))"); PH=$(python3 -c "print(int($H*$Z))")
D=$(mktemp -d)
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --user-data-dir="$D" \
  --virtual-time-budget=15000 --window-size=$PW,$PH --screenshot="$OUT" \
  "http://127.0.0.1:8770/${A0_PAGE:-design/a0/v5/index.html}?vb=$X,$Y,$W,$H&z=$Z" >/dev/null 2>&1
rm -rf "$D"; ls -la "$OUT"
