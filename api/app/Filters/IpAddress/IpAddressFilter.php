<?php

namespace App\Filters\IpAddress;

use App\Filters\BaseFilter;
use App\Filters\Common\Components\Order;
use App\Filters\Common\Components\Pagination;
use App\Filters\IpAddress\Components\IpSearch;
use App\Filters\IpAddress\Components\LabelSearch;

class IpAddressFilter extends BaseFilter
{
    protected function getFilters(): array
    {
        return [
            IpSearch::class,
            LabelSearch::class,
            Order::class
        ];
    }
}
