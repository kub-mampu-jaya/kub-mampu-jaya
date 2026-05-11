<?php

namespace Database\Seeders;

use App\Models\Courier;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\Review;
use App\Models\ShopBranch;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Disable foreign key checks
        Schema::disableForeignKeyConstraints();

        // List of all tables to be truncated
        $tables = [
            'users',
            'products',
            'couriers',
            'shop_branches',
            'orders',
            'order_details',
            'reviews',
            'carts',
            'cart_items',
            'notifications',
            'password_reset_tokens',
            'personal_access_tokens',
            'sessions',
            'shop_branch_user',
            'product_shop_branch'
        ];

        // Truncate all tables
        foreach ($tables as $table) {
            DB::table($table)->truncate();
        }

        // Re-enable foreign key checks
        Schema::enableForeignKeyConstraints();
        
        $this->call([
            ProductSeeder::class,
        ]);

        // Create a specific admin user
        User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@example.com',
            'role' => 'admin',
        ]);

        // Create a few regular users
        User::factory(50)->create();
        
        // Fetch existing data
        $users = User::where('role', '!=', 'admin')->get();
        $products = Product::all();
        
        // Create some couriers
        $couriers = Courier::factory(10)->create();
        
        // Create shop branches
        $shopBranches = ShopBranch::factory(10)
            ->hasAttached($users->random(5), [], 'assignedUsers')
            ->create();

        // Attach at least one shop branch to each product
        $products->each(function ($product) use ($shopBranches) {
            if ($shopBranches->count() > 0) {
                $product->shopBranches()->attach($shopBranches->random(rand(1, min(5, $shopBranches->count())))->pluck('id')->toArray());
            }
        });

        // Create orders for each shop branch
        $shopBranches->each(function ($shop) use ($users, $couriers) {
            if ($users->count() > 0 && $couriers->count() > 0 && $shop->products->count() > 0) {
                // For each shop, create a few orders
                Order::factory(rand(15, 30))
                    ->for($users->random(), 'user')
                    ->for($couriers->random(), 'courier')
                    ->for($shop, 'shopBranch')
                    ->has(
                        OrderDetail::factory(rand(1, 5))
                            ->state(function (array $attributes, Order $order) use ($shop) {
                                // Get products available only at the order's shop branch
                                $product = $shop->products->random();
                                $quantity = rand(1, 3);
                                return [
                                    'product_id' => $product->id,
                                    'quantity' => $quantity,
                                    'subtotal' => $product->price_discount * $quantity,
                                ];
                            })
                    )
                    ->create([
                        'created_at' => now()->subDays(rand(0, 365)),
                    ])
                    ->each(function ($order) {
                        // After creating order details, update the order totals
                        $subtotal = $order->orderDetails->sum('subtotal');
                        $order->update([
                            'subtotal' => $subtotal,
                            'total' => $subtotal + $order->delivery_fee,
                        ]);

                        // Create reviews for some of the products in the order
                        foreach ($order->orderDetails as $detail) {
                            if (rand(0, 1)) { // 50% chance to review
                                $reviewDate = (clone $order->confirmed_at)->add(new \DateInterval('P' . rand(1, 7) . 'D'));
                                Review::factory()
                                    ->for($order->user)
                                    ->for($detail->product)
                                    ->create([
                                        'created_at' => $reviewDate,
                                        'updated_at' => $reviewDate,
                                        'rating' => rand(35, 50) / 10, // Ratings between 3.5 and 5.0
                                    ]);
                            }
                        }
                    });
            }
        });
    }
}
