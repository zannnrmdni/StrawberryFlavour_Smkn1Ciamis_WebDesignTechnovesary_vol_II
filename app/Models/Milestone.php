<?php

namespace App\Models;

use App\Core\Database;

final class Milestone
{
    /** @return array<string, mixed> */
    private static function hydrate(array $row): array
    {
        $row['id'] = (int) $row['id'];
        $row['layer_id'] = (int) $row['layer_id'];
        $row['kedalaman_m'] = (float) $row['kedalaman_m'];
        $row['depth_label'] = format_depth($row['kedalaman_m']);
        $illustration = (string) ($row['ilustrasi_svg'] ?? '');
        $row['image_url'] = str_starts_with($illustration, 'uploads/') || str_starts_with($illustration, 'assets/')
            ? media_url($illustration)
            : media_url('milestones/' . $illustration);
        return $row;
    }

    /** @return array<int, array<string, mixed>> */
    public static function forLayer(int $layerId): array
    {
        $rows = Database::fetchAll(
            'SELECT * FROM milestones WHERE layer_id = ? ORDER BY kedalaman_m ASC',
            [$layerId]
        );
        return array_map([self::class, 'hydrate'], $rows);
    }

    public static function find(int $id): ?array
    {
        $row = Database::fetch(
            'SELECT m.*, l.nama AS layer_nama, l.slug AS layer_slug, l.warna_hex
             FROM milestones m
             JOIN layers l ON l.id = m.layer_id
             WHERE m.id = ? LIMIT 1',
            [$id]
        );
        return $row === null ? null : self::hydrate($row);
    }

    /**
     * Penanda pilihan untuk bagian fakta di beranda.
     *
     * @param array<int, int> $ids
     * @return array<int, array<string, mixed>>
     */
    public static function highlights(array $ids): array
    {
        $ids = array_values(array_filter(array_map('intval', $ids), static fn(int $id): bool => $id > 0));
        if ($ids === []) {
            return [];
        }
        $placeholders = implode(',', array_fill(0, count($ids), '?'));
        $rows = Database::fetchAll(
            "SELECT m.*, l.nama AS layer_nama, l.slug AS layer_slug, l.warna_hex
             FROM milestones m
             JOIN layers l ON l.id = m.layer_id
             WHERE m.id IN ({$placeholders})
             ORDER BY FIELD(m.id, {$placeholders})",
            array_merge($ids, $ids)
        );
        return array_map([self::class, 'hydrate'], $rows);
    }

    public static function countAll(): int
    {
        return (int) Database::scalar('SELECT COUNT(*) FROM milestones');
    }

    /** @return array<int, array{nama: string, url: string}> */
    public static function sources(): array
    {
        return Database::fetchAll(
            'SELECT sumber_nama AS nama, sumber_url AS url
             FROM milestones
             GROUP BY sumber_nama, sumber_url
             ORDER BY sumber_nama ASC'
        );
    }

    /** @return array<int, array<string, mixed>> */
    public static function allForAdmin(): array
    {
        $rows = Database::fetchAll(
            'SELECT m.*, l.nama AS layer_nama, l.warna_hex
             FROM milestones m
             JOIN layers l ON l.id = m.layer_id
             ORDER BY l.urutan ASC, m.kedalaman_m ASC, m.id ASC'
        );
        return array_map([self::class, 'hydrate'], $rows);
    }

    /** @param array<string, mixed> $data */
    public static function create(array $data): int
    {
        return Database::insert(
            'INSERT INTO milestones (layer_id, nama, jenis, kedalaman_m, keterangan, ilustrasi_svg, sumber_url, sumber_nama)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [
                $data['layer_id'], $data['nama'], $data['jenis'], $data['kedalaman_m'],
                $data['keterangan'], $data['ilustrasi_svg'], $data['sumber_url'], $data['sumber_nama'],
            ]
        );
    }

    /** @param array<string, mixed> $data */
    public static function update(int $id, array $data): void
    {
        Database::statement(
            'UPDATE milestones SET layer_id = ?, nama = ?, jenis = ?, kedalaman_m = ?, keterangan = ?,
             ilustrasi_svg = ?, sumber_url = ?, sumber_nama = ? WHERE id = ?',
            [
                $data['layer_id'], $data['nama'], $data['jenis'], $data['kedalaman_m'],
                $data['keterangan'], $data['ilustrasi_svg'], $data['sumber_url'], $data['sumber_nama'], $id,
            ]
        );
    }

    public static function delete(int $id): void
    {
        Database::statement('DELETE FROM milestones WHERE id = ?', [$id]);
    }
}
