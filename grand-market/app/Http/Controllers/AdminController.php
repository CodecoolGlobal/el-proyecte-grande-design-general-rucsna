<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use Inertia\Response;
use App\Models\Product;

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

}
