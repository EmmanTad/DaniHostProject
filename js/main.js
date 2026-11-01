/* ==========================================================
   main.js — all interactions
   1. Scroll progress bar, sticky-header shadow, scroll reveal,
      stat counters, active menu link
   2. Typewriter effect on "Dani Dingcong" (hero)
   3. Portfolio category filter + pause Ken Burns off-screen
   4. Client logos 3D camera scene (parallax + dust particles)
   ========================================================== */
(function(){
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
var prog=document.getElementById('prog'),hd=document.querySelector('header');
function onS(){var h=document.documentElement.scrollHeight-innerHeight;prog.style.transform='scaleX('+(h>0?Math.min(scrollY/h,1):0)+')';hd.classList.toggle('s',scrollY>10)}
addEventListener('scroll',onS,{passive:true});onS();
function count(el){var t=+el.dataset.count,s=el.dataset.suf||'',st=null;function f(ts){st=st||ts;var p=Math.min((ts-st)/1600,1);el.textContent=Math.round(t*(1-Math.pow(1-p,3)))+s;if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
if('IntersectionObserver' in window){
if(!rm){
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target;io.unobserve(el);if(el.dataset.count){count(el);return}el.classList.add('in');setTimeout(function(){el.classList.remove('reveal','in');el.style.removeProperty('--d')},1600)})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('h2,.kicker,.intro,.card,.job,.step,.test,.tile,.logo-slot,.stat,details,.info>p,form,.about>div,.tags,.quote').forEach(function(el){if(el.closest('.hero'))return;var i=Array.prototype.indexOf.call(el.parentNode.children,el);el.style.setProperty('--d',(i%6)*.08+'s');el.classList.add('reveal');io.observe(el)});
document.querySelectorAll('.stat b').forEach(function(b){b.textContent='0'+(b.dataset.suf||'');io.observe(b)});
}
var links=[].slice.call(document.querySelectorAll('nav a[href^="#"]:not(.btn)'));
var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
['about','services','experience','portfolio','faq'].forEach(function(id){var s=document.getElementById(id);if(s)so.observe(s)});
}
(function(){
var a=document.querySelectorAll('.tw');
if(a.length>1&&!rm){var t=[a[0].textContent,a[1].textContent];
var sleep=function(ms){return new Promise(function(r){setTimeout(r,ms)})};
var cur=function(i){a[0].classList.toggle('cur',i===0);a[1].classList.toggle('cur',i===1)};
var typeLine=async function(i){cur(i);for(var k=1;k<=t[i].length;k++){a[i].textContent=t[i].slice(0,k);await sleep(120)}};
var delLine=async function(i){cur(i);for(var k=t[i].length-1;k>=0;k--){a[i].textContent=t[i].slice(0,k);await sleep(55)}};
(async function(){a[0].textContent='';a[1].textContent='';await sleep(800);while(true){await typeLine(0);await sleep(250);await typeLine(1);await sleep(3200);await delLine(1);await delLine(0);await sleep(600)}})()}
})();
(function(){
var fb=document.querySelectorAll('.filters button'),ts=document.querySelectorAll('.grid .tile');if(!fb.length)return;
fb.forEach(function(b){var f=b.dataset.f;b.querySelector('i').textContent=f==='all'?ts.length:[].filter.call(ts,function(t){return t.dataset.cat===f}).length;
b.addEventListener('click',function(){fb.forEach(function(x){x.classList.toggle('on',x===b);x.setAttribute('aria-pressed',x===b)});ts.forEach(function(t){var show=f==='all'||t.dataset.cat===f;t.classList.toggle('hide',!show);if(show){t.classList.remove('pop');void t.offsetWidth;t.classList.add('pop')}})})});
if('IntersectionObserver' in window){var o=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle('live',e.isIntersecting)})});ts.forEach(function(t){o.observe(t)})}else ts.forEach(function(t){t.classList.add('live')});
})();
(function(){
var st=document.querySelector('.stage');if(!st)return;
var sc=st.querySelector('.scene'),cv=st.querySelector('canvas'),c2=cv.getContext('2d');
var W=0,H=0,dpr=Math.min(devicePixelRatio||1,2),ps=[],tx=0,ty=0,px=0,py=0,last=0,vis=false,raf=0,idle=true,lm=0;
function size(){var r=st.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;c2.setTransform(dpr,0,0,dpr,0,0)}
for(var i=0;i<110;i++)ps.push({x:Math.random(),y:Math.random(),z:.2+Math.random()*.8,s:.02+Math.random()*.05,p:Math.random()*6.28,c:Math.random()<.3});
size();addEventListener('resize',size);
st.addEventListener('pointermove',function(e){var r=st.getBoundingClientRect();tx=(e.clientX-r.left)/r.width-.5;ty=(e.clientY-r.top)/r.height-.5;idle=false;lm=performance.now()});
st.addEventListener('pointerleave',function(){idle=true});
function frame(ts){
if(!vis){raf=0;return}
var dt=Math.min((ts-last)/1000||.016,.05);last=ts;
if(!idle&&ts-lm>2500)idle=true;
if(idle){tx=Math.sin(ts/3200)*.38;ty=Math.cos(ts/4100)*.22}
var k=Math.min(dt*4,1);px+=(tx-px)*k;py+=(ty-py)*k;
sc.style.transform='rotateX('+(-py*12)+'deg) rotateY('+(px*18)+'deg)';
st.style.setProperty('--mx',(px+.5)*100+'%');st.style.setProperty('--my',(py+.5)*100+'%');
c2.clearRect(0,0,W,H);
for(var i=0;i<ps.length;i++){var p=ps[i];
if(!rm){p.y-=p.s*p.z*dt;p.x+=Math.sin(ts/2000+p.p)*.012*dt;if(p.y<-.02){p.y=1.02;p.x=Math.random()}}
var x=p.x*W-px*70*p.z,y=p.y*H-py*40*p.z,a=(.15+.5*p.z)*(.55+.45*Math.sin(ts/700+p.p));
c2.fillStyle=(p.c?'rgba(112,240,224,':'rgba(255,255,255,')+a.toFixed(3)+')';
c2.beginPath();c2.arc(x,y,.6+p.z*2.2,0,6.283);c2.fill()}
if(!rm)raf=requestAnimationFrame(frame)}
if(rm){vis=true;frame(1000)}
else if('IntersectionObserver' in window){new IntersectionObserver(function(es){vis=es[0].isIntersecting;if(vis&&!raf)raf=requestAnimationFrame(frame)}).observe(st)}
})();
})();
