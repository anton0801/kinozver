<!doctype html>
<html prefix="og: http://ogp.me/ns#" lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta>
    <title>@yield("title")</title>
    @yield("og")
    <meta name="keywords" content="@yield("keywords")">
    <meta name="description" content="@yield("description")">

    <link rel="shortcut icon" href="/images/favicon.png"/>

    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
          crossorigin="anonymous">
    <link href="/css/style.css" type="text/css" rel="stylesheet"/>
    {{--    <link href="https://fonts.googleapis.com/css?family=Play:400,700&amp;subset=cyrillic" rel="stylesheet">--}}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <link rel="stylesheet" type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.css"/>
    <link rel="stylesheet" type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.css"/>
    <script type="text/javascript"
            src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"></script>
</head>
<body style="background: #2d3748">
<img id="image_bg" src="https://mocah.org/uploads/posts/318184-Avengers-Endgame-Thanos-4K.jpg" alt="bg"
     style=" z-index: -100; display: none">

<div class="preloader">
    <div class="loader"></div>
</div>

<script>
    let imageUrl = "https://mocah.org/uploads/posts/318184-Avengers-Endgame-Thanos-4K.jpg"
    $("#image_bg").attr('src', imageUrl).on("load", function () {
        // prevent memory leaks as @benweet suggested
        $('body').css('background', `url(${imageUrl}) center top fixed no-repeat`);
        setTimeout(() => {
            $(this).remove();
            preloader.classList.add("done")
            $(".loader").css({
                "display": "none",
                "opacity": 0
            })
        }, 1000)
    });
</script>

