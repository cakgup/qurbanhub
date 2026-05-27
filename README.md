<p align="center">
  <img src="assets/logo-baghasasi.png" alt="QurbanHub Baghasasi" width="120">
</p>

<h1 align="center">QurbanHub Baghasasi</h1>

<p align="center">
  <strong>Aplikasi web ringan untuk membantu panitia qurban mengelola pendaftaran, pembayaran, rekap, dan pemantauan status qurban secara lebih tertib, transparan, dan mudah dibagikan.</strong>
</p>

<p align="center">
  <a href="https://cakgup.github.io/qurbanhub/">Lihat Demo</a>
  ·
  <a href="#-cara-menjalankan">Cara Menjalankan</a>
  ·
  <a href="#-deploy-ke-github-pages">Deploy</a>
  ·
  <a href="#-konfigurasi-google-apps-script">Konfigurasi GAS</a>
</p>

<p align="center">
  <img alt="GitHub Pages" src="https://img.shields.io/badge/GitHub%20Pages-ready-222?style=for-the-badge&logo=github">
  <img alt="Static Web" src="https://img.shields.io/badge/Static%20Web-HTML%20CSS%20JS-orange?style=for-the-badge&logo=javascript">
  <img alt="Google Apps Script" src="https://img.shields.io/badge/Google%20Apps%20Script-backend-34A853?style=for-the-badge&logo=google">
  <img alt="Google Sheets" src="https://img.shields.io/badge/Google%20Sheets-database-0F9D58?style=for-the-badge&logo=googlesheets">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge">
</p>

---

## السلام عليكم ورحمة الله وبركاته

**QurbanHub Baghasasi** adalah prototype aplikasi manajemen qurban berbasis **GitHub Pages**, **Google Apps Script**, dan **Google Spreadsheet**. Aplikasi ini dibuat agar yayasan, masjid, musala, komunitas, atau panitia qurban dapat memiliki sistem pendaftaran qurban yang sederhana, murah, mudah dipasang, dan tetap rapi digunakan dari handphone.

Repository ini menggunakan identitas visual **Yayasan Baghasasi** dengan nuansa warna tosca dan oranye. Walaupun dibuat sebagai prototype, struktur aplikasinya dapat diduplikasi untuk kebutuhan lembaga lain hanya dengan mengganti logo, teks, rekening, kontak WhatsApp, dan konfigurasi Google Apps Script.

> **Didedikasikan untuk ummat.**  
> Semoga aplikasi sederhana ini dapat membantu panitia qurban bekerja lebih tertib, memudahkan calon pekurban, dan mendukung pengelolaan amanah qurban secara lebih transparan.

---

## ✨ Tentang Aplikasi

QurbanHub membantu panitia mengelola alur qurban dari tahap informasi program sampai pemantauan status. Secara umum, aplikasi ini dapat digunakan untuk:

- menampilkan informasi program qurban;
- menampilkan daftar paket qurban;
- menerima pendaftaran pekurban;
- mencatat nama yang diniatkan untuk qurban;
- menghitung nominal berdasarkan paket dan jumlah bagian;
- menampilkan rekening pembayaran;
- mengecek status pendaftaran melalui nomor WhatsApp;
- menampilkan tombol download sertifikat ketika status qurban sudah `Disembelih`;
- melihat rekap jumlah pendaftar, sapi, kambing, dan pembayaran lunas;
- membantu admin memperbarui status pembayaran dan status proses qurban;
- menyimpan data utama di Google Spreadsheet.

Aplikasi ini menggunakan pendekatan **static-first**, sehingga frontend dapat berjalan langsung di GitHub Pages. Backend cukup menggunakan Google Apps Script sebagai API sederhana yang terhubung ke Google Spreadsheet.

---

## 🧭 Alur Singkat

```text
Calon pekurban membuka halaman QurbanHub
        ↓
Melihat informasi program dan paket qurban
        ↓
Mengisi formulir pendaftaran
        ↓
Frontend mengirim data ke Google Apps Script
        ↓
Google Apps Script menyimpan data ke Google Spreadsheet
        ↓
Panitia memantau data dan memperbarui status
        ↓
Pekurban dapat mengecek status melalui nomor WhatsApp
        ↓
Jika status qurban sudah Disembelih, pekurban dapat membuka tombol Download Sertifikat
```

