(() => {
  const base = ((window.BUNNYVID_CONFIG||{}).WORKER_URL||"").replace(/\/+$/,"");
  const params = new URLSearchParams(location.search);
  const id = params.get("id") || "";
  const status = document.getElementById("watchStatus");
  const content = document.getElementById("watchContent");
  const player = document.getElementById("player");
  const esc = s => String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const urlFor = v => v.url || (v.key && base ? `${base}/video/${encodeURIComponent(v.key)}` : v.id && base ? `${base}/video/${encodeURIComponent(v.id)}` : "");
  async function init(){
    if(!base || base.includes("GANTI-DENGAN")){status.textContent="Atur URL Worker di config.js terlebih dahulu.";return;}
    try{
      const res=await fetch(`${base}/api/videos`,{cache:"no-store"});
      if(!res.ok)throw new Error("Katalog tidak tersedia");
      const data=await res.json(), videos=Array.isArray(data)?data:(data.videos||data.items||[]);
      const video=videos.find(v=>String(v.key||v.id||v.url)===id) || videos[Number(params.get("index"))] || videos[0];
      if(!video)throw new Error("Video tidak ditemukan");
      player.src=urlFor(video);
      document.title=(video.title||"Video")+" — BunnyVid";
      document.getElementById("watchTitle").textContent=video.title||"Video tanpa judul";
      document.getElementById("watchMeta").innerHTML=`<span class="category-tag">${esc(video.category||"Koleksi")}</span><span>•</span><span>${esc(video.year||"BunnyVid")}</span>`;
      document.getElementById("watchDescription").textContent=video.description||"";
      document.getElementById("relatedList").innerHTML=videos.filter(v=>v!==video).slice(0,8).map(v=>`<a class="related-item" href="watch.html?id=${encodeURIComponent(v.key||v.id||v.url||"")}"><img loading="lazy" src="${esc(v.thumbnail||v.poster||"")}" alt=""><span><b>${esc(v.title||"Video tanpa judul")}</b><small>${esc(v.category||"Koleksi")}</small></span></a>`).join("");
      status.classList.add("hidden");content.classList.remove("hidden");
    }catch(e){status.textContent=e.message||"Gagal memuat video.";}
  }
  init();
})();