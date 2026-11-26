// Services: filter chips with live count
const chips=$$('.chip'),items=$$('[data-c]'),cnt=$('#cnt');
chips.forEach(b=>b.onclick=()=>{chips.forEach(c=>c.classList.toggle('on',c===b));let n=0;items.forEach(s=>{const show=b.dataset.f==='all'||s.dataset.c===b.dataset.f;s.hidden=!show;if(show)n++});cnt.textContent='Showing '+n+' service'+(n>1?'s':'')});
