<?php

namespace App\Models;

use App\Core\Database;

final class Message
{
    /** @param array<string, mixed> $data */
    public static function create(array $data): int
    {
        return Database::insert(
            'INSERT INTO messages (nama, email, subjek, pesan, ip_hash, created_at)
             VALUES (?, ?, ?, ?, ?, NOW())',
            [$data['nama'], $data['email'], $data['subjek'], $data['pesan'], $data['ip_hash']]
        );
    }

    public static function countFromIp(string $ipHash, int $windowSeconds): int
    {
        return (int) Database::scalar(
            'SELECT COUNT(*) FROM messages WHERE ip_hash = ? AND created_at >= (NOW() - INTERVAL ? SECOND)',
            [$ipHash, max(1, $windowSeconds)]
        );
    }

    /**
     * @return array{items: array<int, array<string, mixed>>, total: int, pages: int, page: int}
     */
    public static function paginate(int $page, int $perPage = 20): array
    {
        $perPage = max(1, min(100, $perPage));
        $total = (int) Database::scalar('SELECT COUNT(*) FROM messages');
        $pages = max(1, (int) ceil($total / $perPage));
        $page = min(max(1, $page), $pages);
        $offset = ($page - 1) * $perPage;

        $items = Database::fetchAll(
            "SELECT * FROM messages ORDER BY created_at DESC, id DESC LIMIT {$perPage} OFFSET {$offset}"
        );
        foreach ($items as &$item) {
            $item['tanggal'] = format_date_id($item['created_at'] ?? null);
            $item['dibaca'] = (int) $item['dibaca'] === 1;
        }
        unset($item);

        return ['items' => $items, 'total' => $total, 'pages' => $pages, 'page' => $page];
    }

    /** @return array<int, array<string, mixed>> */
    public static function latest(int $limit = 4): array
    {
        $limit = max(1, min(20, $limit));
        $items = Database::fetchAll(
            "SELECT * FROM messages ORDER BY created_at DESC, id DESC LIMIT {$limit}"
        );
        foreach ($items as &$item) {
            $item['tanggal'] = format_date_id($item['created_at'] ?? null);
            $item['dibaca'] = (int) $item['dibaca'] === 1;
        }
        unset($item);
        return $items;
    }

    public static function unreadCount(): int
    {
        return (int) Database::scalar('SELECT COUNT(*) FROM messages WHERE dibaca = 0');
    }

    public static function countAll(): int
    {
        return (int) Database::scalar('SELECT COUNT(*) FROM messages');
    }

    public static function setRead(int $id, bool $read): void
    {
        Database::statement('UPDATE messages SET dibaca = ? WHERE id = ?', [$read ? 1 : 0, $id]);
    }

    public static function find(int $id): ?array
    {
        return Database::fetch('SELECT * FROM messages WHERE id = ? LIMIT 1', [$id]);
    }

    public static function delete(int $id): void
    {
        Database::statement('DELETE FROM messages WHERE id = ?', [$id]);
    }
}
