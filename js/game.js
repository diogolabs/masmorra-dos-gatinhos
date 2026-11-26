/* Motor do jogo: mapa, combate, desafios, provas, boletim e menus. Depende de js/questions.js. */

/* ================= ARTE EM PIXEL ================= */
const PAL={k:'#1a1220',w:'#f4efe6',p:'#f29cb0',e:'#7be07b',y:'#f2c14e',g:'#a9b3c4',G:'#6b7487',r:'#d9434f',n:'#8a5a3b',N:'#5c3a26',s:'#8fdc6a',S:'#4f9e45',h:'#ffffff',v:'#7a4fa0',x:'#2e2438',c:'#e8e2d0',C:'#b9b09a',t:'#7fe3ec',T:'#c8f6fa',m:'#b0732f',M:'#7a4b1c',b:'#6aa6e8',B:'#3d6fb3',u:'#e9d8a6',U:'#b89b5e',o:'#e8833a',O:'#b85a1e'};
const SPR={
hero:["..kk........kk..",".kOok......koOk.",".kopok....kopok.",".koooookkoooook.",".kooooooooooook.",".koekooooooekok.",".koooooppoooook.","..kooowkkwoook..","...kkooooookk...","..kgGggyyggGgk..","..kgggyyyygggkok","..kgGggyyggGgkk.","..kooOk..kOook..","..kwwk....kwwk..","...kk......kk..."],
rat:["..kk............",".kpnk...........",".knnnkkkkkk.....","knrnnnnnnnnnk...","knnnnnnnnnnnnk..","pknnnnnnnnnnnk..",".kkknnnnnnnnk.kk","...knk.kknk.kpk.","...kk...kk..kk.."],
bat:["kk............kk","kvk...k..k...kvk","kvvk..kvvk..kvvk","kvvvkkvvvvkkvvvk","kvvvvvrvvrvvvvvk",".kvvvvvvvvvvvvk.","..kvk.kvvk.kvk..","...k...kk...k..."],
slime:["......kkkk......","....kkskssk.....","...kshhsssssk...","..ksshsssssssk..","..kssksssskssk..",".ksssssssssssSk.",".kSssssssssSSSk.","..kkkkkkkkkkkk.."],
spider:[".k....kkkk....k.","..k..kxxxxk..k..","k..kkxxxxxxkk..k",".kk.kxrxxrxk.kk.","...kkxxxxxxkk...",".kk.kxxvvxxk.kk.","k..k.kxxxxk.k..k","..k...kkkk...k..",".k............k."],
ghost:["......kkkk......","....kkttttkk....","...kttttttttk...","..kttttttttttk..","..ktkkttttkktk..","..ktkkttttkktk..","..kttttkkttttk..","..kttttttttttk..","..ktTttttttTtk..","..kttttttttttk..","..kktkktkktkk...","..k..k..k..k...."],
skel:["..kk............",".kcck...........","kcxccckk........","kcccccccck..kk..",".kkkkcccckkkcck.","....kcCcCcCcck..","....kcCcCcCcck..",".....kckkkkck...",".....kck..kck...",".....kk...kk...."],
owl:["....kkkkkkkk....","..kkxxxxxxxxkk..","....kkxxxxkk.y..","...knnkkkknnk.y.","..knnnnnnnnnnk..","..kwwkwnnwkwwk..","..kwykwnnwkywk..","..kwwwknnkwwwk..","..knnnnyynnnnk..",".knNnnnynnnnNnk.",".knNnwwwwwwnNnk.",".knNnwnwnwwnNnk.","..knnwwwwwwnnk..","...kkyykkyykk..."],
chest:["..kkkkkkkkkkkk..",".kmmmmmmmmmmmmk.",".kmMMMMMMMMMMmk.",".kkkkkkyykkkkkk.",".kmmmmkyykmmmmk.",".kmmmmmkkmmmmmk.",".kMmmmmmmmmmmMk.",".kkkkkkkkkkkkkk."],
altar:["......kkkk......",".....kggggk.....","....kgGttGgk....","....kgtGGtgk....","....kgGttGgk....","....kggtggGk....","....kgGggGgk....","....kggGgggk....","...kkGgggggkk...","..kgggggggggGk..","..kGGGGGGGGGGk..","..kkkkkkkkkkkk.."],
potion:["......kkk.......","......kmk.......",".....kkkkk......","....krrhrrk.....","...krrrrhrrk....","...krrrrrrrk....","...krrrrrrrk....","....krrrrrk.....",".....kkkkk......"],
fish:["....kkkkkk..kk..","...kbbbbbbkkbbk.","..kbkbbbbbbbbbk.","..kbbbbbbbbkbbk.","...kBBBBBBkkBBk.","....kkkkkk..kk.."],
scroll:["...kkkkkkkkkk...","..kUuuuuuuuuUk..","..kUuxxuxxuuUk..","...kuuuuuuuuk...","...kuxxuxxxuk...","..kUuuuuuuuuUk..","...kkkkkkkkkk..."],
yarn:["......kkkk......","....kktTttkk....","...ktTtttTtk....","...kTtttTtttk...","...ktttTtttTk...","...kTtttTtttk...","....ktTtttkk.k..","......kkkk...k.."],
};
const HEROES={
  laranja:{name:'Biscoito',cls:'Gladiador',o:'#e8833a',O:'#b85a1e',desc:'+4 de vida máxima',bonus:{hp:4}},
  cinza:{name:'Nuvem',cls:'Oráculo',o:'#a7a9b8',O:'#6f7186',desc:'+1 de mana máxima',bonus:{mana:1}},
  siames:{name:'Cappuccino',cls:'Mensageira',o:'#e9dcc0',O:'#6b4a35',desc:'+2 dicas extras',bonus:{hints:2}},
};
const SPHINX={o:'#c9a24a',O:'#8f6d2a',g:'#c9a24a',G:'#8f6d2a',y:'#f2c14e',w:'#e8d9a8',e:'#6fd3e0',p:'#c9a24a'};
function makeSprite(rows,over={}){
  const c=document.createElement('canvas');c.width=c.height=16;const x=c.getContext('2d');const off=16-rows.length;
  rows.forEach((r,y)=>{for(let i=0;i<16;i++){const ch=r[i];if(!ch||ch==='.')continue;x.fillStyle=over[ch]||PAL[ch]||'#f0f';x.fillRect(i,y+off,1,1)}});return c;
}
const IMG={};
for(const k in SPR)IMG[k]=makeSprite(SPR[k]);
IMG.sphinx=makeSprite(SPR.hero,SPHINX);
const HERO_IMG={};
for(const k in HEROES)HERO_IMG[k]=makeSprite(SPR.hero,{o:HEROES[k].o,O:HEROES[k].O});

