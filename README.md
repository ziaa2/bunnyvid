# BunnyVid

Dashboard streaming video statis. Video diputar dari Mega lewat embed, tanpa server.

## Struktur
- `index.html`, `css/style.css`, `js/app.js` – halaman
- `videos.json` – daftar video, banner, dan pop up iklan (satu-satunya file yang rutin diedit)
- `thumbs/` – thumbnail kecil (webp)
- `tools/buat-thumb.sh` – bikin thumbnail dari video dengan ffmpeg

## Jalankan
Buka lewat server, bukan klik dua kali: `python3 -m http.server` lalu buka `localhost:8000`.

## Deploy (repo privat + Cloudflare Pages)
1. Buat repo GitHub dengan visibility **Private**, unggah isi folder ini.
2. Cloudflare Dashboard > Workers & Pages > Create > Pages > Connect to Git, pilih repo.
3. Framework preset: None. Build command: kosongkan. Output directory: `/`.
4. Deploy. Setiap kali `videos.json` di-commit, web otomatis ter-update (sekitar 1 menit).
5. Domain sendiri: tab Custom domains di project Pages.

Netlify dan Vercel juga bisa dengan langkah serupa. GitHub Pages untuk repo privat butuh akun berbayar.

Catatan: repo privat menyembunyikan `videos.json` dan riwayat commit dari publik, tapi penonton tetap bisa melihat link Mega lewat Inspect di browser. Pakai watermark pada file video (lihat di bawah) dan ganti link bagikan di Mega kalau ada yang bocor.

## Tambah video
Tambah satu entri di `videos.json`, simpan, commit. Yang terbaru otomatis di paling atas (urut `date`).
```json
{ "title": "Judul", "mega": "https://mega.nz/file/ID#KEY", "tag": "otomotif", "date": "2026-10-27", "duration": "12:40", "thumb": "thumbs/judul.webp" }
```
`tag` dipakai untuk memilih 2 video terkait. `thumb` boleh dikosongkan.

## Iklan
Atur di bagian `ads` pada `videos.json`: teks banner, pop up, jeda muncul, dan `"enabled": false` untuk mematikan pop up.

## Nama web di tiap video
Nama dari `site.name` tampil sebagai watermark di pemutar dan thumbnail, serta di judul tab. Itu lapisan tampilan saja. Supaya nama menempel di file video, tanam dulu sebelum upload ke Mega:
```
ffmpeg -i asli.mp4 -vf "drawtext=text='BunnyVid':x=20:y=20:fontsize=28:fontcolor=white@0.6" -c:a copy hasil.mp4
```

## Thumbnail ringan
Tanpa thumb, kartu pakai warna polos (nol unduhan). Dengan thumb: webp 480x300 (sekitar 15-30 KB), dimuat lazy, hanya 12 kartu pertama dirender, sisanya lewat tombol "Tampilkan lebih banyak".
