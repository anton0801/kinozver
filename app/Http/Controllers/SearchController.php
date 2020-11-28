<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Http\Request;
use Illuminate\View\View;

class SearchController extends Controller
{

    public function search(Request $request)
    {
        if (mb_strlen($request->q) >= 1) {
            $movies = $this->getMoviesBySearch($request->q);
            $movie_count = $movies->total();
            if ($movie_count == 1) {
                return redirect(route("show.movie", ["kp_id" => $movies[0]->kinopoisk_id]));
            }
            if ($movie_count == 1)
                $message = "По Вашему запросу найден " . $movie_count . " ответ";
            else if ($movie_count >= 2 && $movies->count() <= 5)
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
     * в этом методе сделать фильтрацию фильмов по жанрам, годам, режисерам и т.д
     * параметры брать из get параметров если они есть
     * @param $genre
     * @return Application|Factory|View
     */
    public function filter($genre)
    {
        if ($genre == "film") {
            $movies = $this->getMovies("film");
        } else if ($genre == "serial") {
            $movies = $this->getMovies("serial");
        } else if ($genre == "новинки") {
            $movies = $this->getNewMovies();
        } else {
            $movies = $this->getMoviesByCategory($genre);
        }
        return view("home", compact("movies"));
    }

}
