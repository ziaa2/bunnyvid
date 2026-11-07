# BunnyVid

Website statis untuk nonton video pendek. Grid 2 kolom, 10 video per halaman, ada tombol halaman berikutnya.

## Fitur
- Header BunnyVid dengan jumlah video, klik logo untuk kembali ke halaman 1.
- 10 video per halaman, nomor halaman, tombol Sebelumnya/Berikutnya, dan panah kiri/kanan di keyboard.
- Tombol suara dan layar penuh muncul saat video diputar, plus garis progres di bawah video.
- Video otomatis berhenti saat keluar layar atau pindah tab.
- Video dimuat hanya saat mendekati layar (hemat kuota).
- Link ganda di `videos.txt` otomatis dibuang.
- Link yang mati menampilkan pesan, bukan kotak kosong.
- Mengikuti mode terang/gelap perangkat.

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
- Mau ubah jumlah per halaman: ganti `PER_PAGE` di bagian atas script `index.html`.
- `videos.json` lama masih terbaca sebagai cadangan kalau `videos.txt` tidak ada.

Tes lokal: `python3 -m http.server`, buka `http://localhost:8000`.
