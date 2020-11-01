<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [\App\Http\Controllers\HomeController::class, "home"])->name("home");
Route::get("/show/movie/{kp_id}", [\App\Http\Controllers\ShowController::class, "show"])->name("show.movie");
Route::get("/search", [\App\Http\Controllers\SearchController::class, "search"])->name("search");
