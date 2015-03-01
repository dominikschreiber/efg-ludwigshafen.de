'use strict';

angular.module('efg.infoView', [
    'efg.mockService'
])

.config(function($routeProvider) {
    $routeProvider.when('/info/:id', {
        controller: 'InfoCtrl as info',
        templateUrl: 'efg.infoView.tpl.html'
    });
})

.controller('InfoCtrl', function(mock, $routeParams) {
    mock.get('/api/v1/info/' + $routeParams.id).then(angular.bind(this, function success(result) {
        this.title = result.name;
    }), angular.bind(this, function error() {
        
    }));
});