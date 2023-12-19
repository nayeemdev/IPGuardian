<?php

namespace App\Traits\Common;

use Illuminate\Http\Response;

trait HasApiResponse
{
    /*
     * Return no content
     *
     * @return \Illuminate\Http\Response
     */
    public function noContent(): Response
    {
        return response()->noContent();
    }

    /*
     * Return success message without any data or errors
     *
     * @param string $message
     * @param int $code
     *
     * @return \Illuminate\Http\Response
     */
    public function successMessage($message, $code = 200): Response
    {
        return $this->success($message, [], [], $code);
    }

    /*
     * Return success
     *
     * @param string $message
     * @param $data
     * @param $errors
     * @param int $code
     *
     * @return \Illuminate\Http\Response
     */
    public function success(string $message, $data = [], $errors = [], int $code = 200): Response
    {
        return response([
            "status" => true,
            "msg" => $message,
            "data" => $data,
            "errors" => $errors,
        ], $code);
    }

    /*
     * Return error message without any data or errors
     *
     * @param string $message
     * @param int $code
     *
     * @return \Illuminate\Http\Response
     */
    public function errorMessage($message, $code = 200): Response
    {
        return $this->error($message, [], [], $code);
    }

    /*
     * Return error
     *
     * @param string $message
     * @param $data
     * @param $errors
     * @param int $code
     *
     * @return \Illuminate\Http\Response
     */
    public function error(string $message, $data = [], $errors = [], int $code = 200): Response
    {
        return response([
            "status" => false,
            "msg" => $message,
            "data" => $data,
            "errors" => $errors,
        ], $code);
    }

    /*
     * Return success with data
     *
     * @param string $message
     * @param array $data
     * @param int $code
     *
     * @return \Illuminate\Http\Response
     */
    public function successWithData($message, $data, $code = 200): Response
    {
        return $this->success($message, $data, [], $code);
    }

    /*
     * Return error with data
     *
     * @param string $message
     * @param array $data
     * @param int $code
     *
     * @return \Illuminate\Http\Response
     */
    public function errorWithData($message, $data, $code = 200): Response
    {
        return $this->error($message, $data, [], $code);
    }
}
