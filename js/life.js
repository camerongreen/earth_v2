var org = org || {};
org.camerongreen = org.camerongreen || {};

(function ($) {
  "use strict";

  // Evil globals
  org.camerongreen.dev = false;
  org.camerongreen.image_base = "/sites/all/modules/custom/life/images";
  org.camerongreen.html_base = "/sites/all/modules/custom/life/html";
  org.camerongreen.timing_seconds = org.camerongreen.dev ? 5 : 30;
  org.camerongreen.intro_timing_seconds = org.camerongreen.dev ? 1 : 4;

  /**
   * Show the users current age
   *
   * @param lc_canvas
   * @param age
   */
  org.camerongreen.showLifespan = function (lc_canvas, age) {
    $("<div>").attr({
      id: "age"
    }).html("You are currently <strong>" + age.years + "</strong> years, <strong>" + age.months + "</strong> months and <strong>" + age.days + "</strong> days old")
      .appendTo(lc_canvas);
  };

  /**
   * Show the users life expectancy
   *
   * @param lc_canvas
   * @param death
   */
  org.camerongreen.showLifeExpectancy = function (lc_canvas, death) {
    $("<div>").attr({
      id: "expectancy"
    })
      .html("On average you will live until <strong>" + death.getMonthName() + " " + death.getDate() + ", " + death.getFullYear() + "</strong>")
      .appendTo(lc_canvas);
    $("<div>").attr({
      id: "intro"
    })
      .html("If you continue eating animals this is how many individuals will live unhappy lives and then be killed on your behalf")
      .appendTo(lc_canvas);
  };

  /**
   * get the animals :)
   *
   * @return {Array}
   */
  org.camerongreen.getAnimals = function () {
    return [
      new org.camerongreen.Animal("Cows", "bovine meat", 195.05, "Kg", "cow"),
      new org.camerongreen.Animal("Pigs", "pigmeat", 65.32, "Kg", "pig"),
      new org.camerongreen.AnimalGroup("Poultry", "poultry meat", [
        new org.camerongreen.Animal("Chickens", "chicken meat", 0.818, "Kg", "hen"),
        new org.camerongreen.Animal("Turkeys", "turkey meat", 9.75, "Kg", "turkey"),
        new org.camerongreen.Animal("Ducks", "duck meat", 2.52, "Kg", "duck"),
        new org.camerongreen.Animal("Geese", "goose and guinea fowl meat", 4.93, "Kg", "goose")
      ]),
      new org.camerongreen.AnimalGroup("Goats and Lambs", "mutton & goat meat", [
        new org.camerongreen.Animal("Goats", "goat meat", 16.4, "Kg", "goat"),
        new org.camerongreen.Animal("Lambs", "sheep meat", 14.97, "Kg", "sheep")
      ])
    ];
  };

  /**
   * get the animals :)
   *
   * @return {Array}
   */
  org.camerongreen.getFish = function () {
    return [
      new org.camerongreen.Animal("Marine Fish", "fish, seafood", 0.08, "Kg", "fish"),
      new org.camerongreen.Animal("Freshwater Fish", "freshwater fish", 0.08, "Kg", "ffish")
    ];
  };

  /**
   * This is where the work is done, use the passed in stats
   * to make a table for output
   *
   * @param animals
   * @param consumption
   * @param production
   * @param years_left
   */
  org.camerongreen.calculateStats = function (animals, consumption, production, years_left) {
    var values = [];

    for (var j = 0, jl = animals.length; j < jl; j++) {
      var animal = animals[j];
      var consumed = org.camerongreen.getConsumption(consumption, animal);
      var annual_consumption = parseFloat(consumed.annual_consumption);

      if (animal instanceof org.camerongreen.AnimalGroup) {
        var subtypes = animal.getSubtypes();
        var subtype_consumption = org.camerongreen.getSubtypeConsumption(annual_consumption, production, subtypes);
        for (var k = 0, kl = subtypes.length; k < kl; k++) {
          if (subtype_consumption[k] !== false) {
            values.push(org.camerongreen.getAnimalStats(subtypes[k], subtype_consumption[k].annual_consumption, years_left, consumed.unit));
          }
        }
      } else {
        values.push(org.camerongreen.getAnimalStats(animal, annual_consumption, years_left, consumed.unit));
      }
    }

    return values;
  };

  /**
   * Find the consumption for a given animal
   * @param consumption
   * @param animal
   * @return {Number}
   */
  org.camerongreen.getConsumption = function (consumption, animal) {
    for (var i = 0, il = consumption.length; i < il; i++) {
      if (animal.getFaoName() === consumption[i].animal.toLowerCase()) {
        return consumption[i];
      }
    }

    throw "This shouldn't happen! " + animal.getFaoName();
  };

  /**
   * Show the table outlining the users consumption
   *
   * @param lc_canvas
   * @param consumption
   * @param production
   * @param years_left
   */
  org.camerongreen.showConsumptionTable = function (lc_canvas, consumption, production, years_left) {
    org.camerongreen.showHeader(function () {
      var values = org.camerongreen.calculateStats(org.camerongreen.getAnimals(), consumption, production, years_left);

      org.camerongreen.showRows(lc_canvas, "Terrestrial", values.sort(function (a, b) {
        return b[1] - a[1];
      }));

      var fish_values = org.camerongreen.calculateStats(org.camerongreen.getFish(), consumption, production, years_left);

      org.camerongreen.showRows(lc_canvas, "Aquatic", fish_values.sort(function (a, b) {
        return b[1] - a[1];
      }));

      org.camerongreen.showFooter(lc_canvas);
    });
  };

  /**
   * Simple function to add fade in for visibilty elements
   *
   * @param speed
   * @param fn
   * @return {*}
   */
  $.fn.fadeInVis = function (speed, fn) {
    return this.hide().css({visibility: "visible"}).fadeIn(speed, fn);
  };

  /**
   * show the header followed by the callback function
   *
   * @param fn
   */
  org.camerongreen.showHeader = function (fn) {
    $("#age").fadeInVis(org.camerongreen.intro_timing_seconds * 1000, function () {
      $("#expectancy").fadeInVis(org.camerongreen.intro_timing_seconds * 1000, function () {
        $("#intro").fadeInVis(org.camerongreen.intro_timing_seconds * 1000, function () {
          fn();
        });
      });
    });
  };

  org.camerongreen.showFooter = function (lc_canvas) {

    var govegan = $("<div>").attr({"id": "govegan"}).appendTo(lc_canvas);

    $("<div>").html("If you are interested in living a life as if animals mattered, there are thousands of people out there willing to help you.  <a href='/contact' target='new'>Get in touch</a> with me and let me know what sort of information you'd like, and I'll do my best to help out.").appendTo(govegan);

    govegan.delay(($(".results .row").length + 1) * 1000).fadeInVis();
  };

  /**
   * Takes an animal and various stats makes a db row for them
   *
   * @param animal
   * @param annual_consumption
   * @param years_left
   * @param unit
   * @return {Array}
   */
  org.camerongreen.getAnimalStats = function (animal, annual_consumption, years_left, unit) {
    var expected_consumption = annual_consumption * years_left;
    var individuals = animal.calculateIndividuals(expected_consumption);
    return [
      animal,
      individuals,
      annual_consumption.toFixed(2) + unit,
      expected_consumption.toFixed(2) + unit
    ];
  };

  /**
   * Work out the percentage each of the subtypes is from the annual
   * amount for their parent type
   *
   * @param annual_consumption
   * @param production
   * @param subtypes
   */
  org.camerongreen.getSubtypeConsumption = function (annual_consumption, production, subtypes) {
    var retVal = [];

    var subtypeDivisors = org.camerongreen.subtypeDivisors(production, subtypes);

    for (var i = 0, l = subtypes.length; i < l; i++) {
      if (subtypeDivisors[i] !== false) {
        var newObj = {
          "annual_consumption": annual_consumption * subtypeDivisors[i]
        };
        retVal.push(newObj);
      } else {
        retVal.push(false);
      }
    }

    return retVal;
  };

  /**
   * "subtypes" are animals which just have a broad grouping the the FAO
   * consumption statistics, such as poultry.  In the production statistics however
   * they are shown in greater detail.  So I use the approximate production percentages
   * to divide up the consumption in actual animals, in the case of poultry this
   * becomes chickens, ducks and geese etc.  It's approximate of course, assuming
   * a country eats the same things it produces, but it's the best I could do.
   *
   * @param production
   * @param subtypes
   * @return {Array}
   */
  org.camerongreen.subtypeDivisors = function (production, subtypes) {
    // create a hash to avoid lots of loops in the next
    // bit
    var phash = {}, fao_name, i, l;
    for (i = 0, l = production.length; i < l; i++) {
      phash[production[i].animal.toLowerCase()] = production[i].annual_production;
    }

    var total = 0;

    // create a total to divide the individuals by
    for (i = 0, l = subtypes.length; i < l; i++) {
      fao_name = subtypes[i].getFaoName();
      if (phash.hasOwnProperty(fao_name)) {
        total += parseFloat(phash[fao_name]);
      }
    }

    var subtypeDivisors = [];

    // now divide the individuals, with false
    // if we don't get the consumption for the subtype
    for (i = 0, l = subtypes.length; i < l; i++) {
      fao_name = subtypes[i].getFaoName();
      if (phash.hasOwnProperty(fao_name)) {
        var divisor = parseFloat(phash[fao_name]) / total;
        subtypeDivisors.push(divisor);
      } else {
        subtypeDivisors.push(false);
      }
    }

    return subtypeDivisors;
  };

  /**
   * Show rows
   *
   * @param lc_canvas
   * @param subheading for section
   * @param rows
   */
  org.camerongreen.showRows = function (lc_canvas, subheading, rows) {
    var outer = $("<div>")
      .addClass("results")
      .appendTo(lc_canvas);

    var h2 = $("<h2>").html(subheading).appendTo(outer);

    for (var i = 0; i < rows.length; i++) {
      var row = $("<div>").addClass("row").appendTo(outer);
      org.camerongreen.addRow(row, rows[i]);
      (function () {
        var indies = row.find(".individuals");
        row.delay(i * 1500).fadeIn("slow", function () {
          org.camerongreen.counter(indies, 0, org.camerongreen.timing_seconds * 1000);
          indies.fadeIn();
        });
      }());
    }
  };

  /**
   * Show row
   *
   * @param row
   * @param values
   */
  org.camerongreen.addRow = function (row, values) {
    var animal = values[0];
    var individuals = values[1];
    var annual = values[2];
    var lifetime = values[3];

    var col = $("<div>").addClass("image").appendTo(row);

    $("<img>").attr({
      src: org.camerongreen.image_base + "/" + animal.getImage()
    }).appendTo(col);

    $("<div>").addClass("animal").html(animal.getName()).appendTo(row);
    $("<div>").addClass("individuals").html(individuals).appendTo(row);

    // show the info column
    var infolink = $("<div>").addClass("infolink").appendTo(row);

    var info = $("<div>").addClass("info");

    org.camerongreen.addMoreInfo(animal, info, lifetime, annual);

    $("<a>").attr({
      "href": "javascript://",
      "title": "More information"
    }).html("More information")
      .click(function () {
        info.dialog({
          modal: true,
          width: "70%",
          close: false,
          title: "More information about " + animal.getName(),
          hide: "fadeOut"
        });
      }).appendTo(infolink);
  };

  /**
   * The container which will contain the popup info for each animal
   *
   * @param animal
   * @param container
   * @param life_cons
   * @param annual_cons
   */
  org.camerongreen.addMoreInfo = function (animal, container, life_cons, annual_cons) {
    // do tabs
    var tabouter = $("<div>").appendTo(container);
    var tabs = $("<ul>").appendTo(tabouter);
    tabs.append($("<li>").append($("<a>").attr({"href": org.camerongreen.html_base + "/" + animal.getId() + "-good.html"}).html("The good")));
    tabs.append($("<li>").append($("<a>").attr({"href": org.camerongreen.html_base + "/" + animal.getId() + "-bad.html"}).html("The bad")));

    var statsTab = $("<li>").appendTo(tabs);
    $("<a>").attr({"href": "#stats-tab"}).html("Statistics").appendTo(statsTab);
    var statsTabContent = $("<div>").attr({"id": "stats-tab"}).appendTo(tabouter);

    statsTabContent.append($("<p>").html(
      "According to the <a href='http://faostat.fao.org' target='_new'>United Nations</a> the average consumption per person annually in " + $("#country option:selected").text() + " of " + animal.getName().toLocaleLowerCase() + " is <strong>" + annual_cons + "</strong>."
    ));

    statsTabContent.append($("<p>").html(
      "Calculating your average life expectancy according to the Australian Bureau of Statistics on average you will consume <strong>" + life_cons + "</strong> of the " + animal.getWeightConsumed() + animal.getUnit() + " of edible body parts of " + animal.getName().toLowerCase() + " in your lifetime."
    ));

    statsTabContent.append($("<p>").html("Loading...").load(org.camerongreen.html_base + "/" + animal.getId() + "-stats.html"));

    tabouter.tabs({
      select: function (event, ui) {
        var tabID = "#ui-tabs-" + (ui.index + 1);
        $(tabID).html("<b>Fetching information....</b>");
      }
    });
  };

  /**
   * Using values from the (now hidden) popup form, calculate the effects
   * of someone going vegan :)
   */
  org.camerongreen.showStatistics = function () {
    $(".page-a-life #main-wrapper").fadeInVis();

    var lc_canvas = $("#content .section");

    var dob = org.camerongreen.parseDate($("#dob").val());
    var country = $("#country").val();
    var gender = $("input:radio[@name=gender]").val();

    var age = dob.dateUnitsBetween();

    org.camerongreen.showLifespan(lc_canvas, age);

    // var years_url = '/a/life/expectancy/' + age.years + '/' + gender + '/' + country;
    var years_url = '../data/au_life_table.csv';
    // var stats_url = '/a/life/animals/' + country;
    var stats_url = '/a/life/animals/' + country;

    Papa.parse(years_url, {
      header: true,
      download: true,
      delimiter: ",",
      complete: function (results) {
        $.each(results.data, function (key, val) {
        });
      }
    });

    $.getJSON(years_url, function (years_data) {
      var years_left = parseFloat(years_data);
      var death = new org.camerongreen.Date();
      death.addDecimalYears(years_left);

      org.camerongreen.showLifeExpectancy(lc_canvas, death);

      $.getJSON(stats_url, function (data) {
        org.camerongreen.showConsumptionTable(lc_canvas, data["consumption"], data["production"], years_left);
      });
    });
  };

  /**
   * Show the popup form users see when they open the page
   */
  org.camerongreen.showPopup = function () {
    var details_form = $("<form>").attr({
      id: "userform"
    });

    var country_container = $('<div>')
      .appendTo(details_form);

    $('<label>').attr({
      "for": "country"
    }).html("What country do you live in?")
      .appendTo(country_container);

    var countries = $("<select>").attr({
      id: "country"
    }).appendTo(country_container);

    $("<option>").attr({
      value: "none"
    }).html("Please choose")
      .appendTo(countries);

    Papa.parse('../data/iso_country_list.csv', {
      header: true,
      download: true,
      delimiter: ",",
      complete: function (results) {
        $.each(results.data, function (key, val) {
          $("<option>").attr({
            value: val[" \"iso2\""]
          }).html(val.Country)
            .appendTo(countries);
        });
      }
    });

    if (org.camerongreen.dev) {
       $(countries).val("AU");
    }

    var dob_container = $('<div>')
      .appendTo(details_form);

    $('<label>').attr({
      "for": "dob"
    }).html("When where you born?")
      .appendTo(dob_container);

    var dob = $('<input>').attr({
      type: "text",
      id: "dob",
      name: "dob"
    }).appendTo(dob_container);

    $(dob).datepicker({
      changeMonth: true,
      changeYear: true,
      dateFormat: "yy-mm-dd",
      defaultDate: "-21y",
      minDate: "-100y",
      maxDate: "-5y",
      yearRange: "-100:-5"
    });

    if (org.camerongreen.dev) {
      $(dob).val("1969-07-21");
    }

    var gender_container = $('<div>')
      .appendTo(details_form);

    $('<label>').attr({
      "for": "gender"
    }).html("Gender?")
      .appendTo(gender_container);

    $("<input>").attr({
      id: "gender_female",
      name: "gender",
      value: "f",
      type: "radio",
      checked: "checked"
    }).appendTo(gender_container);

    $("<span>").html("Female").appendTo(gender_container);

    $("<input>").attr({
      id: "gender_male",
      name: "gender",
      value: "m",
      type: "radio"
    }).appendTo(gender_container);

    $("<span>").html("Male").appendTo(gender_container);

    $(details_form).append($("<div>").attr({
      "class": "disclaimer"
    }).html("* Data used for calculation purposes only.  It is never stored by this website and will be forgotten when you leave this page."));

    details_form.dialog({
      modal: true,
      width: "450px",
      close: false,
      title: "Enter details",
      hide: "fadeOut",
      buttons: {
        "Submit": function (e) {
          e.preventDefault();

          $(".ui-state-error").hide();

          // hmm could do more here...
          var dateRegex = /^[12][0-9]{3}-(0[1-9]|1[0-2])-([0-2][0-9]|3[01])$/;

          if (!$("#dob").val().match(dateRegex)) {
            var dobError = $("<div><div>").html("Invalid Date, format yyyy-mm-dd").addClass("ui-state-error");
            $("#dob").after($(dobError));
          } else if ($("#country").val() === "none") {
            var countryError = $("<div><div>").html("Please choose a country").addClass("ui-state-error");
            $("#country").after($(countryError));
          } else {
            $(this).dialog("close");
            org.camerongreen.showStatistics();
          }
        }
      }
    });

    $(".ui-dialog-titlebar-close").hide();
  };

  $(document).ready(function () {
    org.camerongreen.showPopup();
  });

}(jQuery));

