<?php
$title = 'Sesi kedaluwarsa';
$description = 'Token keamanan formulir sudah tidak berlaku. Muat ulang halaman lalu kirim lagi.';
?>
<!doctype html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= e($title) ?> — <?= e(config('app.name')) ?></title>
    <meta name="description" content="<?= e($description) ?>">
    <meta name="robots" content="noindex, nofollow">
    <meta name="theme-color" content="#16262B">
    <link rel="icon" href="<?= e(url('/assets/img/favicon.svg')) ?>" type="image/svg+xml">
    <link rel="stylesheet" href="<?= e(asset('css/app.css')) ?>">
</head>
<body>
    <main class="error-page error-page--expired" id="konten">
        <div class="error-page__inner">
            <a class="admin-login__brand" href="<?= e(url('/')) ?>">Bumi Bawah</a>
            <p class="error-page__code" aria-hidden="true">419</p>
            <h1 class="error-page__title">Formulir ini sudah terlalu lama terbuka.</h1>
            <p class="error-page__lede">
                Token keamanannya kedaluwarsa, jadi kami menolak mengirim data yang mungkin sudah tidak cocok dengan sesi ini. Tidak ada yang hilang. Muat ulang halaman, isi lagi, lalu kirim. Untuk pesan panjang, simpan dulu teksnya di catatan.
            </p>
            <div class="error-page__actions">
                <a class="btn btn--ink" href="<?= e(url('/kontak#formulir')) ?>">Kembali ke formulir kontak</a>
                <a class="link-underline" href="<?= e(url('/')) ?>">Ke beranda</a>
            </div>
        </div>
        <div class="error-page__strata" aria-hidden="true">
            <span></span><span></span><span></span><span></span>
        </div>
    </main>
</body>
</html>
