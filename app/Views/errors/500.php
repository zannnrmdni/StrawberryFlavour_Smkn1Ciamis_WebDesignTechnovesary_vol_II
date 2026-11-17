<?php
$title = 'Ada yang tersangkut di bawah';
?>
<!doctype html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?> — Bumi Bawah</title>
    <meta name="robots" content="noindex">
    <link rel="stylesheet" href="<?= htmlspecialchars(base_path() . '/assets/css/app.css', ENT_QUOTES, 'UTF-8') ?>">
</head>
<body class="min-h-screen bg-kertas text-tinta">
    <main class="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-24">
        <p class="mb-4 font-display text-sm font-semibold text-kerak">500</p>
        <h1 class="max-w-xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl">
            Ada yang tersangkut di bawah.
        </h1>
        <p class="mt-6 max-w-prose text-lg leading-relaxed text-tinta/80">
            Halaman ini gagal dimuat karena masalah di server. Coba muat ulang beberapa saat lagi. Kalau tetap sama, catat waktu kejadiannya agar mudah ditelusuri.
        </p>
        <div class="mt-10">
            <a class="btn btn--ink" href="<?= htmlspecialchars(base_path() ?: '/', ENT_QUOTES, 'UTF-8') ?>">Kembali ke beranda</a>
        </div>
        <?php if (!empty($debugMessage)): ?>
            <pre class="mt-10 overflow-auto border-t-2 border-tinta/20 pt-4 text-xs text-tinta/60"><?= htmlspecialchars($debugMessage, ENT_QUOTES, 'UTF-8') ?></pre>
        <?php endif; ?>
    </main>
</body>
</html>
