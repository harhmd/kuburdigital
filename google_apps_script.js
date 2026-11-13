/**
 * ==========================================================================
 * SISTEM PENGURUSAN JENAZAH DIGITAL - MASJID BANDAR TEKNOLOGI KAJANG, SEMENYIH
 * GOOGLE APPS SCRIPT WEB APP ENDPOINT UNTUK GOOGLE SHEETS
 * ==========================================================================
 * 
 * CARA MEMASANG (2 MINIT):
 * 1. Buka Google Sheet baharu anda di https://sheets.google.com
 * 2. Namakan Google Sheet anda (contoh: "Rekod Jenazah Masjid Bandar Teknologi Kajang 2026")
 * 3. Klik menu atas: Extensions > Apps Script (Sambungan > Apps Script)
 * 4. Padam semua kod sedia ada dalam editor dan tampal (paste) keseluruhan kod di bawah.
 * 5. Klik butang "Save" (ikon cakera liut).
 * 6. Klik butang biru "Deploy" (Guna) di bahagian atas kanan > pilih "New deployment" (Gunaan baharu).
 * 7. Pada jenis gunaan, klik ikon gear > pilih "Web app" (Aplikasi web).
 * 8. Tetapkan:
 *    - Description: "Sistem Jenazah API"
 *    - Execute as: "Me (emel anda)"
 *    - Who has access: "Anyone" (Sesiapa sahaja) <-- PENTING!
 * 9. Klik "Deploy", luluskan kebenaran (Review Permissions > Advanced > Go to Untitled (unsafe) > Allow).
 * 10. Salin "Web app URL" (bermula dengan https://script.google.com/macros/s/.../exec)
 *     dan masukkan ke dalam Tetapan Google Sheets di aplikasi anda!
 */

const SHEET_NAME = "RekodJenazah";

// Tajuk lajur rasmi Google Sheet
const HEADERS = [
  "Tarikh Daftar",
  "No Rujukan",
  "Nama Simati",
  "Nama Waris",
  "No Telefon Waris",
  "Tarikh Kematian",
  "No LOT Kubur",
  "No Kematian Kariah",
  "Alamat Penuh",
  "Pegawai Bertugas",
  "Perkara Bayaran",
  "Jumlah (RM)",
  "Sijil Izin Pengebumian",
  "Sijil Kematian JPN",
  "Status Resit"
];

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Format Header Row
    sheet.appendRow(HEADERS);
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#064e3b");
    headerRange.setFontColor("#ffffff");
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, HEADERS.length);
  }
  return sheet;
}

// Handler GET: Digunakan untuk menarik semua data rekod ke sistem
function doGet(e) {
  try {
    const sheet = getOrCreateSheet();
    const rows = sheet.getDataRange().getValues();
    
    if (rows.length <= 1) {
      return createJsonResponse({ status: "success", count: 0, records: [] });
    }

    const records = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row[1]) continue; // Abaikan jika tiada no rujukan

      // Parse perkara bayaran
      let parsedItems = [];
      try {
        parsedItems = JSON.parse(row[10] || "[]");
      } catch (err) {
        parsedItems = [{ name: String(row[10] || "Pengurusan Jenazah"), amount: Number(row[11]) || 0 }];
      }

      records.push({
        createdAt: row[0],
        ref: row[1],
        namaSimati: row[2],
        namaWaris: row[3],
        telefonWaris: String(row[4]),
        tarikhKematian: row[5],
        lotKubur: row[6],
        noKematian: row[7],
        alamatPenuh: row[8],
        pegawai: row[9],
        items: parsedItems,
        totalAmount: Number(row[11]) || 0,
        fileIzinName: row[12] || null,
        fileJPNName: row[13] || null,
        status: row[14] || "DISAHKAN"
      });
    }

    return createJsonResponse({
      status: "success",
      count: records.length,
      records: records
    });
  } catch (error) {
    return createJsonResponse({
      status: "error",
      message: error.toString()
    });
  }
}

// Handler POST: Digunakan untuk menambah atau mengemaskini rekod jenazah
function doPost(e) {
  try {
    const sheet = getOrCreateSheet();
    let data;
    
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter && e.parameter.data) {
      data = JSON.parse(e.parameter.data);
    } else {
      data = e.parameter;
    }

    if (!data || !data.ref) {
      return createJsonResponse({ status: "error", message: "Data tidak lengkap: Tiada No Rujukan." });
    }

    // Format item ringkasan
    const itemsJson = JSON.stringify(data.items || []);

    const rowData = [
      data.createdAt || new Date().toLocaleString("ms-MY"),
      data.ref,
      data.namaSimati || "",
      data.namaWaris || "",
      data.telefonWaris || "",
      data.tarikhKematian || "",
      data.lotKubur || "",
      data.noKematian || "",
      data.alamatPenuh || "",
      data.pegawai || "",
      itemsJson,
      Number(data.totalAmount) || 0,
      data.fileIzinName || "Tiada",
      data.fileJPNName || "Tiada",
      "DISAHKAN SISTEM DIGITAL"
    ];

    // Semak sama ada no rujukan telah wujud (kemaskini jika wujud, tambah jika baharu)
    const allData = sheet.getDataRange().getValues();
    let existingRowIndex = -1;
    for (let r = 1; r < allData.length; r++) {
      if (allData[r][1] === data.ref) {
        existingRowIndex = r + 1; // 1-based index
        break;
      }
    }

    if (existingRowIndex > 0) {
      sheet.getRange(existingRowIndex, 1, 1, rowData.length).setValues([rowData]);
    } else {
      sheet.appendRow(rowData);
    }

    // Auto fit formatting
    sheet.autoResizeColumns(1, HEADERS.length);

    return createJsonResponse({
      status: "success",
      message: "Rekod berjaya disimpan ke Google Sheet!",
      ref: data.ref
    });
  } catch (error) {
    return createJsonResponse({
      status: "error",
      message: error.toString()
    });
  }
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
