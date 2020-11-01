<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Collection;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public static $api_key = "cb5e96c6aa1bd52944e49185639fdda6";
    public $base_url = "https://bazon.cc/api";

    public function getMoviesByApi($type = "all", $page = 1)
    {
        return self::getMovies($type, $page);
    }

    public function getMoviesByCategory($type = "all", $page = 1, $cat = "")
    {
        return self::getMovies($type, $page, $cat);
    }

    public function getMovieById($kp_id)
    {
        $url = "https://bazon.cc/api";
//        $options = array(
//            "token" => self::$api_key,
//            "kp" => $kp_id
//        );
//        $ch = curl_init();
//        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//        curl_setopt($ch, CURLOPT_URL, "$url/search?" . http_build_query($options));
//
//        $response = curl_exec($ch);
//        $data = json_decode($response, true);
//        curl_close($ch);
        $data = json_decode(file_get_contents("$url/search?token=" . self::$api_key . "&kp=$kp_id"), true);
        return $data;
    }

    public function getMoviesBySearch($title)
    {
        $url = "https://bazon.cc/api";
        $options = array(
            "token" => self::$api_key,
            "title" => $title
        );
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_URL, "$url/search?" . http_build_query($options));

        $response = curl_exec($ch);
        $data = json_decode($response, true);
        curl_close($ch);

        return $data;
    }

    public static function getMovies($type = "all", $page = 1, $cat = null)
    {
        $url = "https://bazon.cc/api";
        $options = array(
            "token" => self::$api_key,
            "type" => $type,
            "page" => $page
        );
        if ($cat != null)
            $options["cat"] = $cat;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_URL, "$url/json?" . http_build_query($options));

        $response = curl_exec($ch);
        $data = json_decode($response, true);
        curl_close($ch);

        return $data;
    }

    public function paginate($items, $perPage = 5, $page = null, $options = [])
    {
        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
        $items = $items instanceof Collection ? $items : Collection::make($items);
        return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);
    }

}
