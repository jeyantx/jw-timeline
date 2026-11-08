(function(){
const {C,T,ROWS,RY,XL,XR,X,ly,O,D}=A0;
const pd=A0.pd,tr=A0.track;
A0.POW=[['EGYPT',-1600,-740,null],['ASSYRIA',-740,-632,null],['BABYLON',-607,-539,'au'],['MEDO-PERSIA',-539,-331,'ag'],['GREECE',-331,-30,'cu'],['ROME',-30,1914,'fe'],['ANGLO-AMERICA',1914,2030,'clay']];
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
    R.map.slice(1,-1).forEach(([t,x])=>{[-1,1].forEach(sd=>{const y=RY[r]+sd*(r<3&&sd===-R.dir?19.6:22.6);s.line(x-1.6,y+1.2,x-0.2,y-1.2,C.ink,0.4,{},'bed');s.line(x+0.2,y+1.2,x+1.6,y-1.2,C.ink,0.4,{},'bed')})})}
  for(let r=0;r<3;r++)s.path(A0.loopPath(r,0),eraOf(ROWS[r].t1),42,{},'bed');
  s.rect(205,RY[3]-21,95,42,C.future,{stroke:C.g3,stroke_width:0.4,stroke_dasharray:'1.5 1'},'bed');
  s.rect(215,RY[2]-21,425,42,'#d3cec1',{},'bed');
  // day strip numbers + Passover marks (in the scroll strip of row 3)
  for(let d=8;d<=16;d++){const x0=A0.X(2,33.235+(d-8)/9*0.025),x1=A0.X(2,33.235+(d-7)/9*0.025);s.line(x1,RY[2]+17,x1,RY[2]+21,C.g2,0.3,{},'bed');s.text((x0+x1)/2,RY[2]+20.2,String(d),2.65,{text_anchor:'middle',fill:C.g1,font_weight:700},'bed')}
  [[30.25,'PASSOVER 30'],[31.25,'PASSOVER 31'],[32.25,'PASSOVER 32']].forEach(([t,l])=>{const x=X(2,t);s.line(x,RY[2]-21,x,RY[2]+21,C.ink,0.35,{stroke_dasharray:'1 0.8'},'bed');s.text(x+1,RY[2]+20.2,l,2.65,{fill:C.g1,font_weight:700},'bed')});
  s.text(X(2,33.235)-1,RY[2]+20.2,'NISAN',2.4,{fill:C.g2,font_weight:700,text_anchor:'end'},'bed');{const x=X(2,33.235+6.5/9*0.025);s.line(x,RY[2]-21,x,RY[2]+16.6,C.ink,0.35,{stroke_dasharray:'1 0.8'},'bed')}
};
// ---------- series lines
A0.drawLines=s=>{
  const L=(t0,t1,o,col,w,ex)=>s.path(pd(tr(t0,t1,o)),col,w,Object.assign({stroke_linecap:'butt'},ex||{}),'lines');
  L(-4026,2030,O.h,C.ink,0.8);
  A0.POW.forEach(([nm,a,b,m])=>{if(m)L(a,b,O.r,C[m],2.6);L(a,b,O.r,C.red,0.9);const p=A0.pos(a,O.r);s.line(p[0]-p[2]*1.8,p[1]-p[3]*1.8,p[0]+p[2]*1.8,p[1]+p[3]*1.8,C.red,0.6,{},'lines')});
  A0.POW.forEach(([nm,a,b])=>{if(A0.loopOf(a)<0)return;const id='pw'+Math.round(-a),t0=a+(a<-100?40:1.5),t1=Math.min(b,t0+45),f=A0.pos(t0,O.r),g=A0.pos(t1,O.r),rev=g[0]<f[0],P=tr(t0,t1,O.r+(rev?-3.4:-1.5));s.raw(`<path id="${id}" d="${pd(rev?P.reverse():P)}" fill="none"/>`,'lines');s.raw(`<text font-size="1.9" font-weight="800" fill="${C.red}" letter-spacing="0.15"><textPath href="#${id}">${nm} ${Math.abs(a)}</textPath></text>`,'lines')});
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
  const tag=(t,o,txt,dx)=>{let [x,y]=A0.pos(t,o);const w=A0.tw(txt,2.3,1)+1.6;if(dx)x+=dx*(w/2+3.2);s.rect(x-w/2,y-1.5,w,3,C.paper,{stroke:C.violet,stroke_width:0.3,rx:1.5},'lines');s.text(x,y+0.85,txt,2.3,{text_anchor:'middle',fill:C.violet,font_weight:800},'lines')};
  const ruler=(st,len,o,step,major,tags)=>{const t1=tOf(st,len);L(st,t1,o,C.violet,1.1);
    for(let k=0;k<=len;k+=step){const t=tOf(st,k),p=A0.pos(t,o),h=k%major===0?1.8:0.9;s.line(p[0]-p[2]*h,p[1]-p[3]*h,p[0]+p[2]*h,p[1]+p[3]*h,C.violet,0.35,{},'lines')}
    tags.forEach(([k,txt,dx])=>tag(tOf(st,k),o,txt,dx))};
  ruler(-607,2520,O.v,100,500,[[500,'500 YRS'],[1000,'1,000'],[1500,'1,500'],[2000,'2,000'],[2520,'2,520 · SEVEN TIMES',1]]);
  ruler(-455,490,O.v2,7,490,[[49,'7 WKS'],[483,'69 WKS'],[490,'70 WKS']]);
  ruler(-607,70,O.v2,10,70,[[35,'70 YEARS']]);
  [[1914.95,1918.45,'1,260 D'],[1919.0,1922.7,'1,290 D'],[1922.7,1926.4,'1,335 D'],[1938.45,1944.8,'2,300 D']].forEach(([a,b,t])=>{L(a,b,O.v2,C.violet,1.1);[a,b].forEach(z=>{const x=X(3,z),y=ly(3,O.v2);s.line(x,y-1.8,x,y+1.8,C.violet,0.4,{},'lines')});tag((a+b)/2,O.v2,t)});
};
// ---------- structural bars: lives, kings, prophets, spans, books
A0.drawStructure=s=>{
  A0.paulEnd=null;A0.LOOPS.forEach(L=>L.tick=0);
  const bar=(x0,x1,y,h,fill,txt,o={})=>{const a=Math.min(x0,x1),w=Math.max(0.6,Math.abs(x1-x0));s.rect(a,y,w,h,fill,Object.assign({rx:0.6},o.r||{}),'bars');
    if(txt){let pad=0.8;if(o.out&&A0.tw(txt,o.fs||2.65,1)+1.4>=w&&A0.tw(txt,2.2,1)+1.0<w)o=Object.assign({},o,{fs:2.2});if(o.tc===C.ink&&A0.tw(txt,o.fs||2.65,1)+2.6<w)pad=2.0;const tw=A0.tw(txt,o.fs||2.65,1);if(tw+pad+(o.fs===2.2?0.2:0.6)<w)s.text(a+pad,y+h/2+(o.fs||2.65)*0.36,txt,o.fs||2.65,{fill:o.tc||'#fff',font_weight:700},'bars');else if(o.out)s.text(a+w+0.8,y+h/2+0.95,txt,2.65,{fill:C.g1,font_weight:700},'bars')}};
  // lives (true scale on row 1’s first segment)
  D.lives.forEach(([nm,a,b],i)=>{const y=RY[0]-26.4-(16-i)*2.8;bar(X(0,-a),X(0,-b),y,2.5,C.g2,`${nm} · ${a-b} yrs`,{fs:2.3})});
  s.text(X(0,-2300),112,'LIVES OVERLAP',3.4,{fill:C.g1,font_weight:800},'bars');s.text(X(0,-2300),116,'Adam → Joseph · scale changes at the Flood',2.65,{fill:C.g2},'bars');
  const fl=X(0,-2370);s.line(fl,RY[0]-72,fl,RY[0]-21,C.ink,0.4,{stroke_dasharray:'1 0.8'},'bed');
  // kings
  const kb=(L,y,col)=>{let prev=null;L.forEach(([nm,a,b,d],i)=>{let x0=X(1,-a);if(prev!=null)x0=Math.min(x0,prev);const x1=Math.min(x0-0.8,X(1,-b))+0.25;prev=x1-0.25;const lab=`${nm} · ${typeof d==='number'?d+(d===1?' yr':' yrs'):d}`;const bw=Math.abs(x0-0.25-x1),fit=t=>A0.tw(t,2.4,1)+1.4<bw;bar(x0-0.25,x1,y,4.4,i%2?C.g2:C.g1,fit(lab)?lab:fit(nm)?nm:(()=>{for(let k=nm.length-1;k>=4;k--){const t=nm.slice(0,k).trim()+'.';if(fit(t))return t}return ''})(),{fs:2.4})})};
  kb(D.judah,RY[1]-26.9,null);kb(D.israel,RY[1]-31.9,null);
  
  s.text(XR+1,RY[1]-23.7,'JUDAH',2.4,{fill:C.g1,font_weight:800},'bars');s.text(XR+1,RY[1]-28.7,'ISRAEL',2.4,{fill:C.g1,font_weight:800},'bars');
  // prophets (3 lanes below row 2)
  const pk=new A0.Packer();A0.propPos={};D.prophets.forEach(([nm,a,b])=>{const x0=X(1,-a),x1=X(1,-b),w=Math.abs(x1-x0),lab=`${nm} · ${a-b} yrs`,need=Math.max(w,A0.tw(lab,2.4,1)+2);
    for(let k=0;k<3;k++){if(pk.free(k,x1-0.5,x1+need+0.5)){pk.take(k,x1,x1+need);const y=RY[1]+22.5+k*4.8;A0.propPos[nm]={x:x1+Math.max(w,1)/2,y:y+4.2};s.rect(x1,y,Math.max(w,1),4.2,'#8f8c85',{rx:0.6},'bars');s.text(x1+(w>A0.tw(lab,2.4,1)+1.4?0.8:w+0.8),y+3,lab,2.4,{fill:w>A0.tw(lab,2.4,1)+1.4?'#fff':C.g1,font_weight:700},'bars');break}}});
  s.text(XR-1,RY[1]+21.6,'PROPHETS',2.65,{fill:C.g1,font_weight:800,text_anchor:'end'},'bars');
  // spans
  const bandY={0:{d:RY[0]+22.5},1:{kJ:RY[1]-26.9,dn2:RY[1]-26.9},2:{d:RY[2]+22.5,dnS:RY[2]+22.5},3:{d:RY[3]+19.5,b:RY[3]+24.5,c:RY[3]-23.9,c2:RY[3]-28.9}};
  D.spans.forEach(([a,b,lab,dur,form,r,band])=>{const li=A0.loopOf((a+b)/2);if(li>=0){const o=-ROWS[A0.LOOPS[li].r].dir*25.5,id='ls'+Math.round(a);s.raw(`<path id="${id}" d="${(()=>{const L=A0.LOOPS[li],cyL=(RY[L.r]+RY[L.r+1])/2,low=A0.pos((a+b)/2,o)[1]>cyL,P=A0.track(a+0.6,b-0.6,low?o-2.2:o+1.1);return A0.pd(low?P.reverse():P)})()}" fill="none"/>`,'bars');s.path(A0.pd(A0.track(a+0.3,b-0.3,o)),A0.LOOPS[li].tick=(A0.LOOPS[li].tick?0:1)?C.g1:C.g2,4.4,{},'bars');s.raw(`<text font-size="2.65" font-weight="800" fill="#fff"><textPath href="#${id}" startOffset="50%" text-anchor="middle">${lab} · ${dur}</textPath></text>`,'bars');return}
    const y=bandY[r][band||'d'],x0=X(r,a),x1=X(r,b),txt=dur?`${lab} · ${dur}`:lab;
    if(band==='dn2'){bar(x0-0.5,x1,RY[1]-26.9,4.4,'url(#hatch)','',{});s.text(Math.min(x0,x1)+1,RY[1]-23.6,`${lab.toUpperCase()} · ${dur}`,2.65,{fill:C.ink,font_weight:800},'bars');return}
    if(r===2&&!band){const w=A0.tw(txt,2.65,1),lx=Math.max(x0,(A0.paulEnd||-1e9)+1.6);A0.paulEnd=lx+w;
      if(form==='short'){s.line(x0,y,x0,y+4.4,C.ink,0.6,{},'bars');s.circ(x0,y,0.9,C.ink,{},'bars')}else bar(x0,x1,y,4.4,C.g1,'',{});
      const bx=form==='short'?x0:(x0+x1)/2;s.path(`M${A0.n(bx)} ${A0.n(y+4.6)}V${A0.n(y+5.3)}H${A0.n(lx)}V${A0.n(y+6)}`,C.g3,0.2,{},'bars');s.text(lx,y+8.2,txt,2.65,{fill:C.g1,font_weight:700},'bars');return}
    if(form==='short'){const x=x0;s.line(x,y,x,y+4.4,C.ink,0.6,{},'bars');s.circ(x,y,0.9,C.ink,{},'bars');s.text(x+1.4,y+3.4,txt,2.65,{fill:C.g1,font_weight:700},'bars');return}
    if(form==='dash'){s.rect(Math.min(x0,x1),y,Math.abs(x1-x0),4.4,'none',{stroke:C.g1,stroke_width:0.4,stroke_dasharray:'1.4 0.8',rx:0.6},'bars');s.text(Math.min(x0,x1)+1,y+3.4,txt,2.65,{fill:C.g1,font_weight:700},'bars');return}
    if(r<3&&b>ROWS[r].t1){const o=(y+2.2-RY[r])*ROWS[r].dir;s.path(A0.pd(A0.track(ROWS[r].t1,b,o)),C.g1,0.4,{stroke_dasharray:'1.4 0.8'},'bars')}
    const fill=form==='fade'?(ROWS[r].dir===1?'url(#fadeR)':'url(#fadeL)'):(lab.includes('wilderness')?C.exo:form==='solid2'?C.g2:C.g1);if(lab.includes('wilderness')){s.rect(x0,y,x1-x0,4.4,fill,{rx:0.6},'bars');s.text(X(0,-1474)-2.6,y+3.4,'40 yrs · E1–10 → M1',2.65,{fill:'#fff',font_weight:800,text_anchor:'end'},'bars');return}
    bar(x0,x1,y,4.4,fill,txt,{tc:form==='fade'?C.ink:'#fff',out:1})});
  // row tags at each row start
  ROWS.forEach((R,i)=>{let t=R.name.split(' · turn')[0];if(R.dir===1)t+=' →';const y=[170,296,416,578][i];s.text(R.dir===1?XL+2:XR-2,y,t,2.65,{fill:C.g2,font_weight:800,text_anchor:R.dir===1?'start':'end',letter_spacing:0.2},'bars')});
  // exodus route stops on the wilderness bar (match M1 pins E1–E10)
  let last=-9;A0.exoStops=[];[[1,-1512.75],[2,-1512.72],[3,-1512.69],[4,-1512.66],[5,-1512.64],[6,-1512.61],[7,-1512.58],[8,-1511.5],[9,-1474],[10,-1473.4]].forEach(([k,t])=>{let x=Math.max(X(0,t),last+3.9);last=x;const y=RY[0]+24.7;
    s.circ(x,y,1.7,C.paper,{stroke:C.ink,stroke_width:0.35},'bars');s.text(x,y+0.8,String(k),2.2,{text_anchor:'middle',fill:C.exo,font_weight:800},'bars')});
  // 66 books in the scroll strip (o 17–21)
  const bt=(ab,t)=>`${ab} ${Math.abs(t)}`;D.books.filter(([,t])=>A0.loopOf(t)>=0).forEach(([ab,t],i)=>{const p=A0.pos(t,19),lab=bt(ab,t),w=A0.tw(lab,2.3,1)+1.2;s.rect(p[0]-w/2,p[1]-1.7,w,3.4,C.card,{stroke:C.g3,stroke_width:0.25,rx:0.5},'bars');s.text(p[0]-w/2+0.6,p[1]+0.85,lab,2.3,{fill:C.g1,font_weight:700},'bars')});
  [0,1,2].forEach(r=>{const bs=D.books.filter(([,t])=>A0.loopOf(t)<0&&A0.rowOf(t+(t===-997?0.1:0))===r).map(([ab,t])=>{const lab=bt(ab,t);return{ab:lab,x:X(r,t),w:A0.tw(lab,2.3,1)+1.2}}).sort((p,q)=>p.x-q.x);const G=[],mn=r===2?X(2,33.26)+0.5:-1e9,cl=(c,w)=>Math.max(c,mn+w/2);bs.forEach(b=>{let g={it:[b],w:b.w,c:cl(b.x,b.w)};G.push(g);
      while(G.length>1){const p=G[G.length-2],q=G[G.length-1],pe=p.c+p.w/2,qs=q.c-q.w/2;if(pe+0.4<=qs)break;G.pop();G.pop();const it=p.it.concat(q.it),w=it.reduce((m,z)=>m+z.w,0)+0.4*(it.length-1),c=cl(it.reduce((m,z)=>m+z.x,0)/it.length,w);G.push({it,w,c})}});
    G.forEach(g=>{let bx=g.c-g.w/2;g.it.forEach(b=>{b.bx=bx;bx+=b.w+0.4})});
    bs.forEach(b=>{const bx=b.bx;const y=ly(r,19),e=ROWS[r].dir===1?y+1.7:y-1.7,e2=ROWS[r].dir===1?y+2.8:y-2.8;s.rect(bx,y-1.7,b.w,3.4,C.card,{stroke:C.g3,stroke_width:0.25,rx:0.5},'bars');s.text(bx+0.6,y+0.85,b.ab,2.3,{fill:C.g1,font_weight:700},'bars');s.line(b.x,e2,bx+b.w/2,e,C.g3,0.2,{},'bars')})});
};
})();
