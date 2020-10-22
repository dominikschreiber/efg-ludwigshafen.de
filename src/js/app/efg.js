'use strict';

angular
  .module('efg', [
    'efg.sermonView',
    'efg.eventView',
    'efg.imprintView',
    'efg.dataProtectionView',
    'efg.indexView',
    'efg.infoView',
    'efg.serviceView',
    'efg.memberView',
    'efg.geoView',
    'efg.groupView',
    'efg.nextView',
    'efg.contactView',
    'efg.downloadsView',
    'ng',
    'ngRoute',
    'angulartics',
    'angulartics.piwik'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');
  })
  .run(function($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function() {
      if ($route.current.$$route) {
        document.body.className = 'view-' +
          ($route.current.$$route.originalPath.split('/')[1] || 'index');
      }
    });

    var d = new Date();
    if (d.getDay() === 0 && d.getHours() > 8 && d.getHours() < 12) {
      document.getElementById('stream').classList.add('live');
    }
  });
