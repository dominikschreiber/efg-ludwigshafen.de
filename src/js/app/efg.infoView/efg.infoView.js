'use strict';

angular.module('efg.infoView', [
    'efg.infoApi',
    'efg.responsiveFilter',
    'ng',
    'ngRoute'
])

.config(function($routeProvider) {
    $routeProvider.when('/info/:id', {
        controller: 'InfoCtrl as info',
        templateUrl: 'efg.infoView.tpl.html'
    });
})

.controller('InfoCtrl', function(infoApi, $routeParams, $filter) {
    this.$filter = $filter;
    
    infoApi.get($routeParams.id).then(function(info) {
        this.title = info.name;
    }.bind(this));
});