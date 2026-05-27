# QurbanHub Baghasasi

**QurbanHub** adalah aplikasi web statis untuk manajemen program qurban yayasan/masjid/komunitas. Prototype ini menggunakan identitas visual **Yayasan Baghasasi** dan dapat di-hosting gratis melalui **GitHub Pages** dengan backend **Google Apps Script (GAS)** dan database **Google Spreadsheet**.

## Fitur MVP

- Landing page mobile-first untuk program qurban.
- Logo dan tema warna Baghasasi: tosca dan oranye.
- Kartu ringkasan: total pendaftar, sapi, kambing, dan dana lunas.
- Daftar paket qurban dari Google Spreadsheet.
- Form pendaftaran pekurban.
- Cek status pendaftaran berdasarkan nomor WhatsApp.
- Informasi rekening dan tombol salin rekening.
- Panel admin sederhana dengan password statis untuk update status pembayaran dan proses qurban.
- Backend Google Apps Script siap deploy.

> Catatan: password admin di frontend hanya untuk kebutuhan MVP/demo. Jangan gunakan untuk data sensitif. Untuk produksi yang lebih kuat, gunakan akses terbatas langsung di Google Sheet atau tambahkan autentikasi yang lebih aman.

## Struktur Folder

```text
qurbanhub/
├── index.html
├── style.css
├── app.js
├── config.js
├── assets/
│   └── logo-baghasasi.png
├── gas/
│   └── Code.gs
├── docs/
│   ├── DEPLOY.md
│   └── UR.md
└── README.md
```

## Cara Menjalankan Lokal

Cukup buka `index.html` di browser. Jika `GAS_URL` di `config.js` masih kosong, aplikasi berjalan menggunakan data demo.

Untuk menjalankan dengan server lokal:

```bash
python -m http.server 8080
```

Lalu buka:

```text
http://localhost:8080
```

## Cara Deploy ke GitHub Pages

1. Buat repo baru dengan nama `qurbanhub`.
2. Upload seluruh file dalam folder ini ke repo tersebut.
3. Buka **Settings > Pages**.
4. Pada bagian **Build and deployment**, pilih:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Simpan.
6. Buka URL GitHub Pages yang diberikan.

## Konfigurasi GAS

1. Buat Google Spreadsheet baru.
2. Salin ID spreadsheet dari URL.
3. Buka **Extensions > Apps Script**.
4. Salin isi `gas/Code.gs` ke Apps Script.
5. Isi nilai berikut:

```javascript
const SPREADSHEET_ID = 'PASTE_SPREADSHEET_ID_HERE';
```

6. Jalankan fungsi `setupSheet()` sekali.
7. Deploy sebagai Web App:
   - Execute as: `Me`
   - Who has access: `Anyone`
8. Salin URL `/exec` ke `config.js`:

```javascript
GAS_URL: 'https://script.google.com/macros/s/xxxx/exec'
```

## Konfigurasi Aplikasi

Edit `config.js`:

```javascript
window.QURBANHUB_CONFIG = {
  APP_NAME: 'QurbanHub Baghasasi',
  GAS_URL: '',
  ADMIN_PASSWORD: 'baghasasi1447',
  DEFAULT_WHATSAPP: '6281234567890',
  DEFAULT_REKENING: '1234567890',
  DEFAULT_BANK: 'BSI',
  DEFAULT_ATAS_NAMA: 'Yayasan Baghasasi',
  DEFAULT_LOCATION: 'Bekasi dan sekitarnya',
  DEFAULT_DEADLINE: 'Menyesuaikan informasi panitia',
  CURRENCY: 'IDR'
};
```

## Sheet yang Digunakan

- `Settings`
- `Paket`
- `Pekurban`
- `Hewan`
- `Distribusi`
- `Log`

Detail struktur sheet tersedia pada `docs/DEPLOY.md`.

## Desain

Tampilan utama dirancang untuk handphone dengan rasio rujukan **1080 x 1920 px**. Implementasi menggunakan CSS responsif dengan lebar maksimum 520px agar nyaman dibuka dari WhatsApp, browser Android, maupun iOS.

## Lisensi

Silakan gunakan, modifikasi, dan sebarluaskan untuk kebutuhan dakwah, sosial, dan pengelolaan qurban. Sesuaikan lisensi final dengan kebijakan repo CakGup.
