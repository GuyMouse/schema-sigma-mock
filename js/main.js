jQuery(function ($) {
    document.addEventListener("scroll", () => {
        const cover = document.querySelector(".cover-page");
        const scrollY = window.scrollY;

        if (cover) {
            cover.style.backgroundPositionY = `${scrollY * 0.55}px`;
        }
    });
    $('.sidebar ul li a').on('click', function (e) {
        e.preventDefault();
        var li = this.parentNode;
        var submenu = li.querySelector('ul');
        $('.sidebar ul li').removeClass('active');
        if (submenu) {
            if (li.classList.contains('open')) {
                $(submenu).slideUp();
                li.classList.remove('open');
                li.classList.remove('active');
            } else {
                $(submenu).slideDown();
                li.classList.add('open');
                li.classList.add('active');
            }
        } else {
            li.classList.add('active');
        }
    });
    $('.sidebar ul li:not(.has-submenu) a').on('click', function (e) {
        $(this).parent().addClass('active');
        let data = $(this).data('content');
        $('.content').hide();
        $(`.content[data-content=${data}]`).show();
    });
    function showContentFromHash() {
        const hash = window.location.hash.replace('#', '');
        if (!hash) return;

        $('.content').hide();
        $(`.content[data-content="${hash}"]`).show();

        // Optionally set the active sidebar link
        $('.sidebar ul li').removeClass('active');
        $(`.sidebar ul li a[data-content="${hash}"]`).parent().addClass('active');
    }

    showContentFromHash();

    window.addEventListener("hashchange", showContentFromHash);
});