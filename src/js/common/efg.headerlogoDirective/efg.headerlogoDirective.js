'use strict';

angular
  .module('efg.headerlogoDirective', ['ng'])
  .directive('headerlogo', function() {
    return {
      replace: true, // to allow style/ng-style
      restrict: 'E',
      scope: {
        classes: '@'
      },
      templateUrl: 'efg.headerlogoDirective.tpl.html',
      transclude: true
    };
  });
