<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderDetail>
 */
class OrderDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Note: This factory assumes the associated product's price is set.
        // The subtotal is calculated based on a random quantity.
        $quantity = $this->faker->numberBetween(1, 3);

        $image = $this->faker->randomElement([
            'https://images.unsplash.com/photo-1737210235283-7675f83efc59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraGljaGRpJTIwYm93bCUyMHZlZ2V0YWJsZXxlbnwxfHx8fDE3NjA1MTM2ODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
            'https://images.unsplash.com/photo-1653849942524-ef2c6882d70d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjByaWNlJTIwbGVudGlsJTIwZGlzaHxlbnwxfHx8fDE3NjA1MTM2ODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        ]);

        // You would typically fetch a product and use its price,
        // but for a simple factory, we'll use a random value.
        $price = $this->faker->randomFloat(2, 10000, 50000);
        $createdAt = $this->faker->dateTimeBetween('-3 years', 'now');

        return [
            'order_id' => Order::factory(),
            'product_id' => Product::factory(),
            'quantity' => $quantity,
            'subtotal' => $quantity * $price,
            // 'image' => $image,
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ];
    }
}
