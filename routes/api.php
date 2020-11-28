<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get("/home-app", [\App\Http\Controllers\ApiController::class, "home"])->name("api.home");
Route::get("/search", [\App\Http\Controllers\ApiController::class, "search"])->name("api.search");
Route::get("/add-like-movie", [\App\Http\Controllers\ApiController::class, "addLikeMovie"])->name("api.addLikeMovie");
