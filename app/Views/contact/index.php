<?php
/** @var array<string, string> $errors */
$fieldError = static function (string $key) use ($errors): ?string {
    return isset($errors[$key]) ? (string) $errors[$key] : null;
};
?>
<section class="page-head page-head--contact" aria-labelledby="judul-kontak">
    <div class="page-head__inner">
        <p class="page-head__eyebrow">Kontak</p>
        <h1 id="judul-kontak">Ada angka yang perlu dikoreksi?</h1>
        <p class="page-head__lede">
            Kami membaca setiap pesan. Koreksi sumber, usulan topik, atau cerita lapangan semuanya berguna. Sebutkan halaman dan angka yang dimaksud agar lebih cepat ditelusuri.
        </p>
    </div>
</section>

<section class="contact" aria-label="Informasi dan formulir kontak">
    <div class="contact__inner">
        <aside class="contact-info" aria-labelledby="judul-info-kontak">
            <h2 id="judul-info-kontak">Jalur yang lebih langsung</h2>

            <div class="contact-info__block">
                <p class="contact-info__label">Surel</p>
                <p><a class="link-underline" href="mailto:<?= e(config('contact.email')) ?>"><?= e(config('contact.email')) ?></a></p>
                <p class="contact-info__note">Untuk koreksi panjang, kirim tautan sumber sekalian.</p>
            </div>

            <div class="contact-info__block">
                <p class="contact-info__label">Lokasi</p>
                <p><?= e(config('contact.location')) ?></p>
                <p class="contact-info__note">Waktu Indonesia Barat (UTC+7). Balasan biasanya dalam 3–5 hari kerja.</p>
            </div>

            <div class="contact-info__block">
                <p class="contact-info__label">Yang kami simpan</p>
                <p>Nama, surel, subjek, isi pesan, dan hash alamat IP untuk mencegah spam. Tidak ada pelacak iklan di situs ini.</p>
            </div>

            <div class="contact-map">
                <iframe
                    title="Peta OpenStreetMap sekitar Yogyakarta"
                    src="<?= e(config('contact.map')) ?>"
                    width="600"
                    height="360"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
                <p><a class="link-underline" href="<?= e(config('contact.map_link')) ?>" target="_blank" rel="noopener noreferrer">Buka peta lebih besar di OpenStreetMap</a></p>
            </div>
        </aside>

        <div class="contact-form-wrap" id="formulir">
            <h2>Kirim pesan</h2>

            <?php if ($sent): ?>
                <div class="notice notice--success" id="pesan-terkirim" role="status" tabindex="-1">
                    <p><strong>Pesan terkirim.</strong> Terima kasih sudah menulis. Kami akan membalas ke alamat surel yang kamu isi.</p>
                </div>
            <?php endif; ?>

            <?php if ($errors !== []): ?>
                <div class="form-errors" role="alert" tabindex="-1" data-form-errors>
                    <p><strong>Ada <?= count($errors) ?> hal yang perlu diperbaiki:</strong></p>
                    <ul>
                        <?php foreach ($errors as $key => $message): ?>
                            <li>
                                <?php if ($key !== 'umum'): ?>
                                    <a href="#field-<?= e($key) ?>"><?= e($message) ?></a>
                                <?php else: ?>
                                    <?= e($message) ?>
                                <?php endif; ?>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endif; ?>

            <form class="contact-form" action="<?= e(url('/kontak')) ?>" method="post" data-contact-form>
                <?= csrf_field() ?>

                <div class="field<?= $fieldError('nama') ? ' has-error' : '' ?>">
                    <label for="field-nama">Nama</label>
                    <input id="field-nama" name="nama" type="text" value="<?= e(old('nama')) ?>" required minlength="2" maxlength="80" autocomplete="name" aria-describedby="<?= $fieldError('nama') ? 'error-nama' : '' ?>" <?= $fieldError('nama') ? 'aria-invalid="true"' : '' ?>>
                    <?php if ($fieldError('nama')): ?>
                        <p class="field__error" id="error-nama"><?= e($fieldError('nama')) ?></p>
                    <?php endif; ?>
                </div>

                <div class="field<?= $fieldError('email') ? ' has-error' : '' ?>">
                    <label for="field-email">Surel</label>
                    <input id="field-email" name="email" type="email" value="<?= e(old('email')) ?>" required maxlength="160" autocomplete="email" inputmode="email" aria-describedby="hint-email<?= $fieldError('email') ? ' error-email' : '' ?>" <?= $fieldError('email') ? 'aria-invalid="true"' : '' ?>>
                    <p class="field__hint" id="hint-email">Kami hanya memakai alamat ini untuk membalas.</p>
                    <?php if ($fieldError('email')): ?>
                        <p class="field__error" id="error-email"><?= e($fieldError('email')) ?></p>
                    <?php endif; ?>
                </div>

                <div class="field<?= $fieldError('subjek') ? ' has-error' : '' ?>">
                    <label for="field-subjek">Subjek</label>
                    <input id="field-subjek" name="subjek" type="text" value="<?= e(old('subjek')) ?>" required minlength="3" maxlength="160" aria-describedby="<?= $fieldError('subjek') ? 'error-subjek' : '' ?>" <?= $fieldError('subjek') ? 'aria-invalid="true"' : '' ?>>
                    <?php if ($fieldError('subjek')): ?>
                        <p class="field__error" id="error-subjek"><?= e($fieldError('subjek')) ?></p>
                    <?php endif; ?>
                </div>

                <div class="field<?= $fieldError('pesan') ? ' has-error' : '' ?>">
                    <label for="field-pesan">Pesan</label>
                    <textarea id="field-pesan" name="pesan" rows="8" required minlength="10" maxlength="3000" aria-describedby="hint-pesan<?= $fieldError('pesan') ? ' error-pesan' : '' ?>" <?= $fieldError('pesan') ? 'aria-invalid="true"' : '' ?>><?= e(old('pesan')) ?></textarea>
                    <p class="field__hint" id="hint-pesan">Sebutkan halaman, angka, dan sumber pembanding bila ada. Maksimal 3.000 karakter.</p>
                    <?php if ($fieldError('pesan')): ?>
                        <p class="field__error" id="error-pesan"><?= e($fieldError('pesan')) ?></p>
                    <?php endif; ?>
                </div>

                <div class="hp" aria-hidden="true">
                    <label for="field-website">Jangan diisi</label>
                    <input id="field-website" name="website" type="text" tabindex="-1" autocomplete="off">
                </div>

                <button class="btn btn--ink" type="submit">Kirim pesan</button>
                <p class="contact-form__note">Dengan mengirim, kamu setuju pesan disimpan untuk ditindaklanjuti. Tidak ada langganan surel otomatis.</p>
            </form>
        </div>
    </div>
</section>
