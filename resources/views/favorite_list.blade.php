@extends("layouts.layout")

@section("og")
    <meta name="og:title" content="Главная - Кинозверь"/>
@endsection

@section("title", "Главная - Кино зверь")
@section("keywords", "Кинозверь, кино зверь, kinozver, kino-zver, Кино зверь")
@section("description", "Кинозверь - Смотрите новые фильмы и сериалы в отличном качестве онлайн без регестрации (у нас их более 15000)")

@section("content")
    @include("parts.main.short-header-main")
    <h2 style="margin-bottom: 20px; font-size: 34px">Ваш список ибранных фильмов</h2>
    <div class="movies">
        <div class="list__movies" style="transition: opacity .3s linear">
            @if($movies->count() > 0)
                @foreach($movies as $movie)
                    <div class="list_movie__item">
                        <div class="movie">
                            <div class="short__top">
                                <div class="movie__title">
                                    <h2>
                                        <a href="{{ route("show.movie", $movie->kinopoisk_id) }}">{{ $movie->title }}</a>
                                    </h2>
                                </div>
                                <div class="short__original__title">{{ $movie->original_title }}</div>
                                <div class="movie__action">
                                    @if($movie->likes > 0)
                                        <span style="margin-top: 18px;margin-right: 10px;font-size: 16px;">
                                            {{ $movie->likes }}
                                        </span>
                                    @endif
                                    <div class="movie__action-item movie__like-btn"
                                         onclick="addLike('{{ route("api.addLikeMovie") . "?movie_id=$movie->id" }}')">
                                        <i class="fa fa-thumbs-up"></i>
                                    </div>
                                    <div class="movie__action-item movie__dislike-btn"
                                         onclick="addDislike('{{ route("api.addDislikeMovie") . "?movie_id=$movie->id" }}')">
                                        <i class="fa fa-thumbs-down"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="movie__info-wrapper">
                                <a href="{{ route("show.movie", $movie->kinopoisk_id) }}" class="movie__image img-box">
                                    <div class="movie__rating-home">{{-- movie__rating --}}
                                        <div class="rating__kp">
                                            {{ $movie->rating_kp }} <span>({{ $movie->vote_num_kp }} голоса)</span>
                                        </div>
                                        <div class="rating__imdb">{{ $movie->rating_imdb }}
                                            <span>({{ $movie->vote_num_imdb }} голоса)</span>
                                        </div>
                                    </div>
                                    <div class="img__overlay">
                                        <span class="fa fa-play"></span>
                                    </div>
                                    <img src="{{ $movie->poster }}" alt="Фото {{ $movie->title }}">
                                </a>
                                <div class="movie__info">
                                    <div class="short__desc">
                                        {{ mb_strlen($movie->description) < 250 ? $movie->description :
                                           \Illuminate\Support\Str::substr($movie->description, 0, 250) . "..." }}
                                    </div>
                                    <div class="short__info"><span>Год:</span> {{ $movie->year }}</div>
                                    <div class="short__info">
                                        <span>Жанр:</span> {!! implode(", ", getGenres($movie)) !!}
                                    </div>
                                    <div class="short__info"><span>Режиссер:</span> {{ $movie->director }}</div>
                                    <div class="short__info">
                                        <span>Актёры:</span> {!! implode(", ", getActors($movie)) !!}
                                    </div>

                                    <div class="short__bottom fx-row fx-middle">
                                        @auth
                                            <a id="add__to-favorite" onclick="addToFavorite({{ $movie->kinopoisk_id }})"
                                               href="#">
                                                <form action="{{ route("movies.favoriteDelete", $movie->f_id) }}"
                                                      method="post">
                                                    @csrf
                                                    <button type="submit" class="short-fav"
                                                            title="удалить из избранного">
                                                        <span class="fa fa-minus-square"></span> Удалить из избранного
                                                    </button>
                                                </form>
                                            </a>
                                        @endauth
                                        @guest
                                            <a></a>
                                        @endguest
                                        <div class="short-date icon-l">
                                            <span class="fa fa-clock-o"></span>
                                            <time datetime="{{ date("d-m-yy, H:m", $movie->date) }}" class="ago"
                                                  title="{{ getTime($movie) }}">
                                                {{ getTime($movie) }}
                                            </time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            @else
                <div class="berrors">
                    <b>Информация</b>
                    <br>
                    {{ "У вас нет фильмов в избранном списке" }}
                </div>
            @endif
        </div>
        <div class="grid__movies grid-thumb hidden" style="display: none; transition: opacity .3s linear">
            @if($movies->count() > 0)
                @foreach($movies as $movie)
                    <div class="short fx-row">
                        <div class="short-top fx-row">
                            <div class="short-top-left">
                                <h2><a href="{{ route("show.movie", $movie->kinopoisk_id) }}">{{ $movie->title }}</a>
                                </h2>
                                <div class="short-original-title hidden">{{ $movie->original_title }}</div>
                            </div>
                        </div>

                        <div class="short-left">
                            <a class="short-img img-box with-mask"
                               href="{{ route("show.movie", $movie->kinopoisk_id) }}">
                                <img src="{{ $movie->poster }}" alt="{{ $movie->title }}">
                                <div class="short-meta short-meta-qual">{{ $movie->quality }}</div>

                                <div class="short-meta" style="top: 2%; left: 5%;">
                                    <div class="mrate-kp">{{ $movie->rating_kp }} <span>({{ $movie->vote_num_kp }} голосов)</span>
                                    </div>
                                    <div class="mrate-imdb">{{ $movie->rating_imdb }} <span>({{ $movie->vote_num_imdb }} голосов)</span>
                                    </div>
                                </div>

                                <span class="mask fx-col fx-center fx-middle"><span class="fa fa-play"></span></span>
                                <div class="short-meta short-meta-qual" style="top: 87%;">
                                    {{ $movie->serial == "1" ? $movie->last_season . "-й Сезон " . $movie->last_episode . "-я Серия" : floor($movie->time / 3600 * 60) . " Минут" }}
                                </div>
                                <div class="mrates"></div>
                            </a>
                        </div>
                    </div>
                @endforeach
            @else
                <div class="berrors">
                    <b>Информация</b>
                    <br>
                    {{ "К сожалению фильмов не найдено" }}
                </div>
            @endif
        </div>
        {{ $movies->links("parts.paginator") }}
    </div>

    <script>
        let listBtn = document.querySelector(".grid__list"),
            listMovies = document.querySelector(".list__movies"),
            gridBtn = document.querySelector(".grid__grid"),
            gridMovies = document.querySelector(".grid__movies");

        if (listMovies.classList.contains("hidden")) {
            listMovies.classList.remove("hidden")
        }
        listBtn.style.background = "#fd6500"
        listBtn.style.color = "#fff"

        listBtn.addEventListener("click", () => {
            listMovies.classList.remove("hidden")
            gridMovies.classList.add("hidden")

            listMovies.style.display = "block"
            listMovies.style.opacity = "1"
            gridMovies.style.opacity = "0"
            gridMovies.style.display = "none"

            listBtn.style.background = "#fd6500"
            listBtn.style.color = "#fff"

            gridBtn.style.background = "none"

        })
        gridBtn.addEventListener("click", () => {
            listMovies.classList.add("hidden")
            gridMovies.classList.remove("hidden")

            gridMovies.style.display = "flex"
            gridMovies.style.opacity = "1"
            listMovies.style.opacity = "0"
            listMovies.style.display = "none"

            gridBtn.style.background = "#fd6500"
            gridBtn.style.color = "#fff"

            listBtn.style.background = "none"
            listBtn.style.color = "#fff"
        })

        let loader = document.querySelector(".loader")
        // loader.remove()
    </script>
@endsection
