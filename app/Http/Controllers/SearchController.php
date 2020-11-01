<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SearchController extends Controller
{

    public function search(Request $request)
    {
        if (mb_strlen($request->q) >= 1) {
            $movies = $this->getMoviesBySearch($request->q);
            $movie_count = sizeof($movies);
//            if ($movie_count == 1) {
//                $isSerial = $movies[0]["serial"] == "1";
//                return redirect(route("show." . $isSerial ? "serial" : "movie", ["kp_id" => $movies[0]["kinopoisk_id"]]));
//            }
            if ($movie_count == 1)
                $message = "По Вашему запросу найден " . $movie_count . " ответ";
            else if ($movie_count >= 2 && count($movies) <= 5)
                $message = "По Вашему запросу найдено " . $movie_count . " ответа";
            else if ($movie_count > 5) {
                if ($movie_count % 2 == 0)
                    $message = "По Вашему запросу найдено " . $movie_count . " ответа";
                else
                    $message = "По Вашему запросу найдено " . $movie_count . " ответов";
            } else
                $message = "По вашему запросу ничего не найдено";
            return view("search_results", compact("movies", "message"));
        } else {
            $message = "Введите что нибуть чтобы найти фильм или сериал";
            return view("search_results", compact("message"));
        }
    }

    /**
     * в этом методе сделать фильтрацию фильмов по жанрам, годам, годом, режисерам и т.д
     * параметры брать из get параметров если они есть
     * @param Request $request
     */
    public function filter(Request $request)
    {

    }

}
