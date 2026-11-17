<?php
/** @var array<int, array<string, mixed>> $items */
$returnTo = '/admin/pesan' . ((int) $page > 1 ? '?halaman=' . (int) $page : '');
?>
<div class="admin-head">
    <div>
        <p class="admin-eyebrow">Pesan</p>
        <h1>Pesan masuk</h1>
        <p><?= (int) $total ?> pesan tersimpan. Tandai sudah dibaca setelah ditindaklanjuti.</p>
    </div>
</div>

<div class="admin-messages">
    <?php foreach ($items as $message): ?>
        <article class="admin-message<?= $message['dibaca'] ? '' : ' is-unread' ?>" id="pesan-<?= (int) $message['id'] ?>">
            <div class="admin-message__head">
                <div>
                    <p class="admin-message__meta">
                        <span class="status <?= $message['dibaca'] ? 'status--published' : 'status--unread' ?>"><?= $message['dibaca'] ? 'Dibaca' : 'Baru' ?></span>
                        <time datetime="<?= e(datetime_iso($message['created_at'])) ?>"><?= e($message['tanggal']) ?></time>
                    </p>
                    <h2><?= e($message['subjek']) ?></h2>
                    <p class="admin-message__from">
                        <?= e($message['nama']) ?> ·
                        <a href="mailto:<?= e($message['email']) ?>"><?= e($message['email']) ?></a>
                    </p>
                </div>
                <div class="admin-message__actions">
                    <form action="<?= e(url('/admin/pesan/' . (int) $message['id'] . '/baca')) ?>" method="post">
                        <?= csrf_field() ?>
                        <input type="hidden" name="_return" value="<?= e($returnTo) ?>">
                        <button class="admin-linkbutton" type="submit"><?= $message['dibaca'] ? 'Tandai belum dibaca' : 'Tandai sudah dibaca' ?></button>
                    </form>
                    <form action="<?= e(url('/admin/pesan/' . (int) $message['id'] . '/hapus')) ?>" method="post" data-confirm="Hapus pesan dari <?= e($message['nama']) ?>? Tindakan tidak bisa dibatalkan.">
                        <?= csrf_field() ?>
                        <input type="hidden" name="_return" value="<?= e($returnTo) ?>">
                        <button class="admin-linkbutton admin-linkbutton--danger" type="submit">Hapus</button>
                    </form>
                </div>
            </div>
            <div class="admin-message__body">
                <?= nl2br(e($message['pesan'])) ?>
            </div>
        </article>
    <?php endforeach; ?>

    <?php if ($items === []): ?>
        <p class="admin-empty">Belum ada pesan. Formulir kontak akan mengisi daftar ini.</p>
    <?php endif; ?>
</div>

<?php if ((int) $pages > 1): ?>
    <nav class="pagination" aria-label="Halaman pesan">
        <?php if ((int) $page > 1): ?>
            <a class="pagination__step" href="<?= e(query_url('/admin/pesan', ['halaman' => (int) $page - 1])) ?>">Sebelumnya</a>
        <?php endif; ?>
        <p>Halaman <?= (int) $page ?> dari <?= (int) $pages ?></p>
        <?php if ((int) $page < (int) $pages): ?>
            <a class="pagination__step" href="<?= e(query_url('/admin/pesan', ['halaman' => (int) $page + 1])) ?>">Berikutnya</a>
        <?php endif; ?>
    </nav>
<?php endif; ?>