---

## 🚀 Fitur Utama

| Fitur | Keterangan |
|---|---|
| 📱 Mobile-first landing page | Tampilan dirancang nyaman dibuka dari WhatsApp, browser Android, maupun iOS. |
| 🐄 Paket qurban | Mendukung paket sapi 1 ekor, patungan sapi 1/7, kambing/domba, dan sedekah daging. |
| 📝 Form pendaftaran | Pekurban dapat mengisi nama, WhatsApp, alamat, paket, jumlah bagian, nama niat, dan catatan. |
| 💰 Informasi pembayaran | Menampilkan bank, nomor rekening, atas nama, dan tombol salin rekening. |
| 🔎 Cek status | Pekurban dapat mengecek status pendaftaran menggunakan nomor WhatsApp. |
| 📄 Download sertifikat | Tombol `Download Sertifikat` tampil pada hasil cek status ketika status qurban sudah `Disembelih`. |
| 📊 Ringkasan dashboard | Menampilkan total pendaftar, total sapi, total kambing, nominal lunas, dan paket aktif. |
| 🧑‍💼 Panel admin sederhana | Admin dapat melihat daftar pendaftar dan memperbarui status pembayaran/proses qurban. |
| 🧾 Google Sheets database | Data tersimpan dalam sheet `Settings`, `Paket`, `Pekurban`, `Hewan`, `Distribusi`, dan `Log`. |
| ⚙️ Google Apps Script backend | API ringan untuk pendaftaran, status, dashboard, paket, dan update admin. |
| 🌐 GitHub Pages ready | Dapat dipublikasikan tanpa server berbayar. |
| 🎨 Mudah disesuaikan | Logo, warna, rekening, kontak, lokasi, dan paket dapat diganti sesuai lembaga. |

---

## 👥 Cocok Digunakan Untuk

QurbanHub cocok digunakan oleh:

- yayasan sosial;
- masjid dan musala;
- DKM kantor;
- DKM sekolah atau kampus;
- panitia qurban lingkungan;
- komunitas dakwah;
- lembaga pendidikan Islam;
- organisasi sosial yang mengelola program qurban.

---

## 🧱 Teknologi yang Digunakan

| Teknologi | Fungsi |
|---|---|
| **HTML5** | Struktur halaman aplikasi. |
| **CSS3** | Tampilan, layout, warna, kartu, dan responsivitas. |
| **JavaScript Vanilla** | Logika frontend, form, status, dashboard, dan interaksi tombol. |
| **GitHub Pages** | Hosting frontend statis secara gratis. |
| **Google Apps Script** | Backend/API sederhana tanpa server sendiri. |
| **Google Spreadsheet** | Database utama untuk paket, pendaftar, status, distribusi, dan log. |

---

## 📂 Struktur Repository

```text
qurbanhub/
├── assets/
│   └── logo-baghasasi.png
├── docs/
│   ├── DEPLOY.md
│   └── UR.md
├── gas/
│   └── Code.gs
├── .gitignore
├── 404.html
├── LICENSE
├── README.md
├── app.js
├── config.js
├── index.html
└── style.css
```

### Penjelasan Singkat

| File/Folder | Fungsi |
|---|---|
| `index.html` | Halaman utama aplikasi QurbanHub. |
| `style.css` | Pengaturan tampilan, warna, layout, kartu, responsivitas, dan komponen visual. |
| `app.js` | Logika aplikasi: load data, form pendaftaran, cek status, dashboard, dan admin panel. |
| `config.js` | Konfigurasi nama aplikasi, endpoint GAS, kontak, rekening, lokasi, dan informasi default. |
| `404.html` | Halaman fallback untuk GitHub Pages. |
| `assets/` | Folder aset visual seperti logo. |
| `gas/Code.gs` | Backend Google Apps Script untuk API dan koneksi Google Spreadsheet. |
| `docs/DEPLOY.md` | Panduan teknis deploy aplikasi. |
| `docs/UR.md` | Dokumen kebutuhan pengguna dan acceptance criteria MVP. |
| `LICENSE` | Informasi lisensi repository. |

---

## ⚡ Cara Menjalankan

