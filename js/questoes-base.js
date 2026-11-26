/* Núcleo compartilhado por todas as matérias: sorteio, formatação e montagem das opções.
   Cada matéria é um módulo em js/cursos/ que se registra em COURSES (veja o README, "Adicionar uma matéria"). */
const COURSES={};
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const fmt=x=>{const r=Math.round(x*1000)/1000;return r.toLocaleString('pt-BR',{maximumFractionDigits:3})};
const S_=v=>typeof v==='number'?fmt(v):String(v);

/* Monta as 4 opções: a certa + até 3 erradas (sem repetir), embaralhadas.
   Q(pergunta, resposta, [erros plausíveis], explicação, dica) */
function Q(q,a,ds,exp,hint){
  a=S_(a);const o=[a];
  for(const d of ds){
    if(typeof d==='number'&&(d<0||!isFinite(d)))continue;
    const s=S_(d);
    if(s&&!s.includes('NaN')&&!s.includes('undefined')&&!o.includes(s))o.push(s);
    if(o.length===4)break;
  }
  if(o.length<4&&/^\d[\d.]*$/.test(a)){
    const n=parseInt(a.replace(/\./g,''),10);
    for(let k=1;o.length<4&&k<80;k++)for(const c of [n+k,n-k]){if(c>=0&&o.length<4){const s=fmt(c);if(!o.includes(s))o.push(s)}}
  }
  return {q,a,opts:shuffle(o),exp,hint};
}
