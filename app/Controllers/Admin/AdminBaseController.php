<?php

namespace App\Controllers\Admin;

use App\Core\Controller;
use App\Core\Session;

abstract class AdminBaseController extends Controller
{
    public function __construct()
    {
        $adminId = (int) Session::get('admin_id', 0);
        if ($adminId <= 0) {
            Session::flash('admin_error', 'Masuk dulu untuk membuka panel.');
            $this->redirect('/admin/login');
        }
    }

    protected function adminView(string $view, array $data = []): void
    {
        $data['adminName'] = (string) Session::get('admin_username', 'admin');
        $data['unreadMessages'] = \App\Models\Message::unreadCount();
        $this->view($view, $data, 'admin');
    }

    protected function guardCsrf(): void
    {
        if (!Session::verifyCsrf($_POST['_token'] ?? null)) {
            http_response_code(419);
            $this->view('errors/419', ['pageTitle' => 'Sesi kedaluwarsa'], '');
            exit;
        }
    }

    protected function back(string $fallback): never
    {
        $return = (string) ($_POST['_return'] ?? '');
        if ($return === '' || !str_starts_with($return, '/admin') || str_contains($return, '//')) {
            $return = $fallback;
        }
        $this->redirect($return);
    }

    protected function flashErrors(array $errors): void
    {
        Session::flash('admin_form_errors', $errors);
    }
}
