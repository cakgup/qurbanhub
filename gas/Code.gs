/**
 * QurbanHub - Google Apps Script Backend
 * Deploy as Web App:
 * - Execute as: Me
 * - Who has access: Anyone
 * Then paste the /exec URL into config.js -> GAS_URL.
 */

const SPREADSHEET_ID = 'PASTE_SPREADSHEET_ID_HERE';

const SHEETS = {
  SETTINGS: 'Settings',
  PAKET: 'Paket',
  PEKURBAN: 'Pekurban',
  HEWAN: 'Hewan',
  DISTRIBUSI: 'Distribusi',
  LOG: 'Log'
};

const HEADERS = {
  Settings: ['key', 'value'],
  Paket: ['id_paket', 'nama_paket', 'jenis_hewan', 'harga', 'kuota', 'terisi', 'deskripsi', 'aktif'],
  Pekurban: ['id', 'timestamp', 'nama', 'whatsapp', 'alamat', 'id_paket', 'nama_paket', 'jumlah_bagian', 'nama_niat', 'nominal', 'status_bayar', 'status_qurban', 'catatan', 'admin_update'],
  Hewan: ['id_hewan', 'jenis', 'kode_hewan', 'berat', 'harga', 'supplier', 'status', 'catatan'],
  Distribusi: ['id_distribusi', 'wilayah', 'jumlah_paket', 'penerima', 'status', 'catatan'],
  Log: ['timestamp', 'action', 'detail', 'actor']
};

function doGet(e) {
  try {
    const action = String(e.parameter.action || 'ping');
    if (action === 'ping') return jsonResponse({ ok: true, message: 'QurbanHub GAS ready.' });
    if (action === 'getSettings') return jsonResponse({ ok: true, data: getSettings() });
    if (action === 'getPackages') return jsonResponse({ ok: true, data: getPackages() });
    if (action === 'getDashboard') return jsonResponse({ ok: true, data: getDashboard() });
    if (action === 'getParticipants') return jsonResponse({ ok: true, data: getParticipants() });
    if (action === 'getStatus') return jsonResponse({ ok: true, data: getStatus(e.parameter.whatsapp) });
    return jsonResponse({ ok: false, message: 'Action tidak dikenal: ' + action });
  } catch (error) {
    return jsonResponse({ ok: false, message: error.message });
  }
}

function doPost(e) {
  try {
    const payload = parsePayload(e);
    const action = String(payload.action || '');
    if (action === 'registerQurban') return jsonResponse(registerQurban(payload));
    if (action === 'updateParticipantStatus') return jsonResponse(updateParticipantStatus(payload));
    if (action === 'updatePayment') return jsonResponse(updatePayment(payload));
    if (action === 'updateDistribution') return jsonResponse(updateDistribution(payload));
    return jsonResponse({ ok: false, message: 'Action tidak dikenal: ' + action });
  } catch (error) {
    return jsonResponse({ ok: false, message: error.message });
  }
}

