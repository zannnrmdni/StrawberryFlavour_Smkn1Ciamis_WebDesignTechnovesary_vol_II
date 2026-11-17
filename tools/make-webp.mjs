/**
 * Konversi pelat SVG menjadi WebP untuk <picture>.
 * SVG tetap disimpan sebagai fallback dan sumber yang bisa diperbesar.
 * Jalankan: node tools/make-webp.mjs
 */
import { readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const jobs = [
  { dir: join(root, 'public', 'assets', 'img', 'galeri'), width: 640, height: 480, quality: 82 },
  { dir: join(root, 'public', 'assets', 'img', 'artikel'), width: 1200, height: 600, quality: 82 },
];

let count = 0;

for (const job of jobs) {
  for (const name of readdirSync(job.dir)) {
    if (!name.endsWith('.svg')) continue;
    const source = join(job.dir, name);
    if (!statSync(source).isFile()) continue;
    const target = source.replace(/\.svg$/i, '.webp');
    await sharp(source, { density: 144 })
      .resize(job.width, job.height, { fit: 'cover' })
      .webp({ quality: job.quality, effort: 5 })
      .toFile(target);
    count += 1;
  }
}

console.log(`Ditulis ${count} berkas WebP`);