/* ================= MUNDO ================= */
const ZONES=[null,
  {name:'Colina das Cabanas',wall:['#6b4a3a','#3e2a20','#8a654f'],floor:['#3a2a24','#34251f','#41302a']},
  {name:'Via dos Legionários',wall:['#7a3b2e','#4d2219','#9e5241'],floor:['#2e1c18','#281814','#352019']},
  {name:'Arena dos Gladiadores',wall:['#8a6a3a','#58401f','#b08a4e'],floor:['#3a2e1f','#352a1b','#42341f']},
  {name:'Ágora de Atenas',wall:['#3f6f9a','#26425e','#6a9cc9'],floor:['#1c2a3a','#182534','#213244']},
];
const MON={
  rato:{n:'Rato do Tibre',spr:'rat',hp:5,atk:2,def:0,xp:4,min:1,max:9},
  geleia:{n:'Lodo do Tibre',spr:'slime',hp:8,atk:2,def:1,xp:5,min:1,max:12},
  morcego:{n:'Morcego do Palatino',spr:'bat',hp:5,atk:3,def:0,xp:5,min:2,max:18,erratic:true},
  aranha:{n:'Aranha Tecelã',spr:'spider',hp:9,atk:4,def:1,xp:8,min:4,max:18},
  fantasma:{n:'Fantasma de Remo',spr:'ghost',hp:11,atk:5,def:1,xp:10,min:7,max:18},
  esqueleto:{n:'Legionário Esqueleto',spr:'skel',hp:13,atk:5,def:2,xp:12,min:10,max:18},
};
const TALENTS=[
  {n:'Garras Afiadas',d:'+1 de ataque',f:()=>SV.bonus.atk++},
  {n:'Pelagem de Ferro',d:'+1 de defesa',f:()=>SV.bonus.def++},
  {n:'Fôlego de Leão',d:'+6 de vida máxima',f:()=>SV.bonus.hp+=6},
  {n:'Novelo Arcano',d:'+1 de mana máxima',f:()=>SV.bonus.mana++},
  {n:'Bigodes Sábios',d:'+2 dicas',f:()=>SV.hints+=2},
  {n:'Ronronar Curativo',d:'Recupera vida mais rápido',f:()=>SV.bonus.regen++,ok:()=>SV.bonus.regen<3},
  {n:'Mente Brilhante',d:'+20% de XP em tudo',f:()=>SV.bonus.xp++},
];
const W=40,H=30,T=48,VW=15,VH=11;
const SAVE_KEY='gatinhos-de-roma-v1';

let SV=null,F=null,P=null,mode='menu',streak=0,turn=0,pendingLevels=0,floaters=[],modalKey=null,logLines=[];
const cv=document.getElementById('cv'),ctx=cv.getContext('2d');
const mapCv=document.createElement('canvas');
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const nf=n=>n.toFixed(1).replace('.',',');
const round1=x=>Math.round(x*10)/10;
const key=(x,y)=>x+','+y;
const TIER=[0,1,3,6,9];   // dificuldade de cada andar (monstros e XP)
const tier=()=>TIER[SV.bim];
const SLOTS=[1,2,3,4];
const need=l=>20+l*15;

function stats(){const l=SV.lvl,b=SV.bonus;return{hpMax:20+3*(l-1)+b.hp,atk:4+Math.floor((l-1)/2)+b.atk,def:1+Math.floor((l-1)/4)+b.def,manaMax:3+b.mana,regen:Math.max(3,10-3*b.regen)}}
function save(){try{localStorage.setItem(SAVE_KEY,JSON.stringify(SV))}catch(e){}}
function loadSave(){try{const s=JSON.parse(localStorage.getItem(SAVE_KEY));return s&&s.v===1?s:null}catch(e){return null}}
function clearSave(){try{localStorage.removeItem(SAVE_KEY)}catch(e){}}

function makeSave(heroKey,heroName,bim,media){
  const h=HEROES[heroKey];
  const s={v:1,heroKey,heroName:heroName||h.name,bim,start:bim,lvl:1,xp:0,bonus:{hp:0,atk:0,def:0,mana:0,regen:0,xp:0},hints:3,lives:9,media,grades:{},stats:{kills:0,right:0,wrong:0}};
  if(h.bonus.hp)s.bonus.hp+=h.bonus.hp;if(h.bonus.mana)s.bonus.mana+=h.bonus.mana;if(h.bonus.hints)s.hints+=h.bonus.hints;
  const lv=1+(bim-1)*2;if(lv>1){s.lvl=lv;const k=Math.floor((lv-1)/3);s.bonus.atk+=k;s.bonus.def+=k;s.bonus.hp+=3*k}
  return s;
}

/* ---- geração do andar ---- */
function genFloor(bim){
  const map=[...Array(H)].map(()=>Array(W).fill(1));const rooms=[];
  for(let i=0;i<400&&rooms.length<10;i++){
    const w=R(4,8),h=R(4,6),x=R(1,W-w-2),y=R(1,H-h-2);
    if(rooms.some(r=>x<r.x+r.w+1&&x+w+1>r.x&&y<r.y+r.h+1&&y+h+1>r.y))continue;
    rooms.push({x,y,w,h,cx:x+(w>>1),cy:y+(h>>1)});
  }
  rooms.forEach(r=>{for(let yy=r.y;yy<r.y+r.h;yy++)for(let xx=r.x;xx<r.x+r.w;xx++)map[yy][xx]=0});
  rooms.sort((a,b)=>a.cx-b.cx);
  const carve=(x1,y1,x2,y2)=>{let x=x1,y=y1;const hf=Math.random()<.5;
    if(hf){while(x!==x2){map[y][x]=0;x+=Math.sign(x2-x)}while(y!==y2){map[y][x]=0;y+=Math.sign(y2-y)}}
    else{while(y!==y2){map[y][x]=0;y+=Math.sign(y2-y)}while(x!==x2){map[y][x]=0;x+=Math.sign(x2-x)}}map[y][x]=0};
  for(let i=1;i<rooms.length;i++)carve(rooms[i-1].cx,rooms[i-1].cy,rooms[i].cx,rooms[i].cy);
  for(let k=0;k<2;k++){const a=pick(rooms),b=pick(rooms);if(a!==b)carve(a.cx,a.cy,b.cx,b.cy)}
  const si=R(0,1)?0:rooms.length-1;const sr=rooms[si];const start={x:sr.cx,y:sr.cy};
  let fi=0,fd=-1;rooms.forEach((r,i)=>{const d=Math.abs(r.cx-start.x)+Math.abs(r.cy-start.y);if(d>fd){fd=d;fi=i}});
  const stairs={x:rooms[fi].cx,y:rooms[fi].cy};
  const used=new Set([key(start.x,start.y),key(stairs.x,stairs.y)]);
  const tiles=(inner,excludeStart)=>{const out=[];rooms.forEach((r,i)=>{if(excludeStart&&i===si)return;const p=inner?1:0;for(let y=r.y+p;y<r.y+r.h-p;y++)for(let x=r.x+p;x<r.x+r.w-p;x++)out.push({x,y})});return shuffle(out)};
  const inner=tiles(true,true),any=tiles(false,true),all=tiles(false,false);
  const take=list=>{while(list.length){const f=list.pop();const k=key(f.x,f.y);if(used.has(k))continue;used.add(k);return f}return null};
  const items=[];
  const puz=['chest','chest','altar','sphinx'];if(bim>=2)puz.push('chest');if(bim>=3)puz.push('altar');
  puz.forEach(t=>{const f=take(inner);if(f)items.push({type:t,x:f.x,y:f.y,puzzle:true,tries:0})});
  ['potion','potion','fish','fish','scroll','yarn'].forEach(t=>{const f=take(all);if(f)items.push({type:t,x:f.x,y:f.y})});
  const t=TIER[bim];const kinds=Object.keys(MON).filter(k=>t>=MON[k].min&&t<=MON[k].max);
  const n=5+bim;const mons=[];
  for(let i=0;i<n;i++){const f=take(any);if(!f)break;const b=MON[pick(kinds)];
    const hp=Math.round(b.hp*(1+0.12*(t-1)));
    mons.push({...b,x:f.x,y:f.y,hp,maxhp:hp,atk:b.atk+Math.floor((t-1)*0.45),def:b.def+Math.floor((t-1)/5),xp:Math.round(b.xp*(1+0.15*(t-1))),flash:0});}
  const seen=[...Array(H)].map(()=>Array(W).fill(0));
  return {map,rooms,start,stairs,items,mons,seen,vis:new Set(),total:items.filter(i=>i.puzzle).length,score:0,solved:0,failed:0};
}

