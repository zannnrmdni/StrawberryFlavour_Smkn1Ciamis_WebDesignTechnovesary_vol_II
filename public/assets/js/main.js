/**
 * Titik masuk halaman. Modul dimuat hanya di halaman yang membutuhkannya,
 * supaya pengunjung galeri tidak perlu mengunduh mesin 3D.
 */

const header = document.querySelector('[data-header]');
const orbit = document.querySelector('[data-orbit]');
const isHome = document.body.classList.contains('is-home');

function syncHeader() {
  if (!header) return;

  if (!isHome) {
    header.classList.add('site-header--solid');
    return;
  }

  const threshold = orbit ? orbit.offsetHeight - window.innerHeight * 0.22 : window.innerHeight;
  header.classList.toggle('site-header--solid', window.scrollY > threshold);
}

syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });
window.addEventListener('resize', syncHeader, { passive: true });

document.querySelectorAll('.site-menu a').forEach((link) => {
  link.addEventListener('click', () => {
    link.closest('details')?.removeAttribute('open');
  });
});

const startLink = document.querySelector('[data-start]');
startLink?.addEventListener('click', () => {
  document.getElementById('judul-lapisan-1')?.focus({ preventScroll: true });
});

if (isHome && orbit) {
  import('./earth.js').catch(() => {
    orbit.classList.add('is-static');
  });

  import('./journey.js').catch((error) => {
    console.error('Perjalanan gagal dimuat:', error);
  });
}

if (document.querySelector('[data-cutaway]')) {
  import('./cutaway.js').catch(() => {
    document.querySelector('[data-cutaway]')?.classList.add('is-static');
  });
}

if (document.querySelector('[data-article]')) {
  import('./article.js').catch((error) => {
    console.error('Artikel gagal dimuat:', error);
  });
}

if (document.querySelector('[data-gallery]')) {
  import('./gallery.js').catch((error) => {
    console.error('Galeri gagal dimuat:', error);
  });
}

if (document.querySelector('[data-contact-form]')) {
  import('./contact.js').catch((error) => {
    console.error('Formulir kontak gagal dimuat:', error);
  });
}
