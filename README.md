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

## Pasang iklan
Di `index.html` ada tiga tempat yang sengaja dikosongkan, kelihatan dari komentar `IKLAN ...`:
- **IKLAN ATAS**: `<div class="ad" id="ad-top">`, di bawah tab, di atas grid.
- **IKLAN BAWAH**: `<div class="ad" id="ad-bottom">`, di bawah tombol halaman.
- **SCRIPT IKLAN GLOBAL**: untuk kode jenis Social Bar, Popunder, atau auto ads.

Tempel kode dari ad network **di antara tag `<div ...></div>`** (untuk banner) atau di komentar global. Slot yang kosong tidak tampil sama sekali. Kalau jaringan iklan meminta `ads.txt`, buat file bernama `ads.txt` di root repo dan isi sesuai petunjuk mereka.

Jangan klik iklan sendiri, itu bisa bikin akun iklan dibanned.

## Panel Videox (video panjang)
Tab **Videox** untuk video yang durasinya panjang (2 menit atau lebih), supaya terpisah dari tab Video. Daftarnya ada di `videox.txt`, formatnya sama seperti `videos.txt` (satu baris satu link `.mp4`, boleh `Judul | link`, tambah di baris paling bawah).

- Kartu menampilkan cuplikan frame awal dan durasi. Saat dipencet, video diputar di **pop-up** dengan kontrol bawaan browser.
- Tutup dengan tombol X, tombol Esc, atau ketuk area gelap. Tombol Sebelumnya/Berikutnya pindah antar video.
- 10 video per halaman. Hanya link `.mp4` langsung yang didukung di tab ini.

## Video embed Streamable
Selain link `.mp4` langsung, `videos.txt` juga menerima video Streamable. Tempel salah satu di **satu baris**:

```
https://streamable.com/e/nahv7n
https://streamable.com/nahv7n
Judul opsional | https://streamable.com/e/nahv7n
<div ...><iframe ... src="https://streamable.com/e/nahv7n?" ...></iframe></div>
```

- Kode embed iframe lengkap juga boleh ditempel, yang dibaca hanya link Streamable di dalamnya.
- Kartu tampil gelap dengan tombol putar. Player Streamable baru dimuat saat kartu dipencet, dan tombol X menutupnya.
- Kontrol suara, layar penuh, dan progres memakai milik Streamable, bukan milik BunnyVid.
- Boleh dicampur dengan video `.mp4` di file yang sama. Hanya Streamable yang didukung, dan hanya di tab Video.

## Label Baru dan tulisan iklan
- 5 konten teratas (paling bawah di `videos.txt` / `photos.txt`) otomatis diberi label **Baru**. Ubah jumlahnya lewat `NEW_COUNT` di script.
- Tulisan "Mau pasang iklan di sini?" di paling bawah mengarah ke `https://t.me/rendy098`. Ubah username di `index.html` (cari `rendy098`).

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
