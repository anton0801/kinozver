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
</head>
<body
    style="background: url('https://mocah.org/uploads/posts/318184-Avengers-Endgame-Thanos-4K.jpg') center top fixed no-repeat">

<div class="container">
    @include("parts.header.index")
    <div class="wrapper">
        <div class="best_movies">
            <div class="best_movies-in">
                <div class="slider">
                    <a class="slider__btn btn-prev"></a>
                    <a class="slider__btn btn-next"></a>
                    <div class="slider-track">
                        @foreach($top_movies as $top_movie)
                            <a href="{{ route("show.movie", $top_movie["kinopoisk_id"]) }}"
                               class="best_movies-item-wr slider-item" title="{{ $top_movie["info"]["rus"] }}">
                                <div class="best_movies-item img-box with-mask">
                                    <img
                                        src="{{ $top_movie["info"]["poster"] }}"
                                        alt="Фото {{ $top_movie["info"]["rus"] }}">
                                    <div class="img__overlay"><span class="fa fa-play"></span></div>
                                    <div class="short-meta short-meta-movie-qual">{{ $top_movie["quality"] }}</div>
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
            <a href="/" class="menu_item">Новинки</a>
            <a href="/" class="menu_item">Фильмы</a>
            <a href="/" class="menu_item">Сериалы</a>
            <a href="/" class="menu_item">Мультфильмы</a>
            <a href="/" class="menu_item">Документальные</a>
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
            </div> -->
            <!-- </div> -->
        </div>
        <main>
            @yield("content")
        </main>

    </div>
    <aside>
    </aside>
    @include("parts.footer.index")
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="/js/firebase.js" crossorigin async></script>
<script src="/js/slider.min.js" crossorigin async></script>
{{--<script src="{{ asset("js/main.js") }}"></script>--}}
</body>
</html>
