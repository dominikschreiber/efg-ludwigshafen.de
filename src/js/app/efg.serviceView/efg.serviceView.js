'use strict';

angular.module('efg.serviceView', [
	'efg.mockService',
	'ng',
	'ngRoute'
])

.config(function($routeProvider) {
	$routeProvider.when('/service/:id', {
		controller: 'ServiceCtrl as service',
		templateUrl: 'efg.serviceView.tpl.html'
	});
})

.controller('ServiceCtrl', function(mock, $routeParams) {
	mock.get('/api/v1/service/' + $routeParams.id).then(angular.bind(this, function success(result) {
		this.title = result.title;
		this.subtitle = result.subtitle;
		this.description = result.description;
	}));
});