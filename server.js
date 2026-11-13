/**
 * SISTEM PENGURUSAN JENAZAH & PETA KUBUR DIGITAL 200 LOT (KUBURDIGITAL)
 * MASJID AL-JAWAHIR, PENGKALAN BALAK, MELAKA
 * 
 * Production Node.js + Express + PostgreSQL 18 Server for Coolify VPS
 * Table Prefix: KUD_xxx
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Database Connection Setup
const dbUrl = process.env.DATABASE_URL || 'postgresql://postgres:PG18_Admin_9a8f7d@postgres18-xqromzklsqsmfiaqiz6hbe3d:5432/postgreq18';
let pool = null;

try {
  pool = new Pool({
    connectionString: dbUrl,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    connectionTimeoutMillis: 5000
  });
  pool.on('error', (err) => {
    console.error('PostgreSQL unexpected error:', err.message);
  });
} catch (err) {
  console.warn('PostgreSQL pool initialization failed, continuing in fallback mode:', err.message);
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Static Asset Serving
app.use(express.static(path.join(__dirname), {
  maxAge: '1h',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// 200 Cemetery Lots Sample Names
const SAMPLE_DECEASED_NAMES = [
  'Hj. Ismail Bin Kassim', 'Hj. Ahmad Bin Ali', 'Hjh. Aminah Binti Hassan', 'Mohd Farhan Bin Ismail',
  'Zulkepli Bin Ramli', 'Siti Fatimah Binti Daud', 'Haji Abdullah Bin Omar', 'Kalsom Binti Ali',
  'Wan Azmi Bin Wan Daud', 'Che Som Binti Hashim', 'Abdul Razak Bin Bakar', 'Mariam Binti Salleh',
  'Mohd Noor Bin Yusof', 'Noraini Binti Mat', 'Hj. Harun Bin Che Teh', 'Zainab Binti Osman',
  'Ibrahim Bin Mansor', 'Kamariah Binti Jaafar', 'Mohd Yusoff Bin Kadir', 'Halimah Binti Ahmad',
  'Shamsuddin Bin Latif', 'Rokiah Binti Md Zin', 'Alias Bin Mahmud', 'Salmah Binti Idris',
  'Othman Bin Abdul Hamid', 'Khadijah Binti Isa', 'Mustafa Bin Hashim', 'Hasnah Binti Sulaiman',
  'Mahmud Bin Zakaria', 'Rosnah Binti Kassim', 'Aziz Bin Mohamed', 'Zubaidah Binti Yahya'
];

// Database Auto-Initialization Function (Creates KUD_xxx tables & seeds 200 lots)
async function initDatabase() {
  if (!pool) return;
  try {
    const client = await pool.connect();
    try {
      console.log('Connected to PostgreSQL 18. Initializing KUD_xxx tables...');
      
      // 1. Settings Table
      await client.query(`
        CREATE TABLE IF NOT EXISTS "KUD_settings" (
          key VARCHAR(100) PRIMARY KEY,
          value JSONB NOT NULL,
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      // 2. Records Table
      await client.query(`
        CREATE TABLE IF NOT EXISTS "KUD_records" (
          id SERIAL PRIMARY KEY,
          ref VARCHAR(50) UNIQUE NOT NULL,
          nama_simati TEXT NOT NULL,
          nama_waris TEXT NOT NULL,
          telefon_waris VARCHAR(30) NOT NULL,
          tarikh_kematian DATE NOT NULL,
          no_kematian VARCHAR(50),
          lot_kubur VARCHAR(50),
          alamat_penuh TEXT,
          pegawai TEXT,
          items JSONB DEFAULT '[]'::jsonb,
          total_amount NUMERIC(10,2) NOT NULL DEFAULT 0.00,
          status VARCHAR(30) DEFAULT 'disahkan',
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      // 3. Cemetery Lots Table
      await client.query(`
        CREATE TABLE IF NOT EXISTS "KUD_cemetery_lots" (
          id VARCHAR(50) PRIMARY KEY,
          lot_num INT NOT NULL,
          lot_label VARCHAR(30) NOT NULL,
          lot_full VARCHAR(50) NOT NULL,
          zone VARCHAR(20) NOT NULL,
          row INT NOT NULL,
          status VARCHAR(20) NOT NULL DEFAULT 'available',
          deceased_name TEXT DEFAULT '',
          burial_date DATE,
          waris_name TEXT DEFAULT '',
          waris_phone VARCHAR(30) DEFAULT '',
          ref VARCHAR(50) DEFAULT '',
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      // 4. Audit Logs Table
      await client.query(`
        CREATE TABLE IF NOT EXISTS "KUD_audit_logs" (
          id SERIAL PRIMARY KEY,
          action VARCHAR(100) NOT NULL,
          details JSONB,
          ip_address VARCHAR(50),
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      // Check if lots need seeding
      const lotsCountRes = await client.query('SELECT COUNT(*) FROM "KUD_cemetery_lots"');
      const count = parseInt(lotsCountRes.rows[0].count, 10);
      if (count === 0) {
        console.log('Seeding 200 cemetery lots into KUD_cemetery_lots...');
        for (let i = 1; i <= 200; i++) {
          const zone = i <= 100 ? 'Zon A' : 'Zon B';
          const relativeNum = i <= 100 ? i : i - 100;
          const row = Math.ceil(relativeNum / 10);
          const lotFull = `LOT ${i} (R: ${row})`;
          const lotLabel = `LOT ${i}`;
          const id = `lot_${i}`;

          let status = 'available';
          let deceasedName = '';
          let burialDate = null;
          let warisName = '';
          let warisPhone = '';
          let ref = '';

          if (i === 76) {
            status = 'occupied';
            deceasedName = 'Hj. Ismail Bin Kassim';
            burialDate = '2026-09-18';
            warisName = 'Mohd Farhan Bin Ismail';
            warisPhone = '0194451234';
            ref = 'MAJ-2026-0006';
          } else if (i === 77) {
            status = 'available';
          } else if (i <= 135) {
            status = 'occupied';
            const name = SAMPLE_DECEASED_NAMES[i % SAMPLE_DECEASED_NAMES.length];
            deceasedName = name;
            const yr = 2020 + (i % 6);
            const mo = String(1 + (i % 12)).padStart(2, '0');
            const dy = String(1 + (i % 28)).padStart(2, '0');
            burialDate = `${yr}-${mo}-${dy}`;
            warisName = 'Waris ' + name.split(' ')[0];
            warisPhone = '01' + (2 + (i % 8)) + '-' + (1000000 + (i * 38291) % 8999999);
            ref = `MAJ-${yr}-${String(i).padStart(4, '0')}`;
          } else if (i >= 136 && i <= 145) {
            status = 'reserved';
            warisName = 'Tempahan Kariah Pengkalan Balak';
            warisPhone = '012-5558899';
          }

          await client.query(`
            INSERT INTO "KUD_cemetery_lots" (id, lot_num, lot_label, lot_full, zone, row, status, deceased_name, burial_date, waris_name, waris_phone, ref)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            ON CONFLICT (id) DO NOTHING
          `, [id, i, lotLabel, lotFull, zone, row, status, deceasedName, burialDate, warisName, warisPhone, ref]);
        }
        console.log('Successfully seeded 200 cemetery lots into KUD_cemetery_lots!');
      }

      // Check seed record
      const recordCountRes = await client.query('SELECT COUNT(*) FROM "KUD_records"');
      if (parseInt(recordCountRes.rows[0].count, 10) === 0) {
        await client.query(`
          INSERT INTO "KUD_records" (ref, nama_simati, nama_waris, telefon_waris, tarikh_kematian, no_kematian, lot_kubur, alamat_penuh, pegawai, items, total_amount, status)
          VALUES (
            'MAJ-2026-0006',
            'Hj. Ismail Bin Kassim',
            'Mohd Farhan Bin Ismail',
            '0194451234',
            '2026-09-18',
            'L-86',
            'LOT 76 (R: 2)',
            'No 14, Kampung Pengkalan Balak, 78300 Masjid Tanah, Melaka',
            'Haji Abdullah Bin Omar (Bendahari Masjid)',
            '[{"name": "Saguhati Mandi / Set Jenazah", "amount": 500}, {"name": "Keranda", "amount": 300}, {"name": "Saguhati Korek Liang", "amount": 250}, {"name": "Van Jenazah", "amount": 150}, {"name": "Solat Jenazah", "amount": 0}]'::jsonb,
            1200.00,
            'disahkan'
          )
          ON CONFLICT (ref) DO NOTHING;
        `);
      }

      console.log('KUD_xxx database ready and verified.');
    } finally {
      client.release();
    }
  } catch (err) {
    console.warn('PostgreSQL initialization warning (app will use local fallback):', err.message);
  }
}

// -------------------------------------------------------------
// REST API ROUTES (PREFIX: /api)
// -------------------------------------------------------------

// Health check endpoint
app.get('/api/health', async (req, res) => {
  let dbStatus = 'disconnected';
  if (pool) {
    try {
      await pool.query('SELECT 1');
      dbStatus = 'connected';
    } catch (e) {
      dbStatus = 'error: ' + e.message;
    }
  }
  res.json({
    status: 'ok',
    project: 'kuburdigital',
    mosque: 'MASJID AL-JAWAHIR, PENGKALAN BALAK, Melaka',
    table_prefix: 'KUD_xxx',
    database_status: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// GET all records
app.get('/api/records', async (req, res) => {
  if (!pool) return res.status(503).json({ error: 'Database not configured' });
  try {
    const result = await pool.query('SELECT * FROM "KUD_records" ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new record
app.post('/api/records', async (req, res) => {
  if (!pool) return res.status(503).json({ error: 'Database not configured' });
  try {
    const r = req.body;
    const query = `
      INSERT INTO "KUD_records" 
      (ref, nama_simati, nama_waris, telefon_waris, tarikh_kematian, no_kematian, lot_kubur, alamat_penuh, pegawai, items, total_amount, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *;
    `;
    const values = [
      r.ref,
      r.namaSimati || r.nama_simati,
      r.namaWaris || r.nama_waris,
      r.telefonWaris || r.telefon_waris,
      r.tarikhKematian || r.tarikh_kematian,
      r.noKematian || r.no_kematian,
      r.lotKubur || r.lot_kubur,
      r.alamatPenuh || r.alamat_penuh,
      r.pegawai,
      JSON.stringify(r.items || []),
      parseFloat(r.totalAmount || r.total_amount || 0),
      r.status || 'disahkan'
    ];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all 200 cemetery lots
app.get('/api/lots', async (req, res) => {
  if (!pool) return res.status(503).json({ error: 'Database not configured' });
  try {
    const result = await pool.query('SELECT * FROM "KUD_cemetery_lots" ORDER BY lot_num ASC');
    // Map snake_case to camelCase for frontend compatibility
    const mapped = result.rows.map(row => ({
      id: row.id,
      lotNum: row.lot_num,
      lotLabel: row.lot_label,
      lotFull: row.lot_full,
      zone: row.zone,
      row: row.row,
      status: row.status,
      deceasedName: row.deceased_name || '',
      burialDate: row.burial_date ? row.burial_date.toISOString().split('T')[0] : '',
      warisName: row.waris_name || '',
      warisPhone: row.waris_phone || '',
      ref: row.ref || ''
    }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a cemetery lot
app.put('/api/lots/:id', async (req, res) => {
  if (!pool) return res.status(503).json({ error: 'Database not configured' });
  try {
    const { id } = req.params;
    const { status, deceasedName, burialDate, warisName, warisPhone, ref } = req.body;
    const query = `
      UPDATE "KUD_cemetery_lots"
      SET status = COALESCE($1, status),
          deceased_name = COALESCE($2, deceased_name),
          burial_date = COALESCE($3, burial_date),
          waris_name = COALESCE($4, waris_name),
          waris_phone = COALESCE($5, waris_phone),
          ref = COALESCE($6, ref),
          updated_at = NOW()
      WHERE id = $7
      RETURNING *;
    `;
    const result = await pool.query(query, [status, deceasedName, burialDate || null, warisName, warisPhone, ref, id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Lot not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// RESET lots to default
app.post('/api/lots/reset', async (req, res) => {
  if (!pool) return res.status(503).json({ error: 'Database not configured' });
  try {
    await pool.query('DELETE FROM "KUD_cemetery_lots"');
    await initDatabase();
    res.json({ message: '200 cemetery lots successfully regenerated in KUD_cemetery_lots' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, HOST, async () => {
  console.log(`====================================================`);
  console.log(`KUBURDIGITAL - MASJID AL-JAWAHIR, PENGKALAN BALAK`);
  console.log(`Pelayan Berjalan di: http://${HOST}:${PORT}`);
  console.log(`Prefix Jadual Pangkalan Data: KUD_xxx`);
  console.log(`====================================================`);
  await initDatabase();
});
