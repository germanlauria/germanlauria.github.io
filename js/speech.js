const Speech={
  say(text,slow,l='en-US'){
    if(!('speechSynthesis' in window)||!text)return;
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(text.replace(/[\[\]{}]/g,' '));
    u.lang=l;u.rate=slow?0.6:0.95;
    const vs=speechSynthesis.getVoices();
    const v=vs.find(x=>x.lang.replace('_','-')===l)||vs.find(x=>x.lang.startsWith(l.slice(0,2)));
    if(v)u.voice=v;
    speechSynthesis.speak(u);
  }
};