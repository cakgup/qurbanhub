# User Requirement - QurbanHub Baghasasi

## 1. Tujuan

QurbanHub Baghasasi adalah aplikasi web statis berbasis GitHub Pages dan Google Apps Script untuk membantu Yayasan Baghasasi mengelola pendaftaran, pembayaran, rekapitulasi, dan pemantauan program qurban.

## 2. Target Pengguna

1. Calon pekurban/jamaah.
2. Panitia qurban.
3. Pengurus yayasan.

## 3. Kebutuhan Fungsional MVP

### 3.1 Halaman Informasi Program

Aplikasi menampilkan:

- nama program;
- tahun hijriah/masehi;
- deskripsi program;
- lokasi kegiatan;
- batas pendaftaran;
- kontak WhatsApp panitia;
- rekening pembayaran.

### 3.2 Paket Qurban

Aplikasi menampilkan daftar paket:

- Sapi 1 ekor;
- Patungan sapi 1/7;
- Kambing/domba;
- Sedekah daging.

Setiap paket memiliki data:

- ID paket;
- nama paket;
- jenis hewan;
- harga;
- kuota;
- terisi;
- deskripsi;
- status aktif.

### 3.3 Pendaftaran Pekurban

Field formulir:

- nama lengkap;
- nomor WhatsApp;
- alamat;
- paket qurban;
- jumlah bagian;
- nama yang diniatkan;
- catatan tambahan.

Setelah submit, data masuk ke sheet `Pekurban` dan status awal menjadi:

- `status_bayar`: Belum Bayar;
- `status_qurban`: Pendaftaran Diterima.

### 3.4 Cek Status

Pengguna dapat mengecek status dengan nomor WhatsApp. Sistem hanya menampilkan data ringkas:

- nama;
- paket;
- nominal;
- status pembayaran;
- status proses qurban.

### 3.5 Panel Admin

Admin dapat:

- membuka panel admin menggunakan password statis di `config.js`;
- melihat daftar pendaftar;
- mengubah status pembayaran;
- mengubah status proses qurban.

Status pembayaran:

- Belum Bayar;
- Menunggu Konfirmasi;
- Lunas;
- Dibatalkan.

Status proses qurban:

- Pendaftaran Diterima;
- Hewan Disiapkan;
- Disembelih;
- Distribusi Diproses;
- Selesai.

## 4. Kebutuhan Non-Fungsional

- Mobile-first.
- Cocok untuk ukuran desain 1080 x 1920 px.
- Ringan dan dapat di-host di GitHub Pages.
- Tidak membutuhkan server selain Google Apps Script.
- Data utama tersimpan di Google Spreadsheet.
- Dapat digunakan ulang oleh masjid/yayasan lain dengan mengganti logo dan konfigurasi.

## 5. Acceptance Criteria

Aplikasi dianggap memenuhi MVP apabila:

1. halaman tampil baik di handphone;
2. logo Baghasasi tampil di header;
3. warna utama mengikuti logo Baghasasi;
4. daftar paket tampil dari data demo/GAS;
5. formulir pendaftaran berhasil menyimpan data;
6. data masuk ke Google Spreadsheet ketika GAS aktif;
7. status dapat dicari berdasarkan nomor WhatsApp;
8. admin dapat mengubah status pembayaran dan proses;
9. informasi rekening dan WhatsApp tampil jelas.
