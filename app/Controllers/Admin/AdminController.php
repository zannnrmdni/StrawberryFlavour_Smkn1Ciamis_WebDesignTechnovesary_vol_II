<?php

namespace App\Controllers\Admin;

use App\Models\Article;
use App\Models\Gallery;
use App\Models\Message;
use App\Models\Milestone;

final class AdminController extends AdminBaseController
{
    public function dashboard(): void
    {
        $articles = Article::allForAdmin();
        $published = count(array_filter($articles, static fn(array $item): bool => $item['status'] === 'published'));
        $drafts = count($articles) - $published;

        $this->adminView('admin/dashboard', [
            'pageTitle'    => 'Ringkasan panel',
            'articles'     => $articles,
            'published'    => $published,
            'drafts'       => $drafts,
            'galleryCount' => Gallery::countAll(),
            'milestones'   => Milestone::countAll(),
            'messages'     => Message::latest(5),
            'messageCount' => Message::countAll(),
        ]);
    }
}
