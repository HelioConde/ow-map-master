const STORAGE_KEY="ow-map-master:study:v1";
const LANGUAGE_KEY="ow-map-master:language";
const MODES=["control","escort","hybrid","push","flashpoint"];

const UI={
  pt:{
    maps:"mapas",eyebrow:"OVERWATCH · GUIA DE MAPAS",
    heroTitle:'Conheça o mapa <span>antes da luta começar.</span>',
    heroText:"Filtre por modo e estilo, abra um mapa e revise o objetivo, os pontos de atenção e um plano simples para a próxima partida.",
    studyEyebrow:"FILA DE ESTUDO",studyText:"mapas salvos para revisar",studyOnly:"Mostrar só salvos",showAll:"Mostrar todos",
    search:"Buscar mapa",mode:"Modo",style:"Estilo",allModes:"Todos",allStyles:"Todos",clear:"Limpar",
    highground:"Terreno alto",sightlines:"Linhas longas",flank:"Flancos",choke:"Gargalos",vertical:"Verticalidade",rotation:"Rotações",close:"Combate próximo",
    libraryEyebrow:"BIBLIOTECA",libraryTitle:"Mapas principais do PvP",results:(n)=>n+" mapa(s) encontrado(s)",empty:"Nenhum mapa com estes filtros.",
    modeGuideEyebrow:"LEITURA RÁPIDA",modeGuideTitle:"Aprenda primeiro o objetivo do modo.",
    ad:"PUBLICIDADE",adNote:"espaço reservado · fora do guia",disclaimer:"Projeto independente e não afiliado à Blizzard Entertainment.",
    about:"Sobre",privacy:"Privacidade",terms:"Termos",objective:"Objetivo do modo",plan:"Plano de revisão",
    addStudy:"Adicionar à fila de estudo",removeStudy:"Remover da fila de estudo",saved:"Mapa salvo para revisar.",removed:"Mapa removido da fila.",
    newMap:"Novo",reworked:"Reformulado",openMap:"Abrir guia",study:"Estudar",
    tags:{
      highground:"Terreno alto",sightlines:"Linhas longas",flank:"Flancos",choke:"Gargalos",vertical:"Verticalidade",
      rotation:"Rotações",close:"Combate próximo",environmental:"Risco ambiental",open:"Espaço aberto",mixed:"Distâncias mistas",tempo:"Ritmo rápido"
    },
    modes:{control:"Controle",escort:"Escolta",hybrid:"Híbrido",push:"Avanço",flashpoint:"Ponto de Tumulto"}
  },
  en:{
    maps:"maps",eyebrow:"OVERWATCH · MAP GUIDE",
    heroTitle:'Know the map <span>before the fight starts.</span>',
    heroText:"Filter by mode and play style, open a map and review its objective, attention points and a simple plan for your next match.",
    studyEyebrow:"STUDY QUEUE",studyText:"maps saved to review",studyOnly:"Show saved only",showAll:"Show all",
    search:"Search map",mode:"Mode",style:"Style",allModes:"All",allStyles:"All",clear:"Clear",
    highground:"High ground",sightlines:"Long sightlines",flank:"Flanks",choke:"Chokes",vertical:"Verticality",rotation:"Rotations",close:"Close range",
    libraryEyebrow:"LIBRARY",libraryTitle:"Core PvP maps",results:(n)=>n+" map(s) found",empty:"No maps match these filters.",
    modeGuideEyebrow:"QUICK READ",modeGuideTitle:"Learn the mode objective first.",
    ad:"ADVERTISEMENT",adNote:"reserved space · outside the guide",disclaimer:"Independent project not affiliated with Blizzard Entertainment.",
    about:"About",privacy:"Privacy",terms:"Terms",objective:"Mode objective",plan:"Review plan",
    addStudy:"Add to study queue",removeStudy:"Remove from study queue",saved:"Map saved for review.",removed:"Map removed from queue.",
    newMap:"New",reworked:"Reworked",openMap:"Open guide",study:"Study",
    tags:{
      highground:"High ground",sightlines:"Long sightlines",flank:"Flanks",choke:"Chokes",vertical:"Verticality",
      rotation:"Rotations",close:"Close range",environmental:"Environmental risk",open:"Open space",mixed:"Mixed ranges",tempo:"Fast tempo"
    },
    modes:{control:"Control",escort:"Escort",hybrid:"Hybrid",push:"Push",flashpoint:"Flashpoint"}
  }
};

let lang=localStorage.getItem(LANGUAGE_KEY)==="en"?"en":"pt";
let studyOnly=false;
let activeMapId="";
let toastTimer=null;

