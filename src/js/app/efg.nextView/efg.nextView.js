'use strict';

angular.module('efg.nextView', [
    'efg.mockService',
    'efg.trustFilter',
    'ngRoute'
])

.config(function($routeProvider) {
    $routeProvider.when('/next/:id', {
        controller: 'NextCtrl as next',
        templateUrl: 'efg.nextView.tpl.html'
    });
})

.controller('NextCtrl', function(mock, $routeParams) {
    mock.get('/api/v1/next/' + $routeParams.id).then(angular.bind(this, function success(result) {
        this.title = result.name;
        this.subtitle = result.description;
        this.img = result.img;
        this.content = result.content;
    }));
});