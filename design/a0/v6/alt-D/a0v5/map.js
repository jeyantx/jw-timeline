(function(){
const {C,T}=A0;
const P={Ur:[46.10,30.96],Haran:[39.03,36.86],Babylon:[44.42,32.54],Nineveh:[43.15,36.36],Susa:[48.26,32.19],Damascus:[36.29,33.51],Tyre:[35.20,33.27],Sidon:[35.37,33.56],
 Antioch:[36.16,36.20],Seleucia:[35.93,36.12],Tarsus:[34.89,36.92],Salamis:[33.9,35.18],Paphos:[32.42,34.77],Perga:[30.85,36.96],PAntioch:[31.19,38.31],Iconium:[32.49,37.87],Lystra:[32.33,37.58],Derbe:[33.36,37.35],
 Troas:[26.24,39.75],Philippi:[24.29,41.01],Thessalonica:[22.94,40.64],Berea:[22.2,40.52],Athens:[23.73,37.98],Corinth:[22.88,37.91],Ephesus:[27.34,37.94],Patmos:[26.55,37.31],Myra:[29.98,36.26],FairHavens:[24.8,34.93],Malta:[14.4,35.9],Puteoli:[14.1,40.82],Rome:[12.48,41.89],
 Rameses:[31.83,30.80],Succoth:[32.1,30.55],RedSea:[32.55,29.95],Marah:[32.75,29.5],Sin:[33.3,28.9],Rephidim:[33.62,28.68],Sinai:[33.97,28.54],Kadesh:[34.42,30.69],Hor:[35.41,30.32],Nebo:[35.73,31.77],Memphis:[31.25,29.85],
 Jerusalem:[35.23,31.78],Bethlehem:[35.20,31.70],Jericho:[35.44,31.86],Hebron:[35.10,31.53],Beersheba:[34.79,31.25],Nazareth:[35.30,32.70],Capernaum:[35.57,32.88],Samaria:[35.19,32.28],Shechem:[35.28,32.21],Bethel:[35.22,31.93],Caesarea:[34.89,32.50],Carmel:[35.0,32.73],Shiloh:[35.29,32.06],
 Nicaea:[29.72,40.43],Toulouse:[1.44,43.6],Lutterworth:[-1.2,52.45],Mainz:[8.27,50],Wittenberg:[12.65,51.87],Vilvoorde:[4.43,50.93],Tranquebar:[79.85,11.03],Guangzhou:[113.26,23.13],
 Riblah:[36.55,34.45],Hamath:[36.75,35.13],Carchemish:[38.0,36.83],Mari:[40.89,34.55],Pelusium:[32.55,31.04],Dibon:[35.78,31.50],Gaza:[34.46,31.50],Attalia:[30.70,36.89],Samothrace:[25.53,40.48],Neapolis:[24.41,40.94],Amphipolis:[23.84,40.82],Apollonia:[23.47,40.62],Cenchreae:[22.99,37.88],Assos:[26.34,39.49],Mitylene:[26.55,39.10],Chios:[26.13,38.37],Samos:[26.98,37.70],Miletus:[27.28,37.53],Cos:[27.29,36.89],Rhodes:[28.22,36.44],Patara:[29.32,36.26],Ptolemais:[35.08,32.93],Cnidus:[27.37,36.69],Syracuse:[15.29,37.08],Rhegium:[15.65,38.11],Galatia:[32.85,39.93],GathHepher:[35.33,32.74],Joppa:[34.75,32.05],JonahSea:[31.2,33.7],
 Pittsburgh:[-80,40.44],Sandusky:[-82.68,41.48],Brooklyn:[-73.99,40.70],Warwick:[-74.36,41.26],London:[-0.13,51.5],Magdeburg:[11.6,52.1],Moscow:[37.6,55.75],Ramah:[35.23,31.85],Salmone:[26.30,35.31],Cauda:[24.08,34.85]};
const NAME={GathHepher:'Gath-hepher',JonahSea:'→ toward Tarshish',Galatia:'Galatia',PAntioch:'Pisidian Antioch',RedSea:'Red Sea crossing',Hor:'Mount Hor',Nebo:'Mount Nebo',Sinai:'Mount Sinai',Kadesh:'Kadesh-barnea',Sandusky:'Cedar Point',Memphis:'Egypt (Memphis)',Carmel:'Mount Carmel',Tranquebar:'Tranquebar',Antioch:'Antioch (Syria)',Berea:'Beroea',Salmone:'Cape Salmone'};
const PEOPLE={Ur:'Abraham, Sarah',Haran:'Abraham, Jacob',Babylon:'Daniel, Nebuchadnezzar',Nineveh:'Jonah',Susa:'Esther, Mordecai',Damascus:'Saul of Tarsus',Tyre:'Alexander',Antioch:'Paul, Barnabas',Ephesus:'Paul, John',Corinth:'Paul, Aquila, Priscilla',Athens:'Paul',Rome:'Paul, Nero',Patmos:'John',Malta:'Paul, Luke',Sinai:'Moses',Memphis:'Joseph, Jacob',Rameses:'Moses, Aaron',Kadesh:'Moses, the 12 spies',Hor:'Aaron',Nebo:'Moses',Jerusalem:'David, Solomon, Nehemiah, Jesus',Bethlehem:'Jesus, Mary, Joseph',Nazareth:'Jesus, Mary',Capernaum:'Jesus, Peter',Jericho:'Joshua, Rahab',Hebron:'David',Samaria:'Ahab, Jezebel',Carmel:'Elijah',Caesarea:'Peter, Cornelius',Shiloh:'Hannah, Samuel',Philippi:'Paul, Lydia',Nicaea:'Constantine',Lutterworth:'Wycliffe',Mainz:'Gutenberg',Wittenberg:'Luther',Vilvoorde:'Tyndale',Tranquebar:'Ziegenbalg',Guangzhou:'Morrison',Pittsburgh:'C. T. Russell',Tarsus:'Paul'};
const EV=[['Ur',-1945,'before 1943 B.C.E.','Abraham leaves Ur'],['Haran',-1943,'1943 B.C.E.','Abraham sets out for Canaan'],['Haran',-1781,'1781 B.C.E.','Jacob flees to Haran'],
 ['Memphis',-1737,'1737 B.C.E.','Joseph rules Egypt'],['Memphis',-1728,'1728 B.C.E.','Jacob’s family enters'],['Rameses',-1513.1,'Nisan 15, 1513 B.C.E.','Exodus begins'],['RedSea',-1513,'1513 B.C.E.','Red Sea parted'],['Sinai',-1512.9,'1513 B.C.E.','Law covenant'],
 ['Kadesh',-1512,'1512 B.C.E.','40 years decreed'],['Hor',-1474,'1474 B.C.E.','Aaron dies'],['Nebo',-1473.5,'1473 B.C.E.','Moses dies'],['Jericho',-1473,'1473 B.C.E.','Jericho falls'],['Shiloh',-1467,'c. 1467 B.C.E.','Tabernacle set up'],
 ['Hebron',-1077,'1077 B.C.E.','David king'],['Jerusalem',-1070,'1070 B.C.E.','David’s capital'],['Jerusalem',-1027,'1027 B.C.E.','Temple completed'],['Carmel',-926,'Ahab’s reign','Elijah vs. Baal'],['Nineveh',-844,'c. 844 B.C.E.','Jonah preaches'],
 ['Samaria',-740,'740 B.C.E.','Samaria falls'],['Nineveh',-632,'632 B.C.E.','Nineveh falls'],['Babylon',-617,'617 B.C.E.','Daniel taken'],['Jerusalem',-607,'607 B.C.E.','Destroyed'],['Babylon',-539,'539 B.C.E.','Falls to Cyrus'],['Jerusalem',-537,'537 B.C.E.','Jews return'],
 ['Susa',-493,'493–484 B.C.E.','Esther made queen'],['Jerusalem',-455,'455 B.C.E.','Walls rebuilt'],['Tyre',-332,'332 B.C.E.','Destroyed by Alexander'],['Bethlehem',-2,'2 B.C.E.','Jesus born'],['Nazareth',1,'year not stated','Jesus grows up'],['Capernaum',31,'30–32 C.E.','Jesus’ home base'],
 ['Jerusalem',33,'Nisan 14, 33 C.E.','Jesus dies, is raised'],['Jerusalem',33.4,'Sivan 6, 33 C.E.','Pentecost'],['Damascus',34,'c. 34 C.E.','Saul converted'],['Caesarea',36,'36 C.E.','Cornelius baptized'],['Antioch',47,'c. 47 C.E.','Paul’s tours begin'],
 ['Philippi',50,'c. 50 C.E.','First congregation in Europe'],['Athens',50.5,'c. 50 C.E.','Paul at the Areopagus'],['Corinth',51,'c. 50–52 C.E.','Paul stays 18 months'],['Ephesus',53,'c. 52–55 C.E.','Paul teaches'],['Malta',58.6,'c. 58 C.E.','Shipwreck'],
 ['Rome',60,'c. 59–61 C.E.','Paul under house arrest'],['Rome',64,'64 C.E.','Fire; persecution'],['Jerusalem',70,'70 C.E.','Destroyed'],['Patmos',96,'c. 96 C.E.','Revelation given'],['Nicaea',325,'325 C.E.','Council of Nicaea'],
 ['Toulouse',1229,'1229','Bible reading banned'],['Lutterworth',1382,'1382','Wycliffe Bible'],['Mainz',1455,'c. 1455','Gutenberg Bible'],['Wittenberg',1522,'1522','Luther’s New Testament'],['Vilvoorde',1536,'1536','Tyndale executed'],
 ['Tranquebar',1714,'1714','Tamil New Testament'],['Guangzhou',1823,'1823','Chinese Bible'],['Pittsburgh',1870,'1870','Bible class begins'],['Pittsburgh',1879,'1879','Watch Tower first issue'],['London',1900,'1900','First branch'],
 ['Brooklyn',1909,'1909–2016','World headquarters'],['Sandusky',1919,'1919, 1922','Cedar Point conventions'],['Magdeburg',1933,'1933–45','Ban in Germany'],['Warwick',2017,'2017–','World headquarters'],['Moscow',2017.3,'2017–','Ban in Russia']];
const ROUTES=[
 {k:'abr',c:'#8a5a2b',w:0.9,off:0,pts:['Ur','Haran','Carchemish','Damascus','Shechem','Bethel','Memphis','Bethel','Hebron'],name:'Abraham · Ur → Canaan',when:'c. 1943 B.C.E.',scr:'Ge 11:31–12:10; 13:18'},
 {k:'exo',c:'#16857f',w:0.9,off:0,pts:['Rameses','Succoth','RedSea','Marah','Sin','Rephidim','Sinai','Kadesh','Hor','Nebo','Jericho'],name:'Israel · Egypt → Canaan',when:'1513–1473 B.C.E.',scr:'Ex 12–Jos 3',note:'possible route (B3)'},
 {k:'jon',c:'#2f7fb5',w:0.8,off:0,d:'2 1',pts:['GathHepher','Joppa','JonahSea'],name:'Jonah · flees toward Tarshish',when:'c. 844 B.C.E.',scr:'Jon 1:3'},
 {k:'jon2',c:'#2f7fb5',w:0.7,off:0,d:'0.6 1.2',pts:['GathHepher','Nineveh'],name:'Jonah · sent to Nineveh',when:'c. 844 B.C.E.',scr:'Jon 3:3',note:'landing place not named; over 800 km'},
 {k:'exile',c:'#7f5539',w:0.8,off:-0.8,pts:['Jerusalem','Ramah','Riblah','Babylon'],name:'Exiles to Babylon',when:'607 B.C.E.',scr:'2Ki 25:6-11; Jer 40:1',note:'stops from the Bible; route not stated'},
 {k:'ret',c:'#2e8b57',w:0.8,off:0.8,pts:['Babylon','Mari','Carchemish','Hamath','Riblah','Damascus','Jerusalem'],name:'Return from Babylon',when:'537 B.C.E.',scr:'Ezr 1:3, 11',note:'one possible route (it-2 p. 332)'},
 {k:'ezra',c:'#b8860b',w:0.7,off:1.6,d:'2.2 0.9',pts:['Susa','Babylon','Mari','Carchemish','Hamath','Riblah','Damascus','Jerusalem'],name:'Ezra (468) · Nehemiah (455, from Susa)',when:'468 / 455 B.C.E.',scr:'Ezr 7:9; Ne 2:1-11',note:'possible route'},
 {k:'fam',c:'#d14d72',w:0.75,off:0,pts:['Bethlehem','Gaza','Pelusium','Gaza','Nazareth'],name:'Jesus’ family · to Egypt and back',when:'1 B.C.E. or 1 C.E.',scr:'Mt 2:13-23',note:'route not stated'},
 {k:'ruth',c:'#8a6d3b',w:0.75,off:0,d:'1.2 0.8',pts:['Dibon','Jericho','Bethlehem'],name:'Naomi and Ruth · Moab → Bethlehem',when:'days of the Judges',scr:'Ru 1:19, 22',note:'route not stated'},
 {k:'p1',c:'#e07a1f',w:0.75,off:-0.8,pts:['Antioch','Seleucia','Salamis','Paphos','Perga','PAntioch','Iconium','Lystra','Derbe','Lystra','Iconium','PAntioch','Perga','Attalia','Antioch'],name:'Paul · 1st journey',when:'c. 47–48 C.E.',scr:'Ac 13:4–14:26'},
 {k:'p2',c:'#c0392b',w:0.75,off:0,pts:['Antioch','Tarsus','Derbe','Lystra','Iconium','PAntioch','Troas','Samothrace','Neapolis','Philippi','Amphipolis','Apollonia','Thessalonica','Berea','Athens','Corinth','Cenchreae','Ephesus','Caesarea','Jerusalem','Antioch'],name:'Paul · 2nd journey',when:'c. 49–52 C.E.',scr:'Ac 15:36–18:22'},
 {k:'p3',c:'#8e44ad',w:0.75,off:0.8,pts:['Antioch','Galatia','Ephesus','Troas','Philippi','Corinth','Philippi','Troas','Assos','Mitylene','Chios','Samos','Miletus','Cos','Rhodes','Patara','Tyre','Ptolemais','Caesarea','Jerusalem'],name:'Paul · 3rd journey',when:'c. 52–56 C.E.',scr:'Ac 18:23–21:17'},
 {k:'rome',c:'#4d4d4d',w:0.75,off:1.6,d:'1.6 1',pts:['Caesarea','Sidon','Myra','Cnidus','Salmone','FairHavens','Cauda','Malta','Syracuse','Rhegium','Puteoli','Rome'],name:'Paul · to Rome',when:'c. 58–59 C.E.',scr:'Ac 27:1–28:16'}];
ROUTES.forEach(r=>r.km=Math.round(d3.geoLength({type:'LineString',coordinates:r.pts.map(k=>P[k])})*6371/10)*10);
const EXO=['Rameses','Succoth','RedSea','Marah','Sin','Rephidim','Sinai','Kadesh','Hor','Nebo'];
const ERA=y=>y<100?'b':y<1870?'c':'m',ERAC={b:'#a4532a',c:'#6a3d9a',m:'#1f6f8b'},ERAN={b:'Bible era',c:'Bible & church history',m:'Jehovah’s Witnesses'};
const sorted=EV.slice().sort((a,b)=>a[1]-b[1]);sorted.forEach((e,i)=>e.num=i+1);
const PLACES={};EV.forEach(e=>{(PLACES[e[0]]=PLACES[e[0]]||{k:e[0],evs:[]}).evs.push(e)});Object.values(PLACES).forEach(p=>p.evs.sort((a,b)=>a[1]-b[1]));
const nm=k=>NAME[k]||k;
const HALO={stroke:'#fbfaf5',stroke_width:0.8,paint_order:'stroke',stroke_linejoin:'round'};
// label placement
function Placer(b){this.b=b;this.boxes=[]}
Placer.prototype.ov=function(x,y,w,h){let a=0;for(const q of this.boxes){const ox=Math.min(x+w,q.x+q.w)-Math.max(x,q.x),oy=Math.min(y+h,q.y+q.h)-Math.max(y,q.y);if(ox>0&&oy>0)a+=ox*oy}return a};
Placer.prototype.inb=function(x,y,w,h){const b=this.b;return x>=b.x+1&&y>=b.y+1&&x+w<=b.x+b.w-1&&y+h<=b.y+b.h-1};
Placer.prototype.add=function(x,y,w,h){this.boxes.push({x,y,w,h})};
function lines2box(L){let w=0,h=0;L.forEach(l=>{const lw=(l.stamp?A0.tw(l.stamp,l.fs,1)+2.4:0)+A0.tw(l.t,l.fs,l.b);w=Math.max(w,lw);h+=l.fs*1.22});return{w:w+0.6,h:h+0.4}}
function placeLabel(s,pl,px,py,L,pref,optional){const {w,h}=lines2box(L);let best=null;
  const base=[[2.4,-h/2],[-2.4-w,-h/2],[-w/2,-h-2.2],[-w/2,2.2],[2.2,-h+0.8],[-2.2-w,-h+0.8],[2.2,-0.8],[-2.2-w,-0.8]];
  if(pref==='left')base.unshift(base.splice(1,1)[0]);
  outer:for(const dist of [0,5,10,16,23,31,40])for(const [dx,dy] of base){const sx=dx>0?dist:dx<-w/2?-dist:0,sy=Math.abs(dx+w/2)<1?(dy<0?-dist:dist):0,x=px+dx+sx,y=py+dy+sy;
    if(!pl.inb(x,y,w,h))continue;let o=pl.ov(x,y,w,h);if(dist>0&&o===0){const lf=x+w<=px+0.5,tx=lf?x+w:x,ty=Math.min(Math.max(py,y+1),y+h-1);for(let t=0.2;t<0.95;t+=0.1){const qx=px+(tx-px)*t,qy=py+(ty-py)*t;if(pl.boxes.some(q=>qx>q.x&&qx<q.x+q.w&&qy>q.y&&qy<q.y+q.h)){o=0.5;break}}}
    if(o===0){best={x,y,o,dist};break outer}if(!best||o<best.o)best={x,y,o,dist}}
  if(!best)best={x:px+2.4,y:py-h/2,o:1,dist:0};
  if(optional&&best.o>0)return -1;
  pl.add(best.x,best.y,w,h);const left=best.x+w<=px+0.5;
  if(best.dist>0){const tx=left?best.x+w:best.x,ty=Math.min(Math.max(py,best.y+1),best.y+h-1);s.line(px,py,tx,ty,'#8d8a83',0.25,{},'st')}
  let y=best.y;L.forEach(l=>{y+=l.fs*1.22;const anc=left?'end':'start';let x=left?best.x+w-0.3:best.x+0.3;
    if(l.stamp){const sw=A0.tw(l.stamp,l.fs,1)+1.6;const bx=left?x-A0.tw(l.t,l.fs,l.b)-sw-0.8:x;s.rect(bx,y-l.fs*0.95,sw,l.fs*1.15,l.sc||'#fff',{stroke:l.sb||C.g2,stroke_width:0.25,rx:0.5},'lab');s.text(bx+0.8,y-0.15,l.stamp,l.fs,{fill:l.stc||C.ink,font_weight:800},'lab');if(!left)x+=sw+0.8}
    s.text(x,y-0.15,l.t,l.fs,Object.assign({text_anchor:anc,fill:l.c||C.ink,font_weight:l.b?800:400,font_style:l.i?'italic':null},HALO),'lab')});
  return best.o}
// geography
let LAND={},clipN=0;
function land(s,proj,res,rect,o){const id='mc'+(clipN++),g=d3.geoPath(proj),[x,y,w,h]=rect;
  s.raw(`<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath>`,'bg');
  s.rect(x,y,w,h,o.sea,{},'bg');const d=g(LAND[res]);
  if(o.grat)s.path(g(d3.geoGraticule().step([10,10])()),o.grat,0.2,{clip_path:`url(#${id})`},'bg');
  if(o.water)[[3.6,0.18],[2.2,0.3],[1,0.5]].forEach(([w2,op])=>s.path(d,o.water,w2,{clip_path:`url(#${id})`,opacity:op,stroke_linejoin:'round'},'bg'));
  s.path(d,o.coast||C.g3,0.25,{fill:o.land,clip_path:`url(#${id})`},'bg');
  return id}
function inRect(p,r){return p&&p[0]>=r[0]+1&&p[0]<=r[0]+r[2]-1&&p[1]>=r[1]+1&&p[1]<=r[1]+r[3]-1}
function offPts(pts,d){if(!d)return pts;return pts.map((p,i)=>{const a=pts[Math.max(i-1,0)],b=pts[Math.min(i+1,pts.length-1)],dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy)||1;return[p[0]-dy/L*d,p[1]+dx/L*d]})}
function routes(s,proj,clip,num,scale){scale=scale||1;ROUTES.forEach(r=>{const pts=offPts(r.pts.map(k=>proj(P[k])),r.off*scale);
  s.path(A0.pd(pts),'#fff',r.w+0.8,{clip_path:`url(#${clip})`,stroke_linejoin:'round',opacity:0.7},'lines');
  s.path(A0.pd(pts),r.c,r.w,{stroke_dasharray:r.d,clip_path:`url(#${clip})`,stroke_linejoin:'round'},'lines');
  for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i],L=Math.hypot(b[0]-a[0],b[1]-a[1]);if(L<12)continue;const mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2,ux=(b[0]-a[0])/L,uy=(b[1]-a[1])/L;
    s.path(`M${A0.n(mx-ux*1.4-uy*1.1)} ${A0.n(my-uy*1.4+ux*1.1)}L${A0.n(mx)} ${A0.n(my)}L${A0.n(mx-ux*1.4+uy*1.1)} ${A0.n(my-uy*1.4-ux*1.1)}`,r.c,0.5,{clip_path:`url(#${clip})`},'lines')}});
  if(num)EXO.forEach((k,i)=>{const [x,y]=proj(P[k]);s.circ(x,y,1.5,'#fff',{stroke:C.exo,stroke_width:0.45,clip_path:`url(#${clip})`},'st');s.text(x,y+0.75,String(i+1),1.9,{text_anchor:'middle',fill:C.exo,font_weight:800,clip_path:`url(#${clip})`},'st')})}
