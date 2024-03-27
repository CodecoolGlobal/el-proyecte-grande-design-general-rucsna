<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Product;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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

    public function storeOrder(Request $request)
    {
        $validatedData = $request->validate([
            'postal_code' => 'required|string',
            'city' => 'required|string',
            'address' => 'required|string',
            'phone_number' => 'required|string',
            'description' => 'nullable|string',
        ]);
    
        $userId = auth()->id();
    
        $cartItems = $request->input('cartItems');
    
        $totalPrice = 0;
        $insufficientStock = false;
    
        foreach ($cartItems as $item) {
            $product = Product::findOrFail($item['id']);
            $quantity = $item['quantity'] ?? 1;
            if ($product->stock < $quantity) {
                $insufficientStock = true;
                break;
            }
            $totalPrice += $item['price'] * $quantity;
        }
    
        if ($insufficientStock) {
            return response()->json(['error' => 'Insufficient stock for one or more items'], 404);
        }
    
        $order = new Order();
        $order->user_id = $userId;
        $order->postal_code = $validatedData['postal_code'];
        $order->city = $validatedData['city'];
        $order->address = $validatedData['address'];
        $order->phone_number = $validatedData['phone_number'];
        $order->description = $validatedData['description'];
        $order->total_price = $totalPrice;
        $order->save();
    
        foreach ($cartItems as $item) {
            $productId = $item['id'];
            $quantity = $item['quantity'] ?? 1;
    
            $product = Product::findOrFail($productId);
            $product->stock -= $quantity;
            $product->save();
    
            DB::table('product_orders')->insert([
                'order_id' => $order->id,
                'product_id' => $productId,
            ]);
        }
    
        return redirect()->route('orders.index');
    }
    
}
