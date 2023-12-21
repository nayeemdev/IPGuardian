<?php

namespace App\Filters\IpAddress\Components;

use App\Filters\Interface\ComponentInterface;
use Closure;

class IpSearch implements ComponentInterface
{
    public function handle(array $content, Closure $next): mixed
    {
        if (isset($content['params']['ip_address'])) {
            $value = $content['params']['ip_address'];

            $content['builder']->where('ip_address', 'like', '%' . $value . '%');
        }

        return $next($content);
    }
}
