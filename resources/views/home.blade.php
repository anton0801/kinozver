@extends("layouts.layout")

@section("og")
    <meta name="" content="" />
@endsection

@section("title", "Главная - Кино зверь")
@section("keywords", "Кинозверь, кино зверь, kinozver, kino-zver, Кино зверь")
@section("description", "Кинозверь - Смотрите новые фильмы и сериалы в отличном качестве онлайн без регестрации (у нас их более 15000)")

@section("content")

    @include("parts.main.short-header-main")
    <div class="movies">
        <div class="list__movies">
            @foreach($movies["results"] as $movie)
                <div class="list_movie__item">
                    <div class="movie">
                        <div class="short__top">
                            <div class="movie__title">
                                <h2><a href="{{ route("show.movie", $movie["kinopoisk_id"]) }}">{{ $movie["info"]["rus"] }}</a></h2>
                            </div>
                            <div class="short__original__title">{{ $movie["info"]["orig"] }}</div>
                            <div class="movie__action">
                                <div class="movie__action-item movie__like-btn">
                                    <i class="fa fa-thumbs-up"></i>
                                </div>
                                <div class="movie__action-item movie__dislike-btn">
                                    <i class="fa fa-thumbs-down"></i>
                                </div>
                            </div>
                        </div>
                        <div class="movie__info-wrapper">
                            <a href="{{ route("show.movie", $movie["kinopoisk_id"]) }}" class="movie__image img-box">
                                <div class="movie__rating">
                                    <div class="rating__kp">{{ $movie["info"]["rating"]["rating_kp"] ?? "0.00" }} <span>({{ $movie["info"]["rating"]["vote_num_kp"] ?? "0" }} голоса)</span>
                                    </div>
                                    <div class="rating__imdb">{{ $movie["info"]["rating"]["rating_imdb"] ?? "0.00" }}
                                        <span>({{ $movie["info"]["rating"]["vote_num_imdb"] ?? "0" }} голоса)</span>
                                    </div>
                                </div>
                                <div class="img__overlay">
                                    <span class="fa fa-play"></span>
                                </div>
                                <img src="{{ $movie["info"]["poster"] }}" alt="Фото {{ $movie["info"]["rus"] }}">
                            </a>
                            <div class="movie__info">
                                <div class="short__desc">
                                    {{ mb_strlen($movie["info"]["description"]) < 250 ? $movie["info"]["description"] :
                                       \Illuminate\Support\Str::substr($movie["info"]["description"], 0, 250) . "..." }}
                                </div>
                                <div class="short__info"><span>Год:</span> {{ $movie["info"]["year"] }}</div>
                                <div class="short__info">
                                    @php
                                        $genres = explode(",", $movie["info"]["genre"]);
                                        $result = array();
                                        foreach ($genres as $genre)
                                            $result[] = "<a href=\"#\">$genre</a>";
                                        $genres = $result;
                                    @endphp
                                    <span>Жанр:</span> {!! implode(", ", $genres) !!}
                                </div>
                                <div class="short__info"><span>Режиссер:</span> {{ $movie["info"]["director"] }}</div>
                                <div class="short__info"><span>Актёры:</span> {{ $movie["info"]["actors"] }}</div>

                                <div class="short__bottom fx-row fx-middle">
                                    <a id="add__to-favorite" onclick="addToFavorite({{ $movie["kinopoisk_id"] }})"
                                       href="#">
                                        <div class="short-fav" title="Добавить в закладки">
                                            <span class="fa fa-plus-square"></span>в избранное
                                        </div>
                                    </a>
                                    <div class="short-date icon-l">
                                        @php

                                            @endphp
                                        <span class="fa fa-clock-o"></span>
                                        <time datetime="{{ date("d-m-yy, H:m", $movie["date"]) }}" class="ago"
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
        </div>
        <div class="grid__movies hidden" style="display: none !important;">
            @foreach($movies["results"] as $movie)
                <a href="{{ route("show.movie", $movie["kinopoisk_id"]) }}" class="movie">
                    <div class="movie__rating">
                        <div class="rating__kp">{{ $movie["info"]["rating"]["rating_kp"] ?? "0.00" }} <span>({{ $movie["info"]["rating"]["vote_num_kp"] ?? "0" }} голоса)</span>
                        </div>
                        <div class="rating__imdb">{{ $movie["info"]["rating"]["rating_imdb"] ?? "0.00" }}
                            <span>({{ $movie["info"]["rating"]["vote_num_imdb"] ?? "0" }} голоса)</span>
                        </div>
                    </div>
                    <div class="img__overlay">
                        <span class="fa fa-play"></span>
                    </div>
                    <img src="{{ $movie["info"]["poster"] }}" alt="Фото {{ $movie["info"]["rus"] }}">
                </a>
            @endforeach
        </div>
{{--        {{ $movies->links() }}--}}
    </div>

    <script>
        let listBtn = document.querySelector(".grid__list"),
            listMovies = document.querySelector(".list__movies"),
            gridBtn = document.querySelector(".grid__grid"),
            gridMovies = document.querySelector(".grid__movies");

        listBtn.addEventListener("click", () => {
            listMovies.classList.toggle("hidden")
        })
        gridBtn.addEventListener("click", () => {
            gridMovies.classList.toggle("hidden")
        })
    </script>

@endsection
