<header class="header">
    <div class="header__inner">

        @guest
            <div class="login not--logged">
                <div class="btn-login">Авторизация</div>
                <a href="#">Регистрация</a>
            </div>
        @endguest
        @auth
            <ul class="login logged">
                <div class="overlay" id="overlay">
                    <li class="logged__link">
                        <a href="#">
                            <div class="login-av img-box">
                                <img src="{{ asset("images/noavatar.png") }}" alt="UserName">
                            </div>
                        </a>
                    </li>
                    <li class="logged__link">
                        <a href="#">
                            <span class="fa fa-heart"></span>
                            <div class="login__count">1</div>
                        </a>
                    </li>
                    @if(\Illuminate\Support\Facades\Auth::user()->role == "admin")
                        <li class="logged__link">
                            <a href="#">
                                <span class="fa fa-cog"></span>
                            </a>
                        </li>
                    @endif
                </div>
            </ul>
        @endauth

        <a href="{{ route("home") }}" class="logo">
            Кинозверь
        </a>

        <form action="{{ route("search") }}" method="get" class="search">
            @csrf
            <div class="search__box">
                <input type="text" placeholder="Пойск фильмов..." name="q" autocomplete>
                <button type="submit" title="Поиск" class="btn-search">Поиск</button>
            </div>
        </form>

    </div>
</header>
