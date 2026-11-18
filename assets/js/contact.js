/*
  assets/js/contact.js — validasi di browser lalu kirim ke Web3Forms.
  Tidak ada pesan yang disimpan di server situs ini. Bila kunci layanan belum
  diisi, tombol email (mailto) tetap menjadi jalur cadangan yang berfungsi.
*/
(function () {
  var form = document.querySelector('[data-contact-form]');
  if (!form) return;

  var cfg = window.SITE_CONFIG || {};
  var status = form.querySelector('[data-form-status]');
  var submit = form.querySelector('[data-form-submit]');
  var mailto = form.querySelector('[data-mailto]');
  var note = document.querySelector('[data-config-note]');

  var fields = {
    nama: form.querySelector('[name="nama"]'),
    email: form.querySelector('[name="email"]'),
    subjek: form.querySelector('[name="subjek"]'),
    pesan: form.querySelector('[name="pesan"]')
  };

  function fieldWrap(input) {
    return input ? input.closest('.field') : null;
  }

  function errorBox(name) {
    return form.querySelector('[data-error-for="' + name + '"]');
  }

  function setError(name, message) {
    var input = fields[name];
    var wrap = fieldWrap(input);
    var box = errorBox(name);
    if (wrap) wrap.classList.toggle('has-error', Boolean(message));
    if (input) {
      if (message) input.setAttribute('aria-invalid', 'true');
      else input.removeAttribute('aria-invalid');
    }
    if (box) {
      box.textContent = message || '';
      box.hidden = !message;
    }
  }

  function validate() {
    var errors = [];
    var nama = (fields.nama?.value || '').trim();
    var email = (fields.email?.value || '').trim();
    var subjek = (fields.subjek?.value || '').trim();
    var pesan = (fields.pesan?.value || '').trim();

    setError('nama', '');
    setError('email', '');
    setError('subjek', '');
    setError('pesan', '');

    if (nama.length < 2) {
      setError('nama', 'Tulis nama atau panggilan, minimal 2 huruf.');
      errors.push(fields.nama);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('email', 'Alamat email belum benar. Contoh: nama@contoh.id');
      errors.push(fields.email);
    }

    if (!subjek) {
      setError('subjek', 'Pilih satu jenis pesan.');
      errors.push(fields.subjek);
    }

    if (pesan.length < 20) {
      setError('pesan', 'Tulis minimal 20 huruf agar kami paham konteksnya.');
      errors.push(fields.pesan);
    }

    if (errors.length > 0) {
      errors[0]?.focus();
      return null;
    }

    return { nama: nama, email: email, subjek: subjek, pesan: pesan };
  }

  function updateMailto() {
    if (!mailto) return;
    var nama = (fields.nama?.value || '').trim() || 'Pengunjung';
    var subjek = (fields.subjek?.value || 'Pesan dari situs Bumi Bawah').trim();
    var pesan = (fields.pesan?.value || '').trim();
    var body = pesan + '\n\n— ' + nama + (fields.email?.value ? ' (' + fields.email.value.trim() + ')' : '');
    mailto.href =
      'mailto:' + (cfg.email || 'dalambumi67@gmail.com') +
      '?subject=' + encodeURIComponent('[Bumi Bawah] ' + subjek) +
      '&body=' + encodeURIComponent(body);
  }

  function setStatus(kind, html) {
    if (!status) return;
    status.hidden = false;
    status.className = 'notice notice--' + kind;
    status.innerHTML = html;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  if (!cfg.contactAccessKey && note) {
    note.hidden = false;
  }

  Object.keys(fields).forEach(function (name) {
    fields[name]?.addEventListener('input', function () {
      if (fieldWrap(fields[name])?.classList.contains('has-error')) setError(name, '');
    });
    fields[name]?.addEventListener('change', updateMailto);
  });

  updateMailto();

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var data = validate();
    if (!data) {
      setStatus('error', '<p>Ada kolom yang belum lengkap. Periksa tanda merah di atas.</p>');
      return;
    }

    var honey = form.querySelector('[name="botcheck"]');
    if (honey && honey.checked) return;

    if (!cfg.contactAccessKey) {
      setStatus(
        'error',
        '<p>Formulir belum disambungkan ke layanan pengiriman. Gunakan tombol <strong>Kirim lewat email</strong> di bawah; pesan akan dibuka di aplikasi surel Anda.</p>'
      );
      updateMailto();
      return;
    }

    if (submit) {
      submit.disabled = true;
      submit.dataset.label = submit.textContent;
      submit.textContent = 'Mengirim…';
    }
    setStatus('success', '<p>Mengirim pesan…</p>');

    fetch(cfg.contactEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: cfg.contactAccessKey,
        name: data.nama,
        email: data.email,
        subject: '[Bumi Bawah] ' + data.subjek,
        message: data.pesan,
        from_name: cfg.siteName || 'Bumi Bawah',
        replyto: data.email,
        site: location.href
      })
    })
      .then(function (response) {
        return response.json().catch(function () { return {}; }).then(function (body) {
          if (!response.ok || body.success === false) {
            throw new Error(body.message || 'Layanan menolak pesan.');
          }
          return body;
        });
      })
      .then(function () {
        form.reset();
        updateMailto();
        setStatus(
          'success',
          '<p>Pesan terkirim. Terima kasih; kami membaca setiap koreksi dan usulan. Balasan dikirim ke alamat email yang Anda tulis.</p>'
        );
      })
      .catch(function () {
        setStatus(
          'error',
          '<p>Pesan belum terkirim. Jaringan atau layanan formulir sedang bermasalah. Coba lagi, atau gunakan tombol <strong>Kirim lewat email</strong> di bawah.</p>'
        );
      })
      .then(function () {
        if (submit) {
          submit.disabled = false;
          submit.textContent = submit.dataset.label || 'Kirim pesan';
        }
      });
  });
})();
