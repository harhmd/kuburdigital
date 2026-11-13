const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// ============================================================================
// 1. CREATE VIEW-SEARCH AND VIEW-CEMETERY SECTIONS
// ============================================================================

const viewSearchHtml = `
    <!-- VIEW 2: SEARCH & RECEIPT LOOKUP -->
    <section id="view-search" class="w-full max-w-4xl mx-auto hidden animate-fade-in no-print">
      <div class="themed-card rounded-3xl p-5 sm:p-8 shadow-premium border space-y-6">
        
        <!-- Search Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-black/10 gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <h2 class="text-xl sm:text-2xl font-black tracking-tight">Carian & Semakan Resit Digital</h2>
            </div>
            <p class="text-xs opacity-70 mt-0.5">Semak status pendaftaran, maklumat simati, lokasi lot kubur dan muat turun resit rasmi</p>
          </div>
          <button onclick="navigateTo('landing')" class="self-start sm:self-auto text-xs px-3.5 py-1.5 rounded-xl bg-black/5 hover:bg-black/10 font-bold transition flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            Kembali ke Utama
          </button>
        </div>

        <!-- Quick Search Bar -->
        <div class="space-y-3">
          <label class="block text-xs font-bold uppercase tracking-wider opacity-75">Cari Rekod Kematian / No. Resit</label>
          <div class="relative">
            <input type="text" id="liveSearchInput" oninput="handleLiveSearch()" placeholder="Masukkan No. Rujukan (cth: MBTK-2026-0001), Nama Arwah, atau No. KP..." 
              class="w-full pl-11 pr-4 py-3.5 text-sm rounded-2xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-black/30 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm" />
            <svg class="w-5 h-5 opacity-40 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>

          <!-- Quick Sample Chips -->
          <div class="flex items-center gap-2 flex-wrap text-xs pt-1">
            <span class="opacity-60 text-[11px] font-semibold">Contoh Carian:</span>
            <button onclick="fillQuickSearch('MBTK-2026-0006')" class="px-2.5 py-1 rounded-lg bg-black/5 hover:bg-black/10 font-mono text-[11px] font-bold border border-black/5 transition">MBTK-2026-0006</button>
            <button onclick="fillQuickSearch('Hj. Ismail')" class="px-2.5 py-1 rounded-lg bg-black/5 hover:bg-black/10 text-[11px] font-bold border border-black/5 transition">Hj. Ismail</button>
            <button onclick="fillQuickSearch('LOT 76')" class="px-2.5 py-1 rounded-lg bg-black/5 hover:bg-black/10 text-[11px] font-bold border border-black/5 transition">LOT 76</button>
            <button onclick="fillQuickSearch('')" class="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 text-[11px] font-bold transition">Papar Semua</button>
          </div>
        </div>

        <!-- Search Results Container -->
        <div class="space-y-3 pt-2">
          <div class="flex items-center justify-between text-xs font-bold opacity-75">
            <span id="searchResultCount">Memaparkan Rekod Terkini</span>
            <span class="text-[11px] font-mono opacity-60">Sistem Pangkalan Data Kariah</span>
          </div>

          <div id="searchResultsList" class="space-y-3">
            <!-- Dynamic search result cards injected here -->
          </div>
        </div>

      </div>
    </section>
`;

