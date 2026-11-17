<?php

namespace App\Controllers;

use App\Core\Controller;
use App\Core\Session;
use App\Models\Message;

final class ContactController extends Controller
{
    public function show(): void
    {
        $errors = flash('contact_errors', []);
        $sent = (bool) flash('contact_sent', false);

        $this->view('contact/index', [
            'pageTitle'       => 'Kontak',
            'metaDescription' => 'Kirim koreksi angka, usulan sumber, atau cerita lapangan. Pesan dibaca langsung oleh tim Bumi Bawah.',
            'bodyClass'       => 'is-contact',
            'errors'          => is_array($errors) ? $errors : [],
            'sent'            => $sent,
        ]);

        clear_old();
    }

    public function store(): void
    {
        if (!Session::verifyCsrf($_POST['_token'] ?? null)) {
            http_response_code(419);
            $this->view('errors/419', [
                'pageTitle' => 'Sesi kedaluwarsa',
            ], '');
            return;
        }

        // Honeypot: diisi hanya oleh bot. Balas seperti berhasil, tanpa menyimpan.
        if (trim((string) ($_POST['website'] ?? '')) !== '') {
            Session::flash('contact_sent', true);
            $this->redirect('/kontak#pesan-terkirim');
        }

        $nama = trim((string) ($_POST['nama'] ?? ''));
        $email = trim((string) ($_POST['email'] ?? ''));
        $subjek = trim((string) ($_POST['subjek'] ?? ''));
        $pesan = trim((string) ($_POST['pesan'] ?? ''));

        $errors = [];
        if (mb_strlen($nama, 'UTF-8') < 2 || mb_strlen($nama, 'UTF-8') > 80) {
            $errors['nama'] = 'Tulis nama antara 2 dan 80 karakter.';
        }
        if ($email === '' || mb_strlen($email, 'UTF-8') > 160 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Alamat surel belum benar. Contoh: nama@contoh.id.';
        }
        if (mb_strlen($subjek, 'UTF-8') < 3 || mb_strlen($subjek, 'UTF-8') > 160) {
            $errors['subjek'] = 'Subjek perlu 3 sampai 160 karakter.';
        }
        if (mb_strlen($pesan, 'UTF-8') < 10 || mb_strlen($pesan, 'UTF-8') > 3000) {
            $errors['pesan'] = 'Pesan perlu 10 sampai 3.000 karakter.';
        }

        $ip = (string) ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');
        $ipHash = hash_hmac('sha256', $ip, (string) config('security.ip_salt'));

        if ($errors === []) {
            $window = (int) config('security.contact_window', 600);
            $max = (int) config('security.contact_max', 3);
            if (Message::countFromIp($ipHash, $window) >= $max) {
                $errors['umum'] = 'Terlalu banyak pesan dari jaringan ini. Tunggu sepuluh menit, lalu coba lagi.';
            }
        }

        if ($errors !== []) {
            keep_old([
                'nama' => $nama,
                'email' => $email,
                'subjek' => $subjek,
                'pesan' => $pesan,
            ]);
            Session::flash('contact_errors', $errors);
            $this->redirect('/kontak#formulir');
        }

        Message::create([
            'nama'   => $nama,
            'email'  => $email,
            'subjek' => $subjek,
            'pesan'  => $pesan,
            'ip_hash' => $ipHash,
        ]);

        clear_old();
        Session::flash('contact_sent', true);
        $this->redirect('/kontak#pesan-terkirim');
    }
}
