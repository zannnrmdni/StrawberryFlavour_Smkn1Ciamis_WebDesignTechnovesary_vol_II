/**
 * Alat ukur kedalaman, lompat lapisan, dan detail milestone.
 * Semua posisi dibaca dari DOM supaya angka di alat ukur cocok dengan
 * posisi kartu yang benar-benar terlihat, bukan dari skala linear.
 */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const numberFormat = new Intl.NumberFormat('id-ID');

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function formatNumber(value, decimals) {
  return numberFormat.format(Number(value.toFixed(decimals)));
}

/** Meter -> [nilai, satuan], mengikuti depth_parts() di PHP. */
function depthParts(meters) {
  const m = Math.max(0, meters);

  if (m < 1) {
    const cm = m * 100;
    const decimals = cm > 0 && cm < 10 ? 1 : 0;
    return [formatNumber(cm, decimals), 'cm'];
  }

  if (m < 1000) {
    const decimals = Math.floor(m) === m ? 0 : 1;
    return [formatNumber(m, decimals), 'm'];
  }

  const km = m / 1000;
  const decimals = km >= 10 ? 0 : km >= 1 ? 1 : 2;
  return [formatNumber(km, decimals), 'km'];
}

/* ---------- Detail milestone ---------- */

function setupSpecimen() {
  const dialog = document.querySelector('[data-specimen]');
  if (!dialog) return;

  const fields = {
    image: dialog.querySelector('[data-specimen-image]'),
    title: dialog.querySelector('[data-specimen-title]'),
    depth: dialog.querySelector('[data-specimen-depth]'),
    kind: dialog.querySelector('[data-specimen-kind]'),
    layer: dialog.querySelector('[data-specimen-layer]'),
    note: dialog.querySelector('[data-specimen-note]'),
    source: dialog.querySelector('[data-specimen-source]'),
    sourceName: dialog.querySelector('[data-specimen-source-name]'),
  };

  let lastTrigger = null;

  const open = (button) => {
    const section = button.closest('.layer');
    const accent = section?.dataset.color || '#F3C64F';
    const name = button.dataset.name || '';

    dialog.style.setProperty('--specimen-accent', accent);

    if (fields.image) {
      fields.image.src = button.dataset.image || '';
      fields.image.alt = name ? `Ilustrasi ${name}` : '';
    }
    if (fields.title) fields.title.textContent = name;
    if (fields.depth) fields.depth.textContent = button.dataset.depth || '';
    if (fields.kind) fields.kind.textContent = button.dataset.kind || '';
    if (fields.layer) fields.layer.textContent = button.dataset.layerName || '';
    if (fields.note) fields.note.textContent = button.dataset.note || '';

    if (fields.source) {
      fields.source.href = button.dataset.sourceUrl || '#';
    }
    if (fields.sourceName) {
      fields.sourceName.textContent = button.dataset.sourceName || 'sumber';
    }

    lastTrigger = button;

    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
      document.body.classList.add('has-dialog');
    }
  };

  const close = () => {
    dialog.close();
  };

  document.querySelectorAll('[data-milestone]').forEach((button) => {
    button.addEventListener('click', () => open(button));
  });

  dialog.querySelector('[data-specimen-close]')?.addEventListener('click', close);

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) close();
  });

  dialog.addEventListener('close', () => {
    document.body.classList.remove('has-dialog');
    if (lastTrigger instanceof HTMLElement) {
      lastTrigger.focus({ preventScroll: true });
      lastTrigger = null;
    }
  });
}

/* ---------- Reveal milestone ---------- */

function setupReveal() {
  if (reduceMotion.matches || !('IntersectionObserver' in window)) return;

  const buttons = Array.from(document.querySelectorAll('[data-milestone]'));
  if (buttons.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.18 }
  );

  buttons.forEach((button) => {
    button.classList.add('is-await');
    observer.observe(button);
  });
}

/* ---------- Alat ukur ---------- */

