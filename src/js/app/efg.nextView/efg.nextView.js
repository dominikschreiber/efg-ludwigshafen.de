'use strict';

angular.module('efg.nextView', [
    'efg.nextApi',
    'efg.responsiveFilter',
    'btford.markdown',
    'ngRoute'
])

.config(function($routeProvider) {
    $routeProvider.when('/next/:id', {
        controller: 'NextCtrl as next',
        templateUrl: 'efg.nextView.tpl.html'
    });
})

.controller('NextCtrl', function(nextApi, $routeParams, $filter) {
    this.$filter = $filter;
    
    nextApi.get($routeParams.id).then(function(action) {
        this.title = action.name;
        this.subtitle = action.subtitle;
        this.img = action.poster;
        this.content = action.description;
    }.bind(this));
});