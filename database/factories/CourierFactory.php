<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Courier>
 */
class CourierFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $createdAt = $this->faker->dateTimeBetween('-3 years', 'now');

        return [
            'name' => $this->faker->name(),
            'license_plate' => strtoupper($this->faker->bothify('B #### ???')),
            'phone_number' => $this->faker->phoneNumber(),
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ];
    }
}
