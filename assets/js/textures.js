/*
  assets/js/textures.js — tekstur lapisan dimuat saat mendekati layar dan
  digeser lebih lambat daripada teks. Bila prefers-reduced-motion aktif,
  tekstur tetap tampil tetapi tidak bergerak.
*/
(function () {
  var textures = Array.prototype.slice.call(document.querySelectorAll('[data-tex]'));
  if (textures.length === 0) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var loaded = new WeakSet();

  function load(texture) {
    if (loaded.has(texture)) return;
    loaded.add(texture);
    var src = texture.getAttribute('data-tex');
    if (!src) return;
    var image = new Image();
    image.decoding = 'async';
    image.onload = function () {
      texture.style.backgroundImage = 'url("' + src + '")';
      texture.classList.add('is-loaded');
    };
    image.src = src;
  }

  if ('IntersectionObserver' in window) {
    var loader = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          load(entry.target);
          loader.unobserve(entry.target);
        });
      },
      { rootMargin: '600px 0px' }
    );
    textures.forEach(function (texture) {
      loader.observe(texture);
    });
  } else {
    textures.forEach(load);
  }

  var layers = Array.prototype.slice.call(document.querySelectorAll('.layer[data-layer]'));
  if (layers.length === 0 || reduced.matches) return;

  var ticking = false;

  function update() {
    ticking = false;
    var viewport = window.innerHeight;

    layers.forEach(function (layer) {
      var rect = layer.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > viewport + 200) return;

      var texture = layer.querySelector('[data-tex]');
      if (!texture) return;

      var speed = parseFloat(layer.getAttribute('data-tex-speed') || '0.4');
      var progress = (viewport - rect.top) / (viewport + rect.height);
      var shift = (progress - 0.5) * 260 * speed;
      texture.style.setProperty('--tex-shift', shift.toFixed(1) + 'px');
    });
  }

  function request() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }

  update();
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request, { passive: true });

  if (typeof reduced.addEventListener === 'function') {
    reduced.addEventListener('change', function (event) {
      if (event.matches) {
        textures.forEach(function (texture) {
          texture.style.removeProperty('--tex-shift');
        });
      } else {
        request();
      }
    });
  }
})();
