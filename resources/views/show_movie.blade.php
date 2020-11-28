@extends("layouts.layout")

@php
    $genres = getGenres($movie);
    $genre = explode(",", $movie->genre)[0];
    $poster = $movie->poster;
    $movie_name = $movie->title;
    $movie_original_name = $movie->original_title;
    $time = getTime($movie);
    $duration = floor($movie->time / 3600 * 60) . " Минут";
    $qual = $movie->quality;
    $year = $movie->year;
    $country = $movie->country;
    $director = $movie->director;
    $actors = implode(", ", getActors($movie));
    $slogan = $movie->slogan;
    $age = $movie->age;
    $description = $movie->description;
    $kinopoisk_id = $movie->kinopoisk_id;
@endphp

@section("og")
    <meta name="og:title" content="{{ $movie_name }}"/>
    <meta name="og:description" content="{{ $description }}"/>
    <meta name="og:image" content="{{ $poster }}"/>
    <meta name="og:type" content="video.movie"/>
    <meta property="og:video:width" content="400"/>
    <meta property="og:video:height" content="300"/>
    <meta property="video:actor" content="{{ $movie->actors }}"/>
    <meta property="video:director" content="{{ $director }}"/>
    <meta property="video:duration" content="{{ $time }}"/>
    <meta property="video:release_date" content="{{ getTime($movie) }}"/>
    <meta property="video:tag" content="{{ $movie->genre }}"/>
    <meta name="og:url" content="https://kino-zver.site/show/movie/{{ $kinopoisk_id }}"/>
    <meta property="og:image:width" content="400"/>
    <meta property="og:image:height" content="300"/>
    <meta property="og:image:alt" content="{{ $movie->serial == "0" ? "Фильм" : "Сериал" . $movie_name }}"/>
@endsection

@section("title", $movie_name . " (" . $year . ") - Кино зверь")
@section("keywords", "$movie_name, Смотреть $movie_name, смотреть $movie_name, $movie_name Кино зверь, $movie_name кинозверь, $movie_name кино зверь")
@section("description", "Смотреть онлайн фильм $movie_name в хорошем качестве HD и совершенно бесплатно на Кино зверь")

