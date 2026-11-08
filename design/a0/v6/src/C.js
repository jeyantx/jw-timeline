// C · FIFTH ROW: the future gets its own short metro row in the sheet's own language (beds, rails, stations, lanes), paradise strip beneath
const defs=`<defs>${TEXTURE}<pattern id="hatch" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="3" stroke="#a3a19b" stroke-width="0.3" opacity="0.5"/></pattern>
<linearGradient id="fT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000"/><stop offset=".3" stop-color="#fff"/><stop offset=".9" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
<linearGradient id="fS" x1="0" x2="1"><stop offset="0" stop-color="#000"/><stop offset=".06" stop-color="#fff"/><stop offset=".94" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
<mask id="m1"><rect x="0" y="182" width="340" height="118" fill="url(#fT)"/></mask><mask id="m2"><rect x="0" y="182" width="340" height="118" fill="url(#fS)"/></mask></defs>`;
rect(0,0,340,300,C.paper);rect(0,0,340,300,'url(#grain)');
text(8,13,'ROW 5 · THE FUTURE → in order only',TS.kick,{fill:C.g2,font_weight:800,letter_spacing:0.3});
text(8,21.5,'From the great tribulation to the end of the Thousand Year Reign',TS.land-0.6,{fill:C.ink,font_weight:800});
const Y=110;
// beds
rect(6,Y-14,150,28,C.g5,{rx:2});rect(6,Y-14,150,28,'url(#hatch)',{rx:2});
rect(192,Y-14,142,28,'#f6e7b8',{rx:2,stroke:C.gold,stroke_width:0.5});
text(9,Y+11.5,'GREAT TRIBULATION · Mt 24:21, 22',TS.kick,{fill:C.g1,font_weight:800,letter_spacing:0.3});
text(331,Y+11.5,'THOUSAND YEAR REIGN · 1,000 YEARS · Re 20:4-6',TS.kick,{text_anchor:'end',fill:C.goldD,font_weight:800,letter_spacing:0.3});
// rails + gold line
[[C.red,-4,6,160],[C.blueN,4,6,160],[C.ink,7,6,160]].forEach(([c,o,a,b])=>line(a,Y+o,b,Y+o,c,0.6,{opacity:0.6}));
line(6,Y,334,Y,C.gold,2.2);
// Armageddon gate
rect(165,Y-20,9,40,C.ink,{rx:1.5});rect(166.5,Y-18.5,6,37,C.red,{rx:1});
vignette(169.5,Y-38,15,IMG+'ev-armageddon.jpg','arm');
text(169.5,Y-62,'WAR OF ARMAGEDDON',TS.t1,Object.assign({text_anchor:'middle',fill:C.red,font_weight:800},HALO));
text(169.5,Y-57.4,'Re 16:14, 16',TS.meta,Object.assign({text_anchor:'middle',fill:C.g1},HALO));
// four lanes: up-near, down-near, up-far, down-far
const lane=(x,i,p,col,big)=>{const up=i%2===0,far=(i%4)>=2,t=wrap(p[1],20),dy=far?26:0,anc=x>318?'end':'middle',tx=x>318?x+3:x;
  st(x,Y,big,col);
  const y0=up?Y-20-dy-(t.length-1)*3.7:Y+21+dy;line(x,up?Y-2:Y+2,x,up?y0+((t.length)*3.7)-1.5:y0-3.4,C.g3,0.25);
  t.forEach((s,j)=>text(tx,y0+j*3.7,s,TS.t2,Object.assign({text_anchor:anc,fill:C.ink,font_weight:big?800:700},HALO)));
  text(tx,y0+t.length*3.7-0.3,p[2],TS.meta,Object.assign({text_anchor:anc,fill:C.g1},HALO))};
PRE.forEach((p,i)=>lane(16+i*19.5,i,p,C.ink,i===2));
const PX=[180,186,198,224,250,300,322,330];
// order preserved: marriage + abyss between gate and bed; reign begins at bed start
[[180,0],[194,1],[210,2],[236,3],[262,4],[292,5],[312,6],[328,7]].forEach(([x,id],k)=>lane(x,k+1,POST[id],C.goldD,id===2||id===3));
// paradise strip, feathered top & sides, warm-toned
el('g',{mask:'url(#m2)'},`<g mask="url(#m1)" opacity="0.95"><image filter="url(#warm)" x="0" y="182" width="340" height="118" href="${IMG}paradise.jpg" preserveAspectRatio="xMidYMid slice" opacity="0.8"/></g>`);

text(10,290,'PARADISE ON EARTH · Lu 23:43 · Re 21:3, 4',TS.cap,Object.assign({fill:C.ink,font_weight:800,letter_spacing:0.3},HALO));
fin(document.getElementById('s'),defs);
