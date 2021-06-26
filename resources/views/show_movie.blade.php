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
                <a href="{{ route("search.filter", $genre) }}" itemprop="item">
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
                    <div class="mhelptext">Если в плеере горит черный экран это значит, что фильм не найден, попробуйте
                        переключить плеер
                    </div>
                    <div class="player tabs-box">
                        <div class="tabs">
                            <span class="first_player-btn current">Смотреть онлайн</span>
                            <span class="second_player-btn">Плеер-2</span>
                        </div>
                    </div>
                    <div class="player_first tabs-b video-box visible">
                        <div id="visearch">
                            <iframe src="{{ str_replace("\\", "", $movie->link) }}" frameborder="0" allowfullscreen=""
                                    style="width: 100%; height: 400px"></iframe>
                        </div>
                    </div>
                    <div class="second_player tabs-b video-box">
                        <div id="visearch">
                            <iframe src="https://39.svetacdn.in/N3dMPlk0C1Dl?kp_id={{ $kinopoisk_id }}" frameborder="0"
                                    allowfullscreen style="width: 100%; height: 400px"></iframe>
                        </div>
                    </div>
                    <div class="mplayer-btm fx-row fx-middle">
                        <div class="fx-row fx-middle">
                            {{--                            <div class="ratingtypeplusminus ignore-select ratingplus">--}}
                            {{--                                <div id="ratig-layer-1">--}}
                            {{--                                    <div class="rating">--}}
                            {{--                                        <ul class="unit-rating">--}}
                            {{--                                            <li class="current-rating" style="width:0%;">0</li>--}}
                            {{--                                            <li><a href="#" title="Плохо" class="r1-unit"--}}
                            {{--                                                   onclick="doRate('1', '1'); return false;">1</a></li>--}}
                            {{--                                            <li><a href="#" title="Приемлемо" class="r2-unit"--}}
                            {{--                                                   onclick="doRate('2', '1'); return false;">2</a></li>--}}
                            {{--                                            <li><a href="#" title="Средне" class="r3-unit"--}}
                            {{--                                                   onclick="doRate('3', '1'); return false;">3</a></li>--}}
                            {{--                                            <li><a href="#" title="Хорошо" class="r4-unit"--}}
                            {{--                                                   onclick="doRate('4', '1'); return false;">4</a></li>--}}
                            {{--                                            <li><a href="#" title="Отлично" class="r5-unit"--}}
                            {{--                                                   onclick="doRate('5', '1'); return false;">5</a></li>--}}
                            {{--                                        </ul>--}}
                            {{--                                    </div>--}}
                            {{--                                </div>--}}
                            {{--                            </div>--}}
                            @auth
                                @php($favoriteMovie = \App\Models\FavoriteMovie::where("movie_id", "=", $movie->id)->where("user_id", "=", auth()->user()->id)->first())
                                @if($favoriteMovie != null)
                                    <form action="{{ route("movies.favoriteDelete", $favoriteMovie->f_id) }}"
                                          method="post">
                                        @csrf
                                        <button type="submit" class="short-fav" title="удалить из избранного">
                                            <span class="fa fa-minus-square"></span> Удалить из избранного
                                        </button>
                                    </form>
                                @else
                                    <form action="{{ route("movies.favoriteAdd", $movie->id) }}" method="post">
                                        @csrf
                                        <button type="submit" class="short-fav" title="в избранное">
                                            <span class="fa fa-plus-square"></span> В избранное
                                        </button>
                                    </form>
                                @endif
                            @endauth
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
                            <div class="slider-track">
                                @foreach($similar_movies as $item)
                                    <a href="{{ route("show.movie", $item->kinopoisk_id) }}"
                                       class="similar__item-wr similar-slider-item">
                                        <div class="best_movies-item img-box with-mask">
                                            <img
                                                src="{{ $item->poster }}"
                                                alt="Фото {{ $item->title }}"
                                                class="similar_movie-img"
                                                style="width: 100%;height: 250px;object-fit: cover">
                                            <div class="img__overlay"><span class="fa fa-play"></span></div>
                                            <div class="short-meta short-meta-movie-qual">{{ $item->quality }}</div>
                                        </div>
                                        <span class="item__title similar_item-title">{{ $item->title }}</span>
                                    </a>
                                @endforeach
                            </div>
                        </div>
                    </div>
                </div>
                <div class="comments">
                    <div class="full-comms ignore-select">
                        <div class="comms__title fx-row icon-r">
                            <div class="add_comment_form-wr">
                                @auth
                                    <div class="add__comment-btn button" id="add__comment-btn">Добавить комментарий
                                    </div>
                                    <form action="{{ route("movie.addComment", $movie->kinopoisk_id) }}" method="post"
                                          class="add_comment_form">
                                        @csrf
                                        </div>
                                        <div class="ac-inputs fx-row">
                                            <input type="text" maxlength="55" name="email" id="mail"
                                                   value="{{ old("email") ?? auth()->user()->email ?? "" }}" required
                                                   placeholder="Ваш e-mail">
                                            <input type="text" maxlength="55" name="name" id="name"
                                                   value="{{ old("name") ?? auth()->user()->name ?? "" }}"
                                                   placeholder="Ваше имя (необязательно)">
                                        </div>
                                        <div class="ac-textarea">
                                            <textarea name="comment" id="" cols="30" rows="10"
                                                      style="color: black; width: 100%; height: 120px !important;"
                                                      placeholder="Введите ваш комментарий">{{ old("comment") ?? "" }}</textarea>
                                        </div>
                                        <button name="submit" type="submit">Отправить</button>
                                    </form>
                                @endauth
                                @guest
                                    <small>Чтобы оставить комментарий, нужно авторизоваться!</small>
                                @endguest
                            </div>
                            <span class="comments_count">
                                <span class="fa fa-comments"></span> Комментариев ({{ $comments->total() }})
                            </span>
                        </div>
                        <div class="comments__all" style="margin-top: 20px">
                            @if($comments->count() == 0)
                                <h2>К сожалению комментариев нет! Но ты можешь быть первым</h2>
                            @else
                                @foreach($comments as $comment)
                                    <div class="comment clearfix">
                                        <div class="comment__left img-box img-shadow">
                                            <img src="{{ $comment->avatarUrl }}" alt="">
                                        </div>
                                        <div class="comment_right">
                                            <div class="comm-one clearfix">
                                                <span class="comm-author">
                                                    @if(auth()->check())
                                                        @if(auth()->user()->id == $comment->user_id)
                                                            <span>Вы</span>
                                                        @else
                                                            <a href="mailto:{{ $comment->email }}">{{ $comment->name }}</a>
                                                        @endif
                                                    @else
                                                        <a href="mailto:{{ $comment->email }}">{{ $comment->name }}</a>
                                                    @endif
                                                </span>
                                                <span>
                                                    @if($comment->role_name == "Администратор")
                                                        <b>
                                                            <span style="color: red">{{ $comment->role_name }}</span>
                                                        </b>
                                                    @else
                                                        {{ $comment->role_name }}
                                                    @endif
                                                </span>
                                                <span>{{ getTimeForComment($comment->created) }}</span>
                                            </div>
                                            <div class="comm-two clearfix full-text">
                                                <div id="comm-id-{{ $comment->com_id }}">
                                                    <div id="comm-id-1">{{ $comment->comment }}</div>
                                                </div>
                                            </div>

                                            <ul class="comm-three icon-l clearfix">
                                                @if(auth()->check())
                                                    <li class="reply">
                                                        <i class="fa fa-reply"></i><a href="#">Ответить</a>
                                                    </li>
                                                    @if(\Illuminate\Support\Facades\Auth::user()->role_id == 1 || $comment->user_id == \Illuminate\Support\Facades\Auth::user()->id)
                                                        <li><a onclick="ajax_comm_edit('1', 'news'); return false;"
                                                               href="#">Редактировать</a></li>
                                                        <li>
                                                            <form
                                                                action="{{ route("movie.deleteComment", $comment->com_id) }}"
                                                                method="post">
                                                                @csrf
                                                                <input type="submit" value="Удалить"
                                                                       class="delete_link">
                                                            </form>
                                                            {{--                                                            <a href="">Удалить</a>--}}
                                                        </li>
                                                    @endif
                                                @endif
                                            </ul>
                                        </div>
                                    </div>
                                @endforeach
                                {{ $comments->links("parts.paginator") }}
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="/js/showMovie.js"></script>

    <script>

        $('.similar__movies .slider-track').slick({
            slidesToShow: 4,
            slidesToScroll: 2,
            arrows: true,
            responsive: [
                {
                    breakpoint: 990,
                    settings: {
                        arrows: false
                    }
                },
                {
                    breakpoint: 760,
                    settings: {
                        arrows: false,
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 580,
                    settings: {
                        arrows: false,
                        slidesToShow: 2
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
        });

        let addCommentBtn = $("#add__comment-btn"),
            commentForm = $(".add_comment_form"),
            isShow = false

        addCommentBtn.click(function () {
            if (isShow) {
                commentForm.animate({
                    width: 0,
                    height: 0,
                    padding: 0
                }, 500)
                isShow = false
            } else {
                commentForm.animate({
                    width: "100%",
                    height: "420px",
                    padding: "30px"
                }, 500)
                isShow = true
            }
        })
    </script>

@endsection
