<?php

namespace App\Traits\AuditLog;

use App\Models\AuditLog;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait LogAudits
{
    public function auditLogs()
    {
        return $this->morphMany(AuditLog::class, 'subject');
    }
}