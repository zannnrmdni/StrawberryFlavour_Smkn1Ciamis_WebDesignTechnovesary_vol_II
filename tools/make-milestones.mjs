/**
 * Generator ilustrasi milestone.
 * Satu bahasa visual: garis tinta 2.6 px, sudut membulat, bidang warna datar
 * dari palet situs. Jalankan: node tools/make-milestones.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public', 'assets', 'img', 'milestones');
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

const wrap = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="96" height="96">
<g fill="none" stroke="${c.ink}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
${inner.trim()}
</g>
</svg>
`;

/** Garis tanah dengan isi warna, dari y ke bawah. */
const soil = (y, color = c.humus, height = 96 - y) =>
  `<path d="M4 ${y}h88v${height - 4}a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" fill="${color}" stroke="none"/>
<path d="M2 ${y}h92" />`;

const icons = {
  'cacing-serasah.svg': `
    <path d="M28 24c8-12 28-10 36 2-10 10-28 10-36-2z" fill="${c.leaf}"/>
    <path d="M32 23c8 1 18 2 27 3" stroke-width="1.6"/>
    <path d="M14 46c6-9 12 5 19-3s13 6 20-4" stroke="${c.humus}" stroke-width="9"/>
    <path d="M15 45c6-8 11 4 18-3s13 5 19-4" stroke="${c.mantle}" stroke-width="4.4"/>
    ${soil(62, c.humus, 30)}
    <path d="M12 82c10-6 20 4 30-2s22 2 30-4" stroke="${c.sand}" stroke-width="2.2"/>
    <circle cx="70" cy="88" r="2.4" fill="${c.sand}" stroke="none"/>
    <circle cx="24" cy="90" r="1.8" fill="${c.sand}" stroke="none"/>
  `,

  'mikoriza.svg': `
    <path d="M48 30v30" stroke="${c.leaf}" stroke-width="5"/>
    <path d="M48 42c-9-2-14-8-16-14 9 0 15 5 16 14z" fill="${c.leaf}"/>
    <path d="M48 50c9-2 14-8 16-14-9 0-15 5-16 14z" fill="${c.leaf}"/>
    ${soil(62, c.sand, 30)}
    <path d="M48 60c-6 4-9 8-12 14M48 60c6 4 9 8 12 14M40 70c-5 2-7 6-9 10M56 70c5 2 7 6 9 10" stroke="${c.humus}" stroke-width="2"/>
    <circle cx="36" cy="74" r="2.2" fill="${c.paper}" stroke-width="1.6"/>
    <circle cx="60" cy="74" r="2.2" fill="${c.paper}" stroke-width="1.6"/>
    <circle cx="30" cy="82" r="1.8" fill="${c.paper}" stroke-width="1.4"/>
    <circle cx="66" cy="82" r="1.8" fill="${c.paper}" stroke-width="1.4"/>
    <circle cx="48" cy="86" r="2" fill="${c.paper}" stroke-width="1.4"/>
    <path d="M10 68c5 3 10-3 15 0s10-3 15 0" stroke="${c.paper}" stroke-width="1.4" opacity=".5"/>
  `,

  'ekor-pegas.svg': `
    <ellipse cx="52" cy="42" rx="20" ry="13" fill="${c.sand}"/>
    <ellipse cx="30" cy="44" rx="9" ry="8" fill="${c.sand}"/>
    <path d="M24 38c-4-6-8-8-12-8M26 36c-2-7-4-10-7-14" />
    <path d="M60 54v12l-9 9M60 66l8 9" stroke="${c.clay}" stroke-width="3.4"/>
    <path d="M40 53v9M48 55v7M56 55v7" stroke-width="2"/>
    <circle cx="27" cy="42" r="1.6" fill="${c.ink}" stroke="none"/>
    <path d="M44 30c3-4 8-4 11 0" stroke-width="1.4" opacity=".6"/>
  `,

  'bakteri.svg': `
    <rect x="18" y="20" width="34" height="16" rx="8" fill="${c.leaf}" transform="rotate(-14 35 28)"/>
    <rect x="44" y="46" width="30" height="14" rx="7" fill="${c.sky}" transform="rotate(10 59 53)"/>
    <rect x="22" y="58" width="24" height="13" rx="6.5" fill="${c.sand}" transform="rotate(-6 34 64)"/>
    <circle cx="70" cy="24" r="7" fill="${c.clay}"/>
    <path d="M12 40c-4 4-4 8-2 12M52 34c5 2 7 6 8 10M74 34c2 6 0 10-3 13" stroke-width="1.8"/>
    <path d="M14 76c4 3 8-2 12 1s8-2 12 1" stroke-width="1.6" opacity=".55"/>
    <circle cx="76" cy="74" r="2.2" fill="${c.ink}" stroke="none"/>
    <circle cx="84" cy="62" r="1.6" fill="${c.ink}" stroke="none"/>
  `,

  'rimpang-rumput.svg': `
    <path d="M12 60c10-6 20 6 30 0s20 6 30 0 14 2 12 6c-10 6-20-6-30 0s-20-6-30 0-14-2-12-6z" fill="${c.humus}"/>
    <path d="M26 58c-2-14 2-22 8-28M34 58c2-16 8-24 14-28M46 58c0-12 4-20 8-22" stroke="${c.leaf}" stroke-width="4"/>
    <path d="M28 56c-6-8-10-10-16-10 2 8 8 12 16 12M50 56c6-8 10-10 16-10-2 8-8 12-16 12" fill="${c.leaf}"/>
    ${soil(66, c.sand, 26)}
    <path d="M20 70c0 6 2 10 4 14M40 70c1 5 1 9 0 14M62 70c-1 6-3 10-6 14M78 70c0 6-1 10-3 14" stroke-width="1.8" stroke="${c.humus}"/>
  `,

  'bank-benih.svg': `
    ${soil(40, c.humus, 52)}
    <ellipse cx="28" cy="66" rx="7" ry="4.6" fill="${c.sand}" transform="rotate(-18 28 66)"/>
    <ellipse cx="50" cy="78" rx="7" ry="4.6" fill="${c.sand}" transform="rotate(12 50 78)"/>
    <ellipse cx="72" cy="62" rx="7" ry="4.6" fill="${c.sand}" transform="rotate(-8 72 62)"/>
    <path d="M50 74V50" stroke="${c.leaf}" stroke-width="3.4"/>
    <path d="M50 56c-8 0-12-4-13-9 8-1 12 3 13 9zM50 50c7-1 11-5 12-10-8-1-11 3-12 10z" fill="${c.leaf}"/>
    <path d="M14 52c4 2 8-2 12 0s8-2 12 0" stroke-width="1.2" opacity=".4"/>
  `,

  'rayap.svg': `
    <ellipse cx="62" cy="46" rx="20" ry="12" fill="${c.clay}"/>
    <ellipse cx="42" cy="46" rx="10" ry="9" fill="${c.sand}"/>
    <circle cx="28" cy="47" r="9" fill="${c.sand}"/>
    <path d="M22 42c-4-6-8-8-12-8M24 39c-2-6-3-9-6-13"/>
    <path d="M36 54v8M46 56v6M58 56v6M66 56v6" stroke-width="2"/>
    <circle cx="26" cy="45" r="1.6" fill="${c.ink}" stroke="none"/>
    <path d="M70 32c6 2 10 6 12 12" stroke-width="1.4" opacity=".5"/>
    <path d="M10 72c8 4 16-4 24 0s16-4 24 0 16-4 22 0" stroke="${c.humus}" stroke-width="2.4"/>
  `,

  'tikus-tanah.svg': `
    <path d="M8 72c10-26 70-26 80 0" stroke-width="2.4"/>
    <ellipse cx="50" cy="50" rx="25" ry="15" fill="${c.rock}"/>
    <path d="M26 46c-8-2-14 2-16 7 6 4 12 5 18 2" fill="${c.rock}"/>
    <circle cx="14" cy="51" r="2" fill="${c.ink}" stroke="none"/>
    <path d="M38 62c-1 6-4 8-8 9M50 64c0 6-2 9-5 10M62 63c1 6 3 9 6 10" stroke-width="2.2"/>
    <path d="M34 68l-6 3M46 70l-4 4M58 69l-4 4" stroke="${c.paper}" stroke-width="2"/>
    <circle cx="61" cy="45" r="2.2" fill="${c.paper}" stroke="none"/>
    <path d="M72 44c4 1 7 3 8 6" stroke-width="1.6" opacity=".6"/>
  `,

  'akar-pohon.svg': `
    <circle cx="48" cy="24" r="18" fill="${c.leaf}"/>
    <rect x="42" y="34" width="12" height="24" fill="${c.humus}"/>
    ${soil(54, c.humus, 38)}
    <path d="M48 56v10M48 60c-8 4-12 10-14 18M48 60c8 4 12 10 14 18M48 66c-4 1-6 3-8 6M48 70c4 1 6 3 7 6" stroke="${c.sand}" stroke-width="3.4"/>
    <path d="M12 62h72" stroke-width="2" opacity=".5"/>
    <circle cx="26" cy="30" r="2" fill="${c.paper}" stroke="none"/>
  `,

  'muka-air.svg': `
    ${soil(30, c.humus, 66)}
    <path d="M4 56c8-6 14 6 22 0s14 6 22 0 14 6 22 0 14 6 22 0v40H4z" fill="${c.sky}" stroke="none" opacity=".9"/>
    <path d="M4 56c8-6 14 6 22 0s14 6 22 0 14 6 22 0 14 6 22 0" stroke="${c.ink}" stroke-width="2.6"/>
    <path d="M6 68h84M6 80h84" stroke="${c.rock}" stroke-width="1.4" stroke-dasharray="5 5"/>
    <path d="M30 34v14M30 48l-4 5h8z" fill="${c.sky}"/>
    <circle cx="62" cy="74" r="2.4" fill="${c.sky}" stroke="none"/>
    <circle cx="76" cy="86" r="1.8" fill="${c.sky}" stroke="none"/>
    <circle cx="22" cy="88" r="2" fill="${c.sky}" stroke="none"/>
  `,

  'cacing-anecic.svg': `
    ${soil(12, c.humus, 84)}
    <path d="M42 12c-4 12-2 20 4 28s6 18 0 26-2 14 4 18" stroke="${c.paper}" stroke-width="9"/>
    <path d="M42 16c-3 10-1 16 4 24s6 18 0 26-2 12 3 16" stroke="${c.mantle}" stroke-width="4.4"/>
    <path d="M18 26c4-2 8-2 12 0M18 44c4-2 8-2 12 0M64 34c4-2 8-2 12 0M62 60c4-2 8-2 12 0" stroke="${c.sand}" stroke-width="2"/>
    <path d="M22 10c6-4 12-4 18 0" stroke-width="2.4"/>
    <circle cx="66" cy="18" r="2" fill="${c.sand}" stroke="none"/>
    <circle cx="24" cy="78" r="2" fill="${c.sand}" stroke="none"/>
  `,

  'lapisan-besi.svg': `
    <rect x="6" y="18" width="84" height="18" fill="${c.humus}" stroke="none"/>
    <rect x="6" y="36" width="84" height="20" fill="${c.clay}" stroke="none"/>
    <rect x="6" y="56" width="84" height="32" fill="${c.sand}" stroke="none"/>
    <rect x="6" y="18" width="84" height="70" />
    <path d="M6 36h84M6 56h84" stroke-width="2"/>
    <path d="M14 42h10M30 46h14M52 40h8M66 48h10M22 50h6M74 42h6" stroke="${c.crust}" stroke-width="3"/>
    <circle cx="26" cy="66" r="2" fill="${c.humus}" stroke="none"/>
    <circle cx="52" cy="74" r="2.4" fill="${c.humus}" stroke="none"/>
    <circle cx="70" cy="64" r="1.8" fill="${c.humus}" stroke="none"/>
    <path d="M78 24c-3 3-6 4-10 4" stroke="${c.leaf}" stroke-width="2.2"/>
  `,

  'sumur.svg': `
    ${soil(26, c.sand, 70)}
    <path d="M30 26v56M66 26v56" stroke-width="3"/>
    <path d="M30 26v56M66 26v56" stroke="${c.rock}" stroke-width="9" opacity=".35"/>
    <path d="M30 26h36"/>
    <path d="M22 26h52" stroke-width="3.4"/>
    <path d="M48 26v10" stroke-dasharray="3 3" stroke-width="1.8"/>
    <path d="M42 36h12v10H42z" fill="${c.humus}"/>
    <path d="M30 70c12-5 24 5 36 0v12H30z" fill="${c.sky}"/>
    <circle cx="74" cy="26" r="5" fill="${c.sand}"/>
    <path d="M74 31v8" stroke-width="2"/>
    <path d="M18 44h-8M18 52h-6" stroke-width="1.6" opacity=".6"/>
  `,

  'akar-mesquite.svg': `
    <circle cx="76" cy="24" r="11" fill="${c.sand}"/>
    <path d="M76 8v4M76 36v4M60 24h4M88 24h4M65 13l3 3M84 32l3 3" stroke-width="2"/>
    ${soil(40, c.sand, 56)}
    <path d="M34 38c-2-10 2-18 8-22 4 6 6 14 4 22" fill="${c.leaf}"/>
    <path d="M42 38c-8-2-14-8-16-16 8 0 14 4 16 12M42 38c8-2 14-8 16-16-8 0-14 4-16 12" fill="${c.leaf}"/>
    <path d="M42 40v34M42 52c-7 3-10 7-12 12M42 60c7 3 10 7 12 12M42 70c-5 2-8 5-9 9" stroke="${c.humus}" stroke-width="3.4"/>
    <path d="M14 32c3-2 6-2 9 0M18 28c2-3 4-4 7-4" stroke-width="1.4" opacity=".5"/>
  `,

  'akuifer.svg': `
    <rect x="6" y="18" width="84" height="16" fill="${c.humus}" stroke="none"/>
    <rect x="6" y="34" width="84" height="12" fill="${c.clay}" stroke="none"/>
    <rect x="6" y="46" width="84" height="42" fill="${c.sky}" stroke="none" opacity=".75"/>
    <rect x="6" y="18" width="84" height="70" />
    <path d="M6 34h84M6 46h84" stroke-width="2"/>
    <circle cx="18" cy="38" r="1.6" fill="${c.sand}" stroke="none"/>
    <circle cx="34" cy="43" r="2" fill="${c.sand}" stroke="none"/>
    <circle cx="52" cy="37" r="1.6" fill="${c.sand}" stroke="none"/>
    <circle cx="70" cy="42" r="2" fill="${c.sand}" stroke="none"/>
    <path d="M18 54a6 6 0 0 1 12 0c0 5-6 9-6 9s-6-4-6-9z" fill="${c.sky}"/>
    <path d="M24 56v14M34 58h12M46 58v14M38 66h-8" stroke-width="2.2"/>
    <path d="M58 54a6 6 0 0 1 12 0c0 5-6 9-6 9s-6-4-6-9z" fill="${c.sky}"/>
    <path d="M70 60c-2 8-6 14-12 18" stroke-width="2.2"/>
    <path d="M24 82v-6M24 76l-3 4h6z" fill="${c.ink}" stroke="none"/>
  `,

  'gua-karst.svg': `
    <rect x="4" y="12" width="88" height="76" fill="${c.sand}" stroke="none" opacity=".55"/>
    <rect x="4" y="12" width="88" height="76" />
    <path d="M20 88V54c0-16 12-26 28-26s28 10 28 26v34" fill="${c.paper}"/>
    <path d="M28 40l6 14 6-14M48 34l5 18 7-18M66 42l5 12 5-12" fill="${c.paper}" stroke-width="2.2"/>
    <path d="M30 88l5-12 5 12M60 88l6-14 6 14" fill="${c.paper}" stroke-width="2.2"/>
    <path d="M48 22c-3 5-3 9 0 12 3-3 3-7 0-12z" fill="${c.sky}"/>
    <path d="M14 30c4 2 8 2 12 0M74 24c4 2 8 2 12 0" stroke-width="1.4" opacity=".5"/>
    <circle cx="24" cy="74" r="2" fill="${c.humus}" stroke="none"/>
  `,

  'channel.svg': `
    <path d="M4 18c10-6 16 6 26 0s16 6 26 0 16 6 26 0v20H4z" fill="${c.sky}"/>
    <rect x="4" y="38" width="88" height="46" fill="${c.rock}" stroke="none" opacity=".45"/>
    <rect x="4" y="38" width="88" height="46" />
    <path d="M4 38h88" stroke-width="2.6"/>
    <circle cx="30" cy="60" r="11" fill="${c.paper}"/>
    <circle cx="66" cy="60" r="11" fill="${c.paper}"/>
    <path d="M23 64c-1-5 2-9 7-9s8 4 7 9z" fill="${c.clay}"/>
    <path d="M59 64c-1-5 2-9 7-9s8 4 7 9z" fill="${c.clay}"/>
    <path d="M44 60h10" stroke-dasharray="3 4" stroke-width="1.8"/>
    <circle cx="30" cy="60" r="2" fill="${c.sky}" stroke="none"/>
    <circle cx="66" cy="60" r="2" fill="${c.sky}" stroke="none"/>
  `,

  'akar-fig.svg': `
    <rect x="8" y="16" width="38" height="30" fill="${c.rock}" stroke="none" opacity=".4"/>
    <rect x="54" y="14" width="34" height="32" fill="${c.rock}" stroke="none" opacity=".4"/>
    <rect x="8" y="54" width="30" height="30" fill="${c.rock}" stroke="none" opacity=".4"/>
    <rect x="58" y="52" width="30" height="32" fill="${c.rock}" stroke="none" opacity=".4"/>
    <rect x="8" y="16" width="38" height="30"/>
    <rect x="54" y="14" width="34" height="32"/>
    <rect x="8" y="54" width="30" height="30"/>
    <rect x="58" y="52" width="30" height="32"/>
    <path d="M46 8v10c0 10 6 12 6 20s-8 10-6 22 2 18-2 28" stroke="${c.humus}" stroke-width="4.6"/>
    <path d="M52 22c6-2 10 0 12 4-5 2-9 1-12-4z" fill="${c.leaf}"/>
    <path d="M54 36c7-1 11 2 13 7-6 1-10-1-13-7z" fill="${c.leaf}"/>
    <circle cx="24" cy="30" r="2" fill="${c.ink}" stroke="none" opacity=".3"/>
    <circle cx="70" cy="70" r="2.4" fill="${c.ink}" stroke="none" opacity=".3"/>
  `,

  'akuifer-artesis.svg': `
    ${soil(34, c.sand, 62)}
    <path d="M4 52c10-4 18 4 28 0s18 4 28 0 18 4 28 0" stroke="${c.clay}" stroke-width="5"/>
    <path d="M30 34v46" stroke-width="7"/>
    <path d="M30 34v46" stroke="${c.sky}" stroke-width="3"/>
    <path d="M30 40c-4-10 0-18 10-22 2 8-2 16-10 22z" fill="${c.sky}"/>
    <path d="M58 18l16 8-16 8" fill="${c.sky}"/>
    <path d="M42 26h16" stroke-width="2" stroke-dasharray="4 4"/>
    <circle cx="48" cy="10" r="2.4" fill="${c.sky}"/>
    <circle cx="70" cy="34" r="2" fill="${c.sky}"/>
    <circle cx="18" cy="60" r="2" fill="${c.paper}" stroke="none"/>
    <circle cx="76" cy="66" r="2" fill="${c.paper}" stroke="none"/>
  `,

  'veryovkina.svg': `
    <path d="M4 24l18-14 20 12 18-10 32 14v72H4z" fill="${c.rock}" stroke="none" opacity=".35"/>
    <path d="M4 24l18-14 20 12 18-10 32 14" />
    <path d="M28 24c2 14-4 18 0 28s10 12 6 22-2 16 4 22" fill="${c.paper}" stroke-width="3"/>
    <path d="M36 50h-8M30 58h10M32 72h12M30 84h14" stroke-width="2"/>
    <path d="M52 22v62" stroke="${c.sand}" stroke-width="1.6" stroke-dasharray="4 4"/>
    <circle cx="52" cy="52" r="3" fill="${c.sand}"/>
    <path d="M52 52v8" stroke-width="1.6"/>
    <path d="M78 24v56" stroke-width="2" opacity=".5"/>
    <circle cx="78" cy="44" r="1.8" fill="${c.ink}" stroke="none" opacity=".4"/>
  `,

  'mikroba.svg': `
    <path d="M4 16l24 8-8 22-20-6zM34 8l30 6-4 24-24-6zM72 14l20 6v22l-22-4z" fill="${c.rock}" stroke="none" opacity=".35"/>
    <path d="M4 16l24 8-8 22-20-6zM34 8l30 6-4 24-24-6zM72 14l20 6v22l-22-4z"/>
    <circle cx="50" cy="58" r="15" fill="${c.mantle}"/>
    <path d="M50 50c-4 4-4 12 0 16" stroke-width="2"/>
    <circle cx="45" cy="55" r="2" fill="${c.ink}" stroke="none"/>
    <path d="M35 60c-8 2-12 8-12 14M65 60c8 2 12 8 12 14M50 73v10" stroke-width="2.4"/>
    <circle cx="26" cy="80" r="2.4" fill="${c.sand}"/>
    <circle cx="72" cy="82" r="2" fill="${c.sand}"/>
    <circle cx="50" cy="88" r="1.8" fill="${c.sand}"/>
  `,

  'mponeng.svg': `
    <path d="M28 30h40L48 4z" fill="none"/>
    <path d="M30 30h36M34 30l14-22 14 22" stroke-width="3"/>
    <path d="M48 30v58" stroke-width="9"/>
    <path d="M48 30v58" stroke="${c.paper}" stroke-width="4"/>
    <rect x="40" y="44" width="16" height="14" rx="2" fill="${c.sand}"/>
    <path d="M48 44v14M40 51h16" stroke-width="1.6"/>
    <path d="M14 76h68" stroke="${c.sand}" stroke-width="4"/>
    <path d="M14 76h68" stroke-width="2.6"/>
    <path d="M20 88h72" stroke="${c.crust}" stroke-width="4"/>
    <circle cx="48" cy="72" r="2" fill="${c.sand}" stroke="none"/>
    <path d="M24 34h-8M80 34h-8" stroke-width="2"/>
  `,

  'gempa.svg': `
    <path d="M4 30h88" stroke-width="2.6"/>
    <path d="M18 30l8 12 8-6 8 10 8-8 8 12 8-10 6 8" stroke-width="0"/>
    <circle cx="48" cy="58" r="4" fill="${c.mantle}"/>
    <path d="M48 58c-10-4-16-14-16-24M48 58c10-4 16-14 16-24M48 58c-4-10-4-20 0-28M48 58c4-10 4-20 0-28" stroke-width="2" opacity=".8"/>
    <path d="M24 30l6 8-5 4 6 8" stroke="${c.crust}" stroke-width="2.6"/>
    <path d="M62 30l4 8-4 5 6 7" stroke="${c.crust}" stroke-width="2.6"/>
    <path d="M14 70c10 6 20-2 30 4s22-2 30 4" stroke="${c.rock}" stroke-width="2.4" opacity=".6"/>
    <path d="M22 84c8 4 16-2 24 2s16-2 24 2" stroke="${c.rock}" stroke-width="2.4" opacity=".4"/>
    <path d="M4 30v18M92 30v18" stroke-width="2"/>
  `,

  'kola.svg': `
    <path d="M20 26h56" stroke-width="2.6"/>
    <path d="M26 26l22-18 22 18M48 8v18" stroke-width="2.6"/>
    <path d="M48 26v62" stroke-width="7"/>
    <path d="M48 26v62" stroke="${c.ink}" stroke-width="2.4"/>
    <path d="M40 36h8M40 48h8M40 60h8M40 72h8" stroke-width="1.8"/>
    <path d="M4 88h88" stroke="${c.crust}" stroke-width="5"/>
    <path d="M4 80h88" stroke="${c.humus}" stroke-width="3" opacity=".5"/>
    <circle cx="48" cy="86" r="2.4" fill="${c.sand}" stroke="none"/>
    <path d="M64 34c4 4 6 8 6 14" stroke-width="2" opacity=".6"/>
  `,

  'moho.svg': `
    <rect x="4" y="10" width="88" height="36" fill="${c.rock}" stroke="none" opacity=".45"/>
    <rect x="4" y="46" width="88" height="40" fill="${c.mantle}" stroke="none" opacity=".55"/>
    <rect x="4" y="10" width="88" height="76"/>
    <path d="M4 46h88" stroke-width="3.4" stroke-dasharray="9 5"/>
    <path d="M12 18l10 10-6 8 12 10" stroke="${c.paper}" stroke-width="2.6"/>
    <path d="M47 46l8 10-4 8 12 8" stroke="${c.paper}" stroke-width="2.6"/>
    <path d="M74 32c4 4 4 10 0 14" stroke-width="2" opacity=".7"/>
    <circle cx="70" cy="74" r="2.4" fill="${c.paper}" stroke="none"/>
    <circle cx="24" cy="70" r="2" fill="${c.paper}" stroke="none"/>
    <path d="M78 60c-2 8-6 12-12 16" stroke="${c.paper}" stroke-width="1.8"/>
  `,
};

for (const [name, inner] of Object.entries(icons)) {
  writeFileSync(join(out, name), wrap(inner), 'utf8');
}

console.log(`Ditulis ${Object.keys(icons).length} ilustrasi ke public/assets/img/milestones`);
