<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $electronics = \App\Models\Product::query()->whereHas('categories', function ($query){
        $query->where('name', 'Electronics');
    })->limit(5)->get();

    $clothing = \App\Models\Product::query()->whereHas('categories', function ($query){
        $query->where('name', 'Clothing');
    })->limit(5)->get();

    $household = \App\Models\Product::query()->whereHas('categories', function ($query){
        $query->where('name', 'Household');
    })->limit(5)->get();

    $books = \App\Models\Product::query()->whereHas('categories', function ($query){
        $query->where('name', 'Books');
    })->limit(5)->get();

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'electronics' => $electronics,
        'clothing' => $clothing,
        'household' => $household,
        'books' => $books,
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('admin')->group(function () {
    Route::get('/admin/orders', [AdminController::class, 'listOrders'])->name('admin.orders.list');

    Route::get('/admin/categories', [AdminController::class, 'listCategories'])->name('admin.categories.list');
    Route::get('/admin/new/category', [AdminController::class, 'createCategory'])->name('admin.category.create');
    Route::patch('/admin/new/category', [AdminController::class, 'storeCategory'])->name('admin.category.store');
    Route::delete('/admin/category/{category}', [AdminController::class, 'deleteCategory'])->name('admin.category.delete');

    Route::get('/admin/products', [AdminController::class, 'listProducts'])->name('admin.products.list');
    Route::get('/admin/product/{product}', [AdminController::class, 'showProduct'])->name('admin.product.show');
    Route::patch('/admin/product/{product}', [AdminController::class, 'editProduct'])->name('admin.product.edit');
    Route::delete('/admin/product/{product}', [AdminController::class, 'deleteProduct'])->name('admin.product.delete');
    Route::get('/admin/product/delete/{product}', [AdminController::class, 'confirmProductDelete'])->name('admin.product.confirm.delete');
    Route::get('/admin/new/product', [AdminController::class, 'createProduct'])->name('admin.product.create');
    Route::patch('/admin/new/product', [AdminController::class, 'storeProduct'])->name('admin.product.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
