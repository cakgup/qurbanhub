const CONFIG = window.QURBANHUB_CONFIG || {};

const DEMO = {
  settings: {
    program_name: CONFIG.APP_NAME || 'QurbanHub Baghasasi',
    tahun_hijriah: '1447 H',
    tahun_masehi: '2026 M',
    subtitle: 'Mudah, amanah, dan transparan dalam pengelolaan qurban.',
    description: 'Daftar qurban, pantau status pembayaran, dan dukung distribusi daging qurban kepada penerima manfaat secara tertib dan transparan.',
    bank: CONFIG.DEFAULT_BANK || 'BSI',
    rekening: CONFIG.DEFAULT_REKENING || '1234567890',
    atas_nama: CONFIG.DEFAULT_ATAS_NAMA || 'Yayasan Baghasasi',
    whatsapp: CONFIG.DEFAULT_WHATSAPP || '6281234567890',
    lokasi: CONFIG.DEFAULT_LOCATION || 'Bekasi dan sekitarnya',
    deadline: CONFIG.DEFAULT_DEADLINE || 'Menyesuaikan informasi panitia'
  },
  packages: [
    {
      id_paket: 'SAPI-1',
      nama_paket: 'Sapi 1 Ekor',
      jenis_hewan: 'Sapi',
      harga: 21000000,
      kuota: 3,
      terisi: 1,
      deskripsi: 'Paket qurban sapi penuh untuk keluarga atau instansi.',
      aktif: 'Ya'
    },
    {
      id_paket: 'SAPI-17',
      nama_paket: 'Patungan Sapi 1/7',
      jenis_hewan: 'Sapi',
      harga: 3000000,
      kuota: 21,
      terisi: 8,
      deskripsi: 'Satu bagian dari tujuh bagian qurban sapi.',
      aktif: 'Ya'
    },
    {
      id_paket: 'KAMBING-1',
      nama_paket: 'Kambing / Domba',
      jenis_hewan: 'Kambing',
      harga: 2500000,
      kuota: 15,
      terisi: 5,
      deskripsi: 'Paket qurban kambing atau domba untuk satu pekurban.',
      aktif: 'Ya'
    },
    {
      id_paket: 'SEDEKAH',
      nama_paket: 'Sedekah Daging',
      jenis_hewan: 'Sedekah',
      harga: 0,
      kuota: 999,
      terisi: 0,
      deskripsi: 'Dukungan nominal bebas untuk perluasan distribusi manfaat.',
      aktif: 'Ya'
    }
  ],
  dashboard: {
    total_pendaftar: 14,
    total_sapi: 9,
    total_kambing: 5,
    total_lunas: 37500000,
    total_belum_bayar: 6,
    total_distribusi: 0
  },
  participants: []
};

const state = {
  settings: DEMO.settings,
  packages: [],
  dashboard: DEMO.dashboard,
  participants: [],
  isAdmin: false,
  backendProblem: false
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function formatRupiah(value) {
  const number = Number(value || 0);
  if (!number) return 'Nominal bebas';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: CONFIG.CURRENCY || 'IDR',
    maximumFractionDigits: 0
  }).format(number);
}

function normalizeWhatsapp(value) {
  let cleaned = String(value || '').replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0')) cleaned = `62${cleaned.slice(1)}`;
  if (!cleaned.startsWith('62') && cleaned.length >= 8) cleaned = `62${cleaned}`;
  return cleaned;
}

function toast(message) {
  const node = $('#toast');
  node.textContent = message;
  node.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => node.classList.remove('show'), 2800);
}

