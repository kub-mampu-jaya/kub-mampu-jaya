<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ShopBranch>
 */
class ShopBranchFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $createdAt = $this->faker->dateTimeBetween('-3 years', 'now');

        $names = ['Surabaya', 'Sidoarjo', 'Gresik', 'Malang', 'Blitar', 'Jakarta', 'Bandung', 'Semarang', 'Yogyakarta', 'Denpasar'];

        return [
            'name' => fake()->unique()->randomElement($names),
            'address' => $this->faker->address(),
            'phone_number' => $this->faker->phoneNumber(),
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ];
    }
}