function frame(s,rect,title,sub){const [x,y,w,h]=rect;s.rect(x,y,w,h,'none',{stroke:C.g2,stroke_width:0.4},'top');if(title){const tw=A0.tw(title,2.9,1)+3;s.rect(x,y,tw,4.6,'#fbfaf5',{},'top');s.text(x+1.5,y+3.4,title,2.9,{fill:C.ink,font_weight:800},'top')}}
function scaleBar(s,proj,x,y,lat,km,right){km=km||1000;const k=km/(111.32*Math.cos(lat*Math.PI/180)),a=proj([30,lat]),b=proj([30+k,lat]),w=b[0]-a[0];if(right)x-=w;
  s.rect(x,y,w/2,1.2,C.ink,{},'top');s.rect(x+w/2,y,w/2,1.2,'#fff',{stroke:C.ink,stroke_width:0.25},'top');s.text(x,y+4,'0',2.2,{fill:C.g1},'top');s.text(x+w,y+4,km.toLocaleString('en-US')+' km',2.2,{fill:C.g1,text_anchor:right?'end':'middle'},'top')}
function north(s,x,y){s.path(`M${x} ${y-4}L${x+1.6} ${y+1.5}L${x} ${y}L${x-1.6} ${y+1.5}Z`,C.ink,0.3,{fill:C.ink},'top');s.text(x,y-5,'N',2.4,{text_anchor:'middle',fill:C.ink,font_weight:800},'top')}
// edge callout for places outside a panel
function edge(s,pl,proj,rect,list,mk){const [x0,y0,w,h]=rect,cx=x0+w/2,cy=y0+h/2,groups={};
  list.forEach(k=>{const p=proj(P[k]);let dx=p[0]-cx,dy=p[1]-cy;const t=Math.min((w/2-5)/Math.abs(dx||1e-6),(h/2-5)/Math.abs(dy||1e-6));const ex=cx+dx*t,ey=cy+dy*t,key=Math.round(ex/30)+'_'+Math.round(ey/30);(groups[key]=groups[key]||{ex,ey,ang:Math.atan2(dy,dx),ks:[]}).ks.push(k)});
  Object.values(groups).forEach(g=>{const {ex,ey,ang}=g;s.path(`M${ex-Math.cos(ang)*4} ${ey-Math.sin(ang)*4}L${ex} ${ey}`,C.ink,0.5,{},'top');
    s.path(`M${ex} ${ey}L${ex-Math.cos(ang-0.5)*1.8} ${ey-Math.sin(ang-0.5)*1.8}M${ex} ${ey}L${ex-Math.cos(ang+0.5)*1.8} ${ey-Math.sin(ang+0.5)*1.8}`,C.ink,0.5,{},'top');pl.add(ex-2,ey-2,4,4);
    const L=[];g.ks.forEach(k=>L.push(...mk(k,true)));placeLabel(s,pl,ex-Math.cos(ang)*5,ey-Math.sin(ang)*5,L,Math.cos(ang)>0?'left':null)})}