async function apiGet(action, params = {}) {
  if (!CONFIG.GAS_URL) {
    await new Promise((resolve) => setTimeout(resolve, 250));
    if (action === 'getSettings') return { ok: true, data: DEMO.settings };
    if (action === 'getPackages') return { ok: true, data: DEMO.packages };
    if (action === 'getDashboard') return { ok: true, data: DEMO.dashboard };
    if (action === 'getParticipants') return { ok: true, data: DEMO.participants };
    if (action === 'getStatus') {
      const whatsapp = normalizeWhatsapp(params.whatsapp);
      return { ok: true, data: DEMO.participants.filter((item) => normalizeWhatsapp(item.whatsapp) === whatsapp) };
    }
    return { ok: false, message: 'Action demo tidak ditemukan.' };
  }

  const url = new URL(CONFIG.GAS_URL);
  url.searchParams.set('action', action);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  const response = await fetch(url.toString(), { method: 'GET' });
  return response.json();
}

async function apiPost(action, payload = {}) {
  if (!CONFIG.GAS_URL) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    if (action === 'registerQurban') {
      const record = {
        id: `DEMO-${Date.now()}`,
        timestamp: new Date().toISOString(),
        status_bayar: 'Belum Bayar',
        status_qurban: 'Pendaftaran Diterima',
        ...payload
      };
      DEMO.participants.unshift(record);
      DEMO.dashboard.total_pendaftar += 1;
      return { ok: true, data: record };
    }
    if (action.startsWith('update')) return { ok: true };
    return { ok: false, message: 'Action demo tidak ditemukan.' };
  }

  const response = await fetch(CONFIG.GAS_URL, {
    method: 'POST',
    body: JSON.stringify({ action, ...payload })
  });
  return response.json();
}

function renderSettings() {
  const s = state.settings;
  $('#programName').textContent = s.program_name || CONFIG.APP_NAME || 'QurbanHub Baghasasi';
  $('#programSubtitle').textContent = s.subtitle || 'Mudah, amanah, dan transparan dalam pengelolaan qurban.';
  $('#programDescription').textContent = s.description || DEMO.settings.description;
  $('#programYear').textContent = `Idul Adha ${s.tahun_hijriah || '1447 H'} / ${s.tahun_masehi || '2026 M'}`;
  $('#bankTitle').textContent = `${s.bank || CONFIG.DEFAULT_BANK || 'Bank'} - Rekening Qurban`;
  $('#bankAccount').textContent = s.rekening || CONFIG.DEFAULT_REKENING || '-';
  $('#bankName').textContent = `Atas nama ${s.atas_nama || CONFIG.DEFAULT_ATAS_NAMA || 'Yayasan Baghasasi'}`;
  $('#programLocation').textContent = s.lokasi || CONFIG.DEFAULT_LOCATION || '-';
  $('#deadlineText').textContent = s.deadline || CONFIG.DEFAULT_DEADLINE || '-';
  $('#contactText').textContent = `Kontak panitia: ${s.whatsapp || CONFIG.DEFAULT_WHATSAPP || '-'}`;
  $('#btnWhatsapp').href = `https://wa.me/${normalizeWhatsapp(s.whatsapp || CONFIG.DEFAULT_WHATSAPP)}?text=${encodeURIComponent('Assalamu alaikum, saya ingin bertanya tentang program Qurban Baghasasi.')}`;
}

function renderStats() {
  const d = state.dashboard || {};
  $('#statPendaftar').textContent = Number(d.total_pendaftar || 0).toLocaleString('id-ID');
  $('#statSapi').textContent = Number(d.total_sapi || 0).toLocaleString('id-ID');
  $('#statKambing').textContent = Number(d.total_kambing || 0).toLocaleString('id-ID');
  $('#statDana').textContent = formatRupiah(d.total_lunas || 0).replace(',00', '');
}

