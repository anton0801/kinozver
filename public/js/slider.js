$(document).ready(function () {
    let position = 0;
    const slidersToShow = 8,
        slidersToScroll = 3,
        container = $(".slider"),
        track = $(".slider-track"),
        item = $(".slider-item"),
        btnNext = $(".btn-next"),
        btnPrev = $(".btn-prev"),
        itemsCount = item.length,
        itemWidth = container.width() / slidersToShow, // шмрена каждого элемента
        movePosition = slidersToScroll * itemWidth

    item.each(function (index, item) {
        $(item).css({
            minWidth: itemWidth
        })
    })

    btnNext.click(function () {
        const itemsLeft = itemsCount - (Math.abs(position) + slidersToShow * itemWidth) / itemWidth
        position -= itemsLeft >= slidersToScroll ? movePosition : itemsLeft * itemWidth
        setPosition()
        checkBtns()
    })

    btnPrev.click(function () {
        const itemsLeft = Math.abs(position) / itemWidth
        position += itemsLeft >= slidersToScroll ? movePosition : itemsLeft * itemWidth
        setPosition()
        checkBtns()
    })

    const setPosition = () => {
        track.css({
            transform: `translateX(${position}px)`
        })
    }

    const checkBtns = () => {
        btnPrev.prop("class", position === 0 ? "disabled" : "slider__btn btn-prev")
        btnNext.prop("class", position <= -(itemsCount - slidersToShow) * itemWidth ? "disabled" : "slider__btn btn-next")
    }

    checkBtns()

});
