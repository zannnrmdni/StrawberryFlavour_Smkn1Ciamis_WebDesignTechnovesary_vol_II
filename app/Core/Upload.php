<?php

namespace App\Core;

use RuntimeException;

final class Upload
{
    private const MAX_WIDTH = 1800;
    private const QUALITY = 84;

    /**
     * Validasi, re-encode, dan simpan gambar unggahan sebagai WebP.
     * Mengembalikan path relatif terhadap folder public, mis. uploads/abc.webp.
     *
     * @param array<string, mixed> $file
     */
    public static function image(array $file, string $prefix = 'gambar'): string
    {
        $error = (int) ($file['error'] ?? UPLOAD_ERR_NO_FILE);
        if ($error === UPLOAD_ERR_NO_FILE) {
            throw new RuntimeException('Pilih berkas gambar terlebih dahulu.');
        }
        if ($error !== UPLOAD_ERR_OK) {
            throw new RuntimeException('Berkas gagal diunggah. Coba lagi dengan berkas yang lebih kecil.');
        }

        $tmp = (string) ($file['tmp_name'] ?? '');
        if ($tmp === '' || !is_uploaded_file($tmp)) {
            throw new RuntimeException('Berkas unggahan tidak valid.');
        }

        $size = (int) ($file['size'] ?? 0);
        $maxBytes = (int) config('uploads.max_bytes', 2097152);
        if ($size <= 0 || $size > $maxBytes) {
            throw new RuntimeException('Ukuran gambar maksimal ' . round($maxBytes / 1048576, 1) . ' MB.');
        }

        $finfo = new \finfo(FILEINFO_MIME_TYPE);
        $mime = $finfo->file($tmp) ?: '';
        $allowed = ['image/jpeg', 'image/png', 'image/webp'];
        if (!in_array($mime, $allowed, true)) {
            throw new RuntimeException('Format harus JPG, PNG, atau WebP.');
        }

        $info = @getimagesize($tmp);
        if ($info === false || $info[0] < 1 || $info[1] < 1) {
            throw new RuntimeException('Berkas ini tidak terbaca sebagai gambar.');
        }

        $image = @imagecreatefromstring((string) file_get_contents($tmp));
        if ($image === false) {
            throw new RuntimeException('Gambar tidak bisa diproses. Coba simpan ulang sebagai JPG atau PNG.');
        }

        $width = imagesx($image);
        $height = imagesy($image);
        $scale = $width > self::MAX_WIDTH ? self::MAX_WIDTH / $width : 1;
        $targetWidth = max(1, (int) round($width * $scale));
        $targetHeight = max(1, (int) round($height * $scale));

        $canvas = imagecreatetruecolor($targetWidth, $targetHeight);
        if ($canvas === false) {
            imagedestroy($image);
            throw new RuntimeException('Gambar tidak bisa diproses.');
        }

        imagealphablending($canvas, false);
        imagesavealpha($canvas, true);
        $transparent = imagecolorallocatealpha($canvas, 0, 0, 0, 127);
        imagefilledrectangle($canvas, 0, 0, $targetWidth, $targetHeight, $transparent);
        imagealphablending($canvas, true);

        imagecopyresampled(
            $canvas, $image, 0, 0, 0, 0,
            $targetWidth, $targetHeight, $width, $height
        );
        imagedestroy($image);

        $dir = (string) config('uploads.path');
        if (!is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
            imagedestroy($canvas);
            throw new RuntimeException('Folder unggahan tidak bisa dibuat.');
        }

        $name = $prefix . '-' . date('Ymd') . '-' . bin2hex(random_bytes(8)) . '.webp';
        $target = rtrim($dir, '/\\') . DIRECTORY_SEPARATOR . $name;

        $saved = imagewebp($canvas, $target, self::QUALITY);
        imagedestroy($canvas);

        if (!$saved) {
            throw new RuntimeException('Gambar gagal disimpan. Periksa izin folder unggahan.');
        }

        @chmod($target, 0644);
        return 'uploads/' . $name;
    }

    /**
     * Hapus hanya berkas di dalam folder unggahan. Aset seed tidak pernah disentuh.
     */
    public static function delete(?string $path): void
    {
        $path = $path !== null ? ltrim(str_replace('\\', '/', $path), '/') : '';
        if (!str_starts_with($path, 'uploads/')) {
            return;
        }

        $root = realpath((string) config('uploads.path'));
        $file = realpath(BASE_PATH . '/public/' . $path);
        if ($root === false || $file === false || !is_file($file)) {
            return;
        }
        if (!str_starts_with(str_replace('\\', '/', $file), str_replace('\\', '/', $root) . '/')) {
            return;
        }
        @unlink($file);
    }

    /**
     * Hanya izinkan path gambar yang benar-benar ada di folder aset atau unggahan.
     */
    public static function existing(?string $path): ?string
    {
        $path = $path !== null ? ltrim(str_replace('\\', '/', trim($path)), '/') : '';
        if ($path === '' || str_contains($path, '..')) {
            return null;
        }
        if (str_starts_with($path, 'uploads/')) {
            return is_file(BASE_PATH . '/public/' . $path) ? $path : null;
        }
        if (preg_match('#^[a-z0-9/_-]+\.(svg|webp|jpg|jpeg|png)$#i', $path)
            && is_file(BASE_PATH . '/public/assets/img/' . $path)) {
            return $path;
        }
        return null;
    }
}