function hash(x,y){let h=(x*374761393+y*668265263)^0x5bd1e995;h=(h^(h>>>13))*1274126177;return (h^(h>>>16))>>>0}
function prerenderMap(){
  mapCv.width=W*16;mapCv.height=H*16;const c=mapCv.getContext('2d');const z=ZONES[SV.bim];
  const isF=(x,y)=>x>=0&&y>=0&&x<W&&y<H&&F.map[y][x]===0;
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){
    const px=x*16,py=y*16,h=hash(x,y);
    if(F.map[y][x]===0){
      c.fillStyle=z.floor[h%3];c.fillRect(px,py,16,16);
      c.fillStyle='rgba(0,0,0,.28)';c.fillRect(px,py+15,16,1);c.fillRect(px+15,py,1,16);
      c.fillStyle='rgba(255,255,255,.05)';c.fillRect(px,py,15,1);
      if(h%5===0){c.fillStyle='rgba(0,0,0,.3)';c.fillRect(px+4+(h%6),py+5,3,1);c.fillRect(px+6+(h%6),py+6,2,1);c.fillRect(px+7+(h%6),py+7,1,2)}
      if(h%9===0){c.fillStyle='rgba(255,255,255,.08)';c.fillRect(px+3+(h%8),py+10,2,2)}
    }else{
      let near=false;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)if(isF(x+dx,y+dy))near=true;
      if(!near){c.fillStyle='#08060c';c.fillRect(px,py,16,16);continue}
      c.fillStyle=z.wall[0];c.fillRect(px,py,16,16);
      c.fillStyle=z.wall[1];
      for(let r=0;r<4;r++){c.fillRect(px,py+r*4+3,16,1);const o=(r+y)%2?0:8;c.fillRect(px+o,py+r*4,1,3)}
      c.fillStyle=z.wall[2];for(let r=0;r<4;r++){const o=(r+y)%2?1:9;c.fillRect(px+o,py+r*4,5,1)}
      if(isF(x,y+1)){c.fillStyle='rgba(0,0,0,.35)';c.fillRect(px,py+13,16,3)}
    }
  }
  const sx=F.stairs.x*16,sy=F.stairs.y*16;
  c.fillStyle='#07050b';c.fillRect(sx+1,sy+1,14,14);
  for(let i=0;i<4;i++){c.fillStyle=['#5a4a3a','#463a2e','#332a22','#221c17'][i];c.fillRect(sx+2+i,sy+2+i*3,12-i*2,3)}
}

/* ---- visão ---- */
function los(x0,y0,x1,y1){let dx=Math.abs(x1-x0),dy=-Math.abs(y1-y0),sx=x0<x1?1:-1,sy=y0<y1?1:-1,err=dx+dy,x=x0,y=y0;
  while(!(x===x1&&y===y1)){if(!(x===x0&&y===y0)&&F.map[y][x]===1)return false;const e2=2*err;if(e2>=dy){err+=dy;x+=sx}if(e2<=dx){err+=dx;y+=sy}}return true}
function computeFOV(){F.vis=new Set();const r=7;
  for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++){if(dx*dx+dy*dy>r*r+1)continue;const x=P.x+dx,y=P.y+dy;if(x<0||y<0||x>=W||y>=H)continue;
    if(los(P.x,P.y,x,y)){F.vis.add(key(x,y));F.seen[y][x]=1}}}

/* ---- desenho ---- */
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
function drawImg(img,tx,ty,cam,flip,bob){const x=(tx-cam.x)*T,y=(ty-cam.y)*T-(bob||0);
  if(flip){ctx.save();ctx.translate(x+T,y);ctx.scale(-1,1);ctx.drawImage(img,0,0,T,T);ctx.restore()}else ctx.drawImage(img,x,y,T,T)}
