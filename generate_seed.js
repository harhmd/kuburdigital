const fs = require('fs');
const path = require('path');

const sampleNames = [
  'Hj. Ismail Bin Kassim', 'Hj. Ahmad Bin Ali', 'Hjh. Aminah Binti Hassan', 'Mohd Farhan Bin Ismail',
  'Zulkepli Bin Ramli', 'Siti Fatimah Binti Daud', 'Haji Abdullah Bin Omar', 'Kalsom Binti Ali',
  'Wan Azmi Bin Wan Daud', 'Che Som Binti Hashim', 'Abdul Razak Bin Bakar', 'Mariam Binti Salleh',
  'Mohd Noor Bin Yusof', 'Noraini Binti Mat', 'Hj. Harun Bin Che Teh', 'Zainab Binti Osman',
  'Ibrahim Bin Mansor', 'Kamariah Binti Jaafar', 'Mohd Yusoff Bin Kadir', 'Halimah Binti Ahmad',
  'Shamsuddin Bin Latif', 'Rokiah Binti Md Zin', 'Alias Bin Mahmud', 'Salmah Binti Idris',
  'Othman Bin Abdul Hamid', 'Khadijah Binti Isa', 'Mustafa Bin Hashim', 'Hasnah Binti Sulaiman',
  'Mahmud Bin Zakaria', 'Rosnah Binti Kassim', 'Aziz Bin Mohamed', 'Zubaidah Binti Yahya'
];

let sql = 'BEGIN;\n';
for (let i = 1; i <= 200; i++) {
  const zone = i <= 100 ? 'Zon A' : 'Zon B';
  const rel = i <= 100 ? i : i - 100;
  const row = Math.ceil(rel / 10);
  const lotFull = `LOT ${i} (R: ${row})`;
  const lotLabel = `LOT ${i}`;
  const id = `lot_${i}`;

  let status = 'available';
  let deceasedName = '';
  let burialDate = 'NULL';
  let warisName = '';
  let warisPhone = '';
  let ref = '';

  if (i === 76) {
    status = 'occupied';
    deceasedName = 'Hj. Ismail Bin Kassim';
    burialDate = "'2026-09-18'";
    warisName = 'Mohd Farhan Bin Ismail';
    warisPhone = '0194451234';
    ref = 'MAJ-2026-0006';
  } else if (i === 77) {
    status = 'available';
  } else if (i <= 135) {
    status = 'occupied';
    const name = sampleNames[i % sampleNames.length];
    deceasedName = name;
    const yr = 2020 + (i % 6);
    const mo = String(1 + (i % 12)).padStart(2, '0');
    const dy = String(1 + (i % 28)).padStart(2, '0');
    burialDate = `'${yr}-${mo}-${dy}'`;
    warisName = 'Waris ' + name.split(' ')[0];
    warisPhone = '01' + (2 + (i % 8)) + '-' + (1000000 + (i * 38291) % 8999999);
    ref = `MAJ-${yr}-${String(i).padStart(4, '0')}`;
  } else if (i >= 136 && i <= 145) {
    status = 'reserved';
    warisName = 'Tempahan Kariah Pengkalan Balak';
    warisPhone = '012-5558899';
  }

  const cleanName = deceasedName.replace(/'/g, "''");
  const cleanWaris = warisName.replace(/'/g, "''");

  sql += `INSERT INTO "KUD_cemetery_lots" (id, lot_num, lot_label, lot_full, zone, row, status, deceased_name, burial_date, waris_name, waris_phone, ref) VALUES ('${id}', ${i}, '${lotLabel}', '${lotFull}', '${zone}', ${row}, '${status}', '${cleanName}', ${burialDate}, '${cleanWaris}', '${warisPhone}', '${ref}') ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status, deceased_name = EXCLUDED.deceased_name, burial_date = EXCLUDED.burial_date;\n`;
}
sql += 'COMMIT;\n';

const outPath = path.join(__dirname, 'seed_200_lots.sql');
fs.writeFileSync(outPath, sql);
console.log('Successfully written seed_200_lots.sql, lines:', sql.split('\n').length);
