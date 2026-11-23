/* Девять проектов: редактируйте подписи, фотографии и ссылки здесь. */
const PROJECTS = [
  { title: "INTER", category: "Интерактивный сайт", src: "./images/projects/project-01.jpg", url: "./soon.html" },
  { title: "SMOOTH", category: "Айдентика", src: "./images/projects/project-02.jpg", url: "./projects/project-02.html" },
  { title: "Сайт музея камней", category: "Сайт", src: "./images/projects/project-03.jpg", url: "./soon.html" },
  { title: "CLIFF", category: "Айдентика", src: "./images/projects/project-04.jpg", url: "./soon.html" },
  { title: "AIM8", category: "Сайт", src: "./images/projects/project-05.jpg", url: "./soon.html" },
  { title: "Квартира", category: "Брендинг+Сайт", src: "./images/projects/project-06.jpg", url: "./soon.html" },
  { title: "Фестиваль", category: "Плакаты", src: "./images/projects/project-07.jpg", url: "./soon.html" },
  { title: "Мастер класс «Москва 2030»", category: "Презентация", src: "./images/projects/project-08.jpg", url: "./soon.html" },
  { title: "Креативная презентация", category: "Презентация", src: "./images/projects/project-09.jpg", url: "./soon.html" }
];
(() => {
 const track=document.getElementById('projectsTrack');
 if(!track) return;
 let active=0;
 const cards=PROJECTS.map((project,i)=>{
   const a=document.createElement('a'); a.className='project-card'; a.href=project.url;
   a.setAttribute('aria-label',`Открыть проект ${i+1}: ${project.title}`);
   const media=document.createElement('span'); media.className='project-media';
   const img=document.createElement('img'); img.src=project.src; img.alt=project.title; img.loading=i<2?'eager':'lazy';
   img.addEventListener('error',()=>{img.style.display='none'; media.style.background=['linear-gradient(135deg,#b7b3a5,#6e6c68)','#5a514a','linear-gradient(120deg,#3d3d3d,#161616)'][i%3];});
   media.appendChild(img);
   const caption=document.createElement('span'); caption.className='project-caption';
   const title=document.createElement('span'); title.textContent=project.title;
   const category=document.createElement('span'); category.textContent=project.category;
   caption.append(title,category); a.append(media,caption); track.appendChild(a); return a;
 });
 function update(instant=false){
   const viewport=track.parentElement;
   const card=cards[active];
   if(instant) track.style.transition='none';
   const x=viewport.clientWidth/2-(card.offsetLeft+card.offsetWidth/2);
   track.style.transform=`translate3d(${x}px,0,0)`;
   cards.forEach((el,i)=>{el.classList.toggle('is-side',i!==active); el.setAttribute('aria-current',i===active?'true':'false');});
   if(instant) requestAnimationFrame(()=>{track.style.transition='';});
 }
 track.addEventListener('click', (e) => {
   const card=e.target.closest('.project-card');
   if (!card) return;
   const index=cards.indexOf(card);
   if (index!==active) { e.preventDefault(); active=index; update(); }
 });
 document.getElementById('projectsPrev').addEventListener('click',()=>{active=(active-1+cards.length)%cards.length;update();});
 document.getElementById('projectsNext').addEventListener('click',()=>{active=(active+1)%cards.length;update();});
 window.addEventListener('resize',()=>update(true));
 update(true);
})();
