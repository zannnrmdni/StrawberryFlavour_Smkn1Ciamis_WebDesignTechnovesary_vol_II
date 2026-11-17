<?php

use App\Core\Database;

if (!function_exists('config')) {
    function config(?string $key = null, mixed $default = null): mixed
    {
        static $store = null;
        if ($store === null) {
            $store = require BASE_PATH . '/config/config.php';
        }

        if ($key === null) {
            return $store;
        }

        $value = $store;
        foreach (explode('.', $key) as $part) {
            if (!is_array($value) || !array_key_exists($part, $value)) {
                return $default;
            }
            $value = $value[$part];
        }
        return $value;
    }
}

if (!function_exists('e')) {
    function e(mixed $value): string
    {
        return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    }
}

if (!function_exists('base_path')) {
    function base_path(): string
    {
        if (isset($GLOBALS['APP_BASE_PATH']) && is_string($GLOBALS['APP_BASE_PATH'])) {
            return rtrim($GLOBALS['APP_BASE_PATH'], '/');
        }

        $configured = (string) config('app.url', '');
        if ($configured !== '') {
            $path = parse_url($configured, PHP_URL_PATH) ?: '';
            return rtrim($path, '/');
        }

        $script = str_replace('\\', '/', $_SERVER['SCRIPT_NAME'] ?? '/index.php');
        $dir = '';
        if (str_ends_with($script, '/index.php')) {
            $dir = rtrim(substr($script, 0, -strlen('/index.php')), '/');
        }
        return $dir === '' ? '' : $dir;
    }
}

if (!function_exists('url')) {
    function url(string $path = '/'): string
    {
        if (preg_match('#^https?://#i', $path)) {
            return $path;
        }
        return base_path() . '/' . ltrim($path, '/');
    }
}

if (!function_exists('asset')) {
    function asset(string $path): string
    {
        return url('/assets/' . ltrim($path, '/')) . '?v=' . rawurlencode((string) config('cache.version', '1'));
    }
}

if (!function_exists('current_path')) {
    function current_path(): string
    {
        $uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
        $base = base_path();
        if ($base !== '' && str_starts_with($uri, $base)) {
            $uri = substr($uri, strlen($base)) ?: '/';
        }
        return '/' . trim($uri, '/');
    }
}

if (!function_exists('is_current')) {
    function is_current(string $path): bool
    {
        $current = current_path();
        if ($path === '/') {
            return $current === '/';
        }
        return $current === $path || str_starts_with($current, rtrim($path, '/') . '/');
    }
}

if (!function_exists('format_number')) {
    function format_number(float|int $number, int $decimals = 0): string
    {
        return number_format((float) $number, $decimals, ',', '.');
    }
}

if (!function_exists('depth_parts')) {
    /**
     * Ubah meter menjadi [nilai, satuan] dengan satuan otomatis.
     *
     * @return array{0: string, 1: string}
     */
    function depth_parts(float|int $meters): array
    {
        $m = (float) $meters;

        if ($m < 1) {
            $cm = $m * 100;
            $decimals = $cm > 0 && $cm < 10 ? 1 : 0;
            $value = format_number($cm, $decimals);
            if ($decimals > 0) {
                $value = rtrim(rtrim($value, '0'), ',');
            }
            return [$value === '' ? '0' : $value, 'cm'];
        }

        if ($m < 1000) {
            $decimals = floor($m) == $m ? 0 : 1;
            return [format_number($m, $decimals), 'm'];
        }

        $km = $m / 1000;
        $decimals = $km >= 10 ? 0 : ($km >= 1 ? 1 : 2);
        $value = format_number($km, $decimals);
        if ($decimals > 0) {
            $value = rtrim(rtrim($value, '0'), ',');
        }
        return [$value, 'km'];
    }
}

if (!function_exists('format_depth')) {
    function format_depth(float|int $meters): string
    {
        [$value, $unit] = depth_parts($meters);
        return $value . ' ' . $unit;
    }
}

if (!function_exists('format_depth_range')) {
    function format_depth_range(float|int $min, float|int $max): string
    {
        [$minValue, $minUnit] = depth_parts($min);
        [$maxValue, $maxUnit] = depth_parts($max);

        if ($minUnit === $maxUnit) {
            return $minValue . '–' . $maxValue . ' ' . $maxUnit;
        }

        return $minValue . ' ' . $minUnit . '–' . $maxValue . ' ' . $maxUnit;
    }
}

