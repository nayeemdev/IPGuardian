<?php

use App\Models\User;

test('users can authenticate using the login screen', function () {
    $user = User::factory()->create();

    $response = $this->post(auth_url_prefix() . '/login', [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $this->assertAuthenticated();
    $this->assertAuthenticatedAs($user);
    $response->assertNoContent();
});

test('users can see validation errors', function () {
    $response = $this->post(auth_url_prefix() . '/login', [
        'email' => 'invalid-email',
        'password' => 'password',
    ]);

    $this->assertGuest();
    $response->assertSessionHasErrors([
        'email' => 'The email field must be a valid email address.',
    ]);
});

test('users can not authenticate with invalid email', function () {
    User::factory()->create();

    $this->post(auth_url_prefix() . '/login', [
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

    $this->post(auth_url_prefix() . '/login', [
        'email' => $user->email,
        'password' => 'wrong-password',
    ]);

    $this->assertGuest();
});

test('users can logout', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(auth_url_prefix() . '/logout');

    $this->assertGuest();
    $response->assertNoContent();
});

test('guests can not logout', function () {
    $response = $this->post(auth_url_prefix() . '/logout');

    $this->assertGuest();
    $response->assertStatus(302);
});
