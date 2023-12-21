<?php

namespace App\Filters\IpAddress\Components;

use App\Filters\Interface\ComponentInterface;
use Closure;

class FullSearch implements ComponentInterface
{
    public function handle(array $content, Closure $next): mixed
    {
        if (isset($content['params']['search'])) {
            $value = $content['params']['search'];

            $content['builder']->where('ip_address', 'like', '%' . $value . '%')->orWhere('label', 'like', '%' . $value . '%');
        }

        return $next($content);
    }
}
