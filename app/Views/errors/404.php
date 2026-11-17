<?php
$title = 'Halaman tidak ditemukan';
$description = 'Alamat ini tidak cocok dengan halaman mana pun di Bumi Bawah.';
?>
<!doctype html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= e($title) ?> — <?= e(config('app.name')) ?></title>
    <meta name="description" content="<?= e($description) ?>">
    <meta name="robots" content="noindex, follow">
    <meta name="theme-color" content="#16262B">
    <link rel="icon" href="<?= e(url('/assets/img/favicon.svg')) ?>" type="image/svg+xml">
    <link rel="stylesheet" href="<?= e(asset('css/app.css')) ?>">
</head>
<body>
    <main class="error-page" id="konten">
        <div class="error-page__inner">
            <a class="admin-login__brand" href="<?= e(url('/')) ?>">Bumi Bawah</a>
            <p class="error-page__code" aria-hidden="true">404</p>
            <h1 class="error-page__title">Halaman ini tidak ada di lapisan mana pun.</h1>
            <p class="error-page__lede">
                Mungkin alamatnya salah ketik, atau halamannya sudah dipindahkan. Tidak perlu menggali dengan tangan; ada jalur yang lebih rapi. Kalau kamu sampai di sini dari tautan di situs ini, kabari kami lewat kontak supaya tautannya diperbaiki.
            </p>
            <div class="error-page__actions">
                <a class="btn btn--ink" href="<?= e(url('/')) ?>">Kembali ke permukaan</a>
                <a class="link-underline" href="<?= e(url('/artikel')) ?>">Cari di artikel</a>
                <a class="link-underline" href="<?= e(url('/kontak')) ?>">Laporkan tautan rusak</a>
            </div>
        </div>
        <div class="error-page__strata" aria-hidden="true">
            <span></span><span></span><span></span><span></span>
        </div>
    </main>
</body>
</html>
