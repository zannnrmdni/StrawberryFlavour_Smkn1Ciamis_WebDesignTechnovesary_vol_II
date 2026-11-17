<?php
/** @var array<int, array<string, mixed>> $layers */
$firstLayer = $layers[0] ?? null;
?>
<noscript>
    <style>
        .orbit { height: 100vh !important; }
        .orbit__canvas, .orbit__arrival { display: none !important; }
        .orbit__static { display: block !important; }
        .orbit__copy { opacity: 1 !important; transform: none !important; }
        .gauge { display: none !important; }
        .layer__milestones { position: static !important; height: auto !important; }
        .milestone { position: relative !important; top: auto !important; transform: none !important; opacity: 1 !important; margin: 2rem 0 !important; }
    </style>
</noscript>

<section class="orbit" id="permukaan" data-orbit aria-labelledby="judul-utama">
    <div class="orbit__stage">
        <div class="orbit__space" aria-hidden="true"></div>

        <canvas
            class="orbit__canvas"
            data-earth-canvas
            aria-hidden="true"
            data-texture-hi="<?= e(url('/assets/img/earth/earth_atmos_2048.jpg')) ?>"
            data-texture-lo="<?= e(url('/assets/img/earth/earth_atmos_1024.jpg')) ?>"
            data-texture-clouds="<?= e(url('/assets/img/earth/earth_clouds_1024.png')) ?>"
        ></canvas>

        <img
            class="orbit__static"
            src="<?= e(url('/assets/img/earth/earth_globe.jpg')) ?>"
            alt="Bumi tampak dari luar angkasa: benua, laut, dan awan tipis."
            width="900"
            height="901"
            fetchpriority="high"
        >

        <div class="orbit__scrim" aria-hidden="true"></div>

        <div class="orbit__copy" data-orbit-copy>
            <p class="orbit__eyebrow">Bumi, dari luar</p>
            <h1 id="judul-utama">Seberapa dalam manusia pernah menggali?</h1>
            <p class="orbit__lede">
                12.262 meter. Itu pun belum sampai mantel bumi. Mari turun dari daun yang membusuk sampai batas yang belum pernah ditembus bor.
            </p>
            <div class="orbit__actions">
                <a class="btn btn--paper" href="#lapisan-1" data-start>
                    Mulai turun
                    <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2v14M4.5 10.5 10 16l5.5-5.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </a>
                <a class="link-quiet" href="#lapisan-1">Lihat lapisan tanpa animasi</a>
            </div>
            <p class="orbit__hint">Tarik bumi untuk memutar. Gulir untuk mendekat.</p>
        </div>

        <div class="orbit__arrival" data-arrival aria-hidden="true">
            <p class="orbit__arrivaldepth">0 cm</p>
            <p class="orbit__arrivaltitle">Permukaan</p>
            <p class="orbit__arrivalnote">Mulai dari sini, alat ukur mengambil alih.</p>
        </div>

        <p class="orbit__credit">Bumi: NASA Visible Earth, Blue Marble</p>
    </div>
</section>

<aside class="gauge" data-gauge aria-label="Alat ukur kedalaman">
    <div class="gauge__readout">
        <p class="gauge__label">Kedalaman</p>
        <p class="gauge__value">
            <span data-gauge-value>0</span><span class="gauge__unit" data-gauge-unit>cm</span>
        </p>
        <p class="gauge__temp" data-gauge-temp><?= e($firstLayer['suhu_perkiraan'] ?? '—') ?></p>
        <p class="gauge__name" data-gauge-name>Permukaan</p>
    </div>

    <div class="gauge__track" data-gauge-track role="group" aria-label="Lompat ke lapisan">
        <?php foreach ($layers as $layer): ?>
            <button
                type="button"
                class="gauge__seg"
                style="--seg-color: <?= e($layer['warna_hex']) ?>; --seg-ink: <?= e($layer['ink']) ?>; flex-grow: <?= (int) $layer['scroll_vh'] ?>;"
                data-jump="lapisan-<?= (int) $layer['number'] ?>"
                aria-label="Lompat ke lapisan <?= e($layer['nama']) ?>, kedalaman <?= e($layer['depth_range']) ?>"
            >
                <span><?= e($layer['short_name']) ?></span>
            </button>
        <?php endforeach; ?>
        <span class="gauge__marker" data-gauge-marker aria-hidden="true"></span>
    </div>

    <p class="sr-only" role="status" data-gauge-status></p>
