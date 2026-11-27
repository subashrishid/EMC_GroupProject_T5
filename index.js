// Shared (all pages): theme, mobile menu, progress bar, reveal, counters, tilt  +  Home: rotator, parallax, before/after, testimonials
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const root=document.documentElement,th=$('#th');
const setT=m=>{root.dataset.theme=m;th.textContent=m==='dark'?'☀':'☾';try{localStorage.setItem('tb-theme',m)}catch(e){}};
th.textContent=root.dataset.theme==='dark'?'☀':'☾';
th.onclick=()=>setT(root.dataset.theme==='dark'?'light':'dark');
const menu=$('#menu'),nav=$('#links');
const tog=o=>{nav.classList.toggle('open',o);menu.classList.toggle('x',o);menu.setAttribute('aria-expanded',o);document.body.classList.toggle('lock',o)};
menu.onclick=()=>tog(!nav.classList.contains('open'));
$$('a',nav).forEach(a=>a.addEventListener('click',()=>tog(false)));
addEventListener('keydown',e=>e.key==='Escape'&&tog(false));
matchMedia('(min-width:900px)').addEventListener('change',()=>tog(false));
const pg=$('#pg'),up=$('#up'),hd=$('.hd');
const onS=()=>{const max=root.scrollHeight-innerHeight;pg.style.width=(max>0?scrollY/max*100:0)+'%';up.classList.toggle('show',scrollY>500);hd.classList.toggle('sm',scrollY>20)};
addEventListener('scroll',onS,{passive:true});onS();
up.onclick=()=>scrollTo({top:0,behavior:'smooth'});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
$$('[data-r]').forEach((el,i)=>{el.style.transitionDelay=(i%4)*70+'ms';io.observe(el)});
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);const end=+e.target.dataset.count,t0=performance.now(),f=t=>{const p=Math.min((t-t0)/1400,1);e.target.textContent=Math.round(end*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}));
$$('[data-count]').forEach(el=>co.observe(el));
if(matchMedia('(hover:hover)').matches)$$('.tilt').forEach(c=>{c.onmousemove=e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(800px) rotateY(${x*7}deg) rotateX(${-y*7}deg) translateY(-4px)`};c.onmouseleave=()=>c.style.transform=''});
// ---- Home only ----
const rot=$('.rot');if(rot){const w=['LINUX','GITHUB','AWS','TERRAFORM','DOCKER','KUBERNETES'];let i=0;setInterval(()=>{rot.style.opacity=0;setTimeout(()=>{i=(i+1)%w.length;rot.textContent=w[i];rot.style.opacity=1},300)},2500)}
const hi=$('.hero-img');if(hi)addEventListener('scroll',()=>{hi.style.transform=`translateY(${Math.min(scrollY,600)*.07}px)`},{passive:true});
const ba=$('.ba');if(ba){const r=$('input',ba);r.oninput=()=>ba.style.setProperty('--p',r.value+'%')}
const tr=$('.tr');if(tr){const n=tr.children.length,dots=$('.dots');let k=0,t,x0;
 const go=i=>{k=(i+n)%n;tr.style.transform=`translateX(-${k*100}%)`;[...dots.children].forEach((d,j)=>d.classList.toggle('on',j===k));clearInterval(t);t=setInterval(()=>go(k+1),6000)};
 for(let i=0;i<n;i++){const b=document.createElement('button');b.setAttribute('aria-label','Testimonial '+(i+1));b.onclick=()=>go(i);dots.append(b)}
 tr.ontouchstart=e=>x0=e.touches[0].clientX;tr.ontouchend=e=>{const d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>40)go(k+(d<0?1:-1))};go(0)}
