'use strict';

angular
  .module('efg.sermonsDirective', [
    'efg.headerbarService',
    'efg.sermonDirective',
    'efg.sermonService',
    'efg.sermonApi',
    'ng'
  ])
  .directive('sermons', function(sermonApi, sermon, headerbar) {
    return {
      templateUrl: 'efg.sermonsDirective.tpl.html',
      link: function($scope, $element, $attributes) {
        $scope.sermons = [];
        $scope.search = '';
        sermonApi.query().then(function(sermons) {
          $scope.sermons = sermons;
        });

        $scope.activate = function(s) {
          sermon.set(s);
        };

        $scope.isactive = function(s) {
          return sermon.is(s);
        };

        $scope.upateSearch = function(s) {
          $scope.search = s;
        };
        $scope.searchFilter = function(s) {
          if ($scope.search === '') {
            return true;
          } else {
            if (
              s.series &&
              s.series.toLowerCase().indexOf($scope.search.toLowerCase()) > -1
            ) {
              return true;
            } else if (
              s.name &&
              s.name.toLowerCase().indexOf($scope.search.toLowerCase()) > -1
            ) {
              return true;
            } else if (
              s.preacher &&
              s.preacher.toLowerCase().indexOf($scope.search.toLowerCase()) > -1
            ) {
              return true;
            }
            // s.date vergleichen
          }
          return false;
        };
        headerbar.add({
          id: 'search',
          action: $scope.upateSearch,
          type: 'search',
          content: 'Predigten durchsuchen'
        });
        $scope.$on('$destroy', function() {
          headerbar.clear();
        });
      }
    };
  });
