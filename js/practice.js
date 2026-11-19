const Practice={
  open(list){
    if(!list.length)return;
    const d=document.querySelector('#cards'),deck=[...list].sort(()=>Math.random()-.5);
    let i=0,flip=false;
    const draw=()=>{
      const w=deck[i];
      d.innerHTML=`<div class="dhead"><h2 style="font-size:18px">${t('practice')} · ${i+1}/${deck.length}</h2><button class="icon" data-close>✕</button></div>
      <div class="flash" id="fl">${flip?`<div class="es big">${esc(w.trans)}</div><p>${esc(w.ex)}</p><p class="muted">${esc(w.exT)}</p>`:`<h2>${esc(w.head)}</h2><div class="pron big">${esc(w.pron)}</div><p class="muted">${t('tapFlip')}</p>`}</div>
      <div class="actions"><button class="btn" id="pv">←</button><button class="btn" id="sy">${t('listen')}</button><button class="btn primary" id="nx">→</button></div>`;
      d.querySelector('[data-close]').onclick=()=>d.close();
      d.querySelector('#fl').onclick=()=>{flip=!flip;draw()};
      d.querySelector('#sy').onclick=()=>Speech.say(w.head,false,w.hl);
      d.querySelector('#pv').onclick=()=>{i=(i-1+deck.length)%deck.length;flip=false;draw()};
      d.querySelector('#nx').onclick=()=>{i=(i+1)%deck.length;flip=false;draw()};
    };
    draw();d.showModal();
  }
};