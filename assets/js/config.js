/*
  assets/js/config.js — satu-satunya tempat konfigurasi situs.

  Yang perlu diubah saat pindah domain:
    baseUrl      alamat lengkap situs, HARUS diakhiri garis miring.
                 Dipakai untuk canonical, Open Graph, dan sitemap.

  contactEndpoint  alamat layanan formulir (Web3Forms/Formspree).
  contactAccessKey kunci publik Web3Forms. Kunci ini memang terlihat di
                   browser; jangan pernah menaruh kunci rahasia di sini.
                   Kosongkan bila belum punya; formulir otomatis memakai
                   tombol "Kirim lewat email".

  social       daftar tautan kaki halaman. Kosongkan array bila belum ada.

  base         diisi otomatis oleh halaman (./ atau ../). Jangan diubah.
*/
(function () {
  var config = {
    baseUrl: 'https://username.github.io/nama-repo/',
    siteName: 'Bumi Bawah',
    tagline: 'Edukasi setiap lapisan kerak bumi',
    description:
      'Turun dari serasah ke kerak bumi: enam lapisan, 25 penanda kedalaman, artikel, dan galeri ilustrasi.',
    email: 'halo@bumibawah.id',
    location: 'Yogyakarta, Indonesia',
    contactEndpoint: 'https://api.web3forms.com/submit',
    contactAccessKey: '',
    social: [
      { label: 'GitHub', url: 'https://github.com/username/nama-repo' }
    ],
    osmEmbed:
      'https://www.openstreetmap.org/export/embed.html?bbox=110.3300%2C-7.8400%2C110.4300%2C-7.7400&layer=mapnik&marker=-7.7956%2C110.3695'
  };

  config.base = document.documentElement.getAttribute('data-base') || './';

  /*
    Turunkan akar situs dari lokasi skrip ini sendiri. Ini yang membuat
    404.html tetap benar ketika dibuka dari URL bersarang di GitHub Pages.
  */
  var script = document.currentScript;
  if (script && script.src) {
    try {
      var url = new URL(script.src, document.baseURI);
      var marker = '/assets/js/config.js';
      var at = url.pathname.indexOf(marker);
      if (at !== -1) {
        config.rootPath = url.pathname.slice(0, at + 1);
        config.rootUrl = url.origin + config.rootPath;
      }
    } catch (error) {
      /* URL relatif tetap dipakai bila API URL tidak tersedia. */
    }
  }

  window.SITE_CONFIG = config;
})();
