<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Auth;
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

Route::get('/', [HomeController::class, "home"])->name("home");
Route::get("/show/movie/{kp_id}", [\App\Http\Controllers\ShowController::class, "show"])->name("show.movie");
Route::get("/search", [\App\Http\Controllers\SearchController::class, "search"])->name("search");
Route::get("filter/{genre}", [\App\Http\Controllers\SearchController::class, "filter"])->name("search.filter");
Route::get("filter-year/{year}", [\App\Http\Controllers\SearchController::class, "filterYear"])->name("search.year");
Route::get("filter-country/{country}", [\App\Http\Controllers\SearchController::class, "filterCountry"])->name("search.country");
Route::get("actor/{actor}", [\App\Http\Controllers\SearchController::class, "filterActor"])->name("search.actor");

Route::get("feedback/", [\App\Http\Controllers\FeedbackController::class, "feedback"])->name("feedback");
Route::post("feedback/send", [\App\Http\Controllers\FeedbackController::class, "sendFeedback"])->name("feedback.send");
Route::get("razmeshenie-reclami/", [HomeController::class, "placeReclam"])->name("reclam");

Route::post("movie-add-like/{movie_id}", [])->name("movie.addLike");
Route::post("movie-add-dislike/{movie_id}")->name("movie.addDislike");

// favorite movies
Route::get("favorite-movies/{user_id}", [HomeController::class, "favoriteList"])->name("movies.favorite");

Route::post("favorite-movies/{movie_id}/add", [HomeController::class, "addFavoriteMovie"])->name("movies.favoriteAdd");
Route::post("favorite-movies/{movie_id}/delete", [HomeController::class, "deleteFavoriteMovie"])->name("movies.favoriteDelete");

Auth::routes();

Route::post("add-comment/{id}", [\App\Http\Controllers\ShowController::class, "addComment"])->name("movie.addComment");
Route::post("delete-comment/{id}", [\App\Http\Controllers\ShowController::class, "deleteComment"])->name("movie.deleteComment");

// admin
Route::get("admin/home", [\App\Http\Controllers\AdminController::class, "home"])->name("admin.home");
Route::get("admin/parse-movies-in-database", [\App\Http\Controllers\AdminController::class, "parseMovies"])->name("admin.parseMovies");
Route::get("admin/check-movies-in-database", [\App\Http\Controllers\AdminController::class, "checkMovies"])->name("admin.checkMovies");

Route::get("work-time", function () {
    return view("work_time_page");
})->name("is_work_time");
