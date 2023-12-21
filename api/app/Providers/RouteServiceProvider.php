<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to your application's "home" route.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/api/v1/dashboard';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    public function boot(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });

        $this->routes(function () {
            // Auth is separated from the API routes because it uses the web middleware group.
            // Because of using the SPA approach and using session-based authentication with csrf tokens.
            Route::middleware('web')
                ->prefix('api/v1/auth')
                ->group(base_path('routes/api/v1/auth.php'));

            Route::middleware('api')
                ->prefix('api/v1')
                ->group(base_path('routes/api/v1/api.php'));

            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });
    }
}
