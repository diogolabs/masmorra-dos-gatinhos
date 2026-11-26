// Verifica todas as questões: 4 opções distintas, resposta presente, sem NaN/undefined,
// explicação e dica preenchidas, e cobertura dos 4 bimestres.
// Uso: node tests/check-questions.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const code = fs.readFileSync(path.join(__dirname, '..', 'js', 'questions.js'), 'utf8');
const ctx = {};
vm.createContext(ctx);
vm.runInContext(code + '\nthis.G = G; this.genQuestion = genQuestion; this.THEMES = THEMES;', ctx);
const N = 1500;
let bad = 0;
const fail = (msg, q) => { bad++; if (bad < 12) console.log('FALHA', msg, JSON.stringify(q)); };
for (const g of ctx.G) {
  for (let i = 0; i < N; i++) {
    const q = g.fn();
    const ok = q.opts.length === 4 && new Set(q.opts).size === 4 && q.opts.includes(q.a)
      && !/NaN|undefined|Infinity/.test(q.q + q.opts.join() + q.exp) && q.hint && q.exp;
    if (!ok) fail(`${g.bim}º bim · ${g.skill}`, q);
  }
}
// sorteio completo: todos os modos e bimestres
for (const mode of ['floor', 'prova', 'rec']) {
  for (let bim = 1; bim <= 4; bim++) {
    for (let i = 0; i < 400; i++) {
      const q = ctx.genQuestion(bim, mode);
      if (mode !== 'rec' && q.bim > bim) fail(`${mode} bim ${bim} sorteou conteúdo do bimestre ${q.bim}`, q);
      if (!q.tema || !q.skill) fail('sem tema/habilidade', q);
    }
  }
}
// em 12 perguntas seguidas de um andar não deve repetir a mesma pergunta
let rep = 0;
for (let k = 0; k < 300; k++) {
  const seen = new Set();
  for (let i = 0; i < 12; i++) { const q = ctx.genQuestion(4, 'floor'); const key = q.q + '|' + q.a; if (seen.has(key)) rep++; seen.add(key); }
}
if (rep) fail(`${rep} repetições em sequências de 12`, {});
const por = [1, 2, 3, 4].map(b => `${b}º bim: ${ctx.G.filter(g => g.bim === b).length}`).join(' · ');
console.log(`${ctx.G.length} habilidades (${por}) · ${ctx.G.length * N} questões testadas · ${bad} falhas`);
process.exit(bad ? 1 : 0);
