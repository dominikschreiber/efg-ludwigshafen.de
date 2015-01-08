'use strict';

angular.module('efg.findusView', [
	'efg.componentDirective',
	'uiGmapgoogle-maps',
	'geolocation',
	'ng',
	'ngRoute'
])

.config(function($routeProvider, uiGmapGoogleMapApiProvider) {
	$routeProvider.when('/findus', {
		controller: 'FindusCtrl as findus',
		templateUrl: 'efg.findusView.tpl.html'
	});
    
	uiGmapGoogleMapApiProvider.configure({
		v: '3.17',
		libraries: 'weather,geometry,visualization'
	});
})

.controller('FindusCtrl', function(geolocation) {
	// need to create marker position twice (not as one object)
	// or marker won't update when map is moved
	var latitude = 49.49172
	  , longitude = 8.435441
	  , delta = 0.0001;
	
	this.map = {
		center: {
			latitude: latitude,
			longitude: longitude
		},
		zoom: 15,
		options: {
			backgroundColor: 'rgb(233,229,220)',
			scrollwheel: false
		},
		bounds: {
			northeast: {
				latitude: latitude * (1 + delta),
				longitude: longitude * (1 + delta)
			},
			southwest: {
				latitude: latitude * (1 - delta),
				longitude: longitude * (1 - delta)
			}
		}
	};
	this.we = {
		coords: {
			latitude: latitude,
			longitude: longitude
		},
		id: 0
	};
	this.you = undefined;
	
	geolocation.getLocation().then(angular.bind(this, function success(data) {
		this.you = {
			coords: data.coords,
			id: 1
		};
		this.map.bounds = {
			northeast: {
				// to north == +lat
				latitude: Math.max(this.we.coords.latitude, this.you.coords.latitude) * (1 + delta),
				// to east == +lng
				longitude: Math.max(this.we.coords.longitude, this.you.coords.longitude) * (1 + delta)
			},
			southwest: {
				latitude: Math.min(this.we.coords.latitude, this.you.coords.latitude) * (1 - delta),
				longitude: Math.min(this.we.coords.longitude, this.you.coords.longitude) * (1 - delta)
			}
		};
	}));
});