function draw(now){
  requestAnimationFrame(draw);
  if(!F||!P)return;
  ctx.imageSmoothingEnabled=false;
  const cam={x:Math.max(0,Math.min(W-VW,P.x-7)),y:Math.max(0,Math.min(H-VH,P.y-5))};
  ctx.fillStyle='#07050b';ctx.fillRect(0,0,cv.width,cv.height);
  ctx.drawImage(mapCv,cam.x*16,cam.y*16,VW*16,VH*16,0,0,VW*T,VH*T);
  const ph=reduce?0:(Math.floor(now/450)%2)*3;
  for(const it of F.items){if(!F.seen[it.y][it.x])continue;
    const img=IMG[it.type==='sphinx'?'sphinx':it.type];
    if(it.puzzle&&F.vis.has(key(it.x,it.y))&&!reduce){ctx.fillStyle=`rgba(242,193,78,${0.12+0.1*Math.sin(now/300)})`;ctx.fillRect((it.x-cam.x)*T+3,(it.y-cam.y)*T+3,T-6,T-6)}
    drawImg(img,it.x,it.y,cam,false,it.puzzle?0:ph/3)}
  if(F.seen[F.stairs.y][F.stairs.x])drawImg(IMG.owl,F.stairs.x,F.stairs.y,cam,false,ph);
  for(const m of F.mons){if(!F.vis.has(key(m.x,m.y)))continue;if(m.flash>now&&Math.floor(now/70)%2)continue;
    drawImg(IMG[m.spr],m.x,m.y,cam,m.x>P.x,m.spr==='bat'||m.spr==='ghost'?ph:0);
    if(m.hp<m.maxhp){const x=(m.x-cam.x)*T+6,y=(m.y-cam.y)*T+2;ctx.fillStyle='#07050b';ctx.fillRect(x-2,y-2,T-8,7);ctx.fillStyle='#e0525a';ctx.fillRect(x,y,(T-12)*m.hp/m.maxhp,3)}}
  if(!(P.flash>now&&Math.floor(now/70)%2))drawImg(HERO_IMG[SV.heroKey],P.x,P.y,cam,P.face<0,0);
  for(let y=0;y<VH;y++)for(let x=0;x<VW;x++){const mx=x+cam.x,my=y+cam.y;
    if(!F.seen[my][mx]){ctx.fillStyle='#07050b';ctx.fillRect(x*T,y*T,T,T)}
    else if(!F.vis.has(key(mx,my))){ctx.fillStyle='rgba(7,5,11,.62)';ctx.fillRect(x*T,y*T,T,T)}}
  floaters=floaters.filter(f=>now-f.t0<1000);
  ctx.font='700 22px "Pixelify Sans", monospace';ctx.textAlign='center';ctx.lineWidth=5;ctx.strokeStyle='#07050b';
  for(const f of floaters){const k=(now-f.t0)/1000;const x=(f.x-cam.x)*T+T/2,y=(f.y-cam.y)*T+8-k*28;ctx.globalAlpha=1-k*k;ctx.strokeText(f.txt,x,y);ctx.fillStyle=f.col;ctx.fillText(f.txt,x,y);ctx.globalAlpha=1}
}
const float=(x,y,txt,col)=>floaters.push({x,y,txt,col,t0:performance.now()});

/* ---- HUD ---- */
const PAW='<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="5" y="8" width="6" height="5"/><rect x="4" y="9" width="8" height="3"/><rect x="2" y="5" width="3" height="3"/><rect x="6" y="3" width="2" height="3"/><rect x="9" y="3" width="2" height="3"/><rect x="12" y="5" width="2" height="3"/></svg>';
function log(msg){logLines.unshift(msg);logLines=logLines.slice(0,3);$('log').innerHTML=logLines.map(l=>`<p>${esc(l)}</p>`).join('')}
function updateHUD(){
  if(!SV||!P)return;const s=stats(),h=HEROES[SV.heroKey];
  $('zoneName').textContent=ZONES[SV.bim].name;$('anoTri').textContent=`${SV.bim}º bimestre · ${THEMES[SV.bim].short}`;
  $('heroName').textContent=SV.heroName;$('heroLvl').textContent=`Nível ${SV.lvl} · ${h.cls}`;
  $('hpFill').style.width=Math.max(0,P.hp/s.hpMax*100)+'%';$('hpTxt').textContent=`${Math.max(0,P.hp)}/${s.hpMax}`;
  $('xpFill').style.width=(SV.xp/need(SV.lvl)*100)+'%';$('xpTxt').textContent=`${SV.xp}/${need(SV.lvl)}`;
  $('mnFill').style.width=(P.mana/s.manaMax*100)+'%';$('mnTxt').textContent=`${P.mana}/${s.manaMax}`;
  $('paws').innerHTML=Array.from({length:9},(_,i)=>PAW.replace('<svg',`<svg class="${i<SV.lives?'':'lost'}"`)).join('');
  $('paws').setAttribute('aria-label',`${SV.lives} de 9 vidas`);
  $('hintsTxt').textContent=SV.hints;$('streakTxt').textContent=streak;$('puzTxt').textContent=`${F.solved+F.failed}/${F.total}`;
  $('atkTxt').textContent=s.atk;$('defTxt').textContent=s.def;
  const hc=$('heroIcon').getContext('2d');hc.imageSmoothingEnabled=false;hc.clearRect(0,0,16,16);hc.drawImage(HERO_IMG[SV.heroKey],0,0);
}

/* ---- modal ---- */
const panel=$('panel'),modal=$('modal');
function openModal(html){panel.innerHTML=html;modal.hidden=false;panel.scrollTop=0}
function closeModal(){modal.hidden=true;panel.innerHTML='';modalKey=null}
function choiceModal({title,html,buttons}){return new Promise(res=>{
  openModal(`<h2>${title}</h2>${html}<div class="row">${buttons.map((b,i)=>`<button class="btn ${i===0?'gold':''}" data-c="${i}">${b}</button>`).join('')}</div>`);
  panel.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>res(+b.dataset.c));
  panel.querySelector('[data-c]').focus();
  modalKey=e=>{if(e.key==='Enter'){e.preventDefault();res(0)}else if(e.key==='Escape'&&buttons.length>1)res(buttons.length-1)};
})}

