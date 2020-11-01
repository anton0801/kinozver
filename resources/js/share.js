let links = document.querySelectorAll(".ya-share2__link"),
    iframe = document.querySelector(".ya-share2__iframe");

links.forEach(link => {
    link.addEventListener("click", () => {
        iframe.src = link.href;
    });
});