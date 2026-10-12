#!/bin/bash
# usage: shoot.sh page.html out.png "query" width height
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CH" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=4000 --window-size=$4,$5 --screenshot="$2" "http://127.0.0.1:8770/design/a0/samples/$1?$3" 2>/dev/null
