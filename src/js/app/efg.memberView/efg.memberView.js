'use strict';

angular.module('efg.memberView', [
	'efg.mockService',
	'ng',
	'ngRoute'
])

.config(function($routeProvider) {
	$routeProvider.when('/member/:id', {
		controller: 'MemberCtrl as member',
		templateUrl: 'efg.memberView.tpl.html'
	});
})

.controller('MemberCtrl', function(mock, $routeParams) {
	mock.get('/api/v1/member/' + $routeParams.id + '?fields=name,duties,description,poster').then(angular.bind(this, function success(result) {
		this.title = [result.name.givenname, result.name.familyname].join(' ');
		this.subtitle = result.duties.join(', ');
		this.description = result.description;
		this.img = result.poster;
	}));
});