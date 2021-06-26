<?php

namespace App\Providers;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\ExpectedNewMovies;
use App\Models\FavoriteMovie;
use App\Models\Genre;
use App\Models\Movie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $top_movies = $this->getMoviesByTopRating();
        $menu_genres = Genre::orderBy("name")->get()->take(21);

        $last_comments = Comment::join("movies", "movies.id", "=", "comments.movie_id")
            ->join("users", "users.id", "=", "comments.user_id")
            ->where("comments.is_banned", 0)
            ->orderBy("comments.com_id", "desc")->get()
            ->take(4);

        $expected_movies = ExpectedNewMovies::orderBy("id", "desc")
            ->get()->take(6);

        View::share(["top_movies" => $top_movies, "menu_genres" => $menu_genres, "last_comments" => $last_comments, "expected_movies" => $expected_movies]);
    }

    private function getMoviesByTopRating()
    {
        return Movie::where("isTopShow", "=", "1")
            ->orderBy("id", "desc")
            ->get()->take(16);
//    $current_year = date("Y", time()) - 1;
//        return Movie::where([["rating_kp", ">", "8.00"], ["year", ">", $current_year], ["rating_imdb", ">", "8.00"]])
//            ->orderBy("id", "desc")
//            ->get()->take(16);
    }

}