<div class="container">
    @include("parts.header.index")
    <div class="wrapper">
        <div class="best_movies">
            <div class="best_movies-in">
                <div class="slider">
                    {{--                    <a class="slider__btn btn-prev"></a>--}}
                    {{--                    <a class="slider__btn btn-next"></a>--}}
                    <div class="slider-track">
                        @foreach($top_movies as $top_movie)
                            <a href="{{ route("show.movie", $top_movie->kinopoisk_id) }}"
                               class="best_movies-item-wr slider-item" title="{{ $top_movie->title }}">
                                <div class="best_movies-item img-box with-mask">
                                    <img
                                        src="{{ $top_movie->poster }}"
                                        alt="Фото {{ $top_movie->title }}">
                                    <div class="img__overlay"><span class="fa fa-play"></span></div>
                                    <div class="short-meta short-meta-movie-qual">{{ $top_movie->quality }}</div>
                                    <div class="short-meta short-meta-license">Лицензия</div>
                                </div>
                            </a>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
        <div class="menu">
            <a href="/" class="menu_item active">Главная</a>
            <a href="{{ route("search.filter", "новинки") }}" class="menu_item">Новинки</a>
            <a href="{{ route("search.filter", "film") }}" class="menu_item">Фильмы</a>
            <a href="{{ route("search.filter", "serial") }}" class="menu_item">Сериалы</a>
            <a href="{{ route("search.filter", "мультфильм") }}" class="menu_item">Мультфильмы</a>
            <a href="{{ route("search.filter", "боевик") }}" class="menu_item">Боевики</a>
            <!-- <div class="share-box">
			    <div class="ya-share2 ya-share2_inited" data-services="vkontakte,facebook,odnoklassniki,twitter" data-counter="">
                    <div class="ya-share2__container ya-share2__container_size_m">
                        <ul class="ya-share2__list ya-share2__list_direction_horizontal">
                            <li class="ya-share2__item ya-share2__item_service_vkontakte">
                                <a class="ya-share2__link" href="https://vk.com/share.php?url=https%3A%2F%2Fkino-zver.site%2F&amp;title=Кино%20зверь&amp;description=Погрузись%20в%20мир%20кино%20и%20сериалов%20вместе%20с%20сайтом%20Кино%20зверь&amp;image=&amp;utm_source=share2" rel="nofollow" target="_blank" title="VKontakte">
                                    <i class="fa fa-vk"></i>
                                </a>
                            </li>
                            <li class="ya-share2__item ya-share2__item_service_facebook">
                                <a class="ya-share2__link" href="https://www.facebook.com/sharer.php?src=sp&amp;u=https%3A%2F%2Fkino-zver.site%2F&amp;title=Кино%20зверь&amp;description=Погрузись%20в%20мир%20кино%20и%20сериалов%20вместе%20с%20сайтом%20Кино%20зверь&amp;picture=&amp;utm_source=share2" rel="nofollow" target="_blank" title="Facebook">
                                    <i class="fa fa-facebook-official"></i>
                                </a>
                            </li>
                            <li class="ya-share2__item ya-share2__item_service_odnoklassniki">
                                <a class="ya-share2__link" href="https://connect.ok.ru/offer?url=https%3A%2F%2Fkino-zver.site%2F&amp;title=Кино%20зверь&amp;description=Погрузись%20в%20мир%20кино%20и%20сериалов%20вместе%20с%20сайтом%20Кино%20зверь&amp;imageUrl=&amp;utm_source=share2" rel="nofollow" target="_blank" title="Odnoklassniki">
                                    <i class="fa fa-odnoklassniki-square"></i>
                                </a>
                            </li>
                            <li class="ya-share2__item ya-share2__item_service_twitter">
                                <a class="ya-share2__link" href="https://twitter.com/intent/tweet?text=Кино%20зверь&amp;url=https%3A%2F%2Fkino-zver.site%2F&amp;hashtags=&amp;utm_source=share2" rel="nofollow" target="_blank" title="Twitter">
                                    <i class="fa fa-twitter-square"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            </div> -->
        </div>
        <div class="cols fx-row" style="display: flex;">
            <main class="fx-1">
                @yield("content")
            </main>
            <aside>
                <div class="side-box to-mob" style="margin-bottom: 20px">
                    <div class="side-bt icon-l">Панель навигация</div>
                    <div class="side-bc fx-row">
                        <div class="nav-col">
                            <div class="nav-title">По жанрам</div>
                            <ul class="nav-menu">
                                @foreach($menu_genres as $genre)
                                    <li><a href="{{ route("search.filter", $genre->name) }}">{{ $genre->name }}</a></li>
                                @endforeach
                            </ul>
                        </div>
                        <div class="nav-col">
                            <div class="nav-title">По году</div>
                            <ul class="nav-menu">
                                @php($years = array("2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011"))
                                @foreach($years as $year)
                                    <li><a href="{{ route("search.year", $year) }}">{{ $year }}</a></li>
                                @endforeach
                            </ul>
                            <div class="nav-title">По странам</div>
                            <ul class="nav-menu">
                                @php($countries = array("Россия", "США", "Франция", "Англия", "Германия", "Индия", "Корея", "Китай"))
                                @foreach($countries as $country)
                                    <li><a href="{{ route("search.country", $country) }}">{{ $country }}</a></li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="side-box">
                    <div class="side-bt icon-l"><span class="fa fa-calendar"></span>Ожидаемые новинки</div>
                    <div class="expected__movies">
                        @foreach($expected_movies as $expected_movie)
                            <div class="expected_movie">
                                <div class="expected__movie-poster">
                                    <img src="{{ $expected_movie->poster }}" alt="{{ $expected_movie->title }}">
                                </div>
                                <div class="expected__movie-name">
                                    {{ $expected_movie->title }}
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>

                <script>
                    $('.expected__movies').slick({
                        prevArrow: "<a class=\"slick__btn btn-prev-slick\"></a>",
                        nextArrow: "<a class=\"slick__btn btn-next-slick\"></a>"
                    });

                    $(".slider-track").slick({
                        slidesToScroll: 3,
                        slidesToShow: 7,
                        arrows: true,
                        responsive: [
                            {
                                breakpoint: 1100,
                                settings: {
                                    arrows: false,
                                    slidesToShow: 6
                                }
                            },
                            {
                                breakpoint: 990,
                                settings: {
                                    arrows: false,
                                    slidesToShow: 5
                                }
                            },
                            {
                                breakpoint: 820,
                                settings: {
                                    arrows: false,
                                    slidesToShow: 4
                                }
                            },
                            {
                                breakpoint: 670,
                                settings: {
                                    arrows: false,
                                    slidesToShow: 3,
                                    slidesToScroll: 2
                                }
                            },
                            {
                                breakpoint: 580,
                                settings: {
                                    arrows: false,
                                    slidesToShow: 2,
                                    slidesToScroll: 1
                                }
                            },
                            {
                                breakpoint: 380,
                                settings: {
                                    arrows: false,
                                    slidesToShow: 1,
                                    slidesToScroll: 1
                                }
                            }
                        ]
                    })
                </script>

                <div class="side-box">
                    <div class="side-bt">Комментируют</div>
                    <div class="side-bc">
                        @foreach($last_comments as $last_comment)
                            <div class="lcomm">
                                <div class="lmeta">
                                    <div class="lav img-box">
                                        <img src="{{ $last_comment->avatarUrl }}" alt="{{ $last_comment->name }}">
                                    </div>
                                    <div class="lname">
                                        @if(auth()->check())
                                            @if(auth()->user()->id == $last_comment->user_id)
                                                <span>Вы</span>
                                            @else
                                                <a href="mailto:{{ $last_comment->email }}">{{ $last_comment->name }}</a>
                                            @endif
                                        @else
                                            <a href="mailto:{{ $last_comment->email }}">{{ $last_comment->name }}</a>
                                        @endif
                                    </div>
                                </div>
                                <div
                                    class="ltext">{{ mb_strlen($last_comment->comment) > 255 ? \Illuminate\Support\Str::substr($last_comment->comment, 0, 255) . "..." : $last_comment->comment }}</div>
                                <a class="ltitle nowrap"
                                   href="{{ route("show.movie", $last_comment->kinopoisk_id) }}">{{ $last_comment->title }}</a>
                            </div>
                        @endforeach
                    </div>
                </div>
            </aside>
        </div>
        @include("auth.login")
        @include("parts.footer.index")
        <div class="toast">
            <div class="message"></div>
        </div>

        <script>
            $("#btn_login").click(function () {
                let isShow = false
                $("#login").css({
                    display: "block",
                    opacity: 1
                })
            })
            $("#close_login_form").click(function () {
                $("#login").css({
                    display: "none",
                    opacity: 0
                })
            })

            var preloader = document.querySelector(".preloader")

            function addLike(url) {
                let likeBtn = $(".movie__like-btn")

                likeBtn.click(function () {
                    $.ajax({
                        url: url,
                        type: "GET",
                        onsuccess: function (data) {
                            // показать лоадер и скрыть когда лайк добавиться и тут его тоже нужно добавить
                            $(".toast").css({
                                display: "block"
                            }).animate({
                                opacity: 1
                            }, 500)
                            let likes = $("#likes_count")
                            likes.innerText = likes.innerText != "" ? parseInt(likes.innerText) + 1 : 1
                        }
                    })
                })
            }

            function addDislike(url) {
                let dislikeBtn = $(".movie__dislike-btn")
                dislikeBtn.click(function () {
                    $.ajax({
                        url: url,
                        type: "GET",
                        onsuccess: function (data) {
                            // показать лоадер и скрыть когда лайк добавиться и тут его тоже нужно добавить
                            $(".toast").css({
                                display: "block"
                            }).animate({
                                opacity: 1
                            }, 500)
                            $(".toast .message").innerText = JSON.parse(data).message
                            let dislikes = $("#dislikes_count")
                            dislikes.innerText = dislikes.innerText != "" ? parseInt(dislikes.innerText) + 1 : 1
                        }
                    })
                })
            }
        </script>

    </div>
</div>

</body>
</html>
