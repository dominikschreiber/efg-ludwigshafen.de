'use strict';

angular
  .module('efg.infoView', [
    'efg.infoApi',
    'ng'
  ])
  .directive('infopreview', function(infoApi) {
    return {
      templateUrl: 'efg.infoPreview.tpl.html',
      scope: {
        classes: '@'
      },
      controller: function($scope) {
        infoApi.query().then(function(infos) {
          $scope.infos = infos;
        });
      }
    }
  });