// label builders
const mkStack=(k,far)=>{const p=PLACES[k];return[{t:nm(k)+(far?' →':''),fs:2.9,b:1},...p.evs.map(e=>({stamp:e[2],t:e[3],fs:2.4,sc:'#fff8e6',sb:'#b08a3c'}))]};
const mkPlain=(k,far)=>{const p=PLACES[k];return[{t:nm(k)+(far?' →':''),fs:2.9,b:1},...p.evs.map(e=>({t:`${e[2]} · ${e[3]}`,fs:2.4,c:C.g1}))]};
const mkNames=(k,far)=>{const p=PLACES[k],era=ERA(p.evs[0][1]),L=[{t:nm(k)+(far?' →':''),fs:3.1,b:1,c:ERAC[era]}];if(PEOPLE[k])L.push({t:PEOPLE[k],fs:2.65,i:1,c:C.ink});L.push({t:p.evs.map(e=>e[2].replace(/ B\.C\.E\.| C\.E\./g,'')).join(' · ')+(p.evs[0][1]<0?' B.C.E.':''),fs:2.3,c:C.g1});return L};
const mkNums=(k,far)=>{const p=PLACES[k];return[{t:nm(k)+(far?' →':''),fs:2.7,b:1},{t:p.evs.map(e=>e.num).join(' · '),fs:2.5,b:1,c:C.g1}]};
function pin(s,proj,k,style,r){const [x,y]=proj(P[k]),p=PLACES[k],era=ERA(p.evs[0][1]);
  if(style==='era'){s.circ(x,y,1.6,ERAC[era],{stroke:'#fff',stroke_width:0.5},'st')}
  else if(style==='num'){s.circ(x,y,1.2,ERAC[era],{stroke:'#fff',stroke_width:0.4},'st')}
  else s.circ(x,y,1.15,'#7a2e1f',{stroke:'#fff',stroke_width:0.45},'st');return[x,y]}
