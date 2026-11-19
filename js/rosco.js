/* EL ROSCO — juego estilo "pasapalabra": una palabra del glosario por cada letra, adivinala a partir de su definición.
   Direcciones: es (definición en español → respondés en inglés), en (definición en inglés → respondés en español), mix.
   La música y los efectos son originales, generados con Web Audio (no usa archivos de sonido). */
const Rosco=(()=>{
  // textos, números y música del juego: se editan en data/juego-rosco.js
  const D=window.JUEGOS.rosco,S=D.textos,C=D.config;
  const r=k=>S[lang][k]??k;
  const LET=[...C.letras.toUpperCase()].filter(x=>/[A-Z]/.test(x));
  const SPK='<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4z"/></svg>';
  const norm=s=>strip(String(s).toLowerCase()).replace(/[^a-z0-9+#]/g,'');
  const alts=w=>w.es.split(/\s*[\/,;]\s*/).map(a=>a.replace(/\([^)]*\)/g,' ').replace(/\s+/g,' ').trim()).filter(a=>norm(a).length>=2);
  const reEsc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  // tapa la respuesta si aparece dentro de la definición
  const mask=(txt,w)=>[w.term,...alts(w)].filter(x=>x.length>2).sort((a,b)=>b.length-a.length)
    .reduce((s,x)=>s.replace(new RegExp('(^|[^\\p{L}\\p{N}])'+reEsc(x)+'(?=$|[^\\p{L}\\p{N}])','giu'),'$1___'),txt);
  const cfg={dir:'es',time:C.tiempoPorDefecto},BK='glosario.rosco.best',SK='glosario.rstats';
  let dlg,st=null,loop=0,last=0,sfx=C.efectos,mus=C.musica,ac=null,master=null;
  const $r=s=>dlg.querySelector(s);
  const best=()=>+localStorage.getItem(BK)||0;
  const stats=()=>{try{return JSON.parse(localStorage.getItem(SK))||{}}catch(e){return{}}};
  const mark=(w,hit)=>{const s=stats(),a=s[w.id]||[0,0];a[hit?0:1]++;s[w.id]=a;try{localStorage.setItem(SK,JSON.stringify(s))}catch(e){}};

  /* ---------- audio: efectos + música original de programa de juegos ---------- */
  function audio(){
    try{if(!ac){ac=new(window.AudioContext||window.webkitAudioContext)();master=ac.createGain();master.gain.value=.9;master.connect(ac.destination)}
      if(ac.state==='suspended')ac.resume();return true}catch(e){return false}
  }
  const hz=m=>440*Math.pow(2,(m-69)/12);
  function tone(f,t,d,type='square',v=.05,dest){
    const o=ac.createOscillator(),g=ac.createGain();o.type=type;o.frequency.setValueAtTime(f,t);
    g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(dest||master);o.start(t);o.stop(t+d+.03);return o;
  }
  function sound(kind){
    if(!sfx||!audio())return;const t=ac.currentTime;
    if(kind==='ok'){[76,81,88].forEach((m,i)=>tone(hz(m),t+i*.07,.18,'triangle',.08))}
    if(kind==='bad'){tone(110,t,.45,'sawtooth',.07);tone(104,t,.45,'square',.04)}
    if(kind==='pass'){const o=tone(700,t,.25,'sine',.06);o.frequency.exponentialRampToValueAtTime(250,t+.25)}
    if(kind==='tick'){tone(1200,t,.05,'square',.03)}
    if(kind==='end'){[72,67,64,60].forEach((m,i)=>tone(hz(m),t+i*.16,.3,'triangle',.08))}
    if(kind==='win'){[60,64,67,72,76,79,84].forEach((m,i)=>tone(hz(m),t+i*.09,.35,'triangle',.08))}
  }
  const Music={
    on:false,step:0,next:0,id:0,fast:false,bus:null,
    BASS:D.musicaNotas.bajo,
    LEAD:D.musicaNotas.melodia,
    start(){
      if(this.on||!mus||!audio())return;this.on=true;
      this.bus=ac.createGain();this.bus.gain.value=C.volumenMusica;this.bus.connect(master);
      this.step=0;this.next=ac.currentTime+.05;this.id=setInterval(()=>this.tick(),25);
    },
    stop(){if(!this.on)return;this.on=false;clearInterval(this.id);const b=this.bus;if(b){b.gain.setTargetAtTime(0,ac.currentTime,.05);setTimeout(()=>b.disconnect(),400)}},
    hat(t){const n=ac.createBufferSource(),len=ac.sampleRate*.03,buf=ac.createBuffer(1,len,ac.sampleRate),d=buf.getChannelData(0);
      for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*(1-i/len);n.buffer=buf;const f=ac.createBiquadFilter();f.type='highpass';f.frequency.value=7000;
      const g=ac.createGain();g.gain.value=.05;n.connect(f);f.connect(g);g.connect(this.bus);n.start(t)},
    tick(){
      const e=60/(this.fast?C.tempoRapido:C.tempo)/2;
      while(this.next<ac.currentTime+.12){
        const s=this.step%this.BASS.length,t=this.next;
        if(this.BASS[s])tone(hz(this.BASS[s]),t,e*.85,'triangle',.11,this.bus);
        if(this.step%(this.BASS.length*2)>=this.BASS.length&&this.LEAD[this.step%this.LEAD.length])tone(hz(this.LEAD[this.step%this.LEAD.length]),t,e*.7,'square',.022,this.bus);
        if(this.BASS[s]&&s%4===0)tone(hz(this.BASS[s]-12),t,e*1.6,'sine',.12,this.bus);
        this.hat(t);this.next+=e;this.step++;
      }
    }
  };

  /* ---------- armado del rosco ---------- */
  function cands(dir){
    const out=[];
    Store.words.forEach(w=>{
      if(dir==='es'){if(w.defEs&&norm(w.term).length>=2)out.push({w,dir,show:w.term,ans:norm(w.term),clue:w.defEs})}
      else if(w.def)alts(w).forEach(a=>out.push({w,dir,show:a,ans:norm(a),clue:w.def}));
    });
    return out;
  }
  function choose(C){
    const s=stats(),wt=C.map(c=>{const[h=0,m=0]=s[c.w.id]||[];return Math.max(.3,1+2*m-.3*Math.min(h,4))});
    let x=Math.random()*wt.reduce((a,b)=>a+b,0);
    for(let i=0;i<C.length;i++){x-=wt[i];if(x<=0)return C[i]}
    return C[0];
  }
  function buildRound(){
    const pool={es:cands('es'),en:cands('en')},used=new Set(),R=[];
    for(const L of LET){
      const l=L.toLowerCase(),dirs=cfg.dir==='mix'?(Math.random()<.5?['es','en']:['en','es']):[cfg.dir];
      let pick=null;
      for(const d of dirs){
        const C=pool[d].filter(c=>!used.has(c.w.id)),a=C.filter(c=>c.ans[0]===l),b=C.filter(c=>c.ans.includes(l));
        if(a.length){pick={...choose(a),kind:'starts'};break}
        if(b.length&&!pick)pick={...choose(b),kind:'contains'};
      }
      if(pick){used.add(pick.w.id);R.push({L,...pick,clue:mask(pick.clue,pick.w),state:'pending'})}
    }
    return R;
  }

  /* ---------- pantallas ---------- */
  function shell(){
    dlg.innerHTML=`<div class="r-top"><b class="r-logo">${r('title')}</b>
      <div class="g-btns"><button id="rmus" title="Música" class="${mus?'':'off'}">♫</button><button id="rsfx" title="SFX" class="${sfx?'':'off'}">♪</button><button id="rpause">❚❚</button><button id="rx">✕</button></div></div>
      <div class="r-body"><div class="r-wheel" id="rw"><div class="r-center"><div class="r-time" id="rt">0</div><div class="r-score"><span class="ok" id="rok">0</span><span class="bad" id="rbad">0</span></div></div></div>
      <div class="r-panel"><div class="r-letter" id="rl"></div><div class="r-hint" id="rh"></div>
        <div class="r-clue"><p id="rc"></p><button class="r-say" id="rsay" title="Escuchar">${SPK}</button></div>
        <div class="r-fb" id="rfb"></div>
        <form class="r-form" id="rf"><input id="rin" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="${r('ph')}">
        <button class="g-btn primary" type="submit">${r('send')}</button><button class="g-btn r-passb" type="button" id="rpass">${r('pass')}</button></form></div></div>
      <div class="g-ov" id="rov"></div>`;
    $r('#rx').onclick=close;$r('#rpause').onclick=toggle;
    $r('#rmus').onclick=e=>{mus=!mus;e.currentTarget.classList.toggle('off',!mus);if(mus&&st&&st.state==='play')Music.start();else Music.stop()};
    $r('#rsfx').onclick=e=>{sfx=!sfx;e.currentTarget.classList.toggle('off',!sfx)};
    $r('#rf').onsubmit=e=>{e.preventDefault();answer()};
    $r('#rpass').onclick=()=>pass();
    $r('#rsay').onclick=()=>{const c=st&&st.R[st.i];if(c)Speech.say(c.clue,false,c.dir==='es'?'es-AR':'en-US')};
    $r('#rov').onclick=ovClick;
  }
  function ov(html){const o=$r('#rov');o.innerHTML=html;o.hidden=false}
  function ovClick(e){
    const d=e.target.closest('[data-d]');if(d){cfg.dir=d.dataset.d;showStart();return}
    const tm=e.target.closest('[data-t]');if(tm){cfg.time=+tm.dataset.t;showStart();return}
    const id=e.target.closest('button')?.id;
    if(id==='rstart'||id==='ragain')start();
    if(id==='rresume')toggle();
    if(id==='rquit'||id==='rclose'||id==='rback'){close();Juegos.open()}
  }
  function showStart(){
    const H={es:'dEsH',en:'dEnH',mix:'dMixH'}[cfg.dir];
    ov(`<div class="g-card"><h2 class="g-h r-h">${r('title')}</h2><p class="g-sub">${r('sub')}</p>
      <div class="g-how"><div>${r('how1')}</div><div>${r('how2')}</div><div>${r('how3')}</div><div>${r('how4')}</div></div>
      <div class="g-row"><span class="g-lbl">${r('dir')}</span><span class="g-seg">${['es','en','mix'].map(d=>`<button data-d="${d}" class="${cfg.dir===d?'on':''}">${r({es:'dEs',en:'dEn',mix:'dMix'}[d])}</button>`).join('')}</span></div>
      <p class="g-sub g-note">${r(H)}</p>
      <div class="g-row"><span class="g-lbl">${r('time')}</span><span class="g-seg">${C.tiempos.map(x=>`<button data-t="${x}" class="${cfg.time===x?'on':''}">${x}s</button>`).join('')}</span></div>
      <p class="g-sub">${r('best')}: <b>${best()}</b></p><button class="g-btn" id="rback">${r('back')}</button><button class="g-btn primary" id="rstart">${r('start')}</button></div>`);
  }
  function drawWheel(){
    const w=$r('#rw');w.querySelectorAll('.r-l').forEach(x=>x.remove());
    const n=st.R.length;
    st.R.forEach((c,k)=>{
      const a=k/n*2*Math.PI-Math.PI/2,el=document.createElement('div');
      el.className='r-l';el.textContent=c.L;el.style.left=(50+44*Math.cos(a))+'%';el.style.top=(50+44*Math.sin(a))+'%';
      c.el=el;w.appendChild(el);
    });
    paint();
  }
  function paint(){st.R.forEach((c,k)=>{c.el.className='r-l '+c.state+(k===st.i&&st.state==='play'?' cur':'')})}
  function hud(){
    $r('#rt').textContent=Math.ceil(st.left);$r('#rt').classList.toggle('low',st.left<=15);
    $r('#rok').textContent=st.R.filter(c=>c.state==='ok').length;$r('#rbad').textContent=st.R.filter(c=>c.state==='bad').length;
  }
  function show(){
    const c=st.R[st.i];paint();
    $r('#rl').textContent=c.L;
    $r('#rh').innerHTML=`${r(c.kind)} <b>${c.L}</b> · <span class="r-tag ${c.dir}">${r(c.dir==='es'?'ansEn':'ansEs')}</span>`;
    $r('#rc').textContent=c.clue;$r('#rfb').innerHTML='';$r('#rfb').className='r-fb';
    const i=$r('#rin');i.value='';i.disabled=false;i.focus();
  }
  function start(){
    st={R:buildRound(),i:0,left:cfg.time,hold:0,state:'play',lastTick:0};
    if(st.R.length<C.minLetras){showStart();$r('#rov .g-card').insertAdjacentHTML('beforeend',`<p class="g-sub" style="color:#f85149">${r('few')}</p>`);return}
    $r('#rov').hidden=true;drawWheel();hud();show();Music.fast=false;Music.start();
    last=performance.now();cancelAnimationFrame(loop);loop=requestAnimationFrame(frame);
  }
  function frame(t){
    if(!st||st.state==='over')return;
    const dt=Math.min(.1,(t-last)/1000);last=t;
    if(st.state==='play'&&!st.hold){
      st.left=Math.max(0,st.left-dt);
      const s=Math.ceil(st.left);
      if(s<=C.segundosAlarma&&s!==st.lastTick&&s>0){st.lastTick=s;sound('tick')}
      if(st.left<=C.segundosMusicaRapida&&!Music.fast)Music.fast=true;
      hud();
      if(st.left<=0){over('time');return}
    }
    loop=requestAnimationFrame(frame);
  }
  function nextPending(){
    const n=st.R.length;
    for(let k=1;k<=n;k++){const j=(st.i+k)%n;if(st.R[j].state==='pending'||st.R[j].state==='passed')return j}
    return -1;
  }
  function advance(){const j=nextPending();if(j<0){over('done');return}st.i=j;show()}
  function feedback(html,cls,ms,then){
    const fb=$r('#rfb');fb.innerHTML=html;fb.className='r-fb '+cls;$r('#rin').disabled=true;st.hold=1;
    setTimeout(()=>{if(!st||st.state==='over')return;st.hold=0;last=performance.now();then()},ms);
  }
  function answer(){
    if(!st||st.state!=='play'||st.hold)return;
    const c=st.R[st.i],v=norm($r('#rin').value);
    if(!v||v==='pasapalabra'||v==='pass'){pass();return}
    if(v===c.ans){c.state='ok';mark(c.w,true);sound('ok');paint();hud();
      feedback(`✔ ${r('ok')} <b>${esc(c.show)}</b>`,'good',C.msCorrecto,advance);}
    else{c.state='bad';mark(c.w,false);sound('bad');paint();hud();
      feedback(`✗ ${r('was')} <b>${esc(c.show)}</b>${c.dir==='en'?` <small>(${esc(c.w.term)})</small>`:` <small>(${esc(label(c.w))})</small>`}`,'wrong',C.msError,advance);}
  }
  const label=w=>w.es.split(/\s*[\/(,]\s*/)[0].trim();
  function pass(){
    if(!st||st.state!=='play'||st.hold)return;
    const c=st.R[st.i];c.state='passed';sound('pass');
    if(nextPending()===st.i||nextPending()<0){show();return}
    advance();
  }
  function toggle(){
    if(!st||st.state==='over')return;
    if(st.state==='play'){st.state='pause';Music.stop();speechSynthesis?.cancel();paint();
      ov(`<div class="g-card"><h2 class="g-h r-h">${r('paused')}</h2><p class="g-sub">Esc</p><button class="g-btn primary" id="rresume">${r('resume')}</button><button class="g-btn" id="rquit">${r('quit')}</button></div>`);}
    else{st.state='play';$r('#rov').hidden=true;Music.start();last=performance.now();show()}
  }
  function over(why){
    st.state='over';cancelAnimationFrame(loop);Music.stop();paint();
    const ok=st.R.filter(c=>c.state==='ok').length,bad=st.R.filter(c=>c.state==='bad'),left=st.R.filter(c=>c.state==='pending'||c.state==='passed');
    const nb=ok>best();if(nb)localStorage.setItem(BK,ok);
    const full=ok===st.R.length;sound(full?'win':'end');
    const rev=[...bad,...left];
    ov(`<div class="g-card"><h2 class="g-h r-h ${full?'':'bad'}">${full?r('full'):why==='time'?r('timeUp'):r('done')}</h2>${nb?`<div class="g-badge">${r('nb')}</div>`:''}
      <div class="g-grid r-grid"><div><span>${r('hits')}</span><b>${ok}/${st.R.length}</b></div><div><span>${r('errs')}</span><b>${bad.length}</b></div><div><span>${r('left')}</span><b>${left.length}</b></div></div>
      <h4>${r('review')}</h4>${rev.length?`<div class="r-rev">${rev.map(c=>`<div class="r-ri ${c.state==='bad'?'bad':''}"><b class="r-rl">${c.L}</b><div><b>${esc(c.show)}</b> <span class="muted">· ${esc(c.dir==='en'?c.w.term:label(c.w))}</span><p>${esc(c.dir==='es'?c.w.defEs:c.w.def)}</p></div></div>`).join('')}</div>`:`<p class="g-sub">${r('none')}</p>`}
      <button class="g-btn primary" id="ragain">${r('again')}</button><button class="g-btn" id="rclose">${r('quit')}</button></div>`);
  }
  function close(){if(st)st.state='over';cancelAnimationFrame(loop);Music.stop();st=null;speechSynthesis?.cancel();dlg.close()}
  function open(){
    dlg=document.querySelector('#rosco');
    if(!dlg.dataset.ready){
      dlg.dataset.ready=1;
      dlg.addEventListener('cancel',e=>{e.preventDefault();st&&st.state!=='over'?toggle():close()});
      document.addEventListener('visibilitychange',()=>{if(document.hidden&&st&&st.state==='play')toggle()});
    }
    st=null;shell();showStart();dlg.showModal();
  }
  return{open};
})();
