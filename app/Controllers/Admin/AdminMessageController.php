<?php

namespace App\Controllers\Admin;

use App\Core\Session;
use App\Models\Message;

final class AdminMessageController extends AdminBaseController
{
    public function index(): void
    {
        $page = max(1, (int) ($_GET['halaman'] ?? 1));
        $result = Message::paginate($page, 20);

        $this->adminView('admin/messages/index', [
            'pageTitle' => 'Pesan masuk',
            'items'     => $result['items'],
            'total'     => $result['total'],
            'pages'     => $result['pages'],
            'page'      => $result['page'],
        ]);
    }

    public function read(string $id): void
    {
        $this->guardCsrf();
        $message = Message::find((int) $id);
        if ($message === null) {
            $this->abort(404);
        }

        $makeRead = (int) $message['dibaca'] === 0;
        Message::setRead((int) $id, $makeRead);
        Session::flash('admin_success', $makeRead ? 'Pesan ditandai sudah dibaca.' : 'Pesan ditandai belum dibaca.');
        $this->back('/admin/pesan');
    }

    public function destroy(string $id): void
    {
        $this->guardCsrf();
        $message = Message::find((int) $id);
        if ($message === null) {
            $this->abort(404);
        }

        Message::delete((int) $id);
        Session::flash('admin_success', 'Pesan dari ' . $message['nama'] . ' dihapus.');
        $this->back('/admin/pesan');
    }
}
