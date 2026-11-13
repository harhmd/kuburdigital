const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// ============================================================================
// 1. FLOATING BOTTOM NAVIGATION BAR HTML (3 STYLES FROM USER IMAGE)
// ============================================================================

const bottomNavMarkup = `
  <!-- ========================================================================= -->
  <!-- FLOATING BOTTOM NAVIGATION DOCK (RESPONSIVE & ALL 3 DESIGN MODES)          -->
  <!-- ========================================================================= -->
  <div id="bottomNavWrapper" class="bnav-float-wrapper no-print">
    
    <!-- Mini Controls Pill: Style Switcher & Audio Haptic -->
    <div class="flex items-center justify-between mb-2 px-3">
      <div class="flex items-center gap-1 bg-slate-900/80 dark:bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-[10px] text-white shadow-lg">
        <span class="opacity-60 font-semibold mr-1">Reka Bentuk:</span>
        <button onclick="setBNavStyle('notch')" id="bnav-tab-notch" class="px-2 py-0.5 rounded-full font-bold bg-white text-slate-900 transition shadow-sm">2. Lekuk Notched</button>
        <button onclick="setBNavStyle('capsule')" id="bnav-tab-capsule" class="px-2 py-0.5 rounded-full font-bold opacity-75 hover:opacity-100 transition">3. Kapsul Pil</button>
        <button onclick="setBNavStyle('underline')" id="bnav-tab-underline" class="px-2 py-0.5 rounded-full font-bold opacity-75 hover:opacity-100 transition">1. Garis</button>
      </div>

      <!-- Haptic sound toggle button -->
      <button onclick="toggleBNavSound()" id="bnavSoundBtn" class="flex items-center gap-1 bg-slate-900/80 dark:bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-[10px] text-white hover:bg-slate-800 transition shadow-lg" title="Maklumbalas Audio Haptik">
        <span id="bnavSoundIcon">🔊</span>
        <span class="font-bold hidden sm:inline" id="bnavSoundLabel">Audio</span>
      </button>
    </div>

    <!-- ======================================================================= -->
    <!-- VARIANT 2: ORGANIC CURVED NOTCH & FLOATING DOT (DEFAULT ACTIVE)        -->
    <!-- ======================================================================= -->
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
        <!-- Floating circular dot -->
        <circle id="bnavDot" cx="44" cy="11" r="5" class="fill-emerald-600 dark:fill-emerald-400" filter="url(#bnavGlow)"/>
      </svg>

      <!-- 5 Buttons for Style 2 -->
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

        <!-- Tab 2: Cemetery / Peta Kubur (Heart/Memorial Icon) -->
        <button onclick="handleBottomNavClick(2)" class="bnav-tab-btn flex-1 h-full flex flex-col items-center justify-center text-slate-400 font-semibold focus:outline-none group">
          <svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
          </svg>
          <span class="text-[10px] tracking-tight mt-0.5 font-sans">Peta Kubur</span>
        </button>

        <!-- Tab 3: Form / Daftar (Bell Icon) -->
        <button onclick="handleBottomNavClick(3)" class="bnav-tab-btn flex-1 h-full flex flex-col items-center justify-center text-slate-400 font-semibold focus:outline-none group">
          <svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
          </svg>
          <span class="text-[10px] tracking-tight mt-0.5 font-sans">Daftar</span>
        </button>

        <!-- Tab 4: Admin (Profile Icon) -->
        <button onclick="handleBottomNavClick(4)" class="bnav-tab-btn flex-1 h-full flex flex-col items-center justify-center text-slate-400 font-semibold focus:outline-none group">
          <svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
          </svg>
          <span class="text-[10px] tracking-tight mt-0.5 font-sans">Admin</span>
        </button>

      </div>
    </div>

    <!-- ======================================================================= -->
    <!-- VARIANT 3: SOFT CAPSULE PILL HIGHLIGHT                                  -->
    <!-- ======================================================================= -->
    <div id="bnavContainer-capsule" class="hidden relative w-full h-[72px] bg-white dark:bg-slate-900 rounded-[34px] shadow-[0_20px_45px_-10px_rgba(0,0,0,0.18)] p-2 px-3 border border-slate-200/90 dark:border-slate-800 flex items-center justify-between">
      <!-- Sliding capsule background -->
      <div id="bnavCapsule" class="bnav-indicator-capsule absolute top-2 bottom-2 left-0 bg-emerald-500/15 dark:bg-emerald-400/20 rounded-[24px] pointer-events-none border border-emerald-500/20"></div>
      
      <div id="bnavCapsuleButtons" class="relative z-10 flex items-center justify-between w-full h-full">
        <!-- Tab 0: Home -->
        <button onclick="handleBottomNavClick(0)" class="bnav-tab-btn flex-1 h-full flex flex-col items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold focus:outline-none group">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 10.5L12 3l9 7.5v9a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 19.5v-9z"/>
          </svg>
          <span class="text-[10px] tracking-tight mt-0.5">Utama</span>
        </button>

        <!-- Tab 1: Search -->
        <button onclick="handleBottomNavClick(1)" class="bnav-tab-btn flex-1 h-full flex flex-col items-center justify-center text-slate-400 font-semibold focus:outline-none group">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
          </svg>
          <span class="text-[10px] tracking-tight mt-0.5">Carian</span>
        </button>

        <!-- Tab 2: Cemetery -->
        <button onclick="handleBottomNavClick(2)" class="bnav-tab-btn flex-1 h-full flex flex-col items-center justify-center text-slate-400 font-semibold focus:outline-none group">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
          </svg>
          <span class="text-[10px] tracking-tight mt-0.5">Peta Kubur</span>
        </button>

        <!-- Tab 3: Form -->
        <button onclick="handleBottomNavClick(3)" class="bnav-tab-btn flex-1 h-full flex flex-col items-center justify-center text-slate-400 font-semibold focus:outline-none group">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
          </svg>
          <span class="text-[10px] tracking-tight mt-0.5">Daftar</span>
        </button>

        <!-- Tab 4: Admin -->
        <button onclick="handleBottomNavClick(4)" class="bnav-tab-btn flex-1 h-full flex flex-col items-center justify-center text-slate-400 font-semibold focus:outline-none group">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
          </svg>
          <span class="text-[10px] tracking-tight mt-0.5">Admin</span>
        </button>
      </div>
    </div>

    <!-- ======================================================================= -->
    <!-- VARIANT 1: MINIMAL UNDERLINE SLIDER (ICON ONLY)                         -->
    <!-- ======================================================================= -->
    <div id="bnavContainer-underline" class="hidden relative w-full h-[64px] bg-white dark:bg-slate-900 rounded-[34px] shadow-[0_20px_45px_-10px_rgba(0,0,0,0.18)] p-2 px-4 border border-slate-200/90 dark:border-slate-800 flex items-center justify-between">
      <!-- Sliding underline bar -->
      <div id="bnavUnderline" class="bnav-indicator-line absolute bottom-2 left-0 h-[4px] w-8 bg-emerald-600 dark:bg-emerald-400 rounded-full pointer-events-none shadow-sm"></div>
      
      <div id="bnavUnderlineButtons" class="relative z-10 flex items-center justify-between w-full h-full">
        <!-- Tab 0: Home -->
        <button onclick="handleBottomNavClick(0)" class="bnav-tab-btn flex-1 h-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 focus:outline-none group" title="Utama">
          <svg class="w-6 h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 10.5L12 3l9 7.5v9a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 19.5v-9z"/>
          </svg>
        </button>

        <!-- Tab 1: Search -->
        <button onclick="handleBottomNavClick(1)" class="bnav-tab-btn flex-1 h-full flex items-center justify-center text-slate-400 focus:outline-none group" title="Carian">
          <svg class="w-6 h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
          </svg>
        </button>

        <!-- Tab 2: Cemetery -->
        <button onclick="handleBottomNavClick(2)" class="bnav-tab-btn flex-1 h-full flex items-center justify-center text-slate-400 focus:outline-none group" title="Peta Kubur">
          <svg class="w-6 h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
          </svg>
        </button>

        <!-- Tab 3: Form -->
        <button onclick="handleBottomNavClick(3)" class="bnav-tab-btn flex-1 h-full flex items-center justify-center text-slate-400 focus:outline-none group" title="Daftar">
          <svg class="w-6 h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
          </svg>
        </button>

        <!-- Tab 4: Admin -->
        <button onclick="handleBottomNavClick(4)" class="bnav-tab-btn flex-1 h-full flex items-center justify-center text-slate-400 focus:outline-none group" title="Admin">
          <svg class="w-6 h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
          </svg>
        </button>
      </div>
    </div>

  </div>
`;

// Insert bottom nav markup right before </body>
if (!content.includes('id="bottomNavWrapper"')) {
  content = content.replace('</body>', `${bottomNavMarkup}\n</body>`);
}

console.log('Markup inserted.');
fs.writeFileSync(filePath, content, 'utf8');
