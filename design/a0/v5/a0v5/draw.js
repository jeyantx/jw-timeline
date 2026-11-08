(function(){
const {C,T,ROWS,RY,XL,XR,X,ly,O,D}=A0;
const pd=A0.pd,tr=A0.track;
A0.POW=[['EGYPT',-1728,-740,null],['ASSYRIA',-740,-607,null],['BABYLON',-607,-539,'au'],['MEDO-PERSIA',-539,-331,'ag'],['GREECE',-331,-30,'cu'],['ROME',-30,1914,'fe'],['ANGLO-AMERICA',1914,2030,'clay']];
const eraOf=t=>t<100?C.bible:t<1869.5?C.church:t<=2026?C.modern:C.future;
A0.glyph=(s,x,y,g,big,l='st')=>{const r=big?1.9:1.4,w=big?0.6:0.45;
  if(g===1)s.circ(x,y,r,C.paper,{stroke:C.ink,stroke_width:w},l);
  else if(g===2){s.circ(x,y,r,C.paper,{stroke:C.ink,stroke_width:w},l);s.path(`M${x} ${y-r}A${r} ${r} 0 0 0 ${x} ${y+r}Z`,'none',0,{fill:C.ink},l)}
  else if(g===3){s.line(x-r*2,y,x+r*2,y,C.ink,0.5,{},l);s.circ(x,y,r*0.75,C.ink,{},l)}
  else if(g===4)s.circ(x,y,r,C.paper,{stroke:C.ink,stroke_width:w,stroke_dasharray:'0.7 0.5'},l);
  else s.circ(x,y,r,C.ink,{},l)};
// ---------- beds, loops, swell, breaks
A0.drawBeds=s=>{
  for(let r=0;r<4;r++){const R=ROWS[r],cuts=[R.t0,...[100,1869.5,2026].filter(c=>c>R.t0&&c<R.t1),R.t1];
    for(let i=0;i<cuts.length-1;i++){const a=X(r,cuts[i]),b=X(r,cuts[i+1]);s.rect(Math.min(a,b),RY[r]-21,Math.abs(b-a),42,eraOf((cuts[i]+cuts[i+1])/2),{},'bed')}
    R.map.slice(1,-1).forEach(([t,x])=>{[-1,1].forEach(sd=>{const y=RY[r]+sd*22.6;s.line(x-1.6,y+1.2,x-0.2,y-1.2,C.ink,0.4,{},'bed');s.line(x+0.2,y+1.2,x+1.6,y-1.2,C.ink,0.4,{},'bed')})})}
  for(let r=0;r<3;r++)s.path(A0.loopPath(r,0),eraOf(ROWS[r].t1),42,{},'bed');
  s.rect(205,RY[3]-21,95,42,C.future,{stroke:C.g3,stroke_width:0.4,stroke_dasharray:'1.5 1'},'bed');
  s.rect(215,RY[2]-21,425,42,'#d3cec1',{},'bed');
  // day strip numbers + Passover marks (in the scroll strip of row 3)
  for(let d=8;d<=16;d++){const x0=A0.X(2,33.235+(d-8)/9*0.025),x1=A0.X(2,33.235+(d-7)/9*0.025);s.line(x1,RY[2]+17,x1,RY[2]+21,C.g2,0.3,{},'bed');s.text((x0+x1)/2,RY[2]+20.2,String(d),2.65,{text_anchor:'middle',fill:C.g1,font_weight:700},'bed')}
  [[30.25,'PASSOVER 30'],[31.25,'PASSOVER 31'],[32.25,'PASSOVER 32']].forEach(([t,l])=>{const x=X(2,t);s.line(x,RY[2]-21,x,RY[2]+21,C.ink,0.35,{stroke_dasharray:'1 0.8'},'bed');s.text(x+1,RY[2]+20.2,l,2.65,{fill:C.g1,font_weight:700},'bed')});
  s.text(X(2,33.235)+1,RY[2]+16,'NISAN',2.4,{fill:C.g2,font_weight:700},'bed');
};
// ---------- series lines
A0.drawLines=s=>{
  const L=(t0,t1,o,col,w,ex)=>s.path(pd(tr(t0,t1,o)),col,w,Object.assign({stroke_linecap:'butt'},ex||{}),'lines');
  L(-4026,2030,O.h,C.ink,0.8);
  A0.POW.forEach(([nm,a,b,m])=>{if(m)L(a,b,O.r,C[m],2.6);L(a,b,O.r,C.red,0.9);const p=A0.pos(a,O.r);s.line(p[0]-p[2]*1.8,p[1]-p[3]*1.8,p[0]+p[2]*1.8,p[1]+p[3]*1.8,C.red,0.6,{},'lines')});
  L(-323,272,O.n+1,C.blueN,1);L(-323,272,O.n-1,C.blueS,1);
  L(272,1871,O.n+1,C.blueN,0.5,{stroke_dasharray:'0.6 1.6'});L(272,1871,O.n-1,C.blueS,0.5,{stroke_dasharray:'0.6 1.6'});
  L(1871,2030,O.n+1,C.blueN,1);L(1871,2030,O.n-1,C.blueS,1);
  L(-4026,33.26,O.c,C.sepia,0.6,{stroke_dasharray:'2 1.2'});
  L(33.4,100,O.w,C.wheat,1.3);L(100,1870,O.w,C.wheat,0.7,{stroke_dasharray:'0.8 1.2'});L(1870,1919.2,O.w,C.wheat,1.7);
  L(33.4,100,O.wd,C.weeds,0.5);L(100,2027.2,O.wd,C.weeds,1.6);
  for(let r=2;r<4;r++){const a=Math.max(100,ROWS[r].t0),b=Math.min(2027.2,ROWS[r].t1),x0=Math.min(X(r,a),X(r,b)),x1=Math.max(X(r,a),X(r,b)),y=ly(r,O.wd),dy=-ROWS[r].dir*1.6;
    for(let x=x0+1;x<x1;x+=2.6)s.line(x,y,x+1,y+dy,C.weeds,0.45,{},'lines')}
  const wx=X(3,1919.2);s.path(`M${wx} ${ly(3,O.w)}C${wx-3} ${ly(3,O.w)} ${wx-3} ${ly(3,O.g)} ${wx-7} ${ly(3,O.g)}`,C.wheat,1.7,{},'lines');
  L(-4026,2030,O.g,C.gold,2.2);
  // rulers (violet): seven times, 70 weeks, 70 years, day prophecies
  const tOf=(st,nY)=>{let t=st+nY;if(st<0&&t>=0)t+=1;return t};
  const tag=(t,o,txt)=>{const [x,y]=A0.pos(t,o),w=A0.tw(txt,2.3,1)+1.6;s.rect(x-w/2,y-1.5,w,3,C.paper,{stroke:C.violet,stroke_width:0.3,rx:1.5},'lines');s.text(x,y+0.85,txt,2.3,{text_anchor:'middle',fill:C.violet,font_weight:800},'lines')};
  const ruler=(st,len,o,step,major,tags)=>{const t1=tOf(st,len);L(st,t1,o,C.violet,1.1);
    for(let k=0;k<=len;k+=step){const t=tOf(st,k),p=A0.pos(t,o),h=k%major===0?1.8:0.9;s.line(p[0]-p[2]*h,p[1]-p[3]*h,p[0]+p[2]*h,p[1]+p[3]*h,C.violet,0.35,{},'lines')}
    tags.forEach(([k,txt])=>tag(tOf(st,k),o,txt))};
  ruler(-607,2520,O.v,100,500,[[500,'500 YRS'],[1000,'1,000'],[1500,'1,500'],[2000,'2,000'],[2520,'2,520 · SEVEN TIMES']]);
  ruler(-455,490,O.v2,7,49,[[49,'7 WKS'],[483,'69 WKS'],[490,'70 WKS']]);
  ruler(-607,70,O.v2,10,70,[[35,'70 YEARS']]);
  [[1914.95,1918.45,'1,260 D'],[1919.4,1922.7,'1,290 D'],[1922.7,1926.4,'1,335 D'],[1938.45,1944.8,'2,300 D']].forEach(([a,b,t])=>{L(a,b,O.v2,C.violet,1.1);[a,b].forEach(z=>{const x=X(3,z),y=ly(3,O.v2);s.line(x,y-1.8,x,y+1.8,C.violet,0.4,{},'lines')});tag((a+b)/2,O.v2,t)});
};
// ---------- structural bars: lives, kings, prophets, spans, books
A0.drawStructure=s=>{
  const bar=(x0,x1,y,h,fill,txt,o={})=>{const a=Math.min(x0,x1),w=Math.max(0.6,Math.abs(x1-x0));s.rect(a,y,w,h,fill,Object.assign({rx:0.6},o.r||{}),'bars');
    if(txt){const tw=A0.tw(txt,o.fs||2.65,1);if(tw+1.4<w)s.text(a+0.8,y+h/2+(o.fs||2.65)*0.36,txt,o.fs||2.65,{fill:o.tc||'#fff',font_weight:700},'bars');else if(o.out)s.text(a+w+0.8,y+h/2+0.95,txt,2.65,{fill:C.g1,font_weight:700},'bars')}};
  // lives (true scale on row 1’s first segment)
  D.lives.forEach(([nm,a,b],i)=>{const y=RY[0]-22.5-(17-i)*2.9;bar(X(0,-a),X(0,-b),y,2.5,C.g2,`${nm} · ${a-b} yrs`,{fs:2.3})});
  s.text(X(0,-2300),112,'LIVES OVERLAP',3.4,{fill:C.g1,font_weight:800},'bars');s.text(X(0,-2300),116,'Adam → Joseph · scale changes at the Flood',2.65,{fill:C.g2},'bars');
  const fl=X(0,-2370);s.line(fl,RY[0]-74,fl,RY[0]-21,C.ink,0.4,{stroke_dasharray:'1 0.8'},'bars');
  // kings
  const kb=(L,y,col)=>L.forEach(([nm,a,b,d],i)=>{const x0=X(1,-a),x1=X(1,-b-(a===b?0.5:1)),lab=`${nm} · ${typeof d==='number'?d+(d===1?' yr':' yrs'):d}`;bar(x0,x1,y,4.4,i%2?C.g2:C.g1,lab,{fs:2.4})});
  kb(D.judah,RY[1]-26.9,null);kb(D.israel,RY[1]-31.9,null);
  bar(X(1,-607),X(1,-537),RY[1]-26.9,4.4,'url(#hatch)','',{});s.text(X(1,-537)+1,RY[1]-23.6,'EXILE · 70 yrs',2.65,{fill:C.ink,font_weight:800},'bars');
  s.text(XR-1,RY[1]-34,'JUDAH',2.65,{fill:C.g1,font_weight:800,text_anchor:'end'},'bars');s.text(XR-1,RY[1]-38,'ISRAEL',2.65,{fill:C.g1,font_weight:800,text_anchor:'end'},'bars');
  // prophets (3 lanes below row 2)
  const pk=new A0.Packer();A0.propPos={};D.prophets.forEach(([nm,a,b])=>{const x0=X(1,-a),x1=X(1,-b),w=Math.abs(x1-x0),lab=`${nm} · ${a-b} yrs`,need=Math.max(w,A0.tw(lab,2.4,1)+2);
    for(let k=0;k<3;k++){if(pk.free(k,x1-0.5,x1+need+0.5)){pk.take(k,x1,x1+need);const y=RY[1]+22.5+k*4.8;A0.propPos[nm]={x:x1+Math.max(w,1)/2,y:y+4.2};s.rect(x1,y,Math.max(w,1),4.2,'#8f8c85',{rx:0.6},'bars');s.text(x1+(w>A0.tw(lab,2.4,1)+1.4?0.8:w+0.8),y+3,lab,2.4,{fill:w>A0.tw(lab,2.4,1)+1.4?'#fff':C.g1,font_weight:700},'bars');break}}});
  s.text(XR-1,RY[1]+21.6,'PROPHETS',2.65,{fill:C.g1,font_weight:800,text_anchor:'end'},'bars');
  // spans
  const bandY={0:{d:RY[0]+22.5},1:{kJ:RY[1]-26.9},2:{d:RY[2]+22.5,dnS:RY[2]+22.5},3:{d:RY[3]+19.5,b:RY[3]+24.5,c:RY[3]-23.9,c2:RY[3]-28.9}};
  D.spans.forEach(([a,b,lab,dur,form,r,band])=>{const li=A0.loopOf((a+b)/2);if(li>=0){const o=-ROWS[A0.LOOPS[li].r].dir*25.5,id='ls'+Math.round(a);s.raw(`<path id="${id}" d="${(()=>{const L=A0.LOOPS[li],cyL=(RY[L.r]+RY[L.r+1])/2,low=A0.pos((a+b)/2,o)[1]>cyL,P=A0.track(a+0.6,b-0.6,low?o-2.2:o+1.1);return A0.pd(low?P.reverse():P)})()}" fill="none"/>`,'bars');s.path(A0.pd(A0.track(a+0.3,b-0.3,o)),A0.LOOPS[li].tick=(A0.LOOPS[li].tick?0:1)?C.g1:C.g2,4.4,{},'bars');s.raw(`<text font-size="2.65" font-weight="800" fill="#fff"><textPath href="#${id}" startOffset="1">${lab} · ${dur}</textPath></text>`,'bars');return}
    const y=bandY[r][band||'d'],x0=X(r,a),x1=X(r,b),txt=dur?`${lab} · ${dur}`:lab;
    if(form==='short'){const x=x0;s.line(x,y,x,y+4.4,C.ink,0.6,{},'bars');s.circ(x,y,0.9,C.ink,{},'bars');s.text(x+1.4,y+3.4,txt,2.65,{fill:C.g1,font_weight:700},'bars');return}
    if(form==='dash'){s.rect(Math.min(x0,x1),y,Math.abs(x1-x0),4.4,'none',{stroke:C.g1,stroke_width:0.4,stroke_dasharray:'1.4 0.8',rx:0.6},'bars');s.text(Math.min(x0,x1)+1,y+3.4,txt,2.65,{fill:C.g1,font_weight:700},'bars');return}
    if(r<3&&b>ROWS[r].t1){const o=(y+2.2-RY[r])*ROWS[r].dir;s.path(A0.pd(A0.track(ROWS[r].t1,b,o)),C.g1,0.4,{stroke_dasharray:'1.4 0.8'},'bars')}
    const fill=form==='fade'?(ROWS[r].dir===1?'url(#fadeR)':'url(#fadeL)'):(lab.includes('wilderness')?C.exo:form==='solid2'?C.g2:C.g1);if(lab.includes('wilderness')){s.rect(x0,y,x1-x0,4.4,fill,{rx:0.6},'bars');s.text(x1-0.8,y+3.4,'40 yrs · E1–10 → M1',2.65,{fill:'#fff',font_weight:800,text_anchor:'end'},'bars');return}
    bar(x0,x1,y,4.4,fill,txt,{tc:form==='fade'?C.ink:'#fff',out:1})});
  // exodus route stops on the wilderness bar (match M1 pins E1–E10)
  let last=-9;A0.exoStops=[];[[1,-1512.9],[2,-1512.87],[3,-1512.82],[4,-1512.78],[5,-1512.7],[6,-1512.62],[7,-1512.55],[8,-1511.5],[9,-1474],[10,-1473.4]].forEach(([k,t])=>{let x=Math.max(X(0,t),last+3.6);last=x;const y=RY[0]+24.7;
    s.circ(x,y,1.7,C.paper,{stroke:C.ink,stroke_width:0.35},'bars');s.text(x,y+0.8,String(k),2.2,{text_anchor:'middle',fill:C.exo,font_weight:800},'bars')});
  // 66 books in the scroll strip (o 17–21)
  const bt=(ab,t)=>`${ab} ${Math.abs(t)}`;D.books.filter(([,t])=>A0.loopOf(t)>=0).forEach(([ab,t],i)=>{const p=A0.pos(t,19),lab=bt(ab,t),w=A0.tw(lab,2.3,1)+1.2;s.rect(p[0]-w/2,p[1]-1.7,w,3.4,C.card,{stroke:C.g3,stroke_width:0.25,rx:0.5},'bars');s.text(p[0]-w/2+0.6,p[1]+0.85,lab,2.3,{fill:C.g1,font_weight:700},'bars')});
  [0,1,2].forEach(r=>{const bs=D.books.filter(([,t])=>A0.loopOf(t)<0&&A0.rowOf(t+(t===-997?0.1:0))===r).map(([ab,t])=>{const lab=bt(ab,t);return{ab:lab,x:X(r,t),w:A0.tw(lab,2.3,1)+1.2}}).sort((p,q)=>p.x-q.x);let end=-1e9;
    bs.forEach(b=>{const bx=Math.max(b.x-b.w/2,end+0.4);end=bx+b.w;const y=ly(r,19),e=ROWS[r].dir===1?y+1.7:y-1.7,e2=ROWS[r].dir===1?y+2.8:y-2.8;s.rect(bx,y-1.7,b.w,3.4,C.card,{stroke:C.g3,stroke_width:0.25,rx:0.5},'bars');s.text(bx+0.6,y+0.85,b.ab,2.3,{fill:C.g1,font_weight:700},'bars');s.line(b.x,e2,bx+b.w/2,e,C.g3,0.2,{},'bars')})});
};
})();
