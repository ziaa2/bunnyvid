(() => {
  const base=((window.BUNNYVID_CONFIG||{}).WORKER_URL||"").replace(/\/+$/,"");
  const $=id=>document.getElementById(id);
  let password="";
  const esc=s=>String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const notice=(el,msg,type="")=>{el.textContent=msg;el.className="notice"+(type?" "+type:"");el.classList.remove("hidden");};
  const hide=el=>el.classList.add("hidden");
  async function api(path,options={}){
    const headers=new Headers(options.headers||{});
    headers.set("X-Admin-Password",password);
    return fetch(base+path,{...options,headers});
  }
  $("loginBtn").addEventListener("click",async()=>{
    password=$("password").value;
    if(!base||base.includes("GANTI-DENGAN"))return notice($("loginNotice"),"Atur URL Worker di config.js terlebih dahulu.","error");
    if(!password)return notice($("loginNotice"),"Masukkan password admin.","error");
    try{
      const r=await fetch(base+"/api/videos",{cache:"no-store"});
      if(!r.ok)throw new Error("Worker belum bisa dihubungi.");
      $("loginPanel").classList.add("hidden");$("adminArea").classList.remove("hidden");
      await loadCatalog();
    }catch(e){notice($("loginNotice"),e.message||"Gagal menghubungi Worker.","error");}
  });
  $("reloadBtn").addEventListener("click",loadCatalog);
  $("uploadForm").addEventListener("submit",async e=>{
    e.preventDefault();
    const file=$("videoFile").files[0]; if(!file)return;
    const btn=$("uploadBtn");btn.disabled=true;
    notice($("uploadProgress"),`Menyiapkan upload: ${file.name} (${(file.size/1024/1024).toFixed(1)} MB)...`);
    try{
      const form=new FormData();
      form.append("file",file);form.append("title",$("title").value.trim());
      form.append("category",$("category").value.trim());form.append("year",$("year").value.trim());
      form.append("description",$("description").value.trim());form.append("thumbnail",$("thumbnail").value.trim());
      const r=await api("/api/upload",{method:"POST",body:form});
      const body=await r.json().catch(()=>({}));
      if(!r.ok)throw new Error(body.error||body.message||`Upload gagal (${r.status}).`);
      notice($("uploadProgress"),"Upload berhasil. Muat ulang katalog untuk memeriksa video.","success");
      $("uploadForm").reset();await loadCatalog();
    }catch(err){notice($("uploadProgress"),`${err.message} Periksa kecocokan endpoint Worker. Upload video besar mungkin memerlukan direct upload R2.`,"error");}
    finally{btn.disabled=false;}
  });
  async function loadCatalog(){
    const list=$("adminList"),n=$("catalogNotice");list.innerHTML="Memuat...";
    try{
      const r=await fetch(base+"/api/videos",{cache:"no-store"});if(!r.ok)throw new Error("Tidak dapat mengambil katalog.");
      const data=await r.json(),items=Array.isArray(data)?data:(data.videos||data.items||[]);
      if(!items.length){list.innerHTML='<div class="notice">Belum ada video di katalog.</div>';return;}
      list.innerHTML=items.map(v=>`<div class="admin-item"><img class="admin-thumb" src="${esc(v.thumbnail||v.poster||"")}" alt=""><div class="admin-item-main"><b>${esc(v.title||"Video tanpa judul")}</b><small>${esc(v.category||"Koleksi")} · ${esc(v.key||v.id||"")}</small></div></div>`).join("");
      hide(n);
    }catch(e){list.innerHTML="";notice(n,e.message||"Gagal memuat katalog.","error");}
  }
})();