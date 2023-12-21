<?php

use App\Models\IpAddress;
use App\Models\User;

test('Users can get a list of ip addresses', function () {
    $user = User::factory()->create();
    IpAddress::factory()->count(10)->create([
        'user_id' => $user->id,
    ]);

    $response = $this->actingAs($user)->getJson(url_prefix() . '/ip-addresses');

    $response->assertOk();
    $response->assertJsonCount(10, 'data.data');
    $response->assertJsonStructure([
        'status',
        'msg',
        'data' => [
            'data' => [
                '*' => [
                    'id',
                    'ip_address',
                    'label',
                    'created_at',
                ],
            ],
        ],
        'errors',
    ]);
});

test('Users can get list of ip address with search', function () {
    $user = User::factory()->create();
    IpAddress::factory()->create([
        'user_id' => $user->id,
        'label' => 'test-label',
    ]);

    $response = $this->actingAs($user)->getJson(url_prefix() . '/ip-addresses?label=test-label');

    $response->assertOk();
    $response->assertJsonCount(1, 'data.data');
    $response->assertJsonFragment([
        'label' => 'test-label',
    ]);
});

test('Users can get list of ip with filter', function () {
    $user = User::factory()->create();
    IpAddress::factory()->count(20)->create([
        'user_id' => $user->id,
    ]);

    $response = $this->actingAs($user)->getJson(url_prefix() . '/ip-addresses?per_page=5&page=2&order_by=created_at&order_direction=desc');

    $response->assertOk();
    $response->assertJsonCount(5, 'data.data');
    $response->assertJsonFragment([
        'current_page' => 2,
        'per_page' => 5,
        'total' => 20,
    ]);
});

test('Users can see empty list if they dont have any', function () {
    $user = User::factory()->create();
    IpAddress::factory()->count(20)->create([
        'user_id' => $user->id,
    ]);

    $authUser = User::factory()->create();

    $response = $this->actingAs($authUser)->getJson(url_prefix() . '/ip-addresses');

    $response->assertOk();
    $response->assertJsonCount(0, 'data.data');
});

test('Unauthenticated users can not get list of ip addresses', function () {
    $response = $this->getJson(url_prefix() . '/ip-addresses');

    $this->assertGuest();
    $response->assertStatus(401);
});

test('Users can show a single ip address', function () {
    $user = User::factory()->create();
    $ipAddress = IpAddress::factory()->create([
        'user_id' => $user->id,
    ]);

    $response = $this->actingAs($user)->getJson(url_prefix() . '/ip-addresses/' . $ipAddress->id);

    $response->assertOk();
    $response->assertJson([
        'status' => true,
        'msg' => 'IP address retrieved successfully',
        'data' => [
            'id' => $ipAddress->id,
            'ip_address' => $ipAddress->ip_address,
            'label' => $ipAddress->label,
            'created_at' => $ipAddress->created_at->diffForHumans(),
        ],
        'errors' => [],
    ]);
});

test('Users can not see others ip address that not belogs to them', function(){
    $user = User::factory()->create();
    $ipAddress = IpAddress::factory()->create([
        'user_id' => $user->id,
    ]);

    $authUser = User::factory()->create();

    $response = $this->actingAs($authUser)->getJson(url_prefix() . '/ip-addresses/' . $ipAddress->id);

    $response->assertStatus(403);
});
