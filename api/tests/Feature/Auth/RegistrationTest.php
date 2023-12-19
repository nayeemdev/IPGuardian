<?php

use App\Models\User;

test('new users can register', function () {
    $response = $this->post(auth_url_prefix() . '/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $this->assertDatabaseHas('users', [
        'name' => 'Test User',
        'email' => 'test@example.com',
    ]);
    $response->assertNoContent();
});

test('new users can not register with invalid data', function () {
    $response = $this->post(auth_url_prefix() . '/register', [
        'name' => 'Test User',
    ]);

    $this->assertGuest();
    $this->assertDatabaseMissing('users', [
        'name' => 'Test User',
    ]);
    $response->assertStatus(302);
});

test('new users can not register with an existing email', function () {
    User::factory()->create(
        ['email' => 'existing@example.com']
    );

    $response = $this->post(auth_url_prefix() . '/register', [
        'name' => 'Test User',
        'email' => 'existing@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertGuest();
    $response->assertStatus(302);
});

test('new user can not register with invalid email', function () {
    $response = $this->post(auth_url_prefix() . '/register', [
        'name' => 'Test User',
        'email' => 'invalid-email',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertGuest();
    $response->assertSessionHasErrors([
        'email' => 'The email field must be a valid email address.',
    ]);
    $response->assertStatus(302);
});

test('new user can not register with short password', function () {
    $response = $this->post(auth_url_prefix() . '/register', [
        'name' => 'Test User',
        'email' => 'showr@password.com',
        'password' => 'short',
        'password_confirmation' => 'short',
    ]);

    $this->assertGuest();
    $response->assertSessionHasErrors([
        'password' => 'The password field must be at least 8 characters.',
    ]);
    $response->assertStatus(302);
});

test('new user can not register without valid password confirmation password', function () {
    $response = $this->post(auth_url_prefix() . '/register', [
        'name' => 'Test User',
        'email' => 'valid@email.com',
        'password' => 'password',
        'password_confirmation' => 'invalid-password',
    ]);

    $this->assertGuest();
    $response->assertSessionHasErrors([
        'password' => 'The password field confirmation does not match.',
    ]);
    $response->assertStatus(302);
});



test('users can see validation errors for required field', function () {
    $response = $this->post(auth_url_prefix() . '/register', [
        'name' => 'Test User',
    ]);

    $this->assertGuest();
    $response->assertSessionHasErrors([
        'email' => 'The email field is required.',
        'password' => 'The password field is required.',
    ]);
    $response->assertStatus(302);
});