</aside>

<div class="journey" id="tur" data-journey>
    <div class="journey__threshold">
        <p class="journey__zero">0 cm</p>
        <h2>Kita baru saja menyentuh permukaan.</h2>
        <p>
            Di bawah sini, setiap sentimeter punya warna, suhu, dan penghuninya sendiri. Skala gulirnya sengaja tidak linier: lapisan tipis diberi ruang lebih banyak agar bisa dibaca. Angka kedalamannya tetap asli.
        </p>
    </div>

    <div class="layers">
        <?php foreach ($layers as $layer): ?>
            <section
                class="layer"
                id="lapisan-<?= (int) $layer['number'] ?>"
                data-layer
                data-min="<?= e((string) $layer['kedalaman_min_m']) ?>"
                data-max="<?= e((string) $layer['kedalaman_max_m']) ?>"
                data-scroll-vh="<?= (int) $layer['scroll_vh'] ?>"
                data-name="<?= e($layer['nama']) ?>"
                data-color="<?= e($layer['warna_hex']) ?>"
                data-ink="<?= e($layer['ink']) ?>"
                data-temp="<?= e($layer['suhu_perkiraan']) ?>"
                style="--layer: <?= e($layer['warna_hex']) ?>; --ink: <?= e($layer['ink']) ?>; --prev: <?= e($layer['prev_color']) ?>; --len: <?= (int) $layer['scroll_vh'] ?>;"
                aria-labelledby="judul-lapisan-<?= (int) $layer['number'] ?>"
            >
                <div class="layer__seam" aria-hidden="true"></div>

                <header class="layer__header">
                    <p class="layer__range"><?= e($layer['depth_range']) ?> di bawah permukaan</p>
                    <h2 class="layer__name" id="judul-lapisan-<?= (int) $layer['number'] ?>" tabindex="-1"><?= e($layer['nama']) ?></h2>
                    <p class="layer__summary"><?= e($layer['deskripsi_singkat']) ?></p>

                    <dl class="layer__facts">
                        <div>
                            <dt>Komposisi</dt>
                            <dd><?= e($layer['komposisi']) ?></dd>
                        </div>
                        <div>
                            <dt>Terbentuk</dt>
                            <dd><?= e($layer['proses_pembentukan']) ?></dd>
                        </div>
                        <div>
                            <dt>Peran ekologis</dt>
                            <dd><?= e($layer['peran_ekologis']) ?></dd>
                        </div>
                        <div>
                            <dt>Ancaman</dt>
                            <dd><?= e($layer['ancaman']) ?></dd>
                        </div>
                    </dl>

                    <p class="layer__temp">Suhu perkiraan: <?= e($layer['suhu_perkiraan']) ?></p>
                </header>

                <ol class="layer__milestones" aria-label="Penanda di lapisan <?= e($layer['nama']) ?>">
                    <?php foreach ($layer['milestones'] as $milestone): ?>
                        <li class="milestone" style="--at: <?= number_format((float) $milestone['at'], 4, '.', '') ?>;">
                            <button
                                type="button"
                                class="milestone__button"
                                data-milestone
                                aria-haspopup="dialog"
                                data-name="<?= e($milestone['nama']) ?>"
                                data-depth="<?= e($milestone['depth_label']) ?>"
                                data-note="<?= e($milestone['keterangan']) ?>"
                                data-kind="<?= e($milestone['jenis']) ?>"
                                data-layer-name="<?= e($layer['nama']) ?>"
                                data-source-url="<?= e($milestone['sumber_url']) ?>"
                                data-source-name="<?= e($milestone['sumber_nama']) ?>"
                                data-image="<?= e(url('/assets/img/milestones/' . $milestone['ilustrasi_svg'])) ?>"
                            >
                                <span class="milestone__art">
                                    <img
                                        src="<?= e(url('/assets/img/milestones/' . $milestone['ilustrasi_svg'])) ?>"
                                        alt=""
                                        width="96"
                                        height="96"
                                        loading="lazy"
                                        decoding="async"
                                    >
                                </span>
                                <span class="milestone__text">
                                    <span class="milestone__depth"><?= e($milestone['depth_label']) ?></span>
                                    <span class="milestone__name"><?= e($milestone['nama']) ?></span>
                                    <span class="milestone__note"><?= e($milestone['keterangan']) ?></span>
                                    <span class="milestone__source"><?= e($milestone['sumber_nama']) ?></span>
                                </span>
                            </button>
                        </li>
                    <?php endforeach; ?>
                </ol>
            </section>
        <?php endforeach; ?>
    </div>

    <section class="tail" id="selesai" aria-labelledby="judul-selesai">
        <p class="tail__depth">35 km</p>
        <h2 id="judul-selesai">Kerak bumi selesai. Mantel dimulai.</h2>
        <p class="tail__lede">
            Perjalanan ini berhenti tepat di batas Moho. Di bawahnya, batuan yang lebih panas dan lebih padat bergerak sangat lambat, menggerakkan lempeng dan gunung di atas kita.
        </p>
        <div class="tail__actions">
            <a class="btn btn--ink" href="<?= e(url('/artikel')) ?>">Baca artikel</a>
            <a class="btn btn--outline" href="<?= e(url('/galeri')) ?>">Buka galeri</a>
        </div>
        <p class="tail__note">
            Ada <?= (int) $totalMilestones ?> penanda di sepanjang perjalanan. Setiap angka punya sumber yang bisa dibuka dari kartunya.
        </p>
    </section>
