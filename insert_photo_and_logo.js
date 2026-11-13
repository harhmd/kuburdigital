const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. UPDATE HEADER LOGO
const oldHeaderLogo = `<div class="w-11 h-11 rounded-xl bg-white/10 border border-white/20 p-2 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-200">
          <svg class="w-7 h-7 text-amber-400 drop-shadow" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8 2 4 5 4 8c0 1.25.5 2.4 1.34 3.28C4.5 12.16 4 13.5 4 15c0 3.31 3.58 6 8 6s8-2.69 8-6c0-1.5-.5-2.84-1.34-3.72C19.5 10.4 20 9.25 20 8c0-3-4-6-8-6zm0 2c2.5 0 5 1.5 5 4 0 .73-.3 1.41-.83 1.93l-.47.47.38.56C16.63 11.77 17 12.83 17 14c0 2.21-2.69 4-6 4s-6-1.79-6-4c0-1.17.37-2.23.92-3.04l.38-.56-.47-.47C5.3 9.41 5 8.73 5 8c0-2.5 2.5-4 6-4zm0 4a2 2 0 100 4 2 2 0 000-4z"/>
          </svg>
        </div>`;

const newHeaderLogo = `<div class="w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200 overflow-hidden border border-white/30 flex-shrink-0">
          <img src="logo-masjid.png" alt="Logo Masjid" class="w-full h-full object-contain">
        </div>`;

content = content.replace(oldHeaderLogo, newHeaderLogo);

// 2. UPDATE HERO LOGO IN VIEW-LANDING
const oldHeroLogo = `<div class="inline-flex p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-3 shadow-xl">
            <svg class="w-12 h-12 text-amber-400 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8 2 4 5 4 8c0 1.25.5 2.4 1.34 3.28C4.5 12.16 4 13.5 4 15c0 3.31 3.58 6 8 6s8-2.69 8-6c0-1.5-.5-2.84-1.34-3.72C19.5 10.4 20 9.25 20 8c0-3-4-6-8-6zm0 2c2.5 0 5 1.5 5 4 0 .73-.3 1.41-.83 1.93l-.47.47.38.56C16.63 11.77 17 12.83 17 14c0 2.21-2.69 4-6 4s-6-1.79-6-4c0-1.17.37-2.23.92-3.04l.38-.56-.47-.47C5.3 9.41 5 8.73 5 8c0-2.5 2.5-4 6-4zm0 4a2 2 0 100 4 2 2 0 000-4z"/>
            </svg>
          </div>`;

const newHeroLogo = `<div class="inline-flex p-2.5 rounded-3xl bg-white shadow-2xl border-2 border-amber-400/60 mb-3 w-24 h-24 items-center justify-center overflow-hidden">
            <img src="logo-masjid.png" alt="Logo Rasmi Masjid Bandar Teknologi Kajang" class="w-full h-full object-contain drop-shadow">
          </div>`;

content = content.replace(oldHeroLogo, newHeroLogo);

// 3. INSERT FEATURED MOSQUE PHOTO IN VIEW-LANDING
const featuredPhotoHtml = `
      <!-- FEATURED PHOTOGRAPH: MASJID BANDAR TEKNOLOGI KAJANG -->
      <div class="themed-card rounded-3xl overflow-hidden border shadow-premium relative group">
        <div class="relative h-64 sm:h-96 w-full overflow-hidden bg-slate-900">
          <img src="masjid-btk.png" alt="Bangunan Masjid Bandar Teknologi Kajang" class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700">
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
            <div class="flex items-center gap-2 mb-2 flex-wrap">
              <span class="text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-300 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-amber-400/30 flex items-center gap-1.5 shadow-sm">
                <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                Kompleks Rasmi Masjid
              </span>
              <span class="text-[10px] sm:text-xs font-bold text-white/90 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                Kariah Semenyih & Kajang
              </span>
            </div>
            <h3 class="text-xl sm:text-3xl font-black tracking-tight text-white drop-shadow-md">
              Masjid Bandar Teknologi Kajang
            </h3>
            <p class="text-xs sm:text-sm text-white/90 max-w-2xl mt-1 leading-relaxed drop-shadow">
              Pusat ibadah dan pengurusan kebajikan kariah termasuk fasiliti bilik pengurusan jenazah higienik moden, perkhidmatan van jenazah berhawa dingin, dan pemetaan 200 lot tanah perkuburan Islam digital.
            </p>
          </div>
        </div>
      </div>
`;

// Insert featuredPhotoHtml right after the hero banner in view-landing
if (!content.includes('src="masjid-btk.png"')) {
  const heroEndMarker = `        </div>
      </div>

      <!-- SECTION 1: TALIAN KECEMASAN 24 JAM & PEGAWAI KHIDMAT -->`;
  
  const heroEndWithPhoto = `        </div>
      </div>
${featuredPhotoHtml}
      <!-- SECTION 1: TALIAN KECEMASAN 24 JAM & PEGAWAI KHIDMAT -->`;
  
  content = content.replace(heroEndMarker, heroEndWithPhoto);
}

// 4. UPDATE RECEIPT EMBLEM WITH OFFICIAL LOGO
const oldReceiptLogo = `<div class="w-16 h-16 rounded-2xl bg-emerald-950 border-2 border-amber-500 flex items-center justify-center shadow-md flex-shrink-0">
              <svg class="w-10 h-10 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8 2 4 5 4 8c0 1.25.5 2.4 1.34 3.28C4.5 12.16 4 13.5 4 15c0 3.31 3.58 6 8 6s8-2.69 8-6c0-1.5-.5-2.84-1.34-3.72C19.5 10.4 20 9.25 20 8c0-3-4-6-8-6zm0 2c2.5 0 5 1.5 5 4 0 .73-.3 1.41-.83 1.93l-.47.47.38.56C16.63 11.77 17 12.83 17 14c0 2.21-2.69 4-6 4s-6-1.79-6-4c0-1.17.37-2.23.92-3.04l.38-.56-.47-.47C5.3 9.41 5 8.73 5 8c0-2.5 2.5-4 6-4zm0 4a2 2 0 100 4 2 2 0 000-4z"/>
              </svg>
            </div>`;

const newReceiptLogo = `<div class="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-white border-2 border-amber-500/80 p-1.5 flex items-center justify-center shadow-md flex-shrink-0">
              <img src="logo-masjid.png" alt="Logo Rasmi Masjid" class="w-full h-full object-contain">
            </div>`;

content = content.replace(oldReceiptLogo, newReceiptLogo);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Photo and logo successfully inserted.');
