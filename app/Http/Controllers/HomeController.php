<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{

    public function home()
    {
        set_time_limit(3600);
        $movies = Movie::orderBy("id", "desc")
            ->paginate(10);
        return view("home", compact("movies"));
    }

}
