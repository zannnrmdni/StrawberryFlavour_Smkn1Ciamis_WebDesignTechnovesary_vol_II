/**
 * Generator tekstur lapisan.
 * Semua tekstur dibuat sendiri dari bentuk SVG dan derau, lalu dirasterkan
 * ke WebP 512 x 512. Bentuk yang menyentuh tepi digambar ulang di sisi
 * seberang supaya gambar bisa di-tile tanpa jahitan.
 *
 * Jalankan: node tools/make-textures.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'assets', 'img', 'tekstur');
mkdirSync(out, { recursive: true });

const SIZE = 512;
const TAU = Math.PI * 2;

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (n) => Math.round(n * 10) / 10;

/** Kumpulkan potongan SVG, duplikat di tepi agar pola menyambung. */
function collector() {
  const parts = [];
  return {
    add(x, y, margin, make) {
      const xs = [x];
      const ys = [y];
      if (x < margin) xs.push(x + SIZE);
      if (x > SIZE - margin) xs.push(x - SIZE);
      if (y < margin) ys.push(y + SIZE);
      if (y > SIZE - margin) ys.push(y - SIZE);
      xs.forEach((px) => ys.forEach((py) => parts.push(make(px, py))));
    },
    addRaw(svg) {
      parts.push(svg);
    },
    join() {
      return parts.join('\n');
    }
  };
}

function frame(inner, seed) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
<defs>
  <filter id="grain" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" seed="${seed}" stitchTiles="stitch" result="noise"/>
    <feColorMatrix in="noise" type="saturate" values="0"/>
  </filter>
