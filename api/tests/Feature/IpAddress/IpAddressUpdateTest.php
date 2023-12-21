<?php

use App\Constants\AuditLog\LogEvents;
use App\Models\IpAddress;
use App\Models\User;

test('Users can update an ip', function () {
    $user = User::factory()->create();
    $ip = IpAddress::factory()->create([
        'user_id' => $user->id,
    ]);

    $response = $this->actingAs($user)->putJson(url_prefix() . '/ip-addresses/' . $ip->id, [
        'label' => 'New Label',
    ]);

    $response->assertStatus(200);
    $response->assertJson([
        "status" => true,
        "msg" => "IP address updated successfully",
        "data" => [],
        "errors" => [],
    ]);
    $this->assertDatabaseHas('ip_addresses', [
        'id' => $ip->id,
        'label' => 'New Label',
    ]);
    $this->assertDatabaseHas('audit_logs', [
        'event' => LogEvents::IP_UPDATE,
        'causer_type' => 'App\Models\User',
        'causer_id' => $user->id,
    ]);
});

test('Users can not be able to change the IP', function () {
    $user = User::factory()->create();
    $ip = IpAddress::factory()->create([
        'user_id' => $user->id,
    ]);

    $response = $this->actingAs($user)->putJson(url_prefix() . '/ip-addresses/' . $ip->id, [
        'ip_address' => '12.12.121.1',
        'label' => 'New Label',
    ]);

    $response->assertStatus(200);
    $response->assertJson([
        "status" => true,
        "msg" => "IP address updated successfully",
        "data" => [],
        "errors" => [],
    ]);
    $this->assertDatabaseHas('ip_addresses', [
        'id' => $ip->id,
        'ip_address' => $ip->ip_address,
        'label' => 'New Label',
    ]);
});

test('Users can not change label without his created IP', function () {
    $user = User::factory()->create();
    $ip = IpAddress::factory()->create([
        'user_id' => User::factory()->create()->id,
    ]);

    $response = $this->actingAs($user)->putJson(url_prefix() . '/ip-addresses/' . $ip->id, [
        'label' => 'New Label',
    ]);

    $response->assertStatus(403);
    $response->assertJson([
        "message" => "This action is unauthorized.",
    ]);
});

test('Users can see validation error with empty field', function () {
    $user = User::factory()->create();
    $ip = IpAddress::factory()->create([
        'user_id' => $user->id,
    ]);

    $response = $this->actingAs($user)->putJson(url_prefix() . '/ip-addresses/' . $ip->id);

    $response->assertStatus(422);
    $response->assertJson([
        "message" => "The label field is required.",
        "errors" => [
            "label" => [
                "The label field is required.",
            ],
        ],
    ]);
});
