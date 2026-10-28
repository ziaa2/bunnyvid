(function(){
'use strict';
var PAGE=12,shown=PAGE,vids=[],sel=null,term='',cfg={},site='BunnyVid',adTimer,qT,lastFocus=null;
function $(i){return document.getElementById(i)}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function store(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
function hue(s){var h=0;for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))%360;return h}
function toEmbed(u){u=(u||'').trim();var m;
 if((m=u.match(/^https?:\/\/(?:www\.)?mega\.(?:nz|io)\/(?:embed|file)\/([\w-]+)#([\w-]+)/)))return'https://mega.nz/embed/'+m[1]+'#'+m[2];
 if((m=u.match(/^https?:\/\/(?:www\.)?mega\.(?:nz|io)\/#!([\w-]+)!([\w-]+)/)))return'https://mega.nz/embed#!'+m[1]+'!'+m[2];
 return''}
function isNew(v){return v.date&&(Date.now()-new Date(v.date).getTime())/864e5<=7}
function card(v){
 var img=v.thumb?'<img src="'+esc(v.thumb)+'" alt="" loading="lazy" decoding="async" width="480" height="300">':'';
 return'<button class="card" data-id="'+v.id+'"><div class="th" style="--h:'+v.h+'">'+img+(isNew(v)?'<em>Baru</em>':'')+(v.d?'<b>'+esc(v.d)+'</b>':'')+'</div><h3>'+esc(v.t)+'</h3></button>'}
function related(){var pool=vids.filter(function(v){return v.id!==sel.id});
 var same=pool.filter(function(v){return v.tag&&v.tag===sel.tag});
 return same.concat(pool.filter(function(v){return same.indexOf(v)<0})).slice(0,2)}
function renderGrid(){var q=term.toLowerCase(),l=vids.filter(function(v){return v.t.toLowerCase().indexOf(q)>-1});
 $('gc').textContent=l.length+' video';
 $('grid').innerHTML=l.length?l.slice(0,shown).map(card).join(''):'<div class="empty">Tidak ada video yang cocok. Coba kata kunci lain.</div>';
 $('more').hidden=l.length<=shown}
function openVideo(v){sel=v;var e=toEmbed(v.m);
 $('screen').innerHTML='<span class="wm"></span>'+(e?'<iframe src="'+esc(e)+'" allow="autoplay; fullscreen" allowfullscreen title="'+esc(v.t)+'"></iframe>'
  :'<div><h2>Video contoh</h2><p>Belum ada link Mega. Tempel link di videos.json untuk memutar video asli.</p></div>');
 $('vmT').textContent=v.t;var a=$('vmMega');a.hidden=!e;if(e)a.href=e;
 $('rel').innerHTML=related().map(card).join('');
 $('vm').classList.add('on');$('vm').scrollTop=0;
 document.documentElement.classList.add('lock');document.title=v.t+' – '+site;$('vmClose').focus()}
function closeVideo(){sel=null;$('screen').innerHTML='';$('vm').classList.remove('on');
 document.documentElement.classList.remove('lock');document.title=site;
 if(lastFocus&&document.body.contains(lastFocus))lastFocus.focus()}
function byId(id){return vids.filter(function(v){return v.id===id})[0]}
document.addEventListener('click',function(e){var c=e.target.closest('.card');
 if(c){if(!sel)lastFocus=c;return openVideo(byId(c.dataset.id))}
 if(e.target.id==='vm'||e.target.id==='vmClose')closeVideo();
 if(e.target.id==='more'){shown+=PAGE;renderGrid()}});
document.addEventListener('error',function(e){if(e.target.tagName==='IMG')e.target.remove()},true);
$('q').oninput=function(){var v=this.value;clearTimeout(qT);qT=setTimeout(function(){term=v;shown=PAGE;renderGrid()},150)};
function setTheme(t){document.documentElement.setAttribute('data-theme',t);store('bv-theme',t)}
$('theme').onclick=function(){setTheme(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark')};
setTheme(store('bv-theme')==='light'?'light':'dark');
function showAd(){var p=cfg.ads&&cfg.ads.popup;if(!p)return;
 $('adT').textContent=p.title;$('adP').textContent=p.text;var a=$('adA');a.textContent=p.button;a.href=p.link;
 clearInterval(adTimer);var b=$('adClose'),n=5;b.disabled=true;b.textContent='Tutup dalam 5';$('adv').classList.add('on');
 adTimer=setInterval(function(){n--;if(n<=0){clearInterval(adTimer);b.disabled=false;b.textContent='Tutup'}else b.textContent='Tutup dalam '+n},1000)}
function hideAd(){$('adv').classList.remove('on');try{sessionStorage.setItem('bv-ad','1')}catch(e){}}
$('adClose').onclick=hideAd;
document.addEventListener('keydown',function(e){if(e.key!=='Escape')return;
 if($('adv').classList.contains('on')){if(!$('adClose').disabled)hideAd()}else if(sel)closeVideo()});
function maybeAd(){var seen=null;try{seen=sessionStorage.getItem('bv-ad')}catch(e){}
 if(seen)return;if(sel)return setTimeout(maybeAd,5000);showAd()}
function init(c){cfg=c;site=(c.site&&c.site.name)||'BunnyVid';
 $('brandName').textContent=site;document.title=site;document.documentElement.style.setProperty('--wm',JSON.stringify(site));
 vids=(c.videos||[]).map(function(v,i){return{id:'v'+i,i:i,t:v.title||'Tanpa judul',m:v.mega||'',tag:v.tag||'',d:v.duration||'',date:v.date||'',thumb:v.thumb||'',h:hue(v.title||'')}})
  .sort(function(a,b){return b.date.localeCompare(a.date)||a.i-b.i});
 var bn=c.ads&&c.ads.banner,sl=$('slot');
 if(bn){sl.hidden=false;sl.innerHTML='<span>'+esc(bn.text)+'</span><a href="'+esc(bn.link)+'" target="_blank" rel="noopener">'+esc(bn.button)+'</a>'}
 renderGrid();
 var p=c.ads&&c.ads.popup;
 if(p&&p.enabled)setTimeout(maybeAd,(p.delaySeconds||12)*1000)}
fetch('videos.json').then(function(r){if(!r.ok)throw 0;return r.json()}).then(init).catch(function(){
 $('grid').innerHTML='<div class="empty">videos.json tidak terbaca. Jalankan lewat server (GitHub Pages atau Live Server), jangan buka file langsung.</div>'});
})();
