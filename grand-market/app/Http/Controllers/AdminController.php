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

    public function listOrder(Order $order)
    {
        return Inertia::render('Admin/Orders/Single', [
            'order' => $order
        ]);
    }

    public function getOrderDetails(Order $order)
    {
        $products = Product::join('product_orders', 'products.id', '=', 'product_orders.product_id')
                           ->where('product_orders.order_id', $order->id)
                           ->get(['products.id', 'products.name']);
    
        return response()->json($products);
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

    
    public function confirmOrderDelete(Order $order)
    {
        return Inertia::render('Admin/Orders/Delete', [
            'order' => $order
        ]);
    }

    public function deleteOrder(Order $order)
    {
        $order->delete();
        return to_route('admin.orders.list');
    }

    public function listProducts(): Response
    {
        $products = Product::all();
        $categories = Category::all();

        return Inertia::render('Admin/Products/All', [
            'products' => $products,
            'categories' => $categories
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
        $categories = Category::all();

        return Inertia::render('Admin/Products/Create', [
            'categories' => $categories
        ]);
    }

    public function storeProduct(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'categoryId' => 'required|integer|min:0',
        ]);
    
        $product = new Product();
        $product->name = $validatedData['name'];
        $product->description = $validatedData['description'];
        $product->price = $validatedData['price'];
        $product->stock = $validatedData['stock'];
        $product->id_category = $validatedData['categoryId'];
        $product->save();
    
        return redirect()->route('admin.products.list');
    }

}
