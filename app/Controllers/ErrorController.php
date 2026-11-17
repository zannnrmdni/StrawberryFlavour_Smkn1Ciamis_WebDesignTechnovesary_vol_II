<?php

namespace App\Controllers;

use App\Core\Controller;

final class ErrorController extends Controller
{
    public function notFound(): void
    {
        http_response_code(404);
        $this->view('errors/404', [
            'pageTitle' => 'Halaman tidak ditemukan',
        ], '');
    }
}
