import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PORT = 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

createServer(async (req, res) => {
  const urlPath = req.url.split('?')[0];
  const decoded = decodeURIComponent(urlPath);
  // Resolve "/" or any path ending in "/" to its index.html (matches Netlify default)
  const resolved = (decoded === '/' || decoded.endsWith('/'))
    ? join(decoded, 'index.html')
    : decoded;
  let filePath = join(__dirname, resolved);

  try {
    let data;
    try {
      data = await readFile(filePath);
    } catch {
      // Fall back to /<path>/index.html if the bare path 404s and has no extension
      if (!extname(filePath)) {
        filePath = join(__dirname, decoded, 'index.html');
        data = await readFile(filePath);
      } else {
        throw new Error('not found');
      }
    }
    const ext = extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'no-cache' });
    res.end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(`404 Not Found: ${urlPath}`);
  }
}).listen(PORT, () => {
  console.log(`✓ Design Recruitment server running at http://localhost:${PORT}`);
});
