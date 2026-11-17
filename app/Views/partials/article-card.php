<?php
/** @var array<string, mixed> $article */
$accent = (string) ($article['warna'] ?? '#F3C64F');
$layerName = (string) ($article['layer_nama'] ?? 'Kerak bumi');
$layerSlug = (string) ($article['layer_slug'] ?? '');
$short = $layerSlug !== '' ? layer_short($layerSlug, $layerName) : $layerName;
?>
<article class="post-card" style="--accent: <?= e($accent) ?>; --accent-ink: <?= e(layer_ink($accent)) ?>;">
    <span class="post-card__band" aria-hidden="true"></span>
    <div class="post-card__body">
        <p class="post-card__meta">
            <span class="post-card__layer"><?= e($short) ?></span>
            <span><?= e($article['tanggal'] ?? '') ?></span>
        </p>
        <h3 class="post-card__title">
            <a href="<?= e(url('/artikel/' . $article['slug'])) ?>"><?= e($article['judul']) ?></a>
        </h3>
        <p class="post-card__summary"><?= e($article['ringkasan_pendek'] ?? '') ?></p>
        <p class="post-card__foot">
            <span><?= (int) ($article['reading_time'] ?? 1) ?> menit baca</span>
            <a class="post-card__more" href="<?= e(url('/artikel/' . $article['slug'])) ?>" tabindex="-1">Baca artikel</a>
        </p>
    </div>
</article>
