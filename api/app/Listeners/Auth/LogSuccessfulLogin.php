<?php

namespace App\Listeners\Auth;

use App\Constants\AuditLog\LogEvents;

class LogSuccessfulLogin
{
    /**
     * Handle the event.
     */
    public function handle(object $event): void
    {
        audit_logger()->event(LogEvents::LOGIN)
            ->performedOn($event->user)
            ->causedBy($event->user)
            ->log("User {$event->user->name} logged in.");
    }
}