function renderPackages() {
  const activePackages = state.packages.filter((item) => String(item.aktif || 'Ya').toLowerCase() !== 'tidak');
  const container = $('#packageList');
  const select = $('#paketSelect');

  if (!activePackages.length) {
    container.innerHTML = '<div class="status-result muted">Paket qurban belum tersedia. Silakan hubungi panitia atau coba muat ulang beberapa saat lagi.</div>';
    select.innerHTML = '<option value="">Paket belum tersedia</option>';
    select.disabled = true;
    return;
  }

  select.disabled = false;

  container.innerHTML = activePackages.map((item) => {
    const kuota = Number(item.kuota || 0);
    const terisi = Number(item.terisi || 0);
    const sisa = kuota >= 999 ? 'Tersedia' : Math.max(kuota - terisi, 0);
    return `
      <article class="package-card" data-package-id="${item.id_paket}">
        <div class="package-top">
          <div class="package-title">
            <h4>${escapeHtml(item.nama_paket)}</h4>
            <p>${escapeHtml(item.deskripsi || 'Paket qurban Yayasan Baghasasi.')}</p>
          </div>
          <div class="price">${formatRupiah(item.harga)}</div>
        </div>
        <div class="package-meta">
          <div class="meta-chip"><span>Jenis</span><strong>${escapeHtml(item.jenis_hewan || '-')}</strong></div>
          <div class="meta-chip"><span>Kuota</span><strong>${kuota >= 999 ? 'Bebas' : kuota}</strong></div>
          <div class="meta-chip"><span>Sisa</span><strong>${sisa}</strong></div>
        </div>
        <div class="package-footer">
          <span class="badge">${kuota >= 999 ? 'Donasi terbuka' : `${terisi}/${kuota} terisi`}</span>
          <button class="btn primary btnSelectPackage" type="button" data-package-id="${item.id_paket}">Pilih</button>
        </div>
      </article>
    `;
  }).join('');

  select.innerHTML = '<option value="">Pilih paket</option>' + activePackages.map((item) => {
    return `<option value="${item.id_paket}">${escapeHtml(item.nama_paket)} - ${formatRupiah(item.harga)}</option>`;
  }).join('');

  $$('.btnSelectPackage').forEach((button) => {
    button.addEventListener('click', () => selectPackage(button.dataset.packageId));
  });
}

function selectPackage(id) {
  switchTab('daftar');
  $('#paketSelect').value = id;
  $('#formPendaftaran').scrollIntoView({ behavior: 'smooth', block: 'start' });
  toast('Paket dipilih. Silakan lengkapi formulir pendaftaran.');
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function loadPublicData() {
  try {
    const [settings, packages, dashboard] = await Promise.all([
      apiGet('getSettings'),
      apiGet('getPackages'),
      apiGet('getDashboard')
    ]);

    const hasBackendProblem = !settings.ok || !packages.ok || !dashboard.ok;
    state.backendProblem = hasBackendProblem;

    state.settings = settings.ok ? { ...DEMO.settings, ...settings.data } : DEMO.settings;
    state.packages = packages.ok && Array.isArray(packages.data) ? packages.data : DEMO.packages;
    state.dashboard = dashboard.ok ? { ...DEMO.dashboard, ...dashboard.data } : DEMO.dashboard;

    renderSettings();
    renderPackages();
    renderStats();

    if (hasBackendProblem && !document.body.classList.contains('landing-mode')) {
      toast('Data online belum siap. Contoh tampilan ditampilkan sementara.');
    }
  } catch (error) {
    console.error(error);
    state.packages = DEMO.packages;
    renderSettings();
    renderPackages();
    renderStats();
    toast('Gagal memuat data GAS. Mode demo ditampilkan.');
  }
}

function formToObject(form) {
  return Object.fromEntries(new FormData(form).entries());
}

async function handleSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const button = $('#btnSubmit');
  const data = formToObject(form);
  const selectedPackage = state.packages.find((item) => item.id_paket === data.id_paket);

  data.whatsapp = normalizeWhatsapp(data.whatsapp);
  data.nominal = selectedPackage ? Number(selectedPackage.harga || 0) * Number(data.jumlah_bagian || 1) : 0;
  data.nama_paket = selectedPackage?.nama_paket || '';

  if (!data.whatsapp || data.whatsapp.length < 10) {
    toast('Nomor WhatsApp belum valid. Gunakan format 628xxxxxxxxxx.');
    return;
  }

  button.disabled = true;
  button.textContent = 'Mengirim...';

  try {
    const result = await apiPost('registerQurban', data);
    if (!result.ok) throw new Error(result.message || 'Pendaftaran gagal.');
    form.reset();
    toast('Pendaftaran berhasil dikirim. Panitia akan menghubungi Anda.');
    await loadPublicData();
  } catch (error) {
    toast(error.message || 'Gagal mengirim pendaftaran.');
  } finally {
    button.disabled = false;
    button.textContent = 'Kirim Pendaftaran';
  }
}

