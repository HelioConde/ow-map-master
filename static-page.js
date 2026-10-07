const toggle=document.querySelector("[data-language-toggle]");
let lang=localStorage.getItem("ow-map-master:language")==="en"?"en":"pt";
function apply(){
  document.documentElement.lang=lang==="pt"?"pt-BR":"en";
  document.querySelectorAll("[data-lang]").forEach(section=>{section.hidden=section.dataset.lang!==lang;});
  if(toggle)toggle.textContent=lang==="pt"?"EN":"PT-BR";
  localStorage.setItem("ow-map-master:language",lang);
}
if(toggle)toggle.addEventListener("click",()=>{lang=lang==="pt"?"en":"pt";apply();});
apply();
