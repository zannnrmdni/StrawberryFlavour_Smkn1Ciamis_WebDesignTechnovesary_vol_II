<?php
/** @var array<string, mixed>|null $milestone */
/** @var array<int, array<string, mixed>> $layers */
/** @var array<int, string> $kinds */
/** @var array<string, string> $errors */
/** @var bool $isNew */
$value = static function (string $key, string $default = '') use ($milestone): string {
    return old($key, (string) ($milestone[$key] ?? $default));
};
$selectedLayer = old('layer_id', (string) ($milestone['layer_id'] ?? ''));
$selectedKind = old('jenis', (string) ($milestone['jenis'] ?? 'fenomena alam'));
$currentIllustration = old('ilustrasi_lama', (string) ($milestone['ilustrasi_svg'] ?? ''));
$preview = $currentIllustration !== ''
    ? (str_starts_with($currentIllustration, 'uploads/') ? media_url($currentIllustration) : media_url('milestones/' . $currentIllustration))
    : '';
$formAction = $isNew ? url('/admin/milestone') : url('/admin/milestone/' . (int) $milestone['id']);
?>
<div class="admin-head">
    <div>
        <p class="admin-eyebrow">Penanda</p>
        <h1><?= $isNew ? 'Tambah penanda baru' : 'Ubah penanda' ?></h1>
        <p>Kedalaman dalam meter. Tulis rentang di keterangan bila angka tidak pasti.</p>
    </div>
    <div class="admin-head__actions">
        <a class="btn btn--outline" href="<?= e(url('/admin/milestone')) ?>">Kembali</a>
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
    <input type="hidden" name="ilustrasi_lama" value="<?= e($currentIllustration) ?>">

    <div class="admin-form__grid">
        <div class="field">
            <label for="nama">Nama penanda</label>
            <input id="nama" name="nama" type="text" value="<?= e($value('nama')) ?>" required minlength="3" maxlength="100">
        </div>

        <div class="field">
            <label for="layer_id">Lapisan</label>
            <select id="layer_id" name="layer_id" required>
                <?php foreach ($layers as $layer): ?>
                    <option value="<?= (int) $layer['id'] ?>" <?= (string) $layer['id'] === (string) $selectedLayer ? 'selected' : '' ?>><?= e($layer['nama']) ?></option>
                <?php endforeach; ?>
            </select>
        </div>

        <div class="field">
            <label for="jenis">Jenis</label>
            <select id="jenis" name="jenis" required>
                <?php foreach ($kinds as $kind): ?>
                    <option value="<?= e($kind) ?>" <?= $kind === $selectedKind ? 'selected' : '' ?>><?= e(ucfirst($kind)) ?></option>
                <?php endforeach; ?>
            </select>
        </div>

        <div class="field">
            <label for="kedalaman_m">Kedalaman (meter)</label>
            <input id="kedalaman_m" name="kedalaman_m" type="number" value="<?= e($value('kedalaman_m')) ?>" required min="0" max="35000000" step="0.001">
            <p class="field__hint">Contoh: 0,03 untuk 3 cm; 12262 untuk Kola.</p>
        </div>

        <div class="field admin-form__wide">
            <label for="keterangan">Keterangan</label>
            <textarea id="keterangan" name="keterangan" rows="3" required minlength="10" maxlength="255"><?= e($value('keterangan')) ?></textarea>
        </div>

        <div class="field">
            <label for="sumber_nama">Nama sumber</label>
            <input id="sumber_nama" name="sumber_nama" type="text" value="<?= e($value('sumber_nama')) ?>" required minlength="3" maxlength="150">
        </div>

        <div class="field">
            <label for="sumber_url">URL sumber</label>
            <input id="sumber_url" name="sumber_url" type="url" value="<?= e($value('sumber_url')) ?>" required maxlength="255" placeholder="https://">
        </div>

        <div class="field admin-form__wide">
            <label for="ilustrasi">Ilustrasi</label>
            <input id="ilustrasi" name="ilustrasi" type="file" accept="image/jpeg,image/png,image/webp" <?= $isNew ? 'required' : '' ?>>
            <p class="field__hint">JPG, PNG, atau WebP, maksimal 2 MB. Latar transparan disarankan. Disimpan sebagai WebP.</p>
            <?php if ($preview !== ''): ?>
                <div class="admin-image-preview admin-image-preview--square">
                    <img src="<?= e($preview) ?>" alt="Pratinjau ilustrasi saat ini" width="120" height="120">
                    <span>Ilustrasi saat ini</span>
                </div>
            <?php endif; ?>
        </div>
    </div>

    <div class="admin-form__actions">
        <button class="btn btn--ink" type="submit">Simpan penanda</button>
        <a class="admin-form__cancel" href="<?= e(url('/admin/milestone')) ?>">Batal</a>
    </div>
</form>

<?php if (!$isNew): ?>
    <form class="admin-danger" action="<?= e(url('/admin/milestone/' . (int) $milestone['id'] . '/hapus')) ?>" method="post" data-confirm="Hapus penanda ini? Tindakan tidak bisa dibatalkan.">
        <?= csrf_field() ?>
        <input type="hidden" name="_return" value="<?= e(current_path()) ?>">
        <div>
            <h2>Hapus penanda</h2>
            <p>Penanda hilang dari perjalanan dan bagian fakta. Ilustrasi unggahan ikut dihapus.</p>
        </div>
        <button class="btn btn--danger" type="submit">Hapus penanda</button>
    </form>
<?php endif; ?>
