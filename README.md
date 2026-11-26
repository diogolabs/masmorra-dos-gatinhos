# Gatinhos de Roma

Roguelike de gatinhos em pixel art para **revisar História: Roma e Grécia Antiga**. É uma adaptação da *Masmorra dos Gatinhos* (que revisava matemática): o motor é o mesmo, mas as perguntas vêm do **Guia completo de revisão: Roma e Grécia Antiga**, e só dele.

Funciona só com HTML, CSS e JavaScript: sem build, sem dependências e sem servidor.

## Como o guia vira jogo

Cada um dos 4 blocos do guia é um andar da masmorra, ou seja, um bimestre:

| Bimestre | Zona da masmorra | Bloco do guia |
|---|---|---|
| 1º | Colina das Cabanas | 1. Origem e formação de Roma (lenda de Rômulo e Remo, geografia, arqueologia) |
| 2º | Via dos Legionários | 2. Evolução política e expansão (Monarquia, República, Império, a grande expansão) |
| 3º | Arena dos Gladiadores | 3. Sociedade, cultura e política (gladiadores, pão e circo, calendário e ano bissexto) |
| 4º | Ágora de Atenas | 4. Democracia: Atenas × atualidade |

A estrutura da escola continua igual à do jogo original:

| Escola | Jogo |
|---|---|
| Trabalhos e atividades | Desafios do andar (baús, altares, esfinges): 1 ponto de primeira, 0,5 na segunda tentativa |
| Prova do bimestre | Coruja Examinadora: 8 questões, sem dica |
| Nota do bimestre | 40% desafios + 60% prova |
| Média final | Média dos 4 bimestres. Ajustável: 5,0, 6,0 ou 7,0 |
| Recuperação | 10 questões de todo o conteúdo |
| Reprovação | O curso recomeça, mas o nível e os talentos continuam |

Os andares seguintes também cobram os anteriores (a prova é 70% do bimestre atual e 30% de revisão). No menu dá para **começar por um tema específico**, para treinar só um assunto. Nesse caso a média conta só os bimestres cursados.

Outros sistemas: XP e níveis com talentos, sequência de acertos (até +100% de XP), 9 vidas, Bola de Lã (feitiço que só funciona se a pergunta for respondida certo) e explicação em toda resposta errada.

O progresso fica salvo no `localStorage` do navegador. É por aparelho: não sincroniza entre dispositivos.

## Diferenças em relação à folha

Ao conferir a folha com outras fontes, três afirmações foram corrigidas no jogo para não ensinar informação errada:

- **Rotação × translação:** a folha diz que o ano de 365 dias e 6 horas vem da "rotação" da Terra. O correto é **translação** (a volta ao redor do Sol). A rotação é o giro da Terra em torno de si mesma e dura 1 dia.
- **Tamanho do Império:** a folha diz 6,5 milhões de km². As fontes consultadas indicam cerca de 5 a 5,5 milhões de km² no auge (por volta de 117 d.C.). O jogo usa "cerca de 5 milhões".
- **Democracia de hoje:** a folha diz "voto direto para todos". A democracia de Atenas era direta, mas a de hoje é, na maioria dos países, **representativa**: todos votam para escolher representantes.

Duas observações, sem mudar o conteúdo: a população de "70 a 100 milhões" é uma estimativa do topo (outras ficam em 60 a 75 milhões), então o jogo diz "dezenas de milhões"; e 753 a.C. é uma data tradicional, ligada à lenda da fundação.

## Tipos de pergunta

- **Perguntas diretas** de múltipla escolha, com erros plausíveis e explicação.
- **Verdadeiro ou falso:** o jogo sorteia 3 afirmações certas e 1 errada ("qual é FALSA?") ou o contrário. Cada bloco tem uma lista de afirmações, então saem muitas combinações.
- **Perguntas com números sorteados:** datas e séculos a.C., tempo entre períodos, contas do calendário (365 − 355, 6 h × 4 anos) e anos bissextos.
- **Revisão geral** (só no 4º andar): afirmações misturadas de todos os blocos.

O sorteio evita repetir a mesma pergunta em sequência.

## Estrutura

```
index.html            página e marcação da interface
css/style.css         visual (pixel art, painéis, responsivo)
js/questions.js       banco de perguntas por bimestre
js/game.js            motor: mapa, combate, desafios, provas, boletim, menus
tests/check-questions.js  testa todas as perguntas
favicon.svg
vercel.json
```

## Rodar localmente

Abra o `index.html` no navegador, ou sirva a pasta:

```bash
npx serve .
# ou
python3 -m http.server 8000
```

Para testar as perguntas (precisa do Node 18 ou mais novo):

```bash
node tests/check-questions.js
```

O teste confere que toda pergunta tem 4 opções diferentes, que a resposta certa está entre elas, que não há `undefined` ou `NaN` no texto e que cada bimestre só sorteia conteúdo dele e dos anteriores.

## Adicionar perguntas

Em `js/questions.js`:

```js
one(3, 'Gladiadores',                       // bimestre e habilidade
    'Quem eram os gladiadores?',            // pergunta
    'Atletas escravizados que buscavam fama e liberdade',   // resposta certa
    ['Senadores', 'Reis', 'Soldados livres e ricos'],       // 3 erros plausíveis
    'Eram atletas escravizados.',           // explicação mostrada depois
    'Eles lutavam para mudar de vida.');    // dica
```

Para o verdadeiro ou falso, acrescente frases às listas do `tf(...)` do bimestre: uma frase certa em `trues`, ou uma frase errada com a correção em `falses` (`['frase errada', 'o que é certo']`). Rode `node tests/check-questions.js` depois de editar.

## Deploy na Vercel

1. Em vercel.com, clique em **Add New → Project** e importe o repositório.
2. **Framework Preset:** `Other`. Deixe o *Build Command* e o *Output Directory* vazios.
3. Clique em **Deploy**. Pronto: é um site estático.

Pela linha de comando: `npx vercel` dentro da pasta. Também funciona no GitHub Pages, no Netlify ou em qualquer hospedagem de arquivos estáticos.

## Licença

MIT
