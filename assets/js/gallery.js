/*
  assets/js/gallery.js — filter kategori dan lightbox galeri.
  Filter tidak memuat ulang halaman; URL hanya diubah agar bisa dibagikan.
*/
(function () {
  var root = document.querySelector('[data-gallery]');
  if (!root) return;

  var items = Array.prototype.slice.call(root.querySelectorAll('[data-plate]'));
  var filters = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
  var count = document.querySelector('[data-gallery-count]');
  var dialog = document.querySelector('[data-lightbox-dialog]');
  var active = '';

  var params = new URLSearchParams(location.search);
  var initial = params.get('kategori') || '';
  if (initial && filters.some(function (button) { return button.getAttribute('data-filter') === initial; })) {
    active = initial;
  }

  function apply(category, updateUrl) {
    active = category;

    items.forEach(function (item) {
      var show = !category || item.getAttribute('data-kategori') === category;
      item.hidden = !show;
    });

    filters.forEach(function (button) {
      var on = button.getAttribute('data-filter') === category;
      button.classList.toggle('is-active', on);
      button.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    var shown = items.filter(function (item) { return !item.hidden; }).length;
    if (count) {
      count.textContent = category
        ? shown + ' pelat dalam kategori ' + category
        : shown + ' pelat dari ' + items.length;
    }

    if (updateUrl) {
      var url = new URL(location.href);
      if (category) url.searchParams.set('kategori', category);
      else url.searchParams.delete('kategori');
      try {
        history.replaceState(null, '', url.pathname + url.search + url.hash);
      } catch (error) {
        /* abaikan pada file:// */
      }
    }

    if (dialog && dialog.open) dialog.close();
  }

  filters.forEach(function (button) {
    button.addEventListener('click', function () {
      apply(button.getAttribute('data-filter') || '', true);
    });
  });

  apply(active, false);

  if (!dialog) return;

  var image = dialog.querySelector('[data-lightbox-image]');
  var title = dialog.querySelector('[data-lightbox-title]');
  var caption = dialog.querySelector('[data-lightbox-caption]');
  var locationEl = dialog.querySelector('[data-lightbox-location]');
  var credit = dialog.querySelector('[data-lightbox-credit]');
  var counter = dialog.querySelector('[data-lightbox-count]');
  var closeButton = dialog.querySelector('[data-lightbox-close]');
  var prevButton = dialog.querySelector('[data-lightbox-prev]');
  var nextButton = dialog.querySelector('[data-lightbox-next]');

  var triggers = [];
  var index = 0;
  var lastTrigger = null;

  function refreshTriggers() {
    triggers = items
      .filter(function (item) { return !item.hidden; })
      .map(function (item) { return item.querySelector('[data-lightbox]'); })
      .filter(Boolean);
  }

  function itemAt(i) {
    return triggers[(i + triggers.length) % triggers.length];
  }

  function preload(i) {
    var trigger = itemAt(i);
    if (!trigger) return;
    var url = trigger.getAttribute('data-full') || trigger.getAttribute('data-fallback');
    if (!url) return;
    var img = new Image();
    img.src = url;
  }

  function show(nextIndex, moveFocus) {
    if (triggers.length === 0) return;
    index = (nextIndex + triggers.length) % triggers.length;
    var trigger = triggers[index];
    var source = trigger.getAttribute('data-full') || trigger.getAttribute('data-fallback') || '';

    if (image) {
      image.onerror = function () {
        image.onerror = null;
        var fallback = trigger.getAttribute('data-fallback');
        if (fallback) image.src = fallback;
      };
      image.src = source;
      image.alt = trigger.getAttribute('data-title')
        ? 'Ilustrasi ' + trigger.getAttribute('data-title')
        : 'Ilustrasi galeri';
    }

    if (title) title.textContent = trigger.getAttribute('data-title') || '';
    if (caption) caption.textContent = trigger.getAttribute('data-caption') || '';
    if (locationEl) locationEl.textContent = trigger.getAttribute('data-location') || '';
    if (credit) credit.textContent = trigger.getAttribute('data-credit') || '';
    if (counter) counter.textContent = (index + 1) + ' dari ' + triggers.length;

    if (prevButton) prevButton.disabled = triggers.length < 2;
    if (nextButton) nextButton.disabled = triggers.length < 2;

    preload(index + 1);
    preload(index - 1);

    if (moveFocus) closeButton?.focus({ preventScroll: true });
  }

  function open(trigger) {
    lastTrigger = trigger;
    refreshTriggers();
    show(triggers.indexOf(trigger), false);
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    document.body.classList.add('has-dialog');
    closeButton?.focus({ preventScroll: true });
  }

  function close() {
    if (typeof dialog.close === 'function') dialog.close();
    else {
      dialog.removeAttribute('open');
      finishClose();
    }
  }

  function finishClose() {
    document.body.classList.remove('has-dialog');
    if (lastTrigger instanceof HTMLElement) {
      lastTrigger.focus({ preventScroll: true });
      lastTrigger = null;
    }
  }

  function bind() {
    items.forEach(function (item) {
      var trigger = item.querySelector('[data-lightbox]');
      if (!trigger) return;
      trigger.addEventListener('click', function () {
        refreshTriggers();
        open(trigger);
      });
    });
  }

  bind();

  closeButton?.addEventListener('click', close);
  prevButton?.addEventListener('click', function () { show(index - 1, true); });
  nextButton?.addEventListener('click', function () { show(index + 1, true); });

  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) close();
  });

  dialog.addEventListener('close', finishClose);

  dialog.addEventListener('cancel', function (event) {
    event.preventDefault();
    close();
  });

  dialog.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      show(index - 1, true);
      return;
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      show(index + 1, true);
      return;
    }
    if (event.key !== 'Tab') return;

    var focusable = Array.prototype.slice
      .call(dialog.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'))
      .filter(function (element) {
        return element instanceof HTMLElement && element.offsetParent !== null;
      });

    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    var current = document.activeElement;

    if (event.shiftKey && (current === first || !dialog.contains(current))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (current === last || !dialog.contains(current))) {
      event.preventDefault();
      first.focus();
    }
  });
})();
