var org = org || {};
org.camerongreen = org.camerongreen || {};

/**
 *
 * User: Cameron Green <i@camerongreen.org>
 * Date: 13/07/12
 * Time: 8:28 PM
 */
(function () {
    "use strict";

    /**
     * Takes the given element, assuming it contains only
     * a number, sets it to "start", counts up to the
     * original number, taking total_time to do it
     *
     * @param el
     * @param start
     * @param total_time
     */
    org.camerongreen.counter = function (el, start, total_time) {
        var increment = function (el, max, timeout) {
            var val = parseInt(el.html());
            if (val < max) {
                el.html(++val);
                setTimeout(function () {
                    increment(el, max, timeout);
                }, timeout);

            }
        };

        var max = parseInt(el.html());
        el.html(start);
        increment(el, max, total_time / max);
    };

})();
