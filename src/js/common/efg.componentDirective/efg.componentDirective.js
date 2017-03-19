'use strict';

angular
  .module('efg.componentDirective', ['ng'])
  .directive('component', function($log) {
    return {
      replace: true, // to allow style/ng-style
      restrict: 'E',
      scope: {
        header: '@',
        subheader: '@',
        classes: '@'
      },
      templateUrl: 'efg.componentDirective.tpl.html',
      controller: function($scope) {
        $scope.issinglecolumn = $scope.classes &&
          $scope.classes.indexOf('component-singlecolumn') > -1;
      },
      transclude: true
    };
  });