const viewCemeteryHtml = `
    <!-- VIEW 3: DEDICATED DIGITAL CEMETERY MAP (200 LOT) -->
    <section id="view-cemetery" class="w-full max-w-6xl mx-auto hidden animate-fade-in no-print">
      <div class="space-y-5">
        
        <!-- Cemetery Top Bar -->
        <div class="themed-card rounded-3xl p-5 sm:p-6 border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
              <h2 class="text-xl sm:text-2xl font-black tracking-tight">Peta Digital 200 Lot Kubur Kariah</h2>
              <span class="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full">GIS V2.6</span>
            </div>
            <p class="text-xs opacity-70 mt-1">Tanah Perkuburan Islam Masjid Bandar Teknologi Kajang, Semenyih (Zon A & Zon B)</p>
          </div>

          <div class="flex items-center gap-2 flex-wrap">
            <button onclick="exportCemeteryLotsCSV()" class="px-3 py-2 text-xs rounded-xl bg-black/10 hover:bg-black/20 font-bold flex items-center gap-1.5 transition">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              Eksport CSV
            </button>
            <button onclick="navigateTo('form')" class="px-3.5 py-2 text-xs rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold flex items-center gap-1.5 transition shadow-sm">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              Daftar Jenazah
            </button>
          </div>
        </div>

        <!-- Cemetery Summary Statistics Bar -->
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div class="themed-card p-4 rounded-2xl border shadow-sm">
            <span class="text-[10px] font-bold uppercase tracking-wider opacity-60 block">Jumlah Kapasiti</span>
            <span class="text-xl font-black font-mono mt-0.5 block" id="cemeteryStatTotal">200</span>
            <span class="text-[10px] opacity-60">Plot Berdaftar</span>
          </div>

          <div class="themed-card p-4 rounded-2xl border shadow-sm">
            <span class="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block">Lot Terisi</span>
            <span class="text-xl font-black font-mono text-rose-600 dark:text-rose-400 mt-0.5 block" id="cemeteryStatOccupied">0</span>
            <span class="text-[10px] opacity-60">Arwah Bersemadi</span>
          </div>

          <div class="themed-card p-4 rounded-2xl border shadow-sm">
            <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">Lot Kosong</span>
            <span class="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400 mt-0.5 block" id="cemeteryStatAvailable">0</span>
            <span class="text-[10px] opacity-60">Sedia Digunakan</span>
          </div>

          <div class="themed-card p-4 rounded-2xl border shadow-sm">
            <span class="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">Lot Ditempah</span>
            <span class="text-xl font-black font-mono text-amber-600 dark:text-amber-400 mt-0.5 block" id="cemeteryStatReserved">0</span>
            <span class="text-[10px] opacity-60">Rizab Kariah</span>
          </div>

          <div class="themed-card p-4 rounded-2xl border shadow-sm col-span-2 sm:col-span-1">
            <span class="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">Penggunaan</span>
            <span class="text-xl font-black font-mono text-blue-600 dark:text-blue-400 mt-0.5 block" id="cemeteryStatUsage">0%</span>
            <span class="text-[10px] opacity-60">Kadar Pengisian</span>
          </div>
        </div>

        <!-- Filter, Search & Interactive Map Controls -->
        <div class="themed-card rounded-2xl border p-4 shadow-sm space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-3">
            
            <!-- Search by Lot or Name -->
            <div class="relative w-full sm:w-72">
              <input type="text" id="cemeterySearchInput" oninput="renderCemeteryMap()" placeholder="Cari No. Lot (cth: 77) atau Nama Arwah..." 
                class="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-black/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium" />
              <svg class="w-4 h-4 opacity-50 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>

            <!-- Zone & Row Selectors -->
            <div class="flex items-center gap-2 flex-wrap">
              <select id="cemeteryFilterZone" onchange="renderCemeteryMap()" class="px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-black/30 font-bold">
                <option value="all">Semua Zon (Zon A & B)</option>
                <option value="Zon A">Zon A (Lot 1 - 100)</option>
                <option value="Zon B">Zon B (Lot 101 - 200)</option>
              </select>

              <select id="cemeteryFilterRow" onchange="renderCemeteryMap()" class="px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-black/30 font-bold">
                <option value="all">Semua Baris (R: 1 - 10)</option>
                <option value="1">Baris 1</option>
                <option value="2">Baris 2</option>
                <option value="3">Baris 3</option>
                <option value="4">Baris 4</option>
                <option value="5">Baris 5</option>
                <option value="6">Baris 6</option>
                <option value="7">Baris 7</option>
                <option value="8">Baris 8</option>
                <option value="9">Baris 9</option>
                <option value="10">Baris 10</option>
              </select>
            </div>
          </div>

          <!-- Status Filter Tabs & Legend -->
          <div class="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-black/5 text-xs">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="opacity-60 font-bold mr-1">Status:</span>
              <button onclick="setCemeteryStatusFilter('all')" id="cemeteryFilterBtn-all" class="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-600 text-white">Semua (200)</button>
              <button onclick="setCemeteryStatusFilter('available')" id="cemeteryFilterBtn-available" class="px-2.5 py-1 rounded-lg text-xs font-bold bg-black/10 text-emerald-700 dark:text-emerald-300">Kosong</button>
              <button onclick="setCemeteryStatusFilter('occupied')" id="cemeteryFilterBtn-occupied" class="px-2.5 py-1 rounded-lg text-xs font-bold bg-black/10 text-slate-800 dark:text-slate-200">Terisi</button>
              <button onclick="setCemeteryStatusFilter('reserved')" id="cemeteryFilterBtn-reserved" class="px-2.5 py-1 rounded-lg text-xs font-bold bg-black/10 text-amber-700 dark:text-amber-300">Ditempah</button>
            </div>

            <!-- Legend -->
            <div class="flex items-center gap-3 text-[11px] opacity-80">
              <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-emerald-500 border border-emerald-600 inline-block"></span> Kosong</span>
              <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-slate-900 border border-slate-700 inline-block"></span> Terisi</span>
              <span class="flex items-center gap-1"><span class="w-3 h-3 rounded bg-amber-400 border border-amber-600 inline-block"></span> Ditempah</span>
            </div>
          </div>
        </div>

        <!-- Visual Interactive Cemetery Map Canvas / Grid -->
        <div class="themed-card rounded-2xl border p-4 sm:p-6 shadow-premium overflow-hidden">
          <div class="flex items-center justify-between pb-3 border-b border-black/10 mb-4">
            <div>
              <h3 class="font-black text-sm uppercase tracking-wide flex items-center gap-2">
                <span>Pelan Tapak Perkuburan Islam Masjid Bandar Teknologi Kajang</span>
              </h3>
              <p class="text-[11px] opacity-60">Klik mana-mana lot kubur untuk melihat maklumat arwah, kemaskini status atau pendaftaran baru</p>
            </div>
            <span class="text-xs font-mono font-bold opacity-60" id="cemeteryShowingCount">200 Plot Dipaparkan</span>
          </div>

          <div id="cemeteryGridContainer" class="space-y-6">
            <!-- Zones & plots dynamically injected here -->
          </div>
        </div>

      </div>
    </section>
`;

