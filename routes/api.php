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

Route::get("/sectioned-movies", [\App\Http\Controllers\ApiController::class, "getSectionedMovies"])->name("api.sectionedMovies");
Route::get("/get-movies-by-category", [\App\Http\Controllers\ApiController::class, "getMovieByCategoryAPI"])->name("api.getMoviesByCategory");
Route::get("/home-app", [\App\Http\Controllers\ApiController::class, "pageSearch"])->name("api.home");
Route::get("/search", [\App\Http\Controllers\ApiController::class, "search"])->name("api.search");
Route::get("/get-movie-by-id", [\App\Http\Controllers\ApiController::class, "getMovieByIdApi"])->name("api.getMovieById");
Route::get("/add-like-movie", [\App\Http\Controllers\ApiController::class, "addLikeMovie"])->name("api.addLikeMovie");
Route::get("/minus-like-movie", [\App\Http\Controllers\ApiController::class, "minusLikeOnMovie"])->name("api.minusLikeMovie");
Route::get("/add-dislike-movie", [\App\Http\Controllers\ApiController::class, "addDislikeMovie"])->name("api.addDislikeMovie");
Route::get("/minus-dislike-movie", [\App\Http\Controllers\ApiController::class, "addDislikeMovie"])->name("api.minusDislikeMovie");
Route::get("/get-users", [\App\Http\Controllers\ApiController::class, "getUsers"])->name("api.getUsers");
Route::get("/get-user-by-name/{name}", [\App\Http\Controllers\ApiController::class, "getUserByName"])->name("api.getUserByName");
Route::get("/get-user", [\App\Http\Controllers\ApiController::class, "getUser"])->name("api.getUser");
Route::get("/auth", [\App\Http\Controllers\ApiController::class, "auth"])->name("api.auth");

Route::put("/update-user", [\App\Http\Controllers\ApiController::class, "updateUser"])->name("user.update");
