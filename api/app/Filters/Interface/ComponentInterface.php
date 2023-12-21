<?php

namespace App\Filters\Interface;

use Closure;

interface ComponentInterface
{
    public function handle(array $content, Closure $next): mixed;
}
