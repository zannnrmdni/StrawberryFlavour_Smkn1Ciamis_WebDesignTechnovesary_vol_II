<?php

declare(strict_types=1);

use App\Core\Router;
use App\Core\Session;

define('BASE_PATH', dirname(__DIR__));

require BASE_PATH . '/app/Core/helpers.php';

$config = config();
$debug = (bool) $config['app']['debug'];

error_reporting(E_ALL);
ini_set('display_errors', $debug ? '1' : '0');
ini_set('log_errors', '1');
ini_set('error_log', BASE_PATH . '/storage/logs/php-error.log');

spl_autoload_register(static function (string $class): void {
    $prefix = 'App\\';
    if (!str_starts_with($class, $prefix)) {
        return;
    }
    $relative = str_replace('\\', '/', substr($class, strlen($prefix)));
    $file = BASE_PATH . '/app/' . $relative . '.php';
    if (is_file($file)) {
        require $file;
    }
});

$script = str_replace('\\', '/', $_SERVER['SCRIPT_NAME'] ?? '/index.php');
$directory = '';
if (str_ends_with($script, '/index.php')) {
    $directory = rtrim(substr($script, 0, -strlen('/index.php')), '/');
} elseif ($script === '/index.php') {
    $directory = '';
}
$GLOBALS['APP_BASE_PATH'] = $directory;

Session::start();

$router = new Router();
$routes = require BASE_PATH . '/config/routes.php';
$routes($router);

try {
    $router->dispatch(
        $_SERVER['REQUEST_METHOD'] ?? 'GET',
        $_SERVER['REQUEST_URI'] ?? '/'
    );
} catch (Throwable $exception) {
    error_log((string) $exception);

    if (!headers_sent()) {
        http_response_code(500);
        header('Content-Type: text/html; charset=utf-8');
    }

    $debugMessage = $debug
        ? $exception->getMessage() . "\n\n" . $exception->getFile() . ':' . $exception->getLine()
        : null;

    require BASE_PATH . '/app/Views/errors/500.php';
}
