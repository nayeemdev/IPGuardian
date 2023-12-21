<?php

namespace Database\Seeders;

use App\Models\AuditLog;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AuditLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AuditLog::factory()->count(100)->create();
    }
}
