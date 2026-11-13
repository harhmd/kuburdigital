const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// Replace old navigateTo function with the comprehensive one
const oldNavigateRegex = /function navigateTo\(viewId\) \{[\s\S]*?if \(viewId === 'admin'\) \{[\s\S]*?\}[\s\S]*?\}/;

const newNavigateCode = `
    let bnavActiveIndex = 0;
    let bnavActiveStyle = 'notch'; // 'notch' (Variant 2), 'capsule' (Variant 3), 'underline' (Variant 1)

    function navigateTo(viewId) {
      const viewIds = ['landing', 'search', 'cemetery', 'form', 'receipt', 'admin'];
      viewIds.forEach(id => {
        const el = document.getElementById(\`view-\${id}\`);
        if (el) el.classList.add('hidden');
      });

      const target = document.getElementById(\`view-\${viewId}\`);
      if (target) {
        target.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      // Sync Bottom Navigation Bar
      const viewToNavIndex = {
        landing: 0,
        search: 1,
        receipt: 1,
        cemetery: 2,
        form: 3,
        admin: 4
      };
      if (viewToNavIndex[viewId] !== undefined) {
        syncBottomNavIndicator(viewToNavIndex[viewId]);
      }

      if (viewId === 'cemetery') {
        renderCemeteryMap();
      } else if (viewId === 'search') {
        handleLiveSearch();
      } else if (viewId === 'admin') {
        switchAdminTab(adminActiveTab);
        updateGSheetUIStatus();
      }
    }
`;

content = content.replace(oldNavigateRegex, newNavigateCode);

