<?php

namespace App\Models;

use App\Core\Database;

final class LoginAttempt
{
    public static function record(string $ipHash, string $username, bool $success): void
    {
        Database::insert(
            'INSERT INTO login_attempts (ip_hash, username, berhasil, created_at) VALUES (?, ?, ?, NOW())',
            [$ipHash, mb_substr($username, 0, 60, 'UTF-8'), $success ? 1 : 0]
        );
    }

    public static function failures(string $ipHash, int $windowSeconds): int
    {
        return (int) Database::scalar(
            'SELECT COUNT(*) FROM login_attempts
             WHERE ip_hash = ? AND berhasil = 0 AND created_at >= (NOW() - INTERVAL ? SECOND)',
            [$ipHash, max(1, $windowSeconds)]
        );
    }

    public static function clear(string $ipHash): void
    {
        Database::statement('DELETE FROM login_attempts WHERE ip_hash = ?', [$ipHash]);
    }

    public static function prune(int $olderThanSeconds = 86400): void
    {
        Database::statement(
            'DELETE FROM login_attempts WHERE created_at < (NOW() - INTERVAL ? SECOND)',
            [max(3600, $olderThanSeconds)]
        );
    }
}
