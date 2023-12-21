<?php

namespace App\Http\Resources\IpAddress;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class AuditLogCollection extends ResourceCollection
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {


        $data = $this->resource->toArray();

        $data['data'] = $this->collection->transform(function ($log) {
            $changes = json_decode($log->changes, true);

            return [
                'id' => $log->id,
                'description' => $log->description,
                'event' => $log->event,
                'old_value' => $changes['ip_address']['old'] ? $changes['ip_address']['old']['label'] : "N/A",
                'new_value' => $changes['ip_address']['new'] ? $changes['ip_address']['new']['label'] : "N/A",
                'created_at' => $log->created_at->diffForHumans(),
            ];
        });

        return $data;
    }
}
