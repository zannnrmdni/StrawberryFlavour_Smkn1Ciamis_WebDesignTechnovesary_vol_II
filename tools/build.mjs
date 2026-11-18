/**
 * tools/build.mjs — penghasil seluruh halaman statis Bumi Bawah.
 *
 * Sumber kebenaran ada di data/*.js. Skrip ini menulis:
 *   index.html, tentang.html, artikel.html, artikel/*.html,
 *   galeri.html, kontak.html, 404.html, sitemap.xml, robots.txt, .nojekyll
 *
 * Jalankan: npm run build:pages
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (path) => readFileSync(join(ROOT, path), 'utf8');
const write = (path, content) => {
  mkdirSync(dirname(join(ROOT, path)), { recursive: true });
  writeFileSync(join(ROOT, path), content, 'utf8');
};

/* ---------- Data ---------- */

const ctx = { window: {} };
vm.createContext(ctx);
for (const name of ['lapisan', 'materi', 'milestone', 'artikel', 'berita', 'galeri']) {
  vm.runInContext(read(`data/${name}.js`), ctx);
}

const layers = ctx.window.DATA_LAPISAN.slice().sort((a, b) => a.id - b.id);
const materials = ctx.window.DATA_MATERI;
const milestones = ctx.window.DATA_MILESTONE;
const articles = ctx.window.DATA_ARTIKEL.slice().sort((a, b) => b.tanggal.localeCompare(a.tanggal));
const news = ctx.window.DATA_BERITA.slice().sort((a, b) => b.tanggal.localeCompare(a.tanggal));
const plates = ctx.window.DATA_GALERI;

const layerById = new Map(layers.map((layer) => [layer.id, layer]));
const articleById = new Map(articles.map((article) => [article.id, article]));

/* ---------- Konfigurasi ---------- */

const configSource = read('assets/js/config.js');
const pick = (pattern, fallback = '') => {
  const match = configSource.match(pattern);
  return match ? match[1] : fallback;
};
const baseUrl = pick(/baseUrl:\s*'([^']*)'/, 'https://username.github.io/nama-repo/');
const siteName = pick(/siteName:\s*'([^']*)'/, 'Bumi Bawah');
const siteEmail = pick(/email:\s*'([^']*)'/, 'halo@bumibawah.id');
const siteLocation = pick(/location:\s*'([^']*)'/, 'Yogyakarta, Indonesia');

const deployPath = (() => {
  try {
    return new URL(baseUrl).pathname;
  } catch (error) {
    return './';
  }
})();
const isLocalPreview = deployPath === './' || deployPath === '/';

/* ---------- Format ---------- */

const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];
const number = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 1 });

