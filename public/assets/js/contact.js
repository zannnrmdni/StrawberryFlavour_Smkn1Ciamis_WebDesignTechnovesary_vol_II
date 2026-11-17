/**
 * Validasi formulir kontak di sisi peramban.
 * Aturan dan pesannya sama dengan ContactController supaya pengguna tidak
 * mendapat dua jawaban berbeda. Validasi server tetap menjadi penentu akhir.
 */

const form = document.querySelector('[data-contact-form]');

if (form) {
  setup();
}

function setup() {
  const rules = {
    nama: {
      validate: (value) => {
        const length = [...value.trim()].length;
        return length >= 2 && length <= 80 ? '' : 'Tulis nama antara 2 dan 80 karakter.';
      },
    },
    email: {
      validate: (value) => {
        const email = value.trim();
        if (email === '' || email.length > 160) {
          return 'Alamat surel belum benar. Contoh: nama@contoh.id.';
        }
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
          ? ''
          : 'Alamat surel belum benar. Contoh: nama@contoh.id.';
      },
    },
    subjek: {
      validate: (value) => {
        const length = [...value.trim()].length;
        return length >= 3 && length <= 160 ? '' : 'Subjek perlu 3 sampai 160 karakter.';
      },
    },
    pesan: {
      validate: (value) => {
        const length = [...value.trim()].length;
        return length >= 10 && length <= 3000 ? '' : 'Pesan perlu 10 sampai 3.000 karakter.';
      },
    },
  };

  const fields = Object.keys(rules)
    .map((name) => {
      const input = form.elements.namedItem(name);
      if (!(input instanceof HTMLElement)) return null;
      return { name, input, rule: rules[name] };
    })
    .filter(Boolean);

  const describedBy = (input) => (input.getAttribute('aria-describedby') || '')
    .split(/\s+/)
    .filter(Boolean);

  const setDescribedBy = (input, ids) => {
    if (ids.length === 0) {
      input.removeAttribute('aria-describedby');
    } else {
      input.setAttribute('aria-describedby', [...new Set(ids)].join(' '));
    }
  };

  const clearError = ({ name, input }) => {
    const wrapper = input.closest('.field');
    wrapper?.classList.remove('has-error');
    wrapper?.querySelector(`#error-${name}`)?.remove();
    input.removeAttribute('aria-invalid');
    setDescribedBy(
      input,
      describedBy(input).filter((id) => id !== `error-${name}`)
    );
  };

  const showError = ({ name, input }, message) => {
    const wrapper = input.closest('.field');
    if (!wrapper) return;

    wrapper.classList.add('has-error');
    input.setAttribute('aria-invalid', 'true');

    let error = wrapper.querySelector(`#error-${name}`);
    if (!error) {
      error = document.createElement('p');
      error.className = 'field__error';
      error.id = `error-${name}`;
      error.setAttribute('aria-live', 'polite');
      wrapper.append(error);
    }
    error.textContent = message;

    setDescribedBy(input, [...describedBy(input), `error-${name}`]);
  };

  const validateField = (field) => {
    const message = field.rule.validate(field.input.value);
    if (message === '') {
      clearError(field);
      return true;
    }
    showError(field, message);
    return false;
  };

  fields.forEach((field) => {
    field.input.addEventListener('blur', () => {
      if (field.input.value.trim() !== '' || field.input.getAttribute('aria-invalid') === 'true') {
        validateField(field);
      }
    });

    field.input.addEventListener('input', () => {
      if (field.input.getAttribute('aria-invalid') === 'true') {
        validateField(field);
      }
    });
  });

  form.addEventListener('submit', (event) => {
    let firstInvalid = null;

    fields.forEach((field) => {
      const valid = validateField(field);
      if (!valid && firstInvalid === null) {
        firstInvalid = field.input;
      }
    });

    if (firstInvalid instanceof HTMLElement) {
      event.preventDefault();
      firstInvalid.focus({ preventScroll: false });
      firstInvalid.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  });

  if (window.location.hash === '#pesan-terkirim') {
    document.getElementById('pesan-terkirim')?.focus({ preventScroll: true });
  }
}
