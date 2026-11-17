<?php

namespace App\Core;

use Closure;

final class Router
{
    /** @var array<int, array{method: string, pattern: string, regex: string, handler: callable|array}> */
    private array $routes = [];

    private mixed $notFoundHandler = null;

    public function get(string $path, callable|array $handler): void
    {
        $this->add('GET', $path, $handler);
    }

    public function post(string $path, callable|array $handler): void
    {
        $this->add('POST', $path, $handler);
    }

    public function notFound(callable|array $handler): void
    {
        $this->notFoundHandler = $handler;
    }

    private function add(string $method, string $path, callable|array $handler): void
    {
        $path = '/' . trim($path, '/');
        if ($path !== '/') {
            $path = rtrim($path, '/');
        }

        $regex = preg_replace_callback(
            '#\{([a-zA-Z_][a-zA-Z0-9_]*)\}#',
            static fn(array $match): string => '(?P<' . $match[1] . '>[^/]+)',
            $path
        );

        $this->routes[] = [
            'method'  => strtoupper($method),
            'pattern' => $path,
            'regex'   => '#^' . $regex . '$#u',
            'handler' => $handler,
        ];
    }

    public function dispatch(string $method, string $uri): void
    {
        $method = strtoupper($method);
        $path = parse_url($uri, PHP_URL_PATH) ?: '/';
        $path = rawurldecode($path);
        $base = base_path();

        if ($base !== '' && str_starts_with($path, $base)) {
            $path = substr($path, strlen($base)) ?: '/';
        }

        $path = '/' . trim($path, '/');
        if ($path !== '/') {
            $path = rtrim($path, '/');
        }

        foreach ($this->routes as $route) {
            if ($route['method'] !== $method) {
                continue;
            }
            if (!preg_match($route['regex'], $path, $matches)) {
                continue;
            }

            $params = array_filter(
                $matches,
                static fn(mixed $key): bool => is_string($key),
                ARRAY_FILTER_USE_KEY
            );

            $this->invoke($route['handler'], $params);
            return;
        }

        $this->invokeNotFound();
    }

    private function invoke(callable|array $handler, array $params = []): void
    {
        if (is_array($handler) && count($handler) === 2) {
            [$class, $method] = $handler;
            $controller = is_object($class) ? $class : new $class();
            $controller->{$method}(...array_values($params));
            return;
        }

        $handler(...array_values($params));
    }

    private function invokeNotFound(): void
    {
        http_response_code(404);

        if ($this->notFoundHandler === null) {
            echo 'Halaman tidak ditemukan.';
            return;
        }

        $this->invoke($this->notFoundHandler);
    }
}