function askQuestion(cfg){return new Promise(resolve=>{
  const q=cfg.q;let answered=false,result=false;
  const dots=cfg.progress?`<div class="dots" aria-hidden="true">${cfg.progress.marks.map((m,i)=>`<i class="${m||(i===cfg.progress.i?'cur':'')}"></i>`).join('')}</div>`:'';
  openModal(`
    <div class="q-head"><span class="q-kind">${esc(cfg.title)}</span><span class="tag">${esc(q.tema)} · ${esc(q.skill)}</span></div>
    ${dots}${cfg.intro?`<p class="intro">${esc(cfg.intro)}</p>`:''}
    <div class="q-text">${esc(q.q)}</div>
    <div class="opts">${q.opts.map((o,i)=>`<button class="opt" data-i="${i}"><kbd>${i+1}</kbd><span>${esc(o)}</span></button>`).join('')}</div>
    <div class="hint-txt" id="hintTxt" hidden></div>
    <div class="q-foot">${cfg.hint?`<button class="btn ghost" id="hintBtn" ${SV.hints<1?'disabled':''}>Usar dica (${SV.hints}) <small>tira 2 erradas</small></button>`:`<span class="muted">${cfg.noHintMsg||'Sem dicas aqui.'}</span>`}<span>Sequência: <b>${streak}</b>${streak>=2?` · bônus +${Math.min(streak,10)*10}% XP`:''}</span></div>
    <div class="feedback" id="fb" hidden></div>`);
  const btns=[...panel.querySelectorAll('.opt')];
  const useHint=()=>{const hb=$('hintBtn');if(!hb||hb.disabled||answered||SV.hints<1)return;SV.hints--;hb.disabled=true;hb.textContent='Dica usada';
    const wrong=shuffle(btns.filter(b=>q.opts[+b.dataset.i]!==q.a)).slice(0,2);wrong.forEach(b=>{b.classList.add('out');b.disabled=true});
    const ht=$('hintTxt');ht.textContent=q.hint;ht.hidden=false;updateHUD()};
  if(cfg.hint)$('hintBtn').onclick=useHint;
  const choose=i=>{if(answered||btns[i].disabled)return;answered=true;const ok=q.opts[i]===q.a;result=ok;
    btns.forEach(b=>{b.disabled=true;if(q.opts[+b.dataset.i]===q.a)b.classList.add('right')});if(!ok)btns[i].classList.add('wrong');
    if(cfg.counts!==false){if(ok){streak++;SV.stats.right++}else{streak=0;SV.stats.wrong++}}
    const msg=cfg.onAnswer?cfg.onAnswer(ok):'';
    const fb=$('fb');fb.className='feedback '+(ok?'good':'badf');
    fb.innerHTML=`<b>${ok?pick(['Acertou!','Isso mesmo!','Miau-ravilha!','Na mosca!','Perfeito!']):'Ainda não…'}</b>${msg?`<span class="reward">${esc(msg)}</span>`:''}<p>${ok?'':`Resposta certa: <b style="font-size:1rem;color:var(--ink)">${esc(q.a)}</b>. `}${esc(q.exp)}</p><button class="btn gold" id="cont">Continuar</button>`;
    fb.hidden=false;const c=$('cont');c.focus();c.scrollIntoView({block:'nearest'});
    c.onclick=()=>resolve(ok);updateHUD();};
  btns.forEach(b=>b.onclick=()=>choose(+b.dataset.i));
  modalKey=e=>{if(!answered&&/^[1-4]$/.test(e.key)){choose(+e.key-1)}else if(!answered&&(e.key==='h'||e.key==='H')&&cfg.hint){useHint()}else if(answered&&(e.key==='Enter'||e.key===' ')){e.preventDefault();resolve(result)}};
})}

/* ---- XP e níveis ---- */
function gainXP(base,math){const mult=(math?1+0.1*Math.min(streak,10):1)*(1+0.2*SV.bonus.xp);const amt=Math.max(1,Math.round(base*mult));SV.xp+=amt;
  while(SV.xp>=need(SV.lvl)){SV.xp-=need(SV.lvl);SV.lvl++;pendingLevels++}return amt}
async function processLevels(){
  while(pendingLevels>0){pendingLevels--;mode='modal';
    const opts=shuffle(TALENTS.filter(t=>!t.ok||t.ok())).slice(0,3);
    const c=await new Promise(res=>{
      openModal(`<div class="diploma"><canvas id="lvlCv" width="16" height="16"></canvas></div><h2 class="center" style="text-align:center">Nível ${SV.lvl - pendingLevels}!</h2><p class="muted" style="text-align:center">Sua vida foi restaurada. Escolha um talento:</p><div class="talents">${opts.map((t,i)=>`<button class="btn" data-t="${i}">${i+1}. ${t.n}<small>${t.d}</small></button>`).join('')}</div>`);
      const lc=$('lvlCv').getContext('2d');lc.drawImage(HERO_IMG[SV.heroKey],0,0);
      panel.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>res(+b.dataset.t));
      modalKey=e=>{if(/^[1-3]$/.test(e.key))res(+e.key-1)};
    });
    opts[c].f();const s=stats();P.hp=s.hpMax;P.mana=Math.min(P.mana+1,s.manaMax);log(`Subiu para o nível ${SV.lvl - pendingLevels}! Talento: ${opts[c].n}.`);
  }
  closeModal();mode='play';save();updateHUD();
}

/* ---- turnos ---- */
const monAt=(x,y)=>F.mons.find(m=>m.x===x&&m.y===y);
const itemAt=(x,y)=>F.items.find(i=>i.x===x&&i.y===y);
const walkable=(x,y)=>x>=0&&y>=0&&x<W&&y<H&&F.map[y][x]===0;
let lastMove=0;
function tryMove(dx,dy){
  if(mode!=='play')return;const t=performance.now();if(t-lastMove<85)return;lastMove=t;
  if(dx)P.face=dx;const nx=P.x+dx,ny=P.y+dy;
  const m=monAt(nx,ny);if(m){attack(m);endTurn();return}
  if(!walkable(nx,ny))return;
  const it=itemAt(nx,ny);if(it&&it.puzzle){openPuzzle(it);return}
  P.x=nx;P.y=ny;if(it)pickup(it);
  if(nx===F.stairs.x&&ny===F.stairs.y){endTurn(true);promptExam();return}
  endTurn();
}
function attack(m){const s=stats();const dmg=Math.max(1,s.atk-m.def+R(-1,1));m.hp-=dmg;m.flash=performance.now()+260;float(m.x,m.y,'-'+dmg,'#ffffff');
  if(m.hp<=0)kill(m);else log(`Você arranha ${m.n} (−${dmg}).`)}
function kill(m){F.mons=F.mons.filter(x=>x!==m);SV.stats.kills++;const xp=gainXP(m.xp,false);float(m.x,m.y,`+${xp} XP`,'#f2c14e');log(`${m.n} foi derrotado! +${xp} XP`);
  if(Math.random()<0.15&&!itemAt(m.x,m.y))F.items.push({type:'fish',x:m.x,y:m.y})}
function pickup(it){const s=stats();F.items=F.items.filter(x=>x!==it);
  if(it.type==='potion'){const h=Math.ceil(s.hpMax*0.5);P.hp=Math.min(s.hpMax,P.hp+h);float(P.x,P.y,`+${h}`,'#6fcf6a');log(`Poção de leite morno: +${h} de vida.`)}
  if(it.type==='fish'){P.hp=Math.min(s.hpMax,P.hp+5);float(P.x,P.y,'+5','#6fcf6a');log('Peixinho assado: +5 de vida.')}
  if(it.type==='scroll'){SV.hints++;log('Pergaminho de dica: +1 dica.')}
  if(it.type==='yarn'){P.mana=s.manaMax;log('Novelo encantado: mana cheia.')}}
