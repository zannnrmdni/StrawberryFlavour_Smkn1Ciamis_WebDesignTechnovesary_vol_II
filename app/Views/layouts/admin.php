<?php
$adminName = $adminName ?? 'admin';
$unreadMessages = $unreadMessages ?? 0;
$pageTitle = $pageTitle ?? 'Panel';
$nav = [
    ['label' => 'Ringkasan', 'href' => '/admin', 'match' => '/admin'],
    ['label' => 'Artikel', 'href' => '/admin/artikel', 'match' => '/admin/artikel'],
    ['label' => 'Galeri', 'href' => '/admin/galeri', 'match' => '/admin/galeri'],
    ['label' => 'Penanda', 'href' => '/admin/milestone', 'match' => '/admin/milestone'],
    ['label' => 'Pesan', 'href' => '/admin/pesan', 'match' => '/admin/pesan', 'badge' => (int) $unreadMessages],
];
?>
<!doctype html>
<html lang="id" class="no-js">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= e($pageTitle) ?> — Panel Bumi Bawah</title>
    <meta name="robots" content="noindex, nofollow">
    <meta name="theme-color" content="#16262B">
    <link rel="icon" href="<?= e(url('/assets/img/favicon.svg')) ?>" type="image/svg+xml">
    <link rel="stylesheet" href="<?= e(asset('css/app.css')) ?>">
    <script>document.documentElement.classList.remove('no-js');</script>
</head>
<body class="admin-body">
    <a class="skip-link" href="#konten">Lewati ke isi panel</a>

    <div class="admin-shell">
        <aside class="admin-sidebar">
            <a class="admin-brand" href="<?= e(url('/admin')) ?>">
                <span class="admin-brand__mark" aria-hidden="true"></span>
                <span>Bumi Bawah<br><small>Panel</small></span>
            </a>

            <nav class="admin-nav" aria-label="Navigasi panel">
                <ul>
                    <?php foreach ($nav as $item): ?>
                        <?php $active = current_path() === $item['match'] || str_starts_with(current_path(), rtrim($item['match'], '/') . '/'); ?>
                        <li>
                            <a href="<?= e(url($item['href'])) ?>" <?= $active ? 'aria-current="page"' : '' ?>>
                                <span><?= e($item['label']) ?></span>
                                <?php if (!empty($item['badge'])): ?>
                                    <span class="admin-nav__badge"><?= (int) $item['badge'] ?></span>
                                <?php endif; ?>
                            </a>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </nav>

            <div class="admin-sidebar__foot">
                <a class="admin-view-site" href="<?= e(url('/')) ?>" target="_blank" rel="noopener">Lihat situs</a>
                <p class="admin-user">Masuk sebagai <strong><?= e($adminName) ?></strong></p>
                <form action="<?= e(url('/admin/logout')) ?>" method="post">
                    <?= csrf_field() ?>
                    <button class="admin-logout" type="submit">Keluar</button>
                </form>
            </div>
        </aside>

        <div class="admin-main">
            <header class="admin-topbar">
                <p>Panel pengelolaan</p>
                <a href="<?= e(url('/')) ?>">Buka situs</a>
            </header>

            <?php $success = flash('admin_success'); ?>
            <?php $error = flash('admin_error'); ?>
            <?php if ($success): ?>
                <div class="notice notice--success admin-notice" role="status"><?= e($success) ?></div>
            <?php endif; ?>
            <?php if ($error): ?>
                <div class="notice notice--error admin-notice" role="alert"><?= e($error) ?></div>
            <?php endif; ?>

            <main id="konten" class="admin-content">
                <?= $content ?>
            </main>
        </div>
    </div>

    <script src="<?= e(asset('js/admin.min.js')) ?>" defer></script>
</body>
</html>
