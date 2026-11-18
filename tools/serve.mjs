/**
 * Server statis kecil untuk pratinjau lokal.
 * Jalankan: npm run serve lalu buka http://localhost:4173/
 * Alamat yang tidak ada akan menampilkan 404.html dengan status 404.
 */
import http from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize, sep } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.PORT || 4173);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon'
};

function resolve(urlPath) {
  let pathname = decodeURIComponent(urlPath.split('?')[0]);
  if (pathname.endsWith('/')) pathname += 'index.html';
  const target = normalize(join(root, pathname));
  if (!target.startsWith(root + sep) && target !== root) return null;
  return target;
}

http.createServer((request, response) => {
  const target = resolve(request.url || '/');
  if (!target || !existsSync(target) || !statSync(target).isFile()) {
    const notFound = join(root, '404.html');
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    createReadStream(notFound).pipe(response);
    return;
  }

  response.writeHead(200, {
    'Content-Type': types[extname(target).toLowerCase()] || 'application/octet-stream',
    'Cache-Control': 'no-cache'
  });
  createReadStream(target).pipe(response);
}).listen(port, () => {
  console.log(`Bumi Bawah: http://localhost:${port}/`);
});
