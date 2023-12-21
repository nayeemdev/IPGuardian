<?php

namespace App\Services\IpAddress;

use App\Filters\IpAddress\IpAddressFilter;
use App\Http\Resources\IpAddress\IpAddressCollection;
use App\Http\Resources\IpAddress\IpAddressResource;
use App\Models\IpAddress;

class IpAddressService
{
    public function getMine(array $queryParams = []): IpAddressCollection
    {
        $builder = IpAddress::where('user_id', auth()->id());

        $ipAddresses = resolve(IpAddressFilter::class)
            ->getResults([
                'builder' => $builder,
                'params' => $queryParams,
            ]);

        return new IpAddressCollection($ipAddresses);
    }

    public function store(array $data): void
    {
        $ipAddress = IpAddress::create([
            'ip_address' => $data['ip_address'],
            'label' => $data['label'],
            'user_id' => auth()->id(),
        ]);
    }

    public function show(int $id): IpAddressResource
    {
        $ipAddress = IpAddress::findOrFail($id);
        return new IpAddressResource($ipAddress);
    }

    public function update(array $data): void
    {
        $ipAddress = IpAddress::findOrFail($data['id']);
        $ipAddress->update([
            'label' => $data['label'],
        ]);
    }
}
