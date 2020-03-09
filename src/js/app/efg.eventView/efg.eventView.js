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
  })
  .controller('EventCtrl', function() {})
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
