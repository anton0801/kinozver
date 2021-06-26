@extends("layouts.layout")

@section("og")
    <meta name="og:title" content="Главная - Кинозверь"/>
@endsection

@section("title", "Главная - Кино зверь")
@section("keywords", "Кинозверь, кино зверь, kinozver, kino-zver, Кино зверь, реклама, размещение рекламы, размещение рекламы на кинозверь")
@section("description", "Кинозверь - Смотрите новые фильмы и сериалы в отличном качестве онлайн без регестрации (у нас их более 15000)")

@section("content")
    <h2 style="padding-bottom: 10px; border-bottom: 1px solid #111">Обратная связь с администрацией сайта</h2>
    <form action="{{ route("feedback.send") }}" method="post" style="margin-top: 10px">
        @csrf
        <div style="display: flex; margin-bottom: 10px">
            <label for="mail" style="width: 50%">Ваш email <span style="color: red;">*</span></label>
            <label for="name" style="width: 50%; margin-left: 20px">Ваше имя <span style="color: red;">*</span></label>
        </div>
        <div class="ac-inputs fx-row">
            <input type="text" maxlength="55" name="email" id="mail" required placeholder="Ваш e-mail"
                   value="{{ old("email") ?? auth()->user()->email ?? "" }}">
            <input type="text" maxlength="55" name="name" id="name" required placeholder="Ваше имя"
                   value="{{ old("name") ?? auth()->user()->name ?? "" }}">
        </div>
        <input type="text" maxlength="55" name="subject" id="subject" placeholder="Тема сообщения (необязательно)"
               value="{{ old("subject") ?? "" }}">
        <div class="ac-textarea" style="margin-top: 15px">
            <textarea name="message" id="message" cols="30" rows="10" required placeholder="Введите ваше сообщение *"
                      style="color: black; width: 100%; height: 120px !important;">
                {{ old("message") ?? "" }}
            </textarea>
        </div>
        <button name="submit" type="submit">Отправить</button>
    </form>
@endsection
