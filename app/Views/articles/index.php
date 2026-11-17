<?php
/** @var array<int, array<string, mixed>> $items */
/** @var array<int, array<string, mixed>> $layers */
/** @var array<int, int> $counts */
/** @var array<string, mixed>|null $activeLayer */
/** @var string $search */
/** @var string $activeSlug */
$totalText = (int) $total === 1 ? '1 tulisan' : (int) $total . ' tulisan';
?>
<section class="page-head page-head--archive" aria-labelledby="judul-arsip">
    <div class="page-head__inner">
        <p class="page-head__eyebrow">Artikel</p>
        <h1 id="judul-arsip">
            <?php if ($activeLayer !== null): ?>
                Lapisan <?= e($activeLayer['nama']) ?>
            <?php elseif ($search !== ''): ?>
                Hasil untuk “<?= e($search) ?>”
            <?php else: ?>
                Hal-hal yang tidak terlihat dari permukaan
            <?php endif; ?>
        </h1>
        <p class="page-head__lede">
            Delapan tulisan pendek tentang tanah, air, batuan, dan batas kerak bumi. Setiap klaim besar menunjuk sumbernya.
        </p>

        <form class="archive-search" action="<?= e(url('/artikel')) ?>" method="get" role="search">
            <?php if ($activeSlug !== ''): ?>
                <input type="hidden" name="lapisan" value="<?= e($activeSlug) ?>">
            <?php endif; ?>
            <label for="cari-artikel">Cari artikel</label>
            <div class="archive-search__row">
                <input id="cari-artikel" type="search" name="q" value="<?= e($search) ?>" maxlength="200" placeholder="mis. gua, akar, air tanah" autocomplete="off">
                <button class="btn btn--ink" type="submit">Cari</button>
                <?php if ($search !== '' || $activeSlug !== ''): ?>
                    <a class="archive-search__reset" href="<?= e(url('/artikel')) ?>">Hapus filter</a>
                <?php endif; ?>
            </div>
        </form>

        <nav class="filter-chips" aria-label="Filter menurut lapisan">
            <a class="filter-chip<?= $activeSlug === '' ? ' is-active' : '' ?>"
               href="<?= e(query_url('/artikel', ['q' => $search])) ?>"
               <?= $activeSlug === '' ? 'aria-current="page"' : '' ?>>
                Semua <span><?= (int) $totalPublished ?></span>
            </a>
            <?php foreach ($layers as $layer): ?>
                <?php $count = $counts[(int) $layer['id']] ?? 0; ?>
                <a class="filter-chip<?= $activeSlug === $layer['slug'] ? ' is-active' : '' ?>"
                   href="<?= e(query_url('/artikel', ['q' => $search, 'lapisan' => $layer['slug']])) ?>"
                   style="--chip: <?= e($layer['warna_hex']) ?>; --chip-ink: <?= e(layer_ink($layer['warna_hex'])) ?>;"
                   <?= $activeSlug === $layer['slug'] ? 'aria-current="page"' : '' ?>>
                    <?= e(layer_short($layer['slug'], $layer['nama'])) ?> <span><?= $count ?></span>
                </a>
            <?php endforeach; ?>
        </nav>

        <p class="archive-count" role="status"><?= e($totalText) ?><?= $search !== '' ? ' cocok dengan pencarian' : '' ?>.</p>
    </div>
</section>

<section class="archive" aria-label="Daftar artikel">
    <div class="archive__inner">
        <?php if ($items === []): ?>
            <div class="empty-state">
                <h2>Belum ada yang cocok.</h2>
                <p>Coba kata yang lebih pendek, atau kembali ke semua lapisan. Kadang jawabannya ada di lapisan sebelah.</p>
                <a class="btn btn--ink" href="<?= e(url('/artikel')) ?>">Lihat semua artikel</a>
            </div>
        <?php else: ?>
            <div class="archive__grid">
                <?php foreach ($items as $article): ?>
                    <?php require BASE_PATH . '/app/Views/partials/article-card.php'; ?>
                <?php endforeach; ?>
            </div>

            <?php if ((int) $pages > 1): ?>
                <nav class="pagination" aria-label="Halaman artikel">
                    <?php if ((int) $page > 1): ?>
                        <a class="pagination__step" href="<?= e(query_url('/artikel', ['q' => $search, 'lapisan' => $activeSlug, 'halaman' => (int) $page - 1])) ?>" rel="prev">Sebelumnya</a>
                    <?php else: ?>
                        <span class="pagination__step is-disabled">Sebelumnya</span>
                    <?php endif; ?>

                    <ol class="pagination__pages">
                        <?php for ($i = 1; $i <= (int) $pages; $i++): ?>
                            <li>
                                <?php if ($i === (int) $page): ?>
                                    <span class="pagination__page is-current" aria-current="page"><?= $i ?></span>
                                <?php else: ?>
                                    <a class="pagination__page" href="<?= e(query_url('/artikel', ['q' => $search, 'lapisan' => $activeSlug, 'halaman' => $i])) ?>"><?= $i ?></a>
                                <?php endif; ?>
                            </li>
                        <?php endfor; ?>
                    </ol>

                    <?php if ((int) $page < (int) $pages): ?>
                        <a class="pagination__step" href="<?= e(query_url('/artikel', ['q' => $search, 'lapisan' => $activeSlug, 'halaman' => (int) $page + 1])) ?>" rel="next">Berikutnya</a>
                    <?php else: ?>
                        <span class="pagination__step is-disabled">Berikutnya</span>
                    <?php endif; ?>
                </nav>
            <?php endif; ?>
        <?php endif; ?>
    </div>
</section>
