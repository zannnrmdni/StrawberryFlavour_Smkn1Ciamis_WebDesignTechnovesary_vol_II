/**
 * Panel admin: konfirmasi tindakan destruktif, bantuan slug, dan fokus ke
 * ringkasan galat setelah simpan gagal.
 */

document.querySelectorAll('form[data-confirm]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    const message = form.dataset.confirm || 'Lanjutkan tindakan ini?';
    if (!window.confirm(message)) {
      event.preventDefault();
    }
  });
});

const source = document.querySelector('[data-slug-source]');
const target = document.querySelector('[data-slug-target]');

if (source && target) {
  let locked = target.value.trim() !== '';

  const slugify = (value) => value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 160);

  target.addEventListener('input', () => {
    locked = target.value.trim() !== '';
  });

  source.addEventListener('input', () => {
    if (locked) return;
    target.value = slugify(source.value);
  });
}

const errors = document.querySelector('[data-form-errors]');
if (errors) {
  errors.focus({ preventScroll: false });
}
