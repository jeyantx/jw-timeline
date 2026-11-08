(function(){
const {C,T,ROWS,RY,XL,XR,X,ly,O,D}=A0;
const SO={g:O.g,c:O.c,r:O.r,n:O.n,v:O.v,w:O.w};
const DIFF=['Esther made queen','Job tested','Water to wine','Gideon’s 300'],DREF=['b18-0048','b2-0008','b5-0021'],isDiff=it=>DIFF.includes(it.title)||DREF.includes(it.o&&it.o.ref0);
const slug=t=>String(t).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const HALO={stroke:C.paper,stroke_width:0.6,paint_order:'stroke',stroke_linejoin:'round'};
A0.slots=[];
// ---------- items
A0.buildItems=()=>{
  const R=A0.rng(11),items=[];
  const zoneOf=(r,t)=>t>2026?'F':r===2?(t<33.26?'J':'R3'):'R'+(r+1);
  const mk=(e,t)=>{const p=A0.pos(t,0),r=A0.rowOf(t);return {t,r,x:p[0],y:p[1],loop:p[5]>=0?p[5]:null,tier:e[1],title:e[2],date:e[3],scr:e[4],ser:e[5]||'',g:e[6],o:e[7]||{},zone:zoneOf(r,t)}};
  D.ev.forEach(e=>items.push(mk(e,e[0])));
  D.jesExtra.forEach(e=>items.push(mk(e,e[0])));
  const cols=[[],[],[],[]],CT=[[29.7,30.25],[30.25,31.25],[31.25,32.25],[32.25,33.235]];
  D.jes.forEach(e=>{if(typeof e[0]==='string'){const d=+e[0].slice(1);items.push(mk(e,33.235+(d-8+0.5)/9*0.025))}else cols[e[0]].push(e)});
  const nJ=0;[10,15,17,17].forEach((w,c)=>{const k=Math.round(nJ*w/59);for(let i=0;i<k;i++)cols[c].splice(Math.floor(R()*(cols[c].length+1)),0,[c,R()<0.15?1:2,null,'','','',R()<0.6?1:3])});
  cols.forEach((L,c)=>L.forEach((e,i)=>items.push(mk(e,CT[c][0]+(i+0.5)/L.length*(CT[c][1]-CT[c][0])))));
  D.budget.filter(b=>!b.jes).forEach(b=>{const have=items.filter(it=>it.t>=b.a&&it.t<b.b&&it.zone!=='F'&&A0.rowOf(it.t)===b.r).length;
    for(let i=have;i<b.n;i++){let t=b.a+R()*(b.b-b.a);if(b.r===0&&R()<0.35)t=-1720+R()*600;for(let g=0;g<6&&A0.loopOf(t)>=0&&R()<0.8;g++)t=b.a+R()*(b.b-b.a);items.push(mk([t,R()<0.12?1:2,null,'','','',R()<0.7?0:1],t))}});
  const cnt={};items.slice().sort((p,q)=>p.t-q.t).forEach(it=>{cnt[it.zone]=(cnt[it.zone]||0)+1;it.ref=`${it.zone}-${String(cnt[it.zone]).padStart(2,'0')}`});
  A0.items=items;return items};
const yrOf=it=>{if(it._noyr)return '';if(it.o&&it.o.yr!=null)return it.o.yr;if(!it.title)return String(Math.round(Math.abs(it.t)));const d=it.date||'';if(/not stated|future|^—/.test(d))return '';if(it.r===3&&/\d{4}/.test(d))return d.match(/\d{4}/)[0];return d.replace(/ B\.C\.E\.| C\.E\./g,'').replace(/^(Jan|Feb|March|April|May|June|July|Aug|Sept|Oct|Nov|Dec)\.? (\d{4})$/,'$2').replace(/^before /,'b. ').replace(/^after /,'a. ').replace(/^between (\d+) and (\d+)/,'$1–$2').replace(/^during .*/,'').replace(/ service year/,'')};
A0.yrOf=yrOf;
const labW=(it,i)=>{const fs=it.tier===1?T.t1:T.t2,yr=yrOf(it),meta=it.o.meta!=null?[it.o.meta==='year not stated · within'?(yr?'':'year not stated'):it.o.meta,it.scr&&it.scr!=='—'?it.scr:''].filter(Boolean).join(' · '):it.title?[it.ref,!yr||(yr!==it.date.replace(/ B\.C\.E\.| C\.E\./g,'')&&/[A-Za-z]/.test(it.date.replace(/B\.C\.E\.|C\.E\./g,'')))?it.date:'',it.scr&&it.scr!=='—'?it.scr:''].filter(Boolean).join(' · '):'';
  it._sp=null;if(it.title&&it.title.length>22){const t=it.title,mid=t.length/2;let best=-1;for(let i=0;i<t.length;i++)if(t[i]===' '&&(best<0||Math.abs(i-mid)<Math.abs(best-mid)))best=i;if(best>0)it._sp=[t.slice(0,best),t.slice(best+1)]}
  let w=it._sp?Math.max(A0.tw((yr?yr+' ':'')+it._sp[0],fs,it.tier===1),A0.tw(it._sp[1]+'  ',fs*0.9,it.tier===1)+A0.tw(meta,T.meta))+1.6:it.title?Math.max(A0.tw((yr?yr+' ':'')+it.title,fs,it.tier===1),A0.tw(meta,T.meta))+1.6:A0.tw(yr+' ',T.t2,1)+18+((i*37)%14);if(it.o.med)w+=21;if(isDiff(it))w+=3;return {w,meta,fs}};
// draw a label in box [a,b] at top; anchor 'start' (text from a) or 'end' (text to b)
function drawLabel(s,it,a,b,top,anchor,meta,fs){
  const med=!!it.o.med;let tx=anchor==='start'?a+0.9:b-0.9;const ty=med?top+8.6:top;
  if(med){const cx=anchor==='start'?a+11.2:b-11.2,cy=top+11.1;
    A0.slots.push({id:it.o.slot||'ev-'+slug(it.title||it.ref),x:cx-9.8,y:cy-9.8,w:19.6,h:19.6,shape:'circle',ph:it.title||it.ref});tx=anchor==='start'?a+22.5:b-22.5}
  const yr=yrOf(it);
  if(it.title&&it._sp){const fw=it.tier===1?800:500,H=`stroke="${C.paper}" stroke-width="${fs>3.5?0.8:0.6}" paint-order="stroke" stroke-linejoin="round"`;
    s.raw(`<text x="${A0.n(tx)}" y="${A0.n(ty+fs*0.86)}" font-size="${fs}" text-anchor="${anchor}" fill="${C.ink}" font-weight="${fw}" ${H}>${yr?`<tspan fill="#8a5f00" font-weight="800">${A0.esc(yr)}</tspan> `:''}${A0.esc(it._sp[0])}</text>`,'lab');
    s.raw(`<text x="${A0.n(tx)}" y="${A0.n(ty+T.pitch*0.88)}" font-size="${A0.n(fs*0.9)}" text-anchor="${anchor}" fill="${C.ink}" font-weight="${fw}" ${H}>${A0.esc(it._sp[1])}<tspan font-size="${T.meta}" fill="${C.g1}" font-weight="400">  ${A0.esc(meta+(isDiff(it)?'  ≠':''))}</tspan></text>`,'lab')}
  else if(it.title){s.raw(`<text x="${A0.n(tx)}" y="${A0.n(ty+fs*0.86)}" font-size="${fs}" text-anchor="${anchor}" fill="${C.ink}" font-weight="${it.tier===1?800:500}" stroke="${C.paper}" stroke-width="${fs>3.5?0.8:0.6}" paint-order="stroke" stroke-linejoin="round">${yr?`<tspan fill="#8a5f00" font-weight="800">${A0.esc(yr)}</tspan> `:''}${A0.esc(it.title)}</text>`,'lab');
    s.text(tx,ty+T.pitch*0.86,meta+(isDiff(it)?'  ≠':''),T.meta,Object.assign({text_anchor:anchor,fill:C.g1},HALO),'lab')}
  else{const yw=A0.tw(yr+' ',T.t2,1),bw=b-a-1.6-(med?21:0)-yw,bx=anchor==='start'?tx+yw:tx-bw-yw;s.text(anchor==='start'?tx:tx-bw-yw,ty+3,yr,T.t2,{fill:'#8a5f00',font_weight:800},'lab');s.rect(bx,ty+0.9,bw*0.85,it.tier===1?2.8:2.2,it.tier===1?C.g2:C.g3,{rx:0.5},'lab');s.text(tx,ty+6.4,it.ref,T.meta,{text_anchor:anchor,fill:C.g3},'lab')}}
function station(s,it){const r=it.r;
  if(it.loop!=null){A0.glyph(s,it.x,it.y,it.g,it.tier===1);return}
  const offs=[0,...it.ser.split('').map(c=>SO[c]).filter(v=>v!=null)],ys=offs.map(o=>ly(r,o)),y0=Math.min(...ys),y1=Math.max(...ys);
  if(offs.length>2||it.tier===1&&offs.length>1)s.rect(it.x-2,y0-2,4,y1-y0+4,C.paper,{rx:2,stroke:C.ink,stroke_width:it.tier===1?0.8:0.55},'st');
  it.ser.split('').forEach(c=>{if(c==='c')s.rect(it.x-1.1,ly(r,O.c)-1.1,2.2,2.2,C.sepia,{transform:`rotate(45 ${it.x} ${ly(r,O.c)})`},'st')});
  A0.glyph(s,it.x,ly(r,0),it.g,it.tier===1)}
// ---------- stations + labels
A0.drawEvents=s=>{
  const items=A0.buildItems(),P=T.pitch,pk=new A0.Packer(),rects=[];A0._rects=rects;A0._pk=pk;A0.stats={placed:{},dropped:{},total:{}};
  for(let k=0;k<5;k++)pk.take(`0u${k}`,0,A0.X(0,-1657)+4);
  for(let k=0;k<4;k++)pk.take(`3d${k}`,0,345);for(let k=0;k<3;k++)pk.take(`0d${k}`,0,188);rects.push({x:22,y:194,w:168,h:104});rects.push({x:22,y:299,w:96,h:138});rects.push({x:22,y:439,w:168,h:92});rects.push({x:XR-14,y:RY[1]-41.5,w:14,h:9});rects.push({x:580,y:RY[1]-32.5,w:XR-580,h:11});
  {const LC=[];false&&[[true,0,'ISRAEL'],[true,4,'PROPHETS'],[false,0,'JUDAH'],[false,3,'NATIONS']];LC.forEach(([up,k,t])=>{const top=A0.laneTop(1,up,k),x=XR-2,tw=A0.tw(t,2.4,1)+1.5;rects.push({x:x-tw,y:top,w:tw,h:T.pitch});pk.take(`1${up?'u':'d'}${k}`,x-tw-1,x+1);s.rect(x-tw,top+1.2,tw,3.6,C.paper,{stroke:C.g3,stroke_width:0.25,rx:1.8},'lab');s.text(x-tw/2,top+3.8,t,2.4,{text_anchor:'middle',fill:C.g1,font_weight:800,letter_spacing:0.3},'lab')})}
  {const last={};D.captions.forEach(([r,t,txt])=>{if(t>=ROWS[r].t1){const p=A0.pos(t,0),cw=A0.tw(txt,6,1)+0.4*txt.length;rects.push({x:p[0]-cw,y:p[1]-6,w:cw*2,h:9,cap:1});return}const d=ROWS[r].dir,R=ROWS[r],cw=A0.tw(txt,6,1)+0.4*txt.length;let x=X(r,t)+d*1;const lives=r===0&&x<A0.X(0,-1657)+2,key=lives?'L':r;if(last[key]!=null)x=d===1?Math.max(x,last[key]+5):Math.min(x,last[key]-5);last[key]=x+d*cw;const y=lives?105:RY[r]-R.su-R.U*T.pitch-2.2;rects.push({x:d===1?x:x-cw,y:y-4.8,w:cw,h:5,cap:1})})}
  const tally=(it,ok)=>{A0.stats.total[it.zone]=(A0.stats.total[it.zone]||0)+1;const k=ok?'placed':'dropped';if(!ok&&it.tier===1&&it.title)(A0.stats.t1d=A0.stats.t1d||[]).push(it.title);A0.stats[k][it.zone]=(A0.stats[k][it.zone]||0)+1};
  const hit=b=>rects.some(q=>b.x<q.x+q.w&&b.x+b.w>q.x&&b.y<q.y+q.h&&b.y+b.h>q.y);
  const segX=(a,b,c,d)=>{const o=(p,q,r)=>Math.sign((q[0]-p[0])*(r[1]-p[1])-(q[1]-p[1])*(r[0]-p[0]));return o(a,b,c)!==o(a,b,d)&&o(c,d,a)!==o(c,d,b)};
  const segBox=(p,q,b)=>{const e=[[b.x,b.y],[b.x+b.w,b.y],[b.x+b.w,b.y+b.h],[b.x,b.y+b.h]];for(let i=0;i<4;i++)if(segX(p,q,e[i],e[(i+1)%4]))return true;return false};
  const LP=Object.assign({dx:22,ll:25,sl:0.58,ck:-1,ls:0.5,lk:28,ld:44,nox:1},A0.LP||{});
  const RL=37,cyL=A0.LOOPS.map(L=>(RY[L.r]+RY[L.r+1])/2);
  const lim=(r,top,h)=>{let mx=XR+1,mn=(r===1||r===2)?XL-2:24;A0.LOOPS.forEach((L,li)=>{if(r!==L.r&&(r!==L.r+1||!LP.wide2))return;const dy=Math.max(Math.abs(top-cyL[li]),Math.abs(top+h-cyL[li])),ext=dy<RL?Math.sqrt(RL*RL-dy*dy):0;
    if(ROWS[L.r].dir===1)mx=Math.max(mx,XR+ext-1);else mn=Math.min(mn,XL-ext+1)});return[mn,mx]};
  const LL=[];A0.LOOPS.forEach((L,li)=>{const sgn=ROWS[L.r].dir,cy=cyL[li];let nx=0;
    items.filter(it=>it.loop===li).sort((a,b)=>(b.o.med?1:0)-(a.o.med?1:0)||(a.o.extra?1:0)-(b.o.extra?1:0)||a.tier-b.tier||a.t-b.t).forEach((it,i)=>{const {w,meta,fs}=labW(it,i),h=it.o.med?3*P:P+(it.tier===1&&it._sp?1.2:0);let got=null;
      const sd0=it.o.extra?0:nx++%2;for(const side of [sd0,1-sd0])for(let k=0;k<LP.lk*(it.tier===1?1.5:1)&&!got;k++){const dyc=(k%2?1:-1)*Math.ceil(k/2)*P*(LP.ls||1),top=it.y+dyc-h/2,dy=Math.max(Math.abs(top-cy),Math.abs(top+h-cy));
        let box;if(sgn===1){const outside=side===1;if(outside){const ro=LP.ro||92;const dyo=Math.min(Math.abs(top-cy),Math.abs(top+h-cy));const xo=dyo<ro?XR+Math.sqrt(ro*ro-dyo*dyo)+1:XR+1;if(xo+w>1168)continue;box={x:xo,y:top,w,h,anc:'start',out:1}}else{if(dy>39)continue;const xr=XR+Math.sqrt(39*39-dy*dy)-1;box={x:xr-w,y:top,w,h,anc:'end'}}}else{if(dy>(LP.ld||40))continue;const xl=XL-(dy<37?Math.sqrt(37*37-dy*dy):0)+1;box={x:xl,y:top,w,h,anc:'start'}}
        if(box.x<25||hit(box))continue;{const lq=[box.anc==='end'?box.x+box.w+0.3:box.x-0.3,box.y+(it.o.med?11:it.tier===1?2.4:2.0)];if(!LP.nox&&LL.some(L=>Math.hypot(L[0][0]-it.x,L[0][1]-it.y)>1.5&&segX([it.x,it.y],lq,L[0],L[1]))||!LP.nob&&rects.some(R2=>R2.lab&&segBox([it.x,it.y],lq,{x:R2.x+0.3,y:R2.y+0.4,w:R2.w-0.6,h:R2.h-1.2})))continue;box.lq=lq}got=box}
      station(s,it);tally(it,!!got);if(!got)return;got.lab=1;rects.push(got);LL.push([[it.x,it.y],got.lq]);
      s.line(it.x,it.y,got.lq[0],got.lq[1],'#8d8a83',0.25,{},'lead');
      drawLabel(s,it,got.x,got.x+got.w,got.y,got.anc,meta,fs)})});

  // ---- free placement (any direction, nearest free space, straight slanted leaders; exact years on the gold line)
  const FREE=new Set(A0.FREEROWS||[1]);
  const placeFree=(r)=>{const R=ROWS[r],TS=4.4,edgeU=RY[r]-R.su,edgeD=RY[r]+R.sd,zU=[A0.laneTop(r,true,R.U-1),edgeU-TS],zD=[edgeD+TS,A0.laneTop(r,false,R.D-1)+P];
    const tags=[],leads=[];
    const all=items.filter(it=>it.r===r&&it.loop==null).sort((a,b)=>a.x-b.x);
    const cl=[];all.forEach(it=>{const c=cl[cl.length-1];if(c&&it.x-c[c.length-1].x<3&&c.length<3)c.push(it);else cl.push([it])});
    const pri=c=>Math.min(...c.map(i=>i.o.extra?3:i.o.med?0:i.tier===1?1:2));
    cl.sort((a,b)=>pri(a)-pri(b)||a[0].x-b[0].x);
    const DX=[];for(let dx=0;dx<=LP.dx;dx+=1.5)DX.push(dx);
    const doC=(c,solo)=>{const sx=(c[0].x+c[c.length-1].x)/2,ws=c.map((it,i)=>labW(it,i)),bw=Math.max(...ws.map(v=>v.w)),hs=c.map(it=>it.o.med?3*P:P+(it.tier===1&&it._sp?1.2:0)),bh=hs.reduce((a,b)=>a+b,0);
      const ln=c[0].o.lane,prefUp=ln?(ln==='israel'||ln==='judah'):(c[0].x*7)%2<1;
      const cands=[];
      [[true,zU],[false,zD]].forEach(([up,z])=>{const span=z[1]-z[0]-bh;if(span<0)return;for(let k=0;k<=span;k+=1.85){const top=up?z[1]-bh-k:z[0]+k;
        DX.forEach(dx=>[1,-1].forEach(sd=>{if(dx===0&&sd===-1)return;const x0=sd===1?sx-2+dx:sx+2-dx-bw;cands.push({up,top,x:x0,anc:sd===1?'start':'end',cost:dx*(LP.cx||1.2)+k*(LP.ck!=null?LP.ck:1.4)+(up===prefUp?0:(LP.cu!=null?LP.cu:10))})}))}});
      cands.sort((a,b)=>a.cost-b.cost);let got=null;const RR=rects.filter(q=>q.y<zD[1]+2&&q.y+q.h>zU[0]-2);
      for(const cd of cands){const b={x:cd.x,y:cd.top,w:bw,h:bh};const [mn,mx]=lim(r,b.y,b.h);if(b.x<mn||b.x+b.w>mx||b.x<24)continue;
        if(RR.some(q=>b.x-0.6<q.x+q.w&&b.x+b.w+0.6>q.x&&b.y+0.2<q.y+q.h&&b.y+b.h-0.2>q.y))continue;
        if(leads.some(L=>segBox(L[0],L[1],{x:b.x-0.3,y:b.y,w:b.w+0.6,h:b.h})))continue;
        const ex=cd.up?edgeU-TS:edgeD+TS,p=[sx,ex],inside=sx>=b.x+0.5&&sx<=b.x+b.w-0.5;let q;if(inside)q=[sx,cd.up?b.y+b.h:b.y];else{const cx=sx<b.x?b.x+0.5:b.x+b.w-0.5;q=[cx,cd.up?b.y+b.h:b.y]}
        const ddx=Math.abs(q[0]-p[0]),ddy=Math.abs(q[1]-p[1]);if(Math.hypot(ddx,ddy)>LP.ll)continue;if(ddx>2&&ddy<LP.sl*ddx)continue;
        if(leads.some(L=>segX(p,q,L[0],L[1])))continue;if(RR.some(R2=>!R2.cap&&R2.lab&&segBox(p,q,{x:R2.x+0.2,y:R2.y+0.4,w:R2.w-0.4,h:R2.h-1.2})))continue;
        got={b,p,q,cd};break}
      if(!got&&c.some(it=>it.o.med)){c.forEach(it=>{if(it.o.med)it.o=Object.assign({},it.o,{med:0})});return doC(c,solo)}
      if(!got&&c.length>1&&!solo){c.forEach(it=>doC([it],1));return}
      c.forEach(it=>{station(s,it);tally(it,!!got)});if(!got)return;
      rects.push(Object.assign({},got.b,{lab:1}));leads.push([got.p,got.q]);
      const up=got.cd.up,ty=up?edgeU-TS/2:edgeD+TS/2;
      c.forEach(it=>{const y=yrOf(it);if(it.g!==0||!/^\d{3,4}$/.test(y))return;const tw=A0.tw(y,2.65,1)+1.6,b={x:it.x-tw/2,y:ty-1.8,w:tw,h:3.6,up};if(tags.some(q=>q.up===up&&b.x<q.x+q.w+0.5&&b.x+b.w+0.5>q.x))return;tags.push(Object.assign(b,{t:y}));it._noyr=1});
      c.forEach(it=>s.line(it.x,ly(r,0),it.x,got.p[1],'#4d4a45',0.2,{},'lead'));
      if(c.length>1)s.line(c[0].x,got.p[1],c[c.length-1].x,got.p[1],'#4d4a45',0.25,{},'lead');
      s.line(got.p[0],got.p[1],got.q[0],got.q[1],'#4d4a45',0.25,{},'lead');
      let yy=got.b.y;c.forEach((it,i)=>{drawLabel(s,it,got.b.x,got.b.x+got.b.w,yy,got.cd.anc,ws[i].meta,ws[i].fs);yy+=hs[i]})};
    cl.forEach(c=>doC(c));
    tags.forEach(b=>{s.rect(b.x,b.y,b.w,b.h,'#8a5f00',{rx:1.8},'top');s.text(b.x+b.w/2,b.y+2.65,b.t,2.65,{text_anchor:'middle',fill:'#fff',font_weight:800},'top')});
  };
  for(let r=0;r<4;r++){const R=ROWS[r];if(FREE.has(r)){placeFree(r);continue}
    items.filter(it=>it.r===r&&it.loop==null).sort((a,b)=>{const p=i=>i.o.extra?3:i.o.med?1:i.tier===1?0:2;return p(a)-p(b)||a.x-b.x}).forEach(function place(it,i,rt){
      const {w,meta,fs}=labW(it,i),med=!!it.o.med,m=med?3:1,ln=it.o.lane,first=ln?(ln==='israel'||ln==='prophet'):i%2===0,far=ln==='prophet'||ln==='nations',cands=[];
      if(med){for(let k=R.U-3;k>=0;k--)cands.push([true,k]);for(let k=R.D-3;k>=0;k--)cands.push([false,k]);if(!first)cands.reverse()}
      else if(ln){const ord=[];const N=Math.max(R.U,R.D);const ks=far?[...Array(N).keys()].map(k=>N-1-k):[...Array(N).keys()];ks.forEach(k=>ord.push([first,k]));ks.forEach(k=>ord.push([!first,k]));ord.forEach(([up,kk])=>{if(kk<(up?R.U:R.D))cands.push([up,kk])})}
      else for(let k=0;k<Math.max(R.U,R.D);k++)[[first,k],[!first,k]].forEach(([up,kk])=>{if(kk<(up?R.U:R.D))cands.push([up,kk])});
      let got=null;
      for(const strict of [1,0])for(const sh of [0,7,15,25,38,54,75,100,130])for(const [up,k] of cands){if(got)break;const top=up?A0.laneTop(r,true,k+m-1):A0.laneTop(r,false,k),h=m*P,[mn,mx]=lim(r,top,h);
        for(const right of [true,false]){const a=right?it.x+sh:it.x-w-sh,b=right?it.x+w+sh:it.x-sh;
        if(b>mx||a<mn||a<24)continue;if(rects.some(q=>!q.cap&&a-0.6<q.x+q.w&&b+0.6>q.x&&top+0.2<q.y+q.h&&top+h-0.2>q.y))continue;if(rects.some(q=>q.cap&&a<q.x+q.w&&b>q.x&&top<q.y+q.h&&top+h>q.y))continue;
        const ra=Math.min(a,it.x),rb=Math.max(b,it.x);let ok=true;for(let j=0;j<m;j++)if(!pk.free(`${r}${up?'u':'d'}${k+j}`,ra-0.8,rb+0.8)){ok=false;break}
        if(ok&&strict){for(let j=0;j<m&&ok;j++)if(!pk.free(`${r}${up?'u':'d'}${k+j}s`,a-0.3,b+0.3))ok=false;for(let j=0;j<k&&ok;j++)if(!pk.free(`${r}${up?'u':'d'}${j}`,it.x-0.6,it.x+0.6))ok=false}
        if(ok){for(let j=0;j<m;j++)pk.take(`${r}${up?'u':'d'}${k+j}`,ra,rb);for(let j=0;j<k;j++)pk.take(`${r}${up?'u':'d'}${j}s`,it.x-0.2,it.x+0.2);got={up,k,right,a,b,top,h,sh};break}}}
      if(!got&&med&&rt!==1){it.o=Object.assign({},it.o,{med:0});return place(it,i,1)}
      station(s,it);tally(it,!!got);if(!got)return;rects.push({x:got.a,y:got.top,w:got.b-got.a,h:got.h});
      if(got.sh){const yy=got.top+(it.o.med?11:it.tier===1?2.4:2.0);s.path(`M${A0.n(it.x)} ${A0.n(ly(r,0))}V${A0.n(yy)}H${A0.n(got.right?got.a+0.3:got.b-0.3)}`,'#8d8a83',0.25,{},'lead')}else s.line(it.x,ly(r,0),it.x,got.up?got.top+got.h-0.4:got.top+0.4,'#8d8a83',0.25,{},'lead');
      drawLabel(s,it,got.a,got.b,got.top,got.right?'start':'end',meta,fs)})}
  for(let r=0;r<4;r++){const d=ROWS[r].dir;for(let x=XL+60;x<XR-20;x+=120){const y=ly(r,0);const yg=ly(r,O.g);s.path(`M${x-d*2} ${yg-2.2}L${x+d*1} ${yg}L${x-d*2} ${yg+2.2}`,'#7a5a00',0.8,{stroke_linejoin:'round'},'top')}}
};
A0.drawCaptions=s=>{const last={};D.captions.forEach(([r,t,txt])=>{if(t>=ROWS[r].t1)return;const d=ROWS[r].dir,R=ROWS[r],w=A0.tw(txt,6,1)+0.4*txt.length;let x=X(r,t)+d*1;
    const lives=r===0&&x<A0.X(0,-1657)+2,key=lives?'L':r;if(r===0&&!lives)x=Math.max(x,193);if(last[key]!=null)x=d===1?Math.max(x,last[key]+5):Math.min(x,last[key]-5);last[key]=x+d*w;
    const y=lives?105:RY[r]-R.su-R.U*T.pitch-2.2;s.rect(d===1?x-1.5:x-w-1.5,y-5.6,w+3,7.4,C.gold,{opacity:0.09,rx:1.2},'bg');s.text(x,y,txt,6,{text_anchor:d===1?'start':'end',fill:C.ink,font_weight:800,letter_spacing:0.4},'top')});
  [-1513,-997,-607,-537,29.75,33.235+6.5/9*0.025,70,1914.8].forEach(t=>{const r=A0.rowOf(t),x=X(r,t);s.path(`M${x-1.4} ${RY[r]-21}L${x+1.4} ${RY[r]-21}L${x} ${RY[r]-18.6}Z`,'none',0,{fill:C.violet},'top')})};
A0.drawArcs=s=>{const its=A0.items;
  const tg=its.filter(it=>it.zone==='J'&&it.ser.includes('m')).map(it=>it.x);let k=0;
  // hidden: round-robin targets drew links not stated in the data (R-human #1); restore once explicit prophecy→fulfilment pairs exist
  false&&its.filter(it=>it.r<2&&it.ser.includes('m')).forEach(it=>{const tx=tg[k++%tg.length],y=it.y;
    s.path(`M${it.x} ${y}C${it.x} ${y+60} ${tx} ${RY[2]-80} ${tx} ${RY[2]-21}`,C.green,0.45,{opacity:0.45},'arcs')});
  const src={'-632':'Nahum','-607':'Jeremiah','-539':'Isaiah','-537':'Jeremiah','-332':'Ezekiel'};
  Object.entries(src).forEach(([t,nm])=>{const p=A0.propPos[nm];if(!p)return;if(A0.loopOf(+t)>=0){const q=A0.pos(+t+0.5,0);s.path(`M${p.x} ${p.y}Q${A0.n((p.x+q[0])/2)} ${A0.n(Math.min(p.y,q[1])-6)} ${A0.n(q[0]+2)} ${A0.n(q[1]-2.5)}`,C.mag,0.5,{},'arcs');s.circ(q[0]+2,q[1]-2.5,0.8,C.mag,{},'arcs');return}const ex=X(1,+t),ey=RY[1]+21;
    s.path(`M${p.x} ${p.y}Q${(p.x+ex)/2} ${p.y+9} ${ex} ${ey+15}L${ex} ${ey}`,C.mag,0.5,{},'arcs');s.circ(ex,ey+15,0.8,C.mag,{},'arcs')})};
// ---------- the stone: cut out at the 1914 Kingdom station, arcs over and strikes at Armageddon
A0.drawStone=s=>{const x1=X(3,1914.8),y0=RY[3]-21,xa=205,ya=ly(3,0),c1=[x1,468],c2=[xa,468],p0=[x1,y0],p3=[xa,ya-4];
  const B=t=>{const u=1-t;return[0,1].map(k=>u*u*u*p0[k]+3*u*u*t*c1[k]+3*u*t*t*c2[k]+t*t*t*p3[k])};
  s.path(`M${p0[0]} ${p0[1]}C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${p3[0]} ${p3[1]}`,C.gold,0.7,{stroke_dasharray:'1.6 1.1'},'lines');
  const [sx,sy]=B(0.9),[bx,by]=B(0.84),ang=Math.atan2(sy-by,sx-bx);
  for(let k=-1;k<=1;k++){const ox=-Math.sin(ang)*k*1.6,oy=Math.cos(ang)*k*1.6;s.line(sx+ox-Math.cos(ang)*4,sy+oy-Math.sin(ang)*4,sx+ox-Math.cos(ang)*(10+Math.abs(k)*-3),sy+oy-Math.sin(ang)*(10+Math.abs(k)*-3),C.g2,0.35,{},'top')}
  const rock=[[-3,-1.6],[-1.2,-3],[1.8,-2.6],[3.2,-0.4],[2.4,2.4],[-0.6,3],[-2.8,1.8]].map(([a,b])=>`${A0.n(sx+a)} ${A0.n(sy+b)}`).join('L');
  s.path(`M${rock}Z`,C.ink,0.4,{fill:'#9c968a'},'top');s.path(`M${sx-1.6} ${sy-1.2}L${sx+0.4} ${sy-2}`,'#d9d4c8',0.5,{},'top');
  for(let k=0;k<10;k++){const a=k/10*Math.PI*2;s.line(xa+Math.cos(a)*3.4,ya+Math.sin(a)*3.4,xa+Math.cos(a)*(k%2?6:7.6),ya+Math.sin(a)*(k%2?6:7.6),C.gold,0.6,{},'top')}
  s.text(209,RY[3]-12.5,'ARMAGEDDON · Re 16:16',2.65,Object.assign({fill:C.ink,font_weight:800},HALO),'top');s.text(sx+4.5,sy+1,'THE STONE · Da 2:34, 44',2.6,Object.assign({fill:'#7a5a00',font_weight:800},HALO),'top');s.text(sx+4.5,sy+4,'cut out in 1914 → strikes at Armageddon',2.3,Object.assign({fill:'#7a5a00',font_weight:700},HALO),'top')};
// ---------- after Armageddon: rails fade, the gold line becomes the edge of a walking path into paradise
A0.drawFuture=s=>{const l='top';
  [[O.r,C.red,0.9,6],[O.n+1,C.blueN,1,12],[O.n-1,C.blueS,1,12],[O.h,C.ink,0.8,22]].forEach(([o,c,w,len])=>{const y=ly(3,o);for(let k=0;k<16;k++)s.line(205-len*k/16,y,205-len*(k+1)/16,y,c,w,{opacity:A0.n(1-(k+0.5)/16)},'lines')});
  const ga=ly(3,O.g),pieces=[[[205,ga],[150,ga],[112,575],[112,625]],[[112,625],[112,665],[125,700],[140,745]]];
  const G=[];pieces.forEach((pc,pi)=>{for(let k=pi?1:0;k<=40;k++){const t=k/40,u=1-t;G.push([0,1].map(j=>u*u*u*pc[0][j]+3*u*u*t*pc[1][j]+3*u*t*t*pc[2][j]+t*t*t*pc[3][j]))}});
  let L=[0];for(let i=1;i<G.length;i++)L.push(L[i-1]+Math.hypot(G[i][0]-G[i-1][0],G[i][1]-G[i-1][1]));const TL=L[L.length-1];
  const E=G.map((p,i)=>{const q=G[Math.min(i+1,G.length-1)],o=G[Math.max(i-1,0)],dx=q[0]-o[0],dy=q[1]-o[1],m=Math.hypot(dx,dy)||1,u=L[i]/TL,w=3.5+78*Math.pow(u,1.7);return[p[0]+dy/m*w,p[1]-dx/m*w]});
  const fillD=A0.pd(G)+'L'+E.slice().reverse().map(p=>A0.n(p[0])+' '+A0.n(p[1])).join('L')+'Z';
  s.path(fillD,'none',0,{fill:'url(#sand)'},'bg');s.path(A0.pd(E.filter(p=>p[1]<662)),'#b89b5e',0.5,{},'lines');s.path(A0.pd(G),C.gold,2.2,{},'lines');
  for(let i=6;i<G.length-1;i+=3){const m=[(G[i][0]+E[i][0])/2,(G[i][1]+E[i][1])/2],u=L[i]/TL,r=0.4+u*1.2;s.el('ellipse',{cx:m[0]+(i%2?-1:1)*u*6,cy:m[1],rx:r*1.3,ry:r*0.6,fill:'#cdb47e',opacity:0.6},'','bg')}
  const atY=(arr,y)=>{for(let i=1;i<arr.length;i++)if(arr[i][1]>=y){const a=arr[i-1],b=arr[i],t=(y-a[1])/((b[1]-a[1])||1);return[a[0]+(b[0]-a[0])*t,y]}return arr[arr.length-1]};
  const n=D.future.length,ys=D.future.map((_,i)=>587+i*(60/(n-1)));
  D.future.forEach(([t,sc],i)=>{const y=ys[i],g=atY(G,y),west=i%2===0,big=/^Great tribulation|^Thousand Year Reign begins|^Earthly resurrection/.test(t);A0.glyph(s,g[0],g[1],4,big,'st');
    const ref=sc;
    if(west){s.text(g[0]-(big?4.6:3.4),y+0.4,t,T.t2,Object.assign({text_anchor:'end',fill:C.ink,font_weight:big?800:600},HALO),l);s.text(g[0]-(big?4.6:3.4),y+3.6,ref,T.meta,Object.assign({text_anchor:'end',fill:C.g2},HALO),l)}
    else{const e=atY(E,y)[0]+2.5;s.line(g[0]+2,y,e-0.6,y,C.g3,0.25,{},'lead');s.text(e,y+0.4,t,T.t2,Object.assign({fill:C.ink,font_weight:big?800:600},HALO),l);s.text(e,y+3.6,ref,T.meta,Object.assign({fill:C.g2},HALO),l)}});
  const mid=[];for(let i=0;i<G.length;i++)if(G[i][1]>=ys[1]-2&&G[i][1]<=ys[9])mid.push([(G[i][0]*0.4+E[i][0]*0.6),(G[i][1]*0.4+E[i][1]*0.6)]);
  s.raw(`<path id="tyrPath" d="${A0.pd(mid)}" fill="none"/>`,'bars');s.path(A0.pd(mid),C.gold,4.2,{opacity:0.9,stroke_linecap:'round'},'bars');
  s.raw(`<text font-size="2.4" font-weight="800" fill="#fff"><textPath href="#tyrPath" startOffset="50%" text-anchor="middle">THOUSAND YEAR REIGN</textPath></text>`,'bars');
  const g0=X(3,2027.2),g1=X(3,2030);s.rect(g1,RY[3]+24.5,g0-g1,4.4,C.g1,{rx:0.6},'bars');s.text(g1+1,RY[3]+27.9,'Great tribulation',2.65,{fill:'#fff',font_weight:800},'bars');
  if(!(D.img||{}).paradise)s.rect(25,655,312,143,'url(#hatch)',{opacity:0.5},'bg');s.text(181,730,'PARADISE ARTWORK',4,{text_anchor:'middle',fill:C.g2,font_weight:800},'bg');
  A0.slots.push({id:'paradise',x:25,y:655,w:312,h:143,shape:'rect',fade:1,ph:'Paradise artwork: the path leads in here'});
  s.text(25,804,'PARADISE ON EARTH · Lu 23:43 · Re 21:3, 4',3.4,{fill:C.ink,font_weight:800},l);
};
// ---------- growth of publishers in the bed of row 4 (log scale, Indian numbering)
A0.drawGrowth=s=>{const top=RY[3]-19.5,bh=9.5,gx=t=>X(3,t),xL=gx(2026),xR=gx(1870);
  const bands=[['PEAK PUBLISHERS · log',D.growth,C.green,1e7,1,1918],['CONGREGATIONS',D.counts.cong,C.blueN,1.3e5,0,2020],['PIONEERS (avg.)',D.counts.pioneers,C.paul,1.8e6,0,2024],['BIBLE STUDIES (avg.)',D.counts.studies,C.mag,8e6,0,2020]];
  bands.forEach(([nm,data,col,vmax,lg,from],i)=>{const y0=top+i*(bh+0.5),yv=v=>y0+bh-(lg?Math.log10(v)/Math.log10(vmax):v/vmax)*bh;
    s.line(xL,y0+bh,xR,y0+bh,col,0.2,{opacity:0.5},'bed');s.text(xR-3,y0+3,nm,2.2,Object.assign({text_anchor:'end',fill:col,font_weight:800},HALO),'top');
    if(false){s.rect(gx(from),y0+0.5,gx(1919)-gx(from),bh-1,'url(#hatch)',{opacity:0.35},'bed');s.text((gx(from)+gx(1919))/2,y0+bh/2+0.8,'1919 → '+(from-1)+': awaiting research',2.2,{text_anchor:'middle',fill:C.g2,font_weight:700},'bed')}
    const pts=data.map(([t,v])=>[gx(t),yv(v)]);if(pts.length>1){s.path(A0.pd(pts)+`L${A0.n(pts[pts.length-1][0])} ${A0.n(y0+bh)}L${A0.n(pts[0][0])} ${A0.n(y0+bh)}Z`,'none',0,{fill:col,opacity:0.18},'bed');s.path(A0.pd(pts),col,0.5,{},'bed')}
    pts.forEach(p=>s.circ(p[0],p[1],0.45,col,{},'bed'));const L=data[data.length-1];
    s.text(gx(L[0])-2,y0+bh-1,L[1].toLocaleString('en-IN'),2.2,Object.assign({text_anchor:'end',fill:col,font_weight:800},HALO),'top')});
  const G=D.growth,y0=top,yv=v=>y0+bh-Math.log10(v)/7*bh;
  const cross=v=>{for(let i=1;i<G.length;i++)if(G[i][1]>=v){const[a,va]=G[i-1],[b,vb]=G[i];return a+(b-a)*(Math.log10(v)-Math.log10(va))/(Math.log10(vb)-Math.log10(va))}};
  [[1e5,'1 lakh'],[1e6,'10 lakh'],[5e6,'50 lakh']].forEach(([v,t])=>{const c=(G.find(g=>g[1]>=v)||[cross(v)])[0],x=gx(c),y=yv(v),txt=t+' · '+c,w=A0.tw(txt,2.2,1)+2;s.circ(x,y,0.8,C.green,{},'top');s.rect(x-w/2,y+3.4,w,3.4,C.paper,{stroke:C.green,stroke_width:0.3,rx:1.7},'top');s.text(x,y+5.8,txt,2.2,{text_anchor:'middle',fill:'#1d5c3a',font_weight:800},'top')});
};
// ---------- Daniel's beasts and symbols on the world-power line
A0.drawBeasts=s=>{const B=[[-575,'lion','Da 7:4','Babylon'],[-470,'ram','Da 8:20','Media and Persia'],[-430,'bear','Da 7:5','Medo-Persia'],[-300,'leopard','Da 7:6','Greece'],[-333,'goat','Da 8:21','Greece'],[60,'beast','Da 7:7','Rome'],[1900,'horn','Da 7:8','Britain']];
  B.forEach(([t,k,sc,nm])=>{const [x,y]=A0.pos(t,O.r),g=(d,f)=>s.path(d.replace(/(-?\d+\.?\d*) (-?\d+\.?\d*)/g,(m,a,b)=>A0.n(x+ +a)+' '+A0.n(y+ +b)),C.red,0.45,{fill:f||'none',stroke_linecap:'round'},'top');
    s.circ(x,y,3,C.paper,{stroke:C.red,stroke_width:0.5},'top');
    if(k==='lion'){s.circ(x,y,1,'none',{stroke:C.red,stroke_width:0.45},'top');for(let i=0;i<8;i++){const a=i*Math.PI/4;s.line(x+Math.cos(a)*1.3,y+Math.sin(a)*1.3,x+Math.cos(a)*2.2,y+Math.sin(a)*2.2,C.red,0.4,{},'top')}}
    else if(k==='bear'){s.circ(x,y+0.3,1.3,C.red,{},'top');s.circ(x-1,y-1,0.55,C.red,{},'top');s.circ(x+1,y-1,0.55,C.red,{},'top')}
    else if(k==='leopard'){s.circ(x,y,1.5,'none',{stroke:C.red,stroke_width:0.45},'top');[[-0.5,-0.4],[0.6,-0.2],[0,0.7]].forEach(([a,b])=>s.circ(x+a,y+b,0.35,C.red,{},'top'));g('M-2.4 -0.6 L-1.5 -0.2 M2.4 -0.6 L1.5 -0.2')}
    else if(k==='beast'){g('M-1.8 -0.6 L-1.2 0.8 L-0.6 -0.6 L0 0.8 L0.6 -0.6 L1.2 0.8 L1.8 -0.6');g('M-1.5 -1.2 L-1.5 -2 M-0.5 -1.2 L-0.5 -2.1 M0.5 -1.2 L0.5 -2.1 M1.5 -1.2 L1.5 -2')}
    else if(k==='ram'){g('M-0.3 -0.2 C-2 -1.8 -2.4 0.6 -1 0.8');g('M0.3 -0.2 C2 -1.8 2.4 0.6 1 0.8')}
    else if(k==='goat'){s.circ(x,y+0.8,0.9,C.red,{},'top');g('M0 0 L0 -2.2')}
    else if(k==='horn'){g('M-1.2 1.5 C-0.8 0 0.2 -1 1.3 -2 C0.9 -0.6 0.4 0.6 0.4 1.5 Z',C.red)}
    const up=y<ly(A0.rowOf(t),0)-0.5,ty=up?y-6.2:y+5.2;s.text(x,ty,sc,2.2,Object.assign({text_anchor:'middle',fill:C.red,font_weight:700},HALO),'top');s.text(x,ty+2.4,nm,2.1,Object.assign({text_anchor:'middle',fill:C.red},HALO),'top')})};
// ---------- the Bible's message in pictures (feathered image collage in the left gutter, inside the curve of the left turn)
A0.drawCollage=s=>{const l='top';s.text(25,302.5,'THE BIBLE’S MESSAGE IN PICTURES',3,{fill:C.ink,font_weight:800},l);
  [['Adam and Eve eat the fruit','Ge 3:6'],['Abraham','Ge 22:2'],['David','1Sa 17:50'],['Jesus baptized','Mt 3:16'],['Jesus dies','Joh 19:30'],['1914 · the Kingdom','Re 12:10'],['The future','Re 21:4']].map(([t,sc],i)=>[i%2?86:42,320+i*16.6,13,t,sc]).forEach(([x,y,r,t,sc],i)=>{
    s.circ(x,y,r,'url(#feather)',{},'bg');s.text(x,y+r+2.4,t,2.4,Object.assign({text_anchor:'middle',fill:C.ink,font_weight:800},HALO),l);s.text(x,y+r+5,sc,2.2,Object.assign({text_anchor:'middle',fill:C.g2},HALO),l);
    A0.slots.push({id:'story-'+(i+1),x:x-r,y:y-r,w:2*r,h:2*r,shape:'rect',feather:1,ph:t})})};
// ---------- Daniel 2: the image, small, with the kingdoms
A0.drawDaniel2=s=>{const l='top',cx=36;s.text(25,444,'DANIEL 2 · THE IMAGE AND THE STONE',3,{fill:C.ink,font_weight:800},l);
  s.el('ellipse',{cx,cy:455,rx:4.6,ry:5.6,fill:C.au,stroke:C.ink,stroke_width:0.3},'',l);
  s.path('M29.5 461.5L42.5 461.5L44 473L28 473Z',C.ink,0.3,{fill:C.ag},l);s.rect(25.5,462,3,13,C.ag,{stroke:C.ink,stroke_width:0.3,rx:1},l);s.rect(43.5,462,3,13,C.ag,{stroke:C.ink,stroke_width:0.3,rx:1},l);
  s.path('M29 474L43 474L41.5 486L30.5 486Z',C.ink,0.3,{fill:C.cu},l);
  s.rect(31,487,4.2,26,C.fe,{stroke:C.ink,stroke_width:0.3},l);s.rect(36.8,487,4.2,26,C.fe,{stroke:C.ink,stroke_width:0.3},l);
  s.rect(29.5,513.5,6.4,5,'url(#clay)',{stroke:C.ink,stroke_width:0.3,rx:0.6},l);s.rect(36.1,513.5,6.4,5,'url(#clay)',{stroke:C.ink,stroke_width:0.3,rx:0.6},l);
  s.circ(50,515,3,'#9c968a',{stroke:C.ink,stroke_width:0.3},l);[0,1,2].forEach(k=>s.line(52+k*0.4,511-k*1.6,57+k,507-k*1.8,C.g2,0.3,{},l));for(let k=0;k<6;k++){const a=k/6*Math.PI*2;s.line(44+Math.cos(a)*1.5,516+Math.sin(a)*1.5,44+Math.cos(a)*3,516+Math.sin(a)*3,C.gold,0.4,{},l)}
  const rows=[[C.au,'Head · gold','Babylon','607 → 539 B.C.E.','Da 2:37, 38',455],[C.ag,'Breast, arms · silver','Medo-Persia','539 → 331 B.C.E.','Da 2:39',467],[C.cu,'Belly, thighs · copper','Greece','331 → 30 B.C.E.','Da 2:39',480],[C.fe,'Legs · iron','Rome','from 30 B.C.E.','Da 2:40',497],[C.clay,'Feet · iron + clay','Anglo-America','from 1914–18 → Armageddon','Da 2:41-43',514],['#9c968a','Stone','God’s Kingdom','1914 → crushes the image at Armageddon; stands forever','Da 2:44, 45',526]];
  rows.forEach(([c,part,k,span,sc,y])=>{if(y>520)s.path(`M52.4 517.4L56 ${y-1}H60`,C.g4,0.2,{},l);else s.line(y>=510?54.5:{455:41,467:47,480:43,497:41.5}[y]||47.5,y-1,60,y-1,C.g4,0.2,{},l);s.rect(61,y-3.4,2.6,2.6,c,{stroke:C.ink,stroke_width:0.2},l);s.text(65,y-1,k,2.9,{fill:C.ink,font_weight:800},l);s.text(65+A0.tw(k,2.9,1)+1.5,y-1,'· '+part,2.3,{fill:C.g1},l);s.text(65,y+2.1,span+' · '+sc,2.3,{fill:'#8a5f00',font_weight:700},l)})};
// ---------- Israel's calendar wheel (NWT App. B15)
A0.drawCalendar=s=>{const l='top',cx=106,cy=246,r0=9,r1=15,r2=27;s.text(25,200,'ISRAEL’S YEAR',3.6,{fill:C.ink,font_weight:800},l);s.text(25,204,'months · seasons · festivals · harvests · NWT App. B15',2.4,{fill:C.g2},l);
  const arc=(a0,a1,ri,ro)=>{const p=(r,a)=>[cx+r*Math.cos(a),cy+r*Math.sin(a)].map(A0.n).join(' ');return `M${p(ro,a0)}A${ro} ${ro} 0 0 1 ${p(ro,a1)}L${p(ri,a1)}A${ri} ${ri} 0 0 0 ${p(ri,a0)}Z`};
  D.cal.slice(0,12).forEach(([nm,alt,gr,fe,wx,crop],i)=>{const a0=-Math.PI/2+i*Math.PI/6-Math.PI/12,a1=a0+Math.PI/6,am=(a0+a1)/2,dry=i>=1&&i<=5;
    s.path(arc(a0,a1,r1,r2),'#fff',0.4,{fill:dry?'#ecdcb0':'#cfdde3'},l);s.path(arc(a0,a1,r0,r1),'#fff',0.4,{fill:dry?'#f5ead0':'#e3ecef'},l);
    s.text(cx+21*Math.cos(am),cy+21*Math.sin(am)+0.8,nm.length>7?nm.slice(0,4)+'.':nm,2.2,{text_anchor:'middle',fill:C.ink,font_weight:800},l);
    fe.forEach(([d],j)=>{const a=a0+(d-0.5)/30*(a1-a0),rr=r1+[0,1.7,-1.7][j%3];s.circ(cx+rr*Math.cos(a),cy+rr*Math.sin(a),0.8,C.gold,{stroke:'#7a5a00',stroke_width:0.25},l)});
    const right=Math.cos(am)>0.15,left=Math.cos(am)<-0.15,shift=[1,11,5,7].includes(i)?(right?7:-7):0,lx=cx+(r2+3)*Math.cos(am)+shift,ly2=cy+(r2+3)*Math.sin(am);let anc=right?'start':left?'end':'middle',oy=i===0?-12:i===6?5.5:Math.sin(am)<-0.5?-6.5:Math.sin(am)>0.5?2.4:-1.6;if(anc!=='middle'&&fe.length&&Math.sin(am)>0.3&&A0.tw([crop,wx].filter(Boolean).join(' · '),2.2)>40)oy-=2.6;
    s.text(lx,ly2+oy,`${nm}${alt?' ('+alt+')':''} · ${gr}`,2.3,Object.assign({text_anchor:anc,fill:C.ink,font_weight:800},HALO),l);
    const cl=[crop,wx].filter(Boolean).join(' · '),wr=anc!=='middle'&&A0.tw(cl,2.2)>40,cls=wr?[crop,wx]:[cl];cls.forEach((t,j)=>s.text(lx,ly2+oy+2.8+j*2.6,t,2.2,Object.assign({text_anchor:anc,fill:C.g1},HALO),l));
    if(fe.length)s.text(lx,ly2+oy+5.4+(cls.length-1)*2.6,fe.map(f=>{const m=f[1].match(/^(.*) (\d+(?:[–-]\d+|, \d+))$/);return m?m[2]+' '+m[1]:f[0]+' '+f[1]}).join(' · '),2.2,Object.assign({text_anchor:anc,fill:'#7a5a00',font_weight:700},HALO),l)});
  s.circ(cx,cy,r0,C.paper,{stroke:C.g3,stroke_width:0.3},l);s.text(cx,cy-0.6,'SACRED',1.9,{text_anchor:'middle',fill:C.g1,font_weight:800},l);s.text(cx,cy+1.8,'YEAR',1.9,{text_anchor:'middle',fill:C.g1,font_weight:800},l);
  s.rect(25,207,4,3,'#ecdcb0',{},l);s.text(30.5,209.6,'dry season',2.2,{fill:C.g1},l);s.rect(25,211.5,4,3,'#cfdde3',{},l);s.text(30.5,214.1,'rainy season',2.2,{fill:C.g1},l);s.circ(27,217.5,0.8,C.gold,{stroke:'#7a5a00',stroke_width:0.25},l);s.text(30.5,218.6,'festival day',2.2,{fill:C.g1},l);s.text(25,223,'Veadar: added 7 times',2.2,{fill:C.g2},l);s.text(25,225.8,'in 19 years',2.2,{fill:C.g2},l)};
// ---------- opening: the Creator on his throne, light, six creative days, the gold line comes out of the light
A0.drawTop=s=>{const l='top',cx=50,cy=50;
  s.circ(cx,cy,72,'url(#glow)',{},'bg');
  const R=A0.rng(5);for(let k=0;k<44;k++){const a=k/44*Math.PI*2,r1=28,r2=Math.min(40+R()*20,Math.sin(a)>0.1?44/Math.sin(a):99,Math.cos(a)>0.5?40:99);s.line(cx+Math.cos(a)*r1,cy+Math.sin(a)*r1,cx+Math.cos(a)*r2,cy+Math.sin(a)*r2,C.gold,k%2?0.35:0.6,{opacity:A0.n(0.25+R()*0.3)},'bg')}
  if(!(D.img||{}).throne)s.circ(cx,cy,26,'url(#hatch)',{stroke:C.gold,stroke_width:0.8},'bg');s.text(cx,cy+1,'THRONE',2.6,{text_anchor:'middle',fill:C.g2,font_weight:800},'bg');
  A0.slots.push({id:'throne',x:cx-26,y:cy-26,w:52,h:52,shape:'circle',ph:'Throne'});
  s.text(cx,84,'JEHOVAH, THE CREATOR',4,Object.assign({text_anchor:'middle',fill:'#7a5a00',font_weight:800},HALO),l);s.text(cx,88.4,'Ps 90:2 · Re 4:11',2.6,Object.assign({text_anchor:'middle',fill:C.g2},HALO),l);
  const HY=40,HX=[94,120,146,172],DY=112,DX=[170,144,118,92,66,40],ga=ly(0,O.g),xs=cx+Math.sqrt(26*26-(HY-cy)*(HY-cy));
  const d=`M${A0.n(xs)} ${HY}L180 ${HY}Q188 ${HY} 188 ${HY+8}L188 ${DY-8}Q188 ${DY} 180 ${DY}L34 ${DY}Q26 ${DY} 26 ${DY+8}L26 ${A0.n(ga-8)}Q26 ${A0.n(ga)} 34 ${A0.n(ga)}L190 ${A0.n(ga)}`;
  s.path(d,C.gold,6,{opacity:0.22,stroke_linejoin:'round'},'lines');s.path(d,C.gold,2.2,{stroke_linejoin:'round'},'lines');
  const med=(x,y,id,ph)=>{s.circ(x,y,7,'url(#hatch)',{stroke:C.gold,stroke_width:0.7},'st');A0.slots.push({id,x:x-7,y:y-7,w:14,h:14,shape:'circle',ph})};
  const lab3=(x,y,a,b,c)=>{s.text(x,y,a,2.65,Object.assign({text_anchor:'middle',fill:'#7a5a00',font_weight:800},HALO),l);s.text(x,y+3.1,b,2.4,Object.assign({text_anchor:'middle',fill:C.ink},HALO),l);s.text(x,y+6,c,2.3,Object.assign({text_anchor:'middle',fill:C.g2},HALO),l)};
  D.pre.forEach(([a,b,c],i)=>{med(HX[i],HY,'pre-'+(i+1),a);lab3(HX[i],HY+11,a,b,c)});
  D.creation.forEach(([nm,sc],i)=>{med(DX[i],DY,'creation-day-'+(i+1),'Day '+(i+1));lab3(DX[i],DY+11,'DAY '+(i+1),nm,sc)});
  [[188,76],[105,DY],[26,150]].forEach(([x,y],k)=>{const dir=k===0?[0,1]:k===1?[-1,0]:[0,1];s.path(`M${x-dir[0]*1.4-dir[1]*1.6} ${y-dir[1]*1.4+dir[0]*1.6}L${x+dir[0]*0.6} ${y+dir[1]*0.6}L${x-dir[0]*1.4+dir[1]*1.6} ${y-dir[1]*1.4-dir[0]*1.6}`,'#7a5a00',0.5,{},'lines')});
  if(!(D.img||{}).eden)s.rect(36,135,146,41,'url(#hatch)',{rx:3,opacity:0.6},'bg');s.text(36,ga-2.2,'THE GARDEN OF EDEN · Ge 2:8',2.65,Object.assign({fill:'#7a5a00',font_weight:800},HALO),l);s.text(109,157,'THE GARDEN OF EDEN',3,{text_anchor:'middle',fill:C.g2,font_weight:800},'bg');
  A0.slots.push({id:'eden',x:36,y:135,w:146,h:41,shape:'rounded',ph:'The garden of Eden · Ge 2:8'});
  s.text(182,ga-2.2,'Day 7 · God rests · still continuing · Ge 2:1-3; Heb 4:1-11 →',2.65,Object.assign({text_anchor:'end',fill:'#7a5a00',font_weight:700},HALO),l);
  s.text(200,40,'FROM EDEN TO THE KINGDOM',15,{fill:C.ink,font_weight:800,letter_spacing:-0.2},l);
  s.text(200,48,'Bible history and the modern history of Jehovah’s Witnesses · Creation → 2026 → the future',3.5,{fill:C.g1},l);
  s.text(200,58,'Follow the gold line, the promised offspring, from Eden to the Kingdom and into paradise.',3.5,{fill:C.ink,font_weight:700},l);
  s.text(200,63,'Each row is one chapter. Read it in the direction of the arrows; the turns carry you on, and hold events of their own.',3.2,{fill:C.g1},l);
  s.text(200,68,'Near: every label shows its reference, the date as printed in the source, and a key scripture.',3.2,{fill:C.g1},l);
  const px=640,py=24,pw=525,ph=72;s.rect(px,py,pw,ph,C.card,{stroke:C.g4,stroke_width:0.4,rx:1.5},'bg');
  s.text(px+5,py+7,'THE GOOD NEWS IN EVERY LAND AND LANGUAGE',4,{fill:C.ink,font_weight:800},l);s.text(px+5,py+11.5,'Mt 24:14 · solid points: jw.org reports (confirmed) · hollow = approximate · source: jw.org Service Year Reports and Yearbooks',2.65,{fill:C.g2},l);
  const fmt=v=>v>=1e7?(v/1e7).toFixed(2)+' crore':v>=1e5?(v/1e5).toFixed(v>=1e6?1:2)+' lakh':v.toLocaleString('en-IN');
  const mini=(x,y,w,h,t0,t1,data,col,title,vmax,pend,logv)=>{if(data.length)t0=data[0][0];const fx=t=>x+(t-t0)/(t1-t0)*w,fy=v=>logv?y+h-Math.log10(Math.max(v,1))/Math.log10(vmax)*h:y+h-v/vmax*h;
    s.text(x,y-1.8,title,3,{fill:C.ink,font_weight:800},l);s.line(x,y+h,x+w,y+h,C.g3,0.3,{},l);
    const P=data.map(([t,v])=>[fx(t),fy(v)]);for(let i=1;i<P.length;i++)s.line(P[i-1][0],P[i-1][1],P[i][0],P[i][1],col,0.8,data[i][0]-data[i-1][0]>5?{stroke_dasharray:'1 1',opacity:0.6}:{stroke_linecap:'round'},l);
    const dr=data.length>30?0.5:0.8;data.forEach(([t,v,u])=>s.circ(fx(t),fy(v),dr,u?C.paper:col,{stroke:col,stroke_width:0.3},l));
    const L=data[data.length-1];s.text(x+w,y-1.8,(L[2]?'≈':'')+fmt(L[1])+' · '+Math.floor(L[0]),3.2,{text_anchor:'end',fill:col,font_weight:800},l);
    [t0,t1].forEach((tt,i)=>s.text(i?x+w:x,y+h+3,String(Math.round(tt)),2.4,{text_anchor:i?'end':'start',fill:C.g1},l))};
  const cw=160,chh=17.5,gx=[px+6,px+6+cw+11,px+6+2*(cw+11)],gy=[py+21,py+49];
  mini(gx[0],gy[0],cw,chh,1919,2026,D.counts.memorial,C.mag,'Memorial attendance',2.4e7,2020);
  mini(gx[1],gy[0],cw,chh,1919,2026,D.counts.lands,C.blueN,'Lands reporting',260,2020);
  mini(gx[2],gy[0],cw,chh,1919,2026,D.counts.baptized,C.green,'Baptized per year',4.2e5,2024);
  mini(gx[0],gy[1],cw,chh,1950,2027,D.langNWT,C.exo,'New World Translation · languages',400);
  mini(gx[1],gy[1],cw,chh,2012,2026,D.langWeb,C.paul,'jw.org · languages with content',1200);
  mini(gx[2],gy[1],cw,chh,1919,2026,D.counts.branches,C.g1,'Branch offices',120,2024);
};
})();
