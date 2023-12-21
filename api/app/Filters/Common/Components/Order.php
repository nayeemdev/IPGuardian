<?php

namespace App\Filters\Common\Components;

use App\Filters\Interface\ComponentInterface;
use Closure;

class Order implements ComponentInterface
{
    public function handle(array $content, Closure $next): mixed
    {
        $orderBy = $content['params']['order_by'] ?? 'created_at';
        $orderBy = in_array($orderBy, $content['builder']->getModel()->getFillable()) ? $orderBy : 'created_at';

        $orderDirection = $content['params']['order_direction'] ?? 'asc';

        $orderDirection = in_array($orderDirection, ['asc', 'desc']) ? $orderDirection : 'asc';

        $content['builder'] = $content['builder']->orderBy($orderBy, $orderDirection);

        return $next($content);
    }
}
