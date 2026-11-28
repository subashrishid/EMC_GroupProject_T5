// About: FAQ accordion (only one answer open at a time)
const ds=$$('.faq details');
ds.forEach(d=>d.addEventListener('toggle',()=>{if(d.open)ds.forEach(o=>{if(o!==d)o.open=false})}));