const $=s=>document.querySelector(s);
const ui=()=>UI[lang];
const esc=value=>String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

function readStudy(){
  try{
    const parsed=JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]");
    return Array.isArray(parsed)?parsed.filter(id=>window.OW_MAPS.some(map=>map.id===id)):[];
  }catch{return[];}
}
function writeStudy(ids){
  const unique=[...new Set(ids)].filter(id=>window.OW_MAPS.some(map=>map.id===id));
  localStorage.setItem(STORAGE_KEY,JSON.stringify(unique));
  updateStudyUi();
}
function isStudying(id){return readStudy().includes(id);}
function toggleStudy(id){
  const ids=readStudy();
  if(ids.includes(id)){
    writeStudy(ids.filter(value=>value!==id));showToast(ui().removed);
  }else{
    writeStudy([id,...ids]);showToast(ui().saved);
  }
  renderMaps();
  if(activeMapId===id)renderDialogButton();
}
function showToast(message){
  const target=$("#toast");target.textContent=message;target.classList.add("show");
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>target.classList.remove("show"),1800);
}
function modeLabel(mode){return ui().modes[mode]||mode;}
function tagLabel(tag){return ui().tags[tag]||tag;}
function updateUrl(){
  const url=new URL(location.href);
  const search=$("#search").value.trim();
  const mode=$("#mode-filter").value;
  const tag=$("#tag-filter").value;
  if(search)url.searchParams.set("q",search);else url.searchParams.delete("q");
  if(mode)url.searchParams.set("mode",mode);else url.searchParams.delete("mode");
  if(tag)url.searchParams.set("style",tag);else url.searchParams.delete("style");
  if(studyOnly)url.searchParams.set("saved","1");else url.searchParams.delete("saved");
  url.searchParams.set("lang",lang==="en"?"en":"pt");
  history.replaceState(null,"",url.pathname+(url.searchParams.toString()?"?"+url.searchParams.toString():""));
}
function filteredMaps(){
  const query=$("#search").value.trim().toLocaleLowerCase(lang==="pt"?"pt-BR":"en");
  const mode=$("#mode-filter").value;
  const tag=$("#tag-filter").value;
  const saved=new Set(readStudy());
  return window.OW_MAPS.filter(map=>{
    if(studyOnly&&!saved.has(map.id))return false;
    if(mode&&map.mode!==mode)return false;
    if(tag&&!map.tags.includes(tag))return false;
    if(query&&![map.name,map.place,modeLabel(map.mode),...map.tags.map(tagLabel)].some(value=>String(value).toLocaleLowerCase(lang==="pt"?"pt-BR":"en").includes(query)))return false;
    return true;
  });
}
function mapCard(map){
  const saved=isStudying(map.id);
  return '<article class="map-card" data-map="'+esc(map.id)+'">'+
    '<div class="map-card-top"><span class="mode-badge '+esc(map.mode)+'">'+esc(modeLabel(map.mode))+'</span>'+
      '<button class="star-button '+(saved?"active":"")+'" type="button" data-study="'+esc(map.id)+'" aria-label="'+esc(ui().study)+'">'+(saved?"★":"☆")+'</button></div>'+
    '<div class="map-visual '+esc(map.mode)+'"><span>'+esc(map.name.slice(0,2).toUpperCase())+'</span></div>'+
    '<div class="map-copy"><div class="map-title-line"><h3>'+esc(map.name)+'</h3>'+
      (map.fresh?'<span class="fresh">'+esc(ui().newMap)+'</span>':map.reworked?'<span class="fresh reworked">'+esc(ui().reworked)+'</span>':"")+
    '</div><p>'+esc(map.place)+'</p><div class="tag-list">'+map.tags.slice(0,3).map(tag=>'<span>'+esc(tagLabel(tag))+'</span>').join("")+'</div>'+
    '<button class="open-button" type="button" data-open="'+esc(map.id)+'">'+esc(ui().openMap)+'</button></div>'+
  '</article>';
}
function renderMaps(){
  const rows=filteredMaps();
  $("#result-note").textContent=ui().results(rows.length);
  $("#map-grid").innerHTML=rows.length?rows.map(mapCard).join(""):'<div class="empty">'+esc(ui().empty)+'</div>';
  updateStudyUi();
}
function renderModes(){
  $("#mode-cards").innerHTML=MODES.map(mode=>{
    const guide=window.OW_MODE_GUIDES[mode][lang];
    const count=window.OW_MAPS.filter(map=>map.mode===mode).length;
    return '<article><div><span class="mode-badge '+mode+'">'+esc(modeLabel(mode))+'</span><strong>'+count+'</strong></div><p>'+esc(guide.goal)+'</p></article>';
  }).join("");
}
function updateStudyUi(){
  const count=readStudy().length;
  $("#study-count").textContent=String(count);
  $("#study-only").textContent=studyOnly?ui().showAll:ui().studyOnly;
}
function renderDialogButton(){
  if(!activeMapId)return;
  const button=$("#dialog-study");
  const saved=isStudying(activeMapId);
  button.textContent=saved?ui().removeStudy:ui().addStudy;
  button.dataset.studyDialog=activeMapId;
}
function openMap(id){
  const map=window.OW_MAPS.find(row=>row.id===id);
  if(!map)return;
  activeMapId=id;
  const guide=window.OW_MODE_GUIDES[map.mode][lang];
  $("#dialog-mode").textContent=modeLabel(map.mode);
  $("#dialog-title").textContent=map.name;
  $("#dialog-place").textContent=map.place;
  $("#dialog-tags").innerHTML=map.tags.map(tag=>'<span>'+esc(tagLabel(tag))+'</span>').join("");
  $("#dialog-goal").textContent=guide.goal;
  $("#dialog-plan").innerHTML=guide.plan.map(item=>'<li>'+esc(item)+'</li>').join("");
  renderDialogButton();
  $("#map-dialog").showModal();
  const url=new URL(location.href);url.searchParams.set("map",map.id);history.replaceState(null,"",url.pathname+"?"+url.searchParams.toString());
}
function closeMap(){
  if($("#map-dialog").open)$("#map-dialog").close();
  activeMapId="";
  const url=new URL(location.href);url.searchParams.delete("map");history.replaceState(null,"",url.pathname+(url.searchParams.toString()?"?"+url.searchParams.toString():""));
}
function applyLanguage(){
  document.documentElement.lang=lang==="pt"?"pt-BR":"en";
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const value=ui()[el.dataset.i18n];
    if(typeof value!=="string")return;
    if(value.includes("<span>"))el.innerHTML=value;else el.textContent=value;
  });
  document.querySelectorAll("[data-i18n-option]").forEach(el=>{
    const value=ui()[el.dataset.i18nOption];if(typeof value==="string")el.textContent=value;
  });
  $("#language-toggle").textContent=lang==="pt"?"EN":"PT-BR";
  localStorage.setItem(LANGUAGE_KEY,lang);
  renderModes();renderMaps();
  if(activeMapId)openMap(activeMapId);
}
function clearFilters(){
  $("#search").value="";$("#mode-filter").value="";$("#tag-filter").value="";studyOnly=false;renderMaps();updateUrl();
}

