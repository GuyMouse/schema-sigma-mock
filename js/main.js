jQuery(function ($) {
    document.addEventListener("scroll", () => {
        const cover = document.querySelector(".cover-page");
        const scrollY = window.scrollY;

        if (cover) {
            // Parallax effect: move background up as you scroll down
            cover.style.backgroundPositionY = `${scrollY * 0.55}px`;
        }
    });
});