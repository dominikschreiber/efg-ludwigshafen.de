'use strict';

angular
  .module('efg.responsiveFilter', ['efg.responsiveService', 'ng'])
  .filter('responsive', function(responsive, $window) {
    var viewport = {
      sm: 768,
      md: 992,
      lg: 1200
    };

    function imagedimension(joincharacter) {
      return [device(), resolution()].filter(Boolean).join(joincharacter || '');
    }

    function device() {
      return Object.keys(viewport).reduce(
        function(previous, breakpoint) {
          if (
            $window.matchMedia(
              '(min-width: ' + viewport[breakpoint] + 'px)'
            ).matches
          ) {
            return breakpoint;
          } else {
            return previous;
          }
        },
        'xs'
      );
    }

    function resolution() {
      return $window.matchMedia(
        '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)'
      ).matches
        ? '2x'
        : undefined;
    }

    function rewritten(asseturl) {
      return responsive.assetprefix +
        imagedimension('/') +
        '/' +
        asseturl.slice(responsive.assetprefix.length);
    }

    return function(path) {
      return responsive.isimage(path) && responsive.isasset(path)
        ? rewritten(path)
        : path;
    };
  });
