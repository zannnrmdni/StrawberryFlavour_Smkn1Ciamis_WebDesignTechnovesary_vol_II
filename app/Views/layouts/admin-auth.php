<?php
$pageTitle = $pageTitle ?? 'Masuk panel';
?>
<!doctype html>
<html lang="id" class="no-js">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= e($pageTitle) ?> — Bumi Bawah</title>
    <meta name="robots" content="noindex, nofollow">
    <meta name="theme-color" content="#16262B">
    <link rel="icon" href="<?= e(url('/assets/img/favicon.svg')) ?>" type="image/svg+xml">
    <link rel="stylesheet" href="<?= e(asset('css/app.css')) ?>">
    <script>document.documentElement.classList.remove('no-js');</script>
</head>
<body class="admin-login-body">
    <main class="admin-login" id="konten">
        <div class="admin-login__panel">
            <a class="admin-login__brand" href="<?= e(url('/')) ?>">Bumi Bawah</a>
            <?= $content ?>
        </div>
    </main>
</body>
</html>
