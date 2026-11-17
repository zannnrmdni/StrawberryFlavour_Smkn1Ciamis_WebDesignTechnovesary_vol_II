<?php
$navItems = [
    ['label' => 'Turun', 'href' => '/#tur', 'path' => '/'],
    ['label' => 'Artikel', 'href' => '/artikel', 'path' => '/artikel'],
    ['label' => 'Galeri', 'href' => '/galeri', 'path' => '/galeri'],
    ['label' => 'Tentang', 'href' => '/tentang', 'path' => '/tentang'],
    ['label' => 'Kontak', 'href' => '/kontak', 'path' => '/kontak'],
];
?>
<header class="site-header" data-header>
    <div class="site-header__inner">
        <a class="brand" href="<?= e(url('/')) ?>" aria-label="Bumi Bawah, ke beranda">
            <svg class="brand__mark" viewBox="0 0 32 32" aria-hidden="true">
                <rect x="3" y="5" width="26" height="8" rx="1" fill="#BFE4F5"/>
                <rect x="3" y="13" width="26" height="7" rx="1" fill="#86C254"/>
                <rect x="3" y="20" width="26" height="7" rx="1" fill="#7B4B2A"/>
                <path d="M3 13h26M3 20h26" stroke="currentColor" stroke-width="1.2"/>
            </svg>
            <span class="brand__text">Bumi Bawah</span>
        </a>

        <div class="site-header__desktop">
            <nav aria-label="Navigasi utama">
                <ul class="nav">
                    <?php foreach ($navItems as $item): ?>
                        <li>
                            <a class="nav__link<?= is_current($item['path']) ? ' is-active' : '' ?>"
                               href="<?= e(url($item['href'])) ?>"
                               <?= is_current($item['path']) ? 'aria-current="page"' : '' ?>>
                                <?= e($item['label']) ?>
                            </a>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </nav>
        </div>

        <details class="site-menu">
            <summary>Menu</summary>
            <nav aria-label="Navigasi utama versi ponsel">
                <ul>
                    <?php foreach ($navItems as $item): ?>
                        <li>
                            <a href="<?= e(url($item['href'])) ?>"
                               <?= is_current($item['path']) ? 'aria-current="page"' : '' ?>>
                                <?= e($item['label']) ?>
                            </a>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </nav>
        </details>
    </div>
</header>
