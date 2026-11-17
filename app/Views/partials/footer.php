<footer class="site-footer">
    <div class="site-footer__inner">
        <div class="site-footer__brand">
            <p class="font-display text-2xl font-extrabold tracking-tight text-kertas">Bumi Bawah</p>
            <p class="mt-2 max-w-sm text-sm leading-relaxed text-kertas/70">
                Edukasi setiap lapisan kerak bumi. Dibuat untuk pelajar, guru, dan siapa pun yang pernah bertanya apa yang ada di bawah kaki.
            </p>
        </div>

        <nav aria-label="Navigasi footer" class="site-footer__nav">
            <p class="site-footer__title">Jelajahi</p>
            <ul>
                <li><a href="<?= e(url('/')) ?>">Beranda</a></li>
                <li><a href="<?= e(url('/artikel')) ?>">Artikel</a></li>
                <li><a href="<?= e(url('/galeri')) ?>">Galeri</a></li>
                <li><a href="<?= e(url('/tentang')) ?>">Tentang</a></li>
                <li><a href="<?= e(url('/kontak')) ?>">Kontak</a></li>
            </ul>
        </nav>

        <div class="site-footer__credits">
            <p class="site-footer__title">Catatan</p>
            <p>Angka kedalaman dan suhu mengikuti sumber yang dicantumkan di setiap penanda. Bila sumber berbeda, kami memakai rentang, bukan tebakan.</p>
            <p class="mt-3">Bumi: NASA Visible Earth / Blue Marble. Ilustrasi penanda, galeri, dan sampul dibuat sendiri oleh Tim Bumi Bawah.</p>
            <p class="mt-2"><a class="site-footer__link" href="<?= e(url('/tentang#lisensi')) ?>">Daftar sumber dan lisensi</a></p>
        </div>
    </div>

    <div class="site-footer__bottom">
        <p>© <?= date('Y') ?> Bumi Bawah. Dibuat sendiri, bukan dari templat.</p>
        <p>PHP 8, Tailwind CSS, Three.js, GSAP.</p>
    </div>
</footer>
