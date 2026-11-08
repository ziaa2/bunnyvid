# BunnyVid

Website statis untuk nonton video pendek. Grid 2 kolom, 10 video per halaman, ada tombol halaman berikutnya.

## Fitur
- Dua tab: **Video** dan **Foto** (galeri khusus foto anime, 12 foto per halaman).
- Klik foto untuk buka viewer layar penuh: geser kiri/kanan atau panah keyboard untuk ganti foto, tombol "Buka asli" untuk gambar ukuran penuh, Esc untuk tutup.
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

## Tambah foto
Sama seperti video: buka `photos.txt`, tempel link foto di **baris paling bawah**, lalu Commit.

```
https://link-langsung.jpg
Judul opsional | https://link-lain.png
foto/nama-file.jpg
```

- Format yang didukung: jpg, png, gif, webp, avif.
- Foto bisa juga diupload ke repo (misal folder `foto/`), lalu tulis path-nya, contoh `foto/nama-file.jpg`.
- Foto terbaru = baris paling bawah, tampil paling atas.
- Ubah jumlah per halaman: `PER` di bagian atas script `index.html`.
- Kalau `photos.txt` belum ada, tab Foto tampil kosong dengan petunjuk.

## Tambah video
Buka `videos.txt` di GitHub, klik ikon pensil, tempel link di **baris paling bawah**, lalu Commit.

```
https://link-langsung.mp4
Judul opsional | https://link-lain.mp4
```

- Satu baris = satu video. Link harus direct link ke file video.
- Video terbaru = baris paling bawah, tampil paling atas di situs.
- Baris kosong dan baris berawalan `#` diabaikan.
- Mau ubah jumlah per halaman: ganti `PER` di bagian atas script `index.html`.
- `videos.json` lama masih terbaca sebagai cadangan kalau `videos.txt` tidak ada.

Tes lokal: `python3 -m http.server`, buka `http://localhost:8000`.
