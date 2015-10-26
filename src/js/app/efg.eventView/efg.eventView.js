'use strict';

angular.module('efg.eventView', [
    'efg.eventApi',
    'ng',
    'ngRoute'
])

.config(function($routeProvider) {
    $routeProvider.when('/event/:id', {
        controller: 'EventCtrl as event',
        templateUrl: 'efg.eventView.tpl.html'
    });
})

.controller('EventCtrl', function(eventApi, $routeParams) {
    eventApi.get($routeParams.id).then(function(event) {

    }.bind(this));
});