<?php
/** @var array<string, mixed>|null $article */
/** @var array<int, array<string, mixed>> $layers */
/** @var array<string, string> $errors */
/** @var bool $isNew */
$value = static function (string $key, string $default = '') use ($article): string {
    return old($key, (string) ($article[$key] ?? $default));
};
$selectedLayer = old('layer_id', (string) ($article['layer_id'] ?? ''));
$currentImage = old('gambar_lama', (string) ($article['gambar'] ?? ''));
$formAction = $isNew ? url('/admin/artikel') : url('/admin/artikel/' . (int) $article['id']);
?>
<div class="admin-head">
    <div>
        <p class="admin-eyebrow">Artikel</p>
        <h1><?= $isNew ? 'Tulis artikel baru' : 'Ubah artikel' ?></h1>
        <p><?= $isNew ? 'Simpan sebagai draf dulu bila sumber belum lengkap.' : 'Perubahan langsung tampil setelah disimpan.' ?></p>
    </div>
    <div class="admin-head__actions">
        <a class="btn btn--outline" href="<?= e(url('/admin/artikel')) ?>">Kembali</a>
    </div>
</div>

<?php if ($errors !== []): ?>
    <div class="form-errors" role="alert" tabindex="-1" data-form-errors>
        <p><strong>Ada <?= count($errors) ?> hal yang perlu diperbaiki:</strong></p>
        <ul>
            <?php foreach ($errors as $key => $message): ?>
                <li><?= e($message) ?></li>
            <?php endforeach; ?>
        </ul>
    </div>
<?php endif; ?>

<form class="admin-form" action="<?= e($formAction) ?>" method="post" enctype="multipart/form-data" data-admin-form>
    <?= csrf_field() ?>
    <input type="hidden" name="_return" value="<?= e(current_path()) ?>">
    <input type="hidden" name="gambar_lama" value="<?= e($currentImage) ?>">

    <div class="admin-form__grid">
        <div class="field admin-form__wide">
            <label for="judul">Judul</label>
            <input id="judul" name="judul" type="text" value="<?= e($value('judul')) ?>" required minlength="5" maxlength="160" data-slug-source>
            <p class="field__hint">5–160 karakter. Judul jadi dasar slug bila slug dikosongkan.</p>
        </div>

        <div class="field">
            <label for="slug">Slug URL</label>
            <input id="slug" name="slug" type="text" value="<?= e($value('slug')) ?>" maxlength="180" pattern="[a-z0-9-]+" data-slug-target>
            <p class="field__hint">Huruf kecil, angka, dan tanda hubung. Contoh: air-yang-bergerak.</p>
        </div>

        <div class="field">
            <label for="layer_id">Lapisan</label>
            <select id="layer_id" name="layer_id">
                <option value="">Tanpa lapisan</option>
                <?php foreach ($layers as $layer): ?>
                    <option value="<?= (int) $layer['id'] ?>" <?= (string) $layer['id'] === (string) $selectedLayer ? 'selected' : '' ?>><?= e($layer['nama']) ?></option>
                <?php endforeach; ?>
            </select>
        </div>

        <div class="field admin-form__wide">
            <label for="ringkasan">Ringkasan</label>
            <textarea id="ringkasan" name="ringkasan" rows="3" required minlength="20" maxlength="300"><?= e($value('ringkasan')) ?></textarea>
            <p class="field__hint">Tampil di kartu artikel dan meta description. 20–300 karakter.</p>
        </div>

        <div class="field admin-form__wide">
            <label for="isi">Isi artikel (HTML sederhana)</label>
            <textarea id="isi" name="isi" rows="22" required data-editor><?= e($value('isi')) ?></textarea>
            <p class="field__hint">Tag yang diizinkan: <code>p</code>, <code>h2</code>, <code>h3</code>, <code>blockquote</code>, <code>ul</code>, <code>ol</code>, <code>li</code>, <code>strong</code>, <code>em</code>, <code>a</code>. Tag lain dibuang saat disimpan.</p>
        </div>

        <div class="field admin-form__wide">
            <label for="sumber">Sumber</label>
            <textarea id="sumber" name="sumber" rows="4" placeholder="USGS Water Science School — Water table|https://www.usgs.gov/..."><?= e($value('sumber')) ?></textarea>
            <p class="field__hint">Satu sumber per baris, format <code>Nama sumber|https://alamat</code>. Wajib untuk artikel terbit.</p>
        </div>

        <div class="field">
            <label for="penulis">Penulis</label>
            <input id="penulis" name="penulis" type="text" value="<?= e($value('penulis', 'Tim Bumi Bawah')) ?>" required maxlength="80">
        </div>

        <div class="field">
            <label for="status">Status</label>
            <select id="status" name="status">
                <option value="draft" <?= $value('status', 'draft') === 'draft' ? 'selected' : '' ?>>Draf</option>
                <option value="published" <?= $value('status', 'draft') === 'published' ? 'selected' : '' ?>>Terbit</option>
            </select>
        </div>

        <div class="field admin-form__wide">
            <label for="gambar">Sampul</label>
            <input id="gambar" name="gambar" type="file" accept="image/jpeg,image/png,image/webp">
            <p class="field__hint">JPG, PNG, atau WebP, maksimal 2 MB. Akan diubah ke WebP dan diperkecil otomatis.</p>
            <?php if ($currentImage !== ''): ?>
                <div class="admin-image-preview">
                    <img src="<?= e(media_url($currentImage)) ?>" alt="Pratinjau sampul saat ini" width="240" height="120">
                    <span>Sampul saat ini</span>
                </div>
            <?php endif; ?>
        </div>
    </div>

    <div class="admin-form__actions">
        <button class="btn btn--ink" type="submit">Simpan artikel</button>
        <a class="admin-form__cancel" href="<?= e(url('/admin/artikel')) ?>">Batal</a>
    </div>
</form>

<?php if (!$isNew): ?>
    <form class="admin-danger" action="<?= e(url('/admin/artikel/' . (int) $article['id'] . '/hapus')) ?>" method="post" data-confirm="Hapus artikel ini? Tindakan tidak bisa dibatalkan.">
        <?= csrf_field() ?>
        <input type="hidden" name="_return" value="<?= e(current_path()) ?>">
        <div>
            <h2>Hapus artikel</h2>
            <p>Artikel dan sampul unggahannya akan dihapus permanen.</p>
        </div>
        <button class="btn btn--danger" type="submit">Hapus artikel</button>
    </form>
<?php endif; ?>
