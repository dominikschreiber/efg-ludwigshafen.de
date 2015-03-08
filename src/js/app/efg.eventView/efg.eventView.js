'use strict';

angular.module('efg.eventView', [
    'efg.mockService',
    'ngRoute'
])

.config(function($routeProvider) {
    $routeProvider.when('/event/:id', {
        controller: 'EventCtrl as event',
        templateUrl: 'efg.eventView.tpl.html'
    });
})

.controller('EventCtrl', function(mock, $routeParams) {
    mock.get('/api/v1/event/' + $routeParams.id).then(function(result) {
    
    });
});