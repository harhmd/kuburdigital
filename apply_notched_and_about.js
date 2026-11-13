const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// ============================================================================
// 1. REPLACE VIEW-LANDING WITH COMPREHENSIVE ABOUT MASJID PENGURUSAN JENAZAH
// ============================================================================

const newLandingHtml = `    <!-- VIEW 1: ABOUT MASJID PENGURUSAN JENAZAH (LANDING PAGE) -->
    <section id="view-landing" class="w-full max-w-5xl mx-auto my-auto animate-fade-in transition-all space-y-6">
      
      <!-- HERO BANNER: MASJID BRANDING & INVOCATION -->
      <div class="themed-card rounded-3xl overflow-hidden border shadow-premium">
        <div class="themed-header p-7 sm:p-10 text-center text-white relative pattern-dot">
          <div class="inline-flex p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-3 shadow-xl">
            <svg class="w-12 h-12 text-amber-400 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8 2 4 5 4 8c0 1.25.5 2.4 1.34 3.28C4.5 12.16 4 13.5 4 15c0 3.31 3.58 6 8 6s8-2.69 8-6c0-1.5-.5-2.84-1.34-3.72C19.5 10.4 20 9.25 20 8c0-3-4-6-8-6zm0 2c2.5 0 5 1.5 5 4 0 .73-.3 1.41-.83 1.93l-.47.47.38.56C16.63 11.77 17 12.83 17 14c0 2.21-2.69 4-6 4s-6-1.79-6-4c0-1.17.37-2.23.92-3.04l.38-.56-.47-.47C5.3 9.41 5 8.73 5 8c0-2.5 2.5-4 6-4zm0 4a2 2 0 100 4 2 2 0 000-4z"/>
            </svg>
          </div>
          
          <span class="text-[11px] sm:text-xs uppercase tracking-widest text-emerald-300 font-extrabold block">Pusat Khidmat Khairat & Pengurusan Jenazah Kariah</span>
          <h2 class="text-2xl sm:text-4xl font-black tracking-tight uppercase mt-1">Masjid Bandar Teknologi Kajang</h2>
          <p class="text-xs uppercase tracking-wider text-amber-300 font-semibold mt-0.5">Bandar Teknologi Kajang, 43500 Semenyih, Hulu Langat, Selangor</p>
          
          <div class="max-w-md mx-auto my-4 py-2 border-y border-white/15">
            <p class="font-arabic text-2xl sm:text-3xl text-amber-300 leading-relaxed font-bold tracking-wide">كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ</p>
            <p class="text-xs text-white/80 italic mt-1 font-serif">"Tiap-tiap yang bernyawa akan merasai mati." &mdash; (Surah Ali 'Imran: 185)</p>
          </div>
          
          <p class="text-xs sm:text-sm text-white/90 max-w-2xl mx-auto font-medium leading-relaxed">
            Menyediakan perkhidmatan fardhu kifayah yang tersusun, pantas, telus dan berlandaskan sunnah Rasulullah SAW bagi membantu waris dan keluarga kariah dalam saat-saat dukacita 24 jam sehari.
          </p>
        </div>
      </div>

      <!-- SECTION 1: TALIAN KECEMASAN 24 JAM & PEGAWAI KHIDMAT -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <!-- Emergency Hotline Card -->
        <div class="themed-card p-5 rounded-2xl border shadow-sm relative overflow-hidden bg-gradient-to-br from-rose-500/10 to-amber-500/10 border-rose-500/20">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <svg class="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            </div>
            <div>
              <span class="text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 block">Talian Kecemasan 24 Jam</span>
              <h4 class="font-extrabold text-sm">Hotline Pengurusan Jenazah</h4>
            </div>
          </div>
          <p class="text-xl font-black font-mono text-rose-700 dark:text-rose-400">012-423 7697</p>
          <p class="text-xs opacity-70 mt-1">Sedia berkhidmat bila-bila masa siang & malam.</p>
          <a href="https://wa.me/60124237697?text=Assalamualaikum,%20saya%20ingin%20membuat%20urusan%20kematian/jenazah" target="_blank" 
            class="mt-3.5 inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm">
            <span>Hubungi WhatsApp Rasmi</span>
          </a>
        </div>

        <!-- Person In Charge 1 -->
        <div class="themed-card p-5 rounded-2xl border shadow-sm flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center font-bold text-sm">
                Az
              </div>
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider opacity-60 block">Penyelaras Jenazah & Khairat</span>
                <h4 class="font-extrabold text-sm">Ts. Hj Nor Azhar Abdul Hamid</h4>
              </div>
            </div>
            <p class="text-xs opacity-70">Penyelaras Hal Ehwal Perkuburan & Kebajikan Kariah BTK</p>
          </div>
          <div class="pt-3 border-t border-black/5 mt-3 flex items-center justify-between">
            <span class="text-xs font-mono font-bold">Tel: 012-423 7697</span>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold">Penyelaras</span>
          </div>
        </div>

        <!-- Person In Charge 2 -->
        <div class="themed-card p-5 rounded-2xl border shadow-sm flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-600 flex items-center justify-center font-bold text-sm">
                Im
              </div>
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider opacity-60 block">Imam / Bilal Bertugas</span>
                <h4 class="font-extrabold text-sm">Pejabat Pengurusan Masjid</h4>
              </div>
            </div>
            <p class="text-xs opacity-70">Urusan Talkin, Solat Jenazah & Pengesahan Kariah</p>
          </div>
          <div class="pt-3 border-t border-black/5 mt-3 flex items-center justify-between">
            <span class="text-xs font-mono font-bold">Tel: 03-8723 1234</span>
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 font-bold">Pejabat</span>
          </div>
        </div>

      </div>

      <!-- SECTION 2: 4 LANGKAH PROSEDUR PENGURUSAN JENAZAH -->
      <div class="themed-card rounded-3xl p-6 sm:p-8 border shadow-premium space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-black/10 gap-2">
          <div>
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <h3 class="text-lg sm:text-xl font-black uppercase tracking-wide">Prosedur Pengurusan Jenazah Kariah</h3>
            </div>
            <p class="text-xs opacity-70 mt-0.5">Panduan langkah demi langkah bagi waris dan keluarga apabila berlaku kematian</p>
          </div>
          <span class="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/20 self-start sm:self-auto">
            Standard Operasi Patuh Syariah
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <!-- Step 1 -->
          <div class="p-4 rounded-2xl bg-black/5 border border-black/5 flex flex-col justify-between space-y-3">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="w-7 h-7 rounded-lg bg-emerald-600 text-white font-mono font-black text-xs flex items-center justify-center">1</span>
                <span class="text-[10px] font-bold uppercase tracking-wider opacity-60">Langkah 1</span>
              </div>
              <h4 class="font-extrabold text-sm">Makluman & Pengesahan</h4>
              <p class="text-xs opacity-70 mt-1 leading-relaxed">
                Dapatkan permit pengesahan kematian rasmi daripada Hospital (jika di wad) atau Polis (jika di kediaman). Hubungi pihak masjid dengan segera.
              </p>
            </div>
            <div class="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 pt-2 border-t border-black/5">
              &bull; Sediakan Salinan KP Waris
            </div>
          </div>

          <!-- Step 2 -->
          <div class="p-4 rounded-2xl bg-black/5 border border-black/5 flex flex-col justify-between space-y-3">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="w-7 h-7 rounded-lg bg-emerald-600 text-white font-mono font-black text-xs flex items-center justify-center">2</span>
                <span class="text-[10px] font-bold uppercase tracking-wider opacity-60">Langkah 2</span>
              </div>
              <h4 class="font-extrabold text-sm">Mandian & Kafan</h4>
              <p class="text-xs opacity-70 mt-1 leading-relaxed">
                Jenazah dibawa ke Bilik Pengurusan Jenazah Masjid menaiki Van Jenazah. Proses memandikan dan mengafankan dilaksanakan oleh pemandi bertauliah.
              </p>
            </div>
            <div class="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 pt-2 border-t border-black/5">
              &bull; Kafan Lengkap & Minyak Wangi
            </div>
          </div>

          <!-- Step 3 -->
          <div class="p-4 rounded-2xl bg-black/5 border border-black/5 flex flex-col justify-between space-y-3">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="w-7 h-7 rounded-lg bg-emerald-600 text-white font-mono font-black text-xs flex items-center justify-center">3</span>
                <span class="text-[10px] font-bold uppercase tracking-wider opacity-60">Langkah 3</span>
              </div>
              <h4 class="font-extrabold text-sm">Solat Jenazah</h4>
              <p class="text-xs opacity-70 mt-1 leading-relaxed">
                Jenazah ditempatkan di ruangan khas Dewan Solat Masjid. Solat jenazah diimamkan oleh Imam Masjid bersama jemaah kariah sejurus selepas solat fardhu.
              </p>
            </div>
            <div class="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 pt-2 border-t border-black/5">
              &bull; Solat Berjemaah Kariah
            </div>
          </div>

          <!-- Step 4 -->
          <div class="p-4 rounded-2xl bg-black/5 border border-black/5 flex flex-col justify-between space-y-3">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="w-7 h-7 rounded-lg bg-emerald-600 text-white font-mono font-black text-xs flex items-center justify-center">4</span>
                <span class="text-[10px] font-bold uppercase tracking-wider opacity-60">Langkah 4</span>
              </div>
              <h4 class="font-extrabold text-sm">Pengebumian & Rekod</h4>
              <p class="text-xs opacity-70 mt-1 leading-relaxed">
                Pengebumian di Tanah Perkuburan Islam BTK mengikut No. Lot Kubur yang ditetapkan (Zon A / B). Bacaan talkin & resit rasmi digital dikeluarkan.
              </p>
            </div>
            <div class="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 pt-2 border-t border-black/5">
              &bull; Pemetaan 200 Lot Digital
            </div>
          </div>

        </div>
      </div>

      <!-- SECTION 3: KEMUDAHAN & FASILITI PENGURUSAN JENAZAH -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div class="themed-card p-5 rounded-2xl border shadow-sm space-y-2">
          <div class="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center mb-1">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
          </div>
          <h4 class="font-extrabold text-sm">Van Jenazah Kariah</h4>
          <p class="text-xs opacity-70 leading-relaxed">Kenderaan jenazah berhawa dingin sedia untuk pemindahan dari hospital atau kediaman ke tanah perkuburan.</p>
        </div>

        <div class="themed-card p-5 rounded-2xl border shadow-sm space-y-2">
          <div class="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-600 flex items-center justify-center mb-1">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
          </div>
          <h4 class="font-extrabold text-sm">Bilik Mandi Jenazah</h4>
          <p class="text-xs opacity-70 leading-relaxed">Fasiliti mandian moden keluli tahan karat (stainless steel), ruang privasi, dan kelengkapan lengkap patuh syariah.</p>
        </div>

        <div class="themed-card p-5 rounded-2xl border shadow-sm space-y-2">
          <div class="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center mb-1">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
          </div>
          <h4 class="font-extrabold text-sm">Set Kafan Lengkap</h4>
          <p class="text-xs opacity-70 leading-relaxed">Kain kapan putih berkualiti, serbuk kapur barus, air mawar, kapas perubatan, kayu cendana dan minyak wangi atar.</p>
        </div>

        <div class="themed-card p-5 rounded-2xl border shadow-sm space-y-2">
          <div class="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-600 flex items-center justify-center mb-1">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
          </div>
          <h4 class="font-extrabold text-sm">Peta Digital 200 Lot GIS</h4>
          <p class="text-xs opacity-70 leading-relaxed">Sistem rekod digital plot tanah perkuburan teratur (Zon A & Zon B) memudahkan waris menziarahi makam arwah.</p>
        </div>

      </div>

      <!-- SECTION 4: PANDUAN PENGGUNAAN BAR NAVIGASI BAWAH (CALLOUT NOTE) -->
      <div class="p-5 sm:p-6 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 text-2xl">
            📱
          </div>
          <div>
            <h4 class="font-black text-sm uppercase tracking-wide text-emerald-400">Gunakan Menu Navigasi Bawah</h4>
            <p class="text-xs text-slate-300 mt-0.5 leading-relaxed">
              Semua urusan rasmi (Carian Resit, Peta 200 Lot Kubur, Pendaftaran Baru & Panel Admin) boleh diakses secara langsung melalui <strong>Bar Navigasi Bawah</strong> di skrin anda.
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2 flex-shrink-0">
          <button onclick="navigateTo('cemetery')" class="px-3.5 py-2 text-xs font-bold rounded-xl bg-white/10 hover:bg-white/20 transition flex items-center gap-1.5">
            <span>💚 Peta Kubur</span>
          </button>
          <button onclick="navigateTo('form')" class="px-3.5 py-2 text-xs font-extrabold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm flex items-center gap-1.5">
            <span>+ Daftar Baru</span>
          </button>
        </div>
      </div>

      <!-- FOOTER ATTRIBUTION -->
      <div class="text-center py-2 text-xs opacity-60">
        <p class="font-semibold">Dibangun oleh Ts. Hj Nor Azhar Abdul Hamid | Copyright 2026</p>
      </div>

    </section>`;

