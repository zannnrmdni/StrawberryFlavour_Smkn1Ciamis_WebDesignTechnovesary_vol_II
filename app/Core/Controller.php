<?php

namespace App\Core;

abstract class Controller
{
    protected function view(string $view, array $data = [], string $layout = 'main'): void
    {
        $viewFile = BASE_PATH . '/app/Views/' . trim($view, '/') . '.php';
        if (!is_file($viewFile)) {
            throw new \RuntimeException('View tidak ditemukan: ' . $view);
        }

        $data['pageTitle'] = $data['pageTitle'] ?? (string) config('app.name');
        $data['metaDescription'] = $data['metaDescription'] ?? (string) config('app.tagline');

        extract($data, EXTR_SKIP);
        ob_start();
        require $viewFile;
        $content = (string) ob_get_clean();

        if ($layout === '') {
            echo $content;
            return;
        }

        $layoutFile = BASE_PATH . '/app/Views/layouts/' . trim($layout, '/') . '.php';
        if (!is_file($layoutFile)) {
            throw new \RuntimeException('Layout tidak ditemukan: ' . $layout);
        }

        require $layoutFile;
    }

    protected function redirect(string $path, int $status = 302): never
    {
        header('Location: ' . url($path), true, $status);
        exit;
    }

    protected function json(array $data, int $status = 200): never
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    protected function abort(int $status, string $message = ''): never
    {
        http_response_code($status);
        if ($status === 404) {
            $this->view('errors/404', [
                'pageTitle' => 'Halaman tidak ditemukan',
            ], '');
            exit;
        }

        throw new \RuntimeException($message !== '' ? $message : 'Permintaan tidak dapat diproses.');
    }
}
