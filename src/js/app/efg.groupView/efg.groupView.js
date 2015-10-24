'use strict';

angular.module('efg.groupView', [
    'efg.groupApi',
	'efg.componentDirective',
	'ng',
	'ngRoute'
])

.config(function($routeProvider) {
	$routeProvider.when('/group/:id', {
		controller: 'GroupCtrl as group',
		templateUrl: 'efg.groupView.tpl.html'
	});
})

.controller('GroupCtrl', function(groupApi, $routeParams) {
    groupApi.get($routeParams.id).then(function success(group) {
        this.title = group.name;
        this.img = group.poster;
    }.bind(this));
});