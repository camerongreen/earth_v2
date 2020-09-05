/*! Copyright (c) 2013 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.1.3
 *
 * Requires: 1.2.2+
 */

(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'];
    var toBind = 'onwheel' in document || document.documentMode >= 9 ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'];
    var lowestDelta, lowestDeltaXY;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    $.event.special.mousewheel = {
        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
        },

        unmousewheel: function(fn) {
            return this.unbind("mousewheel", fn);
        }
    });


    function handler(event) {
        var orgEvent = event || window.event,
            args = [].slice.call(arguments, 1),
            delta = 0,
            deltaX = 0,
            deltaY = 0,
            absDelta = 0,
            absDeltaXY = 0,
            fn;
        event = $.event.fix(orgEvent);
        event.type = "mousewheel";

        // Old school scrollwheel delta
        if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta; }
        if ( orgEvent.detail )     { delta = orgEvent.detail * -1; }

        // New school wheel delta (wheel event)
        if ( orgEvent.deltaY ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( orgEvent.deltaX ) {
            deltaX = orgEvent.deltaX;
            delta  = deltaX * -1;
        }

        // Webkit
        if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY; }
        if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Look for lowest delta to normalize the delta values
        absDelta = Math.abs(delta);
        if ( !lowestDelta || absDelta < lowestDelta ) { lowestDelta = absDelta; }
        absDeltaXY = Math.max(Math.abs(deltaY), Math.abs(deltaX));
        if ( !lowestDeltaXY || absDeltaXY < lowestDeltaXY ) { lowestDeltaXY = absDeltaXY; }

        // Get a whole value for the deltas
        fn = delta > 0 ? 'floor' : 'ceil';
        delta  = Math[fn](delta / lowestDelta);
        deltaX = Math[fn](deltaX / lowestDeltaXY);
        deltaY = Math[fn](deltaY / lowestDeltaXY);

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

}));
;
/*globals createjs*/

var org = org || {};
org.camerongreen = org.camerongreen || {};

/**
 *  Creates a bull object to do stuff with
 *
 * User: Cameron Green <i@camerongreen.org>
 * Date: 3/07/13
 * Time: 10:24 PM
 */
(function () {
  "use strict";

  var ns = org.camerongreen;

  ns.Bull = function (img, containerLeft, containerRight, containerHeight, shadowColour) {
    this.name = "bull";
    this.img = img;
    this.leftLimit = containerLeft;
    this.rightLimit = containerRight;
    this.shadowColour = shadowColour;
    this.startX = (this.leftLimit + ((this.rightLimit - this.leftLimit) / 2)) - (img.width / 2);
    this.x = this.startX;
    this.y = containerHeight - img.height;
    this.xIncrement = 15;

    this.initialize();
  };

  ns.Bull.prototype = new createjs.BitmapAnimation();

  ns.Bull.prototype.BitmapAnimation_initialize = ns.Bull.prototype.initialize;

  ns.Bull.prototype.initialize = function () {
    var bullSprite = new createjs.SpriteSheet({
      images: [this.img],
      frames: {width: this.img.width, height: this.img.height, regX: 0, regY: 0},
      animations: {
        stand: 0
      }
    });

    createjs.SpriteSheetUtils.addFlippedFrames(bullSprite, true, false, false);
    this.BitmapAnimation_initialize(bullSprite);

    this.shadow = new createjs.Shadow(this.shadowColour, 6, 9, 18);
    this.gotoAndPlay("stand");
  };

  ns.Bull.prototype.move = function (x) {
    if ((x > this.leftLimit) && ((x + this.img.width) < this.rightLimit)) {
      this.x = x;
    }
  };

  ns.Bull.prototype.right = function () {
    this.move(this.x + this.xIncrement);
  };

  ns.Bull.prototype.left = function () {
    this.move(this.x - this.xIncrement);
  };

  ns.Bull.prototype.reset = function () {
    this.move(this.startX);
  };
})();
;
/*globals createjs*/

var org = org || {};
org.camerongreen = org.camerongreen || {};

/**
 *  Creates a runner object to do stuff with
 *
 * User: Cameron Green <i@camerongreen.org>
 * Date: 3/07/13
 * Time: 10:24 PM
 */
