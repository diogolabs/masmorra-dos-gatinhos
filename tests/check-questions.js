// Valida todas as matérias em js/cursos/: configuração do módulo e cada gerador de pergunta.
// Uso: node tests/check-questions.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const js = path.join(__dirname, '..', 'js');
const ctx = { esc: s => String(s), nf: n => n.toFixed(1) };   // o motor define esc e nf; aqui só como stub
vm.createContext(ctx);
const files = ['questoes-base.js', ...fs.readdirSync(path.join(js, 'cursos')).filter(f => f.endsWith('.js')).sort().map(f => 'cursos/' + f)];
for (const f of files) vm.runInContext(fs.readFileSync(path.join(js, f), 'utf8'), ctx, { filename: f });
const COURSES = vm.runInContext('COURSES', ctx);
let bad = 0;
const fail = (msg, extra) => { bad++; if (bad < 15) console.log('FALHA', msg, extra === undefined ? '' : JSON.stringify(extra)); };
const N = 1500;
const campos = ['id', 'nome', 'sub', 'intro', 'etapas', 'periodos', 'perNome', 'conta', 'etapaLabel', 'hud', 'zone', 'tier', 'puzzles', 'nMons', 'mon', 'spellXP', 'gradBonus', 'startLevel', 'startTitle', 'startOptions', 'mediaTitle', 'spellSub', 'reprova', 'restartBtn', 'resultBtn', 'txt', 'formatura', 'help', 'G', 'genQuestion'];
const resumo = [];

for (const [id, C] of Object.entries(COURSES)) {
  const tag = `[${id}]`;
  if (C.id !== id) fail(tag, 'id diferente da chave');
  for (const k of campos) if (C[k] === undefined) fail(tag, `falta o campo "${k}"`);
  for (const k of ['mediaAdj', 'recEscopo', 'passa', 'reprovaMsg', 'deathReset', 'floorLog']) if (!C.txt || C.txt[k] === undefined) fail(tag, `falta txt.${k}`);
  // configuração de cada etapa e período
  for (let et = 1; et <= C.etapas; et++) for (let per = 1; per <= C.periodos; per++) {
    const z = C.zone(et, per);
    if (!z || !z.name || z.wall.length !== 3 || z.floor.length !== 3) fail(tag + ' zona inválida', { et, per });
    if (!(C.tier(et, per) >= 1)) fail(tag + ' tier inválido', { et, per });
    if (!Array.isArray(C.puzzles(et, per)) || C.puzzles(et, per).length < 4) fail(tag + ' desafios', { et, per });
    if (!(C.nMons(et, per) >= 1)) fail(tag + ' nMons', { et, per });
    if (!(C.spellXP(et, per) >= 1)) fail(tag + ' spellXP', { et, per });
    if (!C.hud(et, per)) fail(tag + ' hud', { et, per });
    if (!C.txt.floorLog({ ano: et, tri: per })) fail(tag + ' floorLog', { et, per });
  }
  if (!(C.gradBonus(1) >= 1)) fail(tag + ' gradBonus');
  for (const o of C.startOptions) {
    if (!(o.et >= 1 && o.et <= C.etapas && o.per >= 1 && o.per <= C.periodos && o.label && o.resumo)) fail(tag + ' opção de início inválida', o);
    if (!(C.startLevel(o) >= 1)) fail(tag + ' startLevel', o);
  }
  const f = C.formatura({ heroName: 'Teste', ano: C.etapas, grades: { [C.etapas]: { media: 7 } } }, false, 0, 10);
  if (!f.title || !f.stamp || !f.texto || !f.stampClass) fail(tag + ' formatura incompleta', f);
  if (C.etapas > 1 && !(C.zone(2, 1) && C.etapaLabel(2))) fail(tag + ' sem dados da próxima etapa');
  // cada gerador de pergunta
  for (const g of C.G) for (let i = 0; i < N; i++) {
    const q = g.fn();
    const ok = q.opts.length === 4 && new Set(q.opts).size === 4 && q.opts.includes(q.a)
      && !/NaN|undefined|Infinity/.test(q.q + q.opts.join() + q.exp) && q.hint && q.exp;
    if (!ok) fail(`${tag} ${g.skill}`, q);
  }
  // sorteio completo: todos os modos, etapas e períodos
  for (const mode of ['floor', 'prova', 'rec']) for (let et = 1; et <= C.etapas; et++) for (let per = 1; per <= C.periodos; per++) for (let i = 0; i < 120; i++) {
    const q = C.genQuestion(et, per, mode);
    if (!q.tag || !q.skill || !q.opts || q.opts.length !== 4 || !q.opts.includes(q.a)) fail(`${tag} sorteio ${mode} ${et}/${per}`, q);
    if (q.ano !== undefined && q.ano > et) fail(`${tag} sorteou conteúdo de etapa futura`, { et, ano: q.ano });
    if (mode !== 'rec' && q.bim !== undefined && q.bim > per) fail(`${tag} sorteou conteúdo de período futuro`, { per, bim: q.bim });
  }
  if (C.diag) for (let a = 2; a <= C.etapas; a++) for (let i = 0; i < 100; i++) { const q = C.genQuestion(a, 3, 'diag'); if (q.ano !== a) fail(tag + ' diagnóstica fora do ano', { a, ano: q.ano }); }
  if (C.antiRepeat) {
    let rep = 0;
    for (let k = 0; k < 300; k++) { const seen = new Set(); for (let i = 0; i < 12; i++) { const q = C.genQuestion(1, C.periodos, 'floor'); const key = q.q + '|' + q.a; if (seen.has(key)) rep++; seen.add(key); } }
    if (rep) fail(`${tag} ${rep} repetições em sequências de 12`);
  }
  resumo.push(`${C.nome}: ${C.G.length} habilidades`);
}
const total = Object.values(COURSES).reduce((n, c) => n + c.G.length, 0);
console.log(`${Object.keys(COURSES).length} matérias (${resumo.join(' · ')}) · ${total * N} questões testadas · ${bad} falhas`);
process.exit(bad ? 1 : 0);
