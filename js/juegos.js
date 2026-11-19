/* MENÚ DE JUEGOS — arma la lista a partir de los archivos data/juego-*.js (window.JUEGOS).
   Para agregar un juego nuevo: crear su data/juego-xxx.js (con modulo, orden, nombre, descripcion…),
   su js/xxx.js con un módulo que tenga open(), su <dialog> en index.html y los <script> correspondientes. */
const Juegos=(()=>{
  const T={es:{title:'Juegos',sub:'Elegí un juego para practicar el vocabulario del glosario.',play:'Jugar',none:'No hay juegos activos.'},
           en:{title:'Games',sub:'Pick a game to practice the glossary vocabulary.',play:'Play',none:'No active games.'}};
  const j=k=>T[lang][k];
  const lista=()=>Object.entries(window.JUEGOS||{}).filter(([,d])=>d.activo!==false).sort((a,b)=>(a[1].orden||99)-(b[1].orden||99));
  // icono: una imagen (img/juegos/xxx.svg) o un emoji
  const ico=i=>/\.(svg|png|jpe?g|webp|gif)$/i.test(i||'')?`<img src="${esc(i)}" alt="">`:esc(i||'🎮');
  const modulo=n=>{try{return Function('return '+n)()}catch(e){return null}};
  function open(){
    const d=document.querySelector('#juegos'),L=lista();
    d.innerHTML=`<div class="j-head"><div><h2>${j('title')}</h2><p class="muted">${j('sub')}</p></div><button class="icon" data-close>✕</button></div>
      <div class="j-list">${L.length?L.map(([id,g])=>`<button class="j-card" data-id="${esc(id)}"><span class="j-ico">${ico(g.icono)}</span>
        <span class="j-txt"><b>${esc(g.nombre?.[lang]||id)}</b><span>${esc(g.descripcion?.[lang]||'')}</span></span><span class="j-play">${j('play')} ›</span></button>`).join(''):`<p class="muted">${j('none')}</p>`}</div>`;
    d.querySelector('[data-close]').onclick=()=>d.close();
    d.querySelectorAll('.j-card').forEach(b=>b.onclick=()=>{
      const m=modulo(window.JUEGOS[b.dataset.id].modulo);
      if(m&&m.open){d.close();m.open()}
    });
    if(!d.open)d.showModal();
  }
  return{open};
})();
