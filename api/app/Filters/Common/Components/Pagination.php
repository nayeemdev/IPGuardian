<?php

namespace App\Filters\Common\Components;

use App\Filters\Interface\ComponentInterface;
use Closure;

class Pagination implements ComponentInterface
{
    public function handle(array $content, Closure $next): mixed
    {
        $perPage = $content['params']['per_page'] ?? 10;
        $page = $content['params']['page'] ?? 1;

        $content['builder'] = $content['builder']->paginate($perPage, ['*'], 'page', $page);

        return $next($content);
    }
}
