<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Models\Article;

final class SeoController extends Controller
{
    public function sitemap(): void
    {
        $articles = Article::allPublished();
        $today = date('Y-m-d');

        $urls = [
            ['loc' => $this->absolute('/'), 'lastmod' => $today, 'priority' => '1.0'],
            ['loc' => $this->absolute('/artikel'), 'lastmod' => $today, 'priority' => '0.9'],
            ['loc' => $this->absolute('/galeri'), 'lastmod' => $today, 'priority' => '0.8'],
            ['loc' => $this->absolute('/tentang'), 'lastmod' => $today, 'priority' => '0.6'],
            ['loc' => $this->absolute('/kontak'), 'lastmod' => $today, 'priority' => '0.5'],
        ];

        foreach ($articles as $article) {
            $urls[] = [
                'loc' => $this->absolute('/artikel/' . $article['slug']),
                'lastmod' => $article['tanggal_iso'] !== '' ? substr($article['tanggal_iso'], 0, 10) : $today,
                'priority' => '0.7',
            ];
        }

        header('Content-Type: application/xml; charset=utf-8');
        echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
        foreach ($urls as $url) {
            echo "  <url>\n";
            echo '    <loc>' . $this->xml($url['loc']) . "</loc>\n";
            echo '    <lastmod>' . $this->xml($url['lastmod']) . "</lastmod>\n";
            echo '    <changefreq>monthly</changefreq>' . "\n";
            echo '    <priority>' . $this->xml($url['priority']) . "</priority>\n";
            echo "  </url>\n";
        }
        echo '</urlset>' . "\n";
    }

    public function robots(): void
    {
        header('Content-Type: text/plain; charset=utf-8');
        echo "User-agent: *\n";
        echo "Allow: /\n";
        echo "Disallow: /admin\n";
        echo "Disallow: /uploads/\n";
        echo "\n";
        echo 'Sitemap: ' . $this->absolute('/sitemap.xml') . "\n";
    }

    private function absolute(string $path): string
    {
        $configured = rtrim((string) config('app.url', ''), '/');
        if ($configured !== '') {
            return $configured . url($path);
        }

        $https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
            || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
        $host = (string) ($_SERVER['HTTP_HOST'] ?? 'localhost');
        return ($https ? 'https://' : 'http://') . $host . url($path);
    }

    private function xml(string $value): string
    {
        return htmlspecialchars($value, ENT_XML1 | ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    }
}
