(function(){
const {C,T}=A0;
const PL={Ur:[46.10,30.96],Haran:[39.03,36.86],Babylon:[44.42,32.54],Nineveh:[43.15,36.36],Susa:[48.26,32.19],Damascus:[36.29,33.51],Tyre:[35.20,33.27],Sidon:[35.37,33.56],
 Antioch:[36.16,36.20],Seleucia:[35.93,36.12],Tarsus:[34.89,36.92],Salamis:[33.9,35.18],Paphos:[32.42,34.77],Perga:[30.85,36.96],PAntioch:[31.19,38.31],Iconium:[32.49,37.87],Lystra:[32.33,37.58],Derbe:[33.36,37.35],
 Troas:[26.24,39.75],Philippi:[24.29,41.01],Thessalonica:[22.94,40.64],Berea:[22.2,40.52],Athens:[23.73,37.98],Corinth:[22.88,37.91],Ephesus:[27.34,37.94],Patmos:[26.55,37.31],Myra:[29.98,36.26],FairHavens:[24.8,34.93],Malta:[14.4,35.9],Puteoli:[14.1,40.82],Rome:[12.48,41.89],
 Rameses:[31.83,30.80],Succoth:[32.1,30.55],RedSea:[32.55,29.95],Marah:[32.75,29.5],Sin:[33.3,28.9],Rephidim:[33.62,28.68],Sinai:[33.97,28.54],Kadesh:[34.42,30.69],Hor:[35.4,30.32],Moab:[35.6,31.83],Memphis:[31.25,29.85],
 Jerusalem:[35.23,31.78],Bethlehem:[35.20,31.70],Bethany:[35.26,31.77],Jericho:[35.44,31.86],Hebron:[35.10,31.53],Beersheba:[34.79,31.25],Nazareth:[35.30,32.70],Capernaum:[35.57,32.88],Samaria:[35.19,32.28],Shechem:[35.28,32.21],Bethel:[35.22,31.93],Caesarea:[34.89,32.50],Joppa:[34.75,32.05],Carmel:[35.0,32.73],Shiloh:[35.29,32.06],Gaza:[34.46,31.50]};
const ROUTES=[
 {c:C.abr,w:0.8,d:null,pts:['Ur','Haran','Damascus','Shechem','Bethel','Memphis','Bethel','Hebron','Beersheba']},
 {c:C.exo,w:0.9,d:null,pts:['Rameses','Succoth','RedSea','Marah','Sin','Rephidim','Sinai','Kadesh','Hor','Moab','Jericho']},
 {c:C.paul,w:0.7,d:null,pts:['Antioch','Seleucia','Salamis','Paphos','Perga','PAntioch','Iconium','Lystra','Derbe']},
 {c:C.paul,w:0.7,d:null,pts:['Antioch','Tarsus','Derbe','Lystra','Troas','Philippi','Thessalonica','Berea','Athens','Corinth','Ephesus','Caesarea','Jerusalem']},
 {c:C.paul,w:0.7,d:'1.6 1',pts:['Caesarea','Sidon','Myra','FairHavens','Malta','Puteoli','Rome']}];
const STOPS={E:['Rameses','Succoth','RedSea','Marah','Sin','Rephidim','Sinai','Kadesh','Hor','Moab'],P:['Antioch','Salamis','Paphos','PAntioch','Lystra','Troas','Philippi','Thessalonica','Athens','Corinth','Ephesus','Caesarea','Malta','Rome']};
const STACK=[['Ur',['R1 before 1943 · Abraham leaves'],2,-1],['Haran',['R1 1943 · Abraham departs'],2,-1],['Babylon',['R2 617 · Daniel arrives','R2 607 · Judah exiled','R2 539 · falls to Cyrus'],2,4],
 ['Nineveh',['R2 c. 844 · Jonah','R2 632 · falls'],2,-1],['Susa',['R2 c. 493 · Esther'],-1,6,'end'],['Damascus',['R3 c. 34 · Saul converted'],2,-3],['Tyre',['R2 332 · destroyed'],-2,-3,'end'],
 ['Antioch',['R3 47–56 · Paul sets out'],2,-1.5],['Ephesus',['R3 52–55 · Paul','R3 c. 96 · Re 2:1'],2,4],['Corinth',['R3 c. 50 · Paul'],-2,4,'end'],['Athens',['R3 c. 50 · Areopagus'],2,-3.5],
 ['Rome',['R3 59–61 · Paul','R3 64 · fire'],2,-1],['Patmos',['R3 c. 96 · Revelation'],-2,6,'end'],['Malta',['R3 c. 58 · shipwreck'],2,4],['Sinai',['R1 1513 · Law covenant'],2,3]];
const ISTACK=[['Jerusalem',['R1 c. 1070 · David’s city','R1 1027 · temple','R2 607 · destroyed','R2 455 · walls rebuilt','R3 33 · Jesus dies','R3 70 · destroyed'],3,-2],
 ['Bethlehem',['R3 2 B.C.E. · Jesus born'],-2,6,'end'],['Nazareth',['R3 Jesus grows up'],2,1],['Capernaum',['R3 30–32 · Jesus’ base'],2,-1.5],['Jericho',['R1 1473 · falls'],2,-2.5],
 ['Hebron',['R1 1077 · David king'],-2,2,'end'],['Samaria',['R2 740 · falls'],2,-1],['Carmel',['R2 Elijah vs. Baal'],-2,-2,'end'],['Caesarea',['R3 36 · Cornelius'],-2,1,'end'],['Shiloh',['R1 tabernacle'],2,2]];
function pins(s,proj,list,clip){list.forEach(([nm,lines,dx,dy,anc])=>{const p=proj(PL[nm]);if(!p)return;const [x,y]=p;
  s.circ(x,y,1.1,C.ink,{stroke:C.paper,stroke_width:0.4},'top');
  const a=anc||'start',tx=x+dx;s.text(tx,y+dy,nm.replace('PAntioch','Pisidian Antioch'),2.9,{text_anchor:a,fill:C.ink,font_weight:800,stroke:C.paper,stroke_width:0.8,paint_order:'stroke'},'top');
  lines.forEach((l,i)=>s.text(tx,y+dy+3.2+i*3.1,l,T.meta,{text_anchor:a,fill:C.g1,stroke:C.paper,stroke_width:0.8,paint_order:'stroke'},'top'))})}
function routes(s,proj,clip){ROUTES.forEach(r=>{const d='M'+r.pts.map(k=>proj(PL[k]).map(A0.n).join(' ')).join('L');s.path(d,r.c,r.w,{stroke_dasharray:r.d,clip_path:`url(#${clip})`,stroke_linejoin:'round'},'lines')});
  Object.entries(STOPS).forEach(([pre,L])=>L.forEach((k,i)=>{const [x,y]=proj(PL[k]);const c=pre==='E'?C.exo:C.paul;s.circ(x,y,1.5,C.paper,{stroke:c,stroke_width:0.45},'st');s.text(x,y+0.75,`${i+1}`,1.9,{text_anchor:'middle',fill:c,font_weight:800},'st')}))}
function land(s,world,proj,clip,x,y,w,h){const g=d3.geoPath(proj);s.raw(`<clipPath id="${clip}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath>`,'bg');
  s.rect(x,y,w,h,C.sea,{},'bg');s.path(g(world),C.g3,0.25,{fill:C.land,clip_path:`url(#${clip})`},'bg');s.rect(x,y,w,h,'none',{stroke:C.g2,stroke_width:0.4},'top')}
A0.drawMaps=(s,topo)=>{
  const world=topojson.merge(topo,topo.objects.countries.geometries);
  // M1 Lands of the Bible
  const X0=345,Y0=612,W=330,H=186;
  s.text(X0,Y0+4,'M1 · LANDS OF THE BIBLE',4.2,{fill:C.ink,font_weight:800},'top');s.text(X0+70,Y0+4,'places with 2+ events · R1–R3 = row where the event stands',2.65,{fill:C.g2},'top');
  const p1=d3.geoMercator().fitExtent([[X0,Y0+7],[X0+W,Y0+H]],{type:'MultiPoint',coordinates:[[11,27.6],[49.5,42.6]]});
  land(s,world,p1,'m1c',X0,Y0+7,W,H-7);routes(s,p1,'m1c');pins(s,p1,STACK);
  // inset: land of Israel
  const ix=X0+3,iy=Y0+92,iw=100,ih=91;s.rect(ix-1,iy-1,iw+2,ih+2,C.paper,{},'top');
  const s2=new A0.SVG();const pi=d3.geoMercator().fitExtent([[ix,iy+5],[ix+iw,iy+ih]],{type:'MultiPoint',coordinates:[[33.9,29.6],[36.3,33.3]]});
  land(s2,world,pi,'m1i',ix,iy,iw,ih);s2.text(ix+1.5,iy+4,'INSET · THE LAND',3,{fill:C.ink,font_weight:800},'top');
  ['Bethany','Beersheba','Shechem','Bethel','Joppa','Gaza'].forEach(k=>{const [x,y]=pi(PL[k]);s2.circ(x,y,0.8,C.g1,{},'top')});
  s2.path('M'+['Kadesh','Hor','Moab','Jericho'].map(k=>pi(PL[k]).map(A0.n).join(' ')).join('L'),C.exo,0.9,{clip_path:'url(#m1i)'},'lines');
  pins(s2,pi,ISTACK);s.raw(s2.out(),'top');
  const [jx,jy]=p1(PL.Jerusalem);s.rect(jx-2.5,jy-3,5,6,'none',{stroke:C.ink,stroke_width:0.4},'top');
  // key
  [[C.abr,'Abraham (route A)'],[C.exo,'Exodus E1–10 (row 1)'],[C.paul,'Paul P1–14 (row 3)']].forEach(([c,t],i)=>{const y=Y0+176+i*0;const x=X0+108+i*72;s.line(x,Y0+H-4,x+8,Y0+H-4,c,1,{},'top');s.text(x+10,Y0+H-3,t,2.65,{fill:C.ink,font_weight:700,stroke:C.paper,stroke_width:0.8,paint_order:'stroke'},'top')});
  // M2 The Bible and the good news reach the earth
  const X2=685,W2=300;
  s.text(X2,Y0+4,'M2 · THE BIBLE AND THE GOOD NEWS REACH THE EARTH',4.2,{fill:C.ink,font_weight:800},'top');
  const p2=d3.geoNaturalEarth1().fitExtent([[X2,Y0+7],[X2+W2,Y0+H]],{type:'MultiPoint',coordinates:[[-128,-42],[155,72]]});
  land(s,world,p2,'m2c',X2,Y0+7,W2,H-7);
  const P2={Pittsburgh:[-80,40.44],Brooklyn:[-73.99,40.70],Warwick:[-74.36,41.26],Tranquebar:[79.85,11.03],Guangzhou:[113.26,23.13],Jerusalem:[35.23,31.78]};
  Object.assign(PL,P2);
  pins(s,p2,[['Pittsburgh',['R4 1870 · Bible class','R4 1879 · Watch Tower','R4 1919, 1922 · Cedar Point'],-2,4,'end'],['Brooklyn',['R4 1909–2016 · HQ'],2,4],['Warwick',['R4 2017– · HQ'],2,-2],
    ['Tranquebar',['R3 1714 · TAMIL NEW TESTAMENT'],2,1],['Guangzhou',['R3 1823 · Chinese Bible'],2,-1],['Jerusalem',['R3 33 · Pentecost'],-2,6,'end']]);
  const ex=X2+3,ey=Y0+103,ew=118,eh=80;s.rect(ex-1,ey-1,ew+2,eh+2,C.paper,{},'top');
  const s3=new A0.SVG();const pe=d3.geoMercator().fitExtent([[ex,ey+5],[ex+ew,ey+eh]],{type:'MultiPoint',coordinates:[[-7,36],[40,58]]});
  land(s3,world,pe,'m2e',ex,ey,ew,eh);s3.text(ex+1.5,ey+4,'INSET · EUROPE',3,{fill:C.ink,font_weight:800},'top');
  Object.assign(PL,{London:[-0.13,51.5],Lutterworth:[-1.2,52.45],Mainz:[8.27,50],Worms:[8.36,49.63],Wittenberg:[12.65,51.87],Vilvoorde:[4.43,50.93],Toulouse:[1.44,43.6],Trent:[11.12,46.07],Magdeburg:[11.6,52.1],Moscow:[37.6,55.75],Nicaea:[29.72,40.43]});
  pins(s3,pe,[['London',['R4 1900 · first branch'],-2,-2,'end'],['Lutterworth',['R3 1382 · Wycliffe'],-2,-4.5,'end'],['Mainz',['R3 c. 1455 · Gutenberg'],-2,5,'end'],['Wittenberg',['R3 1522 · Luther'],2,-2],
    ['Vilvoorde',['R3 1536 · Tyndale killed'],-2,0.5,'end'],['Toulouse',['R3 1229 · Bible ban'],2,1],['Trent',['R3 1546 · council'],2,2.5],['Magdeburg',['R4 1933–45 · ban'],2,4],['Moscow',['R4 2017– · ban'],-2,4,'end'],['Nicaea',['R3 325 · council'],-2,-1.5,'end']]);
  s.raw(s3.out(),'top');
};
// ---------- legend + footer
A0.drawLegend=s=>{const x=995,y=615,l='top';s.rect(x,y,170,183,C.card,{stroke:C.g4,stroke_width:0.4,rx:1.5},'bg');
  s.text(x+4,y+6,'HOW TO READ',4,{fill:C.ink,font_weight:800},l);
  const row=(i,t,draw)=>{const yy=y+13+i*6.6;draw(x+4,yy);s.text(x+22,yy+1,t,2.65,{fill:C.ink,font_weight:600},l)};
  const ln=(c,w,d)=>(X,Y)=>s.line(X,Y,X+15,Y,c,w,{stroke_dasharray:d},l);
  row(0,'Promised offspring · Ge 3:15 (the gold line)',ln(C.gold,2.2));
  row(1,'World powers · Da 2 (metal = part of the image)',(X,Y)=>{s.line(X,Y,X+15,Y,C.au,2.6,{},l);s.line(X,Y,X+15,Y,C.red,0.9,{},l)});
  row(2,'Kings of the north and south · Da 11',(X,Y)=>{s.line(X,Y-0.9,X+15,Y-0.9,C.blueN,1,{},l);s.line(X,Y+0.9,X+15,Y+0.9,C.blueS,1,{},l)});
  row(3,'Daniel’s time prophecies (ruler)',(X,Y)=>{s.line(X,Y,X+15,Y,C.violet,1.1,{},l);for(let k=0;k<=15;k+=2.5)s.line(X+k,Y-1.2,X+k,Y+1.2,C.violet,0.35,{},l)});
  row(4,'Covenants (seal)',(X,Y)=>{s.line(X,Y,X+15,Y,C.sepia,0.6,{stroke_dasharray:'2 1.2'},l);s.rect(X+6.4,Y-1.1,2.2,2.2,C.sepia,{transform:`rotate(45 ${X+7.5} ${Y})`},l)});
  row(5,'Messianic prophecy → fulfilled 29–33 C.E.',(X,Y)=>s.path(`M${X} ${Y+1.5}Q${X+7} ${Y-4} ${X+15} ${Y+1.5}`,C.green,0.6,{},l));
  row(6,'Prophecy about a nation → fulfillment',(X,Y)=>s.path(`M${X} ${Y-1.5}Q${X+7} ${Y+4} ${X+15} ${Y-1.5}`,C.mag,0.6,{},l));
  row(7,'Wheat and weeds · Mt 13:24-43',(X,Y)=>{s.line(X,Y-1,X+15,Y-1,C.wheat,1.4,{},l);s.line(X,Y+1.2,X+15,Y+1.2,C.weeds,1.4,{},l);for(let k=1;k<15;k+=2.6)s.line(X+k,Y+1.2,X+k+1,Y+2.6,C.weeds,0.4,{},l)});
  row(8,'History line · stations · arrows show direction',(X,Y)=>{s.line(X,Y,X+15,Y,C.ink,0.8,{},l);A0.glyph(s,X+5,Y,0,false,l);s.path(`M${X+10} ${Y-1.6}L${X+12} ${Y}L${X+10} ${Y+1.6}`,C.ink,0.5,{},l)});
  row(9,'Interchange: an event in several series',(X,Y)=>{s.rect(X+5.5,Y-4,4,8,C.paper,{rx:2,stroke:C.ink,stroke_width:0.7},l);A0.glyph(s,X+7.5,Y,0,true,l)});
  const gy=y+82;s.text(x+4,gy,'DATE PRECISION',2.9,{fill:C.ink,font_weight:800},l);
  ['exact','about (c.)','b. before · a. after','within a window','year not stated'].forEach((t,i)=>{const gx=x+6+(i%3)*55,yy=gy+5+Math.floor(i/3)*5;A0.glyph(s,gx,yy-0.9,i,false,l);s.text(gx+4,yy,t,2.65,{fill:C.ink},l)});
  const sy=y+101;s.text(x+4,sy,'SPANS',2.9,{fill:C.ink,font_weight:800},l);
  s.rect(x+4,sy+2.5,28,4.4,C.g1,{rx:0.6},l);s.text(x+5,sy+5.9,'Asa · 41 yrs',2.65,{fill:'#fff',font_weight:700},l);
  s.rect(x+36,sy+2.5,28,4.4,'url(#fadeR)',{rx:0.6},l);s.text(x+37,sy+5.9,'ongoing →',2.65,{fill:C.ink,font_weight:700},l);
  s.rect(x+68,sy+2.5,32,4.4,'none',{stroke:C.g1,stroke_width:0.4,stroke_dasharray:'1.4 0.8',rx:0.6},l);s.text(x+69,sy+5.9,'years not stated',2.65,{fill:C.g1,font_weight:700},l);
  s.line(x+105,sy+2.5,x+105,sy+6.9,C.ink,0.6,{},l);s.circ(x+105,sy+2.5,0.9,C.ink,{},l);s.text(x+107,sy+5.9,'short span',2.65,{fill:C.g1,font_weight:700},l);
  s.text(x+4,sy+11.5,'* duration computed, not stated in the source',2.65,{fill:C.g1},l);s.text(x+100,sy+11.5,'≠ sources differ',2.65,{fill:C.g1},l);
  const ly2=y+121;s.text(x+4,ly2,'LABELS',2.9,{fill:C.ink,font_weight:800},l);
  s.text(x+4,ly2+5,'Landmark (tier 1)',T.t1,{fill:C.ink,font_weight:800},l);s.text(x+50,ly2+5,'Major (tier 2)',T.t2,{fill:C.ink,font_weight:500},l);
  s.text(x+4,ly2+9,'date as printed · key scripture',T.meta,{fill:C.g2},l);
  s.text(x+4,ly2+13,'In the app, events carry codes: R1–R4 row · J Jesus’ ministry · F future.',2.65,{fill:C.g1},l);
  const ey=y+141;s.text(x+4,ey,'ERAS',2.9,{fill:C.ink,font_weight:800},l);
  [[C.bible,'Bible era'],[C.church,'Bible & church history'],[C.modern,'Jehovah’s Witnesses'],[C.future,'Future']].forEach(([c,t],i)=>{const ex=x+4+(i%2)*80,yy=ey+3+Math.floor(i/2)*5.5;s.rect(ex,yy,8,4,c,{stroke:C.g3,stroke_width:0.3},l);s.text(ex+10,yy+3.2,t,2.65,{fill:C.ink},l)});
  s.rect(x+4,y+160,18,18,'url(#qr)',{stroke:C.ink,stroke_width:0.4},l);s.text(x+25,y+165,'Scan for every record in the app,',2.65,{fill:C.ink,font_weight:700},l);
  s.text(x+25,y+168.6,'including tiers 3–4 not printed here.',2.65,{fill:C.g1},l);s.text(x+25,y+172.2,'The turns of the line also carry events.',2.65,{fill:C.g1},l);
  s.text(x+25,y+175.8,'Sources: si · it-1 · it-2 · nwtsty A6, A7, B12 · kr · w13 7/15',2.65,{fill:C.g2},l);
};
A0.drawFooter=s=>{s.text(25,812,'Unofficial personal study chart. Not a publication of Jehovah’s Witnesses. All dates as printed in jw.org publications; where publications differ this is marked ≠.',3,{fill:C.g1},'top');
  s.text(25,816.6,'Images © Watch Tower Bible and Tract Society of Pennsylvania, credited per image in the app · A0 chart v5 · English edition · time scales vary by row.',3,{fill:C.g1,font_weight:600},'top')};
})();
