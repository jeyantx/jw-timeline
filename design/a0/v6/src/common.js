// Shared by ending-A/B/C.html (inlined into each at build time by gen_endings.py).
// Units: 1 SVG unit = 1 mm. Tile 340 x 300 mm. Palette = v5 A0.C. Type sizes follow PRINT_SPEC.md.
const C={ink:'#1d1d1b',g1:'#3d3c39',g2:'#6e6c67',g3:'#a3a19b',g4:'#c8c6bf',g5:'#e2e0d9',paper:'#f7f6f2',card:'#fbfaf7',
  future:'#f2efe6',gold:'#c99512',goldD:'#7a5a00',red:'#c0392b',blueN:'#1f5fa8',violet:'#6a3d9a',green:'#2e8b57'};
const TS={land:6.0,t1:3.9,t2:3.4,meta:2.8,cap:4.2,kick:3.2};
// Future milestones, data/merged/timeline.json category future.prophecy, start.sort_key order 100001-100017
// (b12-0119 merged into b10-0011, b12-0120 into b10-0019, b12-0121 into b10-0020).
const PRE=[
 ['b10-0009','“Peace and security!”','1Th 5:3'],
 ['b10-0010','Final sealing of the anointed','Re 7:1-3'],
 ['b10-0011','Attack on Babylon the Great','Re 17:16'],
 ['b10-0012','Attack “cut short”','Mt 24:22'],
 ['b10-0013','Signs in sun, moon and stars','Mt 24:29'],
 ['b10-0014','Sign of the Son of man; sheep and goats judged','Mt 24:30; 25:31-33'],
 ['b10-0015','Attack by Gog of Magog','Eze 38:10-12'],
 ['b10-0016','Remaining anointed gathered to heaven','Mt 24:31']];
const ARM=['b10-0017','War of Armageddon','Re 16:14, 16'];
const POST=[
 ['b10-0018','Marriage of the Lamb','Re 19:9'],
 ['b10-0019','Satan and the demons abyssed','Re 20:1-3'],
 ['b10-0020','Christ’s Thousand Year Reign begins','Re 20:4, 6'],
 ['b10-0021','Earthly resurrection','Ac 24:15'],
 ['b10-0022','New scrolls opened','Re 20:12, 13'],
 ['b10-0023','Christ hands the Kingdom back to God','1Co 15:24-28'],
 ['b10-0024','Satan released; the final test','Re 20:7-9'],
 ['b10-0025','Satan, demons and rebels destroyed forever','Re 20:10']];
const IMG='../../../private/images/';
const F="'Noto Sans',sans-serif";
const n=v=>Math.round(v*100)/100;
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const at=o=>Object.entries(o).filter(([,v])=>v!=null&&v!==false).map(([k,v])=>` ${k.replace(/_/g,'-')}="${typeof v==='number'?n(v):v}"`).join('');
const HALO={stroke:C.paper,stroke_width:0.7,paint_order:'stroke',stroke_linejoin:'round'};
let OUT=[];
const el=(t,o,inner)=>OUT.push(`<${t}${at(o)}>${inner||''}</${t}>`);
const text=(x,y,s,fs,o={})=>el('text',Object.assign({x,y,font_size:fs},o),esc(s));
const rect=(x,y,w,h,fill,o={})=>el('rect',Object.assign({x,y,width:w,height:h,fill},o));
const line=(x1,y1,x2,y2,stroke,w,o={})=>el('line',Object.assign({x1,y1,x2,y2,stroke,stroke_width:w},o));
const path=(d,stroke,w,o={})=>el('path',Object.assign({d,stroke,stroke_width:w,fill:'none'},o));
const circ=(cx,cy,r,fill,o={})=>el('circle',Object.assign({cx,cy,r,fill},o));
const img=(x,y,w,h,href,o={})=>el('image',Object.assign({x,y,width:w,height:h,href,preserveAspectRatio:'xMidYMid slice'},o));
// station glyph: ring with white core (min Ø 2.4 mm), big = Ø 3.6 mm
const st=(x,y,big,col)=>{circ(x,y,big?1.8:1.2,C.card,{stroke:col||C.ink,stroke_width:big?0.6:0.45})};
// two-line label: title (bold) + meta (ref) ; anchor start|end|middle
const lab=(x,y,t,ref,anc,o={})=>{const fs=o.fs||TS.t2,fill=o.fill||C.ink,mf=o.mfill||C.g1;
  text(x,y,t,fs,Object.assign({text_anchor:anc||'start',fill,font_weight:o.w||700},o.halo===false?{}:HALO));
  if(ref)text(x,y+fs*0.95+0.4,ref,TS.meta,Object.assign({text_anchor:anc||'start',fill:mf},o.halo===false?{}:HALO))};
const medallion=(cx,cy,r,href,id,ring)=>{OUT.push(`<clipPath id="${id}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>`);
  circ(cx,cy,r+0.9,C.paper,{stroke:ring||C.gold,stroke_width:0.6});img(cx-r,cy-r,2*r,2*r,href,{clip_path:`url(#${id})`})};
const fin=(svg,defs)=>{svg.innerHTML=(defs||'')+OUT.join('');document.fonts&&document.fonts.ready.then(()=>{})};
function wrap(s,max){const w=s.split(' '),L=[];let c='';w.forEach(x=>{if((c+' '+x).trim().length>max&&c){L.push(c);c=x}else c=(c+' '+x).trim()});if(c)L.push(c);return L}
// ---- blending + texture (see V6_PLAN.md §Images & empty space)
const TEXTURE=`<filter id="warm" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.93 0.05 0.02 0 0.02  0.03 0.90 0.03 0 0.02  0.02 0.05 0.80 0 0.01  0 0 0 1 0"/></filter>
<filter id="grainF" x="0" y="0" width="1" height="1"><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2" seed="7"/><feColorMatrix values="0 0 0 0 0.54  0 0 0 0 0.45  0 0 0 0 0.30  0 0 0 0.9 -0.42"/></filter>
<pattern id="grain" width="60" height="60" patternUnits="userSpaceOnUse"><rect width="60" height="60" filter="url(#grainF)" opacity="0.35"/></pattern>
<pattern id="contour" width="40" height="14" patternUnits="userSpaceOnUse"><path d="M0 7 C10 2 20 12 40 7 M0 13 C12 9 22 16 40 12" fill="none" stroke="#c99512" stroke-width="0.25" opacity="0.18"/></pattern>
<radialGradient id="vig"><stop offset=".55" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>`;
// feathered, warm-toned circular vignette: no ring, edge fades over the outer 45% of the radius into the paper
const vignette=(cx,cy,r,href,id)=>{OUT.push(`<mask id="${id}"><circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#vig)"/></mask>`);
  el('g',{mask:`url(#${id})`,opacity:0.92},`<image filter="url(#warm)" x="${cx-r}" y="${cy-r}" width="${2*r}" height="${2*r}" href="${href}" preserveAspectRatio="xMidYMid slice"/>`)};
