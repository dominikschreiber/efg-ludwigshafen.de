'use strict';

angular.module('efg.geoView', [
	'efg.componentDirective',
    'efg.geoApi',
	'uiGmapgoogle-maps',
	'geolocation',
    'btford.markdown',
	'ng',
	'ngRoute'
])

.config(function($routeProvider, uiGmapGoogleMapApiProvider) {
	$routeProvider
        .when('/geo', {
            controller: 'GeoCtrl as geo',
            templateUrl: 'efg.geoView.tpl.html'
        })
        .when('/findus', {
            redirectTo: '/geo'
        });

	uiGmapGoogleMapApiProvider.configure({
		v: '3.17',
		libraries: 'weather,geometry,visualization'
	});
})

.controller('GeoCtrl', function(geolocation, geoApi) {
    geoApi.query().then(function(data) {
        // need to create marker position twice (not as one object)
        // or marker won't update when map is moved
        var campus = data[Object.keys(data)[0]]
          , latitude = campus.latitude
          , longitude = campus.longitude
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
            street: campus.street,
            city: campus.city,
            id: 0
        };
        this.you = undefined;
        this.connections = campus.connections;

        geolocation.getLocation().then(function(data) {
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
        }.bind(this));
    }.bind(this));
})

.directive('geopreview', function(geoApi, $log, $filter) {
    return {
        templateUrl: 'efg.geoPreview.tpl.html',
        scope: {
            classes: '@',
            styles: '='
        },
        controller: function($scope) {
            $scope.responsive = $filter('responsive');
            geoApi.query().then(function(campuses) {
                $scope.campuses = Object.keys(campuses).map(function(key) {
                    var campus = campuses[key];
                    return {
                        id: key,
                        subtitle: campus.subtitle,
                        location: [campus.street, campus.city].join(', ')
                    };
                });
            });
        }
    }
});