<?php
/** @var array<int, array<string, mixed>> $layers */
/** @var array<int, array{nama: string, url: string}> $sources */
/** @var array<int, array<string, string>> $licenses */
?>
<section class="about-hero" aria-labelledby="judul-tentang">
    <div class="about-hero__inner">
        <p class="page-head__eyebrow">Tentang proyek</p>
        <h1 id="judul-tentang">Bumi Bawah dibuat karena diagram tanah terlalu rapi.</h1>
        <p class="about-hero__lede">
            Di buku, lapisan bumi berupa kotak berwarna dengan label. Di lapangan, batasnya bercampur, angkanya bervariasi, dan banyak hal belum dipetakan. Situs ini mencoba menjaga rasa ingin tahu itu tetap hidup.
        </p>

        <dl class="about-stats">
            <div><dt>Lapisan</dt><dd><?= count($layers) ?></dd></div>
            <div><dt>Penanda bersumber</dt><dd><?= (int) $milestoneCount ?></dd></div>
            <div><dt>Artikel</dt><dd><?= (int) $articleCount ?></dd></div>
            <div><dt>Pelat galeri</dt><dd><?= (int) $galleryCount ?></dd></div>
        </dl>
    </div>
</section>

<section class="about-section" aria-labelledby="judul-tujuan">
    <div class="about-section__inner about-section__inner--split">
        <div>
            <p class="section-head__eyebrow">Tujuan</p>
            <h2 id="judul-tujuan">Menjelaskan tanpa menyederhanakan terlalu banyak.</h2>
        </div>
        <div class="about-prose">
            <p>Bumi Bawah adalah turunan vertikal dari serasah sampai batas kerak dan mantel. Setiap lapisan punya warna, suhu, dan penghuninya sendiri. Setiap penanda punya kedalaman yang bisa dilacak ke sumber aslinya.</p>
            <p>Situs ini untuk pelajar, guru, dan siapa pun yang pernah bertanya apa yang ada di bawah kaki. Bahasa Indonesianya sengaja hangat dan konkret: angka boleh rumit, tetapi kalimatnya tidak perlu berbelit.</p>
            <p>Kami tidak mengklaim semua angka pasti. Kerak bumi tidak rata, pengukuran berbeda antar tempat, dan rekor bisa berubah. Kalau sumber tidak sepakat, kami menulis rentang dan menandainya di komentar data. Kalau sebuah angka hanya titik ilustrasi, halaman penanda tetap menyebut sumbernya.</p>
        </div>
    </div>
</section>

<section class="about-section about-section--paper" aria-labelledby="judul-cara">
    <div class="about-section__inner">
        <p class="section-head__eyebrow">Cara membaca</p>
        <h2 id="judul-cara">Tiga hal yang perlu diingat.</h2>

        <ol class="about-notes">
            <li>
                <h3>Skala gulir bukan skala asli.</h3>
                <p>Lapisan setipis 10 cm mendapat ruang gulir lebih banyak daripada kerak yang tebalnya puluhan kilometer. Ini pilihan baca, bukan klaim geologis. Angka kedalaman di kartu tetap memakai meter dan kilometer sebenarnya.</p>
            </li>
            <li>
                <h3>Batas lapisan tidak selalu garis.</h3>
                <p>Tanah atas bercampur dengan tanah bawah lewat akar, liang hewan, dan air. Warna pada situs ini adalah alat orientasi, bukan peta udara yang presisi.</p>
            </li>
            <li>
                <h3>Sumber bisa berbeda.</h3>
                <p>Kedalaman gua, panjang akar, dan suhu batuan diukur dengan cara yang tidak selalu sama. Kami mencantumkan nama lembaga dan tautan, supaya kamu bisa memeriksa sendiri.</p>
            </li>
        </ol>
    </div>
</section>

