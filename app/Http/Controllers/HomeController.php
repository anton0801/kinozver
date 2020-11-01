<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class HomeController extends Controller
{

    public function home()
    {
        $page = \request("page", 1);
        $movies = $this->getMoviesByApi("all", $page);
//        $currentPage = LengthAwarePaginator::resolveCurrentPage();
//        $perPage = 15;
//        $collection_movies = new Collection($movies);
//        $currentPageSearchResults = $collection_movies->slice(($currentPage - 1) * $perPage, $perPage)->all();
//        $entries = new LengthAwarePaginator($currentPageSearchResults, count($collection_movies), $perPage);
        return view("home", ["movies" => $movies]);
    }

}
