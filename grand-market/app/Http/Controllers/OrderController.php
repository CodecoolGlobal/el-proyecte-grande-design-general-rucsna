<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();
        $orders = Order::where('user_id', $user->id)->get();

        return Inertia::render('Orders/All', [
            'orders' => $orders
        ]);
    }
}
