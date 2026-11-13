const fs = require('fs');
const html = fs.readFileSync('C:\\Users\\USER\\.gemini\\antigravity\\scratch\\sistem-pengurusan-jenazah\\index.html', 'utf8');

const ids = [
  'cemeterySearchInput',
  'cemeteryFilterZone',
  'cemeteryFilterRow',
  'cemeteryStatTotal',
  'cemeteryStatOccupied',
  'cemeteryStatAvailable',
  'cemeteryStatReserved',
  'cemeteryStatUsage',
  'badgeCemeteryTotal',
  'badgeRecordsTotal',
  'cemeteryShowingCount',
  'cemeteryGridContainer'
];

ids.forEach(id => {
  const found = html.includes(`id="${id}"`);
  console.log(`${id}: ${found ? 'FOUND' : 'MISSING!'}`);
});
