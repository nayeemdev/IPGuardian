<?php

namespace App\Services\AuditLog;

use App\Constants\AuditLog\LogEvents;
use App\Models\AuditLog;
use Illuminate\Database\Eloquent\Model;

class AuditLoggerService
{
    protected Model $performedOn;
    protected Model $causedBy;
    protected string $logEvent;
    private array $changes = [];

    public function event($logEvent): self
    {
        if (!in_array($logEvent, LogEvents::toArray(), true)) {
            throw new \InvalidArgumentException('Invalid log event provided, please use one of the constants from App\Constants\AuditLog\LogEvents');
        }

        $this->logEvent = $logEvent;

        return $this;
    }

    public function on(Model $model): self
    {
        return $this->performedOn($model);
    }

    public function performedOn(Model $model): self
    {
        $this->performedOn = $model;

        return $this;
    }

    public function by(Model $model): self
    {
        return $this->causedBy($model);
    }

    public function causedBy(Model $model): self
    {
        $this->causedBy = $model;

        return $this;
    }

    public function changes(array $changes): self
    {
        $this->changes = $changes;
        
        return $this;
    }

    /**
     * @throws \JsonException
     */
    public function log(string $description = null): AuditLog
    {
        $log = AuditLog::create([
            'event' => $this->logEvent,
            'description' => $description,
            'subject_id' => $this->performedOn->id,
            'subject_type' => get_class($this->performedOn),
            'causer_id' => $this->causedBy->id,
            'causer_type' => get_class($this->causedBy),
            'changes' => json_encode($this->changes, JSON_THROW_ON_ERROR),
        ]);

        return $log;
    }
}