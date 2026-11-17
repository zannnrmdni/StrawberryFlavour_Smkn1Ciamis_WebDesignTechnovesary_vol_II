<?php

use App\Controllers\Admin\AdminArticleController;
use App\Controllers\Admin\AdminController;
use App\Controllers\Admin\AdminGalleryController;
use App\Controllers\Admin\AdminMessageController;
use App\Controllers\Admin\AdminMilestoneController;
use App\Controllers\Admin\AuthController;
use App\Controllers\ArticleController;
use App\Controllers\ContactController;
use App\Controllers\ErrorController;
use App\Controllers\GalleryController;
use App\Controllers\HomeController;
use App\Controllers\PageController;
use App\Controllers\SeoController;
use App\Core\Router;

return static function (Router $router): void {
    $router->get('/', [HomeController::class, 'index']);
    $router->get('/tentang', [PageController::class, 'about']);
    $router->get('/artikel', [ArticleController::class, 'index']);
    $router->get('/artikel/{slug}', [ArticleController::class, 'show']);
    $router->get('/galeri', [GalleryController::class, 'index']);
    $router->get('/kontak', [ContactController::class, 'show']);
    $router->post('/kontak', [ContactController::class, 'store']);

    $router->get('/sitemap.xml', [SeoController::class, 'sitemap']);
    $router->get('/robots.txt', [SeoController::class, 'robots']);

    $router->get('/admin/login', [AuthController::class, 'loginForm']);
    $router->post('/admin/login', [AuthController::class, 'login']);
    $router->post('/admin/logout', [AuthController::class, 'logout']);

    $router->get('/admin', [AdminController::class, 'dashboard']);

    $router->get('/admin/artikel', [AdminArticleController::class, 'index']);
    $router->get('/admin/artikel/baru', [AdminArticleController::class, 'create']);
    $router->get('/admin/artikel/{id}/ubah', [AdminArticleController::class, 'edit']);
    $router->post('/admin/artikel', [AdminArticleController::class, 'store']);
    $router->post('/admin/artikel/{id}', [AdminArticleController::class, 'update']);
    $router->post('/admin/artikel/{id}/hapus', [AdminArticleController::class, 'destroy']);

    $router->get('/admin/galeri', [AdminGalleryController::class, 'index']);
    $router->get('/admin/galeri/baru', [AdminGalleryController::class, 'create']);
    $router->get('/admin/galeri/{id}/ubah', [AdminGalleryController::class, 'edit']);
    $router->post('/admin/galeri', [AdminGalleryController::class, 'store']);
    $router->post('/admin/galeri/{id}', [AdminGalleryController::class, 'update']);
    $router->post('/admin/galeri/{id}/hapus', [AdminGalleryController::class, 'destroy']);

    $router->get('/admin/milestone', [AdminMilestoneController::class, 'index']);
    $router->get('/admin/milestone/baru', [AdminMilestoneController::class, 'create']);
    $router->get('/admin/milestone/{id}/ubah', [AdminMilestoneController::class, 'edit']);
    $router->post('/admin/milestone', [AdminMilestoneController::class, 'store']);
    $router->post('/admin/milestone/{id}', [AdminMilestoneController::class, 'update']);
    $router->post('/admin/milestone/{id}/hapus', [AdminMilestoneController::class, 'destroy']);

    $router->get('/admin/pesan', [AdminMessageController::class, 'index']);
    $router->post('/admin/pesan/{id}/baca', [AdminMessageController::class, 'read']);
    $router->post('/admin/pesan/{id}/hapus', [AdminMessageController::class, 'destroy']);

    $router->notFound([ErrorController::class, 'notFound']);
};