function esc(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function fmtDate(iso) {
  const [year, month, day] = iso.split('-').map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

function unitOf(meters) {
  if (meters < 1) return ['cm', 100];
  if (meters < 1000) return ['m', 1];
  return ['km', 0.001];
}

function rangeLabel(layer) {
  const [minUnit, minFactor] = unitOf(layer.min);
  const [maxUnit, maxFactor] = unitOf(layer.max);
  const min = `${number.format(layer.min * minFactor)}${minUnit === 'm' ? ' ' : ' '}${minUnit}`;
  const max = `${number.format(layer.max * maxFactor)} ${maxUnit}`;
  if (minUnit === maxUnit) {
    return `${number.format(layer.min * minFactor)}–${max}`;
  }
  return `${min} – ${max}`;
}

function rangeShort(layer) {
  return rangeLabel(layer).replace(/ /g, ' ');
}

function slugify(value) {
  return String(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64);
}

function absoluteUrl(path) {
  return baseUrl.replace(/\/$/, '') + '/' + String(path).replace(/^\.?\//, '');
}

function json(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

/* ---------- Potongan tampilan ---------- */

const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

function picture(webp, fallback, alt, width, height, className = '', lazy = true) {
  return `<picture${className ? ` class="${className}"` : ''}>
  <source srcset="${esc(webp)}" type="image/webp">
  <img src="${esc(fallback)}" alt="${esc(alt)}" width="${width}" height="${height}"${lazy ? ' loading="lazy" decoding="async"' : ' decoding="async"'}>
</picture>`;
}

function wavySeam(color) {
  return `<div class="layer__seam" aria-hidden="true">
  <svg viewBox="0 0 1440 140" preserveAspectRatio="none" focusable="false">
    <path d="M0 0H1440V44c-118 26-236 38-355 38S845 56 722 46 474 10 352 16 118 42 0 64Z" fill="${color}"/>
    <path d="M0 64c118-22 234-42 352-48s248 12 370 30 238 30 357 26 243-16 361-42" fill="none" stroke="currentColor" stroke-opacity=".22" stroke-width="2"/>
  </svg>
</div>`;
}

function compositionBlock(layer) {
  const items = layer.komposisi.butir;
  const label = items.map((item) => `${item.label} ${item.tampil}`).join(', ');
  return `<div class="composition">
  <p class="composition__title">Susunan rata-rata</p>
  <div class="composition__bar" role="img" aria-label="Susunan: ${esc(label)}">
    ${items.map((item) => `<span style="--seg:${item.warna};flex-grow:${Math.max(1, item.nilai)}"></span>`).join('')}
  </div>
  <ul class="composition__legend">
    ${items.map((item) => `<li><span class="composition__swatch" style="--seg:${item.warna}"></span>${esc(item.label)} <strong>${esc(item.tampil)}</strong></li>`).join('')}
  </ul>
  <p class="composition__source">Sumber: <a href="${esc(layer.komposisi.sumber.url)}" target="_blank" rel="noopener">${esc(layer.komposisi.sumber.nama)}</a></p>
</div>`;
}

function milestoneItem(item, layer) {
  return `<li class="milestone" style="--at:${item.at}">
  <button class="milestone__button" type="button" data-milestone
    data-name="${esc(item.nama)}"
    data-depth="${esc(item.label)}"
    data-kind="${esc(item.jenis)}"
    data-layer-name="${esc(layer.nama)}"
    data-note="${esc(item.keterangan)}"
    data-image="${esc(item.gambar)}"
    data-source-name="${esc(item.sumber.nama)}"
    data-source-url="${esc(item.sumber.url)}">
    <span class="milestone__art"><img src="${esc(item.gambar)}" alt="" width="78" height="78" loading="lazy" decoding="async"></span>
    <span class="milestone__text">
      <span class="milestone__depth">${esc(item.label)}</span>
      <span class="milestone__name">${esc(item.nama)}</span>
      <span class="milestone__note">${esc(item.keterangan)}</span>
      <span class="milestone__source">${esc(item.sumber.nama)}</span>
    </span>
  </button>
</li>`;
}

function materiCard(item, layer) {
  return `<li>
  <button class="materi__item" type="button" data-materi
    data-nama="${esc(item.nama)}"
    data-kedalaman="${esc(item.kedalaman)}"
    data-jenis="${esc(item.jenis)}"
    data-lapisan="${esc(layer.nama)}"
    data-apa="${esc(item.apa)}"
    data-peran="${esc(item.peran)}"
    data-gambar="${esc(item.gambar)}"
    data-sumber-nama="${esc(item.sumber.nama)}"
    data-sumber-url="${esc(item.sumber.url)}"
    data-warna="${layer.warna}"
    aria-haspopup="dialog">
    <span class="materi__art"><img src="${esc(item.gambar)}" alt="" width="96" height="96" loading="lazy" decoding="async"></span>
    <span class="materi__name">${esc(item.nama)}</span>
    <span class="materi__depth">${esc(item.kedalaman)}</span>
  </button>
</li>`;
}

function layerSection(layer, index) {
  const previous = index === 0 ? '#7B4B2A' : layers[index - 1].warna;
  const items = materials.filter((item) => item.lapisan === layer.id);
  const marks = milestones.filter((item) => item.lapisan === layer.id);
  const lengths = [120, 120, 120, 120, 110, 170];
  const length = lengths[index];
  const dark = layer.warnaTeks.toLowerCase() === '#fff6e6';

  return `<section class="layer ${dark ? 'layer--dark' : 'layer--light'}" id="lapisan-${layer.id}" data-layer="${layer.id}"
  data-name="${esc(layer.nama)}" data-min="${layer.min}" data-max="${layer.max}"
  data-scroll-vh="${length}" data-temp="${esc(layer.suhu)}"
  data-color="${layer.warna}" data-ink="${layer.warnaTeks}"
  style="--layer:${layer.warna};--layer-ink:${layer.warnaTeks};--len:${length};--tex-speed:${layer.tekstur.speed};--tex-opacity:${layer.tekstur.opacity};--tex-blend:${layer.tekstur.blend}">
  ${wavySeam(previous)}
  <div class="layer__texture" data-tex="assets/img/tekstur/${esc(layer.tekstur.file)}" aria-hidden="true"></div>

  <div class="layer__header">
    <div class="layer__panel">
      <p class="layer__range">${esc(rangeLabel(layer))} · ${esc(layer.suhu)}</p>
      <h2 class="layer__name" id="judul-lapisan-${layer.id}" tabindex="-1">${esc(layer.nama)}</h2>
      <p class="layer__summary">${esc(layer.ringkas)}</p>
      <p class="layer__temp">Suhu rata-rata ${esc(layer.suhu)}</p>
      <dl class="layer__facts">
        <div><dt>Bahan</dt><dd>${esc(layer.bahan)}</dd></div>
        <div><dt>Proses</dt><dd>${esc(layer.proses)}</dd></div>
        <div><dt>Peran</dt><dd>${esc(layer.peran)}</dd></div>
        <div><dt>Ancaman</dt><dd>${esc(layer.ancaman)}</dd></div>
      </dl>
      ${compositionBlock(layer)}
    </div>
  </div>

  <ol class="layer__milestones" aria-label="Penanda kedalaman lapisan ${esc(layer.nama)}">
    ${marks.map((item) => milestoneItem(item, layer)).join('\n')}
  </ol>

  <section class="materi" aria-labelledby="materi-${layer.id}">
    <div class="materi__inner">
      <div class="materi__head">
        <div>
          <p class="materi__eyebrow">Isi lapisan ini</p>
          <h3 id="materi-${layer.id}">Apa saja yang ada di ${esc(layer.nama.toLowerCase())}?</h3>
        </div>
        <p class="materi__lede">Pilih satu benda untuk melihat ukuran, peran, dan sumbernya. Semua tombol bisa dipakai dengan papan ketik.</p>
      </div>
      <ul class="materi__grid">
        ${items.map((item) => materiCard(item, layer)).join('\n')}
      </ul>
      <details class="materi__alt">
        <summary>Baca daftar isi lapisan sebagai teks</summary>
        <ul>
          ${items.map((item) => `<li><strong>${esc(item.nama)}</strong> (${esc(item.kedalaman)}): ${esc(item.apa)} ${esc(item.peran)} <a href="${esc(item.sumber.url)}" target="_blank" rel="noopener">${esc(item.sumber.nama)}</a></li>`).join('\n')}
        </ul>
      </details>
    </div>
  </section>
</section>`;
}

function postCard(article, base, feature = false) {
  const layer = layerById.get(article.lapisan);
  const href = `${base}artikel/${article.slug}.html`;
  return `<article class="post-card${feature ? ' post-card--feature' : ''}" style="--accent:${layer.warna};--accent-ink:${layer.warnaTeks}">
  <span class="post-card__band" aria-hidden="true"></span>
  ${feature ? `<div class="post-card__media"><a href="${href}" tabindex="-1" aria-hidden="true">${picture(base + article.gambar, base + article.gambarCadangan, '', 1200, 600)}</a></div>` : ''}
  <div class="post-card__body">
    <p class="post-card__meta"><span class="post-card__layer">${esc(layer.pendek)}</span><span>${fmtDate(article.tanggal)} · ${article.menit} menit baca</span></p>
    <h3 class="post-card__title"><a href="${href}">${esc(article.judul)}</a></h3>
    <p class="post-card__summary">${esc(article.dek)}</p>
    <p class="post-card__foot"><span>${esc(article.penulis)}</span><a class="post-card__more" href="${href}">Baca ${ARROW}</a></p>
  </div>
</article>`;
}

function timelineItem(item) {
  const layer = layerById.get(item.lapisan);
  return `<li class="timeline__item" style="--accent:${layer.warna};--accent-ink:${layer.warnaTeks}">
  <span class="timeline__dot" aria-hidden="true"></span>
  <article class="timeline__card">
    <p class="timeline__meta">
      <time datetime="${item.tanggal}">${fmtDate(item.tanggal)}</time>
      <span class="timeline__layer"><span class="layer-dot" aria-hidden="true"></span>${esc(layer.pendek)} · ${esc(rangeLabel(layer))}</span>
    </p>
    <h3 class="timeline__title"><a href="${esc(item.sumber.url)}" target="_blank" rel="noopener">${esc(item.judul)}</a></h3>
    <p class="timeline__source">Sumber: ${esc(item.sumber.nama)}</p>
    <p class="timeline__summary">${esc(item.ringkasan)}</p>
    <div class="timeline__why">
      <p class="timeline__whylabel">Kenapa ini penting</p>
      <p>${esc(item.penting)}</p>
    </div>
  </article>
</li>`;
}

function strataFigure(layer) {
  const width = 720;
  const x = 58;
  const barWidth = 604;
  const top = 56;
  const band = 19;
  const bottom = top + 6 * band;
  const activeY = top + (layer.id - 1) * band;
  const titleId = 'infografik-judul';
  const descId = 'infografik-desc';
  return `<figure class="article-figure">
  <svg viewBox="0 0 ${width} 250" role="img" aria-labelledby="${titleId} ${descId}" class="strata-graphic">
    <title id="${titleId}">Enam lapisan dari permukaan sampai 35 kilometer</title>
    <desc id="${descId}">Enam pita warna mewakili lapisan yang dibahas di situs ini. Pita ${esc(layer.nama)} ditandai bingkai.</desc>
    <text x="${x}" y="32" class="strata-graphic__tick">0 m</text>
    <text x="${x + barWidth}" y="32" text-anchor="end" class="strata-graphic__tick">35 km</text>
    ${layers.map((item, index) => `<rect x="${x}" y="${top + index * band}" width="${barWidth}" height="${band}" fill="${item.warna}" stroke="#16262B" stroke-width="1"/>`).join('')}
    <rect x="${x - 7}" y="${activeY - 3}" width="${barWidth + 14}" height="${band + 6}" fill="none" stroke="#16262B" stroke-width="3"/>
    <path d="M${x + barWidth + 8} ${activeY + band / 2}h12V${bottom + 30}h-12" fill="none" stroke="#16262B" stroke-width="2"/>
    <text x="${x}" y="${bottom + 38}" class="strata-graphic__focus">Fokus: ${esc(layer.nama)}</text>
    <text x="${x}" y="${bottom + 60}" class="strata-graphic__note">${esc(rangeLabel(layer))} · ${esc(layer.suhu)}</text>
    <text x="${x + barWidth}" y="${bottom + 60}" text-anchor="end" class="strata-graphic__tick">Skala tidak linear</text>
  </svg>
  <figcaption>Pita lapisan disusun berurutan, bukan menurut ketebalan sebenarnya. Lapisan 1–4 masing-masing kurang dari 30 m; lapisan 6 membentang sampai 35 km.</figcaption>
  <p class="article-figure__hint">Geser grafik ke samping untuk membaca label.</p>
</figure>`;
}

function sideStrata(layer) {
  const width = 132;
  const height = 288;
  const x = 30;
  const top = 46;
  const band = 27;
  const mine = top + (layer.id - 1) * band;
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Posisi ${esc(layer.nama)} dalam enam lapisan" class="article-side__svg">
  <text x="0" y="18" class="strata-graphic__tick">permukaan</text>
  ${layers.map((item, index) => `<rect x="${x}" y="${top + index * band}" width="72" height="${band}" fill="${item.warna}" stroke="#16262B" stroke-width="1.2"/>`).join('')}
  <rect x="${x - 5}" y="${mine - 4}" width="82" height="${band + 8}" fill="none" stroke="#16262B" stroke-width="2.6"/>
  <text x="${x - 9}" y="${mine + 18}" text-anchor="end" class="strata-graphic__focus">${layer.id}</text>
  <text x="0" y="${top + 6 * band + 34}" class="strata-graphic__tick">35 km</text>
</svg>`;
}

/* ---------- Kepala halaman ---------- */

function head({ title, description, base, canonical, image, extra = '', bodyClass = '', page = '' }) {
  const fullTitle = title === siteName ? title : `${title} · ${siteName}`;
  const imageUrl = absoluteUrl(image || 'assets/img/galeri/hutan-leuser.webp');
  return `<!doctype html>
<html lang="id" class="no-js" data-base="${base}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(absoluteUrl(canonical))}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(siteName)}">
<meta property="og:locale" content="id_ID">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(absoluteUrl(canonical))}">
<meta property="og:image" content="${esc(imageUrl)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(fullTitle)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(imageUrl)}">
<meta name="theme-color" content="#FFF6E6">
<meta name="color-scheme" content="light">
<link rel="icon" href="${base}assets/img/favicon.svg" type="image/svg+xml">
<link rel="preload" href="${base}assets/fonts/literata-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${base}assets/fonts/gabarito-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${base}assets/css/app.css">
<script>document.documentElement.classList.remove('no-js');document.documentElement.classList.add('js');</script>
${extra}
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''} data-page="${page}">
<a class="skip-link" href="#konten">Lewati ke isi</a>
<div data-site-header></div>
`;
}

function foot(base, { home = false } = {}) {
  return `<div data-site-footer></div>
<script src="${base}assets/js/config.js"></script>
<script src="${base}assets/js/layout.js"></script>
${home ? `<script src="${base}assets/vendor/gsap/gsap.min.js"></script>
<script src="${base}assets/vendor/gsap/ScrollTrigger.min.js"></script>
<script src="${base}assets/js/home.min.js"></script>` : ''}
<script src="${base}assets/js/core.min.js"></script>
</body>
</html>
`;
}

/* ---------- Beranda ---------- */

function homePage() {
  const latest = articles.slice(0, 3);
  const facts = [24, 22, 20, 25].map((id) => milestones.find((item) => item.id === id)).filter(Boolean);
  const homePlates = plates.slice(0, 3);
  const desc = 'Turun dari serasah ke kerak bumi: enam lapisan, 25 penanda kedalaman, 44 isi lapisan, artikel, dan galeri ilustrasi.';

  return head({
    title: siteName,
    description: desc,
    base: './',
    canonical: 'index.html',
    page: 'home',
    bodyClass: 'is-home',
    extra: `<meta property="og:type" content="website">
<script type="application/ld+json">${json({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: absoluteUrl('index.html'),
      inLanguage: 'id-ID',
      description: desc
    })}</script>`
  }) + `<main id="konten">
<section class="orbit" data-orbit>
  <div class="orbit__stage">
    <div class="orbit__space" aria-hidden="true"></div>
    <img class="orbit__static" src="assets/img/earth/earth_globe.jpg" alt="Bumi dilihat dari ruang angkasa" width="1024" height="1024">
    <canvas class="orbit__canvas" data-earth-canvas
      data-texture-hi="assets/img/earth/earth_atmos_2048.jpg"
      data-texture-lo="assets/img/earth/earth_atmos_1024.jpg"
      data-texture-clouds="assets/img/earth/earth_clouds_1024.png"
      aria-label="Bumi tiga dimensi. Geser untuk memutar."></canvas>
    <div class="orbit__scrim" aria-hidden="true"></div>
    <div class="orbit__copy" data-orbit-copy>
      <p class="orbit__eyebrow">Perjalanan ke bawah permukaan</p>
      <h1>Di bawah kaki, ada dunia lain.</h1>
      <p class="orbit__lede">Kita berdiri di atas enam lapisan yang saling menopang: dari daun yang baru jatuh sampai batas kerak 35 kilometer. Gulir untuk mulai turun.</p>
      <div class="orbit__actions">
        <a class="btn btn--paper" href="#lapisan-1" data-start>Mulai turun ${ARROW}</a>
        <a class="btn btn--outline" href="artikel.html">Baca artikel</a>
      </div>
      <p class="orbit__hint">Gulir untuk turun · tarik bumi untuk memutar</p>
    </div>
    <div class="orbit__arrival" data-arrival aria-hidden="true">
      <p class="orbit__arrivaldepth">0 cm</p>
      <p class="orbit__arrivaltitle">Serasah dan humus</p>
      <p class="orbit__arrivalnote">Perjalanan dimulai dari sisa daun yang belum selesai membusuk.</p>
    </div>
    <p class="orbit__credit">Foto bumi: NASA Blue Marble · domain publik</p>
  </div>
</section>

<aside class="gauge" data-gauge aria-label="Alat ukur kedalaman">
  <div class="gauge__readout">
    <p class="gauge__label">Kedalaman</p>
    <p class="gauge__value"><span data-gauge-value>0</span><span class="gauge__unit" data-gauge-unit>cm</span></p>
    <p class="gauge__temp" data-gauge-temp>${esc(layers[0].suhu)}</p>
    <p class="gauge__name" data-gauge-name>${esc(layers[0].pendek)}</p>
  </div>
  <div class="gauge__track">
    <span class="gauge__marker" data-gauge-marker aria-hidden="true"></span>
    ${layers.map((layer) => `<button class="gauge__seg" type="button" data-jump="lapisan-${layer.id}" style="--seg-color:${layer.warna};--seg-ink:${layer.warnaTeks}" aria-label="Lompat ke ${esc(layer.nama)}"><span>${esc(layer.pendek)}</span></button>`).join('\n    ')}
  </div>
  <p class="sr-only" aria-live="polite" data-gauge-status></p>
</aside>

<section class="journey">
  <div class="journey__threshold">
    <p class="journey__zero">0 m</p>
    <h2>Tanah mulai bekerja di sentimeter pertama.</h2>
    <p>Skala di halaman ini tidak linear. Sepuluh sentimeter pertama memuat lebih banyak kehidupan daripada seratus meter di bawahnya, jadi lapisan tipis sengaja diberi ruang lebih panjang. Angka kedalaman tetap memakai ukuran sebenarnya.</p>
  </div>
  <div class="layers">
    ${layers.map((layer, index) => layerSection(layer, index)).join('\n')}
  </div>
  <div class="tail">
    <p class="tail__depth">35 km</p>
    <h2>Kerak hanya kulit tipis di bola yang radiusnya 6.371 km.</h2>
    <p class="tail__lede">Batas Moho menandai peralihan dari kerak ke mantel. Di bawahnya masih ada 2.900 km batuan panas, inti luar yang cair, dan inti dalam yang padat. Semua yang kita gali, bor, dan bangun hanya menyentuh bagian paling luar.</p>
    <div class="tail__actions">
      <a class="btn btn--paper" href="#potongan-bumi">Lihat potongan bumi</a>
      <a class="btn btn--outline" href="artikel.html">Artikel tentang batas kerak</a>
    </div>
    <p class="tail__note">Kedalaman dan suhu diambil dari sumber yang dicantumkan pada tiap penanda. Warna lapisan adalah penyederhanaan untuk membaca, bukan contoh batuan yang bisa dipakai di lapangan.</p>
  </div>
</section>

<section class="cutaway" id="potongan-bumi" data-cutaway>
  <div class="cutaway__inner">
    <div class="cutaway__head">
      <div>
        <p class="section-head__eyebrow">Skala bumi</p>
        <h2>Bumi yang dipotong, dari kerak sampai inti dalam.</h2>
      </div>
      <div class="cutaway__intro">
        <p>Kerak, mantel, inti luar, dan inti dalam. Perhatikan bahwa kerak di gambar ini dipertebal agar terlihat; pada bola bumi ia lebih tipis dari kulit apel.</p>
        <p class="cutaway__note">Warna inti adalah perkiraan visual. Suhu inti dalam sekitar 5.400 °C, setara permukaan Matahari.</p>
      </div>
    </div>
    <div class="cutaway__stage">
      <img class="cutaway__static" src="assets/img/cutaway/bumi-potong.svg" alt="Potongan bumi memperlihatkan kerak tipis, mantel tebal, inti luar, dan inti dalam" width="1000" height="800">
      <canvas class="cutaway__canvas" data-cutaway-canvas data-texture-hi="assets/img/earth/earth_atmos_2048.jpg" data-texture-lo="assets/img/earth/earth_atmos_1024.jpg" aria-label="Bumi tiga dimensi yang dipotong. Geser untuk memutar."></canvas>
      <div class="cutaway__tags" aria-hidden="true">
        <span class="cutaway__tag cutaway__tag--crust">Kerak 0–35 km</span>
        <span class="cutaway__tag cutaway__tag--moho">Batas Moho</span>
        <span class="cutaway__tag cutaway__tag--mantle">Mantel 35–2.890 km</span>
      </div>
      <p class="cutaway__credit">Ilustrasi dan model: Bumi Bawah (CC0). Foto permukaan: NASA.</p>
    </div>
    <ul class="cutaway__legend">
      ${[
        ['Kerak', '0–35 km', '#6F6862'],
        ['Mantel', '35–2.890 km', '#E0612F'],
        ['Inti luar', '2.890–5.150 km', '#F2A33C'],
        ['Inti dalam', '5.150–6.371 km', '#F7E3A1']
      ].map(([name, depth, color]) => `<li style="--legend:${color}"><span class="cutaway__swatch" aria-hidden="true"></span><span class="cutaway__legendname">${name}</span><span class="cutaway__legenddepth">${depth}</span></li>`).join('\n      ')}
    </ul>
  </div>
</section>

<section class="home-recent">
  <div class="home-recent__inner">
    <div class="section-head">
      <div>
        <p class="section-head__eyebrow">Dari arsip</p>
        <h2>Bacaan yang mulai dari lapisan paling atas.</h2>
      </div>
      <a class="section-head__link" href="artikel.html">Semua artikel</a>
    </div>
    <div class="archive__grid">
      ${latest.map((article) => postCard(article, './')).join('\n      ')}
    </div>
  </div>
</section>

<section class="home-gallery">
  <div class="home-gallery__inner">
    <div class="section-head">
      <div>
        <p class="section-head__eyebrow">Galeri</p>
        <h2>Lapisan yang terlihat di lapangan.</h2>
      </div>
      <a class="section-head__link" href="galeri.html">Buka galeri</a>
    </div>
    <div class="home-gallery__grid">
      ${homePlates.map((plate, index) => `<figure class="home-plate home-plate--${index + 1}">
        <a href="galeri.html?kategori=${encodeURIComponent(plate.kategori)}">
          ${picture(plate.gambar, plate.gambarCadangan, plate.judul, 1200, 900)}
        </a>
        <figcaption><span class="home-plate__title">${esc(plate.judul)}</span><span class="home-plate__place">${esc(plate.lokasi)}</span></figcaption>
      </figure>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="home-facts">
  <div class="home-facts__inner">
    <div class="section-head section-head--on-dark">
      <div>
        <p class="section-head__eyebrow">Empat angka</p>
        <h2>Seberapa dalam manusia pernah sampai?</h2>
      </div>
      <p class="home-facts__note">Semua angka di bawah punya sumber. Beberapa di antaranya sangat sulit diperiksa ulang, jadi kami cantumkan catatan verifikasinya di halaman tentang.</p>
    </div>
    <ul class="fact-list">
      ${facts.map((fact) => {
        const layer = layerById.get(fact.lapisan);
        return `<li class="fact" style="--fact-accent:${layer.warna}">
        <p class="fact__value">${esc(fact.label)}</p>
        <div class="fact__body">
          <h3>${esc(fact.nama)}</h3>
          <p>${esc(fact.keterangan)}</p>
          <a href="${esc(fact.sumber.url)}" target="_blank" rel="noopener">${esc(fact.sumber.nama)}</a>
        </div>
      </li>`;
      }).join('\n      ')}
    </ul>
  </div>
</section>

<section class="closing-cta closing-cta--home">
  <div class="closing-cta__inner">
    <p class="closing-cta__eyebrow">Bantu kami menjaga akurasi</p>
    <h2>Ada angka yang perlu dikoreksi, atau cerita lapangan yang belum tercatat?</h2>
    <div class="closing-cta__actions">
      <a class="btn btn--ink" href="kontak.html">Kirim koreksi ${ARROW}</a>
      <a class="btn btn--outline" href="tentang.html#metode">Cara kami bekerja</a>
    </div>
  </div>
</section>
</main>

<dialog class="specimen" data-specimen aria-labelledby="spesimen-judul">
  <button class="specimen__close" type="button" data-specimen-close aria-label="Tutup detail">${CLOSE}</button>
  <div class="specimen__panel">
    <div class="specimen__art"><img data-specimen-image src="assets/img/materi/daun.svg" alt="" width="220" height="220"></div>
    <div class="specimen__body">
      <p class="specimen__depth" data-specimen-depth></p>
      <h2 id="spesimen-judul" data-specimen-title></h2>
      <p class="specimen__meta"><span data-specimen-kind></span> · <span data-specimen-layer></span></p>
      <p class="specimen__note" data-specimen-note></p>
      <a class="specimen__source" data-specimen-source href="#" target="_blank" rel="noopener">Sumber: <span data-specimen-source-name></span></a>
    </div>
  </div>
</dialog>

<dialog class="specimen" data-materi-dialog aria-labelledby="materi-dialog-judul">
  <button class="specimen__close" type="button" data-materi-close aria-label="Tutup detail benda">${CLOSE}</button>
  <div class="specimen__panel">
    <div class="specimen__art"><img data-materi-image src="assets/img/materi/daun.svg" alt="" width="220" height="220"></div>
    <div class="specimen__body">
      <p class="specimen__depth" data-materi-depth></p>
      <h2 id="materi-dialog-judul" data-materi-title></h2>
      <p class="specimen__meta"><span data-materi-kind></span> · <span data-materi-layer></span></p>
      <p class="specimen__note" data-materi-apa></p>
      <p class="specimen__note" data-materi-peran></p>
      <a class="specimen__source" data-materi-source href="#" target="_blank" rel="noopener">Sumber: <span data-materi-source-name></span></a>
    </div>
  </div>
</dialog>

<div class="materi-preview" data-materi-preview hidden aria-hidden="true">
  <div class="materi-preview__art"><img data-preview-image src="assets/img/materi/daun.svg" alt="" width="96" height="96"></div>
  <div>
    <p class="materi-preview__title" data-preview-title></p>
    <p class="materi-preview__depth" data-preview-depth></p>
    <p class="materi-preview__apa" data-preview-apa></p>
  </div>
</div>
` + foot('./', { home: true });
}

/* ---------- Tentang ---------- */

function aboutPage() {
  const materialCount = materials.length;
  const description = 'Tentang Bumi Bawah: cara membaca skala kedalaman, sumber data, lisensi, dan daftar rujukan geologi serta ilmu tanah.';

  return head({
    title: 'Tentang dan sumber',
    description,
    base: './',
    canonical: 'tentang.html',
    page: 'tentang'
  }) + `<main id="konten">
<section class="about-hero">
  <div class="about-hero__inner">
    <p class="page-head__eyebrow">Tentang situs</p>
    <h1>Membaca tanah sebagai arsip yang masih bekerja.</h1>
    <p class="about-hero__lede">Bumi Bawah adalah situs edukasi tanpa iklan dan tanpa pelacak. Kami menyusun satu perjalanan dari permukaan sampai batas kerak, lalu membuka angka dan sumber di balik setiap klaim.</p>
    <dl class="about-stats">
      <div><dt>Lapisan</dt><dd>${layers.length}</dd></div>
      <div><dt>Penanda kedalaman</dt><dd>${milestones.length}</dd></div>
      <div><dt>Isi lapisan</dt><dd>${materialCount}</dd></div>
      <div><dt>Tulisan</dt><dd>${articles.length}</dd></div>
    </dl>
  </div>
</section>

<section class="about-section about-section--paper" id="metode">
  <div class="about-section__inner about-section__inner--split">
    <div class="about-prose">
      <p class="section-head__eyebrow">Metode</p>
      <h2>Angka boleh besar, sumbernya harus bisa dibuka.</h2>
    </div>
    <div class="about-prose">
      <p>Setiap penanda kedalaman punya tautan ke sumber yang kami pakai. Bila dua sumber berbeda, kami memilih angka yang paling banyak dikutip dan menuliskan selisihnya di catatan. Untuk besaran yang berubah menurut tempat, seperti suhu atau ketebalan lapisan, kami memakai rentang, bukan satu angka.</p>
      <p>Warna lapisan adalah alat baca, bukan peta geologi. Tanah di satu lembah bisa sangat berbeda dari tanah di lembah sebelahnya. Kedalaman pada halaman beranda juga tidak linear: lapisan setipis 10 cm mendapat ruang gulir lebih panjang daripada lapisan batuan setebal ratusan meter, supaya kehidupan di dalamnya bisa ditampilkan.</p>
      <p>Kami tidak memakai foto stok untuk menggambarkan tempat yang tidak kami kunjungi. Semua ilustrasi digambar sendiri dan diberi label sebagai ilustrasi. Tautan berita di tab Kabar Bumi menuju media aslinya; kami hanya menulis ringkasan dan alasan mengapa berita itu penting.</p>
    </div>
  </div>
</section>

<section class="about-section" id="lapisan">
  <div class="about-section__inner">
    <p class="section-head__eyebrow">Enam lapisan</p>
    <h2>Dari serasah ke kerak: satu warna untuk satu peran.</h2>
    <p class="about-section__lede">Urutan warna di bawah dipakai konsisten di seluruh situs, termasuk pada alat ukur kedalaman dan artikel.</p>
    <ul class="about-notes">
      ${layers.map((layer) => `<li style="border-top:8px solid ${layer.warna}">
        <h3>${esc(layer.nama)}</h3>
        <p><strong>${esc(rangeLabel(layer))}.</strong> ${esc(layer.ringkas)}</p>
        <p class="about-layer__source">Sumber susunan: <a href="${esc(layer.komposisi.sumber.url)}" target="_blank" rel="noopener">${esc(layer.komposisi.sumber.nama)}</a></p>
      </li>`).join('\n      ')}
    </ul>
  </div>
</section>

<section class="about-section about-section--paper" id="dalam">
  <div class="about-section__inner about-section__inner--split">
    <div class="about-prose">
      <p class="section-head__eyebrow">Di bawah kerak</p>
      <h2>Kerak berakhir, bumi tidak.</h2>
    </div>
    <div class="about-prose">
      <p>Batas Moho berada sekitar 35 km di bawah benua dan 7 km di bawah samudra. Di bawahnya mantel membentang sampai kedalaman 2.890 km. Meskipun padat, batuan mantel mengalir sangat lambat dalam skala waktu geologi dan menggerakkan lempeng di permukaan.</p>
      <p>Inti luar berupa logam cair dan menjadi sumber medan magnet bumi. Inti dalam diperkirakan padat karena tekanannya sangat tinggi, dengan suhu sekitar 5.400 °C. Semua angka ini berasal dari gelombang seismik, bukan dari pengeboran; lubang terdalam yang pernah dibuat manusia baru 12.262 m.</p>
      <ul class="about-core">
        <li><span style="--seg:#6F6862"></span><strong>Kerak</strong> 0–35 km</li>
        <li><span style="--seg:#E0612F"></span><strong>Mantel</strong> 35–2.890 km</li>
        <li><span style="--seg:#F2A33C"></span><strong>Inti luar</strong> 2.890–5.150 km</li>
        <li><span style="--seg:#F7E3A1"></span><strong>Inti dalam</strong> 5.150–6.371 km</li>
      </ul>
    </div>
  </div>
</section>

<section class="about-section about-section--references" id="rujukan">
  <div class="about-section__inner">
    <p class="section-head__eyebrow">Rujukan</p>
    <h2>Bahan bacaan yang kami pakai.</h2>
    <p class="about-section__lede">Daftar ini bukan daftar lengkap. Sumber khusus untuk satu angka atau satu artikel tercantum pada halaman yang bersangkutan.</p>
    <ul class="reference-list">
      <li><a href="https://www.nrcs.usda.gov/conservation-basics/natural-resource-concerns/soils/soil-health" target="_blank" rel="noopener">USDA NRCS — Soil Health</a></li>
      <li><a href="https://www.nrcs.usda.gov/resources/education-and-teaching-materials/soil-texture-guide" target="_blank" rel="noopener">USDA NRCS — Soil Texture Guide</a></li>
      <li><a href="https://pubs.usgs.gov/gip/interior/" target="_blank" rel="noopener">USGS — The Interior of the Earth</a></li>
      <li><a href="https://earthquake.usgs.gov/learn/glossary/?term=moho" target="_blank" rel="noopener">USGS — Moho glossary</a></li>
      <li><a href="https://science.nasa.gov/earth/facts/" target="_blank" rel="noopener">NASA — Earth facts</a></li>
      <li><a href="https://www.britannica.com/science/soil" target="_blank" rel="noopener">Encyclopaedia Britannica — Soil</a></li>
      <li><a href="https://www.fao.org/soils-portal/data-hub/soil-classification/en/" target="_blank" rel="noopener">FAO — Soil classification</a></li>
      <li><a href="https://www.usgs.gov/programs/earthquake-hazards/science/earthquakes" target="_blank" rel="noopener">USGS — Earthquakes</a></li>
    </ul>
    <p class="about-section__note">Angka suhu inti dan ketebalan lapisan adalah rentang ilmiah yang terus diperbarui. Bila Anda menemukan sumber yang lebih baik, kirimkan lewat halaman kontak.</p>
  </div>
</section>

<section class="about-section about-section--licenses" id="lisensi">
  <div class="about-section__inner">
    <p class="section-head__eyebrow">Lisensi</p>
    <h2>Boleh dipakai, dengan kredit.</h2>
    <p class="about-section__lede">Teks, ilustrasi, dan tekstur buatan kami dirilis sebagai CC0. Aset pihak ketiga memakai lisensinya masing-masing seperti di bawah.</p>
    <p class="license-table__hint">Tabel bisa digeser ke samping untuk melihat semua kolom.</p>
    <div class="license-table" role="table" aria-label="Daftar lisensi aset">
      <div class="license-table__row license-table__head" role="row">
        <span role="columnheader">Aset</span><span role="columnheader">Pembuat</span><span role="columnheader">Lisensi</span><span role="columnheader">Catatan</span>
      </div>
      <div class="license-table__row" role="row"><span role="cell">Teks dan artikel</span><span role="cell">Tim Bumi Bawah</span><span role="cell">CC0 1.0</span><span role="cell">Bebas dipakai; kredit tidak wajib tetapi dihargai.</span></div>
      <div class="license-table__row" role="row"><span role="cell">Ilustrasi SVG dan tekstur WebP</span><span role="cell">Tim Bumi Bawah</span><span role="cell">CC0 1.0</span><span role="cell">Dibuat sendiri secara prosedural dari bentuk dan derau.</span></div>
      <div class="license-table__row" role="row"><span role="cell">Foto Bumi</span><span role="cell">NASA Blue Marble</span><span role="cell">Domain publik</span><span role="cell">Tidak menyiratkan dukungan NASA.</span></div>
      <div class="license-table__row" role="row"><span role="cell">Three.js</span><span role="cell">Three.js contributors</span><span role="cell">MIT</span><span role="cell">Berkas lokal di <code>assets/vendor/three</code>.</span></div>
      <div class="license-table__row" role="row"><span role="cell">GSAP dan ScrollTrigger</span><span role="cell">Webflow / GreenSock</span><span role="cell">Lisensi standar GreenSock</span><span role="cell">Dipakai tanpa biaya sesuai lisensi.</span></div>
      <div class="license-table__row" role="row"><span role="cell">Tailwind CSS, esbuild</span><span role="cell">Masing-masing proyek</span><span role="cell">MIT</span><span role="cell">Alat build, tidak dikirim ke peramban selain CSS hasil.</span></div>
      <div class="license-table__row" role="row"><span role="cell">Font Gabarito</span><span role="cell">Rodrigo Fuenzalida</span><span role="cell">SIL OFL 1.1</span><span role="cell">Disimpan lokal di <code>assets/fonts</code>.</span></div>
      <div class="license-table__row" role="row"><span role="cell">Font Literata</span><span role="cell">TypeTogether</span><span role="cell">SIL OFL 1.1</span><span role="cell">Disimpan lokal di <code>assets/fonts</code>.</span></div>
    </div>
    <p class="about-section__note">Sumber berita dan jurnal tetap milik penerbitnya. Kami tidak menyalin teks atau foto mereka; yang kami tulis adalah ringkasan dan tautan.</p>
  </div>
</section>

<section class="about-section">
  <div class="about-section__inner about-section__inner--split">
    <div class="maker-card">
      <div class="maker-card__mark" aria-hidden="true">
        <svg viewBox="0 0 96 96" role="img" aria-label="Lambang lapisan Bumi Bawah">
          <rect width="96" height="96" fill="#FFF6E6"/>
          <rect x="8" y="8" width="80" height="80" fill="none" stroke="#16262B" stroke-width="4"/>
          <rect x="14" y="16" width="68" height="13" fill="#4A3322"/>
          <rect x="14" y="29" width="68" height="16" fill="#6B4428"/>
          <rect x="14" y="45" width="68" height="18" fill="#C47A34"/>
          <rect x="14" y="63" width="68" height="19" fill="#D9B77A"/>
        </svg>
      </div>
      <p class="maker-card__label">Dibuat di ${esc(siteLocation)}</p>
      <h2>Tim Bumi Bawah</h2>
      <p>Situs ini dikerjakan sebagai proyek edukasi mandiri. Kami bukan lembaga resmi dan tidak mewakili USDA, USGS, atau NASA. Koreksi dari pembaca adalah bagian dari metode kami.</p>
      <p><a class="link-underline" href="kontak.html">Kirim koreksi atau usulan sumber</a></p>
    </div>
    <div class="about-prose">
      <p class="section-head__eyebrow">Cara memakai</p>
      <h2>Semua halaman bisa dibuka tanpa akun.</h2>
      <p>Beranda memuat perjalanan vertikal, alat ukur kedalaman, dan potongan bumi tiga dimensi. Bila perangkat meminta gerak dikurangi, animasi dan tekstur parallax dimatikan otomatis. Tab Artikel dan Kabar Bumi berada di halaman arsip; galeri dapat disaring menurut kategori.</p>
      <p>Situs ini statis: tidak ada basis data, formulir masuk, atau pelacak. Formulir kontak dikirim lewat layanan pihak ketiga bila kuncinya diisi, atau dibuka sebagai surel biasa bila belum. Seluruh kode dan data ada di repositori sehingga bisa diperiksa dan dicabut.</p>
      <p><a class="link-underline" href="index.html">Kembali ke perjalanan</a></p>
    </div>
  </div>
</section>
</main>
` + foot('./');
}

/* ---------- Arsip: Artikel dan Kabar Bumi ---------- */

function archivePage() {
  const [lead, ...rest] = articles;
  const leadLayer = layerById.get(lead.lapisan);
  const description = 'Delapan tulisan editorial tentang tanah, air, batuan, gua, dan batas kerak, plus kabar Bumi yang dikurasi dengan tautan sumber.';

  return head({
    title: 'Artikel dan Kabar Bumi',
    description,
    base: './',
    canonical: 'artikel.html',
    page: 'artikel'
  }) + `<main id="konten">
<div class="page-head page-head--archive">
  <div class="page-head__inner">
    <p class="page-head__eyebrow">Arsip</p>
    <h1>Bacaan dari bawah permukaan.</h1>
    <p class="page-head__lede">Dua rak: tulisan panjang yang menjelaskan proses, dan kabar terbaru yang kami kurasi dari media serta jurnal. Semua tautan menuju sumber aslinya.</p>
    <div class="archive-tabs" data-tabs>
      <div class="archive-tabs__list" role="tablist" aria-label="Jenis arsip">
        <button class="archive-tab" id="tab-artikel" type="button" role="tab" aria-selected="true" aria-controls="panel-artikel" data-tab="artikel">Artikel <span>${articles.length}</span></button>
        <button class="archive-tab" id="tab-kabar" type="button" role="tab" aria-selected="false" aria-controls="panel-kabar" data-tab="kabar" tabindex="-1">Kabar Bumi <span>${news.length}</span></button>
      </div>
    </div>
  </div>
</div>

<section class="archive is-active" id="panel-artikel" role="tabpanel" aria-labelledby="tab-artikel" data-panel="artikel">
  <div class="archive__inner">
    <article class="lead" style="--accent:${leadLayer.warna};--accent-ink:${leadLayer.warnaTeks}">
      <a class="lead__media" href="artikel/${lead.slug}.html" tabindex="-1" aria-hidden="true">
        ${picture(lead.gambar, lead.gambarCadangan, '', 1200, 750, '', false)}
      </a>
      <div class="lead__body">
        <p class="lead__kicker"><span class="lead__layer"><span class="layer-dot" aria-hidden="true"></span>${esc(leadLayer.nama)}</span><span>${fmtDate(lead.tanggal)} · ${lead.menit} menit baca</span></p>
        <h2 class="lead__title"><a href="artikel/${lead.slug}.html">${esc(lead.judul)}</a></h2>
        <p class="lead__dek">${esc(lead.dek)}</p>
        <p class="lead__meta">Oleh ${esc(lead.penulis)} · ${lead.kata} kata</p>
        <a class="lead__more" href="artikel/${lead.slug}.html">Baca cerita utama ${ARROW}</a>
      </div>
    </article>

    <div class="editorial-grid">
      ${rest.map((article, index) => postCard(article, './', index === 3)).join('\n      ')}
    </div>
  </div>
</section>

<section class="archive archive--news" id="panel-kabar" role="tabpanel" aria-labelledby="tab-kabar" data-panel="kabar">
  <div class="archive__inner">
    <div class="section-head">
      <div>
        <p class="section-head__eyebrow">Kabar Bumi</p>
        <h2>Delapan peristiwa yang mengubah cara membaca lapisan.</h2>
      </div>
      <p class="archive-count">Disusun manual, diurutkan dari yang terbaru. Ringkasan ditulis sendiri; tidak ada teks atau foto yang disalin.</p>
    </div>
    <ol class="timeline">
      ${news.map((item) => timelineItem(item)).join('\n      ')}
    </ol>
    <p class="archive-count">Tautan keluar menuju penerbit asli. Bila satu tautan mati, kirimkan alamat arsipnya lewat <a class="link-underline" href="kontak.html">halaman kontak</a>.</p>
  </div>
</section>
</main>
` + foot('./');
}

/* ---------- Artikel tunggal ---------- */

function glossaryHtml(html, glossary) {
  if (!glossary || glossary.length === 0) return { html, used: [] };
  const used = new Set();
  const tokens = html.split(/(<[^>]+>)/);
  const result = tokens.map((token) => {
    if (token.startsWith('<')) return token;
    let text = token;
    glossary.forEach((entry) => {
      if (used.has(entry.istilah)) return;
      const escaped = entry.istilah.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const match = new RegExp(`\\b(${escaped})\\b`, 'i').exec(text);
      if (!match) return;
      used.add(entry.istilah);
      const id = `glos-${slugify(entry.istilah)}`;
      text = text.slice(0, match.index) +
        `<span class="gloss" tabindex="0" aria-describedby="${id}">${match[0]}<span class="gloss__tip" id="${id}" role="tooltip">${esc(entry.arti)}</span></span>` +
        text.slice(match.index + match[0].length);
    });
    return text;
  });
  return { html: result.join(''), used };
}

function articlePage(article) {
  const layer = layerById.get(article.lapisan);
  const siblings = articles.filter((item) => item.lapisan === article.lapisan && item.id !== article.id);
  const fallback = articles.filter((item) => item.id !== article.id && item.lapisan !== article.lapisan);
  const related = [...siblings, ...fallback].slice(0, 3);
  const index = articles.findIndex((item) => item.id === article.id);
  const newer = articles[index - 1] || null;
  const older = articles[index + 1] || null;

  const toc = [];
  let body = article.isi.replace(/<h2>(.*?)<\/h2>/g, (match, inner) => {
    const text = inner.replace(/<[^>]+>/g, '').trim();
    const id = slugify(text);
    toc.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });

  const glossary = glossaryHtml(body, article.glosarium);
  body = glossary.html;

  const quote = `<figure class="article-quote">
    <blockquote><p>${esc(article.kutipan)}</p></blockquote>
    <figcaption>Catatan penulis</figcaption>
  </figure>`;
  const second = body.indexOf('<h2', body.indexOf('<h2') + 1);
  body = second === -1 ? body + quote : body.slice(0, second) + quote + body.slice(second);

  body += strataFigure(layer);

  body += `<div class="article-fact">
    <p class="article-fact__label">Tahukah kamu?</p>
    <p>${esc(article.tahukah.teks)}</p>
    <p class="article-fact__source">Sumber: <a href="${esc(article.tahukah.sumber.url)}" target="_blank" rel="noopener">${esc(article.tahukah.sumber.nama)}</a></p>
  </div>`;

  body += `<section class="article-sources" aria-labelledby="sumber-judul">
    <h2 id="sumber-judul">Sumber</h2>
    <p>Semua tautan dibuka di tab baru. Angka dan istilah di artikel ini mengikuti sumber berikut.</p>
    <ol>
      ${article.sumber.map((source) => `<li><a href="${esc(source.url)}" target="_blank" rel="noopener">${esc(source.nama)}</a></li>`).join('\n      ')}
    </ol>
  </section>`;

  if (article.glosarium && article.glosarium.length > 0) {
    body += `<section class="article-glossary" aria-labelledby="glosarium-judul">
      <h2 id="glosarium-judul">Glosarium</h2>
      <dl>
        ${article.glosarium.map((entry) => `<div><dt>${esc(entry.istilah)}</dt><dd>${esc(entry.arti)}</dd></div>`).join('\n        ')}
      </dl>
    </section>`;
  }

  body += `<div class="article-correction">
    <p><strong>Koreksi dan catatan.</strong> Bila ada angka yang salah atau sumber yang lebih baik, kirimkan lewat <a class="link-underline" href="../kontak.html">halaman kontak</a>. Kami mencantumkan perubahan penting di artikel ini.</p>
  </div>`;

  const description = article.dek;

  return head({
    title: article.judul,
    description,
    base: '../',
    canonical: `artikel/${article.slug}.html`,
    image: article.gambar,
    page: 'artikel',
    extra: `<meta property="article:published_time" content="${article.tanggal}">
<meta property="article:section" content="${esc(layer.nama)}">
<script type="application/ld+json">${json({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.judul,
      description: article.dek,
      datePublished: article.tanggal,
      author: { '@type': 'Organization', name: article.penulis },
      publisher: { '@type': 'Organization', name: siteName },
      image: [absoluteUrl(article.gambar)],
      mainEntityOfPage: absoluteUrl(`artikel/${article.slug}.html`),
      inLanguage: 'id-ID',
      articleSection: layer.nama
    })}</script>`
  }) + `<div class="reading-progress" data-reading-progress aria-hidden="true"><span></span></div>
<main id="konten">
<article class="article" data-article style="--accent:${layer.warna};--accent-ink:${layer.warnaTeks}">
  <header class="article-hero">
    <div class="article-hero__inner">
      <nav class="breadcrumb" aria-label="Remah roti">
        <a href="../index.html">Beranda</a><span aria-hidden="true">/</span>
        <a href="../artikel.html">Artikel</a><span aria-hidden="true">/</span>
        <span>${esc(layer.pendek)}</span>
      </nav>
      <p class="article-hero__layer"><span class="layer-dot" aria-hidden="true"></span>${esc(layer.nama)}<span class="article-hero__range">${esc(rangeLabel(layer))} · ${esc(layer.suhu)}</span></p>
      <h1>${esc(article.judul)}</h1>
      <p class="article-hero__lede">${esc(article.dek)}</p>
      <p class="article-hero__meta">
        <span>Oleh ${esc(article.penulis)}</span>
        <span><time datetime="${article.tanggal}">${fmtDate(article.tanggal)}</time></span>
        <span>${article.menit} menit baca</span>
        <span>${article.kata} kata</span>
        <span>${esc(article.sudut)}</span>
      </p>
      <figure class="article-cover">
        ${picture('../' + article.gambar, '../' + article.gambarCadangan, `Ilustrasi untuk artikel ${article.judul}`, 1200, 600, '', false)}
        <figcaption>Ilustrasi: Bumi Bawah (CC0). Gambar ini bukan foto lokasi.</figcaption>
      </figure>
    </div>
  </header>

  <div class="article-layout">
    <aside class="article-toc" data-toc aria-label="Daftar isi dan alat baca">
      <div class="article-toc__sticky">
        <div class="article-side">
          ${sideStrata(layer)}
          <p class="article-side__label">Posisi artikel<br><strong>${esc(layer.nama)}</strong></p>
        </div>
        <p class="article-toc__title">Di artikel ini</p>
        <ol>
          ${toc.map((item) => `<li><a href="#${item.id}" data-toc-link="${item.id}">${esc(item.text)}</a></li>`).join('\n          ')}
          <li><a href="#sumber-judul" data-toc-link="sumber-judul">Sumber</a></li>
        </ol>
        <button class="copy-link" type="button" data-copy-link="${esc(absoluteUrl(`artikel/${article.slug}.html`))}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"/></svg>
          <span data-copy-label>Salin tautan artikel</span>
        </button>
        <p class="article-toc__note">Artikel ini bagian dari perjalanan ${esc(layer.nama)}. Warna dan kedalaman mengikuti data lapisan di beranda.</p>
      </div>
    </aside>

    <div class="article-body">
      <aside class="article-brief" aria-labelledby="ringkasan-judul">
        <h2 id="ringkasan-judul">Ringkasan 30 detik</h2>
        <ul>
          ${article.ringkasan30.map((line) => `<li>${esc(line)}</li>`).join('\n          ')}
        </ul>
      </aside>
      ${body}
    </div>
  </div>
</article>

<section class="related">
  <div class="related__inner">
    <div class="section-head">
      <div>
        <p class="section-head__eyebrow">Masih dari kedalaman yang sama</p>
        <h2>Bacaan lain yang berhubungan.</h2>
      </div>
      <a class="section-head__link" href="../artikel.html">Semua artikel</a>
    </div>
    <div class="archive__grid">
      ${related.map((item) => postCard(item, '../')).join('\n      ')}
    </div>
  </div>
</section>

<nav class="article-nav" aria-label="Artikel sebelumnya dan berikutnya">
  ${older ? `<a class="article-nav__link" href="${older.slug}.html"><span>Sebelumnya</span><strong>${esc(older.judul)}</strong></a>` : '<span class="article-nav__link is-empty" aria-hidden="true"></span>'}
  ${newer ? `<a class="article-nav__link article-nav__link--next" href="${newer.slug}.html"><span>Berikutnya</span><strong>${esc(newer.judul)}</strong></a>` : '<span class="article-nav__link is-empty" aria-hidden="true"></span>'}
</nav>
</main>
` + foot('../');
}

/* ---------- Galeri ---------- */

function galleryPage() {
  const categories = [...new Set(plates.map((plate) => plate.kategori))];
  const description = 'Dua belas pelat ilustrasi tentang tanah, akar, gua, batuan, air, dan manusia yang bekerja di bawah permukaan.';

  return head({
    title: 'Galeri lapangan',
    description,
    base: './',
    canonical: 'galeri.html',
    page: 'galeri'
  }) + `<main id="konten">
<div class="page-head page-head--gallery">
  <div class="page-head__inner">
    <p class="page-head__eyebrow">Galeri</p>
    <h1>Yang terlihat sebelum alat bor masuk.</h1>
    <p class="page-head__lede">Semua pelat adalah ilustrasi, bukan foto. Tempat dan prosesnya nyata; gambarnya digambar ulang agar detail lapisan lebih mudah dibaca.</p>
    <div class="filter-chips" data-gallery-filters role="group" aria-label="Saring pelat menurut kategori">
      <button class="filter-chip is-active" type="button" data-filter="" aria-pressed="true">Semua <span>${plates.length}</span></button>
      ${categories.map((category) => {
        const count = plates.filter((plate) => plate.kategori === category).length;
        return `<button class="filter-chip" type="button" data-filter="${esc(category)}" aria-pressed="false">${esc(category)} <span>${count}</span></button>`;
      }).join('\n      ')}
    </div>
    <p class="archive-count" data-gallery-count aria-live="polite">${plates.length} pelat dari ${plates.length}</p>
    <p class="gallery-hint">Pilih pelat untuk memperbesar. Gunakan tombol panah kiri dan kanan di dalam jendela gambar.</p>
  </div>
</div>

<section class="gallery" data-gallery>
  <div class="gallery__inner">
    <div class="masonry">
      ${plates.map((plate) => `<figure class="plate" data-plate data-kategori="${esc(plate.kategori)}">
        <button class="plate__button" type="button" data-lightbox
          data-full="${esc(plate.gambar)}"
          data-fallback="${esc(plate.gambarCadangan)}"
          data-title="${esc(plate.judul)}"
          data-caption="${esc(plate.deskripsi)}"
          data-location="${esc(plate.lokasi)}"
          data-credit="${esc(plate.kredit)}">
          <span class="plate__media">
            ${picture(plate.gambar, plate.gambarCadangan, plate.judul, 1200, 900)}
            <span class="plate__zoom" aria-hidden="true">Perbesar</span>
          </span>
          <span class="plate__caption">
            <span class="plate__title">${esc(plate.judul)}</span>
            <span class="plate__location">${esc(plate.lokasi)}</span>
          </span>
        </button>
        <figcaption>${esc(plate.deskripsi)}<span class="plate__credit">${esc(plate.kredit)} · ${esc(plate.kategori)}</span></figcaption>
      </figure>`).join('\n      ')}
    </div>
  </div>
</section>

<dialog class="lightbox" data-lightbox-dialog aria-labelledby="lightbox-title">
  <div class="lightbox__panel">
    <button class="lightbox__close" type="button" data-lightbox-close aria-label="Tutup gambar">${CLOSE}</button>
    <div class="lightbox__nav">
      <button class="lightbox__arrow" type="button" data-lightbox-prev aria-label="Gambar sebelumnya"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg></button>
      <button class="lightbox__arrow" type="button" data-lightbox-next aria-label="Gambar berikutnya"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></button>
    </div>
    <figure class="lightbox__figure">
      <img data-lightbox-image src="${esc(plates[0].gambar)}" alt="" width="1200" height="900">
      <figcaption>
        <p class="lightbox__count" data-lightbox-count></p>
        <h2 id="lightbox-title" data-lightbox-title></h2>
        <p data-lightbox-caption></p>
        <div class="lightbox__meta">
          <span data-lightbox-location></span>
          <span class="lightbox__credit" data-lightbox-credit></span>
        </div>
      </figcaption>
    </figure>
  </div>
</dialog>
</main>
` + foot('./');
}

/* ---------- Kontak ---------- */

function contactPage() {
  const description = 'Kirim koreksi fakta, usulan sumber, cerita lapangan, atau pertanyaan kerja sama ke Bumi Bawah.';

  return head({
    title: 'Kontak',
    description,
    base: './',
    canonical: 'kontak.html',
    page: 'kontak'
  }) + `<main id="konten">
<div class="page-head page-head--contact">
  <div class="page-head__inner">
    <p class="page-head__eyebrow">Kontak</p>
    <h1>Koreksi kecil menyelamatkan banyak pembaca.</h1>
    <p class="page-head__lede">Kami membaca semua pesan, terutama yang membawa tautan sumber. Situs ini tidak punya basis data, jadi tidak ada akun atau riwayat pesan yang disimpan di sini.</p>
  </div>
</div>

<section class="contact">
  <div class="contact__inner">
    <div class="contact-info">
      <h2>Sebelum menulis</h2>
      <div class="contact-info__block">
        <p class="contact-info__label">Jenis pesan yang paling membantu</p>
        <p>Koreksi angka disertai tautan jurnal atau lembaga; usulan sumber primer; catatan lapangan dari tempat yang Anda kenal; dan laporan tautan mati.</p>
      </div>
      <div class="contact-info__block">
        <p class="contact-info__label">Surel</p>
        <p><a class="link-underline" href="mailto:${esc(siteEmail)}">${esc(siteEmail)}</a></p>
        <p class="contact-info__note">Balasan bisa memakan beberapa hari. Kami tidak menerima kiriman artikel tamu tanpa contoh tulisan.</p>
      </div>
      <div class="contact-info__block">
        <p class="contact-info__label">Lokasi</p>
        <p>${esc(siteLocation)}</p>
        <p class="contact-info__note">Waktu Indonesia Barat (UTC+7).</p>
      </div>
      <div class="contact-map">
        <iframe title="Peta OpenStreetMap wilayah Yogyakarta" src="${esc(pick(/osmEmbed:\s*\n?\s*'([^']*)'/, 'https://www.openstreetmap.org/export/embed.html?bbox=110.3300%2C-7.8400%2C110.4300%2C-7.7400&layer=mapnik'))}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <p>Peta oleh kontributor OpenStreetMap, lisensi ODbL. <a class="link-underline" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">Kredit peta</a>.</p>
      </div>
    </div>

    <div class="contact-form-wrap">
      <h2>Kirim pesan</h2>
      <p class="contact-form__note" data-config-note hidden>Formulir belum disambungkan ke layanan pengiriman. Anda tetap bisa memakai tombol <strong>Kirim lewat email</strong> di bawah.</p>
      <form class="contact-form" data-contact-form novalidate>
        <div class="field">
          <label for="nama">Nama atau panggilan</label>
          <input id="nama" name="nama" type="text" autocomplete="name" required aria-describedby="err-nama">
          <p class="field__error" id="err-nama" data-error-for="nama" hidden></p>
        </div>
        <div class="field">
          <label for="email">Email untuk balasan</label>
          <input id="email" name="email" type="email" autocomplete="email" inputmode="email" required aria-describedby="err-email">
          <p class="field__error" id="err-email" data-error-for="email" hidden></p>
        </div>
        <div class="field">
          <label for="subjek">Jenis pesan</label>
          <select id="subjek" name="subjek" required aria-describedby="err-subjek">
            <option value="">Pilih satu…</option>
            <option>Koreksi fakta</option>
            <option>Usulan sumber</option>
            <option>Cerita lapangan</option>
            <option>Kerja sama</option>
            <option>Lainnya</option>
          </select>
          <p class="field__error" id="err-subjek" data-error-for="subjek" hidden></p>
        </div>
        <div class="field">
          <label for="pesan">Pesan</label>
          <textarea id="pesan" name="pesan" rows="7" required aria-describedby="err-pesan hint-pesan"></textarea>
          <p class="field__hint" id="hint-pesan">Sertakan tautan sumber bila mengoreksi angka. Minimal 20 huruf.</p>
          <p class="field__error" id="err-pesan" data-error-for="pesan" hidden></p>
        </div>
        <div class="field field--honey" aria-hidden="true">
          <label for="botcheck">Jangan centang kolom ini</label>
          <input id="botcheck" name="botcheck" type="checkbox" tabindex="-1" autocomplete="off">
        </div>
        <div class="contact-form__actions">
          <button class="btn btn--ink" type="submit" data-form-submit>Kirim pesan</button>
          <a class="btn btn--outline" href="mailto:${esc(siteEmail)}" data-mailto>Kirim lewat email</a>
        </div>
        <p class="contact-form__note">Dengan mengirim, Anda setuju alamat email dipakai hanya untuk membalas pesan ini. Tidak ada langganan otomatis.</p>
        <div class="notice" data-form-status role="status" aria-live="polite" hidden></div>
      </form>
    </div>
  </div>
</section>
</main>
` + foot('./');
}

/* ---------- Halaman 404 ---------- */

function errorPage() {
  return `<!doctype html>
<html lang="id" class="no-js">
<head>
<meta charset="utf-8">
<script>
(function () {
  var repo = ${JSON.stringify(isLocalPreview ? './' : deployPath)};
  var local = location.protocol === 'file:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  var root = location.protocol === 'file:' ? './' : (local ? '/' : repo);
  document.write('<base href="' + root + '">');
  document.documentElement.setAttribute('data-base', './');
})();
</script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Halaman tidak ditemukan · Bumi Bawah</title>
<meta name="description" content="Alamat yang Anda buka tidak ada. Kembali ke perjalanan atau cari artikel di arsip.">
<meta name="robots" content="noindex">
<meta name="theme-color" content="#FFF6E6">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="assets/css/app.css">
<script>document.documentElement.classList.remove('no-js');document.documentElement.classList.add('js');</script>
</head>
<body data-page="404">
<a class="skip-link" href="#konten">Lewati ke isi</a>
<div data-site-header></div>
<main id="konten" class="error-page">
  <div class="error-page__inner">
    <p class="error-page__code">404</p>
    <h1 class="error-page__title">Lapisan ini belum dipetakan.</h1>
    <p class="error-page__lede">Alamat yang Anda buka tidak ada di situs. Mungkin tautannya berubah, atau halaman ini belum pernah dibuat. Dua jalan yang tersedia: kembali ke permukaan, atau masuk ke arsip.</p>
    <div class="error-page__actions">
      <a class="btn btn--ink" href="index.html">Kembali ke beranda</a>
      <a class="btn btn--outline" href="artikel.html">Buka artikel</a>
      <a class="link-underline" href="kontak.html">Laporkan tautan mati</a>
    </div>
  </div>
  <div class="error-page__strata" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
</main>
<div data-site-footer></div>
<script src="assets/js/config.js"></script>
<script src="assets/js/layout.js"></script>
<script src="assets/js/core.min.js"></script>
</body>
</html>
`;
}

/* ---------- Sitemap, robots, berkas lain ---------- */

function sitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const pages = [
    ['index.html', today, '1.0'],
    ['artikel.html', today, '0.9'],
    ['galeri.html', today, '0.8'],
    ['tentang.html', today, '0.7'],
    ['kontak.html', today, '0.6'],
    ...articles.map((article) => [`artikel/${article.slug}.html`, article.tanggal, '0.8'])
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(([path, lastmod, priority]) => `  <url>
    <loc>${absoluteUrl(path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
}

/* ---------- Tulis semua ---------- */

write('index.html', homePage());
write('tentang.html', aboutPage());
write('artikel.html', archivePage());
for (const article of articles) {
  write(`artikel/${article.slug}.html`, articlePage(article));
}
write('galeri.html', galleryPage());
write('kontak.html', contactPage());
write('404.html', errorPage());
write('sitemap.xml', sitemap());
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('sitemap.xml')}\n`);
write('.nojekyll', '');

console.log(`Halaman: ${8 + articles.length} berkas HTML, ${articles.length} artikel, ${news.length} kabar, ${plates.length} pelat.`);
console.log(`BASE_URL: ${baseUrl}`);
