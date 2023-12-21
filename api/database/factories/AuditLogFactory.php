<?php

namespace Database\Factories;

use App\Constants\AuditLog\LogEvents;
use App\Models\AuditLog;
use App\Models\IpAddress;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\IpAddress>
 */
class AuditLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $logEvent = LogEvents::toArray();
        $user_id = User::inRandomOrder()->first()->id;
        return [
            'event' => $logEvent[array_rand(LogEvents::toArray(), 1)],
            'description' => $this->faker->sentence,
            'subject_id' => IpAddress::factory()->create(['user_id' => $user_id])->id,
            'subject_type' => IpAddress::class,
            'causer_id' => $user_id,
            'causer_type' => User::class,
            'changes' => json_encode([
                'ip_address' => $this->faker->ipv4,
                'label' => $this->faker->word,
                'user_id' => User::inRandomOrder()->first()->id,
            ], JSON_THROW_ON_ERROR),
        ];
    }
}
