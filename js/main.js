jQuery(function ($) {
    document.addEventListener("scroll", () => {
        const cover = document.querySelector(".cover-page");
        const scrollY = window.scrollY;

        if (cover) {
            cover.style.backgroundPositionY = `${scrollY * 0.55}px`;
        }
    });
    // Handle submenu open/close only when SVG inside .sidebar ul li a is clicked
    $('.sidebar ul li a svg').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation(); // Prevent parent link click
        var li = $(this).closest('li')[0];
        var submenu = li.querySelector('ul');
        $('.sidebar ul li').removeClass('active');
        if (submenu) {
            if (li.classList.contains('open')) {
                $(submenu).slideUp();
                li.classList.remove('open');
                li.classList.remove('active');
                $('.close').removeClass('active');
            } else {
                $(submenu).slideDown();
                li.classList.add('open');
                li.classList.add('active');
                $('.close').addClass('active');
            }
        } else {
            li.classList.add('active');
        }
    });
    $('.sidebar ul li a').on('click', function (e) {
        $('.sidebar ul li').removeClass('active');
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
        $(`.sidebar ul li a[data-content="${hash}"]`).trigger('click');
    }

    showContentFromHash();

    window.addEventListener("hashchange", showContentFromHash);

    function updateBreadcrumbs(pathArray) {
        const wrapper = document.querySelector('.breadcrumbs--wrapper');
        if (!wrapper) return;
        wrapper.innerHTML = '';
        pathArray.forEach((item, idx) => {
            const crumb = document.createElement('span');
            crumb.className = 'breadcrumb';
            crumb.textContent = item;
            wrapper.appendChild(crumb);
            if (idx < pathArray.length - 1) {
                const sep = document.createElement('span');
                sep.className = 'breadcrumb-separator';
                sep.textContent = ' > ';
                wrapper.appendChild(sep);
            }
        });
    }

    function getBreadcrumbPath(link) {
        const path = [];
        let li = link.parentElement;
        while (li && li.tagName === 'LI') {
            const a = li.querySelector('a');
            if (a) path.unshift(a.textContent.trim());
            li = li.parentElement.closest('li');
        }
        return path;
    }

    $('.sidebar ul li a').on('click', function () {
        const path = getBreadcrumbPath(this);
        updateBreadcrumbs(path);
    });

    // Initialize breadcrumbs on page load if hash exists
    if (window.location.hash) {
        const activeLink = $(`.sidebar ul li a[data-content="${window.location.hash.replace('#', '')}"]`)[0];
        if (activeLink) {
            const path = getBreadcrumbPath(activeLink);
            updateBreadcrumbs(path);
        }
    }
    $('.actions .buttons-wrapper button').on('click', function (e) {
        e.preventDefault();
        if ($(this).hasClass('active')) {
            return;
        }
        $('.actions .buttons-wrapper button').removeClass('active');
        $(this).toggleClass('active');
    });
    $('.actions .buttons-wrapper button.hide-text').on('click', function (e) {
        $('.content .page-title,.content p,.content ul, .content figcaption').addClass('hide');
        $('.content img').removeClass('hide');
    });

    $('.actions .buttons-wrapper button.hide-image').on('click', function (e) {
        $('.content img').addClass('hide');
        $('.content .page-title, .content p, .content ul').removeClass('hide');

        // // Restore text in paragraphs
        // $('.content .content-wrapper p').each(function () {
        //     $(this).find('span.hide').each(function () {
        //         $(this).replaceWith(document.createTextNode($(this).text()));
        //     });
        // });
        // $('.content .content-wrapper p').removeClass('hide');

        // // Restore text in list items
        // $('.content .content-wrapper ul').removeClass('hide');
        // $('.content .content-wrapper ul li').each(function () {
        //     $(this).find('span.hide').each(function () {
        //         $(this).replaceWith(document.createTextNode($(this).text()));
        //     });
        // });
    });

    $('.actions .buttons-wrapper button.show-both').on('click', function (e) {
        $('.content img').removeClass('hide');
        $('.hide').removeClass('hide');

        // Restore text in paragraphs
        // $('.content .content-wrapper p').each(function () {
        //     $(this).find('span.hide').each(function () {
        //         $(this).replaceWith(document.createTextNode($(this).text()));
        //     });
        // });
        // $('.content .content-wrapper p').removeClass('hide');

        // // Restore text in list items
        // $('.content .content-wrapper ul').removeClass('hide');
        // $('.content .content-wrapper ul li').each(function () {
        //     $(this).find('span.hide').each(function () {
        //         $(this).replaceWith(document.createTextNode($(this).text()));
        //     });
        // });
    });

    $('.close').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $('li.has-submenu').toggleClass('open').find('ul').slideToggle();
        $('li.has-submenu').removeClass('active');
    });
    const $dots = $('.dot[data-part]');
    const $rows = $('.table-row[data-part]');
    const $images = $('.image-wrapper img');
    const $defaultImage = $('.image-wrapper img[data-part=""]');

    function activatePart(part) {
        $images.removeClass('active');
        $rows.removeClass('highlight');

        $images.each(function () {
            if ($(this).data('part') === part) {
                $(this).addClass('active');
            }
        });

        $(`.table-row[data-part="${part}"]`).addClass('highlight');
    }

    function resetHighlight() {
        $images.removeClass('active');
        $rows.removeClass('highlight');
        $defaultImage.addClass('active');
    }

    // Hover on dots
    $dots.on('mouseenter', function () {
        const part = $(this).data('part');
        activatePart(part);
    });

    $dots.on('mouseleave', function () {
        resetHighlight();
    });

    // Hover on table rows
    $rows.on('mouseenter', function () {
        const part = $(this).data('part');
        activatePart(part);
    });

    $rows.on('mouseleave', function () {
        resetHighlight();
    });


});