if (!function_exists('hex_luminance')) {
    function hex_luminance(string $hex): float
    {
        $hex = ltrim($hex, '#');
        if (strlen($hex) === 3) {
            $hex = $hex[0] . $hex[0] . $hex[1] . $hex[1] . $hex[2] . $hex[2];
        }
        if (!preg_match('/^[0-9a-f]{6}$/i', $hex)) {
            return 0.5;
        }

        $channels = array_map(
            static fn(string $pair): float => ((int) hexdec($pair)) / 255,
            str_split($hex, 2)
        );
        $linear = array_map(
            static fn(float $value): float => $value <= 0.03928
                ? $value / 12.92
                : (($value + 0.055) / 1.055) ** 2.4,
            $channels
        );

        return 0.2126 * $linear[0] + 0.7152 * $linear[1] + 0.0722 * $linear[2];
    }
}

if (!function_exists('contrast_ratio')) {
    function contrast_ratio(string $a, string $b): float
    {
        $la = hex_luminance($a);
        $lb = hex_luminance($b);
        $light = max($la, $lb);
        $dark = min($la, $lb);
        return ($light + 0.05) / ($dark + 0.05);
    }
}

if (!function_exists('layer_ink')) {
    /**
     * Pilih tinta gelap atau kertas terang dengan rasio kontras terbaik.
     */
    function layer_ink(string $background): string
    {
        $ink = '#16262B';
        $paper = '#FFF6E6';
        return contrast_ratio($background, $ink) >= contrast_ratio($background, $paper) ? $ink : $paper;
    }
}

if (!function_exists('layer_short')) {
    function layer_short(string $slug, string $name): string
    {
        return [
            'serasah-humus' => 'Serasah',
            'tanah-atas'    => 'Tanah atas',
            'tanah-bawah'   => 'Tanah bawah',
            'batuan-lapuk'  => 'Lapuk',
            'batuan-dasar'  => 'Batuan dasar',
            'kerak-bumi'    => 'Kerak',
        ][$slug] ?? $name;
    }
}

if (!function_exists('reading_time')) {
    function reading_time(string $text): int
    {
        $words = str_word_count(strip_tags($text));
        return max(1, (int) ceil($words / 200));
    }
}

if (!function_exists('format_date_id')) {
    function format_date_id(?string $datetime): string
    {
        if (!$datetime) {
            return '';
        }
        $time = strtotime($datetime);
        if ($time === false) {
            return '';
        }
        $months = [
            1 => 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
        ];
        return date('j', $time) . ' ' . $months[(int) date('n', $time)] . ' ' . date('Y', $time);
    }
}

if (!function_exists('datetime_iso')) {
    function datetime_iso(?string $datetime): string
    {
        $time = $datetime ? strtotime($datetime) : false;
        return $time === false ? '' : date('c', $time);
    }
}

if (!function_exists('slugify')) {
    function slugify(string $text): string
    {
        $text = strtolower(trim($text));
        $text = preg_replace('/[^a-z0-9]+/', '-', $text) ?? '';
        return trim($text, '-');
    }
}

if (!function_exists('excerpt_text')) {
    function excerpt_text(string $text, int $limit = 160): string
    {
        $plain = trim(preg_replace('/\s+/u', ' ', strip_tags($text)) ?? '');
        if (mb_strlen($plain, 'UTF-8') <= $limit) {
            return $plain;
        }
        $cut = mb_substr($plain, 0, $limit, 'UTF-8');
        $space = mb_strrpos($cut, ' ', 0, 'UTF-8');
        if ($space !== false) {
            $cut = mb_substr($cut, 0, $space, 'UTF-8');
        }
        return rtrim($cut, " ,.;:") . '…';
    }
}

