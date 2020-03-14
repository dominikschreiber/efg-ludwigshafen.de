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
          $scope.infos = Object.entries(infos).map(function(e) {
            var timestamp = e[0].split('_').map(function(_) { return _.split('-'); });
            
            return {
              timestamp: timestamp[0].reverse().join('.') + ' ' + timestamp[1].join(':') + ' Uhr',
              text: e[1]
            };
          })
        });
      }
    }
  });