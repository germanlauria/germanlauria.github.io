const slug=s=>s.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const DB_HEADER=()=>`/* ============================================================================
   GLOSARIO TÉCNICO · BASE DE DATOS
   ----------------------------------------------------------------------------
   Podés editar este archivo a mano. Cada término es un bloque { ... } con:

     term       palabra o expresión en inglés
     pron       pronunciación escrita (sílaba tónica en MAYÚSCULA)
     es         traducción al español
     type       noun | verb | adjective | adverb | phrasal verb | abbreviation | expression
     category   ${Object.keys(CATS).join(' | ')}
     def        definición en inglés (la usa el juego del Rosco)
     defEs      definición en español (la usa el juego del Rosco)
     example    frase de ejemplo en inglés
     exampleEs  ejemplo traducido al español (opcional: puede quedar "")
     note       aclaración (opcional: puede quedar "")

   Para agregar un término: copiá un bloque entero, pegalo y cambiá los textos.
   Respetá las comillas "..." y la coma al final de cada línea (menos la última).
   Cada vez que guardás un cambio desde la página, este archivo se reordena solo:
   agrupado por categoría y en orden alfabético.
   ============================================================================ */`;
function serializeWords(words){
  const F=['term','pron','es','type','category','def','defEs','example','exampleEs','note'],by={};
  words.forEach(w=>(by[w.category]=by[w.category]||[]).push(w));
  const order=[...Object.keys(CATS),...Object.keys(by).filter(c=>!CATS[c])],bar='═'.repeat(70);
  let s=DB_HEADER()+'\nwindow.GLOSARIO = {\n  version: 1,\n  words: [\n';
  order.filter(c=>by[c]).forEach(c=>{
    s+=`\n    // ${bar}\n    //  ${(CATS[c]?CATS[c].es:c).toUpperCase()}  (category: "${c}")  ·  ${by[c].length} términos\n    // ${bar}\n\n`;
    [...by[c]].sort((a,b)=>a.term.localeCompare(b.term,'en',{sensitivity:'base'})).forEach(w=>{
      s+='    {\n'+F.map(k=>`      ${(k+':').padEnd(11)}${JSON.stringify(w[k]??'')}`).join(',\n')+'\n    },\n\n';
    });
  });
  return s+'  ]\n};\n';
}
const Store=(()=>{
  const LS='glosario.pending2';
  let words=[],handle=null,state='off';
  const db=()=>new Promise((res,rej)=>{const r=indexedDB.open('glosario',1);r.onupgradeneeded=()=>r.result.createObjectStore('kv');r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)});
  const kv=async(mode,fn)=>{const d=await db();return new Promise((res,rej)=>{const q=fn(d.transaction('kv',mode).objectStore('kv'));q.onsuccess=()=>res(q.result);q.onerror=()=>rej(q.error)})};
  async function flush(){
    const w=await handle.createWritable();
    await w.write(serializeWords(words));
    await w.close();localStorage.removeItem(LS);
  }
  return{
    supported:'showOpenFilePicker' in window,
    get words(){return words},
    get state(){return state},
    dirty:()=>!!localStorage.getItem(LS),
    load(){
      let p=null;try{p=JSON.parse(localStorage.getItem(LS))}catch(e){}
      // cambios guardados en el navegador: solo se usan si son una lista válida de palabras
      if(p&&!(Array.isArray(p)&&p.length&&p.every(w=>w&&typeof w.term==='string'&&w.term.trim())))p=null;
      words=p||(window.GLOSARIO&&Array.isArray(window.GLOSARIO.words)?window.GLOSARIO.words:[]);
      words=words.filter(w=>w&&typeof w.term==='string');
      words.forEach(w=>{if(!w.id)w.id=slug(w.term);['es','def','defEs','example','exampleEs','note','pron','type','category'].forEach(k=>{if(w[k]==null)w[k]=''})});
      // si había cambios sin guardar de antes, completa las definiciones que vienen de words.js
      if(p&&window.GLOSARIO){const src={};window.GLOSARIO.words.forEach(w=>src[w.term.toLowerCase()]=w);words.forEach(w=>{const o=src[w.term.toLowerCase()];if(o){if(!w.def)w.def=o.def||'';if(!w.defEs)w.defEs=o.defEs||''}})}
    },
    async init(){
      if(!this.supported)return;
      try{
        // si el navegador tarda en responder, sigue sin el archivo conectado en vez de quedarse esperando
        const wait=(pr,ms)=>Promise.race([pr,new Promise((_,rej)=>setTimeout(()=>rej(new Error('timeout')),ms))]);
        handle=await wait(kv('readonly',s=>s.get('h')),2500);
        if(handle){
          state=(await wait(handle.queryPermission({mode:'readwrite'}),2500))==='granted'?'ok':'ask';
          if(state==='ok'&&this.dirty())await wait(flush(),4000);
        }
      }catch(e){handle=null;state='off'}
    },
    async save(){
      localStorage.setItem(LS,JSON.stringify(words));
      if(state==='ok'){try{await flush()}catch(e){state='ask'}}
    },
    async connect(){
      if(handle&&state==='ask'&&(await handle.requestPermission({mode:'readwrite'}))==='granted'){state='ok';await flush();return}
      [handle]=await showOpenFilePicker({types:[{description:'words.js',accept:{'text/javascript':['.js']}}]});
      if((await handle.requestPermission({mode:'readwrite'}))!=='granted')return;
      await kv('readwrite',s=>s.put(handle,'h'));
      state='ok';await flush();
    }
  };
})();