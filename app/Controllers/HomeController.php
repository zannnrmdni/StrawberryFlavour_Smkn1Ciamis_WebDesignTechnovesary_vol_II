<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Models\Article;
use App\Models\Gallery;
use App\Models\Layer;
use App\Models\Milestone;

final class HomeController extends Controller
{
    /**
     * Panjang gulir per lapisan, dalam viewport height.
     * Lapisan tipis tetap diberi ruang; kerak bumi diberi ruang paling panjang
     * karena rentangnya 500 m sampai 35 km.
     */
    private const SCROLL_VH = [
        'serasah-humus' => 250,
        'tanah-atas'    => 255,
        'tanah-bawah'   => 260,
        'batuan-lapuk'  => 265,
        'batuan-dasar'  => 240,
        'kerak-bumi'    => 560,
    ];

    public function index(): void
    {
        $layers = Layer::allWithMilestones();
        $previousColor = null;

        foreach ($layers as $index => &$layer) {
            $layer['ink'] = layer_ink($layer['warna_hex']);
            // Lapisan pertama tidak punya lapisan di atasnya, jadi sapuan
            // warna transisi memakai warnanya sendiri (tanpa pita aneh).
            $layer['prev_color'] = $previousColor ?? $layer['warna_hex'];
            $layer['scroll_vh'] = self::SCROLL_VH[$layer['slug']] ?? 250;
            $layer['number'] = $index + 1;
            $layer['depth_range'] = format_depth_range(
                (float) $layer['kedalaman_min_m'],
                (float) $layer['kedalaman_max_m']
            );
            $layer['depth_min_label'] = format_depth($layer['kedalaman_min_m']);
            $layer['depth_max_label'] = format_depth($layer['kedalaman_max_m']);
            $layer['short_name'] = layer_short($layer['slug'], $layer['nama']);

            $count = count($layer['milestones']);
            foreach ($layer['milestones'] as $milestoneIndex => &$milestone) {
                // Posisi kartu di dalam lapisan. Bukan skala linier: kartu diberi
                // jarak baca yang cukup, sementara angka kedalaman tetap asli.
                $milestone['at'] = 0.16 + (($milestoneIndex + 0.5) / max(1, $count)) * 0.68;
                $milestone['depth_label'] = format_depth($milestone['kedalaman_m']);
            }
            unset($milestone);

            $previousColor = $layer['warna_hex'];
        }
        unset($layer);

        $totalMilestones = array_sum(array_map(
            static fn(array $layer): int => count($layer['milestones']),
            $layers
        ));

        $facts = Milestone::highlights([24, 22, 20, 25]);
        foreach ($facts as &$fact) {
            $fact['depth_label'] = format_depth($fact['kedalaman_m']);
        }
        unset($fact);

        $this->view('home/index', [
            'pageTitle'        => 'Seberapa dalam manusia pernah menggali?',
            'metaDescription'  => 'Turun dari serasah sampai batas kerak bumi dan mantel. Jelajahi lapisan tanah, kedalaman sebenarnya, dan makhluk yang hidup di dalamnya.',
            'bodyClass'        => 'is-home',
            'layers'           => $layers,
            'totalMilestones'  => $totalMilestones,
            'latestArticles'   => Article::latest(3),
            'galleryPreview'   => Gallery::latest(6),
            'facts'            => $facts,
            'articleCount'     => Article::countPublished(),
        ]);
    }
}
