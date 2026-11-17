<?php
/** @var string $error */
/** @var string $username */
?>
<div class="admin-login__inner">
    <p class="admin-login__eyebrow">Panel pengelolaan</p>
    <h1>Masuk untuk mengubah isi.</h1>
    <p class="admin-login__lede">Halaman ini tidak ditautkan dari situs publik. Gunakan akun admin dari seed, lalu ganti sandinya sebelum publikasi.</p>

    <?php if ($error !== ''): ?>
        <div class="notice notice--error" role="alert"><?= e($error) ?></div>
    <?php endif; ?>

    <form class="admin-login__form" action="<?= e(url('/admin/login')) ?>" method="post">
        <?= csrf_field() ?>
        <div class="field">
            <label for="admin-username">Nama pengguna</label>
            <input id="admin-username" name="username" type="text" value="<?= e($username) ?>" required maxlength="60" autocomplete="username" autofocus>
        </div>
        <div class="field">
            <label for="admin-password">Sandi</label>
            <input id="admin-password" name="password" type="password" required autocomplete="current-password">
        </div>
        <button class="btn btn--ink" type="submit">Masuk</button>
    </form>

    <p class="admin-login__back"><a class="link-underline" href="<?= e(url('/')) ?>">Kembali ke situs</a></p>
</div>
