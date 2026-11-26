/* Curso: História, Roma e Grécia Antiga. 4 andares, um para cada bloco do "Guia completo de revisão",
   todos no mesmo "ano" e cada andar é um bimestre.
     1 Origem e formação de Roma · 2 Evolução política e expansão
     3 Sociedade, cultura e política · 4 Democracia: Atenas × atualidade
   Para adicionar uma pergunta:
     one(bimestre, 'Habilidade', 'Pergunta?', 'Resposta certa', ['erro 1','erro 2','erro 3'], 'Explicação', 'Dica')
   Para adicionar afirmações de verdadeiro ou falso, use as listas das chamadas tf(...) de cada bimestre. */
(function(){
const THEMES=[null,
  {short:'Origem de Roma',title:'Origem e formação de Roma'},
  {short:'Política e expansão',title:'Evolução política e expansão'},
  {short:'Sociedade e cultura',title:'Sociedade, cultura e política'},
  {short:'Democracia',title:'Democracia: Atenas × atualidade'},
];
const ZONES=[null,
  {name:'Colina das Cabanas',wall:['#6b4a3a','#3e2a20','#8a654f'],floor:['#3a2a24','#34251f','#41302a']},
  {name:'Via dos Legionários',wall:['#7a3b2e','#4d2219','#9e5241'],floor:['#2e1c18','#281814','#352019']},
  {name:'Arena dos Gladiadores',wall:['#8a6a3a','#58401f','#b08a4e'],floor:['#3a2e1f','#352a1b','#42341f']},
  {name:'Ágora de Atenas',wall:['#3f6f9a','#26425e','#6a9cc9'],floor:['#1c2a3a','#182534','#213244']},
];
const G=[];
function def(bim,skill,fn){G.push({bim,skill,fn})}
function one(bim,skill,q,a,ds,exp,hint){def(bim,skill,()=>Q(q,a,ds,exp,hint))}

/* Verdadeiro ou falso: sorteia 3 afirmações certas + 1 errada (ou o contrário). */
function tf(bim,skill,trues,falses,tema){
  def(bim,skill,()=>{
    let q;
    if(Math.random()<0.5){
      const f=pick(falses),t=shuffle(trues.slice()).slice(0,3);
      q=Q('Qual afirmação é FALSA?',f[0],t,`A falsa é a que diz: "${f[0]}" Na verdade: ${f[1]}`,'Três afirmações estão certas. Procure a que contradiz o que você estudou.');
    }else{
      const t=pick(trues),fs=shuffle(falses.slice()).slice(0,3);
      q=Q('Qual afirmação é VERDADEIRA?',t,fs.map(x=>x[0]),`Certa: "${t}" Nas outras: ${fs.map(x=>x[1]).join(' ')}`,'Três afirmações têm um erro escondido. Leia com calma.');
    }
    if(tema)q.tema=tema;
    return q;
  });
}

/* ================= 1º BIMESTRE · ORIGEM E FORMAÇÃO DE ROMA ================= */
one(1,'Lenda de Rômulo e Remo','Segundo a lenda, quem eram Rômulo e Remo?','Irmãos gêmeos abandonados quando bebês',['Dois generais do exército romano','Filhos do primeiro imperador','Dois gladiadores escravizados'],'A lenda conta que eram irmãos gêmeos, abandonados quando bebês e salvos por uma loba.','Pense em dois bebês abandonados e um animal que cuidou deles.');
one(1,'Lenda de Rômulo e Remo','Que animal salvou e amamentou os gêmeos Rômulo e Remo, segundo a lenda?','Uma loba',['Uma gata','Uma leoa','Uma águia'],'Segundo a lenda, uma loba amamentou os dois irmãos. (Nada de gatinha desta vez, miau!)','É um animal parecido com um cachorro grande, que vive em matilhas.');
one(1,'Lenda de Rômulo e Remo','Quem se tornou o primeiro rei de Roma depois de fundar a cidade, segundo a lenda?','Rômulo',['Remo','Otávio Augusto','Júlio César'],'Rômulo fundou a cidade e foi seu primeiro rei. Otávio Augusto e Júlio César viveram muito tempo depois.','O nome da cidade, Roma, lembra o nome do primeiro rei.');
one(1,'Lenda de Rômulo e Remo','Para que serve a lenda de Rômulo e Remo?','Dar uma explicação simbólica e mística para a origem de Roma',['Registrar com provas a data exata de uma guerra','Explicar como os romanos criaram o calendário','Mostrar como era a votação em Atenas'],'A lenda é uma história simbólica e mística sobre como Roma teria nascido. Ela não é uma prova científica.','Lendas e mitos explicam origens de um jeito simbólico.');
one(1,'Geografia de Roma','Em qual rio Roma surgiu, na região do Lácio?','Rio Tibre',['Rio Nilo','Rio Danúbio','Rio Amazonas'],'Roma surgiu na margem esquerda do Rio Tibre, que era navegável.','O nome do rio começa com "Ti".');
one(1,'Geografia de Roma','Roma surgiu às margens do Tibre. Em qual região ela ficava?','Lácio',['Etrúria','Campânia','Atenas'],'Roma surgiu na região do Lácio. A Etrúria ficava ao norte e a Campânia ao sul. Atenas é uma cidade da Grécia.','O nome da região começa com a letra L.');
one(1,'Geografia de Roma','Por que a Ilha Tiberina ajudou no surgimento de Roma?','Ficava perto e facilitava a travessia do rio',['Era onde ficava o Senado','Era uma fortaleza dos reis etruscos','Nela aconteciam as lutas de gladiadores'],'A proximidade com a Ilha Tiberina facilitava a travessia do rio Tibre.','Pense em como é útil ter uma "ponte natural" para atravessar um rio.');
one(1,'Geografia de Roma','Roma era um ponto de passagem natural das rotas comerciais. O comércio de qual produto ela controlava?','Sal',['Seda','Ouro','Vinho'],'Roma controlava o comércio de sal e a movimentação entre o norte (Etrúria) e o sul (Campânia).','É um tempero que usamos na comida.');
one(1,'Geografia de Roma','Roma ficava no caminho entre quais duas regiões?','Etrúria (norte) e Campânia (sul)',['Atenas e Esparta','Egito e Pérsia','Gália e Britânia'],'Roma era ponto de passagem natural entre o norte (Etrúria) e o sul (Campânia).','Uma ficava ao norte e a outra ao sul de Roma.');
one(1,'Geografia de Roma','Como as colinas escarpadas ajudavam Roma?','Davam forte defesa natural contra invasores',['Serviam de plantação de trigo','Guardavam o calendário','Eram usadas como arenas'],'Colinas escarpadas são íngremes e difíceis de subir. Isso protegia a cidade de invasores.','Escarpadas = bem íngremes. Imagine tentar atacar morro acima.');
one(1,'Arqueologia e primeiros povos','O que os arqueólogos encontraram nas colinas de Roma, do século VIII a.C.?','Vestígios de pequenas cabanas e tumbas',['Palácios de mármore e teatros','Estátuas de imperadores','Restos de grandes arenas de pedra'],'Foram achados vestígios de pequenas cabanas e tumbas. Os primeiros povos viviam em comunidades simples.','Eram construções pequenas e simples, não grandes monumentos.');
one(1,'Arqueologia e primeiros povos','Em quais colinas foram achados vestígios de cabanas e tumbas?','Palatino, Esquilino e Quirinal',['Olimpo, Acrópole e Partenon','Vesúvio, Etna e Alpes','Tibre, Lácio e Campânia'],'Os vestígios foram achados nas colinas Palatino, Esquilino e Quirinal.','Os três nomes terminam em "ino", "ino" e "nal".');
one(1,'Arqueologia e primeiros povos','Como nasceu a cidade real de Roma?','Da união de pequenas e simples comunidades tribais que se integraram com o tempo',['De uma grande cidade fundada de uma só vez por um imperador','Da invasão de um grande exército estrangeiro','De uma decisão do Senado'],'A cidade real nasceu da união de pequenas comunidades tribais que foram se integrando com o tempo.','Roma não nasceu pronta. Foi crescendo aos poucos.');
one(1,'Arqueologia e primeiros povos','Qual ciência estuda os vestígios do passado, como as cabanas e tumbas encontradas nas colinas de Roma?','Arqueologia',['Astronomia','Geografia','Matemática'],'A Arqueologia estuda o passado por meio de vestígios, como cabanas, tumbas e objetos antigos.','Quem escava a terra procurando objetos antigos.');
tf(1,'Verdadeiro ou falso: origem de Roma',
  ['Roma surgiu na margem esquerda do Rio Tibre.','Rômulo e Remo foram salvos por uma loba, segundo a lenda.','Rômulo foi o primeiro rei de Roma, segundo a lenda.','As colinas escarpadas davam a Roma uma forte defesa natural.','Roma controlava o comércio de sal.','Foram achados vestígios de cabanas e tumbas do século VIII a.C. nas colinas de Roma.','A cidade real nasceu da união de pequenas comunidades tribais.','A Ilha Tiberina facilitava a travessia do rio.'],
  [['Rômulo e Remo foram criados por uma águia.','Eles foram amamentados por uma loba.'],['Roma surgiu à beira do mar, longe de qualquer rio.','Roma surgiu na margem do Rio Tibre.'],['Remo foi o primeiro rei de Roma, segundo a lenda.','O primeiro rei foi Rômulo.'],['Os arqueólogos só acharam palácios de mármore nas colinas.','Eles acharam pequenas cabanas e tumbas.'],['Roma ficava isolada, longe das rotas comerciais.','Roma era um ponto de passagem natural das rotas comerciais.'],['Roma surgiu na região da Campânia, ao sul.','Roma surgiu na região do Lácio.'],['Roma nasceu de uma única cidade enorme, já com Senado e imperador.','Ela nasceu da união de pequenas comunidades tribais.']]);

/* ================= 2º BIMESTRE · EVOLUÇÃO POLÍTICA E EXPANSÃO ================= */
const PER=[
  {n:'Monarquia',art:'a Monarquia',de:'da Monarquia',loc:'na Monarquia',y:'753 a.C.',who:'Os reis'},
  {n:'República',art:'a República',de:'da República',loc:'na República',y:'509 a.C.',who:'O Senado'},
  {n:'Império',art:'o Império',de:'do Império',loc:'no Império',y:'27 a.C.',who:'O imperador'},
];
def(2,'Linha do tempo política',()=>{
  const p=pick(PER),others=PER.filter(x=>x!==p),m=R(0,2);
  if(m===0)return Q(`Qual período da história de Roma começou em ${p.y}?`,p.n,[...others.map(x=>x.n),'Democracia ateniense'],`${p.y} marca o início ${p.de}. A ordem é: Monarquia (753 a.C.), República (509 a.C.) e Império (27 a.C.).`,'Lembre da ordem: reis, depois Senado, depois imperador.');
  if(m===1)return Q(`Em que ano começou ${p.art} em Roma?`,p.y,[...others.map(x=>x.y),'100 a.C.'],`${p.art[0].toUpperCase()+p.art.slice(1)} começou em ${p.y}${p.n==='Monarquia'?' (data tradicional, ligada à lenda da fundação)':''}. Datas a.C. diminuem conforme o tempo passa: 753, 509 e 27.`,'Monarquia 753, República 509, Império 27 (todas a.C.).');
  return Q(`Em Roma, quem tinha o poder ${p.loc}?`,p.who,[...others.map(x=>x.who),'O povo, por voto direto'],`${p.loc[0].toUpperCase()+p.loc.slice(1)}, o poder ficava com ${p.who[0].toLowerCase()+p.who.slice(1)}.`,'Monarquia = governo de reis. República = liderada pelo Senado. Império = poder centralizado no imperador.');
});
one(2,'Linha do tempo política','Qual é a ordem correta dos governos de Roma, do mais antigo ao mais recente?','Monarquia → República → Império',['República → Monarquia → Império','Império → República → Monarquia','Monarquia → Império → República'],'Primeiro vieram os reis (753 a.C.), depois a República (509 a.C.) e por fim o Império (27 a.C.).','O Império, com o imperador, foi o último.');
one(2,'Linha do tempo política','Qual governo de Roma veio logo antes da República?','Monarquia (governo de reis)',['Império','Democracia ateniense','Governo dos gladiadores'],'Antes da República (509 a.C.) o governo era a Monarquia (753 a.C.), liderada por reis.','Foi o primeiro governo de Roma.');
one(2,'Linha do tempo política','Qual governo de Roma veio logo depois da República?','Império (poder centralizado no imperador)',['Monarquia','Democracia ateniense','Governo dos senadores e reis juntos'],'Depois da República (509 a.C.) veio o Império (27 a.C.), com o poder centralizado no imperador.','Foi o último dos três governos.');
one(2,'Linha do tempo política','No Império romano, onde ficava concentrado o poder?','Nas mãos do imperador',['Nas mãos do Senado','Dividido entre vários reis','Nas mãos do povo, por voto direto'],'No Império (27 a.C.) o poder ficou centralizado no imperador.','"Centralizado" quer dizer concentrado em uma pessoa só.');
def(2,'Séculos e datas a.C.',()=>{
  const rom=['','I','II','III','IV','V','VI','VII','VIII','IX','X'];
  const d=pick([['753 a.C.',8],['509 a.C.',6],['27 a.C.',1]]),n=d[1];
  const ds=[`Século ${rom[n+1]} a.C.`,`Século ${rom[n+2]} a.C.`,`Século ${rom[n]} d.C.`];
  if(n>1)ds.unshift(`Século ${rom[n-1]} a.C.`);
  return Q(`A data de ${d[0]} pertence a qual século?`,`Século ${rom[n]} a.C.`,ds,`No a.C. os anos diminuem com o tempo. De ${(n-1)*100+1} a ${n*100} a.C. é o século ${rom[n]} a.C., então ${d[0]} está nele.`,'No a.C., de 1 a 100 é o século I, de 101 a 200 é o II, e assim por diante.');
});
def(2,'Tempo entre os períodos',()=>{
  if(R(0,1))return Q('A Monarquia começou em 753 a.C. e a República em 509 a.C. Quantos anos separam essas duas datas?',244,[1262,254,234],'As duas datas são a.C., então subtraímos: 753 − 509 = 244 anos.','Os dois anos são a.C.: subtraia o menor do maior.');
  return Q('A República começou em 509 a.C. e o Império em 27 a.C. Quantos anos separam essas duas datas?',482,[536,492,472],'As duas datas são a.C., então subtraímos: 509 − 27 = 482 anos.','Os dois anos são a.C.: subtraia o menor do maior.');
});
one(2,'A Grande Expansão','O que permitiu a Roma crescer e dominar tantos territórios?','Um exército forte e conquistas contínuas',['O isolamento, sem contato com outros povos','O voto direto de todos os cidadãos','Um calendário de 365 dias'],'Com um exército forte e conquistas contínuas, Roma cresceu por mais de 500 anos.','Pense no que é preciso para conquistar terras.');
one(2,'A Grande Expansão','Por quanto tempo Roma cresceu com conquistas contínuas?','Por mais de 500 anos',['Por cerca de 50 anos','Por cerca de 100 anos','Por mais de 2.000 anos'],'Roma cresceu por mais de 500 anos, até virar uma enorme potência.','São vários séculos de conquistas.');
one(2,'A Grande Expansão','Quais regiões Roma dominou na época da grande expansão?','A maior parte da Europa, o norte da África e o Oriente Médio',['Apenas a Península Itálica','A América do Sul e a Oceania','Toda a Ásia e a Austrália'],'Roma dominou a maior parte da Europa, o norte da África e o Oriente Médio.','Eram três regiões ao redor do mar que os romanos controlavam.');
one(2,'A Grande Expansão','Qual era a extensão do Império Romano no auge (por volta do ano 117 d.C.)?','Cerca de 5 milhões de km²',['Cerca de 50 mil km²','Cerca de 500 mil km²','Cerca de 50 milhões de km²'],'No auge, o Império tinha cerca de 5 a 5,5 milhões de km². Para comparar, o Brasil tem cerca de 8,5 milhões de km².','Foi um território enorme, mas menor que o do Brasil.');
one(2,'A Grande Expansão','Quantos habitantes o Império Romano chegou a ter no auge?','Dezenas de milhões (as estimativas vão de cerca de 60 a mais de 70 milhões)',['Algumas dezenas de milhares','Menos de 1 milhão','Cerca de 1 bilhão'],'Ninguém sabe o número exato. Os historiadores estimam dezenas de milhões de habitantes, em geral entre 60 e 100 milhões.','Foram muitas pessoas, mas não chega perto de 1 bilhão.');
one(2,'A Grande Expansão','Roma se tornou uma grande potência em quais áreas?','Militar, econômica e cultural',['Apenas religiosa','Apenas marítima','Apenas agrícola'],'Roma virou uma enorme potência militar, econômica e cultural.','Foram três tipos de poder.');
one(2,'A Grande Expansão','Roma cresceu por mais de 500 anos. Isso equivale a quantos séculos?','Mais de 5 séculos',['Mais de 50 séculos','Mais de 1 século','Mais de 500 séculos'],'Um século tem 100 anos, então 500 anos são 5 séculos.','Um século = 100 anos.');
tf(2,'Verdadeiro ou falso: política e expansão',
  ['A Monarquia romana começou em 753 a.C.','Na República, quem liderava Roma era o Senado.','O Império começou em 27 a.C., com o poder centralizado no imperador.','Roma cresceu por mais de 500 anos com conquistas contínuas.','O Império chegou a ter cerca de 5 milhões de km².','O Império abrigou dezenas de milhões de habitantes, segundo as estimativas dos historiadores.','Roma dominou a maior parte da Europa, o norte da África e o Oriente Médio.','Um exército forte foi essencial para a expansão de Roma.'],
  [['A República romana começou em 753 a.C.','753 a.C. marca o início da Monarquia. A República começou em 509 a.C.'],['Na Monarquia, o governo era liderado pelo Senado.','Na Monarquia, quem governava eram os reis.'],['O Império foi o primeiro governo de Roma.','O primeiro foi a Monarquia, depois a República e só então o Império.'],['No Império, o poder era dividido entre todos os cidadãos.','No Império, o poder era centralizado no imperador.'],['Roma dominou apenas a Península Itálica.','Roma dominou a maior parte da Europa, o norte da África e o Oriente Médio.'],['A expansão de Roma durou menos de 50 anos.','A expansão durou mais de 500 anos.'],['O Império tinha cerca de 65 mil km² e poucos habitantes.','O Império tinha cerca de 5 milhões de km² e dezenas de milhões de habitantes.']]);

/* ================= 3º BIMESTRE · SOCIEDADE, CULTURA E POLÍTICA ================= */
one(3,'Gladiadores','Como começaram os combates de gladiadores?','Como rituais fúnebres no sul da Itália',['Como festas de colheita em Atenas','Como treinos do exército da República','Como disputas de voto no Senado'],'Os combates começaram como rituais fúnebres no sul da Itália. Depois perderam o caráter sagrado.','Eram cerimônias ligadas a um momento triste.');
one(3,'Gladiadores','O que aconteceu com os combates de gladiadores com o passar do tempo?','Perderam o caráter sagrado e viraram grandes espetáculos nas arenas',['Foram proibidos pelos reis','Viraram aulas de astronomia','Tornaram-se cerimônias ainda mais sagradas'],'Eles perderam o caráter sagrado e viraram grandes espetáculos para multidões nas arenas.','De ritual passou a ser diversão para o público.');
one(3,'Gladiadores','Quem eram os gladiadores?','Atletas escravizados que buscavam fama e liberdade',['Senadores que lutavam por esporte','Reis que treinavam o exército','Soldados livres e ricos'],'Os gladiadores eram atletas escravizados que buscavam fama e liberdade.','Eles lutavam para mudar de vida.');
one(3,'Gladiadores','O que os gladiadores buscavam ao lutar nas arenas?','Fama e liberdade',['Votos e cargos no Senado','Terras e colheitas','O trono de imperador'],'Eram atletas escravizados que buscavam fama e liberdade.','Eram pessoas escravizadas. O que elas mais queriam?');
one(3,'Gladiadores','Onde aconteciam os grandes espetáculos de gladiadores?','Nas arenas',['Nas assembleias da Ágora','Nos templos do Rio Tibre','Nos campos de plantio'],'Os combates viraram grandes espetáculos para multidões nas arenas.','É um lugar redondo com arquibancadas, como o Coliseu da folha.');
one(3,'Pão e circo','O que significa a "política do pão e circo"?','Dar trigo de graça e espetáculos para o povo',['Cobrar impostos de padarias e teatros','Proibir festas para controlar o povo','Ensinar o povo a plantar trigo e a ler'],'Governantes distribuíam trigo de graça e ofereciam espetáculos. Esse era o "pão e circo".','Pão = comida. Circo = diversão.');
one(3,'Pão e circo','Que governante ampliou os espetáculos e distribuiu trigo de graça, segundo a folha?','Otávio Augusto',['Júlio César','Rômulo','Remo'],'O imperador Otávio Augusto ampliou os espetáculos e distribuiu trigo de graça. Júlio César aparece em outra parte: o calendário.','Foi um imperador.');
one(3,'Pão e circo','Para que servia a política do pão e circo?','Manter o povo distraído, ganhar popularidade e conter revoltas dos mais pobres',['Ensinar o povo a votar','Preparar soldados para a guerra','Aumentar o número de escravizados'],'Os governantes queriam manter o povo distraído, ganhar popularidade e evitar revoltas dos cidadãos mais pobres.','O objetivo era agradar ao povo para evitar problemas.');
one(3,'Pão e circo','Que alimento era distribuído de graça no "pão e circo"?','Trigo',['Sal','Peixe','Vinho'],'Os governantes distribuíam trigo de graça. O sal aparece no 1º bimestre, no comércio do Rio Tibre.','O pão é feito com ele.');
one(3,'Calendário e ano bissexto','Quantos dias tinha o antigo calendário romano?','355 dias',['365 dias','366 dias','300 dias'],'O antigo calendário romano tinha 355 dias e ficava fora de sincronia com as estações.','É um número com 5 no final, bem perto de 365.');
one(3,'Calendário e ano bissexto','Qual era o problema do calendário romano de 355 dias?','Causava grande descompasso com as estações do ano',['Tinha meses demais','Não tinha o mês de fevereiro','Sempre começava no inverno'],'O calendário de 355 dias saía do ritmo das estações, o que atrapalhava o plantio e a colheita.','Estações = primavera, verão, outono e inverno.');
one(3,'Calendário e ano bissexto','Quem mandou criar o calendário de 365 dias?','Júlio César',['Otávio Augusto','Rômulo','Remo'],'No século I a.C., por ordem de Júlio César, astrônomos criaram o calendário de 365 dias.','Foi um governante romano famoso. Não foi o do pão e circo.');
one(3,'Calendário e ano bissexto','Quem criou o calendário de 365 dias, por ordem de Júlio César?','Astrônomos',['Gladiadores','Senadores','Arqueólogos'],'Astrônomos, que estudam o céu e os astros, criaram o calendário de 365 dias.','Quem estuda os astros e a duração do ano?');
one(3,'Calendário e ano bissexto','Em qual mês foi adicionado um dia extra a cada quatro anos?','Fevereiro',['Janeiro','Julho','Dezembro'],'Foi adicionado um dia extra a fevereiro a cada quatro anos: é o ano bissexto.','É o mês mais curto do ano.');
one(3,'Calendário e ano bissexto','De quantos em quantos anos temos um ano bissexto?','De 4 em 4 anos',['De 2 em 2 anos','De 10 em 10 anos','De 100 em 100 anos'],'A cada quatro anos adicionamos um dia extra em fevereiro: o ano bissexto.','Quantos anos de 6 horas sobrando juntam um dia inteiro?');
one(3,'Calendário e ano bissexto','Por que as datas do calendário precisam combinar com as estações?','Para saber a época certa de plantio e colheita',['Para marcar as lutas de gladiadores','Para escolher o dia de votar','Para saber quando os reis seriam escolhidos'],'O ano bissexto garantiu que as datas combinassem com as estações de plantio e colheita.','Quem planta precisa saber a hora certa.');
one(3,'Calendário e ano bissexto','A Terra leva cerca de 365 dias e 6 horas para dar uma volta completa ao redor do Sol. Como se chama esse movimento?','Translação',['Rotação','Eclipse','Fases da Lua'],'A volta da Terra ao redor do Sol é a translação e dura cerca de 365 dias e 6 horas. A rotação é o giro da Terra em torno de si mesma e dura cerca de 24 horas (1 dia).','Rotação dura 1 dia. A volta ao redor do Sol demora um ano.');
def(3,'Contas do calendário',()=>{
  const m=R(0,4);
  if(m===0)return Q('O ano da Terra dura cerca de 365 dias e 6 horas. Se o calendário tem 365 dias, quantas horas sobram em 4 anos?','24 horas (1 dia inteiro)',['6 horas','12 horas','48 horas (2 dias)'],'Sobram 6 horas por ano. Em 4 anos: 6 × 4 = 24 horas, que formam 1 dia. Esse é o dia extra de fevereiro.','Faça 6 × 4.');
  if(m===1)return Q('Quantos dias o calendário de 365 dias tem a mais que o antigo calendário romano de 355 dias?',10,[20,12,5],'365 − 355 = 10 dias a mais.','Subtraia: 365 − 355.');
  if(m===2)return Q('Quantos dias tem um ano bissexto?',366,[365,367,355],'O ano normal tem 365 dias. No bissexto entra 1 dia extra em fevereiro: 365 + 1 = 366.','365 + 1.');
  if(m===3)return Q('Em um ano bissexto, quantos dias tem o mês de fevereiro?',29,[28,30,31],'Fevereiro tem 28 dias e ganha 1 dia extra no ano bissexto: 29 dias.','28 + 1.');
  const y=4*R(501,524);
  return Q('Qual destes anos é bissexto (um dia extra a cada quatro anos)?',String(y),[String(y+1),String(y+2),String(y+3)],`${y} dá para dividir por 4 certinho (${y} ÷ 4 = ${y/4}). Por isso é bissexto.`,'O ano bissexto é um número que dá para dividir por 4 sem sobrar resto.');
});
tf(3,'Verdadeiro ou falso: sociedade e cultura',
  ['Os combates de gladiadores começaram como rituais fúnebres no sul da Itália.','Os gladiadores eram atletas escravizados que buscavam fama e liberdade.','A política do pão e circo distribuía trigo de graça e oferecia espetáculos.','Otávio Augusto ampliou os espetáculos e distribuiu trigo de graça.','O antigo calendário romano tinha 355 dias.','O calendário de 365 dias foi criado por astrônomos, por ordem de Júlio César.','Um dia extra foi adicionado a fevereiro a cada quatro anos.','O ano bissexto ajuda as datas a combinarem com as estações de plantio e colheita.'],
  [['Os combates de gladiadores nunca tiveram ligação com rituais.','Eles começaram como rituais fúnebres no sul da Itália.'],['Os gladiadores eram senadores que lutavam por esporte.','Os gladiadores eram atletas escravizados.'],['O pão e circo servia para ensinar o povo a votar.','Servia para distrair o povo, ganhar popularidade e conter revoltas.'],['O calendário de 355 dias combinava perfeitamente com as estações.','Ele causava grande descompasso com as estações.'],['O calendário de 365 dias foi criado por ordem de Otávio Augusto.','Foi por ordem de Júlio César.'],['O dia extra do ano bissexto é colocado em dezembro.','O dia extra é colocado em fevereiro.'],['O ano bissexto acontece a cada dois anos.','O ano bissexto acontece a cada quatro anos.']]);

/* ================= 4º BIMESTRE · DEMOCRACIA: ATENAS × ATUALIDADE ================= */
one(4,'Democracia ateniense','O que significa a palavra "democracia"?','Poder do povo',['Poder dos reis','Poder do Senado','Poder do imperador'],'Democracia significa "poder do povo".','Demo = povo.');
one(4,'Democracia ateniense','Onde surgiu a democracia?','Em Atenas, na Grécia Antiga',['Em Roma, no Lácio','Na Etrúria','Na Campânia'],'A democracia surgiu em Atenas, na Grécia Antiga. Roma, Etrúria e Campânia ficavam na Península Itálica.','É uma cidade grega.');
one(4,'Democracia ateniense','Em qual civilização antiga ficava a cidade de Atenas?','Grécia Antiga',['Roma Antiga','Etrúria','Campânia'],'Atenas era uma cidade da Grécia Antiga.','O título da folha cita Roma e a outra civilização.');
one(4,'Democracia ateniense','Quem era considerado cidadão e podia tomar decisões na democracia ateniense?','Homens livres, maiores de idade e filhos de pais atenienses',['Todos os moradores da cidade','Todos os homens, inclusive os escravizados','Todos os adultos, homens e mulheres'],'Só homens livres, maiores de idade e filhos de pais atenienses eram cidadãos e podiam decidir.','A lista de quem podia era bem curta.');
one(4,'Democracia ateniense','Quem era totalmente excluído da vida política na democracia ateniense?','Mulheres, pessoas escravizadas e estrangeiros',['Homens livres e adultos','Filhos de pais atenienses, maiores de idade','Os cidadãos atenienses'],'A grande maioria da população era excluída: mulheres, pessoas escravizadas e estrangeiros.','A democracia ateniense era restrita e desigual.');
one(4,'Democracia ateniense','Qual destas pessoas podia participar das decisões em Atenas?','Um homem livre, adulto e filho de pais atenienses',['Uma mulher, filha de atenienses','Um estrangeiro que morava há anos em Atenas','Uma pessoa escravizada nascida em Atenas'],'Só homens livres, maiores de idade e filhos de pais atenienses eram cidadãos.','Pense em gênero, idade, liberdade e origem.');
one(4,'Democracia ateniense','Como era a democracia ateniense?','Restrita e desigual: poucos eram cidadãos',['Aberta a toda a população, sem exceção','Igual à democracia de hoje','Um governo de reis, sem participação do povo'],'Era muito restrita e desigual, porque só um grupo pequeno de homens decidia.','Lembre quem ficava de fora.');
one(4,'Democracia contemporânea','Em que se baseia a democracia de hoje?','Na soberania popular: o poder vem do povo, e todos os cidadãos podem votar',['No poder de um único imperador','Na decisão só de homens livres','No poder dos reis'],'A democracia atual se baseia na soberania popular (o poder vem do povo): todos os cidadãos podem votar e escolher seus representantes.','Soberania popular = o poder pertence ao povo.');
one(4,'Democracia contemporânea','O que a democracia contemporânea busca garantir?','Participação cidadã ampla, igualdade de direitos e inclusão social',['Que só os mais ricos decidam','Que só os homens votem','Que o imperador escolha os cidadãos'],'Ela busca ampla participação, igualdade de direitos e inclusão social.','A palavra-chave é "todos".');
one(4,'Democracia contemporânea','Hoje, a participação na democracia depende de gênero, origem ou classe social?','Não: vale para todos, sem distinção',['Sim: só homens podem participar','Sim: só quem nasceu na cidade pode','Sim: só os ricos podem'],'A democracia atual promove igualdade de direitos e inclusão social, sem distinção de gênero, origem ou classe social.','É o contrário de Atenas.');
one(4,'Atenas × atualidade','Em Atenas, os cidadãos decidiam diretamente nas assembleias. Como é na maioria das democracias de hoje?','Os cidadãos votam para escolher representantes, que decidem em nome deles',['Um imperador decide tudo','Só os mais ricos votam','Os cidadãos decidem todas as leis, sem representantes'],'Em Atenas a democracia era direta, mas só para poucos. Hoje a maioria das democracias é representativa: o povo escolhe seus representantes pelo voto.','Hoje existem deputados, vereadores e presidente, que são eleitos pelo povo.');
one(4,'Atenas × atualidade','Qual é uma diferença entre a democracia ateniense e a de hoje?','Em Atenas só alguns homens eram cidadãos. Hoje a participação é para todos.',['Em Atenas as mulheres votavam. Hoje elas não votam.','A democracia atual surgiu na Grécia Antiga e a ateniense nos dias de hoje.','Nas duas, só homens livres decidem.'],'Em Atenas a participação era restrita. Hoje a democracia busca incluir todas as pessoas.','Compare quem podia participar antes e agora.');
one(4,'Atenas × atualidade','Qual dupla combina corretamente governo e lugar?','Senado: República romana. Democracia: Atenas.',['Senado: Atenas. Democracia: Império romano.','Imperador: República romana. Reis: Atenas.','Democracia: Roma dos reis. Senado: Grécia Antiga.'],'O Senado liderava a República romana, e a democracia surgiu em Atenas.','Um é de Roma, o outro da Grécia.');
tf(4,'Verdadeiro ou falso: democracia',
  ['A palavra democracia significa "poder do povo".','A democracia surgiu em Atenas, na Grécia Antiga.','Em Atenas, só homens livres, maiores de idade e filhos de pais atenienses eram cidadãos.','Mulheres, pessoas escravizadas e estrangeiros eram excluídos da vida política ateniense.','A democracia atual se baseia na soberania popular: todos os cidadãos podem votar.','A democracia atual busca igualdade de direitos e inclusão social.','Hoje, a participação na democracia não depende de gênero, origem ou classe social.'],
  [['A democracia surgiu em Roma, no tempo dos reis.','A democracia surgiu em Atenas, na Grécia Antiga.'],['Em Atenas, as mulheres tinham o mesmo direito de voto que os homens.','Em Atenas as mulheres eram excluídas da vida política.'],['A democracia ateniense incluía toda a população.','A democracia ateniense era restrita e desigual.'],['A palavra democracia significa "poder dos reis".','Democracia significa "poder do povo".'],['Em Atenas, estrangeiros e pessoas escravizadas podiam tomar decisões.','Eles eram excluídos da vida política.'],['Hoje só homens livres podem decidir na democracia.','Hoje a democracia vale para todos, sem distinção de gênero, origem ou classe.']]);

/* Revisão geral (só no último andar): mistura de todos os blocos. */
{
  const ALL_T=[
    'Rômulo foi o primeiro rei de Roma, segundo a lenda.','Roma surgiu na margem esquerda do Rio Tibre.',
    'A Monarquia romana começou em 753 a.C.','Na República, quem liderava Roma era o Senado.','O Império começou em 27 a.C., com o poder centralizado no imperador.',
    'Os gladiadores eram atletas escravizados que buscavam fama e liberdade.','O calendário de 365 dias foi criado por astrônomos, por ordem de Júlio César.','Um dia extra foi adicionado a fevereiro a cada quatro anos.',
    'A democracia surgiu em Atenas, na Grécia Antiga.','A democracia atual busca igualdade de direitos e inclusão social.'];
  const ALL_F=[
    ['Roma surgiu à beira do mar, longe de qualquer rio.','Roma surgiu na margem do Rio Tibre.'],
    ['A República começou em 753 a.C.','753 a.C. marca o início da Monarquia. A República começou em 509 a.C.'],
    ['O Império foi o primeiro governo de Roma.','O primeiro foi a Monarquia.'],
    ['A política do pão e circo servia para ensinar o povo a votar.','Servia para distrair o povo e conter revoltas.'],
    ['O antigo calendário romano tinha 365 dias.','Ele tinha 355 dias.'],
    ['Em Atenas, as mulheres podiam decidir como os homens.','As mulheres eram excluídas da vida política em Atenas.'],
    ['A democracia ateniense era aberta a toda a população.','Era restrita e desigual.']];
  tf(4,'Revisão geral',ALL_T,ALL_F,'Revisão geral');
}

let recent=[],lastSkill='';
/* modos: 'floor' (desafios do andar), 'prova', 'rec' (recuperação: tudo) */
function genBim(bim,mode){
  let pool;
  if(mode==='rec')pool=G.slice();
  else if(mode==='prova')pool=Math.random()<0.7?G.filter(g=>g.bim===bim):G.filter(g=>g.bim<=bim);
  else pool=G.filter(g=>g.bim<=bim).concat(G.filter(g=>g.bim===bim));
  let q=null,g=null;
  for(let i=0;i<14;i++){
    g=pick(pool);
    if(i<6&&g.skill===lastSkill&&pool.length>1)continue;
    const c=g.fn();
    if(recent.includes(c.q+'|'+c.a))continue;
    q=c;break;
  }
  if(!q){g=pick(pool);q=g.fn()}
  lastSkill=g.skill;recent.push(q.q+'|'+q.a);if(recent.length>14)recent.shift();
  q.skill=g.skill;q.bim=g.bim;q.tema=q.tema||THEMES[g.bim].short;q.tag=q.tema;return q;
}

const TIER=[0,1,3,6,9];
COURSES.historia={
  id:'historia',nome:'História',sub:'Roma e Grécia Antiga',
  intro:'Quatro andares, um para cada bloco do Guia de Revisão: Roma e Grécia Antiga. Cada andar é um bimestre, com desafios, prova e boletim.',
  etapas:1,periodos:4,perNome:'bimestre',conta:'pergunta',
  etapaLabel:()=>'Roma e Grécia',perTema:p=>THEMES[p].short,
  hud:(et,per)=>`${per}º bimestre · ${THEMES[per].short}`,
  zone:(et,per)=>ZONES[per],
  tier:(et,per)=>TIER[per],
  puzzles:(et,per)=>{const p=['chest','chest','altar','sphinx'];if(per>=2)p.push('chest');if(per>=3)p.push('altar');return p},
  nMons:(et,per)=>5+per,
  mon:{rato:{n:'Rato do Tibre'},geleia:{n:'Lodo do Tibre'},morcego:{n:'Morcego do Palatino'},fantasma:{n:'Fantasma de Remo'},esqueleto:{n:'Legionário Esqueleto',min:9}},
  spellXP:(et,per)=>4+per*3,
  gradBonus:()=>160,
  startLevel:o=>1+(o.per-1)*2,
  startTitle:'Começar por qual tema?',startGrid:true,
  startNote:'Quer treinar só um assunto? Comece por ele. Os temas seguintes também cobram os anteriores.',
  startOptions:[1,2,3,4].map(b=>({label:`${b}º`,small:THEMES[b].short,et:1,per:b,resumo:`${b}º bimestre`})),
  diag:false,
  mediaTitle:'Média para passar',
  spellSub:'feitiço de história',
  reprova:'Reprovado',restartBtn:'Recomeçar o curso',resultBtn:'Ver resultado final',
  txt:{
    mediaAdj:'final',recEscopo:'de todo o conteúdo',passa:'passa',
    reprovaMsg:()=>'A masmorra recomeça do primeiro andar da sua jornada. Você mantém nível, talentos e dicas, então vai ficar mais fácil.',
    deathReset:'O curso recomeça do primeiro andar da sua jornada, mas você mantém seu nível, talentos e dicas.',
    floorLog:SV=>`${ZONES[SV.tri].name}: ${SV.tri}º bimestre, ${THEMES[SV.tri].title}. Resolva os desafios e encontre a Coruja Examinadora.`,
  },
  formatura:(SV,viaRec,rec,bonus)=>({title:viaRec?'Aprovado na recuperação!':'Formatura em Roma e Grécia!',stamp:viaRec?'Aprovado na recuperação':'Aprovado',stampClass:viaRec?'warn':'ok',
    texto:`${esc(SV.heroName)} atravessou a Colina das Cabanas, a Via dos Legionários, a Arena dos Gladiadores e a Ágora de Atenas. ${viaRec?`Recuperação: ${nf(rec)}. `:''}Média final: <b>${nf(SV.grades[SV.ano].media)}</b>. Bônus de formatura: +${bonus} XP.`}),
  help:`<li><b>Cada andar é um bimestre</b>, e cada bimestre é um bloco do guia: 1) Origem de Roma, 2) Política e expansão, 3) Sociedade e cultura, 4) Democracia. Os andares seguintes também cobram o que veio antes.</li>
    <li><b>Desafios</b> (baús, altares e esfinges) valem a nota de desafios. Acertou de primeira: 1 ponto. Na segunda tentativa: meio ponto. Errou duas vezes: zero.</li>
    <li>No fim do andar, a <b>Coruja Examinadora</b> aplica a <b>prova</b> (8 questões, sem dica). Nota do bimestre = 40% desafios + 60% prova.</li>
    <li>Depois do 4º bimestre vem a <b>média final</b>. Alcançou a média: aprovado! Não alcançou: <b>recuperação</b> com 10 questões de todo o conteúdo.</li>
    <li><b>XP</b> vem de monstros e, principalmente, de respostas certas. Acertos seguidos formam uma <b>sequência</b> que aumenta o XP em até 100%. Cada nível dá um talento.</li>
    <li>Gatos têm <b>9 vidas</b>. Perdeu toda a vida: o andar recomeça. Perdeu as 9: o curso recomeça, mas você mantém nível e talentos.</li>
    <li><b>Bola de Lã</b>: gaste 1 de mana e acerte uma pergunta para causar dano forte no inimigo mais próximo.</li>
    <li>Respondeu errado? A explicação aparece na hora. É a melhor hora de aprender.</li>`,
  antiRepeat:true,
  G,genQuestion:(et,per,mode)=>genBim(per,mode),
};
})();