</div>

<section class="cutaway" id="potongan" data-cutaway-section aria-labelledby="judul-potongan">
    <div class="cutaway__inner">
        <div class="cutaway__head">
            <div>
                <p class="section-head__eyebrow">Potongan bumi</p>
                <h2 id="judul-potongan">Kalau kerak bumi dibelah, yang terlihat cuma kulit tipis.</h2>
            </div>
            <div class="cutaway__intro">
                <p>Bumi dipotong dengan bidang clipping di Three.js. Sisi terbuka memperlihatkan kerak, batuan, dan mantel atas. Putar dengan menarik, atau biarkan bergerak pelan.</p>
                <p class="cutaway__note">Skala visual, bukan skala sebenarnya. Kerak bumi di bawah benua rata-rata 35 km, sementara jari-jari bumi sekitar 6.371 km.</p>
            </div>
        </div>

        <div class="cutaway__stage" data-cutaway>
            <canvas
                class="cutaway__canvas"
                data-cutaway-canvas
                aria-hidden="true"
                data-texture-hi="<?= e(url('/assets/img/earth/earth_atmos_2048.jpg')) ?>"
                data-texture-lo="<?= e(url('/assets/img/earth/earth_atmos_1024.jpg')) ?>"
            ></canvas>

            <img
                class="cutaway__static"
                src="<?= e(url('/assets/img/cutaway/bumi-potong.svg')) ?>"
                alt="Ilustrasi bumi yang dipotong: sisi kiri memperlihatkan laut dan benua, sisi kanan memperlihatkan kerak tipis berwarna merah, lapisan batuan biru keabu-abuan, dan mantel atas berwarna jingga."
                width="1000"
                height="800"
                loading="lazy"
                decoding="async"
            >

            <div class="cutaway__tags" aria-hidden="true">
                <span class="cutaway__tag cutaway__tag--crust">Kerak</span>
                <span class="cutaway__tag cutaway__tag--moho">Batas Moho</span>
                <span class="cutaway__tag cutaway__tag--mantle">Mantel atas</span>
            </div>

            <p class="cutaway__credit">Bumi: NASA Visible Earth. Ilustrasi potongan: Bumi Bawah.</p>
        </div>

        <ol class="cutaway__legend" aria-label="Lapisan dari permukaan ke bawah">
            <?php foreach ($layers as $layer): ?>
                <li style="--legend: <?= e($layer['warna_hex']) ?>; --legend-ink: <?= e($layer['ink']) ?>;">
                    <span class="cutaway__swatch" aria-hidden="true"></span>
                    <span class="cutaway__legendname"><?= e($layer['nama']) ?></span>
                    <span class="cutaway__legenddepth"><?= e($layer['depth_range']) ?></span>
                </li>
            <?php endforeach; ?>
        </ol>
    </div>
</section>

