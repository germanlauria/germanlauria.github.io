/* Respelling de palabras en español para lectores de inglés (sílaba tónica en MAYÚSCULA) */
const Es=(()=>{
  const VOW='aeiouáéíóúü',ACC='áéíóú',WEAK='iuüy';
  const CL=['pl','pr','bl','br','fl','fr','cl','cr','gl','gr','tr','dr','kl','kr'];
  const vm={a:'ah',e:'eh',i:'ee',o:'oh',u:'oo',á:'ah',é:'eh',í:'ee',ó:'oh',ú:'oo',ü:'oo',y:'ee'};
  const cm={q:'k',j:'h',h:'',ll:'y',ñ:'ny',v:'b',z:'s',x:'ks','γ':'g'};
  const OV={mouse:'MOWS',hacker:'HAH-ker',phishing:'FEE-sheen',applet:'AH-plet',bios:'BEE-ohs',pendrive:'pen-DRAHYV',ram:'RAHM',software:'SOFT-wehr',firmware:'FEERM-wehr',cookie:'KOO-kee'};
  const nuc=v=>{
    const s=v.map(x=>x.s);
    if(s.length===1)return vm[s[0]];
    if(s.length>2)return s.map(x=>vm[x]).join('');
    const[a,b]=s;
    if('iuü'.includes(a)&&!WEAK.includes(b))return(a==='i'?'y':'w')+vm[b];
    const m={ai:'eye',ay:'eye',ei:'ay',ey:'ay',oi:'oy',oy:'oy',au:'ow',eu:'eh-oo',iu:'yoo',ui:'wee'}[a+b];
    return m||vm[a]+vm[b];
  };
  const cons=(arr,next)=>arr.map((x,i)=>{
    const nx=i===arr.length-1?next:'',soft=nx&&'eiéí'.includes(nx);
    if(x.s==='c')return soft?'s':'k';
    if(x.s==='g')return soft?'h':'g';
    return x.s in cm?cm[x.s]:x.s;
  }).join('');
  const word=w=>{
    if(OV[w])return OV[w];
    const s=w.replace(/qu(?=[eiéí])/g,'q').replace(/gu(?=[eiéí])/g,'γ'),T=[];
    for(let i=0;i<s.length;i++){
      const c=s[i],two=s.substr(i,2);
      if(['ch','ll','rr'].includes(two)){T.push({t:'C',s:two});i++}
      else if(VOW.includes(c)||(c==='y'&&i===s.length-1))T.push({t:'V',s:c});
      else T.push({t:'C',s:c});
    }
    const G=[];let c=[],k=0;
    while(k<T.length){
      if(T[k].t==='C'){c.push(T[k++]);continue}
      const v=[T[k++]];
      while(k<T.length&&T[k].t==='V'&&(WEAK.includes(v[v.length-1].s)||WEAK.includes(T[k].s)))v.push(T[k++]);
      G.push({c,v,d:[]});c=[];
    }
    if(!G.length)return w;
    G[G.length-1].d=c;
    for(let g=1;g<G.length;g++){
      const cs=G[g].c,n=cs.length,cl=(a,b)=>CL.includes(a.s+b.s);
      const keep=n<2?0:n===2?(cl(cs[0],cs[1])?0:1):(cl(cs[n-2],cs[n-1])?n-2:n-1);
      G[g-1].d=cs.slice(0,keep);G[g].c=cs.slice(keep);
    }
    let st=G.findIndex(g=>g.v.some(x=>ACC.includes(x.s)));
    if(st<0){
      const last=T[T.length-1],endsVN=(last.t==='V'&&last.s!=='y')||(last.t==='C'&&['n','s'].includes(last.s));
      st=G.length>1?(endsVN?G.length-2:G.length-1):0;
    }
    return G.map((g,i)=>{
      const sy=cons(g.c,g.v[0].s)+nuc(g.v)+cons(g.d,'');
      return G.length>1&&i===st?sy.toUpperCase():sy;
    }).join('-');
  };
  return{pron:t=>t.toLowerCase().replace(/[a-záéíóúüñ]+/g,word)};
})();