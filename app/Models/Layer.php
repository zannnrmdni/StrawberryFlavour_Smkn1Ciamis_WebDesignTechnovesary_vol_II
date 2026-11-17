<?php

namespace App\Models;

use App\Core\Database;

final class Layer
{
    /** @return array<int, array<string, mixed>> */
    public static function all(): array
    {
        return Database::fetchAll(
            'SELECT * FROM layers ORDER BY urutan ASC'
        );
    }

    /** @return array<int, array<string, mixed>> */
    public static function allWithMilestones(): array
    {
        $layers = self::all();
        if ($layers === []) {
            return [];
        }

        $milestones = Database::fetchAll(
            'SELECT * FROM milestones ORDER BY kedalaman_m ASC, id ASC'
        );

        $grouped = [];
        foreach ($milestones as $milestone) {
            $grouped[(int) $milestone['layer_id']][] = $milestone;
        }

        foreach ($layers as &$layer) {
            $layer['milestones'] = $grouped[(int) $layer['id']] ?? [];
        }

        return $layers;
    }

    public static function findBySlug(string $slug): ?array
    {
        return Database::fetch(
            'SELECT * FROM layers WHERE slug = ? LIMIT 1',
            [$slug]
        );
    }
}
