<?php


if (!function_exists('app_title')) {
    /**
     * Get the application title.
     *
     * @return string
     */
    function app_title(): string
    {
        return config('app.name');
    }
}

if (!function_exists('app_version')) {
    /**
     * Get the application version.
     *
     * @return string
     */
    function app_version(): string
    {
        return config('app.version', '1.0.0');
    }
}