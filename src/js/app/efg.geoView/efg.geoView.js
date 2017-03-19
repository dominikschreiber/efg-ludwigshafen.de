'use strict';

angular
  .module('efg.geoView', [
    'efg.componentDirective',
    'efg.geoApi',
    'geolocation',
    'hc.marked',
    'ng',
    'ngMap',
    'ngRoute'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/geo', {
        controller: 'GeoCtrl as geo',
        templateUrl: 'efg.geoView.tpl.html'
      })
      .when('/findus', {
        redirectTo: '/geo'
      });
  })
  .controller('GeoCtrl', function(geolocation, geoApi, NgMap) {
    geoApi.query().then(
      function(data) {
        this.we = data[Object.keys(data)[0]];

        this.markers = [
          {
            position: new google.maps.LatLng(
              this.we.latitude,
              this.we.longitude
            ),
            title: 'Wir',
            address: [this.we.street, this.we.city].join(', ')
          }
        ];

        geolocation.getLocation().then(
          function(data) {
            this.markers.push({
              position: new google.maps.LatLng(
                data.coords.latitude,
                data.coords.longitude
              ),
              title: 'Du'
            });
          }.bind(this)
        );
      }.bind(this)
    );
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
    };
  });
