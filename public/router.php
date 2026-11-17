<?php
/**
 * Router untuk server bawaan PHP:
 * php -S localhost:8000 -t public public/router.php
 */

$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$file = __DIR__ . str_replace('/', DIRECTORY_SEPARATOR, $path);

if ($path !== '/' && is_file($file)) {
    return false;
}

require __DIR__ . '/index.php';
