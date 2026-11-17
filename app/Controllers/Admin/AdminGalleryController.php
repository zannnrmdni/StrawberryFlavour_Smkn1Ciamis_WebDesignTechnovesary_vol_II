<?php

namespace App\Controllers\Admin;

use App\Core\Session;
use App\Core\Upload;
use App\Models\Gallery;

final class AdminGalleryController extends AdminBaseController
{
    public function index(): void
    {
        $this->adminView('admin/gallery/index', [
            'pageTitle' => 'Kelola galeri',
            'items'     => Gallery::allForAdmin(),
        ]);
    }

    public function create(): void
    {
        $this->renderForm(null);
    }

    public function edit(string $id): void
    {
        $item = Gallery::find((int) $id);
        if ($item === null) {
            $this->abort(404);
        }
        $this->renderForm($item);
    }

    public function store(): void
    {
        $this->guardCsrf();
        $this->save(null);
    }

    public function update(string $id): void
    {
        $this->guardCsrf();
        $item = Gallery::find((int) $id);
        if ($item === null) {
            $this->abort(404);
        }
        $this->save($item);
    }

    public function destroy(string $id): void
    {
        $this->guardCsrf();
        $item = Gallery::find((int) $id);
        if ($item === null) {
            $this->abort(404);
        }

        Gallery::delete((int) $id);
        Upload::delete($item['gambar'] ?? null);
        Session::flash('admin_success', 'Item galeri “' . $item['judul'] . '” dihapus.');
        $this->redirect('/admin/galeri');
    }

    /** @param array<string, mixed>|null $item */
    private function renderForm(?array $item): void
    {
        $errors = flash('admin_form_errors', []);
        $this->adminView('admin/gallery/form', [
            'pageTitle' => $item === null ? 'Item galeri baru' : 'Ubah item galeri',
            'item'      => $item,
            'categories' => Gallery::categories(),
            'errors'    => is_array($errors) ? $errors : [],
            'isNew'     => $item === null,
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
        $deskripsi = trim((string) ($_POST['deskripsi'] ?? ''));
        $lokasi = trim((string) ($_POST['lokasi'] ?? ''));
        $kategori = trim((string) ($_POST['kategori'] ?? ''));
        $kredit = trim((string) ($_POST['kredit_foto'] ?? ''));

        if (mb_strlen($judul, 'UTF-8') < 3 || mb_strlen($judul, 'UTF-8') > 140) {
            $errors['judul'] = 'Judul perlu 3 sampai 140 karakter.';
        }
        if (mb_strlen($deskripsi, 'UTF-8') < 10 || mb_strlen($deskripsi, 'UTF-8') > 400) {
            $errors['deskripsi'] = 'Deskripsi perlu 10 sampai 400 karakter.';
        }
        if (mb_strlen($lokasi, 'UTF-8') < 3 || mb_strlen($lokasi, 'UTF-8') > 140) {
            $errors['lokasi'] = 'Lokasi perlu 3 sampai 140 karakter.';
        }
        if (mb_strlen($kategori, 'UTF-8') < 2 || mb_strlen($kategori, 'UTF-8') > 50) {
            $errors['kategori'] = 'Kategori perlu 2 sampai 50 karakter.';
        }
        if (mb_strlen($kredit, 'UTF-8') < 3 || mb_strlen($kredit, 'UTF-8') > 180) {
            $errors['kredit_foto'] = 'Kredit perlu 3 sampai 180 karakter.';
        }

        $gambar = Upload::existing((string) ($_POST['gambar_lama'] ?? ''));
        $newUpload = null;
        $file = $_FILES['gambar'] ?? null;
        $hasUpload = is_array($file) && (int) ($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE;

        if ($isNew && !$hasUpload) {
            $errors['gambar'] = 'Pilih gambar untuk item galeri baru.';
        }

        if ($hasUpload) {
            try {
                $newUpload = Upload::image($file, 'galeri');
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
                'deskripsi' => $deskripsi,
                'lokasi' => $lokasi,
                'kategori' => $kategori,
                'kredit_foto' => $kredit,
                'gambar_lama' => $gambar,
            ]);
            $this->flashErrors($errors);
            $this->redirect($isNew ? '/admin/galeri/baru' : '/admin/galeri/' . $id . '/ubah');
        }

        $data = [
            'judul'       => $judul,
            'deskripsi'   => $deskripsi,
            'lokasi'      => $lokasi,
            'gambar'      => (string) $gambar,
            'kategori'    => $kategori,
            'kredit_foto' => $kredit,
        ];

        if ($isNew) {
            Gallery::create($data);
            Session::flash('admin_success', 'Item galeri baru disimpan.');
        } else {
            Gallery::update((int) $id, $data);
            if ($newUpload !== null && ($existing['gambar'] ?? '') !== $newUpload) {
                Upload::delete($existing['gambar'] ?? null);
            }
            Session::flash('admin_success', 'Perubahan item galeri disimpan.');
        }

        clear_old();
        $this->redirect('/admin/galeri');
    }
}
