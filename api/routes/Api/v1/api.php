<?php

use App\Http\Controllers\Api\v1\DashboardController;
use App\Http\Controllers\Api\v1\IpAddress\IpAddressController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

   Route::get('dashboard', DashboardController::class)->name('dashboard');

    Route::resource('ip-addresses', IpAddressController::class)->only(['index', 'store', 'show', 'update']);
    Route::get('ip-addresses/{ipAddress}/logs', [IpAddressController::class, 'logs']);
});
