<?php
/** @var array<int, array<string, mixed>> $items */
/** @var array<int, array{kategori: string, jumlah: int}> $categories */
/** @var string $active */
?>
<section class="page-head page-head--gallery" aria-labelledby="judul-galeri">
    <div class="page-head__inner">
        <p class="page-head__eyebrow">Galeri</p>
        <h1 id="judul-galeri">Kerak bumi, dipotong dan diperbesar.</h1>
        <p class="page-head__lede">
            Dua belas pelat ilustrasi tentang tanah, akar, gua, batuan, dan jejak manusia. Semuanya digambar sendiri; tidak ada foto stok yang menyamar sebagai lokasi asli.
        </p>

        <nav class="filter-chips" aria-label="Filter kategori galeri">
            <a class="filter-chip<?= $active === '' ? ' is-active' : '' ?>" href="<?= e(url('/galeri')) ?>" <?= $active === '' ? 'aria-current="page"' : '' ?>>
                Semua <span><?= (int) $total ?></span>
            </a>
            <?php foreach ($categories as $category): ?>
                <a class="filter-chip<?= $active === $category['kategori'] ? ' is-active' : '' ?>"
                   href="<?= e(query_url('/galeri', ['kategori' => $category['kategori']])) ?>"
                   <?= $active === $category['kategori'] ? 'aria-current="page"' : '' ?>>
                    <?= e($category['kategori']) ?> <span><?= (int) $category['jumlah'] ?></span>
                </a>
            <?php endforeach; ?>
        </nav>

        <p class="gallery-hint">Klik pelat untuk memperbesar. Di dalam, pakai tombol panah untuk berpindah dan Esc untuk menutup.</p>
    </div>
</section>

<section class="gallery" aria-label="Pelat ilustrasi">
    <div class="gallery__inner">
        <?php if ($items === []): ?>
            <div class="empty-state">
                <h2>Belum ada pelat di kategori ini.</h2>
                <p>Coba kategori lain, atau lihat seluruh galeri.</p>
                <a class="btn btn--ink" href="<?= e(url('/galeri')) ?>">Semua pelat</a>
            </div>
        <?php else: ?>
            <div class="masonry" data-gallery>
                <?php foreach ($items as $index => $item): ?>
                    <?php
                    $full = $item['gambar_webp'] ?: $item['gambar_url'];
                    $caption = (string) $item['judul'];
                    $credit = (string) $item['kredit_foto'];
                    ?>
                    <figure class="plate" style="--plate-index: <?= (int) $index % 3 ?>;">
                        <button
                            type="button"
                            class="plate__button"
                            data-lightbox
                            data-index="<?= (int) $index ?>"
                            data-full="<?= e($full) ?>"
                            data-fallback="<?= e($item['gambar_url']) ?>"
                            data-title="<?= e($caption) ?>"
                            data-caption="<?= e($item['deskripsi']) ?>"
                            data-location="<?= e($item['lokasi']) ?>"
                            data-credit="<?= e($credit) ?>"
                            aria-label="Perbesar: <?= e($caption) ?>"
                        >
                            <span class="plate__media">
                                <picture>
                                    <?php if (!empty($item['gambar_webp'])): ?>
                                        <source srcset="<?= e($item['gambar_webp']) ?>" type="image/webp">
                                    <?php endif; ?>
                                    <img
                                        src="<?= e($item['gambar_url']) ?>"
                                        alt="Ilustrasi <?= e($caption) ?>"
                                        width="640"
                                        height="480"
                                        loading="lazy"
                                        decoding="async"
                                    >
                                </picture>
                                <span class="plate__zoom" aria-hidden="true">Perbesar</span>
                            </span>
                            <span class="plate__caption">
                                <span class="plate__title"><?= e($caption) ?></span>
                                <span class="plate__location"><?= e($item['lokasi']) ?></span>
                            </span>
                        </button>
                        <figcaption>
                            <span><?= e($item['deskripsi']) ?></span>
                            <span class="plate__credit"><?= e($credit) ?></span>
                        </figcaption>
                    </figure>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</section>

<dialog class="lightbox" data-lightbox-dialog aria-labelledby="lightbox-title" aria-describedby="lightbox-caption">
    <div class="lightbox__panel">
        <button class="lightbox__close" type="button" data-lightbox-close aria-label="Tutup gambar">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>

        <div class="lightbox__nav">
            <button type="button" class="lightbox__arrow" data-lightbox-prev aria-label="Gambar sebelumnya">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <button type="button" class="lightbox__arrow" data-lightbox-next aria-label="Gambar berikutnya">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
        </div>

        <figure class="lightbox__figure">
            <img data-lightbox-image src="" alt="" width="960" height="720">
            <figcaption>
                <p class="lightbox__count" data-lightbox-count></p>
                <h2 id="lightbox-title" data-lightbox-title></h2>
                <p id="lightbox-caption" data-lightbox-caption></p>
                <p class="lightbox__meta">
                    <span data-lightbox-location></span>
                    <span class="lightbox__credit" data-lightbox-credit></span>
                </p>
            </figcaption>
        </figure>
    </div>
</dialog>
