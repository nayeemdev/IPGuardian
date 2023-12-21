<?php

use App\Services\AuditLog\AuditLoggerService;
use Illuminate\Database\Eloquent\Relations\MorphMany;

if (!function_exists('audit_logger')) {
    /**
     * Get the AuditLoggerService instance.
     *
     * @return AuditLoggerService
     */
    function audit_logger(): AuditLoggerService
    {
        return app(AuditLoggerService::class);
    }
}