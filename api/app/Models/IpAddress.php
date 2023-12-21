<?php

namespace App\Models;

use App\Traits\AuditLog\LogAudits;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class IpAddress extends Model
{
    use HasFactory, SoftDeletes, LogAudits;

    protected $fillable = [
        'ip_address',
        'label',
        'user_id',
    ];

    protected $hidden = [
        'user_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
