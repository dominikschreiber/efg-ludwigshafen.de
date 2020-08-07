'use strict';

angular
  .module('efg.eventView', [
    'ng',
    'ngRoute'
  ])
  .config(function($routeProvider) {
    $routeProvider.when('/event', {
      controller: 'EventCtrl as event',
      templateUrl: 'efg.eventView.tpl.html'
    });
    $routeProvider.when('/packparty', {
      controller: 'PackpartyCtrl as packparty',
      templateUrl: 'efg.packpartyView.tpl.html'
    })
  })
  .controller('EventCtrl', function() {})
  .controller('PackpartyCtrl', function() {})
  .directive('eventpreview', function() {
    return {
      templateUrl: 'efg.eventPreview.tpl.html',
      scope: {
        classes: '@',
        background: '@',
        dark: '@'
      }
    };
  });
