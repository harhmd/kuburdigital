const fs = require('fs');
const html = fs.readFileSync('C:\\Users\\USER\\.gemini\\antigravity\\scratch\\sistem-pengurusan-jenazah\\index.html', 'utf8');

const sections = ['view-landing', 'view-search', 'view-cemetery', 'view-form', 'view-receipt', 'view-admin'];
sections.forEach(s => {
  if (!html.includes(`id="${s}"`)) {
    console.error(`Missing section: ${s}`);
    process.exit(1);
  } else {
    console.log(`Section found: ${s}`);
  }
});

if (!html.includes('id="bottomNavWrapper"')) {
  console.error('Missing bottomNavWrapper');
  process.exit(1);
} else {
  console.log('bottomNavWrapper found.');
}

if (!html.includes('id="bnavContainer-notch"')) {
  console.error('Missing bnavContainer-notch');
  process.exit(1);
} else {
  console.log('bnavContainer-notch found.');
}

console.log('ALL INTEGRITY CHECKS PASSED!');