Karena aplikasi ini berbasis web statis, tidak diperlukan instalasi framework, package manager, atau database lokal.

### Opsi 1 — Buka Langsung

Klik dua kali file berikut:

```text
index.html
```

Jika `GAS_URL` pada `config.js` dikosongkan, aplikasi dapat berjalan menggunakan data demo.

### Opsi 2 — Menggunakan Python Local Server

Buka terminal pada folder project, lalu jalankan:

```bash
python -m http.server 8080
```

Kemudian buka browser:

```text
http://localhost:8080
```

### Opsi 3 — Menggunakan VS Code Live Server

1. Buka folder `qurbanhub` di Visual Studio Code.
2. Pasang ekstensi **Live Server**.
3. Klik kanan file `index.html`.
4. Pilih **Open with Live Server**.
5. Aplikasi akan terbuka di browser.

---

## 🌐 Deploy ke GitHub Pages

### 1. Buat Repository

Buat repository baru, misalnya:

```text
qurbanhub
```

Jika username GitHub adalah `username`, maka alamat GitHub Pages nantinya dapat menjadi:

```text
https://username.github.io/qurbanhub/
```

### 2. Upload Source Code

Pastikan file utama berada di root repository:

```text
index.html
style.css
app.js
config.js
404.html
assets/
gas/
docs/
README.md
LICENSE
```

Jangan meletakkan source code di folder ganda seperti:

```text
qurbanhub/qurbanhub/index.html
```

### 3. Aktifkan GitHub Pages

Masuk ke:

```text
Settings → Pages
```

Gunakan pengaturan berikut:

```text
Source : Deploy from a branch
Branch : main
Folder : /root
```

Klik **Save**.

### 4. Akses Aplikasi

Setelah proses publikasi selesai, buka:

```text
https://username.github.io/qurbanhub/
```

Untuk repository ini, demo dapat diakses melalui:

```text
https://cakgup.github.io/qurbanhub/
```

---

## 🔧 Konfigurasi Aplikasi

Edit file:

```text
config.js
```

Contoh konfigurasi aman untuk repository publik:

```javascript
window.QURBANHUB_CONFIG = {
  APP_NAME: 'QurbanHub Baghasasi',
  GAS_URL: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
  ADMIN_PASSWORD: 'CHANGE_ME_ADMIN_PASSWORD',
  DEFAULT_WHATSAPP: '6281234567890',
  DEFAULT_REKENING: '1234567890',
  DEFAULT_BANK: 'BSI',
  DEFAULT_ATAS_NAMA: 'Yayasan Baghasasi',
  DEFAULT_LOCATION: 'Bekasi dan sekitarnya',
  DEFAULT_DEADLINE: 'Menyesuaikan informasi panitia',
  CURRENCY: 'IDR'
};
```

### Konfigurasi yang Perlu Disesuaikan

| Konfigurasi | Keterangan |
|---|---|
| `APP_NAME` | Nama aplikasi yang tampil di halaman. |
| `GAS_URL` | URL Web App Google Apps Script yang berakhiran `/exec`. |
| `ADMIN_PASSWORD` | Password sederhana untuk membuka panel admin. |
| `DEFAULT_WHATSAPP` | Nomor WhatsApp panitia. |
| `DEFAULT_REKENING` | Nomor rekening pembayaran. |
| `DEFAULT_BANK` | Nama bank. |
| `DEFAULT_ATAS_NAMA` | Nama pemilik rekening. |
| `DEFAULT_LOCATION` | Lokasi pelaksanaan program qurban. |
| `DEFAULT_DEADLINE` | Batas pendaftaran atau keterangan waktu. |
| `CURRENCY` | Format mata uang, misalnya `IDR`. |

> **Catatan:** Untuk demo publik, `GAS_URL` dapat dikosongkan agar aplikasi menggunakan data demo. Untuk penggunaan nyata, isi `GAS_URL` dengan endpoint Google Apps Script milik panitia.

---

## 🧩 Konfigurasi Google Apps Script

### 1. Buat Google Spreadsheet

Buat file Google Spreadsheet baru, lalu salin ID spreadsheet dari URL.

Contoh URL:

```text
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
```

Bagian yang dibutuhkan adalah:

