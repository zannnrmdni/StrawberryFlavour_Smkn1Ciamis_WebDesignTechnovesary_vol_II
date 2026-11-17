<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Models\Article;
use App\Models\Gallery;
use App\Models\Layer;
use App\Models\Milestone;

final class PageController extends Controller
{
    public function about(): void
    {
        $layers = Layer::all();
        $sources = [];

        foreach (Milestone::sources() as $source) {
            $sources[$source['url']] = $source;
        }
        foreach (Article::allPublished() as $article) {
            foreach ($article['sumber_list'] as $source) {
                $sources[$source['url']] = $source;
            }
        }
        uasort($sources, static fn(array $a, array $b): int => strcasecmp($a['nama'], $b['nama']));

        $licenses = [
            [
                'nama' => 'Gabarito',
                'pemilik' => 'Rodrigo Fuenzalida',
                'lisensi' => 'SIL Open Font License 1.1',
                'catatan' => 'Font judul, disimpan sendiri sebagai WOFF2.',
                'url' => 'https://fonts.google.com/specimen/Gabarito',
            ],
            [
                'nama' => 'Literata',
                'pemilik' => 'Type Together untuk Google',
                'lisensi' => 'SIL Open Font License 1.1',
                'catatan' => 'Font isi dan kutipan, disimpan sendiri sebagai WOFF2.',
                'url' => 'https://fonts.google.com/specimen/Literata',
            ],
            [
                'nama' => 'Three.js',
                'pemilik' => 'Three.js Authors',
                'lisensi' => 'MIT',
                'catatan' => 'Bumi 3D dan potongan kerak. Berkas vendor disimpan lokal.',
                'url' => 'https://threejs.org/',
            ],
            [
                'nama' => 'GSAP + ScrollTrigger',
                'pemilik' => 'GreenSock / Webflow',
                'lisensi' => 'GSAP Standard License (gratis untuk situs ini)',
                'catatan' => 'Animasi gulir. Tidak memakai plugin berbayar.',
                'url' => 'https://gsap.com/standard-license/',
            ],
            [
                'nama' => 'Blue Marble Earth',
                'pemilik' => 'NASA Visible Earth',
                'lisensi' => 'Public domain (kredit NASA)',
                'catatan' => 'Tekstur bumi di pembuka dan potongan.',
                'url' => 'https://visibleearth.nasa.gov/collection/1484/blue-marble',
            ],
            [
                'nama' => 'Ilustrasi penanda, galeri, dan sampul',
                'pemilik' => 'Tim Bumi Bawah',
                'lisensi' => 'CC BY 4.0',
                'catatan' => 'Dibuat sendiri sebagai SVG, lalu diekspor ke WebP. Boleh dipakai ulang dengan atribusi.',
                'url' => 'https://creativecommons.org/licenses/by/4.0/deed.id',
            ],
            [
                'nama' => 'Tailwind CSS',
                'pemilik' => 'Tailwind Labs',
                'lisensi' => 'MIT',
                'catatan' => 'Disusun lewat CLI, bukan CDN.',
                'url' => 'https://tailwindcss.com/',
            ],
        ];

        $this->view('pages/about', [
            'pageTitle'       => 'Tentang proyek',
            'metaDescription' => 'Tujuan Bumi Bawah, siapa yang membuatnya, sumber referensi yang dipakai, dan lisensi setiap aset.',
            'bodyClass'       => 'is-about',
            'layers'          => $layers,
            'sources'         => array_values($sources),
            'licenses'        => $licenses,
            'articleCount'    => Article::countPublished(),
            'galleryCount'    => Gallery::countAll(),
            'milestoneCount'  => Milestone::countAll(),
        ]);
    }
}
