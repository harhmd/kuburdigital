-- =========================================================================
-- SISTEM PENGURUSAN JENAZAH & PETA KUBUR DIGITAL 200 LOT (KUBURDIGITAL)
-- MASJID AL-JAWAHIR, PENGKALAN BALAK, MELAKA
-- Database: postgreq18 | Prefix Table: KUD_xxx
-- =========================================================================

-- 1. Jadual Tetapan Sistem & Profil Masjid
CREATE TABLE IF NOT EXISTS "KUD_settings" (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Jadual Rekod Pendaftaran Jenazah & Resit Rasmi
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

-- 3. Jadual 200 Plot Tanah Perkuburan Islam Digital (GIS Zon A & Zon B)
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

-- 4. Jadual Log Audit Transaksi Pentadbir
CREATE TABLE IF NOT EXISTS "KUD_audit_logs" (
    id SERIAL PRIMARY KEY,
    action VARCHAR(100) NOT NULL,
    details JSONB,
    ip_address VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for lightning fast queries
CREATE INDEX IF NOT EXISTS "idx_kud_records_ref" ON "KUD_records"(ref);
CREATE INDEX IF NOT EXISTS "idx_kud_records_nama_simati" ON "KUD_records"(nama_simati);
CREATE INDEX IF NOT EXISTS "idx_kud_cemetery_lots_num" ON "KUD_cemetery_lots"(lot_num);
CREATE INDEX IF NOT EXISTS "idx_kud_cemetery_lots_status" ON "KUD_cemetery_lots"(status);
CREATE INDEX IF NOT EXISTS "idx_kud_cemetery_lots_zone" ON "KUD_cemetery_lots"(zone);

-- Insert Default Settings
INSERT INTO "KUD_settings" (key, value)
VALUES 
    ('mosque_info', '{"name": "MASJID AL-JAWAHIR", "location": "Pengkalan Balak, 78300 Masjid Tanah, Melaka", "phone": "012-423 7697", "coordinator": "Ts. Hj Nor Azhar Abdul Hamid"}'::jsonb),
    ('app_version', '{"version": "2.6.0", "build": "2026-KUD-V1", "name": "KuburDigital"}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();

-- Insert Initial Seed Record
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
