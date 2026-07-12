const nav=document.getElementById('nav');
addEventListener('scroll',()=>nav.classList.toggle('on',scrollY>20),{passive:true});

const bg=document.getElementById('bg'),nl=document.getElementById('nl');
bg.addEventListener('click',()=>{const o=nl.classList.toggle('open');bg.classList.toggle('open',o);bg.setAttribute('aria-expanded',o)});
nl.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nl.classList.remove('open');bg.classList.remove('open');bg.setAttribute('aria-expanded','false')}));

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -4% 0px'});
document.querySelectorAll('.rv,.rvl,.rvr,.rvu').forEach(el=>io.observe(el));

/* parallax drift — each collage piece moves at its own speed */
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const drifts=[...document.querySelectorAll('[data-drift]')];
if(!reduce&&drifts.length&&innerWidth>860){
  let ticking=false;
  const update=()=>{
    const vh=innerHeight;
    drifts.forEach(el=>{
      const r=el.parentElement.getBoundingClientRect();
      const p=(r.top+r.height/2-vh/2)/vh;
      el.style.transform=`translateY(${(p*parseFloat(el.dataset.drift)*400).toFixed(1)}px)`;
    });
    ticking=false;
  };
  addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true}},{passive:true});
  update();
}