async function checkStatus() {
  const whatsapp = normalizeWhatsapp($('#statusWhatsapp').value);
  const resultNode = $('#statusResult');
  if (!whatsapp) {
    toast('Masukkan nomor WhatsApp terlebih dahulu.');
    return;
  }
  resultNode.classList.remove('muted');
  resultNode.textContent = 'Mencari data...';
  try {
    const result = await apiGet('getStatus', { whatsapp });
    const rows = Array.isArray(result.data) ? result.data : [];
    if (!result.ok) {
      resultNode.classList.add('muted');
      resultNode.textContent = result.message || 'Status belum bisa dicek. Silakan coba lagi beberapa saat.';
      return;
    }
    if (rows.length === 0) {
      resultNode.classList.add('muted');
      resultNode.textContent = 'Data belum ditemukan. Pastikan nomor WhatsApp sama dengan saat pendaftaran.';
      return;
    }
    resultNode.innerHTML = rows.map((item) => `
      <div>
        <strong>${escapeHtml(item.nama || '-')}</strong><br />
        Paket: ${escapeHtml(item.nama_paket || item.id_paket || '-')}<br />
        Status bayar: <strong>${escapeHtml(item.status_bayar || 'Belum Bayar')}</strong><br />
        Status qurban: <strong>${escapeHtml(item.status_qurban || 'Pendaftaran Diterima')}</strong>
      </div>
    `).join('<hr />');
  } catch (error) {
    resultNode.classList.add('muted');
    resultNode.textContent = 'Gagal mencari data status.';
  }
}

async function loadAdminData() {
  const list = $('#adminList');
  list.innerHTML = '<div class="skeleton-card"></div>';
  try {
    const result = await apiGet('getParticipants', { admin: '1' });
    if (!result.ok) throw new Error(result.message || 'Gagal memuat data admin.');
    state.participants = Array.isArray(result.data) ? result.data : [];
    renderAdminList();
  } catch (error) {
    list.innerHTML = `<div class="status-result muted">${escapeHtml(error.message || 'Gagal memuat data admin.')}</div>`;
  }
}

function renderAdminList() {
  const list = $('#adminList');
  if (!state.participants.length) {
    list.innerHTML = '<div class="status-result muted">Belum ada data pendaftar.</div>';
    return;
  }

  list.innerHTML = state.participants.map((item) => `
    <article class="admin-item" data-id="${escapeHtml(item.id)}">
      <h4>${escapeHtml(item.nama || '-')}</h4>
      <p>${escapeHtml(item.whatsapp || '-')} - ${escapeHtml(item.nama_paket || item.id_paket || '-')}</p>
      <p>Nominal: <strong>${formatRupiah(item.nominal)}</strong></p>
      <span class="badge">${escapeHtml(item.status_bayar || 'Belum Bayar')}</span>
      <div class="admin-grid">
        <select class="adminPayment">
          ${['Belum Bayar', 'Menunggu Konfirmasi', 'Lunas', 'Dibatalkan'].map((status) => `<option value="${status}" ${status === item.status_bayar ? 'selected' : ''}>${status}</option>`).join('')}
        </select>
        <select class="adminProcess">
          ${['Pendaftaran Diterima', 'Hewan Disiapkan', 'Disembelih', 'Distribusi Diproses', 'Selesai'].map((status) => `<option value="${status}" ${status === item.status_qurban ? 'selected' : ''}>${status}</option>`).join('')}
        </select>
        <button class="btn primary btnSaveAdmin" type="button">Simpan Status</button>
      </div>
    </article>
  `).join('');

  $$('.btnSaveAdmin').forEach((button) => {
    button.addEventListener('click', async () => {
      const item = button.closest('.admin-item');
      await saveAdminStatus(item.dataset.id, item.querySelector('.adminPayment').value, item.querySelector('.adminProcess').value, button);
    });
  });
}

