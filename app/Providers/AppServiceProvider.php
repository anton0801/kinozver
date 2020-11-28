<?php

namespace App\Providers;

use App\Http\Controllers\Controller;
use App\Models\Movie;
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
        View::share(["top_movies" => $top_movies]);
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
