// alt-B "Illustrated story": feathered medallions in free space, faint era words, motifs, grain.
(function(){const P='../../../../private/images/';
// future order from data/merged/timeline.json (future.prophecy by sort_key; duplicates b12-0119/0120/0121 merged)
A0.FUT=[['“Peace and security!”','1Th 5:3'],['Final sealing of the anointed','Re 7:1-3'],['Attack on Babylon the Great','Re 17:16'],['Attack “cut short”','Mt 24:22'],['Signs in sun, moon and stars','Mt 24:29'],['Sign of the Son of man; sheep and goats','Mt 24:30'],['Attack by Gog of Magog','Eze 38:10-12'],['Remaining anointed gathered','Mt 24:31'],['War of Armageddon','Re 16:14, 16'],['Marriage of the Lamb','Re 19:9'],['Satan and the demons abyssed','Re 20:1-3'],['Thousand Year Reign begins','Re 20:4, 6'],['Earthly resurrection','Ac 24:15'],['New scrolls opened','Re 20:12, 13'],['Christ hands the Kingdom to God','1Co 15:24-28'],['Satan released; the final test','Re 20:7-9'],['Satan, demons and rebels destroyed','Re 20:10']];
// [cx,cy,diam,image|null,name,scripture]
const M=[
 [455,60,32,'story-1.jpg','Eden · the promise','Ge 3:15'],[525,60,32,'story-2.jpg','Abraham · the seed','Ge 22:18'],[595,60,32,'story-4.jpg','Jesus · the Seed','Ga 3:16'],
 [300,81,18,'ev-adam-created.jpg','Adam','Ge 2:7'],[335,81,18,null,'Noah','Ge 6:9'],[370,81,18,null,'Sarah','Ge 17:15, 16'],
 [528,121,28,null,'Burning bush','Ex 3:2'],[562,121,28,null,'Ten plagues','Ex 7–12'],[596,121,28,'ai/ev-red-sea-crossing.png','Red Sea','Ex 14:21, 22'],[630,121,28,'ai/p-moses.png','Moses','Ex 3:10'],
 [935,116,24,null,'Samuel','1Sa 3:19'],[965,116,24,'ev-saul-dies.jpg','Saul','1Sa 10:24'],[995,116,24,'story-3.jpg','David','2Sa 5:3'],[1025,116,24,'ev-queen-of-sheba.jpg','Solomon','1Ki 10:1'],
 [212,262,30,'ev-the-flood.jpg','The Flood','Ge 7:11'],[252,262,30,null,'Tower of Babel','Ge 11:9'],
 [1120,385,48,'ev-daniel-in-the-lions-pit.jpg','Daniel in Babylon','Da 6:22'],
 [910,230,26,null,'Elijah','1Ki 18:36'],[1140,470,28,null,'Esther','Es 4:14']];
A0.drawStory=s=>{
 s.rect(0,0,1189,841,'#8a7350',{filter:'url(#grain)',opacity:0.05},'bg');
 [['PROMISE',525,92,24],['EXODUS',580,140,20],['KINGDOM',980,134,16],['EXILE',1120,425,18],['1,000',180,790,40]].forEach(([t,x,y,f])=>s.text(x,y,t,f,{text_anchor:'middle',fill:'#c99512',opacity:0.06,font_weight:800,letter_spacing:2},'bg'));
 // motifs: waves near the Flood, stars near Abraham
 for(let k=0;k<4;k++)s.path(`M185 ${280+k*3.5}q6 -2.5 12 0t12 0t12 0t12 0t12 0t12 0`,'#c99512',0.3,{opacity:0.16},'bg');
 [[500,36],[548,40],[570,34],[485,44]].forEach(([x,y])=>s.path(`M${x} ${y-2}L${x+0.6} ${y-0.6}L${x+2} ${y}L${x+0.6} ${y+0.6}L${x} ${y+2}L${x-0.6} ${y+0.6}L${x-2} ${y}L${x-0.6} ${y-0.6}Z`,'#c99512',0.25,{opacity:0.2},'bg'));
 s.text(525,38,'THE PROMISE THAT RUNS THROUGH THE WHOLE BIBLE · Ge 3:15',3.2,{text_anchor:'middle',fill:'#6e4a12',font_weight:800,letter_spacing:0.3},'top');
 M.forEach(([x,y,d,im,nm,sc],i)=>{const r=d/2;
  s.circ(x,y,r,'url(#vigW)',{},'bg');
  if(im)A0.slots.push({id:'st-'+i,x:x-r,y:y-r,w:d,h:d,shape:'circle',feather:1,story:P+im,ph:nm+' · '+sc});
  else{s.text(x,y+0.4,nm,Math.min(3.2,d/7),{text_anchor:'middle',fill:'#5b4a2e',font_weight:800},'top');s.text(x,y+3.8,sc,2.65,{text_anchor:'middle',fill:'#7d6a4a'},'top')}
  if(im){s.text(x,y+r+3.2,nm,2.9,{text_anchor:'middle',fill:'#3d3c39',font_weight:700},'top');s.text(x,y+r+6.2,sc,2.65,{text_anchor:'middle',fill:'#6e6c67'},'top')}});
};})();
