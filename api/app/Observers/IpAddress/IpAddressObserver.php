<?php

namespace App\Observers\IpAddress;

use App\Constants\AuditLog\LogEvents;
use App\Models\IpAddress;
use App\Services\AuditLog\AuditLoggerService;

class IpAddressObserver
{
    /**
     * Handle the IpAddress "created" event.
     *
     * @return void
     */
    public function created(IpAddress $ipAddress): void
    {
        audit_logger()->event(LogEvents::IP_CREATE)
            ->performedOn($ipAddress)
            ->causedBy($ipAddress->user)
            ->changes(
                [
                    'ip_address' => [
                        'old' => null,
                        'new' => [
                            'ip_address' => $ipAddress->ip_address,
                            'label' => $ipAddress->label,
                        ]
                    ]
                ]
            )
            ->log("IP Address {$ipAddress->ip_address} created.");
    }

    /**
     * Handle the IpAddress "updated" event.
     *
     * @return void
     */
    public function updated(IpAddress $ipAddress): void
    {
        audit_logger()->event(LogEvents::IP_UPDATE)
            ->performedOn($ipAddress)
            ->causedBy($ipAddress->user)
            ->changes(
                [
                    'ip_address' => [
                        'old' => [
                            'ip_address' => $ipAddress->getOriginal('ip_address'),
                            'label' => $ipAddress->getOriginal('label'),
                        ],
                        'new' => [
                            'ip_address' => $ipAddress->ip_address,
                            'label' => $ipAddress->label,
                        ]
                    ]
                ]
            )
            ->log("IP Address {$ipAddress->ip_address} updated.");
    }
}
