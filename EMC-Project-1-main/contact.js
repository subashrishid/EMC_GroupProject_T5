// Contact: cost estimator (interactive) + validated enquiry form
const R={res:[1800,2300,3000],com:[2200,2800,3500],ind:[1400,1800,2300]};
const ty=$('#ty'),ar=$('#ar'),av=$('#av'),out=$('#out'),note=$('#note'),tt=$('#toast');
const fmt=v=>v>=1e7?'₹'+(v/1e7).toFixed(2)+' Cr':'₹'+Math.round(v/1e5)+' Lakh';
const calc=()=>{const f=+$('input[name=fi]:checked').value,a=+ar.value,b=a*R[ty.value][f];av.textContent=a.toLocaleString('en-IN')+' sq ft';out.textContent=fmt(b)+' – '+fmt(b*1.15)};
[ty,ar,...$$('input[name=fi]')].forEach(e=>e.addEventListener('input',calc));calc();
$('#use').onclick=()=>{note.value=`I would like a quote for a ${ty.selectedOptions[0].text.toLowerCase()} project of ${av.textContent} (${$('input[name=fi]:checked').dataset.n} finish). Estimate shown: ${out.textContent}.`;$('#f').scrollIntoView({behavior:'smooth',block:'center'});note.focus({preventScroll:true})};
const toast=m=>{tt.textContent=m;tt.classList.add('show');setTimeout(()=>tt.classList.remove('show'),4200)};
const f=$('#f'),rules={n:v=>v.trim().length>1||'Please enter your name',p:v=>/^\+?[\d\s-]{9,15}$/.test(v.trim())||'Enter a valid phone number',e:v=>/^\S+@\S+\.\S+$/.test(v.trim())||'Enter a valid email address',note:v=>v.trim().length>9||'Please add a few details (10+ characters)'};
f.addEventListener('input',e=>{e.target.classList.remove('err');const m=e.target.closest('label')?.querySelector('.m');if(m)m.textContent=''});
f.onsubmit=e=>{e.preventDefault();let ok=true;for(const k in rules){const i=f.elements[k],r=rules[k](i.value);i.closest('label').querySelector('.m').textContent=r===true?'':r;i.classList.toggle('err',r!==true);if(r!==true)ok=false}
 if(!ok)return;const b=$('[type=submit]',f);b.disabled=true;b.textContent='Sending…';
 setTimeout(()=>{f.reset();b.disabled=false;b.textContent='Send enquiry';toast('Thank you! We will call you within one working day.')},900)};
