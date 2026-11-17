<?php

namespace App\Controllers\Admin;

use App\Core\Session;
use App\Core\Upload;
use App\Models\Article;
use App\Models\Layer;

final class AdminArticleController extends AdminBaseController
{
    public function index(): void
    {
        $this->adminView('admin/articles/index', [
            'pageTitle' => 'Kelola artikel',
            'articles'  => Article::allForAdmin(),
        ]);
    }

    public function create(): void
    {
        $this->renderForm(null);
    }

    public function edit(string $id): void
    {
        $article = Article::findById((int) $id);
        if ($article === null) {
            $this->abort(404);
        }
        $this->renderForm($article);
    }

    public function store(): void
    {
        $this->guardCsrf();
        $this->save(null);
    }

    public function update(string $id): void
    {
        $this->guardCsrf();
        $article = Article::findById((int) $id);
        if ($article === null) {
            $this->abort(404);
        }
        $this->save($article);
    }

    public function destroy(string $id): void
    {
        $this->guardCsrf();
        $article = Article::findById((int) $id);
        if ($article === null) {
            $this->abort(404);
        }

        Article::delete((int) $id);
        Upload::delete($article['gambar'] ?? null);
        Session::flash('admin_success', 'Artikel “' . $article['judul'] . '” dihapus.');
        $this->redirect('/admin/artikel');
    }

    /** @param array<string, mixed>|null $article */
    private function renderForm(?array $article): void
    {
        $errors = flash('admin_form_errors', []);
        $layers = Layer::all();

        $this->adminView('admin/articles/form', [
            'pageTitle' => $article === null ? 'Artikel baru' : 'Ubah artikel',
            'article'   => $article,
            'layers'    => $layers,
            'errors'    => is_array($errors) ? $errors : [],
            'isNew'     => $article === null,
        ]);

        clear_old();
    }

