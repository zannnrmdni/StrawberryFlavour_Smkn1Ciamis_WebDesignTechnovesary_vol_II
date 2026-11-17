<?php

namespace App\Models;

use App\Core\Database;

final class Article
{
    private const SELECT = 'SELECT a.*, l.nama AS layer_nama, l.slug AS layer_slug, l.warna_hex,
        l.kedalaman_min_m, l.kedalaman_max_m, l.suhu_perkiraan
        FROM articles a
        LEFT JOIN layers l ON l.id = a.layer_id';

    /** @return array<string, mixed> */
    private static function hydrate(array $row): array
    {
        $row['id'] = (int) $row['id'];
        $row['layer_id'] = $row['layer_id'] !== null ? (int) $row['layer_id'] : null;
        $row['warna'] = $row['warna_hex'] ?? '#F3C64F';
        $row['ink'] = layer_ink($row['warna']);
        $row['reading_time'] = reading_time((string) ($row['isi'] ?? ''));
        $row['tanggal'] = format_date_id($row['created_at'] ?? null);
        $row['tanggal_iso'] = datetime_iso($row['created_at'] ?? null);
        $row['diperbarui_iso'] = datetime_iso($row['updated_at'] ?? $row['created_at'] ?? null);
        $row['sumber_list'] = sources_parse($row['sumber'] ?? null);
        $row['gambar_url'] = media_url($row['gambar'] ?? null);
        $row['gambar_webp'] = media_webp($row['gambar'] ?? null);
        $row['ringkasan_pendek'] = excerpt_text((string) ($row['ringkasan'] ?? ''), 150);
        return $row;
    }

    /** @return array<int, array<string, mixed>> */
    public static function latest(int $limit = 3): array
    {
        $limit = max(1, min(12, $limit));
        $rows = Database::fetchAll(
            self::SELECT . " WHERE a.status = 'published' ORDER BY a.created_at DESC, a.id DESC LIMIT {$limit}"
        );
        return array_map([self::class, 'hydrate'], $rows);
    }

    /** @return array<int, array<string, mixed>> */
    public static function allPublished(): array
    {
        $rows = Database::fetchAll(
            self::SELECT . " WHERE a.status = 'published' ORDER BY a.created_at DESC, a.id DESC"
        );
        return array_map([self::class, 'hydrate'], $rows);
    }

    /**
     * @return array{items: array<int, array<string, mixed>>, total: int, pages: int, page: int}
     */
    public static function paginate(?string $search, ?int $layerId, int $page, int $perPage = 6): array
    {
        $perPage = max(1, min(24, $perPage));
        $page = max(1, $page);

        $where = ["a.status = 'published'"];
        $params = [];

        if ($layerId !== null) {
            $where[] = 'a.layer_id = ?';
            $params[] = $layerId;
        }

        $search = $search !== null ? trim($search) : '';
        if ($search !== '') {
            $search = mb_substr($search, 0, 200, 'UTF-8');
            $escaped = str_replace(['!', '%', '_'], ['!!', '!%', '!_'], $search);
            $like = '%' . $escaped . '%';
            $where[] = "(a.judul LIKE ? ESCAPE '!' OR a.ringkasan LIKE ? ESCAPE '!' OR a.isi LIKE ? ESCAPE '!')";
            $params[] = $like;
            $params[] = $like;
            $params[] = $like;
        }

        $whereSql = implode(' AND ', $where);
        $total = (int) Database::scalar(
            "SELECT COUNT(*) FROM articles a WHERE {$whereSql}",
            $params
        );
        $pages = max(1, (int) ceil($total / $perPage));
        $page = min($page, $pages);
        $offset = ($page - 1) * $perPage;

        $rows = Database::fetchAll(
            self::SELECT . " WHERE {$whereSql} ORDER BY a.created_at DESC, a.id DESC LIMIT {$perPage} OFFSET {$offset}",
            $params
        );

        return [
            'items' => array_map([self::class, 'hydrate'], $rows),
            'total' => $total,
            'pages' => $pages,
            'page' => $page,
        ];
    }

