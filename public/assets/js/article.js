/**
 * Artikel: batang kemajuan baca dan penanda daftar isi.
 * Tidak ada animasi yang mengubah tata letak; semua hanya menandai posisi.
 */

const article = document.querySelector('[data-article]');
const progress = document.querySelector('[data-reading-progress]');

if (article) {
  setupProgress();
  setupToc();
}

function setupProgress() {
  if (!progress || !article) return;

  const bar = progress.querySelector('span');
  if (!bar) return;

  let ticking = false;

  const update = () => {
    ticking = false;
    const rect = article.getBoundingClientRect();
    const total = Math.max(1, article.offsetHeight - window.innerHeight * 0.35);
    const passed = Math.min(total, Math.max(0, -rect.top + window.innerHeight * 0.2));
    const ratio = Math.min(1, Math.max(0, passed / total));

    bar.style.transform = `scaleX(${ratio.toFixed(4)})`;
    progress.classList.toggle('is-visible', ratio > 0.005 && ratio < 0.999);
  };

  const request = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  update();
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request, { passive: true });
}

function setupToc() {
  const toc = document.querySelector('[data-toc]');
  if (!toc) return;

  const links = Array.from(toc.querySelectorAll('[data-toc-link]'));
  const headings = links
    .map((link) => document.getElementById(link.dataset.tocLink || ''))
    .filter((heading) => heading instanceof HTMLElement);

  if (headings.length === 0) return;

  const setActive = (id) => {
    links.forEach((link) => {
      const active = link.dataset.tocLink === id;
      link.classList.toggle('is-active', active);
      if (active) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  if (!('IntersectionObserver' in window)) {
    setActive(headings[0].id);
    return;
  }

  const visible = new Set();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visible.add(entry.target.id);
        } else {
          visible.delete(entry.target.id);
        }
      });

      const first = headings.find((heading) => visible.has(heading.id));
      if (first) {
        setActive(first.id);
        return;
      }

      // Tidak ada heading di layar: pakai heading terakhir yang sudah lewat.
      let current = headings[0];
      headings.forEach((heading) => {
        if (heading.getBoundingClientRect().top < window.innerHeight * 0.4) {
          current = heading;
        }
      });
      setActive(current.id);
    },
    { rootMargin: '-12% 0px -66% 0px', threshold: [0, 1] }
  );

  headings.forEach((heading) => observer.observe(heading));

  links.forEach((link) => {
    link.addEventListener('click', () => {
      setActive(link.dataset.tocLink || '');
    });
  });
}