<section class="home-recent" aria-labelledby="judul-terbaru">
    <div class="home-recent__inner">
        <div class="section-head">
            <div>
                <p class="section-head__eyebrow">Artikel terbaru</p>
                <h2 id="judul-terbaru">Yang baru ditulis dari bawah permukaan.</h2>
            </div>
            <a class="section-head__link" href="<?= e(url('/artikel')) ?>">Lihat <?= (int) $articleCount ?> artikel</a>
        </div>

        <div class="archive__grid">
            <?php foreach ($latestArticles as $article): ?>
                <?php require BASE_PATH . '/app/Views/partials/article-card.php'; ?>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<section class="home-gallery" aria-labelledby="judul-galeri-beranda">
    <div class="home-gallery__inner">
        <div class="section-head">
            <div>
                <p class="section-head__eyebrow">Cuplikan galeri</p>
                <h2 id="judul-galeri-beranda">Enam pelat, enam sudut pandang.</h2>
            </div>
            <a class="section-head__link" href="<?= e(url('/galeri')) ?>">Buka semua pelat</a>
        </div>

        <div class="home-gallery__grid">
            <?php foreach ($galleryPreview as $index => $item): ?>
                <figure class="home-plate home-plate--<?= (int) ($index % 3) ?>">
                    <a href="<?= e(url('/galeri')) ?>" aria-label="Lihat <?= e($item['judul']) ?> di galeri">
                        <picture>
                            <?php if (!empty($item['gambar_webp'])): ?>
                                <source srcset="<?= e($item['gambar_webp']) ?>" type="image/webp">
                            <?php endif; ?>
                            <img
                                src="<?= e($item['gambar_url']) ?>"
                                alt="Ilustrasi <?= e($item['judul']) ?>"
                                width="640"
                                height="480"
                                loading="lazy"
                                decoding="async"
                            >
                        </picture>
                    </a>
                    <figcaption>
                        <span class="home-plate__title"><?= e($item['judul']) ?></span>
                        <span class="home-plate__place"><?= e($item['lokasi']) ?></span>
                    </figcaption>
                </figure>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<section class="home-facts" aria-labelledby="judul-fakta">
    <div class="home-facts__inner">
        <div class="section-head section-head--on-dark">
            <div>
                <p class="section-head__eyebrow">Fakta bersumber</p>
                <h2 id="judul-fakta">Empat angka yang sulit dibayangkan.</h2>
            </div>
            <p class="home-facts__note">Semua angka di bawah berasal dari penanda yang sama di perjalanan. Tautan sumber membuka halaman aslinya.</p>
        </div>

        <ul class="fact-list">
            <?php foreach ($facts as $fact): ?>
                <li class="fact" style="--fact-accent: <?= e($fact['warna_hex']) ?>;">
                    <p class="fact__value"><?= e($fact['depth_label']) ?></p>
                    <div class="fact__body">
                        <h3><?= e($fact['nama']) ?></h3>
                        <p><?= e($fact['keterangan']) ?></p>
                        <a href="<?= e($fact['sumber_url']) ?>" target="_blank" rel="noopener noreferrer">Sumber: <?= e($fact['sumber_nama']) ?></a>
                    </div>
                </li>
            <?php endforeach; ?>
        </ul>
    </div>
</section>

<section class="closing-cta closing-cta--home" aria-labelledby="judul-penutup-beranda">
    <div class="closing-cta__inner">
        <p class="closing-cta__eyebrow">Selesai turun, belum selesai tahu</p>
        <h2 id="judul-penutup-beranda">Masih ada satu lapisan yang belum kamu buka: sumbernya.</h2>
        <div class="closing-cta__actions">
            <a class="btn btn--ink" href="<?= e(url('/tentang#referensi')) ?>">Lihat daftar sumber</a>
            <a class="btn btn--outline" href="<?= e(url('/kontak')) ?>">Kirim koreksi</a>
        </div>
    </div>
</section>

<dialog class="specimen" data-specimen aria-labelledby="specimen-title">
    <div class="specimen__panel">
        <button class="specimen__close" type="button" data-specimen-close aria-label="Tutup detail">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>

        <div class="specimen__art">
            <img data-specimen-image src="" alt="" width="160" height="160">
        </div>

        <div class="specimen__body">
            <p class="specimen__depth"><span data-specimen-depth></span> di bawah permukaan</p>
            <h2 id="specimen-title" data-specimen-title></h2>
            <p class="specimen__meta"><span data-specimen-kind></span>, lapisan <span data-specimen-layer></span></p>
            <p class="specimen__note" data-specimen-note></p>
            <a class="specimen__source" data-specimen-source href="#" target="_blank" rel="noopener noreferrer">
                Buka sumber: <span data-specimen-source-name></span>
            </a>
        </div>
    </div>
</dialog>