// Replace old view-landing
const viewLandingRegex = /<section id="view-landing"[\s\S]*?<\/section>/;
content = content.replace(viewLandingRegex, newLandingHtml);


// ============================================================================
// 2. MAKE BOTTOM NAVIGATION USE NOTCHED ONLY (REMOVE STYLE SWITCHER & OTHERS)
// ============================================================================

const notchedOnlyMarkup = `  <!-- ========================================================================= -->
  <!-- FLOATING BOTTOM NAVIGATION DOCK (ORGANIC CURVED NOTCH & FLOATING DOT ONLY)  -->
  <!-- ========================================================================= -->
  <div id="bottomNavWrapper" class="bnav-float-wrapper no-print">
    
    <!-- Mini Discreet Audio Control -->
    <div class="flex items-center justify-end mb-1 px-3">
      <button onclick="toggleBNavSound()" id="bnavSoundBtn" class="flex items-center gap-1 bg-slate-900/80 dark:bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-[10px] text-white hover:bg-slate-800 transition shadow-lg" title="Maklumbalas Audio Haptik">
        <span id="bnavSoundIcon">🔊</span>
        <span class="font-bold hidden sm:inline" id="bnavSoundLabel">Audio</span>
      </button>
    </div>

    <!-- NOTCHED CONTAINER -->
    <div id="bnavContainer-notch" class="relative w-full h-[76px] filter drop-shadow-[0_18px_32px_rgba(0,0,0,0.18)]">
      <!-- Dynamic SVG Notched Path Background -->
      <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 440 76" preserveAspectRatio="none">
        <defs>
          <filter id="bnavGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="3.5" flood-color="#059669" flood-opacity="0.45"/>
          </filter>
        </defs>
        <!-- Background pill body with fluid concave notch -->
        <path id="bnavNotchPath" d="" class="fill-white dark:fill-slate-900 stroke-slate-200/90 dark:stroke-slate-800" stroke-width="1.2"/>
        <!-- Floating circular dot hovering in notch -->
        <circle id="bnavDot" cx="44" cy="11" r="5" class="fill-emerald-600 dark:fill-emerald-400" filter="url(#bnavGlow)"/>
      </svg>

      <!-- 5 Buttons -->
      <div id="bnavNotchButtons" class="relative z-10 flex items-center justify-between w-full h-full px-2 pt-1.5">
        
        <!-- Tab 0: Home / Utama -->
        <button onclick="handleBottomNavClick(0)" class="bnav-tab-btn flex-1 h-full flex flex-col items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold focus:outline-none group">
          <svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 10.5L12 3l9 7.5v9a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 19.5v-9z"/>
          </svg>
          <span class="text-[10px] tracking-tight mt-0.5 font-sans">Utama</span>
        </button>

        <!-- Tab 1: Search / Carian -->
        <button onclick="handleBottomNavClick(1)" class="bnav-tab-btn flex-1 h-full flex flex-col items-center justify-center text-slate-400 font-semibold focus:outline-none group">
          <svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
          </svg>
          <span class="text-[10px] tracking-tight mt-0.5 font-sans">Carian</span>
        </button>

        <!-- Tab 2: Cemetery / Peta Kubur -->
        <button onclick="handleBottomNavClick(2)" class="bnav-tab-btn flex-1 h-full flex flex-col items-center justify-center text-slate-400 font-semibold focus:outline-none group">
          <svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
          </svg>
          <span class="text-[10px] tracking-tight mt-0.5 font-sans">Peta Kubur</span>
        </button>

        <!-- Tab 3: Form / Daftar -->
        <button onclick="handleBottomNavClick(3)" class="bnav-tab-btn flex-1 h-full flex flex-col items-center justify-center text-slate-400 font-semibold focus:outline-none group">
          <svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
          </svg>
          <span class="text-[10px] tracking-tight mt-0.5 font-sans">Daftar</span>
        </button>

        <!-- Tab 4: Admin -->
        <button onclick="handleBottomNavClick(4)" class="bnav-tab-btn flex-1 h-full flex flex-col items-center justify-center text-slate-400 font-semibold focus:outline-none group">
          <svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
          </svg>
          <span class="text-[10px] tracking-tight mt-0.5 font-sans">Admin</span>
        </button>

      </div>
    </div>

  </div>`;

// Replace bottomNavWrapper
const bnavWrapperRegex = /<!-- =+ -->[\s\S]*?<div id="bottomNavWrapper"[\s\S]*?<\/div>[\s\S]*?<\/div>\s*<\/div>/;
if (bnavWrapperRegex.test(content)) {
  content = content.replace(bnavWrapperRegex, notchedOnlyMarkup);
} else {
  // alternative regex if structure slightly different
  const altRegex = /<div id="bottomNavWrapper"[\s\S]*?<\/div>\s*<\/div>/;
  content = content.replace(altRegex, notchedOnlyMarkup);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Update applied.');
