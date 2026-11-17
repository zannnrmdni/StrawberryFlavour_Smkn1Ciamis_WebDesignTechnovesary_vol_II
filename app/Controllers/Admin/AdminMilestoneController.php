<?php

namespace App\Controllers\Admin;

use App\Core\Session;
use App\Core\Upload;
use App\Models\Layer;
use App\Models\Milestone;

final class AdminMilestoneController extends AdminBaseController
{
    private const KINDS = ['makhluk', 'tumbuhan', 'rekor manusia', 'fenomena alam', 'fakta'];

    public function index(): void
    {
        $this->adminView('admin/milestones/index', [
            'pageTitle'  => 'Kelola penanda',
            'milestones' => Milestone::allForAdmin(),
        ]);
    }

    public function create(): void
    {
        $this->renderForm(null);
    }

    public function edit(string $id): void
    {
        $milestone = Milestone::find((int) $id);
        if ($milestone === null) {
            $this->abort(404);
        }
        $this->renderForm($milestone);
    }

    public function store(): void
    {
        $this->guardCsrf();
        $this->save(null);
    }

    public function update(string $id): void
    {
        $this->guardCsrf();
        $milestone = Milestone::find((int) $id);
        if ($milestone === null) {
            $this->abort(404);
        }
        $this->save($milestone);
    }

    public function destroy(string $id): void
    {
        $this->guardCsrf();
        $milestone = Milestone::find((int) $id);
        if ($milestone === null) {
            $this->abort(404);
        }

        Milestone::delete((int) $id);
        if (str_starts_with((string) ($milestone['ilustrasi_svg'] ?? ''), 'uploads/')) {
            Upload::delete($milestone['ilustrasi_svg']);
        }
        Session::flash('admin_success', 'Penanda “' . $milestone['nama'] . '” dihapus.');
        $this->redirect('/admin/milestone');
    }

    /** @param array<string, mixed>|null $milestone */
    private function renderForm(?array $milestone): void
    {
        $errors = flash('admin_form_errors', []);
        $this->adminView('admin/milestones/form', [
            'pageTitle' => $milestone === null ? 'Penanda baru' : 'Ubah penanda',
            'milestone' => $milestone,
            'layers'    => Layer::all(),
            'kinds'     => self::KINDS,
            'errors'    => is_array($errors) ? $errors : [],
            'isNew'     => $milestone === null,
        ]);
        clear_old();
    }

    /** @param array<string, mixed>|null $existing */
    private function save(?array $existing): void
    {
        $isNew = $existing === null;
        $id = $isNew ? null : (int) $existing['id'];
        $errors = [];

        $layerId = (int) ($_POST['layer_id'] ?? 0);
        $nama = trim((string) ($_POST['nama'] ?? ''));
        $jenis = (string) ($_POST['jenis'] ?? '');
        $depthRaw = str_replace(',', '.', trim((string) ($_POST['kedalaman_m'] ?? '')));
        $keterangan = trim((string) ($_POST['keterangan'] ?? ''));
        $sumberNama = trim((string) ($_POST['sumber_nama'] ?? ''));
        $sumberUrl = trim((string) ($_POST['sumber_url'] ?? ''));

        $layerIds = array_map(static fn(array $layer): int => (int) $layer['id'], Layer::all());
        if (!in_array($layerId, $layerIds, true)) {
            $errors['layer_id'] = 'Pilih lapisan yang tersedia.';
        }
        if (mb_strlen($nama, 'UTF-8') < 3 || mb_strlen($nama, 'UTF-8') > 100) {
            $errors['nama'] = 'Nama penanda perlu 3 sampai 100 karakter.';
        }
        if (!in_array($jenis, self::KINDS, true)) {
            $errors['jenis'] = 'Pilih jenis penanda.';
        }
        if (!is_numeric($depthRaw) || (float) $depthRaw < 0 || (float) $depthRaw > 35000000) {
            $errors['kedalaman_m'] = 'Kedalaman harus angka 0 sampai 35.000.000 meter.';
        }
        if (mb_strlen($keterangan, 'UTF-8') < 10 || mb_strlen($keterangan, 'UTF-8') > 255) {
            $errors['keterangan'] = 'Keterangan perlu 10 sampai 255 karakter.';
        }
        if (mb_strlen($sumberNama, 'UTF-8') < 3 || mb_strlen($sumberNama, 'UTF-8') > 150) {
            $errors['sumber_nama'] = 'Nama sumber perlu 3 sampai 150 karakter.';
        }
        if (mb_strlen($sumberUrl, 'UTF-8') > 255 || !preg_match('#^https?://#i', $sumberUrl)) {
            $errors['sumber_url'] = 'URL sumber harus diawali http:// atau https://.';
        }

        $illustration = Upload::existing((string) ($_POST['ilustrasi_lama'] ?? ''));
        $newUpload = null;
        $file = $_FILES['ilustrasi'] ?? null;
        $hasUpload = is_array($file) && (int) ($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE;

        if ($isNew && !$hasUpload) {
            $errors['ilustrasi'] = 'Unggah ilustrasi untuk penanda baru.';
        }
        if ($hasUpload) {
            try {
                $newUpload = Upload::image($file, 'penanda');
                $illustration = $newUpload;
            } catch (\RuntimeException $exception) {
                $errors['ilustrasi'] = $exception->getMessage();
            }
        }

        if (mb_strlen((string) $illustration, 'UTF-8') > 120) {
            $errors['ilustrasi'] = 'Nama berkas ilustrasi terlalu panjang.';
        }

        if ($errors !== []) {
            if ($newUpload !== null) {
                Upload::delete($newUpload);
            }
            keep_old([
                'layer_id' => $layerId,
                'nama' => $nama,
                'jenis' => $jenis,
                'kedalaman_m' => $depthRaw,
                'keterangan' => $keterangan,
                'sumber_nama' => $sumberNama,
                'sumber_url' => $sumberUrl,
                'ilustrasi_lama' => $illustration,
            ]);
            $this->flashErrors($errors);
            $this->redirect($isNew ? '/admin/milestone/baru' : '/admin/milestone/' . $id . '/ubah');
        }

        $data = [
            'layer_id'      => $layerId,
            'nama'          => $nama,
            'jenis'         => $jenis,
            'kedalaman_m'   => round((float) $depthRaw, 3),
            'keterangan'    => $keterangan,
            'ilustrasi_svg' => (string) $illustration,
            'sumber_url'    => $sumberUrl,
            'sumber_nama'   => $sumberNama,
        ];

        if ($isNew) {
            Milestone::create($data);
            Session::flash('admin_success', 'Penanda baru disimpan.');
        } else {
            Milestone::update((int) $id, $data);
            if ($newUpload !== null && ($existing['ilustrasi_svg'] ?? '') !== $newUpload) {
                if (str_starts_with((string) ($existing['ilustrasi_svg'] ?? ''), 'uploads/')) {
                    Upload::delete($existing['ilustrasi_svg']);
                }
            }
            Session::flash('admin_success', 'Perubahan penanda disimpan.');
        }

        clear_old();
        $this->redirect('/admin/milestone');
    }
}
