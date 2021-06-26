@extends("layouts.layout")

@section("og")

@endsection

@section("keywords", "")
@section("description", "")

@section("content")
    <form action="{{ route("search") }}" class="search__table" style="margin-bottom: 20px;">
        @csrf
        <article>
            <header>
                <h1 style="margin: 0 0 20px -10px">Поиск по сайту</h1>
            </header>
            <input type="text" name="q" id="searchinput" class="textin" style="width: 100%"><br>
            <input type="submit" class="bbcodes" id="dosearch" value="Начать поиск">
            <input type="button" class="bbcodes" name="dofullsearch" id="dofullsearch"
                   value="Расширенный поиск" onclick="showFullSearch()">
        </article>
    </form>
    @include("parts.message")
    @if(isset($movies))
        <div class="movies">
            <div class="list__movies-search">
                @foreach($movies as $movie)
                    <a href="{{ route("show.movie", $movie->kinopoisk_id) }}" class="search__movie clearfix">
                        <div class="movie__wrapper">
                            <div class="search__image">
                                <div class="movie__date">{{ getTime($movie) }}</div>
                                <img src="{{ $movie->poster }}" alt="Фото {{ $movie->title }}">
                            </div>
                            <div class="search__movie-info">
                                <h2>{{ $movie->title }}</h2>
                                <span class="movie__description">{!! $movie->description  !!}</span>
                            </div>
                        </div>
                    </a>
                @endforeach
            </div>
            {{ $movies->links("parts.paginator") }}
        </div>
    @endif

@endsection
