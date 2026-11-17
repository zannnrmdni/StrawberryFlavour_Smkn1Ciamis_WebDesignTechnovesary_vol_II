<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Models\Article;
use App\Models\Layer;

final class ArticleController extends Controller
{
    public function index(): void
    {
        $search = trim((string) ($_GET['q'] ?? ''));
        if (mb_strlen($search, 'UTF-8') > 200) {
            $search = mb_substr($search, 0, 200, 'UTF-8');
        }

        $layerSlug = trim((string) ($_GET['lapisan'] ?? ''));
        $activeLayer = $layerSlug !== '' ? Layer::findBySlug($layerSlug) : null;
        $page = max(1, (int) ($_GET['halaman'] ?? 1));

        $result = Article::paginate(
            $search,
            $activeLayer !== null ? (int) $activeLayer['id'] : null,
            $page,
            6
        );

        $layers = Layer::all();
        $counts = Article::countsByLayer();
        $total = Article::countPublished();

        $this->view('articles/index', [
            'pageTitle'       => $search !== ''
                ? 'Cari “' . $search . '” di artikel'
                : ($activeLayer !== null ? 'Artikel lapisan ' . $activeLayer['nama'] : 'Artikel'),
            'metaDescription' => 'Tulisan pendek tentang tanah, batuan, air, dan hal-hal yang tidak terlihat dari permukaan. Filter menurut lapisan atau cari topik tertentu.',
            'bodyClass'       => 'is-archive',
            'items'           => $result['items'],
            'total'           => $result['total'],
            'pages'           => $result['pages'],
            'page'            => $result['page'],
            'search'          => $search,
            'layers'          => $layers,
            'counts'          => $counts,
            'activeLayer'     => $activeLayer,
            'activeSlug'      => $activeLayer['slug'] ?? '',
            'totalPublished'  => $total,
        ]);
    }

    public function show(string $slug): void
    {
        $article = Article::findBySlug($slug);
        if ($article === null) {
            $this->abort(404);
        }

        $prepared = article_prepare((string) $article['isi']);
        $related = Article::related((int) $article['id'], $article['layer_id'] !== null ? (int) $article['layer_id'] : null, 3);

        $structuredData = [
            '@context'         => 'https://schema.org',
            '@type'            => 'Article',
            'headline'         => $article['judul'],
            'description'      => $article['ringkasan'],
            'image'            => [$article['gambar_url']],
            'datePublished'    => $article['tanggal_iso'],
            'dateModified'     => $article['diperbarui_iso'],
            'inLanguage'       => 'id-ID',
            'author'           => [
                '@type' => 'Organization',
                'name'  => $article['penulis'] ?: 'Tim Bumi Bawah',
            ],
            'publisher'        => [
                '@type' => 'Organization',
                'name'  => 'Bumi Bawah',
            ],
            'mainEntityOfPage' => [
                '@type' => 'WebPage',
                '@id'   => url('/artikel/' . $article['slug']),
            ],
            'articleSection'   => $article['layer_nama'] ?? 'Kerak bumi',
        ];

        $this->view('articles/show', [
            'pageTitle'       => $article['judul'],
            'metaDescription' => excerpt_text((string) $article['ringkasan'], 180),
            'bodyClass'       => 'is-article',
            'article'         => $article,
            'bodyHtml'        => $prepared['html'],
            'toc'             => $prepared['toc'],
            'related'         => $related,
            'ogType'          => 'article',
            'ogImage'         => $article['gambar_url'],
            'structuredData'  => $structuredData,
        ]);
    }
}
