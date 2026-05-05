import http from 'http';
import fs from 'fs';
import path from 'path';
import os from 'os';

const PORT = 3001;

const server = http.createServer((req, res) => {
    // CORS Ayarları
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url === '/scaffold' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const { name, template } = JSON.parse(body);
                const desktopPath = path.join(os.homedir(), 'Desktop');
                const projectPath = path.join(desktopPath, name);

                console.log(`🚀 [Server] Proje inşa ediliyor: ${projectPath}`);

                template.folders.forEach(f => {
                    const p = path.join(projectPath, f);
                    if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
                });

                template.files.forEach(f => {
                    const p = path.join(projectPath, f.path);
                    fs.mkdirSync(path.dirname(p), { recursive: true });
                    fs.writeFileSync(p, f.content);
                });

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
                console.log('✅ [Server] Başarıyla tamamlandı.');
            } catch (err) {
                console.error('❌ [Server] Hata:', err.message);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
            }
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`📡 Antigravity Backend: http://localhost:${PORT} üzerinde çalışıyor.`);
});
