'use strict';

angular.module('efg.pressView', [
    'efg.pressApi',
    'ng',
    'ngRoute'
])

.config(function($routeProvider) {
    $routeProvider.when('/press', {
        controller: 'PressCtrl as press',
        templateUrl: 'efg.pressView.tpl.html'
    });
})

.controller('PressCtrl', function(pressApi) {
    pressApi.query().then(function(results) {
        this.items = results;
    }.bind(this));
});