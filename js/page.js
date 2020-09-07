(function ($) {
  $(document).ready(() => {
    $('#banner').click(() => {
      var path = window.location.pathname;
      var parts = path.split('/');
      var docLocation = [];
      for (let part of parts) {
        docLocation.push(part);
        if (['e', 'a', 'r', 't', 't', 'about'].indexOf(part) !== -1) {
          break;
        }
      }
      document.location = docLocation.join('/');
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
