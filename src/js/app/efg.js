angular.module('efg', [
	'efg.indexView',
	'efg.serviceView',
	'efg.memberView',
	'efg.findusView',
	'uiGmapgoogle-maps',
	'ng',
	'ngRoute'
])

.config(function($routeProvider, $locationProvider, uiGmapGoogleMapApiProvider) {
	$routeProvider.otherwise({
		redirectTo: '/'
	});
	
	$locationProvider.html5Mode(false);
	$locationProvider.hashPrefix('!');
	
	uiGmapGoogleMapApiProvider.configure({
		v: '3.17',
		libraries: 'weather,geometry,visualization'
	});
});