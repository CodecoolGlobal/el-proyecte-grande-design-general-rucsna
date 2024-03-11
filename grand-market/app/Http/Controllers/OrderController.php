<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(): Response
    {
        $orders = Order::all();

        return Inertia::render('Orders/All', [
            'orders' => $orders
        ]);
    }
}