// Insert view-search and view-cemetery right before view-form
if (!content.includes('id="view-search"')) {
  content = content.replace(
    '<section id="view-form"',
    `${viewSearchHtml}\n\n${viewCemeteryHtml}\n\n    <section id="view-form"`
  );
}

// In view-admin, remove redundant duplicate of cemetery map since view-cemetery is now primary
// Let's check view-admin tabs:
content = content.replace(
  `<button id="tabBtnCemetery" onclick="switchAdminTab('cemetery')" \n          class="px-4 py-2.5 text-xs font-black rounded-xl transition flex items-center gap-2 bg-emerald-700 text-white shadow-md">\n          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>\n          <span>Peta Digital Kubur (200 Lot)</span>\n          <span class="px-2 py-0.5 rounded-full bg-white/20 text-[10px]" id="badgeCemeteryTotal">200 Lot</span>\n        </button>`,
  `<button id="tabBtnCemetery" onclick="navigateTo('cemetery')" \n          class="px-4 py-2.5 text-xs font-bold rounded-xl transition flex items-center gap-2 bg-black/5 hover:bg-black/10 opacity-70 hover:opacity-100">\n          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>\n          <span>Buka Peta Kubur (200 Lot)</span>\n        </button>`
);

console.log('Sections created.');
fs.writeFileSync(filePath, content, 'utf8');
