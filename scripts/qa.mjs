import fs from "node:fs";
import vm from "node:vm";

const required=["index.html","style.css","app.js","maps.js","sobre.html","privacidade.html","termos.html","robots.txt","sitemap.xml"];
for(const file of required){
  if(!fs.existsSync(file))throw new Error("Missing required file: "+file);
}

const sandbox={window:{}};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync("maps.js","utf8"),sandbox);
const maps=sandbox.window.OW_MAPS;
if(!Array.isArray(maps)||maps.length!==30)throw new Error("Expected exactly 30 core maps, got "+(maps?.length??0));

const expected={control:7,escort:8,hybrid:8,push:4,flashpoint:3};
for(const [mode,count] of Object.entries(expected)){
  const actual=maps.filter(map=>map.mode===mode).length;
  if(actual!==count)throw new Error(mode+" map count mismatch: "+actual+" !== "+count);
}

const ids=new Set();
for(const map of maps){
  if(!map.id||!map.name||!map.mode||!Array.isArray(map.tags)||!map.tags.length)throw new Error("Invalid map row: "+JSON.stringify(map));
  if(ids.has(map.id))throw new Error("Duplicate map id: "+map.id);
  ids.add(map.id);
}

const html=fs.readFileSync("index.html","utf8");
for(const marker of ['id="map-grid"','id="map-dialog"','src="maps.js"','src="app.js"']){
  if(!html.includes(marker))throw new Error("Missing index invariant: "+marker);
}

console.log("OW Map Master static QA passed.");
