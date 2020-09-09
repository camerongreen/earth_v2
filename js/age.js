var org = org || {};
org.camerongreen = org.camerongreen || {};

(function () {
  "use strict";

  var date;

  org.camerongreen.Date = function () {
    // I only need a couple of these, add more as needed
    // could this be curried?
    switch (arguments.length) {
      case 1:
        this.date = new Date(arguments[0]);
        break;
      case 2:
        this.date = new Date(arguments[0], arguments[1]);
        break;
      case 3:
        this.date = new Date(arguments[0], arguments[1], arguments[2]);
        break;
      default:
        this.date = new Date();
    }
  }

  // errgg....the alternative was to add my functions
  // to the date prototype which I don't think is the way to go
  org.camerongreen.Date.prototype.getMonthName = function () {
    return this.date.getMonthName();
  }

  org.camerongreen.Date.prototype.getDate = function () {
    return this.date.getDate();
  }

  org.camerongreen.Date.prototype.getYear = function () {
    return this.date.getYear();
  }

  org.camerongreen.Date.prototype.getMonth = function () {
    return this.date.getMonth();
  }

  org.camerongreen.Date.prototype.getFullYear = function () {
    return this.date.getFullYear();
  }

  /**
   * Modifies the objects date to be incremented
   * by the years passed in
   *
   * @param {int} years
   * @return {date} object
   */
  org.camerongreen.Date.prototype.addDecimalYears = function (years) {
    this.date.setFullYear(this.date.getFullYear() + Math.floor(years));

    var remainder = years % Math.floor(years);

    var days = remainder * 365;
    var months = Math.floor(days / (365 / 12));

    var days_remainder = Math.floor(days % (365 / 12));

    this.date.setMonth(this.date.getMonth() + months);
    this.date.setDate(this.date.getDate() + days_remainder);
  };

  /**
   * Return an age object representing days months and years
   * until the passed in date
   *
   * @param {date} date_to  default is now
   * @return {Object} object literal with months, years, days
   */
  org.camerongreen.Date.prototype.dateUnitsBetween = function (date_to) {
    if (!date_to) {
      date_to = new Date();
    }

    var age = {
      days: null,
      months: null,
      years: date_to.getYear() - this.date.getYear()
    };

    if (this.date.getMonth() > date_to.getMonth()) {
      age.years--;
      age.months = (12 - this.date.getMonth()) + date_to.getMonth();
    } else {
      age.months = date_to.getMonth() - this.date.getMonth();
    }

    if (this.date.getDate() > date_to.getDate()) {
      age.months--;
      if (age.months < 0) {
        age.months = 11;
        age.years--;
      }
      var last_month = new Date(date_to.getYear(), date_to.getMonth(), 0);
      age.days = (last_month.getDate() - this.date.getDate()) + date_to.getDate();
    } else {
      age.days = date_to.getDate() - this.date.getDate();
    }

    return age;
  };

// http://stackoverflow.com/questions/1643320/get-month-name-from-date-using-javascript
  org.camerongreen.Date.prototype.monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
  ];

  org.camerongreen.Date.prototype.getMonthName = function () {
    return this.monthNames[this.date.getMonth()];
  };

  org.camerongreen.parseDate = function (str) {
    var mdy = str.split('-');
    return new org.camerongreen.Date(mdy[0], mdy[1] - 1, mdy[2]);
  };
}());
