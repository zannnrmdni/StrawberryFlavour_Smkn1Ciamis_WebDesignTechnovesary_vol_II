<?php

namespace App\Core;

final class Session
{
    public static function start(): void
    {
        if (session_status() === PHP_SESSION_ACTIVE) {
            return;
        }

        $secure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
            || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');

        session_name((string) config('session.name', 'bumi_session'));
        session_set_cookie_params([
            'lifetime' => 0,
            'path'     => base_path() ?: '/',
            'secure'   => $secure,
            'httponly' => true,
            'samesite' => 'Lax',
        ]);

        session_start();

        if (!isset($_SESSION['_started_at'])) {
            $_SESSION['_started_at'] = time();
            session_regenerate_id(true);
        }
    }

    public static function get(string $key, mixed $default = null): mixed
    {
        return $_SESSION[$key] ?? $default;
    }

    public static function set(string $key, mixed $value): void
    {
        $_SESSION[$key] = $value;
    }

    public static function remove(string $key): void
    {
        unset($_SESSION[$key]);
    }

    public static function flash(string $key, mixed $value): void
    {
        $_SESSION['_flash'][$key] = $value;
    }

    public static function pullFlash(string $key, mixed $default = null): mixed
    {
        if (!isset($_SESSION['_flash'][$key])) {
            return $default;
        }
        $value = $_SESSION['_flash'][$key];
        unset($_SESSION['_flash'][$key]);
        return $value;
    }

    public static function csrfToken(): string
    {
        if (empty($_SESSION['_csrf'])) {
            $_SESSION['_csrf'] = bin2hex(random_bytes(32));
        }
        return $_SESSION['_csrf'];
    }

    public static function verifyCsrf(?string $token): bool
    {
        return is_string($token)
            && $token !== ''
            && isset($_SESSION['_csrf'])
            && hash_equals($_SESSION['_csrf'], $token);
    }

    public static function regenerate(): void
    {
        session_regenerate_id(true);
        unset($_SESSION['_csrf']);
    }

    public static function destroy(): void
    {
        $_SESSION = [];
        if (ini_get('session.use_cookies')) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', [
                'expires'  => time() - 42000,
                'path'     => $params['path'],
                'domain'   => $params['domain'],
                'secure'   => $params['secure'],
                'httponly' => $params['httponly'],
                'samesite' => $params['samesite'] ?? 'Lax',
            ]);
        }
        session_destroy();
    }
}
