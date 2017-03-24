'use strict';

angular
  .module('efg.indexView', [
    'efg.serviceView',
    'efg.geoView',
    'efg.eventView',
    'efg.groupView',
    'efg.nextView',
    'efg.memberView',
    'efg.sermonView',
    'efg.contactView',
    'efg.componentDirective',
    'efg.responsiveBackgroundDirective',
    'ng',
    'ngRoute'
  ])
  .config(function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'efg.indexView.tpl.html'
    });
  });
