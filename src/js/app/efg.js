'use strict';

angular.module('efg', [
    'efg.sermonView',
    'efg.eventView',
    'efg.imprintView',
	'efg.indexView',
    'efg.infoView',
	'efg.serviceView',
	'efg.memberView',
	'efg.geoView',
	'efg.groupView',
    'efg.nextView',
    'efg.contactView',
    'efg.downloadsView',
    'efg.headerbarDirective',
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

.run(function($rootScope, $log, $route) {
    $rootScope.$on('$routeChangeSuccess', function() {
        if ($route.current.$$route) {
            document.body.className = 'view-' + ($route.current.$$route.originalPath.split('/')[1] || 'index');
        }
    });
});
