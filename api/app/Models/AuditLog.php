<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class AuditLog extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function subject(): MorphTo
    {
        return $this->morphTo();
    }

    public function causer(): MorphTo
    {
        return $this->morphTo();
    }

    public function scopeCausedBy(Builder $query, Model $causer): void
    {
        $query->where('causer_id', $causer->id)
            ->where('causer_type', get_class($causer));
    }

    public function scopeForSubject(Builder $query, Model $subject): void
    {
        $query->where('subject_id', $subject->id)
            ->where('subject_type', get_class($subject));
    }
}
