const fs = require('fs');
const html = fs.readFileSync('C:\\Users\\USER\\.gemini\\antigravity\\scratch\\sistem-pengurusan-jenazah\\index.html', 'utf8');

// Verify all script blocks
const scriptRegex = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let count = 0;
while ((match = scriptRegex.exec(html)) !== null) {
  count++;
  try {
    new Function(match[1]);
    console.log(`Script block ${count} syntax OK.`);
  } catch (err) {
    console.error(`Script block ${count} error:`, err);
    process.exit(1);
  }
}
console.log('All script blocks valid!');
