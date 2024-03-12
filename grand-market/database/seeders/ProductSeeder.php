<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $clothing = Category::query()->create(['name' => 'Clothing']);
        $electronics = Category::query()->create(['name' => 'Electronics']);
        $books = Category::query()->create(['name' => 'Books']);
        $household = Category::query()->create(['name' => 'Household']);

        $products = [
            ['name' => 'T-Shirt', 'description' => 'Comfortable cotton t-shirt', 'price' => 20.99, 'stock' => 100],
            ['name' => 'Jeans', 'description' => 'Classic denim jeans', 'price' => 39.99, 'stock' => 80],
            ['name' => 'Sweater', 'description' => 'Warm wool sweater', 'price' => 49.99, 'stock' => 60],
            ['name' => 'Smartphone', 'description' => 'Latest smartphone model', 'price' => 599.99, 'stock' => 50],
            ['name' => 'Laptop', 'description' => 'Powerful laptop for work and entertainment', 'price' => 999.99, 'stock' => 30],
            ['name' => 'Vacuum Cleaner', 'description' => 'Efficient vacuum cleaner for home cleaning', 'price' => 149.99, 'stock' => 40],
            ['name' => 'Coffee Maker', 'description' => 'Automatic coffee maker for brewing delicious coffee', 'price' => 79.99, 'stock' => 60],
            ['name' => 'Fantasy Novel', 'description' => 'Exciting fantasy novel with magical adventures', 'price' => 29.99, 'stock' => 70],
            ['name' => 'Programming Book', 'description' => 'Comprehensive guide to programming', 'price' => 49.99, 'stock' => 90],
        ];

        foreach ($products as $key => $productData){
            $product = Product::query()->create($productData);

            switch ($key % 4){
                case 0:
                    $product->categories()->attach($clothing->id);
                    break;
                case 1:
                    $product->categories()->attach($electronics->id);
                    break;
                case 2:
                    $product->categories()->attach($household->id);
                    break;
                case 3:
                    $product->categories()->attach($books->id);
                    break;
            }
        }
    }
}
