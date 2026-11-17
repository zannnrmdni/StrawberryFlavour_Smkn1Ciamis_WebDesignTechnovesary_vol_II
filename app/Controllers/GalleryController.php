<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Models\Gallery;

final class GalleryController extends Controller
{
    public function index(): void
    {
        $categories = Gallery::categories();
        $active = trim((string) ($_GET['kategori'] ?? ''));

        $valid = array_column($categories, 'kategori');
        if ($active !== '' && !in_array($active, $valid, true)) {
            $active = '';
        }

        $items = Gallery::all($active !== '' ? $active : null);

        $this->view('gallery/index', [
            'pageTitle'       => $active !== '' ? 'Galeri: ' . $active : 'Galeri',
            'metaDescription' => 'Dua belas pelat ilustrasi tentang tanah, akar, gua, batuan, dan jejak manusia di kerak bumi. Setiap gambar punya lokasi dan kredit.',
            'bodyClass'       => 'is-gallery',
            'items'           => $items,
            'categories'      => $categories,
            'active'          => $active,
            'total'           => Gallery::countAll(),
        ]);
    }
}
