/**
 * Minifikasi modul JS ke *.min.js dan menulis ulang impor relatif.
 * Jalankan setelah mengubah berkas di public/assets/js:
 *   npm run js:build
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { minify } from 'terser';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const jsDir = join(root, 'public', 'assets', 'js');

const entries = [
  ['main.js', 'app.min.js'],
  ['earth.js', 'earth.min.js'],
  ['journey.js', 'journey.min.js'],
  ['cutaway.js', 'cutaway.min.js'],
  ['article.js', 'article.min.js'],
  ['gallery.js', 'gallery.min.js'],
  ['contact.js', 'contact.min.js'],
  ['admin.js', 'admin.min.js'],
];

for (const [source, target] of entries) {
  const code = readFileSync(join(jsDir, source), 'utf8');
  const result = await minify(code, {
    module: true,
    compress: {
      passes: 2,
      pure_getters: true,
    },
    mangle: true,
    format: {
      comments: false,
      ascii_only: false,
    },
  });

  if (typeof result.code !== 'string') {
    throw new Error(`Gagal meminifikasi ${source}`);
  }

  const rewritten = result.code.replace(
    /(['"])(\.\/[a-z0-9-]+)\.js\1/g,
    (_match, quote, path) => `${quote}${path}.min.js${quote}`
  );

  writeFileSync(join(jsDir, target), `${rewritten}\n`, 'utf8');
  console.log(`${source} -> ${target} (${Buffer.byteLength(rewritten)} bita)`);
}