async function saveAdminStatus(id, status_bayar, status_qurban, button) {
  const original = button.textContent;
  button.disabled = true;
  button.textContent = 'Menyimpan...';
  try {
    const result = await apiPost('updateParticipantStatus', { id, status_bayar, status_qurban });
    if (!result.ok) throw new Error(result.message || 'Gagal menyimpan status.');
    toast('Status berhasil diperbarui.');
    await loadAdminData();
    await loadPublicData();
  } catch (error) {
    toast(error.message || 'Gagal menyimpan status.');
  } finally {
    button.disabled = false;
    button.textContent = original;
  }
}

function openAdminDialog() {
  $('#adminDialog').showModal();
  $('#adminPassword').focus();
}

function loginAdmin() {
  const password = $('#adminPassword').value;
  if (password !== CONFIG.ADMIN_PASSWORD) {
    toast('Password admin tidak sesuai.');
    return;
  }
  state.isAdmin = true;
  $('#adminDialog').close();
  $('#adminPanel').hidden = false;
  $('#adminPanel').scrollIntoView({ behavior: 'smooth' });
  loadAdminData();
  toast('Panel admin dibuka.');
}

function logoutAdmin() {
  state.isAdmin = false;
  $('#adminPanel').hidden = true;
  $('#adminPassword').value = '';
  toast('Keluar dari panel admin.');
}

function copyRekening() {
  const rekening = state.settings.rekening || CONFIG.DEFAULT_REKENING || '';
  if (!rekening) {
    toast('Nomor rekening belum tersedia.');
    return;
  }

  if (!navigator.clipboard) {
    const input = document.createElement('input');
    input.value = rekening;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    input.remove();
    toast('Nomor rekening disalin.');
    return;
  }

  navigator.clipboard.writeText(rekening)
    .then(() => toast('Nomor rekening disalin.'))
    .catch(() => toast('Gagal menyalin rekening.'));
}

function enterApp() {
  document.body.classList.remove('landing-mode');
  document.body.classList.add('app-open');
  $('#landingScreen').hidden = true;
  $('#appContent').hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (state.backendProblem) {
    toast('Data online belum siap. Contoh tampilan ditampilkan sementara.');
  }
}

function switchTab(tabName) {
  $$('.tab-button').forEach((button) => {
    const isActive = button.dataset.tab === tabName;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-selected', String(isActive));
  });
  $$('.tab-panel').forEach((panel) => {
    const isActive = panel.id === `tab-${tabName}`;
    panel.classList.toggle('active', isActive);
    panel.hidden = !isActive;
  });
  if (!document.body.classList.contains('landing-mode')) {
    $('#appContent').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function bindEvents() {
  $('#qurbanForm').addEventListener('submit', handleSubmit);
  $('#btnCopyRekening').addEventListener('click', copyRekening);
  $('#btnCheckStatus').addEventListener('click', checkStatus);
  $('#btnEnterApp').addEventListener('click', enterApp);
  $$('.tab-button').forEach((button) => {
    button.addEventListener('click', () => switchTab(button.dataset.tab));
  });
  $('#btnAdmin').addEventListener('click', openAdminDialog);
  $('#btnLoginAdmin').addEventListener('click', loginAdmin);
  $('#btnRefreshAdmin').addEventListener('click', loadAdminData);
  $('#btnLogoutAdmin').addEventListener('click', logoutAdmin);
  $('#adminPassword').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      loginAdmin();
    }
  });
  $('#statusWhatsapp').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      checkStatus();
    }
  });
}

bindEvents();
switchTab('ringkasan');
loadPublicData();
