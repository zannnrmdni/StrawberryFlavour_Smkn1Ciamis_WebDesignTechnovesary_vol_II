<?php
$bodyClass = $bodyClass ?? '';
$pageTitle = $pageTitle ?? config('app.name');
$metaDescription = $metaDescription ?? config('app.tagline');
$canonical = url(current_path());
$ogType = $ogType ?? 'website';
$ogImage = $ogImage ?? url('/assets/img/earth/earth_globe.jpg');
$structuredData = $structuredData ?? null;
$noindex = $noindex ?? false;
?>
<!doctype html>
<html lang="id" class="no-js">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= e($pageTitle) ?> — <?= e(config('app.name')) ?></title>
    <meta name="description" content="<?= e($metaDescription) ?>">
    <meta name="theme-color" content="#16262B">
    <link rel="canonical" href="<?= e($canonical) ?>">
    <?php if ($noindex): ?><meta name="robots" content="noindex, nofollow"><?php endif; ?>

    <meta property="og:type" content="<?= e($ogType) ?>">
    <meta property="og:site_name" content="<?= e(config('app.name')) ?>">
    <meta property="og:title" content="<?= e($pageTitle) ?>">
    <meta property="og:description" content="<?= e($metaDescription) ?>">
    <meta property="og:url" content="<?= e($canonical) ?>">
    <meta property="og:image" content="<?= e($ogImage) ?>">
    <meta property="og:locale" content="id_ID">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?= e($pageTitle) ?>">
    <meta name="twitter:description" content="<?= e($metaDescription) ?>">
    <meta name="twitter:image" content="<?= e($ogImage) ?>">

    <link rel="icon" href="<?= e(url('/assets/img/favicon.svg')) ?>" type="image/svg+xml">
    <link rel="preload" href="<?= e(url('/assets/fonts/gabarito-var.woff2')) ?>" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="<?= e(url('/assets/fonts/literata-var.woff2')) ?>" as="font" type="font/woff2" crossorigin>
    <link rel="stylesheet" href="<?= e(asset('css/app.css')) ?>">

    <?php if (is_array($structuredData)): ?>
        <script type="application/ld+json"><?= json_encode($structuredData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP) ?></script>
    <?php endif; ?>

    <script>
        document.documentElement.classList.remove('no-js');
        document.documentElement.classList.add('js');
    </script>
</head>
<body class="<?= e($bodyClass) ?>">
    <a class="skip-link" href="#konten">Lewati ke isi utama</a>

    <?php require BASE_PATH . '/app/Views/partials/header.php'; ?>

    <main id="konten">
        <?= $content ?>
    </main>

    <?php require BASE_PATH . '/app/Views/partials/footer.php'; ?>

    <script src="<?= e(url('/assets/vendor/gsap/gsap.min.js')) ?>" defer></script>
    <script src="<?= e(url('/assets/vendor/gsap/ScrollTrigger.min.js')) ?>" defer></script>
    <script type="importmap">
        {
            "imports": {
                "three": "<?= e(url('/assets/vendor/three/three.module.min.js')) ?>"
            }
        }
    </script>
    <script type="module" src="<?= e(asset('js/app.min.js')) ?>"></script>
</body>
</html>
