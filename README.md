# Shorts

Website statis untuk nonton video pendek. Grid 2 kolom, 20 video per halaman, ada tombol halaman berikutnya.

## Deploy
1. Upload semua file ke repo GitHub.
2. Settings → Pages → branch `main`, folder `/ (root)`.

## Tambah video
Buka `videos.txt` di GitHub, klik ikon pensil, tempel link di **baris paling bawah**, lalu Commit.

```
https://link-langsung.mp4
Judul opsional | https://link-lain.mp4
```

- Satu baris = satu video. Link harus direct link ke file video.
- Video terbaru = baris paling bawah, tampil paling atas di situs.
- Baris kosong dan baris berawalan `#` diabaikan.
- `videos.json` lama masih terbaca sebagai cadangan kalau `videos.txt` tidak ada.

Tes lokal: `python3 -m http.server`, buka `http://localhost:8000`.
