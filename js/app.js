const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const strip=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const ICON='<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></svg>';
/* Si algo falla al cargar, se muestra un aviso arriba con el error (para poder arreglarlo) en vez de quedar la página vacía */
function showError(e,where){
  try{
    let b=document.getElementById('errbox');
    if(!b){b=document.createElement('div');b.id='errbox';b.style.cssText='position:fixed;left:12px;right:12px;bottom:12px;z-index:99999;background:#3a1212;color:#ffd7d5;border:1px solid #f85149;border-radius:8px;padding:10px 14px;font:13px/1.45 Consolas,monospace;white-space:pre-wrap;max-height:40vh;overflow:auto';document.body.appendChild(b)}
    const m=e&&e.message?e.message:String(e),src=e&&e.filename?`  (${String(e.filename).split('/').pop()}:${e.lineno})`:'';
    b.textContent+=(b.textContent?'\n':'')+'⚠ Error'+(where?' en '+where:'')+': '+m+src+(e&&e.error&&e.error.stack?'\n'+String(e.error.stack).split('\n').slice(1,3).join('\n'):e&&e.stack?'\n'+String(e.stack).split('\n').slice(1,3).join('\n'):'');
  }catch(_){}
}
(window.__errs||[]).forEach(e=>showError(e));
window.addEventListener('error',e=>showError(e));
window.addEventListener('unhandledrejection',e=>showError(e.reason,'promesa'));
let lang=localStorage.getItem('glosario.lang')||'es';
// temas: claro, oscuro y los gaming de css/temas.css
const THEMES=[['light','☀ Claro','☀ Light'],['dark','☾ Oscuro','☾ Dark'],['neon','🌴 Neon Miami','🌴 Neon Miami'],['arcade','👾 Arcade','👾 Arcade'],['cyber','⚡ Cyber','⚡ Cyber']];
let theme=localStorage.getItem('glosario.theme')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');
if(!THEMES.some(t=>t[0]===theme))theme='dark';
const t=k=>I18N[lang][k]??k;
const catName=c=>CATS[c]?CATS[c][lang]:c;
const view={q:'',cat:''};