function setupGauge() {
  const gauge = document.querySelector('[data-gauge]');
  const journey = document.querySelector('[data-journey]');
  const tail = document.querySelector('.tail');
  const sections = Array.from(document.querySelectorAll('.layer[data-layer]'));

  if (!gauge || !journey || sections.length === 0) return;

  const valueEl = gauge.querySelector('[data-gauge-value]');
  const unitEl = gauge.querySelector('[data-gauge-unit]');
  const tempEl = gauge.querySelector('[data-gauge-temp]');
  const nameEl = gauge.querySelector('[data-gauge-name]');
  const markerEl = gauge.querySelector('[data-gauge-marker]');
  const statusEl = gauge.querySelector('[data-gauge-status]');
  const segments = Array.from(gauge.querySelectorAll('[data-jump]'));

  const layers = sections.map((section) => {
    const list = section.querySelector('.layer__milestones');
    const shortName =
      gauge.querySelector(`[data-jump="${section.id}"] span`)?.textContent?.trim() ||
      section.dataset.name ||
      '';

    return {
      section,
      list,
      min: Number.parseFloat(section.dataset.min || '0'),
      max: Number.parseFloat(section.dataset.max || '0'),
      vh: Number.parseFloat(section.dataset.scrollVh || '250'),
      name: section.dataset.name || '',
      shortName,
      temp: (section.dataset.temp || '').replace(/\s*\(.*\)\s*$/, ''),
      segment: gauge.querySelector(`[data-jump="${section.id}"]`),
      top: 0,
      listTop: 0,
      listHeight: 1,
    };
  });

  const totalVh = layers.reduce((sum, layer) => sum + layer.vh, 0) || 1;
  let tailTop = Number.POSITIVE_INFINITY;
  let activeIndex = -1;
  let ticking = false;

  const measure = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    layers.forEach((layer) => {
      layer.top = layer.section.getBoundingClientRect().top + scrollY;
      layer.listTop = layer.list ? layer.list.getBoundingClientRect().top + scrollY : layer.top;
      layer.listHeight = layer.list ? Math.max(1, layer.list.offsetHeight) : 1;
    });

    if (tail) {
      tailTop = tail.getBoundingClientRect().top + scrollY;
    }
  };

  const update = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const probe = scrollY + window.innerHeight * 0.42;

    const first = layers[0];
    const last = layers[layers.length - 1];
    const journeyEnd = tailTop || last.listTop + last.listHeight;

    const shouldShow = probe > first.top - window.innerHeight * 0.25 && scrollY + window.innerHeight * 0.8 < journeyEnd;
    gauge.classList.toggle('is-visible', shouldShow);

    let index = 0;
    layers.forEach((layer, i) => {
      if (probe >= layer.top) index = i;
    });

    const current = layers[index];
    const rawT = (probe - current.listTop) / current.listHeight;
    const t = clamp(rawT, 0, 1);
    const depth = current.min + (current.max - current.min) * t;
    const [value, unit] = depthParts(depth);

    if (valueEl) valueEl.textContent = value;
    if (unitEl) unitEl.textContent = unit;
    if (tempEl && current.temp) tempEl.textContent = current.temp;
    if (nameEl) nameEl.textContent = current.shortName;

    let vhBefore = 0;
    for (let i = 0; i < index; i += 1) vhBefore += layers[i].vh;
    const p = clamp((vhBefore + t * current.vh) / totalVh, 0, 1);
    markerEl?.style.setProperty('--p', p.toFixed(4));

    if (index !== activeIndex) {
      activeIndex = index;
      layers.forEach((layer, i) => {
        const segment = layer.segment;
        if (!segment) return;
        segment.classList.toggle('is-active', i === index);
        if (i === index) {
          segment.setAttribute('aria-current', 'true');
        } else {
          segment.removeAttribute('aria-current');
        }
      });

      if (statusEl) {
        statusEl.textContent = `Lapisan ${current.name}. Kedalaman ${value} ${unit}. Suhu ${current.temp || 'tidak tercatat'}.`;
      }
    }
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      ticking = false;
      update();
    });
  };

  measure();
  update();

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', () => {
    measure();
    requestUpdate();
  }, { passive: true });

  if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    window.ScrollTrigger.addEventListener('refresh', () => {
      measure();
      update();
    });
    window.ScrollTrigger.refresh();
  }

  segments.forEach((segment) => {
    segment.addEventListener('click', () => {
      const target = document.getElementById(segment.dataset.jump || '');
      if (!target) return;

      const top = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top,
        behavior: reduceMotion.matches ? 'auto' : 'smooth',
      });
    });
  });

  window.addEventListener('load', () => {
    measure();
    update();
    window.ScrollTrigger?.refresh();
  });
}

setupSpecimen();
setupReveal();

if (!reduceMotion.matches) {
  setupGauge();
}
