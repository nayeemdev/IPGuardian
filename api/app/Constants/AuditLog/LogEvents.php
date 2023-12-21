<?php

namespace App\Constants\AuditLog;

class LogEvents
{
    const LOGIN = 'login';
    const LOGOUT = 'logout';
    const IP_CREATE = 'ip_create';
    const IP_UPDATE = 'ip_update';

    public static function toArray(): array
    {
        return [
            self::LOGIN,
            self::LOGOUT,
            self::IP_CREATE,
            self::IP_UPDATE,
        ];
    }
}
