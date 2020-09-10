/**
 * Created with JetBrains PhpStorm.
 * User: cameron
 * Date: 3/06/12
 * Time: 9:41 PM
 */
module("Age Tests");

test("Test my nans birthday", function () {
    expect(3);
    var dob = new org.camerongreen.Date(1970, 10, 24);
    var date = new org.camerongreen.Date(2012, 5, 3)
    var age = dob.dateUnitsBetween(date);
    equal(age.years, 41, "Years");
    equal(age.months, 6, "Months");
    equal(age.days, 10, "Days");
});

test("birth month > calc month && birth day < calc day", function () {
    expect(3);
    var dob = new org.camerongreen.Date(1970, 10, 24);
    var date = new org.camerongreen.Date(1972, 9, 28)
    var age = dob.dateUnitsBetween(date);
    equal(age.years, 1, "Years");
    equal(age.months, 11, "Months");
    equal(age.days, 4, "Days");
});

test("birth month > calc month && birth day = calc day", function () {
    expect(3);
    var dob = new org.camerongreen.Date(1970, 10, 24);
    var date = new org.camerongreen.Date(1972, 9, 24)
    var age = dob.dateUnitsBetween(date);
    equal(age.years, 1, "Years");
    equal(age.months, 11, "Months");
    equal(age.days, 0, "Days");
});

test("birth month > calc month && birth day > calc day", function () {
    expect(3);
    var dob = new org.camerongreen.Date(1970, 10, 24);
    var date = new org.camerongreen.Date(1972, 9, 22)
    var age = dob.dateUnitsBetween(date);
    equal(age.years, 1, "Years");
    equal(age.months, 10, "Months");
    equal(age.days, 28, "Days");
});

test("birth month = calc month && birth day < calc day", function () {
    expect(3);
    var dob = new org.camerongreen.Date(1970, 10, 24);
    var date = new org.camerongreen.Date(1972, 10, 28)
    var age = dob.dateUnitsBetween(date);
    equal(age.years, 2, "Years");
    equal(age.months, 0, "Months");
    equal(age.days, 4, "Days");
});

test("birth month = calc month && birth day = calc day", function () {
    expect(3);
    var dob = new org.camerongreen.Date(1970, 10, 24);
    var date = new org.camerongreen.Date(1972, 10, 24)
    var age = dob.dateUnitsBetween(date);
    equal(age.years, 2, "Years");
    equal(age.months, 0, "Months");
    equal(age.days, 0, "Days");
});

test("birth month = calc month && birth day > calc day", function () {
    expect(3);
    var dob = new org.camerongreen.Date(1970, 10, 24);
    var date = new org.camerongreen.Date(1972, 10, 22)
    var age = dob.dateUnitsBetween(date);
    equal(age.years, 1, "Years");
    equal(age.months, 11, "Months");
    equal(age.days, 29, "Days");
});

test("birth month = calc month && birth day > calc day 2", function () {
    expect(3);
    var dob = new org.camerongreen.Date(1970, 10, 24);
    var date = new org.camerongreen.Date(1972, 11, 2)
    var age = dob.dateUnitsBetween(date);
    equal(age.years, 2, "Years");
    equal(age.months, 0, "Months");
    equal(age.days, 8, "Days");
});

test("birth month < calc month && birth day < calc day", function () {
    expect(3);
    var dob = new org.camerongreen.Date(1970, 10, 24);
    var date = new org.camerongreen.Date(1972, 11, 28)
    var age = dob.dateUnitsBetween(date);
    equal(age.years, 2, "Years");
    equal(age.months, 1, "Months");
    equal(age.days, 4, "Days");
});

test("birth month < calc month && birth day = calc day", function () {
    expect(3);
    var dob = new org.camerongreen.Date(1970, 10, 24);
    var date = new org.camerongreen.Date(1972, 11, 24)
    var age = dob.dateUnitsBetween(date);
    equal(age.years, 2, "Years");
    equal(age.months, 1, "Months");
    equal(age.days, 0, "Days");
});

test("birth month < calc month && birth day > calc day", function () {
    expect(3);
    var dob = new org.camerongreen.Date(1970, 10, 24);
    var date = new org.camerongreen.Date(1972, 11, 22)
    var age = dob.dateUnitsBetween(date);
    equal(age.years, 2, "Years");
    equal(age.months, 0, "Months");
    equal(age.days, 28, "Days");
});
