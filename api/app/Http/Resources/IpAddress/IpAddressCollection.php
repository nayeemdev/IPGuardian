<?php

namespace App\Http\Resources\IpAddress;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class IpAddressCollection extends ResourceCollection
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = $this->resource->toArray();

        $data['data'] = $this->collection->transform(function ($ipAddress) {
            return new IpAddressResource($ipAddress);
        });

        return $data;
    }
}
