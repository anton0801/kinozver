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
            Сортировка по <form name="news_set_sort" id="news_set_sort" method="post" style="display: none; opacity: 0; transition: opacity .2s linear">
                @csrf
                <ul class="sort">
                    <li><a href="#">дате</a></li>
                    <li class="asc"><a href="#">популярности</a></li>
                    <li><a href="#">посещаемости</a></li>
                    <li><a href="#">комментариям</a></li>
                    <li><a href="#">алфавиту</a></li>
                </ul>
            </form>
            <span>популярности <span class="fa fa-angle-down"></span></span></div>
    </div>
</div>

<script>

    let btn = document.querySelector(".shorts__sort__movies"),
        isShoving = false

    btn.addEventListener("click", () => {
        if (isShoving) {
            document.querySelector("#news_set_sort").style.display = "block"
            document.querySelector("#news_set_sort").style.opacity = 1
            isShoving = false
        } else {
            document.querySelector("#news_set_sort").style.opacity = 0
            document.querySelector("#news_set_sort").style.display = "none"
            isShoving = true
        }
    })

</script>
