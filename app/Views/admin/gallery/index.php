<?php
/** @var array<int, array<string, mixed>> $items */
?>
<div class="admin-head">
    <div>
        <p class="admin-eyebrow">Galeri</p>
        <h1>Daftar pelat</h1>
        <p>Setiap pelat wajib punya lokasi dan kredit. Unggahan baru disimpan sebagai WebP.</p>
    </div>
    <div class="admin-head__actions">
        <a class="btn btn--ink" href="<?= e(url('/admin/galeri/baru')) ?>">Tambah pelat</a>
    </div>
</div>

<div class="admin-gallery-grid">
    <?php foreach ($items as $item): ?>
        <article class="admin-gallery-card">
            <img src="<?= e($item['gambar_webp'] ?: $item['gambar_url']) ?>" alt="" width="320" height="240" loading="lazy">
            <div class="admin-gallery-card__body">
                <p class="admin-gallery-card__meta"><?= e($item['kategori']) ?> · <?= e($item['tanggal']) ?></p>
                <h2><?= e($item['judul']) ?></h2>
                <p><?= e($item['lokasi']) ?></p>
                <p class="admin-gallery-card__credit"><?= e($item['kredit_foto']) ?></p>
                <div class="admin-gallery-card__actions">
                    <a href="<?= e(url('/admin/galeri/' . $item['id'] . '/ubah')) ?>">Ubah</a>
                    <a href="<?= e(url('/galeri')) ?>" target="_blank" rel="noopener">Lihat</a>
                </div>
            </div>
        </article>
    <?php endforeach; ?>
    <?php if ($items === []): ?>
        <p class="admin-empty">Belum ada pelat galeri.</p>
    <?php endif; ?>
</div>
