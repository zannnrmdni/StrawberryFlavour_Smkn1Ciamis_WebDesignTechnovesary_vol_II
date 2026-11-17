<?php

namespace App\Models;

use App\Core\Database;

final class User
{
    public static function findByUsername(string $username): ?array
    {
        return Database::fetch(
            'SELECT * FROM users WHERE username = ? LIMIT 1',
            [$username]
        );
    }

    public static function find(int $id): ?array
    {
        return Database::fetch('SELECT * FROM users WHERE id = ? LIMIT 1', [$id]);
    }
}
