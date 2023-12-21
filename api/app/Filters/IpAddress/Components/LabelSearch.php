<?php

namespace App\Filters\IpAddress\Components;

use App\Filters\Interface\ComponentInterface;
use Closure;

class LabelSearch implements ComponentInterface
{
    public function handle(array $content, Closure $next): mixed
    {
        if (isset($content['params']['label'])) {
            $value = $content['params']['label'];

            $content['builder']->where('label', 'like', '%' . $value . '%');
        }

        return $next($content);
    }
}
