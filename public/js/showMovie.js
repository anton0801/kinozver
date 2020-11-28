// read more description
let desc = document.querySelector(".mtext"),
    moreLink = document.querySelector(".more-link"),
    fullText = desc.textContent,
    fullLength = fullText.length,
    fullHeight = desc.style.height

moreLink.style.opacity = 0

if (fullLength > 250) {
    moreLink.style.opacity = 1
    desc.textContent = desc.textContent.slice(0, 250)
    desc.style.height = "70px"
    let isOpen = false
    moreLink.addEventListener("click", function (e) {
        e.preventDefault()
        if (isOpen) {
            moreLink.textContent = "...Подробнее"
            desc.textContent = desc.textContent.slice(0, 250)

            desc.animate({height: fullHeight}, 300)
            desc.style.animation = "hideText .5s linear"
            desc.style.height = "70px"
            isOpen = false
        } else {
            moreLink.textContent = "Скрыть"
            desc.style.animation = "showText .4s linear"
            desc.textContent = fullText
            desc.style.height = fullHeight
            isOpen = true
        }
    })
}


// smooth scroll
let btn_scroll = $(".mplayer-scroll")
btn_scroll.click(function () {
    let blockScroll = $(".player__control").offset().top
    $("html, body").animate({
        scrollTop: blockScroll
    })
})

// replace plaer

// сделать нормальое переключение плеера
// там нужно проверять у какого плеера класс visible ту кнопку и включать (делать ее current)

let firstPlayerBtn = document.querySelector(".first_player-btn"),
    secondPlayerBtn = document.querySelector(".second_player-btn"),
    playerFirst = document.querySelector(".player_first"),
    playerSecond = document.querySelector(".second_player")

firstPlayerBtn.addEventListener("click", () => {
    firstPlayerBtn.classList.add("current")
    playerFirst.classList.add("visible")
    if (secondPlayerBtn.classList.contains("current") && playerSecond.classList.contains("visible")) {
        secondPlayerBtn.classList.remove("current")
        playerSecond.classList.remove("visible")
    }
})

secondPlayerBtn.addEventListener("click", () => {
    secondPlayerBtn.classList.add("current")
    playerSecond.classList.add("visible")
    if (firstPlayerBtn.classList.contains("current") && playerFirst.classList.contains("visible")) {
        firstPlayerBtn.classList.remove("current")
        playerFirst.classList.remove("visible")
    }
})


// add comments

let comments = document.querySelector(".comments")
