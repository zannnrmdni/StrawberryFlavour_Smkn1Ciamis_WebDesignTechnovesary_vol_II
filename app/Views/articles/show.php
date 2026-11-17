<?php
/** @var array<string, mixed> $article */
/** @var array<int, array{id: string, text: string}> $toc */
/** @var array<int, array<string, mixed>> $related */
$accent = (string) ($article['warna'] ?? '#F3C64F');
$ink = layer_ink($accent);
$layerName = (string) ($article['layer_nama'] ?? 'Kerak bumi');
?>
<div class="reading-progress" data-reading-progress aria-hidden="true"><span></span></div>

<article class="article" style="--accent: <?= e($accent) ?>; --accent-ink: <?= e($ink) ?>;" data-article>
    <header class="article-hero">
        <div class="article-hero__inner">
            <nav class="breadcrumb" aria-label="Remah roti">
                <a href="<?= e(url('/artikel')) ?>">Artikel</a>
                <span aria-hidden="true">/</span>
                <a href="<?= e(query_url('/artikel', ['lapisan' => $article['layer_slug'] ?? ''])) ?>"><?= e($layerName) ?></a>
            </nav>

            <p class="article-hero__layer">
                <span class="layer-dot" aria-hidden="true"></span>
                Lapisan <?= e($layerName) ?>
                <?php if (!empty($article['layer_slug'])): ?>
                    <span class="article-hero__range"><?= e(format_depth_range($article['kedalaman_min_m'] ?? 0, $article['kedalaman_max_m'] ?? 0)) ?></span>
                <?php endif; ?>
            </p>

            <h1><?= e($article['judul']) ?></h1>
            <p class="article-hero__lede"><?= e($article['ringkasan']) ?></p>

            <p class="article-hero__meta">
                <span>Oleh <?= e($article['penulis']) ?></span>
                <span><time datetime="<?= e($article['tanggal_iso']) ?>"><?= e($article['tanggal']) ?></time></span>
                <span><?= (int) $article['reading_time'] ?> menit baca</span>
            </p>

            <figure class="article-cover">
                <picture>
                    <?php if (!empty($article['gambar_webp'])): ?>
                        <source srcset="<?= e($article['gambar_webp']) ?>" type="image/webp">
                    <?php endif; ?>
                    <img src="<?= e($article['gambar_url']) ?>" alt="Ilustrasi untuk artikel <?= e($article['judul']) ?>" width="1200" height="600" fetchpriority="high">
                </picture>
                <figcaption>Ilustrasi: Bumi Bawah. Gambar ini bukan foto lokasi.</figcaption>
            </figure>
        </div>
    </header>

    <div class="article-layout">
        <?php if ($toc !== []): ?>
            <aside class="article-toc" aria-labelledby="judul-daftar-isi" data-toc>
                <div class="article-toc__sticky">
                    <p class="article-toc__title" id="judul-daftar-isi">Daftar isi</p>
                    <ol>
                        <?php foreach ($toc as $item): ?>
                            <li><a href="#<?= e($item['id']) ?>" data-toc-link="<?= e($item['id']) ?>"><?= e($item['text']) ?></a></li>
                        <?php endforeach; ?>
                    </ol>
                    <p class="article-toc__note">Warna penanda menunjukkan lapisan yang dibahas.</p>
                </div>
            </aside>
        <?php endif; ?>

        <div class="article-body" data-article-body>
            <?= $bodyHtml ?>

            <?php if ($article['sumber_list'] !== []): ?>
                <section class="article-sources" id="sumber" aria-labelledby="judul-sumber">
                    <h2 id="judul-sumber">Sumber dan bacaan lanjutan</h2>
                    <p>Angka dan klaim di atas merujuk ke halaman berikut. Sumber dibuka di tab baru.</p>
                    <ol>
                        <?php foreach ($article['sumber_list'] as $source): ?>
                            <li>
                                <a href="<?= e($source['url']) ?>" target="_blank" rel="noopener noreferrer"><?= e($source['nama']) ?></a>
                            </li>
                        <?php endforeach; ?>
                    </ol>
                </section>
            <?php endif; ?>

            <aside class="article-correction">
                <p><strong>Ada angka yang perlu diperbaiki?</strong> Kirim catatan lewat <a href="<?= e(url('/kontak')) ?>">halaman kontak</a>. Kami cantumkan perubahan di artikel, bukan diam-diam.</p>
            </aside>
        </div>
    </div>
</article>

<?php if ($related !== []): ?>
    <section class="related" aria-labelledby="judul-terkait">
        <div class="related__inner">
            <div class="section-head section-head--compact">
                <div>
                    <p class="section-head__eyebrow">Bacaan berikutnya</p>
                    <h2 id="judul-terkait">Masih satu lapisan, atau satu pertanyaan.</h2>
                </div>
                <a class="section-head__link" href="<?= e(url('/artikel')) ?>">Semua artikel</a>
            </div>
            <div class="archive__grid">
                <?php foreach ($related as $article): ?>
                    <?php require BASE_PATH . '/app/Views/partials/article-card.php'; ?>
                <?php endforeach; ?>
            </div>
        </div>
    </section>
<?php endif; ?>
