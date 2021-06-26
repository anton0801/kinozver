<?php

namespace App\Http\Controllers;

use App\Models\FavoriteMovie;
use App\Models\Movie;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{

    const ORDER_BY_POPULARITY = "популярности";
    const ORDER_BY_ALFAFIT = "алфавиту";
    const ORDER_BY_DATE = "дате";

    public function home()
    {
        $order = request()->order;

        if ($order == "") {
            $order = self::ORDER_BY_DATE;
        }

        switch ($order) {
            case self::ORDER_BY_POPULARITY:
                $movies = Movie::orderBy("likes", "desc")
                    ->paginate(12);
                break;
            case self::ORDER_BY_ALFAFIT:
                $movies = Movie::orderBy("title", "asc")
                    ->paginate(12);
                break;
            case self::ORDER_BY_DATE:
                $movies = Movie::orderBy("year", "desc")
                    ->paginate(12);
                break;
            default:
                $movies = Movie::orderBy("year", "desc")
                    ->paginate(12);
                break;
        }
        return view("home", compact("movies"));
    }

    public function placeReclam()
    {
        return view("reclam");
    }

    public function favoriteList($user_id)
    {
        $order = request()->order;

        if ($order == "") {
            $order = self::ORDER_BY_DATE;
        }

        switch ($order) {
            case self::ORDER_BY_POPULARITY:
                $movies = FavoriteMovie::where("user_id", "=", $user_id)
                    ->join("movies", "favorite_movies.movie_id", "=", "movies.id")
                    ->orderBy("likes", "desc")
                    ->paginate(15);
                break;
            case self::ORDER_BY_ALFAFIT:
                $movies = FavoriteMovie::where("user_id", "=", $user_id)
                    ->join("movies", "favorite_movies.movie_id", "=", "movies.id")
                    ->orderBy("title", "asc")
                    ->paginate(15);
                break;
            case self::ORDER_BY_DATE:
                $movies = FavoriteMovie::where("user_id", "=", $user_id)
                    ->join("movies", "favorite_movies.movie_id", "=", "movies.id")
                    ->orderBy("date", "asc")
                    ->paginate(15);
                break;
        }
        if (count($movies) == 0) {
            $fm = FavoriteMovie::where("user_id", "=", $user_id)->get();
            foreach ($fm as $v) {
                $v->delete();
            }
        }
        return view("favorite_list", compact("movies"));
    }

    public function addFavoriteMovie($movie_id)
    {
        if (auth()->check()) {
            $favoriteMovie = new FavoriteMovie();
            $favoriteMovie->user_id = auth()->user()->id;
            $favoriteMovie->movie_id = $movie_id;
            if ($favoriteMovie->save()) {
                return redirect(url()->previous())->with("success", "Вы удачно добавили в список избранных фильмов");
            } else {
                return redirect(url()->previous())->withErrors("Что-то пошло не так! Попробуйте еще раз");
            }
        } else {
            return redirect(url()->previous())->withErrors("Вы должны авторизоваться чтобы добавить фильмы в избранный список");
        }
    }

    public function deleteFavoriteMovie($movie_id)
    {
        $favoriteMovie = FavoriteMovie::find($movie_id);
        if ($favoriteMovie != null) {
            if ($favoriteMovie->delete()) {
                return redirect(url()->previous())->with("success", "Вы удачно удалили фильм из избранного списка");
            } else {
                return redirect(url()->previous())->withErrors("Что-то пошло не так! Попробуйте еще раз");
            }
        } else {
            return redirect(url()->previous())->withErrors("Что-то пошло не так! Скорей всего этого фильма уже там нет");
        }
    }

}
