'use strict';

angular.module('efg', [
	'efg.indexView',
	'efg.serviceView',
	'efg.memberView',
	'efg.findusView',
	'efg.groupView',
	'ng',
	'ngRoute'
])

.config(function($routeProvider, $locationProvider) {
	$routeProvider.otherwise({
		redirectTo: '/'
	});
	
	$locationProvider.html5Mode(false);
	$locationProvider.hashPrefix('!');
});