(function () {
  "use strict";

  var ns = org.camerongreen;
  var minVelocity = 5;
  var maxVelocity = 20;

  ns.Runner = function (id, img, containerLeft, containerRight, startLine, shadowColour) {
    this.name = "runner" + id;
    this.img = img;
    this.leftLimit = containerLeft;
    this.rightLimit = containerRight;
    this.startLine = startLine;
    this.shadowColour = shadowColour;
    this.width = 40;

    this.initialize();
    this.reset(id);
  };

  ns.Runner.prototype = new createjs.BitmapAnimation();

  ns.Runner.prototype.BitmapAnimation_initialize = ns.Runner.prototype.initialize;

  ns.Runner.prototype.initialize = function () {
    var runnerSprite = new createjs.SpriteSheet({
      images: [this.img],
      frames: {width: this.width, count: this.img.width / this.width, height: this.img.height, regX: 0, regY: 0},
      animations: {
        stand: 0,
        run: {
          frames: [3, 2, 1, 2, 3, 4, 5, 4],
          frequency: 3
        },
        caught: 6
      }
    });


    createjs.SpriteSheetUtils.addFlippedFrames(runnerSprite, true, false, false);
    this.BitmapAnimation_initialize(runnerSprite);

    this.shadow = new createjs.Shadow(this.shadowColour, 6, 9, 12);
  };

  ns.Runner.prototype.left = function (to) {
    if (this.x > this.leftLimit) {
      this.x = to;
    } else {
      this.x = this.leftLimit;
    }
  };

  ns.Runner.prototype.right = function (to) {
    if ((this.x + this.width) < this.rightLimit) {
      this.x = to;
    } else {
      this.x = this.rightLimit - this.width;
    }
  };

  ns.Runner.prototype.move = function (containerVelocity) {
    this.y = (this.y + containerVelocity) - this.velocity;
  };

  ns.Runner.prototype.randomX = function () {
    return this.leftLimit + (Math.random() * ((this.rightLimit - (this.img.width / 2) - this.leftLimit)));
  };


  ns.Runner.prototype.randomY = function () {
    return this.startLine - (Math.random() * this.img.height);
  };

  ns.Runner.prototype.randomVelocity = function () {
    return minVelocity + (Math.random() * (maxVelocity - minVelocity));
  };

  ns.Runner.prototype.reset = function (id) {
    this.x = this.randomX();
    this.y = this.randomY();
    // always have one guy who runs the fastest
    if (id === 0) {
      this.velocity = maxVelocity;
    } else {
      this.velocity = this.randomVelocity();
    }

    this.gotoAndPlay("stand");
  };
})();
;
(function ($) {

Drupal.googleanalytics = {};

$(document).ready(function() {

  // Attach mousedown, keyup, touchstart events to document only and catch
  // clicks on all elements.
  $(document.body).bind("mousedown keyup touchstart", function(event) {

    // Catch the closest surrounding link of a clicked element.
    $(event.target).closest("a,area").each(function() {

      // Is the clicked URL internal?
      if (Drupal.googleanalytics.isInternal(this.href)) {
        // Skip 'click' tracking, if custom tracking events are bound.
        if ($(this).is('.colorbox') && (Drupal.settings.googleanalytics.trackColorbox)) {
          // Do nothing here. The custom event will handle all tracking.
          //console.info("Click on .colorbox item has been detected.");
        }
        // Is download tracking activated and the file extension configured for download tracking?
        else if (Drupal.settings.googleanalytics.trackDownload && Drupal.googleanalytics.isDownload(this.href)) {
          // Download link clicked.
          ga("send", {
            "hitType": "event",
            "eventCategory": "Downloads",
            "eventAction": Drupal.googleanalytics.getDownloadExtension(this.href).toUpperCase(),
            "eventLabel": Drupal.googleanalytics.getPageUrl(this.href),
            "transport": "beacon"
          });
        }
        else if (Drupal.googleanalytics.isInternalSpecial(this.href)) {
          // Keep the internal URL for Google Analytics website overlay intact.
          ga("send", {
            "hitType": "pageview",
            "page": Drupal.googleanalytics.getPageUrl(this.href),
            "transport": "beacon"
          });
        }
      }
      else {
        if (Drupal.settings.googleanalytics.trackMailto && $(this).is("a[href^='mailto:'],area[href^='mailto:']")) {
          // Mailto link clicked.
          ga("send", {
            "hitType": "event",
            "eventCategory": "Mails",
            "eventAction": "Click",
            "eventLabel": this.href.substring(7),
            "transport": "beacon"
          });
        }
        else if (Drupal.settings.googleanalytics.trackOutbound && this.href.match(/^\w+:\/\//i)) {
          if (Drupal.settings.googleanalytics.trackDomainMode !== 2 || (Drupal.settings.googleanalytics.trackDomainMode === 2 && !Drupal.googleanalytics.isCrossDomain(this.hostname, Drupal.settings.googleanalytics.trackCrossDomains))) {
            // External link clicked / No top-level cross domain clicked.
            ga("send", {
              "hitType": "event",
              "eventCategory": "Outbound links",
              "eventAction": "Click",
              "eventLabel": this.href,
              "transport": "beacon"
            });
          }
        }
      }
    });
  });

  // Track hash changes as unique pageviews, if this option has been enabled.
  if (Drupal.settings.googleanalytics.trackUrlFragments) {
    window.onhashchange = function() {
      ga("send", {
        "hitType": "pageview",
        "page": location.pathname + location.search + location.hash
      });
    };
  }

  // Colorbox: This event triggers when the transition has completed and the
  // newly loaded content has been revealed.
  if (Drupal.settings.googleanalytics.trackColorbox) {
    $(document).bind("cbox_complete", function () {
      var href = $.colorbox.element().attr("href");
      if (href) {
        ga("send", {
          "hitType": "pageview",
          "page": Drupal.googleanalytics.getPageUrl(href)
        });
      }
    });
  }

});

/**
 * Check whether the hostname is part of the cross domains or not.
 *
 * @param string hostname
 *   The hostname of the clicked URL.
 * @param array crossDomains
 *   All cross domain hostnames as JS array.
 *
 * @return boolean
 */
Drupal.googleanalytics.isCrossDomain = function (hostname, crossDomains) {
  /**
   * jQuery < 1.6.3 bug: $.inArray crushes IE6 and Chrome if second argument is
   * `null` or `undefined`, https://bugs.jquery.com/ticket/10076,
   * https://github.com/jquery/jquery/commit/a839af034db2bd934e4d4fa6758a3fed8de74174
   *
   * @todo: Remove/Refactor in D8
   */
  if (!crossDomains) {
    return false;
  }
  else {
    return $.inArray(hostname, crossDomains) > -1 ? true : false;
  }
};

/**
 * Check whether this is a download URL or not.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isDownload = function (url) {
  var isDownload = new RegExp("\\.(" + Drupal.settings.googleanalytics.trackDownloadExtensions + ")([\?#].*)?$", "i");
  return isDownload.test(url);
};

/**
 * Check whether this is an absolute internal URL or not.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isInternal = function (url) {
  var isInternal = new RegExp("^(https?):\/\/" + window.location.host, "i");
  return isInternal.test(url);
};

/**
 * Check whether this is a special URL or not.
 *
 * URL types:
 *  - gotwo.module /go/* links.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isInternalSpecial = function (url) {
  var isInternalSpecial = new RegExp("(\/go\/.*)$", "i");
  return isInternalSpecial.test(url);
};

/**
 * Extract the relative internal URL from an absolute internal URL.
 *
 * Examples:
 * - https://mydomain.com/node/1 -> /node/1
 * - https://example.com/foo/bar -> https://example.com/foo/bar
 *
 * @param string url
 *   The web url to check.
 *
 * @return string
 *   Internal website URL
 */
Drupal.googleanalytics.getPageUrl = function (url) {
  var extractInternalUrl = new RegExp("^(https?):\/\/" + window.location.host, "i");
  return url.replace(extractInternalUrl, '');
};

/**
 * Extract the download file extension from the URL.
 *
 * @param string url
 *   The web url to check.
 *
 * @return string
 *   The file extension of the passed url. e.g. "zip", "txt"
 */
Drupal.googleanalytics.getDownloadExtension = function (url) {
  var extractDownloadextension = new RegExp("\\.(" + Drupal.settings.googleanalytics.trackDownloadExtensions + ")([\?#].*)?$", "i");
  var extension = extractDownloadextension.exec(url);
  return (extension === null) ? '' : extension[1];
};

})(jQuery);
;
