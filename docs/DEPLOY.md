# Panduan Deploy QurbanHub

## A. Menyiapkan Google Spreadsheet

1. Buat Google Spreadsheet baru.
2. Salin ID spreadsheet dari URL.

Contoh URL:

```text
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
```

Bagian `SPREADSHEET_ID` adalah ID yang harus dimasukkan ke `gas/Code.gs`.

## B. Menyiapkan Apps Script

1. Di Google Spreadsheet, buka **Extensions > Apps Script**.
2. Hapus kode bawaan.
3. Salin seluruh isi file `gas/Code.gs`.
4. Ganti bagian berikut:

```javascript
const SPREADSHEET_ID = 'PASTE_SPREADSHEET_ID_HERE';
```

menjadi:

```javascript
const SPREADSHEET_ID = 'ID_SPREADSHEET_ANDA';
```

5. Simpan.
6. Pilih fungsi `setupSheet`.
7. Klik **Run**.
8. Berikan otorisasi.
9. Pastikan sheet berikut otomatis terbentuk:
   - Settings
   - Paket
   - Pekurban
   - Hewan
   - Distribusi
   - Log

## C. Deploy Apps Script sebagai Web App

1. Klik **Deploy > New deployment**.
2. Pilih type **Web app**.
3. Isi:
   - Description: `QurbanHub API`
   - Execute as: `Me`
   - Who has access: `Anyone`
4. Klik **Deploy**.
5. Salin URL Web App yang berakhiran `/exec`.

## D. Menghubungkan Frontend ke GAS

Buka `config.js`, lalu isi:

```javascript
GAS_URL: 'https://script.google.com/macros/s/AKfycbxxxx/exec'
```

## E. Deploy ke GitHub Pages

1. Buat repository GitHub bernama `qurbanhub`.
2. Upload seluruh file.
3. Buka **Settings > Pages**.
4. Pilih:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Klik **Save**.

## F. Struktur Sheet

### Settings

| key | value |
|---|---|
| program_name | QurbanHub Baghasasi |
| tahun_hijriah | 1447 H |
| tahun_masehi | 2026 M |
| bank | Bank Syariah Indonesia |
| rekening | 8000553558 |
| atas_nama | Baghasasi |
| whatsapp | 81284470433 |

### Paket

| id_paket | nama_paket | jenis_hewan | harga | kuota | terisi | deskripsi | aktif |
|---|---|---|---:|---:|---:|---|---|
| SAPI-1 | Sapi 1 Ekor | Sapi | 21000000 | 3 | 0 | Paket qurban sapi penuh | Ya |
| SAPI-17 | Patungan Sapi 1/7 | Sapi | 3000000 | 21 | 0 | Patungan sapi | Ya |
| KAMBING-1 | Kambing / Domba | Kambing | 2500000 | 15 | 0 | Paket kambing/domba | Ya |
| SEDEKAH | Sedekah Daging | Sedekah | 0 | 999 | 0 | Nominal bebas | Ya |

### Pekurban

| id | timestamp | nama | whatsapp | alamat | id_paket | nama_paket | jumlah_bagian | nama_niat | nominal | status_bayar | status_qurban | catatan | admin_update |
|---|---|---|---|---|---|---|---:|---|---:|---|---|---|---|

## G. Catatan Keamanan

Versi MVP menggunakan password admin statis di `config.js`. Karena file ini terbuka di browser, password tersebut tidak boleh dianggap sebagai pengamanan kuat. Untuk produksi, opsi yang lebih aman:

1. batasi update status hanya melalui Google Sheet;
2. gunakan deployment GAS dengan akses terbatas;
3. tambahkan autentikasi berbasis akun Google;
4. jangan menyimpan data sangat sensitif pada aplikasi publik.