@section("content")
    <div class="speed__bar">
        <span itemscope="" itemtype="https://schema.org/BreadcrumbList">
            <span itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem">
                <meta itemprop="position" content="1">
                <a href="/" itemprop="item">
                    <span itemprop="name">Главная</span>
                </a>
            </span> » <span itemprop="itemListElement" itemscope="" itemtype="https://schema.org/ListItem">
                <meta itemprop="position" content="2">
                <a href="/{{ $genre }}" itemprop="item">
                    <span itemprop="name">{{ $genre }}</span>
                </a>
            </span> » {{ $movie_name }}
        </span>
    </div>
    <div class="content">
        <div class="page" style="position: relative">
            {{--            <div class="background__image" style="background-image: url('{{ $poster }}');"></div>--}}
            <div class="movie__page ignore-select">
                <div class="short-top fx-row">
                    <div class="short-top-left fx-1">
                        <h1>{{ $movie_name }}</h1>
                        <div class="short-orig-title">{{ $movie_original_name }}</div>
                    </div>
                    <div class="short-top-right">
                        <div class="mdate icon-l">
                            <span class="fa fa-clock-o"></span>
                            <time datetime="{{ date("d-m-yy, H:m", $movie["date"]) }}" class="ago"
                                  title="{{ $time }}">{{ $time }}</time>
                        </div>
                    </div>
                </div>
                <div class="mcols fx-row">
                    <div class="mleft">
                        <div class="mimg img-wide">
                            <img src="{{ $poster }}" alt="{{ $movie_name }}">
                            <div class="short-meta short-meta-movie-qual">{{ $qual }}</div>
                        </div>
                        <div class="mplayer-scroll icon-l button">
                            <span class="fa fa-play-circle"></span>Смотреть онлайн
                        </div>
                    </div>
                    <div class="mright fx-1">
                        <div class="movie__rating movie-rating-in-page">
                            <div class="rating__kp">
                                {{ $movie->rating_kp }} <span>({{ $movie->vote_num_kp }} голоса)</span>
                            </div>
                            <div class="rating__imdb">{{ $movie->rating_imdb }}
                                <span>({{ $movie->vote_num_imdb }} голоса)</span>
                            </div>
                        </div>
                        <div class="short__info">
                            <div class="short-info"><span>Год:</span>
                                <span itemprop="genre">{{ $year }}</span>
                            </div>
                            <div class="short-info"><span>Страна:</span>
                                <span itemprop="countryOfOrigin">{{ $country }}</span>
                            </div>
                            <div class="short-info"><span>Жанр:</span>
                                <span itemprop="genre">{!! implode(", ", getGenres($movie)) !!}</span>
                            </div>
                            <div class="short-info">
                                <span>Продолжительность:</span>{{ $duration }}
                            </div>
                            <div class="short-info">
                                <span>Режиссер:</span> {{ $director }}
                            </div>
                            <div class="short-info">
                                <span>Актёры:</span> {!! $actors !!}
                            </div>
                            @if(!empty($slogan))
                                <div class="short-info">
                                    <span>Слоган:</span> {{ $slogan }}
                                </div>
                            @endif
                            <div class="short-info">
                                <span>Ограничение:</span> {{ $age . "+" }}
                            </div>
                            <div class="short-info mt">
                                <span>Премьера рф:</span> {{ $time }}
                            </div>
                            <div class="short-info">
                                <span>В качестве:</span> {{ $qual }}
                            </div>
                            <div class="short-info">
                                <span>Перевод:</span> {{ $movie["translation"] }}
                            </div>
                            <div class="desc">
                                <div class="mtext full-text video-box clearfix" id="desc">
                                    {{ $description }}
                                </div>
                                <p class="more-link">
                                    <a class="more">...Подробнее</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="player__control">
                    <h2 class="msubtitle">{{ $movie_name }} смотреть бесплатно онлайн</h2>
                    <div class="player tabs-box">
                        <div class="tabs">
                            <span class="first_player-btn current">Смотреть онлайн</span>
                            <span class="second_player-btn">Плеер-2</span>
                        </div>
                    </div>
                    <div class="player_first tabs-b video-box">
                        <div id="visearch">
                            <iframe src="{{ str_replace("\\", "", $movie->link) }}" frameborder="0" allowfullscreen=""
                                    style="width: 100%; height: 400px"></iframe>
                        </div>
                    </div>
                    <div class="second_player tabs-b video-box visible">
                        <div id="visearch">
                            <iframe src="https://39.svetacdn.in/N3dMPlk0C1Dl?kp_id={{ $kinopoisk_id }}" frameborder="0"
                                    allowfullscreen style="width: 100%; height: 400px"></iframe>
                        </div>
                    </div>
                    <div class="mplayer-btm fx-row fx-middle">
                        <div class="fx-row fx-middle">
                            <div class="ratingtypeplusminus ignore-select ratingplus">
                                <div id="ratig-layer-1">
                                    <div class="rating">
                                        <ul class="unit-rating">
                                            <li class="current-rating" style="width:0%;">0</li>
                                            <li><a href="#" title="Плохо" class="r1-unit"
                                                   onclick="doRate('1', '1'); return false;">1</a></li>
                                            <li><a href="#" title="Приемлемо" class="r2-unit"
                                                   onclick="doRate('2', '1'); return false;">2</a></li>
                                            <li><a href="#" title="Средне" class="r3-unit"
                                                   onclick="doRate('3', '1'); return false;">3</a></li>
                                            <li><a href="#" title="Хорошо" class="r4-unit"
                                                   onclick="doRate('4', '1'); return false;">4</a></li>
                                            <li><a href="#" title="Отлично" class="r5-unit"
                                                   onclick="doRate('5', '1'); return false;">5</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <a id="fav-id-1" onclick="addToFavorite({{ $kinopoisk_id }})" href="#">
                                <div class="short-fav" title="Добавить в избранное"><span
                                        class="fa fa-plus-square"></span>в избранное
                                </div>
                            </a>
                        </div>
                        <div class="yx-share">
                            <span class="yx-share-title">Рассказать друзьям!</span>
                            <div class="ya-share2 ya-share2_inited"
                                 data-services="vkontakte,facebook,odnoklassniki,twitter">
                                <div class="ya-share2__container ya-share2__container_size_m">
                                    <ul class="share__list">
                                        <li class="item__service-vk">
                                            <a
                                                href="https://vk.com/share.php?url={{ urlencode("https://kino-zver.site/show/movie/$kinopoisk_id") }}&title={{ urlencode($movie_name) }}&description={{ urlencode($description) }}&image={{ urlencode($poster) }}&utm_source=share2"
                                                rel="nofollow" target="_blank" title="Вконтакте">
                                                {{--                                                <i class="fa fa-vk"></i>--}}
                                                <img src="https://storge.pic2.me/c/1360x800/896/56b63adc10caa.jpg"
                                                     alt="">
                                            </a>
                                        </li>
                                        <li class="item__service-facebook">
                                            <a href="https://www.facebook.com/sharer.php?src=sp&u={{ urlencode("https://kino-zver.site/show/movie/$kinopoisk_id") }}&title={{ $movie_name }}&description={{ $description }}&picture={{ $poster }}&utm_source=share2"
                                               rel="nofollow" target="_blank" title="Facebook">
                                                {{--                                                <i class="fa fa-facebook-f"></i>--}}
                                                <img
                                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Facebook_logo_36x36.svg/1024px-Facebook_logo_36x36.svg.png"
                                                    alt="">
                                            </a>
                                        </li>
                                        <li class="item__service-odnoclasniki">
                                            <a href="https://connect.ok.ru/offer?url={{ urlencode("https://kino-zver.site/show/movie/$kinopoisk_id") }}&title={{ $movie_name }}&description={{ $description }}&imageUrl={{ $poster }}&utm_source=share2"
                                               rel="nofollow" target="_blank" title="Одноклассники">
                                                {{--                                                <i class="fa fa-odnoklassniki"></i>--}}
                                                <img
                                                    src="https://legkovmeste.ru/wp-content/uploads/2019/02/post_5b63e41512db3-600x458.jpg"
                                                    alt="">
                                            </a>
                                        </li>
                                        <li class="item__service-twitter">
                                            <a href="https://twitter.com/intent/tweet?text={{ $movie_name }}&url={{ urlencode("https://kino-zver.site/show/movie/$kinopoisk_id") }}&hashtags=&utm_source=share2"
                                               rel="nofollow" target="_blank" title="Twitter">
                                                {{--                                                <i class="fa fa-twitter"></i>--}}
                                                <img src="https://pbs.twimg.com/media/CDNsU_aUEAAi7B2.png" alt="">
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="msubtext">
                        При просмотре онлайн {{ $movie_name }}, не забудьте выбрать в плеере наилучшее качество HD 1080p
                        или HD 720p
                    </div>
                </div>
                <div class="similar__movies">
                    <div class="similar__movies-in">
                        <div class="slider">
                            <a class="slider__btn btn-prev"></a>
                            <a class="slider__btn btn-next"></a>
                            <div class="slider-track">
                                @foreach($similar_movies as $item)
                                    <a href="{{ route("show.movie", $item->kinopoisk_id) }}"
                                       class="similar__item-wr similar-slider-item">
                                        <div class="best_movies-item img-box with-mask">
                                            <img
                                                src="{{ $item->poster }}"
                                                alt="Фото {{ $item->title }}">
                                            <div class="img__overlay"><span class="fa fa-play"></span></div>
                                            <div class="short-meta short-meta-movie-qual">{{ $item->quality }}</div>
                                        </div>
                                        <span class="item__title"></span>
                                    </a>
                                @endforeach
                            </div>
                        </div>
                    </div>
                </div>
                <div class="comments">
                    <div class="full-comms ignore-select">
                        <div class="comms__title fx-row icon-r">
                            <div class="add__comment-btn button">Добавить комментарий</div>
                            <span></span>
                            <span>
                                <span class="fa fa-comments"></span> Комментариев (n)
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="/js/showMovie.js"></script>

    <script>
        let position = 0;
        const slidersToShow = 8,
            slidersToScroll = 3,
            container = $(".slider"),
            track = $(".slider-track"),
            item = $(".similar-slider-item"),
            btnNext = $(".btn-next"),
            btnPrev = $(".btn-prev"),
            itemsCount = item.length,
            itemWidth = container.width() / slidersToShow, // шмрена каждого элемента
            movePosition = slidersToScroll * itemWidth

        item.each(function (index, item) {
            $(item).css({
                minWidth: itemWidth
            })
        })

        btnNext.click(function () {
            const itemsLeft = itemsCount - (Math.abs(position) + slidersToShow * itemWidth) / itemWidth
            position -= itemsLeft >= slidersToScroll ? movePosition : itemsLeft * itemWidth
            setPosition()
            checkBtns()
        })

        btnPrev.click(function () {
            const itemsLeft = Math.abs(position) / itemWidth
            position += itemsLeft >= slidersToScroll ? movePosition : itemsLeft * itemWidth
            setPosition()
            checkBtns()
        })

        const setPosition = () => {
            track.css({
                transform: `translateX(${position}px)`
            })
        }

        const checkBtns = () => {
            btnPrev.prop("class", position === 0 ? "disabled" : "slider__btn btn-prev")
            btnNext.prop("class", position <= -(itemsCount - slidersToShow) * (itemWidth + 150) ? "disabled" : "slider__btn btn-next")
        }

        checkBtns()
    </script>

@endsection
