(function($) {
  $.fn.whenInsideViewport = function(options) {

    // default settings
    var defaults = {
      minInside: 0,
      doOnce: false,
      whenInside: function() {}
    };

    return this.each(function() {

      // settings
      settings = $.extend({}, defaults, options);

      // this
      var self = this;

      // window
      var $window = $(window);

      // el
      var $el = $(this);

      // window height
      var windowHeight = $window.height();

      // el height
      var elHeight = $el.outerHeight();

      // el offset
      var elOffset = $el.offset().top;

      // have el been inside viewport?
      var hasBeenInside = false;

      // initial check
      check();

      // window scroll
      $window.scroll(function() {

        // check
        check();

      // window resize
      }).resize(function() {

        // update window height
        windowHeight = $(this).height();

        // check
        check();

      });

      function check() {
        // is element inside viewport?
        if ( (($window.scrollTop() + windowHeight) > (elOffset+settings.minInside)) && (($window.scrollTop()) < (elOffset + elHeight - settings.minInside))) {

          // return false if its been inside and callback should only be called once
          if (settings.doOnce && hasBeenInside) {
            return false;
          }

          // update var
          hasBeenInside = true;

          // call
          settings.whenInside.call(self);

        }
      }

    });
  };
})(jQuery);