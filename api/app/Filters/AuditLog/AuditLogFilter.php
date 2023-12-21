<?php

namespace App\Filters\AuditLog;

use App\Filters\BaseFilter;
use App\Filters\Common\Components\Order;

class AuditLogFilter extends BaseFilter
{
    protected function getFilters(): array
    {
        return [
            Order::class
        ];
    }
}
