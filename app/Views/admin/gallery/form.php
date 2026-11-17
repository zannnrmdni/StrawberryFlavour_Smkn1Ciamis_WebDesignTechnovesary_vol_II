<?php
/** @var array<string, mixed>|null $item */
/** @var array<int, array{kategori: string, jumlah: int}> $categories */
/** @var array<string, string> $errors */
/** @var bool $isNew */
$value = static function (string $key, string $default = '') use ($item): string {
    return old($key, (string) ($item[$key] ?? $default));
};
$currentImage = old('gambar_lama', (string) ($item['gambar'] ?? ''));
$formAction = $isNew ? url('/admin/galeri') : url('/admin/galeri/' . (int) $item['id']);
?>
<div class="admin-head">
    <div>
        <p class="admin-eyebrow">Galeri</p>
        <h1><?= $isNew ? 'Tambah pelat baru' : 'Ubah pelat' ?></h1>
        <p>Gunakan ilustrasi atau foto yang memang boleh dipakai. Kredit harus jelas.</p>
    </div>
    <div class="admin-head__actions">
        <a class="btn btn--outline" href="<?= e(url('/admin/galeri')) ?>">Kembali</a>
    </div>
</div>

<?php if ($errors !== []): ?>
    <div class="form-errors" role="alert" tabindex="-1" data-form-errors>
        <p><strong>Ada <?= count($errors) ?> hal yang perlu diperbaiki:</strong></p>
        <ul>
            <?php foreach ($errors as $message): ?><li><?= e($message) ?></li><?php endforeach; ?>
        </ul>
    </div>
<?php endif; ?>

<form class="admin-form" action="<?= e($formAction) ?>" method="post" enctype="multipart/form-data" data-admin-form>
    <?= csrf_field() ?>
    <input type="hidden" name="_return" value="<?= e(current_path()) ?>">
    <input type="hidden" name="gambar_lama" value="<?= e($currentImage) ?>">

    <div class="admin-form__grid">
        <div class="field">
            <label for="judul">Judul</label>
            <input id="judul" name="judul" type="text" value="<?= e($value('judul')) ?>" required minlength="3" maxlength="140">
        </div>

        <div class="field">
            <label for="kategori">Kategori</label>
            <input id="kategori" name="kategori" type="text" value="<?= e($value('kategori')) ?>" required minlength="2" maxlength="50" list="kategori-list">
            <datalist id="kategori-list">
                <?php foreach ($categories as $category): ?><option value="<?= e($category['kategori']) ?>"><?php endforeach; ?>
            </datalist>
        </div>

        <div class="field admin-form__wide">
            <label for="deskripsi">Deskripsi</label>
            <textarea id="deskripsi" name="deskripsi" rows="3" required minlength="10" maxlength="400"><?= e($value('deskripsi')) ?></textarea>
        </div>

        <div class="field">
            <label for="lokasi">Lokasi</label>
            <input id="lokasi" name="lokasi" type="text" value="<?= e($value('lokasi')) ?>" required minlength="3" maxlength="140">
        </div>

        <div class="field">
            <label for="kredit_foto">Kredit</label>
            <input id="kredit_foto" name="kredit_foto" type="text" value="<?= e($value('kredit_foto', 'Ilustrasi: Bumi Bawah')) ?>" required minlength="3" maxlength="180">
        </div>

        <div class="field admin-form__wide">
            <label for="gambar">Gambar</label>
            <input id="gambar" name="gambar" type="file" accept="image/jpeg,image/png,image/webp" <?= $isNew ? 'required' : '' ?>>
            <p class="field__hint">JPG, PNG, atau WebP, maksimal 2 MB. Disimpan sebagai WebP, sisi terpanjang 1.800 px.</p>
            <?php if ($currentImage !== ''): ?>
                <div class="admin-image-preview">
                    <img src="<?= e(media_url($currentImage)) ?>" alt="Pratinjau gambar saat ini" width="320" height="240">
                    <span>Gambar saat ini</span>
                </div>
            <?php endif; ?>
        </div>
    </div>

    <div class="admin-form__actions">
        <button class="btn btn--ink" type="submit">Simpan pelat</button>
        <a class="admin-form__cancel" href="<?= e(url('/admin/galeri')) ?>">Batal</a>
    </div>
</form>

<?php if (!$isNew): ?>
    <form class="admin-danger" action="<?= e(url('/admin/galeri/' . (int) $item['id'] . '/hapus')) ?>" method="post" data-confirm="Hapus pelat ini? Tindakan tidak bisa dibatalkan.">
        <?= csrf_field() ?>
        <input type="hidden" name="_return" value="<?= e(current_path()) ?>">
        <div>
            <h2>Hapus pelat</h2>
            <p>Pelat dan berkas unggahannya akan dihapus permanen.</p>
        </div>
        <button class="btn btn--danger" type="submit">Hapus pelat</button>
    </form>
<?php endif; ?>
