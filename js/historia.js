/* HISTORIAS "IN THIS CITY…" — historia interactiva al estilo de los videos de TikTok.
   El texto aparece palabra por palabra, la voz lo narra en inglés y en los huecos ___ hay que elegir o escribir
   la palabra correcta del glosario para seguir. Algunas escenas son caminos: cambian el rumbo y el final.
   Las historias, los textos y la configuración se editan en data/juego-historia.js.
   La música y los efectos son originales, generados con Web Audio (no usa archivos de sonido). */
const Historia=(()=>{
  const D=window.JUEGOS.historia,S=D.textos,C=D.config,H=D.historias||[];
  const h=k=>S[lang][k]??k;
  const norm=s=>strip(String(s).toLowerCase()).replace(/[^a-z0-9+#]/g,'');
  const FONDOS=['noche','alerta','apagon','verde','sotano','amanecer'];
  const SK='glosario.historia.finales',VK='glosario.historia.voz',P=D.personajes||{},V=C.voz||{};
  const cfg={story:H[0]&&H[0].id,speed:C.velocidadPorDefecto||'normal',subs:C.subtitulos!==false,voice:C.narrar!==false};
  let dlg,st=null,mus=C.musica,sfx=C.efectos,ac=null,master=null,timers=[];
  const $h=s=>dlg.querySelector(s);
  const later=(fn,ms)=>{const id=setTimeout(fn,ms);timers.push(id);return id};
  const clear=()=>{timers.forEach(clearTimeout);timers=[]};
  const story=id=>H.find(x=>x.id===id)||H[0];
  const endsOf=s=>Object.values(s.escenas).filter(x=>x.final).map(x=>x.final);
  const found=()=>{try{return JSON.parse(localStorage.getItem(SK))||{}}catch(e){return{}}};
  const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
  // busca la palabra en el glosario (también en plural: "workstations")
  const gl=x=>{const n=norm(x);return Store.words.find(w=>norm(w.term)===n)||Store.words.find(w=>norm(w.term)+'s'===n)};
  const trans=(x,fallback)=>{const w=gl(x);return w?w.es.split(/\s*[\/(]\s*/)[0].trim():(fallback||'')};

  /* ---------- audio: música ambiente original + efectos ---------- */
  function audio(){
    try{if(!ac){ac=new(window.AudioContext||window.webkitAudioContext)();master=ac.createGain();master.gain.value=.9;master.connect(ac.destination)}
      if(ac.state==='suspended')ac.resume();return true}catch(e){return false}
  }
  const hz=m=>440*Math.pow(2,(m-69)/12);
  function tone(f,t,d,type='sine',v=.05){
    const o=ac.createOscillator(),g=ac.createGain();o.type=type;o.frequency.setValueAtTime(f,t);
    g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(master);o.start(t);o.stop(t+d+.03);return o;
  }
  function sound(kind){
    if(!sfx||!audio())return;const t=ac.currentTime;
    if(kind==='word')tone(1900,t,.03,'sine',.006);
    if(kind==='ok')[72,79,84].forEach((m,i)=>tone(hz(m),t+i*.08,.35,'triangle',.07));
    if(kind==='bad'){tone(98,t,.6,'sawtooth',.05);tone(92,t,.6,'sine',.08)}
    if(kind==='path'){const o=tone(300,t,.4,'sine',.06);o.frequency.exponentialRampToValueAtTime(900,t+.35)}
    if(kind==='end')[60,67,72,76].forEach((m,i)=>tone(hz(m),t+i*.22,1.2,'triangle',.06));
  }
  const Music={
    on:false,id:0,bus:null,i:0,
    file:null,fileOk:!!C.musicaArchivo,fade:0,
    start(){
      if(this.on||!mus)return;
      if(this.fileOk&&this.startFile())return;
      if(!audio())return;this.on=true;
      this.bus=ac.createGain();this.bus.gain.value=C.volumenMusica;
      const f=ac.createBiquadFilter();f.type='lowpass';f.frequency.value=1100;this.bus.connect(f);f.connect(master);
      this.i=0;this.play();this.id=setInterval(()=>this.play(),C.segundosPorAcorde*1000);
    },
    // música desde un archivo (config.musicaArchivo). Si no existe, se usa la música generada.
    startFile(){
      if(!this.file){
        const a=new Audio(C.musicaArchivo);a.loop=true;a.preload='auto';
        a.onerror=()=>{this.fileOk=false;if(this.on&&this.mode==='file'){this.on=false;this.start()}};
        this.file=a;
      }
      const a=this.file;this.on=true;this.mode='file';a.volume=0;
      const p=a.play();if(p&&p.catch)p.catch(()=>{});
      this.ramp(this.target(),15);
      return true;
    },
    ducked:false,
    target(){const v=Math.max(0,Math.min(1,C.volumenArchivo??C.volumenMusica));return this.ducked?v*(C.bajarMusicaAlHablar??1):v},
    ramp(to,steps){const a=this.file;if(!a)return;clearInterval(this.fade);const from=a.volume,d=(to-from)/steps;let n=0;
      this.fade=setInterval(()=>{n++;a.volume=Math.max(0,Math.min(1,n>=steps?to:from+d*n));if(n>=steps)clearInterval(this.fade)},40)},
    // mientras habla la voz, la canción baja un poco (config.bajarMusicaAlHablar)
    duck(on){if(this.ducked===on)return;this.ducked=on;if(this.on&&this.mode==='file')this.ramp(this.target(),8)},
    stop(){
      if(this.on&&this.mode==='file'){
        this.on=false;this.mode='';const a=this.file;clearInterval(this.fade);
        this.fade=setInterval(()=>{a.volume=Math.max(0,a.volume-.04);if(a.volume<=0){clearInterval(this.fade);a.pause()}},40);return;
      }
      if(!this.on)return;this.on=false;clearInterval(this.id);const b=this.bus;if(b){b.gain.setTargetAtTime(0,ac.currentTime,.3);setTimeout(()=>b.disconnect(),1500)}},
    play(){
      const A=D.musicaNotas.acordes,ch=A[this.i++%A.length],t=ac.currentTime,d=C.segundosPorAcorde;
      [...ch,ch[0]-12].forEach((m,k)=>[-6,6].forEach(det=>{
        const o=ac.createOscillator(),g=ac.createGain();o.type=k===ch.length?'sine':'triangle';o.frequency.value=hz(m);o.detune.value=det;
        const v=k===ch.length?.09:.035;
        g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+1.4);g.gain.setValueAtTime(v,t+d);g.gain.linearRampToValueAtTime(0,t+d+1.6);
        o.connect(g);g.connect(this.bus);o.start(t);o.stop(t+d+1.7);
      }));
    }
  };

  /* ---------- voz ---------- */
  const clean=s=>String(s).replace(/[{}]/g,'').replace(/_{3,}/g,' '+C.textoHueco+' ');
  const enVoices=()=>('speechSynthesis' in window)?speechSynthesis.getVoices().filter(v=>/^en/i.test(v.lang)):[];
  function pickVoice(){
    const vs=enVoices(),saved=voicePref();let v=vs.find(x=>x.name===saved);
    if(!v)for(const p of V.preferidas||[]){v=vs.find(x=>x.name.toLowerCase().includes(String(p).toLowerCase()));if(v)break}
    return v||vs.find(x=>x.lang.replace('_','-')==='en-US')||vs[0];
  }
  // voces grabadas: data/historia-audios.js (lo crea herramientas/generar-voces.py)
  const AU=window.HISTORIA_AUDIOS&&window.HISTORIA_AUDIOS.lineas?window.HISTORIA_AUDIOS:null;
  const nRec=AU?Object.keys(AU.lineas).length:0;
  const keyOf=s=>clean(s).replace(/\s+/g,' ').trim();
  const voicePref=()=>{let v='';try{v=localStorage.getItem(VK)||''}catch(e){}return v||(nRec?'__rec':'__auto')};
  const useRec=()=>nRec>0&&voicePref()==='__rec';
  let sayId=0,player=null,pauseT=0;
  // reproduce una frase grabada. Puede venir en partes (una por oración) con pausas entre ellas: {partes:[[archivo,pausa_ms],...]}
  function speak(txt,who,force){
    if((!cfg.voice&&!force)||!txt)return false;
    stopAll();
    const id=++sayId,f=useRec()&&AU.lineas[keyOf(txt)];
    if(!f)return synth(txt,who,id);
    const parts=typeof f==='string'?[[f,0]]:(f.partes||[]);
    const E=V.efecto||{},vel=(E.velocidad||1)*(cfg.speed==='lenta'?.8:1),keep=E.mantenerTono!==false;
    const fail=()=>{if(id===sayId){player=null;setTalk(who,false);synth(txt,who,id)}};
    const play=k=>{
      if(id!==sayId)return;
      if(k>=parts.length){setTalk(who,false);Music.duck(false);return}
      const [src,pause]=parts[k],a=new Audio(src);player=a;
      // efecto de los videos: voz acelerada sin conservar el tono (más rápida y un poco más aguda). config.voz.efecto
      a.playbackRate=vel;try{a.preservesPitch=keep;a.mozPreservesPitch=keep;a.webkitPreservesPitch=keep}catch(e){}
      a.onplaying=()=>{if(id===sayId){setTalk(who,true);Music.duck(true)}};
      a.onended=()=>{if(id!==sayId)return;setTalk(who,false);
        if(k+1<parts.length){player=null;pauseT=setTimeout(()=>play(k+1),(+pause||0)*(cfg.speed==='lenta'?1.3:1))}else{Music.duck(false)}};
      a.onerror=()=>{if(k===0)fail();else play(k+1)};
      const pr=a.play();if(pr&&pr.catch)pr.catch(()=>{if(id===sayId&&player===a){if(k===0)fail();else play(k+1)}});
    };
    play(0);return true;
  }

  function synth(txt,who,id){
    if(!('speechSynthesis' in window))return false;
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(clean(txt));u.lang='en-US';
    const pv=C.vocesPorPersonaje&&who&&P[who]&&P[who].voz||{};
    u.rate=(pv.velocidad||V.velocidad||1)*(cfg.speed==='lenta'?.75:1);u.pitch=Math.max(0,Math.min(2,pv.tono||V.tono||1));
    const v=pickVoice();if(v){u.voice=v;u.lang=v.lang}
    u.onstart=()=>{if(id===sayId){setTalk(who,true);Music.duck(true)}};
    u.onend=u.onerror=()=>{if(id===sayId){setTalk(who,false);Music.duck(false)}};
    speechSynthesis.speak(u);return true;
  }
  function stopAll(){clearTimeout(pauseT);if(player){try{player.pause()}catch(e){}player=null}try{speechSynthesis.cancel()}catch(e){}}
  const hush=()=>{sayId++;stopAll();Music.duck(false);if(dlg)dlg.querySelectorAll('.ch.talk').forEach(x=>x.classList.remove('talk'))};

  /* ---------- personajes 2D (SVG dibujado con código + animaciones CSS) ---------- */
  const EMO=['normal','feliz','triste','sorpresa','enojado','miedo','pensando'];
  const shade=(hex,k)=>{const n=parseInt(String(hex).replace('#',''),16);if(isNaN(n))return hex;
    const c=[n>>16,(n>>8)&255,n&255].map(v=>Math.max(0,Math.min(255,Math.round(v*k))));return '#'+c.map(v=>v.toString(16).padStart(2,'0')).join('')};
  function charSVG(p){
    const sk=p.piel||'#f1c7a3',hr=p.pelo||'#3b2a1e',cl=p.ropa||'#2f6feb',pa=p.pantalon||'#1f2633',ey=p.ojos||'#1b1f2a',X=p.extras||[],pe=p.peinado||'corto';
    const dk=shade(cl,.75),sd=shade(sk,.85),hood=pe==='capucha';
    const back=pe==='rodete'?`<circle cx="60" cy="20" r="13" fill="${hr}"/>`
      :pe==='largo'?`<path fill="${hr}" d="M22 112 L22 60 Q22 20 60 20 Q98 20 98 60 L98 112 Q80 118 60 116 Q40 118 22 112Z"/>`
      :hood?`<path fill="${cl}" d="M16 74 Q12 12 60 10 Q108 12 104 74 Q102 106 60 108 Q18 106 16 74Z"/>`:'';
    const front={
      corto:`<path fill="${hr}" d="M25 64 Q21 22 60 21 Q99 22 95 64 Q92 44 79 37 Q64 47 41 40 Q29 46 25 64Z"/>`,
      rodete:`<path fill="${hr}" d="M25 64 Q22 25 60 24 Q98 25 95 64 Q90 42 60 38 Q30 42 25 64Z"/>`,
      largo:`<path fill="${hr}" d="M25 70 Q21 22 60 21 Q99 22 95 70 Q92 46 72 38 Q56 48 34 44 Q27 52 25 70Z"/>`,
      pelado:`<path fill="${hr}" d="M26 70 Q25 52 31 45 L34 70Z M94 70 Q95 52 89 45 L86 70Z"/>`,
      gorra:`<path fill="${cl}" d="M25 56 Q27 20 60 20 Q93 20 95 56Z"/><ellipse cx="60" cy="56" rx="42" ry="7" fill="${dk}"/><circle cx="60" cy="22" r="4" fill="${dk}"/>`,
      capucha:`<path fill="rgba(0,0,0,.5)" d="M27 64 Q29 30 60 28 Q91 30 93 64 Q60 50 27 64Z"/><path fill="none" stroke="${dk}" stroke-width="7" d="M26 96 Q16 36 60 26 Q104 36 94 96"/>`
    }[pe]||'';
    const ex=k=>X.includes(k);
    return `<svg viewBox="0 0 120 232" aria-hidden="true"><ellipse class="c-shadow" cx="60" cy="226" rx="38" ry="6"/>
      <g class="c-all"><g class="c-bob">
      ${back}
      <rect x="38" y="166" width="18" height="50" rx="7" fill="${pa}"/><rect x="64" y="166" width="18" height="50" rx="7" fill="${pa}"/>
      <ellipse cx="46" cy="218" rx="13" ry="6" fill="#111"/><ellipse cx="74" cy="218" rx="13" ry="6" fill="#111"/>
      <g class="c-arm c-arm-l"><rect x="17" y="104" width="15" height="58" rx="7.5" fill="${dk}"/><circle cx="24.5" cy="162" r="7" fill="${sk}"/></g>
      <g class="c-arm c-arm-r"><rect x="88" y="104" width="15" height="58" rx="7.5" fill="${dk}"/><circle cx="95.5" cy="162" r="7" fill="${sk}"/></g>
      <g class="c-torso"><rect x="28" y="98" width="64" height="76" rx="18" fill="${cl}"/>
        ${ex('buzo')?`<rect x="42" y="142" width="36" height="18" rx="6" fill="${dk}"/><path d="M52 100 L52 122 M68 100 L68 122" stroke="#eee" stroke-width="2"/>`:''}
        ${ex('corbata')?`<path fill="#eef2f7" d="M46 98 L60 112 L74 98Z"/><path fill="#c0392b" d="M57 104 L63 104 L66 142 L60 150 L54 142Z"/>`:''}
      </g>
      <rect x="52" y="88" width="16" height="14" rx="5" fill="${sd}"/>
      <g class="c-headg"><g class="c-headt">
        <circle cx="25" cy="66" r="6" fill="${sd}"/><circle cx="95" cy="66" r="6" fill="${sd}"/>
        <circle cx="60" cy="60" r="35" fill="${sk}"/>
        ${ex('barba')?`<path fill="${hr}" d="M28 70 Q30 102 60 104 Q90 102 92 70 Q84 92 60 92 Q36 92 28 70Z"/>`:''}
        <g class="c-blush"><ellipse cx="40" cy="76" rx="6" ry="3.5" fill="#ff7a8a" opacity=".45"/><ellipse cx="80" cy="76" rx="6" ry="3.5" fill="#ff7a8a" opacity=".45"/></g>
        <g class="c-eyes"><g class="c-eye"><ellipse cx="47" cy="64" rx="4.2" ry="5.4" fill="${ey}"/><circle cx="48.5" cy="62" r="1.5" fill="#fff"/></g>
          <g class="c-eye"><ellipse cx="73" cy="64" rx="4.2" ry="5.4" fill="${ey}"/><circle cx="74.5" cy="62" r="1.5" fill="#fff"/></g></g>
        <g stroke="${hood?'#000':shade(hr,.8)}" stroke-width="3" stroke-linecap="round"><path class="c-brow c-brow-l" d="M40 52 L53 52"/><path class="c-brow c-brow-r" d="M67 52 L80 52"/></g>
        ${ex('bigote')?`<path fill="${hr}" d="M46 79 Q60 70 74 79 Q60 76 46 79Z"/>`:''}
        <g class="c-mouth" fill="#7a2230" stroke="#4a1520" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path class="c-m m-normal" fill="none" d="M53 82 Q60 86 67 82"/>
          <path class="c-m m-feliz" d="M50 80 Q60 92 70 80Z"/>
          <path class="c-m m-triste" fill="none" d="M52 87 Q60 79 68 87"/>
          <ellipse class="c-m m-sorpresa" cx="60" cy="84" rx="5" ry="6.5"/>
          <path class="c-m m-enojado" fill="none" d="M52 86 Q60 81 68 86"/>
          <path class="c-m m-miedo" fill="none" d="M50 85 Q54 81 58 85 Q62 89 66 85 Q68 83 70 85"/>
          <path class="c-m m-pensando" fill="none" d="M54 85 L67 82"/>
          <ellipse class="c-m m-open" cx="60" cy="84" rx="6.5" ry="5.5"/>
        </g>
        ${front}
        ${ex('lentes')?`<g fill="rgba(200,230,255,.15)" stroke="#1d1d1d" stroke-width="2.5"><circle cx="47" cy="64" r="9"/><circle cx="73" cy="64" r="9"/><path d="M56 64h8" fill="none"/></g>`:''}
        ${ex('auriculares')?`<path d="M23 64 Q23 16 60 16 Q97 16 97 64" stroke="#1d1d1d" stroke-width="5" fill="none"/><rect x="16" y="56" width="11" height="18" rx="5" fill="#ff5d5d"/><rect x="93" y="56" width="11" height="18" rx="5" fill="#ff5d5d"/>`:''}
        ${ex('headset')?`<path d="M25 62 Q25 18 60 18 Q95 18 95 62" stroke="#1d1d1d" stroke-width="4" fill="none"/><rect x="18" y="56" width="10" height="16" rx="4" fill="#333"/><path d="M23 70 Q28 90 46 88" stroke="#333" stroke-width="3" fill="none"/><circle cx="47" cy="88" r="3.5" fill="#58a6ff"/>`:''}
      </g></g></g></g></svg>`;
  }
  const parseCast=L=>(L||[]).map(x=>{const[id,e]=String(x).split(':');return{id:id.trim(),emo:EMO.includes((e||'').trim())?e.trim():'normal'}}).filter(c=>P[c.id]);
  function setCast(L,speaker){
    const box=$h('#hcast'),C2=parseCast(L),n=C2.length,keep=new Set(C2.map(c=>c.id));
    box.querySelectorAll('.ch').forEach(el=>{if(!keep.has(el.dataset.id)&&!el.classList.contains('out')){el.classList.add('out');setTimeout(()=>el.remove(),500)}});
    C2.forEach((c,i)=>{
      let el=box.querySelector(`.ch[data-id="${c.id}"]:not(.out)`);
      const left=(i+1)/(n+1)*100;
      if(!el){el=document.createElement('div');el.className='ch enter';el.dataset.id=c.id;el.innerHTML=charSVG(P[c.id]);
        el.style.setProperty('--d',(Math.random()*4).toFixed(2)+'s');el.style.left=left+'%';box.appendChild(el);setTimeout(()=>el.classList.remove('enter'),700)}
      el.style.left=left+'%';
      if(el.dataset.emo!==c.emo){EMO.forEach(e=>el.classList.remove('e-'+e));void el.offsetWidth;el.classList.add('e-'+c.emo);el.dataset.emo=c.emo}
      el.classList.toggle('speak',c.id===speaker);
    });
    box.classList.toggle('has-speaker',!!speaker&&keep.has(speaker));
    $h('#hs').classList.toggle('has-cast',n>0);
  }
  function setTalk(id,on){const el=id&&$h(`#hcast .ch[data-id="${id}"]:not(.out)`);if(el)el.classList.toggle('talk',on)}

  /* ---------- escenario ---------- */
  function city(){
    let far='',near='',x=0;
    while(x<1000){const w=40+Math.random()*50,hh=70+Math.random()*130;far+=`<rect x="${x}" y="${300-hh}" width="${w}" height="${hh}"/>`;x+=w+4}
    x=-10;
    while(x<1000){
      const w=34+Math.random()*60,hh=60+Math.random()*190,y=300-hh;near+=`<rect class="b" x="${x}" y="${y}" width="${w}" height="${hh}"/>`;
      for(let wy=y+10;wy<290;wy+=14)for(let wx=x+6;wx<x+w-8;wx+=11)if(Math.random()<.55)
        near+=`<rect class="w${Math.random()<.08?' fl':''}" x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="5" height="7" style="animation-delay:${(Math.random()*6).toFixed(2)}s"/>`;
      x+=w+3;
    }
    return `<svg class="h-city" viewBox="0 0 1000 300" preserveAspectRatio="xMidYMax slice"><g class="far">${far}</g><g class="near">${near}</g></svg>`;
  }
  function shell(){
    dlg.innerHTML=`<div class="h-top"><b class="h-logo" id="hlogo">${h('title')}</b><div class="h-prog"><i id="hp"></i></div>
      <div class="g-btns"><button id="hcc" title="Subtítulos" class="${cfg.subs?'':'off'}">CC</button><button id="hvo" title="Voz" class="${cfg.voice?'':'off'}">🗣</button>
      <button id="hmus" title="Música" class="${mus?'':'off'}">♫</button><button id="hsfx" title="SFX" class="${sfx?'':'off'}">♪</button><button id="hpause">❚❚</button><button id="hx">✕</button></div></div>
      <div class="h-stage f-noche" id="hs">
        <div class="h-sky">${FONDOS.map(f=>`<div class="sky-${f}"></div>`).join('')}</div>${city()}<div class="h-rain"></div><div class="h-vig"></div><div class="h-cast" id="hcast"></div>
        <div class="h-box"><div class="h-who" id="hwho"></div><p class="h-text" id="htx"></p><p class="h-sub" id="hsub"></p><div class="h-q" id="hq"></div><div class="h-cont" id="hcont"></div></div>
      </div>
      <div class="g-ov" id="hov"></div>`;
    $h('#hx').onclick=close;$h('#hpause').onclick=toggle;
    $h('#hcc').onclick=e=>{cfg.subs=!cfg.subs;e.currentTarget.classList.toggle('off',!cfg.subs);$h('#hsub').hidden=!cfg.subs;dlg.querySelectorAll('.h-op small').forEach(x=>x.hidden=!cfg.subs)};
    $h('#hvo').onclick=e=>{cfg.voice=!cfg.voice;e.currentTarget.classList.toggle('off',!cfg.voice);if(!cfg.voice)hush()};
    $h('#hmus').onclick=e=>{mus=!mus;e.currentTarget.classList.toggle('off',!mus);if(mus&&st&&st.state==='play')Music.start();else Music.stop()};
    $h('#hsfx').onclick=e=>{sfx=!sfx;e.currentTarget.classList.toggle('off',!sfx)};
    $h('#hs').onclick=e=>{if(e.target.closest('button,input,form'))return;stageTap()};
    $h('#hov').onclick=ovClick;
  }
  function setFondo(f){
    if(!FONDOS.includes(f))return;
    const s=$h('#hs');FONDOS.forEach(x=>s.classList.remove('f-'+x));s.classList.add('f-'+f);
  }
  const tokens=txt=>String(txt).match(/\{[^}]*\}\S*|\S+/g)||[];
  function tokHTML(tk){
    return esc(tk).replace(/\{([^}]*)\}/g,(m,x)=>{const w=gl(x);return `<span class="h-key"${w?` title="${esc(w.es)}"`:''}>${x}</span>`})
      .replace(/_{3,}/g,'<span class="h-blank" id="hblank">&nbsp;?&nbsp;</span>');
  }
  function ov(html){const o=$h('#hov');o.innerHTML=html;o.hidden=false}

  /* ---------- pantalla de inicio ---------- */
  function showStart(){
    const F=found(),sp={lenta:'slow',normal:'normal',rapida:'fast'};
    const seg=(key,vals)=>`<span class="g-seg">${vals.map(([v,l])=>`<button data-k="${key}" data-v="${v}" class="${String(cfg[key])===String(v)?'on':''}">${l}</button>`).join('')}</span>`;
    ov(`<div class="g-card"><h2 class="g-h h-h">${h('title')}</h2><p class="g-sub">${h('sub')}</p>
      <div class="g-how"><div>${h('how1')}</div><div>${h('how2')}</div><div>${h('how3')}</div><div>${h('how4')}</div></div>
      <div class="h-stories">${H.map(s=>{const E=endsOf(s),f=(F[s.id]||[]).filter(id=>E.some(e=>e.id===id)).length;
        return `<button class="h-story ${cfg.story===s.id?'on':''}" data-s="${esc(s.id)}"><b>${esc(s.titulo)}</b><span>${esc(s.subtitulo?.[lang]||'')}</span><em>${f}/${E.length} ${h('found')}</em></button>`}).join('')}</div>
      <div class="g-row"><span class="g-lbl">${h('speed')}</span>${seg('speed',Object.keys(C.velocidades).map(v=>[v,h(sp[v]||v)]))}<span class="g-lbl">${h('subs')}</span>${seg('subs',[[true,h('on')],[false,h('off')]])}</div>
      <div class="g-row"><span class="g-lbl">${h('voice')}</span>${seg('voice',[[true,h('on')],[false,h('off')]])}<select id="hvsel"></select><button class="g-btn h-test" id="htest">${h('test')}</button></div>
      <p class="g-sub g-note" id="hvtip"></p>
      <button class="g-btn" id="hback">${h('back')}</button><button class="g-btn primary" id="hstart">${h('start')}</button></div>`);
    fillVoices();
  }
  function fillVoices(){
    const sel=dlg&&dlg.querySelector('#hvsel');if(!sel)return;
    const vs=enVoices(),cur=voicePref(),auto=pickVoiceAuto();
    sel.innerHTML=(nRec?`<option value="__rec">★ ${h('voiceRec')} (${esc(String(AU.voz||'').replace(/^en-US-|Neural$/g,''))})</option>`:'')
      +`<option value="__auto">${h('voiceAuto')}${auto?' ('+esc(auto.name)+')':''}</option>`
      +vs.map(v=>`<option value="${esc(v.name)}">${esc(v.name)} · ${esc(v.lang)}</option>`).join('');
    sel.value=[...sel.options].some(o=>o.value===cur)?cur:(nRec?'__rec':'__auto');
    const tip=()=>{const t=dlg.querySelector('#hvtip');if(t)t.textContent=useRec()?h('voiceRecTip').replace('%v',AU.voz||'').replace('%n',nRec):h('voiceTip')};
    sel.onchange=()=>{try{localStorage.setItem(VK,sel.value)}catch(e){}tip()};tip();
  }
  function pickVoiceAuto(){
    const vs=enVoices();let v;
    for(const p of V.preferidas||[]){v=vs.find(x=>x.name.toLowerCase().includes(String(p).toLowerCase()));if(v)break}
    return v||vs.find(x=>x.lang.replace('_','-')==='en-US')||vs[0];
  }
  function ovClick(e){
    const s=e.target.closest('[data-s]');if(s){cfg.story=s.dataset.s;showStart();return}
    const k=e.target.closest('[data-k]');if(k){const v=k.dataset.v;cfg[k.dataset.k]=v==='true'?true:v==='false'?false:v;syncBtns();showStart();return}
    const id=e.target.closest('button')?.id;
    if(id==='htest'){speak(V.frasePrueba||'In this city, nobody sleeps.',null,true);return}
    if(id==='hstart'||id==='hagain')start();
    if(id==='hothers'){st=null;showStart()}
    if(id==='hresume')toggle();
    if(id==='hquit'||id==='hclose'||id==='hback'){close();Juegos.open()}
  }
  function syncBtns(){$h('#hcc').classList.toggle('off',!cfg.subs);$h('#hvo').classList.toggle('off',!cfg.voice)}

  /* ---------- la historia ---------- */
  function start(){
    const s=story(cfg.story);if(!s)return;
    st={cast:[],who:null,S:s,id:null,sc:null,ok:0,bad:0,review:[],state:'play',ready:false,after:null,answered:false,steps:0};
    $h('#hlogo').textContent=s.titulo;$h('#hov').hidden=true;$h('#hsub').hidden=!cfg.subs;
    $h('#hcast').innerHTML='';setFondo('noche');Music.start();go(s.inicio);
  }
  function go(id){
    clear();hush();
    const sc=st.S.escenas[id];
    if(!sc){ov(`<div class="g-card"><h2 class="g-h bad">!</h2><p class="g-sub">${h('broken')}: <b>${esc(id)}</b></p><button class="g-btn" id="hothers">${h('others')}</button></div>`);return}
    if(++st.steps>500)return;
    if(sc.condicion){const c=sc.condicion;go(st.bad<=c.erroresMax?c.siCumple:c.siNo);return}
    st.id=id;st.sc=sc;st.ready=false;st.after=null;st.answered=false;
    if(sc.fondo)setFondo(sc.fondo);
    const who=sc.habla&&P[sc.habla]?sc.habla:null;st.who=who;
    if('personajes' in sc)st.cast=sc.personajes;
    setCast(st.cast,who);
    const wt=$h('#hwho');wt.textContent=who?P[who].nombre||who:'';wt.classList.toggle('in',!!who);
    const T=tokens(sc.texto),ms=C.msPorPalabra*(C.velocidades[cfg.speed]||1),tx=$h('#htx');
    tx.classList.toggle('long',T.length>16);
    tx.innerHTML=T.map(t=>`<span class="h-w">${tokHTML(t)}</span>`).join(' ');
    const sub=$h('#hsub');sub.textContent=sc.es||'';sub.classList.remove('in');
    $h('#hq').innerHTML='';$h('#hcont').innerHTML='';
    const p=$h('#hp');p.style.transition='none';p.style.width='0';void p.offsetWidth;p.style.transition=`width ${T.length*ms}ms linear`;p.style.width='100%';
    if(!speak(sc.texto,who))setTalk(who,true);
    const W=tx.querySelectorAll('.h-w');
    W.forEach((w,i)=>later(()=>{w.classList.add('in');sound('word')},300+i*ms));
    later(()=>sub.classList.add('in'),300+ms*2);
    later(ready,300+W.length*ms+250);
  }
  function ready(){
    if(!st||st.ready)return;clear();st.ready=true;if(!cfg.voice)setTalk(st.who,false);
    $h('#htx').querySelectorAll('.h-w').forEach(w=>w.classList.add('in'));$h('#hsub').classList.add('in');
    const p=$h('#hp');p.style.transition='none';p.style.width='100%';
    const sc=st.sc;
    if(sc.elegir)showChoose(sc.elegir);
    else if(sc.escribir)showType(sc.escribir);
    else if(sc.camino)showPath(sc.camino);
    else{st.after=sc.final?'__end':sc.ir;showCont()}
  }
  function showCont(){
    $h('#hcont').innerHTML=`<span>${h('cont')}</span>`;
    if(C.segundosAutoAvance>0&&!st.sc.final)later(next,C.segundosAutoAvance*1000);
  }
  function stageTap(){if(!st||st.state!=='play')return;if(!st.ready)ready();else next()}
  function next(){
    if(!st||st.state!=='play'||!st.ready||!st.after)return;
    if(st.after==='__end'){finish();return}
    go(st.after);
  }

  /* ---------- preguntas ---------- */
  function showChoose(q){
    const ops=C.barajarOpciones?shuffle([...q.opciones]):[...q.opciones];
    st.ops=ops;
    $h('#hq').innerHTML=`<div class="h-lbl">${h('choose')}</div><div class="h-ops">${ops.map((o,i)=>`<button class="h-op" data-i="${i}"><kbd>${i+1}</kbd>${esc(o)}</button>`).join('')}</div><div class="h-fb" id="hfb"></div>`;
    $h('#hq').querySelectorAll('.h-op').forEach(b=>b.onclick=()=>pick(+b.dataset.i));
  }
  function pick(i){
    if(!st||st.answered||st.state!=='play')return;
    const q=st.sc.elegir,o=st.ops[i];if(o==null)return;
    st.answered=true;const good=norm(o)===norm(q.correcta);
    $h('#hq').querySelectorAll('.h-op').forEach(b=>{const v=st.ops[+b.dataset.i];b.disabled=true;
      if(norm(v)===norm(q.correcta))b.classList.add('good');else if(+b.dataset.i===i)b.classList.add('bad')});
    resolve(good,q.correcta,'',q);
  }
  function showType(q){
    $h('#hq').innerHTML=`<div class="h-lbl">${h('type')}</div>
      <form class="h-form" id="hf"><input id="hin" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="${h('ph')}">
      <button class="g-btn primary" type="submit">${h('send')}</button><button class="g-btn" type="button" id="hhint">${h('hint')}</button></form>
      <div class="h-hint" id="hh"></div><div class="h-fb" id="hfb"></div>`;
    let lvl=0;
    $h('#hhint').onclick=()=>{
      lvl++;const a=q.respuestas[0]||'';
      const parts=[];if(q.pista)parts.push(`${h('hint')}: <b>${esc(q.pista)}</b>`);
      if(lvl>=2||!q.pista)parts.push(`${h('letter')}: <b>${esc(a[0]||'')}</b> <span class="h-dash">${esc(a.replace(/\S/g,'_ ').slice(2))}</span>`);
      $h('#hh').innerHTML=parts.join(' · ');$h('#hin').focus();
    };
    $h('#hf').onsubmit=e=>{e.preventDefault();
      if(!st||st.answered||st.state!=='play')return;
      const v=norm($h('#hin').value);if(!v)return;
      st.answered=true;$h('#hin').disabled=true;$h('#hf').querySelectorAll('button').forEach(b=>b.disabled=true);
      resolve(q.respuestas.some(r=>norm(r)===v),q.respuestas[0],q.pista,q);
    };
    setTimeout(()=>$h('#hin')&&$h('#hin').focus(),50);
  }
  function resolve(good,word,pista,q){
    const b=$h('#hblank'),es=trans(word,pista),w=gl(word);
    if(b){b.textContent=word;b.classList.add(good?'ok':'bad')}
    const sub=$h('#hsub');if(es&&/_{3,}/.test(sub.textContent))sub.textContent=sub.textContent.replace(/_{3,}/,es);
    if(good){st.ok++;sound('ok')}
    else{st.bad++;sound('bad');if(!st.review.some(r=>norm(r.word)===norm(word)))st.review.push({word,es,def:w&&(w.defEs||w.def)||''})}
    $h('#hfb').innerHTML=good?`✔ ${h('ok')} <b>${esc(word)}</b>${es?` <small>= ${esc(es)}</small>`:''}`
      :`✗ ${h('was')} <b>${esc(word)}</b>${es?` <small>= ${esc(es)}</small>`:''}`;
    $h('#hfb').className='h-fb '+(good?'good':'wrong');
    speak(clean(st.sc.texto).replace(' '+C.textoHueco+' ',' '+word+' '),st.who);
    st.after=good?q.siBien:(q.siMal||q.siBien);
    showCont();dlg.focus();
  }
  function showPath(P){
    $h('#hq').innerHTML=`<div class="h-lbl">${h('path')}</div><div class="h-ops path">${P.map((o,i)=>`<button class="h-op" data-i="${i}"><kbd>${i+1}</kbd><span>${esc(o.texto)}${o.es?`<small${cfg.subs?'':' hidden'}>${esc(o.es)}</small>`:''}</span></button>`).join('')}</div>`;
    $h('#hq').querySelectorAll('.h-op').forEach(b=>b.onclick=()=>choosePath(+b.dataset.i));
  }
  function choosePath(i){
    if(!st||st.answered||st.state!=='play')return;
    const o=st.sc.camino[i];if(!o)return;st.answered=true;sound('path');
    $h('#hq').querySelectorAll('.h-op').forEach(b=>{b.disabled=true;if(+b.dataset.i===i)b.classList.add('pick')});
    st.after=o.ir;speak(o.texto,'yo');later(()=>go(o.ir),900);
  }

  /* ---------- final ---------- */
  function finish(){
    const s=st.S,fin=st.sc.final,E=endsOf(s),F=found(),mine=F[s.id]||[];
    const isNew=!mine.includes(fin.id);if(isNew){mine.push(fin.id);F[s.id]=mine;try{localStorage.setItem(SK,JSON.stringify(F))}catch(e){}}
    st.state='over';clear();Music.stop();sound('end');
    ov(`<div class="g-card"><p class="g-sub h-endk">${h('ending')}</p><h2 class="g-h h-h">${esc(fin.titulo?.[lang]||fin.id)}</h2>${isNew?`<div class="g-badge">${h('newEnding')}</div>`:''}
      <div class="g-grid r-grid"><div><span>${h('hits')}</span><b>${st.ok}</b></div><div><span>${h('errs')}</span><b>${st.bad}</b></div><div><span>${h('endings')}</span><b>${mine.filter(id=>E.some(e=>e.id===id)).length}/${E.length}</b></div></div>
      <div class="h-ends">${E.map(e=>mine.includes(e.id)?`<span class="on">${esc(e.titulo?.[lang]||e.id)}</span>`:'<span>???</span>').join('')}</div>
      <h4>${h('review')}</h4>${st.review.length?`<div class="r-rev">${st.review.map(r=>`<div class="r-ri bad"><div><b>${esc(r.word)}</b>${r.es?` <span class="muted">· ${esc(r.es)}</span>`:''}${r.def?`<p>${esc(r.def)}</p>`:''}</div></div>`).join('')}</div>`:`<p class="g-sub">${h('none')}</p>`}
      <button class="g-btn primary" id="hagain">${h('again')}</button><button class="g-btn" id="hothers">${h('others')}</button><button class="g-btn" id="hclose">${h('quit')}</button></div>`);
  }

  /* ---------- pausa, teclado, cerrar ---------- */
  function toggle(){
    if(!st||st.state==='over')return;
    if(st.state==='play'){st.state='pause';clear();hush();Music.stop();
      ov(`<div class="g-card"><h2 class="g-h h-h">${h('paused')}</h2><p class="g-sub">Esc</p><button class="g-btn primary" id="hresume">${h('resume')}</button><button class="g-btn" id="hquit">${h('quit')}</button></div>`);}
    else{st.state='play';$h('#hov').hidden=true;Music.start();if(!st.ready)ready();else if(st.after&&st.sc.camino)go(st.after);else if(st.after&&!st.sc.final&&C.segundosAutoAvance>0)later(next,C.segundosAutoAvance*1000)}
  }
  function key(e){
    if(!st||st.state!=='play'||!$h('#hov').hidden)return;
    if(e.target.tagName==='INPUT')return;
    if(e.key==='Enter'||e.key===' '){e.preventDefault();stageTap();return}
    const n=+e.key;
    if(n>=1&&n<=9&&st.ready&&!st.answered){
      if(st.sc.elegir)pick(n-1);else if(st.sc.camino)choosePath(n-1);
    }
  }
  function close(){clear();if(st)st.state='over';Music.stop();hush();st=null;dlg.close()}
  function open(){
    dlg=document.querySelector('#historia');
    if(!dlg.dataset.ready){
      dlg.dataset.ready=1;dlg.tabIndex=-1;
      dlg.addEventListener('cancel',e=>{e.preventDefault();st&&st.state!=='over'?toggle():close()});
      dlg.addEventListener('keydown',key);
      if('speechSynthesis' in window)speechSynthesis.addEventListener?.('voiceschanged',fillVoices);
      document.addEventListener('visibilitychange',()=>{if(document.hidden&&st&&st.state==='play')toggle()});
    }
    st=null;shell();showStart();dlg.showModal();
  }
  return{open};
})();