function monstersAct(){const s=stats();const now=performance.now();
  for(const m of F.mons){const d=Math.abs(m.x-P.x)+Math.abs(m.y-P.y);
    if(d===1&&!(m.erratic&&Math.random()<0.25)){const dmg=Math.max(0,m.atk-s.def+R(-1,1));
      if(dmg>0){P.hp-=dmg;P.flash=now+260;float(P.x,P.y,'-'+dmg,'#e0525a');log(`${m.n} ataca você (−${dmg}).`)}else log(`Você bloqueia o ataque de ${m.n}.`);continue}
    let dirs=[[1,0],[-1,0],[0,1],[0,-1]];
    if(F.vis.has(key(m.x,m.y))&&d<=8&&!(m.erratic&&Math.random()<0.4)){dirs.sort((a,b)=>(Math.abs(m.x+a[0]-P.x)+Math.abs(m.y+a[1]-P.y))-(Math.abs(m.x+b[0]-P.x)+Math.abs(m.y+b[1]-P.y)))}
    else{if(Math.random()>0.35)continue;shuffle(dirs)}
    for(const [dx,dy] of dirs){const nx=m.x+dx,ny=m.y+dy;if(!walkable(nx,ny)||monAt(nx,ny)||(nx===P.x&&ny===P.y))continue;const it=itemAt(nx,ny);if(it&&it.puzzle)continue;if(nx===F.stairs.x&&ny===F.stairs.y)continue;
      if(F.vis.has(key(m.x,m.y))&&d<=8&&Math.abs(nx-P.x)+Math.abs(ny-P.y)>d)break;m.x=nx;m.y=ny;break}}
}
function endTurn(skipMonsters){turn++;const s=stats();if(turn%s.regen===0&&P.hp<s.hpMax&&P.hp>0)P.hp++;if(turn%20===0&&P.mana<s.manaMax)P.mana++;
  if(!skipMonsters)monstersAct();computeFOV();afterAction()}
async function afterAction(){updateHUD();if(P.hp<=0){await onDeath();return}if(pendingLevels>0&&mode==='play')await processLevels();if(mode==='modal'&&modal.hidden)mode='play'}

/* ---- desafios ---- */
async function openPuzzle(it){
  mode='modal';
  const titles={chest:'Baú Trancado',altar:'Altar dos Deuses',sphinx:'Enigma da Esfinge'};
  const intro={chest:'A fechadura tem uma pergunta gravada. Acerte para abrir.',altar:'As runas brilham, esperando a resposta certa. Elas curam quem acerta.',sphinx:'"Responda, pequeno felino, e eu lhe darei sabedoria em dobro."'};
  const attempt=it.tries+1;
  const q=genQuestion(SV.bim,'floor');
  await askQuestion({title:titles[it.type],intro:intro[it.type]+(attempt===2?' Segunda e última tentativa: vale meio ponto.':''),q,hint:true,onAnswer:ok=>{
    if(ok){const pts=attempt===1?1:0.5;F.score+=pts;F.solved++;F.items=F.items.filter(x=>x!==it);
      const xp=gainXP((12+3*tier())*(it.type==='sphinx'?2:1),true);
      return `+${xp} XP · ${pts===1?'1 ponto':'meio ponto'} na nota de desafios · ${reward(it)}`}
    it.tries++;
    if(it.tries>=2){F.items=F.items.filter(x=>x!==it);F.failed++;return 'O desafio se desfez em poeira. Ele vale zero na nota de desafios.'}
    if(it.type==='chest'){P.hp=Math.max(1,P.hp-2);return 'A fechadura soltou uma faísca (−2 de vida). Tente de novo com outra pergunta.'}
    return 'Você ainda tem mais uma tentativa, com outra pergunta.';
  }});
  closeModal();mode='play';save();afterAction();
}
function reward(it){const s=stats();
  if(it.type==='altar'){P.hp=s.hpMax;P.mana=s.manaMax;return 'Vida e mana restauradas'}
  if(it.type==='sphinx'){SV.hints++;return '+1 dica'}
  const r=Math.random();
  if(r<0.06&&SV.lives<9){SV.lives++;return 'Peixe Dourado: +1 vida de gato!'}
  if(r<0.18){SV.bonus.atk++;return 'Espada de Prata: +1 de ataque'}
  if(r<0.30){SV.bonus.def++;return 'Escudo de Carvalho: +1 de defesa'}
  if(r<0.55){SV.hints++;return 'Pergaminho: +1 dica'}
  const h=Math.ceil(s.hpMax*0.5);P.hp=Math.min(s.hpMax,P.hp+h);return `Poção: +${h} de vida`;
}

/* ---- feitiço ---- */
async function castSpell(){
  if(mode!=='play')return;
  if(P.mana<1){log('Sem mana. Novelos encantados e altares recarregam.');return}
  let best=null,bd=99;for(const m of F.mons){if(!F.vis.has(key(m.x,m.y)))continue;const d=Math.abs(m.x-P.x)+Math.abs(m.y-P.y);if(d<bd&&d<=7){bd=d;best=m}}
  if(!best){log('Nenhum inimigo à vista para o feitiço.');return}
  mode='modal';P.mana--;const target=best;
  const q=genQuestion(SV.bim,'floor');
  await askQuestion({title:'Bola de Lã Arcana',intro:`Alvo: ${target.n}. Acerte a pergunta para lançar o feitiço.`,q,hint:false,noHintMsg:'Feitiços não aceitam dica.',onAnswer:ok=>{
    if(!ok)return 'O feitiço se desfez no ar.';
    const dmg=stats().atk*2+2;target.hp-=dmg;target.flash=performance.now()+300;float(target.x,target.y,'-'+dmg,'#7fe3ec');
    const xp=gainXP(4+SV.bim*3,true);
    if(target.hp<=0){kill(target);return `Acertou em cheio: −${dmg}! Inimigo derrotado. +${xp} XP`}
    return `Acertou em cheio: −${dmg}! +${xp} XP`;
  }});
  closeModal();mode='play';endTurn();
}

