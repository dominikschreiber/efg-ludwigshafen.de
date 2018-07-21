'use strict';

angular
  .module('efg.dataProtectionView', ['efg.componentDirective', 'ng', 'ngRoute'])
  .config(function($routeProvider) {
    $routeProvider.when('/data-protection', {
      templateUrl: 'efg.dataProtectionView.tpl.html'
    });
  });
