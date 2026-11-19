/* UPTIME — juego de práctica: defendé el servidor escribiendo la traducción de cada término antes de que el bug llegue.
   Direcciones: es (español→inglés), en (inglés→español) y mix (las dos mezcladas). */
const Game=(()=>{
  // textos y números del juego: se editan en data/juego-uptime.js
  const D=window.JUEGOS.uptime,S=D.textos,C=D.config;
  const g=k=>S[lang][k]??k,$g=s=>document.querySelector(s);
  const BUG='<svg viewBox="0 0 24 24"><ellipse cx="12" cy="14" rx="4.5" ry="6" fill="currentColor"/><circle cx="12" cy="7" r="2.6" fill="currentColor"/><path d="M7.5 11 4 9M7.5 14.5h-4M8 18l-3 2.5M16.5 11 20 9M16.5 14.5h4M16 18l3 2.5M10.5 5 9 2.5M13.5 5 15 2.5" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>';
  const SPK='<svg class="sp" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4z"/></svg>';
  const norm=s=>strip(s.toLowerCase()).replace(/[^a-z0-9+#]/g,'');
  const label=w=>w.es.split(/\s*[\/(,]\s*/)[0].trim();
  // respuestas válidas en español: cada alternativa separada por / , ; con y sin lo que está entre paréntesis
  const esAns=w=>{const out=new Set();w.es.split(/\s*[\/,;]\s*/).forEach(a=>{const sinPar=a.replace(/\([^)]*\)/g,' ').trim();[a,sinPar].forEach(x=>{const n=norm(x);if(n.length)out.add(n)})});return[...out]};
  const SUBK={es:'sub',en:'subEn',mix:'subMix'},PHK={es:'ph',en:'phEn',mix:'phMix'};
  const cfg={mode:'tr',cat:'',dir:'es'},BK='glosario.best',SK='glosario.gstats';
  let st=null,raf=0,last=0,dlg,F,inp,sfx=true,ctx=null;
  const best=()=>+localStorage.getItem(BK)||0;
  const stats=()=>{try{return JSON.parse(localStorage.getItem(SK))||{}}catch(e){return{}}};
  const mark=(w,hit)=>{const s=stats(),a=s[w.id]||[0,0];a[hit?0:1]++;s[w.id]=a;try{localStorage.setItem(SK,JSON.stringify(s))}catch(e){}};
  function beep(f,d=.08,type='square',v=.035){
    if(!sfx)return;
    try{ctx=ctx||new(window.AudioContext||window.webkitAudioContext)();const o=ctx.createOscillator(),a=ctx.createGain();o.type=type;o.frequency.value=f;a.gain.value=v;o.connect(a);a.connect(ctx.destination);o.start();a.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+d);o.stop(ctx.currentTime+d)}catch(e){}
  }
  const say=w=>Speech.say(w.term,false,'en-US');
  const pool=()=>Store.words.filter(w=>(!cfg.cat||w.category===cfg.cat)&&norm(w.term).length>=2&&(cfg.dir==='es'||esAns(w).length));
  function pick(){
    const P=pool(),on=new Set(st.bugs.map(b=>b.w.id)),R=new Set(st.recent),S2=stats();
    let c=P.filter(w=>!on.has(w.id)&&!R.has(w.id));
    if(!c.length)c=P.filter(w=>!on.has(w.id));
    if(!c.length)c=P;
    const wt=c.map(w=>{const[h=0,m=0]=S2[w.id]||[];return Math.max(.3,1+2*m-.3*Math.min(h,4))});
    let r=Math.random()*wt.reduce((a,b)=>a+b,0);
    for(let i=0;i<c.length;i++){r-=wt[i];if(r<=0)return c[i]}
    return c[0];
  }
  function build(){
    dlg.innerHTML=`<div class="g-top">
      <div class="g-stat"><span>${g('score')}</span><b id="gs">0</b></div>
      <div class="g-stat"><span>${g('wave')}</span><b id="gw">1</b></div>
      <div class="g-stat"><span>${g('combo')}</span><b id="gc">x1</b></div>
      <div class="g-stat"><span>${g('best')}</span><b id="gb">${best()}</b></div>
      <div class="g-stat g-up"><span>${g('up')} <b id="gu" style="font-size:12px">100%</b></span><div class="g-meter"><i id="gup"></i></div></div>
      <div class="g-btns"><button id="gsfx" title="SFX">♪</button><button id="gpause">❚❚</button><button id="gx">✕</button></div></div>
    <div class="g-field" id="gf"><div class="g-wave" id="gwb"></div><div id="gbugs"></div><div class="g-line"></div>
      <div class="g-server" id="gsv"><i></i><i></i><i></i></div><div class="g-ov" id="gov"></div></div>
    <div class="g-bar"><b>$</b><input id="gin" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="${g('ph')}"><span class="g-keys">${g('keys')}</span></div>`;
    F=$g('#gf');inp=$g('#gin');
    inp.oninput=onInput;
    inp.onkeydown=e=>{
      if(e.key==='Tab'){e.preventDefault();hint()}
      if(e.key==='Enter'){inp.value='';onInput()}
    };
    F.onclick=e=>{if(!e.target.closest('button,select'))inp.focus()};
    $g('#gpause').onclick=toggle;$g('#gx').onclick=close;
    $g('#gsfx').onclick=e=>{sfx=!sfx;e.currentTarget.classList.toggle('off',!sfx)};
    $g('#gov').onclick=ovClick;
    $g('#gov').onchange=e=>{if(e.target.id==='gcat')cfg.cat=e.target.value};
  }
  function ov(html){const o=$g('#gov');o.innerHTML=html;o.hidden=false}
  function ovClick(e){
    const m=e.target.closest('[data-m]');if(m){cfg.mode=m.dataset.m;showStart();return}
    const d=e.target.closest('[data-d]');if(d){cfg.dir=d.dataset.d;showStart();return}
    const s=e.target.closest('[data-say]');if(s){say(Store.words.find(w=>w.id===s.dataset.say));return}
    const id=e.target.closest('button')?.id;
    if(id==='gstart'||id==='gagain')start();
    if(id==='gresume')toggle();
    if(id==='gquit'||id==='gclose'||id==='gback'){close();Juegos.open()}
  }
  function showStart(){
    ov(`<div class="g-card"><h2 class="g-h">${esc(D.nombre[lang])}</h2><p class="g-sub">${g(SUBK[cfg.dir])}</p>
    <div class="g-how"><div>${g('how1')}</div><div>${g('how2')}</div><div>${g('how3')}</div></div>
    <div class="g-row"><span class="g-lbl">${g('dir')}</span><span class="g-seg">${['es','en','mix'].map(d=>`<button data-d="${d}" class="${cfg.dir===d?'on':''}">${g({es:'dEs',en:'dEn',mix:'dMix'}[d])}</button>`).join('')}</span></div>
    ${cfg.dir!=='es'?`<p class="g-sub g-note">${g('accN')}</p>`:''}
    <div class="g-row"><span class="g-seg"><button data-m="tr" class="${cfg.mode==='tr'?'on':''}">${g('mTr')}</button><button data-m="au" class="${cfg.mode==='au'?'on':''}">${SPK} ${g('mAu')}</button></span>
    <select id="gcat"><option value="">${g('allc')}</option>${Object.keys(CATS).map(c=>`<option value="${c}" ${cfg.cat===c?'selected':''}>${esc(catName(c))}</option>`).join('')}</select></div>
    <p class="g-sub">${g('best')}: <b>${best()}</b></p><button class="g-btn" id="gback">${g('back')}</button><button class="g-btn primary" id="gstart">${g('start')}</button></div>`);
  }
  function fresh(){return{score:0,wave:1,kills:0,combo:0,maxc:0,mult:1,up:100,hits:0,miss:0,bugs:[],missed:new Set(),spawnT:.5,recent:[],state:'play'}}
  function start(){
    if(pool().length<C.minPalabras){showStart();$g('#gov .g-card').insertAdjacentHTML('beforeend',`<p class="g-sub" style="color:#f85149">${g('few')}</p>`);return}
    st=fresh();$g('#gbugs').innerHTML='';$g('#gov').hidden=true;inp.value='';inp.placeholder=g(PHK[cfg.dir]);inp.focus();
    hud();banner(`${g('wave')} 1`);last=performance.now();raf=requestAnimationFrame(frame);
  }
  function setLabel(b){
    const t0=b.dir==='en'?b.w.term:label(b.w),tag=cfg.dir==='mix'?`<u>${g(b.dir==='en'?'tagEn':'tagEs')}</u>`:'';
    b.el.querySelector('.bl').innerHTML=tag+(cfg.mode==='au'?`${SPK} ${b.rev?esc(t0):'?'}`:esc(t0))+(b.hint?`<em>${esc(b.hint)}</em>`:'');
  }
  function spawn(){
    const w=pick(),type=st.wave>1&&Math.random()<C.probEspecial?(Math.random()<C.probCura?'heal':'nuke'):'';
    const el=document.createElement('div');el.className='bug '+type;
    el.innerHTML=`${BUG}<span class="bl"></span>`;
    const dir=cfg.dir==='mix'?(Math.random()<.5?'es':'en'):cfg.dir;
    if(dir==='en')el.classList.add('en');
    const ans=dir==='en'?esAns(w):[norm(w.term)];
    const b={w,el,type,dir,ans,norm:ans[0],y:-40,rev:false,hint:''};
    setLabel(b);$g('#gbugs').appendChild(el);
    b.x=8+Math.random()*Math.max(10,F.clientWidth-el.offsetWidth-16);
    st.bugs.push(b);st.recent.push(w.id);if(st.recent.length>6)st.recent.shift();
    el.onclick=()=>{if(cfg.mode==='au')say(w);inp.focus()};
    if(cfg.mode==='au')say(w);
  }
  function frame(t){
    if(!st||st.state!=='play')return;
    const dt=Math.min(.05,(t-last)/1000);last=t;
    const H=F.clientHeight,floor=H-98,sp=Math.min(C.velocidadMax,C.velocidadBase+(st.wave-1)*C.velocidadPorOla);
    st.spawnT-=dt;
    if(st.spawnT<=0&&st.bugs.length<C.maxBugs){spawn();st.spawnT=Math.max(C.aparicionMin,(cfg.mode==='au'?C.aparicionAudio:C.aparicion)-st.wave*C.aparicionPorOla)}
    for(const b of[...st.bugs]){
      b.y+=sp*dt;
      if(cfg.mode==='au'&&!b.rev&&b.y>H*.42){b.rev=true;setLabel(b)}
      b.el.style.transform=`translate(${b.x}px,${b.y}px)`;
      if(b.y>=floor){impact(b);if(st.state!=='play')return}
    }
    raf=requestAnimationFrame(frame);
  }
  const drop=b=>{b.el.remove();const i=st.bugs.indexOf(b);if(i>-1)st.bugs.splice(i,1)};
  function impact(b){
    drop(b);
    if(b.type)return;
    st.up=Math.max(0,st.up-C.danio);st.combo=0;st.mult=1;st.miss++;st.missed.add(b.w.id);mark(b.w,false);
    const s=document.createElement('div');s.className='g-splat';s.style.left=Math.min(Math.max(b.x+60,100),F.clientWidth-100)+'px';
    s.innerHTML=b.dir==='en'?`${esc(b.w.es)}<small>${esc(b.w.term)}</small>`:`${esc(b.w.term)}<small>${esc(b.w.pron)}</small>`;F.appendChild(s);setTimeout(()=>s.remove(),2200);
    F.classList.add('shake');$g('#gsv').classList.add('dmg');
    setTimeout(()=>{F.classList.remove('shake');$g('#gsv').classList.remove('dmg')},320);
    beep(110,.3,'sawtooth',.06);hud();
    if(st.up<=0)over();
  }
  function onInput(){
    const v=norm(inp.value);
    if(!st||st.state!=='play'){return}
    const hit=v&&st.bugs.filter(b=>b.ans.includes(v)).sort((a,b)=>b.y-a.y)[0];
    if(hit){hit.norm=v;inp.value='';inp.classList.remove('bad');kill(hit);return}
    const p=v&&st.bugs.filter(b=>b.ans.some(a=>a.startsWith(v))).sort((a,b)=>b.y-a.y)[0];
    st.bugs.forEach(b=>b.el.classList.toggle('t',b===p));
    inp.classList.toggle('bad',!!v&&!p);
  }
  function kill(b){
    st.hits++;st.kills++;st.combo++;st.maxc=Math.max(st.maxc,st.combo);
    st.mult=Math.min(C.multMax,1+Math.floor(st.combo/C.comboCada));
    const pts=(C.puntosBase+b.norm.length*C.puntosPorLetra)*st.mult;st.score+=pts;mark(b.w,true);say(b.w);
    b.el.className='bug ok';b.el.onclick=null;
    b.el.innerHTML=b.dir==='en'?`<b>${esc(b.w.es)}</b><small>${esc(b.w.term)}</small><i>+${pts}</i>`:`<b>${esc(b.w.term)}</b><small>${esc(b.w.pron)}</small><i>+${pts}</i>`;
    const i=st.bugs.indexOf(b);if(i>-1)st.bugs.splice(i,1);
    setTimeout(()=>b.el.remove(),900);beep(660,.07);setTimeout(()=>beep(990,.09),70);
    if(b.type==='heal'){st.up=Math.min(100,st.up+C.cura);banner(g('heal'))}
    if(b.type==='nuke'){st.bugs.forEach(x=>{st.score+=5*st.mult;x.el.className='bug ok';x.el.innerHTML='<b>✔</b>';setTimeout(()=>x.el.remove(),500)});st.bugs=[];banner(g('nuke'))}
    if(st.kills%C.bugsPorOla===0){st.wave++;banner(`${g('wave')} ${st.wave}`);[523,659,784].forEach((f,k)=>setTimeout(()=>beep(f,.12,'triangle',.05),k*110))}
    $g('.t')?.classList.remove('t');hud();
  }
  function hint(){
    if(!st||st.state!=='play')return;
    const b=[...st.bugs].filter(x=>!x.hint).sort((a,b)=>b.y-a.y)[0];if(!b)return;
    const ht=b.dir==='en'?b.w.es.split(/\s*[\/,;]\s*/)[0].replace(/\([^)]*\)/g,'').trim():b.w.term;
    b.hint=`${ht.slice(0,2)}… (${norm(ht).length})`;setLabel(b);st.score=Math.max(0,st.score-C.costoPista);hud();
  }
  function banner(t){const e=$g('#gwb');e.textContent=t;e.classList.remove('go');void e.offsetWidth;e.classList.add('go')}
  function hud(){
    $g('#gs').textContent=st.score;$g('#gw').textContent=st.wave;$g('#gc').textContent='x'+st.mult;
    $g('#gb').textContent=Math.max(best(),st.score);$g('#gu').textContent=st.up+'%';
    const u=$g('#gup');u.style.width=st.up+'%';u.className=st.up>50?'':st.up>25?'mid':'low';
  }
  function toggle(){
    if(!st)return;
    if(st.state==='play'){
      st.state='pause';cancelAnimationFrame(raf);
      ov(`<div class="g-card"><h2 class="g-h">${g('paused')}</h2><p class="g-sub">Esc</p><button class="g-btn primary" id="gresume">${g('resume')}</button><button class="g-btn" id="gquit">${g('quit')}</button></div>`);
    }else if(st.state==='pause'){
      st.state='play';$g('#gov').hidden=true;inp.focus();last=performance.now();raf=requestAnimationFrame(frame);
    }
  }
  function over(){
    st.state='over';cancelAnimationFrame(raf);
    const b0=best(),nb=st.score>b0;if(nb)localStorage.setItem(BK,st.score);
    const tot=st.hits+st.miss,acc=tot?Math.round(st.hits/tot*100):100;
    const miss=[...st.missed].map(id=>Store.words.find(w=>w.id===id)).filter(Boolean);
    ov(`<div class="g-card"><h2 class="g-h bad">${g('down')}</h2><p class="g-sub">${g('report')}</p>${nb?`<div class="g-badge">${g('nb')}</div>`:''}
    <div class="g-grid"><div><span>${g('score')}</span><b>${st.score}</b></div><div><span>${g('wave')}</span><b>${st.wave}</b></div><div><span>${g('acc')}</span><b>${acc}%</b></div><div><span>${g('max')}</span><b>${st.maxc}</b></div></div>
    <h4>${g('missed')}</h4>${miss.length?`<div class="g-list">${miss.map(w=>`<div class="g-mi"><b>${esc(w.term)}</b><i>${esc(w.pron)}</i><span>${esc(label(w))}</span><button class="g-sp" data-say="${esc(w.id)}">${SPK}</button></div>`).join('')}</div>`:`<p class="g-sub">${g('none')}</p>`}
    <button class="g-btn primary" id="gagain">${g('again')}</button><button class="g-btn" id="gclose">${g('quit')}</button></div>`);
    beep(90,.5,'sawtooth',.08);
  }
  function close(){cancelAnimationFrame(raf);if(st)st.state='idle';st=null;speechSynthesis?.cancel();dlg.close()}
  function open(){
    dlg=$g('#game');
    if(!dlg.dataset.ready){
      dlg.dataset.ready=1;
      dlg.addEventListener('cancel',e=>{e.preventDefault();st&&['play','pause'].includes(st.state)?toggle():close()});
      document.addEventListener('visibilitychange',()=>{if(document.hidden&&st&&st.state==='play')toggle()});
    }
    st=null;build();showStart();dlg.showModal();
  }
  return{open};
})();