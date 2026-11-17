<?php
/**
 * Konfigurasi tunggal. Salin nilai lewat environment variable bila perlu.
 * Jangan menaruh kredensial produksi di dalam repository.
 */

$root = defined('BASE_PATH') ? BASE_PATH : dirname(__DIR__);

return [
    'app' => [
        'name'    => 'Bumi Bawah',
        'tagline' => 'Edukasi setiap lapisan kerak bumi',
        'env'     => getenv('APP_ENV') ?: 'local',
        'debug'   => filter_var(getenv('APP_DEBUG') ?: '1', FILTER_VALIDATE_BOOL),
        // Kosongkan untuk deteksi otomatis dari folder public.
        'url'     => getenv('APP_URL') ?: '',
    ],

    'db' => [
        'host'     => getenv('DB_HOST') ?: '127.0.0.1',
        'port'     => getenv('DB_PORT') ?: '3306',
        'name'     => getenv('DB_NAME') ?: 'dalam_bumi',
        'user'     => getenv('DB_USER') ?: 'root',
        'password' => getenv('DB_PASS') ?: '',
        'charset'  => 'utf8mb4',
    ],

    'session' => [
        'name'     => 'bumi_session',
        'lifetime' => 7200,
    ],

    'uploads' => [
        'path'      => $root . '/public/uploads',
        'url'       => '/uploads',
        'max_bytes' => 2 * 1024 * 1024,
        'mime'      => [
            'image/jpeg' => 'jpg',
            'image/png'  => 'png',
            'image/webp' => 'webp',
        ],
    ],

    'security' => [
        // Ganti lewat APP_KEY di produksi. Dipakai untuk hash IP, bukan sandi.
        'ip_salt'          => getenv('APP_KEY') ?: 'bumi-bawah-lokal-ganti-di-produksi',
        'login_max'        => 5,
        'login_window'     => 900,
        'contact_max'      => 3,
        'contact_window'   => 600,
    ],

    'contact' => [
        'email'    => getenv('CONTACT_EMAIL') ?: 'halo@bumibawah.id',
        'location' => 'Yogyakarta, Indonesia',
        'map'      => 'https://www.openstreetmap.org/export/embed.html?bbox=110.30%2C-7.90%2C110.48%2C-7.72&layer=mapnik&marker=-7.797%2C110.370',
        'map_link' => 'https://www.openstreetmap.org/?mlat=-7.797&mlon=110.370#map=12/-7.797/110.370',
    ],

    'cache' => [
        // Versi aset untuk cache busting. Naikkan saat mengubah CSS/JS.
        'version' => '2',
    ],
];
