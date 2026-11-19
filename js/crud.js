const Crud={
  dup(term,id){return Store.words.some(w=>w.id!==id&&w.term.toLowerCase()===term.toLowerCase())},
  async create(d){
    d.term=d.term.trim();
    if(this.dup(d.term))return{error:'dup'};
    d.id=slug(d.term)||'word';
    while(Store.words.some(w=>w.id===d.id))d.id+='-2';
    Store.words.push(d);await Store.save();refresh();return{};
  },
  async update(id,d){
    d.term=d.term.trim();
    if(this.dup(d.term,id))return{error:'dup'};
    Object.assign(Store.words.find(w=>w.id===id),d);await Store.save();refresh();return{};
  },
  async remove(id){
    const i=Store.words.findIndex(w=>w.id===id);
    if(i>-1)Store.words.splice(i,1);
    await Store.save();refresh();
  }
};
