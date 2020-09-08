import {getSectionUrl} from './modules/page.js';

(function ($) {
  $(document).ready(() => {
    $('#banner').click(() => {
      document.location = getSectionUrl();
    });

    if ($('#toTop')) {
      $('#toTop a').click(function (e) {
        window.scrollTo(0, 0);
        e.preventDefault();
        return false;
      });
      $(window).scroll(function () {
        if ($(this).scrollTop() > $('#banner').height()) {
          $('#toTop:hidden').stop(true, true).fadeIn();
        }
        else {
          $('#toTop').stop(true, true).fadeOut();
        }
      });
    }

    $('#responsive-menu > li > a').click(function (e) {
      $('#block-system-main-menu').toggle();
      $('#block-system-main-menu ul.menu li.last').removeClass('expanded');
      e.preventDefault();
      return false;
    });
  });
}(jQuery));
