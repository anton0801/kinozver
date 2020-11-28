<?php

function getTime($movie)
{
    if (!isset($movie->premiere) && $movie->premiere == "") {
        $months = array(0 => "январь", 1 => "февраль", 2 => "март", 3 => "апрель", 4 => "май", 5 => "июнь", 6 => "июль", 7 => "август", 8 => "сентябрь",
            9 => "октябрь", 10 => "ноябрь", 11 => "декабрь");
        $date = $movie->date;
        $time = date("d", $date) . " " . $months[date("m", $date)] . " " . date("yy", $date);
    } else
        $time = $movie->premiere;
    return $time;
}

function getGenres($movie) {
    $genres = explode(",", $movie->genre);
    $result = array();
    foreach ($genres as $genre)
        $result[] = "<a href=\"/$genre\">$genre</a>";
    $genres = $result;
    return $genres;
}

function getActors($movie) {
    $actors = explode(",", $movie->actors);
    $result = array();
    foreach ($actors as $actor)
        $result[] = "<a href=\"/actor/$actor\">$actor</a>";
    $actors = $result;
    return $actors;
}

function getUsersInOnline()
{
    $ip = $_SERVER["REMOTE_ADDR"];
    $online = \App\Models\Online::where("ip", $ip)->first();
    $cookie_key = "online_cache";

    if ($online) {
        $do_update = false;
        // update
        if (\App\Helpers\CookieManager::stored($cookie_key)) {
            // Via cookies
            $c = (array)@json_decode(\App\Helpers\CookieManager::read($cookie_key), true);
            if ($c) {
                if ($c["last_visit"] < (time() - (60 * 5))) {
                    // if 5 minutes passed
                    $do_update = true;
                }
            } else {
                $do_update = true;
            }
        } else {
            // Without cookie
            $do_update = true;
        }

        // update if required
        if ($do_update) {
            $time = time();
            $online->last_visit = $time;
            $online->save();
            \App\Helpers\CookieManager::store($cookie_key, json_encode(array(
                "id" => $online->id,
                "last_visit" => $time
            )));
        }
    } else {
        // create
        $time = time();
        $online = new \App\Models\Online();
        $online->last_visit = $time;
        $online->ip = $ip;
        $online->save();
        \App\Helpers\CookieManager::store($cookie_key, json_encode(array(
            "id" => $online->id,
            "last_visit" => $time
        )));
    }

    return count(\App\Models\Online::where("last_visit", ">", (time() - 3600))->get());
}
