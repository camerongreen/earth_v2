(function ($) {
  $("#atlas").hide().fadeIn(5000);

  var sections = {
    "e": "Environmental",
    "a": "Animal Liberation",
    "r": "Revolution",
    "t": "Transcendence",
    "h": "Human Rights"
  };

  for (var section in sections) {
    if (sections.hasOwnProperty(section)) {
      $("#" + section).hover(function () {
        $("#title-text h1 span").text(this.title).stop(true, true).fadeTo("slow", 0.9, function () {
          fading_in = false;
        });
      }, function () {
        $("#title-text h1 span").stop(true, true).fadeOut();
      });
    }
  }

  if (Modernizr.touch) {
    $('#earth').addClass('touch-screen');
  }

}(jQuery));

;
