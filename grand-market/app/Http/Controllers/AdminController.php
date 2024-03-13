<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use Inertia\Response;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\User;

class AdminController extends Controller
{
    public function listOrders(): Response
    {
        $orders = Order::all();

        return Inertia::render('Admin/Orders/All', [
            'orders' => $orders
        ]);
    }

    public function listUsers(): Response
    {
        $users = User::all();

        return Inertia::render('Admin/Users/All', [
            'users' => $users
        ]);
    }

    public function listCategories(): Response
    {
        $categories = Category::all();

        return Inertia::render('Admin/Categories/All', [
            'categories' => $categories
        ]);
    }

    public function createCategory()
    {
        return Inertia::render('Admin/Categories/Create');
    }

    public function storeCategory(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
        ]);
    
        $category = new Category();
        $category->name = $validatedData['name'];
        $category->save();
    
        return redirect()->route('admin.categories.list');
    }

    public function deleteCategory(Category $category)
    {
        $category->delete();
        return to_route('admin.categories.list');
    }

    public function confirmCategoryDelete(Category $category)
    {
        return Inertia::render('Admin/Categories/Delete', [
            'category' => $category
        ]);
    }

    public function listProducts(): Response
    {
        $products = Product::all();

        return Inertia::render('Admin/Products/All', [
            'products' => $products
        ]);
    }

    public function showProduct(Product $product)
    {
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product
        ]);
    }

    public function confirmProductDelete(Product $product)
    {
        return Inertia::render('Admin/Products/Delete', [
            'product' => $product
        ]);
    }

    public function editProduct(Product $product, Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);

        $product->update($validatedData);
    }

    public function deleteProduct(Product $product)
    {
        $product->delete();
        return to_route('admin.products.list');
    }

    public function createProduct()
    {
        return Inertia::render('Admin/Products/Create');
    }

    public function storeProduct(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);
    
        $product = new Product();
        $product->name = $validatedData['name'];
        $product->description = $validatedData['description'];
        $product->price = $validatedData['price'];
        $product->stock = $validatedData['stock'];
        $product->save();
    
        return redirect()->route('admin.products.list');
    }

}
