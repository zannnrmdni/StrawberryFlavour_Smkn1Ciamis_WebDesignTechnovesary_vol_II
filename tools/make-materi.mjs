/**
 * Generator ilustrasi "Isi lapisan ini".
 * Satu bahasa visual dengan ilustrasi milestone: garis tinta 2.6 px,
 * sudut membulat, bidang warna datar. Jalankan: node tools/make-materi.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'assets', 'img', 'materi');
mkdirSync(out, { recursive: true });

const c = {
  ink: '#16262B',
  paper: '#FFF6E6',
  sky: '#BFE4F5',
  leaf: '#86C254',
  sand: '#F3C64F',
  clay: '#DE7A45',
  crust: '#A9423A',
  humus: '#7B4B2A',
  topsoil: '#6B4428',
  subsoil: '#C47A34',
  weathered: '#D9B77A',
  bedrock: '#8793A1',
  stone: '#6F6862',
  rust: '#B4532A',
  copper: '#4FA58A',
  oil: '#2C2A28'
};

const wrap = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="96" height="96">
<g fill="none" stroke="${c.ink}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
${inner.trim()}
</g>
</svg>
`;

const icons = {
  'daun.svg': `
    <path d="M48 12c18 9 27 24 25 41-2 14-13 24-25 27-12-3-23-13-25-27-2-17 7-32 25-41z" fill="${c.leaf}"/>
    <path d="M48 16v58"/>
    <path d="M48 34l-12-7M48 34l12-7M48 48l-16-8M48 48l16-8M48 62l-12-6M48 62l12-6" stroke-width="2"/>
    <path d="M48 80v6" stroke-width="2.4"/>
  `,
  'ranting.svg': `
    <path d="M18 82C38 66 54 46 76 14" stroke="${c.humus}" stroke-width="6"/>
    <path d="M18 82C38 66 54 46 76 14" stroke-width="2.4"/>
    <path d="M38 62c-8-8-16-10-24-8M52 44c8-6 12-14 12-24M30 70c4-10 2-18-4-24" stroke-width="2"/>
    <path d="M18 52c-6-8-4-16 4-20 4 8 4 14-4 20z" fill="${c.leaf}"/>
    <path d="M60 28c-2-10 4-16 12-16 0 8-4 14-12 16z" fill="${c.leaf}"/>
    <path d="M26 70c8 4 14 2 18-4-8-4-14-2-18 4z" fill="${c.leaf}"/>
  `,
  'jamur.svg': `
    <path d="M24 46c0-14 10-24 24-24s24 10 24 24c0 4-4 6-8 6H32c-4 0-8-2-8-6z" fill="${c.clay}"/>
    <path d="M40 52h16v16c0 4-3 6-8 6s-8-2-8-6z" fill="${c.paper}"/>
    <circle cx="36" cy="38" r="3" fill="${c.paper}" stroke="none"/>
    <circle cx="52" cy="32" r="2.4" fill="${c.paper}" stroke="none"/>
    <circle cx="62" cy="42" r="3.4" fill="${c.paper}" stroke="none"/>
    <path d="M40 74c-8 2-14 6-18 12M48 76v10M56 74c8 2 14 6 18 12" stroke-width="2"/>
  `,
  'semut.svg': `
    <ellipse cx="50" cy="58" rx="12" ry="15" fill="${c.crust}"/>
    <circle cx="49" cy="40" r="8" fill="${c.crust}"/>
    <circle cx="49" cy="28" r="6" fill="${c.ink}"/>
    <path d="M45 23c-4-6-8-8-12-8M53 23c4-6 8-8 12-8" stroke-width="2"/>
    <path d="M38 36l-20-8M38 42l-22 4M39 48l-18 14M60 36l20-8M58 42l22 4M57 48l18 14" stroke-width="2"/>
    <path d="M44 56h10" stroke-width="2"/>
  `,
  'kumbang.svg': `
    <ellipse cx="48" cy="54" rx="20" ry="26" fill="${c.bedrock}"/>
    <path d="M48 30v48"/>
    <circle cx="48" cy="24" r="9" fill="${c.ink}"/>
    <path d="M42 17c-4-4-8-5-12-4M54 17c4-4 8-5 12-4"/>
    <path d="M30 38l-14-6M29 50l-16 0M31 62l-14 8M66 38l14-6M67 50h16M65 62l14 8" stroke-width="2"/>
    <circle cx="39" cy="46" r="3" fill="${c.paper}" stroke="none"/>
    <circle cx="57" cy="46" r="3" fill="${c.paper}" stroke="none"/>
    <circle cx="40" cy="62" r="2.2" fill="${c.paper}" stroke="none"/>
    <circle cx="56" cy="62" r="2.2" fill="${c.paper}" stroke="none"/>
  `,
  'humus.svg': `
    <path d="M10 78c2-16 12-24 24-24 6-10 22-12 32-4 10 2 18 12 20 28z" fill="${c.humus}"/>
    <path d="M10 78h76" stroke-width="2.4"/>
    <circle cx="28" cy="66" r="2.4" fill="${c.sand}" stroke="none"/>
    <circle cx="42" cy="58" r="1.8" fill="${c.weathered}" stroke="none"/>
    <circle cx="56" cy="68" r="2.2" fill="${c.sand}" stroke="none"/>
    <circle cx="68" cy="60" r="1.6" fill="${c.weathered}" stroke="none"/>
    <circle cx="36" cy="74" r="1.5" fill="${c.weathered}" stroke="none"/>
    <path d="M46 52c-3-8 2-14 10-16" stroke="${c.leaf}" stroke-width="3"/>
    <path d="M54 36c6-4 12-2 14 4-6 4-12 2-14-4z" fill="${c.leaf}"/>
  `,
  'akar-halus.svg': `
    <path d="M48 8v28" stroke="${c.humus}" stroke-width="5"/>
    <path d="M48 36c0 14-10 22-18 30M48 36c0 14 10 22 18 30M48 52c-8 6-12 12-14 20M48 52c8 6 12 12 14 20" stroke-width="2.4"/>
    <path d="M30 66c-6 4-10 8-12 14M66 66c6 4 10 8 12 14M34 72c-2 6-2 10 0 14M62 72c2 6 2 10 0 14" stroke-width="1.8"/>
    <path d="M8 82c14-6 26-4 40 0s26 4 40-2" stroke="${c.humus}" stroke-width="3" opacity=".55"/>
  `,
  'butiran.svg': `
    <circle cx="26" cy="32" r="10" fill="${c.weathered}"/>
    <circle cx="50" cy="24" r="7" fill="${c.paper}"/>
    <circle cx="68" cy="36" r="12" fill="${c.subsoil}"/>
    <circle cx="34" cy="54" r="8" fill="${c.sand}"/>
    <circle cx="58" cy="54" r="6" fill="${c.bedrock}"/>
    <circle cx="78" cy="60" r="8" fill="${c.weathered}"/>
    <circle cx="22" cy="72" r="7" fill="${c.clay}"/>
    <circle cx="46" cy="74" r="11" fill="${c.weathered}"/>
    <circle cx="70" cy="78" r="6" fill="${c.paper}"/>
    <circle cx="86" cy="26" r="3" fill="${c.ink}" stroke="none"/>
    <circle cx="12" cy="50" r="2.4" fill="${c.ink}" stroke="none"/>
  `,
  'air-pori.svg': `
    <circle cx="24" cy="30" r="11" fill="${c.weathered}"/>
    <circle cx="48" cy="22" r="8" fill="${c.subsoil}"/>
    <circle cx="70" cy="30" r="12" fill="${c.weathered}"/>
    <circle cx="30" cy="54" r="9" fill="${c.subsoil}"/>
    <circle cx="56" cy="50" r="10" fill="${c.weathered}"/>
    <circle cx="80" cy="54" r="8" fill="${c.subsoil}"/>
    <circle cx="22" cy="76" r="10" fill="${c.weathered}"/>
    <circle cx="50" cy="74" r="12" fill="${c.subsoil}"/>
    <circle cx="76" cy="78" r="9" fill="${c.weathered}"/>
    <path d="M8 42c10-6 18-4 26 2s16 6 24 0 20-4 30 2v46H8z" fill="${c.sky}" opacity=".8" stroke="none"/>
    <path d="M8 42c10-6 18-4 26 2s16 6 24 0 20-4 30 2" stroke="${c.ink}" stroke-width="2.2"/>
    <path d="M40 62c0 4 3 6 6 6" stroke="${c.paper}" stroke-width="2"/>
  `,
  'lempung.svg': `
    <path d="M16 30c8-10 30-12 44-6 12 5 20 16 20 28 0 10-6 18-18 22-14 5-30 4-42-4-10-6-14-16-12-24 1-6 4-11 8-16z" fill="${c.clay}"/>
    <path d="M30 22c-4 12-2 20 6 26M58 20c2 12-2 22-12 30M76 40c-10 2-16 8-18 18M40 52c8 2 14 8 16 18M22 56c6 0 10 4 12 10" stroke-width="2"/>
    <path d="M34 34c6-2 12-2 18 0" stroke="${c.paper}" stroke-width="2.6" opacity=".6"/>
  `,
  'kerikil.svg': `
    <path d="M12 38l12-12 16 4 6 15-10 12-16-3-8-9z" fill="${c.bedrock}"/>
    <path d="M52 22l14 2 10 10-4 14-14 4-10-11z" fill="${c.weathered}"/>
    <path d="M20 64l14-6 14 6 4 10-12 10-14-2-6-9z" fill="${c.subsoil}"/>
    <path d="M58 56l12-4 12 6 2 10-10 8-12-4-4-10z" fill="${c.stone}"/>
    <path d="M24 34l8-4M58 30l8 0M30 68l8-2" stroke="${c.paper}" stroke-width="2" opacity=".55"/>
  `,
  'mineral.svg': `
    <path d="M26 74l6-30 12-6 8 10 6 26z" fill="${c.sky}"/>
    <path d="M46 74l4-24 12-8 8 12 2 20z" fill="${c.paper}"/>
    <path d="M32 44l10 6 6-12M50 50l10 4 8-12" stroke-width="2"/>
    <path d="M16 74h66" stroke-width="2.4"/>
    <path d="M14 24c6 0 10 4 10 10M20 18v-6M26 20l4-4" stroke="${c.sky}" stroke-width="2.4"/>
    <path d="M72 18v10M68 22l8 2" stroke="${c.ink}" stroke-width="2"/>
  `,
  'pecahan-batu.svg': `
    <path d="M10 46l14-18 16 6-4 20-18 6z" fill="${c.bedrock}"/>
    <path d="M44 24l18-10 16 12-6 18-18 4z" fill="${c.weathered}"/>
    <path d="M40 58l16-8 18 10-4 18-20 6-10-10z" fill="${c.stone}"/>
    <path d="M18 72l10-8 12 4 2 12-14 4z" fill="${c.subsoil}"/>
    <path d="M16 42l12 6M50 30l12 8M48 64l10 8" stroke="${c.paper}" stroke-width="2" opacity=".5"/>
  `,
  'saprolit.svg': `
    <path d="M14 24h56v48H22l-4-8-6-6V34z" fill="${c.weathered}"/>
    <path d="M14 38h56M14 52h56M14 66h56" stroke="${c.ink}" stroke-width="2" opacity=".5"/>
    <path d="M24 24v48M46 24v48M64 24v48" stroke="${c.ink}" stroke-width="1.6" opacity=".35"/>
    <path d="M70 30l8-6 6 6-4 8M70 56l10-2 2 10-8 4M10 30l-4-6M8 62l-4 4" stroke-width="2"/>
    <circle cx="34" cy="60" r="2" fill="${c.ink}" stroke="none"/>
    <circle cx="58" cy="44" r="1.8" fill="${c.ink}" stroke="none"/>
  `,
  'akar-tunggang.svg': `
    <path d="M48 8v56c0 8-2 16-6 24" stroke="${c.humus}" stroke-width="7"/>
    <path d="M48 8v56c0 8-2 16-6 24" stroke-width="2.2"/>
    <path d="M48 28c-8 6-12 14-14 24M48 42c8 6 14 12 18 22M48 54c-6 6-10 14-12 22M44 70c-6 4-10 10-12 16" stroke-width="2.2"/>
    <path d="M8 30h80M8 60h80" stroke="${c.topsoil}" stroke-width="2" opacity=".4"/>
    <path d="M12 88c14-4 24-2 36 0s24 2 36-2" stroke="${c.humus}" stroke-width="2.6" opacity=".5"/>
  `,
  'granit.svg': `
    <path d="M14 30l18-14 34 2 16 18-6 34H24L10 52z" fill="${c.bedrock}"/>
    <path d="M22 28l10 6-4 8-12-2M52 18l6 10 12-2M60 44l10 2 4 10-12 4M30 52l8 8-6 10-12-4M44 68l10-4 6 8-8 10" stroke-width="2"/>
    <circle cx="36" cy="36" r="3" fill="${c.paper}" stroke="none"/>
    <circle cx="66" cy="30" r="2.6" fill="${c.paper}" stroke="none"/>
    <circle cx="48" cy="58" r="3" fill="${c.paper}" stroke="none"/>
    <circle cx="26" cy="70" r="2" fill="${c.paper}" stroke="none"/>
    <circle cx="72" cy="62" r="2.4" fill="${c.paper}" stroke="none"/>
  `,
  'basal.svg': `
    <path d="M14 20h20v56H14z" fill="${c.stone}"/>
    <path d="M38 14h20v62H38z" fill="${c.bedrock}"/>
    <path d="M62 20h20v56H62z" fill="${c.stone}"/>
    <path d="M24 20v56M48 14v62M72 20v56" stroke="${c.ink}" stroke-width="2"/>
    <path d="M14 20l10-8h20l-6 8M38 14l10-8h20l-6 8M62 20l10-8h20l-6 8" fill="${c.ink}" stroke-width="2"/>
    <path d="M18 40h12M42 36h12M66 44h12M18 62h12M42 60h12M66 64h12" stroke="${c.paper}" stroke-width="1.8" opacity=".4"/>
  `,
  'kuarsa.svg': `
    <path d="M38 74L42 26l8-10 8 12-2 46z" fill="${c.paper}"/>
    <path d="M58 74l4-32 10-6 6 12-6 26z" fill="${c.sky}"/>
    <path d="M22 74l6-26 8-6 4 10-4 22z" fill="${c.sky}"/>
    <path d="M42 26l8 8 4-14M60 42l8 8 8-14M28 48l6 6 6-12" stroke-width="2"/>
    <path d="M12 74h72" stroke-width="2.4"/>
  `,
  'rekahan.svg': `
    <path d="M12 26l64-8 10 50-70 8z" fill="${c.bedrock}"/>
    <path d="M40 18l-4 18 10 8-6 16 8 14" stroke="${c.ink}" stroke-width="4"/>
    <path d="M40 18l-4 18 10 8-6 16 8 14" stroke="${c.sky}" stroke-width="2"/>
    <path d="M46 44l14-4 4 12-12 4" fill="${c.sky}" stroke="${c.ink}" stroke-width="2.2"/>
    <path d="M58 28c0 4 3 6 6 6" stroke="${c.paper}" stroke-width="2"/>
    <circle cx="26" cy="36" r="2" fill="${c.ink}" stroke="none"/>
    <circle cx="70" cy="58" r="2.4" fill="${c.ink}" stroke="none"/>
  `,
  'fosil.svg': `
    <path d="M10 34l16-18 52 6 8 44-22 16-46-8z" fill="${c.weathered}"/>
    <circle cx="48" cy="50" r="22" fill="${c.paper}"/>
    <path d="M48 50c0-10 8-14 14-10s4 14-4 16-14-4-12-12 12-10 16-2" stroke-width="2.4"/>
    <path d="M48 28v44M26 50h44" stroke-width="1.6" opacity=".35"/>
    <path d="M18 26l8-6M70 26l8 6M18 66l10 6" stroke="${c.ink}" stroke-width="2" opacity=".5"/>
  `,
  'bijih-besi.svg': `
    <path d="M12 32l18-14 38 2 16 20-6 30-46 8-18-16z" fill="${c.stone}"/>
    <path d="M28 38c8-4 14 2 12 10s4 12 12 10 14 4 12 12" stroke="${c.rust}" stroke-width="6"/>
    <path d="M28 38c8-4 14 2 12 10s4 12 12 10 14 4 12 12" stroke-width="2"/>
    <circle cx="30" cy="62" r="4" fill="${c.rust}" stroke="none"/>
    <circle cx="64" cy="32" r="3" fill="${c.rust}" stroke="none"/>
    <path d="M20 46l8 4M52 58l8 2" stroke="${c.paper}" stroke-width="2" opacity=".45"/>
  `,
  'bijih-tembaga.svg': `
    <path d="M14 28l20-12 34 4 14 20-8 30-42 6-18-18z" fill="${c.bedrock}"/>
    <path d="M30 34l10 8-4 12 12 8M54 28l4 12 12 4M40 60l10 4 8-8" stroke="${c.copper}" stroke-width="5"/>
    <path d="M30 34l10 8-4 12 12 8M54 28l4 12 12 4M40 60l10 4 8-8" stroke-width="1.8"/>
    <circle cx="26" cy="54" r="3.4" fill="${c.copper}" stroke="none"/>
    <circle cx="66" cy="56" r="2.6" fill="${c.copper}" stroke="none"/>
  `,
  'emas.svg': `
    <path d="M12 34l16-16 46 4 12 22-8 30-50 8-14-20z" fill="${c.paper}"/>
    <path d="M28 44l8-10 14 4 2 14-12 8-12-6z" fill="${c.sand}"/>
    <path d="M54 24l12-2 8 10-4 12-14 2-6-12z" fill="${c.sand}"/>
    <path d="M32 62l10-4 10 6-2 12-12 2-8-8z" fill="${c.sand}"/>
    <path d="M22 30l10 6M58 46l10 4M22 64l6 4" stroke="${c.ink}" stroke-width="2"/>
    <path d="M20 44l6 2M66 26l4 4M60 78l4-4" stroke="${c.ink}" stroke-width="2" opacity=".5"/>
  `,
  'minyak.svg': `
    <path d="M8 58c14-6 24-2 34 0s22 2 32-2 12-2 14 0v34H8z" fill="${c.weathered}"/>
    <path d="M8 58c14-6 24-2 34 0s22 2 32-2 12-2 14 0" stroke-width="2.4"/>
    <path d="M20 78c0-10 10-16 22-16s24 6 24 16z" fill="${c.oil}"/>
    <path d="M24 58c-2-10 4-16 14-18" stroke="${c.stone}" stroke-width="2.4"/>
    <path d="M42 38l6-10 6 10" fill="${c.sand}"/>
    <path d="M20 26c4-6 10-6 14 0M60 22c4-6 10-6 14 0" stroke="${c.paper}" stroke-width="2" opacity=".6"/>
    <path d="M14 44h14M58 42h16" stroke="${c.ink}" stroke-width="1.8" opacity=".3"/>
  `,
  'geotermal.svg': `
    <path d="M8 70c14-8 26-6 40 0s26 6 40-2v22H8z" fill="${c.clay}"/>
    <path d="M8 70c14-8 26-6 40 0s26 6 40-2" stroke-width="2.4"/>
    <path d="M28 70c0-8 6-12 16-12s18 4 18 12z" fill="${c.sky}"/>
    <path d="M34 46c-6-8 0-12 2-18s-4-10 0-16M50 44c-6-8 0-12 2-18s-4-10 0-16M66 46c-6-8 0-12 2-18" stroke="${c.paper}" stroke-width="2.4"/>
    <path d="M20 86c6-8 14-10 24-8M52 82c8-4 16-2 24 4" stroke="${c.sand}" stroke-width="2.4"/>
    <circle cx="78" cy="80" r="3" fill="${c.sand}" stroke="none"/>
  `
};

let count = 0;
for (const [name, inner] of Object.entries(icons)) {
  writeFileSync(join(out, name), wrap(inner));
  count += 1;
}
console.log(`materi: ${count} ilustrasi ditulis ke ${out}`);
