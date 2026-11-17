<?php

namespace App\Controllers\Admin;

use App\Core\Controller;
use App\Core\Session;
use App\Models\LoginAttempt;
use App\Models\User;

final class AuthController extends Controller
{
    public function loginForm(): void
    {
        if ((int) Session::get('admin_id', 0) > 0) {
            $this->redirect('/admin');
        }

        $this->view('admin/login', [
            'pageTitle' => 'Masuk panel',
            'error'     => (string) flash('admin_error', ''),
            'username'  => old('username'),
        ], 'admin-auth');

        clear_old();
    }

    public function login(): void
    {
        if (!Session::verifyCsrf($_POST['_token'] ?? null)) {
            http_response_code(419);
            $this->view('errors/419', ['pageTitle' => 'Sesi kedaluwarsa'], '');
            return;
        }

        $username = trim((string) ($_POST['username'] ?? ''));
        $password = (string) ($_POST['password'] ?? '');
        $ip = (string) ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');
        $ipHash = hash_hmac('sha256', $ip, (string) config('security.ip_salt'));
        $window = (int) config('security.login_window', 900);
        $max = (int) config('security.login_max', 5);

        if (LoginAttempt::failures($ipHash, $window) >= $max) {
            Session::flash('admin_error', 'Terlalu banyak percobaan. Coba lagi dalam 15 menit.');
            keep_old(['username' => $username]);
            $this->redirect('/admin/login');
        }

        if ($username === '' || $password === '' || mb_strlen($username, 'UTF-8') > 60) {
            LoginAttempt::record($ipHash, $username, false);
            Session::flash('admin_error', 'Nama pengguna atau sandi belum benar.');
            keep_old(['username' => $username]);
            $this->redirect('/admin/login');
        }

        $user = User::findByUsername($username);
        if ($user === null || !password_verify($password, (string) $user['password_hash'])) {
            LoginAttempt::record($ipHash, $username, false);
            Session::flash('admin_error', 'Nama pengguna atau sandi belum benar.');
            keep_old(['username' => $username]);
            $this->redirect('/admin/login');
        }

        if (($user['role'] ?? '') !== 'admin') {
            LoginAttempt::record($ipHash, $username, false);
            Session::flash('admin_error', 'Akun ini tidak punya akses panel.');
            $this->redirect('/admin/login');
        }

        LoginAttempt::clear($ipHash);
        LoginAttempt::prune();
        Session::regenerate();
        Session::set('admin_id', (int) $user['id']);
        Session::set('admin_username', $user['username']);
        clear_old();
        Session::flash('admin_success', 'Selamat datang, ' . $user['username'] . '.');
        $this->redirect('/admin');
    }

    public function logout(): void
    {
        if (!Session::verifyCsrf($_POST['_token'] ?? null)) {
            http_response_code(419);
            $this->view('errors/419', ['pageTitle' => 'Sesi kedaluwarsa'], '');
            return;
        }

        unset($_SESSION['admin_id'], $_SESSION['admin_username']);
        Session::regenerate();
        Session::flash('admin_error', 'Kamu sudah keluar dari panel.');
        $this->redirect('/admin/login');
    }
}
