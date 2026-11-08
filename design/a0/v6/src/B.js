// B · SUNRISE THRESHOLD: dusk column of pre-Armageddon events, Armageddon is the threshold, the Reign is a bright gold 1,000-year ruler on the horizon
const defs=`<defs>${TEXTURE}<linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b2a28"/><stop offset="1" stop-color="#55524c"/></linearGradient>
<radialGradient id="sun" cx="118" cy="232" r="260" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffe9a8"/><stop offset=".35" stop-color="#f6e2a6"/><stop offset="1" stop-color="#f7f6f2"/></radialGradient>
<linearGradient id="fadeL" x1="0" x2="1"><stop offset="0" stop-color="#000"/><stop offset=".18" stop-color="#fff"/></linearGradient>
<linearGradient id="fadeV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000"/><stop offset=".25" stop-color="#fff"/><stop offset=".85" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
<mask id="mL"><rect x="118" y="30" width="222" height="200" fill="url(#fadeL)"/></mask><mask id="mV"><rect x="118" y="30" width="222" height="200" fill="url(#fadeV)"/></mask></defs>`;
rect(0,0,340,300,'url(#sun)');rect(0,0,340,300,'url(#grain)');
// paradise above the horizon, blended into the sunrise (feathered left + top, multiply-like opacity)
el('g',{mask:'url(#mL)'},`<g mask="url(#mV)" opacity="0.9"><image filter="url(#warm)" x="118" y="30" width="222" height="200" href="${IMG}paradise.jpg" preserveAspectRatio="xMidYMax slice"/></g>`);
rect(0,0,118,232,'url(#dusk)');
// faint rays from the threshold
for(let k=0;k<9;k++){const a=-Math.PI*(0.08+k*0.05);path(`M118 232 L${118+400*Math.cos(a)} ${232+400*Math.sin(a)}`,C.gold,0.35,{opacity:0.12})}
text(8,13,'THE FUTURE',TS.kick,{fill:'#e9c86a',font_weight:800,letter_spacing:0.3});
text(8,21,'Great tribulation',TS.land-0.4,{fill:C.paper,font_weight:800});
text(8,26.4,'Mt 24:21, 22 · in order only',TS.meta,{fill:'#c8c6bf'});
// dusk rail
line(16,34,16,232,'#e9c86a',1.2,{opacity:0.8});
PRE.forEach((p,i)=>{const y=40+i*24.5;circ(16,y,1.4,'#2b2a28',{stroke:'#f3d27a',stroke_width:0.5});
  const t=wrap(p[1],28);t.forEach((s,j)=>text(22,y+1.2+j*3.8,s,TS.t2,{fill:C.paper,font_weight:700}));
  text(22,y+1.2+t.length*3.8-0.3,p[2],TS.meta,{fill:'#c8c6bf'})});
// horizon = the main line
line(16,232,340,232,C.gold,2.2);path('M16 226 Q16 232 22 232',C.gold,1.2);
// threshold
line(118,8,118,300,C.goldD,0.5,{opacity:0.6});
vignette(118,232,17,IMG+'ev-armageddon.jpg','arm');
circ(118,232,2.4,C.red,{stroke:C.paper,stroke_width:0.6});
text(112,256,'WAR OF',TS.t1,{text_anchor:'end',fill:C.red,font_weight:800});
text(112,261,'ARMAGEDDON',TS.t1+0.6,{text_anchor:'end',fill:C.red,font_weight:800});
text(112,266.4,'Re 16:14, 16',TS.meta,{text_anchor:'end',fill:C.g1});
text(112,271,'finale of the great tribulation',TS.meta,{text_anchor:'end',fill:C.g1});
// 1,000-year ruler
const R0=150,R1=318,yr=y=>R0+(R1-R0)*y/1000;
rect(R0,228,R1-R0,8,'#f3d27a',{stroke:C.goldD,stroke_width:0.4,rx:1});
for(let y=0;y<=1000;y+=100){line(yr(y),236,yr(y),y%500?239:241,C.goldD,0.4);if(y%500===0)text(yr(y),245,y?y.toLocaleString('en'):'0',TS.meta,{text_anchor:'middle',fill:C.goldD,font_weight:800})}
text((R0+R1)/2,224,'CHRIST’S THOUSAND YEAR REIGN · Re 20:4-6',TS.t1,Object.assign({text_anchor:'middle',fill:C.goldD,font_weight:800,letter_spacing:0.2},HALO));
// three honest zones (no invented years)
const Z=[[124,'AT THE START',[0,1,2]],[196,'DURING THE 1,000 YEARS',[3,4]],[268,'AT THE END',[5,6,7]]];
Z.forEach(([x,h,ids])=>{text(x,252,h,TS.kick,{fill:C.goldD,font_weight:800,letter_spacing:0.3});
  ids.forEach((id,j)=>{const p=POST[id],t=wrap(p[1],24),y=258+j*13.5;circ(x+1.2,y-1.1,1.1,C.card,{stroke:C.goldD,stroke_width:0.45});
    t.forEach((s,k)=>text(x+4,y+k*3.7,s,TS.t2,{fill:C.ink,font_weight:id===2||id===3?800:700}));text(x+4,y+t.length*3.7-0.3,p[2],TS.meta,{fill:C.g1})})});
text(330,40,'PARADISE ON EARTH',TS.cap+0.8,Object.assign({text_anchor:'end',fill:C.ink,font_weight:800,letter_spacing:0.3},HALO));
text(330,45.6,'Lu 23:43 · Re 21:3, 4',TS.meta+0.2,Object.assign({text_anchor:'end',fill:C.g1},HALO));
fin(document.getElementById('s'),defs);
