<?php
/** @var array<int, array<string, mixed>> $articles */
?>
<div class="admin-head">
    <div>
        <p class="admin-eyebrow">Artikel</p>
        <h1>Daftar artikel</h1>
        <p>Artikel draf tidak tampil di situs. Sumber wajib diisi sebelum terbit.</p>
    </div>
    <div class="admin-head__actions">
        <a class="btn btn--ink" href="<?= e(url('/admin/artikel/baru')) ?>">Tulis artikel</a>
    </div>
</div>

<div class="admin-panel">
    <div class="admin-table-wrap">
        <table class="admin-table admin-table--wide">
            <thead>
                <tr>
                    <th scope="col">Judul</th>
                    <th scope="col">Lapisan</th>
                    <th scope="col">Status</th>
                    <th scope="col">Tanggal</th>
                    <th scope="col"><span class="sr-only">Tindakan</span></th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($articles as $article): ?>
                    <tr>
                        <td>
                            <a class="admin-table__title" href="<?= e(url('/admin/artikel/' . $article['id'] . '/ubah')) ?>"><?= e($article['judul']) ?></a>
                            <span class="admin-table__slug">/artikel/<?= e($article['slug']) ?></span>
                        </td>
                        <td><?= e($article['layer_nama'] ?? '—') ?></td>
                        <td><span class="status status--<?= e($article['status']) ?>"><?= $article['status'] === 'published' ? 'Terbit' : 'Draf' ?></span></td>
                        <td><?= e($article['tanggal']) ?></td>
                        <td class="admin-table__actions">
                            <a href="<?= e(url('/artikel/' . $article['slug'])) ?>" target="_blank" rel="noopener">Lihat</a>
                            <a href="<?= e(url('/admin/artikel/' . $article['id'] . '/ubah')) ?>">Ubah</a>
                        </td>
                    </tr>
                <?php endforeach; ?>
                <?php if ($articles === []): ?>
                    <tr><td colspan="5" class="admin-empty">Belum ada artikel.</td></tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>
