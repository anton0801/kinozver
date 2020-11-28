<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public static $api_key = "cb5e96c6aa1bd52944e49185639fdda6";
    public $base_url = "https://bazon.cc/api";

    public function getMoviesByApi($type = "all", $page = 1)
    {
        return json_decode(file_get_contents("https://bazon.cc/api/json?token=cb5e96c6aa1bd52944e49185639fdda6&type=$type&page=$page"), true);
    }

    public function getMoviesByCategory($cat)
    {
        return Movie::where("genre", $cat)->paginate(10);
    }

    public function getMovieById($kp_id)
    {
        return Movie::where("kinopoisk_id", $kp_id)->first();
    }

    public function getMoviesBySearch($title)
    {
        return Movie::where("title", "LIKE", "%$title%")->paginate(10);
    }

    /**
     * @param string $type
     * @return mixed
     */
    public function getMovies($type = "all")
    {
        if ($type == "all")
            return Movie::orderBy("id", "desc")->paginate(10);
        else if ($type == "film")
            return Movie::where("serial", "=", "0")->orderBy("id", "desc")->paginate(10);
        else if ($type == "serial")
            return Movie::where("serial", "=", "1")->orderBy("id", "desc")->paginate(10);
    }

    public function getNewMovies()
    {
        $current_year = "" . date("Y", time());
        return Movie::where("year", "=", "" . $current_year)->paginate(10);
    }

    public function parseMoviesInDatabase()
    {
        for ($page = 402; $page > 1; $page--) {
            $data = $this->getMoviesByApi("all", $page);
            foreach ($data["results"] as $movie) {
                $result["results"][] = $movie;
                $link = $movie["link"];
                $kinopoisk_id = $movie["kinopoisk_id"];
                $date = $movie["date"];
                $serial = $movie["serial"];
                $end = $movie["end"];
                $quality = $movie["quality"];
                $max_qual = $movie["max_qual"];
                $info = $movie["info"];
                $title = $info["rus"];
                $orig_title = $info["orig"];
                $description = $info["description"];
                $genre = $info["genre"];
                $actors = $info["actors"];
                $director = $info["director"];
                $year = isset($info["year"]) ? $info["year"] : null;
                $premiere = isset($info["premiere"]) ? $info["premiere"] : null;
                $slogan = isset($info["slogan"]) ? $info["slogan"] : null;
                $poster = $info["poster"];
                $rating = isset($info["rating"]) ? $info["rating"] : null;
                $rating_kp = isset($info["rating"]["rating_kp"]) ? $rating["rating_kp"] : "0";
                $vote_num_kp = isset($rating["vote_num_kp"]) ? $rating["vote_num_kp"] : "0";
                $rating_imdb = isset($rating["rating_imdb"]) ? $rating["rating_imdb"] : "0";
                $vote_num_imdb = isset($rating["vote_num_imdb"]) ? $rating["vote_num_imdb"] : "0";
                $time = $info["time"];
                $age = $info["age"];
                $country = $info["country"];

                $last_season = isset($movie["last_season"]) ? $movie["last_season"] : null;
                $last_episode = isset($movie["last_episode"]) ? $movie["last_episode"] : null;
                $episodes = isset($movie["episodes"]) ? json_encode($movie["episodes"], JSON_UNESCAPED_UNICODE) : null;

                Movie::insert(array(
                    "link" => $link,
                    "kinopoisk_id" => $kinopoisk_id,
                    "date" => $date,
                    "serial" => $serial,
                    "end" => $end,
                    "quality" => $quality,
                    "max_qual" => $max_qual,
                    "last_season" => $last_season,
                    "last_episode" => $last_episode,
                    "episodes" => $episodes,
                    "title" => $title,
                    "original_title" => $orig_title,
                    "description" => $description,
                    "genre" => $genre,
                    "actors" => $actors,
                    "director" => $director,
                    "year" => $year,
                    "premiere" => $premiere,
                    "slogan" => $slogan,
                    "poster" => $poster,
                    "rating_kp" => $rating_kp,
                    "vote_num_kp" => $vote_num_kp,
                    "rating_imdb" => $rating_imdb,
                    "vote_num_imdb" => $vote_num_imdb,
                    "time" => $time,
                    "age" => $age,
                    "country" => $country
                ));
            }
        }
    }

}