function drawPanelPlaces(s,pl,proj,rect,keys,mk,pinStyle,exclude){const pts=[];keys.forEach(k=>{if(exclude&&exclude(k))return;const p=proj(P[k]);if(!inRect(p,rect))return;pts.push([k,pin(s,proj,k,pinStyle)])});
  pts.forEach(([k,[x,y]])=>pl.add(x-1.6,y-1.6,3.2,3.2));
  let ov=0;pts.sort((a,b)=>PLACES[b[0]].evs.length-PLACES[a[0]].evs.length).forEach(([k,[x,y]])=>{ov+=placeLabel(s,pl,x,y,mk(k))>0?1:0});return {n:pts.length,ov}}
const KEYS=Object.keys(PLACES);
const LANDK=['Jerusalem','Bethlehem','Jericho','Hebron','Nazareth','Capernaum','Samaria','Carmel','Caesarea','Shiloh','Nebo'];
const inLand=k=>LANDK.includes(k);
function keyRow(s,x,y,items){let cx=x;items.forEach(([draw,t])=>{draw(cx,y);s.text(cx+9,y+1,t,2.4,{fill:C.ink,font_weight:700},'top');cx+=11+A0.tw(t,2.4,1)})}
const routeKey=[[(x,y,s)=>0,'']];
function routeLegend(s,x,y){keyRow(s,x,y,ROUTES.filter(r=>r.k!=='jon2').map(r=>[(cx,cy)=>s.line(cx,cy,cx+7,cy,r.c,1,{stroke_dasharray:r.d},'top'),r.name.replace('Paul · ','Paul ')]))}
// ---------- styles
const STY={};
STY.a={name:'Classic atlas',desc:'Bible lands at a readable scale with every journey as its own line (direction arrows, dates, scripture, distance). The Land is magnified in a strip, and far places (Europe, USA, India, China) sit on a small world map with a numbered list.',
 draw(s,W,H){const st={sea:'#d4e5ec',land:'#efe4c8',water:'#7fb0c8',coast:'#8f7f5e',grat:'#c3d5dc'};const R1=[0,6,446,H-6],RL=[452,6,88,H-6],RW=[546,6,94,46];
  const p1=d3.geoMercator().fitExtent([[R1[0],R1[1]],[R1[0]+R1[2],R1[1]+R1[3]]],{type:'MultiPoint',coordinates:[[9,26.6],[50.5,42.4]]});
  const c1=land(s,p1,'50',R1,st);
  [['EGYPT',[30.2,27.4]],['CANAAN',[36.2,31.2]],['MESOPOTAMIA',[42.6,34.3]],['ASIA MINOR',[32.5,38.9]],['MACEDONIA',[22.3,41.4]],['ACHAIA',[21.6,37.4]],['ITALY',[15.6,40.3]],['ARABIA',[42,28.4]],['PERSIA',[49.3,33.6]],['ASSYRIA',[44.2,36.9]],['CYPRUS',[33.2,35.05]],['CRETE',[24.9,35.25]]].forEach(([t,c])=>{const p=p1(c);if(inRect(p,R1))s.text(p[0],p[1],t,t.length>6?3.2:2.8,{text_anchor:'middle',fill:'#a3977c',font_weight:700,letter_spacing:0.9},'bg')});
  [['THE GREAT SEA',[19.5,34.4]],['RED SEA',[36.2,27.3]],['PERSIAN GULF',[49.4,28.2]],['BLACK SEA',[34.5,42.15]]].forEach(([t,c])=>{const p=p1(c);if(inRect(p,R1))s.text(p[0],p[1],t,3,{text_anchor:'middle',fill:'#5f8ea3',font_style:'italic',letter_spacing:0.8},'bg')});
  routes(s,p1,c1,false);const pl=new A0.__P({x:R1[0],y:R1[1]+5,w:R1[2],h:R1[3]-5});
  const LX=[[34.0,30.15],[36.3,33.4]],inL=k=>P[k][0]>=LX[0][0]&&P[k][0]<=LX[1][0]&&P[k][1]>=LX[0][1]&&P[k][1]<=LX[1][1];
  const b0=p1([LX[0][0],LX[1][1]]),b1=p1([LX[1][0],LX[0][1]]);s.rect(b0[0],b0[1],b1[0]-b0[0],b1[1]-b0[1],'rgba(255,255,255,0.35)',{stroke:C.ink,stroke_width:0.4},'top');pl.add(b0[0],b0[1],b1[0]-b0[0],b1[1]-b0[1]);
  s.line(b1[0],b0[1],RL[0],RL[1],C.g2,0.3,{},'top');s.line(b1[0],b1[1],RL[0],RL[1]+RL[3],C.g2,0.3,{},'top');
  const st1=drawPanelPlaces(s,pl,p1,R1,KEYS,mkStack,'dot',inL);
  ['Tarsus','Lystra','Derbe','Iconium','PAntioch','Troas','Thessalonica','Berea','Miletus','Puteoli','Syracuse','Perga','Salamis','Paphos','Neapolis','Rhodes','Sidon','Myra'].forEach(k=>{const p=p1(P[k]);if(!inRect(p,R1)||inL(k))return;s.circ(p[0],p[1],0.7,C.g1,{},'st');placeLabel(s,pl,p[0],p[1],[{t:nm(k),fs:2.3,i:1,c:C.g1}],null,true)});
  const p2=d3.geoMercator().fitExtent([[RL[0],RL[1]+6],[RL[0]+RL[2],RL[1]+RL[3]]],{type:'MultiPoint',coordinates:LX});
  const c2=land(s,p2,'50',RL,st);routes(s,p2,c2,true,0.4);const pl2=new A0.__P({x:RL[0],y:RL[1]+6,w:RL[2],h:RL[3]-6});const st2=drawPanelPlaces(s,pl2,p2,RL,KEYS.filter(inL),mkPlain,'dot');
  ['Joppa','GathHepher','Ptolemais'].forEach(k=>{const p=p2(P[k]);s.circ(p[0],p[1],0.7,C.g1,{},'st');placeLabel(s,pl2,p[0],p[1],[{t:nm(k),fs:2.3,i:1,c:C.g1}],null,true)});
  const pw=d3.geoNaturalEarth1().fitExtent([[RW[0],RW[1]+5],[RW[0]+RW[2],RW[1]+RW[3]]],{type:'MultiPoint',coordinates:[[-128,-42],[148,70]]});land(s,pw,'110',RW,st);
  const far=KEYS.filter(k=>!inRect(p1(P[k]),R1)).sort((a,b)=>PLACES[a].evs[0][1]-PLACES[b].evs[0][1]);
  const bw=pw([P.Ur[0]-37,42.4]),bw2=pw([50.5,26.6]);s.rect(bw[0],bw[1],bw2[0]-bw[0],bw2[1]-bw[1],'none',{stroke:C.ink,stroke_width:0.35},'top');
  far.forEach((k,i)=>{const p=pw(P[k]);s.circ(p[0],p[1],0.9,'#7a2e1f',{stroke:'#fff',stroke_width:0.3},'st')});
  let y=RW[1]+RW[3]+5;s.text(RW[0],y,'BEYOND THE MAP',2.8,{fill:C.ink,font_weight:800},'top');y+=1;
  far.forEach((k,i)=>{y+=3.05;const t=PLACES[k].evs.map(e=>e[2].replace(/ C\.E\./,'')+' '+e[3]).join('; ');s.text(RW[0],y,nm(k),2.3,{fill:C.ink,font_weight:800},'top');s.text(RW[0]+A0.tw(nm(k),2.3,1)+1.2,y,t.slice(0,Math.floor((RW[2]-A0.tw(nm(k),2.3,1)-1.2)/1.17)),2.3,{fill:C.g1},'top')});
  y+=5;s.text(RW[0],y,'JOURNEYS',2.8,{fill:C.ink,font_weight:800},'top');
  ROUTES.forEach(r=>{y+=5.4;s.line(RW[0],y-0.9,RW[0]+5,y-0.9,r.c,1.1,{stroke_dasharray:r.d},'top');s.text(RW[0]+6.5,y-0.2,r.name,2.3,{fill:C.ink,font_weight:800},'top');s.text(RW[0]+6.5,y+2.4,[r.when,r.scr,r.km&&!r.note?'≈ '+r.km.toLocaleString('en-IN')+' km':'',r.note].filter(Boolean).join(' · '),2.1,{fill:C.g1},'top')});
  frame(s,R1,'ONE MAP · BIBLE LANDS TO THE WORLD');frame(s,RL,'THE LAND');frame(s,RW,'THE WORLD');scaleBar(s,p1,R1[0]+6,R1[1]+R1[3]-8,35);north(s,R1[0]+R1[2]-8,R1[1]+12);
  return st1.ov+st2.ov}};
