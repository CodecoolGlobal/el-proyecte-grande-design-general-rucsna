<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\FlareClient\Http\Exceptions\NotFound;

class ProductController extends Controller
{
    public function limitedProductList(): JsonResponse|Response
    {
        $categories = Category::all();
        if(sizeof($categories) === 0){
            return response()->json(['error' => 'Category not found'], 404);
        }

        $limitedProducts = [];
        foreach ($categories as $category){
            $products = Product::query()->where('id_category', $category->id)->limit(5)->get();
            $limitedProducts[$category->name] = $products;
        }

        return Inertia::render('Welcome', [
            'limitedProducts' => $limitedProducts
        ]);
    }

    public function getByCategory($categoryName = "")
    {
        if(!$categoryName){
            $products = Product::all();
            return Inertia::render('Products', ['products' => $products]);
        }
        $category = Category::query()->where('name', $categoryName)->first();
        if(!$category){
            return response()->json(['error' => 'Category not found'], 404);
        }

        $products = Product::query()->where('id_category', $category->id)->get();

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
