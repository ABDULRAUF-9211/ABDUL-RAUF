
(() => {
  const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
  const loader=$('.loader'); document.addEventListener('DOMContentLoaded',()=>setTimeout(()=>loader?.classList.add('hide'),260)); setTimeout(()=>loader?.classList.add('hide'),1400);
  const progress=$('.scroll-progress');
  const onScroll=()=>{const max=document.documentElement.scrollHeight-innerHeight; if(progress) progress.style.width=(max>0?scrollY/max*100:0)+'%';};
  addEventListener('scroll',onScroll,{passive:true}); onScroll();

  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -5% 0px'});
  $$('.reveal,.split-line').forEach(el=>io.observe(el));

  const menu=$('.menu-btn'), nav=$('.nav-links');
  menu?.addEventListener('click',()=>{nav?.classList.toggle('open');document.body.classList.toggle('menu-open');});
  $$('.nav-links a').forEach(a=>a.addEventListener('click',()=>{nav?.classList.remove('open');document.body.classList.remove('menu-open');}));

  const cursor=$('.cursor');
  if(matchMedia('(pointer:fine)').matches && cursor){
    addEventListener('mousemove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';cursor.classList.add('show')});
    $$('a,button,.project-card,.archive-card,.social-tile').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('big'));el.addEventListener('mouseleave',()=>cursor.classList.remove('big'))});
  }

  $$('.magnetic').forEach(el=>{
    el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();const x=(e.clientX-r.left-r.width/2)*.18;const y=(e.clientY-r.top-r.height/2)*.18;el.style.transform=`translate(${x}px,${y}px)`});
    el.addEventListener('mouseleave',()=>el.style.transform='');
  });

  if(!matchMedia('(prefers-reduced-motion:reduce)').matches){
    const floats=$$('[data-parallax]');
    addEventListener('scroll',()=>floats.forEach(el=>{const n=parseFloat(el.dataset.parallax||.08);const r=el.getBoundingClientRect();el.style.transform=`translateY(${(innerHeight/2-r.top)*n}px)`}),{passive:true});
  }

  const filterBtns=$$('.filter-btn'), cards=$$('.archive-card');
  filterBtns.forEach(btn=>btn.addEventListener('click',()=>{
    filterBtns.forEach(b=>b.classList.remove('active'));btn.classList.add('active');
    const f=btn.dataset.filter;
    cards.forEach(c=>c.classList.toggle('hide',f!=='all'&&!c.dataset.cat.split(' ').includes(f)));
  }));

  $$('video[data-autoplay]').forEach(v=>{
    const vio=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting?v.play().catch(()=>{}):v.pause()),{threshold:.35});vio.observe(v);
  });
})();

// Image lightbox for portfolio galleries
(() => {
  const images=[...document.querySelectorAll('.gallery img,.case-cover img')];
  if(!images.length) return;
  const box=document.createElement('div');
  box.className='image-lightbox';
  box.innerHTML='<button class="lightbox-close" aria-label="Close image">×</button><img alt=""><div class="lightbox-caption"></div>';
  document.body.appendChild(box);
  const img=box.querySelector('img'), caption=box.querySelector('.lightbox-caption');
  const close=()=>{box.classList.remove('open');document.body.style.overflow='';};
  images.forEach(el=>el.addEventListener('click',()=>{img.src=el.currentSrc||el.src;img.alt=el.alt||'Portfolio image';caption.textContent=el.alt||'';box.classList.add('open');document.body.style.overflow='hidden';}));
  box.querySelector('.lightbox-close').addEventListener('click',close);
  box.addEventListener('click',e=>{if(e.target===box) close();});
  addEventListener('keydown',e=>{if(e.key==='Escape') close();});
})();