STY.b={name:'Story map',desc:'Every event gets a number in time order. On the map the pins show only their numbers; the strip along the bottom tells the story 1 → 60 with dates. Exodus and Paul routes are numbered too.',
 draw(s,W,H){const st={sea:'#e3ebec',land:'#f1ede3',coast:'#a9a395'};const SH=40,R1=[0,6,W,H-6-SH-2];
  const p1=d3.geoMercator().fitExtent([[R1[0],R1[1]],[R1[0]+R1[2],R1[1]+R1[3]]],{type:'MultiPoint',coordinates:[[6,26.5],[52,43]]});
  const c1=land(s,p1,'50',R1,st);routes(s,p1,c1,true);const pl=new A0.__P({x:R1[0],y:R1[1],w:R1[2],h:R1[3]});
  const RI=[4,R1[1]+R1[3]-72,92,68];pl.add(RI[0],RI[1],RI[2],RI[3]);
  const st1=drawPanelPlaces(s,pl,p1,R1,KEYS,mkNums,'num',inLand);edge(s,pl,p1,R1,KEYS.filter(k=>!inRect(p1(P[k]),R1)),mkNums);
  const p2=d3.geoMercator().fitExtent([[RI[0],RI[1]+5],[RI[0]+RI[2],RI[1]+RI[3]]],{type:'MultiPoint',coordinates:[[34.4,30.4],[36.2,33.1]]});
  s.rect(RI[0]-1,RI[1]-1,RI[2]+2,RI[3]+2,'#fff',{},'bg');const c2=land(s,p2,'50',RI,st);routes(s,p2,c2,false);const pl2=new A0.__P({x:RI[0],y:RI[1]+5,w:RI[2],h:RI[3]-5});const st2=drawPanelPlaces(s,pl2,p2,RI,KEYS.filter(inLand),mkNums,'num');
  const [lx,ly2]=p1(P.Jerusalem);s.line(lx,ly2,RI[0]+RI[2],RI[1]+20,C.g2,0.25,{stroke_dasharray:'1 0.8'},'top');
  frame(s,R1,'ONE MAP · THE STORY IN 60 EVENTS');frame(s,RI,'THE LAND');north(s,R1[2]-8,R1[1]+12);routeLegend(s,120,R1[1]+R1[3]-4);
  const sy=H-SH;s.rect(0,sy,W,SH,'#fbfaf5',{stroke:C.g4,stroke_width:0.4},'bg');const rows=4,cols=Math.ceil(sorted.length/rows),cw=W/cols;
  sorted.forEach((e,i)=>{const c=Math.floor(i/rows),r=i%rows,x=c*cw+2,y=sy+4+r*9;const era=ERA(e[1]);s.circ(x+2,y+1.6,2,ERAC[era],{},'top');s.text(x+2,y+2.5,String(e.num),2.3,{text_anchor:'middle',fill:'#fff',font_weight:800},'top');
    s.text(x+5,y+1.2,e[2],2.3,{fill:C.ink,font_weight:800},'top');s.text(x+5,y+4.4,`${e[3]} · ${nm(e[0])}`.slice(0,Math.floor((cw-6)/1.18)),2.3,{fill:C.g1},'top')});
  for(let c=1;c<cols;c++)s.line(c*cw,sy+2,c*cw,H-2,C.g5,0.3,{},'top');
  return st1.ov+st2.ov}};