$("#search").addEventListener("input",()=>{renderMaps();updateUrl();});
$("#mode-filter").addEventListener("change",()=>{renderMaps();updateUrl();});
$("#tag-filter").addEventListener("change",()=>{renderMaps();updateUrl();});
$("#clear-filters").addEventListener("click",clearFilters);
$("#study-only").addEventListener("click",()=>{studyOnly=!studyOnly;renderMaps();updateUrl();});
$("#language-toggle").addEventListener("click",()=>{lang=lang==="pt"?"en":"pt";applyLanguage();updateUrl();});
$("#dialog-close").addEventListener("click",closeMap);
$("#map-dialog").addEventListener("click",event=>{if(event.target===$("#map-dialog"))closeMap();});
document.addEventListener("click",event=>{
  const study=event.target.closest("[data-study]");
  if(study){toggleStudy(study.dataset.study);return;}
  const open=event.target.closest("[data-open]");
  if(open){openMap(open.dataset.open);return;}
  const dialogStudy=event.target.closest("[data-study-dialog]");
  if(dialogStudy)toggleStudy(dialogStudy.dataset.studyDialog);
});

(function boot(){
  const params=new URLSearchParams(location.search);
  const requested=String(params.get("lang")||"").toLowerCase();
  if(requested==="en")lang="en";else if(requested==="pt"||requested==="pt-br")lang="pt";
  $("#search").value=params.get("q")||"";
  const mode=params.get("mode")||"";if(MODES.includes(mode))$("#mode-filter").value=mode;
  const tag=params.get("style")||"";if(Array.from($("#tag-filter").options).some(option=>option.value===tag))$("#tag-filter").value=tag;
  studyOnly=params.get("saved")==="1";
  applyLanguage();
  const map=params.get("map");if(map&&window.OW_MAPS.some(row=>row.id===map))openMap(map);
})();