/* ---- prova e boletim ---- */
async function promptExam(){
  mode='modal';
  const c=await choiceModal({title:'A Coruja Examinadora',html:`<p>"Hoo-hoo! Pronto para a <b>Prova do ${SV.bim}º bimestre</b>?"</p><p class="muted">Você fez ${F.solved+F.failed} de ${F.total} desafios deste andar. Desafios não feitos contam zero. Nota do bimestre = 40% desafios + 60% prova.</p>`,buttons:['Fazer a prova','Explorar mais']});
  if(c===0){await bimesterEnd();return}
  closeModal();mode='play';
}
async function runExam(rec){
  const n=rec?10:8;let right=0;const marks=Array(n).fill('');
  for(let i=0;i<n;i++){
    const q=genQuestion(SV.bim,rec?'rec':'prova');
    await askQuestion({title:rec?`Recuperação · questão ${i+1} de ${n}`:`Prova do ${SV.bim}º bimestre · questão ${i+1} de ${n}`,q,hint:false,noHintMsg:'Na prova não vale dica.',progress:{i,marks},onAnswer:ok=>{
      marks[i]=ok?'ok':'no';
      if(ok){right++;const xp=gainXP(6+2*tier(),true);return `+${xp} XP`}
      const s=stats();const dmg=Math.ceil(s.hpMax*0.08);P.hp=Math.max(1,P.hp-dmg);return `A coruja bate as asas (−${dmg} de vida).`;
    }});
  }
  return round1(right/n*10);
}
function boletimHTML(){
  const g=SV.grades;
  const st=SV.start||1;const row=b=>{const x=g['b'+b];const skip=b<st;return `<tr class="${SV.bim===b&&!x?'now':''}"><th>${b}º bimestre<br><small class="muted">${esc(THEMES[b].short)}${skip?' · não cursado':''}</small></th><td>${x?nf(x.at):'—'}</td><td>${x?nf(x.pr):'—'}</td><td class="nota ${x?(x.nota>=SV.media?'ok':'low'):''}">${x?nf(x.nota):'—'}</td></tr>`};
  const played=SLOTS.filter(b=>b>=st),np=played.length;
  const done=played.filter(b=>g['b'+b]).map(b=>g['b'+b].nota);
  let foot='';
  if(done.length){const sum=done.reduce((a,b)=>a+b,0),avg=round1(sum/done.length);
    foot=`<p>Média ${done.length<np?'parcial':'final'}: <b>${nf(avg)}</b> · para passar: <b>${nf(SV.media)}</b></p>`;
    if(done.length<np){const left=np-done.length,needv=(np*SV.media-sum)/left;
      foot+=`<p class="muted">${needv<=0?'Você já garantiu a média! Continue firme.':needv>10?'Mesmo tirando 10 não alcança a média, mas ainda existe a recuperação.':`Para passar direto, precisa de média ${nf(Math.max(0,needv))} ${left>1?'nos próximos bimestres':'no próximo bimestre'}.`}</p>`}}
  return `<div class="tbl-wrap"><table><thead><tr><th>História</th><th>Desafios</th><th>Prova</th><th>Nota</th></tr></thead><tbody>${SLOTS.map(row).join('')}</tbody></table></div>${foot}`;
}
async function bimesterEnd(){
  mode='modal';
  const prova=await runExam(false);
  const at=F.total?round1(F.score/F.total*10):10;
  const nota=round1(0.4*at+0.6*prova);
  const g=SV.grades;g['b'+SV.bim]={at,pr:prova,nota};save();
  const last=SV.bim>=4;
  await choiceModal({title:`Boletim · ${SV.bim}º bimestre`,html:`<div class="center" style="display:flex;flex-direction:column;gap:6px;align-items:center"><span class="muted">Nota do bimestre</span><span class="big">${nf(nota)}</span><span class="muted">Desafios ${nf(at)} × 40% + Prova ${nf(prova)} × 60%</span></div>${boletimHTML()}`,buttons:[last?'Ver resultado final':'Descer para o próximo andar']});
  if(!last){SV.bim++;save();closeModal();startFloor(true);return}
  const played=SLOTS.filter(b=>b>=(SV.start||1));const media=round1(played.map(b=>g['b'+b].nota).reduce((a,b)=>a+b,0)/played.length);g.media=media;
  if(media>=SV.media){g.status='Aprovado';await approved(false);return}
  await choiceModal({title:'Recuperação',html:`<p>Sua média final foi <b>${nf(media)}</b>, abaixo de ${nf(SV.media)}.</p><p class="muted">A Coruja Examinadora dá mais uma chance: uma prova de recuperação com 10 questões de todo o conteúdo. Tire ${nf(SV.media)} ou mais e você passa.</p>`,buttons:['Fazer a recuperação']});
  const rec=await runExam(true);g.rec=rec;
  if(rec>=SV.media){g.status='Aprovado na recuperação';await approved(true,rec);return}
  g.status='Reprovado';
  await choiceModal({title:'Ainda não foi desta vez',html:`<p><span class="stamp bad">Reprovado</span></p><p>Nota da recuperação: <b>${nf(rec)}</b>.</p><p class="muted">A masmorra recomeça do primeiro andar da sua jornada. Você mantém nível, talentos e dicas, então vai ficar mais fácil.</p>`,buttons:['Recomeçar o curso']});
  SV.grades={};SV.bim=SV.start||1;SV.lives=9;save();closeModal();startFloor(true);
}
async function approved(viaRec,rec){
  const bonus=gainXP(160,false);
  SV.formado=true;save();
  await choiceModal({title:viaRec?'Aprovado na recuperação!':'Formatura em Roma e Grécia!',html:`<div class="diploma"><canvas id="dipCv" width="16" height="16"></canvas></div><p><span class="stamp ${viaRec?'warn':'ok'}">${viaRec?'Aprovado na recuperação':'Aprovado'}</span></p><p>${esc(SV.heroName)} atravessou a Colina das Cabanas, a Via dos Legionários, a Arena dos Gladiadores e a Ágora de Atenas.${viaRec?` Recuperação: ${nf(rec)}.`:''} Média final: <b>${nf(SV.grades.media)}</b>. Bônus de formatura: +${bonus} XP.</p><p class="muted">Acertos: ${SV.stats.right} · Erros: ${SV.stats.wrong} · Monstros derrotados: ${SV.stats.kills}</p>`,buttons:['Voltar ao menu']});
  clearSave();closeModal();showMenu();
}
const dipObserver=new MutationObserver(()=>{const c=document.getElementById('dipCv');if(c&&!c.dataset.d){c.dataset.d=1;const x=c.getContext('2d');x.drawImage(HERO_IMG[SV.heroKey],0,0)}});
dipObserver.observe(panel,{childList:true,subtree:true});

async function onDeath(){
  mode='modal';SV.lives--;streak=0;
  if(SV.lives>0){await choiceModal({title:'Uma vida a menos!',html:`<p>Gatos têm 9 vidas, e ${esc(SV.heroName)} ainda tem <b>${SV.lives}</b>.</p><p class="muted">O andar será refeito do começo, com novos monstros e novos desafios. Nível e talentos continuam com você.</p>`,buttons:['Tentar de novo']});}
  else{await choiceModal({title:'As 9 vidas acabaram',html:'<p>O curso recomeça do primeiro andar da sua jornada, mas você mantém seu nível, talentos e dicas.</p>',buttons:['Recomeçar o curso']});SV.lives=9;SV.bim=SV.start||1;SV.grades={};}
  save();closeModal();startFloor(false);
}

/* ---- andar ---- */
function startFloor(advance){
  F=genFloor(SV.bim);const s=stats();P={x:F.start.x,y:F.start.y,hp:s.hpMax,mana:s.manaMax,face:1,flash:0};turn=0;
  if(advance)SV.hints++;
  prerenderMap();computeFOV();save();logLines=[];
  log(`${ZONES[SV.bim].name}: ${SV.bim}º bimestre, ${THEMES[SV.bim].title}. Resolva os desafios e encontre a Coruja Examinadora.`);
  mode='play';updateHUD();if(pendingLevels>0)processLevels();
}

