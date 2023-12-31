<?php

use App\Constants\AuditLog\LogEvents;
use App\Models\User;

test('users can authenticate using the login screen', function () {
    $user = User::factory()->create();

    $response = $this->postJson(auth_url_prefix() . '/login', [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $this->assertAuthenticated();
    $this->assertAuthenticatedAs($user);
    $response->assertNoContent();

    // Check audit log
    $this->assertDatabaseHas('audit_logs', [
        'subject_id' => $user->id,
        'event' => LogEvents::LOGIN,
        'causer_type' => 'App\Models\User',
        'causer_id' => $user->id,
    ]);
});

test('users can see validation errors', function () {
    $response = $this->postJson(auth_url_prefix() . '/login', [
        'email' => 'invalid-email',
        'password' => 'password',
    ]);

    $this->assertGuest();
    $response->assertJson([
        "message" => "The email field must be a valid email address.",
        "errors" => [
            "email" => [
                "The email field must be a valid email address.",
            ],
        ],
    ]);
});

test('users can not authenticate with invalid email', function () {
    User::factory()->create();

    $this->postJson(auth_url_prefix() . '/login', [
        'email' => 'invalid-email',
        'password' => 'password',
    ]);

    $this->assertGuest();
    $this->assertInvalidCredentials([
        'email' => 'invalid-email',
        'password' => 'password',
    ]);
});

test('users can not authenticate with invalid password', function () {
    $user = User::factory()->create();

    $this->postJson(auth_url_prefix() . '/login', [
        'email' => $user->email,
        'password' => 'wrong-password',
    ]);

    $this->assertGuest();
});

test('users can logout', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->postJson(auth_url_prefix() . '/logout');

    $this->assertGuest();
    $response->assertNoContent();
});

test('guests can not logout', function () {
    $response = $this->postJson(auth_url_prefix() . '/logout');

    $this->assertGuest();
    $response->assertStatus(401);
});