if (!function_exists('media_url')) {
    /**
     * Path gambar dari seed (relatif terhadap assets/img) atau upload admin.
     */
    function media_url(?string $path, string $fallback = '/assets/img/placeholder.svg'): string
    {
        $path = $path !== null ? trim($path) : '';
        if ($path === '') {
            return url($fallback);
        }
        if (preg_match('#^https?://#i', $path)) {
            return $path;
        }
        $path = ltrim(str_replace('\\', '/', $path), '/');
        if (str_starts_with($path, 'uploads/')) {
            return url('/' . $path);
        }
        if (str_starts_with($path, 'assets/')) {
            return url('/' . $path);
        }
        return url('/assets/img/' . $path);
    }
}

if (!function_exists('media_webp')) {
    /**
     * Varian WebP hanya tersedia untuk pelat ilustrasi yang dibuat sendiri.
     */
    function media_webp(?string $path): ?string
    {
        $path = $path !== null ? ltrim(str_replace('\\', '/', trim($path)), '/') : '';
        if ($path === '' || !str_ends_with(strtolower($path), '.svg')) {
            return null;
        }
        if (str_starts_with($path, 'uploads/') || str_starts_with($path, 'assets/')) {
            return null;
        }
        $webp = preg_replace('/\.svg$/i', '.webp', $path);
        if (!is_file(BASE_PATH . '/public/assets/img/' . $webp)) {
            return null;
        }
        return url('/assets/img/' . $webp);
    }
}

if (!function_exists('article_prepare')) {
    /**
     * Beri id pada setiap <h2> dan susun daftar isi.
     *
     * @return array{html: string, toc: array<int, array{id: string, text: string}>}
     */
    function article_prepare(string $html): array
    {
        if (trim($html) === '') {
            return ['html' => '', 'toc' => []];
        }

        $doc = new DOMDocument('1.0', 'UTF-8');
        $previous = libxml_use_internal_errors(true);
        $doc->loadHTML(
            '<?xml encoding="UTF-8"><!doctype html><html><body><div id="article-body">' . $html . '</div></body></html>',
            LIBXML_HTML_NODEFDTD
        );
        libxml_clear_errors();
        libxml_use_internal_errors($previous);

        $xpath = new DOMXPath($doc);
        $root = $xpath->query('//div[@id="article-body"]')->item(0);
        if (!$root instanceof DOMElement) {
            return ['html' => $html, 'toc' => []];
        }

        $toc = [];
        $used = [];
        foreach ($doc->getElementsByTagName('h2') as $heading) {
            if (!$heading instanceof DOMElement) {
                continue;
            }
            $text = trim(preg_replace('/\s+/u', ' ', $heading->textContent) ?? '');
            if ($text === '') {
                continue;
            }
            $base = slugify($text);
            if ($base === '') {
                $base = 'bagian';
            }
            $id = $base;
            $counter = 2;
            while (isset($used[$id])) {
                $id = $base . '-' . $counter;
                $counter += 1;
            }
            $used[$id] = true;
            $heading->setAttribute('id', $id);
            $toc[] = ['id' => $id, 'text' => $text];
        }

        $output = '';
        foreach ($root->childNodes as $child) {
            $output .= $doc->saveHTML($child);
        }

        return ['html' => $output, 'toc' => $toc];
    }
}

