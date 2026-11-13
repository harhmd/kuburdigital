# KuburDigital — Sistem Pengurusan Jenazah & Peta Kubur Digital 200 Lot
### MASJID AL-JAWAHIR, PENGKALAN BALAK, Melaka

Aplikasi moden berasaskan web untuk pengurusan jenazah, pemetaan digital 200 lot tanah perkuburan Islam (GIS Zon A & Zon B), penjanaan resit rasmi berformat A4 dengan kod QR, serta integrasi pangkalan data PostgreSQL 18.

---

## 🌟 Ciri-ciri Utama

- **Reka Bentuk Pastel Bento:** Antara muka moden inspirasi iOS Bento dengan palet warna pastel (Lavender, Butter, Sage Mint, Terracotta Peach) dan mod tema fleksibel (Pastel, Warisan Hijau, Moden Sivik, Noktah Malam).
- **Peta Digital 200 Lot Kubur:** Pemetaan interaktif GIS berzon (Zon A: Lot 1–100, Zon B: Lot 101–200) dengan penunjuk status (Kosong, Terisi, Ditempah) dan carian pantas.
- **Resit Rasmi A4 & Kod QR:** Penjanaan resit berkomputer patuh syariah lengkap dengan jadual perincian bayaran dan kod QR pengesahan.
- **Penyegerakan Dwi-Mod (Online & Offline):** Beroperasi secara automatik dengan pangkalan data PostgreSQL 18 melalui REST API, dengan keupayaan sandaran `localStorage` semasa luar talian.
- **Sedia untuk Coolify VPS:** Dilengkapi dengan `Dockerfile` dan `docker-compose.yml` untuk deployment terus ke Coolify dengan sokongan Let's Encrypt SSL (`sslip.io`).

---

## 🗄️ Struktur Pangkalan Data (`postgreq18` | Awalan `KUD_xxx`)

Semua jadual menggunakan awalan **`KUD_`**:

1. **`KUD_records`**: Rekod pendaftaran jenazah, butiran waris, no. kubur, pecahan bayaran, dan jumlah amaun.
2. **`KUD_cemetery_lots`**: Maklumat status, baris, zon, dan tarikh bagi 200 plot kubur.
3. **`KUD_settings`**: Maklumat kariah, profil masjid, dan konfigurasi sistem.
4. **`KUD_audit_logs`**: Log aktiviti dan tindakan pentadbir.

Skrip skema lengkap boleh dirujuk di `schema_kud.sql`.

---

## 🚀 Deployment ke Coolify VPS

1. **Repository:** `https://github.com/harhmd/kuburdigital.git`
2. **Project Name:** `kuburdigital`
3. **Database:** `postgreq18` (PostgreSQL 18)
4. **Environment Variables:**
   ```env
   NODE_ENV=production
   PORT=3000
   HOST=0.0.0.0
   DATABASE_URL=postgresql://postgres:PG18_Admin_9a8f7d@postgres18-xqromzklsqsmfiaqiz6hbe3d:5432/postgreq18
   ```
5. **Build Pack:** `Dockerfile`

---

## 💻 Menjalankan Secara Setempat (Local Development)

```bash
# Pasang kebergantungan
npm install

# Jalankan pelayan aplikasi
npm start
```

Layari aplikasi di pelayar web: `http://localhost:3000` atau `http://localhost:8080`.

---

**Dibangunkan oleh Ts. Hj Nor Azhar Abdul Hamid | Copyright 2026**