```text
SPREADSHEET_ID
```

### 2. Buka Apps Script

Pada Google Spreadsheet, buka:

```text
Extensions → Apps Script
```

Hapus kode bawaan, lalu salin isi file:

```text
gas/Code.gs
```

### 3. Isi Spreadsheet ID

Cari bagian berikut:

```javascript
const SPREADSHEET_ID = 'PASTE_SPREADSHEET_ID_HERE';
```

Ubah menjadi:

```javascript
const SPREADSHEET_ID = 'ID_SPREADSHEET_ANDA';
```

### 4. Jalankan Setup Sheet

Pilih fungsi:

```text
setupSheet
```

Klik **Run**, lalu berikan otorisasi.

Fungsi ini akan membuat sheet berikut:

```text
Settings
Paket
Pekurban
Hewan
Distribusi
Log
```

### 5. Deploy sebagai Web App

Klik:

```text
Deploy → New deployment
```

Pilih:

```text
Type       : Web app
Execute as : Me
Access     : Anyone
```

Klik **Deploy**, lalu salin URL Web App yang berakhiran:

```text
/exec
```

### 6. Hubungkan ke Frontend

Masukkan URL tersebut ke `config.js`:

```javascript
GAS_URL: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'
```

---

## 🗃️ Struktur Sheet

### `Settings`

| Kolom | Keterangan |
|---|---|
| `key` | Nama konfigurasi. |
| `value` | Nilai konfigurasi. |

Contoh:

| key | value |
|---|---|
| `program_name` | QurbanHub Baghasasi |
| `tahun_hijriah` | 1447 H |
| `tahun_masehi` | 2026 M |
| `bank` | BSI |
| `rekening` | 1234567890 |
| `atas_nama` | Yayasan Baghasasi |
| `whatsapp` | 6281234567890 |
| `lokasi` | Bekasi dan sekitarnya |

### `Paket`

| Kolom | Keterangan |
|---|---|
| `id_paket` | ID unik paket qurban. |
| `nama_paket` | Nama paket qurban. |
| `jenis_hewan` | Jenis hewan atau jenis dukungan. |
| `harga` | Harga paket. |
| `kuota` | Kuota paket. |
| `terisi` | Jumlah kuota yang sudah terisi. |
| `deskripsi` | Deskripsi paket. |
| `aktif` | Status paket, misalnya `Ya` atau `Tidak`. |

### `Pekurban`

| Kolom | Keterangan |
|---|---|
| `id` | ID pendaftaran. |
| `timestamp` | Waktu pendaftaran. |
| `nama` | Nama pekurban. |
| `whatsapp` | Nomor WhatsApp pekurban. |
| `alamat` | Alamat pekurban. |
| `id_paket` | ID paket yang dipilih. |
| `nama_paket` | Nama paket yang dipilih. |
| `jumlah_bagian` | Jumlah bagian qurban. |
| `nama_niat` | Nama yang diniatkan untuk qurban. |
| `nominal` | Nominal pembayaran. |
| `status_bayar` | Status pembayaran. |
| `status_qurban` | Status proses qurban. |
| `catatan` | Catatan tambahan. |
| `admin_update` | Waktu update terakhir oleh admin. |

### `Hewan`

Digunakan untuk pencatatan data hewan qurban, seperti jenis, kode hewan, berat, harga, supplier, status, dan catatan.

### `Distribusi`

Digunakan untuk pencatatan wilayah distribusi, jumlah paket, penerima, status, dan catatan.

### `Log`

Digunakan untuk mencatat aktivitas penting seperti pendaftaran, update status, dan perubahan data.

---

## 🔌 Endpoint API

Google Apps Script pada repository ini mendukung beberapa aksi dasar.

### GET

| Action | Fungsi |
|---|---|
| `ping` | Mengecek apakah API aktif. |
| `getSettings` | Mengambil konfigurasi program. |
| `getPackages` | Mengambil daftar paket qurban. |
| `getDashboard` | Mengambil ringkasan dashboard. |
| `getParticipants` | Mengambil daftar pendaftar. |
| `getStatus` | Mengecek status pendaftaran berdasarkan WhatsApp. |

Contoh:

```text
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=ping
```

```text
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=getPackages
```

