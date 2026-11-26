# Masmorra dos Gatinhos

Roguelike de gatinhos em pixel art para **revisar a matéria da escola**. Você escolhe a matéria no menu, escolhe um gatinho e desce pela masmorra: cada andar tem desafios (baús, altares e esfinges), monstros e uma prova da Coruja Examinadora, com boletim, média e recuperação como na escola de verdade.

Matérias disponíveis:

| Matéria | Conteúdo | Estrutura |
|---|---|---|
| **Matemática** | 1º ao 6º ano (BNCC) | 6 zonas (anos) × 3 andares (trimestres) |
| **História** | Roma e Grécia Antiga, a partir do *Guia completo de revisão* | 4 andares (bimestres), um para cada bloco do guia |

Funciona só com HTML, CSS e JavaScript: sem build, sem dependências e sem servidor.

## Como o jogo funciona

| Escola | Jogo |
|---|---|
| Trabalhos e atividades | Desafios do andar: 1 ponto se acertar de primeira, 0,5 na segunda tentativa, 0 se errar duas vezes |
| Prova do período | Coruja Examinadora: 8 questões, sem dica |
| Nota do período | 40% desafios + 60% prova |
| Média | Média dos períodos. Ajustável: 5,0, 6,0 ou 7,0 |
| Recuperação | 10 questões de todo o conteúdo do ano (matemática) ou do curso (história) |
| Reprovação | O ano (ou o curso) recomeça, mas o nível e os talentos continuam |

Outros sistemas: XP e níveis com talentos, sequência de acertos (até +100% de XP), 9 vidas, a Bola de Lã (um feitiço que só funciona se a pergunta for respondida certo) e explicação em toda resposta errada.

O progresso fica salvo no `localStorage` do navegador, um save separado por matéria. É por aparelho: não sincroniza entre dispositivos.

### Matemática

Cada zona é um ano escolar e cada andar é um trimestre. A *avaliação diagnóstica* (5 perguntas) sugere em que ano começar. Os geradores sorteiam números, então as perguntas não se repetem.

### História: Roma e Grécia Antiga

| Bimestre | Zona da masmorra | Bloco do guia |
|---|---|---|
| 1º | Colina das Cabanas | Origem e formação de Roma (lenda de Rômulo e Remo, geografia, arqueologia) |
| 2º | Via dos Legionários | Evolução política e expansão (Monarquia, República, Império, a grande expansão) |
| 3º | Arena dos Gladiadores | Sociedade, cultura e política (gladiadores, pão e circo, calendário e ano bissexto) |
| 4º | Ágora de Atenas | Democracia: Atenas × atualidade |

Os andares seguintes também cobram os anteriores. No menu dá para **começar por um tema específico**, para treinar só um assunto. Nesse caso a média conta só os bimestres cursados. Tipos de pergunta: múltipla escolha com erros plausíveis, verdadeiro ou falso ("qual é a FALSA?"), números sorteados (séculos a.C., anos entre períodos, contas do calendário) e uma revisão geral no último andar. O sorteio evita repetir a mesma pergunta em sequência.

#### Diferenças em relação à folha

Ao conferir a folha com outras fontes, três afirmações foram corrigidas no jogo para não ensinar informação errada:

- **Rotação × translação:** a folha diz que o ano de 365 dias e 6 horas vem da "rotação" da Terra. O correto é **translação** (a volta ao redor do Sol). A rotação é o giro da Terra em torno de si mesma e dura 1 dia.
- **Tamanho do Império:** a folha diz 6,5 milhões de km². As fontes consultadas indicam cerca de 5 a 5,5 milhões de km² no auge (por volta de 117 d.C.). O jogo usa "cerca de 5 milhões".
- **Democracia de hoje:** a folha diz "voto direto para todos". A democracia de Atenas era direta, mas a de hoje é, na maioria dos países, **representativa**: todos votam para escolher representantes.

