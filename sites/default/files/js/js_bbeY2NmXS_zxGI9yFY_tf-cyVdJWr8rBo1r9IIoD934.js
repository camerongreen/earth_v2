(function ($) {
    $(document).ready(function () {
        $("#banner").click(function () {
            var path = window.location.pathname;
            var parts = path.split("/");
            var doc_location = "/" + parts[1];
            document.location = doc_location;
        });

        if ($("#toTop")) {
            $("#toTop a").click(function (e) {
                window.scrollTo(0, 0);
                e.preventDefault();
                return false;
            });
            $(window).scroll(function () {
                if ($(this).scrollTop() > $("#banner").height()) {
                    $('#toTop:hidden').stop(true, true).fadeIn();
                } else {
                    $('#toTop').stop(true, true).fadeOut();
                }
            });
        }
        $('#responsive-menu > li > a').click(function (e) {
            $("#block-system-main-menu").toggle();
            $("#block-system-main-menu ul.menu li.last").removeClass("expanded");
            e.preventDefault();
            return false;
        });
    });
}(jQuery));

;
