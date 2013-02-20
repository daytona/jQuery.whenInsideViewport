(function(win, $) {
  'use strict';

  $.fn.whenInsideViewport = function(options) {

    // default s
    var defaults = {
      minInside: 0,
      doOnce: false,
      whenInside: function() {}
    };

    return this.each(function() {

      // settings
      var s = $.extend({}, defaults, options);

      // this
      var self = this;

      // window
      var $win = $(win);

      // el
      var $el = $(this);

      // window height
      var winHeight = $win.height();

      // el height
      var elHeight = $el.outerHeight();

      // el offset
      var elOffset = $el.offset().top;

      // have el been inside viewport?
      var hasBeenInside = false;

      // initial check
      check();

      // window scroll
      $win.scroll(function() {

        // check
        check();

      // window resize
      }).resize(function() {

        // update window height
        winHeight = $(this).height();

        // update el offset
        elOffset = $el.offset().top;

        // check
        check();

      });

      function check() {
        var isInsideTop = ($win.scrollTop() + winHeight) > (elOffset+s.minInside);
        var isInsideBottom = ($win.scrollTop()) < (elOffset + elHeight - s.minInside);

        // is element inside viewport?
        if (isInsideTop && isInsideBottom) {

          // return false if its been inside and callback should only be called once
          if (s.doOnce && hasBeenInside) {
            return false;
          }

          // update var
          hasBeenInside = true;

          // call
          s.whenInside.call(self);

        }
      }

    });
  };
})(window, jQuery);