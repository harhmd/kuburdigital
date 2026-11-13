const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. ADD CSS STYLES FOR BOTTOM NAV BAR
const bnavStyles = `
    /* ========================================================================= */
    /* ULTRA-MODERN FLOATING BOTTOM NAVIGATION BAR (3 VARIANTS)                 */
    /* ========================================================================= */
    .bnav-float-wrapper {
      position: fixed;
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 50;
      width: 95%;
      max-width: 440px;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    @media (min-width: 640px) {
      .bnav-float-wrapper {
        bottom: 1.5rem;
      }
    }

    /* Style 1: Underline Indicator */
    .bnav-indicator-line {
      transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.3s ease;
    }

    /* Style 2: SVG Organic Notched Path & Floating Dot */
    #bnavNotchPath {
      transition: d 0.38s cubic-bezier(0.34, 1.4, 0.64, 1);
    }
    #bnavDot {
      transition: cx 0.38s cubic-bezier(0.34, 1.4, 0.64, 1);
    }

    /* Style 3: Soft Capsule Pill Highlight */
    .bnav-indicator-capsule {
      transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), width 0.3s ease;
    }

    /* Interactive Tab Buttons */
    .bnav-tab-btn {
      transition: color 0.25s ease, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .bnav-tab-btn:active {
      transform: scale(0.91);
    }
`;

// Insert styles right before </style>
if (!content.includes('.bnav-float-wrapper')) {
  content = content.replace('</style>', `${bnavStyles}\n  </style>`);
}

// 2. ENSURE MAIN HAS AMPLE BOTTOM PADDING FOR FLOATING DOCK
content = content.replace(
  '<main class="flex-grow flex flex-col justify-center items-center p-3 sm:p-6 w-full max-w-7xl mx-auto">',
  '<main class="flex-grow flex flex-col justify-start items-center p-3 sm:p-6 pb-36 sm:pb-44 w-full max-w-7xl mx-auto">'
);

console.log('Step 1 & 2 applied.');
fs.writeFileSync(filePath, content, 'utf8');
