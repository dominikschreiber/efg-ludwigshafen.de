angular.module('efg.findusView', [
	'uiGmapgoogle-maps',
	'geolocation',
	'ng'
])

.config(function($routeProvider) {
	$routeProvider.when('/findus', {
		controller: 'FindusCtrl as findus',
		templateUrl: 'efg.findusView.tpl.html'
	});
})

.controller('FindusCtrl', function(geolocation) {
	// need to create marker position twice (not as one object)
	// or marker won't update when map is moved
	var latitude = 49.49172
	  , longitude = 8.435441
	// northways == +lat
	// eastways == +lng
	  , d = {lat: 0.0035, lng: 0.005};
	
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
				latitude: latitude - d.lat,
				longitude: longitude + d.lng
			},
			southwest: {
				latitude: latitude + d.lat,
				longitude: longitude - d.lng
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
				latitude: Math.max(this.we.coords.latitude, this.you.coords.latitude) + d.lat,
				longitude: Math.max(this.we.coords.longitude, this.you.coords.longitude) + d.lng
			},
			southwest: {
				latitude: Math.min(this.we.coords.latitude, this.you.coords.latitude) - d.lat,
				longitude: Math.min(this.we.coords.longitude, this.you.coords.longitude) - d.lng
			}
		};
	}));
});