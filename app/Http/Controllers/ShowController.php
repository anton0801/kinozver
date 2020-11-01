<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ShowController extends Controller
{

    public function show($kp_id)
    {
        $movie = $this->getMovieById($kp_id);
        return view("show_movie", ["movie" => $movie["results"][0]]);
    }

}
