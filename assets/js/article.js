/*
  assets/js/article.js — kemajuan baca, daftar isi otomatis, dan salin tautan.
  Tidak ada animasi yang mengubah tata letak.
*/
(function () {
  var article = document.querySelector('[data-article]');
  if (!article) return;

  setupProgress();
  setupToc();
  setupCopy();
  setupGlossary();

  function setupProgress() {
    var progress = document.querySelector('[data-reading-progress]');
    if (!progress) return;
    var bar = progress.querySelector('span');
    if (!bar) return;

    var ticking = false;

    function update() {
      ticking = false;
      var rect = article.getBoundingClientRect();
      var total = Math.max(1, article.offsetHeight - window.innerHeight * 0.35);
      var passed = Math.min(total, Math.max(0, -rect.top + window.innerHeight * 0.2));
      var ratio = Math.min(1, Math.max(0, passed / total));
      bar.style.transform = 'scaleX(' + ratio.toFixed(4) + ')';
      progress.classList.toggle('is-visible', ratio > 0.005 && ratio < 0.999);
    }

    function request() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request, { passive: true });
  }

  function setupToc() {
    var toc = document.querySelector('[data-toc]');
    if (!toc) return;

    var links = Array.prototype.slice.call(toc.querySelectorAll('[data-toc-link]'));
    var headings = links
      .map(function (link) { return document.getElementById(link.getAttribute('data-toc-link') || ''); })
      .filter(function (heading) { return heading instanceof HTMLElement; });

    if (headings.length === 0) return;

    function setActive(id) {
      links.forEach(function (link) {
        var active = link.getAttribute('data-toc-link') === id;
        link.classList.toggle('is-active', active);
        if (active) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }

    if (!('IntersectionObserver' in window)) {
      setActive(headings[0].id);
      return;
    }

    var visible = new Set();

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });

        var first = headings.find(function (heading) { return visible.has(heading.id); });
        if (first) {
          setActive(first.id);
          return;
        }

        var current = headings[0];
        headings.forEach(function (heading) {
          if (heading.getBoundingClientRect().top < window.innerHeight * 0.4) current = heading;
        });
        setActive(current.id);
      },
      { rootMargin: '-12% 0px -66% 0px', threshold: [0, 1] }
    );

    headings.forEach(function (heading) { observer.observe(heading); });

    links.forEach(function (link) {
      link.addEventListener('click', function () {
        setActive(link.getAttribute('data-toc-link') || '');
      });
    });
  }

  function setupGlossary() {
    var terms = Array.prototype.slice.call(article.querySelectorAll('.gloss'));
    if (terms.length === 0) return;

    terms.forEach(function (term) {
      var tip = term.querySelector('.gloss__tip');
      if (!tip) return;

      function place() {
        tip.style.left = '';
        var box = tip.getBoundingClientRect();
        var pad = 12;
        var shift = 0;
        var limit = document.documentElement.clientWidth;
        if (box.right > limit - pad) shift = limit - pad - box.right;
        if (box.left + shift < pad) shift = pad - box.left;
        if (shift) tip.style.left = shift + 'px';
      }

      function reset() {
        tip.style.left = '';
      }

      term.addEventListener('pointerenter', place);
      term.addEventListener('focus', place);
      term.addEventListener('click', place);
      term.addEventListener('pointerleave', reset);
      term.addEventListener('blur', reset);
    });
  }

  function setupCopy() {
    var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-copy-link]'));
    if (buttons.length === 0) return;

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var url = button.getAttribute('data-copy-link') || location.href;
        var done = function () {
          var label = button.querySelector('[data-copy-label]');
          var original = label ? label.textContent : '';
          button.classList.add('is-done');
          if (label) label.textContent = 'Tautan disalin';
          window.setTimeout(function () {
            button.classList.remove('is-done');
            if (label) label.textContent = original;
          }, 2400);
        };

        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(url).then(done).catch(fallback);
        } else {
          fallback();
        }

        function fallback() {
          var area = document.createElement('textarea');
          area.value = url;
          area.setAttribute('readonly', '');
          area.style.position = 'fixed';
          area.style.top = '-1000px';
          document.body.appendChild(area);
          area.select();
          try {
            document.execCommand('copy');
            done();
          } catch (error) {
            window.prompt('Salin tautan ini:', url);
          }
          area.remove();
        }
      });
    });
  }
})();
