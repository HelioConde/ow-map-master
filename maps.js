window.OW_MAPS = Object.freeze([
  {id:"antarctic-peninsula",name:"Antarctic Peninsula",mode:"control",place:"Antarctica",tags:["vertical","close","flank"]},
  {id:"busan",name:"Busan",mode:"control",place:"South Korea",tags:["vertical","sightlines","close"]},
  {id:"ilios",name:"Ilios",mode:"control",place:"Greece",tags:["environmental","vertical","sightlines"]},
  {id:"lijiang-tower",name:"Lijiang Tower",mode:"control",place:"China",tags:["close","environmental","flank"]},
  {id:"nepal",name:"Nepal",mode:"control",place:"Nepal",tags:["vertical","choke","flank"]},
  {id:"oasis",name:"Oasis",mode:"control",place:"Iraq",tags:["vertical","environmental","sightlines"]},
  {id:"samoa",name:"Samoa",mode:"control",place:"Samoa",tags:["vertical","sightlines","flank"]},

  {id:"circuit-royal",name:"Circuit Royal",mode:"escort",place:"Monaco",tags:["sightlines","highground","choke"]},
  {id:"dorado",name:"Dorado",mode:"escort",place:"Mexico",tags:["highground","flank","vertical"]},
  {id:"havana",name:"Havana",mode:"escort",place:"Cuba",tags:["sightlines","highground","choke"]},
  {id:"junkertown",name:"Junkertown",mode:"escort",place:"Australia",tags:["sightlines","highground","open"]},
  {id:"rialto",name:"Rialto",mode:"escort",place:"Italy",tags:["choke","highground","flank"]},
  {id:"route-66",name:"Route 66",mode:"escort",place:"United States",tags:["highground","sightlines","choke"]},
  {id:"shambali-monastery",name:"Shambali Monastery",mode:"escort",place:"Nepal",tags:["vertical","choke","sightlines"]},
  {id:"watchpoint-gibraltar",name:"Watchpoint: Gibraltar",mode:"escort",place:"Gibraltar",tags:["vertical","highground","flank"]},

  {id:"blizzard-world",name:"Blizzard World",mode:"hybrid",place:"United States",tags:["highground","choke","mixed"]},
  {id:"eichenwalde",name:"Eichenwalde",mode:"hybrid",place:"Germany",tags:["choke","highground","vertical"]},
  {id:"hollywood",name:"Hollywood",mode:"hybrid",place:"United States",tags:["highground","mixed","flank"]},
  {id:"kings-row",name:"King's Row",mode:"hybrid",place:"United Kingdom",tags:["choke","close","highground"]},
  {id:"midtown",name:"Midtown",mode:"hybrid",place:"United States",tags:["choke","sightlines","highground"]},
  {id:"neon-junction",name:"Neon Junction",mode:"hybrid",place:"Tokyo, Japan",tags:["flank","mixed","vertical"],fresh:true},
  {id:"numbani",name:"Numbani",mode:"hybrid",place:"West Africa",tags:["highground","vertical","flank"]},
  {id:"paraiso",name:"Paraíso",mode:"hybrid",place:"Brazil",tags:["vertical","flank","highground"]},

  {id:"colosseo",name:"Colosseo",mode:"push",place:"Italy",tags:["sightlines","flank","rotation"]},
  {id:"esperanca",name:"Esperança",mode:"push",place:"Portugal",tags:["vertical","flank","rotation"]},
  {id:"new-queen-street",name:"New Queen Street",mode:"push",place:"Canada",tags:["close","flank","highground"]},
  {id:"runasapi",name:"Runasapi",mode:"push",place:"Peru",tags:["vertical","flank","rotation"]},

  {id:"aatlis",name:"Aatlis",mode:"flashpoint",place:"Morocco",tags:["rotation","close","tempo"],fresh:true},
  {id:"new-junk-city",name:"New Junk City",mode:"flashpoint",place:"Australia",tags:["rotation","open","flank"],reworked:true},
  {id:"suravasa",name:"Suravasa",mode:"flashpoint",place:"India",tags:["rotation","highground","flank"],reworked:true}
]);

window.OW_MODE_GUIDES = Object.freeze({
  control:{
    pt:{goal:"Vença 2 de 3 rodadas controlando o ponto.",plan:["Chegue junto ao primeiro confronto; morrer cedo costuma custar espaço.","Planeje a retomada antes de gastar ultimates isoladamente.","Controle entradas e rotas laterais em vez de ficar todo o tempo em cima do ponto."]},
    en:{goal:"Win 2 of 3 rounds by controlling the objective.",plan:["Arrive together for the first fight; early deaths usually cost space.","Plan the retake before spending ultimates one by one.","Control entrances and side routes instead of standing on point at all times."]}
  },
  escort:{
    pt:{goal:"Ataque escolta a carga; defesa controla espaço e tempo.",plan:["Use terreno alto antes de descer para a carga.","No ataque, empurre espaço à frente quando for seguro; alguém precisa manter progresso.","Na defesa, recue por etapas e prepare a próxima posição em vez de morrer tarde."]},
    en:{goal:"Attack escorts the payload; defense trades space for time.",plan:["Use high ground before dropping to payload level.","On attack, take space ahead when safe while someone maintains progress.","On defense, fall back in stages and prepare the next hold instead of dying late."]}
  },
  hybrid:{
    pt:{goal:"Capture o primeiro ponto e depois escolte a carga.",plan:["Trate a captura inicial e a fase de carga como problemas diferentes.","Guarde recursos para atravessar o gargalo inicial.","Depois da captura, reposicione rápido para o primeiro confronto da carga."]},
    en:{goal:"Capture the first point, then escort the payload.",plan:["Treat the opening capture and payload phase as different problems.","Save resources to break the initial choke.","After capture, reposition quickly for the first payload fight."]}
  },
  push:{
    pt:{goal:"Controle o robô e empurre sua barricada mais longe.",plan:["O robô não vale uma luta ruim: reagrupe antes de contestar.","Vencer perto do centro costuma valer mais que perseguir eliminações distantes.","Considere a distância de retorno antes de usar ultimates no fim da luta."]},
    en:{goal:"Control the robot and push your barricade farther.",plan:["The robot is not worth a bad fight: regroup before contesting.","Winning near center often matters more than chasing distant eliminations.","Consider return distance before spending ultimates at the end of a fight."]}
  },
  flashpoint:{
    pt:{goal:"Capture 3 pontos ativados em sequência.",plan:["Rotacione cedo quando o próximo ponto for revelado.","Não transforme uma luta perdida em três mortes atrasadas durante a rotação.","Use mobilidade e informação para chegar organizado ao próximo ponto."]},
    en:{goal:"Capture 3 sequentially activated flashpoints.",plan:["Rotate early when the next point is revealed.","Do not turn one lost fight into three staggered deaths during rotation.","Use mobility and information to arrive organized at the next point."]}
  }
});
