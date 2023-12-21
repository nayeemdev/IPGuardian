<?php

namespace App\Filters;

use Illuminate\Pipeline\Pipeline;

abstract class BaseFilter
{
    abstract protected function getFilters(): array;

    public function getResults($contents)
    {
        $results = app(Pipeline::class)
            ->send($contents)
            ->through($this->getFilters())
            ->then(fn($contents) => $contents['builder']);

        // As we will using paginate in every query/filter
        $perPage = $contents['params']['per_page'] ?? 10;
        $page = $contents['params']['page'] ?? 1;

        return $results->paginate($perPage, ['*'], 'page', $page)->withQueryString();
    }
}
