<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function getByCategory($categoryName)
    {
        $products = Product::query()->whereHas('categories', function($query) use ($categoryName){
            $query->where('name', $categoryName);
        })->get();

        //return Inertia::render()
    }

    public function find($id)
    {
        $product = Product::query()->find($id);

        //return Inertia::render()
    }
}
