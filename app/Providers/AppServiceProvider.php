<?php

namespace App\Providers;

use App\Http\Controllers\Controller;
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
        $page = 1;
        $movies = Controller::getMovies("all", $page);
        $result = array();
        foreach ($movies["results"] as $movie) {
            if (isset($movie["info"]["rating"]))
                if ($movie["info"]["rating"]["rating_kp"] > 8.00 || $movie["info"]["rating"]["rating_imdb"] > 8.00)
                    $result[] = $movie;
        }
        if (count($result) < 12) {
            $page++;
            $movies = Controller::getMovies("all", $page);
            foreach ($movies["results"] as $movie) {
                if (isset($movie["info"]["rating"]))
                    if ($movie["info"]["rating"]["rating_kp"] > 8.00 || $movie["info"]["rating"]["rating_imdb"] > 8.00)
                        $result[] = $movie;
            }
        }
        if (count($result) >= 12)
            return array_slice($result, 0, 13);
        return $result;
    }

}