</defs>
<rect width="${SIZE}" height="${SIZE}" fill="#7C7C7C"/>
${inner}
<rect width="${SIZE}" height="${SIZE}" filter="url(#grain)" opacity="0.16"/>
</svg>`;
}

function serasah() {
  const rand = rng(101);
  const c = collector();

  for (let i = 0; i < 46; i += 1) {
    const x = rand() * SIZE;
    const y = rand() * SIZE;
    const a = rand() * 360;
    const w = 26 + rand() * 34;
    const h = 8 + rand() * 9;
    const tone = rand() > 0.72 ? '#B9B4A8' : rand() > 0.4 ? '#5A5148' : '#403A33';
    const vein = rand() > 0.5 ? '#8F887C' : '#2E2A26';
    c.add(x, y, 50, (px, py) => `<g transform="translate(${round(px)} ${round(py)}) rotate(${round(a)})">
      <path d="M${-w / 2} 0c${w * 0.2} ${-h} ${w * 0.62} ${-h} ${w} 0c${-w * 0.38} ${h} ${-w * 0.8} ${h} ${-w} 0z" fill="${tone}"/>
      <path d="M${-w / 2 + 2} 0h${w - 4}" stroke="${vein}" stroke-width="1.4" fill="none" opacity=".8"/>
    </g>`);
  }

  for (let i = 0; i < 22; i += 1) {
    const x = rand() * SIZE;
    const y = rand() * SIZE;
    const a = rand() * 360;
    const len = 40 + rand() * 80;
    const bend = 10 + rand() * 20;
    c.add(x, y, 70, (px, py) => `<path d="M${round(px)} ${round(py)}q${round(len * 0.4)} ${round(bend)} ${round(len)} ${round(-bend * 0.3)}" transform="rotate(${round(a)} ${round(px)} ${round(py)})" fill="none" stroke="#332E29" stroke-width="${round(2 + rand() * 3)}" stroke-linecap="round"/>`);
  }

  for (let i = 0; i < 220; i += 1) {
    const x = rand() * SIZE;
    const y = rand() * SIZE;
    const r = 0.8 + rand() * 2.6;
    c.addRaw(`<circle cx="${round(x)}" cy="${round(y)}" r="${round(r)}" fill="${rand() > 0.5 ? '#C9C3B4' : '#34302A'}" opacity="${round(0.25 + rand() * 0.45)}"/>`);
  }

  return c.join();
}

function topsoil() {
  const rand = rng(202);
  const c = collector();

  for (let i = 0; i < 520; i += 1) {
    const x = rand() * SIZE;
    const y = rand() * SIZE;
    const r = 0.6 + Math.pow(rand(), 2) * 7;
    const dark = rand() > 0.68;
    const tone = dark ? '#3A352F' : rand() > 0.4 ? '#9A958B' : '#B7B1A4';
    c.addRaw(`<circle cx="${round(x)}" cy="${round(y)}" r="${round(r)}" fill="${tone}" opacity="${round(0.2 + rand() * 0.55)}"/>`);
  }

  for (let i = 0; i < 42; i += 1) {
    const x = rand() * SIZE;
    const y = rand() * SIZE;
    const w = 5 + rand() * 16;
    const h = 3 + rand() * 7;
    c.add(x, y, 30, (px, py) => `<ellipse cx="${round(px)}" cy="${round(py)}" rx="${round(w)}" ry="${round(h)}" fill="#2F2A25" opacity="${round(0.25 + rand() * 0.4)}" transform="rotate(${round(rand() * 180)} ${round(px)} ${round(py)})"/>`);
  }

  for (let i = 0; i < 26; i += 1) {
    const x = rand() * SIZE;
    const y = rand() * SIZE;
    const len = 16 + rand() * 40;
    const a = 20 + rand() * 40;
    c.add(x, y, 50, (px, py) => `<path d="M${round(px)} ${round(py)}q${round(len / 2)} ${round(a)} ${round(len)} 0" fill="none" stroke="#B9B3A5" stroke-width="1.2" opacity=".55"/>`);
  }

  return c.join();
}

function subsoil() {
  const rand = rng(303);
  const c = collector();

  for (let i = 0; i < 52; i += 1) {
    const x = rand() * SIZE;
    const y = rand() * SIZE;
    const rx = 18 + rand() * 54;
    const ry = 10 + rand() * 30;
    c.addRaw(`<ellipse cx="${round(x)}" cy="${round(y)}" rx="${round(rx)}" ry="${round(ry)}" fill="${rand() > 0.5 ? '#8C8C8C' : '#6A6A6A'}" opacity="${round(0.18 + rand() * 0.22)}" transform="rotate(${round(rand() * 180)} ${round(x)} ${round(y)})"/>`);
  }

  for (let i = 0; i < 34; i += 1) {
    const x = rand() * SIZE;
    const y = rand() * SIZE;
    const len = 80 + rand() * 240;
    const amp = 10 + rand() * 26;
    const dir = rand() > 0.5 ? 1 : -1;
    const tone = rand() > 0.45 ? '#4F4A44' : '#B0A79A';
    const width = 1.5 + rand() * 4.5;
    c.add(x, y, 90, (px, py) => `<path d="M${round(px)} ${round(py)}c${round(len * 0.2)} ${round(dir * amp)} ${round(len * 0.4)} ${round(-dir * amp)} ${round(len * 0.6)} 0s${round(len * 0.2)} ${round(dir * amp * 0.8)} ${round(len * 0.4)} 0" fill="none" stroke="${tone}" stroke-width="${round(width)}" stroke-linecap="round" opacity="${round(0.35 + rand() * 0.3)}"/>`);
  }

  for (let i = 0; i < 90; i += 1) {
    const x = rand() * SIZE;
    const y = rand() * SIZE;
    const r = 1 + rand() * 4;
    c.addRaw(`<circle cx="${round(x)}" cy="${round(y)}" r="${round(r)}" fill="#3D3934" opacity="${round(0.18 + rand() * 0.32)}"/>`);
  }

  return c.join();
}

function weathered() {
  const rand = rng(404);
  const c = collector();

  for (let i = 0; i < 78; i += 1) {
    const x = rand() * SIZE;
    const y = rand() * SIZE;
    const r = 9 + rand() * 28;
    const sides = 5 + Math.floor(rand() * 3);
    const points = [];
    for (let s = 0; s < sides; s += 1) {
      const angle = (s / sides) * TAU + rand() * 0.4;
      const radius = r * (0.65 + rand() * 0.5);
      points.push(`${round(Math.cos(angle) * radius)},${round(Math.sin(angle) * radius)}`);
    }
    const tone = rand() > 0.55 ? '#9B968C' : rand() > 0.4 ? '#6B665E' : '#56514A';
    c.add(x, y, 45, (px, py) => `<polygon points="${points.map((p) => {
      const [a, b] = p.split(',').map(Number);
      return `${round(px + a)},${round(py + b)}`;
    }).join(' ')}" fill="${tone}" stroke="#3C3832" stroke-width="1.4"/>`);
  }

  for (let i = 0; i < 40; i += 1) {
    const x = rand() * SIZE;
    const y = rand() * SIZE;
    const r = 2 + rand() * 7;
    c.addRaw(`<circle cx="${round(x)}" cy="${round(y)}" r="${round(r)}" fill="#2B2824" opacity="${round(0.4 + rand() * 0.4)}"/>`);
  }

  for (let i = 0; i < 34; i += 1) {
    const x = rand() * SIZE;
    const y = rand() * SIZE;
    c.addRaw(`<path d="M${round(x)} ${round(y)}l${round(6 + rand() * 16)} ${round(-4 + rand() * 8)}" stroke="#C3BCAF" stroke-width="1.4" opacity=".45"/>`);
  }

  return c.join();
}