/* ---- menu inicial ---- */
const sel={hero:'laranja',bim:1,media:6,name:''};
function showMenu(inGame){
  mode='menu';const sv=loadSave();
  openModal(`
    <h2>Gatinhos de Roma</h2>
    <p class="muted">Um gatinho aventureiro desce por quatro andares da masmorra, um para cada bloco do Guia de Revisão: Roma e Grécia Antiga. Cada andar é um bimestre, com desafios, prova e boletim.</p>
    ${inGame?`<button class="btn gold" id="backBtn">Voltar ao jogo</button>`:''}
    ${sv&&!inGame?`<button class="btn gold" id="contBtn">Continuar: ${esc(sv.heroName)}, ${sv.bim}º bimestre, nível ${sv.lvl}<small>o andar atual recomeça do início</small></button>`:''}
    <h3>Escolha seu gatinho</h3>
    <div class="heroes">${Object.entries(HEROES).map(([k,h])=>`<button class="hcard" data-h="${k}" aria-pressed="${sel.hero===k}"><canvas width="16" height="16" data-hc="${k}"></canvas><b>${h.name}</b><span>${h.cls}<br>${h.desc}</span></button>`).join('')}</div>
    <label class="field" for="nameIn">Nome do herói<input type="text" id="nameIn" maxlength="16" placeholder="${HEROES[sel.hero].name}" value="${esc(sel.name)}"></label>
    <h3>Começar por qual tema?</h3>
    <div class="seg" id="bimSeg">${SLOTS.map(b=>`<button class="btn" data-b="${b}" aria-pressed="${sel.bim===b}">${b}º<small>${esc(THEMES[b].short)}</small></button>`).join('')}</div>
    <p class="muted">Quer treinar só um assunto? Comece por ele. Os temas seguintes também cobram os anteriores.</p>
    <h3>Média para passar</h3>
    <div class="seg" id="medSeg">${[5,6,7].map(m=>`<button class="btn" data-m="${m}" aria-pressed="${sel.media===m}">${m},0</button>`).join('')}</div>
    <button class="btn gold" id="startBtn">${sv&&!inGame?'Começar um jogo novo':inGame?'Abandonar e começar um jogo novo':'Começar a aventura'}<small>${sel.bim}º bimestre · média ${sel.media},0</small></button>
  `);
  panel.querySelectorAll('[data-hc]').forEach(c=>{const x=c.getContext('2d');x.drawImage(HERO_IMG[c.dataset.hc],0,0)});
  panel.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{sel.hero=b.dataset.h;sel.name=$('nameIn').value;showMenu(inGame)});
  panel.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>{sel.bim=+b.dataset.b;sel.name=$('nameIn').value;showMenu(inGame)});
  panel.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{sel.media=+b.dataset.m;sel.name=$('nameIn').value;showMenu(inGame)});
  $('nameIn').oninput=e=>sel.name=e.target.value;
  if($('backBtn'))$('backBtn').onclick=()=>{closeModal();mode='play'};
  if($('contBtn'))$('contBtn').onclick=()=>{SV=sv;streak=0;closeModal();startFloor(false)};
  $('startBtn').onclick=()=>{SV=makeSave(sel.hero,sel.name.trim(),sel.bim,sel.media);streak=0;pendingLevels=0;closeModal();startFloor(false)};
  modalKey=e=>{if(e.key==='Escape'&&inGame){closeModal();mode='play'}};
}

function showHelp(){
  mode='modal';
  choiceModal({title:'Como funciona a masmorra',html:`<ol class="rules">
    <li><b>Cada andar é um bimestre</b>, e cada bimestre é um bloco do guia: 1) Origem de Roma, 2) Política e expansão, 3) Sociedade e cultura, 4) Democracia. Os andares seguintes também cobram o que veio antes.</li>
    <li><b>Desafios</b> (baús, altares e esfinges) valem a nota de desafios. Acertou de primeira: 1 ponto. Na segunda tentativa: meio ponto. Errou duas vezes: zero.</li>
    <li>No fim do andar, a <b>Coruja Examinadora</b> aplica a <b>prova</b> (8 questões, sem dica). Nota do bimestre = 40% desafios + 60% prova.</li>
    <li>Depois do 4º bimestre vem a <b>média final</b>. Alcançou a média: aprovado! Não alcançou: <b>recuperação</b> com 10 questões de todo o conteúdo.</li>
    <li><b>XP</b> vem de monstros e, principalmente, de respostas certas. Acertos seguidos formam uma <b>sequência</b> que aumenta o XP em até 100%. Cada nível dá um talento.</li>
    <li>Gatos têm <b>9 vidas</b>. Perdeu toda a vida: o andar recomeça. Perdeu as 9: o curso recomeça, mas você mantém nível e talentos.</li>
    <li><b>Bola de Lã</b>: gaste 1 de mana e acerte uma pergunta para causar dano forte no inimigo mais próximo.</li>
    <li>Respondeu errado? A explicação aparece na hora. É a melhor hora de aprender.</li></ol>`,buttons:['Entendi']}).then(()=>{closeModal();mode='play'});
}
function showBoletim(){mode='modal';choiceModal({title:'Boletim',html:boletimHTML(),buttons:['Fechar']}).then(()=>{closeModal();mode='play'})}

/* ---- controles ---- */
document.querySelectorAll('[data-dir]').forEach(b=>{let t=null;const [dx,dy]=b.dataset.dir.split(',').map(Number);
  b.addEventListener('pointerdown',e=>{e.preventDefault();tryMove(dx,dy);clearInterval(t);t=setInterval(()=>tryMove(dx,dy),170)});
  ['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,()=>clearInterval(t)))});
$('waitBtn').onclick=()=>{if(mode==='play'){log('Você espera, de orelhas em pé.');endTurn()}};
$('spellBtn').onclick=castSpell;
$('bolBtn').onclick=()=>{if(mode==='play')showBoletim()};
$('helpBtn').onclick=()=>{if(mode==='play')showHelp()};
$('menuBtn').onclick=()=>{if(mode==='play')showMenu(true)};
addEventListener('keydown',e=>{
  if(e.target.tagName==='INPUT')return;
  if(mode!=='play'){if(modalKey)modalKey(e);return}
  const k=e.key;const map={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0],w:[0,-1],s:[0,1],a:[-1,0],d:[1,0],W:[0,-1],S:[0,1],A:[-1,0],D:[1,0]};
  if(map[k]){e.preventDefault();tryMove(...map[k]);return}
  if(k===' '||k==='.'){e.preventDefault();log('Você espera, de orelhas em pé.');endTurn();return}
  if(k==='m'||k==='M')castSpell();
  if(k==='b'||k==='B')showBoletim();
});

/* ---- início ---- */
SV=makeSave('laranja','',1,6);F=genFloor(1);P={x:F.start.x,y:F.start.y,hp:20,mana:3,face:1,flash:0};
prerenderMap();computeFOV();updateHUD();log('Escolha seu gatinho para começar.');
requestAnimationFrame(draw);
showMenu(false);