/* Vista de una palabra según el idioma de la interfaz: en inglés el glosario se invierte (palabra en español, traducción en inglés, audio en español) */
function V(w){
  if(lang==='en'){
    const h=w.es.split(/\s*[\/(,]\s*/)[0].trim(),hasEs=!!w.exampleEs;
    return{w,head:h,pron:Es.pron(h),trans:w.term,hl:'es-AR',ex:hasEs?w.exampleEs:w.example,exl:hasEs?'es-AR':'en-US',exT:hasEs?w.example:'',note:''};
  }
  return{w,head:w.term,pron:w.pron,trans:w.es,hl:'en-US',ex:w.example,exl:'en-US',exT:w.exampleEs,note:w.note};
}
function filtered(){
  const q=strip(view.q.toLowerCase());
  return Store.words
    .filter(w=>(!view.cat||w.category===view.cat)&&(!q||strip((w.term+' '+w.es).toLowerCase()).includes(q)))
    .map(V).sort((a,b)=>a.head.localeCompare(b.head,lang==='en'?'es':'en'));
}
function applyTheme(){document.documentElement.dataset.theme=theme;const s=$('#themeSel');if(s){s.innerHTML=THEMES.map(t=>`<option value="${t[0]}">${lang==='en'?t[2]:t[1]}</option>`).join('');s.value=theme}}
function renderStatus(){
  const b=$('#fileBtn'),s=Store.state,dirty=Store.dirty();
  b.className='chip '+(s==='ok'&&!dirty?'ok':'warn');
  b.disabled=!Store.supported;
  b.textContent=!Store.supported?t('nofs'):s==='ok'?(dirty?t('unsaved'):t('saved')):s==='ask'?t('reconnect'):t('connect');
}
function renderSide(){
  const q=strip(view.q.toLowerCase()),base=Store.words.filter(w=>!q||strip((w.term+' '+w.es).toLowerCase()).includes(q));
  const n=c=>c?base.filter(w=>w.category===c).length:base.length;
  $('#cats').innerHTML=[['',t('all')],...Object.keys(CATS).map(c=>[c,catName(c)])]
    .map(([c,nm])=>`<button class="catb${view.cat===c?' on':''}" data-cat="${c}"><span class="dot" ${c?`data-c="${c}"`:''}></span><span class="nm">${esc(nm)}</span><span class="n">${n(c)}</span></button>`).join('');
}
function renderGrid(){
  const l=filtered(),letters=[];let cur='';
  $('#count').textContent=`${l.length} ${t('words')}`;
  $('#grid').innerHTML=l.length?l.map(v=>{
    const L=(strip(v.head)[0]||'#').toUpperCase();let h='';
    if(L!==cur){cur=L;letters.push(L);h=`<div class="letter" id="L-${L}">${esc(L)}</div>`}
    return h+`<article class="row" data-c="${v.w.category}" tabindex="0" data-id="${esc(v.w.id)}"><div class="term"><b>${esc(v.head)}</b><i>${esc(v.w.type)}</i></div><div class="pron"><span>${esc(v.pron)}</span></div><div class="trans">${esc(v.trans)}</div><div class="cat"><span class="dot" data-c="${v.w.category}"></span>${esc(catName(v.w.category))}</div><button class="icon" data-say="${esc(v.w.id)}" aria-label="${t('listen')}">${ICON}</button></article>`;
  }).join(''):`<p class="muted" style="padding:20px">${t('none')}</p>`;
  $('#az').innerHTML=letters.map(L=>`<a href="#L-${L}">${L}</a>`).join('');
}
function refresh(){renderSide();renderGrid();renderStatus()}
function renderStatic(){
  document.documentElement.lang=lang;
  document.querySelectorAll('[data-i18n]').forEach(e=>e.textContent=t(e.dataset.i18n));
  $('#q').placeholder=t('search');
  applyTheme();refresh();
}
function openDetail(id){
  const w=Store.words.find(x=>x.id===id);if(!w)return;
  const v=V(w),d=$('#detail');
  d.innerHTML=`<div class="dhead"><div><h2>${esc(v.head)}</h2><div class="pron big">${esc(v.pron)}</div></div><button class="icon" data-close>✕</button></div>
  <div class="audio"><button class="btn primary" id="s1">${t('listen')}</button><button class="btn" id="s2">${t('slow')}</button></div>
  <div class="es big">${esc(v.trans)}</div>
  <div class="meta"><span class="tag">${esc(w.type)}</span><span class="tag">${esc(catName(w.category))}</span></div>
  ${w.def||w.defEs?`<div class="box defs"><p><b>${t('def')}:</b></p>${(lang==='en'?[[w.defEs,'es-AR','ES'],[w.def,'en-US','EN']]:[[w.def,'en-US','EN'],[w.defEs,'es-AR','ES']]).filter(x=>x[0]).map(([d,l,k],i)=>`<p class="${i?'muted':''}"><span class="tag">${k}</span> ${esc(d)} <button class="icon sm" data-sd="${l}">${ICON}</button></p>`).join('')}</div>`:''}
  ${v.ex?`<div class="box"><p><b>${t('ex')}:</b> ${esc(v.ex)} <button class="icon sm" id="s3">${ICON}</button></p>${v.exT?`<p class="muted">${esc(v.exT)}</p>`:''}</div>`:''}
  ${v.note?`<p class="muted">${esc(v.note)}</p>`:''}
  <div class="actions"><button class="btn danger" id="del">${t('del')}</button><button class="btn primary" id="ed">${t('edit')}</button></div>`;
  d.querySelector('[data-close]').onclick=()=>d.close();
  d.querySelector('#s1').onclick=()=>Speech.say(v.head,false,v.hl);
  d.querySelector('#s2').onclick=()=>Speech.say(v.head,true,v.hl);
  if(v.ex)d.querySelector('#s3').onclick=()=>Speech.say(v.ex,false,v.exl);
  d.querySelectorAll('[data-sd]').forEach(b=>b.onclick=()=>Speech.say(b.dataset.sd==='en-US'?w.def:w.defEs,false,b.dataset.sd));
  d.querySelector('#ed').onclick=()=>{d.close();openForm(w)};
  d.querySelector('#del').onclick=async()=>{if(confirm(`${t('confirmDel')} "${v.head}"?`)){d.close();await Crud.remove(w.id)}};
  d.showModal();
}
function openForm(w){
  const f=$('#form'),edit=!!w;
  w=w||{type:'noun',category:'hardware'};
  const inp=(k,l,req)=>`<label>${t(l)}<input name="${k}" value="${esc(w[k])}" ${req?'required':''}></label>`;
  const sel=(k,l,opts,lab)=>`<label>${t(l)}<select name="${k}">${opts.map(o=>`<option value="${esc(o)}" ${String(w[k])===String(o)?'selected':''}>${esc(lab?lab(o):o)}</option>`).join('')}</select></label>`;
  f.innerHTML=`<h2 style="margin-bottom:14px">${t(edit?'editTitle':'addTitle')}</h2><form id="wf">
  ${inp('term','fTerm',1)}${inp('pron','fPron')}${inp('es','fEs',1)}
  ${sel('type','fType',['noun','verb','adjective','adverb','conjunction','preposition','phrasal verb','expression','abbreviation'])}
  ${sel('category','fCat',Object.keys(CATS),catName)}
  ${inp('def','fDef')}${inp('defEs','fDefEs')}
  ${inp('example','fEx')}${inp('exampleEs','fExEs')}${inp('note','fNote')}
  <p class="err" id="err"></p>
  <div class="actions"><button type="button" class="btn" data-close>${t('cancel')}</button><button class="btn primary">${t('save')}</button></div></form>`;
  f.querySelector('[data-close]').onclick=()=>f.close();
  $('#wf').onsubmit=async ev=>{
    ev.preventDefault();
    const data=Object.fromEntries(new FormData(ev.target));
    const r=edit?await Crud.update(w.id,data):await Crud.create(data);
    if(r.error){$('#err').textContent=t(r.error);return}
    f.close();
  };
  f.showModal();
}
$('#grid').onclick=e=>{
  const s=e.target.closest('[data-say]');
  if(s){e.stopPropagation();const v=V(Store.words.find(w=>w.id===s.dataset.say));Speech.say(v.head,false,v.hl);return}
  const c=e.target.closest('.row');if(c)openDetail(c.dataset.id);
};
$('#grid').onkeydown=e=>{if(e.key==='Enter'&&e.target.classList.contains('row'))openDetail(e.target.dataset.id)};
$('#cats').onclick=e=>{const b=e.target.closest('[data-cat]');if(!b)return;view.cat=b.dataset.cat;refresh()};
$('#q').oninput=e=>{view.q=e.target.value;refresh()};
$('#addBtn').onclick=()=>openForm();
$('#practiceBtn').onclick=()=>Practice.open(filtered());
$('#lang').onchange=e=>{lang=e.target.value;localStorage.setItem('glosario.lang',lang);renderStatic()};
$('#themeSel').onchange=e=>{theme=e.target.value;try{localStorage.setItem('glosario.theme',theme)}catch(_){}applyTheme()};
$('#fileBtn').onclick=async()=>{
  if(Store.state==='ok'&&!Store.dirty())return;
  try{await Store.connect()}catch(e){}
  renderStatus();
};
$('#juegosBtn').onclick=()=>Juegos.open();
$('#exportBtn').onclick=()=>{
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([JSON.stringify({version:1,words:Store.words},null,2)],{type:'application/json'}));
  a.download='glosario.json';a.click();
};
(async()=>{
  try{if(!I18N[lang])lang='es';$('#lang').value=lang}catch(e){}
  try{Store.load()}catch(e){showError(e,'Store.load')}
  try{await Store.init()}catch(e){showError(e,'Store.init')}
  try{renderStatic()}catch(e){showError(e,'renderStatic')}
})();