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

function getGenres($movie)
{
    $genres = explode(",", $movie->genre);
    $result = array();
    foreach ($genres as $genre)
        $result[] = "<a href=\"" . route('search.filter', $genre) . "\">$genre</a>";
    $genres = $result;
    return $genres;
}

function getActors($movie)
{
    $actors = explode(",", $movie->actors);
    $result = array();
    foreach ($actors as $actor)
        $result[] = "<a href=\"". route('search.actor', $actor) ."\">$actor</a>";
    $actors = $result;
    return $actors;
}

function getTimeForComment($timestamp)
{
//    $current_day = date("d", time());
//    if (date("d", time() - $timestamp) == $current_day) {
//        return "Сегодня, в " . date("H:m", time() - $timestamp);
//    } else if (date("d", time() - $timestamp) / $current_day == 1) {
//        return "Вчера, в " . date("H:m", time());
//    }
//    return date("m-d H:m", time() - $timestamp);

    $current_day = date("d", time());
    if (date("d", $timestamp) == $current_day) {
        return "Сегодня, в " . date("H:m", $timestamp);
    } else if (date("d", $timestamp) - $current_day == 1) {
        return "Вчера, в " . date("H:m", $timestamp);
    }
    return date("m-d H:m", $timestamp);
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

function generateCaptcha()
{
    create_image();
    return displayCaptcha();
}

function create_image()
{
    $image = imagecreatetruecolor(200, 50);
    $background_color = imagecolorallocate($image, 255, 255, 255);
    imagefilledrectangle($image, 0, 0, 200, 50, $background_color);
    $line_color = imagecolorallocate($image, 64, 64, 64);
    for ($i = 0; $i < 10; $i++) {
        imageline($image, 0, rand() % 50, 200, rand() % 50, $line_color);
    }
    $pixel_color = imagecolorallocate($image, 0, 0, 255);
    for ($i = 0; $i < 1000; $i++) {
        imagesetpixel($image, rand() % 200, rand() % 50, $pixel_color);
    }
    $letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    $len = strlen($letters);
    $letter = $letters[rand(0, $len - 1)];
    $text_color = imagecolorallocate($image, 0, 0, 0);
    $word = "";
    for ($i = 0; $i < 6; $i++) {
        $letter = $letters[rand(0, $len - 1)];
        imagestring($image, 5, 5 + ($i * 30), 20, $letter, $text_color);
        $word .= $letter;
    }
    $_SESSION['captcha_string'] = $word;
    $word .= $letter;
    $_SESSION['captcha_string'] = $word;
    imagepng($image, "images/captcha/image.png");
}

function displayCaptcha()
{
    ?>
    <div class="form-secur">
        <input type="text" name="code" id="sec_code" placeholder="Впишите код с картинки"
               maxlength="45" required="">
        <a href="<?php route('register') ?>" title="Кликните на изображение чтобы обновить код, если он неразборчив">
            <span id="captcha">
                <img src="images/captcha/image.png"
                     alt="Кликните на изображение чтобы обновить код, если он неразборчив"
                     width="160" height="80">
            </span>
        </a>
    </div>
    <?php
}
