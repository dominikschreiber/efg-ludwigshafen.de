'use strict';

angular.module('efg.groupView', [
	'efg.mockService',
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

.controller('GroupCtrl', function(mock, $routeParams) {
	mock.get('/api/v1/group/' + $routeParams.id + '?fields=name,poster').then(angular.bind(this, function success(result) {
		this.title = result.name;
		this.img = result.poster;
	}));
});