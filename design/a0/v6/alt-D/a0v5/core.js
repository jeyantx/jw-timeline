(function(){
const A0=window.A0={};
const C=A0.C={ink:'#1d1d1b',g1:'#3d3c39',g2:'#6e6c67',g3:'#a3a19b',g4:'#c8c6bf',g5:'#e2e0d9',paper:'#f7f6f2',card:'#fbfaf7',
  bible:'#ebe6da',church:'#f0ede6',modern:'#e6e2d8',future:'#f5f1e6',sea:'#dfe5e6',land:'#efede6',
  gold:'#c99512',red:'#a9564a',blueN:'#45698f',blueS:'#a3bcd3',violet:'#7b6290',green:'#2e8b57',sepia:'#8a5a2b',mag:'#b0307a',wheat:'#c4a75c',weeds:'#77726a',
  au:'#d9a520',ag:'#b6bac0',cu:'#b8733a',fe:'#6c7077',clay:'#a8805c',
  abr:'#8a5a2b',exo:'#16857f',paul:'#d0702a',jes:'#2e8b57'};
A0.F="'Noto Sans',sans-serif";
const n=v=>Math.round(v*100)/100;A0.n=n;
const esc=A0.esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function attrs(o){let s='';for(const k in o){const v=o[k];if(v==null||v===false)continue;s+=` ${k.replace(/_/g,'-')}="${typeof v==='number'?n(v):v}"`}return s}
A0.SVG=class{
  constructor(){this.L={bg:[],bed:[],arcs:[],lines:[],bars:[],lead:[],st:[],lab:[],top:[]};this.cur='lab'}
  to(l){this.cur=l;return this}
  raw(s,l){this.L[l||this.cur].push(s);return this}
  el(t,o,inner,l){return this.raw(`<${t}${attrs(o)}>${inner||''}</${t}>`,l)}
  rect(x,y,w,h,fill,o={},l){return this.el('rect',Object.assign({x,y,width:Math.max(0,w),height:Math.max(0,h),fill},o),'',l)}
  line(x1,y1,x2,y2,stroke,w=0.3,o={},l){return this.el('line',Object.assign({x1,y1,x2,y2,stroke,stroke_width:w},o),'',l)}
  path(d,stroke,w=0.3,o={},l){return this.el('path',Object.assign({d,stroke,stroke_width:w,fill:'none'},o),'',l)}
  circ(cx,cy,r,fill,o={},l){return this.el('circle',Object.assign({cx,cy,r,fill},o),'',l)}
  text(x,y,t,fs,o={},l){return this.el('text',Object.assign({x,y,font_size:fs},o),esc(t),l)}
  out(){return Object.values(this.L).map(a=>a.join('')).join('')}
};
const _twc={};let _ctx=null;try{_ctx=document.createElement('canvas').getContext('2d')}catch(e){}
A0.tw=(t,fs,b)=>{t=String(t);if(!A0.fontsOK||!_ctx)return t.length*fs*(b?0.57:0.51);const k=t+'|'+fs+'|'+(b?1:0);let v=_twc[k];if(v==null){_ctx.font=`${b?800:400} 100px "Noto Sans"`;v=_twc[k]=_ctx.measureText(t).width/100*fs*1.02}return v};
// ---- type sizes (mm): 9pt / 11pt / 7.5pt
A0.T={t2:3.175,t1:4.2,meta:2.65,pitch:7.4};
// ---- layout
const XL=A0.XL=190,XR=A0.XR=1035,RY=A0.RY=[180,305,430,555];
const ROWS=A0.ROWS=[
  {t0:-4026,t1:-1200,dir:1,map:[[-4026,190],[-2370,300],[-1657,560],[-1513,680],[-1512,750],[-1473,795],[-1200,1035]],su:19,U:5,sd:29,D:3,
    name:'ROW 1 · 4026–1200 B.C.E. · turn: last judges and the united kingdom 1200–997',scale:'4026–2370 at 1 mm ≈ 15 yrs · 2370–1657 at 2.7 yrs · 1657–1513 at 1.2 yrs · Exodus year 1513 at 4 days · wilderness at 0.8 yr · judges in order only · turn ≈ 1.1 mm per year'},
  {t0:-997,t1:-332,dir:-1,map:[[-997,1035],[-607,590],[-537,475],[-443,330],[-332,190]],su:34,U:4,sd:37.5,D:4,
    name:'ROW 2 · 997–332 B.C.E. ← · turn: 332–2 B.C.E.',scale:'997–607 at 1 mm ≈ 0.83 yr · exile at 0.58 yr · return at 0.63 yr · 443–332 at 0.8 yr · turn ≈ 2.4 yrs per mm'},
  {t0:-2,t1:1700,dir:1,map:[[-2,190],[29.7,215],[30.25,300],[31.25,385],[32.25,470],[33.235,555],[33.26,640],[100,800],[1700,1035]],su:19,U:5,sd:32,D:4,
    name:'ROW 3 · 2 B.C.E.–1700 C.E. · turn: 1700–1870',scale:'ministry by Passover year (1 mm ≈ 4 days) · final week 1 mm ≈ 2.6 hours · 33–100 at 1 mm ≈ 4.5 months · 100–1700 at 6.3 yrs · turn ≈ 1.2 yrs per mm'},
  {t0:1870,t1:2030,dir:-1,map:[[1870,1035],[1914,895],[2026,300],[2030,205]],su:30,U:4,sd:30,D:4,
    name:'ROW 4 · 1870–2026 → future ←',scale:'1870–1914 at 1 mm ≈ 3.3 months · 1914–2026 at 2.1 months (one decade = 57 mm) · future in order only'}];
function interp(a,v){if(v<=a[0][0])return a[0][1];for(let i=1;i<a.length;i++)if(v<=a[i][0]){const[t0,x0]=a[i-1],[t1,x1]=a[i];return x0+(x1-x0)*(v-t0)/(t1-t0)}return a[a.length-1][1]}
A0.interp=interp;
A0.LOOPS=[{r:0,a:-1200,b:-997},{r:1,a:-332,b:-2},{r:2,a:1700,b:1870}];
A0.rowOf=t=>t<-997?0:t<-2?1:t<1870?2:3;
A0.loopOf=t=>A0.LOOPS.findIndex(L=>t>L.a&&t<L.b);
A0.X=(r,t)=>interp(ROWS[r].map,t);
A0.ly=(r,o)=>RY[r]+ROWS[r].dir*(o||0);
// bundle offsets per series
A0.O={h:0,g:3.5,c:6.5,r:-4,n:-9,v:11,v2:15,w:-13,wd:-16};
// path that follows the metro (rows + turn loops) between two times at offset o
A0.pos=(t,o)=>{o=o||0;const L=A0.loopOf(t);if(L<0){const r=A0.rowOf(t);return[A0.X(r,t),A0.ly(r,o),0,ROWS[r].dir,r,-1]}
  const Lp=A0.LOOPS[L],r=Lp.r,s=ROWS[r].dir,cx=s===1?XR:XL,y1=A0.ly(r,o),y2=A0.ly(r+1,o),cy=(y1+y2)/2,rr=(y2-y1)/2,u=(t-Lp.a)/(Lp.b-Lp.a),an=-Math.PI/2+Math.PI*u;
  return[cx+s*rr*Math.cos(an),cy+rr*Math.sin(an),-s*Math.cos(an),-Math.sin(an),r,L]};
A0.track=(t0,t1,o)=>{const P=[];for(let r=0;r<4;r++){const R=ROWS[r],a=Math.max(t0,R.t0),b=Math.min(t1,R.t1);
  if(b>=a)P.push([A0.X(r,a),A0.ly(r,o)],[A0.X(r,b),A0.ly(r,o)]);
  if(r<3){const L=A0.LOOPS[r],la=Math.max(t0,L.a),lb=Math.min(t1,L.b);if(lb>la)for(let k=0;k<=24;k++){const p=A0.pos(la+(lb-la)*k/24+(k===0?1e-6:k===24?-1e-6:0),o);P.push([p[0],p[1]])}}}
  return P};
A0.loopPath=(r,o)=>{const R=ROWS[r],s=R.dir,cx=s===1?XR:XL,y1=A0.ly(r,o),y2=A0.ly(r+1,o),rr=(y2-y1)/2;return `M${cx} ${n(y1)}A${n(rr)} ${n(rr)} 0 0 ${s===1?1:0} ${cx} ${n(y2)}`};
A0.pd=P=>'M'+P.map(p=>n(p[0])+' '+n(p[1])).join('L');
A0.Packer=class{constructor(){this.l={}}
  free(k,a,b){return !(this.l[k]||[]).some(([p,q])=>a<q&&b>p)}
  take(k,a,b){(this.l[k]=this.l[k]||[]).push([a,b])}};
A0.laneTop=(r,up,k)=>{const R=ROWS[r];return up?RY[r]-R.su-(k+1)*A0.T.pitch:RY[r]+R.sd+k*A0.T.pitch};
A0.rng=s=>()=>{s=(s*16807)%2147483647;return(s-1)/2147483646};
A0.fmtY=t=>t<0?`${Math.round(-t)} B.C.E.`:`${Math.round(t)} C.E.`;
})();
