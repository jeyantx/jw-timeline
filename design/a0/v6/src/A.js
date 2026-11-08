// A · PANORAMA: row 4 arrives from the right, drops at Armageddon, the Reign is a gold band laid over a full-width paradise panorama
const defs=`<defs><linearGradient id="fadeT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".22" stop-color="#fff" stop-opacity="1"/></linearGradient>
<mask id="mT"><rect x="0" y="128" width="340" height="172" fill="url(#fadeT)"/></mask><mask id="mS"><rect x="0" y="128" width="340" height="172" fill="url(#fadeS)"/></mask><linearGradient id="fadeS" x1="0" x2="1"><stop offset="0" stop-color="#000"/><stop offset=".07" stop-color="#fff"/><stop offset=".93" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>${TEXTURE}<linearGradient id="wash" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7f6f2" stop-opacity=".55"/><stop offset=".5" stop-color="#f2e3b8" stop-opacity=".18"/><stop offset="1" stop-color="#f7f6f2" stop-opacity=".35"/></linearGradient>
<linearGradient id="reign" x1="0" x2="1"><stop offset="0" stop-color="#e2b23a"/><stop offset=".5" stop-color="#f3d27a"/><stop offset="1" stop-color="#e2b23a"/></linearGradient>
<linearGradient id="trib" x1="0" x2="1"><stop offset="0" stop-color="#cfccc4"/><stop offset="1" stop-color="#e2e0d9"/></linearGradient></defs>`;
rect(0,0,340,300,C.paper);rect(0,0,340,300,'url(#grain)');
text(330,262,'1,000',64,{text_anchor:'end',fill:C.gold,opacity:0.07,font_weight:800});
rect(36,64,300,40,'url(#contour)',{opacity:1});
text(10,13,'THE FUTURE · IN THE ORDER JW.ORG GIVES',TS.kick,{fill:C.g2,font_weight:800,letter_spacing:0.3});
text(10,21.5,'Through the great tribulation into Paradise',TS.land,{fill:C.ink,font_weight:800});
// tribulation bed + incoming rails (right → left, as row 4 runs)
rect(36,38,300,24,'url(#trib)',{rx:3});
text(40,44.2,'GREAT TRIBULATION · Mt 24:21, 22',TS.kick-0.4,{fill:C.g2,font_weight:800,letter_spacing:0.3});
[[C.red,-4],[C.blueN,4],[C.ink,7]].forEach(([c,o])=>line(40,50+o,340,50+o,c,0.6,{opacity:0.55}));
line(28,50,340,50,C.gold,2.2);
const xs=PRE.map((_,i)=>322-i*38.5);
PRE.forEach((p,i)=>{const x=xs[i],up=i%2===0;st(x,50,i===2||i===5);
  const y=up?31.5-0:70.5;line(x,up?48.2:51.8,x,up?y+1.2:y-3.6,C.g3,0.25);
  const t=p[1].length>28?p[1].replace(/; /,';\n').split('\n'):[p[1]];
  if(up){/* above: lines stacked upwards */ }
  t.forEach((s,j)=>text(x,(up?y-(t.length-1-j)*3.6:y+j*3.6),s,TS.t2,Object.assign({text_anchor:'middle',fill:C.ink,font_weight:700},HALO)));
  text(x,up?y+3.4-0.4+0.0+0:y+t.length*3.6,p[2],TS.meta,Object.assign({text_anchor:'middle',fill:C.g1},HALO));});
// Armageddon: the line drops down the left edge into the panorama
path('M28 50 C14 50 12 62 12 76 L12 118 C12 126 16 128 24 128',C.gold,2.2);
vignette(34,92,15,IMG+'ev-armageddon.jpg','arm');
text(52,88,'WAR OF ARMAGEDDON',TS.t1+0.6,Object.assign({fill:C.red,font_weight:800},HALO));
text(52,93.6,'the finale of the great tribulation · Re 16:14, 16',TS.meta,Object.assign({fill:C.g1},HALO));
// panorama
el('g',{mask:'url(#mS)'},`<g mask="url(#mT)"><image filter="url(#warm)" x="0" y="128" width="340" height="172" href="${IMG}paradise__alt1.jpg" preserveAspectRatio="xMidYMid slice" opacity="0.78"/></g>`);
rect(0,128,340,172,'url(#wash)');
// reign band over the sky
rect(24,121,312,14,'url(#reign)',{rx:7,stroke:C.goldD,stroke_width:0.4});
text(180,111,'CHRIST’S THOUSAND YEAR REIGN · 1,000 YEARS · Re 20:4-6',TS.t1+0.6,Object.assign({text_anchor:'middle',fill:C.goldD,font_weight:800,letter_spacing:0.3},HALO));
const px=POST.map((_,i)=>36+i*40.5);
POST.forEach((p,i)=>st(px[i],128,big(i),C.goldD));
// chips under the band, two lanes
POST.forEach((p,i)=>{const x=px[i],lane=i%2,t=wrap(p[1],22),h=t.length*3.7+4.2,y=140+lane*22,w=Math.max(...t.map(s=>s.length))*1.95+6;
  line(x,129.8,x,y,C.goldD,0.35);
  rect(x-w/2,y,w,h,C.card,{rx:1.6,opacity:0.94,stroke:C.gold,stroke_width:0.35});
  t.forEach((s,j)=>text(x,y+4.1+j*3.7,s,TS.t2,{text_anchor:'middle',fill:C.ink,font_weight:big(i)?800:700}));
  text(x,y+4.1+t.length*3.7-0.5,p[2],TS.meta,{text_anchor:'middle',fill:C.g1})});
function big(i){return i===2||i===3}
// caption card
rect(10,272,150,18,C.card,{rx:2,opacity:0.92});
text(15,280,'PARADISE ON EARTH',TS.cap+0.6,{fill:C.ink,font_weight:800,letter_spacing:0.3});
text(15,286,'Lu 23:43 · Re 21:3, 4 · Ps 37:10, 11',TS.meta+0.2,{fill:C.g1});

fin(document.getElementById('s'),defs);
