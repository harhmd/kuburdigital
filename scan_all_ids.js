const fs = require('fs');
const html = fs.readFileSync('C:\\Users\\USER\\.gemini\\antigravity\\scratch\\sistem-pengurusan-jenazah\\index.html', 'utf8');

// Find all document.getElementById('...') calls
const getElRegex = /document\.getElementById\(['"]([^'"]+)['"]\)/g;
let match;
const allIds = new Set();
while ((match = getElRegex.exec(html)) !== null) {
  allIds.add(match[1]);
}

console.log(`Found ${allIds.size} unique IDs called via getElementById.`);

const missing = [];
for (const id of allIds) {
  if (!html.includes(`id="${id}"`)) {
    missing.push(id);
  }
}

if (missing.length === 0) {
  console.log('ALL getElementById calls have matching elements in HTML!');
} else {
  console.log('MISSING IDs:', missing);
}
