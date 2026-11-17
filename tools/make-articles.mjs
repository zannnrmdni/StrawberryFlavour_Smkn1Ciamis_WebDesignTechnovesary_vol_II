/**
 * Generator sampul artikel (1200 x 600).
 * Gaya sama dengan pelat galeri: bidang warna datar, garis tinta, tanpa teks.
 * Jalankan: node tools/make-articles.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public', 'assets', 'img', 'artikel');
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

const svg = (bg, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" width="1200" height="600" role="img">
<rect width="1200" height="600" fill="${bg}"/>
<g fill="none" stroke="${c.ink}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
${body.trim()}
</g>
</svg>
`;

const leaf = (x, y, w, h, r, fill) =>
  `<path d="M${x} ${y}c${w * 0.42} ${-h} ${w * 0.92} ${-h} ${w} 0c${-w * 0.42} ${h} ${-w * 0.92} ${h} ${-w} 0z" transform="rotate(${r} ${x + w / 2} ${y})" fill="${fill}"/>`;

const covers = {
  'serasah.svg': svg(c.paper, `
    <path d="M0 402c120-34 220 26 340 2s220-44 340-10 220 36 320 10 160-20 200-8v204H0z" fill="${c.humus}" stroke="none"/>
    <path d="M0 402c120-34 220 26 340 2s220-44 340-10 220 36 320 10 160-20 200-8" stroke-width="5"/>
    <path d="M0 470c120-24 220 20 340 0s220-30 340-4 220 26 320 6 160-12 200-4" stroke="${c.clay}" stroke-width="5" opacity=".75"/>
    <path d="M0 548c120-20 220 16 340 0s220-24 340-2 220 20 320 4 160-10 200-2" stroke="${c.sand}" stroke-width="5" opacity=".65"/>
    ${leaf(120, 330, 120, 48, -18, c.leaf)}
    ${leaf(250, 356, 150, 56, 12, c.leaf)}
    ${leaf(420, 320, 100, 40, 28, c.sand)}
    ${leaf(760, 340, 170, 62, -8, c.leaf)}
    ${leaf(960, 312, 110, 44, 22, c.leaf)}
    <path d="M180 400c12-42 34-66 66-76M700 402c-6-38 8-64 42-80M1060 402c-4-30 10-52 36-64" stroke="${c.ink}" stroke-width="4"/>
    <path d="M540 402c-14-54 0-90 36-112M540 342c-32-6-52-24-62-52M540 316c26-8 44-26 50-52" stroke="${c.humus}" stroke-width="6"/>
    <circle cx="620" cy="440" r="7" fill="${c.sand}" stroke="none"/>
    <circle cx="880" cy="468" r="5" fill="${c.paper}" stroke="none"/>
    <circle cx="330" cy="486" r="5" fill="${c.paper}" stroke="none"/>
  `),

  'tanah-atas.svg': svg(c.sky, `
    <rect x="0" y="286" width="1200" height="314" fill="${c.humus}" stroke="none"/>
    <rect x="0" y="286" width="1200" height="86" fill="${c.leaf}" stroke="none"/>
    <path d="M0 286h1200" stroke-width="5"/>
    <path d="M0 372h1200" stroke-width="4" opacity=".8"/>
    <path d="M0 470h1200" stroke="${c.clay}" stroke-width="4" opacity=".7"/>
    <path d="M150 286V120M150 220c-44-8-70-38-74-78 38 2 66 32 74 78zM150 192c42-12 66-42 68-82-38 4-62 36-68 82z" stroke="${c.humus}" stroke-width="10"/>
    <path d="M150 286c-20 26-46 40-78 44M150 286c22 26 46 40 74 44M150 286v110" stroke="${c.humus}" stroke-width="5"/>
    <path d="M390 286V150M390 230c-34-4-56-26-62-58 30 0 52 20 62 58zM390 206c34-10 54-32 56-66-30 6-52 30-56 66z" stroke="${c.leaf}" stroke-width="8"/>
    <path d="M660 286V176M660 240c30-14 48-38 50-70-28 2-46 26-50 70zM660 214c-28-6-46-26-50-54 26 0 44 20 50 54z" stroke="${c.leaf}" stroke-width="7"/>
    <path d="M900 286V120M900 210c-40-10-64-38-66-74 34 4 60 30 66 74zM900 178c38-12 60-42 60-80-32 6-56 36-60 80z" stroke="${c.humus}" stroke-width="9"/>
    <path d="M240 512c30-18 62-18 92 0s62 18 92 0 62-18 92 0 62 18 92 0 62-18 92 0 62 18 92 0 62-18 92 0 62 18 92 0" stroke="${c.sand}" stroke-width="4" opacity=".8"/>
    <circle cx="320" cy="424" r="7" fill="${c.sand}" stroke="none"/>
    <circle cx="760" cy="450" r="5" fill="${c.paper}" stroke="none"/>
    <circle cx="1010" cy="410" r="6" fill="${c.sand}" stroke="none"/>
  `),

  'tanah-bawah.svg': svg(c.paper, `
    <rect x="0" y="180" width="1200" height="420" fill="${c.clay}" stroke="none" opacity=".92"/>
    <rect x="0" y="180" width="1200" height="70" fill="${c.leaf}" stroke="none"/>
    <rect x="0" y="250" width="1200" height="70" fill="${c.humus}" stroke="none" opacity=".85"/>
    <path d="M0 180h1200M0 250h1200M0 320h1200" stroke-width="4"/>
    <path d="M0 392c80-18 160 18 240 0s160-18 240 0 160 18 240 0 160-18 240 0 160 18 240 0" stroke="${c.paper}" stroke-width="5" opacity=".7"/>
    <path d="M180 180c0 66 16 110 48 132s48 66 48 132M180 312c32 2 56 18 72 48" stroke="${c.sky}" stroke-width="10"/>
    <path d="M540 180c-18 48-10 84 24 108s40 60 20 96M564 288c-34 2-58 18-72 48" stroke="${c.sky}" stroke-width="8" opacity=".85"/>
    <path d="M900 180c22 52 14 92-24 120s-42 56-12 90M876 300c38 6 62 24 74 54" stroke="${c.sky}" stroke-width="9" opacity=".8"/>
    <path d="M120 512c44-18 88-18 132 0s88 18 132 0 88-18 132 0 88 18 132 0 88-18 132 0 88 18 132 0 88-18 132 0" stroke="${c.humus}" stroke-width="4" opacity=".65"/>
    <circle cx="286" cy="430" r="8" fill="${c.sand}" stroke="none"/>
    <circle cx="700" cy="470" r="6" fill="${c.paper}" stroke="none"/>
    <circle cx="1030" cy="424" r="7" fill="${c.sand}" stroke="none"/>
  `),

  'batuan-lapuk.svg': svg(c.sky, `
    <path d="M0 470c110-30 200 26 310 0s200-46 310-12 210 40 310 6 170-22 270-8v144H0z" fill="${c.sand}" stroke="none"/>
    <path d="M0 470c110-30 200 26 310 0s200-46 310-12 210 40 310 6 170-22 270-8" stroke-width="5"/>
    <path d="M60 500c80-62 178-76 280-44 82 26 128 78 152 144H60z" fill="${c.rock}" stroke="none"/>
    <path d="M60 500c80-62 178-76 280-44 82 26 128 78 152 144H60" stroke-width="5"/>
    <path d="M700 500c84-68 190-80 300-40 56 20 100 58 132 140H700z" fill="${c.rock}" stroke="none"/>
    <path d="M700 500c84-68 190-80 300-40 56 20 100 58 132 140H700" stroke-width="5"/>
    <path d="M180 480l26 54-20 30M260 470l18 48 34 20M790 480l-22 52 18 32M900 470l14 60 34 18" stroke="${c.paper}" stroke-width="5" opacity=".8"/>
    <path d="M430 470c-6-88 18-146 70-174M430 470c-46-74-106-106-180-98M430 470c42-96 112-138 210-126" stroke="${c.humus}" stroke-width="8"/>
    <path d="M500 296c-26-18-38-44-34-78M500 296c28-12 46-34 54-66" stroke="${c.leaf}" stroke-width="6"/>
    <circle cx="640" cy="430" r="7" fill="${c.clay}" stroke="none"/>
    <circle cx="1110" cy="500" r="5" fill="${c.paper}" stroke="none"/>
  `),

  'batuan-dasar.svg': svg(c.ink, `
    <rect width="1200" height="600" fill="${c.ink}" stroke="none"/>
    <path d="M0 600V440c120-60 240 60 360 0s240-80 360-20 240 60 360 0 120-30 120-30v210z" fill="${c.rock}" stroke="none"/>
    <path d="M0 440c120-60 240 60 360 0s240-80 360-20 240 60 360 0 120-30 120-30" stroke="${c.paper}" stroke-width="5"/>
    <path d="M0 530c120-40 240 40 360 0s240-50 360-10 240 40 360 0 120-20 120-20" stroke="${c.sand}" stroke-width="4" opacity=".7"/>
    <path d="M180 440V210l70-70 80 40 50 90M540 430V240l90-80 100 50 50 110M880 440V260l80-60 100 40 60 80" stroke="${c.paper}" stroke-width="4" opacity=".6"/>
    <path d="M180 300l140 60 90-40 110 70M540 330l120 40 100-50 80 60M880 350l100 30 120-30" stroke="${c.sand}" stroke-width="6"/>
    <path d="M260 140v140M330 170v110M630 160v140M740 190v120M960 200v120M1080 210v110" stroke="${c.mantle}" stroke-width="5" opacity=".8"/>
    <circle cx="430" cy="360" r="6" fill="${c.sand}" stroke="none"/>
    <circle cx="760" cy="400" r="8" fill="${c.mantle}" stroke="none"/>
    <circle cx="1040" cy="370" r="5" fill="${c.sand}" stroke="none"/>
    <path d="M60 120c100-50 200 50 300 0s200-50 300 0 200 50 300 0 160-30 240-10" stroke="${c.sky}" stroke-width="4" opacity=".4"/>
  `),

  'kerak-bumi.svg': svg(c.sky, `
    <rect x="0" y="0" width="1200" height="600" fill="${c.sky}" stroke="none"/>
    <path d="M0 250c120-40 240 40 360 0s240-60 360-10 240 40 360 0 120-20 120-20v380H0z" fill="${c.crust}" stroke="none"/>
    <path d="M0 250c120-40 240 40 360 0s240-60 360-10 240 40 360 0 120-20 120-20" stroke-width="6"/>
    <path d="M0 360c120-30 240 30 360 0s240-40 360-6 240 30 360 0 120-16 120-16" stroke="${c.mantle}" stroke-width="10" opacity=".85"/>
    <path d="M0 420c120-24 240 24 360 0s240-32 360-4 240 24 360 0 120-12 120-12" stroke="${c.ink}" stroke-width="4" opacity=".45"/>
    <path d="M0 520c120-20 240 20 360 0s240-24 360-2 240 20 360 0 120-10 120-10" stroke="${c.sand}" stroke-width="5" opacity=".7"/>
    <path d="M120 250v-60M240 232v-72M600 230v-70M940 244v-64M1080 250v-58" stroke="${c.rock}" stroke-width="5"/>
    <circle cx="420" cy="210" r="22" fill="none" stroke="${c.ink}" stroke-width="4" opacity=".5"/>
    <circle cx="420" cy="210" r="46" fill="none" stroke="${c.ink}" stroke-width="4" opacity=".35"/>
    <circle cx="420" cy="210" r="74" fill="none" stroke="${c.ink}" stroke-width="4" opacity=".22"/>
    <path d="M700 120l40 40-40 40-40-40z" fill="${c.sand}" stroke-width="4"/>
    <path d="M860 360v80M820 400h80" stroke="${c.paper}" stroke-width="6"/>
    <circle cx="300" cy="470" r="7" fill="${c.sand}" stroke="none"/>
    <circle cx="820" cy="500" r="6" fill="${c.paper}" stroke="none"/>
  `),

  'kola.svg': svg(c.paper, `
    <rect x="0" y="330" width="1200" height="270" fill="${c.humus}" stroke="none"/>
    <rect x="0" y="408" width="1200" height="192" fill="${c.clay}" stroke="none"/>
    <rect x="0" y="500" width="1200" height="100" fill="${c.rock}" stroke="none"/>
    <path d="M0 330h1200M0 408h1200M0 500h1200" stroke-width="5"/>
    <path d="M540 330V70l60-50 60 50v260" stroke="${c.ink}" stroke-width="10"/>
    <path d="M600 20v560" stroke="${c.sand}" stroke-width="10" stroke-dasharray="18 14"/>
    <path d="M540 120h120M540 200h120M540 280h120" stroke="${c.ink}" stroke-width="7"/>
    <path d="M600 580v-80" stroke="${c.ink}" stroke-width="10"/>
    <circle cx="600" cy="470" r="10" fill="${c.mantle}" stroke="${c.ink}" stroke-width="4"/>
    <rect x="260" y="250" width="150" height="80" fill="${c.sky}" stroke-width="5"/>
    <path d="M260 250l75-50 75 50M335 200v130" stroke-width="5"/>
    <rect x="820" y="250" width="90" height="80" fill="${c.sand}" stroke-width="5"/>
    <path d="M860 220h20v30h-20z" stroke-width="4"/>
    <path d="M100 590c70-20 140 10 210 0s140-20 140-20M900 560c70-14 140 8 210 0" stroke="${c.paper}" stroke-width="4" opacity=".6"/>
    <circle cx="240" cy="480" r="7" fill="${c.sand}" stroke="none"/>
    <circle cx="980" cy="440" r="5" fill="${c.paper}" stroke="none"/>
  `),

  'gua.svg': svg(c.paper, `
    <path d="M0 600V260C0 140 140 40 300 40s300 100 300 220v340z" fill="${c.sky}" stroke="none"/>
    <path d="M0 600V260C0 140 140 40 300 40s300 100 300 220v340" stroke-width="6"/>
    <path d="M600 600V320c0-110 110-190 240-190s240 80 240 190v280z" fill="${c.sky}" stroke="none" opacity=".8"/>
    <path d="M600 600V320c0-110 110-190 240-190s240 80 240 190v280" stroke-width="6"/>
    <path d="M180 600V360c0-44 26-72 64-84M380 600V390c0-34-16-58-44-72" stroke="${c.rock}" stroke-width="6"/>
    <path d="M780 600V420c0-40 22-68 56-82M980 600V440c0-26-12-46-34-60" stroke="${c.rock}" stroke-width="6"/>
    <path d="M110 180l18 84 16-64 20 90 14-56 22 76 16-60 18 58" stroke="${c.paper}" stroke-width="10"/>
    <path d="M730 220l14 70 16-54 18 76 12-46 18 64 14-50" stroke="${c.paper}" stroke-width="9"/>
    <path d="M0 520c70-30 140-30 210 0s140 30 210 0 140-30 210 0 140 30 210 0 140-30 210 0 140 30 210 0" stroke="${c.ink}" stroke-width="5"/>
    <path d="M0 552c70-26 140-26 210 0s140 26 210 0 140-26 210 0 140 26 210 0 140-26 210 0 140 26 210 0" stroke="${c.sand}" stroke-width="4" opacity=".7"/>
    <circle cx="250" cy="450" r="6" fill="${c.sand}" stroke="none"/>
    <circle cx="870" cy="390" r="5" fill="${c.sand}" stroke="none"/>
    <circle cx="1080" cy="490" r="7" fill="${c.humus}" stroke="none"/>
  `),
};

for (const [name, content] of Object.entries(covers)) {
  writeFileSync(join(out, name), content, 'utf8');
}

console.log(`Ditulis ${Object.keys(covers).length} sampul artikel ke public/assets/img/artikel`);
