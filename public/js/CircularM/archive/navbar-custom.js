(function ($) {
    "use strict";

    // Window Resize Mobile Menu Fix
    mobileNav();

    // Menu Dropdown Toggle
    if ($(".menu-trigger").length) {
        $(".menu-trigger").on("click", function () {
            $(this).toggleClass("active");
            $(".header-area .nav").slideToggle(200);
        });
    }

    // Window Resize Mobile Menu Fix
    $(window).on("resize", function () {
        mobileNav();
    });

    // Window Resize Mobile Menu Fix
    function mobileNav() {
        var width = $(window).width();

        $(".submenu").on("click", function () {
            if (width < 992) {
                var $submenuUL = $(this).find("ul");
                var isActive = $submenuUL.hasClass("active");

                $(".submenu ul").removeClass("active");

                if (!isActive) {
                    $submenuUL.addClass("active");
                }
            }
        });
    }
})(window.jQuery);
