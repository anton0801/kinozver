@extends("layouts.layout")

@section("og")
    <meta name="og:title" content="{{ $movie["info"]["rus"] }}" />
    <meta name="og:description" content="{{ $movie["info"]["description"] }}" />
    <meta name="og:image" content="{{ $movie["info"]["poster"] }}" />
    <meta name="og:type" content="video.movie" />
    <meta property="og:video:width" content="400" />
    <meta property="og:video:height" content="300" />
    <meta property="video:actor" content="{{ $movie["info"]["actors"] }}" />
    <meta property="video:director" content="{{ $movie["info"]["director"] }}" />
    <meta property="video:duration" content="{{ $movie["info"]["time"] }}" />
    <meta property="video:release_date" content="{{ getTime($movie) }}" />
    <meta property="video:tag" content="{{ $movie["info"]["genre"] }}" />
    <meta name="og:url" content="https://kino-zver.site/show/movie/{{ $movie["kinopoisk_id"] }}" />
    <meta property="og:image:width" content="400" />
    <meta property="og:image:height" content="300" />
    <meta property="og:image:alt" content="{{ $movie["serial"] == "0" ? "Фильм" : "Сериал" . $movie["info"]["rus"] }}" />
@endsection

@section("title", $movie["info"]["rus"] . " (" . $movie["info"]["year"] . ") - Кино зверь")
@section("keywords", "")
@section("description", "")

@section("content")



@endsection
