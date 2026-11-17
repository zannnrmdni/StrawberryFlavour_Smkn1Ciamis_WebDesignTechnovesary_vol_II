<?php
/** @var array<int, array<string, mixed>> $articles */
/** @var array<int, array<string, mixed>> $messages */
?>
<div class="admin-head">
    <div>
        <p class="admin-eyebrow">Ringkasan</p>
        <h1>Isi situs, sekilas.</h1>
        <p>Semua perubahan langsung tampil di halaman publik. Artikel berstatus draf tidak muncul di daftar.</p>
    </div>
    <div class="admin-head__actions">
        <a class="btn btn--ink" href="<?= e(url('/admin/artikel/baru')) ?>">Tulis artikel</a>
        <a class="btn btn--outline" href="<?= e(url('/admin/galeri/baru')) ?>">Tambah pelat</a>
    </div>
</div>

<div class="admin-stats">
    <div class="admin-stat" style="--stat: #86C254;">
        <p class="admin-stat__label">Artikel terbit</p>
        <p class="admin-stat__value"><?= (int) $published ?></p>
        <p class="admin-stat__note"><?= (int) $drafts ?> draf menunggu</p>
    </div>
    <div class="admin-stat" style="--stat: #F3C64F;">
        <p class="admin-stat__label">Pelat galeri</p>
        <p class="admin-stat__value"><?= (int) $galleryCount ?></p>
        <p class="admin-stat__note">Dengan kredit dan lokasi</p>
    </div>
    <div class="admin-stat" style="--stat: #DE7A45;">
        <p class="admin-stat__label">Penanda</p>
        <p class="admin-stat__value"><?= (int) $milestones ?></p>
        <p class="admin-stat__note">Tersebar di 6 lapisan</p>
    </div>
    <div class="admin-stat" style="--stat: #BFE4F5;">
        <p class="admin-stat__label">Pesan</p>
        <p class="admin-stat__value"><?= (int) $messageCount ?></p>
        <p class="admin-stat__note"><?= (int) $unreadMessages ?> belum dibaca</p>
    </div>
</div>

<div class="admin-columns">
    <section class="admin-panel" aria-labelledby="judul-artikel-panel">
        <div class="admin-panel__head">
            <h2 id="judul-artikel-panel">Artikel terakhir</h2>
            <a href="<?= e(url('/admin/artikel')) ?>">Kelola semua</a>
        </div>
        <div class="admin-table-wrap">
            <table class="admin-table">
                <thead>
                    <tr><th scope="col">Judul</th><th scope="col">Status</th><th scope="col">Tanggal</th></tr>
                </thead>
                <tbody>
                    <?php foreach (array_slice($articles, 0, 6) as $article): ?>
                        <tr>
                            <td><a href="<?= e(url('/admin/artikel/' . $article['id'] . '/ubah')) ?>"><?= e($article['judul']) ?></a></td>
                            <td><span class="status status--<?= e($article['status']) ?>"><?= $article['status'] === 'published' ? 'Terbit' : 'Draf' ?></span></td>
                            <td><?= e($article['tanggal']) ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </section>

    <section class="admin-panel" aria-labelledby="judul-pesan-panel">
        <div class="admin-panel__head">
            <h2 id="judul-pesan-panel">Pesan terakhir</h2>
            <a href="<?= e(url('/admin/pesan')) ?>">Semua pesan</a>
        </div>
        <?php if ($messages === []): ?>
            <p class="admin-empty">Belum ada pesan masuk.</p>
        <?php else: ?>
            <ul class="admin-message-list">
                <?php foreach ($messages as $message): ?>
                    <li class="<?= $message['dibaca'] ? '' : 'is-unread' ?>">
                        <p class="admin-message-list__title"><?= e($message['subjek']) ?></p>
                        <p class="admin-message-list__meta"><?= e($message['nama']) ?> · <?= e($message['tanggal']) ?></p>
                        <a href="<?= e(url('/admin/pesan')) ?>#pesan-<?= (int) $message['id'] ?>">Buka pesan</a>
                    </li>
                <?php endforeach; ?>
            </ul>
        <?php endif; ?>
    </section>
</div>
