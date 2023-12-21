<?php

use App\Models\User;

test('Users can store a new ip', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->postJson(url_prefix() . '/ip-addresses', [
        'ip_address' => '192.168.0.1',
        'label' => 'Local IP',
    ]);

    $response->assertStatus(201);
    $response->assertJson([
        "status" => true,
        "msg" => "IP address created successfully",
        "data" => [],
        "errors" => [],
    ]);
    $this->assertDatabaseHas('ip_addresses', [
        'ip_address' => '192.168.0.1',
        'label' => 'Local IP',
        'user_id' => $user->id,
    ]);
});

test('Users can see validation error with empty field', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->postJson(url_prefix() . '/ip-addresses');

    $response->assertStatus(422);
    $response->assertJson([
        "message" => "The ip address field is required. (and 1 more error)",
        "errors" => [
            "ip_address" => [
                "The ip address field is required.",
            ],
            "label" => [
                "The label field is required.",
            ],
        ],
    ]);
});

test('Users can see validation error with invalid ip', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->postJson(url_prefix() . '/ip-addresses', [
        'ip_address' => 'invalid ip',
        'label' => 'Local IP',
    ]);

    $response->assertStatus(422);
    $response->assertJson([
        "message" => "The ip address field must be a valid IP address.",
        "errors" => [
            "ip_address" => [
                "The ip address field must be a valid IP address.",
            ],
        ],
    ]);
});

test('Unauthenticated users can not create a new IP', function () {
    $response = $this->postJson(url_prefix() . '/ip-addresses', [
        'ip_address' => '192.168.0.1',
        'label' => 'Local IP',
    ]);

    $this->assertGuest();
    $response->assertStatus(401);
});