```text
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=getStatus&whatsapp=6281234567890
```

### POST

| Action | Fungsi |
|---|---|
| `registerQurban` | Menyimpan pendaftaran qurban. |
| `updateParticipantStatus` | Mengubah status pembayaran dan proses qurban. |
| `updatePayment` | Mengubah status pembayaran. |
| `updateDistribution` | Mengubah status distribusi. |

Contoh payload pendaftaran:

```json
{
  "action": "registerQurban",
  "nama": "Ahmad Abdullah",
  "whatsapp": "081234567890",
  "alamat": "Bekasi",
  "id_paket": "SAPI-17",
  "jumlah_bagian": 1,
  "nama_niat": "Ahmad Abdullah",
  "catatan": "Mohon konfirmasi via WhatsApp"
}
```

---

## 🧑‍💼 Panel Admin

Panel admin pada MVP ini dapat digunakan untuk:

- melihat daftar pendaftar;
- memantau status pembayaran;
- mengubah status pembayaran;
- mengubah status proses qurban;
- membantu panitia melakukan rekap cepat.

Status pembayaran yang umum digunakan:

```text
Belum Bayar
Menunggu Konfirmasi
Lunas
Dibatalkan
```

Status proses qurban yang umum digunakan:

```text
Pendaftaran Diterima
Hewan Disiapkan
Disembelih
Distribusi Diproses
Selesai
```

> **Catatan penting:** Panel admin pada versi MVP masih menggunakan password statis di sisi frontend. Mekanisme ini cocok untuk demo atau penggunaan internal terbatas, tetapi belum cukup kuat untuk melindungi data sensitif.

---

## 🎨 Cara Menyesuaikan Tampilan

### Mengubah Logo

Ganti file:

```text
assets/logo-baghasasi.png
```

dengan logo lembaga Anda. Jika nama file berbeda, sesuaikan path logo pada `index.html`.

### Mengubah Warna

Buka file:

```text
style.css
```

Cari bagian variabel warna atau aturan CSS utama, lalu sesuaikan warna sesuai identitas lembaga.

Contoh palet yang dapat digunakan:

```css
:root {
  --primary: #0f766e;
  --accent: #f97316;
  --soft-bg: #f8fafc;
}
```

### Mengubah Teks Program

Teks program dapat berasal dari:

1. `config.js` untuk nilai default;
2. sheet `Settings` jika aplikasi sudah terhubung ke Google Apps Script.

Untuk penggunaan produksi, disarankan mengelola informasi dinamis melalui Google Spreadsheet agar panitia tidak perlu mengubah source code.

---

## 🔐 Catatan Keamanan

QurbanHub adalah aplikasi MVP/prototype. Beberapa hal yang wajib diperhatikan sebelum digunakan untuk data nyata:

1. Jangan menyimpan password penting, token rahasia, atau data sensitif di repository publik.
2. Jangan menganggap password statis di frontend sebagai autentikasi kuat.
3. Jangan menaruh data identitas berlebihan di Google Spreadsheet.
4. Gunakan akun Google khusus panitia untuk mengelola Apps Script dan Spreadsheet.
5. Batasi akses edit Google Spreadsheet hanya untuk panitia yang berwenang.
6. Jika aplikasi digunakan secara luas, pertimbangkan autentikasi berbasis akun Google atau dashboard admin terpisah.
7. Ganti nilai berikut sebelum repository dibuka untuk umum:

```text
YOUR_SCRIPT_ID
CHANGE_ME_ADMIN_PASSWORD
ID_SPREADSHEET_ANDA
Nomor rekening asli
Nomor WhatsApp panitia
```

8. Jika pernah terlanjur commit kredensial asli, segera ganti password/token/deployment URL dan buat ulang konfigurasi yang lebih aman.

---

## 🧪 Testing Sederhana

Sebelum digunakan oleh panitia, lakukan uji berikut:

