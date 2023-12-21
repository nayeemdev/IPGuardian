<?php

namespace App\Http\Controllers\Api\v1\IpAddress;

use App\Http\Controllers\Controller;
use App\Http\Requests\IpAddress\StoreIpAddressRequest;
use App\Http\Requests\IpAddress\UpdateIpAddressRequest;
use App\Models\IpAddress;
use App\Services\IpAddress\IpAddressService;
use App\Traits\Common\HasApiResponse;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class IpAddressController extends Controller
{
    use HasApiResponse;

    public function __construct(
        private readonly IpAddressService $ipAddressService,
    ) {
    }

    /**
     * Display a listing of the resource.
     *
     * @throws AuthorizationException
     */
    public function index(Request $request): Response
    {
        $this->authorize('viewAny', IpAddress::class);

        $ipAddresses = $this->ipAddressService->getMine($request->query());

        return $this->successWithData('IP addresses retrieved successfully', $ipAddresses);
    }

    /**
     * Store a newly created resource in storage.
     * @throws AuthorizationException
     */
    public function store(StoreIpAddressRequest $request): Response
    {
        $this->authorize('create', IpAddress::class);

        $this->ipAddressService->store($request->validated());

        return $this->successMessage('IP address created successfully', Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     * @throws AuthorizationException
     */
    public function show(IpAddress $ipAddress): Response
    {
        $this->authorize('view', $ipAddress);

        $ipAddress = $this->ipAddressService->show($ipAddress->id);

        return $this->successWithData('IP address retrieved successfully', $ipAddress);
    }

    public function logs(IpAddress $ipAddress, Request $request): Response
    {
        $this->authorize('view', $ipAddress);

        $logs = $this->ipAddressService->logs($ipAddress->id, $request->query());

        return $this->successWithData('IP address retrieved successfully', $logs);
    }

    /**
     * Update the specified resource in storage.
     * @throws AuthorizationException
     */
    public function update(UpdateIpAddressRequest $request, IpAddress $ipAddress): Response
    {
        $this->authorize('update', $ipAddress);

        $this->ipAddressService->update($request->validated() + ['id' => $ipAddress->id]);

        return $this->successMessage('IP address updated successfully');
    }
}
