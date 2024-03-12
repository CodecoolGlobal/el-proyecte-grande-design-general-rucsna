<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use Inertia\Response;
use App\Models\Product;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function listOrders(): Response
    {
        $orders = Order::all();

        return Inertia::render('Admin/Orders/All', [
            'orders' => $orders
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

}