| Pengujian | Hasil yang Diharapkan |
|---|---|
| Buka halaman utama | Aplikasi tampil baik di handphone dan desktop. |
| Load paket | Daftar paket tampil dari data demo atau Google Sheet. |
| Submit pendaftaran | Data berhasil masuk ke sheet `Pekurban`. |
| Cek status | Data dapat dicari menggunakan nomor WhatsApp. |
| Download sertifikat | Tombol sertifikat tampil saat `status_qurban` bernilai `Disembelih`. |
| Update admin | Status pembayaran/proses berhasil berubah. |
| Salin rekening | Nomor rekening berhasil disalin. |
| WhatsApp panitia | Tombol/kontak mengarah ke nomor yang benar. |
| Refresh halaman | Data tetap terbaca dengan baik. |

---

## 🛠️ Troubleshooting

### 1. Paket Tidak Muncul

Cek beberapa hal berikut:

- `GAS_URL` di `config.js` sudah benar.
- URL Apps Script berakhiran `/exec`.
- Apps Script sudah di-deploy sebagai Web App.
- Akses Web App diset ke `Anyone`.
- Sheet `Paket` sudah dibuat oleh fungsi `setupSheet`.
- Browser tidak menggunakan cache lama.

### 2. Pendaftaran Tidak Masuk ke Spreadsheet

Periksa:

- `SPREADSHEET_ID` pada `gas/Code.gs` sudah benar.
- Apps Script sudah diberi izin akses.
- Fungsi `setupSheet()` sudah dijalankan.
- Kolom pada sheet tidak diubah sembarangan.
- Console browser tidak menampilkan error CORS atau error jaringan.

### 3. Cek Status Tidak Menemukan Data

Pastikan:

- Nomor WhatsApp yang diinput sama dengan nomor saat pendaftaran.
- Format nomor masih dapat dinormalisasi, misalnya `0812...` menjadi `62812...`.
- Data benar-benar sudah tersimpan di sheet `Pekurban`.

### 4. Perubahan Tidak Muncul Setelah Update File

Lakukan hard refresh:

```text
Ctrl + F5
```

Atau buka dengan query cache buster:

```text
https://username.github.io/qurbanhub/?v=2
```

### 5. Apps Script Sudah Diubah tetapi Hasil Masih Lama

Setelah mengubah kode Apps Script, lakukan deploy ulang:

```text
Deploy → Manage deployments → Edit → New version → Deploy
```

---

## 🗺️ Rekomendasi Pengembangan Lanjutan

Beberapa pengembangan yang dapat dilakukan pada versi berikutnya:

- autentikasi admin berbasis akun Google;
- validasi pembayaran berbasis upload bukti transfer;
- export laporan ke PDF atau Excel;
- integrasi file sertifikat qurban dinamis per pekurban;
- halaman rekap khusus panitia;
- fitur kuota otomatis yang menutup paket jika sudah penuh;
- nomor invoice/pendaftaran yang lebih rapi;
- notifikasi WhatsApp otomatis;
- QR code pembayaran;
- dashboard distribusi daging qurban;
- mode multi-masjid atau multi-yayasan;
- audit log admin yang lebih rinci;
- tampilan Open Graph agar link menarik saat dibagikan di WhatsApp.

---

## 🤝 Kontribusi

Kontribusi, masukan, dan pengembangan ulang sangat terbuka.

Alur kontribusi yang disarankan:

```bash
git checkout -b feature/nama-fitur
git add .
git commit -m "Menambahkan fitur nama-fitur"
git push origin feature/nama-fitur
```

Kemudian ajukan pull request melalui GitHub.

---

## 📄 Lisensi

Repository ini menggunakan lisensi:

```text
MIT License
```

Silakan gunakan, pelajari, modifikasi, dan kembangkan ulang sesuai kebutuhan sosial, dakwah, pendidikan, komunitas, maupun pengelolaan qurban.

Gunakan dengan bijak. Jangan gunakan aplikasi ini untuk penipuan, pengumpulan dana ilegal, manipulasi data, phishing, atau aktivitas yang melanggar hukum.

---

## 🌱 Dedikasi

Aplikasi ini dibuat sederhana agar mudah dipelajari, digunakan, dan dikembangkan kembali oleh siapa pun yang ingin menghadirkan layanan digital yang bermanfaat.

> Teknologi terbaik bukan selalu yang paling rumit, tetapi yang paling mudah digunakan untuk membantu kebaikan.

<p align="center">
  <strong>Made with ❤️ by CakGup</strong><br>
  <em>Didedikasikan untuk ummat.</em>
</p>
