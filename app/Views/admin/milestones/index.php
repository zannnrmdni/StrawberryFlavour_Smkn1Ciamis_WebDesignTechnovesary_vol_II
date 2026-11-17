<?php
/** @var array<int, array<string, mixed>> $milestones */
?>
<div class="admin-head">
    <div>
        <p class="admin-eyebrow">Penanda</p>
        <h1>Daftar penanda</h1>
        <p>Penanda tampil di sepanjang perjalanan dan di bagian fakta beranda. Setiap baris punya sumber.</p>
    </div>
    <div class="admin-head__actions">
        <a class="btn btn--ink" href="<?= e(url('/admin/milestone/baru')) ?>">Tambah penanda</a>
    </div>
</div>

<div class="admin-panel">
    <div class="admin-table-wrap">
        <table class="admin-table admin-table--wide">
            <thead>
                <tr><th scope="col">Nama</th><th scope="col">Lapisan</th><th scope="col">Kedalaman</th><th scope="col">Jenis</th><th scope="col">Sumber</th><th scope="col"><span class="sr-only">Tindakan</span></th></tr>
            </thead>
            <tbody>
                <?php foreach ($milestones as $milestone): ?>
                    <tr>
                        <td>
                            <a class="admin-table__title" href="<?= e(url('/admin/milestone/' . $milestone['id'] . '/ubah')) ?>"><?= e($milestone['nama']) ?></a>
                        </td>
                        <td><?= e($milestone['layer_nama'] ?? '—') ?></td>
                        <td><?= e($milestone['depth_label']) ?></td>
                        <td><?= e($milestone['jenis']) ?></td>
                        <td><a href="<?= e($milestone['sumber_url']) ?>" target="_blank" rel="noopener noreferrer"><?= e(excerpt_text($milestone['sumber_nama'], 36)) ?></a></td>
                        <td class="admin-table__actions">
                            <a href="<?= e(url('/admin/milestone/' . $milestone['id'] . '/ubah')) ?>">Ubah</a>
                        </td>
                    </tr>
                <?php endforeach; ?>
                <?php if ($milestones === []): ?>
                    <tr><td colspan="6" class="admin-empty">Belum ada penanda.</td></tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>
