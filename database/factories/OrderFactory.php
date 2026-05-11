<?php

namespace Database\Factories;

use App\Models\Courier;
use App\Models\ShopBranch;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = $this->faker->randomElement(['pending', 'cooking', 'on the way', 'arrived']);
        $payment_status = $this->faker->randomElement([
            'created',
            'pending',
            'paid',
            'failed',
            'expired',
            'canceled',
            'challenge',
            'refunded',
        ]);
        $subtotal = $this->faker->randomFloat(2, 15000, 200000);
        $delivery_fee = $this->faker->randomFloat(2, 5000, 25000);
        // $status = $this->faker->randomElement(['pending', 'processing', 'completed', 'cancelled']);

        // Generate a base time
        $confirmed_at = $this->faker->dateTimeBetween('-2 years', 'now');
        $processed_at = (clone $confirmed_at)->add(new \DateInterval('PT' . $this->faker->numberBetween(5, 20) . 'M'));
        $estimated_delivery_at = (clone $processed_at)->add(new \DateInterval('PT' . $this->faker->numberBetween(20, 60) . 'M'));
        $deliveryOffset = $this->faker->numberBetween(-10, 20);
        // $delivered_at = $status === 'completed' ? (clone $estimated_delivery_at)->modify("{$deliveryOffset} minutes") : null;
        $delivered_at = null;

        $createdAt = $this->faker->dateTimeBetween('-3 years', 'now');

        return [
            'order_id' => fake()->unique()->randomNumber(4),
            'total_amount' => fake()->numberBetween(10000, 100000),
            'payment_type' => fake()->word(),
            'paid_at' => fake()->dateTime(),
            'payment_method' => $this->faker->randomElement(['Cash', 'Transfer', 'E-Wallet']),
            'status' => $status,
            'payment_status' => $payment_status,
            'subtotal' => $subtotal,
            'delivery_fee' => $delivery_fee,
            'total' => $subtotal + $delivery_fee,
            'confirmed_at' => $confirmed_at,
            'processed_at' => $processed_at,
            'estimated_delivery_at' => $estimated_delivery_at,
            'delivered_at' => $delivered_at,
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ];
    }
}