    /** @param array<string, mixed>|null $existing */
    private function save(?array $existing): void
    {
        $isNew = $existing === null;
        $id = $isNew ? null : (int) $existing['id'];
        $errors = [];

        $judul = trim((string) ($_POST['judul'] ?? ''));
        $slugInput = trim((string) ($_POST['slug'] ?? ''));
        $ringkasan = trim((string) ($_POST['ringkasan'] ?? ''));
        $isiRaw = (string) ($_POST['isi'] ?? '');
        $sumberRaw = trim((string) ($_POST['sumber'] ?? ''));
        $penulis = trim((string) ($_POST['penulis'] ?? ''));
        $status = (string) ($_POST['status'] ?? 'draft');
        $layerId = ($_POST['layer_id'] ?? '') !== '' ? (int) $_POST['layer_id'] : null;

        if (mb_strlen($judul, 'UTF-8') < 5 || mb_strlen($judul, 'UTF-8') > 160) {
            $errors['judul'] = 'Judul perlu 5 sampai 160 karakter.';
        }
        if ($ringkasan === '' || mb_strlen($ringkasan, 'UTF-8') < 20 || mb_strlen($ringkasan, 'UTF-8') > 300) {
            $errors['ringkasan'] = 'Ringkasan perlu 20 sampai 300 karakter.';
        }
        if ($penulis === '' || mb_strlen($penulis, 'UTF-8') > 80) {
            $errors['penulis'] = 'Tulis nama penulis, maksimal 80 karakter.';
        }
        if (!in_array($status, ['draft', 'published'], true)) {
            $status = 'draft';
        }

        $layerIds = array_map(static fn(array $layer): int => (int) $layer['id'], Layer::all());
        if ($layerId !== null && !in_array($layerId, $layerIds, true)) {
            $errors['layer_id'] = 'Pilih lapisan yang tersedia.';
            $layerId = null;
        }

        $isi = sanitize_article_html($isiRaw);
        if (trim(strip_tags($isi)) === '') {
            $errors['isi'] = 'Isi artikel belum ada. Tulis minimal satu paragraf.';
        }

        $sumber = $this->normalizeSources($sumberRaw, $errors);
        if ($status === 'published' && $sumber === '') {
            $errors['sumber'] = 'Artikel yang diterbitkan perlu minimal satu sumber.';
        }

        if ($slugInput === '') {
            $slugInput = $judul;
        }
        $slug = $this->uniqueSlug($slugInput, $id);
        if ($slug === '') {
            $errors['slug'] = 'Slug tidak bisa dibuat dari judul. Isi slug secara manual.';
        }

        $gambar = Upload::existing((string) ($_POST['gambar_lama'] ?? ''));
        $newUpload = null;
        $file = $_FILES['gambar'] ?? null;
        if (is_array($file) && (int) ($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE) {
            try {
                $newUpload = Upload::image($file, 'artikel');
                $gambar = $newUpload;
            } catch (\RuntimeException $exception) {
                $errors['gambar'] = $exception->getMessage();
            }
        }

        if ($errors !== []) {
            if ($newUpload !== null) {
                Upload::delete($newUpload);
            }
            keep_old([
                'judul' => $judul,
                'slug' => $slugInput,
                'ringkasan' => $ringkasan,
                'isi' => $isiRaw,
                'sumber' => $sumberRaw,
                'penulis' => $penulis,
                'status' => $status,
                'layer_id' => $layerId,
                'gambar_lama' => $gambar,
            ]);
            $this->flashErrors($errors);
            $this->redirect($isNew ? '/admin/artikel/baru' : '/admin/artikel/' . $id . '/ubah');
        }

        $data = [
            'layer_id'  => $layerId,
            'judul'     => $judul,
            'slug'      => $slug,
            'ringkasan' => $ringkasan,
            'isi'       => $isi,
            'sumber'    => $sumber !== '' ? $sumber : null,
            'gambar'    => $gambar,
            'penulis'   => $penulis,
            'status'    => $status,
        ];

        if ($isNew) {
            Article::create($data);
            $message = 'Artikel baru disimpan.';
        } else {
            Article::update((int) $id, $data);
            if ($newUpload !== null && ($existing['gambar'] ?? '') !== $newUpload) {
                Upload::delete($existing['gambar'] ?? null);
            }
            $message = 'Perubahan artikel disimpan.';
        }

        clear_old();
        Session::flash('admin_success', $message);
        $this->redirect('/admin/artikel');
    }

    /**
     * @param array<string, string> $errors
     */
    private function normalizeSources(string $raw, array &$errors): string
    {
        $lines = preg_split('/\R/u', $raw) ?: [];
        $clean = [];
        foreach ($lines as $line) {
            $line = trim($line);
            if ($line === '') {
                continue;
            }
            $parts = array_map('trim', explode('|', $line, 2));
            if (count($parts) !== 2 || $parts[0] === '' || !preg_match('#^https?://#i', $parts[1])) {
                $errors['sumber'] = 'Format sumber: Nama sumber|https://alamat-sumber. Satu sumber per baris.';
                continue;
            }
            $clean[] = $parts[0] . '|' . $parts[1];
        }
        return implode("\n", $clean);
    }

    private function uniqueSlug(string $value, ?int $exceptId): string
    {
        $base = slugify($value);
        if ($base === '') {
            return '';
        }
        $base = mb_substr($base, 0, 150, 'UTF-8');
        $candidate = $base;
        $counter = 2;
        while (Article::slugExists($candidate, $exceptId)) {
            $suffix = '-' . $counter;
            $candidate = mb_substr($base, 0, 150 - strlen($suffix), 'UTF-8') . $suffix;
            $counter += 1;
            if ($counter > 99) {
                $candidate = mb_substr($base, 0, 140, 'UTF-8') . '-' . bin2hex(random_bytes(3));
                break;
            }
        }
        return $candidate;
    }
}
