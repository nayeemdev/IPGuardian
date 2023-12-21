<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Traits\Common\HasApiResponse;

class DashboardController extends Controller
{
    use HasApiResponse;

    public function __invoke()
    {
        $ipCount = auth()->user()->ipAddresses()->count();

        return $this->success("Dashboard Data", [
            'ip_count' => $ipCount,
        ]);
    }
}
