const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const BASE_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

process.on('uncaughtException', (err) => {
  console.error('Catched Exception:', err.message);
});
process.on('unhandledRejection', (reason) => {
  console.error('Catched Rejection:', reason);
});

const server = http.createServer((req, res) => {
  req.on('error', (err) => console.error('Req error:', err.message));
  res.on('error', (err) => console.error('Res error:', err.message));

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  let cleanUrl = decodeURI(req.url.split('?')[0]);
  if (cleanUrl === '/' || cleanUrl === '') {
    cleanUrl = '/index.html';
  }

  const safePath = path.normalize(cleanUrl).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(BASE_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
      return res.end(`
        <body style="font-family:system-ui;padding:40px;background:#0f172a;color:#f8fafc;text-align:center;">
          <h1>404 - Fail Tidak Dijumpai</h1>
          <p>Fail <code>${cleanUrl}</code> tidak wujud dalam pelayan.</p>
          <div style="margin-top:20px;">
            <a href="/index.html" style="color:#10b981;margin-right:20px;">Sistem Pengurusan Jenazah</a>
            <a href="/bottom-nav-design.html" style="color:#38bdf8;">Bottom Nav Showcase</a>
          </div>
        </body>
      `);
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    const stream = fs.createReadStream(filePath);
    stream.on('error', (streamErr) => {
      console.error('Stream error:', streamErr.message);
      if (!res.headersSent) {
        res.writeHead(500);
        res.end('Internal Server Error');
      }
    });
    stream.pipe(res);
  });
});

server.on('error', (err) => {
  console.error('Server error:', err.message);
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} sedang digunakan. Sila periksa proses.`);
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Pelayan Tempatan Aktif:`);
  console.log(`- http://localhost:${PORT}/index.html`);
  console.log(`- http://localhost:${PORT}/bottom-nav-design.html`);
});