STY.c={name:'Era-colored names',desc:'Pins and place names are colored by era. Each label leads with the people who lived the events there; dates sit in one compact line. The Land is shown in a round lens over the desert.',
 draw(s,W,H){const st={sea:'#e6ecee',land:'#f3f0e8',coast:'#b3ad9f'};const R1=[0,6,W,H-6];
  const p1=d3.geoMercator().fitExtent([[R1[0],R1[1]],[R1[0]+R1[2],R1[1]+R1[3]]],{type:'MultiPoint',coordinates:[[-6,22],[60,54.5]]});
  const c1=land(s,p1,'50',R1,st);routes(s,p1,c1,false);const pl=new A0.__P({x:R1[0],y:R1[1],w:R1[2],h:R1[3]});
  const lc=p1([19,26]),LR=40;pl.add(lc[0]-LR,lc[1]-LR,2*LR,2*LR);
  const st1=drawPanelPlaces(s,pl,p1,R1,KEYS,mkNames,'era',inLand);edge(s,pl,p1,R1,KEYS.filter(k=>!inRect(p1(P[k]),R1)),mkNames);
  const id='lens'+(clipN++);s.raw(`<clipPath id="${id}"><circle cx="${A0.n(lc[0])}" cy="${A0.n(lc[1])}" r="${LR}"/></clipPath>`,'top');
  const p2=d3.geoMercator().fitExtent([[lc[0]-LR*0.7,lc[1]-LR*0.95],[lc[0]+LR*0.7,lc[1]+LR*0.95]],{type:'MultiPoint',coordinates:[[34.5,30.9],[36.0,33.0]]});
  const s2=new A0.SVG();s2.circ(lc[0],lc[1],LR,st.sea,{},'bg');s2.path(d3.geoPath(p2)(LAND['50']),st.coast,0.3,{fill:st.land},'bg');
  const pl2=new A0.__P({x:lc[0]-LR*0.75,y:lc[1]-LR*0.8,w:LR*1.5,h:LR*1.6});LANDK.forEach(k=>{const p=p2(P[k]);s2.circ(p[0],p[1],1.5,ERAC[ERA(PLACES[k].evs[0][1])],{stroke:'#fff',stroke_width:0.4},'st');pl2.add(p[0]-1.5,p[1]-1.5,3,3)});
  let ov=0;LANDK.slice().sort((a,b)=>PLACES[b].evs.length-PLACES[a].evs.length).forEach(k=>{const p=p2(P[k]);ov+=placeLabel(s2,pl2,p[0],p[1],[{t:nm(k),fs:2.6,b:1,c:ERAC[ERA(PLACES[k].evs[0][1])]},...(PEOPLE[k]?[{t:PEOPLE[k],fs:2.3,i:1}]:[]),{t:PLACES[k].evs.map(e=>e[2].replace(/ B\.C\.E\.| C\.E\./g,'')).join(' · '),fs:2.2,c:C.g1}])>0?1:0});
  s.raw(`<g clip-path="url(#${id})">${s2.out()}</g>`,'top');s.circ(lc[0],lc[1],LR,'none',{stroke:C.ink,stroke_width:0.6},'top');s.text(lc[0],lc[1]-LR+5,'THE LAND',3,{text_anchor:'middle',fill:C.ink,font_weight:800},'top');
  const [jx,jy]=p1(P.Jerusalem);s.circ(jx,jy,3,'none',{stroke:C.ink,stroke_width:0.4},'top');s.line(jx-2,jy+2.2,lc[0]+LR*0.7,lc[1]-LR*0.7,C.ink,0.3,{},'top');
  frame(s,R1,'ONE MAP · PEOPLE AND PLACES');let kx=W-150;Object.entries(ERAN).forEach(([e,t])=>{s.circ(kx,H-5,1.6,ERAC[e],{},'top');s.text(kx+2.5,H-4.2,t,2.5,{fill:ERAC[e],font_weight:800},'top');kx+=A0.tw(t,2.5,1)+9});routeLegend(s,6,H-5);
  return st1.ov+ov}};
