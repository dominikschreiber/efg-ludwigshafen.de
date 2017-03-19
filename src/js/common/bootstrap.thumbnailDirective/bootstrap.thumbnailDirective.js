'use strict';

angular
  .module('bootstrap.thumbnailDirective', ['efg.responsiveFilter', 'ng'])
  .directive('thumbnail', function() {
    return {
      link: function($scope, $element, $attributes) {
        $scope.contains = function(haystack, needle) {
          return haystack.indexOf(needle) > -1;
        };
      },
      replace: true,
      restrict: 'E',
      scope: {
        href: '=',
        header: '=',
        subheader: '=',
        // if img contains a whitespace (thus: no valid url)
        // it is assumed to be a classList for icons like
        // 'glyphicon glyphicon-envelope'
        img: '=',
        imgclass: '='
      },
      templateUrl: 'bootstrap.thumbnailDirective.tpl.html'
    };
  });
