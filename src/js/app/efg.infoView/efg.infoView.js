'use strict';

angular.module('efg.infoView', [
    'efg.infoApi'
])

.config(function($routeProvider) {
    $routeProvider.when('/info/:id', {
        controller: 'InfoCtrl as info',
        templateUrl: 'efg.infoView.tpl.html'
    });
})

.controller('InfoCtrl', function(infoApi, $routeParams) {
    infoApi.get($routeParams.id).then(function(info) {
        this.title = info.name;
    }.bind(this));
});