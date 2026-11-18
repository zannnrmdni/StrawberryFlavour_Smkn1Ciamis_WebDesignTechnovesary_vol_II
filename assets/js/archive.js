/*
  assets/js/archive.js — tab "Artikel" dan "Kabar Bumi".
  Tanpa JavaScript, kedua panel tetap terbaca karena CSS hanya menyembunyikan
  panel nonaktif ketika kelas "js" ada di <html>.
*/
(function () {
  var root = document.querySelector('[data-tabs]');
  if (!root) return;

  var tabs = Array.prototype.slice.call(root.querySelectorAll('[data-tab]'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('[data-panel]'));
  if (tabs.length === 0 || panels.length === 0) return;

  var names = tabs.map(function (tab) {
    return tab.getAttribute('data-tab');
  });

  function activate(name, focus) {
    if (names.indexOf(name) === -1) name = names[0];

    tabs.forEach(function (tab) {
      var active = tab.getAttribute('data-tab') === name;
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
      tab.setAttribute('tabindex', active ? '0' : '-1');
      if (active && focus) tab.focus();
    });

    panels.forEach(function (panel) {
      var active = panel.getAttribute('data-panel') === name;
      panel.classList.toggle('is-active', active);
      panel.hidden = !active;
    });

    try {
      history.replaceState(null, '', name === 'kabar' ? '#kabar-bumi' : '#artikel');
    } catch (error) {
      /* file:// di beberapa peramban menolak replaceState; abaikan. */
    }
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      activate(tab.getAttribute('data-tab'), false);
    });

    tab.addEventListener('keydown', function (event) {
      var index = names.indexOf(tab.getAttribute('data-tab'));
      var next = null;

      if (event.key === 'ArrowRight') next = (index + 1) % names.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + names.length) % names.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = names.length - 1;

      if (next == null) return;
      event.preventDefault();
      activate(names[next], true);
    });
  });

  var hash = location.hash.replace('#', '');
  activate(hash === 'kabar-bumi' ? 'kabar' : 'artikel', false);
})();