// Add the bottom nav controller logic and search handlers right before the end of the script tag
const bottomNavScript = `
    // =========================================================================
    // BOTTOM NAVIGATION BAR CONTROLLER (3 INTERACTIVE DESIGN VARIANTS)
    // =========================================================================
    let bnavSoundEnabled = true;
    let bnavAudioCtx = null;

    function playBNavHaptic(freq = 420, duration = 0.035) {
      if (!bnavSoundEnabled) return;
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!bnavAudioCtx) bnavAudioCtx = new AudioContext();
        if (bnavAudioCtx.state === 'suspended') bnavAudioCtx.resume();

        const osc = bnavAudioCtx.createOscillator();
        const gain = bnavAudioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, bnavAudioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.5, bnavAudioCtx.currentTime + duration);

        gain.gain.setValueAtTime(0.09, bnavAudioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, bnavAudioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(bnavAudioCtx.destination);
        osc.start();
        osc.stop(bnavAudioCtx.currentTime + duration);
      } catch (e) {}
    }

    function toggleBNavSound() {
      bnavSoundEnabled = !bnavSoundEnabled;
      const icon = document.getElementById('bnavSoundIcon');
      const label = document.getElementById('bnavSoundLabel');
      if (bnavSoundEnabled) {
        icon.textContent = '🔊';
        if (label) label.textContent = 'Audio';
        showToast('Maklumbalas audio haptik diaktifkan', 'info');
        playBNavHaptic(520, 0.04);
      } else {
        icon.textContent = '🔇';
        if (label) label.textContent = 'Bisu';
        showToast('Maklumbalas audio ditenangkan', 'info');
      }
    }

    function generateNotchPath(notchCenterX, w = 440, h = 76, r = 34) {
      const scoopHalfWidth = 26;
      const scoopDepth = 15;
      const leftScoop = Math.max(r, notchCenterX - scoopHalfWidth);
      const rightScoop = Math.min(w - r, notchCenterX + scoopHalfWidth);

      let d = 'M ' + r + ' 0 ';
      d += 'L ' + leftScoop + ' 0 ';
      d += 'C ' + (leftScoop + 10) + ' 0, ' + (notchCenterX - 14) + ' ' + scoopDepth + ', ' + notchCenterX + ' ' + scoopDepth + ' ';
      d += 'C ' + (notchCenterX + 14) + ' ' + scoopDepth + ', ' + (rightScoop - 10) + ' 0, ' + rightScoop + ' 0 ';
      d += 'L ' + (w - r) + ' 0 ';
      d += 'A ' + r + ' ' + r + ' 0 0 1 ' + w + ' ' + r + ' ';
      d += 'L ' + w + ' ' + (h - r) + ' ';
      d += 'A ' + r + ' ' + r + ' 0 0 1 ' + (w - r) + ' ' + h + ' ';
      d += 'L ' + r + ' ' + h + ' ';
      d += 'A ' + r + ' ' + r + ' 0 0 1 0 ' + (h - r) + ' ';
      d += 'L 0 ' + r + ' ';
      d += 'A ' + r + ' ' + r + ' 0 0 1 ' + r + ' 0 ';
      d += 'Z';
      return d;
    }

    function updateBNavNotch(index) {
      const btnGroup = document.getElementById('bnavNotchButtons');
      if (!btnGroup) return;
      const buttons = btnGroup.querySelectorAll('.bnav-tab-btn');
      const notchPathElem = document.getElementById('bnavNotchPath');
      const dotElem = document.getElementById('bnavDot');
      if (!buttons[index]) return;

      const targetBtn = buttons[index];
      const targetRect = targetBtn.getBoundingClientRect();
      const groupRect = btnGroup.getBoundingClientRect();

      const relativeRatio = ((targetRect.left - groupRect.left) + (targetRect.width / 2)) / groupRect.width;
      const notchCenterX = Math.round(relativeRatio * 440);

      notchPathElem.setAttribute('d', generateNotchPath(notchCenterX, 440, 76, 34));
      dotElem.setAttribute('cx', notchCenterX);
      dotElem.setAttribute('cy', '11');

      buttons.forEach((btn, i) => {
        if (i === index) {
          btn.className = 'bnav-tab-btn flex-1 h-full flex flex-col items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold focus:outline-none group';
        } else {
          btn.className = 'bnav-tab-btn flex-1 h-full flex flex-col items-center justify-center text-slate-400 font-semibold focus:outline-none group';
        }
      });
    }

    function updateBNavCapsule(index) {
      const btnGroup = document.getElementById('bnavCapsuleButtons');
      if (!btnGroup) return;
      const buttons = btnGroup.querySelectorAll('.bnav-tab-btn');
      const capsule = document.getElementById('bnavCapsule');
      if (!buttons[index] || !capsule) return;

      const targetBtn = buttons[index];
      const btnLeft = targetBtn.offsetLeft;
      const btnWidth = targetBtn.offsetWidth;

      capsule.style.width = \`\${btnWidth - 8}px\`;
      capsule.style.transform = \`translateX(\${btnLeft + 4}px)\`;

      buttons.forEach((btn, i) => {
        if (i === index) {
          btn.className = 'bnav-tab-btn flex-1 h-full flex flex-col items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold focus:outline-none group';
        } else {
          btn.className = 'bnav-tab-btn flex-1 h-full flex flex-col items-center justify-center text-slate-400 font-semibold focus:outline-none group';
        }
      });
    }

    function updateBNavUnderline(index) {
      const btnGroup = document.getElementById('bnavUnderlineButtons');
      if (!btnGroup) return;
      const buttons = btnGroup.querySelectorAll('.bnav-tab-btn');
      const underline = document.getElementById('bnavUnderline');
      if (!buttons[index] || !underline) return;

      const targetBtn = buttons[index];
      const btnCenterX = targetBtn.offsetLeft + (targetBtn.offsetWidth / 2);
      const indicatorWidth = 32;

      underline.style.transform = \`translateX(\${btnCenterX - (indicatorWidth / 2)}px)\`;

      buttons.forEach((btn, i) => {
        if (i === index) {
          btn.className = 'bnav-tab-btn flex-1 h-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 focus:outline-none group';
        } else {
          btn.className = 'bnav-tab-btn flex-1 h-full flex items-center justify-center text-slate-400 focus:outline-none group';
        }
      });
    }

    function syncBottomNavIndicator(index) {
      bnavActiveIndex = index;
      if (bnavActiveStyle === 'notch') {
        updateBNavNotch(index);
      } else if (bnavActiveStyle === 'capsule') {
        updateBNavCapsule(index);
      } else if (bnavActiveStyle === 'underline') {
        updateBNavUnderline(index);
      }
    }

    function handleBottomNavClick(index) {
      playBNavHaptic(420, 0.035);

      if (index === 0) {
        navigateTo('landing');
      } else if (index === 1) {
        navigateTo('search');
      } else if (index === 2) {
        navigateTo('cemetery');
      } else if (index === 3) {
        navigateTo('form');
      } else if (index === 4) {
        openAdminModal('records');
      }
    }

    function setBNavStyle(styleName) {
      bnavActiveStyle = styleName;
      playBNavHaptic(520, 0.04);

      const notchContainer = document.getElementById('bnavContainer-notch');
      const capsuleContainer = document.getElementById('bnavContainer-capsule');
      const underlineContainer = document.getElementById('bnavContainer-underline');

      const btnNotch = document.getElementById('bnav-tab-notch');
      const btnCapsule = document.getElementById('bnav-tab-capsule');
      const btnUnderline = document.getElementById('bnav-tab-underline');

      [notchContainer, capsuleContainer, underlineContainer].forEach(c => c && c.classList.add('hidden'));
      [btnNotch, btnCapsule, btnUnderline].forEach(b => {
        if (b) {
          b.className = 'px-2 py-0.5 rounded-full font-bold opacity-75 hover:opacity-100 transition';
        }
      });

      if (styleName === 'notch') {
        notchContainer.classList.remove('hidden');
        btnNotch.className = 'px-2 py-0.5 rounded-full font-bold bg-white text-slate-900 transition shadow-sm';
        setTimeout(() => updateBNavNotch(bnavActiveIndex), 20);
      } else if (styleName === 'capsule') {
        capsuleContainer.classList.remove('hidden');
        btnCapsule.className = 'px-2 py-0.5 rounded-full font-bold bg-white text-slate-900 transition shadow-sm';
        setTimeout(() => updateBNavCapsule(bnavActiveIndex), 20);
      } else if (styleName === 'underline') {
        underlineContainer.classList.remove('hidden');
        btnUnderline.className = 'px-2 py-0.5 rounded-full font-bold bg-white text-slate-900 transition shadow-sm';
        setTimeout(() => updateBNavUnderline(bnavActiveIndex), 20);
      }

      showToast('Gaya Bottom Navigation ditukar', 'info');
    }

    // Live Search Handlers
    function handleLiveSearch() {
      const query = (document.getElementById('liveSearchInput')?.value || '').trim().toLowerCase();
      const countEl = document.getElementById('searchResultCount');
      const container = document.getElementById('searchResultsList');
      if (!container) return;

      container.innerHTML = '';

      const matched = recordsDB.filter(r => {
        if (!query) return true;
        const refMatch = (r.ref || '').toLowerCase().includes(query);
        const nameMatch = (r.namaSimati || '').toLowerCase().includes(query);
        const warisMatch = (r.namaWaris || '').toLowerCase().includes(query);
        const lotMatch = (r.lotKubur || '').toLowerCase().includes(query);
        const kpMatch = (r.noKematian || '').toLowerCase().includes(query);
        return refMatch || nameMatch || warisMatch || lotMatch || kpMatch;
      });

      if (countEl) {
        countEl.textContent = query 
          ? \`Carian "\${query}": \${matched.length} Rekod Dijumpai\`
          : \`Memaparkan Semua Rekod Kariah (\${matched.length})\`;
      }

      if (matched.length === 0) {
        container.innerHTML = \`
          <div class="text-center py-10 p-6 rounded-2xl bg-black/5 border border-dashed border-black/10">
            <svg class="w-10 h-10 opacity-30 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <p class="text-xs font-bold opacity-70">Tiada rekod kematian dijumpai padan dengan carian tersebut.</p>
            <p class="text-[11px] opacity-50 mt-1">Sila semak ejaan nama arwah atau no. rujukan resit rasmi.</p>
          </div>
        \`;
        return;
      }

      matched.forEach(rec => {
        const card = document.createElement('div');
        card.className = 'p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-black/20 hover:border-emerald-500/50 shadow-sm transition flex flex-col sm:flex-row sm:items-center justify-between gap-3';
        
        card.innerHTML = \`
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-mono font-black flex items-center justify-center flex-shrink-0 text-xs">
              \${rec.lotKubur ? rec.lotKubur.replace('LOT ', '') : 'LOT'}
            </div>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-extrabold text-sm">\${rec.namaSimati}</h4>
                <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">\${rec.ref}</span>
              </div>
              <div class="flex items-center gap-3 text-[11px] opacity-70 mt-1 flex-wrap">
                <span>📅 Tarikh: <b>\${formatDateDisplay(rec.tarikhKematian)}</b></span>
                <span>📍 <b>\${rec.lotKubur || 'Belum Ditetap'}</b></span>
                <span>👤 Waris: <b>\${rec.namaWaris}</b> (\${rec.telefonWaris})</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2 sm:self-center">
            <span class="text-xs font-mono font-extrabold text-emerald-700 dark:text-emerald-400 mr-2">RM \${(rec.totalAmount || 0).toFixed(2)}</span>
            <button onclick="previewSavedRecord('\${rec.ref}')" class="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 transition shadow-sm">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              <span>Papar Resit</span>
            </button>
          </div>
        \`;
        container.appendChild(card);
      });
    }

    function fillQuickSearch(term) {
      const input = document.getElementById('liveSearchInput');
      if (input) {
        input.value = term;
        handleLiveSearch();
      }
    }

    // Auto initialize bottom navigation bar when DOM is ready
    window.addEventListener('resize', () => {
      syncBottomNavIndicator(bnavActiveIndex);
    });

    setTimeout(() => {
      syncBottomNavIndicator(0);
    }, 150);
`;

content = content.replace('</body>', `<script>${bottomNavScript}</script>\n</body>`);

console.log('Script updated.');
fs.writeFileSync(filePath, content, 'utf8');
