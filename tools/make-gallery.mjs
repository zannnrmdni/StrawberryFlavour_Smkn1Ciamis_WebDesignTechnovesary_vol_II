/**
 * Generator pelat ilustrasi galeri.
 * Bahasa visual sama dengan ilustrasi penanda: bidang warna datar dari palet,
 * garis tinta 3 px, sudut membulat, tanpa teks di dalam gambar.
 * Jalankan: node tools/make-gallery.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public', 'assets', 'img', 'galeri');
mkdirSync(out, { recursive: true });

const c = {
  ink: '#16262B',
  paper: '#FFF6E6',
  sky: '#BFE4F5',
  leaf: '#86C254',
  humus: '#7B4B2A',
  sand: '#F3C64F',
  clay: '#DE7A45',
  rock: '#557187',
  crust: '#A9423A',
  mantle: '#F26A55',
};

const frame = (bg, inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="640" height="480" role="img">
<rect width="640" height="480" fill="${bg}"/>
<g fill="none" stroke="${c.ink}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
${inner.trim()}
</g>
</svg>
`;

const rain = (x, y, n = 5, gap = 26) =>
  Array.from({ length: n }, (_, i) => `<path d="M${x + i * gap} ${y + (i % 2) * 12}v26" opacity=".55"/>`).join('');

const leafShape = (x, y, w, h, rotate) =>
  `<path d="M${x} ${y}c${w * 0.45} ${-h} ${w} ${-h} ${w} 0c${-w * 0.45} ${h} ${-w} ${h} ${-w} 0z" transform="rotate(${rotate} ${x + w / 2} ${y})" fill="${c.leaf}"/>`;

const plates = {
  'hutan-leuser.svg': frame(c.sky, `
    <path d="M0 330c70-26 120 18 190-4s130 10 210-6 180 4 240-14v174H0z" fill="${c.humus}" stroke="none"/>
    <path d="M0 330c70-26 120 18 190-4s130 10 210-6 180 4 240-14" stroke-width="3.4"/>
    <path d="M96 330V150M96 226c-30-8-44-28-46-50 26 0 44 18 46 50zM96 186c28-10 44-30 44-54-26 2-42 22-44 54z" stroke="${c.humus}" stroke-width="7"/>
    <rect x="88" y="150" width="16" height="180" fill="${c.humus}" stroke="none"/>
    <path d="M96 300c-10 6-20 16-26 30M96 300c10 6 18 16 22 30" stroke-width="3"/>
    <path d="M250 330V210" stroke="${c.humus}" stroke-width="9"/>
    <path d="M250 250c30-14 50-40 50-70-30 2-48 28-50 70z" fill="${c.leaf}"/>
    <path d="M250 236c-30-10-48-34-48-62 28 0 46 24 48 62z" fill="${c.leaf}"/>
    <path d="M470 330V190" stroke="${c.humus}" stroke-width="10"/>
    ${leafShape(468, 210, 120, 46, 10)}
    ${leafShape(470, 250, 110, 42, -12)}
    <path d="M40 96c40-34 92-34 132 0" stroke="${c.paper}" stroke-width="6" opacity=".8"/>
    ${rain(120, 60, 5, 46)}
    <path d="M358 340c22-8 40 6 60-2s36 4 54-2" stroke="${c.sand}" stroke-width="4"/>
    <circle cx="330" cy="380" r="5" fill="${c.sand}" stroke="none"/>
    <circle cx="420" cy="404" r="4" fill="${c.paper}" stroke="none" opacity=".7"/>
    <circle cx="240" cy="400" r="3.4" fill="${c.paper}" stroke="none" opacity=".7"/>
  `),

  'profil-tanah.svg': frame(c.paper, `
    <rect x="90" y="70" width="460" height="66" fill="${c.leaf}" stroke="none"/>
    <rect x="90" y="136" width="460" height="84" fill="${c.humus}" stroke="none"/>
    <rect x="90" y="220" width="460" height="92" fill="${c.clay}" stroke="none"/>
    <rect x="90" y="312" width="460" height="72" fill="${c.sand}" stroke="none"/>
    <rect x="90" y="384" width="460" height="56" fill="${c.rock}" stroke="none"/>
    <rect x="90" y="70" width="460" height="370"/>
    <path d="M90 136h460M90 220h460M90 312h460M90 384h460" stroke-width="3.2"/>
    <path d="M120 70c8-20 30-30 54-26" stroke="${c.humus}" stroke-width="5"/>
    <path d="M160 70v44M160 92c14-2 22-10 24-22M160 104c-12-2-20-10-22-20" stroke="${c.humus}" stroke-width="4"/>
    <path d="M150 70c-2-26 10-42 28-50M150 54c-14-6-24-18-26-32M150 46c12-8 20-20 20-34" stroke="${c.leaf}" stroke-width="4"/>
    <path d="M420 136v70M420 160c18 4 28 16 30 34M420 186c-16 4-26 14-28 30" stroke="${c.sand}" stroke-width="4"/>
    <path d="M230 220c30-14 46 12 76 0s48 10 78-4" stroke="${c.paper}" stroke-width="3.4" opacity=".55"/>
    <path d="M180 340c28-12 48 10 78 0s52 12 84 0 60 8 92-4" stroke="${c.ink}" stroke-width="2.4" opacity=".35"/>
    <path d="M470 312l24 20-24 18" stroke-width="3"/>
    <circle cx="410" cy="360" r="5" fill="${c.humus}" stroke="none"/>
    <circle cx="300" cy="348" r="3.6" fill="${c.humus}" stroke="none"/>
    <path d="M560 96v328M556 120h10M556 200h10M556 300h10M556 390h10" stroke-width="2.4" opacity=".6"/>
  `),

  'akar-batu.svg': frame(c.sky, `
    <path d="M0 420h640v60H0z" fill="${c.sand}" stroke="none"/>
    <path d="M0 420h640" stroke-width="3"/>
    <path d="M70 420c-8-60 12-104 54-128 44-26 96-20 132 8 30 24 44 66 40 120z" fill="${c.rock}"/>
    <path d="M300 420c-6-74 16-124 66-146 52-22 108-8 138 32 24 34 30 74 24 114z" fill="${c.rock}" opacity=".92"/>
    <path d="M206 300l18 40-16 22 14 32" stroke="${c.paper}" stroke-width="4" opacity=".8"/>
    <path d="M470 300l-10 34 18 22-8 30" stroke="${c.paper}" stroke-width="4" opacity=".8"/>
    <path d="M290 420c6-70-16-116-52-140" stroke="${c.humus}" stroke-width="9"/>
    <path d="M238 280c-8 26 6 38 28 34M238 280c-20 4-34 18-38 40" stroke="${c.sand}" stroke-width="5"/>
    <path d="M300 268c10-24 30-34 54-30M300 268c-4-28-20-44-44-48" stroke="${c.humus}" stroke-width="4"/>
    <path d="M352 238c14-4 24-2 34 6" stroke="${c.leaf}" stroke-width="5"/>
    <path d="M96 200c30-18 62-18 92 0" stroke="${c.paper}" stroke-width="5" opacity=".6"/>
    <circle cx="500" cy="220" r="4" fill="${c.paper}" stroke="none" opacity=".6"/>
    <circle cx="140" cy="358" r="4" fill="${c.sand}" stroke="none"/>
  `),

  'gua-kapur.svg': frame(c.ink, `
    <path d="M0 0h640v480H0z" fill="${c.ink}" stroke="none"/>
    <path d="M0 480V210c0-96 76-166 180-166s180 70 180 166v270z" fill="${c.paper}" opacity=".12" stroke="none"/>
    <path d="M0 210c0-96 76-166 180-166s180 70 180 166" stroke="${c.sand}" stroke-width="7"/>
    <path d="M40 480V250c0-46 22-78 58-96M360 480V270c0-40-16-72-44-92" stroke="${c.rock}" stroke-width="5"/>
    <path d="M96 178l14 58 12-46 16 62 10-38 18 54 12-44 14 40" stroke="${c.paper}" stroke-width="7"/>
    <path d="M300 168l10 52 14-40 10 60 12-34 14 46 8-30" stroke="${c.paper}" stroke-width="7"/>
    <path d="M60 430c40-22 86-22 126 0s86 22 126 0 86-22 126 0 86 22 126 0v50H60z" fill="${c.sky}" opacity=".85" stroke="none"/>
    <path d="M60 430c40-22 86-22 126 0s86 22 126 0 86-22 126 0 86 22 126 0" stroke="${c.paper}" stroke-width="4"/>
    <path d="M210 120c-4 16-4 30 0 40 4-10 4-24 0-40z" fill="${c.sky}"/>
    <path d="M240 300c-4 14-4 26 0 34 4-8 4-20 0-34z" fill="${c.sky}"/>
    <circle cx="150" cy="330" r="4" fill="${c.sand}" stroke="none"/>
    <circle cx="330" cy="250" r="3" fill="${c.sand}" stroke="none"/>
    <circle cx="470" cy="390" r="5" fill="${c.sand}" stroke="none"/>
    <path d="M450 120c16 2 28 10 34 24" stroke="${c.rock}" stroke-width="4" opacity=".8"/>
  `),

  'mata-air.svg': frame(c.paper, `
    <path d="M0 300c60-70 130-104 210-100 80 4 130 44 190 46 70 2 140-30 240-6v240H0z" fill="${c.leaf}" opacity=".9" stroke="none"/>
    <path d="M0 300c60-70 130-104 210-100 80 4 130 44 190 46 70 2 140-30 240-6" stroke-width="3"/>
    <path d="M0 356c70-46 140-64 210-56 80 10 130 50 190 54 70 4 140-20 240-2v128H0z" fill="${c.sand}" stroke="none"/>
    <path d="M0 356c70-46 140-64 210-56 80 10 130 50 190 54 70 4 140-20 240-2" stroke-width="3"/>
    <path d="M0 412c70-28 140-38 210-30 80 10 130 32 190 34 70 4 140-10 240 0" stroke-width="3"/>
    <path d="M250 300c-4 34 6 52 32 54 28 2 40-18 36-54" fill="${c.rock}" stroke="none"/>
    <path d="M250 300c-4 34 6 52 32 54 28 2 40-18 36-54" stroke-width="3"/>
    <path d="M268 300v50M282 300v54M298 300v50" stroke="${c.paper}" stroke-width="3" opacity=".7"/>
    <path d="M254 348c-30 12-52 34-64 66 22-4 38-18 46-38 4 20 18 34 38 40-6-28-12-50-20-68z" fill="${c.sky}"/>
    <path d="M254 348c-30 12-52 34-64 66 22-4 38-18 46-38 4 20 18 34 38 40-6-28-12-50-20-68z" stroke-width="3"/>
    <path d="M120 360c10 18 12 38 6 60M360 380c14 12 20 28 18 44" stroke="${c.sky}" stroke-width="4" opacity=".8"/>
    <path d="M420 300c14-18 34-26 58-24" stroke="${c.humus}" stroke-width="4"/>
    <circle cx="470" cy="342" r="5" fill="${c.humus}" stroke="none"/>
    <circle cx="180" cy="420" r="4" fill="${c.paper}" stroke="none" opacity=".8"/>
  `),

  'batuan-terlipat.svg': frame(c.paper, `
    <path d="M0 150c80-60 160 40 240 0s160-70 240-20 100 40 160 20v330H0z" fill="${c.sand}" stroke="none"/>
    <path d="M0 150c80-60 160 40 240 0s160-70 240-20 100 40 160 20" stroke-width="3.4"/>
    <path d="M0 220c80-60 160 40 240 0s160-70 240-20 100 40 160 20" fill="${c.clay}" stroke="none" opacity=".85"/>
    <path d="M0 220c80-60 160 40 240 0s160-70 240-20 100 40 160 20" stroke-width="3.4"/>
    <path d="M0 292c80-60 160 40 240 0s160-70 240-20 100 40 160 20" fill="${c.rock}" stroke="none"/>
    <path d="M0 292c80-60 160 40 240 0s160-70 240-20 100 40 160 20" stroke-width="3.4"/>
    <path d="M0 364c80-60 160 40 240 0s160-70 240-20 100 40 160 20" fill="${c.crust}" stroke="none" opacity=".85"/>
    <path d="M0 364c80-60 160 40 240 0s160-70 240-20 100 40 160 20" stroke-width="3.4"/>
    <path d="M40 108c70-30 140 20 200-4" stroke="${c.humus}" stroke-width="4" opacity=".5"/>
    <path d="M300 430l24-40 22 40z" fill="${c.paper}" stroke-width="3"/>
    <path d="M340 430l18-28 18 28z" fill="${c.paper}" stroke-width="3"/>
    <circle cx="120" cy="392" r="4" fill="${c.paper}" stroke="none" opacity=".8"/>
    <circle cx="500" cy="404" r="3.4" fill="${c.paper}" stroke="none" opacity=".8"/>
  `),

  'tambang-emas.svg': frame(c.ink, `
    <path d="M0 430h640v50H0z" fill="${c.humus}" stroke="none"/>
    <path d="M0 430h640" stroke-width="3"/>
    <path d="M250 430V120l70-70 70 70v310" stroke="${c.sand}" stroke-width="8"/>
    <path d="M320 50v380" stroke="${c.sand}" stroke-width="4" stroke-dasharray="10 8"/>
    <path d="M280 190h80M280 250h80M280 310h80" stroke="${c.sand}" stroke-width="4"/>
    <path d="M250 120h140" stroke="${c.sand}" stroke-width="8"/>
    <circle cx="320" cy="90" r="14" fill="${c.sand}" stroke-width="3"/>
    <path d="M320 76v-16M320 104v16M304 90h-14M336 90h14" stroke="${c.sand}" stroke-width="3"/>
    <path d="M430 430V330h130M430 380h-90M430 330h-40" stroke="${c.rock}" stroke-width="5"/>
    <path d="M500 330v30h60v-30" stroke="${c.sand}" stroke-width="2.4" opacity=".5"/>
    <rect x="452" y="398" width="54" height="30" rx="3" fill="${c.sand}" stroke-width="3"/>
    <circle cx="464" cy="432" r="6" fill="${c.ink}" stroke="${c.sand}" stroke-width="3"/>
    <circle cx="494" cy="432" r="6" fill="${c.ink}" stroke="${c.sand}" stroke-width="3"/>
    <path d="M150 430V300h70v130M150 360h70M170 300v-40h30v40" stroke="${c.rock}" stroke-width="4"/>
    <path d="M60 200c20-14 44-14 64 0M520 150c18-12 40-12 56 0" stroke="${c.paper}" stroke-width="3" opacity=".4"/>
    <circle cx="120" cy="380" r="4" fill="${c.sand}" stroke="none"/>
    <circle cx="560" cy="390" r="3.4" fill="${c.sand}" stroke="none"/>
  `),

  'lava.svg': frame(c.ink, `
    <path d="M0 340c80-40 140 20 220 0s140-50 220-20 120 20 200 4v156H0z" fill="${c.humus}" stroke="none"/>
    <path d="M0 340c80-40 140 20 220 0s140-50 220-20 120 20 200 4" stroke-width="3"/>
    <path d="M120 480c10-50 34-84 72-102M240 480c6-64 30-104 70-122M420 480c-2-56 24-92 66-108M540 480c4-46 24-76 56-90" stroke="${c.mantle}" stroke-width="10" stroke-linecap="round"/>
    <path d="M120 480c10-50 34-84 72-102M240 480c6-64 30-104 70-122M420 480c-2-56 24-92 66-108M540 480c4-46 24-76 56-90" stroke="${c.sand}" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M80 330c30-18 62-18 92 0M330 318c28-14 54-14 78 0M470 340c22-12 46-12 68 0" stroke="${c.sand}" stroke-width="4" opacity=".8"/>
    <path d="M170 250c-10-22-4-46 14-64M200 240c-4-18 2-34 16-46M440 210c-8-20-2-40 14-56M470 200c-4-16 2-30 14-40" stroke="${c.paper}" stroke-width="5" opacity=".55"/>
    <circle cx="328" cy="300" r="6" fill="${c.mantle}" stroke="${c.sand}" stroke-width="3"/>
    <circle cx="150" cy="300" r="4" fill="${c.mantle}" stroke="none"/>
    <circle cx="560" cy="320" r="3.4" fill="${c.mantle}" stroke="none"/>
    <path d="M280 430c30-14 56-14 82 0" stroke="${c.sand}" stroke-width="3" opacity=".7"/>
  `),

  'tanah-kering.svg': frame(c.sand, `
    <path d="M0 150c90-30 180 20 270-4s180-30 270-4 80 16 100 10v328H0z" fill="${c.clay}" stroke="none" opacity=".55"/>
    <path d="M0 150c90-30 180 20 270-4s180-30 270-4 80 16 100 10" stroke-width="3.4"/>
    <path d="M120 250l70-40 76 34-24 68-78 14-58-40zM330 210l64-24 70 30-18 62-72 18-52-38zM100 360l60-26 62 30-16 58-64 12-48-34zM300 350l70-30 74 34-20 66-78 14-54-42zM470 300l60-20 62 28-16 54-66 12-46-38z" fill="${c.sand}" stroke-width="3"/>
    <path d="M290 268l-18 44M392 246l-14 50M160 388l-14 42M368 386l-16 48M528 328l-12 42" stroke="${c.humus}" stroke-width="2.4" opacity=".7"/>
    <path d="M0 470c60-20 120-20 180 0s120 20 180 0 120-20 180 0 60 20 100 20" stroke="${c.humus}" stroke-width="3" opacity=".6"/>
    <circle cx="240" cy="180" r="3.4" fill="${c.humus}" stroke="none" opacity=".6"/>
    <circle cx="480" cy="200" r="4" fill="${c.humus}" stroke="none" opacity=".6"/>
  `),

  'tebing-kapur.svg': frame(c.sky, `
    <path d="M0 340c90-16 180-16 270 0s180 16 270 0 70-8 100-6v146H0z" fill="${c.rock}" stroke="none" opacity=".55"/>
    <path d="M0 340c90-16 180-16 270 0s180 16 270 0 70-8 100-6" stroke-width="3"/>
    <path d="M120 480V150l60-60 90 30 40 60v300z" fill="${c.paper}"/>
    <path d="M120 480V150l60-60 90 30 40 60v300" stroke-width="3.4"/>
    <path d="M120 240h190M120 320h190M120 400h190" stroke="${c.sand}" stroke-width="4" opacity=".8"/>
    <path d="M180 90v390M240 108v372" stroke="${c.rock}" stroke-width="2.4" opacity=".35"/>
    <path d="M0 400c30-18 60 18 90 0s60 18 90 0" stroke="${c.paper}" stroke-width="4" opacity=".8"/>
    <path d="M0 440c30-16 60 16 90 0s60 16 90 0" stroke="${c.paper}" stroke-width="4" opacity=".6"/>
    <path d="M420 200c-20 10-34 28-38 52 18 2 32-6 42-22 4 18 14 32 30 40 2-26-8-48-34-70z" fill="${c.paper}" stroke-width="3"/>
    <path d="M470 150c18-10 40-10 58 0M500 118c14-8 30-8 44 0" stroke="${c.paper}" stroke-width="4" opacity=".8"/>
    <circle cx="520" cy="260" r="4" fill="${c.sand}" stroke="none"/>
    <circle cx="580" cy="420" r="3.4" fill="${c.paper}" stroke="none" opacity=".7"/>
  `),

  'bakau.svg': frame(c.sky, `
    <path d="M0 330c80-18 160 12 240-4s160-20 240-4 100 10 160 4v154H0z" fill="${c.humus}" stroke="none"/>
    <path d="M0 330c80-18 160 12 240-4s160-20 240-4 100 10 160 4" stroke-width="3.4"/>
    <path d="M0 390c80-12 160 10 240 0s160-14 240 0 100 8 160 2v88H0z" fill="${c.sky}" opacity=".8" stroke="none"/>
    <path d="M0 390c80-12 160 10 240 0s160-14 240 0 100 8 160 2" stroke-width="3"/>
    <path d="M150 330V190" stroke="${c.humus}" stroke-width="10"/>
    <path d="M150 300c-34 14-56 32-66 60M150 300c34 14 54 30 62 58M150 260c-26 8-44 24-52 46M150 260c26 8 42 22 50 42" stroke="${c.humus}" stroke-width="5"/>
    <path d="M150 214c-34-8-54-30-58-60 32 2 54 24 58 60zM150 200c30-12 48-34 50-64-30 4-48 28-50 64zM150 240c30-4 48-20 54-44-26-2-46 12-54 44z" fill="${c.leaf}"/>
    <path d="M420 330V210" stroke="${c.humus}" stroke-width="9"/>
    <path d="M420 306c-28 12-46 26-54 48M420 306c28 12 44 26 50 46M420 276c-22 6-36 18-42 34M420 276c22 6 36 18 42 34" stroke="${c.humus}" stroke-width="4.6"/>
    <path d="M420 230c-28-8-44-28-46-52 26 2 44 20 46 52zM420 218c26-10 42-30 44-56-26 4-42 26-44 56z" fill="${c.leaf}"/>
    <path d="M60 430c30-8 60 8 90 0s60 8 90 0M380 448c30-8 60 8 90 0s60 8 90 0" stroke="${c.paper}" stroke-width="3.4" opacity=".6"/>
    <path d="M240 380c10-10 26-10 36 0M300 356c8-8 20-8 28 0" stroke="${c.ink}" stroke-width="2.4" opacity=".5"/>
    <circle cx="540" cy="200" r="5" fill="${c.sand}" stroke="none"/>
  `),

  'kola.svg': frame(c.paper, `
    <rect x="0" y="360" width="640" height="120" fill="${c.humus}" stroke="none"/>
    <rect x="0" y="400" width="640" height="80" fill="${c.clay}" stroke="none"/>
    <rect x="0" y="438" width="640" height="42" fill="${c.rock}" stroke="none"/>
    <path d="M0 360h640M0 400h640M0 438h640" stroke-width="3"/>
    <path d="M260 360V60l40-40 40 40v300" stroke="${c.ink}" stroke-width="6"/>
    <path d="M260 120h80M260 180h80M260 240h80" stroke="${c.ink}" stroke-width="4"/>
    <path d="M300 20v340" stroke="${c.sand}" stroke-width="6" stroke-dasharray="12 10"/>
    <path d="M300 360v100" stroke="${c.ink}" stroke-width="6"/>
    <path d="M250 460h100" stroke="${c.ink}" stroke-width="6"/>
    <circle cx="300" cy="470" r="6" fill="${c.mantle}" stroke="${c.ink}" stroke-width="3"/>
    <rect x="150" y="300" width="70" height="60" fill="${c.sky}" stroke-width="3"/>
    <path d="M150 300l35-24 35 24M185 276v84" stroke-width="3"/>
    <path d="M400 330h80v30h-80zM440 300h20v30h-20" stroke="${c.ink}" stroke-width="3" fill="${c.sand}"/>
    <path d="M80 250c16-10 34-10 50 0M480 200c16-10 34-10 50 0" stroke="${c.rock}" stroke-width="3" opacity=".6"/>
    <path d="M60 460c30-8 60 6 90 0s60 6 90 0" stroke="${c.paper}" stroke-width="3" opacity=".6"/>
    <circle cx="520" cy="420" r="5" fill="${c.sand}" stroke="none"/>
  `),
};

for (const [name, svg] of Object.entries(plates)) {
  writeFileSync(join(out, name), svg, 'utf8');
}

console.log(`Ditulis ${Object.keys(plates).length} pelat galeri ke public/assets/img/galeri`);
