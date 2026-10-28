(() => {
  const config = window.BUNNYVID_CONFIG || {};
  const base = (config.WORKER_URL || "").replace(/\/+$/, "");
  const grid = document.getElementById("videoGrid");
  const status = document.getElementById("status");
  const empty = document.getElementById("emptyState");
  const noResults = document.getElementById("noResults");
  const count = document.getElementById("videoCount");
  const input = document.getElementById("searchInput");
  let videos = [];

  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("refreshBtn").addEventListener("click", loadVideos);
  document.getElementById("searchForm").addEventListener("submit", e => e.preventDefault());
  input.addEventListener("input", render);

  function esc(s="") {
    return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  }
  function videoUrl(v) {
    if (v.url) return v.url;
    if (v.key && base) return `${base}/video/${encodeURIComponent(v.key)}`;
    if (v.id && base) return `${base}/video/${encodeURIComponent(v.id)}`;
    return "";
  }
  function poster(v) {
    const p = v.thumbnail || v.poster || v.cover || "";
    return p ? `<img loading="lazy" src="${esc(p)}" alt="">` : `<div class="poster-fallback">▶</div>`;
  }
  function render() {
    const q = input.value.trim().toLowerCase();
    const filtered = videos.filter(v => [v.title,v.description,v.category].join(" ").toLowerCase().includes(q));
    count.textContent = filtered.length;
    grid.innerHTML = filtered.map((v,i) => {
      const key = v.key || v.id || v.url || "";
      const href = `watch.html?id=${encodeURIComponent(key)}&index=${i}`;
      return `<a class="video-card" href="${href}">
        <div class="poster">${poster(v)}<span class="duration">${esc(v.duration || "VIDEO")}</span><span class="play-chip">▶</span></div>
        <div class="video-info"><h3>${esc(v.title || "Video tanpa judul")}</h3><div class="video-meta"><span class="category-tag">${esc(v.category || "Koleksi")}</span><span>•</span><span>${esc(v.year || "BunnyVid")}</span></div></div>
      </a>`;
    }).join("");
    empty.classList.toggle("hidden", filtered.length !== 0 || videos.length !== 0);
    noResults.classList.toggle("hidden", !q || filtered.length !== 0 || videos.length === 0);
  }
  async function loadVideos() {
    status.classList.remove("hidden");
    grid.innerHTML = "";
    if (!base || base.includes("GANTI-DENGAN")) {
      status.textContent = "Atur URL Worker dulu di file config.js.";
      empty.classList.add("hidden");
      return;
    }
    try {
      const res = await fetch(`${base}/api/videos`, {cache:"no-store"});
      if (!res.ok) throw new Error(`Server membalas ${res.status}`);
      const data = await res.json();
      videos = Array.isArray(data) ? data : (data.videos || data.items || []);
      status.classList.add("hidden");
      render();
    } catch (e) {
      status.textContent = "Katalog belum bisa dimuat. Periksa URL Worker dan endpoint /api/videos.";
      empty.classList.add("hidden");
      console.error(e);
    }
  }
  loadVideos();
})();