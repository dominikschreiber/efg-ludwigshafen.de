'use strict';

angular.module('efg.serviceView', [
    'efg.trustFilter',
	'efg.mockService',
    'efg.sermonDirective',
    'md.parseMarkdownFilter',
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
	mock.get('/api/v1/service/' + $routeParams.id + '?fields=name,subtitle,description,poster,sermon').then(angular.bind(this, function success(result) {
		this.img = result.poster;
        this.title = result.name;
		this.subtitle = result.subtitle;
		this.description = result.description;
        this.sermon = result.sermon;
	}));
});