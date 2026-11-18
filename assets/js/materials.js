/*
  assets/js/materials.js — kartu "Isi lapisan ini".
  Tombol membuka dialog penuh; hover atau fokus menampilkan pratinjau kecil.
  Semua isi dibaca dari atribut data yang dihasilkan dari data/materi.js.
*/
(function () {
  var dialog = document.querySelector('[data-materi-dialog]');
  var preview = document.querySelector('[data-materi-preview]');
  var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-materi]'));
  if (buttons.length === 0) return;

  var fields = {};
  if (dialog) {
    fields = {
      image: dialog.querySelector('[data-materi-image]'),
      title: dialog.querySelector('[data-materi-title]'),
      depth: dialog.querySelector('[data-materi-depth]'),
      kind: dialog.querySelector('[data-materi-kind]'),
      layer: dialog.querySelector('[data-materi-layer]'),
      apa: dialog.querySelector('[data-materi-apa]'),
      peran: dialog.querySelector('[data-materi-peran]'),
      source: dialog.querySelector('[data-materi-source]'),
      sourceName: dialog.querySelector('[data-materi-source-name]')
    };
  }

  var previewFields = {};
  if (preview) {
    previewFields = {
      art: preview.querySelector('[data-preview-image]'),
      title: preview.querySelector('[data-preview-title]'),
      depth: preview.querySelector('[data-preview-depth]'),
      apa: preview.querySelector('[data-preview-apa]')
    };
  }

  var lastTrigger = null;
  var hideTimer = 0;

  function read(button) {
    return {
      name: button.getAttribute('data-nama') || '',
      depth: button.getAttribute('data-kedalaman') || '',
      kind: button.getAttribute('data-jenis') || '',
      layer: button.getAttribute('data-lapisan') || '',
      apa: button.getAttribute('data-apa') || '',
      peran: button.getAttribute('data-peran') || '',
      image: button.getAttribute('data-gambar') || '',
      sourceName: button.getAttribute('data-sumber-nama') || 'sumber',
      sourceUrl: button.getAttribute('data-sumber-url') || '#',
      accent: button.getAttribute('data-warna') || '#F3C64F'
    };
  }

  function showPreview(button) {
    if (!preview) return;
    window.clearTimeout(hideTimer);
    var data = read(button);

    if (previewFields.art) {
      previewFields.art.src = data.image;
      previewFields.art.alt = '';
    }
    if (previewFields.title) previewFields.title.textContent = data.name;
    if (previewFields.depth) previewFields.depth.textContent = data.depth;
    if (previewFields.apa) previewFields.apa.textContent = data.apa;

    preview.hidden = false;
    var rect = button.getBoundingClientRect();
    var box = preview.getBoundingClientRect();
    var left = Math.min(
      Math.max(12, rect.left + rect.width / 2 - box.width / 2),
      window.innerWidth - box.width - 12
    );
    var top = rect.top - box.height - 10;
    if (top < 12) top = rect.bottom + 10;
    preview.style.left = left + 'px';
    preview.style.top = Math.max(12, top) + 'px';
  }

  function hidePreview(delay) {
    if (!preview) return;
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(function () {
      preview.hidden = true;
    }, delay || 0);
  }

  function open(button) {
    if (!dialog) return;
    var data = read(button);
    lastTrigger = button;
    hidePreview(0);

    dialog.style.setProperty('--specimen-accent', data.accent);

    if (fields.image) {
      fields.image.src = data.image;
      fields.image.alt = 'Ilustrasi ' + data.name;
    }
    if (fields.title) fields.title.textContent = data.name;
    if (fields.depth) fields.depth.textContent = data.depth;
    if (fields.kind) fields.kind.textContent = data.kind;
    if (fields.layer) fields.layer.textContent = data.layer;
    if (fields.apa) fields.apa.textContent = data.apa;
    if (fields.peran) fields.peran.textContent = data.peran;
    if (fields.source) fields.source.href = data.sourceUrl;
    if (fields.sourceName) fields.sourceName.textContent = data.sourceName;

    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
      document.body.classList.add('has-dialog');
    }
  }

  function close() {
    if (dialog && typeof dialog.close === 'function') dialog.close();
  }

  buttons.forEach(function (button) {
    button.addEventListener('mouseenter', function () {
      showPreview(button);
    });
    button.addEventListener('mouseleave', function () {
      hidePreview(140);
    });
    button.addEventListener('focus', function () {
      showPreview(button);
    });
    button.addEventListener('blur', function () {
      hidePreview(80);
    });
    button.addEventListener('click', function () {
      open(button);
    });
  });

  if (dialog) {
    dialog.querySelector('[data-materi-close]')?.addEventListener('click', close);
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) close();
    });
    dialog.addEventListener('close', function () {
      document.body.classList.remove('has-dialog');
      if (lastTrigger instanceof HTMLElement) {
        lastTrigger.focus({ preventScroll: true });
        lastTrigger = null;
      }
    });
  }

  window.addEventListener('scroll', function () {
    hidePreview(0);
  }, { passive: true });
})();
