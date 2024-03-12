<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function listOrders(): Response
    {
        $orders = Order::all();

        return Inertia::render('Admin/Orders/All', [
            'orders' => $orders
        ]);
    }
}
