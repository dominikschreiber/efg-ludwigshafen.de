'use strict';

angular.module('efg.responsiveFilter', [
    'ng'
])

.filter('responsive', function($window) {
    var viewport = {
            sm: 768,
            md: 992,
            lg: 1200
        };
    
    function isimage(path) {
        return /\.(jpg|jpeg|png|gif)$/.test(path);
    }
    
    function isasset(path) {
        return path.indexOf('/assets/') === 0;
    }
    
    function imagedimension() {
        return device() + resolution();
    }
    
    function device() {
        return Object.keys(viewport).reduce(function(previous, breakpoint) {
            if ($window.matchMedia('(min-width: ' + viewport[breakpoint] + 'px)').matches) {
                return breakpoint;
            } else {
                return previous;
            }
        }, 'xs');
    }
    
    function resolution() {
        return $window.matchMedia('(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)').matches
            ? '@2x'
            : '';
    }
    
    return function(path) {
        return isimage(path) && isasset(path)
            ? path.replace(/(.*\/?)([a-zA-Z0-9_-]+)\.(jpg|jpeg|png|gif)$/, '$1$2-' + imagedimension() + '.$3')
            : path;
    };
});