if (!function_exists('sanitize_article_html')) {
    /**
     * Whitelist tag untuk isi artikel dari panel admin.
     * Seed dipercaya, tetapi input admin tetap dibersihkan sebelum disimpan.
     */
    function sanitize_article_html(string $html): string
    {
        $allowed = [
            'p' => true, 'h2' => true, 'h3' => true, 'blockquote' => true,
            'ul' => true, 'ol' => true, 'li' => true, 'strong' => true,
            'em' => true, 'b' => true, 'i' => true, 'a' => true, 'br' => true,
        ];

        $doc = new DOMDocument('1.0', 'UTF-8');
        $previous = libxml_use_internal_errors(true);
        $doc->loadHTML(
            '<?xml encoding="UTF-8"><!doctype html><html><body><div id="sanitize-root">' . $html . '</div></body></html>',
            LIBXML_HTML_NODEFDTD
        );
        libxml_clear_errors();
        libxml_use_internal_errors($previous);

        $xpath = new DOMXPath($doc);
        $root = $xpath->query('//div[@id="sanitize-root"]')->item(0);
        if (!$root instanceof DOMElement) {
            return '';
        }

        $clean = static function (DOMNode $node) use (&$clean, $allowed, $doc): void {
            if ($node instanceof DOMComment) {
                $node->parentNode?->removeChild($node);
                return;
            }
            if (!$node instanceof DOMElement) {
                return;
            }

            $tag = strtolower($node->tagName);
            if (!isset($allowed[$tag])) {
                if (in_array($tag, ['script', 'style', 'iframe', 'object', 'embed', 'svg', 'math'], true)) {
                    $node->parentNode?->removeChild($node);
                    return;
                }
                // Tag tidak dikenal: pertahankan isinya, buang pembungkusnya.
                $parent = $node->parentNode;
                if ($parent !== null) {
                    while ($node->firstChild !== null) {
                        $parent->insertBefore($node->firstChild, $node);
                    }
                    $parent->removeChild($node);
                }
                return;
            }

            if ($tag === 'a') {
                $href = trim($node->getAttribute('href'));
                $safe = preg_match('#^https?://#i', $href) || str_starts_with($href, 'mailto:');
                foreach (iterator_to_array($node->attributes) as $attribute) {
                    $node->removeAttribute($attribute->name);
                }
                if ($safe) {
                    $node->setAttribute('href', $href);
                    $node->setAttribute('rel', 'noopener noreferrer');
                }
            } else {
                foreach (iterator_to_array($node->attributes) as $attribute) {
                    $node->removeAttribute($attribute->name);
                }
            }

            foreach (iterator_to_array($node->childNodes) as $child) {
                $clean($child);
            }
        };

        foreach (iterator_to_array($root->childNodes) as $child) {
            $clean($child);
        }

        $output = '';
        foreach ($root->childNodes as $child) {
            $output .= $doc->saveHTML($child);
        }
        return trim($output);
    }
}

if (!function_exists('sources_parse')) {
    /**
     * @return array<int, array{nama: string, url: string}>
     */
    function sources_parse(?string $text): array
    {
        $sources = [];
        foreach (preg_split('/\R/u', (string) $text) ?: [] as $line) {
            $line = trim($line);
            if ($line === '' || !str_contains($line, '|')) {
                continue;
            }
            [$name, $url] = array_map('trim', explode('|', $line, 2));
            if ($name === '' || !preg_match('#^https?://#i', $url)) {
                continue;
            }
            $sources[] = ['nama' => $name, 'url' => $url];
        }
        return $sources;
    }
}

if (!function_exists('query_url')) {
    /**
     * Bangun URL dengan query yang dipertahankan (filter, pencarian, halaman).
     *
     * @param array<string, scalar|null> $params
     */
    function query_url(string $path, array $params = []): string
    {
        $params = array_filter(
            $params,
            static fn(mixed $value): bool => $value !== null && $value !== '' && $value !== false
        );
        $query = http_build_query($params, '', '&', PHP_QUERY_RFC3986);
        return url($path) . ($query !== '' ? '?' . $query : '');
    }
}

if (!function_exists('old')) {
    function old(string $key, mixed $default = ''): string
    {
        $value = $_SESSION['_old'][$key] ?? $default;
        return is_string($value) ? $value : (string) $default;
    }
}

if (!function_exists('keep_old')) {
    function keep_old(array $data): void
    {
        $safe = [];
        foreach ($data as $key => $value) {
            if (is_scalar($value)) {
                $safe[$key] = (string) $value;
            }
        }
        $_SESSION['_old'] = $safe;
    }
}

if (!function_exists('clear_old')) {
    function clear_old(): void
    {
        unset($_SESSION['_old']);
    }
}

if (!function_exists('csrf_field')) {
    function csrf_field(): string
    {
        return '<input type="hidden" name="_token" value="' . e(\App\Core\Session::csrfToken()) . '">';
    }
}

if (!function_exists('flash')) {
    function flash(string $key, mixed $default = null): mixed
    {
        return \App\Core\Session::pullFlash($key, $default);
    }
}

if (!function_exists('image_url')) {
    function image_url(?string $path, string $fallback = '/assets/img/placeholder.svg'): string
    {
        if (!$path) {
            return url($fallback);
        }
        if (preg_match('#^https?://#i', $path)) {
            return $path;
        }
        return url('/' . ltrim($path, '/'));
    }
}

if (!function_exists('db')) {
    function db(): PDO
    {
        return Database::connection();
    }
}