STY.d={name:'World + magnified Bible lands',desc:'A small world map shows how far the good news reached, grouped by region with a list. A large magnified window carries the Bible lands and all the journeys, with the Land enlarged in an inset.',
 draw(s,W,H){const st={sea:'#dfe8ec',land:'#efeadc',coast:'#a9a395',grat:'#c9d6dc'};const RW=[0,6,232,90],RB=[242,6,W-242,H-6];
  const pw=d3.geoNaturalEarth1().fitExtent([[RW[0],RW[1]+6],[RW[0]+RW[2],RW[1]+RW[3]]],{type:'MultiPoint',coordinates:[[-125,-5],[140,62]]});land(s,pw,'110',RW,st);
  const ext=[[11,26.4],[50,43.6]],pb=d3.geoMercator().fitExtent([[RB[0],RB[1]],[RB[0]+RB[2],RB[1]+RB[3]]],{type:'MultiPoint',coordinates:ext});
  const inB=k=>inRect(pb(P[k]),RB);
  const b0=pw([ext[0][0],ext[1][1]]),b1=pw([ext[1][0],ext[0][1]]);s.rect(b0[0],b0[1],b1[0]-b0[0],b1[1]-b0[1],'rgba(201,149,18,0.15)',{stroke:C.gold,stroke_width:0.6},'top');
  s.line(b1[0],b0[1],RB[0],RB[1],C.gold,0.4,{},'top');s.line(b1[0],b1[1],RB[0],RB[1]+RB[3],C.gold,0.4,{},'top');
  const far=KEYS.filter(k=>!inB(k)),reg=k=>P[k][0]<-30?'USA':P[k][0]>100?'CHINA':P[k][0]>70?'INDIA':'EUROPE',groups={};far.forEach(k=>(groups[reg(k)]=groups[reg(k)]||[]).push(k));
  Object.entries(groups).forEach(([g,ks])=>{const pts=ks.map(k=>pw(P[k]));pts.forEach(p=>s.circ(p[0],p[1],0.9,'#7a2e1f',{stroke:'#fff',stroke_width:0.3},'st'));
    const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]),x0=Math.min(...xs)-2.5,y0=Math.min(...ys)-2.5,x1=Math.max(...xs)+2.5,y1=Math.max(...ys)+2.5;s.rect(x0,y0,x1-x0,y1-y0,'none',{stroke:C.ink,stroke_width:0.3,rx:1},'top');
    s.text(g==='EUROPE'?x0-1:x1+1,y0+2.2,g,2.4,Object.assign({text_anchor:g==='EUROPE'?'end':'start',fill:C.ink,font_weight:800},HALO),'top')});
  let y=RW[1]+RW[3]+5;s.text(0,y,'BEYOND THE BIBLE LANDS',2.8,{fill:C.ink,font_weight:800},'top');
  ['USA','EUROPE','INDIA','CHINA'].forEach(g=>{if(!groups[g])return;y+=3.4;s.text(0,y,g,2.3,{fill:'#7a2e1f',font_weight:800},'top');
    groups[g].sort((a,b)=>PLACES[a].evs[0][1]-PLACES[b].evs[0][1]).forEach(k=>{y+=2.95;const t=PLACES[k].evs.map(e=>e[2].replace(/ C\.E\./,'')+' '+e[3]).join('; '),nw=A0.tw(nm(k),2.2,1);s.text(2,y,nm(k),2.2,{fill:C.ink,font_weight:800},'top');s.text(3.2+nw,y,t.slice(0,Math.floor((110-nw)/1.13)),2.2,{fill:C.g1},'top')})});
  let jy=RW[1]+RW[3]+5;const jx=120;s.text(jx,jy,'JOURNEYS',2.8,{fill:C.ink,font_weight:800},'top');
  ROUTES.forEach(r=>{jy+=5.6;s.line(jx,jy-0.9,jx+5,jy-0.9,r.c,1.1,{stroke_dasharray:r.d},'top');s.text(jx+6.5,jy-0.2,r.name,2.3,{fill:C.ink,font_weight:800},'top');s.text(jx+6.5,jy+2.4,[r.when,r.scr,r.km&&!r.note?'≈ '+r.km.toLocaleString('en-IN')+' km':'',r.note].filter(Boolean).join(' · ').slice(0,92),2.2,{fill:C.g1},'top')});
  const cb=land(s,pb,'50',RB,st);
  const RGN=[];[['EGYPT',[30.2,27.4]],['MESOPOTAMIA',[42.6,34.3]],['ASIA MINOR',[32.5,38.9]],['MACEDONIA',[22.3,41.4]],['ACHAIA',[21.6,37.4]],['ITALY',[15.6,40.6]],['ARABIA',[42,28.4]],['PERSIA',[48.6,33.6]],['ASSYRIA',[44.2,36.9]],['CRETE',[24.9,35.25]]].forEach(([t,c])=>{const p=pb(c);if(inRect(p,RB)){s.text(p[0],p[1],t,3.2,{text_anchor:'middle',fill:'#a3977c',font_weight:700,letter_spacing:0.9},'bg');const w=A0.tw(t,3.2,1)+t.length*0.9;RGN.push([p[0]-w/2,p[1]-2.8,w,3.4])}});
  [['THE GREAT SEA',[19.5,34.2]],['RED SEA',[36.3,27.3]],['PERSIAN GULF',[49.3,28.3]],['BLACK SEA',[34.5,42.4]]].forEach(([t,c])=>{const p=pb(c);if(inRect(p,RB)){s.text(p[0],p[1],t,3,{text_anchor:'middle',fill:'#5f8ea3',font_style:'italic',letter_spacing:0.8},'bg');const w=A0.tw(t,3,0)+t.length*0.8;RGN.push([p[0]-w/2,p[1]-2.6,w,3.2])}});
  routes(s,pb,cb,false);const plb=new A0.__P({x:RB[0],y:RB[1]+5,w:RB[2],h:RB[3]-5});RGN.forEach(b=>plb.add(...b));plb.add(RB[0]+RB[2]-40,RB[1]+RB[3]-10,40,10);plb.add(RB[0]+RB[2]-14,RB[1]+5,14,12);
  const LX=[[34.0,30.15],[36.3,33.4]],inL=k=>P[k][0]>=LX[0][0]&&P[k][0]<=LX[1][0]&&P[k][1]>=LX[0][1]&&P[k][1]<=LX[1][1];
  const RI=[RB[0]+3,RB[1]+RB[3]-108,128,105];plb.add(RI[0]-1,RI[1]-1,RI[2]+2,RI[3]+2);
  const lb0=pb([LX[0][0],LX[1][1]]),lb1=pb([LX[1][0],LX[0][1]]);s.rect(lb0[0],lb0[1],lb1[0]-lb0[0],lb1[1]-lb0[1],'none',{stroke:C.ink,stroke_width:0.4},'top');plb.add(lb0[0],lb0[1],lb1[0]-lb0[0],lb1[1]-lb0[1]);
  s.line(lb0[0],lb1[1],RI[0]+RI[2],RI[1],C.g2,0.3,{stroke_dasharray:'1 0.8'},'top');
  const stb=drawPanelPlaces(s,plb,pb,RB,KEYS.filter(k=>inB(k)&&!inL(k)),mkPlain,'dot');
  ['Tarsus','Lystra','Derbe','Iconium','PAntioch','Troas','Thessalonica','Berea','Miletus','Puteoli','Syracuse','Perga','Salamis','Paphos','Rhodes','Sidon','Myra','Riblah','Carchemish','Hamath','Mari'].forEach(k=>{const p=pb(P[k]);if(!inRect(p,RB)||inL(k))return;s.circ(p[0],p[1],0.7,C.g1,{},'st');placeLabel(s,plb,p[0],p[1],[{t:nm(k),fs:2.3,i:1,c:C.g1}],null,true)});
  s.rect(RI[0]-1,RI[1]-1,RI[2]+2,RI[3]+2,'#fff',{},'top');const s2=new A0.SVG();
  const p2=d3.geoMercator().fitExtent([[RI[0],RI[1]+5],[RI[0]+RI[2],RI[1]+RI[3]]],{type:'MultiPoint',coordinates:LX});const c2=land(s2,p2,'50',RI,st);routes(s2,p2,c2,false,0.4);
  const pl2=new A0.__P({x:RI[0],y:RI[1]+5,w:RI[2],h:RI[3]-5});const st2=drawPanelPlaces(s2,pl2,p2,RI,KEYS.filter(inL),mkPlain,'dot');frame(s2,RI,'THE LAND');s.raw(s2.out(),'top');
  frame(s,RW,'THE GOOD NEWS REACHES THE EARTH');frame(s,RB,'THE BIBLE LANDS · magnified');scaleBar(s,pb,RB[0]+RB[2]-6,RB[1]+RB[3]-8,35,500,true);north(s,RB[0]+RB[2]-8,RB[1]+12);
  return stb.ov+st2.ov}};
A0.__P=Placer;
A0.MAPSTY=STY;
A0.setLand=(l50,l110)=>{LAND['50']=topojson.feature(l50,l50.objects.land);LAND['110']=topojson.feature(l110,l110.objects.land)};
A0.drawMap=(s,style,x0,y0,W,H)=>{const s2=new A0.SVG();const ov=STY[style].draw(s2,W,H);s.raw(`<g transform="translate(${x0} ${y0})">${s2.out()}</g>`,'top');return ov};
A0.MAPINFO={places:KEYS.length,events:EV.length};
})();
