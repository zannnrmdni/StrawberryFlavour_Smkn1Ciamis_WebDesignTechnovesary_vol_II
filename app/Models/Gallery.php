<?php

namespace App\Models;

use App\Core\Database;

final class Gallery
{
    /** @return array<string, mixed> */
    private static function hydrate(array $row): array
    {
        $row['id'] = (int) $row['id'];
        $row['gambar_url'] = media_url($row['gambar'] ?? null);
        $row['gambar_webp'] = media_webp($row['gambar'] ?? null);
        $row['tanggal'] = format_date_id($row['created_at'] ?? null);
        return $row;
    }

    /** @return array<int, array<string, mixed>> */
    public static function all(?string $category = null): array
    {
        if ($category !== null && $category !== '') {
            $rows = Database::fetchAll(
                'SELECT * FROM gallery WHERE kategori = ? ORDER BY created_at DESC, id DESC',
                [$category]
            );
        } else {
            $rows = Database::fetchAll('SELECT * FROM gallery ORDER BY created_at DESC, id DESC');
        }
        return array_map([self::class, 'hydrate'], $rows);
    }

    /** @return array<int, array<string, mixed>> */
    public static function latest(int $limit = 6): array
    {
        $limit = max(1, min(18, $limit));
        $rows = Database::fetchAll(
            "SELECT * FROM gallery ORDER BY created_at DESC, id DESC LIMIT {$limit}"
        );
        return array_map([self::class, 'hydrate'], $rows);
    }

    /** @return array<int, array{kategori: string, jumlah: int}> */
    public static function categories(): array
    {
        return Database::fetchAll(
            'SELECT kategori, COUNT(*) AS jumlah FROM gallery
             GROUP BY kategori ORDER BY kategori ASC'
        );
    }

    public static function countAll(): int
    {
        return (int) Database::scalar('SELECT COUNT(*) FROM gallery');
    }

    public static function find(int $id): ?array
    {
        $row = Database::fetch('SELECT * FROM gallery WHERE id = ? LIMIT 1', [$id]);
        return $row === null ? null : self::hydrate($row);
    }

    /** @return array<int, array<string, mixed>> */
    public static function allForAdmin(): array
    {
        $rows = Database::fetchAll('SELECT * FROM gallery ORDER BY created_at DESC, id DESC');
        return array_map([self::class, 'hydrate'], $rows);
    }

    /** @param array<string, mixed> $data */
    public static function create(array $data): int
    {
        return Database::insert(
            'INSERT INTO gallery (judul, deskripsi, lokasi, gambar, kategori, kredit_foto, created_at)
             VALUES (?, ?, ?, ?, ?, ?, NOW())',
            [
                $data['judul'], $data['deskripsi'], $data['lokasi'], $data['gambar'],
                $data['kategori'], $data['kredit_foto'],
            ]
        );
    }

    /** @param array<string, mixed> $data */
    public static function update(int $id, array $data): void
    {
        Database::statement(
            'UPDATE gallery SET judul = ?, deskripsi = ?, lokasi = ?, gambar = ?, kategori = ?, kredit_foto = ?
             WHERE id = ?',
            [
                $data['judul'], $data['deskripsi'], $data['lokasi'], $data['gambar'],
                $data['kategori'], $data['kredit_foto'], $id,
            ]
        );
    }

    public static function delete(int $id): void
    {
        Database::statement('DELETE FROM gallery WHERE id = ?', [$id]);
    }
}
