/**
 * Lightbox galeri.
 * Dialog bawaan browser menangani modal dan Esc; skrip ini menambahkan
 * navigasi panah, fokus yang terkunci, keterangan, kredit, dan fokus kembali.
 */

const dialog = document.querySelector('[data-lightbox-dialog]');
const triggers = Array.from(document.querySelectorAll('[data-lightbox]'));

if (dialog && triggers.length > 0) {
  setup();
}

function setup() {
  const image = dialog.querySelector('[data-lightbox-image]');
  const title = dialog.querySelector('[data-lightbox-title]');
  const caption = dialog.querySelector('[data-lightbox-caption]');
  const location = dialog.querySelector('[data-lightbox-location]');
  const credit = dialog.querySelector('[data-lightbox-credit]');
  const count = dialog.querySelector('[data-lightbox-count]');
  const closeButton = dialog.querySelector('[data-lightbox-close]');
  const prevButton = dialog.querySelector('[data-lightbox-prev]');
  const nextButton = dialog.querySelector('[data-lightbox-next]');

  let index = 0;
  let lastTrigger = null;

  const itemAt = (i) => triggers[(i + triggers.length) % triggers.length];

  const preload = (i) => {
    const trigger = itemAt(i);
    const url = trigger.dataset.full || trigger.dataset.fallback;
    if (!url) return;
    const img = new Image();
    img.src = url;
  };

  const show = (nextIndex, focusImage = false) => {
    index = (nextIndex + triggers.length) % triggers.length;
    const trigger = triggers[index];
    const source = trigger.dataset.full || trigger.dataset.fallback || '';

    if (image) {
      image.onerror = () => {
        image.onerror = null;
        if (trigger.dataset.fallback) image.src = trigger.dataset.fallback;
      };
      image.src = source;
      image.alt = trigger.dataset.title ? `Ilustrasi ${trigger.dataset.title}` : 'Ilustrasi galeri';
    }

    if (title) title.textContent = trigger.dataset.title || '';
    if (caption) caption.textContent = trigger.dataset.caption || '';
    if (location) location.textContent = trigger.dataset.location || '';
    if (credit) credit.textContent = trigger.dataset.credit || '';
    if (count) count.textContent = `${index + 1} dari ${triggers.length}`;

    if (prevButton) prevButton.disabled = triggers.length < 2;
    if (nextButton) nextButton.disabled = triggers.length < 2;

    preload(index + 1);
    preload(index - 1);

    if (focusImage) {
      closeButton?.focus({ preventScroll: true });
    }
  };

  const open = (trigger) => {
    lastTrigger = trigger;
    show(Number.parseInt(trigger.dataset.index || '0', 10), false);

    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }

    document.body.classList.add('has-dialog');
    closeButton?.focus({ preventScroll: true });
  };

  const close = () => {
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
      finishClose();
    }
  };

  const finishClose = () => {
    document.body.classList.remove('has-dialog');
    if (lastTrigger instanceof HTMLElement) {
      lastTrigger.focus({ preventScroll: true });
      lastTrigger = null;
    }
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => open(trigger));
  });

  closeButton?.addEventListener('click', close);
  prevButton?.addEventListener('click', () => show(index - 1, true));
  nextButton?.addEventListener('click', () => show(index + 1, true));

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) close();
  });

  dialog.addEventListener('close', finishClose);

  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    close();
  });

  dialog.addEventListener('keydown', (event) => {
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

    const focusable = Array.from(
      dialog.querySelectorAll('button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    ).filter((element) => element instanceof HTMLElement && element.offsetParent !== null);

    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && (active === first || !dialog.contains(active))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (active === last || !dialog.contains(active))) {
      event.preventDefault();
      first.focus();
    }
  });
}
