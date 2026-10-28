# BunnyVid — Ruang Tonton

Website statis mobile-first untuk GitHub Pages dengan katalog yang dibaca dari Cloudflare Worker/R2.

## Isi ZIP
- `index.html` — beranda dan grid video
- `watch.html` — pemutar video dan rekomendasi
- `admin.html` — formulir upload sederhana
- `style.css` — tampilan gelap sinematik dan responsif
- `app.js`, `watch.js`, `admin.js` — fungsi halaman
- `config.js` — URL Worker yang perlu diatur

## Langkah pasang dari HP
1. Ekstrak ZIP.
2. Buka `config.js` dan ganti `https://GANTI-DENGAN-URL-WORKER-ELU` dengan URL Worker yang sudah dideploy, misalnya `https://ruangtonton-api.nama-akun.workers.dev` (gunakan URL asli dari dashboard Cloudflare).
3. Upload semua file ke root repo GitHub `bunnyvid` dengan **Add file → Upload files**, lalu commit ke branch `main`.
4. Di GitHub repo, buka **Settings → Pages**. Pilih **Deploy from a branch**, branch `main`, folder `/(root)`, lalu Save.
5. Buka URL GitHub Pages setelah deployment selesai.

## Catatan penting tentang backend
Website ini mengharapkan:
- `GET /api/videos` mengembalikan array video, atau `{ "videos": [...] }`.
- Pemutaran video tersedia pada `GET /video/<key>` atau setiap item memiliki properti `url`.
- Form admin mencoba `POST /api/upload` dengan `multipart/form-data` dan header `X-Admin-Password`.

Endpoint upload/header harus sama dengan kode Worker yang benar-benar dipasang. Kalau kode Worker elu memakai nama endpoint atau header berbeda, form upload belum akan berhasil sampai disesuaikan.

**Jangan pernah taruh secret `ADMIN_PASSWORD`, R2 access key, atau secret lain di `config.js` atau file frontend.** Password yang dimasukkan lewat form dikirim ke Worker saat request. Gunakan autentikasi server-side yang kuat sebelum mempublikasikan panel admin secara luas.

## Upload video 50–100 MB
Browser mengirim file ke Worker pada versi awal ini. Ukuran yang besar bisa terkena batas request atau timeout tergantung konfigurasi. Untuk penggunaan serius, gunakan pola direct-to-R2 upload melalui URL presigned yang dibuat server-side. Jangan menganggap upload besar berhasil sebelum dites.

## Format katalog yang didukung
Contoh item:
```json
{
  "key": "folder/video.mp4",
  "title": "Judul video",
  "description": "Deskripsi singkat",
  "category": "Dokumenter",
  "year": "2026",
  "thumbnail": "https://alamat-thumbnail.jpg"
}
```