function parsePayload(e) {
  if (!e || !e.postData || !e.postData.contents) return {};
  try {
    return JSON.parse(e.postData.contents);
  } catch (error) {
    return e.parameter || {};
  }
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSpreadsheet() {
  if (!SPREADSHEET_ID || SPREADSHEET_ID === 'PASTE_SPREADSHEET_ID_HERE') {
    throw new Error('SPREADSHEET_ID belum diisi pada file gas/Code.gs.');
  }
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function getSheet(name) {
  const ss = getSpreadsheet();
  const sheet = ss.getSheetByName(name);
  if (!sheet) throw new Error('Sheet tidak ditemukan: ' + name + '. Jalankan setupSheet() terlebih dahulu.');
  return sheet;
}

function readObjects(sheetName) {
  const sheet = getSheet(sheetName);
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];
  const headers = values[0].map(String);
  return values.slice(1).filter(row => row.some(cell => cell !== '')).map(row => {
    const object = {};
    headers.forEach((header, index) => object[header] = row[index]);
    return object;
  });
}

function appendObject(sheetName, object) {
  const sheet = getSheet(sheetName);
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(String);
  sheet.appendRow(headers.map(header => object[header] ?? ''));
}

function updateObjectById(sheetName, idColumn, idValue, updates) {
  const sheet = getSheet(sheetName);
  const values = sheet.getDataRange().getValues();
  const headers = values[0].map(String);
  const idIndex = headers.indexOf(idColumn);
  if (idIndex < 0) throw new Error('Kolom ID tidak ditemukan: ' + idColumn);

  for (let row = 1; row < values.length; row++) {
    if (String(values[row][idIndex]) === String(idValue)) {
      Object.keys(updates).forEach(key => {
        const col = headers.indexOf(key);
        if (col >= 0) sheet.getRange(row + 1, col + 1).setValue(updates[key]);
      });
      return true;
    }
  }
  return false;
}

function getSettings() {
  const rows = readObjects(SHEETS.SETTINGS);
  const result = {};
  rows.forEach(row => result[row.key] = row.value);
  return result;
}

function getPackages() {
  return readObjects(SHEETS.PAKET).map(item => ({
    ...item,
    harga: Number(item.harga || 0),
    kuota: Number(item.kuota || 0),
    terisi: Number(item.terisi || 0)
  }));
}

function getParticipants() {
  return readObjects(SHEETS.PEKURBAN).reverse();
}

function getStatus(whatsapp) {
  const normalized = normalizeWhatsapp(whatsapp);
  return readObjects(SHEETS.PEKURBAN)
    .filter(item => normalizeWhatsapp(item.whatsapp) === normalized)
    .map(item => ({
      id: item.id,
      nama: item.nama,
      whatsapp: item.whatsapp,
      id_paket: item.id_paket,
      nama_paket: item.nama_paket,
      nominal: item.nominal,
      status_bayar: item.status_bayar,
      status_qurban: item.status_qurban
    }))
    .reverse();
}

function getDashboard() {
  const participants = readObjects(SHEETS.PEKURBAN);
  const packages = getPackages();
  const totalPendaftar = participants.length;
  const totalLunas = participants
    .filter(item => String(item.status_bayar).toLowerCase() === 'lunas')
    .reduce((sum, item) => sum + Number(item.nominal || 0), 0);
  const totalBelumBayar = participants.filter(item => String(item.status_bayar).toLowerCase() !== 'lunas').length;

  const sapiFromParticipants = participants
    .filter(item => String(item.nama_paket || item.id_paket).toLowerCase().includes('sapi'))
    .reduce((sum, item) => sum + Number(item.jumlah_bagian || 1), 0);

  const kambingFromParticipants = participants
    .filter(item => String(item.nama_paket || item.id_paket).toLowerCase().includes('kambing'))
    .reduce((sum, item) => sum + Number(item.jumlah_bagian || 1), 0);

  return {
    total_pendaftar: totalPendaftar,
    total_sapi: sapiFromParticipants,
    total_kambing: kambingFromParticipants,
    total_lunas: totalLunas,
    total_belum_bayar: totalBelumBayar,
    total_paket_aktif: packages.filter(item => String(item.aktif).toLowerCase() !== 'tidak').length
  };
}

function registerQurban(payload) {
  const packages = getPackages();
  const selected = packages.find(item => String(item.id_paket) === String(payload.id_paket));
  const jumlahBagian = Number(payload.jumlah_bagian || 1);
  const nominal = selected ? Number(selected.harga || 0) * jumlahBagian : Number(payload.nominal || 0);
  const record = {
    id: 'QH-' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMddHHmmss') + '-' + Math.floor(Math.random() * 1000),
    timestamp: new Date(),
    nama: sanitize(payload.nama),
    whatsapp: normalizeWhatsapp(payload.whatsapp),
    alamat: sanitize(payload.alamat),
    id_paket: sanitize(payload.id_paket),
    nama_paket: selected ? selected.nama_paket : sanitize(payload.nama_paket),
    jumlah_bagian: jumlahBagian,
    nama_niat: sanitize(payload.nama_niat),
    nominal: nominal,
    status_bayar: 'Belum Bayar',
    status_qurban: 'Pendaftaran Diterima',
    catatan: sanitize(payload.catatan),
    admin_update: ''
  };

  if (!record.nama || !record.whatsapp || !record.id_paket || !record.nama_niat) {
    return { ok: false, message: 'Data wajib belum lengkap.' };
  }

  appendObject(SHEETS.PEKURBAN, record);
  incrementPackageTerisi(record.id_paket, jumlahBagian);
  writeLog('registerQurban', record.id + ' - ' + record.nama, record.whatsapp);
  return { ok: true, data: record };
}

function incrementPackageTerisi(idPaket, jumlah) {
  const sheet = getSheet(SHEETS.PAKET);
  const values = sheet.getDataRange().getValues();
  const headers = values[0].map(String);
  const idIndex = headers.indexOf('id_paket');
  const terisiIndex = headers.indexOf('terisi');
  if (idIndex < 0 || terisiIndex < 0) return;

  for (let row = 1; row < values.length; row++) {
    if (String(values[row][idIndex]) === String(idPaket)) {
      const current = Number(values[row][terisiIndex] || 0);
      sheet.getRange(row + 1, terisiIndex + 1).setValue(current + Number(jumlah || 1));
      return;
    }
  }
}

function updateParticipantStatus(payload) {
  if (!payload.id) return { ok: false, message: 'ID pendaftar wajib diisi.' };
  const updates = {
    status_bayar: sanitize(payload.status_bayar || 'Belum Bayar'),
    status_qurban: sanitize(payload.status_qurban || 'Pendaftaran Diterima'),
    admin_update: new Date()
  };
  const updated = updateObjectById(SHEETS.PEKURBAN, 'id', payload.id, updates);
  if (!updated) return { ok: false, message: 'Data pendaftar tidak ditemukan.' };
  writeLog('updateParticipantStatus', payload.id + ' -> ' + JSON.stringify(updates), 'admin');
  return { ok: true };
}

function updatePayment(payload) {
  if (!payload.id) return { ok: false, message: 'ID pendaftar wajib diisi.' };
  const updated = updateObjectById(SHEETS.PEKURBAN, 'id', payload.id, {
    status_bayar: sanitize(payload.status_bayar || 'Belum Bayar'),
    admin_update: new Date()
  });
  return { ok: updated, message: updated ? 'OK' : 'Data tidak ditemukan.' };
}

function updateDistribution(payload) {
  if (!payload.id_distribusi) return { ok: false, message: 'ID distribusi wajib diisi.' };
  const updated = updateObjectById(SHEETS.DISTRIBUSI, 'id_distribusi', payload.id_distribusi, {
    status: sanitize(payload.status || 'Belum'),
    catatan: sanitize(payload.catatan || '')
  });
  return { ok: updated, message: updated ? 'OK' : 'Data distribusi tidak ditemukan.' };
}

function sanitize(value) {
  return String(value || '').trim();
}

function normalizeWhatsapp(value) {
  let cleaned = String(value || '').replace(/[^0-9]/g, '');
  if (cleaned.indexOf('0') === 0) cleaned = '62' + cleaned.substring(1);
  if (cleaned && cleaned.indexOf('62') !== 0) cleaned = '62' + cleaned;
  return cleaned;
}

function writeLog(action, detail, actor) {
  try {
    appendObject(SHEETS.LOG, {
      timestamp: new Date(),
      action: action,
      detail: detail,
      actor: actor || 'system'
    });
  } catch (error) {
    // Logging must not block the main transaction.
  }
}

/**
 * Run this function manually once from Apps Script editor.
 * It creates required sheets and sample rows.
 */
function setupSheet() {
  const ss = getSpreadsheet();
  Object.keys(HEADERS).forEach(sheetName => {
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) sheet = ss.insertSheet(sheetName);
    sheet.clear();
    sheet.getRange(1, 1, 1, HEADERS[sheetName].length).setValues([HEADERS[sheetName]]);
    sheet.setFrozenRows(1);
  });

  const settingsRows = [
    ['program_name', 'QurbanHub Baghasasi'],
    ['tahun_hijriah', '1447 H'],
    ['tahun_masehi', '2026 M'],
    ['subtitle', 'Mudah, amanah, dan transparan dalam pengelolaan qurban.'],
    ['description', 'Daftar qurban, pantau status pembayaran, dan dukung distribusi daging qurban kepada penerima manfaat secara tertib dan transparan.'],
    ['bank', 'BSI'],
    ['rekening', '1234567890'],
    ['atas_nama', 'Yayasan Baghasasi'],
    ['whatsapp', '6281234567890'],
    ['lokasi', 'Bekasi dan sekitarnya'],
    ['deadline', 'Menyesuaikan informasi panitia']
  ];
  ss.getSheetByName(SHEETS.SETTINGS).getRange(2, 1, settingsRows.length, 2).setValues(settingsRows);

  const packageRows = [
    ['SAPI-1', 'Sapi 1 Ekor', 'Sapi', 21000000, 3, 0, 'Paket qurban sapi penuh untuk keluarga atau instansi.', 'Ya'],
    ['SAPI-17', 'Patungan Sapi 1/7', 'Sapi', 3000000, 21, 0, 'Satu bagian dari tujuh bagian qurban sapi.', 'Ya'],
    ['KAMBING-1', 'Kambing / Domba', 'Kambing', 2500000, 15, 0, 'Paket qurban kambing atau domba untuk satu pekurban.', 'Ya'],
    ['SEDEKAH', 'Sedekah Daging', 'Sedekah', 0, 999, 0, 'Dukungan nominal bebas untuk perluasan distribusi manfaat.', 'Ya']
  ];
  ss.getSheetByName(SHEETS.PAKET).getRange(2, 1, packageRows.length, HEADERS.Paket.length).setValues(packageRows);

  SpreadsheetApp.flush();
}
