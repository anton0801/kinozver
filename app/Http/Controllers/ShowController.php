<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;

class ShowController extends Controller
{

    public function show($kp_id)
    {
        $movie = Movie::where("kinopoisk_id", $kp_id)->first();
        $similar_movies = $this->getMoviesByCategory(explode(",", $movie->genre)[0])->take(16);
        return view("show_movie", compact("movie", "similar_movies"));
    }

}
