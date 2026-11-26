// Gallery: category filter + lightbox (arrows, keyboard, swipe)
const chips=$$('.chip'),figs=$$('.gal figure'),lb=$('#lb'),li=$('#lbi'),lt=$('#lbt'),lc=$('#lbc');let cur=[],k=0,x0;
chips.forEach(b=>b.onclick=()=>{chips.forEach(c=>c.classList.toggle('on',c===b));figs.forEach(f=>f.hidden=!(b.dataset.f==='all'||f.dataset.c===b.dataset.f))});
const vis=()=>figs.filter(f=>!f.hidden);
const show=i=>{cur=vis();k=(i+cur.length)%cur.length;const im=$('img',cur[k]);li.src=im.src;li.alt=im.alt;lt.textContent=$('figcaption',cur[k]).firstChild.textContent;lc.textContent=(k+1)+' / '+cur.length};
const open=f=>{lb.hidden=false;document.body.classList.add('lock');show(vis().indexOf(f))};
const close=()=>{lb.hidden=true;document.body.classList.remove('lock')};
figs.forEach(f=>{f.tabIndex=0;f.onclick=()=>open(f);f.onkeydown=e=>e.key==='Enter'&&open(f)});
$('#lbx').onclick=close;$('#lbp').onclick=()=>show(k-1);$('#lbn').onclick=()=>show(k+1);
lb.onclick=e=>{if(e.target===lb)close()};
addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(k-1);if(e.key==='ArrowRight')show(k+1)});
lb.ontouchstart=e=>x0=e.touches[0].clientX;lb.ontouchend=e=>{const d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>50)show(k+(d<0?1:-1))};
