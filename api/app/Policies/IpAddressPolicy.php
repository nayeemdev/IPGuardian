<?php

namespace App\Policies;

use App\Models\IpAddress;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class IpAddressPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        // TODO: This can be changed later based on user roles.
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, IpAddress $ipAddress): bool
    {
        return $user->id == $ipAddress->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, IpAddress $ipAddress): bool
    {
        return $user->id === $ipAddress->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, IpAddress $ipAddress): bool
    {
        return $user->id === $ipAddress->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, IpAddress $ipAddress): bool
    {
        return $user->id === $ipAddress->user_id;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, IpAddress $ipAddress): bool
    {
        return $user->id === $ipAddress->user_id;
    }
}