Duas observações, sem mudar o conteúdo: a população de "70 a 100 milhões" é uma estimativa do topo (outras ficam em 60 a 75 milhões), então o jogo diz "dezenas de milhões"; e 753 a.C. é uma data tradicional, ligada à lenda da fundação.

## Estrutura do projeto

```
index.html                       página e marcação da interface
css/style.css                    visual (pixel art, painéis, responsivo)
js/questoes-base.js              núcleo compartilhado: sorteio e montagem das opções
js/cursos/matematica.js          matéria: Matemática
js/cursos/historia-roma-grecia.js  matéria: História
js/game.js                       motor: mapa, combate, desafios, provas, boletim e menus
tests/check-questions.js         testa todas as matérias
favicon.svg
vercel.json
```

O motor (`game.js`) não conhece nenhuma matéria. Tudo que é de conteúdo vem do módulo de curso ativo.

## Rodar localmente

Abra o `index.html` no navegador, ou sirva a pasta:

```bash
npx serve .
# ou
python3 -m http.server 8000
```

Para testar (precisa do Node 18 ou mais novo):

```bash
node tests/check-questions.js
```

O teste confere a configuração de cada matéria (zonas, textos, opções de início, formatura) e cada gerador de pergunta: 4 opções diferentes, resposta certa entre elas, sem `undefined` ou `NaN`, e sem sorteio de conteúdo de anos ou bimestres futuros.

## Adicionar perguntas

**Matemática**, em `js/cursos/matematica.js`:

```js
def(3, 2, 'Divisão exata', () => Q(
  'Pergunta?', 'resposta certa', ['erro 1', 'erro 2', 'erro 3'],
  'Explicação mostrada depois', 'Dica'));
```

`def(ano, trimestre, habilidade, gerador)`. O gerador pode sortear números com `R(a, b)`.

**História**, em `js/cursos/historia-roma-grecia.js`:

```js
one(3, 'Gladiadores',                       // bimestre e habilidade
    'Quem eram os gladiadores?',            // pergunta
    'Atletas escravizados que buscavam fama e liberdade',   // resposta certa
    ['Senadores', 'Reis', 'Soldados livres e ricos'],       // 3 erros plausíveis
    'Eram atletas escravizados.',           // explicação
    'Eles lutavam para mudar de vida.');    // dica
```

Para o verdadeiro ou falso, acrescente frases às listas do `tf(...)` do bimestre: uma frase certa em `trues`, ou uma frase errada com a correção em `falses` (`['frase errada', 'o que é certo']`).

Rode `node tests/check-questions.js` depois de editar.

## Adicionar uma matéria

1. Crie `js/cursos/minha-materia.js` com um bloco `COURSES.minhamateria = { ... }`, usando `js/cursos/historia-roma-grecia.js` como modelo. Ele define o nome, o número de etapas e de períodos, as zonas (cores da masmorra), a dificuldade (`tier`), os textos, as opções de início, a formatura, a ajuda e os geradores de pergunta (`G` e `genQuestion`).
2. Inclua o arquivo em `index.html`, antes de `js/game.js`.
3. Rode `node tests/check-questions.js`. Ele aponta qualquer campo que estiver faltando.

O menu mostra a matéria nova automaticamente, com save próprio.

## Deploy

**GitHub Pages:** envie o conteúdo da pasta para a raiz de um repositório público, depois vá em *Settings → Pages*, escolha *Deploy from a branch*, a branch `main` e a pasta `/ (root)`.

**Vercel:** *Add New → Project*, importe o repositório, *Framework Preset* `Other`, sem *Build Command* nem *Output Directory*.

**Servidor próprio:** sirva a pasta com qualquer servidor de arquivos estáticos (nginx, Caddy etc.).

Os caminhos são todos relativos, então funciona também em subpastas, como `usuario.github.io/repositorio/`.

## Licença

MIT, por Diogo Rodrigues ([diogolabs.dev.br](https://diogolabs.dev.br)). Veja o arquivo `LICENSE`.