    public static function findBySlug(string $slug): ?array
    {
        $row = Database::fetch(
            self::SELECT . " WHERE a.slug = ? AND a.status = 'published' LIMIT 1",
            [$slug]
        );
        return $row === null ? null : self::hydrate($row);
    }

    /** @return array<int, array<string, mixed>> */
    public static function related(int $articleId, ?int $layerId, int $limit = 3): array
    {
        $limit = max(1, min(6, $limit));
        $items = [];

        if ($layerId !== null) {
            $rows = Database::fetchAll(
                self::SELECT . " WHERE a.status = 'published' AND a.id <> ? AND a.layer_id = ?
                 ORDER BY a.created_at DESC, a.id DESC LIMIT {$limit}",
                [$articleId, $layerId]
            );
            $items = array_map([self::class, 'hydrate'], $rows);
        }

        if (count($items) < $limit) {
            $exclude = array_merge([$articleId], array_column($items, 'id'));
            $placeholders = implode(',', array_fill(0, count($exclude), '?'));
            $rows = Database::fetchAll(
                self::SELECT . " WHERE a.status = 'published' AND a.id NOT IN ({$placeholders})
                 ORDER BY a.created_at DESC, a.id DESC LIMIT " . ($limit - count($items)),
                $exclude
            );
            $items = array_merge($items, array_map([self::class, 'hydrate'], $rows));
        }

        return array_slice($items, 0, $limit);
    }

    /** @return array<int, int> Jumlah artikel per layer_id. */
    public static function countsByLayer(): array
    {
        $rows = Database::fetchAll(
            "SELECT layer_id, COUNT(*) AS jumlah FROM articles
             WHERE status = 'published' GROUP BY layer_id"
        );
        $counts = [];
        foreach ($rows as $row) {
            if ($row['layer_id'] !== null) {
                $counts[(int) $row['layer_id']] = (int) $row['jumlah'];
            }
        }
        return $counts;
    }

    public static function countPublished(): int
    {
        return (int) Database::scalar("SELECT COUNT(*) FROM articles WHERE status = 'published'");
    }

    /* ---------- Panel admin ---------- */

    /** @return array<int, array<string, mixed>> */
    public static function allForAdmin(): array
    {
        $rows = Database::fetchAll(self::SELECT . ' ORDER BY a.created_at DESC, a.id DESC');
        return array_map([self::class, 'hydrate'], $rows);
    }

    public static function findById(int $id): ?array
    {
        $row = Database::fetch(self::SELECT . ' WHERE a.id = ? LIMIT 1', [$id]);
        return $row === null ? null : self::hydrate($row);
    }

    public static function slugExists(string $slug, ?int $exceptId = null): bool
    {
        if ($exceptId === null) {
            return (bool) Database::scalar('SELECT COUNT(*) FROM articles WHERE slug = ?', [$slug]);
        }
        return (bool) Database::scalar('SELECT COUNT(*) FROM articles WHERE slug = ? AND id <> ?', [$slug, $exceptId]);
    }

    /** @param array<string, mixed> $data */
    public static function create(array $data): int
    {
        return Database::insert(
            'INSERT INTO articles (layer_id, judul, slug, ringkasan, isi, sumber, gambar, penulis, status, created_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
            [
                $data['layer_id'], $data['judul'], $data['slug'], $data['ringkasan'],
                $data['isi'], $data['sumber'], $data['gambar'], $data['penulis'], $data['status'],
            ]
        );
    }

    /** @param array<string, mixed> $data */
    public static function update(int $id, array $data): void
    {
        Database::statement(
            'UPDATE articles SET layer_id = ?, judul = ?, slug = ?, ringkasan = ?, isi = ?,
             sumber = ?, gambar = ?, penulis = ?, status = ? WHERE id = ?',
            [
                $data['layer_id'], $data['judul'], $data['slug'], $data['ringkasan'],
                $data['isi'], $data['sumber'], $data['gambar'], $data['penulis'], $data['status'], $id,
            ]
        );
    }

    public static function delete(int $id): void
    {
        Database::statement('DELETE FROM articles WHERE id = ?', [$id]);
    }
}
