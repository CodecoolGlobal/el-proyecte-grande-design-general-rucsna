<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\FlareClient\Http\Exceptions\NotFound;

class ProductController extends Controller
{
    public function getByCategory($categoryName, Request $request)
    {
        $category = Category::query()->where('name', $categoryName)->first();
        if(!$category){
            return response()->json(['error' => 'Category not found'], 404);
        }

        $limit = $request->input('limit');
        $productsQuery = Product::query()->where('id_category', $category->id);

        if($limit !== null){
            $productsQuery->limit($limit);
        }
        $products = $productsQuery->get();

        return Inertia::render('Products', [
            'products' => $products,
            'category' => $categoryName
        ]);
    }


    public function find($id)
    {
        $product = Product::query()->find($id);

        //return Inertia::render()
    }
}
