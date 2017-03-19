'use strict';

angular
  .module('efg.responsiveFilter', ['ng'])
  .filter('responsive', function($window) {
    var viewport = {
      sm: 768,
      md: 992,
      lg: 1200
    },
      assetprefix = '/assets/img/';

    function isimage(path) {
      return /\.(jpg|jpeg|png|gif)$/.test(path);
    }

    function isasset(path) {
      return path.indexOf(assetprefix) === 0;
    }

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
      return assetprefix +
        imagedimension('/') +
        '/' +
        asseturl.slice(assetprefix.length);
    }

    return function(path) {
      return isimage(path) && isasset(path) ? rewritten(path) : path;
    };
  });