<section class="about-section" aria-labelledby="judul-pembuat">
    <div class="about-section__inner about-section__inner--split">
        <div class="maker-card">
            <div class="maker-card__mark" aria-hidden="true">
                <svg viewBox="0 0 120 120">
                    <rect width="120" height="120" fill="#BFE4F5"/>
                    <rect x="0" y="44" width="120" height="20" fill="#86C254"/>
                    <rect x="0" y="64" width="120" height="22" fill="#7B4B2A"/>
                    <rect x="0" y="86" width="120" height="22" fill="#F3C64F"/>
                    <path d="M0 44h120M0 64h120M0 86h120" stroke="#16262B" stroke-width="3"/>
                    <circle cx="86" cy="28" r="12" fill="#F26A55" stroke="#16262B" stroke-width="3"/>
                </svg>
            </div>
            <p class="maker-card__label">Pembuat</p>
            <h2>Tim Bumi Bawah</h2>
            <p>Proyek independen di Yogyakarta. Penulisan, ilustrasi, dan kode dikerjakan sendiri. Tidak ada templat berbayar, tema premium, atau foto stok yang dipakai tanpa izin.</p>
            <p><a class="link-underline" href="<?= e(url('/kontak')) ?>">Kirim koreksi atau usulan</a></p>
        </div>

        <div class="about-prose">
            <p class="section-head__eyebrow">Cara kerja</p>
            <h2>Kecil, tetapi diperiksa.</h2>
            <p>Setiap penanda disimpan di basis data, bukan ditulis langsung di HTML. Nama sumber dan URL wajib ada. Ilustrasi penanda, pelat galeri, dan sampul artikel dibuat sebagai SVG lalu diekspor ke WebP agar ringan.</p>
            <p>Paletnya tetap: kertas, tinta, langit, daun, humus, pasir, lempung, batu, kerak, dan mantel. Font hanya dua: Gabarito untuk judul dan Literata untuk isi. Keduanya disimpan sendiri, bukan diambil dari CDN.</p>
            <p>Kalau menemukan angka yang salah, tulis halaman dan sumber pembandingnya. Koreksi yang jelas lebih berguna daripada pesan “sepertinya keliru”.</p>
        </div>
    </div>
</section>

<section class="about-section about-section--references" id="referensi" aria-labelledby="judul-referensi">
    <div class="about-section__inner">
        <p class="section-head__eyebrow">Sumber referensi</p>
        <h2 id="judul-referensi">Bahan bacaan yang dipakai.</h2>
        <p class="about-section__lede">Daftar ini menggabungkan sumber penanda dan sumber artikel. Setiap baris di halaman penanda tetap menunjuk ke sumbernya masing-masing.</p>

        <ol class="reference-list">
            <?php foreach ($sources as $source): ?>
                <li>
                    <a href="<?= e($source['url']) ?>" target="_blank" rel="noopener noreferrer"><?= e($source['nama']) ?></a>
                </li>
            <?php endforeach; ?>
        </ol>
    </div>
</section>

<section class="about-section about-section--licenses" id="lisensi" aria-labelledby="judul-lisensi">
    <div class="about-section__inner">
        <p class="section-head__eyebrow">Lisensi aset</p>
        <h2 id="judul-lisensi">Apa yang boleh dipakai ulang.</h2>
        <p class="about-section__lede">Semua aset di situs ini gratis atau dibuat sendiri. Tabel berikut menyebut pemilik, lisensi, dan catatan pemakaian.</p>

        <div class="license-table" role="table" aria-label="Lisensi aset">
            <div class="license-table__row license-table__head" role="row">
                <span role="columnheader">Aset</span>
                <span role="columnheader">Pemilik</span>
                <span role="columnheader">Lisensi</span>
                <span role="columnheader">Catatan</span>
            </div>
            <?php foreach ($licenses as $license): ?>
                <div class="license-table__row" role="row">
                    <span role="cell"><a href="<?= e($license['url']) ?>" target="_blank" rel="noopener noreferrer"><?= e($license['nama']) ?></a></span>
                    <span role="cell"><?= e($license['pemilik']) ?></span>
                    <span role="cell"><?= e($license['lisensi']) ?></span>
                    <span role="cell"><?= e($license['catatan']) ?></span>
                </div>
            <?php endforeach; ?>
        </div>

        <p class="about-section__note">Font Gabarito dan Literata mengikuti SIL Open Font License. Three.js dan Tailwind CSS memakai lisensi MIT. GSAP dipakai di bawah lisensi standar gratis; tidak ada plugin Club GSAP. Tekstur Bumi berasal dari NASA Visible Earth dan berada di domain publik.</p>
    </div>
</section>

<section class="closing-cta" aria-labelledby="judul-penutup">
    <div class="closing-cta__inner">
        <p class="closing-cta__eyebrow">Mulai dari atas</p>
        <h2 id="judul-penutup">Sepuluh sentimeter pertama sudah cukup untuk membuat penasaran.</h2>
        <div class="closing-cta__actions">
            <a class="btn btn--ink" href="<?= e(url('/#lapisan-1')) ?>">Mulai turun</a>
            <a class="btn btn--outline" href="<?= e(url('/artikel')) ?>">Baca artikel</a>
        </div>
    </div>
</section>
