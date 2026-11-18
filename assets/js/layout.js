/*
  assets/js/layout.js — header dan footer dibuat sekali untuk semua halaman.
  Tidak ada markup header/footer yang disalin ke setiap file HTML.
  Skrip ini memakai window.SITE_CONFIG.base supaya tetap benar di subfolder
  artikel/ maupun di 404.html yang dibuka dari URL bersarang.
*/
(function () {
  var cfg = window.SITE_CONFIG || {};
  var html = document.documentElement;
  var base = html.getAttribute('data-base') || './';

  if (base === 'auto') {
    base = cfg.rootPath || './';
    if (location.protocol === 'file:' && /404\.html$/.test(location.pathname)) {
      base = './';
    }
  }

  var page = document.body.getAttribute('data-page') || '';
  var year = new Date().getFullYear();

  var esc = function (value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  };

  var href = function (path) {
    return base + path;
  };

  var items = [
    { id: 'home', label: 'Turun', path: 'index.html' },
    { id: 'tentang', label: 'Tentang', path: 'tentang.html' },
    { id: 'artikel', label: 'Artikel', path: 'artikel.html' },
    { id: 'galeri', label: 'Galeri', path: 'galeri.html' },
    { id: 'kontak', label: 'Kontak', path: 'kontak.html' }
  ];

  var link = function (item, className) {
    var active = item.id === page;
    return (
      '<a class="' + className + (active ? ' is-active' : '') + '" href="' + href(item.path) + '"' +
      (active ? ' aria-current="page"' : '') + '>' + esc(item.label) + '</a>'
    );
  };

  var desktop = items
    .map(function (item) {
      return '<li>' + link(item, 'nav__link') + '</li>';
    })
    .join('');

  var mobile = items
    .map(function (item) {
      return '<li>' + link(item, '') + '</li>';
    })
    .join('');

  var header =
    '<header class="site-header" data-header>' +
      '<div class="site-header__inner">' +
        '<a class="brand" href="' + href('index.html') + '" aria-label="Bumi Bawah, kembali ke beranda">' +
          '<svg class="brand__mark" viewBox="0 0 32 40" aria-hidden="true">' +
            '<rect x="1.5" y="1.5" width="29" height="37" rx="2" fill="#FFF6E6" stroke="#16262B" stroke-width="3"/>' +
            '<path d="M3 10h26M3 18h26M3 27h26" stroke="#16262B" stroke-width="2"/>' +
            '<rect x="3" y="3" width="26" height="7" fill="#4A3322"/>' +
            '<rect x="3" y="10" width="26" height="8" fill="#6B4428"/>' +
            '<rect x="3" y="18" width="26" height="9" fill="#C47A34"/>' +
            '<rect x="3" y="27" width="26" height="10" fill="#D9B77A"/>' +
          '</svg>' +
          '<span class="brand__text">Bumi Bawah</span>' +
        '</a>' +
        '<nav class="site-header__desktop" aria-label="Navigasi utama">' +
          '<ul class="nav">' + desktop + '</ul>' +
        '</nav>' +
        '<details class="site-menu">' +
          '<summary>Menu</summary>' +
          '<nav aria-label="Navigasi ponsel"><ul>' + mobile + '</ul></nav>' +
        '</details>' +
      '</div>' +
    '</header>';

  var social = Array.isArray(cfg.social) ? cfg.social.filter(function (s) { return s && s.url; }) : [];
  var socialHtml = social.length
    ? '<p class="site-footer__social">' + social.map(function (s) {
        return '<a href="' + esc(s.url) + '" rel="noopener">' + esc(s.label) + '</a>';
      }).join('') + '</p>'
    : '';

  var footer =
    '<footer class="site-footer">' +
      '<div class="site-footer__inner">' +
        '<div>' +
          '<p class="site-footer__brand">Bumi Bawah</p>' +
          '<p class="site-footer__lede">Situs edukasi tentang tanah, batuan, air, dan batas kerak bumi. Setiap angka besar menunjuk sumbernya.</p>' +
          socialHtml +
        '</div>' +
        '<nav class="site-footer__nav" aria-label="Navigasi kaki halaman">' +
          '<p class="site-footer__title">Halaman</p>' +
          '<ul>' + items.map(function (item) {
            return '<li><a href="' + href(item.path) + '">' + esc(item.label) + '</a></li>';
          }).join('') + '</ul>' +
        '</nav>' +
        
      '</div>' +
      '<div class="site-footer__bottom">' +
        '<span>&copy; ' + year + ' Bumi Bawah' + esc(cfg.location || 'Indonesia') + '.</span>' +
        
      '</div>' +
    '</footer>';

  var headerSlot = document.querySelector('[data-site-header]');
  var footerSlot = document.querySelector('[data-site-footer]');

  if (headerSlot) headerSlot.outerHTML = header;
  if (footerSlot) footerSlot.outerHTML = footer;

  /* Header transparan di beranda, solid setelah pembuka. */
  var headerEl = document.querySelector('[data-header]');
  var orbit = document.querySelector('[data-orbit]');
  var isHome = document.body.classList.contains('is-home');

  function syncHeader() {
    if (!headerEl) return;
    if (!isHome) {
      headerEl.classList.add('site-header--solid');
      return;
    }
    var threshold = orbit
      ? orbit.offsetTop + orbit.offsetHeight - window.innerHeight * 0.18
      : window.innerHeight * 0.6;
    headerEl.classList.toggle('site-header--solid', window.scrollY > threshold);
  }

  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });
  window.addEventListener('resize', syncHeader, { passive: true });

  var menu = document.querySelector('.site-menu');
  if (menu) {
    menu.querySelectorAll('a').forEach(function (anchor) {
      anchor.addEventListener('click', function () {
        menu.removeAttribute('open');
      });
    });

    document.addEventListener('click', function (event) {
      if (menu.hasAttribute('open') && !menu.contains(event.target)) {
        menu.removeAttribute('open');
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menu.hasAttribute('open')) {
        menu.removeAttribute('open');
        menu.querySelector('summary')?.focus();
      }
    });
  }

  var startLink = document.querySelector('[data-start]');
  if (startLink) {
    startLink.addEventListener('click', function () {
      var target = document.getElementById('judul-lapisan-1');
      if (target) {
        window.setTimeout(function () {
          target.focus({ preventScroll: true });
        }, 420);
      }
    });
  }
})();