function bedrock() {
  const rand = rng(505);
  const c = collector();

  for (let i = 0; i < 20; i += 1) {
    let x = rand() * SIZE;
    let y = rand() * SIZE;
    const angle = rand() * TAU;
    let a = angle;
    const steps = 5 + Math.floor(rand() * 5);
    let d = `M${round(x)} ${round(y)}`;
    for (let s = 0; s < steps; s += 1) {
      a += (rand() - 0.5) * 0.9;
      const len = 14 + rand() * 34;
      x += Math.cos(a) * len;
      y += Math.sin(a) * len;
      d += `L${round(x)} ${round(y)}`;
    }
    c.addRaw(`<path d="${d}" fill="none" stroke="#37332E" stroke-width="${round(1.2 + rand() * 2.2)}" opacity="${round(0.35 + rand() * 0.4)}"/>`);
  }

  for (let i = 0; i < 70; i += 1) {
    const x = rand() * SIZE;
    const y = rand() * SIZE;
    const s = 1.2 + rand() * 3.2;
    const tone = rand() > 0.5 ? '#C9C4B8' : '#4A4640';
    c.addRaw(`<path d="M${round(x)} ${round(y)}l${round(s)} ${round(-s * 0.6)}l${round(s * 1.4)} ${round(s * 0.2)}l${round(-s)} ${round(s)}z" fill="${tone}" opacity="${round(0.3 + rand() * 0.4)}"/>`);
  }

  for (let i = 0; i < 160; i += 1) {
    const x = rand() * SIZE;
    const y = rand() * SIZE;
    const r = 0.6 + Math.pow(rand(), 2) * 5;
    c.addRaw(`<circle cx="${round(x)}" cy="${round(y)}" r="${round(r)}" fill="${rand() > 0.5 ? '#5E5A53' : '#A9A49A'}" opacity="${round(0.15 + rand() * 0.3)}"/>`);
  }

  return c.join();
}

function crust() {
  const rand = rng(606);
  const c = collector();

  for (let band = 0; band < 10; band += 1) {
    const y = (band / 10) * SIZE + (rand() - 0.5) * 8;
    const amp = 5 + rand() * 10;
    const phase = rand() * TAU;
    const width = 14 + rand() * 30;
    const tone = band % 3 === 0 ? '#56524C' : band % 3 === 1 ? '#918B80' : '#757068';
    const points = [];
    for (let x = 0; x <= SIZE; x += 64) {
      points.push([x, y + Math.sin((x / SIZE) * TAU * 2 + phase) * amp]);
    }
    const d = points.map(([px, py], i) => `${i === 0 ? 'M' : 'L'}${round(px)} ${round(py)}`).join(' ');
    c.addRaw(`<path d="${d}" fill="none" stroke="${tone}" stroke-width="${round(width)}" opacity="${round(0.3 + rand() * 0.24)}" stroke-linecap="round"/>`);
    c.addRaw(`<path d="${d}" fill="none" stroke="#39352F" stroke-width="1" opacity=".35" transform="translate(0 ${round(-width / 2)})"/>`);
  }

  for (let i = 0; i < 16; i += 1) {
    const y = rand() * SIZE;
    const amp = 8 + rand() * 18;
    const phase = rand() * TAU;
    const points = [];
    for (let x = 0; x <= SIZE; x += 48) {
      points.push([x, y + Math.sin((x / SIZE) * TAU * 3 + phase) * amp]);
    }
    const d = points.map(([px, py], idx) => `${idx === 0 ? 'M' : 'L'}${round(px)} ${round(py)}`).join(' ');
    c.addRaw(`<path d="${d}" fill="none" stroke="${rand() > 0.5 ? '#D0C8B8' : '#4A443C'}" stroke-width="${round(1 + rand() * 2.4)}" opacity=".55"/>`);
  }

  for (let i = 0; i < 100; i += 1) {
    const x = rand() * SIZE;
    const y = rand() * SIZE;
    const r = 0.7 + rand() * 3;
    c.addRaw(`<circle cx="${round(x)}" cy="${round(y)}" r="${round(r)}" fill="${rand() > 0.5 ? '#C6BFAF' : '#46413A'}" opacity="${round(0.2 + rand() * 0.3)}"/>`);
  }

  return c.join();
}

const textures = [
  ['serasah.webp', serasah(), 111],
  ['tanah-atas.webp', topsoil(), 222],
  ['tanah-bawah.webp', subsoil(), 333],
  ['batuan-lapuk.webp', weathered(), 444],
  ['batuan-dasar.webp', bedrock(), 555],
  ['kerak-bumi.webp', crust(), 666]
];

for (const [name, inner, seed] of textures) {
  const svg = frame(inner, seed);
  const file = join(out, name);
  const info = await sharp(Buffer.from(svg))
    .webp({ quality: 76, effort: 6 })
    .toFile(file);
  writeFileSync(join(out, name.replace('.webp', '.svg-source')), svg);
  console.log(`${name}: ${(info.size / 1024).toFixed(1)} KB`);
}
