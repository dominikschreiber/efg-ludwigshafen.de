'use strict';

angular.module('efg', [
    'efg.sermonView',
    'efg.eventView',
    'efg.imprintView',
	'efg.indexView',
    'efg.infoView',
	'efg.serviceView',
	'efg.memberView',
	'efg.findusView',
	'efg.groupView',
    'efg.nextView',
    'efg.contactView',
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
});
