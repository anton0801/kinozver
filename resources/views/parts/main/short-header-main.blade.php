<div class="short-header-main fx-middle fx-row">
    <div class="grid__select">
        <div class="grid__list">
            <span class="fa fa-bars"></span>
        </div>
        <div class="grid__grid">
            <span class="fa fa-th"></span>
        </div>
    </div>
    <div class="shorts__title">
        <span>Новые фильмы</span> Онлайн
    </div>
    <div class="shorts__sort__movies">
        <div class="sorter icon-r" data-label="Сортировка по">
            Сортировка по
            <form name="news_set_sort" id="news_set_sort" method="post"
                  style="display: none; opacity: 0; transition: opacity .2s linear">
                @csrf
                @php
                    $currentUrl = request()->url();
                    $route = "";
                    if ($currentUrl == route("home")) {
                        $route = route("home");
                    } else {
                        if (auth()->check()) {
                            $route = route("movies.favorite", auth()->user()->id);
                        } else {
                            $route = route("home");
                        }
                    }
                @endphp
                <ul class="sort">
                    <li><a href="{{ $route . "?order=дате" }}">дате</a></li>
                    <li class="asc"><a href="{{ $route . "?order=популярности" }}">популярности</a></li>
                    <li><a href="{{ $route . "?order=алфавиту" }}">алфавиту</a></li>
                </ul>
            </form>
            <span>@switch(request()->order)
                    @case("популярности")
                    популярности
                    @break
                    @case("дате")
                    дате
                    @break
                    @case("алфавиту")
                    алфавиту
                    @break
                    @default
                    дате
                    @break
                @endswitch <span class="fa fa-angle-down"></span></span></div>
    </div>
</div>

<script>

    let btn = document.querySelector(".shorts__sort__movies"),
        isShoving = false,
        isGridShow = false

    btn.addEventListener("click", () => {
        if (isShoving) {
            document.querySelector("#news_set_sort").style.display = "block"
            document.querySelector("#news_set_sort").style.opacity = 1
            isShoving = false
            isGridShow = true
        } else {
            document.querySelector("#news_set_sort").style.opacity = 0
            document.querySelector("#news_set_sort").style.display = "none"
            isShoving = true
            isGridShow = false
        }
    })

</script>
