<?php

namespace App\Filters\Common\Components;

use App\Filters\Interface\ComponentInterface;
use Closure;

class Order implements ComponentInterface
{
    public function handle(array $content, Closure $next): mixed
    {
        if (isset($content['params']['order_by'])) {
            $orderBy = $content['params']['order_by'];
            $orderDirection = in_array($content['params']['order_direction'], ['asc', 'desc'])
                                ? $content['params']['order_direction']
                                : 'asc';

            $content['builder'] = $content['builder']->orderBy($orderBy, $orderDirection);
        }

        return $next($content);
    }
}
